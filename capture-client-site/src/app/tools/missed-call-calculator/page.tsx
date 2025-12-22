import { Metadata } from "next";
import MissedCallCalculatorClient from "./MissedCallCalculatorClient";

export const metadata: Metadata = {
  title: "Missed Call Calculator | See Your Lost Revenue | Capture Client",
  description:
    "Calculate exactly how much revenue your business loses from missed calls. Free calculator with industry benchmarks for martial arts, fitness, legal, and home services.",
  keywords: [
    "missed call calculator",
    "missed call cost calculator",
    "lost revenue calculator",
    "phone call roi calculator",
    "business call calculator",
    "lead loss calculator",
  ],
  openGraph: {
    title: "Missed Call Calculator | See Your Lost Revenue | Capture Client",
    description:
      "Calculate exactly how much revenue your business loses from missed calls. Free calculator with industry benchmarks.",
    url: "https://captureclient.com/tools/missed-call-calculator",
    siteName: "Capture Client",
    type: "website",
    images: [
      {
        url: "https://captureclient.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Missed Call Calculator - Capture Client",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Missed Call Calculator | See Your Lost Revenue",
    description: "Calculate exactly how much revenue your business loses from missed calls.",
    images: ["https://captureclient.com/og-image.png"],
  },
  alternates: {
    canonical: "https://captureclient.com/tools/missed-call-calculator",
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

// JSON-LD Schemas
const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Missed Call Revenue Calculator",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "Free calculator to estimate revenue lost from missed business calls, with industry-specific benchmarks.",
  provider: {
    "@type": "Organization",
    name: "Capture Client",
    url: "https://captureclient.com",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I calculate revenue lost from missed calls?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Multiply your missed calls per month by your average lead value and your conversion rate. For example, if you miss 60 calls per month, each lead is worth $3,500, and you convert 30% of leads, you're losing $63,000 per month (60 × $3,500 × 0.30).",
      },
    },
    {
      "@type": "Question",
      name: "What is the average missed call rate for small businesses?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most small businesses miss 30-40% of inbound calls. Home service businesses like plumbers and HVAC techs tend to miss more (40%+) because they're on job sites, while office-based businesses miss around 25-30%.",
      },
    },
    {
      "@type": "Question",
      name: "How can I reduce missed calls for my business?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Options include hiring a receptionist, using an answering service, or implementing an AI voice agent. AI voice agents like Capture Client can answer 24/7 with 85%+ capture rates at a fraction of the cost of human staff.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://captureclient.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Tools",
      item: "https://captureclient.com/tools",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Missed Call Calculator",
      item: "https://captureclient.com/tools/missed-call-calculator",
    },
  ],
};

export default function MissedCallCalculatorPage() {
  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Main Content */}
      <MissedCallCalculatorClient />
    </>
  );
}
