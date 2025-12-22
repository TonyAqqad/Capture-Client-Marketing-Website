/**
 * Capture Client - Category Theming System
 * Centralized theme definitions for all 11 integration categories
 * Provides colors, gradients, and visual styling for premium UI consistency
 */

export interface CategoryTheme {
  id: string;
  name: string;
  // Core Colors
  primary: string;         // Main hex color
  gradient: string;        // Tailwind gradient classes
  gradientFrom: string;    // From color (hex)
  gradientTo: string;      // To color (hex)
  // Visual Elements
  bgClass: string;         // Background gradient class
  iconBg: string;          // Icon background class
  badgeClass: string;      // Badge styling class
  accentGlow: string;      // Glow shadow class
  // Timeline & UI
  timelineGradient: string; // CSS gradient for timeline
  hoverGlow: string;       // Hover state glow
  borderClass: string;     // Border color class
}

/**
 * All 11 integration category themes
 * Each theme provides a complete visual identity
 */
export const categoryThemes: Record<string, CategoryTheme> = {
  // CRM: Gold theme - Trust, relationships, premium
  crm: {
    id: 'crm',
    name: 'CRM Systems',
    primary: '#D4AF37',
    gradient: 'from-amber-400 via-yellow-500 to-amber-600',
    gradientFrom: '#FCD34D',
    gradientTo: '#D97706',
    bgClass: 'bg-gradient-to-br from-amber-400/10 via-yellow-500/10 to-amber-600/10',
    iconBg: 'bg-gradient-to-br from-amber-400 to-amber-600',
    badgeClass: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    accentGlow: 'shadow-[0_0_30px_rgba(251,191,36,0.3)]',
    timelineGradient: 'linear-gradient(180deg, #FCD34D 0%, #D97706 100%)',
    hoverGlow: 'hover:shadow-[0_0_40px_rgba(251,191,36,0.4)]',
    borderClass: 'border-amber-500/30',
  },

  // Automation: Blue theme - Innovation, power, automation
  automation: {
    id: 'automation',
    name: 'Automation & Workflows',
    primary: '#3B82F6',
    gradient: 'from-blue-500 via-cyan-500 to-blue-600',
    gradientFrom: '#3B82F6',
    gradientTo: '#0EA5E9',
    bgClass: 'bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-blue-600/10',
    iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600',
    badgeClass: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    accentGlow: 'shadow-[0_0_30px_rgba(59,130,246,0.3)]',
    timelineGradient: 'linear-gradient(180deg, #3B82F6 0%, #0EA5E9 100%)',
    hoverGlow: 'hover:shadow-[0_0_40px_rgba(59,130,246,0.4)]',
    borderClass: 'border-blue-500/30',
  },

  // Scheduling: Cyan theme - Growth, time, efficiency
  scheduling: {
    id: 'scheduling',
    name: 'Scheduling & Calendar',
    primary: '#00C9FF',
    gradient: 'from-cyan-400 via-cyan-500 to-cyan-600',
    gradientFrom: '#00C9FF',
    gradientTo: '#00C9FF',
    bgClass: 'bg-gradient-to-br from-cyan-400/10 via-cyan-500/10 to-cyan-600/10',
    iconBg: 'bg-gradient-to-br from-cyan-400 to-cyan-600',
    badgeClass: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20',
    accentGlow: 'shadow-[0_0_30px_rgba(0,201,255,0.3)]',
    timelineGradient: 'linear-gradient(180deg, #00C9FF 0%, #00C9FF 100%)',
    hoverGlow: 'hover:shadow-[0_0_40px_rgba(0,201,255,0.4)]',
    borderClass: 'border-cyan-500/30',
  },

  // Phone Systems: Blue theme - Reliability, communication, trust
  'phone-systems': {
    id: 'phone-systems',
    name: 'Phone Systems',
    primary: '#4A69E2',
    gradient: 'from-blue-500 via-sky-600 to-blue-700',
    gradientFrom: '#4A69E2',
    gradientTo: '#4A69E2',
    bgClass: 'bg-gradient-to-br from-blue-500/10 via-sky-600/10 to-blue-700/10',
    iconBg: 'bg-gradient-to-br from-blue-500 to-blue-700',
    badgeClass: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    accentGlow: 'shadow-[0_0_30px_rgba(74,105,226,0.3)]',
    timelineGradient: 'linear-gradient(180deg, #4A69E2 0%, #4A69E2 100%)',
    hoverGlow: 'hover:shadow-[0_0_40px_rgba(74,105,226,0.4)]',
    borderClass: 'border-blue-500/30',
  },

  // Home Services: Gold theme - Action, energy, service
  'home-services': {
    id: 'home-services',
    name: 'Home Services Software',
    primary: '#D4AF37',
    gradient: 'from-amber-500 via-amber-600 to-amber-700',
    gradientFrom: '#D4AF37',
    gradientTo: '#B8860B',
    bgClass: 'bg-gradient-to-br from-amber-500/10 via-amber-600/10 to-amber-700/10',
    iconBg: 'bg-gradient-to-br from-amber-500 to-amber-700',
    badgeClass: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    accentGlow: 'shadow-[0_0_30px_rgba(212,175,55,0.3)]',
    timelineGradient: 'linear-gradient(180deg, #D4AF37 0%, #B8860B 100%)',
    hoverGlow: 'hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]',
    borderClass: 'border-amber-500/30',
  },

  // Legal: Blue theme - Professional, serious, authoritative
  legal: {
    id: 'legal',
    name: 'Legal Practice Management',
    primary: '#2563EB',
    gradient: 'from-blue-600 via-blue-700 to-blue-800',
    gradientFrom: '#2563EB',
    gradientTo: '#1E40AF',
    bgClass: 'bg-gradient-to-br from-blue-600/10 via-blue-700/10 to-blue-800/10',
    iconBg: 'bg-gradient-to-br from-blue-600 to-blue-800',
    badgeClass: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    accentGlow: 'shadow-[0_0_30px_rgba(37,99,235,0.3)]',
    timelineGradient: 'linear-gradient(180deg, #2563EB 0%, #1E40AF 100%)',
    hoverGlow: 'hover:shadow-[0_0_40px_rgba(37,99,235,0.4)]',
    borderClass: 'border-blue-500/30',
  },

  // Healthcare: Purple theme - Caring, health, compassion
  healthcare: {
    id: 'healthcare',
    name: 'Healthcare & Medical',
    primary: '#8B5CF6',
    gradient: 'from-purple-500 via-purple-600 to-purple-700',
    gradientFrom: '#8B5CF6',
    gradientTo: '#8B5CF6',
    bgClass: 'bg-gradient-to-br from-purple-500/10 via-purple-600/10 to-purple-700/10',
    iconBg: 'bg-gradient-to-br from-purple-500 to-purple-700',
    badgeClass: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
    accentGlow: 'shadow-[0_0_30px_rgba(139,92,246,0.3)]',
    timelineGradient: 'linear-gradient(180deg, #8B5CF6 0%, #8B5CF6 100%)',
    hoverGlow: 'hover:shadow-[0_0_40px_rgba(139,92,246,0.4)]',
    borderClass: 'border-purple-500/30',
  },

  // Real Estate: Teal/Ocean theme - Stability, property, growth
  'real-estate': {
    id: 'real-estate',
    name: 'Real Estate',
    primary: '#14B8A6',
    gradient: 'from-teal-500 via-cyan-600 to-teal-700',
    gradientFrom: '#14B8A6',
    gradientTo: '#0D9488',
    bgClass: 'bg-gradient-to-br from-teal-500/10 via-cyan-600/10 to-teal-700/10',
    iconBg: 'bg-gradient-to-br from-teal-500 to-teal-700',
    badgeClass: 'bg-teal-500/10 text-teal-600 border-teal-500/20',
    accentGlow: 'shadow-[0_0_30px_rgba(20,184,166,0.3)]',
    timelineGradient: 'linear-gradient(180deg, #14B8A6 0%, #0D9488 100%)',
    hoverGlow: 'hover:shadow-[0_0_40px_rgba(20,184,166,0.4)]',
    borderClass: 'border-teal-500/30',
  },

  // Marketing: Purple theme - Creative, dynamic, attention
  marketing: {
    id: 'marketing',
    name: 'Marketing & Analytics',
    primary: '#8B5CF6',
    gradient: 'from-purple-600 via-purple-600 to-purple-700',
    gradientFrom: '#8B5CF6',
    gradientTo: '#8B5CF6',
    bgClass: 'bg-gradient-to-br from-purple-600/10 via-purple-600/10 to-purple-700/10',
    iconBg: 'bg-gradient-to-br from-purple-600 to-purple-700',
    badgeClass: 'bg-purple-600/10 text-purple-600 border-purple-600/20',
    accentGlow: 'shadow-[0_0_30px_rgba(139,92,246,0.3)]',
    timelineGradient: 'linear-gradient(180deg, #8B5CF6 0%, #8B5CF6 100%)',
    hoverGlow: 'hover:shadow-[0_0_40px_rgba(139,92,246,0.4)]',
    borderClass: 'border-purple-600/30',
  },

  // Payments: Cyan theme - Secure, money, trust
  payments: {
    id: 'payments',
    name: 'Billing & Payments',
    primary: '#00C9FF',
    gradient: 'from-cyan-600 via-cyan-700 to-cyan-800',
    gradientFrom: '#00C9FF',
    gradientTo: '#00C9FF',
    bgClass: 'bg-gradient-to-br from-cyan-600/10 via-cyan-700/10 to-cyan-800/10',
    iconBg: 'bg-gradient-to-br from-cyan-600 to-cyan-800',
    badgeClass: 'bg-cyan-600/10 text-cyan-600 border-cyan-600/20',
    accentGlow: 'shadow-[0_0_30px_rgba(0,201,255,0.3)]',
    timelineGradient: 'linear-gradient(180deg, #00C9FF 0%, #00C9FF 100%)',
    hoverGlow: 'hover:shadow-[0_0_40px_rgba(0,201,255,0.4)]',
    borderClass: 'border-cyan-600/30',
  },

  // All-in-One: Blue/cyan rainbow theme - Comprehensive, complete, powerful
  'all-in-one': {
    id: 'all-in-one',
    name: 'All-in-One Platforms',
    primary: '#3B82F6',
    gradient: 'from-blue-500 via-cyan-500 to-blue-600',
    gradientFrom: '#3B82F6',
    gradientTo: '#0EA5E9',
    bgClass: 'bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-blue-600/10',
    iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600',
    badgeClass: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    accentGlow: 'shadow-[0_0_30px_rgba(59,130,246,0.3)]',
    timelineGradient: 'linear-gradient(180deg, #3B82F6 0%, #0EA5E9 100%)',
    hoverGlow: 'hover:shadow-[0_0_40px_rgba(59,130,246,0.4)]',
    borderClass: 'border-blue-500/30',
  },
};

/**
 * Get theme by category ID
 * @param categoryId - The category identifier
 * @returns CategoryTheme object or default gold theme
 */
export function getThemeByCategory(categoryId: string): CategoryTheme {
  return categoryThemes[categoryId] || categoryThemes.crm;
}

/**
 * Get Tailwind gradient classes for category
 * @param categoryId - The category identifier
 * @returns Tailwind gradient class string
 */
export function getGradientForCategory(categoryId: string): string {
  const theme = getThemeByCategory(categoryId);
  return theme.gradient;
}

/**
 * Get CSS linear gradient for timeline/progress elements
 * @param categoryId - The category identifier
 * @returns CSS gradient string
 */
export function getTimelineGradient(categoryId: string): string {
  const theme = getThemeByCategory(categoryId);
  return theme.timelineGradient;
}

/**
 * Get primary hex color for category
 * @param categoryId - The category identifier
 * @returns Hex color string
 */
export function getPrimaryColor(categoryId: string): string {
  const theme = getThemeByCategory(categoryId);
  return theme.primary;
}

/**
 * Get icon background class for category
 * @param categoryId - The category identifier
 * @returns Tailwind class string for icon backgrounds
 */
export function getIconBgClass(categoryId: string): string {
  const theme = getThemeByCategory(categoryId);
  return theme.iconBg;
}

/**
 * Get badge styling class for category
 * @param categoryId - The category identifier
 * @returns Tailwind class string for badges
 */
export function getBadgeClass(categoryId: string): string {
  const theme = getThemeByCategory(categoryId);
  return theme.badgeClass;
}

/**
 * Get accent glow effect for category
 * @param categoryId - The category identifier
 * @returns Tailwind shadow class string
 */
export function getAccentGlow(categoryId: string): string {
  const theme = getThemeByCategory(categoryId);
  return theme.accentGlow;
}

/**
 * Get hover glow effect for category
 * @param categoryId - The category identifier
 * @returns Tailwind hover shadow class string
 */
export function getHoverGlow(categoryId: string): string {
  const theme = getThemeByCategory(categoryId);
  return theme.hoverGlow;
}

/**
 * Get all available category IDs
 * @returns Array of category ID strings
 */
export function getAllCategoryIds(): string[] {
  return Object.keys(categoryThemes);
}

/**
 * Check if category theme exists
 * @param categoryId - The category identifier
 * @returns Boolean indicating if theme exists
 */
export function hasTheme(categoryId: string): boolean {
  return categoryId in categoryThemes;
}

// Export all themes for direct access if needed
export default categoryThemes;
