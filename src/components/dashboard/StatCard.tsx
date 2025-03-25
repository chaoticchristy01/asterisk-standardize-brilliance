
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
  className?: string;
  trendLabel?: string;
}

const StatCard = ({
  title,
  value,
  icon,
  trend,
  description,
  className,
  trendLabel = "from yesterday"
}: StatCardProps) => {
  return (
    <Card className={cn("glass-card p-6 hover-scale", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-2 text-asterisk-text">{value}</h3>
          {trend && (
            <p className="flex items-center text-xs mt-2">
              <span
                className={cn(
                  "font-medium mr-1",
                  trend.isPositive ? "text-green-500" : "text-red-500"
                )}
              >
                {trend.isPositive ? "+" : ""}
                {trend.value}%
              </span>
              <span className="text-muted-foreground">{trendLabel}</span>
            </p>
          )}
          {description && (
            <p className="text-xs text-muted-foreground mt-2">{description}</p>
          )}
        </div>
        <div className="rounded-full p-2 bg-asterisk-primary/10 text-asterisk-primary">
          {icon}
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
