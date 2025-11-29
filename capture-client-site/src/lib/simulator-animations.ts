/**
 * Lead Rescue Simulator - Premium Animation System
 * Framer Motion configurations for fluid, polished transitions
 */

import { Variants, Transition } from "framer-motion";

// ============================================================================
// TIMING CONSTANTS
// ============================================================================

export const TIMING = {
  // Stage transitions
  STAGE_EXIT: 0.4,
  STAGE_ENTER: 0.5,
  STAGE_OVERLAP: 0.2, // Overlap for smoother feel

  // Micro-interactions
  BUTTON_HOVER: 0.2,
  BUTTON_CLICK: 0.15,
  GLOW_PULSE: 2.5,

  // Stagger animations
  STAGGER_BASE: 0.08,
  STAGGER_CARD: 0.12,

  // Special effects
  FLASH_DURATION: 0.6,
  CHECKMARK_SPRING: 0.8,
  COUNTER_DURATION: 1.2,

  // CRM field population
  FIELD_POPULATE: 0.3,
  FIELD_STAGGER: 0.15,
} as const;

// ============================================================================
// EASING CURVES (Premium feel)
// ============================================================================

export const EASING = {
  smooth: [0.43, 0.13, 0.23, 0.96], // Custom smooth ease
  snappy: [0.34, 1.56, 0.64, 1], // Slightly bouncy
  elastic: [0.68, -0.55, 0.265, 1.55], // More pronounced bounce
  spring: { type: "spring" as const, stiffness: 300, damping: 25 },
  softSpring: { type: "spring" as const, stiffness: 200, damping: 30 },
  counterSpring: { type: "spring" as const, stiffness: 100, damping: 20 },
} as const;

// ============================================================================
// STAGE TRANSITIONS
// ============================================================================

export const stageTransitions = {
  // Stage 1 → 2: Fade up and out, new content fades in
  stage1Exit: {
    hidden: {
      opacity: 0,
      y: -30,
      filter: "blur(8px)",
      transition: {
        duration: TIMING.STAGE_EXIT,
        ease: EASING.smooth,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: TIMING.STAGE_ENTER,
        ease: EASING.smooth,
      },
    },
  } as Variants,

  stage2Enter: {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: TIMING.STAGE_ENTER,
        ease: EASING.smooth,
        delay: TIMING.STAGE_OVERLAP,
      },
    },
  } as Variants,

  // Stage 2 → 3: Blur simulation, overlay slides up
  stage2Exit: {
    hidden: {
      opacity: 0,
      scale: 0.95,
      filter: "blur(12px)",
      transition: {
        duration: TIMING.STAGE_EXIT,
        ease: EASING.smooth,
      },
    },
  } as Variants,

  stage3Enter: {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.96,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: TIMING.STAGE_ENTER,
        ease: EASING.smooth,
        delay: TIMING.STAGE_OVERLAP,
      },
    },
  } as Variants,
} as const;

// ============================================================================
// CTA BUTTON ANIMATIONS
// ============================================================================

export const ctaButton = {
  variants: {
    initial: {
      scale: 1,
      boxShadow: "0 0 0px rgba(34, 211, 238, 0), 0 0 0px rgba(99, 102, 241, 0)",
    },
    hover: {
      scale: 1.05,
      boxShadow: [
        "0 0 20px rgba(34, 211, 238, 0.4), 0 0 40px rgba(99, 102, 241, 0.3)",
        "0 0 25px rgba(34, 211, 238, 0.5), 0 0 50px rgba(99, 102, 241, 0.4)",
        "0 0 20px rgba(34, 211, 238, 0.4), 0 0 40px rgba(99, 102, 241, 0.3)",
      ],
      transition: {
        scale: {
          duration: TIMING.BUTTON_HOVER,
          ease: EASING.snappy,
        },
        boxShadow: {
          duration: TIMING.GLOW_PULSE,
          repeat: Infinity,
          ease: "easeInOut",
        },
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: TIMING.BUTTON_CLICK,
        ease: EASING.smooth,
      },
    },
  } as Variants,

  // Continuous pulsing glow (for idle state)
  glowAnimation: {
    boxShadow: [
      "0 0 15px rgba(34, 211, 238, 0.3), 0 0 30px rgba(99, 102, 241, 0.2)",
      "0 0 20px rgba(34, 211, 238, 0.4), 0 0 40px rgba(99, 102, 241, 0.3)",
      "0 0 15px rgba(34, 211, 238, 0.3), 0 0 30px rgba(99, 102, 241, 0.2)",
    ],
    transition: {
      duration: TIMING.GLOW_PULSE,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
} as const;

// ============================================================================
// STAGGER ANIMATIONS
// ============================================================================

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: TIMING.STAGGER_BASE,
      delayChildren: 0.1,
    },
  },
} as Variants;

export const staggerItem = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: EASING.smooth,
    },
  },
} as Variants;

export const staggerCard = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: EASING.smooth,
    },
  },
} as Variants;

// ============================================================================
// WAVEFORM ANIMATIONS
// ============================================================================

export const waveform = {
  // Individual bar animation
  bar: {
    idle: {
      scaleY: [0.3, 0.5, 0.3],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    active: (index: number) => ({
      scaleY: [0.2, 1, 0.4, 0.8, 0.3],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.1, // Stagger bars
      },
    }),
  } as const,

  // Container pulse
  container: {
    initial: { opacity: 0.8 },
    animate: {
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  } as Variants,
} as const;

// ============================================================================
// CRM CARD ANIMATIONS
// ============================================================================

export const crmCard = {
  // Card entrance
  entrance: {
    hidden: {
      opacity: 0,
      x: 40,
      rotateY: -15,
    },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        duration: 0.6,
        ease: EASING.smooth,
      },
    },
  } as Variants,

  // Field population stagger
  fieldContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: TIMING.FIELD_STAGGER,
        delayChildren: 0.3,
      },
    },
  } as Variants,

  field: {
    hidden: {
      opacity: 0,
      x: -10,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: TIMING.FIELD_POPULATE,
        ease: EASING.smooth,
      },
    },
  } as Variants,

  // Flash effect when field populates
  flash: {
    initial: { opacity: 0, x: "-100%" },
    animate: {
      opacity: [0, 1, 0],
      x: ["100%", "200%"],
      transition: {
        duration: TIMING.FLASH_DURATION,
        ease: "easeOut",
      },
    },
  } as Variants,
} as const;

// ============================================================================
// CHECKMARK ANIMATION
// ============================================================================

export const checkmark = {
  circle: {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        ...EASING.spring,
        duration: TIMING.CHECKMARK_SPRING,
      },
    },
  } as Variants,

  path: {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          duration: 0.5,
          ease: EASING.smooth,
          delay: 0.2,
        },
        opacity: { duration: 0.1, delay: 0.2 },
      },
    },
  } as Variants,

  // Outer glow effect
  glow: {
    initial: { scale: 1, opacity: 0.5 },
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  } as Variants,
} as const;

// ============================================================================
// NUMBER COUNTER ANIMATION
// ============================================================================

export const counter = {
  container: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: EASING.smooth,
      },
    },
  } as Variants,

  // For animating individual digits
  digit: {
    hidden: { y: 20, opacity: 0 },
    visible: (index: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: index * 0.05,
        ease: EASING.snappy,
      },
    }),
  } as Variants,

  // Pulsing emphasis after reveal
  emphasis: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 0.4,
      delay: TIMING.COUNTER_DURATION,
      ease: EASING.snappy,
    },
  },
} as const;

// ============================================================================
// REUSABLE PRESETS
// ============================================================================

export const presets = {
  // Fade in from bottom
  fadeInUp: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: EASING.smooth },
    },
  } as Variants,

  // Fade in from top
  fadeInDown: {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: EASING.smooth },
    },
  } as Variants,

  // Scale fade
  scaleFade: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: EASING.smooth },
    },
  } as Variants,

  // Slide in from right
  slideInRight: {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: EASING.smooth },
    },
  } as Variants,

  // Slide in from left
  slideInLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: EASING.smooth },
    },
  } as Variants,

  // Blur fade
  blurFade: {
    hidden: { opacity: 0, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: EASING.smooth },
    },
  } as Variants,
} as const;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Creates a stagger container with custom timing
 */
export const createStaggerContainer = (
  staggerDelay: number = TIMING.STAGGER_BASE,
  initialDelay: number = 0.1
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: initialDelay,
    },
  },
});

/**
 * Creates a number counter transition from start to end value
 */
export const createCounterTransition = (
  duration: number = TIMING.COUNTER_DURATION
): Transition => ({
  duration,
  ease: EASING.smooth,
});

/**
 * Creates a spring transition with custom parameters
 */
export const createSpringTransition = (
  stiffness: number = 300,
  damping: number = 25
): Transition => ({
  type: "spring",
  stiffness,
  damping,
});

// ============================================================================
// ANIMATION PRESETS FOR SPECIFIC USE CASES
// ============================================================================

export const simulatorAnimations = {
  // Stage 1: Setup screen
  setup: {
    headline: presets.fadeInUp,
    subheadline: presets.fadeInUp,
    button: presets.scaleFade,
  },

  // Stage 2: Simulation screen
  simulation: {
    splitView: presets.blurFade,
    waveformSide: presets.slideInLeft,
    crmSide: presets.slideInRight,
  },

  // Stage 3: Payoff screen
  payoff: {
    container: stageTransitions.stage3Enter,
    checkmark: checkmark.circle,
    resultsText: presets.fadeInUp,
    counter: counter.container,
  },
};

// ============================================================================
// EXPORT ALL
// ============================================================================

export default {
  TIMING,
  EASING,
  stageTransitions,
  ctaButton,
  staggerContainer,
  staggerItem,
  staggerCard,
  waveform,
  crmCard,
  checkmark,
  counter,
  presets,
  simulatorAnimations,
  createStaggerContainer,
  createCounterTransition,
  createSpringTransition,
};
