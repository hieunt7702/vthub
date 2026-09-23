import * as React from "react";
import { cn } from "../utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, glow = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-surface-card border border-surface-variant rounded p-4",
          glow && "card-glow backdrop-blur-sm",
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";
