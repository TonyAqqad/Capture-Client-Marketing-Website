"use client";

import { useEffect, useState } from "react";
import { motion } from "@/lib/motion";

export default function SocialProofBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="border border-slate-200 bg-white rounded-2xl p-6 sm:p-8 shadow-sm"
      style={{
        fontFamily: 'var(--font-bricolage-grotesque)'
      }}
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
        {/* Left: Confident statement */}
        <div className="text-center md:text-left">
          <p
            className="text-slate-900 text-lg sm:text-xl tracking-tight mb-1"
            style={{ fontWeight: 600 }}
          >
            500+ businesses trust Capture Client
          </p>
          <p
            className="text-slate-600 text-sm sm:text-base"
            style={{ fontWeight: 300 }}
          >
            From solo practitioners to 50-person teams
          </p>
        </div>

        {/* Right: Clean stats row */}
        <div className="flex items-center gap-8 sm:gap-12">
          <Stat value="1M+" label="Calls handled" />
          <div className="w-px h-10 bg-slate-200" />
          <Stat value="4.9" label="Client rating" />
          <div className="w-px h-10 bg-slate-200 hidden sm:block" />
          <Stat value="247%" label="Avg. lead growth" className="hidden sm:block" />
        </div>
      </div>
    </motion.div>
  );
}

function Stat({
  value,
  label,
  className = ""
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={`text-center ${className}`}>
      <p
        className="text-2xl sm:text-3xl tracking-tight bg-gradient-to-r from-[#00C9FF] to-[#4A69E2] bg-clip-text text-transparent"
        style={{ fontWeight: 800 }}
      >
        {value}
      </p>
      <p
        className="text-slate-600 text-xs sm:text-sm mt-0.5"
        style={{ fontWeight: 300 }}
      >
        {label}
      </p>
    </div>
  );
}
