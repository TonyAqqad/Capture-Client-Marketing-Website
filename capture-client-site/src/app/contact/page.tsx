import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Us | Get Your Free Consultation | Capture Client",
  description:
    "Contact Capture Client for Voice AI, Google Ads, and Facebook Ads services. Call (865) 346-3339 or fill out our form for a free consultation.",
  keywords: [
    "contact capture client",
    "ai voice agents consultation",
    "free demo call",
    "marketing automation quote",
    "voice ai pricing",
    "lead generation inquiry"
  ],
  openGraph: {
    title: "Contact Us | Get Your Free Consultation | Capture Client",
    description: "Ready to stop missing calls? Contact Capture Client for a free AI voice agent demo. Call (865) 346-3339 or fill out our form.",
    url: "https://captureclientai.net/contact",
    siteName: "Capture Client",
    type: "website",
    images: [{
      url: "https://captureclientai.net/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Contact Capture Client",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Get Your Free Consultation | Capture Client",
    description: "Ready to stop missing calls? Contact Capture Client for a free AI voice agent demo.",
    images: ["https://captureclientai.net/og-image.jpg"],
  },
  alternates: {
    canonical: "https://captureclientai.net/contact",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// LocalBusiness Schema - detailed business information for local SEO
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://captureclientai.net/#localbusiness",
  name: "Capture Client",
  image: "https://captureclientai.net/logo-full.svg",
  telephone: "+1-865-346-3339",
  email: "team@captureclientai.net",
  url: "https://captureclientai.net",
  address: {
    "@type": "PostalAddress",
    streetAddress: "",
    addressLocality: "Knoxville",
    addressRegion: "TN",
    postalCode: "",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 35.9606,
    longitude: -83.9207,
  },
  priceRange: "$$",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  areaServed: [
    {
      "@type": "State",
      name: "Tennessee",
    },
    {
      "@type": "Country",
      name: "United States",
    },
  ],
  serviceArea: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 35.9606,
      longitude: -83.9207,
    },
    geoRadius: "500 mi",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Marketing Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Voice Agents",
          description:
            "24/7 AI-powered voice agents that answer calls, qualify leads, and book appointments automatically.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Google Ads Management",
          description:
            "ROI-focused PPC campaigns that capture high-intent customers.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Facebook Ads Management",
          description:
            "Targeted social advertising that generates qualified leads.",
        },
      },
    ],
  },
  // aggregateRating removed until real reviews exist
  // TODO: Add real reviews from Google Business Profile once established
};

// ContactPage Schema
const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": "https://captureclientai.net/contact/#webpage",
  url: "https://captureclientai.net/contact",
  name: "Contact Us | Get Your Free Consultation | Capture Client",
  description:
    "Contact Capture Client for Voice AI, Google Ads, and Facebook Ads services. Call (865) 346-3339 or fill out our form for a free consultation.",
  isPartOf: {
    "@id": "https://captureclientai.net/#website",
  },
  about: {
    "@id": "https://captureclientai.net/#organization",
  },
  mainEntity: {
    "@id": "https://captureclientai.net/#localbusiness",
  },
  datePublished: "2023-01-01",
  dateModified: new Date().toISOString().split("T")[0],
  inLanguage: "en-US",
};

// Organization schema is rendered globally in layout.tsx - no need to duplicate
// ContactPoint can be added as page-specific enhancement to Organization schema if needed

export default function ContactPage() {
  return (
    <>
      {/* JSON-LD Structured Data - Page-specific schemas only */}
      {/* Organization schema is rendered globally in layout.tsx */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            localBusinessSchema,
            contactPageSchema,
          ]),
        }}
      />
      <ContactPageClient />
    </>
  );
}
