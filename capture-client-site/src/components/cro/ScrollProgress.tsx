"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import { Rocket, ChevronUp } from "lucide-react";

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const progressRef = useRef(0);
  const visibilityRef = useRef(false);

  // Mobile detection - check on mount and resize
  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();

    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll progress tracking - skip entirely on mobile
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Don't run scroll listener on mobile - saves 500-800ms of scroll blocking
    if (isMobile) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight - windowHeight;
          const scrolled = window.scrollY;
          const progress = (scrolled / documentHeight) * 100;
          const visible = scrolled > 300;

          // Only update state if values actually changed significantly
          if (Math.abs(progressRef.current - progress) > 1) {
            progressRef.current = progress;
            setScrollProgress(progress);
          }

          if (visibilityRef.current !== visible) {
            visibilityRef.current = visible;
            setIsVisible(visible);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    if (typeof window !== "undefined") {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Don't render on mobile - component is desktop-only UX feature
  if (isMobile) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-24 right-6 z-40 flex-col gap-3 hidden md:flex"
        >
          {/* Scroll to contact CTA */}
          <motion.button
            onClick={scrollToContact}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="group relative w-14 h-14 bg-gradient-to-r from-accent to-primary rounded-full shadow-glow-lg flex items-center justify-center overflow-hidden"
          >
            {/* Animated ring */}
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full border-2 border-accent"
            />

            <Rocket className="text-white w-6 h-6 relative z-10" />

            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="absolute right-full mr-3 px-4 py-2 bg-surface/95 backdrop-blur-xl border border-accent/30 rounded-lg shadow-glow whitespace-nowrap pointer-events-none"
            >
              <p className="text-sm font-bold text-foreground">Get Started!</p>
            </motion.div>
          </motion.button>

          {/* Scroll to top button */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="group w-14 h-14 bg-surface/80 backdrop-blur-xl border-2 border-surface-border hover:border-accent/50 rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-glow relative overflow-hidden"
          >
            {/* Progress circle */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="28"
                cy="28"
                r="24"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                className="text-surface-border"
              />
              <motion.circle
                cx="28"
                cy="28"
                r="24"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 24}`}
                strokeDashoffset={`${2 * Math.PI * 24 * (1 - scrollProgress / 100)}`}
                className="text-accent"
                strokeLinecap="round"
              />
            </svg>

            <ChevronUp className="text-foreground group-hover:text-accent transition-colors relative z-10 w-6 h-6" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
