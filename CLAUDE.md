# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## SolarVoice AI Platform - ULTRA ELITE Complete Stack

This is a comprehensive voice-first solar construction AI platform with a 30-person ULTRA ELITE AI engineering team, complete MCP server integration, real-time monitoring, and universal deployment capabilities.

The platform consists of multiple integrated systems:

### 1. ULTRA ELITE AI Team (30 Members)
- **Command Center**: SAGE, ORACLE, NEXUS, QUANTUM (strategic leadership)
- **Squad ALPHA**: Core Platform (PHOENIX, TITAN, ATLAS, MERCURY)
- **Squad BETA**: Frontend & Mobile (APOLLO, ARTEMIS, ZEUS, HERMES)
- **Squad GAMMA**: AI/ML Intelligence (NOVA, NEBULA, COSMOS, STELLAR)
- **Squad DELTA**: Voice & Agents (PULSAR, QUASAR)
- **Squad EPSILON**: Revenue Operations (PROFIT, VAULT, LEDGER, BRIDGE)
- **Squad ZETA**: Data & Analytics (INSIGHT, PRISM, MATRIX, CIPHER)
- **Squad ETA**: Customer Success (HARMONY, ECHO, BEACON, GUARDIAN)

### 2. MCP Server Integration
- **Stripe MCP**: Payment processing, subscriptions, revenue analytics
- **Google APIs MCP**: Solar API, Maps, Drive integration
- **Retell AI MCP**: Voice capabilities and phone provisioning
- **Dev Tools MCP**: React components, Next.js setup, Vercel deployment

### 3. Multi-Domain Platform
- **solarvoice.ai**: Main AI agent marketplace
- **netzerobot.com**: AI chatbot platform
- **netzerocalculator.com**: Solar calculation tools
- **netzeroexpert.com**: Expert consultation system

## Development Commands

### Core Development
```bash
# Start main development server
npm run dev

# Start system monitoring
node shared/monitoring/system-monitoring.js

# Start Stripe payment processing
node shared/payments/stripe-mcp-integration.js

# Run tests
npm test
npm run test:integration

# Build for production
npm run build
```

### ULTRA ELITE Team Deployment
```bash
# Deploy complete stack to all repositories
./scripts/deploy-complete-stack-to-all-repos.sh

# Deploy just the AI team
./scripts/deploy-ultra-team-to-all-repos.sh
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

### Frontend Stack
- **Next.js 14** with TypeScript for all domain applications
- **Tailwind CSS** for styling across all platforms
- **React components** shared across domains via `/shared/components/`

### Backend & APIs
- **Node.js** with TypeScript for MCP servers
- **Stripe API** integration via MCP for payments
- **Google Solar API** for solar potential analysis
- **Retell AI** for voice capabilities
- **Waze API** for traffic and routing

### Infrastructure
- **Vercel** deployment for all 4 domains
- **GitHub Actions** for CI/CD
- **System monitoring** with 99.99% uptime protection
- **Real-time analytics** dashboard

## Critical File Locations

### Core Systems
- `/shared/monitoring/system-monitoring.js` - 99.99% uptime monitoring system
- `/shared/payments/stripe-mcp-integration.js` - Complete payment processing
- `/shared/onboarding/customer-onboarding-system.tsx` - 80% conversion onboarding
- `/shared/auth/unified-auth-system.js` - Cross-domain authentication

### Team & Deployment
- `/team/ULTRA_ELITE_TEAM_ROSTER.md` - Complete 30-person AI team structure
- `/scripts/deploy-complete-stack-to-all-repos.sh` - Universal deployment script
- `/README-ULTRA-DEPLOYMENT.md` - Comprehensive deployment guide

### Multi-Domain Applications
- `/vercel-deployments/solarvoice/` - Main AI marketplace
- `/vercel-deployments/netzerobot/` - AI chatbot platform
- `/vercel-deployments/netzerocalculator/` - Solar calculator
- `/vercel-deployments/netzeroexpert/` - Expert consultation

### MCP Servers
- `/solarvoice-platform/libs/mcp/` - All MCP server implementations
- `/ultra-elite-test/mcp-servers/` - Simplified MCP deployment

## Important Development Patterns

### MCP Server Development
All MCP servers follow the Model Context Protocol standard and are located in `/solarvoice-platform/libs/mcp/`. Each server has:
- `package.json` with MCP dependencies
- `src/index.ts` with server implementation
- TypeScript configuration

### ULTRA ELITE Team Integration
The 30-person AI team is designed to be deployed to any repository. Team members have specific roles and can be referenced in code comments and documentation to maintain consistency.

### Revenue-First Development
All development should consider the $10K MRR target. Key revenue streams:
- AI agent rentals ($0.99 - $299.99)
- Subscription tiers ($99.99 - $999.99/month)
- Solar project payments
- BNPL integration (Affirm/Klarna)

### Multi-Domain Architecture
The platform supports 4 domains with shared components in `/shared/` and domain-specific implementations in `/vercel-deployments/`. Cross-domain authentication is handled via unified auth system.

## Environment Variables Required

### Core APIs
- `STRIPE_SECRET_KEY` - Payment processing
- `GOOGLE_SOLAR_API_KEY` - Solar potential data
- `RETELL_AI_API_KEY` - Voice capabilities
- `OPENAI_API_KEY` - AI model access

### Deployment
- `VERCEL_TOKEN` - Automated deployments
- `GITHUB_TOKEN` - Repository access

## Testing & Quality

### Run Tests
```bash
npm test                    # Unit tests
npm run test:integration   # Integration tests
npm run test:e2e          # End-to-end tests
```

### Code Quality
```bash
npm run lint              # ESLint
npm run format            # Prettier
npm run typecheck         # TypeScript
```

## Revenue & Business Context

This platform is designed to achieve $10K MRR through:
1. **Instant AI agent rentals** (30-second setup)
2. **Subscription marketplace** access
3. **Solar project payments** with BNPL
4. **Multi-domain expansion** across 4 products

The ULTRA ELITE team provides the technical foundation to build and scale at enterprise level while maintaining startup agility.