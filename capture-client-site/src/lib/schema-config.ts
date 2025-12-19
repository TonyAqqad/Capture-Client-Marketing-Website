/**
 * Global Schema Configuration for Capture Client
 *
 * This file contains reusable JSON-LD schema definitions that can be imported
 * across the site for consistent structured data implementation.
 *
 * Schema Types Implemented:
 * - Organization: Core business entity
 * - LocalBusiness: Local SEO optimization
 * - WebSite: Site-wide schema
 * - Service: Individual service offerings
 * - BreadcrumbList: Navigation hierarchy
 */

// Base URL for the website
export const SITE_URL = "https://captureclient.com";

// Business Information
export const BUSINESS_INFO = {
  name: "Capture Client",
  legalName: "Capture Client LLC",
  telephone: "+1-865-346-6111",
  email: "team@captureclient.com",
  foundingDate: "2023",
  priceRange: "$$",
  address: {
    locality: "Knoxville",
    region: "TN",
    country: "US",
  },
  geo: {
    latitude: 35.9606,
    longitude: -83.9207,
  },
  socialProfiles: [
    "https://www.facebook.com/captureclient",
    "https://www.linkedin.com/company/captureclient",
    "https://twitter.com/captureclient",
  ],
};

// Organization Schema - Core business entity
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: BUSINESS_INFO.name,
  legalName: BUSINESS_INFO.legalName,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/logo-full.svg`,
    width: 512,
    height: 512,
  },
  description:
    "AI-powered marketing automation platform helping small businesses capture more clients with voice AI agents, Google Ads, and Facebook Ads management.",
  foundingDate: BUSINESS_INFO.foundingDate,
  telephone: BUSINESS_INFO.telephone,
  email: BUSINESS_INFO.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: BUSINESS_INFO.address.locality,
    addressRegion: BUSINESS_INFO.address.region,
    addressCountry: BUSINESS_INFO.address.country,
  },
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  sameAs: BUSINESS_INFO.socialProfiles,
  knowsAbout: [
    "AI Voice Agents",
    "Lead Generation",
    "Google Ads Management",
    "Facebook Ads Management",
    "Marketing Automation",
    "CRM Software",
  ],
  slogan: "Automate leads. Capture clients.",
};

// LocalBusiness Schema - For local SEO
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#localbusiness`,
  name: BUSINESS_INFO.name,
  image: `${SITE_URL}/logo-full.svg`,
  telephone: BUSINESS_INFO.telephone,
  email: BUSINESS_INFO.email,
  url: SITE_URL,
  address: {
    "@type": "PostalAddress",
    addressLocality: BUSINESS_INFO.address.locality,
    addressRegion: BUSINESS_INFO.address.region,
    addressCountry: BUSINESS_INFO.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: BUSINESS_INFO.geo.latitude,
    longitude: BUSINESS_INFO.geo.longitude,
  },
  priceRange: BUSINESS_INFO.priceRange,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  // aggregateRating removed until real reviews exist
  // TODO: Add real reviews from Google Business Profile once established
};

// WebSite Schema - Site-wide definition
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: BUSINESS_INFO.name,
  description:
    "AI-powered marketing automation platform for small businesses",
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
  inLanguage: "en-US",
};

// Service Schemas - Individual service offerings
export const services = {
  voiceAI: {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/services/voice-ai/#service`,
    name: "AI Voice Agents",
    description:
      "24/7 AI-powered voice agents that answer calls, qualify leads, and book appointments automatically for small businesses.",
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
    serviceType: "AI Voice Agent Service",
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    offers: {
      "@type": "Offer",
      price: "950",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "950",
        priceCurrency: "USD",
        unitText: "month",
      },
    },
  },
  googleAds: {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/services/google-ads/#service`,
    name: "Google Ads Management",
    description:
      "ROI-focused Google Ads campaign management that captures high-intent customers when they're ready to buy.",
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
    serviceType: "PPC Advertising Service",
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
  },
  facebookAds: {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/services/facebook-ads/#service`,
    name: "Facebook Ads Management",
    description:
      "Targeted Facebook and Instagram advertising campaigns designed to generate qualified leads for local service businesses.",
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
    serviceType: "Social Media Advertising Service",
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
  },
  leadGeneration: {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/services/lead-generation/#service`,
    name: "Lead Generation Services",
    description:
      "Comprehensive lead generation services combining AI voice agents, paid advertising, and CRM automation.",
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
    serviceType: "Lead Generation Service",
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
  },
};

// Helper function to generate breadcrumb schema
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// Helper function to generate WebPage schema
export function generateWebPageSchema(options: {
  url: string;
  name: string;
  description: string;
  type?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
}) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": options.type || "WebPage",
    "@id": `${options.url}/#webpage`,
    url: options.url,
    name: options.name,
    description: options.description,
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    about: {
      "@id": `${SITE_URL}/#organization`,
    },
    datePublished: "2023-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    inLanguage: "en-US",
  };

  if (options.breadcrumbs) {
    schema.breadcrumb = generateBreadcrumbSchema(options.breadcrumbs);
  }

  return schema;
}

// Helper function to generate Service schema for location pages
export function generateLocationServiceSchema(options: {
  serviceName: string;
  serviceType: string;
  location: string;
  state: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${options.serviceName} in ${options.location}, ${options.state}`,
    description: options.description,
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
    serviceType: options.serviceType,
    areaServed: {
      "@type": "City",
      name: options.location,
      containedInPlace: {
        "@type": "State",
        name: options.state,
      },
    },
  };
}

// Helper function to generate FAQ schema
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// Helper function to generate BlogPosting schema
export function generateBlogPostingSchema(options: {
  url: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${options.url}/#blogpost`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": options.url,
    },
    headline: options.headline,
    description: options.description,
    datePublished: options.datePublished,
    dateModified: options.dateModified || options.datePublished,
    author: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: options.author || BUSINESS_INFO.name,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    image: options.image || `${SITE_URL}/logo-full.svg`,
    inLanguage: "en-US",
  };
}
