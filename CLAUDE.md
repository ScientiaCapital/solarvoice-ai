# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## SolarVoice AI Platform - Multi-Domain Voice-First Platform

This is a comprehensive voice-first solar construction AI platform with multi-domain architecture, MCP server integration, and production-ready deployment capabilities.

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

### Quality Assurance
```bash
# Run linting and formatting
npm run lint
npm run format

# Type checking
npm run type-check

# Quality validation
npm run quality:check
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

### MCP Server Development
All MCP servers follow the Model Context Protocol standard and are located in `/solarvoice-platform/libs/mcp/`. Each server has:
- `package.json` with MCP dependencies
- `src/index.ts` with server implementation
- TypeScript configuration

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

### Run Tests
```bash
npm test                    # Unit tests
npm run test:integration   # Integration tests
npm run test:e2e          # End-to-end tests
```

### Code Quality Standards
```bash
npm run lint              # ESLint
npm run format            # Prettier
npm run type-check        # TypeScript validation
npm run quality:check     # Comprehensive quality validation
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