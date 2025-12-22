"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "@/lib/motion";

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
  disabled?: boolean; // Disable on mobile
}

/**
 * Premium desktop tooltip with glassmorphism.
 * Automatically disabled on mobile/touch devices.
 */
export function Tooltip({
  children,
  content,
  position = "top",
  delay = 0.3,
  disabled = false,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Disable on touch devices and small screens
  const isTouchDevice =
    typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;

  if (disabled || isTouchDevice || isMobile) {
    return <>{children}</>;
  }

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2 -translate-y-1/2",
    bottom: "bottom-full left-1/2 -translate-x-1/2 translate-y-1/2",
    left: "left-full top-1/2 -translate-x-1/2 -translate-y-1/2",
    right: "right-full top-1/2 translate-x-1/2 -translate-y-1/2",
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: position === "top" ? 5 : position === "bottom" ? -5 : 0,
            }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15, delay }}
            className={`absolute z-50 ${positionClasses[position]} pointer-events-none`}
          >
            {/* Glass tooltip */}
            <div className="relative bg-white backdrop-blur-xl border border-slate-200 px-3 py-1.5 rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.15)] whitespace-nowrap">
              {/* Inner glow */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

              {/* Content */}
              <div className="relative text-xs font-medium text-slate-900">{content}</div>

              {/* Arrow */}
              <div
                className={`absolute w-2 h-2 bg-white backdrop-blur-xl border-t border-l border-slate-200 transform rotate-45 ${arrowClasses[position]}`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
