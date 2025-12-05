"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface IndustryBadgeProps {
  children: ReactNode;
  category?: "healthcare" | "automotive" | "realestate" | "legal" | "homeservices" | "restaurant" | "default";
  icon?: ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "outline" | "glass";
  pulse?: boolean;
  className?: string;
}

/**
 * Industry-specific badge component
 * Color-coded by category with icon support
 */
export function IndustryBadge({
  children,
  category = "default",
  icon,
  size = "md",
  variant = "glass",
  pulse = false,
  className = ""
}: IndustryBadgeProps) {
  // Color schemes for different industries
  const categoryColors = {
    healthcare: {
      solid: "bg-blue-500 text-white border-blue-600",
      outline: "bg-blue-500/10 text-blue-400 border-blue-500/30",
      glass: "bg-blue-500/10 backdrop-blur-xl border-blue-500/20 text-blue-300 shadow-[0_4px_16px_rgba(59,130,246,0.15)]"
    },
    automotive: {
      solid: "bg-red-500 text-white border-red-600",
      outline: "bg-red-500/10 text-red-400 border-red-500/30",
      glass: "bg-red-500/10 backdrop-blur-xl border-red-500/20 text-red-300 shadow-[0_4px_16px_rgba(239,68,68,0.15)]"
    },
    realestate: {
      solid: "bg-green-500 text-white border-green-600",
      outline: "bg-green-500/10 text-green-400 border-green-500/30",
      glass: "bg-green-500/10 backdrop-blur-xl border-green-500/20 text-green-300 shadow-[0_4px_16px_rgba(34,197,94,0.15)]"
    },
    legal: {
      solid: "bg-amber-500 text-white border-amber-600",
      outline: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      glass: "bg-amber-500/10 backdrop-blur-xl border-amber-500/20 text-amber-300 shadow-[0_4px_16px_rgba(245,158,11,0.15)]"
    },
    homeservices: {
      solid: "bg-orange-500 text-white border-orange-600",
      outline: "bg-orange-500/10 text-orange-400 border-orange-500/30",
      glass: "bg-orange-500/10 backdrop-blur-xl border-orange-500/20 text-orange-300 shadow-[0_4px_16px_rgba(249,115,22,0.15)]"
    },
    restaurant: {
      solid: "bg-purple-500 text-white border-purple-600",
      outline: "bg-purple-500/10 text-purple-400 border-purple-500/30",
      glass: "bg-purple-500/10 backdrop-blur-xl border-purple-500/20 text-purple-300 shadow-[0_4px_16px_rgba(168,85,247,0.15)]"
    },
    default: {
      solid: "bg-gold text-white border-gold-600",
      outline: "bg-gold/10 text-gold border-gold/30",
      glass: "bg-gold/10 backdrop-blur-xl border-gold/20 text-gold shadow-glow-gold"
    }
  };

  const sizeClasses = {
    sm: "px-2.5 py-1 text-xs rounded-lg gap-1",
    md: "px-3 py-1.5 text-sm rounded-lg gap-1.5",
    lg: "px-4 py-2 text-base rounded-xl gap-2"
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  };

  return (
    <motion.div
      className={cn(
        "inline-flex items-center border font-semibold relative overflow-hidden",
        categoryColors[category][variant],
        sizeClasses[size],
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={pulse ? { scale: [1, 1.05, 1] } : {}}
      transition={pulse ? { duration: 2, repeat: Infinity } : { duration: 0.2 }}
    >
      {/* Glass effect overlay for glass variant */}
      {variant === "glass" && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent rounded-inherit pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
        </>
      )}

      {/* Icon */}
      {icon && (
        <span className={cn("relative z-10", iconSizes[size])} aria-hidden="true">
          {icon}
        </span>
      )}

      {/* Text */}
      <span className="relative z-10 whitespace-nowrap">{children}</span>

      {/* Pulsing indicator */}
      {pulse && (
        <span className="relative flex h-2 w-2 ml-1">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
        </span>
      )}
    </motion.div>
  );
}
