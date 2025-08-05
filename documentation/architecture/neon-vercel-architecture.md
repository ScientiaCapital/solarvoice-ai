# NEON + Vercel Architecture Guide

## Overview

SolarVoice AI Platform uses a modern serverless architecture combining NEON PostgreSQL database with Vercel's edge runtime for optimal performance and scalability.

## Architecture Components

### 1. Database Layer (NEON)

NEON provides a serverless PostgreSQL database with the following benefits:
- **Automatic Scaling**: Scales compute and storage independently
- **Branching**: Create database branches for testing and development
- **Connection Pooling**: Built-in connection pooling for serverless environments
- **Point-in-Time Recovery**: Restore to any point in the last 7 days

#### Connection Configuration
```typescript
// Using @neondatabase/serverless for edge runtime compatibility
import { Pool } from '@neondatabase/serverless'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10, // Serverless-optimized pool size
  idleTimeoutMillis: 20000,
  connectionTimeoutMillis: 10000,
})
```

### 2. Application Layer (Vercel)

Vercel provides the hosting platform with:
- **Edge Functions**: API routes run at the edge for low latency
- **Automatic Scaling**: Scales with traffic automatically
- **Global CDN**: Static assets served from edge locations
- **Preview Deployments**: Automatic preview URLs for branches

#### API Route Structure
```
app/api/
├── auth/
│   ├── login/route.ts
│   ├── register/route.ts
│   └── refresh/route.ts
├── voice/
│   └── command/route.ts
├── projects/
│   └── [id]/route.ts
├── webhooks/
│   ├── stripe/route.ts
│   ├── retell/route.ts
│   └── elevenlabs/route.ts
└── health/route.ts
```

### 3. ORM Layer (Prisma)

Prisma provides type-safe database access:
- **Type Safety**: Generated TypeScript types from schema
- **Migrations**: Version-controlled database schema changes
- **Query Builder**: Intuitive API for complex queries

## Data Flow

```mermaid
graph TD
    A[Client Request] --> B[Vercel Edge Function]
    B --> C[Prisma Client]
    C --> D[NEON Connection Pool]
    D --> E[NEON PostgreSQL]
    E --> D
    D --> C
    C --> B
    B --> A
```

## Environment Configuration

### Required Environment Variables

```bash
# Database
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
DIRECT_DATABASE_URL=postgresql://user:pass@host/db?sslmode=require

# Authentication
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret

# API Keys (as needed)
STRIPE_SECRET_KEY=sk_xxx
RETELL_API_KEY=rtl_xxx
ELEVENLABS_API_KEY=el_xxx
```

### Vercel Configuration

```json
{
  "functions": {
    "app/api/voice/command/route.ts": {
      "maxDuration": 30
    },
    "app/api/webhooks/*/route.ts": {
      "maxDuration": 60
    }
  },
  "env": {
    "DATABASE_URL": "@database-url",
    "JWT_SECRET": "@jwt-secret"
  }
}
```

## Security Considerations

### Database Security
- **SSL/TLS**: All connections use SSL encryption
- **Connection Strings**: Store securely in Vercel environment variables
- **IP Allowlisting**: Configure NEON to accept connections only from Vercel

### API Security
- **JWT Authentication**: Stateless authentication for API routes
- **Rate Limiting**: Implement rate limiting on sensitive endpoints
- **CORS**: Configure appropriate CORS headers

### Webhook Security
- **Signature Verification**: Verify webhook signatures (Stripe, etc.)
- **Replay Protection**: Implement timestamp validation
- **Secure Endpoints**: Use unique, hard-to-guess webhook URLs

## Performance Optimization

### Database Optimization
1. **Connection Pooling**: Use NEON's serverless driver
2. **Query Optimization**: Use Prisma's query analysis
3. **Indexes**: Create appropriate database indexes
4. **Caching**: Implement Redis caching for frequently accessed data

### Vercel Optimization
1. **Edge Functions**: Use edge runtime where possible
2. **Static Generation**: Pre-render static pages
3. **Image Optimization**: Use next/image for automatic optimization
4. **Bundle Size**: Monitor and optimize JavaScript bundles

## Deployment Process

### Local Development
```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local

# Run migrations
npx prisma migrate dev

# Start development server
npm run dev
```

### Production Deployment
```bash
# Link to Vercel project
vercel link --project solarvoice-marketplace

# Add environment variables
vercel env add DATABASE_URL production

# Deploy to production
vercel --prod
```

### Database Migrations
```bash
# Create migration
npx prisma migrate dev --name add_feature

# Deploy migration
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate
```

## Monitoring and Debugging

### Application Monitoring
- **Vercel Analytics**: Built-in performance monitoring
- **Sentry**: Error tracking and performance monitoring
- **Custom Metrics**: Track business-specific metrics

### Database Monitoring
- **NEON Console**: Monitor queries and performance
- **Slow Query Log**: Identify performance bottlenecks
- **Connection Metrics**: Track connection pool usage

### Health Checks
```typescript
// app/api/health/route.ts
export async function GET() {
  const checks = {
    api: true,
    database: await checkDatabaseConnection(),
    timestamp: new Date().toISOString(),
  }
  
  return NextResponse.json({
    status: checks.database ? 'healthy' : 'unhealthy',
    checks,
  })
}
```

## Troubleshooting

### Common Issues

1. **Connection Timeouts**
   - Check NEON connection limits
   - Verify connection pool settings
   - Ensure proper SSL configuration

2. **Cold Start Latency**
   - Use edge functions for critical paths
   - Implement connection warming
   - Optimize bundle size

3. **Migration Failures**
   - Check database permissions
   - Verify migration compatibility
   - Use shadow database for testing

### Debug Commands
```bash
# Test database connection
npx prisma db pull

# Verify environment variables
vercel env ls

# Check deployment logs
vercel logs

# Monitor function performance
vercel inspect
```

## Best Practices

1. **Use Connection Pooling**: Always use the NEON serverless driver
2. **Implement Retry Logic**: Handle transient connection failures
3. **Monitor Performance**: Set up alerts for slow queries
4. **Version Control**: Track all schema changes in Git
5. **Test Migrations**: Always test migrations in a branch first
6. **Secure Secrets**: Never commit credentials to version control
7. **Optimize Queries**: Use Prisma's query optimization features
8. **Cache Strategically**: Cache expensive queries appropriately

## Migration from Other Platforms

When migrating from platforms like Cloudflare Workers:
1. Update connection strings to use NEON
2. Replace KV storage with PostgreSQL tables or Redis
3. Update authentication to use JWT instead of platform-specific auth
4. Migrate webhook handlers to Next.js API routes
5. Update deployment scripts for Vercel CLI

## Resources

- [NEON Documentation](https://neon.tech/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)