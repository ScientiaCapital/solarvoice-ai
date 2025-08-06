# SolarVoice.ai Production Migration Guide

## Overview
This guide documents the migration from the generic AI agent marketplace to the professional equipment rental model for solar and multi-trade contractors.

## Security Improvements Completed ✅
1. **Removed exposed API key**: `NEXT_PUBLIC_ELEVENLABS_API_KEY` has been removed from Vercel
2. **Created secure API routes**: `/api/voice/synthesize` and `/api/voice/transcribe` 
3. **Updated client code**: All voice operations now use secure server-side endpoints
4. **Environment variable renamed**: Now using `ELEVENLABS_API_KEY` (server-only)

## Database Migration Status

### Test Branch Created ✅
- **Project ID**: `old-night-65012604` 
- **Branch Name**: `equipment-rental-test`
- **Branch ID**: `br-jolly-water-aeaes7jh`
- **Endpoint**: `ep-shy-rice-aespbp16.c-2.us-east-2.aws.neon.tech`
- **Status**: Schema applied and data seeded successfully

### New Schema Features
- **8 Equipment Models** seeded (CPM-24, WHE-24, SRC-24, etc.)
- **Bilingual Support**: English and Spanish voice commands
- **Multi-Trade Categories**: Solar-only, Solar+Roof, Solar+HVAC, Electrical+Solar+Battery
- **Voice Personalities**: Each model has unique ElevenLabs voice IDs
- **Rental Pricing**: Hourly ($2.99-9.99), Daily, Weekly, Monthly rates

## Production Migration Steps

### Step 1: Backup Production Database
```bash
# Create a backup branch before migration
neon branch create --project-id old-night-65012604 --name production-backup-$(date +%Y%m%d)
```

### Step 2: Apply Schema to Production
```bash
# Set production connection
export DATABASE_URL="postgresql://neondb_owner:npg_XDtQsf9SwV8K@ep-royal-tooth-aeb7p4y8.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require"
export DIRECT_DATABASE_URL=$DATABASE_URL

# Apply migration
npx prisma migrate deploy
```

### Step 3: Seed Equipment Models
```bash
# Run seed script on production
DATABASE_URL=$PRODUCTION_URL npx tsx scripts/seed-equipment-models.ts
```

### Step 4: Verify Deployment
```bash
# Test voice endpoints
curl -X GET https://solarvoice.ai/api/voice/synthesize

# Verify equipment models
psql $DATABASE_URL -c 'SELECT COUNT(*) FROM "EquipmentModel";'
```

## Environment Variables Required

### Vercel Production Settings
- ✅ `ELEVENLABS_API_KEY` - Server-side only (already set)
- ❌ ~~`NEXT_PUBLIC_ELEVENLABS_API_KEY`~~ - REMOVED for security
- ✅ `DATABASE_URL` - PostgreSQL pooled connection
- ✅ `DIRECT_DATABASE_URL` - Direct connection for migrations

## Voice System Architecture

### Secure API Routes
- `/api/voice/synthesize` - Text-to-speech (server-side)
- `/api/voice/transcribe` - Speech-to-text (server-side)

### Client Service
- `lib/services/elevenlabs.ts` - Uses secure endpoints only
- No direct API key exposure to browser
- Fallback to browser TTS if ElevenLabs unavailable

## Testing Checklist

### Pre-Production Testing ✅
- [x] Test branch created and schema applied
- [x] Equipment models seeded (8 models)
- [x] Voice API endpoints functional
- [x] Security: API key not exposed to client
- [x] Bilingual voice commands working

### Production Deployment
- [ ] Backup production database
- [ ] Apply schema migration
- [ ] Seed equipment models
- [ ] Test voice features
- [ ] Verify rental functionality
- [ ] Monitor error logs

## Rollback Plan

If issues occur during production migration:

1. **Switch to backup branch**:
```bash
neon branch set-default --project-id old-night-65012604 --branch production-backup-[date]
```

2. **Revert environment variables** in Vercel if needed

3. **Deploy previous version**:
```bash
vercel rollback
```

## Support Contacts

- **Database Issues**: Check Neon dashboard at console.neon.tech
- **Voice API Issues**: Check ElevenLabs dashboard
- **Deployment Issues**: Check Vercel deployment logs

## Migration Timeline

- ✅ **Phase 1**: Security improvements (COMPLETED)
- ✅ **Phase 2**: Test environment setup (COMPLETED)
- 🔄 **Phase 3**: Production migration (READY TO EXECUTE)
- ⏳ **Phase 4**: Monitor and optimize

## Notes

- The test branch `equipment-rental-test` is fully functional and can be used for testing
- All voice operations now go through secure server-side endpoints
- The equipment rental model is ready for production deployment
- Spanish/English bilingual support is fully implemented