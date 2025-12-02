"use client";

import { useEffect, useState } from "react";

export default function SocialProofBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Gentle fade in after mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`bg-surface/20 border border-surface-border/40 rounded-2xl p-5 sm:p-6 backdrop-blur-xl transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
        {/* Avatar stack - more refined */}
        <div className="flex items-center flex-shrink-0">
          <div className="flex -space-x-2.5 sm:-space-x-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500/80 to-purple-500/80 border-2 border-background-dark/80 shadow-lg flex items-center justify-center text-white font-semibold text-xs backdrop-blur-sm">
              JD
            </div>
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-500/80 to-pink-500/80 border-2 border-background-dark/80 shadow-lg flex items-center justify-center text-white font-semibold text-xs backdrop-blur-sm">
              SM
            </div>
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-pink-500/80 to-orange-500/80 border-2 border-background-dark/80 shadow-lg flex items-center justify-center text-white font-semibold text-xs backdrop-blur-sm">
              KL
            </div>
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-orange-500/80 to-amber-500/80 border-2 border-background-dark/80 shadow-lg flex items-center justify-center text-white font-semibold text-xs backdrop-blur-sm">
              AB
            </div>
            <div className="w-11 h-11 rounded-full bg-surface/90 border-2 border-accent/30 shadow-lg flex items-center justify-center text-accent font-bold text-xs backdrop-blur-sm">
              +500
            </div>
          </div>
        </div>

        {/* Trust text - more refined typography */}
        <div className="text-center md:text-left">
          <p className="text-foreground/90 font-semibold mb-2.5 text-base tracking-tight">Trusted by 500+ Small Businesses</p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
            {/* Star rating - subtle gold */}
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="material-icons text-amber-400/90 text-base">
                  star
                </span>
              ))}
            </div>
            <span className="text-foreground-muted text-sm font-medium whitespace-nowrap">4.9/5</span>
            <span className="text-surface-border text-sm hidden sm:inline">•</span>
            <span className="text-foreground-muted text-sm whitespace-nowrap">1,200+ reviews</span>
          </div>
        </div>

        {/* Badges - more subtle */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-2 bg-surface/30 px-4 py-2 rounded-full border border-surface-border/40 backdrop-blur-sm min-h-[40px] transition-all duration-300 hover:border-emerald-500/30">
            <span className="material-icons text-emerald-400/80 text-base">verified</span>
            <span className="text-xs text-foreground/80 font-medium whitespace-nowrap tracking-wide">Google Verified</span>
          </div>
          <div className="flex items-center gap-2 bg-surface/30 px-4 py-2 rounded-full border border-surface-border/40 backdrop-blur-sm min-h-[40px] transition-all duration-300 hover:border-blue-500/30">
            <span className="material-icons text-blue-400/80 text-base">shield</span>
            <span className="text-xs text-foreground/80 font-medium whitespace-nowrap tracking-wide">Secure</span>
          </div>
        </div>
      </div>
    </div>
  );
}
