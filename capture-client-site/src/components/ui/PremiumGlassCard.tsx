"use client";

import { motion } from "@/lib/motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PremiumGlassCardProps {
  children?: ReactNode;
  header?: ReactNode;
  body?: ReactNode;
  footer?: ReactNode;
  className?: string;
  variant?: "default" | "premium" | "gold" | "subtle";
  hover?: boolean;
  glowColor?: "cyan" | "gold" | "primary";
}

/**
 * Premium glassmorphic card with header/body/footer slots
 * Anti-AI-slop design with subtle gradients and intentional spacing
 */
export function PremiumGlassCard({
  children,
  header,
  body,
  footer,
  className = "",
  variant = "premium",
  hover = true,
  glowColor = "cyan"
}: PremiumGlassCardProps) {
  const variantClasses = {
    default: "bg-surface/50 backdrop-blur-lg border border-surface-border",
    premium: "bg-gradient-to-br from-white/[0.12] via-white/[0.06] to-white/[0.03] backdrop-blur-2xl border border-white/20 shadow-card",
    gold: "bg-gradient-to-br from-gold/[0.12] via-gold/[0.06] to-white/[0.03] backdrop-blur-2xl border border-gold/30 shadow-glow-gold",
    subtle: "bg-white/5 backdrop-blur-xl border border-white/10"
  };

  const glowClasses = {
    cyan: "hover:shadow-[0_8px_32px_rgba(0,201,255,0.25),inset_0_1px_1px_rgba(255,255,255,0.1)] hover:border-accent/40",
    gold: "hover:shadow-glow-gold-lg hover:border-gold/50",
    primary: "hover:shadow-glow-primary hover:border-primary/40"
  };

  return (
    <motion.div
      className={cn(
        "group relative rounded-2xl overflow-hidden transition-all duration-300",
        variantClasses[variant],
        hover && glowClasses[glowColor],
        className
      )}
      whileHover={hover ? { y: -4, scale: 1.01 } : {}}
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Top gradient border highlight */}
      {variant === "premium" && (
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
      )}

      {/* Glass reflection effect */}
      {variant === "premium" && (
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none rounded-t-2xl" />
      )}

      {/* Gold accent glow for gold variant */}
      {variant === "gold" && (
        <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent pointer-events-none" />
      )}

      {/* Content wrapper */}
      <div className="relative z-10">
        {header && (
          <div className="px-6 py-5 border-b border-white/10">
            {header}
          </div>
        )}

        {body && (
          <div className="px-6 py-6">
            {body}
          </div>
        )}

        {/* If no slots used, render children directly */}
        {!header && !body && !footer && children && (
          <div className="p-6">
            {children}
          </div>
        )}

        {footer && (
          <div className="px-6 py-4 border-t border-white/10 bg-white/[0.02]">
            {footer}
          </div>
        )}
      </div>

      {/* Bottom glow on hover */}
      {hover && (
        <div className={cn(
          "absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          glowColor === "gold" ? "via-gold/50" : glowColor === "cyan" ? "via-accent/50" : "via-primary/50"
        )} />
      )}
    </motion.div>
  );
}
