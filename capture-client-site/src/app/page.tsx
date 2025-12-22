import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { LightHero } from "@/components/sections/LightHero";
import { LightStats } from "@/components/sections/LightStats";
import { LightIntegrationCarousel } from "@/components/sections/LightIntegrationCarousel";
import { LightHowItWorks } from "@/components/sections/LightHowItWorks";
import { PremiumTestimonials } from "@/components/sections/PremiumTestimonials";
import { PremiumFinalCTA } from "@/components/sections/PremiumFinalCTA";
import { CaseStudiesPreview } from "@/components/sections/CaseStudiesPreview";
import { GoogleReviews } from "@/components/sections/GoogleReviews";

// Lazy load ExitIntentPopup for code splitting (component has early-return optimization)
const ExitIntentPopup = dynamic(
  () => import("@/components/cro/ExitIntentPopup"),
  {
    loading: () => null, // Don't show anything while loading
  }
);

// Lazy load heavy below-the-fold components to improve LCP
const PhoneDemoCard = dynamic(
  () => import("@/components/PhoneDemoCard"),
  {
    loading: () => (
      <div className="w-full h-[500px] bg-slate-100 animate-pulse rounded-2xl" />
    ),
  }
);

const ROICalculator = dynamic(
  () => import("@/components/ROICalculator"),
  {
    loading: () => (
      <div className="w-full h-96 bg-slate-100 animate-pulse rounded-2xl" />
    ),
  }
);


// SEO Metadata for Homepage
export const metadata: Metadata = {
  title: "AI Voice Agents for Small Business | Capture Client",
  description:
    "Never miss a lead again. AI voice agents answer calls 24/7, qualify leads, and book appointments automatically. Transform missed calls into revenue.",
  keywords: [
    "AI voice agents",
    "lead generation",
    "small business marketing",
    "Google Ads management",
    "Facebook Ads agency",
    "CRM",
    "automated lead capture",
    "Knoxville marketing agency",
    "AI receptionist",
    "24/7 call answering",
    "virtual receptionist",
    "conversational AI",
    "appointment scheduling ai",
    "lead qualification",
  ],
  openGraph: {
    title: "AI Voice Agents for Small Business | Capture Client",
    description:
      "Never miss a lead again. AI voice agents answer calls 24/7, qualify leads, and book appointments automatically.",
    url: "https://captureclient.com",
    siteName: "Capture Client",
    type: "website",
    images: [
      {
        url: "https://captureclient.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Capture Client - AI Voice Agents for Small Business",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Voice Agents for Small Business | Capture Client",
    description:
      "Never miss a lead again. AI voice agents answer calls 24/7, qualify leads, and book appointments.",
    images: ["https://captureclient.com/og-image.png"],
  },
  alternates: {
    canonical: "https://captureclient.com",
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

// FAQ Schema for rich snippets (page-specific)
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Will the AI voice agent sound robotic?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not at all! Our AI uses cutting-edge natural language processing that sounds remarkably human. It understands context, speaks naturally with appropriate emotion, and even handles interruptions gracefully. Most callers don't realize they're speaking with AI until we tell them.",
      },
    },
    {
      "@type": "Question",
      name: "How long does setup take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We can have you up and running in as little as 48 hours. Our team handles the heavy lifting: we'll set up your AI agent, configure your ad campaigns, import your existing contacts to the CRM, and train you on the dashboard. Most clients are fully operational within a week with zero technical knowledge required.",
      },
    },
    {
      "@type": "Question",
      name: "What if I want to cancel?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Zero hassle. We offer month-to-month contracts with no long-term commitment required. If you decide to cancel, we'll help export all your data, and you'll keep full access until the end of your billing period.",
      },
    },
    {
      "@type": "Question",
      name: "Is this really worth the investment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Let's do the math: if our system captures just 5 extra leads per month that convert at 20%, that's 1 new client. For most businesses, one new client pays for the entire system multiple times over. Our average client sees 3x ROI within 90 days.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need technical knowledge to use this?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely not! Our platform is designed for busy business owners, not tech experts. Everything is visual and intuitive. We provide personalized training, video tutorials, and our support team is always one call away.",
      },
    },
  ],
};

// LocalBusiness Schema for local SEO
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://captureclient.com/#localbusiness",
  name: "Capture Client",
  image: "https://captureclient.com/logo-full.svg",
  telephone: "+1-865-346-6111",
  email: "team@captureclient.com",
  url: "https://captureclient.com",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Knoxville",
    addressRegion: "TN",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 35.9606,
    longitude: -83.9207,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  areaServed: [
    { "@type": "State", name: "Tennessee" },
    { "@type": "State", name: "Georgia" },
    { "@type": "State", name: "North Carolina" },
    { "@type": "State", name: "Kentucky" },
    { "@type": "State", name: "Virginia" },
  ],
};

// Product/Pricing Schema for rich snippets
const pricingSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Capture Client AI Voice Agent",
  "description": "24/7 AI voice agents that answer calls, qualify leads, and book appointments for small businesses",
  "brand": {
    "@type": "Brand",
    "name": "Capture Client"
  },
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "USD",
    "lowPrice": "97",
    "highPrice": "950",
    "offerCount": "2",
    "offers": [
      {
        "@type": "Offer",
        "name": "Starter",
        "price": "97",
        "priceCurrency": "USD",
        "priceValidUntil": "2026-12-31",
        "availability": "https://schema.org/InStock",
        "url": "https://captureclient.com/pricing"
      },
      {
        "@type": "Offer",
        "name": "Growth",
        "price": "950",
        "priceCurrency": "USD",
        "priceValidUntil": "2026-12-31",
        "availability": "https://schema.org/InStock",
        "url": "https://captureclient.com/pricing"
      }
    ]
  }
};

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-white">
      {/* JSON-LD Structured Data - Page-specific schemas only */}
      {/* Organization schema is rendered globally in layout.tsx */}

      {/* WebSite Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Capture Client",
            url: "https://captureclient.com",
            description: "AI Voice Agents for Business - Never miss a lead again"
          })
        }}
      />

      {/* SoftwareApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Capture Client AI Voice Agent",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web, iOS, Android",
            offers: {
              "@type": "Offer",
              price: "297",
              priceCurrency: "USD"
            }
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }}
      />

      {/* ==================== EXIT INTENT POPUP ==================== */}
      <ExitIntentPopup />

      {/* ==================== SECTION 1: LIGHT HERO ==================== */}
      <LightHero />

      {/* ==================== SECTION 2: LIGHT STATS ==================== */}
      <LightStats />

      {/* ==================== SECTION 2.5: INTEGRATION CAROUSEL ==================== */}
      <LightIntegrationCarousel />

      {/* ==================== MOBILE DEMO CARD - Only visible on mobile/tablet ==================== */}
      <section className="lg:hidden py-12 bg-slate-50">
        <div className="container-custom px-4 sm:px-6">
          <PhoneDemoCard />
        </div>
      </section>

      {/* ==================== SECTION 3: LIGHT HOW IT WORKS ==================== */}
      <LightHowItWorks />

      {/* ==================== SECTION 3.5: ROI CALCULATOR ==================== */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ROICalculator />
        </div>
      </section>

      {/* ==================== SECTION 4: CASE STUDIES ==================== */}
      <CaseStudiesPreview />

      {/* ==================== SECTION 5: TESTIMONIALS ==================== */}
      <PremiumTestimonials />

      {/* ==================== SECTION 5.5: GOOGLE REVIEWS ==================== */}
      {/* Real Google reviews - 5.0 rating, 27 reviews - high trust signal before CTA */}
      <GoogleReviews />

      {/* ==================== SECTION 6: FINAL CTA ==================== */}
      <PremiumFinalCTA />
    </div>
  );
}
