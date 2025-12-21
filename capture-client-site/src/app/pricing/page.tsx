import type { Metadata } from 'next';
import PricingPageClient from './PricingPageClient';

// SEO Metadata for Pricing Page
export const metadata: Metadata = {
  title: 'Pricing & Packages | AI Voice Agents | Capture Client',
  description: 'Transparent pricing for AI voice agents, Google Ads, and Facebook Ads management. Plans from $97/mo. No setup fees, no long-term contracts. See which package fits your business.',
  keywords: [
    'marketing agency pricing',
    'AI voice agent cost',
    'lead generation pricing',
    'Google Ads management cost',
    'Facebook Ads pricing',
    'small business marketing packages',
    'AI receptionist pricing',
    'marketing automation cost',
    'voice AI pricing',
    '24/7 call answering service cost',
  ],
  openGraph: {
    title: 'Pricing & Packages | AI Voice Agents | Capture Client',
    description: 'Transparent pricing for AI voice agents and lead generation. Plans from $97/mo with no long-term contracts. No setup fees.',
    url: 'https://captureclient.com/pricing',
    type: 'website',
    images: [
      {
        url: 'https://captureclient.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Capture Client Pricing - AI Voice Agents & Lead Generation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marketing Agency Pricing | AI Voice Agents from $97/mo',
    description: 'AI voice agents & lead generation from $97/mo. No setup fees, no long-term contracts.',
  },
  alternates: {
    canonical: 'https://captureclient.com/pricing',
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

export default function PricingPage() {
  return (
    <>
      {/* JSON-LD Structured Data for Pricing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Capture Client Pricing Packages',
            description: 'AI Voice Agents and Lead Generation pricing packages for small businesses',
            itemListElement: [
              {
                '@type': 'Product',
                position: 1,
                name: 'Starter Package',
                description: 'Perfect for small businesses getting started with AI automation. Includes 1 AI Voice Agent, 50 calls/month, basic lead qualification.',
                brand: {
                  '@type': 'Brand',
                  name: 'Capture Client',
                },
                offers: {
                  '@type': 'Offer',
                  price: '97',
                  priceCurrency: 'USD',
                  priceValidUntil: '2026-12-31',
                  availability: 'https://schema.org/InStock',
                  url: 'https://captureclient.com/pricing/starter-package',
                  priceSpecification: {
                    '@type': 'UnitPriceSpecification',
                    price: '97',
                    priceCurrency: 'USD',
                    unitText: 'MONTH',
                  },
                },
              },
              {
                '@type': 'Product',
                position: 2,
                name: 'Growth Package',
                description: 'Multi-channel marketing automation for growing businesses. 2 AI Voice Agents, 200+ calls/month, Google or Facebook Ads management, full CRM integration.',
                brand: {
                  '@type': 'Brand',
                  name: 'Capture Client',
                },
                offers: {
                  '@type': 'Offer',
                  price: '950',
                  priceCurrency: 'USD',
                  priceValidUntil: '2026-12-31',
                  availability: 'https://schema.org/InStock',
                  url: 'https://captureclient.com/pricing/growth-package',
                  priceSpecification: {
                    '@type': 'UnitPriceSpecification',
                    price: '950',
                    priceCurrency: 'USD',
                    unitText: 'MONTH',
                  },
                },
              },
              {
                '@type': 'Product',
                position: 3,
                name: 'Enterprise Package',
                description: 'Complete done-for-you lead generation system. Unlimited AI agents, unlimited calls, both Google & Facebook Ads, dedicated account manager, 24/7 priority support.',
                brand: {
                  '@type': 'Brand',
                  name: 'Capture Client',
                },
                offers: {
                  '@type': 'AggregateOffer',
                  lowPrice: '2997',
                  priceCurrency: 'USD',
                  availability: 'https://schema.org/InStock',
                  url: 'https://captureclient.com/pricing/enterprise-package',
                  priceSpecification: {
                    '@type': 'UnitPriceSpecification',
                    price: '2997',
                    priceCurrency: 'USD',
                    unitText: 'MONTH',
                  },
                },
              },
            ],
          }),
        }}
      />

      {/* FAQ Schema for Pricing Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Can I switch packages later?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Absolutely! Upgrade or downgrade anytime. Changes take effect at your next billing cycle. Most clients start with Starter, see results, then upgrade to Growth.',
                },
              },
              {
                '@type': 'Question',
                name: 'Are there any setup fees or hidden costs?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Zero setup fees. The price you see is what you pay. Your only additional cost is ad spend if you choose Growth or Enterprise packages (billed directly by Google/Facebook).',
                },
              },
              {
                '@type': 'Question',
                name: 'What if I go over my call limit?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "We'll notify you before you hit your limit. You can upgrade to the next tier or purchase additional call bundles. Starter: $2/call, Growth: $1.50/call, Enterprise: unlimited.",
                },
              },
              {
                '@type': 'Question',
                name: 'How quickly will I see ROI?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Most clients see their first qualified lead within 24-48 hours of going live. Full ROI typically happens within the first 30-60 days as the AI learns and optimizes.',
                },
              },
              {
                '@type': 'Question',
                name: 'Do you require a long-term contract?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No! All packages are month-to-month. Cancel anytime with 30 days notice. We earn your business every month through results, not contracts.',
                },
              },
            ],
          }),
        }}
      />

      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://captureclient.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Pricing',
                item: 'https://captureclient.com/pricing',
              },
            ],
          }),
        }}
      />

      <PricingPageClient />
    </>
  );
}
