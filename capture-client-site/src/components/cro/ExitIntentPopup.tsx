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
          {/* Backdrop with mesh gradient */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            onClick={handleClose}
          >
            {/* Mesh gradient backdrop */}
            <div className="absolute inset-0 bg-[#030303]">
              <div className="absolute inset-0 opacity-40">
                <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-[#00C9FF]/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-[#4A69E2]/20 rounded-full blur-[120px]" />
              </div>
              <div className="absolute inset-0 backdrop-blur-xl" />
            </div>

            {/* Popup */}
            <motion.div
              {...popupAnimation}
              role="dialog"
              aria-modal="true"
              aria-labelledby="exit-popup-title"
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
            <div className="relative bg-[#030303] border border-white/[0.06] backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
              {/* Glass overlay */}
              <div className="absolute inset-0 bg-white/[0.02] pointer-events-none" />
              {/* Close button - minimal glass */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.06] transition-all duration-300 backdrop-blur-sm active:scale-95"
                aria-label="Close popup"
              >
                <X className="w-5 h-5 text-white/60 hover:text-white/90" />
              </button>

              {/* Content */}
              <div className="p-6 sm:p-8 md:p-12">
                {/* Icon - cyan gradient */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00C9FF]/10 to-[#4A69E2]/10 border border-white/[0.06] flex items-center justify-center backdrop-blur-sm">
                      <Lightbulb className="w-10 h-10 text-[#00C9FF]" />
                    </div>
                  </div>
                </div>

                {/* Headline - Bricolage Grotesque with weight contrast */}
                <h3 id="exit-popup-title" className="text-2xl sm:text-3xl md:text-4xl text-center mb-3 sm:mb-4" style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 800 }}>
                  <span className="text-white/30" style={{ fontWeight: 200 }}>Before You Go</span>
                  <span className="text-white">...</span>
                </h3>

                {/* Subheadline - value-focused */}
                <p className="text-base sm:text-lg text-center text-white/60 mb-6 max-w-lg mx-auto">
                  See how 500+ businesses are capturing{" "}
                  <span className="text-[#00C9FF] font-semibold">10x more leads</span> with AI-powered automation.
                </p>

                {/* Benefits list - glass styling */}
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
                      className="flex items-center gap-3 text-white"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#00C9FF]/10 border border-white/[0.06] flex items-center justify-center flex-shrink-0">
                        <benefit.Icon className="w-5 h-5 text-[#00C9FF]" />
                      </div>
                      <p className="text-sm font-semibold">{benefit.text}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Urgency element - subtle amber accent */}
                <div className="bg-gradient-to-r from-amber-500/5 to-orange-500/5 border border-white/[0.06] rounded-xl p-4 mb-6 backdrop-blur-sm">
                  <div className="flex items-center justify-center gap-2.5">
                    <Clock className="w-5 h-5 text-amber-400/70" />
                    <p className="text-sm font-semibold text-white/90">
                      <span className="text-amber-400">Limited spots</span> available for December onboarding
                    </p>
                  </div>
                </div>

                {/* CTA Buttons - premium gradient styling */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <motion.button
                    onClick={handleCTA}
                    whileHover={isMobile ? undefined : { scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 sm:flex-initial bg-gradient-to-r from-[#00C9FF] to-[#4A69E2] text-white font-bold px-6 sm:px-8 py-4 rounded-xl hover:shadow-[0_0_30px_rgba(0,201,255,0.3)] transition-all duration-300 flex items-center justify-center gap-2 min-h-[52px]"
                  >
                    <span className="text-sm sm:text-base">Try Our AI Now</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>

                  <motion.a
                    href="tel:865-346-3339"
                    whileHover={isMobile ? undefined : { scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 sm:flex-initial border border-white/[0.06] bg-white/[0.02] text-white font-bold px-6 sm:px-8 py-4 rounded-xl hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300 flex items-center justify-center gap-2 min-h-[52px] backdrop-blur-sm"
                  >
                    <Phone className="w-5 h-5 text-[#00C9FF]" />
                    <span className="text-sm sm:text-base">Call Now</span>
                  </motion.a>
                </div>

                {/* Trust badges - minimal styling */}
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-6 pt-6 border-t border-white/[0.06]">
                  <div className="flex items-center gap-1.5">
                    <BadgeCheck className="w-4 h-4 text-[#00C9FF]" />
                    <span className="text-xs text-white/60 whitespace-nowrap">500+ Clients</span>
                  </div>
                  <div className="hidden sm:block w-px h-4 bg-white/[0.06]" />
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-[#00C9FF] fill-[#00C9FF]" />
                    <span className="text-xs text-white/60 whitespace-nowrap">4.9/5 Rating</span>
                  </div>
                  <div className="hidden sm:block w-px h-4 bg-white/[0.06]" />
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-[#00C9FF]" />
                    <span className="text-xs text-white/60 whitespace-nowrap">100% Secure</span>
                  </div>
                </div>
              </div>

              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00C9FF]/[0.03] via-transparent to-[#4A69E2]/[0.03] pointer-events-none" />
            </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
