"use client";

import { useEffect, useState } from "react";
import { motion } from "@/lib/motion";
import { Zap, ArrowRight } from "lucide-react";

interface UrgencyTimerProps {
  offer?: string;
  className?: string;
}

export default function UrgencyTimer({
  offer = "Start your AI trial in the next 24 hours and get a FREE strategy session ($500 value)",
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
      <div
        className={`border border-slate-200 bg-white backdrop-blur-xl rounded-2xl p-6 ${className}`}
        style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <Zap className="text-cyan-400 w-5 h-5" />
          <h3
            className="text-base sm:text-lg text-slate-900"
            style={{ fontWeight: 600 }}
          >
            Limited Time Offer
          </h3>
          <Zap className="text-cyan-400 w-5 h-5" />
        </div>

        {/* Offer text */}
        <p
          className="text-center text-sm text-slate-600 mb-6 max-w-2xl mx-auto px-2"
          style={{ fontWeight: 300 }}
        >
          {offer}
        </p>

        {/* Loading state - matches the structure of the timer */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6">
          <div className="animate-pulse flex gap-2 sm:gap-3">
            <div className="border border-slate-200 bg-white backdrop-blur-xl rounded-xl px-4 py-3 min-w-[70px] sm:min-w-[80px] h-[80px] sm:h-[90px]"></div>
            <div className="border border-slate-200 bg-white backdrop-blur-xl rounded-xl px-4 py-3 min-w-[70px] sm:min-w-[80px] h-[80px] sm:h-[90px]"></div>
            <div className="border border-slate-200 bg-white backdrop-blur-xl rounded-xl px-4 py-3 min-w-[70px] sm:min-w-[80px] h-[80px] sm:h-[90px]"></div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white px-8 py-4 rounded-xl hover:shadow-[0_0_30px_rgba(0,201,255,0.3)] transition-all duration-300 hover:scale-105 text-base min-h-[56px]"
            style={{ fontWeight: 600 }}
          >
            <span>Claim Your Bonus Now</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>

        {/* Fine print */}
        <p
          className="text-xs text-center text-slate-600 mt-4 px-2"
          style={{ fontWeight: 300 }}
        >
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
      className={`border border-slate-200 bg-white backdrop-blur-xl rounded-2xl p-6 ${className}`}
      style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}
    >
      {/* Header - using CSS animation instead of Framer Motion for performance */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <Zap className="text-cyan-400 w-5 h-5 animate-pulse" />
        <h3
          className="text-base sm:text-lg text-slate-900"
          style={{ fontWeight: 600 }}
        >
          Limited Time Offer
        </h3>
        <Zap className="text-cyan-400 w-5 h-5 animate-pulse" />
      </div>

      {/* Offer text */}
      <p
        className="text-center text-sm text-slate-600 mb-6 max-w-2xl mx-auto px-2"
        style={{ fontWeight: 300 }}
      >
        {offer}
      </p>

      {/* Countdown Timer - simplified without per-digit animations */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6">
        {/* Hours */}
        <div className="flex flex-col items-center">
          <div className="border border-slate-200 bg-white backdrop-blur-xl rounded-xl px-4 py-3 min-w-[70px] sm:min-w-[80px] text-center shadow-[0_0_20px_rgba(0,201,255,0.1)]">
            <p
              className="text-2xl sm:text-3xl lg:text-4xl bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent tabular-nums"
              style={{ fontWeight: 800 }}
            >
              {String(timeLeft.hours).padStart(2, "0")}
            </p>
          </div>
          <p
            className="text-xs text-slate-600 mt-2 uppercase"
            style={{ fontWeight: 500 }}
          >
            Hours
          </p>
        </div>

        <span
          className="text-2xl sm:text-3xl text-cyan-400 mb-6"
          style={{ fontWeight: 800 }}
        >
          :
        </span>

        {/* Minutes */}
        <div className="flex flex-col items-center">
          <div className="border border-slate-200 bg-white backdrop-blur-xl rounded-xl px-4 py-3 min-w-[70px] sm:min-w-[80px] text-center shadow-[0_0_20px_rgba(0,201,255,0.1)]">
            <p
              className="text-2xl sm:text-3xl lg:text-4xl bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent tabular-nums"
              style={{ fontWeight: 800 }}
            >
              {String(timeLeft.minutes).padStart(2, "0")}
            </p>
          </div>
          <p
            className="text-xs text-slate-600 mt-2 uppercase"
            style={{ fontWeight: 500 }}
          >
            Minutes
          </p>
        </div>

        <span
          className="text-2xl sm:text-3xl text-cyan-400 mb-6"
          style={{ fontWeight: 800 }}
        >
          :
        </span>

        {/* Seconds */}
        <div className="flex flex-col items-center">
          <div className="border border-slate-200 bg-white backdrop-blur-xl rounded-xl px-4 py-3 min-w-[70px] sm:min-w-[80px] text-center shadow-[0_0_20px_rgba(0,201,255,0.1)]">
            <p
              className="text-2xl sm:text-3xl lg:text-4xl bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent tabular-nums"
              style={{ fontWeight: 800 }}
            >
              {String(timeLeft.seconds).padStart(2, "0")}
            </p>
          </div>
          <p
            className="text-xs text-slate-600 mt-2 uppercase"
            style={{ fontWeight: 500 }}
          >
            Seconds
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <a
          href="#contact"
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white px-8 py-4 rounded-xl hover:shadow-[0_0_30px_rgba(0,201,255,0.3)] transition-all duration-300 hover:scale-105 text-base min-h-[56px]"
          style={{ fontWeight: 600 }}
        >
          <span>Claim Your Bonus Now</span>
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>

      {/* Fine print */}
      <p
        className="text-xs text-center text-slate-600 mt-4 px-2"
        style={{ fontWeight: 300 }}
      >
        Offer resets daily at midnight EST. Limited to first 10 bookings.
      </p>
    </motion.div>
  );
}
