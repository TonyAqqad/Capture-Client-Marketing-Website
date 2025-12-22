/**
 * Advanced JSON-LD Schema Generators for Capture Client
 *
 * These schemas complement the base schemas in seo-config.ts
 * and provide enhanced structured data for rich snippets.
 *
 * References:
 * - HowTo: https://developers.google.com/search/docs/appearance/structured-data/how-to
 * - Video: https://developers.google.com/search/docs/appearance/structured-data/video
 * - SoftwareApplication: https://schema.org/SoftwareApplication
 */

import { SITE_CONFIG } from './seo-config';

/**
 * Generate HowTo JSON-LD Schema
 * For "How It Works" sections - enhances rich snippet potential
 */
export function generateHowToSchema(howToData: {
  name: string;
  description: string;
  totalTime?: string; // ISO 8601 duration format, e.g., "PT2W" for 2 weeks
  estimatedCost?: { currency: string; value: string };
  steps: Array<{ step: number; title: string; description: string; image?: string }>;
  url?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': howToData.url ? `${howToData.url}#howto` : `${SITE_CONFIG.url}/#howto`,

    name: howToData.name,
    description: howToData.description,

    // Time estimate (optional but recommended)
    ...(howToData.totalTime && { totalTime: howToData.totalTime }),

    // Cost estimate (optional)
    ...(howToData.estimatedCost && {
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: howToData.estimatedCost.currency,
        value: howToData.estimatedCost.value,
      },
    }),

    // Steps array
    step: howToData.steps.map((s) => ({
      '@type': 'HowToStep',
      position: s.step,
      name: s.title,
      text: s.description,
      ...(s.image && {
        image: {
          '@type': 'ImageObject',
          url: s.image,
        },
      }),
    })),

    // Tools needed for AI Voice setup
    tool: [
      { '@type': 'HowToTool', name: 'AI Voice Agent Platform' },
      { '@type': 'HowToTool', name: 'Business Phone Number' },
    ],
  };
}

/**
 * Generate Video Schema for embedded videos
 * Increases chances of video rich snippets
 */
export function generateVideoSchema(videoData: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string; // ISO 8601 duration, e.g., "PT1M30S"
  contentUrl?: string;
  embedUrl?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',

    name: videoData.name,
    description: videoData.description,
    thumbnailUrl: videoData.thumbnailUrl,
    uploadDate: videoData.uploadDate,

    ...(videoData.duration && { duration: videoData.duration }),
    ...(videoData.contentUrl && { contentUrl: videoData.contentUrl }),
    ...(videoData.embedUrl && { embedUrl: videoData.embedUrl }),

    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      '@id': `${SITE_CONFIG.url}/#organization`,
    },
  };
}

/**
 * Generate SoftwareApplication Schema
 * For the platform/dashboard features page
 */
export function generatePlatformSoftwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${SITE_CONFIG.url}/#software`,

    name: `${SITE_CONFIG.name} Platform`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web-based',

    description:
      'AI-powered marketing automation platform with Voice AI agents, CRM, Google & Facebook Ads management, and real-time analytics.',

    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '97',
      highPrice: '950',
      priceCurrency: 'USD',
      offerCount: '3',
    },

    // NOTE: Aggregate rating commented out until verifiable
    // aggregateRating: {
    //   '@type': 'AggregateRating',
    //   ratingValue: '4.9',
    //   reviewCount: '127',
    //   bestRating: '5',
    //   worstRating: '1',
    // },

    featureList: [
      '24/7 AI Voice Agents',
      'Lead Qualification',
      'Appointment Scheduling',
      'CRM Integration',
      'Google Ads Management',
      'Facebook Ads Management',
      'Real-time Analytics',
      'Call Transcription',
    ],

    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_CONFIG.url}/#organization`,
    },
  };
}

/**
 * Generate CollectionPage Schema for listing pages (services, locations)
 */
export function generateCollectionPageSchema(data: {
  name: string;
  description: string;
  url: string;
  items: Array<{ name: string; url: string }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${data.url}#collectionpage`,

    name: data.name,
    description: data.description,
    url: data.url,

    isPartOf: {
      '@type': 'WebSite',
      '@id': `${SITE_CONFIG.url}/#website`,
    },

    mainEntity: {
      '@type': 'ItemList',
      itemListElement: data.items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: item.url,
      })),
    },

    inLanguage: 'en-US',
  };
}

/**
 * Generate enhanced Service schema for location+service pages
 * More detailed than the basic service schema in seo-config.ts
 */
export function generateLocationServiceSchema(locationData: {
  serviceName: string;
  serviceDescription: string;
  city: string;
  state: string;
  stateAbbr: string;
  pageUrl: string;
  benefits?: Array<{ title: string; description: string }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${locationData.pageUrl}#service`,

    name: `${locationData.serviceName} in ${locationData.city}, ${locationData.stateAbbr}`,
    description: locationData.serviceDescription,
    url: locationData.pageUrl,

    serviceType: locationData.serviceName,

    provider: {
      '@type': 'LocalBusiness',
      name: `${SITE_CONFIG.name} - ${locationData.city}`,
      '@id': `${locationData.pageUrl}#localbusiness`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: locationData.city,
        addressRegion: locationData.stateAbbr,
        addressCountry: 'US',
      },
      parentOrganization: {
        '@id': `${SITE_CONFIG.url}/#organization`,
      },
    },

    areaServed: {
      '@type': 'City',
      name: locationData.city,
      containedInPlace: {
        '@type': 'State',
        name: locationData.state,
      },
    },

    // Add benefits as service features if provided
    ...(locationData.benefits &&
      locationData.benefits.length > 0 && {
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `${locationData.serviceName} Features`,
          itemListElement: locationData.benefits.slice(0, 5).map((benefit, index) => ({
            '@type': 'Offer',
            name: benefit.title,
            description: benefit.description,
            position: index + 1,
          })),
        },
      }),

    // 24/7 availability for AI services
    hoursAvailable: {
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

    // NOTE: Aggregate rating commented out until verifiable
    // aggregateRating: {
    //   '@type': 'AggregateRating',
    //   ratingValue: '4.9',
    //   reviewCount: '127',
    //   bestRating: '5',
    //   worstRating: '1',
    // },
  };
}

/**
 * Generate Event Schema for webinars, demos, or consultations
 */
export function generateEventSchema(eventData: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  isOnline?: boolean;
  locationName?: string;
  locationUrl?: string;
  price?: string;
  currency?: string;
}) {
  const isOnline = eventData.isOnline ?? true;

  return {
    '@context': 'https://schema.org',
    '@type': isOnline ? 'VirtualEvent' : 'Event',

    name: eventData.name,
    description: eventData.description,
    startDate: eventData.startDate,
    ...(eventData.endDate && { endDate: eventData.endDate }),

    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: isOnline
      ? 'https://schema.org/OnlineEventAttendanceMode'
      : 'https://schema.org/OfflineEventAttendanceMode',

    location: isOnline
      ? {
          '@type': 'VirtualLocation',
          url: SITE_CONFIG.url,
        }
      : {
          '@type': 'Place',
          name: eventData.locationName || SITE_CONFIG.name,
          ...(eventData.locationUrl && { url: eventData.locationUrl }),
        },

    organizer: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },

    ...(eventData.price && {
      offers: {
        '@type': 'Offer',
        price: eventData.price,
        priceCurrency: eventData.currency || 'USD',
        availability: 'https://schema.org/InStock',
        url: `${SITE_CONFIG.url}/contact`,
      },
    }),
  };
}

/**
 * Generate SpecialAnnouncement Schema
 * For promotions, limited-time offers, or important announcements
 */
export function generateSpecialAnnouncementSchema(data: {
  name: string;
  text: string;
  datePosted: string;
  expires?: string;
  category?: string;
  url?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SpecialAnnouncement',

    name: data.name,
    text: data.text,
    datePosted: data.datePosted,
    ...(data.expires && { expires: data.expires }),
    ...(data.category && { category: data.category }),

    url: data.url || SITE_CONFIG.url,

    announcementLocation: {
      '@type': 'CovidTestingFacility', // Generic location type
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },

    spatialCoverage: SITE_CONFIG.serviceArea.regions.map((region) => ({
      '@type': 'State',
      name: region,
    })),
  };
}

/**
 * Generate Testimonial/Review collection schema
 * For pages showcasing customer testimonials
 */
export function generateTestimonialsSchema(testimonials: Array<{
  author: string;
  business?: string;
  location?: string;
  quote: string;
  rating?: number;
}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.name,

    review: testimonials.map((testimonial, index) => ({
      '@type': 'Review',
      '@id': `${SITE_CONFIG.url}/#review-${index + 1}`,
      author: {
        '@type': 'Person',
        name: testimonial.author,
        ...(testimonial.business && {
          worksFor: {
            '@type': 'Organization',
            name: testimonial.business,
            ...(testimonial.location && {
              address: {
                '@type': 'PostalAddress',
                addressLocality: testimonial.location,
              },
            }),
          },
        }),
      },
      reviewBody: testimonial.quote,
      ...(testimonial.rating && {
        reviewRating: {
          '@type': 'Rating',
          ratingValue: testimonial.rating,
          bestRating: 5,
          worstRating: 1,
        },
      }),
    })),

    // NOTE: Aggregate rating commented out - should be calculated from real reviews
    // aggregateRating: {
    //   '@type': 'AggregateRating',
    //   ratingValue: '4.9',
    //   reviewCount: testimonials.length.toString(),
    //   bestRating: '5',
    //   worstRating: '1',
    // },
  };
}

/**
 * Pre-built Voice AI HowTo Schema
 * Ready to use on Voice AI service pages
 */
export const VoiceAIHowToSchema = generateHowToSchema({
  name: 'How to Set Up Voice AI for Your Business',
  description:
    'Complete guide to implementing AI Voice Agents that answer calls, qualify leads, and book appointments 24/7.',
  totalTime: 'P2W', // 2 weeks
  estimatedCost: { currency: 'USD', value: '997' },
  steps: [
    {
      step: 1,
      title: 'Schedule Free Strategy Call',
      description:
        "Book a 15-minute call with our team to discuss your business needs and how Voice AI can help you capture more clients. We'll analyze your current call volume and missed opportunities.",
    },
    {
      step: 2,
      title: 'Custom AI Training',
      description:
        'We train your AI voice agent with your specific business information, FAQs, service offerings, and qualification criteria. The AI learns to represent your brand professionally.',
    },
    {
      step: 3,
      title: 'Integration Setup',
      description:
        'Connect your existing phone system, CRM, and calendar. We handle all technical setup including call forwarding, lead routing, and appointment scheduling integration.',
    },
    {
      step: 4,
      title: 'Launch & Monitor',
      description:
        'Go live with your AI voice agent. Monitor calls in real-time, review transcriptions, and track lead quality. We continuously optimize based on call data.',
    },
  ],
  url: `${SITE_CONFIG.url}/services/voice-ai`,
});

/**
 * Pre-built Lead Generation HowTo Schema
 */
export const LeadGenerationHowToSchema = generateHowToSchema({
  name: 'How to Generate Qualified Leads for Your Business',
  description:
    'Step-by-step process for implementing a complete lead generation system with Google Ads, Facebook Ads, and AI qualification.',
  totalTime: 'P1M', // 1 month
  steps: [
    {
      step: 1,
      title: 'Market Analysis & Strategy',
      description:
        'We analyze your target market, competitor landscape, and customer demographics to develop a customized lead generation strategy.',
    },
    {
      step: 2,
      title: 'Campaign Setup',
      description:
        'Create optimized Google Ads and Facebook Ads campaigns targeting high-intent keywords and audiences in your service area.',
    },
    {
      step: 3,
      title: 'Landing Page Optimization',
      description:
        'Build conversion-optimized landing pages with clear CTAs, trust signals, and lead capture forms that convert visitors into leads.',
    },
    {
      step: 4,
      title: 'AI Lead Qualification',
      description:
        'Connect AI Voice Agents to automatically qualify incoming leads, book appointments, and route hot leads to your sales team.',
    },
    {
      step: 5,
      title: 'Optimize & Scale',
      description:
        'Continuously analyze campaign performance, A/B test ad creatives, and scale successful campaigns to maximize ROI.',
    },
  ],
  url: `${SITE_CONFIG.url}/services/lead-generation`,
});
