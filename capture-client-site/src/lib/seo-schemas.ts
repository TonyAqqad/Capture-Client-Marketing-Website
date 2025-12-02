/**
 * SEO Schema Generators
 *
 * Type-safe functions to generate JSON-LD structured data for various schema types.
 * Use these with the JsonLd component for rich search results.
 *
 * Schema types supported:
 * - Organization (company info)
 * - LocalBusiness (location-specific pages)
 * - Service (service pages)
 * - FAQPage (FAQ sections)
 * - BreadcrumbList (navigation breadcrumbs)
 * - Review/AggregateRating (testimonials)
 * - WebPage (general pages)
 */

/**
 * Organization Schema
 * Use on homepage and about page
 */
export interface OrganizationConfig {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  phone?: string;
  email?: string;
  address?: {
    street?: string;
    city?: string;
    region?: string;
    postalCode?: string;
    country?: string;
  };
  socialLinks?: string[];
  foundingDate?: string;
}

export function generateOrganizationSchema(config: OrganizationConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: config.name,
    url: config.url,
    logo: config.logo
      ? {
          "@type": "ImageObject",
          url: config.logo,
        }
      : undefined,
    description: config.description,
    foundingDate: config.foundingDate,
    contactPoint: config.phone
      ? {
          "@type": "ContactPoint",
          telephone: config.phone,
          contactType: "customer service",
          email: config.email,
          areaServed: "US",
          availableLanguage: ["English"],
        }
      : undefined,
    address: config.address
      ? {
          "@type": "PostalAddress",
          streetAddress: config.address.street,
          addressLocality: config.address.city,
          addressRegion: config.address.region,
          postalCode: config.address.postalCode,
          addressCountry: config.address.country || "US",
        }
      : undefined,
    sameAs: config.socialLinks,
  };
}

/**
 * LocalBusiness Schema
 * Use on location-specific pages (e.g., "Voice AI Agency in Knoxville")
 */
export interface LocalBusinessConfig extends OrganizationConfig {
  priceRange?: string;
  openingHours?: string[];
  geo?: {
    latitude: number;
    longitude: number;
  };
  servesCuisine?: string;
  acceptsReservations?: boolean;
}

export function generateLocalBusinessSchema(config: LocalBusinessConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: config.name,
    description: config.description,
    url: config.url,
    telephone: config.phone,
    priceRange: config.priceRange,
    address: config.address
      ? {
          "@type": "PostalAddress",
          streetAddress: config.address.street,
          addressLocality: config.address.city,
          addressRegion: config.address.region,
          postalCode: config.address.postalCode,
          addressCountry: config.address.country || "US",
        }
      : undefined,
    geo: config.geo
      ? {
          "@type": "GeoCoordinates",
          latitude: config.geo.latitude,
          longitude: config.geo.longitude,
        }
      : undefined,
    openingHoursSpecification: config.openingHours
      ? config.openingHours.map((hours) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: hours.split(" ")[0],
          opens: hours.split(" ")[1],
          closes: hours.split(" ")[2],
        }))
      : undefined,
    sameAs: config.socialLinks,
  };
}

/**
 * Service Schema
 * Use on individual service pages
 */
export interface ServiceConfig {
  name: string;
  description: string;
  provider: string;
  providerUrl: string;
  serviceType?: string;
  areaServed?: string | string[];
  offers?: {
    price?: string;
    priceCurrency?: string;
    description?: string;
    availability?: string;
  };
}

export function generateServiceSchema(config: ServiceConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: config.name,
    description: config.description,
    serviceType: config.serviceType,
    provider: {
      "@type": "Organization",
      name: config.provider,
      url: config.providerUrl,
    },
    areaServed: config.areaServed
      ? Array.isArray(config.areaServed)
        ? config.areaServed.map((area) => ({
            "@type": "City",
            name: area,
          }))
        : {
            "@type": "City",
            name: config.areaServed,
          }
      : undefined,
    offers: config.offers
      ? {
          "@type": "Offer",
          price: config.offers.price,
          priceCurrency: config.offers.priceCurrency || "USD",
          description: config.offers.description,
          availability:
            config.offers.availability || "https://schema.org/InStock",
        }
      : undefined,
  };
}

/**
 * FAQPage Schema
 * Use on pages with FAQ sections
 */
export interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQSchema(faqs: FAQItem[]) {
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

/**
 * BreadcrumbList Schema
 * Use on all pages for navigation context
 */
export interface BreadcrumbItem {
  name: string;
  url?: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
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

/**
 * AggregateRating Schema
 * Use with testimonials/reviews
 */
export interface RatingConfig {
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
}

export function generateAggregateRatingSchema(
  itemName: string,
  rating: RatingConfig
) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: itemName,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating.ratingValue,
      reviewCount: rating.reviewCount,
      bestRating: rating.bestRating || 5,
      worstRating: rating.worstRating || 1,
    },
  };
}

/**
 * Review Schema
 * Use for individual testimonials
 */
export interface ReviewConfig {
  author: string;
  reviewBody: string;
  ratingValue: number;
  datePublished?: string;
  itemReviewed: {
    name: string;
    type: "LocalBusiness" | "Organization" | "Service" | "Product";
  };
}

export function generateReviewSchema(config: ReviewConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    author: {
      "@type": "Person",
      name: config.author,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: config.ratingValue,
      bestRating: 5,
    },
    reviewBody: config.reviewBody,
    datePublished: config.datePublished || new Date().toISOString(),
    itemReviewed: {
      "@type": config.itemReviewed.type,
      name: config.itemReviewed.name,
    },
  };
}

/**
 * WebPage Schema
 * Use on all pages for general page info
 */
export interface WebPageConfig {
  name: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  publisher?: {
    name: string;
    logo?: string;
  };
}

export function generateWebPageSchema(config: WebPageConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: config.name,
    description: config.description,
    url: config.url,
    datePublished: config.datePublished,
    dateModified: config.dateModified || new Date().toISOString(),
    publisher: config.publisher
      ? {
          "@type": "Organization",
          name: config.publisher.name,
          logo: config.publisher.logo
            ? {
                "@type": "ImageObject",
                url: config.publisher.logo,
              }
            : undefined,
        }
      : undefined,
  };
}

/**
 * Product Schema (for package/pricing pages)
 */
export interface ProductConfig {
  name: string;
  description: string;
  image?: string;
  brand: string;
  offers: {
    price: string;
    priceCurrency: string;
    availability?: string;
    url?: string;
  };
  aggregateRating?: RatingConfig;
}

export function generateProductSchema(config: ProductConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: config.name,
    description: config.description,
    image: config.image,
    brand: {
      "@type": "Brand",
      name: config.brand,
    },
    offers: {
      "@type": "Offer",
      price: config.offers.price,
      priceCurrency: config.offers.priceCurrency,
      availability:
        config.offers.availability || "https://schema.org/InStock",
      url: config.offers.url,
    },
    aggregateRating: config.aggregateRating
      ? {
          "@type": "AggregateRating",
          ratingValue: config.aggregateRating.ratingValue,
          reviewCount: config.aggregateRating.reviewCount,
          bestRating: config.aggregateRating.bestRating || 5,
        }
      : undefined,
  };
}

/**
 * Predefined Capture Client Schemas
 */
export const CaptureClientSchemas = {
  organization: generateOrganizationSchema({
    name: "Capture Client",
    url: "https://captureclientai.net",
    description:
      "The All-in-One Growth Hub for Small Business. Voice AI agents, lead generation, CRM, and marketing automation.",
    phone: "(865) 346-3339",
    email: "team@captureclientai.net",
    socialLinks: [
      // Add your social media links here
    ],
  }),

  // Add more predefined schemas as needed
};
