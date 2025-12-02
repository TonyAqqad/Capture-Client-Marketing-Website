"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createVisibilityAwareInterval, isIOSDevice } from "@/lib/ios-performance";

interface Lead {
  id: number;
  business: string;
  location: string;
  action: string;
  time: string;
}

export default function LiveLeadTicker() {
  const [disableAnimations, setDisableAnimations] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [currentLead, setCurrentLead] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Check for mobile/reduced motion after mount to avoid hydration issues
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setDisableAnimations(isMobile || reducedMotion);
    setIsIOS(isIOSDevice());
  }, []);

  const recentLeads: Lead[] = [
    { id: 1, business: "Elite HVAC", location: "Knoxville, TN", action: "Captured 3 new leads", time: "2 min ago" },
    { id: 2, business: "Premier Roofing", location: "Nashville, TN", action: "Booked consultation", time: "5 min ago" },
    { id: 3, business: "Precision Dental", location: "Chattanooga, TN", action: "New call answered", time: "8 min ago" },
    { id: 4, business: "TechFix IT", location: "Memphis, TN", action: "Lead qualified", time: "12 min ago" },
    { id: 5, business: "Summit Legal", location: "Knoxville, TN", action: "Appointment scheduled", time: "15 min ago" },
    { id: 6, business: "Cascade Plumbing", location: "Nashville, TN", action: "5 new leads captured", time: "18 min ago" },
    { id: 7, business: "Peak Performance", location: "Franklin, TN", action: "Trial started", time: "22 min ago" },
    { id: 8, business: "Alpine Construction", location: "Brentwood, TN", action: "New client onboarded", time: "25 min ago" },
  ];

  // iOS OPTIMIZATION: Use visibility-aware interval that pauses when tab is hidden
  // This saves battery life on iOS devices
  useEffect(() => {
    if (disableAnimations) return;

    // iOS uses longer interval (6s instead of 4s) to reduce CPU usage
    const intervalDelay = isIOS ? 6000 : 4000;

    const cleanup = createVisibilityAwareInterval(() => {
      setCurrentLead((prev) => (prev + 1) % recentLeads.length);
    }, intervalDelay);

    return cleanup;
  }, [recentLeads.length, disableAnimations, isIOS]);

  if (!isVisible) return null;

  const lead = recentLeads[currentLead];

  return (
    <motion.div
      initial={disableAnimations ? {} : { opacity: 0, y: 50 }}
      animate={disableAnimations ? {} : { opacity: 1, y: 0 }}
      transition={disableAnimations ? { duration: 0 } : { duration: 0.5 }}
      className="fixed bottom-20 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-auto z-40 max-w-sm"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={lead.id}
          initial={disableAnimations ? {} : { opacity: 0, x: -100, scale: 0.8 }}
          animate={disableAnimations ? {} : { opacity: 1, x: 0, scale: 1 }}
          exit={disableAnimations ? {} : { opacity: 0, x: 100, scale: 0.8 }}
          transition={disableAnimations ? { duration: 0 } : { duration: 0.4 }}
          className="relative bg-gradient-to-br from-surface/95 to-surface/80 backdrop-blur-2xl border-2 border-accent/30 rounded-2xl p-3 sm:p-4 shadow-glow-lg w-full"
        >
          {/* Close button */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-surface-border/50 hover:bg-surface-border transition-colors"
            aria-label="Close notification"
          >
            <span className="material-icons text-xs text-foreground-muted">close</span>
          </button>

          <div className="flex items-start gap-2 sm:gap-3">
            {/* Live indicator - NO ANIMATION ON MOBILE */}
            <div className="relative flex-shrink-0 mt-1">
              <div className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                {!disableAnimations && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>}
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-accent shadow-glow"></span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1 flex-wrap">
                <p className="font-bold text-xs sm:text-sm text-foreground truncate">
                  {lead.business}
                </p>
                <span className="text-xs text-foreground-muted hidden sm:inline">•</span>
                <p className="text-[10px] sm:text-xs text-foreground-muted truncate">{lead.location}</p>
              </div>

              <p className="text-xs sm:text-sm text-accent font-semibold mb-1.5 sm:mb-2">
                {lead.action}
              </p>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="material-icons text-foreground-muted text-xs">schedule</span>
                <p className="text-[10px] sm:text-xs text-foreground-muted">{lead.time}</p>
              </div>
            </div>

            {/* Success icon */}
            <div className="flex-shrink-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 border border-accent/30 flex items-center justify-center">
                <span className="material-icons text-accent text-base sm:text-lg">check_circle</span>
              </div>
            </div>
          </div>

          {/* Progress bar - STATIC ON MOBILE */}
          {!disableAnimations && (
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-accent to-primary rounded-b-2xl"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 4, ease: "linear" }}
              key={`progress-${lead.id}`}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Counter badge - STATIC ON MOBILE */}
      <motion.div
        initial={disableAnimations ? {} : { scale: 0 }}
        animate={disableAnimations ? {} : { scale: 1 }}
        transition={disableAnimations ? { duration: 0 } : { delay: 0.3, type: "spring" }}
        className="absolute -top-3 -right-3 bg-gradient-to-r from-accent to-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-glow border-2 border-background-dark"
      >
        Live Activity
      </motion.div>
    </motion.div>
  );
}
