# 🔧 Troubleshooting Guide

Common issues and solutions for SolarVoice Platform developers.

## 📋 Table of Contents

1. [Quick Diagnostics](#quick-diagnostics)
2. [Installation Issues](#installation-issues)
3. [Database Problems](#database-problems)
4. [Redis Connection Issues](#redis-connection-issues)
5. [Voice Service Problems](#voice-service-problems)
6. [AI Agent Issues](#ai-agent-issues)
7. [WebSocket Problems](#websocket-problems)
8. [Authentication Errors](#authentication-errors)
9. [Performance Issues](#performance-issues)
10. [Docker Problems](#docker-problems)
11. [Build & Deployment Issues](#build--deployment-issues)
12. [Testing Problems](#testing-problems)
13. [Emergency Procedures](#emergency-procedures)

## Quick Diagnostics

Run this diagnostic script to check your environment:

```bash
#!/bin/bash
echo "🔍 SolarVoice Platform Diagnostics"
echo "=================================="

# Check Node.js
echo -n "Node.js: "
node --version || echo "❌ Not installed"

# Check npm
echo -n "npm: "
npm --version || echo "❌ Not installed"

# Check Python
echo -n "Python: "
python --version || echo "❌ Not installed"

# Check PostgreSQL
echo -n "PostgreSQL: "
pg_isready -h localhost -p 5432 && echo "✅ Running" || echo "❌ Not running"

# Check Redis
echo -n "Redis: "
redis-cli ping 2>/dev/null && echo "✅ Running" || echo "❌ Not running"

# Check API Health
echo -n "API Server: "
curl -s http://localhost:3000/health > /dev/null && echo "✅ Running" || echo "❌ Not running"

# Check WebSocket
echo -n "WebSocket: "
curl -s http://localhost:3333 > /dev/null && echo "✅ Running" || echo "❌ Not running"

# Check environment file
echo -n ".env file: "
[ -f .env ] && echo "✅ Exists" || echo "❌ Missing"
```

## Installation Issues

### Problem: npm install fails with permission errors

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall with correct permissions
npm install

# If still failing, try with sudo (not recommended)
sudo npm install --unsafe-perm
```

### Problem: Python dependencies fail to install

**Solution:**
```bash
# Ensure you're in virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Upgrade pip
pip install --upgrade pip

# Install with verbose output
pip install -r requirements.txt -v

# If specific package fails
pip install problematic-package --no-cache-dir
```

### Problem: node-gyp rebuild errors

**Solution:**
```bash
# Install build tools
# On macOS:
xcode-select --install

# On Ubuntu/Debian:
sudo apt-get install build-essential

# On Windows:
npm install --global windows-build-tools

# Then retry installation
npm install
```

## Database Problems

### Problem: Cannot connect to database

**Solution:**
```bash
# Check PostgreSQL is running
sudo systemctl status postgresql  # Linux
brew services list | grep postgresql  # macOS

# Start PostgreSQL
sudo systemctl start postgresql  # Linux
brew services start postgresql  # macOS

# Verify connection
psql -U solarvoice_user -d solarvoice_db -h localhost

# Check .env configuration
grep DATABASE .env
```

### Problem: Database migrations fail

**Solution:**
```bash
# Reset database (CAUTION: Deletes all data)
npm run db:reset

# Run migrations manually
npx typeorm migration:run

# Check migration status
npx typeorm migration:show

# Create new migration if needed
npx typeorm migration:create -n FixIssue
```

### Problem: "relation does not exist" errors

**Solution:**
```sql
-- Connect to database
psql -U solarvoice_user -d solarvoice_db

-- Check existing tables
\dt

-- Run missing migrations
npm run db:migrate

-- If tables still missing, recreate schema
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO solarvoice_user;

-- Then run migrations again
npm run db:migrate
```

## Redis Connection Issues

### Problem: Redis connection refused

**Solution:**
```bash
# Check Redis is running
redis-cli ping

# Start Redis
redis-server  # Or: brew services start redis

# Check Redis config
redis-cli CONFIG GET bind
redis-cli CONFIG GET requirepass

# Test connection with password
redis-cli -a your_password ping

# Update .env if needed
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_password
```

### Problem: Redis memory issues

**Solution:**
```bash
# Check memory usage
redis-cli INFO memory

# Clear all data (CAUTION)
redis-cli FLUSHALL

# Set memory limit
redis-cli CONFIG SET maxmemory 2gb
redis-cli CONFIG SET maxmemory-policy allkeys-lru

# Monitor in real-time
redis-cli --stat
```

## Voice Service Problems

### Problem: Retell AI not responding

**Solution:**
```typescript
// Check API key is set
console.log('Retell API Key:', process.env.RETELL_API_KEY?.substring(0, 10) + '...');

// Test Retell connection
const retell = new Retell({
  apiKey: process.env.RETELL_API_KEY,
});

try {
  const agents = await retell.agent.list();
  console.log('Retell connected:', agents);
} catch (error) {
  console.error('Retell error:', error);
}
```

### Problem: ElevenLabs voice synthesis fails

**Solution:**
```javascript
// Test ElevenLabs connection
const axios = require('axios');

async function testElevenLabs() {
  try {
    const response = await axios.get('https://api.elevenlabs.io/v1/voices', {
      headers: {
        'xi-api-key': process.env.ELEVENLABS_API_KEY
      }
    });
    console.log('Available voices:', response.data.voices.length);
  } catch (error) {
    console.error('ElevenLabs error:', error.response?.data || error.message);
  }
}

testElevenLabs();
```

### Problem: Voice commands not recognized

**Solution:**
1. Check microphone permissions
2. Verify audio format (should be 16kHz, 16-bit, mono)
3. Test with sample audio file:
```bash
# Test voice endpoint
curl -X POST http://localhost:3000/api/v1/voice/test \
  -H "Content-Type: application/json" \
  -d '{"text": "Test voice command"}'
```

## AI Agent Issues

### Problem: CrewAI agents not responding

**Solution:**
```bash
# Check Python process
ps aux | grep python | grep crewai

# Restart CrewAI
pkill -f "python.*crewai"
npm run crewai:start

# Check logs
tail -f crewai/logs/crewai.log

# Test CrewAI connection
python crewai/test_integration_simple.py
```

### Problem: Agent orchestration errors

**Solution:**
```typescript
// Enable debug logging
process.env.DEBUG = 'solarvoice:agents:*';

// Test agent directly
const agent = new CrewChiefAgent();
const result = await agent.processRequest({
  type: 'test',
  payload: { message: 'Hello' }
});
console.log('Agent response:', result);
```

### Problem: WebSocket bridge not connecting

**Solution:**
```bash
# Check both servers are running
lsof -i :3333  # API server
lsof -i :8765  # CrewAI WebSocket

# Restart bridge
./test-crewai-bridge.sh

# Monitor WebSocket messages
npm run ws:monitor
```

## WebSocket Problems

### Problem: WebSocket connection drops

**Solution:**
```javascript
// Implement reconnection logic
const WebSocket = require('ws');

function connectWithRetry() {
  const ws = new WebSocket('ws://localhost:3333');
  
  ws.on('open', () => {
    console.log('Connected');
    // Reset retry count
  });
  
  ws.on('close', () => {
    console.log('Disconnected, retrying in 5s...');
    setTimeout(connectWithRetry, 5000);
  });
  
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
  
  return ws;
}
```

### Problem: WebSocket message size limit

**Solution:**
```javascript
// Increase message size limit
const wss = new WebSocket.Server({
  port: 3333,
  maxPayload: 100 * 1024 * 1024, // 100MB
});

// For client
const ws = new WebSocket('ws://localhost:3333', {
  maxPayload: 100 * 1024 * 1024,
});
```

## Authentication Errors

### Problem: JWT token invalid

**Solution:**
```bash
# Regenerate JWT secret
openssl rand -base64 32

# Update .env
JWT_SECRET=new_generated_secret

# Clear Redis session cache
redis-cli DEL "solarvoice:sessions:*"

# Restart server
npm run start:dev
```

### Problem: CORS errors

**Solution:**
```typescript
// Update CORS configuration
app.enableCors({
  origin: process.env.CORS_ORIGINS?.split(',') || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

// For development, allow all origins
app.enableCors({
  origin: true,
  credentials: true,
});
```

## Performance Issues

### Problem: Slow API responses

**Solution:**
```bash
# Enable performance monitoring
npm run monitoring:start

# Check slow queries
psql -U solarvoice_user -d solarvoice_db
> EXPLAIN ANALYZE SELECT * FROM your_slow_query;

# Add database indexes
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_voice_commands_user ON voice_commands(user_id);

# Enable query logging
LOG_LEVEL=debug npm run start:dev
```

### Problem: High memory usage

**Solution:**
```bash
# Monitor memory usage
node --inspect apps/api/src/main.ts

# In Chrome, go to chrome://inspect
# Take heap snapshot and analyze

# Increase Node.js memory limit
node --max-old-space-size=4096 dist/main.js

# Check for memory leaks
npm run test:memory-leaks
```

## Docker Problems

### Problem: Docker containers won't start

**Solution:**
```bash
# Check Docker daemon
docker version

# View container logs
docker-compose logs -f

# Rebuild containers
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Check container health
docker-compose ps
docker inspect solarvoice-api | grep -i health
```

### Problem: Container can't connect to host services

**Solution:**
```yaml
# Use host.docker.internal for macOS/Windows
DATABASE_HOST: host.docker.internal

# For Linux, use host networking
network_mode: host

# Or use Docker's bridge network IP
DATABASE_HOST: 172.17.0.1
```

## Build & Deployment Issues

### Problem: TypeScript compilation errors

**Solution:**
```bash
# Clear TypeScript cache
rm -rf dist tsconfig.tsbuildinfo

# Check for type errors
npm run typecheck

# Build with less strict settings
npm run build:quick

# Skip library checks if needed
tsc --skipLibCheck

# Update TypeScript
npm install typescript@latest
```

### Problem: Production build fails

**Solution:**
```bash
# Clean everything
npm run clean
rm -rf node_modules package-lock.json

# Install production dependencies only
npm ci --only=production

# Build for production
NODE_ENV=production npm run build:prod

# Test production build locally
NODE_ENV=production node dist/main.js
```

## Testing Problems

### Problem: Tests hanging or timing out

**Solution:**
```bash
# Run tests with timeout and detect open handles
npm run test:debug -- --detectOpenHandles --forceExit

# Run single test file
npm test -- path/to/test.spec.ts

# Increase test timeout
jest.setTimeout(30000); // 30 seconds

# Check for async issues
npm run test -- --runInBand
```

### Problem: Test database conflicts

**Solution:**
```bash
# Use separate test database
TEST_DATABASE_NAME=solarvoice_test_${RANDOM}

# Clean test database after each run
afterAll(async () => {
  await connection.dropDatabase();
  await connection.close();
});

# Run tests in isolation
npm test -- --maxWorkers=1
```

## Emergency Procedures

### System is completely down

1. **Check critical services:**
```bash
./scripts/health-check-all.sh
```

2. **Restart everything:**
```bash
docker-compose down
docker-compose up -d
npm run emergency:restart
```

3. **Check logs:**
```bash
tail -f logs/*.log
docker-compose logs -f
journalctl -u solarvoice -f
```

### Database corruption

1. **Backup current state:**
```bash
pg_dump -U solarvoice_user solarvoice_db > backup_$(date +%Y%m%d_%H%M%S).sql
```

2. **Restore from backup:**
```bash
psql -U solarvoice_user solarvoice_db < backup_latest.sql
```

3. **Verify integrity:**
```sql
SELECT COUNT(*) FROM each_table;
ANALYZE;
REINDEX DATABASE solarvoice_db;
```

### Memory leak in production

1. **Take heap snapshot:**
```bash
kill -USR2 <pid>  # Triggers heap dump
```

2. **Analyze with Chrome DevTools**

3. **Emergency restart with monitoring:**
```bash
pm2 restart solarvoice --update-env
pm2 monit
```

## Getting Additional Help

1. **Check logs first:**
   - Application logs: `logs/app.log`
   - Error logs: `logs/error.log`
   - Docker logs: `docker-compose logs`

2. **Enable debug mode:**
   ```bash
   DEBUG=* npm run start:dev
   ```

3. **Search existing issues:**
   - GitHub Issues
   - Internal wiki
   - Slack history

4. **Create detailed bug report:**
   - Environment details
   - Steps to reproduce
   - Error messages
   - Relevant logs
   - What you've tried

5. **Emergency contacts:**
   - DevOps on-call: #devops-oncall
   - Team lead: #team-leads
   - Critical issues: #emergency-response