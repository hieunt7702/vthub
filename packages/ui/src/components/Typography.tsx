import * as React from "react";
import { cn } from "../utils";

export interface TypographyProps extends React.HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement> {
  variant?: "display-lg" | "headline-lg" | "title-md" | "body-lg" | "body-md" | "label-sm";
  as?: React.ElementType;
}

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant = "body-md", as, ...props }, ref) => {
    const Component = as || (
      variant.startsWith("display") || variant.startsWith("headline") ? "h1" :
      variant.startsWith("title") ? "h2" :
      variant === "label-sm" ? "span" : "p"
    );

    return (
      <Component
        ref={ref}
        className={cn(
          {
            "font-display-lg text-display-lg": variant === "display-lg",
            "font-headline-lg text-headline-lg": variant === "headline-lg",
            "font-title-md text-title-md": variant === "title-md",
            "font-body-lg text-body-lg": variant === "body-lg",
            "font-body-md text-body-md": variant === "body-md",
            "font-label-sm text-label-sm": variant === "label-sm",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Typography.displayName = "Typography";
