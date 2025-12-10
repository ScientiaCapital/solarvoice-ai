/**
 * Agent Catalog API
 *
 * GET /api/agents/catalog
 * Returns all 19 marketplace agents with metadata.
 */

import { NextResponse } from "next/server"
import { getAllAgents, getAgentsByTrade, getAgentsByScale, type Trade, type Scale, TRADES, SCALES } from "@/lib/agent-types"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const trade = searchParams.get("trade") as Trade | null
    const scale = searchParams.get("scale") as Scale | null
    const search = searchParams.get("search")?.toLowerCase()

    let agents = getAllAgents()

    // Filter by trade
    if (trade && TRADES.includes(trade)) {
      agents = agents.filter((a) => a.trade === trade)
    }

    // Filter by scale
    if (scale && SCALES.includes(scale)) {
      agents = agents.filter((a) => a.scale === scale)
    }

    // Search by name or description
    if (search) {
      agents = agents.filter(
        (a) =>
          a.name.toLowerCase().includes(search) ||
          a.description.toLowerCase().includes(search) ||
          a.trade.toLowerCase().includes(search)
      )
    }

    // Return response with metadata
    return NextResponse.json({
      agents,
      total: agents.length,
      filters: {
        trades: TRADES,
        scales: SCALES,
      },
    })
  } catch (error) {
    console.error("Error fetching agent catalog:", error)
    return NextResponse.json(
      { error: "Failed to fetch agent catalog" },
      { status: 500 }
    )
  }
}
