"use client";

import { useEffect, useState } from "react";

export default function SocialProofBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fade in after mount
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`bg-surface/30 border border-surface-border rounded-2xl p-4 sm:p-6 backdrop-blur-lg transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
        {/* Avatar stack */}
        <div className="flex items-center flex-shrink-0">
          <div className="flex -space-x-2 sm:-space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background-dark flex items-center justify-center text-white font-bold text-sm">
              JD
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary border-2 border-background-dark flex items-center justify-center text-white font-bold text-sm">
              SM
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/80 to-accent/80 border-2 border-background-dark flex items-center justify-center text-white font-bold text-sm">
              KL
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/60 to-primary/60 border-2 border-background-dark flex items-center justify-center text-white font-bold text-sm">
              AB
            </div>
            <div className="w-10 h-10 rounded-full bg-surface border-2 border-background-dark flex items-center justify-center text-accent font-bold text-sm">
              +500
            </div>
          </div>
        </div>

        {/* Trust text */}
        <div className="text-center md:text-left">
          <p className="text-foreground font-semibold mb-2 text-base">Trusted by 500+ Small Businesses</p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            {/* Star rating */}
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="material-icons text-yellow-400 text-base">
                  star
                </span>
              ))}
            </div>
            <span className="text-gray-400 text-sm whitespace-nowrap">4.9/5</span>
            <span className="text-gray-500 text-sm hidden sm:inline">•</span>
            <span className="text-gray-400 text-sm whitespace-nowrap">1,200+ reviews</span>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 min-h-[40px]">
            <span className="material-icons text-green-500 text-base">verified</span>
            <span className="text-sm text-gray-300 font-medium whitespace-nowrap">Google Verified</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 min-h-[40px]">
            <span className="material-icons text-blue-500 text-base">shield</span>
            <span className="text-sm text-gray-300 font-medium whitespace-nowrap">Secure</span>
          </div>
        </div>
      </div>
    </div>
  );
}
