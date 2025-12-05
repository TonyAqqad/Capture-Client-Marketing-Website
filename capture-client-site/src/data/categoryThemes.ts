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
    badgeClass: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    accentGlow: 'shadow-[0_0_30px_rgba(251,191,36,0.3)]',
    timelineGradient: 'linear-gradient(180deg, #FCD34D 0%, #D97706 100%)',
    hoverGlow: 'hover:shadow-[0_0_40px_rgba(251,191,36,0.4)]',
    borderClass: 'border-amber-500/30',
  },

  // Automation: Purple theme - Innovation, power, automation
  automation: {
    id: 'automation',
    name: 'Automation & Workflows',
    primary: '#9333EA',
    gradient: 'from-purple-500 via-violet-600 to-purple-700',
    gradientFrom: '#A855F7',
    gradientTo: '#7C3AED',
    bgClass: 'bg-gradient-to-br from-purple-500/10 via-violet-600/10 to-purple-700/10',
    iconBg: 'bg-gradient-to-br from-purple-500 to-purple-700',
    badgeClass: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
    accentGlow: 'shadow-[0_0_30px_rgba(147,51,234,0.3)]',
    timelineGradient: 'linear-gradient(180deg, #A855F7 0%, #7C3AED 100%)',
    hoverGlow: 'hover:shadow-[0_0_40px_rgba(147,51,234,0.4)]',
    borderClass: 'border-purple-500/30',
  },

  // Scheduling: Green theme - Growth, time, efficiency
  scheduling: {
    id: 'scheduling',
    name: 'Scheduling & Calendar',
    primary: '#10B981',
    gradient: 'from-emerald-400 via-green-500 to-emerald-600',
    gradientFrom: '#34D399',
    gradientTo: '#059669',
    bgClass: 'bg-gradient-to-br from-emerald-400/10 via-green-500/10 to-emerald-600/10',
    iconBg: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
    badgeClass: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    accentGlow: 'shadow-[0_0_30px_rgba(16,185,129,0.3)]',
    timelineGradient: 'linear-gradient(180deg, #34D399 0%, #059669 100%)',
    hoverGlow: 'hover:shadow-[0_0_40px_rgba(16,185,129,0.4)]',
    borderClass: 'border-emerald-500/30',
  },

  // Phone Systems: Blue theme - Reliability, communication, trust
  'phone-systems': {
    id: 'phone-systems',
    name: 'Phone Systems',
    primary: '#3B82F6',
    gradient: 'from-blue-500 via-sky-600 to-blue-700',
    gradientFrom: '#3B82F6',
    gradientTo: '#1D4ED8',
    bgClass: 'bg-gradient-to-br from-blue-500/10 via-sky-600/10 to-blue-700/10',
    iconBg: 'bg-gradient-to-br from-blue-500 to-blue-700',
    badgeClass: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
    accentGlow: 'shadow-[0_0_30px_rgba(59,130,246,0.3)]',
    timelineGradient: 'linear-gradient(180deg, #3B82F6 0%, #1D4ED8 100%)',
    hoverGlow: 'hover:shadow-[0_0_40px_rgba(59,130,246,0.4)]',
    borderClass: 'border-blue-500/30',
  },

  // Home Services: Orange/Ember theme - Action, energy, service
  'home-services': {
    id: 'home-services',
    name: 'Home Services Software',
    primary: '#F97316',
    gradient: 'from-orange-500 via-amber-600 to-orange-700',
    gradientFrom: '#F97316',
    gradientTo: '#EA580C',
    bgClass: 'bg-gradient-to-br from-orange-500/10 via-amber-600/10 to-orange-700/10',
    iconBg: 'bg-gradient-to-br from-orange-500 to-orange-700',
    badgeClass: 'bg-orange-500/10 text-orange-300 border-orange-500/20',
    accentGlow: 'shadow-[0_0_30px_rgba(249,115,22,0.3)]',
    timelineGradient: 'linear-gradient(180deg, #F97316 0%, #EA580C 100%)',
    hoverGlow: 'hover:shadow-[0_0_40px_rgba(249,115,22,0.4)]',
    borderClass: 'border-orange-500/30',
  },

  // Legal: Indigo/Midnight theme - Professional, serious, authoritative
  legal: {
    id: 'legal',
    name: 'Legal Practice Management',
    primary: '#4F46E5',
    gradient: 'from-indigo-600 via-blue-700 to-indigo-800',
    gradientFrom: '#4F46E5',
    gradientTo: '#3730A3',
    bgClass: 'bg-gradient-to-br from-indigo-600/10 via-blue-700/10 to-indigo-800/10',
    iconBg: 'bg-gradient-to-br from-indigo-600 to-indigo-800',
    badgeClass: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
    accentGlow: 'shadow-[0_0_30px_rgba(79,70,229,0.3)]',
    timelineGradient: 'linear-gradient(180deg, #4F46E5 0%, #3730A3 100%)',
    hoverGlow: 'hover:shadow-[0_0_40px_rgba(79,70,229,0.4)]',
    borderClass: 'border-indigo-500/30',
  },

  // Healthcare: Rose/Pink theme - Caring, health, compassion
  healthcare: {
    id: 'healthcare',
    name: 'Healthcare & Medical',
    primary: '#EC4899',
    gradient: 'from-pink-500 via-rose-600 to-pink-700',
    gradientFrom: '#EC4899',
    gradientTo: '#BE185D',
    bgClass: 'bg-gradient-to-br from-pink-500/10 via-rose-600/10 to-pink-700/10',
    iconBg: 'bg-gradient-to-br from-pink-500 to-pink-700',
    badgeClass: 'bg-pink-500/10 text-pink-300 border-pink-500/20',
    accentGlow: 'shadow-[0_0_30px_rgba(236,72,153,0.3)]',
    timelineGradient: 'linear-gradient(180deg, #EC4899 0%, #BE185D 100%)',
    hoverGlow: 'hover:shadow-[0_0_40px_rgba(236,72,153,0.4)]',
    borderClass: 'border-pink-500/30',
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
    badgeClass: 'bg-teal-500/10 text-teal-300 border-teal-500/20',
    accentGlow: 'shadow-[0_0_30px_rgba(20,184,166,0.3)]',
    timelineGradient: 'linear-gradient(180deg, #14B8A6 0%, #0D9488 100%)',
    hoverGlow: 'hover:shadow-[0_0_40px_rgba(20,184,166,0.4)]',
    borderClass: 'border-teal-500/30',
  },

  // Marketing: Pink/Royal theme - Creative, dynamic, attention
  marketing: {
    id: 'marketing',
    name: 'Marketing & Analytics',
    primary: '#DB2777',
    gradient: 'from-pink-600 via-fuchsia-600 to-pink-700',
    gradientFrom: '#DB2777',
    gradientTo: '#BE185D',
    bgClass: 'bg-gradient-to-br from-pink-600/10 via-fuchsia-600/10 to-pink-700/10',
    iconBg: 'bg-gradient-to-br from-pink-600 to-pink-700',
    badgeClass: 'bg-pink-600/10 text-pink-300 border-pink-600/20',
    accentGlow: 'shadow-[0_0_30px_rgba(219,39,119,0.3)]',
    timelineGradient: 'linear-gradient(180deg, #DB2777 0%, #BE185D 100%)',
    hoverGlow: 'hover:shadow-[0_0_40px_rgba(219,39,119,0.4)]',
    borderClass: 'border-pink-600/30',
  },

  // Payments: Emerald/Forest theme - Secure, money, trust
  payments: {
    id: 'payments',
    name: 'Billing & Payments',
    primary: '#059669',
    gradient: 'from-emerald-600 via-green-700 to-emerald-800',
    gradientFrom: '#059669',
    gradientTo: '#047857',
    bgClass: 'bg-gradient-to-br from-emerald-600/10 via-green-700/10 to-emerald-800/10',
    iconBg: 'bg-gradient-to-br from-emerald-600 to-emerald-800',
    badgeClass: 'bg-emerald-600/10 text-emerald-300 border-emerald-600/20',
    accentGlow: 'shadow-[0_0_30px_rgba(5,150,105,0.3)]',
    timelineGradient: 'linear-gradient(180deg, #059669 0%, #047857 100%)',
    hoverGlow: 'hover:shadow-[0_0_40px_rgba(5,150,105,0.4)]',
    borderClass: 'border-emerald-600/30',
  },

  // All-in-One: Aurora rainbow theme - Comprehensive, complete, powerful
  'all-in-one': {
    id: 'all-in-one',
    name: 'All-in-One Platforms',
    primary: '#8B5CF6',
    gradient: 'from-violet-500 via-purple-600 to-fuchsia-600',
    gradientFrom: '#8B5CF6',
    gradientTo: '#C026D3',
    bgClass: 'bg-gradient-to-br from-violet-500/10 via-purple-600/10 to-fuchsia-600/10',
    iconBg: 'bg-gradient-to-br from-violet-500 to-fuchsia-600',
    badgeClass: 'bg-violet-500/10 text-violet-300 border-violet-500/20',
    accentGlow: 'shadow-[0_0_30px_rgba(139,92,246,0.3)]',
    timelineGradient: 'linear-gradient(180deg, #8B5CF6 0%, #C026D3 100%)',
    hoverGlow: 'hover:shadow-[0_0_40px_rgba(139,92,246,0.4)]',
    borderClass: 'border-violet-500/30',
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
