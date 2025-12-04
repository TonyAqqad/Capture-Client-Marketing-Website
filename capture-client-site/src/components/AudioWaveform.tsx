"use client";

import { motion } from "framer-motion";
import { useMemo, useEffect, useState } from "react";
import { isIOSDevice, isLowPowerDevice } from "@/lib/ios-performance";

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
  const [isIOS, setIsIOS] = useState(false);
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    setIsIOS(isIOSDevice());
    setIsLowPower(isLowPowerDevice());
  }, []);

  // PERFORMANCE OPTIMIZATION: Reduced bar counts for all devices
  const barCount = useMemo(() => {
    if (isLowPower) return 6; // Minimal bars on low-power devices
    if (isIOS) return 8; // Few bars on iOS
    return 12; // Reduced from 24 - still looks good with less CPU usage
  }, [isIOS, isLowPower]);

  // Memoize bars array and heights for performance
  const barsWithHeights = useMemo(
    () =>
      Array.from({ length: barCount }, (_, i) => ({
        index: i,
        heights: generateBarHeights(i),
      })),
    [barCount]
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

  // iOS OPTIMIZATION: Use simpler animation timing
  const getAnimationConfig = (index: number) => {
    const delay = index * 0.02;

    if (isLowPower) {
      // Minimal animation on low-power devices
      return {
        duration: 1.5,
        delay,
        ease: "linear" as const,
      };
    }

    if (isIOS) {
      // Simplified animation on iOS
      return {
        duration: isActive ? 0.4 : 1.5,
        delay,
        ease: "easeInOut" as const,
      };
    }

    // Full animation on desktop
    return {
      duration: isActive
        ? 0.15 + (index % 3) * 0.05 // Faster, varied for speech
        : 1.2 + (index % 4) * 0.2, // Slower, gentle for ringing
      delay,
      ease: "easeInOut" as const,
    };
  };

  return (
    <div className="flex items-center justify-center gap-[3px] h-20 px-4">
      {barsWithHeights.map(({ index, heights }) => {
        const animConfig = getAnimationConfig(index);

        return (
          <motion.div
            key={index}
            className={`w-1 rounded-full ${currentColor.bar} ${
              // iOS OPTIMIZATION: Remove glow/filter on low-power devices
              isLowPower ? "" : currentColor.glow
            }`}
            style={{
              // iOS OPTIMIZATION: Disable filter on low-power devices
              filter: isLowPower ? "none" : currentColor.filter,
              // iOS OPTIMIZATION: Use GPU acceleration hint
              transform: "translate3d(0, 0, 0)",
              willChange: isIOS ? "auto" : "height",
            }}
            initial={{ height: "20%" }}
            animate={{
              height: isActive
                ? isLowPower
                  ? ["20%", "50%", "20%"] // Simple animation on low-power
                  : ["20%", heights[0], heights[1], heights[2], "20%"]
                : ["15%", `${20 + (index % 5) * 5}%`, "15%"],
            }}
            transition={{
              duration: animConfig.duration,
              delay: animConfig.delay,
              repeat: Infinity,
              ease: animConfig.ease,
              times: isActive && !isLowPower ? [0, 0.2, 0.5, 0.8, 1] : [0, 0.5, 1],
            }}
          />
        );
      })}
    </div>
  );
};

export default AudioWaveform;
