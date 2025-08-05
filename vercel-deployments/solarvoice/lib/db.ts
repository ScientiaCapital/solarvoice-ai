import { PrismaClient } from '@prisma/client'
import { Pool } from '@neondatabase/serverless'

// Declare global type to prevent multiple instances
declare global {
  var prisma: PrismaClient | undefined
  var neonPool: Pool | undefined
}

// Create Prisma client with optimized settings for serverless
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    errorFormat: 'pretty',
  })
}

// Create Neon connection pool for direct queries
const neonPoolSingleton = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined')
  }
  
  return new Pool({
    connectionString: process.env.DATABASE_URL,
    // Serverless-optimized settings
    max: 10,
    idleTimeoutMillis: 20000,
    connectionTimeoutMillis: 10000,
  })
}

// Export singleton instances
export const prisma = globalThis.prisma ?? prismaClientSingleton()
export const neonPool = globalThis.neonPool ?? neonPoolSingleton()

// Prevent multiple instances in development
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma
  globalThis.neonPool = neonPool
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
  await neonPool.end()
}