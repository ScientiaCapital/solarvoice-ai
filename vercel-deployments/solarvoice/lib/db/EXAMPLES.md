# IndexedDB React Integration Examples

Complete examples showing how to use the IndexedDB hooks in React components.

## Basic Agent Cache Usage

```tsx
"use client"

import { useAgentCache } from "@/lib/db"

export function AgentList() {
  const { agents, loading, toggleFavorite, error } = useAgentCache()

  if (loading) return <div>Loading agents...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="grid gap-4">
      {agents.map((agent) => (
        <div key={agent.slug} className="p-4 border rounded">
          <h3>{agent.name}</h3>
          <p>{agent.description}</p>
          <button onClick={() => toggleFavorite(agent.slug)}>
            {agent.isFavorite ? "★" : "☆"}
          </button>
        </div>
      ))}
    </div>
  )
}
```

## Filtered Solar Agents

```tsx
"use client"

import { useAgentCache } from "@/lib/db"

export function SolarAgents() {
  const { agents, loading, refresh } = useAgentCache({
    trade: "Solar",
    limit: 10,
  })

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2>Solar Specialists</h2>
        <button onClick={refresh} disabled={loading}>
          Refresh
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-4">
          {agents.map((agent) => (
            <AgentCard key={agent.slug} agent={agent} />
          ))}
        </div>
      )}
    </div>
  )
}
```

## Favorite Agents Dashboard

```tsx
"use client"

import { useAgentCache } from "@/lib/db"

export function FavoritesPanel() {
  const { agents, loading, toggleFavorite } = useAgentCache({
    isFavorite: true,
  })

  if (loading) return <div className="animate-pulse">Loading favorites...</div>

  if (agents.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No favorite agents yet. Click the star icon on any agent to add it.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Your Favorites</h2>
      {agents.map((agent) => (
        <div key={agent.slug} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
          <div className="flex-1">
            <h3 className="font-semibold">{agent.name}</h3>
            <p className="text-sm text-gray-600">{agent.trade} - {agent.scale}</p>
          </div>
          <button
            onClick={() => toggleFavorite(agent.slug)}
            className="text-yellow-500 text-2xl"
          >
            ★
          </button>
        </div>
      ))}
    </div>
  )
}
```

## Single Agent Detail with Cache

```tsx
"use client"

import { useCachedAgent } from "@/lib/db"

export function AgentDetail({ slug }: { slug: string }) {
  const { agent, loading, error } = useCachedAgent(slug)

  if (loading) {
    return <div className="animate-pulse">Loading agent details...</div>
  }

  if (error || !agent) {
    return <div className="text-red-500">Agent not found</div>
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex items-center gap-4 mb-4">
        <div style={{ color: agent.color }} className="text-4xl">
          {agent.icon}
        </div>
        <div>
          <h1 className="text-3xl font-bold">{agent.name}</h1>
          <p className="text-gray-600">{agent.trade} • {agent.scale}</p>
        </div>
      </div>

      <p className="mb-6">{agent.description}</p>

      <div>
        <h3 className="font-semibold mb-2">Features:</h3>
        <ul className="list-disc list-inside">
          {agent.features.map((feature, i) => (
            <li key={i}>{feature}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <span className="text-2xl font-bold">
          ${agent.monthlyPrice / 100}/month
        </span>
      </div>
    </div>
  )
}
```

## Voice History Dashboard

```tsx
"use client"

import { useVoiceHistory } from "@/lib/db"
import { formatDistanceToNow } from "date-fns"

export function VoiceHistoryPanel({ agentId }: { agentId?: string }) {
  const { interactions, stats, loading, refresh } = useVoiceHistory({
    agentId,
    limit: 20,
  })

  if (loading) return <div>Loading voice history...</div>

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 bg-blue-50 rounded">
          <div className="text-2xl font-bold">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Interactions</div>
        </div>
        <div className="p-4 bg-green-50 rounded">
          <div className="text-2xl font-bold">{stats.successful}</div>
          <div className="text-sm text-gray-600">Successful</div>
        </div>
        <div className="p-4 bg-red-50 rounded">
          <div className="text-2xl font-bold">{stats.errors}</div>
          <div className="text-sm text-gray-600">Errors</div>
        </div>
        <div className="p-4 bg-purple-50 rounded">
          <div className="text-2xl font-bold">
            {Math.round(stats.averageDuration)}s
          </div>
          <div className="text-sm text-gray-600">Avg Duration</div>
        </div>
      </div>

      {/* Interaction List */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Recent Interactions</h3>
          <button onClick={refresh} className="text-blue-600 hover:underline">
            Refresh
          </button>
        </div>

        <div className="space-y-2">
          {interactions.map((interaction) => (
            <div
              key={interaction.id}
              className="p-4 border rounded flex justify-between items-start"
            >
              <div className="flex-1">
                <div className="font-semibold">{interaction.agentName}</div>
                {interaction.userInput && (
                  <div className="text-sm text-gray-600 mt-1">
                    You: {interaction.userInput}
                  </div>
                )}
                {interaction.agentResponse && (
                  <div className="text-sm mt-1">
                    Agent: {interaction.agentResponse}
                  </div>
                )}
              </div>
              <div className="text-right text-sm text-gray-500">
                <div>{formatDistanceToNow(interaction.timestamp)} ago</div>
                {interaction.duration && <div>{interaction.duration}s</div>}
                <div className={
                  interaction.status === "success"
                    ? "text-green-600"
                    : "text-red-600"
                }>
                  {interaction.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

## Sync Status Indicator

```tsx
"use client"

import { useSyncStatus } from "@/lib/db"

export function SyncStatusIndicator() {
  const { status, stats, loading } = useSyncStatus()

  if (loading) return null

  const statusConfig = {
    synced: { color: "green", icon: "✓", label: "Synced" },
    syncing: { color: "blue", icon: "⟳", label: "Syncing..." },
    pending: { color: "yellow", icon: "⏳", label: "Pending" },
    error: { color: "red", icon: "✗", label: "Error" },
  }

  const config = statusConfig[status]

  return (
    <div className="flex items-center gap-2">
      <div className={`text-${config.color}-600`}>
        <span className="text-lg">{config.icon}</span>
        <span className="ml-1 text-sm">{config.label}</span>
      </div>

      {stats.pendingActions > 0 && (
        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
          {stats.pendingActions} pending
        </span>
      )}
    </div>
  )
}
```

## Hybrid Cache + API Pattern

```tsx
"use client"

import { useHybridAgents } from "@/lib/db"

export function HybridAgentList() {
  const { agents, loading, syncing, error } = useHybridAgents({
    trade: "Solar",
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2>Solar Specialists</h2>
        {syncing && (
          <span className="text-sm text-blue-600">
            Syncing latest data...
          </span>
        )}
      </div>

      {loading ? (
        <div>Loading from cache...</div>
      ) : error ? (
        <div className="text-red-500">Error: {error.message}</div>
      ) : (
        <div className="grid gap-4">
          {agents.map((agent) => (
            <div key={agent.slug} className="p-4 border rounded">
              <h3>{agent.name}</h3>
              <p className="text-sm text-gray-600">{agent.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
```

## Pending Actions Monitor

```tsx
"use client"

import { usePendingActions } from "@/lib/db"

export function PendingActionsMonitor() {
  const { actions, count, loading, refresh } = usePendingActions()

  if (loading) return <div>Loading...</div>

  if (count === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        No pending actions
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">
          Pending Actions ({count})
        </h3>
        <button onClick={refresh} className="text-blue-600 text-sm">
          Refresh
        </button>
      </div>

      <div className="space-y-2">
        {actions.map((action) => (
          <div key={action.id} className="p-3 border rounded">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium">{action.type}</div>
                <div className="text-sm text-gray-600">
                  Retry {action.retryCount}/{action.maxRetries}
                </div>
              </div>
              <div className={
                action.status === "pending"
                  ? "text-yellow-600"
                  : action.status === "failed"
                  ? "text-red-600"
                  : "text-blue-600"
              }>
                {action.status}
              </div>
            </div>
            {action.lastError && (
              <div className="mt-2 text-sm text-red-600">
                {action.lastError}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
```

## Manual Sync Trigger

```tsx
"use client"

import { useAgentSync } from "@/lib/db"

export function SyncButton() {
  const { sync, syncing, lastSync, error } = useAgentSync()

  return (
    <div className="space-y-2">
      <button
        onClick={sync}
        disabled={syncing}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
      >
        {syncing ? "Syncing..." : "Sync Now"}
      </button>

      {lastSync && (
        <div className="text-sm text-gray-600">
          Last synced: {lastSync.toLocaleTimeString()}
        </div>
      )}

      {error && (
        <div className="text-sm text-red-600">
          Error: {error.message}
        </div>
      )}
    </div>
  )
}
```

## Offline Indicator

```tsx
"use client"

import { useState, useEffect } from "react"
import { isIndexedDBSupported } from "@/lib/db"

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true)
  const [hasCache, setHasCache] = useState(false)

  useEffect(() => {
    setHasCache(isIndexedDBSupported())

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  if (isOnline) return null

  return (
    <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-white px-4 py-2 text-center z-50">
      <span className="font-semibold">You're offline</span>
      {hasCache && <span className="ml-2">• Cached data available</span>}
    </div>
  )
}
```

## Complete Dashboard Example

```tsx
"use client"

import { useHybridAgents, useVoiceHistory, useSyncStatus } from "@/lib/db"

export function AgentDashboard() {
  const { agents, loading: agentsLoading, syncing } = useHybridAgents()
  const { stats, loading: statsLoading } = useVoiceHistory({ limit: 100 })
  const { status, stats: dbStats } = useSyncStatus()

  return (
    <div className="space-y-8">
      {/* Header with Sync Status */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Agent Dashboard</h1>
        <div className="flex items-center gap-4">
          {syncing && <span className="text-sm text-blue-600">Syncing...</span>}
          <div className="text-sm">
            Status: <span className={
              status === "synced" ? "text-green-600" :
              status === "error" ? "text-red-600" :
              "text-yellow-600"
            }>
              {status}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="text-2xl font-bold">{dbStats.cachedAgents}</div>
          <div className="text-sm text-gray-600">Cached Agents</div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="text-2xl font-bold">{dbStats.favoriteAgents}</div>
          <div className="text-sm text-gray-600">Favorites</div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="text-2xl font-bold">{stats.total}</div>
          <div className="text-sm text-gray-600">Voice Interactions</div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="text-2xl font-bold">
            {stats.total > 0 ? Math.round((stats.successful / stats.total) * 100) : 0}%
          </div>
          <div className="text-sm text-gray-600">Success Rate</div>
        </div>
      </div>

      {/* Agent List */}
      <div>
        <h2 className="text-2xl font-bold mb-4">All Agents</h2>
        {agentsLoading ? (
          <div>Loading agents...</div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {agents.map((agent) => (
              <div key={agent.slug} className="p-4 bg-white rounded-lg shadow">
                <h3 className="font-semibold">{agent.name}</h3>
                <p className="text-sm text-gray-600">{agent.trade}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
```
