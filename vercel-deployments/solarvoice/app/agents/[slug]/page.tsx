"use client"

/**
 * Agent Detail Page
 *
 * Shows full agent details, prompt preview, and purchase options.
 */

import { useState, useEffect, use } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  getAgentBySlug,
  formatPrice,
  TRADE_COLORS,
  type AgentType,
} from "@/lib/agent-types"
import {
  Sun,
  Zap,
  Flame,
  Droplet,
  Home,
  Shield,
  Building,
  Factory,
  Cable,
  Bell,
  ArrowLeft,
  Check,
  Play,
  MessageSquare,
  Settings,
  Clock,
} from "lucide-react"

// Icon mapping
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Sun,
  Zap,
  Flame,
  Droplet,
  Home,
  Shield,
  Building,
  Factory,
  Cable,
  Bell,
}

interface PromptData {
  quickReference: {
    role: string
    primaryGoal: string
    callType: string
    trade: string
    projectScale: string
    style: string
  }
  role: string
  personality: string[]
  task: string[]
  exampleConversations: { title: string; dialogue: string }[]
}

export default function AgentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const [agent, setAgent] = useState<AgentType | null>(null)
  const [promptData, setPromptData] = useState<PromptData | null>(null)
  const [checkoutLoading, setCheckoutLoading] = useState(false)

  useEffect(() => {
    const agentData = getAgentBySlug(slug)
    if (agentData) {
      setAgent(agentData)
    }

    // Fetch prompt data from marketplace API
    fetch(`/api/marketplace?slug=${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.prompt) {
          setPromptData(data.prompt)
        }
      })
      .finally(() => {})
  }, [slug])

  const handleRent = async () => {
    if (!agent) return
    setCheckoutLoading(true)
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
    } finally {
      setCheckoutLoading(false)
    }
  }

  if (!agent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Agent not found</h1>
          <Link href="/agents">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to marketplace
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const Icon = ICON_MAP[agent.icon] || Sun
  const tradeColor = TRADE_COLORS[agent.trade]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container max-w-6xl py-4">
          <Link
            href="/agents"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to marketplace
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="container max-w-6xl py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left column - Agent info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Agent header */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div
                    className="h-16 w-16 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${tradeColor}15` }}
                  >
                    <Icon className="h-8 w-8" style={{ color: tradeColor }} />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900">
                      {agent.name}
                    </h1>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge
                        style={{
                          backgroundColor: `${tradeColor}15`,
                          color: tradeColor,
                        }}
                      >
                        {agent.trade}
                      </Badge>
                      <Badge variant="outline">{agent.scale}</Badge>
                    </div>
                    <p className="text-gray-600 mt-3">{agent.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Capabilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-3">
                  {agent.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 text-sm"
                    >
                      <Check
                        className="h-4 w-4 shrink-0"
                        style={{ color: tradeColor }}
                      />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Prompt preview */}
            {promptData && (
              <>
                {/* Quick Reference */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Agent Profile
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Primary Goal</p>
                        <p className="font-medium">
                          {promptData.quickReference.primaryGoal}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Call Type</p>
                        <p className="font-medium">
                          {promptData.quickReference.callType}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Style</p>
                        <p className="font-medium">
                          {promptData.quickReference.style}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Project Scale</p>
                        <p className="font-medium">
                          {promptData.quickReference.projectScale}
                        </p>
                      </div>
                    </div>

                    {/* Personality */}
                    {promptData.personality.length > 0 && (
                      <div className="pt-4 border-t">
                        <p className="text-sm text-gray-500 mb-2">
                          Personality Traits
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {promptData.personality.map((trait, i) => (
                            <Badge key={i} variant="secondary">
                              {trait.split(":")[0]}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Example conversations */}
                {promptData.exampleConversations.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Play className="h-5 w-5" />
                        Example Conversations
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {promptData.exampleConversations.map((example, i) => (
                        <div
                          key={i}
                          className="bg-gray-50 rounded-lg p-4 text-sm"
                        >
                          <p className="font-medium text-gray-900 mb-2">
                            {example.title}
                          </p>
                          <pre className="whitespace-pre-wrap text-gray-600 font-sans">
                            {example.dialogue.slice(0, 500)}
                            {example.dialogue.length > 500 && "..."}
                          </pre>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </div>

          {/* Right column - Pricing card */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="border-2 border-gray-200">
                <CardContent className="pt-6">
                  <div className="text-center mb-6">
                    <p className="text-sm text-gray-500 mb-1">Monthly rental</p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-gray-900">
                        {formatPrice(agent.monthlyPrice)}
                      </span>
                      <span className="text-gray-500">/month</span>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 h-12 text-base"
                    onClick={handleRent}
                    disabled={checkoutLoading}
                  >
                    {checkoutLoading ? "Loading..." : "Rent This Agent"}
                  </Button>

                  <p className="text-xs text-center text-gray-500 mt-3">
                    Cancel anytime. No long-term commitment.
                  </p>

                  {/* What's included */}
                  <div className="mt-6 pt-6 border-t space-y-3">
                    <p className="text-sm font-medium text-gray-900">
                      What&apos;s included:
                    </p>
                    {[
                      "24/7 voice availability",
                      "Unlimited call handling",
                      "Call recordings & transcripts",
                      "Real-time analytics",
                      "Custom greeting setup",
                      "Integration support",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <Check className="h-4 w-4 text-green-500 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Response time */}
                  <div className="mt-6 pt-6 border-t">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>Usually responds in under 2 seconds</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
