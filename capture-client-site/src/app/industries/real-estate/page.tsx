import type { Metadata } from "next";
import { RealEstateHero } from "@/components/industries/real-estate/RealEstateHero";
import { SpeedToLeadTimeline } from "@/components/industries/real-estate/SpeedToLeadTimeline";
import { LeadQualificationFeatures } from "@/components/industries/real-estate/LeadQualificationFeatures";
import { CRMIntegrations } from "@/components/industries/real-estate/CRMIntegrations";
import { RealEstateUseCases } from "@/components/industries/real-estate/RealEstateUseCases";
import { RealEstateROICalculator } from "@/components/industries/real-estate/RealEstateROICalculator";
import { AfterHoursSection } from "@/components/industries/real-estate/AfterHoursSection";
import { RealEstateFinalCTA } from "@/components/industries/real-estate/RealEstateFinalCTA";
import { PremiumTestimonials } from "@/components/sections/PremiumTestimonials";
import { PremiumFAQ } from "@/components/sections/PremiumFAQ";

export const metadata: Metadata = {
  title: "AI for Real Estate | Speed to Lead | Capture Client",
  description:
    "78% of buyers choose the first agent who responds. AI voice agents for real estate that respond in under 1 minute. Follow Up Boss & Zillow integration. Never miss a lead again.",
  keywords: [
    "AI voice agents for real estate",
    "real estate lead response time",
    "speed to lead real estate",
    "Follow Up Boss integration",
    "kvCORE integration",
    "Zillow lead response",
    "real estate ISA",
    "AI ISA for real estate",
    "automated lead qualification real estate",
    "real estate CRM integration",
    "24/7 lead response real estate",
    "real estate lead capture",
    "automated showing scheduling",
  ],
  openGraph: {
    title: "AI for Real Estate | Speed to Lead | Capture Client",
    description:
      "78% of buyers choose the first agent who responds. Be first. Every time. With AI voice agents that respond in under 1 minute.",
    url: "https://captureclient.com/industries/real-estate",
    siteName: "Capture Client",
    type: "website",
    images: [
      {
        url: "https://captureclient.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Capture Client - AI for Real Estate Agents",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI for Real Estate | Speed to Lead | Capture Client",
    description:
      "78% of buyers choose the first agent who responds. AI voice agents that respond in under 1 minute.",
    images: ["https://captureclient.com/og-image.png"],
  },
  alternates: {
    canonical: "https://captureclient.com/industries/real-estate",
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

// JSON-LD Schema Markup
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://captureclient.com/industries/real-estate#service",
  name: "AI Voice Agents for Real Estate",
  description:
    "Speed to lead AI that answers every inquiry instantly. Qualify buyers and sellers, schedule showings, and capture leads 24/7 for real estate agents and property managers.",
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
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why is speed to lead important in real estate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Studies show that responding to leads within 5 minutes increases conversion by 400%. AI voice agents answer instantly, ensuring you never lose a lead to a faster competitor.",
      },
    },
    {
      "@type": "Question",
      name: "Can the AI schedule property showings?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, our AI integrates with your calendar to schedule showings, open house registrations, and buyer/seller consultations automatically.",
      },
    },
    {
      "@type": "Question",
      name: "Does it work for property management companies?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. AI handles tenant inquiries, maintenance requests, leasing calls, and appointment scheduling for property management companies of all sizes.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://captureclient.com" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Who We Serve",
      item: "https://captureclient.com/who-we-serve",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Real Estate",
      item: "https://captureclient.com/industries/real-estate",
    },
  ],
};

export default function RealEstatePage() {
  return (
    <>
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
      <main className="min-h-screen bg-gradient-to-b from-white to-slate-50">
        {/* Hero Section */}
        <RealEstateHero />

        {/* Speed to Lead Stats Section */}
        <SpeedToLeadTimeline />

        {/* Lead Qualification Features */}
        <LeadQualificationFeatures />

        {/* CRM Integration Showcase */}
        <CRMIntegrations />

        {/* Real Estate Use Cases */}
        <RealEstateUseCases />

        {/* ROI Calculator */}
        <RealEstateROICalculator />

        {/* After Hours Section */}
        <AfterHoursSection />

        {/* Testimonials */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PremiumTestimonials />
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PremiumFAQ />
          </div>
        </section>

        {/* Final CTA */}
        <RealEstateFinalCTA />
      </main>
    </>
  );
}
