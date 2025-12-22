"use client";

import { useState, useEffect } from "react";
import {
  isIOSDevice,
  isLowPowerDevice,
  prefersReducedMotion,
  getOptimalAnimationConfig,
  type AnimationConfig,
} from "@/lib/ios-performance";

interface MobileOptimizationConfig extends AnimationConfig {
  isMobile: boolean;
  isIOS: boolean;
  isLowPower: boolean;
  disableAnimations: boolean;
  reducedMotion: boolean;
}

export function useMobileOptimization(): MobileOptimizationConfig {
  const [config, setConfig] = useState<MobileOptimizationConfig>({
    isMobile: false,
    isIOS: false,
    isLowPower: false,
    disableAnimations: false,
    reducedMotion: false,
    enableSpring: true,
    enableInfinite: true,
    enableParallax: true,
    enableBlur: true,
    maxConcurrentAnimations: 20,
    reducedDuration: false,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkMobile = () => {
      const isMobile = window.innerWidth < 768;
      const isIOS = isIOSDevice();
      const isLowPower = isLowPowerDevice();
      const reducedMotion = prefersReducedMotion();
      const animConfig = getOptimalAnimationConfig();

      // Disable all animations on mobile OR reduced motion preference
      const disableAnimations = isMobile || reducedMotion;

      setConfig({
        isMobile,
        isIOS,
        isLowPower,
        disableAnimations,
        reducedMotion,
        ...animConfig,
      });
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return config;
}

// Helper to get safe animation props for Framer Motion with iOS optimization
export function getMobileAnimationProps(isMobile: boolean, isIOS: boolean = false) {
  if (isMobile) {
    return {
      initial: false,
      animate: {},
      transition: { duration: 0 },
      whileHover: {},
      whileInView: {},
    };
  }

  // On iOS (even desktop-size iPad), use simpler animations
  if (isIOS) {
    return {
      transition: { type: "tween", duration: 0.3, ease: "easeOut" },
      whileHover: { scale: 1.02 }, // Subtle hover only
    };
  }

  return {};
}
