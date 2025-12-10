"use client"

/**
 * AgentMarketplaceCard Component
 *
 * Displays an agent in the marketplace grid with trade icon, pricing, and rent CTA.
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { type AgentType, formatPrice, TRADE_COLORS } from "@/lib/agent-types"
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
  ChevronRight,
} from "lucide-react"
import Link from "next/link"

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

interface AgentMarketplaceCardProps {
  agent: AgentType
  onRent?: () => void
}

export function AgentMarketplaceCard({ agent, onRent }: AgentMarketplaceCardProps) {
  const Icon = ICON_MAP[agent.icon] || Sun
  const tradeColor = TRADE_COLORS[agent.trade] || "#6B7280"

  return (
    <Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-200 border-gray-200 hover:border-gray-300">
      {/* Trade color accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ backgroundColor: tradeColor }}
      />

      <CardHeader className="pt-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {/* Icon with trade color background */}
            <div
              className="h-12 w-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${tradeColor}15` }}
            >
              <Icon className="h-6 w-6" style={{ color: tradeColor }} />
            </div>
            <div>
              <CardTitle className="text-lg leading-tight">{agent.name}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  variant="secondary"
                  className="text-xs font-normal"
                  style={{
                    backgroundColor: `${tradeColor}15`,
                    color: tradeColor,
                  }}
                >
                  {agent.trade}
                </Badge>
                <Badge variant="outline" className="text-xs font-normal">
                  {agent.scale}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Description */}
        <CardDescription className="text-sm line-clamp-2">
          {agent.description}
        </CardDescription>

        {/* Features */}
        <div className="flex flex-wrap gap-1">
          {agent.features.slice(0, 3).map((feature) => (
            <Badge
              key={feature}
              variant="secondary"
              className="text-xs font-normal bg-gray-100 text-gray-600"
            >
              {feature}
            </Badge>
          ))}
          {agent.features.length > 3 && (
            <Badge
              variant="secondary"
              className="text-xs font-normal bg-gray-100 text-gray-600"
            >
              +{agent.features.length - 3} more
            </Badge>
          )}
        </div>

        {/* Pricing and CTA */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(agent.monthlyPrice)}
            </span>
            <span className="text-sm text-gray-500">/month</span>
          </div>
          <div className="flex gap-2">
            <Link href={`/agents/${agent.slug}`}>
              <Button variant="outline" size="sm">
                Details
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
            <Button
              size="sm"
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
              onClick={(e) => {
                e.preventDefault()
                onRent?.()
              }}
            >
              Rent Agent
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Compact version for dashboard or lists
export function AgentCompactCard({ agent }: { agent: AgentType }) {
  const Icon = ICON_MAP[agent.icon] || Sun
  const tradeColor = TRADE_COLORS[agent.trade] || "#6B7280"

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
      <div
        className="h-10 w-10 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${tradeColor}15` }}
      >
        <Icon className="h-5 w-5" style={{ color: tradeColor }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm text-gray-900 truncate">{agent.name}</p>
        <p className="text-xs text-gray-500">
          {agent.trade} · {agent.scale}
        </p>
      </div>
      <div className="text-right">
        <p className="font-semibold text-sm">{formatPrice(agent.monthlyPrice)}</p>
        <p className="text-xs text-gray-500">/mo</p>
      </div>
    </div>
  )
}
