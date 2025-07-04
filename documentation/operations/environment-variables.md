# 🔧 Environment Variables Reference

Complete guide to all environment variables used in the SolarVoice Platform.

## 📋 Table of Contents

1. [Core Application](#core-application)
2. [Database Configuration](#database-configuration)
3. [Redis Configuration](#redis-configuration)
4. [Authentication & Security](#authentication--security)
5. [Voice AI Services](#voice-ai-services)
6. [Solar Monitoring APIs](#solar-monitoring-apis)
7. [Webhook Configuration](#webhook-configuration)
8. [Logging & Monitoring](#logging--monitoring)
9. [Feature Flags](#feature-flags)
10. [Development Tools](#development-tools)
11. [Production Settings](#production-settings)

## Core Application

### NODE_ENV
- **Type**: `string`
- **Default**: `development`
- **Options**: `development`, `test`, `staging`, `production`
- **Description**: Determines the application runtime environment
- **Example**: `NODE_ENV=production`

### PORT
- **Type**: `number`
- **Default**: `3000`
- **Description**: Port number for the main API server
- **Example**: `PORT=3000`

### API_VERSION
- **Type**: `string`
- **Default**: `v1`
- **Description**: API version prefix for all endpoints
- **Example**: `API_VERSION=v1`

### APP_NAME
- **Type**: `string`
- **Default**: `SolarVoice Platform`
- **Description**: Application name used in logs and notifications
- **Example**: `APP_NAME="SolarVoice Platform"`

### APP_URL
- **Type**: `string`
- **Default**: `http://localhost:3000`
- **Description**: Full URL where the application is hosted
- **Example**: `APP_URL=https://api.solarvoice.ai`

## Database Configuration

### DATABASE_HOST
- **Type**: `string`
- **Default**: `localhost`
- **Description**: PostgreSQL database host
- **Example**: `DATABASE_HOST=postgres.example.com`

### DATABASE_PORT
- **Type**: `number`
- **Default**: `5432`
- **Description**: PostgreSQL database port
- **Example**: `DATABASE_PORT=5432`

### DATABASE_USERNAME
- **Type**: `string`
- **Default**: `solarvoice_user`
- **Description**: Database user for authentication
- **Example**: `DATABASE_USERNAME=solarvoice_user`

### DATABASE_PASSWORD
- **Type**: `string`
- **Required**: Yes
- **Description**: Database password for authentication
- **Example**: `DATABASE_PASSWORD=super_secure_password_123!`

### DATABASE_NAME
- **Type**: `string`
- **Default**: `solarvoice_db`
- **Description**: Name of the PostgreSQL database
- **Example**: `DATABASE_NAME=solarvoice_production`

### DATABASE_SSL
- **Type**: `boolean`
- **Default**: `false`
- **Description**: Enable SSL for database connections
- **Example**: `DATABASE_SSL=true`

### DATABASE_POOL_SIZE
- **Type**: `number`
- **Default**: `10`
- **Description**: Maximum number of database connections in pool
- **Example**: `DATABASE_POOL_SIZE=20`

### DATABASE_TIMEOUT
- **Type**: `number`
- **Default**: `30000`
- **Description**: Database query timeout in milliseconds
- **Example**: `DATABASE_TIMEOUT=60000`

## Redis Configuration

### REDIS_HOST
- **Type**: `string`
- **Default**: `localhost`
- **Description**: Redis server host
- **Example**: `REDIS_HOST=redis.example.com`

### REDIS_PORT
- **Type**: `number`
- **Default**: `6379`
- **Description**: Redis server port
- **Example**: `REDIS_PORT=6379`

### REDIS_PASSWORD
- **Type**: `string`
- **Required**: Recommended for production
- **Description**: Redis authentication password
- **Example**: `REDIS_PASSWORD=redis_secure_password`

### REDIS_DB
- **Type**: `number`
- **Default**: `0`
- **Description**: Redis database number to use
- **Example**: `REDIS_DB=1`

### REDIS_TTL
- **Type**: `number`
- **Default**: `3600`
- **Description**: Default TTL for cached items in seconds
- **Example**: `REDIS_TTL=7200`

### REDIS_KEY_PREFIX
- **Type**: `string`
- **Default**: `solarvoice:`
- **Description**: Prefix for all Redis keys
- **Example**: `REDIS_KEY_PREFIX=sv:prod:`

## Authentication & Security

### JWT_SECRET
- **Type**: `string`
- **Required**: Yes
- **Description**: Secret key for signing JWT tokens (min 32 characters)
- **Example**: `JWT_SECRET=your-super-secret-jwt-key-that-is-very-long-and-secure`

### JWT_EXPIRES_IN
- **Type**: `string`
- **Default**: `7d`
- **Description**: JWT token expiration time
- **Example**: `JWT_EXPIRES_IN=24h`

### JWT_REFRESH_SECRET
- **Type**: `string`
- **Required**: Yes
- **Description**: Secret key for refresh tokens
- **Example**: `JWT_REFRESH_SECRET=another-super-secret-key-for-refresh-tokens`

### JWT_REFRESH_EXPIRES_IN
- **Type**: `string`
- **Default**: `30d`
- **Description**: Refresh token expiration time
- **Example**: `JWT_REFRESH_EXPIRES_IN=90d`

### BCRYPT_ROUNDS
- **Type**: `number`
- **Default**: `10`
- **Description**: Number of bcrypt hashing rounds
- **Example**: `BCRYPT_ROUNDS=12`

### CORS_ORIGINS
- **Type**: `string` (comma-separated)
- **Default**: `http://localhost:3000,http://localhost:3001`
- **Description**: Allowed CORS origins
- **Example**: `CORS_ORIGINS=https://app.solarvoice.ai,https://dashboard.solarvoice.ai`

### RATE_LIMIT_MAX
- **Type**: `number`
- **Default**: `100`
- **Description**: Maximum requests per window
- **Example**: `RATE_LIMIT_MAX=1000`

### RATE_LIMIT_WINDOW
- **Type**: `number`
- **Default**: `900000` (15 minutes)
- **Description**: Rate limit window in milliseconds
- **Example**: `RATE_LIMIT_WINDOW=3600000`

## Voice AI Services

### RETELL_API_KEY
- **Type**: `string`
- **Required**: Yes for voice features
- **Description**: API key for Retell AI voice service
- **Example**: `RETELL_API_KEY=rtl_xxxxxxxxxxxxxxxxxxxxx`

### RETELL_AGENT_ID
- **Type**: `string`
- **Required**: Yes for voice features
- **Description**: Default Retell agent ID
- **Example**: `RETELL_AGENT_ID=agent_xxxxxxxxxxxxx`

### RETELL_WEBHOOK_SECRET
- **Type**: `string`
- **Required**: Yes for webhooks
- **Description**: Secret for validating Retell webhooks
- **Example**: `RETELL_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx`

### ELEVENLABS_API_KEY
- **Type**: `string`
- **Required**: Yes for voice synthesis
- **Description**: API key for ElevenLabs voice synthesis
- **Example**: `ELEVENLABS_API_KEY=el_xxxxxxxxxxxxxxxxxxxxx`

### ELEVENLABS_VOICE_ID
- **Type**: `string`
- **Default**: `21m00Tcm4TlvDq8ikWAM`
- **Description**: Default voice ID for synthesis
- **Example**: `ELEVENLABS_VOICE_ID=custom_voice_id`

### ELEVENLABS_MODEL_ID
- **Type**: `string`
- **Default**: `eleven_monolingual_v1`
- **Description**: ElevenLabs model to use
- **Example**: `ELEVENLABS_MODEL_ID=eleven_multilingual_v2`

### VOICE_EMOTION_ENABLED
- **Type**: `boolean`
- **Default**: `true`
- **Description**: Enable emotion detection in voice
- **Example**: `VOICE_EMOTION_ENABLED=true`

## Solar Monitoring APIs

### ENPHASE_API_KEY
- **Type**: `string`
- **Required**: For Enphase integration
- **Description**: Enphase Enlighten API key
- **Example**: `ENPHASE_API_KEY=enph_xxxxxxxxxxxxx`

### ENPHASE_USER_ID
- **Type**: `string`
- **Required**: For Enphase integration
- **Description**: Enphase user ID
- **Example**: `ENPHASE_USER_ID=4d546f78737`

### ENPHASE_SYSTEM_ID
- **Type**: `string`
- **Description**: Default Enphase system ID
- **Example**: `ENPHASE_SYSTEM_ID=67890`

### SOLAREDGE_API_KEY
- **Type**: `string`
- **Required**: For SolarEdge integration
- **Description**: SolarEdge monitoring API key
- **Example**: `SOLAREDGE_API_KEY=se_xxxxxxxxxxxxx`

### SOLAREDGE_SITE_ID
- **Type**: `string`
- **Description**: Default SolarEdge site ID
- **Example**: `SOLAREDGE_SITE_ID=12345`

### SOLAR_MONITORING_INTERVAL
- **Type**: `number`
- **Default**: `300000` (5 minutes)
- **Description**: Polling interval for solar data in ms
- **Example**: `SOLAR_MONITORING_INTERVAL=600000`

## Webhook Configuration

### WEBHOOK_SECRET
- **Type**: `string`
- **Required**: Yes
- **Description**: Secret for validating incoming webhooks
- **Example**: `WEBHOOK_SECRET=webhook_secret_key_xxxxx`

### WEBHOOK_TIMEOUT
- **Type**: `number`
- **Default**: `30000`
- **Description**: Webhook request timeout in milliseconds
- **Example**: `WEBHOOK_TIMEOUT=60000`

### WEBHOOK_RETRY_ATTEMPTS
- **Type**: `number`
- **Default**: `3`
- **Description**: Number of webhook retry attempts
- **Example**: `WEBHOOK_RETRY_ATTEMPTS=5`

### WEBHOOK_RETRY_DELAY
- **Type**: `number`
- **Default**: `1000`
- **Description**: Delay between webhook retries in ms
- **Example**: `WEBHOOK_RETRY_DELAY=2000`

## Logging & Monitoring

### LOG_LEVEL
- **Type**: `string`
- **Default**: `info`
- **Options**: `error`, `warn`, `info`, `debug`, `verbose`
- **Description**: Minimum log level to output
- **Example**: `LOG_LEVEL=debug`

### LOG_FORMAT
- **Type**: `string`
- **Default**: `json`
- **Options**: `json`, `pretty`, `simple`
- **Description**: Log output format
- **Example**: `LOG_FORMAT=pretty`

### LOG_FILE_PATH
- **Type**: `string`
- **Default**: `./logs/app.log`
- **Description**: Path for log file output
- **Example**: `LOG_FILE_PATH=/var/log/solarvoice/app.log`

### LOG_MAX_FILES
- **Type**: `number`
- **Default**: `14`
- **Description**: Maximum number of log files to keep
- **Example**: `LOG_MAX_FILES=30`

### LOG_MAX_SIZE
- **Type**: `string`
- **Default**: `20m`
- **Description**: Maximum size of each log file
- **Example**: `LOG_MAX_SIZE=50m`

### SENTRY_DSN
- **Type**: `string`
- **Required**: For error tracking
- **Description**: Sentry error tracking DSN
- **Example**: `SENTRY_DSN=https://xxxxx@sentry.io/xxxxx`

### METRICS_ENABLED
- **Type**: `boolean`
- **Default**: `true`
- **Description**: Enable metrics collection
- **Example**: `METRICS_ENABLED=true`

### METRICS_PORT
- **Type**: `number`
- **Default**: `9090`
- **Description**: Port for metrics endpoint
- **Example**: `METRICS_PORT=9090`

## Feature Flags

### FEATURE_VOICE_COMMANDS
- **Type**: `boolean`
- **Default**: `true`
- **Description**: Enable voice command processing
- **Example**: `FEATURE_VOICE_COMMANDS=true`

### FEATURE_AI_AGENTS
- **Type**: `boolean`
- **Default**: `true`
- **Description**: Enable AI agent system
- **Example**: `FEATURE_AI_AGENTS=true`

### FEATURE_REALTIME_SYNC
- **Type**: `boolean`
- **Default**: `true`
- **Description**: Enable real-time WebSocket sync
- **Example**: `FEATURE_REALTIME_SYNC=true`

### FEATURE_MULTI_TENANT
- **Type**: `boolean`
- **Default**: `true`
- **Description**: Enable multi-tenant support
- **Example**: `FEATURE_MULTI_TENANT=true`

### FEATURE_BETA_FEATURES
- **Type**: `boolean`
- **Default**: `false`
- **Description**: Enable beta features
- **Example**: `FEATURE_BETA_FEATURES=true`

## Development Tools

### DEBUG
- **Type**: `string`
- **Description**: Enable debug output for specific modules
- **Example**: `DEBUG=solarvoice:*`

### FORCE_COLOR
- **Type**: `boolean`
- **Default**: `true`
- **Description**: Force colored output in logs
- **Example**: `FORCE_COLOR=true`

### MOCK_EXTERNAL_APIS
- **Type**: `boolean`
- **Default**: `false`
- **Description**: Use mock responses for external APIs
- **Example**: `MOCK_EXTERNAL_APIS=true`

### SEED_DATABASE
- **Type**: `boolean`
- **Default**: `false`
- **Description**: Seed database with test data on startup
- **Example**: `SEED_DATABASE=true`

### DISABLE_CACHE
- **Type**: `boolean`
- **Default**: `false`
- **Description**: Disable Redis caching
- **Example**: `DISABLE_CACHE=true`

## Production Settings

### CLUSTER_ENABLED
- **Type**: `boolean`
- **Default**: `true` in production
- **Description**: Enable Node.js clustering
- **Example**: `CLUSTER_ENABLED=true`

### CLUSTER_WORKERS
- **Type**: `number`
- **Default**: CPU count
- **Description**: Number of cluster workers
- **Example**: `CLUSTER_WORKERS=4`

### GRACEFUL_SHUTDOWN_TIMEOUT
- **Type**: `number`
- **Default**: `30000`
- **Description**: Graceful shutdown timeout in ms
- **Example**: `GRACEFUL_SHUTDOWN_TIMEOUT=60000`

### HEALTH_CHECK_INTERVAL
- **Type**: `number`
- **Default**: `30000`
- **Description**: Health check interval in ms
- **Example**: `HEALTH_CHECK_INTERVAL=60000`

### MAX_REQUEST_SIZE
- **Type**: `string`
- **Default**: `10mb`
- **Description**: Maximum request body size
- **Example**: `MAX_REQUEST_SIZE=50mb`

### REQUEST_TIMEOUT
- **Type**: `number`
- **Default**: `120000`
- **Description**: Global request timeout in ms
- **Example**: `REQUEST_TIMEOUT=300000`

## Usage Examples

### Development Environment (.env.development)
```bash
NODE_ENV=development
PORT=3000
DATABASE_HOST=localhost
DATABASE_PASSWORD=dev_password
REDIS_HOST=localhost
JWT_SECRET=dev-secret-key-for-local-development-only
LOG_LEVEL=debug
MOCK_EXTERNAL_APIS=true
```

### Production Environment (.env.production)
```bash
NODE_ENV=production
PORT=3000
DATABASE_HOST=prod-db.aws.com
DATABASE_PASSWORD=${SECRET_DB_PASSWORD}
DATABASE_SSL=true
REDIS_HOST=prod-redis.aws.com
REDIS_PASSWORD=${SECRET_REDIS_PASSWORD}
JWT_SECRET=${SECRET_JWT_KEY}
LOG_LEVEL=info
SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
CLUSTER_ENABLED=true
```

### Testing Environment (.env.test)
```bash
NODE_ENV=test
PORT=3001
DATABASE_HOST=localhost
DATABASE_NAME=solarvoice_test
REDIS_DB=1
JWT_SECRET=test-secret-key
LOG_LEVEL=error
MOCK_EXTERNAL_APIS=true
```

## Security Best Practices

1. **Never commit .env files** to version control
2. **Use strong, unique secrets** for JWT and webhook tokens
3. **Rotate secrets regularly** (every 90 days)
4. **Use environment-specific secrets** (dev/staging/prod)
5. **Store production secrets** in secure vaults (AWS Secrets Manager, HashiCorp Vault)
6. **Limit access** to production environment variables
7. **Audit access** to sensitive configuration

## Validation

The application validates all required environment variables on startup. Missing required variables will prevent the application from starting with a clear error message indicating which variables are missing.

```typescript
// Example validation output
Error: Missing required environment variables:
- RETELL_API_KEY
- JWT_SECRET
- DATABASE_PASSWORD
```

## Tips

1. Use `.env.example` as a template
2. Keep development and production configs separate
3. Use descriptive values for better debugging
4. Document any custom environment variables
5. Test configuration changes in staging first
6. Monitor for configuration drift between environments