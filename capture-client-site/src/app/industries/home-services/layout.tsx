import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Answering Service for Contractors | HVAC, Plumbing, Electrical | Capture Client",
  description:
    "Stop losing $69K/year to missed calls. AI voice agents for HVAC, plumbing, electrical, and roofing contractors. ServiceTitan & Housecall Pro integration. 24/7 emergency call capture.",
  keywords: [
    "AI answering service for contractors",
    "HVAC AI receptionist",
    "plumbing answering service",
    "electrical contractor AI",
    "roofing lead capture",
    "ServiceTitan integration",
    "Housecall Pro integration",
    "contractor missed calls",
    "emergency call answering",
    "24/7 contractor phone service",
    "field service management AI",
    "contractor call center",
    "home services AI",
    "trade contractor automation",
  ],
  openGraph: {
    title: "AI Answering Service for Contractors | Stop Losing $69K/Year to Missed Calls",
    description:
      "AI voice agents answer every emergency call for HVAC, plumbing, electrical, and roofing contractors. Integrates with ServiceTitan & Housecall Pro.",
    url: "https://captureclientai.net/industries/home-services",
    siteName: "Capture Client",
    type: "website",
    images: [
      {
        url: "https://captureclientai.net/og-home-services.jpg",
        width: 1200,
        height: 630,
        alt: "AI Voice Agents for Home Service Contractors",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Answering Service for Contractors | Capture Every Emergency Call",
    description:
      "Stop losing $69K/year to missed calls. AI answers 24/7, qualifies leads, books jobs into ServiceTitan/Housecall Pro.",
    images: ["https://captureclientai.net/og-home-services.jpg"],
  },
  alternates: {
    canonical: "https://captureclientai.net/industries/home-services",
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

// JSON-LD Schema for Home Services Industry Page
const industrySchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "AI Answering Service for Home Service Contractors",
  provider: {
    "@type": "Organization",
    name: "Capture Client",
    url: "https://captureclientai.net",
  },
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  audience: {
    "@type": "Audience",
    audienceType: "HVAC, Plumbing, Electrical, and Roofing Contractors",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Home Services Solutions",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "24/7 AI Call Answering",
          description: "AI voice agents answer emergency calls for contractors",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "ServiceTitan Integration",
          description: "Automatic job booking into ServiceTitan",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Housecall Pro Integration",
          description: "Seamless integration with Housecall Pro FSM",
        },
      },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much revenue do contractors lose to missed calls?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Studies show that 27% of contractor calls go unanswered, and 85% of missed callers never call back. For the average contractor receiving 100 calls per month with an average job value of $1,200, this results in approximately $69,000 in lost annual revenue.",
      },
    },
    {
      "@type": "Question",
      name: "Does the AI integrate with ServiceTitan and Housecall Pro?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Our AI voice agents integrate seamlessly with ServiceTitan, Housecall Pro, Jobber, FieldEdge, and other major field service management platforms. Jobs are automatically booked into your existing calendar with zero manual data entry.",
      },
    },
    {
      "@type": "Question",
      name: "Can the AI handle emergency calls at 3 AM?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. Our AI voice agents operate 24/7/365 and can instantly identify emergency situations, capture critical details, and either dispatch your on-call technician or schedule the first available appointment. No more missed emergency calls worth $900+.",
      },
    },
    {
      "@type": "Question",
      name: "What trades does this work for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our AI answering service is specifically optimized for HVAC contractors, plumbing companies, electrical contractors, and roofing businesses. The AI understands trade-specific terminology and can qualify jobs based on your industry's unique requirements.",
      },
    },
  ],
};

export default function HomeServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(industrySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
