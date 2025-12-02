"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight - windowHeight;
          const scrolled = window.scrollY;
          const progress = (scrolled / documentHeight) * 100;

          setScrollProgress(progress);
          setIsVisible(scrolled > 300);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

            <span className="material-icons text-white text-2xl relative z-10">
              rocket_launch
            </span>

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

            <span className="material-icons text-foreground group-hover:text-accent transition-colors relative z-10">
              keyboard_arrow_up
            </span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
