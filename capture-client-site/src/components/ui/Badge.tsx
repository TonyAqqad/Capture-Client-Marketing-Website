"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "primary" | "accent" | "success" | "warning" | "glass";
  size?: "sm" | "md" | "lg";
  icon?: string; // Material icon name
  pulse?: boolean; // Add pulsing animation
  className?: string;
}

export function Badge({
  children,
  variant = "primary",
  size = "md",
  icon,
  pulse = false,
  className = ""
}: BadgeProps) {
  const variantClasses = {
    primary: "bg-primary/10 border-primary/20 text-primary",
    accent: "bg-accent/10 border-accent/20 text-accent",
    success: "bg-green-500/10 border-green-500/20 text-green-400",
    warning: "bg-yellow-500/10 border-yellow-500/20 text-yellow-400",
    glass: "bg-white/10 backdrop-blur-xl border-white/20 text-foreground shadow-[0_4px_16px_rgba(0,0,0,0.1)]"
  };

  const sizeClasses = {
    sm: "px-2.5 py-1 text-xs rounded-lg",
    md: "px-3 py-1.5 text-sm rounded-lg",
    lg: "px-4 py-2 text-base rounded-xl"
  };

  return (
    <motion.div
      className={`inline-flex items-center gap-1.5 border font-semibold ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={pulse ? { scale: [1, 1.05, 1] } : {}}
      transition={pulse ? { duration: 2, repeat: Infinity } : {}}
    >
      {/* Glass effect overlay */}
      {variant === "glass" && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent rounded-inherit pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
        </>
      )}

      {icon && (
        <span className="material-icons text-current" aria-hidden="true" style={{ fontSize: size === "sm" ? "14px" : size === "md" ? "16px" : "18px" }}>
          {icon}
        </span>
      )}

      <span className="relative z-10">{children}</span>

      {/* Pulsing dot indicator */}
      {pulse && (
        <span className="relative flex h-2 w-2 ml-1">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
        </span>
      )}
    </motion.div>
  );
}
