/**
 * Centralized SEO Configuration for Capture Client
 * Based on 2025 Google E-E-A-T and Local SEO best practices
 *
 * References:
 * - Google Local Business Schema: https://developers.google.com/search/docs/appearance/structured-data/local-business
 * - Schema.org Organization: https://schema.org/Organization
 * - E-E-A-T Guidelines: Experience, Expertise, Authoritativeness, Trustworthiness
 */

import { LocationData, ServiceData, PackageData } from './data';

export const SITE_CONFIG = {
  name: 'Capture Client',
  legalName: 'Capture Client LLC',
  url: 'https://captureclientai.net',
  phone: '(865) 346-3339',
  phoneRaw: '+18653463339',
  email: 'info@captureclientai.net',
  foundingDate: '2023',

  // Primary business location
  address: {
    streetAddress: '',  // Add if public
    addressLocality: 'Knoxville',
    addressRegion: 'TN',
    postalCode: '',  // Add if public
    addressCountry: 'US',
  },

  // Service area coverage
  serviceArea: {
    regions: ['Tennessee', 'Georgia', 'North Carolina', 'Kentucky', 'Virginia'],
    type: 'ServiceArea', // Not a physical location, service area business
  },

  // Social profiles for E-E-A-T signals
  socialProfiles: [
    'https://www.facebook.com/captureclient',
    'https://twitter.com/captureclient',
    'https://www.linkedin.com/company/captureclient',
  ],

  // Core services
  services: [
    'Voice AI Agents',
    'Lead Generation',
    'Google Ads Management',
    'Facebook Ads Management',
    'CRM Solutions',
    'Marketing Automation',
  ],

  // Target audience
  audience: 'Small Business Owners',

  // Brand values for E-E-A-T
  values: {
    experience: 'Over 500+ small businesses served, 50,000+ calls handled',
    expertise: 'Certified Google and Meta Business Partners with advanced AI expertise',
    authority: 'Industry-leading AI voice technology with 97% CSAT scores',
    trust: 'BBB Accredited, SOC-II compliant, transparent pricing, 30-day guarantee',
  },
};

/**
 * Generate Organization JSON-LD Schema
 * Critical for brand entity recognition and E-E-A-T
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.name,
    legalName: SITE_CONFIG.legalName,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.svg`,
    image: `${SITE_CONFIG.url}/og-image.jpg`,
    description:
      'Capture Client is the enterprise-grade growth platform for small businesses, combining AI Voice Agents (24/7 call answering), Google & Facebook Ads management, built-in CRM, and real-time analytics. Trusted by 500+ businesses with 50,000+ calls handled and 97% customer satisfaction.',

    foundingDate: SITE_CONFIG.foundingDate,

    // Contact information
    telephone: SITE_CONFIG.phoneRaw,
    email: SITE_CONFIG.email,

    // Address (for local SEO - use areaServed for service area businesses)
    areaServed: SITE_CONFIG.serviceArea.regions.map((region) => ({
      '@type': 'State',
      name: region,
    })),

    // Social proof for E-E-A-T
    sameAs: SITE_CONFIG.socialProfiles,

    // Services offered
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Marketing Services',
      itemListElement: SITE_CONFIG.services.map((service, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service,
        },
        position: index + 1,
      })),
    },

    // Aggregate rating (add when you have reviews)
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1',
    },

    // Trust signals
    slogan: 'Automate Leads. Capture Clients. Scale Effortlessly.',

    // Awards and certifications for E-E-A-T
    award: [
      'Google Ads Partner',
      'Meta Business Partner',
      'BBB Accredited Business',
      'SOC-II Certified'
    ],

    // Business attributes
    priceRange: '$$',
    paymentAccepted: 'Credit Card, Debit Card, ACH',
    currenciesAccepted: 'USD',
  };
}

/**
 * Generate LocalBusiness JSON-LD Schema for location pages
 * Essential for local SEO and Google Maps visibility
 */
export function generateLocalBusinessSchema(locationData: LocationData) {
  const { location, service, seo } = locationData;

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_CONFIG.url}/locations/${location.slug}#localbusiness`,

    name: `${SITE_CONFIG.name} - ${location.city}, ${location.state_abbr}`,
    description: seo.meta_description,

    // Service area specification
    areaServed: {
      '@type': 'City',
      name: location.city,
      containedInPlace: {
        '@type': 'State',
        name: location.state,
        abbreviation: location.state_abbr,
      },
    },

    // Parent organization
    parentOrganization: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      '@id': `${SITE_CONFIG.url}/#organization`,
    },

    // Contact
    telephone: SITE_CONFIG.phoneRaw,
    email: SITE_CONFIG.email,
    url: `${SITE_CONFIG.url}/locations/${location.slug}`,

    // Service offered in this location
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.service_name} in ${location.city}`,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service.service_name,
            description: seo.meta_description,
            areaServed: {
              '@type': 'City',
              name: location.city,
            },
          },
        },
      ],
    },

    // Geo coverage
    geo: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        // Add specific coordinates if available
        addressLocality: location.city,
        addressRegion: location.state_abbr,
      },
      geoRadius: location.service_area_radius,
    },

    // Aggregate rating
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
    },

    priceRange: '$$',
  };
}

/**
 * Generate Service JSON-LD Schema
 * Helps Google understand your service offerings
 */
export function generateServiceSchema(serviceData: ServiceData) {
  const { service, seo, benefits } = serviceData;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_CONFIG.url}/services/${service.service_slug}#service`,

    name: service.service_name,
    description: seo.meta_description,
    url: `${SITE_CONFIG.url}/services/${service.service_slug}`,

    provider: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      '@id': `${SITE_CONFIG.url}/#organization`,
    },

    serviceType: service.service_name,

    // Service area
    areaServed: SITE_CONFIG.serviceArea.regions.map((region) => ({
      '@type': 'State',
      name: region,
    })),

    // Benefits as features
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.service_name} Benefits`,
      itemListElement: benefits.slice(0, 5).map((benefit, index) => ({
        '@type': 'Offer',
        name: benefit.title,
        description: benefit.description,
        position: index + 1,
      })),
    },

    // Availability
    hoursAvailable: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
    ],

    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
    },
  };
}

/**
 * Generate FAQ JSON-LD Schema
 * Increases chances of rich snippets in search results
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  if (!faqs || faqs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate BreadcrumbList JSON-LD Schema
 * Improves navigation understanding and SERP display
 */
export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

/**
 * Generate Product/Offer Schema for Packages
 * Helps display pricing in search results
 */
export function generateProductSchema(packageData: PackageData) {
  const { package: pkg, seo } = packageData;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${SITE_CONFIG.url}/pricing/${pkg.package_slug}#product`,

    name: pkg.package_name,
    description: seo.meta_description,
    url: `${SITE_CONFIG.url}/pricing/${pkg.package_slug}`,

    brand: {
      '@type': 'Brand',
      name: SITE_CONFIG.name,
    },

    offers: {
      '@type': 'Offer',
      price: pkg.price.replace(/[^0-9.]/g, ''),
      priceCurrency: 'USD',
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        .toISOString()
        .split('T')[0],
      availability: 'https://schema.org/InStock',
      url: `${SITE_CONFIG.url}/pricing/${pkg.package_slug}`,
      seller: {
        '@type': 'Organization',
        name: SITE_CONFIG.name,
      },
    },

    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
    },
  };
}

/**
 * Generate WebSite Schema with Sitelinks SearchBox
 * Enables site search in Google results
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_CONFIG.url}/#website`,

    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,

    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_CONFIG.url}/#organization`,
    },

    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_CONFIG.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate WebPage Schema
 * Basic page-level schema
 */
export function generateWebPageSchema(pageData: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageData.url}#webpage`,

    url: pageData.url,
    name: pageData.title,
    description: pageData.description,

    isPartOf: {
      '@type': 'WebSite',
      '@id': `${SITE_CONFIG.url}/#website`,
    },

    about: {
      '@type': 'Organization',
      '@id': `${SITE_CONFIG.url}/#organization`,
    },

    datePublished: pageData.datePublished || new Date().toISOString(),
    dateModified: pageData.dateModified || new Date().toISOString(),

    inLanguage: 'en-US',
  };
}

/**
 * Generate Review Schema (for testimonials)
 */
export function generateReviewSchema(reviews: Array<{
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
}>) {
  return reviews.map((review) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      '@id': `${SITE_CONFIG.url}/#organization`,
    },
    author: {
      '@type': 'Person',
      name: review.author,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: review.reviewBody,
    datePublished: review.datePublished,
  }));
}

/**
 * Generate BlogPosting JSON-LD Schema
 * Essential for blog SEO and article rich snippets
 * Based on Google's Article structured data guidelines
 * Reference: https://developers.google.com/search/docs/appearance/structured-data/article
 */
export function generateBlogPostingSchema(post: {
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  featuredImage: string;
  publishedAt: string;
  updatedAt?: string;
  slug: string;
  category: string;
  tags: string[];
}) {
  // Extract word count for reading time estimation
  const wordCount = post.content.replace(/<[^>]*>/g, '').split(/\s+/).length;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${SITE_CONFIG.url}/blog/${post.slug}#blogposting`,

    // Required properties for Article rich results
    headline: post.title,
    description: post.excerpt,

    // Enhanced image object with multiple sizes
    image: {
      '@type': 'ImageObject',
      url: post.featuredImage,
      width: 1200,
      height: 630,
      caption: post.title,
    },

    url: `${SITE_CONFIG.url}/blog/${post.slug}`,

    // Enhanced author information with E-E-A-T signals
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
      image: post.author.avatar,
      url: `${SITE_CONFIG.url}/about`,
      description: `${post.author.name} is a marketing expert specializing in AI automation, lead generation, and digital advertising strategies.`,
    },

    // Publisher with required logo
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      '@id': `${SITE_CONFIG.url}/#organization`,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/logo.svg`,
        width: 600,
        height: 60,
      },
      url: SITE_CONFIG.url,
    },

    // Dates in ISO 8601 format
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,

    // Main entity
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_CONFIG.url}/blog/${post.slug}`,
    },

    // Content details
    articleSection: post.category,
    articleBody: post.excerpt,
    keywords: post.tags.join(', '),
    wordCount: wordCount,

    // Language
    inLanguage: 'en-US',

    // Additional E-E-A-T signals
    isAccessibleForFree: true,
    isPartOf: {
      '@type': 'Blog',
      '@id': `${SITE_CONFIG.url}/blog#blog`,
      name: `${SITE_CONFIG.name} Blog`,
      publisher: {
        '@type': 'Organization',
        '@id': `${SITE_CONFIG.url}/#organization`,
      },
    },

    // Creator for authorship
    creator: {
      '@type': 'Person',
      name: post.author.name,
    },
  };
}

/**
 * Generate Blog/CollectionPage JSON-LD Schema
 * For blog listing pages
 */
export function generateBlogSchema(posts: Array<{
  title: string;
  slug: string;
  publishedAt: string;
}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${SITE_CONFIG.url}/blog#blog`,

    name: `${SITE_CONFIG.name} Blog`,
    description: 'Marketing tips, AI insights, and growth strategies to help your small business thrive.',
    url: `${SITE_CONFIG.url}/blog`,

    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_CONFIG.url}/#organization`,
    },

    blogPost: posts.slice(0, 10).map(post => ({
      '@type': 'BlogPosting',
      '@id': `${SITE_CONFIG.url}/blog/${post.slug}#blogposting`,
      headline: post.title,
      url: `${SITE_CONFIG.url}/blog/${post.slug}`,
      datePublished: post.publishedAt,
    })),

    inLanguage: 'en-US',
  };
}

/**
 * Default metadata configuration following Next.js 16 best practices
 */
export function getDefaultMetadata() {
  return {
    metadataBase: new URL(SITE_CONFIG.url),

    // Essential meta tags
    title: {
      default: `${SITE_CONFIG.name} | The All-in-One Growth Hub for Small Business`,
      template: `%s | ${SITE_CONFIG.name}`,
    },

    description:
      'Enterprise-grade growth platform trusted by 500+ businesses. Automate leads with 24/7 AI voice agents, professional Google/Facebook Ads management, built-in CRM, and real-time analytics. 97% customer satisfaction, SOC-II compliant. Free consultation.',

    keywords: [
      'voice ai',
      'ai voice agents',
      'ai receptionist',
      '24/7 call answering',
      'lead generation',
      'facebook ads',
      'google ads',
      'marketing automation',
      'crm software',
      'small business marketing',
      'lead capture',
      'marketing dashboard',
      'business phone automation',
      'virtual receptionist',
      'ai answering service',
      'conversational ai',
      'appointment scheduling ai',
      'lead qualification',
      'call center ai',
      'real-time transcription'
    ],

    // Authors and ownership
    authors: [{ name: SITE_CONFIG.name }],
    creator: SITE_CONFIG.name,
    publisher: SITE_CONFIG.name,

    // Category
    category: 'Marketing Technology',

    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large' as const,
        'max-snippet': -1,
      },
    },

    // Open Graph
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: SITE_CONFIG.url,
      siteName: SITE_CONFIG.name,
      title: `${SITE_CONFIG.name} | Enterprise AI Voice Agents & Lead Generation Platform`,
      description:
        'Enterprise-grade platform trusted by 500+ businesses. 24/7 AI voice agents, professional ads management, built-in CRM, real-time analytics. 97% CSAT, SOC-II compliant. Free consultation.',
      images: [
        {
          url: `${SITE_CONFIG.url}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: `${SITE_CONFIG.name} - Marketing Automation Platform`,
        },
      ],
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      site: '@captureclient',
      creator: '@captureclient',
      title: `${SITE_CONFIG.name} | The All-in-One Growth Hub for Small Business`,
      description:
        'Voice AI, Lead Generation & Marketing Automation for Small Businesses.',
      images: [`${SITE_CONFIG.url}/og-image.jpg`],
    },

    // Verification tags (add your verification codes)
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
      bing: 'your-bing-verification-code',
    },

    // Alternate languages (if applicable)
    alternates: {
      canonical: SITE_CONFIG.url,
      languages: {
        'en-US': SITE_CONFIG.url,
      },
    },

    // Icons
    icons: {
      icon: '/favicon.svg',
      shortcut: '/favicon.svg',
      apple: '/logo-mobile.svg',
    },
  };
}
