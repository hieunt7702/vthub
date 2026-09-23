import React from "react";
import { Glass } from "./Glass";
import { cn } from "../../utils";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <Glass
        radius={20}
        className={cn(
          "glass-card relative overflow-hidden p-6 hover:scale-[1.02] transition-transform duration-500",
          className
        )}
      >
        <div ref={ref} {...props} className="relative z-10 h-full w-full">
          {children}
        </div>
      </Glass>
    );
  }
);
GlassCard.displayName = "GlassCard";
