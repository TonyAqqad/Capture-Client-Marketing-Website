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
    <div className="relative min-h-screen w-full overflow-x-hidden bg-background-dark">
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
      <section className="relative bg-background-dark py-8 sm:py-12 overflow-hidden">
        {/* Glassy top divider */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="container-custom px-4 sm:px-6 lg:px-8 relative">
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent opacity-50 blur-3xl pointer-events-none" />

          <SocialProofBanner />
        </div>

        {/* Glassy bottom divider */}
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </section>

      {/* ==================== AS SEEN IN / MEDIA MENTIONS ==================== */}
      <section className="relative bg-gradient-to-br from-background via-background-dark to-background py-8 sm:py-12 overflow-hidden">
        {/* Glass morphism backdrop */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-30" />
          <div className="absolute inset-0 backdrop-blur-3xl bg-white/[0.01]" />
        </div>

        <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
          <AsSeenIn />
        </div>
      </section>

      {/* ==================== SECTION 2: PREMIUM SERVICES ==================== */}
      <section className="relative overflow-hidden">
        {/* Layered glass background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-mesh-premium opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-background to-background-dark" />

          {/* Floating geometric shapes */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-accent/10 to-transparent rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-radial from-primary/10 to-transparent rounded-full blur-3xl animate-float-medium" />
        </div>

        <div className="relative z-10">
          <PremiumServices />
        </div>

        {/* Bottom angular divider */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background-dark to-transparent" />
      </section>

      {/* ==================== CLIENT LOGOS / SOCIAL PROOF ==================== */}
      <section className="section relative bg-background-dark overflow-hidden">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px',
            }}
          />
        </div>

        {/* Glass card wrapper */}
        <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="glass-premium p-8 sm:p-12 rounded-3xl">
            <ClientLogos />
          </div>
        </div>
      </section>

      {/* ==================== SECTION 2.5: LEAD RESCUE SIMULATOR ==================== */}
      <section className="relative overflow-hidden">
        {/* Glassy angular top border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

        {/* Layered background with depth */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background-dark to-background" />
          <div className="absolute inset-0 bg-noise opacity-[0.015]" />

          {/* Radial glow effects */}
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-gradient-radial from-primary/15 to-transparent blur-3xl -translate-x-1/2" />
          <div className="absolute top-1/3 right-0 w-96 h-96 bg-gradient-radial from-accent/12 to-transparent blur-3xl translate-x-1/2" />
        </div>

        <div className="relative z-10">
          <LeadRescueSimulator />
        </div>

        {/* Bottom divider */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      </section>

      {/* ==================== SECTION 2.75: INTERACTIVE AI DEMO ==================== */}
      <section className="relative overflow-hidden bg-background-dark">
        {/* Premium glass background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-mesh opacity-20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-accent/20 via-primary/10 to-transparent blur-3xl opacity-50" />
        </div>

        <div className="relative z-10">
          <InteractiveAIDemo />
        </div>
      </section>

      {/* ==================== SECTION 3: HOW IT WORKS ==================== */}
      <section className="relative overflow-hidden">
        {/* Layered glass sections */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background to-background-dark" />
          <div className="absolute inset-0 bg-mesh-premium opacity-30" />

          {/* Floating light orbs */}
          <div className="absolute top-1/4 right-1/3 w-72 h-72 bg-gradient-radial from-accent/15 via-accent/5 to-transparent rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-gradient-radial from-primary/15 via-primary/5 to-transparent rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10">
          <HowItWorks />
        </div>
      </section>

      {/* ==================== SECTION 3.5: TECHNOLOGY DEEP DIVE ==================== */}
      {/* Part A: AI Voice Technology */}
      <section className="section bg-background relative overflow-hidden">
        {/* Premium glassy background layers */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background-dark via-background to-background-dark" />
          <div className="absolute inset-0 bg-mesh opacity-25" />

          {/* Geometric accent */}
          <div className="absolute top-20 right-20 w-64 h-64 border border-accent/10 rounded-3xl rotate-12 backdrop-blur-sm animate-float-slow" />

          {/* Radial glow */}
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-accent/10 to-transparent blur-3xl" />
        </div>

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          {/* Glass card wrapper for content */}
          <div className="glass-premium p-8 sm:p-12 lg:p-16 rounded-3xl">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
              {/* Text content - Left */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent/20 via-accent/10 to-transparent border border-accent/20 backdrop-blur-xl mb-4">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-glow" />
                  <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-accent">
                    AI Voice Technology
                  </h2>
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4 sm:mb-6 leading-tight">
                  Never Miss a Call. <span className="text-gradient bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Never Lose a Lead.</span>
                </h3>

                <p className="text-base sm:text-lg text-foreground-muted mb-6 sm:mb-8 leading-relaxed">
                  Our enterprise-grade AI voice agents powered by conversational AI don't just answer calls—they understand context with natural language processing,
                  respond naturally with real-time sentiment analysis, and take action. Every conversation is transcribed with 99% accuracy, analyzed, and
                  logged automatically in your CRM with complete call intelligence.
                </p>

                <ul className="space-y-4 sm:space-y-5 mb-6 sm:mb-8">
                  <li className="flex items-start gap-3 sm:gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 group-hover:shadow-glow transition-all duration-300">
                      <span className="material-icons text-accent text-xl">check_circle</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-base sm:text-lg mb-1">24/7 Availability</p>
                      <p className="text-sm sm:text-base text-foreground-muted leading-relaxed">
                        Handle unlimited calls simultaneously, any time of day
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 group-hover:shadow-glow transition-all duration-300">
                      <span className="material-icons text-accent text-xl">check_circle</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-base sm:text-lg mb-1">Natural Conversations</p>
                      <p className="text-sm sm:text-base text-foreground-muted leading-relaxed">
                        Context-aware responses that feel human and professional
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 group-hover:shadow-glow transition-all duration-300">
                      <span className="material-icons text-accent text-xl">check_circle</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-base sm:text-lg mb-1">Automatic Transcription</p>
                      <p className="text-sm sm:text-base text-foreground-muted leading-relaxed">
                        Every call is recorded, transcribed, and searchable
                      </p>
                    </div>
                  </li>
                </ul>

                <Link href="/services/voice-ai" className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-accent/20 to-primary/20 border border-accent/30 backdrop-blur-xl font-semibold text-foreground hover:shadow-glow-lg hover:scale-[1.02] transition-all duration-300 group">
                  Explore Voice AI
                  <span className="material-icons group-hover:translate-x-1 transition-transform duration-300">arrow_forward</span>
                </Link>
              </div>

              {/* Visual mockup - Right */}
              <div className="relative">
                {/* Decorative glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl blur-3xl opacity-50" />

                <div className="relative glass-premium p-6 rounded-3xl">
                  <AIVoiceVisual />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom divider */}
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </section>

      {/* Part B: Dashboard & CRM */}
      <section className="section bg-background-dark relative overflow-hidden">
        {/* Premium background layers */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background-dark via-background to-background-dark" />
          <div className="absolute inset-0 bg-mesh-premium opacity-30" />

          {/* Geometric accent (opposite side) */}
          <div className="absolute bottom-20 left-20 w-56 h-56 border border-primary/10 rounded-3xl -rotate-12 backdrop-blur-sm animate-float-medium" />

          {/* Radial glow */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-primary/10 to-transparent blur-3xl" />
        </div>

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          {/* Glass card wrapper */}
          <div className="glass-premium p-8 sm:p-12 lg:p-16 rounded-3xl">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
              {/* Visual mockup - Left */}
              <div className="order-2 lg:order-1 relative">
                {/* Decorative glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl opacity-50" />

                <div className="relative glass-premium p-6 rounded-3xl">
                  <GrowthDashboard />
                </div>
              </div>

              {/* Text content - Right */}
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border border-primary/20 backdrop-blur-xl mb-4">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-glow-primary" />
                  <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-primary">
                    Unified Platform
                  </h2>
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4 sm:mb-6 leading-tight">
                  See Everything. <span className="text-gradient bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Control Everything.</span>
                </h3>

                <p className="text-base sm:text-lg text-foreground-muted mb-6 sm:mb-8 leading-relaxed">
                  Our dashboard gives you complete visibility into your entire growth engine. Track
                  campaigns, manage leads, and analyze performance—all from one beautiful interface.
                </p>

                <ul className="space-y-4 sm:space-y-5 mb-6 sm:mb-8">
                  <li className="flex items-start gap-3 sm:gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:shadow-glow-primary transition-all duration-300">
                      <span className="material-icons text-primary text-xl">check_circle</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-base sm:text-lg mb-1">Real-Time Analytics</p>
                      <p className="text-sm sm:text-base text-foreground-muted leading-relaxed">
                        Live updates on campaign performance and lead activity
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:shadow-glow-primary transition-all duration-300">
                      <span className="material-icons text-primary text-xl">check_circle</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-base sm:text-lg mb-1">Unified Inbox</p>
                      <p className="text-sm sm:text-base text-foreground-muted leading-relaxed">
                        Manage calls, texts, emails, and form submissions in one place
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:shadow-glow-primary transition-all duration-300">
                      <span className="material-icons text-primary text-xl">check_circle</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-base sm:text-lg mb-1">Growth Tracking</p>
                      <p className="text-sm sm:text-base text-foreground-muted leading-relaxed">
                        Visualize your growth trajectory with beautiful, actionable insights
                      </p>
                    </div>
                  </li>
                </ul>

                <Link href="/features" className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 backdrop-blur-xl font-semibold text-foreground hover:shadow-glow-lg hover:scale-[1.02] transition-all duration-300 group">
                  Explore CRM & Dashboard
                  <span className="material-icons group-hover:translate-x-1 transition-transform duration-300">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Top divider */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </section>

      {/* ==================== CASE STUDIES PREVIEW ==================== */}
      <section className="relative overflow-hidden">
        {/* Glassy layered background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background to-background-dark" />
          <div className="absolute inset-0 bg-mesh opacity-20" />

          {/* Floating glow orbs */}
          <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-gradient-radial from-accent/10 to-transparent rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-gradient-radial from-primary/10 to-transparent rounded-full blur-3xl animate-float-medium" />
        </div>

        <div className="relative z-10">
          <CaseStudiesPreview />
        </div>

        {/* Dividers */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      </section>

      {/* ==================== COMPARISON TABLE ==================== */}
      <section className="section bg-background-dark relative overflow-hidden">
        {/* Premium glass background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-mesh-premium opacity-25" />
          <div className="absolute inset-0 bg-noise opacity-[0.015]" />
        </div>

        <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Wrapper with glass effect */}
          <div className="glass-premium p-8 sm:p-12 rounded-3xl">
            <ComparisonTable />
          </div>
        </div>
      </section>

      {/* ==================== SECTION 4: PRICING ==================== */}
      <section id="pricing" className="section bg-background relative overflow-hidden">
        {/* Layered premium background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background-dark to-background" />
          <div className="absolute inset-0 bg-mesh-premium opacity-30" />

          {/* Large radial glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-radial from-accent/15 via-accent/5 to-transparent blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-radial from-primary/10 to-transparent blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-accent/10 to-transparent blur-3xl" />

          {/* Geometric accents */}
          <div className="absolute top-20 right-20 w-48 h-48 border border-accent/10 rounded-3xl rotate-45 backdrop-blur-sm animate-float-slow" />
          <div className="absolute bottom-20 left-20 w-40 h-40 border border-primary/10 rounded-3xl -rotate-12 backdrop-blur-sm animate-float-medium" />
        </div>

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          {/* Section header with glass badge */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent/20 via-accent/10 to-transparent border border-accent/20 backdrop-blur-xl mb-4">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-glow" />
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-accent">
                Pricing
              </h2>
            </div>

            <p className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-3 sm:mb-4 px-4">
              Simple Pricing for <span className="text-gradient bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Scalable Growth</span>
            </p>

            <p className="text-base sm:text-lg text-foreground-muted max-w-2xl mx-auto px-4">
              Choose the plan that fits your business. All plans include our core platform features.
            </p>
          </div>

          {/* Pricing cards with extra spacing */}
          <div className="mb-12 sm:mb-16">
            <PricingCards />
          </div>

          {/* Risk Reversal Guarantee in glass card */}
          <div className="mb-8 sm:mb-12">
            <div className="glass-premium p-8 rounded-3xl">
              <RiskReversal />
            </div>
          </div>

          {/* Capacity indicator */}
          <div className="mb-6 sm:mb-8">
            <CapacityIndicator spotsLeft={7} />
          </div>

          {/* Urgency Timer */}
          <div>
            <UrgencyTimer />
          </div>
        </div>

        {/* Top and bottom dividers */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </section>

      {/* ==================== PREMIUM FAQ / OBJECTION HANDLER ==================== */}
      <section className="relative overflow-hidden">
        {/* Glass background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background-dark to-background" />
          <div className="absolute inset-0 bg-mesh opacity-20" />

          {/* Subtle glows */}
          <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-gradient-radial from-accent/8 to-transparent blur-3xl" />
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-gradient-radial from-primary/8 to-transparent blur-3xl" />
        </div>

        <div className="relative z-10">
          <PremiumFAQ />
        </div>
      </section>

      {/* ==================== SECTION 5: TESTIMONIALS & SOCIAL PROOF ==================== */}
      <section className="relative overflow-hidden">
        {/* Premium layered background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-background-dark" />
          <div className="absolute inset-0 bg-mesh-premium opacity-30" />

          {/* Large center glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-radial from-accent/15 via-primary/10 to-transparent blur-3xl" />
        </div>

        <div className="relative z-10">
          <PremiumTestimonials />
        </div>

        {/* Dividers */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </section>

      {/* ==================== STATS SECTION ==================== */}
      <section className="section bg-background relative overflow-hidden">
        {/* Glass background with grid */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background-dark to-background" />
          <div className="absolute inset-0 bg-noise opacity-[0.015]" />

          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.025]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(0, 201, 255, 0.3) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(0, 201, 255, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: '100px 100px',
              }}
            />
          </div>
        </div>

        <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="glass-premium p-8 sm:p-12 lg:p-16 rounded-3xl">
            <PremiumStats />
          </div>
        </div>
      </section>

      {/* ==================== SECTION 6: PREMIUM FINAL CTA ==================== */}
      <section className="relative overflow-hidden">
        {/* Epic glassy background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background-dark via-background to-background-dark" />
          <div className="absolute inset-0 bg-mesh-premium opacity-40" />

          {/* Multiple layered glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-gradient-radial from-accent/20 via-primary/15 to-transparent blur-3xl animate-pulse-glow" />
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-primary/15 to-transparent blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-accent/15 to-transparent blur-3xl" />

          {/* Floating geometric shapes */}
          <div className="absolute top-20 right-1/4 w-64 h-64 border-2 border-accent/10 rounded-3xl rotate-12 backdrop-blur-sm animate-float-slow" />
          <div className="absolute bottom-20 left-1/4 w-56 h-56 border-2 border-primary/10 rounded-3xl -rotate-12 backdrop-blur-sm animate-float-medium" />
        </div>

        <div className="relative z-10">
          <PremiumFinalCTA />
        </div>

        {/* Top divider */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      </section>

      {/* Mobile CTA Bar - Always present on mobile */}
      <MobileCTABar />
    </div>
  );
}
