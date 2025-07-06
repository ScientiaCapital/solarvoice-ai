# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## SolarVoice AI Platform - Multi-Domain Voice-First Platform

This is a comprehensive voice-first solar construction AI platform with multi-domain architecture, MCP server integration, and production-ready deployment capabilities.

## ⚠️ CRITICAL SYSTEM STATUS - EMERGENCY REMEDIATION REQUIRED

**PRINCIPAL DATABASE ARCHITECT ASSESSMENT**: The system is currently in EMERGENCY STABILIZATION mode due to critical type safety violations.

### Current System Integrity Status
- **TypeScript Errors**: 1,485 active errors (CRITICAL RISK)
- **Database Architecture Status**: BLOCKED - Cannot proceed with enterprise assessment
- **Production Readiness**: 0% - System would fail under load
- **Data Integrity Risk**: HIGH - Multiple potential corruption vectors identified

### Quality Gate Status
🔴 **FAILED**: TypeScript Compilation (1,485 errors)  
🔴 **FAILED**: Type Safety Standards  
🔴 **FAILED**: Database Integrity Requirements  
🔴 **FAILED**: Enterprise Production Standards  

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
- **Retell AI MCP**: Voice capabilities and phone provisioning
- **Dev Tools MCP**: React components, Next.js setup, Vercel deployment

### 3. Core Technology Stack
- **Frontend**: Next.js 14 with TypeScript across all domains
- **Styling**: Tailwind CSS with shared component library
- **Backend**: Node.js services with TypeScript
- **Voice**: ElevenLabs v3, Retell AI, WebRTC integration
- **Payments**: Stripe integration with MCP server
- **Deployment**: Vercel with automated CI/CD

## Development Commands

### Core Development
```bash
# Start main development server
npm run dev

# Start monitoring system
node shared/monitoring/system-monitoring.ts

# Start Stripe payment processing
node shared/payments/stripe-mcp-integration.js

# Run tests
npm test
npm run test:integration

# Build for production
npm run build
```

### Multi-Domain Deployment
```bash
# Deploy all 4 domains to Vercel
cd vercel-deployments
./deploy-all-sites.sh

# Deploy specific domain
vercel --prod --project solarvoice
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

### Core Systems
- `/shared/monitoring/system-monitoring.ts` - System monitoring and health checks
- `/shared/infrastructure/` - Core infrastructure patterns and utilities
- `/shared/security/` - Security implementations and validation
- `/shared/payments/` - Payment processing and revenue systems
- `/shared/voice/` - Voice AI integration and processing
- `/shared/agents/` - AI agent deployment and management

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
mcp__ultra-elite-mcp__deploy_to_vercel
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

### Voice-First Development
All features should consider voice interaction as a primary interface:
- Natural language processing for commands
- Voice-to-text and text-to-voice capabilities
- Real-time voice communication
- Voice command validation and feedback

### Revenue-First Development
All development should consider revenue generation:
- AI agent rentals and subscriptions
- Payment processing integration
- Revenue analytics and reporting
- Customer onboarding optimization

## Environment Variables Required

### Core APIs
- `STRIPE_SECRET_KEY` - Payment processing
- `GOOGLE_SOLAR_API_KEY` - Solar potential data
- `RETELL_AI_API_KEY` - Voice capabilities
- `OPENAI_API_KEY` - AI model access
- `ELEVENLABS_API_KEY` - Text-to-speech

### Deployment
- `VERCEL_TOKEN` - Automated deployments
- `GITHUB_TOKEN` - Repository access

## Testing & Quality

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

## EMERGENCY STABILIZATION PROTOCOL

**CURRENT STATUS**: System in emergency remediation mode

### Critical Actions Required
1. **IMMEDIATE**: Resolve 1,485 TypeScript errors before ANY development
2. **MANDATORY**: Implement all quality gates and verification protocols
3. **REQUIRED**: Verify all MCP servers operational and secure
4. **ESSENTIAL**: Update all documentation to reflect actual system state

### Principal Architect Standards (NON-NEGOTIABLE)
- **Zero TypeScript errors** in strict mode
- **95%+ test coverage** on all code
- **100% security compliance** 
- **Complete documentation** accuracy
- **All quality gates passing**
- **All MCP servers verified**

### Anti-Hallucination Verification Checklist
- [ ] Current system state accurately documented
- [ ] All error counts verified and accurate
- [ ] Quality gates properly implemented
- [ ] MCP servers tested and operational  
- [ ] Security standards met
- [ ] Documentation reflects reality
- [ ] Principal Architect approval obtained

**Remember**: As the Principal Architect, your standards aren't suggestions—they're law. Every line of code should be something you'd proudly show Knuth, Dijkstra, or Torvalds. Accept nothing less than excellence, but ship pragmatically.