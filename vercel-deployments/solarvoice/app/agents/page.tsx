"use client"

/**
 * Agent Marketplace Page
 *
 * Browse and filter all 19 MEP+Energy voice agents.
 */

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AgentMarketplaceCard } from "@/components/agents/AgentMarketplaceCard"
import { TradeFilter } from "@/components/agents/TradeFilter"
import {
  getAllAgents,
  type AgentType,
  type Trade,
  type Scale,
} from "@/lib/agent-types"
import { Search, LayoutGrid, List, Mic } from "lucide-react"
import Link from "next/link"

export default function AgentsMarketplacePage() {
  const [agents] = useState<AgentType[]>(getAllAgents())
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTrades, setSelectedTrades] = useState<Trade[]>([])
  const [selectedScales, setSelectedScales] = useState<Scale[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Filter agents based on selections
  const filteredAgents = useMemo(() => {
    return agents.filter((agent) => {
      // Trade filter
      if (selectedTrades.length > 0 && !selectedTrades.includes(agent.trade)) {
        return false
      }
      // Scale filter
      if (selectedScales.length > 0 && !selectedScales.includes(agent.scale)) {
        return false
      }
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          agent.name.toLowerCase().includes(query) ||
          agent.description.toLowerCase().includes(query) ||
          agent.trade.toLowerCase().includes(query) ||
          agent.features.some((f) => f.toLowerCase().includes(query))
        )
      }
      return true
    })
  }, [agents, selectedTrades, selectedScales, searchQuery])

  // Handle rent action
  const handleRent = async (agent: AgentType) => {
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentSlug: agent.slug }),
      })
      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error("Checkout error:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container max-w-7xl py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Voice Agent Marketplace
              </h1>
              <p className="text-gray-600 mt-2">
                19 specialized voice agents for MEP & Energy contractors
              </p>
            </div>
            <Link href="/dashboard/agents">
              <Button variant="outline">
                <Mic className="h-4 w-4 mr-2" />
                My Agents
              </Button>
            </Link>
          </div>

          {/* Search bar */}
          <div className="mt-6 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search agents by name, trade, or feature..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 max-w-xl"
            />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container max-w-7xl py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-8 space-y-6">
              <TradeFilter
                selectedTrades={selectedTrades}
                selectedScales={selectedScales}
                onTradeChange={setSelectedTrades}
                onScaleChange={setSelectedScales}
              />

              {/* Stats */}
              <div className="bg-white rounded-lg border p-4">
                <p className="text-sm text-gray-500">
                  Showing{" "}
                  <span className="font-semibold text-gray-900">
                    {filteredAgents.length}
                  </span>{" "}
                  of {agents.length} agents
                </p>
              </div>
            </div>
          </aside>

          {/* Agent grid */}
          <main className="flex-1">
            {/* View toggle */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-600">
                {filteredAgents.length} agents available
              </p>
              <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="h-8 w-8 p-0"
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="h-8 w-8 p-0"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Grid/List */}
            {filteredAgents.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border">
                <Mic className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No agents found
                </h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your filters or search query
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedTrades([])
                    setSelectedScales([])
                    setSearchQuery("")
                  }}
                >
                  Clear filters
                </Button>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid gap-6 md:grid-cols-2 xl:grid-cols-3"
                    : "space-y-4"
                }
              >
                {filteredAgents.map((agent) => (
                  <AgentMarketplaceCard
                    key={agent.id}
                    agent={agent}
                    onRent={() => handleRent(agent)}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
