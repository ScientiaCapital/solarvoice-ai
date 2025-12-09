# SolarVoice AI - Project Context

**Last Updated**: 2025-12-09
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
| TypeScript Compilation | 48 Errors | Pre-existing from MVP phase |
| Build | PASSING | Production build succeeds |
| Database | Not Connected | User to configure DATABASE_URL in .env |
| Authentication | Custom JWT | Uses lib/auth.ts, not next-auth |
| Voice Services | Ready | ElevenLabs integration in place |
| Payments | Partial | Stripe SDK installed, routes need schema alignment |
| AI Integration | Anthropic Only | NO OPENAI |

---

## Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Frontend | Next.js + React | 15.4.8 / 18.3.1 |
| Styling | Tailwind CSS | 3.4.10 |
| State | Zustand | Latest |
| ORM | Prisma | 6.13 |
| Database | Supabase PostgreSQL | - |
| Voice TTS | ElevenLabs | - |
| Voice STT | Web Speech API | - |
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
- 48 TypeScript errors (pre-existing, not from this sprint)
- Jest test suite has polyfill configuration issue

---

## Tomorrow's Focus

1. [ ] Fix 48 TypeScript errors (target: 0 errors) - See plan file
2. [ ] Evaluate solarvoice-platform repo for salvageable code
3. [ ] Connect database (Supabase)
4. [ ] Fix Jest polyfill configuration

---

## Environment Variables Required

```env
# Database (Required)
DATABASE_URL=postgresql://...

# Authentication
JWT_SECRET=your-secret-key

# AI (Required - NO OPENAI)
ANTHROPIC_API_KEY=your-anthropic-key

# Voice
ELEVENLABS_API_KEY=your-elevenlabs-key

# Payments
STRIPE_SECRET_KEY=your-stripe-key
STRIPE_WEBHOOK_SECRET=your-webhook-secret

# Supabase
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-anon-key
```
