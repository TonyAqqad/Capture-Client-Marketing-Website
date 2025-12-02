"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse leaves from the top of the viewport
      if (e.clientY <= 10 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    // Add delay before activating exit intent
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 5000); // Wait 5 seconds before activating

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasShown]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleCTA = () => {
    setIsVisible(false);
    // Scroll to contact form
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
        <>
          {/* Backdrop with flex centering */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background-dark/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4 sm:p-6"
            onClick={handleClose}
          >
            {/* Popup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
            <div className="relative bg-gradient-to-br from-surface/95 to-background-dark/95 backdrop-blur-2xl border border-accent/25 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
              {/* Close button - subtle and refined */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-surface/40 border border-surface-border/40 hover:border-surface-border hover:bg-surface/60 transition-all duration-300 backdrop-blur-sm active:scale-95"
                aria-label="Close popup"
              >
                <span className="material-icons text-foreground-muted hover:text-foreground text-lg">
                  close
                </span>
              </button>

              {/* Content */}
              <div className="p-6 sm:p-8 md:p-12">
                {/* Icon - more refined */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/15 to-primary/15 border border-accent/30 flex items-center justify-center backdrop-blur-sm">
                      <span className="material-icons text-accent text-4xl">lightbulb</span>
                    </div>
                  </div>
                </div>

                {/* Headline - less desperate */}
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-center text-foreground mb-3 sm:mb-4">
                  Before You Go...
                </h3>

                {/* Subheadline - value-focused */}
                <p className="text-base sm:text-lg text-center text-foreground-muted mb-6 max-w-lg mx-auto">
                  See how 500+ businesses are capturing{" "}
                  <span className="text-accent font-semibold">10x more leads</span> with AI-powered automation.
                </p>

                {/* Benefits list */}
                <div className="space-y-3 mb-8 max-w-md mx-auto">
                  {[
                    { icon: "rocket_launch", text: "Get started in 48 hours" },
                    { icon: "trending_up", text: "Average 3x ROI in 90 days" },
                    { icon: "verified_user", text: "30-day money-back guarantee" },
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="flex items-center gap-3 text-foreground"
                    >
                      <div className="w-8 h-8 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center flex-shrink-0">
                        <span className="material-icons text-accent text-lg">{benefit.icon}</span>
                      </div>
                      <p className="text-sm font-semibold">{benefit.text}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Urgency element - softer approach */}
                <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/25 rounded-xl p-4 mb-6 backdrop-blur-sm">
                  <div className="flex items-center justify-center gap-2.5">
                    <span className="material-icons text-amber-400/80 text-lg">
                      schedule
                    </span>
                    <p className="text-sm font-semibold text-foreground/90">
                      <span className="text-amber-400">Limited spots</span> available for December onboarding
                    </p>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <motion.button
                    onClick={handleCTA}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 sm:flex-initial bg-gradient-to-r from-accent to-primary text-white font-bold px-6 sm:px-8 py-4 rounded-xl shadow-glow-lg hover:shadow-glow transition-all duration-300 flex items-center justify-center gap-2 min-h-[52px]"
                  >
                    <span className="text-sm sm:text-base">Book Free Demo</span>
                    <span className="material-icons text-lg">arrow_forward</span>
                  </motion.button>

                  <motion.a
                    href="tel:865-346-3339"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 sm:flex-initial border-2 border-accent/50 text-foreground font-bold px-6 sm:px-8 py-4 rounded-xl hover:bg-accent/10 transition-all duration-300 flex items-center justify-center gap-2 min-h-[52px]"
                  >
                    <span className="material-icons text-accent text-lg">phone</span>
                    <span className="text-sm sm:text-base">Call Now</span>
                  </motion.a>
                </div>

                {/* Trust badges - wrap on small screens */}
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-6 pt-6 border-t border-surface-border">
                  <div className="flex items-center gap-1.5">
                    <span className="material-icons text-green-500 text-sm">verified</span>
                    <span className="text-xs text-foreground-muted whitespace-nowrap">500+ Clients</span>
                  </div>
                  <div className="hidden sm:block w-px h-4 bg-surface-border" />
                  <div className="flex items-center gap-1.5">
                    <span className="material-icons text-yellow-400 text-sm">star</span>
                    <span className="text-xs text-foreground-muted whitespace-nowrap">4.9/5 Rating</span>
                  </div>
                  <div className="hidden sm:block w-px h-4 bg-surface-border" />
                  <div className="flex items-center gap-1.5">
                    <span className="material-icons text-accent text-sm">security</span>
                    <span className="text-xs text-foreground-muted whitespace-nowrap">100% Secure</span>
                  </div>
                </div>
              </div>

              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 pointer-events-none" />
            </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
