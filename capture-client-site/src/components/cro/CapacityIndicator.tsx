"use client";

import { useEffect, useState } from "react";

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
    // Show with slight delay for dramatic effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Only show if spots are less than 10 (unless showAlways is true)
  if (!showAlways && spotsLeft >= 10) {
    return null;
  }

  return (
    <div
      className={`transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
      <div className="bg-gradient-to-r from-orange-500/20 to-amber-500/20 border-2 border-orange-500/40 rounded-xl p-4 sm:p-4 shadow-lg">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-3">
          {/* Pulse indicator */}
          <div className="relative flex-shrink-0">
            <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 w-3 h-3 bg-orange-500 rounded-full animate-ping opacity-75"></div>
          </div>

          {/* Text */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-center">
            <span className="material-icons text-orange-400 text-xl">schedule</span>
            <p className="text-base sm:text-sm md:text-base font-bold text-foreground">
              <span className="text-orange-400">{spotsLeft} spots left</span> for December
              onboarding
            </p>
          </div>

          {/* Warning icon */}
          <span className="material-icons text-orange-400 text-xl flex-shrink-0">warning</span>
        </div>

        {/* Sub-text */}
        <p className="text-sm sm:text-xs text-gray-400 text-center mt-2">
          High demand this month. Book now to secure your spot.
        </p>
      </div>
    </div>
  );
}
