/**
 * Integration Logos Mapping
 *
 * This file contains URLs for all integration partner logos.
 * Primary source: Clearbit Logo API (https://logo.clearbit.com/)
 * Fallback: Official brand resources where available
 *
 * Logo sources are verified and cached via Clearbit's CDN.
 */

export interface IntegrationLogo {
  name: string;
  logoUrl: string;
  source: string;
  brandGuidelines?: string;
  alternativeUrls?: {
    svg?: string;
    png?: string;
    white?: string;
  };
}

export const integrationLogos: Record<string, IntegrationLogo> = {
  zapier: {
    name: "Zapier",
    logoUrl: "https://logo.clearbit.com/zapier.com",
    source: "Clearbit Logo API",
    brandGuidelines: "https://zapier.com/brand",
  },

  hubspot: {
    name: "HubSpot",
    logoUrl: "https://logo.clearbit.com/hubspot.com",
    source: "Clearbit Logo API",
    brandGuidelines: "https://www.hubspot.com/brand-kit",
  },

  salesforce: {
    name: "Salesforce",
    logoUrl: "https://logo.clearbit.com/salesforce.com",
    source: "Clearbit Logo API",
    brandGuidelines: "https://www.salesforce.com/company/news-press/media-resources/",
  },

  calendly: {
    name: "Calendly",
    logoUrl: "https://logo.clearbit.com/calendly.com",
    source: "Clearbit Logo API",
    brandGuidelines: "https://calendly.com/pages/press",
  },

  slack: {
    name: "Slack",
    logoUrl: "https://logo.clearbit.com/slack.com",
    source: "Clearbit Logo API",
    brandGuidelines: "https://slack.com/brand-guidelines",
    alternativeUrls: {
      svg: "https://a.slack-edge.com/38f0e7c/marketing/img/nav/logo.svg",
      white:
        "https://a.slack-edge.com/38f0e7c/marketing/img/nav/slack-salesforce-logo-nav-white.png",
      png: "https://a.slack-edge.com/38f0e7c/marketing/img/nav/slack-salesforce-logo-nav-black.png",
    },
  },

  servicetitan: {
    name: "ServiceTitan",
    logoUrl: "https://logo.clearbit.com/servicetitan.com",
    source: "Clearbit Logo API",
    brandGuidelines: "https://www.servicetitan.com/press",
  },

  ringcentral: {
    name: "RingCentral",
    logoUrl: "https://logo.clearbit.com/ringcentral.com",
    source: "Clearbit Logo API",
    brandGuidelines: "https://www.ringcentral.com/news-media/media-kit.html",
  },

  twilio: {
    name: "Twilio",
    logoUrl: "https://logo.clearbit.com/twilio.com",
    source: "Clearbit Logo API",
    brandGuidelines: "https://www.twilio.com/press/brand",
  },

  stripe: {
    name: "Stripe",
    logoUrl: "https://logo.clearbit.com/stripe.com",
    source: "Clearbit Logo API",
    brandGuidelines: "https://stripe.com/newsroom/brand-assets",
  },

  "google-calendar": {
    name: "Google Calendar",
    logoUrl: "https://logo.clearbit.com/google.com",
    source: "Clearbit Logo API",
    brandGuidelines: "https://about.google/brand-resource-center/",
  },

  "microsoft-teams": {
    name: "Microsoft Teams",
    logoUrl: "https://logo.clearbit.com/microsoft.com",
    source: "Clearbit Logo API",
    brandGuidelines: "https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks",
  },

  zoom: {
    name: "Zoom",
    logoUrl: "https://logo.clearbit.com/zoom.us",
    source: "Clearbit Logo API",
    brandGuidelines: "https://explore.zoom.us/en/brand-guidelines/",
  },

  mailchimp: {
    name: "Mailchimp",
    logoUrl: "https://logo.clearbit.com/mailchimp.com",
    source: "Clearbit Logo API",
    brandGuidelines: "https://mailchimp.com/about/brand-assets/",
  },

  activecampaign: {
    name: "ActiveCampaign",
    logoUrl: "https://logo.clearbit.com/activecampaign.com",
    source: "Clearbit Logo API",
    brandGuidelines: "https://www.activecampaign.com/brand-guidelines",
  },

  pipedrive: {
    name: "Pipedrive",
    logoUrl: "https://logo.clearbit.com/pipedrive.com",
    source: "Clearbit Logo API",
    brandGuidelines: "https://www.pipedrive.com/en/press",
  },

  zoho: {
    name: "Zoho",
    logoUrl: "https://logo.clearbit.com/zoho.com",
    source: "Clearbit Logo API",
    brandGuidelines: "https://www.zoho.com/aboutus/press.html",
  },

  clio: {
    name: "Clio",
    logoUrl: "https://logo.clearbit.com/clio.com",
    source: "Clearbit Logo API",
    brandGuidelines: "https://www.clio.com/company/press/",
  },

  "housecall-pro": {
    name: "Housecall Pro",
    logoUrl: "https://logo.clearbit.com/housecallpro.com",
    source: "Clearbit Logo API",
    brandGuidelines: "https://www.housecallpro.com/press/",
  },

  jobber: {
    name: "Jobber",
    logoUrl: "https://logo.clearbit.com/getjobber.com",
    source: "Clearbit Logo API",
    brandGuidelines: "https://getjobber.com/press/",
  },

  gohighlevel: {
    name: "GoHighLevel",
    logoUrl: "https://logo.clearbit.com/gohighlevel.com",
    source: "Clearbit Logo API",
  },

  keap: {
    name: "Keap",
    logoUrl: "https://logo.clearbit.com/keap.com",
    source: "Clearbit Logo API",
    brandGuidelines: "https://keap.com/about-us/press",
  },

  quickbooks: {
    name: "QuickBooks",
    logoUrl: "https://logo.clearbit.com/intuit.com",
    source: "Clearbit Logo API",
    brandGuidelines: "https://www.intuit.com/brand/",
  },

  nextiva: {
    name: "Nextiva",
    logoUrl: "https://logo.clearbit.com/nextiva.com",
    source: "Clearbit Logo API",
    brandGuidelines: "https://www.nextiva.com/about-us/media-kit.html",
  },

  dialpad: {
    name: "Dialpad",
    logoUrl: "https://logo.clearbit.com/dialpad.com",
    source: "Clearbit Logo API",
    brandGuidelines: "https://www.dialpad.com/newsroom/",
  },

  openphone: {
    name: "OpenPhone",
    logoUrl: "https://logo.clearbit.com/openphone.com",
    source: "Clearbit Logo API",
  },

  "acuity-scheduling": {
    name: "Acuity Scheduling",
    logoUrl: "https://logo.clearbit.com/acuityscheduling.com",
    source: "Clearbit Logo API",
  },

  setmore: {
    name: "Setmore",
    logoUrl: "https://logo.clearbit.com/setmore.com",
    source: "Clearbit Logo API",
  },

  callrail: {
    name: "CallRail",
    logoUrl: "https://logo.clearbit.com/callrail.com",
    source: "Clearbit Logo API",
    brandGuidelines: "https://www.callrail.com/press/",
  },

  "google-analytics": {
    name: "Google Analytics",
    logoUrl: "https://logo.clearbit.com/google.com",
    source: "Clearbit Logo API",
    brandGuidelines: "https://about.google/brand-resource-center/",
  },

  paypal: {
    name: "PayPal",
    logoUrl: "https://logo.clearbit.com/paypal.com",
    source: "Clearbit Logo API",
    brandGuidelines: "https://www.paypal.com/us/webapps/mpp/logo-center",
  },
};

/**
 * Get integration logo by key
 */
export function getIntegrationLogo(key: string): IntegrationLogo | undefined {
  return integrationLogos[key];
}

/**
 * Get all integration logos
 */
export function getAllIntegrationLogos(): IntegrationLogo[] {
  return Object.values(integrationLogos);
}

/**
 * Get integration logo URL with fallback
 */
export function getIntegrationLogoUrl(key: string): string {
  const logo = integrationLogos[key];
  if (logo) {
    return logo.logoUrl;
  }

  // Fallback to generic domain-based Clearbit logo
  const domain = key.replace(/-/g, "");
  return `https://logo.clearbit.com/${domain}.com`;
}

/**
 * Integration categories for filtering
 */
export const integrationCategories = {
  automation: ["zapier"],
  crm: ["hubspot", "salesforce", "pipedrive", "zoho", "keap"],
  scheduling: ["calendly", "acuity-scheduling", "setmore", "google-calendar"],
  communication: [
    "slack",
    "microsoft-teams",
    "zoom",
    "ringcentral",
    "twilio",
    "nextiva",
    "dialpad",
    "openphone",
  ],
  fieldService: ["servicetitan", "housecall-pro", "jobber"],
  payments: ["stripe", "quickbooks", "paypal"],
  marketing: ["mailchimp", "activecampaign", "gohighlevel"],
  legal: ["clio"],
  analytics: ["google-analytics", "callrail"],
} as const;

export type IntegrationCategory = keyof typeof integrationCategories;

/**
 * Get integrations by category
 */
export function getIntegrationsByCategory(category: IntegrationCategory): IntegrationLogo[] {
  const keys = integrationCategories[category];
  return keys.map((key) => integrationLogos[key]).filter(Boolean);
}
