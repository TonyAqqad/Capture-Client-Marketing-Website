"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

/**
 * MobileCTABar Component - $3M Website Polish
 *
 * Premium sticky CTA bar for mobile that:
 * - Only shows after scrolling 300px (engaged users)
 * - Hides when scrolling down, shows when scrolling up
 * - Respects iOS safe areas for notched devices
 * - WCAG AAA touch targets (48px minimum)
 * - Performance-optimized with requestAnimationFrame
 */

export default function MobileCTABar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Show after scrolling 300px (user is engaged)
          if (currentScrollY > 300) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }

          // Hide when scrolling down, show when scrolling up
          // This keeps the CTA accessible but non-intrusive
          setIsScrollingUp(currentScrollY < lastScrollY || currentScrollY < 300);
          setLastScrollY(currentScrollY);

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      {isVisible && isScrollingUp && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
          role="complementary"
          aria-label="Sticky call-to-action bar"
        >
          {/* Gradient fade for seamless appearance */}
          <div className="absolute inset-x-0 -top-8 h-8 bg-gradient-to-t from-[#070B14] to-transparent pointer-events-none" />

          {/* CTA Bar Container */}
          <div className="bg-[#0F172A]/95 backdrop-blur-xl border-t border-white/10 px-4 py-3 safe-area-pb">
            <div className="flex gap-3 max-w-screen-xl mx-auto">
              {/* Phone Button - Secondary action */}
              <a
                href="tel:8653463339"
                className="flex-1 flex items-center justify-center gap-2 bg-[#1E293B] border border-white/10 rounded-xl py-3 min-h-[48px] text-white font-semibold transition-all duration-300 active:scale-95 touch-manipulation"
                aria-label="Call Capture Client now"
                style={{
                  touchAction: 'manipulation',
                  WebkitTapHighlightColor: 'transparent',
                  userSelect: 'none'
                }}
              >
                <svg
                  className="w-5 h-5 text-[#00C9FF]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="text-sm">Call Now</span>
              </a>

              {/* Book Demo Button - Primary action */}
              <Link
                href="/contact"
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]/80 rounded-xl py-3 min-h-[48px] text-[#0F172A] font-bold transition-all duration-300 active:scale-95 touch-manipulation"
                aria-label="Book a demo with Capture Client"
                style={{
                  touchAction: 'manipulation',
                  WebkitTapHighlightColor: 'transparent',
                  userSelect: 'none'
                }}
              >
                <span className="text-sm">Book Demo</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
