# SolarVoice AI Middleware System

Production-ready middleware system for tool execution, following the LangChain pattern.

## Architecture

```
Request → CostControl → RateLimit → Safety → [Tool] → Observability → Response
```

Middleware executes in an onion-layer pattern:
- `beforeExecute()` runs in chain order (first → last)
- `afterExecute()` runs in reverse order (last → first)

## Components

### ToolExecutor

Core executor that runs tools through middleware chain.

```typescript
import { ToolExecutor } from './middleware';

const executor = new ToolExecutor([
  new CostControlMiddleware({ creditChecker }),
  new RateLimitMiddleware({ requestsPerMinute: 100 }),
  new SafetyMiddleware({ redactPII: true }),
  new ObservabilityMiddleware(),
]);

// Single execution
const result = await executor.execute(
  'solar_calculator',
  { zipCode: '90210' },
  toolRegistry,
  context
);

// Parallel execution
const results = await executor.executeParallel(
  [
    { name: 'weather_api', args: { location: 'LA' } },
    { name: 'utility_rates', args: { zipCode: '90210' } },
  ],
  toolRegistry,
  context
);
```

### CostControlMiddleware

Credit-based billing and usage tracking.

```typescript
const middleware = new CostControlMiddleware({
  creditChecker: async (userId) => {
    return await db.getUserCredits(userId);
  },
  usageLogger: async (usage) => {
    await db.logToolUsage(usage);
  },
  tierCosts: {
    free: 5.0,      // 5 credits per tool
    starter: 2.0,   // 2 credits per tool
    pro: 1.0,       // 1 credit per tool
    enterprise: 0.5 // 0.5 credits per tool
  },
});
```

**Features:**
- Pre-execution credit balance checking
- Post-execution usage logging
- Tier-based pricing
- Fail-open on errors (reliability over strict enforcement)

### RateLimitMiddleware

In-memory sliding window rate limiting.

```typescript
const middleware = new RateLimitMiddleware({
  requestsPerMinute: 100,  // Global limit
  requestsPerHour: 1000,   // Optional hourly limit
  tierLimits: {            // Or tier-based limits
    free: 10,
    starter: 30,
    pro: 100,
    enterprise: 500,
  },
});
```

**Features:**
- Per-user rate limiting
- Sliding window algorithm (accurate)
- Separate minute and hour limits
- Tier-based or global limits
- In-memory backend (for single instance)

**Note:** For distributed deployments, implement Redis backend (see Vozlux reference).

### SafetyMiddleware

PII detection/redaction and tier-based access control.

```typescript
const middleware = new SafetyMiddleware({
  redactPII: true,  // Redact detected PII
  toolTierRequirements: {
    'advanced_calculator': 'pro',
    'white_label_api': 'enterprise',
  },
  auditLogger: (event) => {
    console.log('Audit:', event);
  },
});
```

**Features:**
- PII detection (email, phone, SSN, credit cards)
- Automatic redaction in args and results
- Tier-based tool access control
- Audit trail logging
- Always detects PII (logs even without redaction)

**PII Patterns:**
- Email addresses
- Phone numbers (various formats)
- Social Security Numbers (SSN)
- Credit card numbers

### ObservabilityMiddleware

Execution logging, metrics, and performance tracking.

```typescript
const middleware = new ObservabilityMiddleware({
  logger: (msg) => console.log(`[OBSERVABILITY] ${msg}`),
});

// After executions
const stats = middleware.getStats();
console.log(`Success rate: ${stats.success_rate}%`);

const percentiles = middleware.getLatencyPercentiles();
console.log(`p50: ${percentiles.p50}ms, p95: ${percentiles.p95}ms`);
```

**Features:**
- Execution start/end logging
- Success/failure tracking
- Latency percentiles (p50, p95, p99)
- Never blocks execution (observability only)

## ToolContext

Context object passed through middleware chain:

```typescript
interface ToolContext {
  toolName: string;
  tier: 'free' | 'starter' | 'pro' | 'enterprise';
  userId: string;
  sessionId: string;
  cumulativeLatencyMs: number;
  metadata: Record<string, any>;
}
```

## Creating Custom Middleware

```typescript
import { ToolMiddleware, ToolContext } from './middleware';

class CustomMiddleware extends ToolMiddleware {
  async beforeExecute(
    toolName: string,
    args: any,
    context: ToolContext
  ): Promise<[boolean, any]> {
    // Your pre-execution logic
    console.log(`Starting ${toolName}`);

    // Block execution
    if (someCondition) {
      return [false, 'Error message'];
    }

    // Modify args
    const modifiedArgs = { ...args, extra: 'data' };
    return [true, modifiedArgs];
  }

  async afterExecute(
    toolName: string,
    result: string,
    durationMs: number,
    error: Error | null,
    context: ToolContext
  ): Promise<string> {
    // Your post-execution logic
    console.log(`Finished ${toolName} in ${durationMs}ms`);

    // Optionally modify result
    return result;
  }
}
```

## Testing

Comprehensive test suite with 83 tests covering:
- Core executor functionality
- Each middleware's behavior
- Edge cases and error handling
- Middleware chaining
- Parallel execution

```bash
npm test -- __tests__/middleware
```

## TypeScript

All code is strictly typed with TypeScript:

```bash
npx tsc --noEmit --strict lib/middleware/*.ts
```

## Production Considerations

1. **Rate Limiting:** For multi-instance deployments, implement Redis backend (see `rate-limit.ts` comments)
2. **Cost Control:** Ensure credit checker and usage logger are performant (use caching, async queues)
3. **Safety:** Review PII patterns for your jurisdiction/compliance requirements
4. **Observability:** Consider integrating with DataDog, New Relic, or similar APM tools
5. **Error Handling:** Middleware fails open by default for reliability - adjust if strict enforcement needed

## Files Created

```
lib/middleware/
├── index.ts              # ToolExecutor and exports
├── types.ts              # Core types (ToolContext, ToolMiddleware)
├── cost.ts               # CostControlMiddleware
├── rate-limit.ts         # RateLimitMiddleware
├── safety.ts             # SafetyMiddleware
├── observability.ts      # ObservabilityMiddleware
└── README.md             # This file

__tests__/middleware/
├── index.test.ts         # ToolExecutor tests
├── cost.test.ts          # CostControlMiddleware tests
├── rate-limit.test.ts    # RateLimitMiddleware tests
├── safety.test.ts        # SafetyMiddleware tests
└── observability.test.ts # ObservabilityMiddleware tests
```

## Reference Implementation

Adapted from Vozlux project at:
`/Users/tmkipper/Desktop/tk_projects/vozlux/src/vozlux/tools/middleware/`

## License

Part of SolarVoice AI platform.
