import * as React from "react";
import { cn } from "../utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "primary" | "secondary" | "outline";
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "px-3 py-1 rounded-full text-xs flex items-center gap-1 w-fit",
          {
            "bg-surface-variant/40 border border-outline-variant text-on-surface-variant": variant === "default",
            "bg-primary-container text-on-primary-container font-bold border border-primary/20 shadow-lg tracking-wider uppercase px-2.5 py-1 text-[11px]": variant === "primary",
            "bg-success-green/10 text-success-green border border-success-green/20": variant === "success",
            "bg-surface-variant/50 border border-outline-variant text-primary font-label-sm": variant === "outline",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";
