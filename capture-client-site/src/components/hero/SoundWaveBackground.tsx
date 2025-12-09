"use client";

import { motion } from "@/lib/motion";

// ============================================
// SOUND WAVE BACKGROUND - Organic flowing lines
// Subtle animation, behind the robot mascot
// ============================================

interface SoundWaveBackgroundProps {
  className?: string;
}

export function SoundWaveBackground({ className = "" }: SoundWaveBackgroundProps) {
  // Generate multiple wave paths with different properties
  const waves = [
    { d: "M -100 120 Q 50 80 150 120 T 350 120 T 550 120", delay: 0, opacity: 0.12, strokeWidth: 2.5 },
    { d: "M -100 150 Q 75 180 175 150 T 375 150 T 575 150", delay: 0.3, opacity: 0.08, strokeWidth: 2 },
    { d: "M -100 180 Q 100 140 200 180 T 400 180 T 600 180", delay: 0.6, opacity: 0.15, strokeWidth: 3 },
    { d: "M -100 210 Q 50 250 150 210 T 350 210 T 550 210", delay: 0.9, opacity: 0.1, strokeWidth: 2 },
    { d: "M -100 240 Q 75 200 175 240 T 375 240 T 575 240", delay: 1.2, opacity: 0.06, strokeWidth: 1.5 },
  ];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 500 350"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Gradient for wave strokes */}
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00C9FF" stopOpacity="0" />
            <stop offset="30%" stopColor="#00C9FF" stopOpacity="1" />
            <stop offset="70%" stopColor="#5FE3FF" stopOpacity="1" />
            <stop offset="100%" stopColor="#00C9FF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Render animated wave paths */}
        {waves.map((wave, index) => (
          <motion.path
            key={index}
            d={wave.d}
            stroke="url(#waveGradient)"
            strokeWidth={wave.strokeWidth}
            strokeLinecap="round"
            fill="none"
            opacity={wave.opacity}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: wave.opacity,
              x: [0, 20, 0, -20, 0],
            }}
            transition={{
              pathLength: { duration: 1.5, delay: wave.delay, ease: "easeOut" },
              opacity: { duration: 1, delay: wave.delay },
              x: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: wave.delay },
            }}
          />
        ))}

        {/* Additional subtle horizontal lines */}
        {[140, 170, 200, 230].map((y, index) => (
          <motion.line
            key={`line-${index}`}
            x1="-50"
            y1={y}
            x2="550"
            y2={y}
            stroke="#00C9FF"
            strokeWidth="1"
            opacity={0.03 + index * 0.01}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5 + index * 0.2 }}
          />
        ))}
      </svg>
    </div>
  );
}
