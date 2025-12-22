"use client";

import { motion } from "@/lib/motion";
import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "glass" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  href?: string;
  icon?: LucideIcon; // Lucide React icon component
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  ariaLabel?: string; // Accessible label for links without visible text
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  href,
  icon: Icon,
  iconPosition = "right",
  fullWidth = false,
  ariaLabel,
}: ButtonProps) {
  const baseClasses =
    "relative inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-white overflow-hidden touch-target";

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 border-2 border-transparent hover:border-blue-400/30",
    secondary:
      "bg-white border-2 border-slate-200 text-slate-900 backdrop-blur-sm hover:bg-slate-50 hover:border-slate-300",
    glass:
      "bg-white/80 backdrop-blur-xl border-2 border-slate-200 text-slate-900 hover:bg-white hover:border-slate-300 shadow-lg shadow-slate-200/50",
    ghost:
      "bg-white/70 border border-slate-200 text-slate-900 backdrop-blur-sm hover:bg-white hover:border-slate-300",
  };

  const sizeClasses = {
    sm: "px-5 py-3 text-sm rounded-lg min-h-[48px]",
    md: "px-6 py-3.5 text-base rounded-xl min-h-[48px]",
    lg: "px-8 py-4 text-lg rounded-2xl min-h-[52px]",
  };

  const widthClass = fullWidth ? "w-full" : "";

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;

  // Extract text content for default aria-label
  const getTextContent = (node: ReactNode): string => {
    if (typeof node === "string") return node;
    if (typeof node === "number") return node.toString();
    return "";
  };

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
          <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/70 to-white/50 rounded-inherit" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300/50 to-transparent" />
        </>
      )}

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {Icon && iconPosition === "left" && <Icon className="w-4 h-4" aria-hidden="true" />}
        {children}
        {Icon && iconPosition === "right" && (
          <motion.div
            aria-hidden="true"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Icon className="w-4 h-4" />
          </motion.div>
        )}
      </span>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={buttonClasses}
        aria-label={ariaLabel || getTextContent(children)}
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
      aria-label={ariaLabel}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  );
}
