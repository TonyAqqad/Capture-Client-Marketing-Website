import type { Metadata } from 'next';
import RestaurantsPageClient from './RestaurantsPageClient';

// SEO Metadata
export const metadata: Metadata = {
  title: "AI Phone Ordering for Restaurants | Toast Integration | Capture Client",
  description: "Stop losing 23% of phone orders. AI voice ordering and reservations for restaurants. Toast, Square, OpenTable integration. 760% ROI, 90-day payback.",
  keywords: [
    'restaurant phone ordering AI',
    'AI voice ordering system',
    'restaurant reservation automation',
    'Toast POS integration',
    'Square restaurant integration',
    'OpenTable AI booking',
    'phone order automation',
    'restaurant call handling',
    'missed restaurant orders',
    'AI restaurant receptionist'
  ],
  openGraph: {
    title: "AI Phone Ordering for Restaurants | Never Miss an Order Again",
    description: "Stop losing 23% of phone orders during rush. AI handles ordering, reservations, and catering. Toast, Square, OpenTable integration. 760% ROI proven.",
    url: 'https://captureclientai.net/industries/restaurants',
    siteName: 'Capture Client',
    type: 'website',
    images: [
      {
        url: 'https://captureclientai.net/og-restaurant-ai.jpg',
        width: 1200,
        height: 630,
        alt: 'AI Phone Ordering for Restaurants - Capture Client',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Phone Ordering for Restaurants | Never Miss an Order',
    description: 'Stop losing 23% of phone orders. AI voice ordering with Toast, Square, OpenTable integration. 760% ROI proven.',
  },
  alternates: {
    canonical: 'https://captureclientai.net/industries/restaurants',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// JSON-LD Schemas
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://captureclientai.net/industries/restaurants#service',
  name: 'AI Phone Ordering for Restaurants',
  serviceType: 'Restaurant Automation',
  provider: {
    '@type': 'Organization',
    name: 'Capture Client',
    url: 'https://captureclientai.net',
    telephone: '865-346-3339',
  },
  areaServed: {
    '@type': 'Country',
    name: 'United States',
  },
  description: 'AI voice ordering and reservation system for restaurants. Integrates with Toast, Square, and OpenTable. Never miss a phone order again.',
  offers: {
    '@type': 'Offer',
    price: '997',
    priceCurrency: 'USD',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: '997',
      priceCurrency: 'USD',
      unitText: 'MONTH',
    },
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much do restaurants lose to missed phone orders?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'On average, restaurants lose 23% of phone orders during peak hours when staff are too busy to answer. This can represent $50,000+ in lost revenue annually for a single location.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does the AI integrate with Toast POS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! Our AI voice ordering system integrates seamlessly with Toast, Square, OpenTable, Resy, and other popular restaurant management platforms. Orders flow directly into your POS system.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can the AI handle complex menu modifications?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. Our AI is trained on your specific menu and can handle modifications, substitutions, allergies, and special requests just like your best staff member.',
      },
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://captureclientai.net',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Industries',
      item: 'https://captureclientai.net/industries',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Restaurants',
      item: 'https://captureclientai.net/industries/restaurants',
    },
  ],
};

export default function RestaurantsPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <RestaurantsPageClient />
    </>
  );
}
