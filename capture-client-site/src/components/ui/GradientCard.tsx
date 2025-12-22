"use client";

import { motion } from "@/lib/motion";
import { ReactNode } from "react";

/**
 * GradientCard Component
 *
 * Premium card component using diverse gradients instead of generic glass effects.
 * Better performance (no backdrop-blur) with bold, intentional color choices.
 *
 * Usage:
 * <GradientCard variant="sunset" hover>
 *   <h3>Card Title</h3>
 *   <p>Card content</p>
 * </GradientCard>
 */

interface GradientCardProps {
  children: ReactNode;
  className?: string;
  variant?:
    | "aurora" // Cyan/Purple/Violet - Brand gradient
    | "sunset" // Orange/Yellow - Warm energy
    | "ocean" // Blue tones - Professional calm
    | "royal" // Purple spectrum - Luxury
    | "forest" // Green tones - Growth/stability
    | "rose" // Pink/coral - Modern feminine
    | "midnight" // Deep blue - Sophisticated
    | "ember"; // Red/orange - Bold/urgent
  hover?: boolean; // Enable hover effects
  interactive?: boolean; // Enable tap/press feedback
  intensity?: "subtle" | "medium" | "bold"; // Gradient intensity
}

// Category to gradient mapping (for programmatic usage)
export const categoryGradients = {
  crm: "sunset",
  automation: "royal",
  scheduling: "forest",
  "phone-systems": "ocean",
  "home-services": "ember",
  legal: "midnight",
  healthcare: "rose",
  "real-estate": "ocean",
  marketing: "royal",
  payments: "forest",
  "all-in-one": "aurora",
} as const;

export function GradientCard({
  children,
  className = "",
  variant = "aurora",
  hover = true,
  interactive = true,
  intensity = "medium",
}: GradientCardProps) {
  // Gradient backgrounds with subtle overlay (NO backdrop-blur for performance)
  const variantClasses = {
    aurora: {
      subtle: "bg-gradient-to-br from-accent/5 via-primary/5 to-accent/5",
      medium: "bg-gradient-to-br from-accent/10 via-primary/8 to-accent/10",
      bold: "bg-gradient-aurora opacity-20",
    },
    sunset: {
      subtle: "bg-gradient-to-br from-orange-500/5 via-amber-500/5 to-yellow-400/5",
      medium: "bg-gradient-to-br from-orange-500/10 via-amber-500/8 to-yellow-400/10",
      bold: "bg-gradient-sunset opacity-20",
    },
    ocean: {
      subtle: "bg-gradient-to-br from-blue-600/5 via-cyan-500/5 to-blue-300/5",
      medium: "bg-gradient-to-br from-blue-600/10 via-cyan-500/8 to-blue-300/10",
      bold: "bg-gradient-ocean opacity-20",
    },
    royal: {
      subtle: "bg-gradient-to-br from-purple-700/5 via-purple-500/5 to-purple-400/5",
      medium: "bg-gradient-to-br from-purple-700/10 via-purple-500/8 to-purple-400/10",
      bold: "bg-gradient-royal opacity-20",
    },
    forest: {
      subtle: "bg-gradient-to-br from-green-900/5 via-green-700/5 to-green-500/5",
      medium: "bg-gradient-to-br from-green-900/10 via-green-700/8 to-green-500/10",
      bold: "bg-gradient-forest opacity-20",
    },
    rose: {
      subtle: "bg-gradient-to-br from-rose-500/5 via-pink-400/5 to-pink-300/5",
      medium: "bg-gradient-to-br from-rose-500/10 via-pink-400/8 to-pink-300/10",
      bold: "bg-gradient-rose opacity-20",
    },
    midnight: {
      subtle: "bg-gradient-to-br from-slate-900/5 via-slate-700/5 to-slate-600/5",
      medium: "bg-gradient-to-br from-slate-900/10 via-slate-700/8 to-slate-600/10",
      bold: "bg-gradient-midnight opacity-20",
    },
    ember: {
      subtle: "bg-gradient-to-br from-red-700/5 via-orange-600/5 to-amber-500/5",
      medium: "bg-gradient-to-br from-red-700/10 via-orange-600/8 to-amber-500/10",
      bold: "bg-gradient-ember opacity-20",
    },
  };

  // Border colors matching each gradient
  const borderColors = {
    aurora: "border-accent/20",
    sunset: "border-orange-500/20",
    ocean: "border-blue-500/20",
    royal: "border-purple-500/20",
    forest: "border-green-600/20",
    rose: "border-rose-500/20",
    midnight: "border-slate-600/20",
    ember: "border-red-600/20",
  };

  // Hover glow colors
  const hoverGlows = {
    aurora: "hover:shadow-[0_8px_32px_rgba(0,201,255,0.2)]",
    sunset: "hover:shadow-[0_8px_32px_rgba(255,107,53,0.2)]",
    ocean: "hover:shadow-[0_8px_32px_rgba(0,119,182,0.2)]",
    royal: "hover:shadow-[0_8px_32px_rgba(123,44,191,0.2)]",
    forest: "hover:shadow-[0_8px_32px_rgba(27,67,50,0.2)]",
    rose: "hover:shadow-[0_8px_32px_rgba(255,77,109,0.2)]",
    midnight: "hover:shadow-[0_8px_32px_rgba(13,27,42,0.2)]",
    ember: "hover:shadow-[0_8px_32px_rgba(208,0,0,0.2)]",
  };

  const hoverClasses = hover
    ? `${hoverGlows[variant]} hover:border-opacity-40 hover:-translate-y-1`
    : "";

  const interactiveClasses = interactive ? "active:scale-[0.98]" : "";

  return (
    <motion.div
      className={`
        relative rounded-2xl overflow-hidden transition-all duration-500
        bg-white/90
        ${variantClasses[variant][intensity]}
        border ${borderColors[variant]}
        ${hoverClasses}
        ${interactiveClasses}
        ${className}
      `}
      whileHover={hover ? { y: -4 } : {}}
      whileTap={interactive ? { scale: 0.98 } : {}}
    >
      {/* Gradient overlay for depth (NOT backdrop-blur) */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-slate-100/10 pointer-events-none rounded-2xl" />

      {/* Top highlight edge */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

      {/* Shimmer effect on hover (subtle) */}
      {hover && (
        <motion.div
          className="absolute inset-0 opacity-0 hover:opacity-100 pointer-events-none"
          initial={false}
          whileHover={{
            backgroundPosition: ["0% 50%", "100% 50%"],
          }}
          transition={{
            duration: 1.5,
            ease: "linear",
          }}
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.08) 50%, transparent 100%)",
            backgroundSize: "200% 100%",
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

/**
 * Utility function to get gradient variant by category
 *
 * Usage:
 * const gradientVariant = getGradientByCategory(integration.category);
 * <GradientCard variant={gradientVariant}>...</GradientCard>
 */
export function getGradientByCategory(category: string): GradientCardProps["variant"] {
  const normalized = category.toLowerCase().replace(/\s+/g, "-");
  return (categoryGradients[normalized as keyof typeof categoryGradients] ||
    "aurora") as GradientCardProps["variant"];
}
