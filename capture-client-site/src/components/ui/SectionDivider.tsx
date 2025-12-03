"use client";

import { motion } from "framer-motion";

interface SectionDividerProps {
  variant?: "angular" | "wave" | "gradient-line";
  className?: string;
}

export function SectionDivider({ variant = "gradient-line", className = "" }: SectionDividerProps) {
  if (variant === "angular") {
    return (
      <div className={`relative h-32 overflow-hidden ${className}`}>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, transparent 0%, rgba(74, 105, 226, 0.05) 100%)",
            transform: "skewY(-3deg)",
            transformOrigin: "top left",
          }}
        />
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        />
      </div>
    );
  }

  if (variant === "wave") {
    return (
      <div className={`relative h-24 overflow-hidden ${className}`}>
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-full"
        >
          <motion.path
            d="M0,0 C300,60 600,60 900,0 L900,120 L0,120 Z"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            viewport={{ once: true }}
            fill="url(#gradient)"
            stroke="url(#strokeGradient)"
            strokeWidth="2"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(74, 105, 226)" stopOpacity="0.1" />
              <stop offset="50%" stopColor="rgb(0, 201, 255)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="rgb(74, 105, 226)" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="strokeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(74, 105, 226)" stopOpacity="0.3" />
              <stop offset="50%" stopColor="rgb(0, 201, 255)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="rgb(74, 105, 226)" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  // Default: gradient-line
  return (
    <div className={`relative h-px w-full ${className}`}>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        style={{ transformOrigin: "center" }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: true }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent shadow-glow"
      />
    </div>
  );
}
