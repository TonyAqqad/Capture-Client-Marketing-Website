"use client";

import { useEffect, useRef } from "react";
import { trackScrollDepth } from "@/lib/analytics";

/**
 * Scroll Depth Tracker Component
 *
 * Automatically tracks scroll depth at 25%, 50%, 75%, and 100% milestones
 * Only fires each milestone once per page load
 */
export default function ScrollDepthTracker() {
  const trackedDepths = useRef<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      // Define milestones
      const milestones = [25, 50, 75, 100] as const;

      milestones.forEach((milestone) => {
        if (
          scrollPercent >= milestone &&
          !trackedDepths.current.has(milestone)
        ) {
          trackScrollDepth(milestone);
          trackedDepths.current.add(milestone);
        }
      });
    };

    // Add scroll listener with throttling
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollListener, { passive: true });

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  // Reset tracked depths on route change
  useEffect(() => {
    trackedDepths.current.clear();
  }, []);

  return null;
}
