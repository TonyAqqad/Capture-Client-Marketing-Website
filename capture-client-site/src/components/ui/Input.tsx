"use client";

import { motion } from "framer-motion";
import { InputHTMLAttributes, useState } from "react";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onDrag' | 'onDragEnd' | 'onDragStart' | 'onAnimationStart'> {
  label?: string;
  error?: string;
  icon?: string; // Material icon name
  variant?: "default" | "glass";
}

export function Input({
  label,
  error,
  icon,
  variant = "default",
  className = "",
  onFocus,
  onBlur,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const variantClasses = {
    default: "bg-surface/50 border-surface-border focus:border-primary/50",
    glass: "bg-white/5 backdrop-blur-xl border-white/20 focus:border-accent/50 focus:bg-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.1)]"
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <div className="w-full">
      {label && (
        <label
          className={`block text-sm font-semibold mb-2 transition-colors duration-200 ${
            isFocused ? "text-accent" : "text-foreground"
          }`}
        >
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <span
              className={`material-icons transition-colors duration-200 ${
                isFocused ? "text-accent" : "text-foreground-muted"
              }`}
              aria-hidden="true"
            >
              {icon}
            </span>
          </div>
        )}

        <motion.div
          animate={{ scale: isFocused ? 1.01 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <input
            {...props}
            className={`w-full ${icon ? "pl-12" : "px-4"} pr-4 py-3.5 rounded-xl border-2 transition-all duration-300 text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-accent/30 ${variantClasses[variant]} ${className} touch-target`}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </motion.div>

        {/* Glass effect overlay */}
        {variant === "glass" && (
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent rounded-xl pointer-events-none" />
        )}

        {/* Inner top highlight */}
        {variant === "glass" && isFocused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent pointer-events-none"
          />
        )}
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-400 mt-2 flex items-center gap-1"
        >
          <span className="material-icons text-sm" aria-hidden="true">error</span>
          {error}
        </motion.p>
      )}
    </div>
  );
}
