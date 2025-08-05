#!/bin/bash

# NEON Database Migration Script
# Uses NEON for all database operations - NO LOCAL DATABASES

echo "🚀 SolarVoice AI - NEON Database Migration"
echo "==========================================="

# Ensure we're using NEON database URL
if [[ ! "$DATABASE_URL" =~ "neon.tech" ]]; then
    echo "❌ ERROR: DATABASE_URL must point to NEON database"
    echo "Current URL: $DATABASE_URL"
    exit 1
fi

# Generate Prisma Client
echo "📦 Generating Prisma Client..."
npx prisma generate

# Run migrations
echo "🔄 Running database migrations on NEON..."
npx prisma migrate deploy

# Show migration status
echo "✅ Migration Status:"
npx prisma migrate status

echo "✨ NEON database migration complete!"