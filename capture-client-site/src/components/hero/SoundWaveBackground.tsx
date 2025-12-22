"use client";

import { motion } from "@/lib/motion";

// ============================================
// SOUND WAVE BACKGROUND - Full-width responsive
// Seamless blending on all screen sizes
// Extends to edges with gradient fading
// ============================================

interface SoundWaveBackgroundProps {
  className?: string;
}

export function SoundWaveBackground({ className = "" }: SoundWaveBackgroundProps) {
  // Extended wave paths - very long to cover ultra-wide screens
  const waves = [
    // Primary waves - more pronounced
    {
      d: "M -500 100 Q -200 60 50 100 T 350 100 T 650 100 T 950 100 T 1250 100 T 1550 100 T 1850 100",
      delay: 0,
      opacity: 0.12,
      strokeWidth: 2.5,
    },
    {
      d: "M -500 140 Q -150 180 150 140 T 450 140 T 750 140 T 1050 140 T 1350 140 T 1650 140 T 1950 140",
      delay: 0.2,
      opacity: 0.08,
      strokeWidth: 2,
    },
    {
      d: "M -500 180 Q -100 140 200 180 T 500 180 T 800 180 T 1100 180 T 1400 180 T 1700 180 T 2000 180",
      delay: 0.4,
      opacity: 0.15,
      strokeWidth: 3,
    },
    {
      d: "M -500 220 Q -200 260 100 220 T 400 220 T 700 220 T 1000 220 T 1300 220 T 1600 220 T 1900 220",
      delay: 0.6,
      opacity: 0.1,
      strokeWidth: 2.5,
    },
    {
      d: "M -500 260 Q -150 220 150 260 T 450 260 T 750 260 T 1050 260 T 1350 260 T 1650 260 T 1950 260",
      delay: 0.8,
      opacity: 0.06,
      strokeWidth: 2,
    },
    // Secondary subtle waves
    {
      d: "M -500 130 Q -50 100 250 130 T 550 130 T 850 130 T 1150 130 T 1450 130 T 1750 130 T 2050 130",
      delay: 1.0,
      opacity: 0.05,
      strokeWidth: 1.5,
    },
    {
      d: "M -500 200 Q -200 230 100 200 T 400 200 T 700 200 T 1000 200 T 1300 200 T 1600 200 T 1900 200",
      delay: 1.2,
      opacity: 0.07,
      strokeWidth: 1.5,
    },
  ];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Full-width SVG canvas - extends beyond container */}
      <svg
        viewBox="-200 0 1200 350"
        className="absolute w-[200%] h-full left-1/2 -translate-x-1/2"
        preserveAspectRatio="xMidYMid slice"
        style={{ minWidth: "2000px" }}
      >
        <defs>
          {/* Primary wave gradient with very smooth edge fading */}
          <linearGradient id="waveGradientMain" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00C9FF" stopOpacity="0" />
            <stop offset="5%" stopColor="#00C9FF" stopOpacity="0.1" />
            <stop offset="15%" stopColor="#00D4FF" stopOpacity="0.4" />
            <stop offset="30%" stopColor="#5FE3FF" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#80EFFF" stopOpacity="1" />
            <stop offset="70%" stopColor="#5FE3FF" stopOpacity="0.7" />
            <stop offset="85%" stopColor="#00D4FF" stopOpacity="0.4" />
            <stop offset="95%" stopColor="#00C9FF" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#00C9FF" stopOpacity="0" />
          </linearGradient>

          {/* Secondary gradient for subtle waves */}
          <linearGradient id="waveGradientSubtle" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00C9FF" stopOpacity="0" />
            <stop offset="10%" stopColor="#00C9FF" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#5FE3FF" stopOpacity="0.4" />
            <stop offset="90%" stopColor="#00C9FF" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#00C9FF" stopOpacity="0" />
          </linearGradient>

          {/* Glow filter for softer wave edges */}
          <filter id="waveGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Extra soft glow for atmosphere */}
          <filter id="softWaveGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        {/* Atmospheric glow layer - very subtle */}
        <ellipse
          cx="400"
          cy="180"
          rx="500"
          ry="150"
          fill="url(#waveGradientSubtle)"
          opacity="0.03"
          filter="url(#softWaveGlow)"
        />

        {/* Render animated wave paths */}
        {waves.map((wave, index) => (
          <motion.path
            key={index}
            d={wave.d}
            stroke={index < 5 ? "url(#waveGradientMain)" : "url(#waveGradientSubtle)"}
            strokeWidth={wave.strokeWidth}
            strokeLinecap="round"
            fill="none"
            opacity={wave.opacity}
            filter={index < 3 ? "url(#waveGlow)" : undefined}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: wave.opacity,
              x: [0, 40, 0, -40, 0],
            }}
            transition={{
              pathLength: { duration: 2, delay: wave.delay, ease: "easeOut" },
              opacity: { duration: 1.5, delay: wave.delay },
              x: { duration: 12, repeat: Infinity, ease: "easeInOut", delay: wave.delay },
            }}
          />
        ))}

        {/* Very subtle horizontal guide lines for depth */}
        {[120, 160, 200, 240].map((y, index) => (
          <motion.line
            key={`guide-${index}`}
            x1="-500"
            y1={y}
            x2="1500"
            y2={y}
            stroke="url(#waveGradientSubtle)"
            strokeWidth="0.5"
            opacity={0.01 + index * 0.002}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, delay: 0.3 + index * 0.15 }}
          />
        ))}
      </svg>

      {/* Multi-layer CSS gradient overlay for seamless edge blending */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(to right,
              rgba(8, 9, 10, 1) 0%,
              rgba(8, 9, 10, 0.8) 5%,
              rgba(8, 9, 10, 0) 20%,
              rgba(8, 9, 10, 0) 80%,
              rgba(8, 9, 10, 0.8) 95%,
              rgba(8, 9, 10, 1) 100%
            )
          `,
        }}
      />

      {/* Top and bottom fade for vertical blending */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(to bottom,
              rgba(8, 9, 10, 0.5) 0%,
              rgba(8, 9, 10, 0) 20%,
              rgba(8, 9, 10, 0) 80%,
              rgba(8, 9, 10, 0.5) 100%
            )
          `,
        }}
      />
    </div>
  );
}
