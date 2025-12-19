"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "@/lib/motion";

/**
 * MobileCTABar Component - $3M Website Polish
 *
 * Premium sticky CTA bar for mobile that:
 * - Only shows after scrolling 300px (engaged users)
 * - Hides when scrolling down, shows when scrolling up
 * - Respects iOS safe areas for notched devices
 * - WCAG AAA touch targets (48px minimum)
 * - Performance-optimized with requestAnimationFrame
 * - Supports local phone numbers for location pages
 * - OPTIMIZED: Uses refs to prevent recreating scroll listener on every scroll
 */

interface MobileCTABarProps {
  phoneNumber?: string;
}

export default function MobileCTABar({ phoneNumber = "865-346-6111" }: MobileCTABarProps = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!tickingRef.current) {
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
          setIsScrollingUp(currentScrollY < lastScrollYRef.current || currentScrollY < 300);
          lastScrollYRef.current = currentScrollY;

          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Empty dependency array - listener is stable

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
          <div className="absolute inset-x-0 -top-8 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />

          {/* CTA Bar Container */}
          <div className="bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-lg shadow-slate-200/50 px-4 py-3 safe-area-pb">
            <div className="flex gap-3 max-w-screen-xl mx-auto">
              {/* Phone Button - Secondary action */}
              <a
                href={`tel:${phoneNumber.replace(/\D/g, '')}`}
                className="flex-1 flex items-center justify-center gap-2 bg-white border border-slate-200 rounded-xl py-3 min-h-[48px] text-slate-700 font-semibold transition-all duration-300 active:scale-95 hover:bg-slate-50 hover:border-slate-300 touch-manipulation"
                aria-label={`Call ${phoneNumber}`}
                style={{
                  touchAction: 'manipulation',
                  WebkitTapHighlightColor: 'transparent',
                  userSelect: 'none'
                }}
              >
                <svg
                  className="w-5 h-5 text-blue-600"
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

              {/* Try Our AI Button - Primary action */}
              <Link
                href="/contact"
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl py-3 min-h-[48px] text-white font-bold transition-all duration-300 active:scale-95 hover:from-blue-700 hover:to-cyan-600 shadow-lg shadow-blue-500/25 touch-manipulation"
                aria-label="Try our AI with Capture Client"
                style={{
                  touchAction: 'manipulation',
                  WebkitTapHighlightColor: 'transparent',
                  userSelect: 'none'
                }}
              >
                <span className="text-sm">Try Our AI Now</span>
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
