/**
 * IndexedDB Integration Tests
 *
 * Comprehensive test suite for SolarVoice IndexedDB operations
 */

import { describe, it, expect, beforeEach, afterEach } from "@jest/globals"
import {
  db,
  initializeDatabase,
  isIndexedDBSupported,
  cacheAgentConfigs,
  getCachedAgents,
  getCachedAgentBySlug,
  toggleAgentFavorite,
  saveVoiceInteraction,
  getRecentInteractions,
  getVoiceStats,
  queuePendingAction,
  getPendingActions,
  markActionSyncing,
  markActionFailed,
  removePendingAction,
  getSyncStatus,
  getOverallSyncStatus,
  clearAllData,
  getDbStats,
  healthCheck,
} from "../indexeddb"
import type { AgentType } from "../../agent-types"

// Mock agents for testing
const mockAgents: AgentType[] = [
  {
    id: "residential-solar",
    slug: "residential-solar",
    name: "Residential Solar Specialist",
    trade: "Solar",
    scale: "Residential",
    icon: "Sun",
    color: "#F59E0B",
    monthlyPrice: 9900,
    description: "Handle residential solar inquiries",
    promptPath: "prompts/solar/residential.md",
    features: ["Lead qualification", "Savings calculations"],
  },
  {
    id: "commercial-solar",
    slug: "commercial-solar",
    name: "Commercial Solar Consultant",
    trade: "Solar",
    scale: "Commercial",
    icon: "Building",
    color: "#F59E0B",
    monthlyPrice: 14900,
    description: "Handle C&I solar projects",
    promptPath: "prompts/solar/commercial.md",
    features: ["C&I project scoping", "ROI calculations"],
  },
  {
    id: "residential-electrician",
    slug: "residential-electrician",
    name: "Residential Electrician",
    trade: "Electrical",
    scale: "Residential",
    icon: "Zap",
    color: "#3B82F6",
    monthlyPrice: 9900,
    description: "Handle home electrical service calls",
    promptPath: "prompts/electrical/residential.md",
    features: ["Panel upgrades", "EV charger installs"],
  },
]

describe("IndexedDB Integration", () => {
  beforeEach(async () => {
    // Clear database before each test
    await clearAllData()
  })

  afterEach(async () => {
    // Cleanup after each test
    await clearAllData()
  })

  describe("Initialization", () => {
    it("should check IndexedDB support", () => {
      const supported = isIndexedDBSupported()
      expect(typeof supported).toBe("boolean")
    })

    it("should initialize database successfully", async () => {
      const initialized = await initializeDatabase()
      expect(initialized).toBe(true)
    })

    it("should pass health check", async () => {
      const health = await healthCheck()
      expect(health.isSupported).toBe(true)
      expect(health.isOperational).toBe(true)
      expect(health.version).toBeGreaterThan(0)
      expect(health.tables).toContain("agentConfigs")
      expect(health.tables).toContain("voiceHistory")
      expect(health.tables).toContain("pendingActions")
      expect(health.tables).toContain("syncStatus")
    })
  })

  describe("Agent Config Cache", () => {
    it("should cache agent configurations", async () => {
      await cacheAgentConfigs(mockAgents)

      const cached = await getCachedAgents()
      expect(cached.length).toBe(mockAgents.length)
      expect(cached[0].syncedAt).toBeDefined()
    })

    it("should get cached agent by slug", async () => {
      await cacheAgentConfigs(mockAgents)

      const agent = await getCachedAgentBySlug("residential-solar")
      expect(agent).toBeDefined()
      expect(agent?.name).toBe("Residential Solar Specialist")
    })

    it("should filter agents by trade", async () => {
      await cacheAgentConfigs(mockAgents)

      const solarAgents = await getCachedAgents({ trade: "Solar" })
      expect(solarAgents.length).toBe(2)
      expect(solarAgents.every((a) => a.trade === "Solar")).toBe(true)
    })

    it("should filter agents by scale", async () => {
      await cacheAgentConfigs(mockAgents)

      const residentialAgents = await getCachedAgents({ scale: "Residential" })
      expect(residentialAgents.length).toBe(2)
      expect(residentialAgents.every((a) => a.scale === "Residential")).toBe(true)
    })

    it("should toggle agent favorite status", async () => {
      await cacheAgentConfigs(mockAgents)

      // Toggle favorite on
      await toggleAgentFavorite("residential-solar")
      let agent = await getCachedAgentBySlug("residential-solar")
      expect(agent?.isFavorite).toBe(true)

      // Toggle favorite off
      await toggleAgentFavorite("residential-solar")
      agent = await getCachedAgentBySlug("residential-solar")
      expect(agent?.isFavorite).toBe(false)
    })

    it("should get favorite agents", async () => {
      await cacheAgentConfigs(mockAgents)
      await toggleAgentFavorite("residential-solar")
      await toggleAgentFavorite("commercial-solar")

      const favorites = await getCachedAgents({ isFavorite: true })
      expect(favorites.length).toBe(2)
    })

    it("should limit results", async () => {
      await cacheAgentConfigs(mockAgents)

      const limited = await getCachedAgents({ limit: 1 })
      expect(limited.length).toBe(1)
    })
  })

  describe("Voice History", () => {
    it("should save voice interaction", async () => {
      const id = await saveVoiceInteraction({
        agentId: "residential-solar",
        agentName: "Residential Solar Specialist",
        trade: "Solar",
        scale: "Residential",
        userInput: "What are the benefits?",
        agentResponse: "Solar provides clean energy...",
        emotion: "enthusiastic",
        duration: 45,
        timestamp: Date.now(),
        status: "success",
      })

      expect(id).toBeDefined()
      expect(typeof id).toBe("number")
    })

    it("should get recent interactions", async () => {
      await saveVoiceInteraction({
        agentId: "residential-solar",
        agentName: "Residential Solar Specialist",
        trade: "Solar",
        scale: "Residential",
        timestamp: Date.now(),
        status: "success",
      })

      const recent = await getRecentInteractions({ limit: 10 })
      expect(recent.length).toBe(1)
    })

    it("should filter interactions by agent", async () => {
      await saveVoiceInteraction({
        agentId: "residential-solar",
        agentName: "Residential Solar Specialist",
        trade: "Solar",
        scale: "Residential",
        timestamp: Date.now(),
        status: "success",
      })

      await saveVoiceInteraction({
        agentId: "commercial-solar",
        agentName: "Commercial Solar Consultant",
        trade: "Solar",
        scale: "Commercial",
        timestamp: Date.now(),
        status: "success",
      })

      const filtered = await getRecentInteractions({
        agentId: "residential-solar",
      })
      expect(filtered.length).toBe(1)
      expect(filtered[0].agentId).toBe("residential-solar")
    })

    it("should calculate voice statistics", async () => {
      await saveVoiceInteraction({
        agentId: "residential-solar",
        agentName: "Residential Solar Specialist",
        trade: "Solar",
        scale: "Residential",
        duration: 30,
        timestamp: Date.now(),
        status: "success",
      })

      await saveVoiceInteraction({
        agentId: "residential-solar",
        agentName: "Residential Solar Specialist",
        trade: "Solar",
        scale: "Residential",
        duration: 60,
        timestamp: Date.now(),
        status: "error",
      })

      const stats = await getVoiceStats({ agentId: "residential-solar" })
      expect(stats.total).toBe(2)
      expect(stats.successful).toBe(1)
      expect(stats.errors).toBe(1)
      expect(stats.averageDuration).toBe(45) // (30 + 60) / 2
      expect(stats.mostUsedAgent).toBe("residential-solar")
    })
  })

  describe("Pending Actions Queue", () => {
    it("should queue pending action", async () => {
      const id = await queuePendingAction({
        type: "agent_test",
        payload: { agentId: "residential-solar", testInput: "Hello" },
        maxRetries: 3,
      })

      expect(id).toBeDefined()
      expect(typeof id).toBe("number")
    })

    it("should get pending actions", async () => {
      await queuePendingAction({
        type: "agent_test",
        payload: { agentId: "residential-solar" },
        maxRetries: 3,
      })

      const pending = await getPendingActions()
      expect(pending.length).toBe(1)
      expect(pending[0].status).toBe("pending")
    })

    it("should mark action as syncing", async () => {
      const id = await queuePendingAction({
        type: "agent_test",
        payload: { agentId: "residential-solar" },
        maxRetries: 3,
      })

      await markActionSyncing(id!)
      const pending = await getPendingActions()
      expect(pending.length).toBe(0) // Should not include syncing status
    })

    it("should mark action as failed", async () => {
      const id = await queuePendingAction({
        type: "agent_test",
        payload: { agentId: "residential-solar" },
        maxRetries: 3,
      })

      await markActionFailed(id!, "Network error")
      const pending = await getPendingActions()
      expect(pending.length).toBe(1)
      expect(pending[0].status).toBe("failed")
      expect(pending[0].retryCount).toBe(1)
      expect(pending[0].lastError).toBe("Network error")
    })

    it("should remove pending action", async () => {
      const id = await queuePendingAction({
        type: "agent_test",
        payload: { agentId: "residential-solar" },
        maxRetries: 3,
      })

      await removePendingAction(id!)
      const pending = await getPendingActions()
      expect(pending.length).toBe(0)
    })
  })

  describe("Sync Status", () => {
    it("should update sync status", async () => {
      await cacheAgentConfigs(mockAgents)

      const status = await getSyncStatus("agents")
      expect(status).toBeDefined()
      expect(status?.status).toBe("synced")
      expect(status?.lastSyncAt).toBeDefined()
    })

    it("should get overall sync status - synced", async () => {
      await cacheAgentConfigs(mockAgents)

      const overall = await getOverallSyncStatus()
      expect(overall).toBe("synced")
    })

    it("should get overall sync status - pending", async () => {
      await queuePendingAction({
        type: "agent_test",
        payload: { test: true },
        maxRetries: 3,
      })

      const overall = await getOverallSyncStatus()
      expect(overall).toBe("pending")
    })
  })

  describe("Database Utilities", () => {
    it("should get database statistics", async () => {
      await cacheAgentConfigs(mockAgents)
      await saveVoiceInteraction({
        agentId: "residential-solar",
        agentName: "Residential Solar Specialist",
        trade: "Solar",
        scale: "Residential",
        timestamp: Date.now(),
        status: "success",
      })
      await queuePendingAction({
        type: "agent_test",
        payload: { test: true },
        maxRetries: 3,
      })

      const stats = await getDbStats()
      expect(stats.cachedAgents).toBe(mockAgents.length)
      expect(stats.voiceInteractions).toBe(1)
      expect(stats.pendingActions).toBe(1)
      expect(stats.lastAgentSync).toBeDefined()
    })

    it("should clear all data", async () => {
      await cacheAgentConfigs(mockAgents)
      await saveVoiceInteraction({
        agentId: "residential-solar",
        agentName: "Residential Solar Specialist",
        trade: "Solar",
        scale: "Residential",
        timestamp: Date.now(),
        status: "success",
      })

      await clearAllData()

      const stats = await getDbStats()
      expect(stats.cachedAgents).toBe(0)
      expect(stats.voiceInteractions).toBe(0)
      expect(stats.pendingActions).toBe(0)
    })
  })
})
