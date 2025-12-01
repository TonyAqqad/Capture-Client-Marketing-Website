"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "premium" | "subtle";
  hover?: boolean; // Enable hover effects
  interactive?: boolean; // Enable tap/press feedback
}

export function GlassCard({
  children,
  className = "",
  variant = "default",
  hover = true,
  interactive = true
}: GlassCardProps) {
  const variantClasses = {
    default: "bg-surface/50 backdrop-blur-lg border border-surface-border",
    premium: "bg-gradient-to-br from-white/[0.12] via-white/[0.06] to-white/[0.03] backdrop-blur-2xl border-2 border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.1)]",
    subtle: "bg-white/5 backdrop-blur-xl border border-white/10"
  };

  const hoverClasses = hover
    ? "hover:border-primary/40 hover:shadow-[0_8px_32px_rgba(0,201,255,0.2)] hover:-translate-y-1"
    : "";

  const interactiveClasses = interactive ? "active:scale-[0.98]" : "";

  return (
    <motion.div
      className={`relative rounded-2xl overflow-hidden transition-all duration-500 ${variantClasses[variant]} ${hoverClasses} ${interactiveClasses} ${className}`}
      whileHover={hover ? { y: -4 } : {}}
      whileTap={interactive ? { scale: 0.98 } : {}}
    >
      {/* Inner highlight (top edge) */}
      {variant === "premium" && (
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
      )}

      {/* Glass reflection effect */}
      {variant === "premium" && (
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none rounded-t-2xl" />
      )}

      {/* Shimmer effect on hover */}
      {hover && (
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
          initial={false}
          whileHover={{
            backgroundPosition: ['0% 50%', '100% 50%']
          }}
          transition={{
            duration: 1.5,
            ease: "linear"
          }}
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
            backgroundSize: '200% 100%'
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Bottom glow effect */}
      {variant === "premium" && hover && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
    </motion.div>
  );
}
