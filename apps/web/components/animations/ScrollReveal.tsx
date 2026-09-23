"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

export type RevealAnimationType = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale-up" | "fade-in";

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: RevealAnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  amount?: "some" | "all" | number; // viewport trigger amount
  staggerChildren?: number;
}

export function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 0.6,
  className = "",
  amount = 0.2,
  staggerChildren,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount });

  const getVariants = (): Variants => {
    const baseTransition = { duration, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] };
    
    switch (animation) {
      case "fade-up":
        return {
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: baseTransition },
        };
      case "fade-down":
        return {
          hidden: { opacity: 0, y: -40 },
          visible: { opacity: 1, y: 0, transition: baseTransition },
        };
      case "fade-left":
        return {
          hidden: { opacity: 0, x: 40 },
          visible: { opacity: 1, x: 0, transition: baseTransition },
        };
      case "fade-right":
        return {
          hidden: { opacity: 0, x: -40 },
          visible: { opacity: 1, x: 0, transition: baseTransition },
        };
      case "scale-up":
        return {
          hidden: { opacity: 0, scale: 0.95 },
          visible: { opacity: 1, scale: 1, transition: baseTransition },
        };
      case "fade-in":
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: baseTransition },
        };
    }
  };

  const variants = getVariants();

  if (staggerChildren !== undefined) {
    // Parent container variant for staggering
    const containerVariants: Variants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren,
          delayChildren: delay,
        },
      },
    };
    
    // We expect children to be motion components with variants
    return (
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  // Ensure delay is applied to standard animations
  if (variants.visible && typeof variants.visible === "object" && !("transition" in variants.visible)) {
     variants.visible.transition = { delay };
  } else if (variants.visible && typeof variants.visible === "object" && "transition" in variants.visible) {
     (variants.visible.transition as any).delay = delay;
  }

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Helper to wrap list items when using staggerChildren on parent
export function ScrollRevealItem({ children, className = "", animation = "fade-up", duration = 0.5 }: Omit<ScrollRevealProps, "delay" | "amount" | "staggerChildren">) {
  const getVariants = (): Variants => {
    const baseTransition = { duration, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] };
    switch (animation) {
      case "fade-up": return { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: baseTransition } };
      case "fade-left": return { hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0, transition: baseTransition } };
      case "fade-right": return { hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: baseTransition } };
      case "scale-up": return { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: baseTransition } };
      default: return { hidden: { opacity: 0 }, visible: { opacity: 1, transition: baseTransition } };
    }
  };

  return (
    <motion.div variants={getVariants()} className={className}>
      {children}
    </motion.div>
  );
}
