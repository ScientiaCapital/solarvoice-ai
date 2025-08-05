#!/bin/bash

# NEON Development Migration Script
# Creates new migrations against NEON - NO LOCAL DATABASES

echo "🚀 SolarVoice AI - NEON Development Migration"
echo "============================================="

# Ensure we're using NEON database URL
if [[ ! "$DATABASE_URL" =~ "neon.tech" ]]; then
    echo "❌ ERROR: DATABASE_URL must point to NEON database"
    echo "Current URL: $DATABASE_URL"
    exit 1
fi

# Check for migration name
if [ -z "$1" ]; then
    echo "❌ ERROR: Please provide a migration name"
    echo "Usage: ./scripts/neon-dev-migrate.sh <migration_name>"
    exit 1
fi

MIGRATION_NAME=$1

# Generate Prisma Client
echo "📦 Generating Prisma Client..."
npx prisma generate

# Create new migration
echo "🔄 Creating new migration: $MIGRATION_NAME"
npx prisma migrate dev --name "$MIGRATION_NAME"

# Show migration status
echo "✅ Migration Status:"
npx prisma migrate status

echo "✨ NEON migration '$MIGRATION_NAME' created successfully!"