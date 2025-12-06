"use client";

/**
 * Framer Motion Wrapper
 *
 * NOTE: LazyMotion was causing HMR issues with Next.js 16 Turbopack.
 * Using standard motion import for stability.
 * TODO: Re-enable LazyMotion once Turbopack compatibility improves.
 */

import React from "react";

/**
 * LazyMotion Provider - Currently a passthrough
 * Kept for API compatibility with existing code
 */
export function LazyMotionProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

/**
 * Re-export motion and all commonly used Framer Motion components/hooks
 */
export {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useInView
} from "framer-motion";
