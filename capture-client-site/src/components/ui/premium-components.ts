/**
 * Premium UI Components for Integration and Industry Pages
 *
 * Anti-AI-Slop Design System
 * - Distinctive typography with Bricolage Grotesque display font
 * - Gold (#D4AF37) and Cyan (#00C9FF) accent colors (NO purple gradients)
 * - Asymmetric layouts with intentional whitespace
 * - Subtle, professional animations (200-300ms transitions)
 * - Glassmorphic effects done right (not overdone)
 *
 * @see PREMIUM_DESIGN_SYSTEM.md for full guidelines
 */

export { PremiumGlassCard } from "./PremiumGlassCard";
export { SectionHeader } from "./SectionHeader";
export { FeatureGrid } from "./FeatureGrid";
export type { Feature } from "./FeatureGrid";
export { StatCard } from "./StatCard";
export { IntegrationShowcase } from "./IntegrationShowcase";
export type { Integration } from "./IntegrationShowcase";
export { IndustryBadge } from "./IndustryBadge";

// Re-export existing components that fit the premium design system
export { GlassCard } from "./GlassCard";
export { Badge } from "./Badge";
export { Button } from "./Button";
// MagneticButton removed - causes Turbopack mobile crashes (framer-motion SSR issue)
// export { MagneticButton } from "./MagneticButton";
export { GlowCard } from "./GlowCard";
export { FeatureCard } from "./FeatureCard";
