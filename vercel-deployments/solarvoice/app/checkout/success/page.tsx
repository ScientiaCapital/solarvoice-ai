"use client"

/**
 * Checkout Success Page
 *
 * Displayed after successful Stripe checkout.
 */

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getAgentBySlug, TRADE_COLORS, type AgentType } from "@/lib/agent-types"
import {
  CheckCircle,
  ArrowRight,
  Mic,
  Settings,
  Phone,
  Sun,
  Zap,
  Flame,
  Droplet,
  Home,
  Shield,
} from "lucide-react"

// Icon mapping
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Sun,
  Zap,
  Flame,
  Droplet,
  Home,
  Shield,
}

function SuccessContent() {
  const searchParams = useSearchParams()
  const agentSlug = searchParams.get("agent")
  const sessionId = searchParams.get("session_id")
  const [agent, setAgent] = useState<AgentType | null>(null)

  useEffect(() => {
    if (agentSlug) {
      const agentData = getAgentBySlug(agentSlug)
      if (agentData) {
        setAgent(agentData)
      }
    }
  }, [agentSlug])

  const Icon = agent ? ICON_MAP[agent.icon] || Sun : CheckCircle
  const tradeColor = agent ? TRADE_COLORS[agent.trade] : "#22C55E"

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardContent className="pt-8 text-center">
          {/* Success icon */}
          <div
            className="h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: `${tradeColor}15` }}
          >
            <CheckCircle className="h-8 w-8" style={{ color: tradeColor }} />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Agent Activated!
          </h1>
          <p className="text-gray-600 mb-6">
            {agent
              ? `Your ${agent.name} is now ready to take calls.`
              : "Your voice agent is now ready to take calls."}
          </p>

          {/* Agent card */}
          {agent && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <div className="flex items-center gap-3">
                <div
                  className="h-12 w-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${tradeColor}15` }}
                >
                  <Icon className="h-6 w-6" style={{ color: tradeColor }} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{agent.name}</p>
                  <p className="text-sm text-gray-500">
                    {agent.trade} · {agent.scale}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Next steps */}
          <div className="space-y-3 mb-8">
            <p className="text-sm font-medium text-gray-900">Next steps:</p>
            {[
              { icon: Settings, text: "Configure your agent greeting" },
              { icon: Phone, text: "Get your dedicated phone number" },
              { icon: Mic, text: "Test your agent with a sample call" },
            ].map((step, i) => (
              <div
                key={i}
                className="flex items-center gap-3 text-sm text-gray-600"
              >
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <step.icon className="h-4 w-4" />
                </div>
                <span>{step.text}</span>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="space-y-3">
            <Link href="/dashboard/agents" className="block">
              <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600">
                Go to My Agents
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Link href="/agents" className="block">
              <Button variant="outline" className="w-full">
                Browse More Agents
              </Button>
            </Link>
          </div>

          {/* Session ID for reference */}
          {sessionId && (
            <p className="text-xs text-gray-400 mt-6">
              Order ID: {sessionId.slice(0, 20)}...
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="h-8 w-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  )
}
