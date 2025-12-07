import { Metadata } from "next";
import AutomotivePageClient from "./AutomotivePageClient";

// JSON-LD Schemas
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://captureclientai.net/industries/automotive#service",
  name: "AI BDC for Car Dealerships",
  description: "24/7 AI BDC agents for automotive dealerships. Handle sales inquiries, service appointments, and customer follow-ups. Integrates with DealerSocket, CDK, Reynolds & Reynolds.",
  provider: {
    "@type": "Organization",
    name: "Capture Client",
    url: "https://captureclientai.net",
  },
  serviceType: "AI Voice Agent Service",
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is an AI BDC for car dealerships?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An AI BDC (Business Development Center) uses artificial intelligence to handle sales and service calls 24/7. It qualifies leads, books test drives, schedules service appointments, and follows up with customers automatically.",
      },
    },
    {
      "@type": "Question",
      name: "Does the AI integrate with dealer management systems?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, our AI integrates with DealerSocket, CDK Global, Reynolds & Reynolds, and other major DMS platforms for seamless CRM updates and appointment scheduling.",
      },
    },
    {
      "@type": "Question",
      name: "Can AI handle both sales and service calls?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. Our AI is trained for automotive-specific conversations including new/used car inquiries, trade-in questions, service scheduling, parts orders, and recall notifications.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://captureclientai.net" },
    { "@type": "ListItem", position: 2, name: "Industries", item: "https://captureclientai.net/industries" },
    { "@type": "ListItem", position: 3, name: "Automotive", item: "https://captureclientai.net/industries/automotive" },
  ],
};

// SEO Metadata (Server Component)
export const metadata: Metadata = {
  title: "AI BDC for Car Dealerships | Sales & Service | Capture Client",
  description: "AI BDC agents for car dealerships. Stop losing $49K/year to missed calls. CDK & Reynolds integration. Sales leads + service appointments 24/7.",
  keywords: [
    "AI BDC",
    "car dealership AI",
    "automotive AI",
    "dealership call center",
    "CDK integration",
    "Reynolds integration",
    "DealerSocket",
    "Tekion",
    "service appointments",
    "sales leads automotive",
    "missed calls dealership"
  ],
  openGraph: {
    title: "AI BDC for Car Dealerships | Sales & Service",
    description: "Stop losing $49K/year to missed calls. AI BDC agents that integrate with your DMS for 24/7 sales and service.",
    url: "https://captureclientai.net/industries/automotive",
    siteName: "Capture Client",
    type: "website",
    images: [{
      url: "https://captureclientai.net/og-automotive.jpg",
      width: 1200,
      height: 630,
      alt: "AI BDC for Car Dealerships - Capture Client",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI BDC for Car Dealerships | Sales & Service",
    description: "Stop losing $49K/year to missed calls. AI BDC agents for 24/7 sales and service.",
    images: ["https://captureclientai.net/og-automotive.jpg"],
  },
  alternates: {
    canonical: "https://captureclientai.net/industries/automotive",
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

export default function AutomotivePage() {
  return (
    <>
      <AutomotivePageClient />
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
    </>
  );
}
