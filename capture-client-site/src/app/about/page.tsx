import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Capture Client | Voice AI & Marketing Automation",
  description:
    "Learn about Capture Client, the marketing automation platform helping small businesses capture more clients with AI voice agents and paid advertising.",
  keywords: [
    "capture client",
    "ai voice agents company",
    "marketing automation agency",
    "lead generation experts",
    "small business ai solutions",
    "voice ai for business"
  ],
  openGraph: {
    title: "About Capture Client | Voice AI & Marketing Automation",
    description: "Meet the team behind Capture Client. We help small businesses capture more leads with AI-powered 24/7 voice agents and marketing automation.",
    url: "https://captureclient.com/about",
    siteName: "Capture Client",
    type: "website",
    images: [{
      url: "https://captureclient.com/og-image.png",
      width: 1200,
      height: 630,
      alt: "Capture Client - AI Voice Agents & Marketing Automation",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Capture Client | Voice AI & Marketing Automation",
    description: "Learn how Capture Client helps small businesses grow with AI voice agents and marketing automation.",
    images: ["https://captureclient.com/og-image.png"],
  },
  alternates: {
    canonical: "https://captureclient.com/about",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Organization schema is rendered globally in layout.tsx - no need to duplicate here

// AboutPage Schema - specific to this page
const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://captureclient.com/about/#webpage",
  url: "https://captureclient.com/about",
  name: "About Capture Client | Voice AI & Marketing Automation",
  description:
    "Learn about Capture Client, the marketing automation platform helping small businesses capture more clients with AI voice agents and paid advertising.",
  isPartOf: {
    "@id": "https://captureclient.com/#website",
  },
  about: {
    "@id": "https://captureclient.com/#organization",
  },
  mainEntity: {
    "@id": "https://captureclient.com/#organization",
  },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: "https://captureclient.com/logo-full.svg",
  },
  datePublished: "2023-01-01",
  dateModified: new Date().toISOString().split("T")[0],
  inLanguage: "en-US",
};

// WebSite schema is also rendered globally in layout.tsx - no need to duplicate

export default function AboutPage() {
  return (
    <>
      {/* JSON-LD Structured Data - Page-specific schemas only */}
      {/* Organization and WebSite schemas are rendered globally in layout.tsx */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutPageSchema),
        }}
      />
      <AboutClient />
    </>
  );
}
