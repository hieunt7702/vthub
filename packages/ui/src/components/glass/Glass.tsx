"use client";

import React from "react";
import LiquidGlass from "liquid-glass-react";

export interface GlassProps {
  children: React.ReactNode;
  className?: string;
  radius?: number;
}

export function Glass({
  children,
  className = "",
  radius = 16,
}: GlassProps) {
  return (
    <LiquidGlass
      displacementScale={40}
      blurAmount={0.08}
      saturation={130}
      aberrationIntensity={1.5}
      elasticity={0}
      cornerRadius={radius}
      className={className}
    >
      {children}
    </LiquidGlass>
  );
}
