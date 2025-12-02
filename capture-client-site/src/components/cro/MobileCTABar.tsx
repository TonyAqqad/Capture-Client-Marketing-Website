"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * MobileCTABar Component
 *
 * Premium glass-morphism sticky CTA bar for mobile.
 * Only appears after meaningful scroll engagement.
 */

export default function MobileCTABar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Only show after user has scrolled past hero section (800px)
          // This ensures they're engaged before showing the CTA
          setIsVisible(window.scrollY > 800);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden safe-area-bottom"
        >
          {/* Premium glass-morphism container */}
          <div className="relative">
            {/* Gradient border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-primary/20 to-accent/20 blur-xl" />

            {/* Main container - NO backdrop-blur on mobile for performance */}
            <div className="relative bg-background-dark/95 border-t border-surface-border/50 shadow-2xl">
              <div className="max-w-screen-xl mx-auto px-4 py-3">
                <div className="flex items-center gap-3">
                  {/* Call button - premium treatment */}
                  <a
                    href="tel:865-346-3339"
                    className="flex-1 flex items-center justify-center gap-2 bg-surface/40 hover:bg-surface/60 border border-surface-border/50 rounded-xl py-3.5 font-semibold text-foreground transition-all duration-300 active:scale-95 min-h-[52px]"
                  >
                    <span className="material-icons text-accent text-lg">phone</span>
                    <span className="text-sm">Call Now</span>
                  </a>

                  {/* Demo button - primary action */}
                  <a
                    href="/contact"
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-accent to-primary rounded-xl py-3.5 font-bold text-white transition-all duration-300 active:scale-95 min-h-[52px]"
                  >
                    <span className="text-sm">Get Demo</span>
                    <span className="material-icons text-base">arrow_forward</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
