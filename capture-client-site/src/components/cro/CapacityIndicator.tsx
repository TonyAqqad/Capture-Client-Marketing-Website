"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface CapacityIndicatorProps {
  spotsLeft?: number;
  showAlways?: boolean;
}

export default function CapacityIndicator({
  spotsLeft = 7,
  showAlways = false,
}: CapacityIndicatorProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Gentle reveal - not dramatic
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Only show if spots are less than 10 (unless showAlways is true)
  if (!showAlways && spotsLeft >= 10) {
    return null;
  }

  return (
    <div
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      }`}
    >
      <div className="relative bg-gradient-to-r from-amber-500/8 via-orange-500/8 to-amber-500/8 border border-amber-500/25 rounded-xl p-4 sm:p-4 backdrop-blur-sm overflow-hidden">
        {/* Subtle animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent animate-pulse" />

        <div className="relative flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          {/* Refined pulse indicator - less aggressive */}
          <div className="relative flex-shrink-0">
            <div className="w-2.5 h-2.5 bg-amber-500/80 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 w-2.5 h-2.5 bg-amber-500/40 rounded-full animate-ping"></div>
          </div>

          {/* Text - more professional tone */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 text-center">
            <Clock className="w-5 h-5 text-amber-400/80" />
            <p className="text-sm md:text-base font-semibold text-slate-800">
              <span className="text-amber-400">{spotsLeft} onboarding spots</span> available this month
            </p>
          </div>
        </div>

        {/* Sub-text - informative, not pushy */}
        <p className="text-xs text-slate-500 text-center mt-3 font-medium">
          Limited availability due to our personalized onboarding process
        </p>
      </div>
    </div>
  );
}
