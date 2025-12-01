import type { Metadata } from "next";
import Link from "next/link";
import LeadRescueSimulator from "@/components/LeadRescueSimulator";
import InteractiveAIDemo from "@/components/features/InteractiveAIDemo";
import AIVoiceVisual from "@/components/AIVoiceVisual";
import GrowthDashboard from "@/components/GrowthDashboard";
import PricingCards from "@/components/PricingCards";
import SocialProofBanner from "@/components/cro/SocialProofBanner";
import RiskReversal from "@/components/cro/RiskReversal";
import MobileCTABar from "@/components/cro/MobileCTABar";
import CapacityIndicator from "@/components/cro/CapacityIndicator";
import ClientLogos from "@/components/cro/ClientLogos";
import AsSeenIn from "@/components/cro/AsSeenIn";
import ComparisonTable from "@/components/cro/ComparisonTable";
import ExitIntentPopup from "@/components/cro/ExitIntentPopup";
import UrgencyTimer from "@/components/cro/UrgencyTimer";
import StickyPhoneCTA from "@/components/cro/StickyPhoneCTA";
import ScrollProgress from "@/components/cro/ScrollProgress";
import { PremiumHero } from "@/components/sections/PremiumHero";
import { PremiumServices } from "@/components/sections/PremiumServices";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { PremiumTestimonials } from "@/components/sections/PremiumTestimonials";
import { PremiumStats } from "@/components/sections/PremiumStats";
import { CaseStudiesPreview } from "@/components/sections/CaseStudiesPreview";
import { PremiumFAQ } from "@/components/sections/PremiumFAQ";
import { PremiumFinalCTA } from "@/components/sections/PremiumFinalCTA";

// SEO Metadata for Homepage
export const metadata: Metadata = {
  title: "Capture Client | AI Voice Agents & Lead Generation for Small Business",
  description:
    "Never miss a lead again. AI voice agents answer calls 24/7, qualify leads, and book appointments. Plus Google & Facebook Ads management. Trusted by 500+ businesses. Book your free demo today.",
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
    title: "Capture Client | AI Voice Agents & Lead Generation for Small Business",
    description:
      "Never miss a lead again. AI voice agents answer calls 24/7, qualify leads, and book appointments automatically.",
    url: "https://captureclient.net",
    siteName: "Capture Client",
    type: "website",
    images: [
      {
        url: "https://captureclient.net/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Capture Client - AI Voice Agents for Small Business",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Capture Client | AI Voice Agents & Lead Generation",
    description:
      "Never miss a lead again. AI voice agents answer calls 24/7, qualify leads, and book appointments.",
    images: ["https://captureclient.net/og-image.jpg"],
  },
  alternates: {
    canonical: "https://captureclient.net",
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

// JSON-LD Structured Data
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Capture Client",
  url: "https://captureclient.net",
  logo: "https://captureclient.net/logo-full.png",
  description: "AI-powered lead generation and voice agents for small businesses",
  telephone: "+1-865-346-3339",
  email: "team@captureclient.net",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Knoxville",
    addressRegion: "TN",
    addressCountry: "US",
  },
  sameAs: [
    "https://twitter.com/captureclient",
    "https://linkedin.com/company/captureclient",
    "https://facebook.com/captureclient",
  ],
  areaServed: [
    { "@type": "State", name: "Tennessee" },
    { "@type": "State", name: "Georgia" },
    { "@type": "State", name: "North Carolina" },
    { "@type": "State", name: "Kentucky" },
    { "@type": "State", name: "Virginia" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Marketing Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Voice Agents",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Lead Generation",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Google Ads Management",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Facebook Ads Management",
        },
      },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "127",
    bestRating: "5",
    worstRating: "1",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: "https://captureclient.net",
  name: "Capture Client",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://captureclient.net/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* ==================== STICKY PHONE CTA (Top Bar) ==================== */}
      <StickyPhoneCTA />

      {/* ==================== EXIT INTENT POPUP ==================== */}
      <ExitIntentPopup />

      {/* ==================== SCROLL PROGRESS & QUICK CTA ==================== */}
      <ScrollProgress />

      {/* ==================== SECTION 1: PREMIUM HERO ==================== */}
      <PremiumHero />

      {/* ==================== SOCIAL PROOF BANNER ==================== */}
      <section className="bg-background-dark py-6 sm:py-8">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <SocialProofBanner />
        </div>
      </section>

      {/* ==================== AS SEEN IN / MEDIA MENTIONS ==================== */}
      <section className="bg-background py-6 sm:py-8">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <AsSeenIn />
        </div>
      </section>

      {/* ==================== SECTION 2: PREMIUM SERVICES ==================== */}
      <PremiumServices />

      {/* ==================== CLIENT LOGOS / SOCIAL PROOF ==================== */}
      <section className="section bg-background-dark">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <ClientLogos />
        </div>
      </section>

      {/* ==================== SECTION 2.5: LEAD RESCUE SIMULATOR ==================== */}
      <LeadRescueSimulator />

      {/* ==================== SECTION 2.75: INTERACTIVE AI DEMO ==================== */}
      {/* Try our AI - Let visitors experience the technology firsthand */}
      <InteractiveAIDemo />

      {/* ==================== SECTION 3: HOW IT WORKS ==================== */}
      <HowItWorks />

      {/* ==================== SECTION 3.5: TECHNOLOGY DEEP DIVE ==================== */}
      {/* Part A: AI Voice Technology */}
      <section className="section bg-background relative overflow-hidden">
        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Text content - Left */}
            <div>
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-accent mb-3 sm:mb-4">
                AI Voice Technology
              </h2>
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4 sm:mb-6">
                Never Miss a Call. Never Lose a Lead.
              </h3>
              <p className="text-base sm:text-lg text-foreground-muted mb-6 sm:mb-8 leading-relaxed">
                Our enterprise-grade AI voice agents powered by conversational AI don't just answer calls—they understand context with natural language processing,
                respond naturally with real-time sentiment analysis, and take action. Every conversation is transcribed with 99% accuracy, analyzed, and
                logged automatically in your CRM with complete call intelligence.
              </p>

              <ul className="space-y-4 sm:space-y-5 mb-6 sm:mb-8">
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="material-icons text-accent mt-0.5 sm:mt-1 flex-shrink-0 text-xl sm:text-2xl">check_circle</span>
                  <div>
                    <p className="font-semibold text-foreground text-base sm:text-lg mb-1">24/7 Availability</p>
                    <p className="text-sm sm:text-base text-foreground-muted leading-relaxed">
                      Handle unlimited calls simultaneously, any time of day
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="material-icons text-accent mt-0.5 sm:mt-1 flex-shrink-0 text-xl sm:text-2xl">check_circle</span>
                  <div>
                    <p className="font-semibold text-foreground text-base sm:text-lg mb-1">Natural Conversations</p>
                    <p className="text-sm sm:text-base text-foreground-muted leading-relaxed">
                      Context-aware responses that feel human and professional
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="material-icons text-accent mt-0.5 sm:mt-1 flex-shrink-0 text-xl sm:text-2xl">check_circle</span>
                  <div>
                    <p className="font-semibold text-foreground text-base sm:text-lg mb-1">Automatic Transcription</p>
                    <p className="text-sm sm:text-base text-foreground-muted leading-relaxed">
                      Every call is recorded, transcribed, and searchable
                    </p>
                  </div>
                </li>
              </ul>

              <Link href="/services/voice-ai" className="btn-secondary inline-block w-full sm:w-auto text-center">
                Explore Voice AI
              </Link>
            </div>

            {/* Visual mockup - Right */}
            <AIVoiceVisual />
          </div>
        </div>
      </section>

      {/* Part B: Dashboard & CRM */}
      <section className="section bg-background-dark relative overflow-hidden">
        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Visual mockup - Left */}
            <div className="order-2 lg:order-1">
              <GrowthDashboard />
            </div>

            {/* Text content - Right */}
            <div className="order-1 lg:order-2">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-primary mb-3 sm:mb-4">
                Unified Platform
              </h2>
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4 sm:mb-6">
                See Everything. Control Everything.
              </h3>
              <p className="text-base sm:text-lg text-foreground-muted mb-6 sm:mb-8 leading-relaxed">
                Our dashboard gives you complete visibility into your entire growth engine. Track
                campaigns, manage leads, and analyze performance—all from one beautiful interface.
              </p>

              <ul className="space-y-4 sm:space-y-5 mb-6 sm:mb-8">
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="material-icons text-primary mt-0.5 sm:mt-1 flex-shrink-0 text-xl sm:text-2xl">check_circle</span>
                  <div>
                    <p className="font-semibold text-foreground text-base sm:text-lg mb-1">Real-Time Analytics</p>
                    <p className="text-sm sm:text-base text-foreground-muted leading-relaxed">
                      Live updates on campaign performance and lead activity
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="material-icons text-primary mt-0.5 sm:mt-1 flex-shrink-0 text-xl sm:text-2xl">check_circle</span>
                  <div>
                    <p className="font-semibold text-foreground text-base sm:text-lg mb-1">Unified Inbox</p>
                    <p className="text-sm sm:text-base text-foreground-muted leading-relaxed">
                      Manage calls, texts, emails, and form submissions in one place
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="material-icons text-primary mt-0.5 sm:mt-1 flex-shrink-0 text-xl sm:text-2xl">check_circle</span>
                  <div>
                    <p className="font-semibold text-foreground text-base sm:text-lg mb-1">Growth Tracking</p>
                    <p className="text-sm sm:text-base text-foreground-muted leading-relaxed">
                      Visualize your growth trajectory with beautiful, actionable insights
                    </p>
                  </div>
                </li>
              </ul>

              <Link href="/features" className="btn-secondary inline-block w-full sm:w-auto text-center">
                Explore CRM & Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CASE STUDIES PREVIEW ==================== */}
      <CaseStudiesPreview />

      {/* ==================== COMPARISON TABLE ==================== */}
      <section className="section bg-background relative">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <ComparisonTable />
        </div>
      </section>

      {/* ==================== SECTION 4: PRICING ==================== */}
      <section id="pricing" className="section bg-background-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-30"></div>

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-accent mb-3 sm:mb-4">
              Pricing
            </h2>
            <p className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-3 sm:mb-4 px-4">
              Simple Pricing for Scalable Growth
            </p>
            <p className="text-base sm:text-lg text-foreground-muted max-w-2xl mx-auto px-4">
              Choose the plan that fits your business. All plans include our core platform features.
            </p>
          </div>

          {/* Pricing cards */}
          <PricingCards />

          {/* Risk Reversal Guarantee */}
          <div className="mt-12 sm:mt-16">
            <RiskReversal />
          </div>

          {/* Capacity indicator */}
          <div className="mt-6 sm:mt-8">
            <CapacityIndicator spotsLeft={7} />
          </div>

          {/* Urgency Timer */}
          <div className="mt-8 sm:mt-12">
            <UrgencyTimer />
          </div>
        </div>
      </section>

      {/* ==================== PREMIUM FAQ / OBJECTION HANDLER ==================== */}
      <PremiumFAQ />

      {/* ==================== SECTION 5: TESTIMONIALS & SOCIAL PROOF ==================== */}
      <PremiumTestimonials />

      {/* ==================== STATS SECTION ==================== */}
      <section className="section bg-background-dark relative">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <PremiumStats />
        </div>
      </section>

      {/* ==================== SECTION 6: PREMIUM FINAL CTA ==================== */}
      <PremiumFinalCTA />

      {/* Mobile CTA Bar - Always present on mobile */}
      <MobileCTABar />
    </div>
  );
}
