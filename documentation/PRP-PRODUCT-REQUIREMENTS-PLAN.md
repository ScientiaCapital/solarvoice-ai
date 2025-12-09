# SolarVoice AI - Product Requirements Plan (PRP)

**Version:** 1.0
**Date:** December 9, 2025
**Status:** Foundation Stabilization Phase

---

## Executive Summary

SolarVoice AI is a voice-first AI platform for solar contractors. This PRP establishes the roadmap for stabilizing the foundation and reaching revenue-ready MVP.

**Current State:** ~20% complete
**Target State:** Revenue-ready MVP with rock-solid foundation

---

## 1. Product Vision

### 1.1 Value Proposition
AI-powered voice assistants for solar professionals via equipment rental model (pay-per-use, no contracts).

### 1.2 Target Users
| Segment | Description | Priority |
|---------|-------------|----------|
| Solar Contractors | Small-medium installation companies | P0 |
| Commercial Project Managers | 50kW-2MW installations | P0 |
| Solar Sales Teams | Lead qualification & proposals | P1 |
| Utility-Scale Coordinators | 10MW+ projects | P2 |

### 1.3 Tech Stack (Confirmed)
| Component | Service | Status |
|-----------|---------|--------|
| Frontend | Next.js 15 / React 19 | ✅ Built |
| Database | **Supabase** | ✅ Set up |
| Hosting | **Vercel** | ✅ Configured |
| Domain | **GoDaddy** | ✅ Owned |
| Voice TTS | ElevenLabs | ✅ Integrated |
| Voice Recognition | Web Speech API | ✅ Integrated |
| LLM | Anthropic Claude | ❌ Not integrated |
| Payments | Stripe | 🟡 Partial |

---

## 2. Foundation Stabilization (Phase 0)

**Goal:** Get codebase to 100% stable before adding features

### 2.1 Critical Fixes
| Task | Priority | Status |
|------|----------|--------|
| Fix TypeScript compilation errors | P0 | ❌ |
| Ensure `npm run build` passes | P0 | ❌ |
| Update Prisma to use Supabase connection | P0 | 🟡 |
| Create proper `.env.example` | P0 | ❌ |
| Remove dead/aspirational code | P1 | ❌ |
| Update CLAUDE.md to reflect reality | P1 | ❌ |

### 2.2 Database Migration (Prisma → Supabase)
| Task | Priority | Status |
|------|----------|--------|
| Update DATABASE_URL to Supabase | P0 | TBD |
| Run Prisma migrations on Supabase | P0 | TBD |
| Verify connection pooling works | P0 | TBD |
| Seed test data | P1 | ❌ |

### 2.3 Cleanup
| Task | Priority | Status |
|------|----------|--------|
| Remove empty `/solarvoice-platform/` directory | P1 | ❌ |
| Remove empty `/ultra-elite-test/` directory | P1 | ❌ |
| Remove MCP server references | P1 | ❌ |
| Clean up unused shared modules | P2 | ❌ |

---

## 3. MVP Feature Requirements

### Phase 1: Core Voice (Stabilize What Exists)
| Feature | Status | Action Needed |
|---------|--------|---------------|
| ElevenLabs TTS | ✅ Working | Verify in production |
| Web Speech Recognition | ✅ Working | Test cross-browser |
| 8 Agent Templates | ✅ Defined | Add real AI responses |
| Voice Test Interface | ✅ Built | Polish UX |
| Bilingual (EN/ES) | ✅ Built | Test thoroughly |

### Phase 2: AI Intelligence (Critical Gap)
| Feature | Status | Action Needed |
|---------|--------|---------------|
| Claude API Integration | ❌ Missing | Implement |
| Agent System Prompts | ❌ Missing | Write prompts |
| Conversation Context | ❌ Missing | Build state management |
| Response Streaming | ❌ Missing | Add for UX |

### Phase 3: User System (Critical Gap)
| Feature | Status | Action Needed |
|---------|--------|---------------|
| Registration | 🟡 API exists | Enable & test |
| Login (JWT) | 🟡 API exists | Enable & test |
| Password Reset | ❌ Missing | Build with Supabase Auth |
| User Dashboard | 🟡 Partial | Complete |

### Phase 4: Payments (Critical Gap)
| Feature | Status | Action Needed |
|---------|--------|---------------|
| Stripe Checkout | ❌ Missing | Implement |
| Subscription Plans | ❌ Missing | Configure in Stripe |
| Usage Metering | ❌ Missing | Track voice minutes |
| Billing Portal | ❌ Missing | Use Stripe Customer Portal |

---

## 4. Success Criteria

### Phase 0 Complete When:
- [ ] `npm run build` = zero errors
- [ ] `npm run dev` starts cleanly
- [ ] Database connected to Supabase
- [ ] All env vars documented
- [ ] No dead code/empty directories

### MVP Complete When:
- [ ] User can register/login
- [ ] User can talk to AI agent
- [ ] Agent responds with real AI (not templates)
- [ ] User can pay for subscription
- [ ] Voice minutes are tracked

### Revenue Ready When:
- [ ] First paying customer
- [ ] Stripe webhooks working
- [ ] Error monitoring active
- [ ] Basic analytics in place

---

## 5. Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
DATABASE_URL=          # Supabase Postgres connection string

# Authentication
JWT_SECRET=
JWT_REFRESH_SECRET=

# Voice
ELEVENLABS_API_KEY=

# AI (TO ADD)
ANTHROPIC_API_KEY=

# Payments
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# Deployment
NEXT_PUBLIC_APP_URL=   # Your GoDaddy domain
```

---

## 6. Risk Mitigation

| Risk | Mitigation |
|------|------------|
| LLM costs spike | Implement usage caps per user |
| Voice recognition poor | Provide text input fallback |
| Supabase limits hit | Monitor usage, upgrade plan |
| Slow user adoption | Focus on one contractor, get testimonial |

---

## 7. Go/No-Go Checklist

### Before Phase 1 (Voice):
- [ ] Build passes
- [ ] Supabase connected
- [ ] ElevenLabs key in Vercel env

### Before Phase 2 (AI):
- [ ] Claude API key obtained
- [ ] Basic rate limiting in place

### Before Phase 3 (Users):
- [ ] Auth flow tested end-to-end
- [ ] Password reset works

### Before Phase 4 (Payments):
- [ ] Stripe account verified
- [ ] Test mode payments working
- [ ] Webhook endpoint deployed

---

*Document maintained as single source of truth for product requirements.*
