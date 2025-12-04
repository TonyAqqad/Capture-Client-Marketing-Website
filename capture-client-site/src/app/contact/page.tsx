import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Us | Get Your Free Consultation | Capture Client",
  description:
    "Contact Capture Client for Voice AI, Google Ads, and Facebook Ads services. Call (865) 346-3339 or fill out our form for a free consultation.",
  alternates: {
    canonical: "https://captureclientai.net/contact",
  },
};

// LocalBusiness Schema - detailed business information for local SEO
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://captureclientai.net/#localbusiness",
  name: "Capture Client",
  image: "https://captureclientai.net/logo-full.png",
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

// Organization Schema reference
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://captureclientai.net/#organization",
  name: "Capture Client",
  url: "https://captureclientai.net",
  logo: "https://captureclientai.net/logo-full.png",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-865-346-3339",
    contactType: "sales",
    email: "team@captureclientai.net",
    areaServed: "US",
    availableLanguage: ["English"],
    contactOption: ["TollFree"],
    hoursAvailable: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            localBusinessSchema,
            contactPageSchema,
            organizationSchema,
          ]),
        }}
      />
      <ContactPageClient />
    </>
  );
}
