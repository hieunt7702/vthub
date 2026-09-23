import * as React from "react";
import { cn } from "../utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded font-bold transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none",
          {
            "bg-primary-container text-text-primary hover:bg-inverse-primary shadow-[0_0_15px_rgba(249,115,22,0.3)]": variant === "primary",
            "bg-surface-variant/30 border border-outline-variant text-text-primary hover:bg-surface-variant/50": variant === "outline",
            "hover:bg-surface-variant/50 hover:text-primary": variant === "ghost",
            "bg-surface-container-low text-text-primary hover:bg-surface-variant/50": variant === "default",
            "h-10 px-4 py-2 text-sm": size === "default",
            "h-8 px-3 text-xs": size === "sm",
            "h-12 px-8 py-3 text-md": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
