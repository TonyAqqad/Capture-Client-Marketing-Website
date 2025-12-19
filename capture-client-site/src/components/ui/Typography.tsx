import { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ============================================ */
/* $10M TYPOGRAPHY SYSTEM                      */
/* Premium fluid typography components         */
/* Inspired by Stripe/Linear - No AI Slop      */
/* ============================================ */

interface TypographyProps {
  children: ReactNode;
  className?: string;
}

/**
 * HeroHeadline - Maximum impact headline
 * Usage: Main hero sections, landing page headers
 * Features: Fluid scaling (3rem → 5rem), tight tracking, bold weight
 */
export function HeroHeadline({ children, className = "" }: TypographyProps) {
  return (
    <h1
      className={cn(
        "text-hero-xl font-hero font-bold",
        "text-slate-900 tracking-tight leading-[1.1]",
        "text-balance", // Better text wrapping
        className
      )}
    >
      {children}
    </h1>
  );
}

/**
 * SectionHeadline - Section-level headlines
 * Usage: Major sections, feature blocks
 * Features: Fluid scaling (2.5rem → 4rem), balanced weight
 */
export function SectionHeadline({ children, className = "" }: TypographyProps) {
  return (
    <h2
      className={cn(
        "text-hero-lg font-heading font-bold",
        "text-slate-900 tracking-tight leading-[1.15]",
        "text-balance",
        className
      )}
    >
      {children}
    </h2>
  );
}

/**
 * Subheadline - Supporting headline text
 * Usage: Below main headlines, descriptive copy
 * Features: Fluid scaling, muted color, relaxed line height
 */
export function Subheadline({ children, className = "" }: TypographyProps) {
  return (
    <p
      className={cn(
        "text-body-xl text-slate-600",
        "leading-relaxed max-w-3xl",
        "text-balance",
        className
      )}
    >
      {children}
    </p>
  );
}

/**
 * Eyebrow - Small caps accent text
 * Usage: Above headlines, category labels
 * Features: Small caps, wide tracking, accent color
 */
export function Eyebrow({ children, className = "" }: TypographyProps) {
  return (
    <span
      className={cn(
        "text-xs sm:text-sm font-bold uppercase",
        "tracking-[0.2em] text-accent",
        "block mb-3",
        className
      )}
    >
      {children}
    </span>
  );
}

/**
 * GoldGradientText - Premium gold gradient effect
 * Usage: Highlight key phrases, CTAs, value propositions
 * Features: Animated gold gradient, high contrast
 */
export function GoldGradientText({ children, className = "" }: TypographyProps) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r from-gold via-gold-light to-gold",
        "bg-clip-text text-transparent",
        "font-bold",
        className
      )}
    >
      {children}
    </span>
  );
}

/**
 * CyanGradientText - Premium cyan/blue gradient effect
 * Usage: Tech features, innovation messaging
 * Features: Cyan to primary blue gradient, tech aesthetic
 */
export function CyanGradientText({ children, className = "" }: TypographyProps) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r from-accent via-primary to-accent",
        "bg-clip-text text-transparent",
        "font-bold",
        className
      )}
    >
      {children}
    </span>
  );
}

/**
 * PremiumBody - Enhanced body text
 * Usage: Important paragraphs, feature descriptions
 * Features: Fluid scaling, optimal line height for readability
 */
export function PremiumBody({ children, className = "" }: TypographyProps) {
  return (
    <p
      className={cn(
        "text-body-md text-slate-900",
        "leading-relaxed",
        className
      )}
    >
      {children}
    </p>
  );
}
