# SolarVoice AI - Project Context

**Last Updated**: 2025-12-13
**Current Branch**: main
**Repository**: https://github.com/ScientiaCapital/solarvoice-ai

---

## Deployment Status

| Environment | URL | Status |
|-------------|-----|--------|
| Production | https://solarvoice-ai.vercel.app | LIVE |
| Preview | https://solarvoice-ai-scientia-capital.vercel.app | LIVE |
| Local Dev | http://localhost:3000 | Ready |

---

## Current Status

| Area | Status | Notes |
|------|--------|-------|
| Vercel Deployment | LIVE | Production deployed 2025-12-09 |
| TypeScript Compilation | 0 Errors | Clean! |
| Build | PASSING | Production build succeeds |
| Database | Not Connected | User to configure DATABASE_URL in .env |
| Authentication | Custom JWT | Uses lib/auth.ts, not next-auth |
| Voice Services | voice-ai-core | NEW: lib/voice/ template (86 tests) |
| Payments | Partial | NEW: /billing pages + checkout API |
| AI Integration | Anthropic Only | NO OPENAI |

---

## Done (Session 2025-12-13)

### Wave 1: Voice Integration Template - COMPLETE
- Created `lib/voice/` universal template for voice-ai-core integration
- `types.ts` - TypeScript interfaces with type guards (28 tests)
- `client.ts` - VoiceClient HTTP client for TTS/STT services (46 tests)
- `config.ts` - Environment configuration
- `hooks/useVoice.ts` - TTS playback with Web Audio API
- `hooks/useSpeechRecognition.ts` - STT with Web Speech API
- `components/VoiceButton.tsx` - Push-to-talk component (12 tests)
- Fixed TypeScript strict mode errors (`exactOptionalPropertyTypes`)

### Billing Migration (FieldVault Pattern) - COMPLETE
- Created `/billing` page with usage metrics, transaction history
- Created `/billing/plans` comparison page with 3 tiers
- Created `/api/billing/create-checkout` Stripe session endpoint
- Updated sidebar navigation with billing links

### Security & Quality
- Secrets scan: PASSED (no hardcoded keys)
- Dependency audit: PASSED (0 vulnerabilities)
- Next.js updated to 15.5.9 (security patches)
- Tests: 86/86 voice tests passing

---

## Next Session Focus

1. [ ] Wave 2: Create Supabase database schema
2. [ ] Wave 3: Migrate dashboard pages from Vozlux
3. [ ] Wave 4: API routes + Twilio integration
4. [ ] Set up voice-ai-core as separate GitHub repo
5. [ ] Deploy voice-ai-core Python services (Docker)

---

## Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Frontend | Next.js + React | 15.5.9 / 19.0 |
| Styling | Tailwind CSS | 4.0 |
| State | Zustand | Latest |
| ORM | Prisma | 6.13 |
| Database | Supabase PostgreSQL | - |
| Voice TTS | voice-ai-core (Cartesia) | Port 8001 |
| Voice STT | voice-ai-core (Deepgram) | Port 8002 |
| AI | Anthropic Claude | **ONLY** |
| Payments | Stripe | 18.4 |
| Deployment | Vercel | - |

---

## Quick Commands

```bash
# Development
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build
npm run lint         # Run ESLint

# Prisma
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema changes
npx prisma studio    # Visual database editor

# Testing
npm test             # Run Jest tests
```

---

## Key Directories

```
vercel-deployments/solarvoice/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── agents/        # Agent management
│   │   ├── auth/          # Authentication
│   │   ├── voice/         # Voice commands, TTS, STT
│   │   └── webhooks/      # Stripe webhooks
│   ├── dashboard/         # Dashboard pages
│   │   └── billing/       # NEW: Billing dashboard
│   └── pricing/           # Pricing page
├── components/            # React components
│   ├── billing/          # NEW: Billing components
│   ├── common/           # NEW: Footer, etc.
│   ├── landing/          # NEW: Hero, Features, HowItWorks, FAQ
│   ├── layouts/          # NEW: SidebarLayout, DashboardHeader
│   └── ui/               # Shared UI components (shadcn)
├── lib/                   # Utilities
│   ├── animations.ts     # NEW: Framer Motion presets
│   ├── auth.ts           # JWT authentication
│   ├── db.ts             # Prisma client
│   └── stores/           # Zustand stores
├── prisma/               # Database schema
└── types/                # TypeScript types
```

---

## Session Notes

### 2025-12-09 - Website Sprint Complete

**Completed Phases:**
1. ✅ Design System Foundation (blue theme, Space Grotesk font, shadows)
2. ✅ Landing Page Components (Hero, Features, HowItWorks, FAQ, Footer)
3. ✅ Dashboard Redesign (SidebarLayout, DashboardHeader)
4. ✅ Billing/Pricing UI (3-tier pricing, billing dashboard)
5. ✅ Final Polish (lib/animations.ts with Framer Motion presets)

**New Files Created:**
- `components/landing/Hero.tsx`
- `components/landing/Features.tsx`
- `components/landing/HowItWorks.tsx`
- `components/landing/FAQ.tsx`
- `components/common/Footer.tsx`
- `components/layouts/SidebarLayout.tsx`
- `components/layouts/DashboardHeader.tsx`
- `components/billing/UsageCard.tsx`
- `components/billing/BillingHistoryTable.tsx`
- `app/dashboard/billing/page.tsx`
- `lib/animations.ts`
- Multiple shadcn UI components (accordion, avatar, dialog, etc.)

**Modified Files:**
- `app/page.tsx` - Complete rewrite with modern SaaS landing
- `app/pricing/page.tsx` - Simplified to 3-tier pricing
- `app/dashboard/layout.tsx` - Uses new SidebarLayout
- `app/globals.css` - Blue theme CSS variables
- `tailwind.config.ts` - Blue primary, shadows, fonts
- `app/layout.tsx` - Added Space Grotesk font

**Security Audit Results:**
- Secrets: 0 hardcoded (PASS)
- .env tracked: 0 files (PASS)
- CVEs: 0 critical, 4 high (playwright, jws - dev deps)
- API Auth: Some routes lack explicit auth (acceptable for MVP)
- Build: PASSING

**Deployment Notes:**
- Upgraded Next.js 15.3.5 → 15.4.8 to fix CVE-2025-66478
- Kept React 18.3.1 (not 19) for Radix UI compatibility
- Production deployed to solarvoice-ai.vercel.app

**Known Issues:**
- ~~48 TypeScript errors~~ → **FIXED** (0 errors)
- ~~Jest test suite has polyfill configuration issue~~ → **FIXED**

### 2025-12-09 - Cleanup Sprint Complete

**Completed Tasks:**
1. ✅ TypeScript errors: 48 → 0 (already fixed from previous session)
2. ✅ ElevenLabs REMOVED completely (user not using)
3. ✅ solarvoice-platform directory deleted (was empty/abandoned submodule)
4. ✅ Jest polyfills fixed (TextEncoder, excluded e2e tests)
5. ✅ Security audit passed

**Commit:** `52fbca2` "chore: Remove ElevenLabs and clean up project"

---

### 2025-12-09 - Agent Marketplace Sprint Complete

**Completed Tasks:**
1. ✅ Created 19 MEP+Energy agent type definitions (`lib/agent-types.ts`)
2. ✅ Created Stripe pricing config (`lib/stripe-config.ts`)
3. ✅ Created prompt loader for markdown parsing (`lib/prompt-loader.ts`)
4. ✅ Created MetricsCard component (`components/ui/metrics-card.tsx`)
5. ✅ Created AgentMarketplaceCard component (`components/agents/AgentMarketplaceCard.tsx`)
6. ✅ Created TradeFilter component (`components/agents/TradeFilter.tsx`)
7. ✅ Created API routes: `/api/agents/catalog`, `/api/marketplace`, `/api/checkout`
8. ✅ Created Marketplace page (`app/agents/page.tsx`)
9. ✅ Created Agent detail page (`app/agents/[slug]/page.tsx`)
10. ✅ Created Checkout success page (`app/checkout/success/page.tsx`)
11. ✅ Updated Dashboard with MetricsCard components

**New Files Created:**
- `lib/agent-types.ts` - 19 agent configs (Solar, HVAC, Plumbing, Electrical, Roofing, Low Voltage)
- `lib/stripe-config.ts` - PLANS (Starter $149, Pro $299, Enterprise $499)
- `lib/prompt-loader.ts` - Server-side markdown prompt parsing
- `components/ui/metrics-card.tsx` - FieldVault-style metrics display
- `components/agents/AgentMarketplaceCard.tsx` - Marketplace card with rent CTA
- `components/agents/TradeFilter.tsx` - Trade/scale filter pills
- `app/api/agents/catalog/route.ts` - GET all 19 agents with filtering
- `app/api/marketplace/route.ts` - GET single agent + prompt data
- `app/api/checkout/route.ts` - Stripe checkout session creation
- `app/agents/page.tsx` - Marketplace grid with search/filters
- `app/agents/[slug]/page.tsx` - Agent detail with prompt preview + purchase
- `app/checkout/success/page.tsx` - Post-payment success page

**Modified Files:**
- `app/dashboard/page.tsx` - MetricsCard with voice agent metrics

**Security Audit Results (2025-12-09 Night):**
- Hardcoded secrets: 0 (PASS)
- Critical CVEs: 0 for solarvoice (PASS) - Next.js 15.4.8 patched
- API input validation: PASS (trade/scale filter validation, slug validation)
- Stripe lazy init: PASS (no build-time API key errors)
- Build: PASSING

**19 Agents Listed:**
| Trade | Agents | Price Range |
|-------|--------|-------------|
| Solar | residential, commercial, industrial, utility | $99-$199 |
| HVAC | residential, commercial, industrial | $99-$149 |
| Plumbing | residential, commercial, industrial | $99-$149 |
| Electrical | residential, commercial, industrial, utility | $99-$199 |
| Roofing | residential, commercial | $99-$129 |
| Low Voltage | security-alarm, structured-cabling, fire-alarm | $99-$129 |

---

### 2025-12-10 - Major Repository Cleanup

**Completed Tasks:**
1. ✅ Removed all netzero* apps (separate projects - not part of solarvoice-ai)
2. ✅ Removed shared/ directory (caused 700+ TS errors, unused)
3. ✅ Removed ultra-elite-test/, _archive/, documentation/, scripts/, team/, security/
4. ✅ Simplified to single workspace (solarvoice only)
5. ✅ IP Protection: Added comprehensive .gitignore rules for prompts, emotions, voice services
6. ✅ Reduced vulnerabilities: 6 → 0

**Commits:**
- `3682fcb` - feat: Add 19-agent marketplace with Stripe checkout
- `820f5f1` - chore: Major cleanup - remove unused directories and protect IP
- `23d4569` - docs: Update PROJECT_CONTEXT.md with cleanup sprint results

**Final Repository Structure:**
```
solarvoice-ai/
├── .claude/
├── .github/
├── .husky/
├── prompts-import/     (gitignored - IP)
├── vercel-deployments/
│   └── solarvoice/     (single app)
├── package.json        (single workspace)
└── .gitignore          (IP protection)
```

**Security Audit (Night):**
- Hardcoded secrets: 0 (PASS)
- Tracked .env files: 0 (PASS)
- Critical CVEs: 0 (PASS)
- IP Protected: prompts, emotions, voice services (PASS)
- Build: PASSING

---

## Tomorrow's Focus

1. [ ] Connect Supabase database (add credentials to .env)
2. [ ] Test Stripe checkout flow end-to-end with test keys
3. [ ] Fix Jest test failures (component mocking - Framer Motion, Next.js)
4. [ ] Create webhook handler for checkout.session.completed
5. [ ] Install missing eslint-plugin-jsdoc for lint command

---

## Environment Variables Required

```env
# Database (Required)
DATABASE_URL=postgresql://...

# Authentication
JWT_SECRET=your-secret-key

# AI (Required - NO OPENAI)
ANTHROPIC_API_KEY=your-anthropic-key

# Voice (Browser TTS - no API key needed)

# Payments
STRIPE_SECRET_KEY=your-stripe-key
STRIPE_WEBHOOK_SECRET=your-webhook-secret

# Supabase
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-anon-key
```
