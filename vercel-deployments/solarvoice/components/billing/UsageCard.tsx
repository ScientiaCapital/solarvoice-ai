import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowDown, ArrowUp, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface UsageCardProps {
  title: string;
  value: number;
  limit?: number;
  unit?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    direction: "up" | "down";
  };
}

export function UsageCard({
  title,
  value,
  limit,
  unit,
  icon: Icon,
  trend,
}: UsageCardProps) {
  const percentage = limit ? (value / limit) * 100 : 0;
  const isNearLimit = percentage > 90;

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2.5">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">
              {title}
            </h3>
          </div>
          {trend && (
            <div
              className={cn(
                "flex items-center gap-1 text-xs font-medium",
                trend.direction === "up"
                  ? "text-green-600"
                  : "text-red-600"
              )}
            >
              {trend.direction === "up" ? (
                <ArrowUp className="h-3 w-3" />
              ) : (
                <ArrowDown className="h-3 w-3" />
              )}
              <span>{trend.value}%</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold">
            {value.toLocaleString()}
          </span>
          {limit ? (
            <span className="text-sm text-muted-foreground">
              / {limit.toLocaleString()} {unit}
            </span>
          ) : (
            unit && <span className="text-sm text-muted-foreground">{unit}</span>
          )}
        </div>

        {limit && (
          <div className="space-y-1.5">
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={cn(
                  "h-full transition-all duration-300",
                  isNearLimit ? "bg-red-500" : "bg-primary"
                )}
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {percentage.toFixed(1)}% used
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
