import React from "react";
import { Glass } from "./Glass";
import { cn } from "../../utils";

export interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <Glass
        radius={10}
        className={cn(
          "glass-button inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-white transition-all hover:scale-[1.02] active:scale-[0.98]",
          className
        )}
      >
        <button ref={ref} className="w-full h-full outline-none flex items-center justify-center gap-2" {...props}>
          {children}
        </button>
      </Glass>
    );
  }
);
GlassButton.displayName = "GlassButton";
