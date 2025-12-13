/**
 * MetricsCard Component
 *
 * Enterprise-quality metrics display card with icons, trends, and color coding.
 * Based on FieldVault-AI pattern.
 */

import { Card, CardContent, CardHeader } from "./card"
import { Badge } from "./badge"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface MetricsCardProps {
  title: string
  value: string | number
  description?: string
  icon?: LucideIcon
  trend: {
    value: string
    isPositive: boolean
  } | undefined
  iconColor?: string
  className?: string
  onClick?: () => void
}

export function MetricsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  iconColor = "bg-blue-50 text-blue-600",
  className,
  onClick,
}: MetricsCardProps) {
  return (
    <Card
      className={cn(
        "transition-shadow hover:shadow-md",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          {Icon && (
            <div className={cn("p-2 rounded-md", iconColor)}>
              <Icon className="h-5 w-5" />
            </div>
          )}
          {trend && (
            <Badge
              variant={trend.isPositive ? "default" : "destructive"}
              className={cn(
                "text-xs",
                trend.isPositive
                  ? "bg-green-100 text-green-700 hover:bg-green-100"
                  : "bg-red-100 text-red-700 hover:bg-red-100"
              )}
            >
              {trend.isPositive ? "+" : ""}
              {trend.value}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {description && <p className="text-sm text-gray-500">{description}</p>}
        </div>
      </CardContent>
    </Card>
  )
}

// Pre-configured metric card variants
export function ActiveAgentsCard({
  count,
  trend,
}: {
  count: number
  trend?: { value: string; isPositive: boolean }
}) {
  return (
    <MetricsCard
      title="Active Agents"
      value={count}
      description="Currently deployed"
      iconColor="bg-green-50 text-green-600"
      trend={trend}
    />
  )
}

export function CallsCard({
  count,
  period = "today",
  trend,
}: {
  count: number
  period?: string
  trend?: { value: string; isPositive: boolean }
}) {
  return (
    <MetricsCard
      title={`Calls ${period}`}
      value={count.toLocaleString()}
      iconColor="bg-blue-50 text-blue-600"
      trend={trend}
    />
  )
}

export function MinutesCard({
  minutes,
  trend,
}: {
  minutes: number
  trend?: { value: string; isPositive: boolean }
}) {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  const display = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`

  return (
    <MetricsCard
      title="Minutes Used"
      value={display}
      description="This billing period"
      iconColor="bg-purple-50 text-purple-600"
      trend={trend}
    />
  )
}

export function SuccessRateCard({
  rate,
  trend,
}: {
  rate: number
  trend?: { value: string; isPositive: boolean }
}) {
  return (
    <MetricsCard
      title="Success Rate"
      value={`${rate.toFixed(1)}%`}
      description="Calls completed"
      iconColor="bg-amber-50 text-amber-600"
      trend={trend}
    />
  )
}
