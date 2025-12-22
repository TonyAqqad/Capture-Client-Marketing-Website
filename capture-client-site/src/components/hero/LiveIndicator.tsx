"use client";

import { motion } from "@/lib/motion";

interface LiveIndicatorProps {
  className?: string;
  callsToday?: number;
}

export default function LiveIndicator({ className = "", callsToday = 0 }: LiveIndicatorProps) {
  // Staggered animation delays for waveform bars
  const barDelays = [0, 0.15, 0.3, 0.15, 0];
  const barHeights = [8, 12, 16, 12, 8]; // Base heights for visual rhythm

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className={`inline-flex items-center gap-3 px-4 py-2.5 rounded-full backdrop-blur-md bg-white/[0.03] border border-white/[0.08] shadow-2xl relative overflow-hidden ${className}`}
    >
      {/* Breathing glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-emerald-500/20"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [0.98, 1.02, 0.98],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Waveform Container */}
      <div className="relative flex items-center gap-1 h-5">
        {barDelays.map((delay, index) => (
          <motion.div
            key={index}
            className="w-0.5 bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-full origin-bottom"
            style={{ height: `${barHeights[index]}px` }}
            animate={{
              scaleY: [1, 1.5, 0.8, 1.3, 1],
              opacity: [0.7, 1, 0.6, 0.9, 0.7],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay,
            }}
          />
        ))}
      </div>

      {/* Status Text */}
      <div className="relative flex items-center gap-2">
        <div className="flex flex-col -space-y-0.5">
          <span className="text-[13px] font-medium text-white/90 leading-tight tracking-tight">
            AI Agent Online
          </span>
          {callsToday > 0 && (
            <motion.span
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-[10px] font-medium text-emerald-400/80 leading-tight tracking-wide uppercase"
            >
              {callsToday.toLocaleString()} calls today
            </motion.span>
          )}
        </div>

        {/* Live pulse indicator */}
        <div className="relative flex items-center justify-center w-2 h-2">
          <motion.div
            className="absolute w-2 h-2 rounded-full bg-emerald-500"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.8, 0, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
          <div className="relative w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
        </div>
      </div>

      {/* Subtle shimmer effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)",
        }}
        animate={{
          x: ["-100%", "200%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 2,
        }}
      />
    </motion.div>
  );
}
