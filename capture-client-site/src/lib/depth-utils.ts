"use client";

import { useMotionValue, useSpring, useTransform } from "@/lib/motion";
import { useCallback, useEffect, useState } from "react";

// ============================================
// SHARED 3D DEPTH UTILITIES
// $1B Aesthetic - Subtle & Elegant
// ============================================

// Mobile detection hook (SSR-safe)
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check both viewport width and touch capability
    const viewportCheck = window.matchMedia("(max-width: 768px)");
    const touchCheck = window.matchMedia("(hover: none)");

    const checkMobile = () => {
      setIsMobile(viewportCheck.matches || touchCheck.matches);
    };

    // Initial check
    checkMobile();

    // Listen for changes
    viewportCheck.addEventListener("change", checkMobile);
    touchCheck.addEventListener("change", checkMobile);

    return () => {
      viewportCheck.removeEventListener("change", checkMobile);
      touchCheck.removeEventListener("change", checkMobile);
    };
  }, []);

  return isMobile;
}

// Standardized spring configs
export const depthSpring = { stiffness: 200, damping: 25 };
export const softSpring = { stiffness: 100, damping: 20 };
export const snappySpring = { stiffness: 300, damping: 30 };

// Layered shadow system (light theme - blue/cyan accents)
export const cardShadow = {
  rest: `
    0 20px 40px -12px rgba(37, 99, 235, 0.1),
    0 8px 16px -6px rgba(0, 0, 0, 0.05),
    0 0 0 1px rgba(37, 99, 235, 0.03) inset
  `
    .trim()
    .replace(/\s+/g, " "),
  hover: `
    0 30px 60px -12px rgba(37, 99, 235, 0.18),
    0 15px 30px -8px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(37, 99, 235, 0.06) inset,
    0 -15px 30px -15px rgba(14, 165, 233, 0.06) inset
  `
    .trim()
    .replace(/\s+/g, " "),
};

// Lighter shadow variant for smaller cards
export const cardShadowLight = {
  rest: `
    0 10px 25px -8px rgba(37, 99, 235, 0.08),
    0 4px 10px -4px rgba(0, 0, 0, 0.04),
    0 0 0 1px rgba(37, 99, 235, 0.02) inset
  `
    .trim()
    .replace(/\s+/g, " "),
  hover: `
    0 20px 40px -10px rgba(37, 99, 235, 0.15),
    0 10px 20px -6px rgba(0, 0, 0, 0.06),
    0 0 0 1px rgba(37, 99, 235, 0.04) inset,
    0 -10px 20px -10px rgba(14, 165, 233, 0.05) inset
  `
    .trim()
    .replace(/\s+/g, " "),
};

// Reusable 3D tilt hook (mobile-aware)
export function use3DTilt(maxTilt: number = 3) {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();

  // Motion values for mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Transform mouse position to rotation with spring smoothing
  // On mobile, always return 0 to prevent blurry text
  const rotateX = useSpring(
    useTransform(mouseY, [-200, 200], isMobile ? [0, 0] : [maxTilt, -maxTilt]),
    depthSpring
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-200, 200], isMobile ? [0, 0] : [-maxTilt, maxTilt]),
    depthSpring
  );

  // Mouse move handler (no-op on mobile but keeps hover state working)
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (isMobile) return; // Don't set motion values on mobile
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    },
    [mouseX, mouseY, isMobile]
  );

  // Mouse leave handler - reset to center
  const handleMouseLeave = useCallback(() => {
    if (!isMobile) {
      mouseX.set(0);
      mouseY.set(0);
    }
    setIsHovered(false);
  }, [mouseX, mouseY, isMobile]);

  // Mouse enter handler
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  return {
    rotateX,
    rotateY,
    isHovered,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      onMouseEnter: handleMouseEnter,
    },
  };
}

// Explicitly disabled 3D tilt (always returns 0 for rotations)
export function useMobileDisabled3DTilt() {
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Always return 0 rotations
  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [0, 0]), depthSpring);
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [0, 0]), depthSpring);

  // Handlers that only manage hover state
  const handleMouseMove = useCallback(() => {}, []);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  return {
    rotateX,
    rotateY,
    isHovered,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      onMouseEnter: handleMouseEnter,
    },
  };
}

// Perspective wrapper styles
export const perspectiveContainer = {
  perspective: "1200px",
} as const;

// 3D transform styles for cards
export const transform3D = {
  transformStyle: "preserve-3d" as const,
  willChange: "transform" as const,
};

// Mobile-disabled transform styles (flat rendering to prevent blurry text)
export const mobileDisabledTransform3D = {
  transformStyle: "flat" as const,
  willChange: "auto" as const,
};
