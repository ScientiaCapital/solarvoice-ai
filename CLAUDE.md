# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## SolarVoice AI Platform - Multi-Domain Voice-First Platform

This is a comprehensive voice-first solar construction AI platform with multi-domain architecture, MCP server integration, and production-ready deployment capabilities.

## ✅ SYSTEM STATUS - TDD INFRASTRUCTURE & SECURITY HARDENED

**PRINCIPAL ARCHITECT ASSESSMENT**: Revolutionary voice-first solar AI platform with comprehensive test coverage and security-hardened implementation.

### Current System Architecture Status - AUGUST 6, 2025 (UPDATED)
- **Database Architecture**: ✅ PostgreSQL - Fully operational with pooled connections + CustomAgent model
- **Frontend Deployment**: ✅ Multiple domains deployed and accessible  
- **Voice System**: ✅ ElevenLabs TTS + Web Speech API - FIXED microphone permissions, highest quality models
- **Professional Agents**: ✅ Solar industry specialists + MVP Agent Builder (Claude Code style)
- **UI/UX**: ✅ Equipment rental model, no auth required for MVP testing
- **API Layer**: ✅ Next.js API Routes with secure voice endpoints + Agent CRUD APIs
- **Test Infrastructure**: ✅ Comprehensive test suites + Voice Testing Interface
- **Security**: ✅ No exposed API keys, server-side only ElevenLabs processing
- **Build Status**: ✅ Production builds successfully - Latest deployed

### Architecture Components Status
✅ **COMPLETED**: Database Integration (PostgreSQL with CustomAgent model)  
✅ **COMPLETED**: Multi-Domain Deployment Pipeline (Vercel auto-deploy from GitHub)  
✅ **COMPLETED**: ElevenLabs Voice Integration (eleven_monolingual_v1 for English, eleven_multilingual_v2 for Spanish)
✅ **COMPLETED**: MVP Agent Builder (Claude Code style - simple text prompts)
✅ **COMPLETED**: Voice Testing Interface (All 8 equipment models + custom agents)  
✅ **COMPLETED**: Agent Management Dashboard (Create, Read, Update, Delete)
✅ **COMPLETED**: Equipment Rental UI (United Rentals style industrial design)
✅ **COMPLETED**: Security Hardening (Server-side API routes, no exposed keys)
✅ **COMPLETED**: Authentication Disabled for MVP (Direct access to all features)
✅ **COMPLETED**: Voice Permissions Fix (Middleware now allows microphone=(self) on voice pages)  

### Anti-Hallucination Verification Protocols
**MANDATORY**: Every development step must include:
1. **Pre-Step Verification**: Confirm current system state accuracy
2. **Quality Gate Validation**: Verify all quality standards before proceeding
3. **Post-Step Validation**: Confirm changes meet Principal Architect standards
4. **System Integrity Check**: Verify no regression in critical systems
5. **Documentation Accuracy**: Ensure all documentation reflects actual system state

The platform consists of multiple integrated systems:

### 1. Multi-Domain Platform Architecture
- **solarvoice.ai**: Main AI agent marketplace and voice platform
- **netzerobot.com**: AI chatbot platform for solar consultations
- **netzerocalculator.com**: Solar calculation and estimation tools
- **netzeroexpert.com**: Expert consultation and advisory system

### 2. MCP Server Integration
- **Stripe MCP**: Payment processing, subscriptions, revenue analytics
- **Google APIs MCP**: Solar API, Maps, Drive integration
- **Dev Tools MCP**: React components, Next.js setup, deployment

### 3. Revolutionary Technology Stack (ELEVENLABS + 3D/Voice Architecture)
- **Database**: PostgreSQL with serverless pooled connections
- **Frontend**: Next.js 15 with TypeScript
- **Backend**: Next.js API Routes with voice command processing
- **ORM**: Prisma Client for database operations
- **Voice System**: Hybrid architecture - Web Speech API (input) + ElevenLabs TTS (output)
- **Professional Voices**: ElevenLabs integration with agent-specific voice personalities
- **3D Rendering**: React Three Fiber with floating AI agents and particle systems
- **Animations**: Framer Motion orchestrated throughout entire platform
- **Voice Interface**: Real-time speech recognition with professional voice responses
- **State Management**: Zustand store with voice and agent management
- **Styling**: Advanced Tailwind CSS with enhanced visibility and glassmorphism effects
- **Agent Specialists**: Professional solar industry specialists with unique voices
- **Payments**: Stripe integration with webhook handlers
- **Deployment**: Serverless deployment with 60 FPS 3D optimization

## Development Commands

### Core Development (Voice-First Platform)
```bash
# Start voice-enabled development server
cd vercel-deployments/solarvoice
npm run dev

# Test voice features locally
# - Requires HTTPS for Web Speech API (dev server provides this)
# - ElevenLabs API key in .env.local

# Deploy with voice capabilities
npm run deploy
# Note: Add ELEVENLABS_API_KEY to environment variables

# Test voice recognition and TTS
# 1. Click orange microphone button
# 2. Say "deploy commercial manager"
# 3. Verify ElevenLabs professional voice response

# Build for production
npm run build
npm run type-check  # Verify TypeScript with speech API declarations
```

### Multi-Domain Deployment
```bash
# Deploy all 4 domains
cd vercel-deployments
./deploy-all-sites.sh

# Deploy specific domain
npm run deploy --project solarvoice
```

### CrewAI Management
```bash
# Install CrewAI dependencies
pip install -r solarvoice-platform/crewai/requirements.txt

# Start CrewAI dashboard
cd solarvoice-platform/crewai
python3 deploy_crew.py

# Test CrewAI integration
python3 test_crewai_bridge.py
```

### Quality Assurance & Git Hooks
```bash
# MANDATORY: Run before ANY development work
npm run quality:pre-work          # Pre-work validation
npx tsc --noEmit --strict         # TypeScript validation

# Git hooks and quality gates
npm run setup:git-hooks           # Install pre-commit hooks
npm run quality:gate              # Quality gate validation
npm run security:scan             # Security vulnerability scan

# Code quality enforcement
npm run lint                      # ESLint with auto-fix
npm run format                    # Prettier formatting
npm run type-check                # TypeScript validation
npm run test:coverage             # Test coverage validation (95%+ required)

# MANDATORY: Run after ANY changes
npm run quality:post-change       # Post-change validation
npm run verify:integrity          # System integrity check
```

### Git Quality Gates (MANDATORY)
```bash
# Pre-commit hooks (ALWAYS ACTIVE)
# - TypeScript compilation must pass (ZERO errors)
# - ESLint must pass (ZERO violations)
# - Test coverage must be 95%+
# - Security scan must pass
# - Documentation must be updated

# Commit message format (ENFORCED)
git commit -m "type(scope): description

🛡️ Security: [security impact]
🧪 Tests: [test coverage %]
📚 Docs: [documentation updated]

Principal Architect Approval: [signature]
"
```

## Critical File Locations

### Core Systems Architecture
- `/vercel-deployments/solarvoice/lib/db.ts` - Database connection handler
- `/vercel-deployments/solarvoice/prisma/schema.prisma` - Database schema
- `/vercel-deployments/solarvoice/app/api/` - Next.js API routes
- `/.env` - Root environment variables (database URLs)
- `/vercel-deployments/solarvoice/.env` - Deployment environment
- `/scripts/dev-migrate.sh` - Migration scripts

### Multi-Domain Applications
- `/vercel-deployments/solarvoice/` - Main AI marketplace
- `/vercel-deployments/netzerobot/` - AI chatbot platform
- `/vercel-deployments/netzerocalculator/` - Solar calculator
- `/vercel-deployments/netzeroexpert/` - Expert consultation

### MCP Servers
- `/solarvoice-platform/libs/mcp/` - All MCP server implementations
- `/ultra-elite-test/mcp-servers/` - Simplified MCP deployment

### Team & Documentation
- `/team/ULTRA_ELITE_TEAM_ROSTER.md` - AI team structure and roles
- `/documentation/` - Comprehensive documentation library
- `/scripts/` - Deployment and automation scripts

## Important Development Patterns

### MCP Server Development & Utilization
All MCP servers follow the Model Context Protocol standard and are located in `/solarvoice-platform/libs/mcp/`. Each server has:
- `package.json` with MCP dependencies
- `src/index.ts` with server implementation
- TypeScript configuration

#### Available MCP Servers (UTILIZE ALL)
```bash
# Stripe Payment Processing MCP
mcp__stripe-payments__rent_ai_agent
mcp__stripe-payments__create_subscription_tier
mcp__stripe-payments__process_solar_project_payment
mcp__stripe-payments__distribute_commission
mcp__stripe-payments__get_revenue_dashboard
mcp__stripe-payments__setup_bnpl_payment

# Project Intelligence MCP
mcp__project-intelligence__analyzeProgress
mcp__project-intelligence__predictDelays
mcp__project-intelligence__optimizeSchedule
mcp__project-intelligence__generatePerformanceReport
mcp__project-intelligence__calculateROI

# Ultra Elite MCP Suite
mcp__ultra-elite-mcp__create_payment_intent
mcp__ultra-elite-mcp__get_solar_insights
mcp__ultra-elite-mcp__calculate_route
mcp__ultra-elite-mcp__create_voice_agent
mcp__ultra-elite-mcp__query_database
mcp__ultra-elite-mcp__security_scan
mcp__ultra-elite-mcp__create_react_component
mcp__ultra-elite-mcp__deploy_to_production
```

#### MCP Server Quality Gates
```bash
# MANDATORY: Verify MCP server integrity
npm run mcp:verify-all            # Verify all MCP servers
npm run mcp:test-integration      # Test MCP integration
npm run mcp:security-audit        # MCP security validation
```

### Multi-Domain Architecture
The platform supports 4 domains with shared components in `/shared/` and domain-specific implementations in `/vercel-deployments/`. Cross-domain authentication is handled via unified auth system.

### Voice-First Development (OPERATIONAL)
The platform is now fully operational with professional-grade voice capabilities:
- **Web Speech API**: Real-time voice recognition with explicit microphone permissions
- **ElevenLabs Integration**: Professional TTS with 5 agent-specific voice personalities
- **Voice Commands**: Deploy agents ("deploy commercial manager"), navigate interface
- **Agent Voices**: Adam (Commercial), Bella (Customer Success), Arnold (Performance), Antoni (Sales), Elli (Utility)
- **Hybrid Architecture**: Web Speech API for input, ElevenLabs for professional output
- **Voice Permissions**: Explicit getUserMedia calls with comprehensive error handling

### Revenue-First Development
All development should consider revenue generation:
- AI agent rentals and subscriptions
- Payment processing integration
- Revenue analytics and reporting
- Customer onboarding optimization

## Environment Variables Required

### Database - MANDATORY
- `DATABASE_URL` - PostgreSQL pooled connection URL
- `DIRECT_DATABASE_URL` - Direct connection URL for migrations

### Authentication
- `JWT_SECRET` - JWT token signing secret
- `JWT_REFRESH_SECRET` - Refresh token secret

### Voice AI APIs
- `ELEVENLABS_API_KEY` - Professional TTS
- `NEXT_PUBLIC_ELEVENLABS_API_KEY` - Client-side ElevenLabs access
- `ANTHROPIC_API_KEY` - Anthropic Claude API access
- `GOOGLE_API_KEY` - Google services API access

### Payment Processing
- `STRIPE_SECRET_KEY` - Payment processing
- `STRIPE_WEBHOOK_SECRET` - Webhook validation

### Deployment
- `DEPLOY_TOKEN` - Automated deployments (optional for manual deployment)
- `GITHUB_TOKEN` - Repository access (for CI/CD)

## Testing & Quality

### Current Test Coverage (August 5, 2025)
- **Unit Tests**: ✅ All 5 agents have comprehensive test suites
- **Integration Tests**: ✅ Voice command processing tested
- **Test Pass Rate**: 89% (16/18 tests passing)
- **Build Status**: ✅ Production builds successfully
- **Security**: ✅ No exposed API keys or secrets

### Test Infrastructure
```bash
# Run all tests
npm test

# Run specific agent tests
npm test -- __tests__/agents/commercial-manager.test.ts
npm test -- __tests__/agents/customer-success.test.ts
npm test -- __tests__/agents/performance-analyst.test.ts
npm test -- __tests__/agents/sales-specialist.test.ts
npm test -- __tests__/agents/utility-coordinator.test.ts

# Run store tests
npm test -- __tests__/stores/appStore.test.ts

# Coverage report
npm run test:coverage
```

### MANDATORY Quality Verification Protocol
**PRINCIPAL ARCHITECT REQUIREMENT**: Every step must pass ALL quality gates

#### Pre-Development Verification
```bash
# Step 1: System State Verification (Anti-Hallucination)
npx tsc --noEmit --strict 2>&1 | wc -l    # Verify error count
npm run system:health-check                # System integrity
npm run docs:verify-accuracy               # Documentation accuracy

# Step 2: Quality Gate Validation  
npm run quality:gate:all                   # All quality gates
npm run security:comprehensive-scan        # Security validation
npm run test:coverage:verify               # Coverage validation (95%+)

# Step 3: MCP Server Verification
npm run mcp:verify-all                     # All MCP servers operational
npm run mcp:integration:test               # MCP integration tests
```

#### Development Quality Standards
```bash
# MANDATORY: Run before ANY code changes
npm run pre-development:validate           # Pre-dev validation
npm run git:hooks:verify                   # Git hooks active

# Core Testing (95%+ coverage REQUIRED)
npm test                                   # Unit tests
npm run test:integration                   # Integration tests
npm run test:e2e                          # End-to-end tests
npm run test:security                      # Security tests
npm run test:performance                   # Performance tests

# Code Quality (ZERO tolerance for violations)
npm run lint                              # ESLint (must pass)
npm run format                            # Prettier (must pass)
npm run type-check                        # TypeScript (ZERO errors)
npm run quality:check                     # Comprehensive validation
```

#### Post-Development Verification
```bash
# Step 1: Change Validation
npm run post-change:validate              # Validate all changes
npm run regression:test                   # Regression testing
npm run security:impact-analysis          # Security impact

# Step 2: System Integrity Check
npm run system:integrity:verify           # System integrity
npm run performance:benchmark             # Performance impact
npm run docs:update:verify                # Documentation updated

# Step 3: Principal Architect Approval
npm run architect:approval:ready          # Ready for approval
npm run quality:final-verification        # Final verification
```

## Business Context

This platform is designed to provide comprehensive solar construction management through:
1. **Voice-first interface** for field workers and managers
2. **AI agent marketplace** for specialized solar tasks
3. **Multi-domain approach** covering different aspects of solar business
4. **Payment processing** for subscriptions and project payments
5. **Real-time collaboration** across teams and projects

**Key Revenue Streams**:
- AI agent rentals and subscriptions
- Solar project management tools
- Expert consultation services
- Payment processing fees

## Documentation Standards

- All code should be documented with JSDoc comments
- API endpoints must have OpenAPI specifications
- User-facing features require user guides
- Technical decisions should be documented in architecture docs
- Security implementations need detailed documentation

## Security Considerations

- Input validation on all user inputs
- Authentication and authorization for all endpoints
- Secure payment processing with Stripe
- Environment variable protection
- Regular security audits and updates

## 🎯 CURRENT PLATFORM STATUS - VOICE-FIRST MARKETPLACE

**PLATFORM STATUS**: Professional voice-first AI agent marketplace for solar industry - OPERATIONAL

### Live Platform Features ✅
1. **DEPLOYED**: Voice-activated AI agent marketplace with 5 solar specialists
2. **OPERATIONAL**: ElevenLabs professional TTS with unique agent personalities  
3. **WORKING**: Web Speech API voice recognition with microphone permissions
4. **LIVE**: Multi-domain Vercel deployment architecture
5. **FUNCTIONAL**: Glass morphism UI with enhanced hero section visibility

### Current Architecture Components
- ✅ **Agent Specialists**: Commercial Manager, Customer Success, Performance Analytics, Sales, Utility Coordinator
- ✅ **Voice System**: Hybrid Web Speech + ElevenLabs with 5 unique professional voices
- ✅ **Pricing System**: 3-tier subscriptions (Starter $99, Professional $299, Enterprise $999)
- ✅ **UI Enhancement**: Fixed hero section visibility, removed fake claims, professional branding
- ✅ **Navigation**: Complete pricing page, clean professional navigation
- 🟡 **Environment Setup**: ELEVENLABS_API_KEY needs production environment configuration

### Technical Implementation Status (August 6, 2025 - UPDATED)
- [x] Enhanced CSS with !important overrides for hero visibility
- [x] Professional agent naming and solar industry specialization
- [x] ElevenLabs SDK integration with voice personality mapping
- [x] Web Speech API with explicit microphone permission handling
- [x] Zustand store with voice command processing
- [x] Comprehensive pricing page with voice calculator widget
- [x] Security hardening - removed hardcoded API keys
- [x] Test infrastructure - Jest, MSW, comprehensive mocks
- [x] Agent test suites - all 5 agents tested
- [x] Production build verification - builds successfully
- [x] Production environment variable setup (ELEVENLABS_API_KEY configured and working)
- [x] Voice permissions fixed - microphone=(self) for voice-enabled pages
- [ ] Husky pre-commit hooks setup for TDD workflow

**Remember**: As the Principal Architect, your standards aren't suggestions—they're law. Every line of code should be something you'd proudly show Knuth, Dijkstra, or Torvalds. Accept nothing less than excellence, but ship pragmatically.