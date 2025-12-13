# IndexedDB Integration for SolarVoice AI

Comprehensive offline-first data caching using Dexie.js, adapted from Vozlux patterns.

## Features

- **Agent Marketplace Caching**: Store agent configurations for offline browsing
- **Voice History Tracking**: Keep track of all voice interactions
- **Pending Actions Queue**: Background sync for offline operations
- **Sync Status Management**: Track synchronization state across entities

## Installation

Already installed via:
```bash
npm install dexie
```

## Database Schema

### Tables

1. **agentConfigs** - Cached agent marketplace data
   - Primary key: `slug`
   - Indexes: `trade`, `scale`, `syncedAt`, `isFavorite`, `lastUsedAt`, `[slug+trade]`

2. **voiceHistory** - Voice interaction cache
   - Primary key: Auto-increment `id`
   - Indexes: `agentId`, `timestamp`, `userId`, `sessionId`, `status`, `trade`, `scale`

3. **pendingActions** - Background sync queue
   - Primary key: Auto-increment `id`
   - Indexes: `type`, `status`, `createdAt`

4. **syncStatus** - Overall sync state tracking
   - Primary key: `id` (entity name)

## Usage Examples

### Initialization

```typescript
import { initializeDatabase, isIndexedDBSupported } from "@/lib/db"

// On app startup
const isSupported = await initializeDatabase()
if (!isSupported) {
  console.warn("Offline features not available")
}
```

### Agent Config Caching

```typescript
import {
  cacheAgentConfigs,
  getCachedAgents,
  getCachedAgentBySlug,
  toggleAgentFavorite,
  updateAgentLastUsed,
} from "@/lib/db"

// Cache agents from API
const agents = await fetch("/api/agents/catalog").then(r => r.json())
await cacheAgentConfigs(agents)

// Get all cached agents
const allAgents = await getCachedAgents()

// Filter by trade
const solarAgents = await getCachedAgents({ trade: "Solar" })

// Get favorites
const favorites = await getCachedAgents({ isFavorite: true })

// Get specific agent
const agent = await getCachedAgentBySlug("residential-solar")

// Toggle favorite
await toggleAgentFavorite("commercial-solar")

// Update last used timestamp
await updateAgentLastUsed("industrial-solar")
```

### Voice History

```typescript
import {
  saveVoiceInteraction,
  getRecentInteractions,
  getVoiceStats,
} from "@/lib/db"

// Save interaction
await saveVoiceInteraction({
  agentId: "residential-solar",
  agentName: "Residential Solar Specialist",
  trade: "Solar",
  scale: "Residential",
  userInput: "What are the benefits of solar?",
  agentResponse: "Solar provides clean energy and cost savings...",
  emotion: "enthusiastic",
  duration: 45,
  timestamp: Date.now(),
  status: "success",
})

// Get recent interactions
const recent = await getRecentInteractions({ limit: 10 })

// Get stats
const stats = await getVoiceStats({ agentId: "residential-solar" })
console.log(`Total: ${stats.total}, Success rate: ${stats.successful / stats.total}`)
```

### Pending Actions Queue

```typescript
import {
  queuePendingAction,
  getPendingActions,
  markActionSyncing,
  markActionFailed,
  removePendingAction,
} from "@/lib/db"

// Queue an action
await queuePendingAction({
  type: "agent_test",
  payload: { agentId: "residential-solar", testInput: "Hello" },
  maxRetries: 3,
})

// Process queue
const pending = await getPendingActions()
for (const action of pending) {
  try {
    await markActionSyncing(action.id!)

    // Sync to server
    await fetch("/api/sync", {
      method: "POST",
      body: JSON.stringify(action.payload),
    })

    await removePendingAction(action.id!)
  } catch (error) {
    await markActionFailed(action.id!, error.message)
  }
}
```

### Sync Status

```typescript
import {
  getSyncStatus,
  getOverallSyncStatus,
  getAllSyncStatuses,
} from "@/lib/db"

// Check specific entity
const agentStatus = await getSyncStatus("agents")
console.log(`Agents last synced: ${new Date(agentStatus.lastSyncAt)}`)

// Overall status
const overall = await getOverallSyncStatus()
if (overall === "error") {
  console.error("Sync errors detected")
}

// All statuses
const allStatuses = await getAllSyncStatuses()
```

### Database Utilities

```typescript
import {
  clearAllData,
  getDbStats,
  healthCheck,
  exportAllData,
  pruneVoiceHistory,
} from "@/lib/db"

// Get stats
const stats = await getDbStats()
console.log(`Cached agents: ${stats.cachedAgents}`)
console.log(`Voice interactions: ${stats.voiceInteractions}`)
console.log(`Pending actions: ${stats.pendingActions}`)

// Health check
const health = await healthCheck()
if (!health.isOperational) {
  console.error("Database health check failed:", health.error)
}

// Export data (for debugging)
const data = await exportAllData()
console.log(JSON.stringify(data, null, 2))

// Cleanup
await pruneVoiceHistory(500) // Keep last 500 interactions
await clearAllData() // Nuclear option
```

## React Integration

### Custom Hook Example

```typescript
// hooks/useAgentCache.ts
import { useEffect, useState } from "react"
import { getCachedAgents, cacheAgentConfigs } from "@/lib/db"
import type { CachedAgentConfig } from "@/lib/db"

export function useAgentCache(trade?: string) {
  const [agents, setAgents] = useState<CachedAgentConfig[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadAgents() {
      try {
        // Try cache first
        const cached = await getCachedAgents({ trade: trade as any })

        if (cached.length > 0) {
          setAgents(cached)
          setLoading(false)
        }

        // Fetch fresh data
        const response = await fetch("/api/agents/catalog")
        const fresh = await response.json()

        await cacheAgentConfigs(fresh)
        const updated = await getCachedAgents({ trade: trade as any })
        setAgents(updated)
      } catch (error) {
        console.error("Failed to load agents:", error)
      } finally {
        setLoading(false)
      }
    }

    loadAgents()
  }, [trade])

  return { agents, loading }
}
```

## Browser Compatibility

IndexedDB is supported in all modern browsers:
- Chrome 24+
- Firefox 16+
- Safari 10+
- Edge 12+

The library includes automatic compatibility checks:
```typescript
import { isIndexedDBSupported } from "@/lib/db"

if (!isIndexedDBSupported()) {
  // Fallback to server-only mode
}
```

## Performance Considerations

1. **Bulk Operations**: Use `bulkPut()` and `bulkDelete()` for multiple records
2. **Indexes**: Pre-configured indexes optimize common queries
3. **Pruning**: Regularly prune old data to prevent storage bloat
4. **Limits**: IndexedDB has no hard size limit, but recommend < 50MB per domain

## Migration Strategy

Current version: 1

Future migrations:
```typescript
this.version(2).stores({
  // Add new table
  newTable: "++id, field1, field2"
}).upgrade(tx => {
  // Migration logic
})
```

## Security Notes

- IndexedDB is client-side only - never store sensitive data
- API keys should always be server-side
- User data is scoped to origin (domain)
- Clear cache on logout: `await clearAllData()`

## Debugging

Enable Dexie debug mode:
```typescript
import Dexie from "dexie"
Dexie.debug = true // Show all DB operations in console
```

Chrome DevTools:
- Application → Storage → IndexedDB → `solarvoice_ai`

## Testing

```typescript
import { db } from "@/lib/db"

// In tests, use Dexie's in-memory mode
beforeEach(() => {
  db.delete()
  db.open()
})
```

## Key Exports

### Database Instance
- `db` - Dexie database instance

### Initialization
- `isIndexedDBSupported()` - Check browser support
- `initializeDatabase()` - Initialize on startup
- `healthCheck()` - Verify operational status

### Agent Config Cache
- `cacheAgentConfigs()` - Bulk store agents
- `getCachedAgents()` - Filtered retrieval
- `getCachedAgentBySlug()` - Single agent lookup
- `getCachedAgentsByTrade()` - Filter by trade
- `getCachedAgentsByScale()` - Filter by scale
- `toggleAgentFavorite()` - Toggle favorite status
- `updateAgentLastUsed()` - Update usage timestamp
- `clearAgentCache()` - Clear all agents

### Voice History
- `saveVoiceInteraction()` - Store interaction
- `getRecentInteractions()` - Get recent with filters
- `getVoiceStats()` - Aggregate statistics
- `pruneVoiceHistory()` - Cleanup old records
- `clearVoiceHistory()` - Clear all history

### Pending Actions
- `queuePendingAction()` - Queue for sync
- `getPendingActions()` - Get all pending
- `getPendingActionCount()` - Count pending
- `markActionSyncing()` - Mark as syncing
- `markActionFailed()` - Mark failed with error
- `removePendingAction()` - Remove after sync
- `clearPendingActions()` - Clear all
- `removeExpiredActions()` - Remove max retries exceeded

### Sync Status
- `updateSyncStatus()` - Update entity status
- `getSyncStatus()` - Get entity status
- `getOverallSyncStatus()` - Aggregate status
- `getAllSyncStatuses()` - All statuses

### Utilities
- `clearAllData()` - Nuclear cleanup
- `getDbStats()` - Database statistics
- `exportAllData()` - Export for debugging
