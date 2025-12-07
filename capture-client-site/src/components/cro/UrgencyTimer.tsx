"use client";

import { useEffect, useState } from "react";
import { motion } from "@/lib/motion";
import { Flame, ArrowRight } from "lucide-react";

interface UrgencyTimerProps {
  offer?: string;
  className?: string;
}

export default function UrgencyTimer({
  offer = "Book your demo in the next 24 hours and get a FREE strategy session ($500 value)",
  className = ""
}: UrgencyTimerProps) {
  // Initialize with null to prevent hydration mismatch
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    // Calculate time until midnight
    const calculateTimeLeft = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);

      const diff = midnight.getTime() - now.getTime();

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      return { hours, minutes, seconds };
    };

    // Set initial time immediately on client
    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Don't render timer until client-side mount to prevent hydration mismatch
  if (!timeLeft) {
    return (
      <div className={`bg-gradient-to-r from-orange-500/20 to-red-500/20 border-2 border-orange-500/40 rounded-2xl p-6 shadow-glow ${className}`}>
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <Flame className="text-orange-400 w-6 h-6" />
          <h3 className="text-base sm:text-lg font-bold text-foreground">Limited Time Offer</h3>
          <Flame className="text-orange-400 w-6 h-6" />
        </div>

        {/* Offer text */}
        <p className="text-center text-sm text-foreground-muted mb-6 max-w-2xl mx-auto px-2">
          {offer}
        </p>

        {/* Loading state - matches the structure of the timer */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6">
          <div className="animate-pulse flex gap-2 sm:gap-3">
            <div className="bg-background-dark/80 border-2 border-orange-500/40 rounded-xl px-4 py-3 min-w-[70px] sm:min-w-[80px] h-[80px] sm:h-[90px]"></div>
            <div className="bg-background-dark/80 border-2 border-orange-500/40 rounded-xl px-4 py-3 min-w-[70px] sm:min-w-[80px] h-[80px] sm:h-[90px]"></div>
            <div className="bg-background-dark/80 border-2 border-orange-500/40 rounded-xl px-4 py-3 min-w-[70px] sm:min-w-[80px] h-[80px] sm:h-[90px]"></div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold px-8 py-4 rounded-xl hover:shadow-glow-lg transition-all duration-300 hover:scale-105 text-base min-h-[56px]"
          >
            <span>Claim Your Bonus Now</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>

        {/* Fine print */}
        <p className="text-xs text-center text-foreground-muted mt-4 px-2">
          Offer resets daily at midnight EST. Limited to first 10 bookings.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-gradient-to-r from-orange-500/20 to-red-500/20 border-2 border-orange-500/40 rounded-2xl p-6 shadow-glow ${className}`}
    >
      {/* Header - using CSS animation instead of Framer Motion for performance */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <Flame className="text-orange-400 w-6 h-6 animate-pulse" />
        <h3 className="text-base sm:text-lg font-bold text-foreground">Limited Time Offer</h3>
        <Flame className="text-orange-400 w-6 h-6 animate-pulse" />
      </div>

      {/* Offer text */}
      <p className="text-center text-sm text-foreground-muted mb-6 max-w-2xl mx-auto px-2">
        {offer}
      </p>

      {/* Countdown Timer - simplified without per-digit animations */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6">
        {/* Hours */}
        <div className="flex flex-col items-center">
          <div className="bg-background-dark/80 border-2 border-orange-500/40 rounded-xl px-4 py-3 min-w-[70px] sm:min-w-[80px] text-center">
            <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-gradient bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent tabular-nums">
              {String(timeLeft.hours).padStart(2, "0")}
            </p>
          </div>
          <p className="text-xs text-foreground-muted mt-2 font-semibold uppercase">Hours</p>
        </div>

        <span className="text-2xl sm:text-3xl text-orange-400 font-black mb-6">:</span>

        {/* Minutes */}
        <div className="flex flex-col items-center">
          <div className="bg-background-dark/80 border-2 border-orange-500/40 rounded-xl px-4 py-3 min-w-[70px] sm:min-w-[80px] text-center">
            <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-gradient bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent tabular-nums">
              {String(timeLeft.minutes).padStart(2, "0")}
            </p>
          </div>
          <p className="text-xs text-foreground-muted mt-2 font-semibold uppercase">Minutes</p>
        </div>

        <span className="text-2xl sm:text-3xl text-orange-400 font-black mb-6">:</span>

        {/* Seconds */}
        <div className="flex flex-col items-center">
          <div className="bg-background-dark/80 border-2 border-orange-500/40 rounded-xl px-4 py-3 min-w-[70px] sm:min-w-[80px] text-center">
            <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-gradient bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent tabular-nums">
              {String(timeLeft.seconds).padStart(2, "0")}
            </p>
          </div>
          <p className="text-xs text-foreground-muted mt-2 font-semibold uppercase">Seconds</p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <a
          href="#contact"
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold px-8 py-4 rounded-xl hover:shadow-glow-lg transition-all duration-300 hover:scale-105 text-base min-h-[56px]"
        >
          <span>Claim Your Bonus Now</span>
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>

      {/* Fine print */}
      <p className="text-xs text-center text-foreground-muted mt-4 px-2">
        Offer resets daily at midnight EST. Limited to first 10 bookings.
      </p>
    </motion.div>
  );
}
