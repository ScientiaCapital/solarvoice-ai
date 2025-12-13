"use client"

/**
 * TradeFilter Component
 *
 * Filter pills for filtering agents by trade and scale.
 */

import { Button } from "@/components/ui/button"
import { TRADES, SCALES, TRADE_COLORS, type Trade, type Scale } from "@/lib/agent-types"
import { cn } from "@/lib/utils"
import {
  Sun,
  Zap,
  Flame,
  Droplet,
  Home,
  Shield,
  Building,
  Factory,
  Radio,
} from "lucide-react"

// Trade icons
const TRADE_ICON_MAP: Record<Trade, React.ComponentType<{ className?: string }>> = {
  Solar: Sun,
  Electrical: Zap,
  HVAC: Flame,
  Plumbing: Droplet,
  Roofing: Home,
  "Low Voltage": Shield,
}

// Scale icons
const SCALE_ICON_MAP: Record<Scale, React.ComponentType<{ className?: string }>> = {
  Residential: Home,
  Commercial: Building,
  Industrial: Factory,
  Utility: Radio,
}

interface TradeFilterProps {
  selectedTrades: Trade[]
  selectedScales: Scale[]
  onTradeChange: (trades: Trade[]) => void
  onScaleChange: (scales: Scale[]) => void
}

export function TradeFilter({
  selectedTrades,
  selectedScales,
  onTradeChange,
  onScaleChange,
}: TradeFilterProps) {
  const toggleTrade = (trade: Trade) => {
    if (selectedTrades.includes(trade)) {
      onTradeChange(selectedTrades.filter((t) => t !== trade))
    } else {
      onTradeChange([...selectedTrades, trade])
    }
  }

  const toggleScale = (scale: Scale) => {
    if (selectedScales.includes(scale)) {
      onScaleChange(selectedScales.filter((s) => s !== scale))
    } else {
      onScaleChange([...selectedScales, scale])
    }
  }

  const clearFilters = () => {
    onTradeChange([])
    onScaleChange([])
  }

  const hasFilters = selectedTrades.length > 0 || selectedScales.length > 0

  return (
    <div className="space-y-4">
      {/* Trade filters */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-700">Filter by Trade</h3>
          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-xs text-gray-500 h-auto py-1 px-2"
            >
              Clear all
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {TRADES.map((trade) => {
            const Icon = TRADE_ICON_MAP[trade]
            const isSelected = selectedTrades.includes(trade)
            const color = TRADE_COLORS[trade]

            return (
              <Button
                key={trade}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                onClick={() => toggleTrade(trade)}
                className={cn(
                  "transition-all",
                  isSelected
                    ? "border-transparent"
                    : "border-gray-200 hover:border-gray-300"
                )}
                style={
                  isSelected
                    ? { backgroundColor: color, borderColor: color }
                    : undefined
                }
              >
                <Icon className="h-4 w-4 mr-1.5" />
                {trade}
              </Button>
            )
          })}
        </div>
      </div>

      {/* Scale filters */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Filter by Scale</h3>
        <div className="flex flex-wrap gap-2">
          {SCALES.map((scale) => {
            const Icon = SCALE_ICON_MAP[scale]
            const isSelected = selectedScales.includes(scale)

            return (
              <Button
                key={scale}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                onClick={() => toggleScale(scale)}
                className={cn(
                  "transition-all",
                  isSelected
                    ? "bg-gray-900 text-white border-gray-900"
                    : "border-gray-200 hover:border-gray-300"
                )}
              >
                <Icon className="h-4 w-4 mr-1.5" />
                {scale}
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Compact filter for mobile/sidebar
export function TradeFilterCompact({
  selectedTrades,
  onTradeChange,
}: {
  selectedTrades: Trade[]
  onTradeChange: (trades: Trade[]) => void
}) {
  const toggleTrade = (trade: Trade) => {
    if (selectedTrades.includes(trade)) {
      onTradeChange(selectedTrades.filter((t) => t !== trade))
    } else {
      onTradeChange([...selectedTrades, trade])
    }
  }

  return (
    <div className="flex overflow-x-auto gap-2 pb-2 -mx-4 px-4 scrollbar-hide">
      <Button
        variant={selectedTrades.length === 0 ? "default" : "outline"}
        size="sm"
        onClick={() => onTradeChange([])}
        className="shrink-0"
      >
        All
      </Button>
      {TRADES.map((trade) => {
        const Icon = TRADE_ICON_MAP[trade]
        const isSelected = selectedTrades.includes(trade)
        const color = TRADE_COLORS[trade]

        return (
          <Button
            key={trade}
            variant={isSelected ? "default" : "outline"}
            size="sm"
            onClick={() => toggleTrade(trade)}
            className="shrink-0"
            style={
              isSelected
                ? { backgroundColor: color, borderColor: color }
                : undefined
            }
          >
            <Icon className="h-4 w-4 mr-1" />
            {trade}
          </Button>
        )
      })}
    </div>
  )
}
