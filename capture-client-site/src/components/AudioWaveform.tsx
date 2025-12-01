"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface AudioWaveformProps {
  isActive: boolean;
  color: "orange" | "cyan";
}

// Generate deterministic pseudo-random values based on index for hydration safety
const generateBarHeights = (index: number) => {
  // Use index-based seed for deterministic "random" values
  const seed1 = ((index * 13) % 50) + 30; // Range: 30-79
  const seed2 = ((index * 17) % 60) + 25; // Range: 25-84
  const seed3 = ((index * 23) % 55) + 20; // Range: 20-74
  return [`${seed1}%`, `${seed2}%`, `${seed3}%`];
};

const AudioWaveform: React.FC<AudioWaveformProps> = ({ isActive, color }) => {
  // Memoize bars array and heights for performance
  const barsWithHeights = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        index: i,
        heights: generateBarHeights(i),
      })),
    []
  );

  const colorClasses = {
    orange: {
      bar: "bg-orange-500",
      glow: "shadow-orange-500/50",
      filter: "drop-shadow(0 0 8px rgba(249, 115, 22, 0.6))",
    },
    cyan: {
      bar: "bg-cyan-400",
      glow: "shadow-cyan-400/50",
      filter: "drop-shadow(0 0 12px rgba(34, 211, 238, 0.7))",
    },
  };

  const currentColor = colorClasses[color];

  return (
    <div className="flex items-center justify-center gap-[3px] h-20 px-4">
      {barsWithHeights.map(({ index, heights }) => {
        // Create varied animation delays for natural effect
        const delay = index * 0.02;
        const duration = isActive
          ? 0.15 + (index % 3) * 0.05 // Faster, varied for speech
          : 1.2 + (index % 4) * 0.2; // Slower, gentle for ringing

        return (
          <motion.div
            key={index}
            className={`w-1 rounded-full ${currentColor.bar} ${currentColor.glow}`}
            style={{
              filter: currentColor.filter,
            }}
            initial={{ height: "20%" }}
            animate={{
              height: isActive
                ? ["20%", heights[0], heights[1], heights[2], "20%"]
                : ["15%", `${20 + (index % 5) * 5}%`, "15%"],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
              times: isActive ? [0, 0.2, 0.5, 0.8, 1] : [0, 0.5, 1],
            }}
          />
        );
      })}
    </div>
  );
};

export default AudioWaveform;
