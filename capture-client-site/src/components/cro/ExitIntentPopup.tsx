"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import { X, Lightbulb, Rocket, TrendingUp, ShieldCheck, Clock, ArrowRight, Phone, BadgeCheck, Star, Shield } from "lucide-react";

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Detect mobile on mount
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();

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
  // CRITICAL FIX #1: Early return - Don't render anything until triggered
  // This prevents AnimatePresence from reconciling the component tree unnecessarily
  if (!isVisible && !hasShown) {
    return null;
  }

  // CRITICAL FIX #2: Mobile-friendly animation (simple opacity fade)
  const mobileAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 }
  };

  // Desktop animation (spring physics only on desktop)
  const desktopAnimation = {
    initial: { opacity: 0, scale: 0.8, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8, y: 20 },
    transition: { type: "spring", duration: 0.5 }
  };

  // CRITICAL FIX #3: Conditional animations based on device
  const popupAnimation = isMobile ? mobileAnimation : desktopAnimation;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop with flex centering */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-background-dark/90 md:backdrop-blur-sm z-[100] flex items-center justify-center p-4 sm:p-6"
            onClick={handleClose}
          >
            {/* Popup */}
            <motion.div
              {...popupAnimation}
              role="dialog"
              aria-modal="true"
              aria-labelledby="exit-popup-title"
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
                <X className="w-5 h-5 text-foreground-muted hover:text-foreground" />
              </button>

              {/* Content */}
              <div className="p-6 sm:p-8 md:p-12">
                {/* Icon - more refined */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/15 to-primary/15 border border-accent/30 flex items-center justify-center backdrop-blur-sm">
                      <Lightbulb className="w-10 h-10 text-accent" />
                    </div>
                  </div>
                </div>

                {/* Headline - less desperate */}
                <h3 id="exit-popup-title" className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-center text-foreground mb-3 sm:mb-4">
                  Before You Go...
                </h3>

                {/* Subheadline - value-focused */}
                <p className="text-base sm:text-lg text-center text-foreground-muted mb-6 max-w-lg mx-auto">
                  See how 500+ businesses are capturing{" "}
                  <span className="text-accent font-semibold">10x more leads</span> with AI-powered automation.
                </p>

                {/* Benefits list - SIMPLIFIED: Remove stagger animations on mobile */}
                <div className="space-y-3 mb-8 max-w-md mx-auto">
                  {[
                    { Icon: Rocket, text: "Get Started Now" },
                    { Icon: TrendingUp, text: "Average 3x ROI in 90 days" },
                    { Icon: ShieldCheck, text: "No long-term contract" },
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={isMobile ? false : { opacity: 0, x: -20 }}
                      animate={isMobile ? false : { opacity: 1, x: 0 }}
                      transition={isMobile ? undefined : { delay: 0.2 + index * 0.1 }}
                      className="flex items-center gap-3 text-foreground"
                    >
                      <div className="w-8 h-8 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center flex-shrink-0">
                        <benefit.Icon className="w-5 h-5 text-accent" />
                      </div>
                      <p className="text-sm font-semibold">{benefit.text}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Urgency element - softer approach */}
                <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/25 rounded-xl p-4 mb-6 backdrop-blur-sm">
                  <div className="flex items-center justify-center gap-2.5">
                    <Clock className="w-5 h-5 text-amber-400/80" />
                    <p className="text-sm font-semibold text-foreground/90">
                      <span className="text-amber-400">Limited spots</span> available for December onboarding
                    </p>
                  </div>
                </div>

                {/* CTA Buttons - SIMPLIFIED: Remove hover animations on mobile */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <motion.button
                    onClick={handleCTA}
                    whileHover={isMobile ? undefined : { scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 sm:flex-initial bg-gradient-to-r from-accent to-primary text-white font-bold px-6 sm:px-8 py-4 rounded-xl shadow-glow-lg hover:shadow-glow transition-all duration-300 flex items-center justify-center gap-2 min-h-[52px]"
                  >
                    <span className="text-sm sm:text-base">Book Free Demo</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>

                  <motion.a
                    href="tel:865-346-3339"
                    whileHover={isMobile ? undefined : { scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 sm:flex-initial border-2 border-accent/50 text-foreground font-bold px-6 sm:px-8 py-4 rounded-xl hover:bg-accent/10 transition-all duration-300 flex items-center justify-center gap-2 min-h-[52px]"
                  >
                    <Phone className="w-5 h-5 text-accent" />
                    <span className="text-sm sm:text-base">Call Now</span>
                  </motion.a>
                </div>

                {/* Trust badges - wrap on small screens */}
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-6 pt-6 border-t border-surface-border">
                  <div className="flex items-center gap-1.5">
                    <BadgeCheck className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-foreground-muted whitespace-nowrap">500+ Clients</span>
                  </div>
                  <div className="hidden sm:block w-px h-4 bg-surface-border" />
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs text-foreground-muted whitespace-nowrap">4.9/5 Rating</span>
                  </div>
                  <div className="hidden sm:block w-px h-4 bg-surface-border" />
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-accent" />
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
