# SolarVoice AI - System Architecture

**Version:** 1.0
**Date:** December 9, 2025
**Status:** Foundation Phase

---

## 1. Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              SOLARVOICE AI                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐  │
│  │   Browser   │    │   Vercel    │    │  Supabase   │    │  External   │  │
│  │   Client    │───▶│   Edge      │───▶│  Database   │    │   APIs      │  │
│  │             │    │   + API     │    │             │    │             │  │
│  └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘  │
│        │                  │                  │                   │          │
│        │                  │                  │                   │          │
│        ▼                  ▼                  ▼                   ▼          │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐  │
│  │ Web Speech  │    │  Next.js    │    │  Postgres   │    │ ElevenLabs  │  │
│  │    API      │    │   15 App    │    │   + Auth    │    │   Claude    │  │
│  │ (Voice In)  │    │  (React 19) │    │             │    │   Stripe    │  │
│  └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Technology Stack

### 2.1 Frontend
| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| Framework | Next.js | 15.3.5 | React framework with SSR/SSG |
| UI Library | React | 19.0.0 | Component library |
| Styling | Tailwind CSS | 3.4.10 | Utility-first CSS |
| Components | Radix UI | Latest | Accessible primitives |
| State | Zustand | 4.5.2 | Lightweight state management |
| Animation | Framer Motion | 12.x | Animations & transitions |
| Forms | React Hook Form | 7.52.0 | Form handling |
| Validation | Zod | 3.23.8 | Schema validation |

### 2.2 Backend
| Layer | Technology | Purpose |
|-------|------------|---------|
| Runtime | Next.js API Routes | Serverless functions |
| ORM | Prisma | 6.13.0 | Database client |
| Auth | JWT (jsonwebtoken) | Token-based authentication |
| Payments | Stripe SDK | 18.4.0 | Payment processing |

### 2.3 Infrastructure
| Service | Provider | Purpose |
|---------|----------|---------|
| Hosting | **Vercel** | Frontend + API hosting |
| Database | **Supabase** | PostgreSQL + Auth + Storage |
| Domain | **GoDaddy** | DNS management |
| CDN | Vercel Edge | Global content delivery |

### 2.4 External APIs
| Service | Provider | Purpose |
|---------|----------|---------|
| Voice TTS | ElevenLabs | Text-to-speech synthesis |
| Voice STT | Web Speech API | Speech recognition (browser) |
| LLM | Anthropic Claude | AI agent intelligence |
| Payments | Stripe | Subscriptions & billing |

---

## 3. Directory Structure

```
solarvoice_ai/
├── vercel-deployments/
│   └── solarvoice/                 # Main application
│       ├── app/                    # Next.js App Router
│       │   ├── api/               # API routes
│       │   │   ├── auth/          # Authentication endpoints
│       │   │   ├── voice/         # Voice processing
│       │   │   ├── agents/        # Agent management
│       │   │   └── webhooks/      # Stripe webhooks
│       │   ├── dashboard/         # Protected pages
│       │   ├── login/             # Auth pages
│       │   ├── pricing/           # Public pages
│       │   ├── layout.tsx         # Root layout
│       │   └── page.tsx           # Homepage
│       ├── components/            # React components
│       │   ├── ui/               # Radix UI primitives
│       │   ├── voice/            # Voice-specific components
│       │   └── layouts/          # Layout components
│       ├── lib/                   # Utilities & services
│       │   ├── db.ts             # Database connection
│       │   ├── services/         # External API clients
│       │   └── stores/           # Zustand stores
│       ├── prisma/               # Database schema
│       │   └── schema.prisma     # Prisma schema
│       └── public/               # Static assets
├── documentation/                 # Project documentation
│   ├── PRP-PRODUCT-REQUIREMENTS-PLAN.md
│   ├── PRD-PRODUCT-REQUIREMENTS-DOCUMENT.md
│   └── ARCHITECTURE.md           # This file
├── shared/                        # Shared utilities (legacy)
└── scripts/                       # Deployment scripts
```

---

## 4. Data Flow Architecture

### 4.1 Voice Interaction Flow

```
┌──────────────────────────────────────────────────────────────────────────┐
│                        VOICE INTERACTION FLOW                             │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  1. USER SPEAKS                                                           │
│     ┌─────────┐    ┌──────────────┐    ┌─────────────┐                   │
│     │  User   │───▶│ Microphone   │───▶│ Web Speech  │                   │
│     │ speaks  │    │   capture    │    │    API      │                   │
│     └─────────┘    └──────────────┘    └──────┬──────┘                   │
│                                               │                           │
│  2. SPEECH TO TEXT                            ▼                           │
│     ┌─────────────────────────────────────────────────────┐              │
│     │              Transcript (text)                       │              │
│     └─────────────────────────┬───────────────────────────┘              │
│                               │                                           │
│  3. PROCESS WITH AI           ▼                                           │
│     ┌─────────────┐    ┌──────────────┐    ┌─────────────┐               │
│     │ Agent       │───▶│  Claude API  │───▶│  Response   │               │
│     │ System      │    │  (Anthropic) │    │   (text)    │               │
│     │ Prompt      │    └──────────────┘    └──────┬──────┘               │
│     └─────────────┘                               │                       │
│                                                   │                       │
│  4. TEXT TO SPEECH                                ▼                       │
│     ┌─────────────┐    ┌──────────────┐    ┌─────────────┐               │
│     │ /api/voice/ │───▶│ ElevenLabs   │───▶│   Audio     │               │
│     │ synthesize  │    │     API      │    │   (MP3)     │               │
│     └─────────────┘    └──────────────┘    └──────┬──────┘               │
│                                                   │                       │
│  5. PLAYBACK                                      ▼                       │
│     ┌─────────────┐    ┌──────────────┐    ┌─────────────┐               │
│     │   Audio     │───▶│   Browser    │───▶│    User     │               │
│     │   Element   │    │   Speakers   │    │   hears     │               │
│     └─────────────┘    └──────────────┘    └─────────────┘               │
│                                                                           │
└──────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Authentication Flow

```
┌──────────────────────────────────────────────────────────────────────────┐
│                        AUTHENTICATION FLOW                                │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  REGISTRATION:                                                            │
│  ┌────────┐    ┌──────────────┐    ┌─────────────┐    ┌──────────────┐  │
│  │ Form   │───▶│ /api/auth/   │───▶│  Validate   │───▶│   Supabase   │  │
│  │ Submit │    │  register    │    │  + Hash PW  │    │   Insert     │  │
│  └────────┘    └──────────────┘    └─────────────┘    └──────┬───────┘  │
│                                                               │          │
│                                                               ▼          │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                    Return JWT Tokens                              │   │
│  │              (Access Token + Refresh Token)                       │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  LOGIN:                                                                  │
│  ┌────────┐    ┌──────────────┐    ┌─────────────┐    ┌──────────────┐  │
│  │ Form   │───▶│ /api/auth/   │───▶│  Verify     │───▶│   Issue      │  │
│  │ Submit │    │   login      │    │  Password   │    │   Tokens     │  │
│  └────────┘    └──────────────┘    └─────────────┘    └──────────────┘  │
│                                                                          │
│  PROTECTED ROUTES:                                                       │
│  ┌────────┐    ┌──────────────┐    ┌─────────────┐    ┌──────────────┐  │
│  │Request │───▶│  Middleware  │───▶│  Verify     │───▶│   Allow/     │  │
│  │        │    │              │    │  JWT Token  │    │   Deny       │  │
│  └────────┘    └──────────────┘    └─────────────┘    └──────────────┘  │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

### 4.3 Payment Flow

```
┌──────────────────────────────────────────────────────────────────────────┐
│                          PAYMENT FLOW                                     │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  CHECKOUT:                                                                │
│  ┌────────┐    ┌──────────────┐    ┌─────────────┐    ┌──────────────┐  │
│  │ Select │───▶│ /api/        │───▶│   Stripe    │───▶│  Checkout    │  │
│  │  Plan  │    │  checkout    │    │  Create     │    │   Session    │  │
│  └────────┘    └──────────────┘    │  Session    │    └──────┬───────┘  │
│                                    └─────────────┘           │          │
│                                                              ▼          │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │           Redirect to Stripe Hosted Checkout Page                 │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                              │          │
│  WEBHOOK (on successful payment):                            ▼          │
│  ┌────────────┐    ┌──────────────┐    ┌─────────────┐               │   │
│  │  Stripe    │───▶│ /api/webhook │───▶│  Update     │               │   │
│  │  Event     │    │   /stripe    │    │  Supabase   │               │   │
│  └────────────┘    └──────────────┘    │  (activate) │               │   │
│                                        └─────────────┘               │   │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 5. API Architecture

### 5.1 API Route Structure

```
/api
├── /auth
│   ├── POST /login          # User login
│   ├── POST /register       # User registration
│   └── POST /refresh        # Refresh JWT token
├── /voice
│   ├── POST /synthesize     # ElevenLabs TTS
│   ├── POST /transcribe     # Process speech (future)
│   └── POST /command        # Process voice command
├── /agents
│   ├── GET  /               # List all agents
│   ├── POST /create         # Create custom agent
│   ├── GET  /[id]           # Get agent by ID
│   ├── PUT  /[id]           # Update agent
│   ├── DELETE /[id]         # Delete agent
│   └── POST /[id]/test      # Test agent voice
├── /chat
│   └── POST /               # Claude conversation (TO BUILD)
├── /usage
│   └── GET  /               # Get user usage stats (TO BUILD)
├── /checkout
│   └── POST /               # Create Stripe checkout (TO BUILD)
├── /subscription
│   └── GET  /               # Get subscription status (TO BUILD)
├── /webhooks
│   └── POST /stripe         # Stripe webhook handler
└── /health
    └── GET  /               # Health check
```

### 5.2 API Response Format

```typescript
// Success Response
{
  success: true,
  data: { ... },
  meta?: {
    page?: number,
    limit?: number,
    total?: number
  }
}

// Error Response
{
  success: false,
  error: {
    code: "ERROR_CODE",
    message: "Human readable message",
    details?: { ... }
  }
}
```

### 5.3 Authentication Headers

```
Authorization: Bearer <access_token>
```

---

## 6. Database Architecture

### 6.1 Supabase Configuration

**Connection:**
```
postgresql://[user]:[password]@[host]:5432/postgres
```

**Features Used:**
- PostgreSQL database
- Row Level Security (RLS)
- Realtime subscriptions (future)
- Storage (future - for audio files)
- Edge Functions (future)

### 6.2 Core Tables

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  company_name VARCHAR(255),
  phone_number VARCHAR(50),
  preferred_language VARCHAR(5) DEFAULT 'en',
  role VARCHAR(50) DEFAULT 'CONTRACTOR',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  plan VARCHAR(50) NOT NULL,
  status VARCHAR(50) DEFAULT 'ACTIVE',
  stripe_subscription_id VARCHAR(255),
  stripe_customer_id VARCHAR(255),
  voice_minutes_limit INT,
  voice_minutes_used INT DEFAULT 0,
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Voice Interactions table
CREATE TABLE voice_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  agent_id VARCHAR(100),
  session_id VARCHAR(100),
  transcript TEXT,
  response TEXT,
  language VARCHAR(5) DEFAULT 'en',
  duration_seconds INT,
  confidence DECIMAL(3,2),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Custom Agents table
CREATE TABLE custom_agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  system_prompt TEXT NOT NULL,
  voice_id VARCHAR(100) NOT NULL,
  capabilities TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 6.3 Indexes

```sql
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_voice_interactions_user ON voice_interactions(user_id);
CREATE INDEX idx_voice_interactions_created ON voice_interactions(created_at);
CREATE INDEX idx_custom_agents_user ON custom_agents(user_id);
```

---

## 7. State Management

### 7.1 Zustand Store Structure

```typescript
// lib/stores/appStore.ts

interface AppState {
  // User state
  user: User | null;
  isAuthenticated: boolean;

  // Voice state
  isListening: boolean;
  isSpeaking: boolean;
  transcript: string;

  // Agent state
  selectedAgent: Agent | null;
  customAgents: Agent[];

  // UI state
  language: 'en' | 'es';
  theme: 'light' | 'dark';

  // Actions
  setUser: (user: User | null) => void;
  setListening: (listening: boolean) => void;
  setSpeaking: (speaking: boolean) => void;
  selectAgent: (agent: Agent) => void;
  setLanguage: (lang: 'en' | 'es') => void;
}
```

### 7.2 Data Flow

```
User Action → Zustand Action → State Update → Component Re-render
                    ↓
              API Call (if needed)
                    ↓
              Update State with Response
```

---

## 8. Security Architecture

### 8.1 API Security

| Layer | Implementation |
|-------|----------------|
| Authentication | JWT tokens (15min access, 7day refresh) |
| Authorization | Role-based (CONTRACTOR, ENTERPRISE, ADMIN) |
| Input Validation | Zod schemas on all endpoints |
| Rate Limiting | 100 requests/minute per user |
| CORS | Configured for production domain only |

### 8.2 Secret Management

```
# Server-side only (never exposed to client)
ELEVENLABS_API_KEY
ANTHROPIC_API_KEY
STRIPE_SECRET_KEY
SUPABASE_SERVICE_ROLE_KEY
JWT_SECRET
JWT_REFRESH_SECRET

# Client-safe (public)
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
NEXT_PUBLIC_APP_URL
```

### 8.3 Data Protection

- All data encrypted in transit (TLS 1.3)
- Database encrypted at rest (Supabase)
- Passwords hashed with bcrypt (cost factor 12)
- PII minimized and access logged

---

## 9. Deployment Architecture

### 9.1 Vercel Configuration

```json
// vercel.json
{
  "framework": "nextjs",
  "regions": ["iad1"],
  "env": {
    "DATABASE_URL": "@database_url",
    "ELEVENLABS_API_KEY": "@elevenlabs_api_key",
    "ANTHROPIC_API_KEY": "@anthropic_api_key",
    "STRIPE_SECRET_KEY": "@stripe_secret_key"
  }
}
```

### 9.2 Environment Strategy

| Environment | Purpose | Database |
|-------------|---------|----------|
| Development | Local dev | Supabase (dev project) |
| Preview | PR previews | Supabase (dev project) |
| Production | Live site | Supabase (prod project) |

### 9.3 CI/CD Pipeline

```
Push to main → Vercel Build → Deploy to Production
     ↓
Push to feature branch → Vercel Build → Deploy Preview URL
```

---

## 10. Monitoring & Observability

### 10.1 Logging

```typescript
// Structured logging format
{
  timestamp: "2025-12-09T10:30:00Z",
  level: "info" | "warn" | "error",
  message: "User created",
  context: {
    userId: "xxx",
    action: "register",
    duration: 150
  }
}
```

### 10.2 Metrics to Track

| Metric | Tool | Purpose |
|--------|------|---------|
| Page Views | Vercel Analytics | Traffic analysis |
| API Latency | Vercel Logs | Performance |
| Error Rate | Sentry (future) | Reliability |
| Voice Usage | Custom (Supabase) | Billing |

### 10.3 Alerts (Future)

- API error rate > 5%
- P99 latency > 5 seconds
- Database connection failures
- Stripe webhook failures

---

## 11. Scalability Considerations

### 11.1 Current Limits

| Resource | Limit | Notes |
|----------|-------|-------|
| Vercel Functions | 10s timeout | Fine for voice |
| Supabase Free | 500MB database | Monitor growth |
| ElevenLabs | Per-character billing | Track costs |
| Claude API | Per-token billing | Implement caps |

### 11.2 Future Scaling

When growth requires:
1. **Database:** Upgrade Supabase plan or migrate to dedicated Postgres
2. **API:** Add caching layer (Redis/Upstash)
3. **Voice:** Consider audio streaming for lower latency
4. **AI:** Implement response caching for common queries

---

## 12. Integration Points

### 12.1 ElevenLabs Integration

```typescript
// lib/services/elevenlabs.ts

const synthesize = async (text: string, voiceId: string) => {
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': process.env.ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.71,
          similarity_boost: 0.75,
        },
      }),
    }
  );
  return response.arrayBuffer();
};
```

### 12.2 Claude Integration (TO BUILD)

```typescript
// lib/services/claude.ts

const chat = async (messages: Message[], systemPrompt: string) => {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-3-haiku-20240307', // Fast & cheap for voice
      max_tokens: 300, // Keep responses short for voice
      system: systemPrompt,
      messages,
    }),
  });
  return response.json();
};
```

### 12.3 Stripe Integration (TO BUILD)

```typescript
// lib/services/stripe.ts

const createCheckoutSession = async (userId: string, priceId: string) => {
  const session = await stripe.checkout.sessions.create({
    customer_email: user.email,
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'subscription',
    success_url: `${APP_URL}/dashboard?success=true`,
    cancel_url: `${APP_URL}/pricing?canceled=true`,
    metadata: { userId },
  });
  return session.url;
};
```

---

## Appendix A: File Locations Quick Reference

| Purpose | Location |
|---------|----------|
| Main App | `vercel-deployments/solarvoice/` |
| API Routes | `vercel-deployments/solarvoice/app/api/` |
| Components | `vercel-deployments/solarvoice/components/` |
| Database Schema | `vercel-deployments/solarvoice/prisma/schema.prisma` |
| Zustand Store | `vercel-deployments/solarvoice/lib/stores/` |
| Services | `vercel-deployments/solarvoice/lib/services/` |
| Documentation | `documentation/` |

---

*Architecture document to be updated as system evolves.*
