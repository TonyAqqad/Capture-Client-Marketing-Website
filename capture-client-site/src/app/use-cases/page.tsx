import { Metadata } from "next";
import UseCasesClient from "./UseCasesClient";

export const metadata: Metadata = {
  title: "AI Voice Agent Use Cases | Capture Client",
  description: "Discover how AI voice agents transform businesses. 24/7 call answering, lead qualification, appointment booking. See real use cases across industries.",
  keywords: [
    "AI voice agent use cases",
    "AI phone answering service",
    "AI appointment booking",
    "AI lead qualification",
    "business automation",
    "AI receptionist examples",
    "voice AI for business",
    "automated customer service",
    "AI call handling",
    "business phone automation"
  ],
  openGraph: {
    title: "AI Voice Agent Use Cases | Capture Client",
    description: "Discover how AI voice agents transform businesses. 24/7 call answering, lead qualification, appointment booking. See real use cases across industries.",
    url: "https://captureclient.com/use-cases",
    siteName: "Capture Client",
    type: "website",
    images: [
      {
        url: "https://captureclient.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Capture Client AI Voice Agent Use Cases",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Voice Agent Use Cases | Capture Client",
    description: "Discover how AI voice agents transform businesses. 24/7 call answering, lead qualification, appointment booking. See real use cases across industries.",
    images: ["https://captureclient.com/og-image.png"],
  },
  alternates: {
    canonical: "https://captureclient.com/use-cases",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLdWebPage = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://captureclient.com/use-cases",
  "url": "https://captureclient.com/use-cases",
  "name": "AI Voice Agent Use Cases",
  "description": "Discover how AI voice agents transform businesses across industries with 24/7 call answering, lead qualification, and appointment booking.",
  "publisher": {
    "@type": "Organization",
    "name": "Capture Client",
    "url": "https://captureclient.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://captureclient.com/logo.svg"
    }
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://captureclient.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Use Cases",
        "item": "https://captureclient.com/use-cases"
      }
    ]
  },
  "mainEntity": {
    "@type": "ItemList",
    "name": "AI Voice Agent Use Cases by Industry",
    "description": "Industry-specific use cases for AI voice agents",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Healthcare & Medical",
        "description": "24/7 appointment scheduling, patient follow-ups, emergency triage"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Home Services",
        "description": "HVAC, plumbing & electrical emergency dispatch, service quotes"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Legal Services",
        "description": "Case intake, client qualification, consultation scheduling"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Real Estate",
        "description": "Property inquiries, showing scheduling, lead qualification"
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "Automotive",
        "description": "Service appointments, test drive scheduling, parts inquiries"
      },
      {
        "@type": "ListItem",
        "position": 6,
        "name": "Restaurants & Hospitality",
        "description": "Reservation management, catering inquiries, delivery support"
      },
      {
        "@type": "ListItem",
        "position": 7,
        "name": "Fitness & Wellness",
        "description": "Class registration, membership inquiries, training sessions"
      },
      {
        "@type": "ListItem",
        "position": 8,
        "name": "Financial Services",
        "description": "Mortgage pre-qualification, insurance quotes, advisor appointments"
      }
    ]
  }
};

export default function UseCasesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebPage) }}
      />
      <UseCasesClient />
    </>
  );
}
