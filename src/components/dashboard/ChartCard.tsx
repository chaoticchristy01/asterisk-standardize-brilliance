
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
  description?: string;
}

const ChartCard = ({ title, children, className, action, description }: ChartCardProps) => {
  return (
    <Card className={cn("glass-card overflow-hidden", className)}>
      <div className="p-6 pb-0">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="font-medium text-asterisk-text">{title}</h3>
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
          </div>
          {action}
        </div>
      </div>
      <div className="px-2 pt-2 pb-6">{children}</div>
    </Card>
  );
};

export default ChartCard;
