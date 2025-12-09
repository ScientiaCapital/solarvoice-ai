import { PrismaClient } from '@prisma/client'

// Declare global type to prevent multiple instances in development
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

// Create Prisma client with optimized settings for serverless
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    errorFormat: 'pretty',
  })
}

// Export singleton instance
// Using Supabase PostgreSQL with Prisma - no separate connection pool needed
// Supabase provides Supavisor for connection pooling via the pooler URL
export const prisma = globalThis.prisma ?? prismaClientSingleton()

// Prevent multiple instances in development (hot reload)
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma
}

// Helper function to check database connection
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`
    return true
  } catch (error) {
    console.error('Database connection failed:', error)
    return false
  }
}

// Helper function for transactions
export async function withTransaction<T>(
  fn: (tx: PrismaClient) => Promise<T>
): Promise<T> {
  return await prisma.$transaction(async (tx) => {
    return await fn(tx as PrismaClient)
  })
}

// Cleanup function for graceful shutdown
export async function disconnectDatabase() {
  await prisma.$disconnect()
}
