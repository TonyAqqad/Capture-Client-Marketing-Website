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

export default function RestaurantsPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
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
          }),
        }}
      />
      <RestaurantsPageClient />
    </>
  );
}
