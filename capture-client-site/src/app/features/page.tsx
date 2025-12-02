import type { Metadata } from "next";
import FeaturesPageClient from "./FeaturesPageClient";

export const metadata: Metadata = {
  title: "Platform Features | All-in-One Growth Hub | Capture Client",
  description:
    "Explore Capture Client's powerful features: AI Voice Agents, CRM, automated lead generation, real-time analytics, and unified inbox—all in one platform.",
};

// Feature data for schema generation
const featuresData = [
  {
    name: "AI Voice Agents",
    description:
      "24/7 AI-powered voice agents that handle unlimited calls, qualify leads, book appointments, and answer questions with natural conversation.",
    url: "https://captureclientai.net/services/voice-ai",
  },
  {
    name: "Built-in CRM",
    description:
      "Manage all client interactions, track conversations, and organize your sales pipeline in one unified system.",
    url: "https://captureclientai.net/features#crm",
  },
  {
    name: "Real-Time Analytics",
    description:
      "Track every metric that matters with beautiful, real-time dashboards showing campaign performance, ROI, and growth trends.",
    url: "https://captureclientai.net/features#analytics",
  },
  {
    name: "Google Ads Management",
    description:
      "Professional campaign management with conversion tracking and optimization for maximum ROI.",
    url: "https://captureclientai.net/services/google-ads",
  },
  {
    name: "Facebook Ads Management",
    description:
      "Targeted social advertising that generates qualified leads from your ideal customers.",
    url: "https://captureclientai.net/services/facebook-ads",
  },
  {
    name: "Unified Inbox",
    description:
      "All communications in one place - calls, texts, emails, forms. Never miss a message.",
    url: "https://captureclientai.net/features#inbox",
  },
  {
    name: "Smart Scheduling",
    description:
      "Automated booking with calendar integration and smart reminders for appointments.",
    url: "https://captureclientai.net/features#scheduling",
  },
  {
    name: "Lead Forms",
    description:
      "Custom lead capture forms with automatic CRM integration and instant notifications.",
    url: "https://captureclientai.net/features#forms",
  },
  {
    name: "Workflow Automation",
    description:
      "Trigger-based workflows that automate follow-ups, notifications, and task assignments.",
    url: "https://captureclientai.net/features#automation",
  },
];

// WebPage Schema for the Features page
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://captureclientai.net/features/#webpage",
  url: "https://captureclientai.net/features",
  name: "Platform Features | All-in-One Growth Hub | Capture Client",
  description:
    "Explore Capture Client's powerful features: AI Voice Agents, CRM, automated lead generation, real-time analytics, and unified inbox—all in one platform.",
  isPartOf: {
    "@id": "https://captureclientai.net/#website",
  },
  about: {
    "@id": "https://captureclientai.net/#organization",
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://captureclientai.net",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Features",
        item: "https://captureclientai.net/features",
      },
    ],
  },
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "h2", ".feature-title", ".feature-description"],
  },
  datePublished: "2023-01-01",
  dateModified: new Date().toISOString().split("T")[0],
  inLanguage: "en-US",
};

// ItemList Schema for features - helps with rich snippets
const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": "https://captureclientai.net/features/#itemlist",
  name: "Capture Client Platform Features",
  description:
    "Complete list of features available in the Capture Client marketing automation platform.",
  numberOfItems: featuresData.length,
  itemListElement: featuresData.map((feature, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: feature.name,
    description: feature.description,
    url: feature.url,
  })),
};

// SoftwareApplication Schema - for software/platform features
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": "https://captureclientai.net/#software",
  name: "Capture Client",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web Browser",
  description:
    "AI-powered marketing automation platform with Voice AI, CRM, analytics, and ads management for small businesses.",
  url: "https://captureclientai.net",
  provider: {
    "@id": "https://captureclientai.net/#organization",
  },
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "999",
    highPrice: "3995",
    priceCurrency: "USD",
    offerCount: 3,
  },
  featureList: featuresData.map((f) => f.name),
  screenshot: "https://captureclientai.net/dashboard-screenshot.png",
  // aggregateRating removed until real reviews exist
  // TODO: Add real reviews from Google Business Profile once established
};

export default function FeaturesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            webPageSchema,
            itemListSchema,
            softwareSchema,
          ]),
        }}
      />
      <FeaturesPageClient />
    </>
  );
}
