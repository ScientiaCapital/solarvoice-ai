# 🚀 SolarVoice Platform - Developer Guide

Welcome to the SolarVoice Platform development team! This guide will get you from zero to productive in under 30 minutes.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Quick Start](#quick-start)
3. [Development Environment Setup](#development-environment-setup)
4. [Project Structure](#project-structure)
5. [Core Concepts](#core-concepts)
6. [Development Workflow](#development-workflow)
7. [Testing](#testing)
8. [Debugging](#debugging)
9. [Best Practices](#best-practices)
10. [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Software

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Python**: v3.9 or higher (for CrewAI integration)
- **Docker**: v20.10 or higher
- **Docker Compose**: v2.0 or higher
- **Git**: v2.30 or higher
- **Redis**: v6.0 or higher (or use Docker)
- **PostgreSQL**: v14.0 or higher (or use Docker)

### Recommended IDE Setup

- **VS Code** with extensions:
  - ESLint
  - Prettier
  - TypeScript and JavaScript Language Features
  - Docker
  - Python
  - GitLens
  - Thunder Client (for API testing)

## Quick Start

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/ScientiaCapital/solarvoice-platform.git
cd solarvoice-platform

# Install Node.js dependencies
npm install

# Set up Python environment (for CrewAI)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Configure Environment

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your settings (required for external services)
# For local development, most defaults work out of the box
```

### 3. Start Development Environment

```bash
# Option 1: Full stack with Docker (recommended for first-time setup)
docker-compose up -d

# Option 2: Launch Ultra development environment (includes everything)
./launch-ultra-complete.sh

# Option 3: Start individual services
npm run start:dev          # API server
npm run crewai:start       # AI agents
./launch-dashboard.sh      # Monitoring dashboard
```

### 4. Verify Installation

```bash
# Check API health
curl http://localhost:3000/health

# Check WebSocket connection
npm run test:ws

# Run quick test suite
npm run test:quick
```

## Development Environment Setup

### Database Setup

#### Using Docker (Recommended)

```bash
# Start PostgreSQL and Redis
docker-compose up -d postgres redis

# Run migrations
npm run db:migrate

# Seed development data
npm run db:seed
```

#### Manual Setup

```sql
-- Create database
CREATE DATABASE solarvoice_db;
CREATE USER solarvoice_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE solarvoice_db TO solarvoice_user;
```

### AI Services Configuration

1. **Retell AI** (Voice Recognition)
   - Sign up at https://retell.ai
   - Get API key from dashboard
   - Add to `.env`: `RETELL_API_KEY=your_key`

2. **ElevenLabs** (Voice Synthesis)
   - Sign up at https://elevenlabs.io
   - Get API key from profile
   - Add to `.env`: `ELEVENLABS_API_KEY=your_key`

3. **Solar Monitoring APIs** (Optional)
   - Enphase: https://developer.enphase.com
   - SolarEdge: https://monitoring.solaredge.com/solaredge-web/p/login

## Project Structure

```
solarvoice-platform/
├── apps/                      # Applications
│   ├── api/                   # Main NestJS API
│   │   ├── src/
│   │   │   ├── auth/          # Authentication module
│   │   │   ├── projects/      # Project management
│   │   │   ├── voice/         # Voice processing
│   │   │   └── main.ts        # Application entry
│   │   └── monitoring-demo.ts # Monitoring example
│   └── web-dashboard/         # React dashboard
├── libs/                      # Shared libraries
│   ├── agents/                # AI agent implementations
│   │   ├── core/              # Base agent classes
│   │   ├── crews/             # Agent crew definitions
│   │   └── tools/             # Agent tools
│   ├── voice/                 # Voice processing library
│   ├── database/              # Database utilities
│   └── shared/                # Shared types and entities
├── crewai/                    # CrewAI Python integration
│   ├── crews/                 # 10 specialized AI crews
│   ├── agents/                # Agent definitions
│   └── launch_ultra_platform.py # Main orchestrator
├── integrations/              # External service integrations
├── tests/                     # Test suites
│   ├── unit/                  # Unit tests
│   ├── integration/           # Integration tests
│   └── e2e/                   # End-to-end tests
└── scripts/                   # Build and deployment scripts
```

## Core Concepts

### 1. Voice-First Architecture

Everything starts with voice commands:

```typescript
// Example: Voice command processing
@Controller('voice')
export class VoiceController {
  @Post('command')
  async processCommand(@Body() command: VoiceCommandDto) {
    // 1. Transcribe audio
    const transcript = await this.voiceService.transcribe(command.audio);
    
    // 2. Extract intent
    const intent = await this.nlpService.extractIntent(transcript);
    
    // 3. Route to appropriate AI agent
    const response = await this.agentOrchestrator.handleIntent(intent);
    
    // 4. Synthesize response
    return this.voiceService.synthesize(response);
  }
}
```

### 2. AI Agent System

80+ agents organized into 10 crews:

```python
# Example: Creating an AI crew
from crewai import Crew, Agent, Task

class FieldOperationsCrew:
    def __init__(self):
        self.crew_chief = Agent(
            role="Crew Chief",
            goal="Optimize field operations",
            backstory="20+ years solar installation experience"
        )
        
        self.safety_sentinel = Agent(
            role="Safety Officer",
            goal="Ensure zero incidents",
            backstory="OSHA certified safety expert"
        )
        
    def execute_task(self, task_description):
        task = Task(
            description=task_description,
            agent=self.crew_chief
        )
        return self.crew.kickoff()
```

### 3. Real-Time WebSocket Communication

```javascript
// WebSocket server for real-time updates
const WebSocket = require('ws');

wss.on('connection', (ws) => {
  ws.on('message', async (message) => {
    const data = JSON.parse(message);
    
    // Broadcast to all AI agents
    await broadcastToAgents(data);
    
    // Update dashboard in real-time
    updateDashboard(data);
  });
});
```

## Development Workflow

### 1. Feature Development

```bash
# Create feature branch
git checkout -b feature/voice-emotion-detection

# Start development server with hot reload
npm run start:dev

# Make changes and test locally
# Write tests alongside code
npm run test:watch

# Commit with conventional commits
git commit -m "feat(voice): add emotion detection to voice synthesis"
```

### 2. Adding a New AI Agent

1. Define agent in `libs/agents/core/`:
```typescript
export class WeatherMonitorAgent extends BaseAgent {
  async processRequest(request: AgentRequest): Promise<AgentResponse> {
    // Agent logic here
  }
}
```

2. Add to crew in `crewai/crews/`:
```python
weather_monitor = Agent(
    role="Weather Monitor",
    goal="Track weather for optimal installation conditions",
    tools=[weather_api, schedule_optimizer]
)
```

3. Register in orchestrator:
```typescript
this.agentFactory.register('weather-monitor', WeatherMonitorAgent);
```

### 3. API Development

```typescript
// Example: Adding new endpoint
@Controller('solar-panels')
export class SolarPanelController {
  @Post('optimize-layout')
  @UseGuards(JwtAuthGuard)
  async optimizeLayout(@Body() layoutDto: LayoutDto) {
    // Call AI agent for optimization
    const optimized = await this.layoutAgent.optimize(layoutDto);
    return { success: true, layout: optimized };
  }
}
```

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run specific test suite
npm run test:auth
npm run test:voice
npm run test:crewai

# Run with coverage
npm run test:coverage

# Run in watch mode during development
npm run test:watch

# Run integration tests
npm run test:integration

# Run performance tests
npm run test:performance
```

### Writing Tests

```typescript
// Example unit test
describe('VoiceService', () => {
  it('should transcribe audio correctly', async () => {
    const audio = loadTestAudio('test-command.wav');
    const result = await voiceService.transcribe(audio);
    expect(result.text).toBe('Schedule installation for tomorrow');
    expect(result.confidence).toBeGreaterThan(0.9);
  });
});

// Example integration test
describe('Voice Command Flow', () => {
  it('should process end-to-end voice command', async () => {
    const response = await request(app.getHttpServer())
      .post('/voice/command')
      .send({ audio: testAudioBuffer })
      .expect(200);
      
    expect(response.body).toHaveProperty('action');
    expect(response.body).toHaveProperty('synthesizedAudio');
  });
});
```

## Debugging

### VS Code Debugging

1. Add launch configuration (`.vscode/launch.json`):
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug NestJS",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "start:debug"],
      "console": "integratedTerminal",
      "restart": true
    }
  ]
}
```

2. Set breakpoints and press F5 to start debugging

### Logging

```typescript
// Use structured logging
import { Logger } from '@nestjs/common';

export class VoiceService {
  private readonly logger = new Logger(VoiceService.name);
  
  async processCommand(command: string) {
    this.logger.log(`Processing command: ${command}`);
    
    try {
      const result = await this.process(command);
      this.logger.debug('Command processed successfully', { result });
      return result;
    } catch (error) {
      this.logger.error('Command processing failed', error.stack);
      throw error;
    }
  }
}
```

### Monitoring

Access real-time monitoring dashboard:
- http://localhost:3333/dashboard.html
- View WebSocket messages
- Monitor AI agent activity
- Track performance metrics

## Best Practices

### 1. Code Style

- Use TypeScript for type safety
- Follow ESLint rules (auto-fixed on save)
- Use Prettier for consistent formatting
- Write self-documenting code

### 2. Git Workflow

```bash
# Always pull latest changes
git pull origin main

# Create feature branch
git checkout -b feature/your-feature

# Make atomic commits
git add -p  # Stage changes interactively
git commit -m "feat: add voice emotion detection"

# Push and create PR
git push origin feature/your-feature
```

### 3. Performance

- Use Redis for caching frequently accessed data
- Implement database indexes for common queries
- Use WebSocket for real-time updates instead of polling
- Batch AI agent requests when possible

### 4. Security

- Never commit secrets (use .env files)
- Validate all input data
- Use proper authentication guards
- Implement rate limiting for public endpoints

## Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Find process using port
lsof -i :3000

# Kill process
kill -9 <PID>
```

#### Database Connection Failed
```bash
# Check PostgreSQL is running
docker ps | grep postgres

# Check connection string in .env
# Ensure DATABASE_HOST=localhost (not postgres) for local dev
```

#### AI Agent Not Responding
```bash
# Check CrewAI is running
ps aux | grep python | grep crewai

# Restart CrewAI
npm run crewai:start
```

#### WebSocket Connection Issues
```bash
# Test WebSocket connection
npm run test:ws

# Check firewall/proxy settings
# Ensure port 3333 is not blocked
```

### Getting Help

1. Check existing documentation in `/docs`
2. Search issues on GitHub
3. Ask in team Slack channel
4. Create detailed bug report with:
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details
   - Relevant logs

## Next Steps

1. Complete the [Developer Cookbook](DEVELOPER_COOKBOOK.md) tutorials
2. Read [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for detailed solutions
3. Check [ENVIRONMENT_VARIABLES.md](ENVIRONMENT_VARIABLES.md) for all config options
4. Join the daily standup to meet the team
5. Pick a "good first issue" from GitHub to start contributing

Welcome to the team! 🚀