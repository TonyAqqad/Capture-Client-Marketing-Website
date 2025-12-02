"use client";

import { useState, useEffect } from "react";

interface MobileOptimizationConfig {
  isMobile: boolean;
  disableAnimations: boolean;
  reducedMotion: boolean;
}

export function useMobileOptimization(): MobileOptimizationConfig {
  const [config, setConfig] = useState<MobileOptimizationConfig>({
    isMobile: false,
    disableAnimations: false,
    reducedMotion: false,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkMobile = () => {
      const isMobile = window.innerWidth < 768;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const disableAnimations = isMobile || reducedMotion;

      setConfig({
        isMobile,
        disableAnimations,
        reducedMotion,
      });
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return config;
}

// Helper to get safe animation props for Framer Motion
export function getMobileAnimationProps(isMobile: boolean) {
  if (isMobile) {
    return {
      initial: false,
      animate: {},
      transition: { duration: 0 },
      whileHover: {},
      whileInView: {},
    };
  }
  return {};
}
