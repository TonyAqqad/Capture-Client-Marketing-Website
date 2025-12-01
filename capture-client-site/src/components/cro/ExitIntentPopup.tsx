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
            <div className="relative bg-gradient-to-br from-surface/95 to-background-dark/95 backdrop-blur-2xl border-2 border-accent/40 rounded-2xl sm:rounded-3xl shadow-glow-lg overflow-hidden">
              {/* Close button - larger tap target on mobile */}
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-11 h-11 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-surface border border-surface-border hover:border-accent/50 transition-all duration-300 hover:rotate-90 active:scale-95"
                aria-label="Close popup"
              >
                <span className="material-icons text-foreground-muted hover:text-accent text-xl sm:text-base">
                  close
                </span>
              </button>

              {/* Content */}
              <div className="p-6 sm:p-8 md:p-12">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 border-2 border-accent/40 flex items-center justify-center">
                      <span className="material-icons text-accent text-4xl">priority_high</span>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-accent to-primary flex items-center justify-center animate-pulse">
                      <span className="material-icons text-white text-sm">local_fire_department</span>
                    </div>
                  </div>
                </div>

                {/* Headline */}
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-center text-foreground mb-3 sm:mb-4">
                  Wait! Don't Miss Out
                </h3>

                {/* Subheadline */}
                <p className="text-base sm:text-lg text-center text-foreground-muted mb-6 max-w-lg mx-auto">
                  Join 500+ businesses that are capturing{" "}
                  <span className="text-accent font-bold">10x more leads</span> with AI-powered
                  automation.
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

                {/* Urgency element */}
                <div className="bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-center gap-2">
                    <span className="material-icons text-orange-400 text-xl animate-pulse">
                      schedule
                    </span>
                    <p className="text-sm font-bold text-foreground">
                      <span className="text-orange-400">7 spots left</span> for December onboarding
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
