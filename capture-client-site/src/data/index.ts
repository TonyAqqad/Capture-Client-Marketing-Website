/**
 * Capture Client - Data Exports
 * Central export point for all data modules
 */

// Category Theming System
export {
  categoryThemes,
  getThemeByCategory,
  getGradientForCategory,
  getTimelineGradient,
  getPrimaryColor,
  getIconBgClass,
  getBadgeClass,
  getAccentGlow,
  getHoverGlow,
  getAllCategoryIds,
  hasTheme,
  type CategoryTheme,
} from "./categoryThemes";

// Integrations
export {
  integrationCategories,
  integrations,
  getIntegrationBySlug,
  getIntegrationsByCategory,
  getPopularIntegrations,
  getIntegrationsByIndustry,
  searchIntegrations,
  getCategoryById,
  getIntegrationStats,
  type Integration,
  type IntegrationCategory,
} from "./integrations";

// Industries
export {
  INDUSTRIES,
  getIndustryBySlug,
  getIndustriesByCategory,
  getCategories,
  searchIndustries,
  type Industry,
} from "./industries";

// Integration Logos
export { integrationLogos, type IntegrationLogo } from "./integration-logos";

// Demo Transcripts
export { demoTranscripts, type DemoTranscript } from "./demo-transcripts";
