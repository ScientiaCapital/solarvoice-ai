# SolarVoice AI - Product Requirements Document (PRD)

**Version:** 1.0
**Date:** December 9, 2025
**Status:** Foundation Phase

---

## 1. Product Overview

### 1.1 Problem Statement
Solar contractors need hands-free, intelligent assistance while working in the field. Current solutions require stopping work to use phones/tablets, don't understand solar industry terminology, and lack integration with their workflows.

### 1.2 Solution
Voice-first AI agents specialized for solar construction, available on-demand through an equipment rental model familiar to the industry.

### 1.3 Product Goals
1. **Foundation:** Stable, deployable codebase with zero errors
2. **MVP:** Working voice agents with real AI intelligence
3. **Revenue:** Paid subscriptions via Stripe
4. **Growth:** Multi-agent marketplace

---

## 2. User Personas

### 2.1 Primary: Field Installer - "Mike"
- **Role:** Solar installation technician
- **Pain Points:** Hands full, needs quick answers about wiring, specs, codes
- **Needs:** Voice-activated lookup, bilingual support
- **Usage:** 10-20 voice queries per day on job site

### 2.2 Secondary: Project Manager - "Sarah"
- **Role:** Commercial project manager
- **Pain Points:** Juggling multiple projects, tracking progress, client updates
- **Needs:** Project status, scheduling, ROI calculations
- **Usage:** 5-10 voice queries per day, mostly office-based

### 2.3 Tertiary: Business Owner - "Carlos"
- **Role:** Solar company owner (5-20 employees)
- **Pain Points:** Quoting jobs, managing leads, tracking profitability
- **Needs:** Sales support, lead qualification, proposal generation
- **Usage:** Irregular, high-value interactions

---

## 3. Feature Specifications

### 3.1 Voice System

#### 3.1.1 Speech-to-Text (Input)
**Current:** Web Speech API (browser-native)
**Status:** ✅ Implemented

| Requirement | Specification |
|-------------|---------------|
| Languages | English (en-US), Spanish (es-ES) |
| Accuracy Target | > 90% for solar terminology |
| Max Input Duration | 30 seconds per utterance |
| Fallback | Text input field |

**User Flow:**
1. User clicks microphone button
2. Browser requests mic permission (first time)
3. User speaks command
4. Transcript appears in real-time
5. On silence/completion, command is processed

#### 3.1.2 Text-to-Speech (Output)
**Current:** ElevenLabs API (server-side)
**Status:** ✅ Implemented

| Requirement | Specification |
|-------------|---------------|
| Voices | 5 unique agent voices |
| Languages | English (eleven_monolingual_v1), Spanish (eleven_multilingual_v2) |
| Latency Target | < 2 seconds to first audio |
| Quality | Professional, natural-sounding |

**Voice Mapping:**
| Agent | Voice ID | Personality |
|-------|----------|-------------|
| Commercial Manager | pNInz6obpgDQGcFmaJgB (Adam) | Professional, authoritative |
| Customer Success | EXAVITQu4vr4xnSDxMaL (Bella) | Warm, helpful |
| Performance Analyst | VR6AewLTigWG4xSOukaG (Arnold) | Technical, precise |
| Sales Specialist | ErXwobaYiN019PkySvjV (Antoni) | Energetic, persuasive |
| Utility Coordinator | MF3mGyEYCl7XYWbV9V6O (Elli) | Calm, methodical |

#### 3.1.3 Voice Command Processing
**Current:** Template responses (hardcoded)
**Status:** ❌ Needs LLM integration

**Required Flow:**
```
User Speech → Web Speech API → Transcript
     ↓
Claude API (with agent system prompt)
     ↓
AI Response Text → ElevenLabs TTS → Audio Playback
```

---

### 3.2 AI Agent System

#### 3.2.1 Agent Architecture
**Status:** ❌ Not implemented (critical gap)

Each agent requires:
```typescript
interface Agent {
  id: string;
  name: string;
  systemPrompt: string;      // Defines personality & knowledge
  voiceId: string;           // ElevenLabs voice
  capabilities: string[];    // What it can do
  knowledgeBase?: string[];  // RAG documents (future)
}
```

#### 3.2.2 Agent System Prompts (To Create)

**Commercial Manager:**
```
You are a Commercial Solar Project Manager AI assistant. You specialize in:
- Managing solar installations from 50kW to 2MW
- Permit requirements and timelines
- ROI calculations and financial modeling
- Vendor and subcontractor coordination
- Project scheduling and milestone tracking

Speak professionally but accessibly. Give concise answers suitable for
voice output (2-3 sentences max unless asked for detail).
```

**Customer Success Specialist:**
```
You are a Customer Success AI for a solar installation company. You help with:
- Post-installation support and troubleshooting
- System performance questions
- Warranty and maintenance inquiries
- Customer satisfaction follow-ups
- Referral program information

Be warm, empathetic, and solution-focused. Keep responses brief for voice.
```

*(Similar prompts needed for all 8 agents)*

#### 3.2.3 Conversation Context
**Status:** ❌ Not implemented

Requirements:
- Maintain conversation history within session
- Pass last 5-10 messages as context to Claude
- Store conversation in Supabase for analytics
- Clear context on session end or user request

---

### 3.3 User Management

#### 3.3.1 Registration
**Status:** 🟡 API exists, disabled

**Fields:**
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| email | string | Yes | Valid email format |
| password | string | Yes | Min 8 chars, 1 number |
| companyName | string | No | Max 100 chars |
| phoneNumber | string | No | Valid phone format |
| preferredLanguage | enum | No | 'en' or 'es', default 'en' |

**Flow:**
1. User fills registration form
2. API validates input (Zod schema)
3. Password hashed (bcrypt)
4. User created in Supabase
5. JWT tokens issued
6. Redirect to dashboard

#### 3.3.2 Authentication
**Status:** 🟡 API exists, disabled

**Method:** JWT with refresh tokens
| Token | Expiry | Storage |
|-------|--------|---------|
| Access Token | 15 minutes | Memory/Cookie |
| Refresh Token | 7 days | HttpOnly Cookie |

**Alternative:** Consider using Supabase Auth (simpler)

#### 3.3.3 User Dashboard
**Status:** 🟡 Partial

**Required Components:**
- [ ] Usage statistics (voice minutes used)
- [ ] Active subscription status
- [ ] Agent access/favorites
- [ ] Conversation history
- [ ] Account settings

---

### 3.4 Payment System

#### 3.4.1 Pricing Tiers
**Status:** ❌ Defined but not implemented

| Plan | Monthly Price | Voice Minutes | Agents | Features |
|------|---------------|---------------|--------|----------|
| Starter | $99 | 500 min | 3 | Basic agents |
| Professional | $299 | 2,000 min | All 8 | Priority support |
| Enterprise | $999 | Unlimited | All + Custom | Dedicated success manager |

#### 3.4.2 Stripe Integration
**Status:** 🟡 Webhook exists, checkout missing

**Required:**
1. **Checkout Session** - Create subscription checkout
2. **Customer Portal** - Manage subscription
3. **Webhook Handler** - Process events
4. **Usage Metering** - Track voice minutes

**Webhook Events to Handle:**
- `checkout.session.completed` - New subscription
- `customer.subscription.updated` - Plan change
- `customer.subscription.deleted` - Cancellation
- `invoice.payment_failed` - Payment failure

#### 3.4.3 Usage Tracking
**Status:** ❌ Not implemented

Track per user:
- Voice minutes consumed (TTS character count → minutes)
- Number of conversations
- Agents used
- Peak usage times

---

### 3.5 Pre-Built Agents (Equipment Models)

#### 3.5.1 Agent Catalog
**Status:** ✅ Defined in UI

| ID | Name | Category | Use Case |
|----|------|----------|----------|
| commercial-manager | Commercial Manager | Commercial | Large project management |
| customer-success | Customer Success | Support | Post-install support |
| performance-analyst | Performance Analyst | Analytics | System optimization |
| sales-specialist | Sales Specialist | Sales | Lead conversion |
| utility-coordinator | Utility Coordinator | Utility | Grid interconnection |
| residential-advisor | Residential Advisor | Residential | Home solar |
| battery-specialist | Battery Specialist | Storage | Energy storage |
| compliance-officer | Compliance Officer | Compliance | Code compliance |

#### 3.5.2 Equipment Rental Pricing
**Status:** ✅ Displayed in UI (not enforced)

| Duration | Price Range |
|----------|-------------|
| Hourly | $3.99 - $5.99 |
| Daily | $79 - $119 |
| Weekly | $399 - $599 |
| Monthly | $1,199 - $1,799 |

---

## 4. Technical Requirements

### 4.1 Performance
| Metric | Target |
|--------|--------|
| Page Load (LCP) | < 2.5s |
| Voice Response Latency | < 3s |
| API Response Time | < 500ms |
| Uptime | 99.5% |

### 4.2 Security
| Requirement | Implementation |
|-------------|----------------|
| API Keys | Server-side only, never exposed |
| Authentication | JWT with secure cookies |
| Data Encryption | TLS in transit, encrypted at rest (Supabase) |
| Input Validation | Zod schemas on all endpoints |
| Rate Limiting | 100 req/min per user |

### 4.3 Browser Support
| Browser | Support |
|---------|---------|
| Chrome 90+ | Full |
| Edge 90+ | Full |
| Safari 14+ | Full |
| Firefox 90+ | Partial (no Web Speech API) |

---

## 5. Database Schema (Supabase)

### 5.1 Core Tables
```sql
-- Users
users (id, email, password_hash, company_name, preferred_language, role, created_at)

-- Subscriptions
subscriptions (id, user_id, plan, status, stripe_subscription_id, voice_minutes, current_period_end)

-- Voice Interactions
voice_interactions (id, user_id, agent_id, transcript, response, duration_seconds, language, created_at)

-- Custom Agents
custom_agents (id, user_id, name, system_prompt, voice_id, capabilities, is_active, created_at)
```

### 5.2 Existing Prisma Schema
Located at: `vercel-deployments/solarvoice/prisma/schema.prisma`
- Comprehensive schema already defined
- Needs migration to Supabase
- 13+ models ready to use

---

## 6. API Endpoints

### 6.1 Existing Endpoints
| Method | Path | Status | Purpose |
|--------|------|--------|---------|
| POST | /api/voice/synthesize | ✅ Working | ElevenLabs TTS |
| POST | /api/voice/transcribe | 🟡 Partial | Process speech |
| POST | /api/voice/command | 🟡 Partial | Process command |
| POST | /api/auth/login | 🟡 Disabled | User login |
| POST | /api/auth/register | 🟡 Disabled | User registration |
| POST | /api/agents/create | ✅ Working | Create custom agent |
| GET | /api/agents/[id] | ✅ Working | Get agent details |
| POST | /api/agents/[id]/test | ✅ Working | Test agent voice |
| GET | /api/agents/custom | ✅ Working | List user's agents |
| POST | /api/webhooks/stripe | 🟡 Partial | Stripe webhooks |
| GET | /api/health | ✅ Working | Health check |

### 6.2 Required New Endpoints
| Method | Path | Purpose |
|--------|------|---------|
| POST | /api/chat | Claude conversation |
| GET | /api/usage | User usage stats |
| POST | /api/checkout | Create Stripe checkout |
| GET | /api/subscription | Get subscription status |

---

## 7. UI/UX Requirements

### 7.1 Pages
| Page | Route | Status |
|------|-------|--------|
| Home | / | ✅ Built |
| Pricing | /pricing | ✅ Built |
| Login | /login | ✅ Built |
| Dashboard | /dashboard | 🟡 Partial |
| Agents List | /dashboard/agents | ✅ Built |
| Create Agent | /dashboard/agents/create | ✅ Built |
| Voice Test | /dashboard/agents/test | ✅ Built |

### 7.2 Design System
- **Framework:** Tailwind CSS
- **Components:** Radix UI primitives
- **Theme:** Industrial "equipment rental" aesthetic
- **Colors:** Orange (#FF6B00), Dark Gray (#333), Light Gray (#F5F5F5)

---

## 8. Acceptance Criteria

### 8.1 Foundation Complete
- [ ] `npm install` succeeds
- [ ] `npm run build` succeeds with zero errors
- [ ] `npm run dev` starts dev server
- [ ] Database connects to Supabase
- [ ] All existing features work as documented

### 8.2 MVP Complete
- [ ] New user can register account
- [ ] User can login and see dashboard
- [ ] User can select an agent
- [ ] User can speak to agent via microphone
- [ ] Agent responds with AI-generated voice
- [ ] User can subscribe via Stripe checkout
- [ ] Usage is tracked and displayed

### 8.3 Production Ready
- [ ] Custom domain (GoDaddy) connected
- [ ] SSL certificate active
- [ ] Environment variables configured in Vercel
- [ ] Error monitoring active
- [ ] At least one paying customer

---

## Appendix A: Glossary

| Term | Definition |
|------|------------|
| TTS | Text-to-Speech (ElevenLabs) |
| STT | Speech-to-Text (Web Speech API) |
| LLM | Large Language Model (Claude) |
| RAG | Retrieval Augmented Generation |
| JWT | JSON Web Token |

---

*This PRD should be updated as features are implemented and requirements evolve.*
