import type { Metadata } from "next";
import HomeServicesClient from "./HomeServicesClient";

// SEO Metadata for Home Services Industry Page
export const metadata: Metadata = {
  title: "AI for HVAC, Plumbing & Contractors | Capture Client",
  description:
    "Stop losing $69K/year to missed calls. AI voice agents answer every emergency call 24/7 for HVAC, plumbing, electrical & roofing contractors. ServiceTitan & Housecall Pro integration.",
  keywords: [
    "AI voice agents for contractors",
    "HVAC answering service",
    "plumbing AI receptionist",
    "electrical contractor phone answering",
    "roofing lead capture",
    "24/7 contractor answering service",
    "ServiceTitan integration",
    "Housecall Pro AI",
    "missed call recovery",
    "after hours answering service",
    "emergency dispatch AI",
    "home services lead generation",
    "contractor AI phone system",
    "field service management AI",
  ],
  openGraph: {
    title: "AI for HVAC, Plumbing & Contractors | Capture Client",
    description:
      "Stop losing $69K/year to missed calls. AI voice agents answer every emergency call 24/7 for contractors. Never miss a 3 AM burst pipe again.",
    url: "https://captureclient.com/industries/home-services",
    siteName: "Capture Client",
    type: "website",
    images: [
      {
        url: "https://captureclient.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Capture Client - AI for HVAC, Plumbing & Contractors",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI for HVAC, Plumbing & Contractors | Capture Client",
    description:
      "Stop losing $69K/year to missed calls. AI answers every emergency call 24/7. ServiceTitan & Housecall Pro integration.",
    images: ["https://captureclient.com/og-image.png"],
  },
  alternates: {
    canonical: "https://captureclient.com/industries/home-services",
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
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://captureclient.com/industries/home-services#service",
  name: "AI Voice Agents for Home Services Contractors",
  description:
    "24/7 AI voice agents that answer every call, qualify leads, and book appointments for HVAC, plumbing, electrical, and roofing contractors. Integrates with ServiceTitan, Housecall Pro, Jobber, and FieldEdge.",
  provider: {
    "@type": "Organization",
    name: "Capture Client",
    url: "https://captureclient.com",
  },
  serviceType: "AI Voice Agent Service",
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Home Services AI Solutions",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "HVAC AI Voice Agent",
          description: "24/7 AI answering for HVAC emergencies and service calls",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Plumbing AI Voice Agent",
          description: "Emergency plumbing call capture and appointment booking",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Electrical AI Voice Agent",
          description: "Power outage and electrical emergency response AI",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Roofing AI Voice Agent",
          description: "Storm damage lead capture and inspection scheduling",
        },
      },
    ],
  },
};

// FAQ Schema for rich snippets
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much revenue do contractors lose to missed calls?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "On average, contractors lose approximately $69,000 per year to missed calls. 27% of contractor calls go unanswered, and 85% of those callers never leave a voicemail - they call your competitor instead.",
      },
    },
    {
      "@type": "Question",
      name: "Does the AI voice agent integrate with ServiceTitan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Our AI voice agents integrate seamlessly with ServiceTitan, Housecall Pro, Jobber, FieldEdge, and other popular field service management platforms. Jobs are booked directly into your calendar with zero manual data entry.",
      },
    },
    {
      "@type": "Question",
      name: "Can the AI handle emergency after-hours calls?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. Our AI answers calls 24/7/365, including 3 AM emergencies and weekend calls. It qualifies the urgency level, captures all necessary details, and can dispatch your on-call technician or schedule for the next available slot.",
      },
    },
    {
      "@type": "Question",
      name: "How quickly does the AI answer calls?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our AI answers within 2 rings - faster than any human receptionist. This speed is critical for capturing emergency calls before the customer hangs up and calls your competitor.",
      },
    },
  ],
};

// Breadcrumb Schema
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
      name: "Who We Serve",
      item: "https://captureclient.com/who-we-serve",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Home Services",
      item: "https://captureclient.com/industries/home-services",
    },
  ],
};

export default function HomeServicesPage() {
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

      {/* Page Content */}
      <HomeServicesClient />
    </>
  );
}
