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
  variant?: "default" | "premium" | "subtle";
  hover?: boolean;
  glowColor?: "blue" | "primary";
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
  glowColor = "blue",
}: PremiumGlassCardProps) {
  const variantClasses = {
    default: "bg-white/80 backdrop-blur-lg border border-slate-200",
    premium: "bg-white/90 backdrop-blur-xl border border-slate-200 shadow-lg",
    subtle: "bg-slate-50/80 backdrop-blur-lg border border-slate-200",
  };

  const glowClasses = {
    blue: "hover:shadow-[0_8px_32px_rgba(59,130,246,0.15)] hover:border-blue-400",
    primary: "hover:shadow-[0_8px_32px_rgba(59,130,246,0.15)] hover:border-blue-400",
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
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200/40 to-transparent pointer-events-none" />
      )}

      {/* Glass reflection effect */}
      {variant === "premium" && (
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/40 to-transparent pointer-events-none rounded-t-2xl" />
      )}

      {/* Content wrapper */}
      <div className="relative z-10">
        {header && <div className="px-6 py-5 border-b border-slate-200/50">{header}</div>}

        {body && <div className="px-6 py-6">{body}</div>}

        {/* If no slots used, render children directly */}
        {!header && !body && !footer && children && <div className="p-6">{children}</div>}

        {footer && (
          <div className="px-6 py-4 border-t border-slate-200/50 bg-slate-50/50">{footer}</div>
        )}
      </div>

      {/* Bottom glow on hover */}
      {hover && (
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300",
            glowColor === "blue" ? "via-blue-400/50" : "via-blue-500/50"
          )}
        />
      )}
    </motion.div>
  );
}
