import type { Metadata } from "next";
import { IntegrationsHero } from "@/components/integrations/IntegrationsHero";
import { IntegrationsGrid } from "@/components/integrations/IntegrationsGrid";
import { IntegrationsCTA } from "@/components/integrations/IntegrationsCTA";

// SEO Metadata for Integrations Page
export const metadata: Metadata = {
  title: "69+ Integrations | Connect Your Stack | Capture Client",
  description:
    "Capture Client integrates with 69+ platforms including HubSpot, Salesforce, Twilio, Zapier, ServiceTitan, Calendly, and more. Connect your entire tech stack in minutes with our native integrations or 5,000+ apps via Zapier.",
  keywords: [
    "integrations",
    "API integrations",
    "CRM integrations",
    "payment integrations",
    "marketing automation integrations",
    "Zapier integrations",
    "Stripe integration",
    "Twilio integration",
    "Salesforce integration",
    "HubSpot integration",
    "Google Calendar integration",
    "email marketing integrations",
    "SMS integrations",
    "voice AI integrations",
    "business automation",
    "workflow automation",
  ],
  openGraph: {
    title: "69+ Integrations | Connect Your Stack | Capture Client",
    description:
      "Connect Capture Client with your favorite platforms. 69+ native integrations plus 5,000+ apps via Zapier. HubSpot, Salesforce, ServiceTitan, and more.",
    url: "https://captureclient.com/integrations",
    siteName: "Capture Client",
    type: "website",
    images: [
      {
        url: "https://captureclient.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Capture Client - 69+ Seamless Integrations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "69+ Integrations | Connect Your Stack | Capture Client",
    description:
      "Connect Capture Client with your favorite platforms. 69+ native integrations plus 5,000+ apps via Zapier.",
    images: ["https://captureclient.com/og-image.png"],
  },
  alternates: {
    canonical: "https://captureclient.com/integrations",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// JSON-LD Structured Data for Integrations Page
// NOTE: WebSite schema is already rendered globally in layout.tsx - do NOT duplicate here
const integrationsSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Integrations",
  description:
    "Capture Client integrates with 69+ platforms including HubSpot, Salesforce, Twilio, Zapier, ServiceTitan, and more to connect your entire tech stack.",
  url: "https://captureclient.com/integrations",
  about: {
    "@type": "SoftwareApplication",
    name: "Capture Client",
    applicationCategory: "BusinessApplication",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "97",
      highPrice: "2997",
      offerCount: "3",
    },
  },
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Capture Client",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "97",
    priceCurrency: "USD",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "27",
  },
  featureList: [
    "Stripe Payment Integration",
    "Twilio SMS & Voice Integration",
    "Zapier Automation (5,000+ apps)",
    "Salesforce CRM Integration",
    "HubSpot Marketing Integration",
    "Google Calendar Sync",
    "Mailchimp Email Marketing",
    "Facebook Ads Integration",
    "Google Ads Integration",
    "QuickBooks Accounting Integration",
  ],
};

export default function IntegrationsPage() {
  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-white">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(integrationsSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema),
        }}
      />

      {/* Hero Section */}
      <IntegrationsHero />

      {/* Integrations Grid with Filter */}
      <IntegrationsGrid />

      {/* Bottom CTA Section */}
      <IntegrationsCTA />
    </div>
  );
}
