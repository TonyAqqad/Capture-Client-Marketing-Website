/**
 * Integration Partners Data
 *
 * Static data for the IntegrationPartners CRO component.
 * This file follows the pattern established by src/data/integrations.ts
 *
 * See .claude/rules/60-component-structure.md for data extraction guidelines.
 */

// ============================================================================
// TYPES
// ============================================================================

export interface IntegrationPartner {
  name: string;
  logo: string;
  description: string;
  website: string;
  category: string;
}

export type PartnerCategory =
  | "All"
  | "Payments"
  | "Communication"
  | "Email Marketing"
  | "Calendar"
  | "Video"
  | "Social Media"
  | "Advertising"
  | "Automation"
  | "CRM"
  | "Home Services"
  | "E-commerce"
  | "Accounting"
  | "Forms"
  | "Local SEO"
  | "Analytics"
  | "Website"
  | "Marketing";

// ============================================================================
// SLUG MAPPING
// Maps partner display names to their internal integration page slugs
// Empty string means no internal page exists yet
// ============================================================================

export const partnerSlugMap: Record<string, string> = {
  "Excel Payments": "excel-payments",
  "PayPal": "paypal",
  "Square": "square-appointments",
  "Authorize.Net": "",
  "Twilio": "twilio",
  "Plivo": "",
  "SignalWire": "",
  "MessageBird": "",
  "Mailgun": "",
  "SendGrid": "",
  "Mailchimp": "mailchimp",
  "ActiveCampaign": "activecampaign",
  "ConvertKit": "",
  "Constant Contact": "",
  "Google Calendar": "google-calendar",
  "Calendly": "calendly",
  "Outlook": "outlook-calendar",
  "Zoom": "",
  "Facebook": "facebook-ads",
  "Instagram": "",
  "TikTok": "",
  "LinkedIn": "",
  "Google Ads": "google-ads",
  "Facebook Ads": "facebook-ads",
  "Zapier": "zapier",
  "Make": "make",
  "Salesforce": "salesforce",
  "HubSpot": "hubspot",
  "Pipedrive": "pipedrive",
  "Zoho CRM": "zoho-crm",
  "Follow Up Boss": "follow-up-boss",
  "ServiceTitan": "servicetitan",
  "Jobber": "jobber",
  "Shopify": "",
  "WooCommerce": "",
  "QuickBooks": "quickbooks-online",
  "Typeform": "",
  "JotForm": "",
  "Google Business": "",
  "Yext": "",
  "Google Analytics": "google-analytics",
  "WordPress": "",
  "ClickFunnels": "",
};

// ============================================================================
// CATEGORIES
// ============================================================================

export const integrationPartnerCategories: PartnerCategory[] = [
  "All",
  "Payments",
  "Communication",
  "Email Marketing",
  "Calendar",
  "Social Media",
  "Advertising",
  "Automation",
  "CRM",
  "Home Services",
  "E-commerce",
  "Analytics",
];

// ============================================================================
// PARTNER DATA
// ============================================================================

export const integrationPartners: IntegrationPartner[] = [
  // Payments
  {
    name: "Excel Payments",
    logo: "/images/integrations/excel-payments.png",
    description: "Merchant Services & Payment Processing",
    website: "https://excelpayments.com",
    category: "Payments",
  },
  {
    name: "PayPal",
    logo: "/images/integrations/paypal.svg",
    description: "Global Payment Solutions",
    website: "https://paypal.com",
    category: "Payments",
  },
  {
    name: "Square",
    logo: "/images/integrations/square-appointments.svg",
    description: "Point of Sale & Payments",
    website: "https://squareup.com",
    category: "Payments",
  },
  {
    name: "Authorize.Net",
    logo: "/images/integrations/authorize-net.svg",
    description: "Payment Gateway",
    website: "https://authorize.net",
    category: "Payments",
  },

  // Communication
  {
    name: "Twilio",
    logo: "/images/integrations/twilio.svg",
    description: "SMS & Voice Communication",
    website: "https://twilio.com",
    category: "Communication",
  },
  {
    name: "Plivo",
    logo: "/images/integrations/plivo.svg",
    description: "Global SMS & Voice Platform",
    website: "https://plivo.com",
    category: "Communication",
  },
  {
    name: "SignalWire",
    logo: "/images/integrations/signalwire.svg",
    description: "Cloud Communications",
    website: "https://signalwire.com",
    category: "Communication",
  },
  {
    name: "MessageBird",
    logo: "/images/integrations/messagebird.svg",
    description: "Omnichannel Messaging",
    website: "https://messagebird.com",
    category: "Communication",
  },

  // Email Marketing
  {
    name: "Mailgun",
    logo: "/images/integrations/mailgun.svg",
    description: "Transactional Email Service",
    website: "https://mailgun.com",
    category: "Email Marketing",
  },
  {
    name: "SendGrid",
    logo: "/images/integrations/sendgrid.svg",
    description: "Email Delivery Platform",
    website: "https://sendgrid.com",
    category: "Email Marketing",
  },
  {
    name: "Mailchimp",
    logo: "/images/integrations/mailchimp.svg",
    description: "Marketing Automation",
    website: "https://mailchimp.com",
    category: "Email Marketing",
  },
  {
    name: "ActiveCampaign",
    logo: "/images/integrations/activecampaign.svg",
    description: "Email & Marketing Automation",
    website: "https://activecampaign.com",
    category: "Email Marketing",
  },
  {
    name: "ConvertKit",
    logo: "/images/integrations/convertkit.svg",
    description: "Email Marketing for Creators",
    website: "https://convertkit.com",
    category: "Email Marketing",
  },
  {
    name: "Constant Contact",
    logo: "/images/integrations/constant-contact.svg",
    description: "Email & Event Marketing",
    website: "https://constantcontact.com",
    category: "Email Marketing",
  },

  // Calendar & Scheduling
  {
    name: "Google Calendar",
    logo: "/images/integrations/google-calendar.svg",
    description: "Calendar Sync & Scheduling",
    website: "https://calendar.google.com",
    category: "Calendar",
  },
  {
    name: "Calendly",
    logo: "/images/integrations/calendly.svg",
    description: "Automated Scheduling",
    website: "https://calendly.com",
    category: "Calendar",
  },
  {
    name: "Outlook",
    logo: "/images/integrations/outlook-calendar.png",
    description: "Microsoft Calendar Integration",
    website: "https://outlook.com",
    category: "Calendar",
  },

  // Video Conferencing
  {
    name: "Zoom",
    logo: "/images/integrations/zoom.svg",
    description: "Video Meetings & Webinars",
    website: "https://zoom.us",
    category: "Video",
  },

  // Social Media
  {
    name: "Facebook",
    logo: "/images/integrations/facebook-ads.svg",
    description: "Social Media Management",
    website: "https://facebook.com",
    category: "Social Media",
  },
  {
    name: "Instagram",
    logo: "/images/integrations/instagram.svg",
    description: "Visual Content Platform",
    website: "https://instagram.com",
    category: "Social Media",
  },
  {
    name: "TikTok",
    logo: "/images/integrations/tiktok.svg",
    description: "Short-Form Video Marketing",
    website: "https://tiktok.com",
    category: "Social Media",
  },
  {
    name: "LinkedIn",
    logo: "/images/integrations/linkedin.svg",
    description: "Professional Networking",
    website: "https://linkedin.com",
    category: "Social Media",
  },

  // Advertising
  {
    name: "Google Ads",
    logo: "/images/integrations/google-ads.svg",
    description: "Search & Display Advertising",
    website: "https://ads.google.com",
    category: "Advertising",
  },
  {
    name: "Facebook Ads",
    logo: "/images/integrations/facebook-ads.svg",
    description: "Social Media Advertising",
    website: "https://facebook.com/business/ads",
    category: "Advertising",
  },

  // Automation
  {
    name: "Zapier",
    logo: "/images/integrations/zapier.svg",
    description: "Connect 5,000+ Apps",
    website: "https://zapier.com",
    category: "Automation",
  },
  {
    name: "Make",
    logo: "/images/integrations/make.svg",
    description: "Visual Automation Platform",
    website: "https://make.com",
    category: "Automation",
  },

  // CRM
  {
    name: "Salesforce",
    logo: "/images/integrations/salesforce.svg",
    description: "Enterprise CRM Platform",
    website: "https://salesforce.com",
    category: "CRM",
  },
  {
    name: "HubSpot",
    logo: "/images/integrations/hubspot.svg",
    description: "Inbound Marketing & Sales",
    website: "https://hubspot.com",
    category: "CRM",
  },
  {
    name: "Pipedrive",
    logo: "/images/integrations/pipedrive.svg",
    description: "Sales Pipeline Management",
    website: "https://pipedrive.com",
    category: "CRM",
  },
  {
    name: "Zoho CRM",
    logo: "/images/integrations/zoho-crm.svg",
    description: "Affordable CRM for Small Business",
    website: "https://www.zoho.com/crm",
    category: "CRM",
  },
  {
    name: "Follow Up Boss",
    logo: "/images/integrations/follow-up-boss.png",
    description: "Real Estate CRM",
    website: "https://www.followupboss.com",
    category: "CRM",
  },

  // Home Services
  {
    name: "ServiceTitan",
    logo: "/images/integrations/servicetitan.svg",
    description: "HVAC & Plumbing Software",
    website: "https://www.servicetitan.com",
    category: "Home Services",
  },
  {
    name: "Jobber",
    logo: "/images/integrations/jobber.svg",
    description: "Field Service Management",
    website: "https://getjobber.com",
    category: "Home Services",
  },

  // E-commerce
  {
    name: "Shopify",
    logo: "/images/integrations/shopify.svg",
    description: "E-commerce Platform",
    website: "https://shopify.com",
    category: "E-commerce",
  },
  {
    name: "WooCommerce",
    logo: "/images/integrations/woocommerce.svg",
    description: "WordPress E-commerce",
    website: "https://woocommerce.com",
    category: "E-commerce",
  },

  // Accounting
  {
    name: "QuickBooks",
    logo: "/images/integrations/quickbooks-online.svg",
    description: "Accounting & Invoicing",
    website: "https://quickbooks.intuit.com",
    category: "Accounting",
  },

  // Forms
  {
    name: "Typeform",
    logo: "/images/integrations/typeform.svg",
    description: "Interactive Forms",
    website: "https://typeform.com",
    category: "Forms",
  },
  {
    name: "JotForm",
    logo: "/images/integrations/jotform.svg",
    description: "Online Form Builder",
    website: "https://jotform.com",
    category: "Forms",
  },

  // Local SEO
  {
    name: "Google Business",
    logo: "/images/integrations/google-business.svg",
    description: "Local Business Listings",
    website: "https://business.google.com",
    category: "Local SEO",
  },
  {
    name: "Yext",
    logo: "/images/integrations/yext.svg",
    description: "Business Listings Management",
    website: "https://yext.com",
    category: "Local SEO",
  },

  // Analytics
  {
    name: "Google Analytics",
    logo: "/images/integrations/google-analytics.svg",
    description: "Website Analytics Platform",
    website: "https://analytics.google.com",
    category: "Analytics",
  },

  // Website Builders
  {
    name: "WordPress",
    logo: "/images/integrations/wordpress.svg",
    description: "Content Management System",
    website: "https://wordpress.com",
    category: "Website",
  },
  {
    name: "ClickFunnels",
    logo: "/images/integrations/clickfunnels.svg",
    description: "Sales Funnel Builder",
    website: "https://clickfunnels.com",
    category: "Marketing",
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get partners filtered by category
 */
export function getPartnersByCategory(category: string): IntegrationPartner[] {
  if (category === "All") return integrationPartners;
  return integrationPartners.filter((p) => p.category === category);
}

/**
 * Get a partner by name
 */
export function getPartnerByName(name: string): IntegrationPartner | undefined {
  return integrationPartners.find((p) => p.name === name);
}

/**
 * Get the internal integration slug for a partner
 * Returns empty string if no internal page exists
 */
export function getPartnerSlug(name: string): string {
  return partnerSlugMap[name] || "";
}

/**
 * Get the href for a partner link
 * Returns internal integration page if exists, otherwise /integrations
 */
export function getPartnerHref(name: string): string {
  const slug = getPartnerSlug(name);
  return slug ? `/integrations/${slug}` : "/integrations";
}
