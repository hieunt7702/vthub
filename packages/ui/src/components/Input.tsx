import * as React from "react";
import { cn } from "../utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {icon && (
          <span className="absolute left-4 text-text-muted z-10 pointer-events-none flex items-center justify-center">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full bg-surface-container-low border border-outline-variant text-text-primary rounded py-4 pr-4 focus:outline-none focus:border-primary-container transition-colors placeholder:text-text-muted",
            icon ? "pl-12" : "pl-4",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";
