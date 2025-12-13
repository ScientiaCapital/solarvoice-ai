/**
 * IndexedDB Integration for SolarVoice AI
 *
 * Provides offline-first data caching using Dexie.js:
 * - Agent marketplace config caching
 * - Voice interaction history
 * - Pending actions queue for background sync
 * - Sync status tracking
 *
 * Adapted from Vozlux patterns for solar industry use cases.
 */

import Dexie, { type Table } from "dexie"
import type { AgentType, Trade, Scale } from "../agent-types"

// ========================================
// Type Definitions
// ========================================

/**
 * Cached agent configuration from marketplace API
 */
export interface CachedAgentConfig extends AgentType {
  // Sync metadata
  syncedAt: number // Timestamp when last synced from server
  isFavorite?: boolean // User favorited this agent
  lastUsedAt?: number // Last time user interacted with this agent
}

/**
 * Voice interaction history record
 */
export interface VoiceInteraction {
  id?: number // Auto-incremented
  agentId: string // Agent slug/ID
  agentName: string // Human-readable agent name
  trade: Trade // Agent trade (Solar, Electrical, etc.)
  scale: Scale // Agent scale (Residential, Commercial, etc.)

  // Interaction details
  userInput?: string // What the user said (if available)
  agentResponse?: string // What the agent said
  emotion?: string // Cartesia emotion used
  duration?: number // Interaction duration in seconds

  // Metadata
  timestamp: number // When interaction occurred
  userId?: string // User ID if authenticated
  sessionId?: string // Voice session identifier
  status: "success" | "error" | "partial"
  errorMessage?: string
}

/**
 * Pending action for background sync
 */
export interface PendingAction {
  id?: number // Auto-incremented
  type: "agent_test" | "agent_create" | "agent_update" | "voice_feedback" | "subscription" | "checkout"

  // Action payload (JSON serializable)
  payload: Record<string, any>

  // Sync state
  status: "pending" | "syncing" | "failed"
  createdAt: number
  retryCount: number
  lastError?: string
  maxRetries: number
}

/**
 * Sync status record for entity tracking
 */
export interface SyncStatus {
  id: string // Entity name: "agents" | "voiceHistory" | "pendingActions"
  lastSyncAt: number // Last successful sync timestamp
  pendingCount: number // Number of pending items
  status: "synced" | "pending" | "syncing" | "error"
  errorMessage: string | undefined
  nextSyncAt?: number // Scheduled next sync time
}

// ========================================
// Database Schema
// ========================================

class SolarVoiceDB extends Dexie {
  // Agent marketplace cache
  agentConfigs!: Table<CachedAgentConfig, string>

  // Voice interaction history
  voiceHistory!: Table<VoiceInteraction, number>

  // Background sync queue
  pendingActions!: Table<PendingAction, number>

  // Sync status tracking
  syncStatus!: Table<SyncStatus, string>

  constructor() {
    super("solarvoice_ai")

    this.version(1).stores({
      // Compound index on [slug+trade] for unique lookup
      // Additional indexes for filtering by trade and scale
      agentConfigs: "slug, trade, scale, syncedAt, isFavorite, lastUsedAt, &[slug+trade]",

      // Auto-increment ID, indexed by agentId, timestamp, and userId for queries
      voiceHistory: "++id, agentId, timestamp, userId, sessionId, status, trade, scale",

      // Auto-increment ID, indexed by type and status for queue processing
      pendingActions: "++id, type, status, createdAt",

      // Primary key is entity name
      syncStatus: "id",
    })
  }
}

// Singleton database instance
export const db = new SolarVoiceDB()

// ========================================
// Browser Compatibility Check
// ========================================

/**
 * Check if IndexedDB is available in current browser
 */
export function isIndexedDBSupported(): boolean {
  try {
    return typeof window !== "undefined" && !!window.indexedDB
  } catch {
    return false
  }
}

/**
 * Initialize database and verify it's accessible
 * Call this on app startup
 */
export async function initializeDatabase(): Promise<boolean> {
  if (!isIndexedDBSupported()) {
    console.warn("IndexedDB not supported in this browser")
    return false
  }

  try {
    // Test database access
    await db.open()
    return true
  } catch (error) {
    console.error("Failed to initialize IndexedDB:", error)
    return false
  }
}

// ========================================
// Agent Config Cache Operations
// ========================================

/**
 * Cache agent configurations from API response
 * Bulk operation for marketplace sync
 */
export async function cacheAgentConfigs(agents: AgentType[]): Promise<void> {
  if (!isIndexedDBSupported()) return

  const now = Date.now()
  const withSyncTime: CachedAgentConfig[] = agents.map((agent) => ({
    ...agent,
    syncedAt: now,
  }))

  await db.agentConfigs.bulkPut(withSyncTime)
  await updateSyncStatus("agents", "synced")
}

/**
 * Get cached agents with optional filtering
 */
export async function getCachedAgents(filters?: {
  trade?: Trade
  scale?: Scale
  isFavorite?: boolean
  limit?: number
  sortBy?: "syncedAt" | "lastUsedAt" | "slug"
}): Promise<CachedAgentConfig[]> {
  if (!isIndexedDBSupported()) return []

  let results: CachedAgentConfig[] = []

  // Apply filters
  if (filters?.trade) {
    results = await db.agentConfigs.where("trade").equals(filters.trade).toArray()
  } else if (filters?.scale) {
    results = await db.agentConfigs.where("scale").equals(filters.scale).toArray()
  } else if (filters?.isFavorite) {
    results = await db.agentConfigs.where("isFavorite").equals(1 as any).toArray()
  } else {
    results = await db.agentConfigs.toArray()
  }

  // Sort
  if (filters?.sortBy === "lastUsedAt") {
    results.sort((a, b) => (b.lastUsedAt || 0) - (a.lastUsedAt || 0))
  } else if (filters?.sortBy === "slug") {
    results.sort((a, b) => a.slug.localeCompare(b.slug))
  } else {
    results.sort((a, b) => b.syncedAt - a.syncedAt)
  }

  // Apply limit
  if (filters?.limit) {
    results = results.slice(0, filters.limit)
  }

  return results
}

/**
 * Get a single cached agent by slug
 */
export async function getCachedAgentBySlug(slug: string): Promise<CachedAgentConfig | undefined> {
  if (!isIndexedDBSupported()) return undefined

  return db.agentConfigs.get(slug)
}

/**
 * Get agents by trade type
 */
export async function getCachedAgentsByTrade(trade: Trade): Promise<CachedAgentConfig[]> {
  if (!isIndexedDBSupported()) return []

  return db.agentConfigs.where("trade").equals(trade).toArray()
}

/**
 * Get agents by scale
 */
export async function getCachedAgentsByScale(scale: Scale): Promise<CachedAgentConfig[]> {
  if (!isIndexedDBSupported()) return []

  return db.agentConfigs.where("scale").equals(scale).toArray()
}

/**
 * Mark an agent as favorite
 */
export async function toggleAgentFavorite(slug: string): Promise<void> {
  if (!isIndexedDBSupported()) return

  const agent = await db.agentConfigs.get(slug)
  if (agent) {
    await db.agentConfigs.update(slug, { isFavorite: !agent.isFavorite })
  }
}

/**
 * Update agent's last used timestamp
 */
export async function updateAgentLastUsed(slug: string): Promise<void> {
  if (!isIndexedDBSupported()) return

  await db.agentConfigs.update(slug, { lastUsedAt: Date.now() })
}

/**
 * Clear agent cache (useful for forced refresh)
 */
export async function clearAgentCache(): Promise<void> {
  if (!isIndexedDBSupported()) return

  await db.agentConfigs.clear()
  await updateSyncStatus("agents", "pending")
}

// ========================================
// Voice History Operations
// ========================================

/**
 * Save a voice interaction to history
 */
export async function saveVoiceInteraction(
  interaction: Omit<VoiceInteraction, "id">
): Promise<number | undefined> {
  if (!isIndexedDBSupported()) return undefined

  const id = await db.voiceHistory.add(interaction)
  await updateSyncStatus("voiceHistory", "synced")
  return id
}

/**
 * Get recent voice interactions
 */
export async function getRecentInteractions(options?: {
  agentId?: string
  userId?: string
  limit?: number
  status?: VoiceInteraction["status"]
}): Promise<VoiceInteraction[]> {
  if (!isIndexedDBSupported()) return []

  let query = db.voiceHistory.orderBy("timestamp").reverse()

  if (options?.agentId) {
    query = db.voiceHistory
      .where("agentId")
      .equals(options.agentId)
      .reverse()
  }

  if (options?.userId) {
    query = db.voiceHistory
      .where("userId")
      .equals(options.userId)
      .reverse()
  }

  if (options?.status) {
    query = db.voiceHistory
      .where("status")
      .equals(options.status)
      .reverse()
  }

  if (options?.limit) {
    query = query.limit(options.limit)
  }

  return query.toArray()
}

/**
 * Get voice interaction statistics
 */
export async function getVoiceStats(options?: {
  agentId?: string
  userId?: string
}): Promise<{
  total: number
  successful: number
  errors: number
  averageDuration: number
  mostUsedAgent: string | undefined
}> {
  if (!isIndexedDBSupported()) {
    return {
      total: 0,
      successful: 0,
      errors: 0,
      averageDuration: 0,
      mostUsedAgent: undefined,
    }
  }

  let query = db.voiceHistory.toCollection()

  if (options?.agentId) {
    query = db.voiceHistory.where("agentId").equals(options.agentId)
  }

  if (options?.userId) {
    query = db.voiceHistory.where("userId").equals(options.userId)
  }

  const interactions = await query.toArray()

  const total = interactions.length
  const successful = interactions.filter((i) => i.status === "success").length
  const errors = interactions.filter((i) => i.status === "error").length

  const durations = interactions
    .filter((i) => i.duration !== undefined)
    .map((i) => i.duration!)
  const averageDuration = durations.length > 0
    ? durations.reduce((a, b) => a + b, 0) / durations.length
    : 0

  // Find most used agent
  const agentCounts = interactions.reduce((acc, i) => {
    acc[i.agentId] = (acc[i.agentId] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const mostUsedAgent = Object.entries(agentCounts).sort((a, b) => b[1] - a[1])[0]?.[0]

  return {
    total,
    successful,
    errors,
    averageDuration,
    mostUsedAgent: mostUsedAgent ?? undefined,
  }
}

/**
 * Clear old voice history (keep last N records)
 */
export async function pruneVoiceHistory(keepCount = 1000): Promise<number> {
  if (!isIndexedDBSupported()) return 0

  const count = await db.voiceHistory.count()
  if (count <= keepCount) return 0

  const oldInteractions = await db.voiceHistory
    .orderBy("timestamp")
    .limit(count - keepCount)
    .toArray()

  const idsToDelete = oldInteractions.map((i) => i.id!).filter(Boolean)
  await db.voiceHistory.bulkDelete(idsToDelete)
  return idsToDelete.length
}

/**
 * Clear all voice history
 */
export async function clearVoiceHistory(): Promise<void> {
  if (!isIndexedDBSupported()) return

  await db.voiceHistory.clear()
  await updateSyncStatus("voiceHistory", "synced")
}

// ========================================
// Pending Actions Queue Operations
// ========================================

/**
 * Queue a pending action for later sync
 */
export async function queuePendingAction(
  action: Omit<PendingAction, "id" | "createdAt" | "retryCount" | "status">
): Promise<number | undefined> {
  if (!isIndexedDBSupported()) return undefined

  const id = await db.pendingActions.add({
    ...action,
    createdAt: Date.now(),
    retryCount: 0,
    status: "pending",
    maxRetries: action.maxRetries || 3,
  })

  await updateSyncStatus("pendingActions", "pending")
  return id
}

/**
 * Get all pending actions (ready for sync)
 */
export async function getPendingActions(type?: PendingAction["type"]): Promise<PendingAction[]> {
  if (!isIndexedDBSupported()) return []

  let query = db.pendingActions
    .where("status")
    .anyOf(["pending", "failed"])

  if (type) {
    query = db.pendingActions
      .where("[type+status]")
      .anyOf([[type, "pending"], [type, "failed"]])
  }

  return query.toArray()
}

/**
 * Get count of pending actions
 */
export async function getPendingActionCount(): Promise<number> {
  if (!isIndexedDBSupported()) return 0

  return db.pendingActions
    .where("status")
    .anyOf(["pending", "failed"])
    .count()
}

/**
 * Mark a pending action as syncing
 */
export async function markActionSyncing(id: number): Promise<void> {
  if (!isIndexedDBSupported()) return

  await db.pendingActions.update(id, { status: "syncing" })
  await updateSyncStatus("pendingActions", "syncing")
}

/**
 * Mark a pending action as failed (increment retry count)
 */
export async function markActionFailed(id: number, error: string): Promise<void> {
  if (!isIndexedDBSupported()) return

  const action = await db.pendingActions.get(id)
  if (action) {
    await db.pendingActions.update(id, {
      status: "failed",
      lastError: error,
      retryCount: action.retryCount + 1,
    })

    await updateSyncStatus("pendingActions", "error", error)
  }
}

/**
 * Remove a pending action (after successful sync)
 */
export async function removePendingAction(id: number): Promise<void> {
  if (!isIndexedDBSupported()) return

  await db.pendingActions.delete(id)

  // Update sync status
  const remaining = await getPendingActionCount()
  if (remaining === 0) {
    await updateSyncStatus("pendingActions", "synced")
  }
}

/**
 * Clear all pending actions
 */
export async function clearPendingActions(): Promise<void> {
  if (!isIndexedDBSupported()) return

  await db.pendingActions.clear()
  await updateSyncStatus("pendingActions", "synced")
}

/**
 * Remove actions that exceeded max retries
 */
export async function removeExpiredActions(): Promise<number> {
  if (!isIndexedDBSupported()) return 0

  const failedActions = await db.pendingActions
    .where("status")
    .equals("failed")
    .toArray()

  const expiredIds = failedActions
    .filter((action) => action.retryCount >= action.maxRetries)
    .map((action) => action.id!)
    .filter(Boolean)

  await db.pendingActions.bulkDelete(expiredIds)
  return expiredIds.length
}

// ========================================
// Sync Status Operations
// ========================================

/**
 * Update sync status for an entity
 */
export async function updateSyncStatus(
  entity: string,
  status: SyncStatus["status"],
  errorMessage?: string
): Promise<void> {
  if (!isIndexedDBSupported()) return

  const pendingCount = entity === "pendingActions"
    ? await getPendingActionCount()
    : 0

  await db.syncStatus.put({
    id: entity,
    lastSyncAt: Date.now(),
    pendingCount,
    status,
    errorMessage: errorMessage ?? undefined,
  })
}

/**
 * Get sync status for an entity
 */
export async function getSyncStatus(entity: string): Promise<SyncStatus | undefined> {
  if (!isIndexedDBSupported()) return undefined

  return db.syncStatus.get(entity)
}

/**
 * Get overall sync status (worst case across all entities)
 */
export async function getOverallSyncStatus(): Promise<SyncStatus["status"]> {
  if (!isIndexedDBSupported()) return "synced"

  const statuses = await db.syncStatus.toArray()

  if (statuses.some((s) => s.status === "error")) return "error"
  if (statuses.some((s) => s.status === "syncing")) return "syncing"
  if (statuses.some((s) => s.status === "pending")) return "pending"
  return "synced"
}

/**
 * Get all sync statuses
 */
export async function getAllSyncStatuses(): Promise<SyncStatus[]> {
  if (!isIndexedDBSupported()) return []

  return db.syncStatus.toArray()
}

// ========================================
// Database Utilities
// ========================================

/**
 * Clear all data (for logout or reset)
 */
export async function clearAllData(): Promise<void> {
  if (!isIndexedDBSupported()) return

  await db.agentConfigs.clear()
  await db.voiceHistory.clear()
  await db.pendingActions.clear()
  await db.syncStatus.clear()
}

/**
 * Get database statistics
 */
export async function getDbStats(): Promise<{
  cachedAgents: number
  voiceInteractions: number
  pendingActions: number
  favoriteAgents: number
  lastAgentSync: number | null
  lastVoiceSync: number | null
  totalSize?: number
}> {
  if (!isIndexedDBSupported()) {
    return {
      cachedAgents: 0,
      voiceInteractions: 0,
      pendingActions: 0,
      favoriteAgents: 0,
      lastAgentSync: null,
      lastVoiceSync: null,
    }
  }

  const cachedAgents = await db.agentConfigs.count()
  const voiceInteractions = await db.voiceHistory.count()
  const pendingActions = await getPendingActionCount()
  const favoriteAgents = await db.agentConfigs
    .where("isFavorite")
    .equals(1 as any)
    .count()

  const agentStatus = await getSyncStatus("agents")
  const voiceStatus = await getSyncStatus("voiceHistory")

  return {
    cachedAgents,
    voiceInteractions,
    pendingActions,
    favoriteAgents,
    lastAgentSync: agentStatus?.lastSyncAt ?? null,
    lastVoiceSync: voiceStatus?.lastSyncAt ?? null,
  }
}

/**
 * Export all data (for debugging or backup)
 */
export async function exportAllData(): Promise<{
  agents: CachedAgentConfig[]
  voiceHistory: VoiceInteraction[]
  pendingActions: PendingAction[]
  syncStatus: SyncStatus[]
}> {
  if (!isIndexedDBSupported()) {
    return {
      agents: [],
      voiceHistory: [],
      pendingActions: [],
      syncStatus: [],
    }
  }

  const [agents, voiceHistory, pendingActions, syncStatus] = await Promise.all([
    db.agentConfigs.toArray(),
    db.voiceHistory.toArray(),
    db.pendingActions.toArray(),
    db.syncStatus.toArray(),
  ])

  return {
    agents,
    voiceHistory,
    pendingActions,
    syncStatus,
  }
}

/**
 * Health check - verify database is operational
 */
export async function healthCheck(): Promise<{
  isSupported: boolean
  isOperational: boolean
  version: number
  tables: string[]
  error?: string
}> {
  if (!isIndexedDBSupported()) {
    return {
      isSupported: false,
      isOperational: false,
      version: 0,
      tables: [],
      error: "IndexedDB not supported",
    }
  }

  try {
    await db.open()
    return {
      isSupported: true,
      isOperational: true,
      version: db.verno,
      tables: db.tables.map((t) => t.name),
    }
  } catch (error) {
    return {
      isSupported: true,
      isOperational: false,
      version: 0,
      tables: [],
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}
