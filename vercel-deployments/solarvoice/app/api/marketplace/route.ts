/**
 * Marketplace Single Agent API
 *
 * GET /api/marketplace?slug=residential-solar
 * Returns agent details with parsed prompt content.
 */

import { NextResponse } from "next/server"
import { getAgentBySlug, type AgentSlug } from "@/lib/agent-types"
import { loadPrompt } from "@/lib/prompt-loader"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get("slug")

    if (!slug) {
      return NextResponse.json(
        { error: "Missing slug parameter" },
        { status: 400 }
      )
    }

    const agent = getAgentBySlug(slug)

    if (!agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 })
    }

    // Load and parse prompt
    const prompt = await loadPrompt(slug as AgentSlug)

    return NextResponse.json({
      agent,
      prompt: prompt
        ? {
            quickReference: prompt.quickReference,
            role: prompt.role,
            personality: prompt.personality,
            task: prompt.task,
            exampleConversations: prompt.exampleConversations.slice(0, 2),
            voiceOptimization: prompt.voiceOptimization,
          }
        : null,
    })
  } catch (error) {
    console.error("Error fetching agent:", error)
    return NextResponse.json(
      { error: "Failed to fetch agent" },
      { status: 500 }
    )
  }
}
