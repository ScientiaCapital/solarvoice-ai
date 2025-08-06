#!/bin/bash

# SolarVoice.ai Database Migration Script
# Migrates to the new voice-first equipment rental schema

echo "🚀 SolarVoice.ai Database Migration"
echo "===================================="
echo "Migrating to voice-first equipment rental schema for solar contractors"
echo ""

# Check for environment variables
if [ -z "$DATABASE_URL" ]; then
    echo "❌ Error: DATABASE_URL not set"
    echo "Please set DATABASE_URL environment variable"
    exit 1
fi

# Navigate to the project directory
cd /Users/tmkipper/repos/solarvoice_ai/vercel-deployments/solarvoice

# Backup current schema
echo "📦 Backing up current schema..."
cp prisma/schema.prisma prisma/schema.backup.$(date +%Y%m%d_%H%M%S).prisma

# Replace schema with new SolarVoice schema
echo "📝 Updating schema to SolarVoice.ai schema..."
cp prisma/schema-solarvoice.prisma prisma/schema.prisma

# Generate Prisma Client
echo "🔧 Generating Prisma Client..."
npx prisma generate

# Create migration
echo "🏗️ Creating migration..."
npx prisma migrate dev --name solarvoice_voice_first_platform --create-only

# Review migration
echo ""
echo "📋 Migration created. Review the SQL before applying:"
echo "Location: prisma/migrations/[timestamp]_solarvoice_voice_first_platform/migration.sql"
echo ""
read -p "Do you want to apply this migration? (y/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]
then
    # Apply migration
    echo "⚡ Applying migration to database..."
    npx prisma migrate deploy
    
    # Seed initial data
    echo "🌱 Seeding initial equipment models..."
    npx ts-node scripts/seed-equipment-models.ts
    
    echo ""
    echo "✅ Migration complete!"
    echo ""
    echo "Next steps:"
    echo "1. Update API routes to use new schema"
    echo "2. Configure ElevenLabs voice IDs for each model"
    echo "3. Add knowledge base content for each equipment model"
    echo "4. Test voice commands in both English and Spanish"
else
    echo "❌ Migration cancelled"
    echo "To apply later, run: npx prisma migrate deploy"
fi