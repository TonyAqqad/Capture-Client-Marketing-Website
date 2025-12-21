"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import { Phone, Rocket, Star } from "lucide-react";

/**
 * StickyPhoneCTA Component
 *
 * Performance-optimized sticky phone CTA that:
 * - Shows after scrolling 800px
 * - Uses requestAnimationFrame for smooth scrolling
 * - Uses refs to prevent recreating scroll listener
 * - Passive event listeners for better scroll performance
 */
export default function StickyPhoneCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const tickingRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      if (!tickingRef.current) {
        window.requestAnimationFrame(() => {
          // Show after scrolling 800px
          const scrollY = window.scrollY;
          setIsVisible(scrollY > 800);
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
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="fixed top-0 left-0 right-0 z-50 hidden md:block"
        >
          <div className="bg-gradient-to-r from-white/98 via-white/95 to-white/98 backdrop-blur-2xl border-b-2 border-slate-200 shadow-md">
            <div className="container-custom px-6 py-3">
              <div className="flex items-center justify-between">
                {/* Left: Trust indicator */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                    </div>
                    <span className="text-sm font-semibold text-slate-900">
                      <span className="text-accent">Live:</span> Growing businesses using Capture
                      Client
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="text-yellow-400 w-3.5 h-3.5 fill-yellow-400" />
                    ))}
                    <span className="text-sm text-slate-600 ml-1">4.9/5 (1,200 reviews)</span>
                  </div>
                </div>

                {/* Right: CTA buttons */}
                <div className="flex items-center gap-3">
                  {/* Phone button - 48px minimum tap target */}
                  <motion.a
                    href="tel:865-346-6111"
                    onMouseEnter={() => setIsExpanded(true)}
                    onMouseLeave={() => setIsExpanded(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group flex items-center gap-2 min-h-[48px] bg-gradient-to-r from-accent to-primary text-white font-bold px-6 py-3 rounded-xl shadow-glow hover:shadow-glow-lg transition-all duration-300 overflow-hidden"
                  >
                    {/* Animated background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary to-accent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.3 }}
                    />

                    <Phone className="w-5 h-5 relative z-10" />
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.span
                          initial={{ width: 0, opacity: 0 }}
                          animate={{ width: "auto", opacity: 1 }}
                          exit={{ width: 0, opacity: 0 }}
                          className="relative z-10 overflow-hidden whitespace-nowrap"
                        >
                          (865) 346-6111
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {!isExpanded && (
                      <span className="text-sm relative z-10">Call Now</span>
                    )}
                  </motion.a>

                  {/* Try Our AI button - 48px minimum tap target */}
                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 min-h-[48px] border-2 border-accent/50 text-slate-900 font-bold px-6 py-3 rounded-xl hover:bg-accent/10 transition-all duration-300"
                  >
                    <Rocket className="text-accent w-5 h-5" />
                    <span className="text-sm">Try Our AI Now</span>
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
