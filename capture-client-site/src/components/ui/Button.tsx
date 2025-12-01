"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "glass" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  href?: string;
  icon?: string; // Material icon name
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  href,
  icon,
  iconPosition = "right",
  fullWidth = false
}: ButtonProps) {
  const baseClasses = "relative inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-background overflow-hidden touch-target";

  const variantClasses = {
    primary: "bg-gradient-to-r from-accent via-primary to-accent text-white shadow-glow-lg hover:shadow-glow border-2 border-transparent hover:border-accent/30",
    secondary: "bg-transparent border-2 border-surface-border text-foreground backdrop-blur-sm hover:bg-surface/50 hover:border-primary/50",
    glass: "bg-white/10 backdrop-blur-lg border-2 border-white/20 text-foreground hover:bg-white/[0.15] hover:border-white/30 hover:shadow-glow-lg shadow-[0_4px_24px_rgba(0,0,0,0.2)]",
    ghost: "bg-white/5 border border-white/10 text-foreground backdrop-blur-sm hover:bg-white/10 hover:border-white/20"
  };

  const sizeClasses = {
    sm: "px-5 py-2.5 text-sm rounded-lg",
    md: "px-6 py-3.5 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-2xl"
  };

  const widthClass = fullWidth ? "w-full" : "";

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;

  const content = (
    <>
      {/* Shimmer effect on hover (primary variant only) */}
      {variant === "primary" && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      )}

      {/* Glass effect overlay (glass variant only) */}
      {variant === "glass" && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.12] via-white/[0.06] to-white/[0.03] rounded-inherit" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </>
      )}

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {icon && iconPosition === "left" && (
          <span className="material-icons text-current">{icon}</span>
        )}
        {children}
        {icon && iconPosition === "right" && (
          <motion.span
            className="material-icons text-current"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {icon}
          </motion.span>
        )}
      </span>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={buttonClasses}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={buttonClasses}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  );
}
