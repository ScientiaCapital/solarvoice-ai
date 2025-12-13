/**
 * React Hooks for IndexedDB Integration
 *
 * Client-side hooks for managing offline-first data caching
 */

"use client"

import { useEffect, useState, useCallback } from "react"
import {
  getCachedAgents,
  cacheAgentConfigs,
  getCachedAgentBySlug,
  toggleAgentFavorite as dbToggleFavorite,
  updateAgentLastUsed,
  getRecentInteractions,
  getVoiceStats,
  getPendingActions,
  getDbStats,
  getOverallSyncStatus,
  isIndexedDBSupported,
} from "./indexeddb"
import type { CachedAgentConfig, VoiceInteraction, PendingAction, SyncStatus } from "./indexeddb"
import type { Trade, Scale } from "../agent-types"

/**
 * Hook for managing cached agents with optional filtering
 *
 * @example
 * const { agents, loading, refresh, toggleFavorite } = useAgentCache({ trade: "Solar" })
 */
export function useAgentCache(filters?: {
  trade?: Trade
  scale?: Scale
  isFavorite?: boolean
  limit?: number
}) {
  const [agents, setAgents] = useState<CachedAgentConfig[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [isSupported, setIsSupported] = useState(true)

  const loadAgents = useCallback(async () => {
    try {
      if (!isIndexedDBSupported()) {
        setIsSupported(false)
        setLoading(false)
        return
      }

      setLoading(true)
      const cached = await getCachedAgents(filters)
      setAgents(cached)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load agents"))
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    loadAgents()
  }, [loadAgents])

  const toggleFavorite = useCallback(async (slug: string) => {
    await dbToggleFavorite(slug)
    await loadAgents()
  }, [loadAgents])

  const markUsed = useCallback(async (slug: string) => {
    await updateAgentLastUsed(slug)
  }, [])

  const refresh = useCallback(async () => {
    await loadAgents()
  }, [loadAgents])

  return {
    agents,
    loading,
    error,
    isSupported,
    toggleFavorite,
    markUsed,
    refresh,
  }
}

/**
 * Hook for fetching a single cached agent by slug
 *
 * @example
 * const { agent, loading } = useCachedAgent("residential-solar")
 */
export function useCachedAgent(slug: string) {
  const [agent, setAgent] = useState<CachedAgentConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function loadAgent() {
      try {
        if (!isIndexedDBSupported()) {
          setLoading(false)
          return
        }

        const cached = await getCachedAgentBySlug(slug)
        setAgent(cached || null)
        setError(null)

        // Mark as used
        if (cached) {
          await updateAgentLastUsed(slug)
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to load agent"))
      } finally {
        setLoading(false)
      }
    }

    loadAgent()
  }, [slug])

  return { agent, loading, error }
}

/**
 * Hook for managing voice interaction history
 *
 * @example
 * const { interactions, stats, loading } = useVoiceHistory({ agentId: "residential-solar" })
 */
export function useVoiceHistory(filters?: {
  agentId?: string
  userId?: string
  limit?: number
}) {
  const [interactions, setInteractions] = useState<VoiceInteraction[]>([])
  const [stats, setStats] = useState({
    total: 0,
    successful: 0,
    errors: 0,
    averageDuration: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const loadHistory = useCallback(async () => {
    try {
      if (!isIndexedDBSupported()) {
        setLoading(false)
        return
      }

      setLoading(true)
      const [recent, statistics] = await Promise.all([
        getRecentInteractions(filters),
        getVoiceStats(filters),
      ])

      setInteractions(recent)
      setStats(statistics)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load voice history"))
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    loadHistory()
  }, [loadHistory])

  return {
    interactions,
    stats,
    loading,
    error,
    refresh: loadHistory,
  }
}

/**
 * Hook for monitoring pending actions queue
 *
 * @example
 * const { actions, count, loading } = usePendingActions("agent_test")
 */
export function usePendingActions(type?: PendingAction["type"]) {
  const [actions, setActions] = useState<PendingAction[]>([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const loadActions = useCallback(async () => {
    try {
      if (!isIndexedDBSupported()) {
        setLoading(false)
        return
      }

      setLoading(true)
      const pending = await getPendingActions(type)
      setActions(pending)
      setCount(pending.length)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load pending actions"))
    } finally {
      setLoading(false)
    }
  }, [type])

  useEffect(() => {
    loadActions()
  }, [loadActions])

  return {
    actions,
    count,
    loading,
    error,
    refresh: loadActions,
  }
}

/**
 * Hook for monitoring overall sync status
 *
 * @example
 * const { status, stats, loading } = useSyncStatus()
 */
export function useSyncStatus() {
  const [status, setStatus] = useState<SyncStatus["status"]>("synced")
  const [stats, setStats] = useState({
    cachedAgents: 0,
    voiceInteractions: 0,
    pendingActions: 0,
    favoriteAgents: 0,
    lastAgentSync: null as number | null,
    lastVoiceSync: null as number | null,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const loadStatus = useCallback(async () => {
    try {
      if (!isIndexedDBSupported()) {
        setLoading(false)
        return
      }

      setLoading(true)
      const [overallStatus, dbStats] = await Promise.all([
        getOverallSyncStatus(),
        getDbStats(),
      ])

      setStatus(overallStatus)
      setStats(dbStats)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load sync status"))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadStatus()
  }, [loadStatus])

  // Poll for updates every 30 seconds
  useEffect(() => {
    const interval = setInterval(loadStatus, 30000)
    return () => clearInterval(interval)
  }, [loadStatus])

  return {
    status,
    stats,
    loading,
    error,
    refresh: loadStatus,
  }
}

/**
 * Hook for syncing agents from API to IndexedDB cache
 *
 * @example
 * const { sync, syncing, lastSync } = useAgentSync()
 * await sync() // Trigger sync
 */
export function useAgentSync() {
  const [syncing, setSyncing] = useState(false)
  const [lastSync, setLastSync] = useState<Date | null>(null)
  const [error, setError] = useState<Error | null>(null)

  const sync = useCallback(async () => {
    try {
      if (!isIndexedDBSupported()) {
        return
      }

      setSyncing(true)
      setError(null)

      // Fetch from API
      const response = await fetch("/api/agents/catalog")
      if (!response.ok) {
        throw new Error(`Failed to fetch agents: ${response.statusText}`)
      }

      const agents = await response.json()

      // Cache in IndexedDB
      await cacheAgentConfigs(agents)

      setLastSync(new Date())
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to sync agents"))
      throw err
    } finally {
      setSyncing(false)
    }
  }, [])

  return {
    sync,
    syncing,
    lastSync,
    error,
  }
}

/**
 * Hook for hybrid API + cache pattern (cache-first, then update)
 *
 * @example
 * const { agents, loading, syncing } = useHybridAgents({ trade: "Solar" })
 */
export function useHybridAgents(filters?: {
  trade?: Trade
  scale?: Scale
  isFavorite?: boolean
  limit?: number
}) {
  const { agents: cachedAgents, loading: cacheLoading, refresh } = useAgentCache(filters)
  const { sync, syncing, error: syncError } = useAgentSync()
  const [agents, setAgents] = useState<CachedAgentConfig[]>([])

  useEffect(() => {
    // Set cached agents immediately
    setAgents(cachedAgents)
  }, [cachedAgents])

  useEffect(() => {
    // Background sync on mount
    async function backgroundSync() {
      try {
        await sync()
        await refresh() // Refresh cache after sync
      } catch (err) {
        // Silent fail - cache is still valid
        console.error("Background sync failed:", err)
      }
    }

    if (!cacheLoading && isIndexedDBSupported()) {
      backgroundSync()
    }
  }, [cacheLoading, sync, refresh])

  return {
    agents,
    loading: cacheLoading,
    syncing,
    error: syncError,
  }
}
