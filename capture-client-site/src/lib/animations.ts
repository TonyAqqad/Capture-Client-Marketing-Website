// Premium Animation Variants for $10M website
// Based on Linear, Vercel, Stripe patterns

import type { Variants } from "framer-motion";

// Fade up animation (most common)
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
  }
};

// Stagger children animation
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Stagger item (use with staggerContainer)
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

// Scale in (for icons, badges)
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 20 }
  }
};

// Slide in from left
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Slide in from right
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Hover lift effect (use with whileHover)
export const hoverLift = {
  y: -8,
  transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }
};

// Hover scale effect
export const hoverScale = {
  scale: 1.02,
  transition: { duration: 0.3 }
};

// Hover glow effect
export const hoverGlowGold = {
  boxShadow: "0 0 40px rgba(212, 175, 55, 0.3)",
  transition: { duration: 0.3 }
};

export const hoverGlowCyan = {
  boxShadow: "0 0 40px rgba(0, 201, 255, 0.3)",
  transition: { duration: 0.3 }
};

// Button press/tap effect
export const buttonTap = {
  scale: 0.98,
  transition: { duration: 0.1 }
};

// Word by word reveal (for headlines)
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 }
  })
};
