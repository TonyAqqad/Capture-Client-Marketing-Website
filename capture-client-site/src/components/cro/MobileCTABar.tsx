"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function MobileCTABar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 500px
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="bg-background-dark/95 backdrop-blur-xl border-t border-surface-border shadow-2xl">
        <div className="px-4 py-3 flex items-center gap-3">
          {/* Call Now button */}
          <a
            href="tel:865-346-3339"
            className="flex-1 flex items-center justify-center gap-2 bg-accent text-background-dark font-bold px-4 py-3 rounded-xl transition-all duration-300 hover:shadow-glow-lg active:scale-95"
          >
            <span className="material-icons text-lg">phone</span>
            <span className="text-sm uppercase tracking-wide">Call Now</span>
          </a>

          {/* Get Demo button */}
          <Link
            href="#contact"
            className="flex-1 flex items-center justify-center gap-2 bg-primary text-white font-bold px-4 py-3 rounded-xl transition-all duration-300 hover:shadow-glow-lg active:scale-95"
          >
            <span className="material-icons text-lg">rocket_launch</span>
            <span className="text-sm uppercase tracking-wide">Get Demo</span>
          </Link>
        </div>

        {/* Trust indicator */}
        <div className="px-4 pb-2 flex items-center justify-center gap-2 text-xs text-gray-400">
          <span className="material-icons text-green-500 text-xs">verified</span>
          <span>500+ businesses trust us • 4.9/5 rating</span>
        </div>
      </div>
    </div>
  );
}
