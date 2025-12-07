import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { generateSoftwareApplicationSchema } from "@/lib/seo-config";
import AIVoiceVisual from "@/components/AIVoiceVisual";
import GrowthDashboard from "@/components/GrowthDashboard";
import PricingCards from "@/components/PricingCards";
import SocialProofBanner from "@/components/cro/SocialProofBanner";
import RiskReversal from "@/components/cro/RiskReversal";
import ClientLogos from "@/components/cro/ClientLogos";
import IntegrationPartners from "@/components/cro/IntegrationPartners";
import AsSeenIn from "@/components/cro/AsSeenIn";
import ComparisonTable from "@/components/cro/ComparisonTable";
import UrgencyTimer from "@/components/cro/UrgencyTimer";
// import StickyPhoneCTA from "@/components/cro/StickyPhoneCTA"; // TEMP DISABLED: HMR issue with framer-motion
import { PremiumHero } from "@/components/sections/PremiumHero";
import { PremiumServices } from "@/components/sections/PremiumServices";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { PremiumTestimonials } from "@/components/sections/PremiumTestimonials";
import { PremiumStats } from "@/components/sections/PremiumStats";
import { CaseStudiesPreview } from "@/components/sections/CaseStudiesPreview";
import { PremiumFAQ } from "@/components/sections/PremiumFAQ";
import { PremiumFinalCTA } from "@/components/sections/PremiumFinalCTA";
import { ClientLogosCarousel } from "@/components/ui/ClientLogosCarousel";

// Dynamic imports for heavy components to reduce initial bundle size
const LeadRescueSimulator = dynamic(
  () => import("@/components/LeadRescueSimulator"),
  {
    loading: () => (
      <div className="animate-pulse bg-surface/50 rounded-xl h-96 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
    ),
  }
);

const InteractiveAIDemo = dynamic(
  () => import("@/components/features/InteractiveAIDemo"),
  {
    loading: () => (
      <div className="animate-pulse bg-surface/50 rounded-xl h-96 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    ),
  }
);

// Lazy load ExitIntentPopup for code splitting (component has early-return optimization)
const ExitIntentPopup = dynamic(
  () => import("@/components/cro/ExitIntentPopup"),
  {
    loading: () => null, // Don't show anything while loading
  }
);


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
    url: "https://captureclientai.net",
    siteName: "Capture Client",
    type: "website",
    images: [
      {
        url: "https://captureclientai.net/og-image.jpg",
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
    images: ["https://captureclientai.net/og-image.jpg"],
  },
  alternates: {
    canonical: "https://captureclientai.net",
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
  "@id": "https://captureclientai.net/#localbusiness",
  name: "Capture Client",
  image: "https://captureclientai.net/logo-full.svg",
  telephone: "+1-865-346-3339",
  email: "team@captureclientai.net",
  url: "https://captureclientai.net",
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

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-background-dark">
      {/* JSON-LD Structured Data - Page-specific schemas only */}
      {/* Organization and WebSite schemas are rendered globally in layout.tsx */}
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSoftwareApplicationSchema()) }}
      />

      {/* ==================== STICKY PHONE CTA (Top Bar) ==================== */}
      {/* <StickyPhoneCTA /> */} {/* TEMP DISABLED: HMR issue with framer-motion */}

      {/* ==================== EXIT INTENT POPUP ==================== */}
      <ExitIntentPopup />

      {/* ==================== SECTION 1: PREMIUM HERO ==================== */}
      <PremiumHero />

      {/* ==================== CLIENT LOGOS CAROUSEL ==================== */}
      <ClientLogosCarousel />

      {/* ==================== SOCIAL PROOF BANNER ==================== */}
      <section className="relative bg-background-dark py-8 sm:py-12 overflow-hidden">
        {/* Glassy top divider */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="container-custom px-4 sm:px-6 lg:px-8 relative">
          {/* Subtle background glow - Mobile optimized blur */}
          <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent opacity-50 blur-xl md:blur-3xl pointer-events-none" />

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
          <div className="absolute inset-0 backdrop-blur-xl md:backdrop-blur-3xl bg-white/[0.01]" />
        </div>

        <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
          <AsSeenIn />
        </div>
      </section>

      {/* ==================== SECTION 2: PREMIUM SERVICES ==================== */}
      <section className="relative overflow-hidden max-w-full">
        {/* Layered glass background - MOBILE FIX: Contained orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-mesh-premium opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-background to-background-dark" />

          {/* Floating geometric shapes - MOBILE FIX: Smaller on mobile, reduced blur */}
          <div className="absolute top-1/4 left-1/4 w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 bg-gradient-radial from-accent/10 to-transparent rounded-full blur-xl md:blur-3xl animate-float-slow" />
          <div className="absolute bottom-1/3 right-1/4 w-40 sm:w-56 md:w-72 lg:w-80 h-40 sm:h-56 md:h-72 lg:h-80 bg-gradient-radial from-primary/10 to-transparent rounded-full blur-xl md:blur-3xl animate-float-medium" />
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

          {/* Radial glow effects - Mobile optimized blur */}
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-gradient-radial from-primary/15 to-transparent blur-xl md:blur-3xl -translate-x-1/2" />
          <div className="absolute top-1/3 right-0 w-96 h-96 bg-gradient-radial from-accent/12 to-transparent blur-xl md:blur-3xl translate-x-1/2" />
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-accent/20 via-primary/10 to-transparent blur-xl md:blur-3xl opacity-50" />
        </div>

        <div className="relative z-10">
          <InteractiveAIDemo />
        </div>
      </section>

      {/* ==================== SECTION 3: HOW IT WORKS ==================== */}
      <section className="relative overflow-hidden max-w-full">
        {/* Layered glass sections - MOBILE FIX: Contained orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background to-background-dark" />
          <div className="absolute inset-0 bg-mesh-premium opacity-30" />

          {/* Floating light orbs - MOBILE FIX: Smaller on mobile, reduced blur */}
          <div className="absolute top-1/4 right-1/3 w-36 sm:w-48 md:w-60 lg:w-72 h-36 sm:h-48 md:h-60 lg:h-72 bg-gradient-radial from-accent/15 via-accent/5 to-transparent rounded-full blur-xl md:blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-1/4 left-1/3 w-32 sm:w-40 md:w-52 lg:w-64 h-32 sm:h-40 md:h-52 lg:h-64 bg-gradient-radial from-primary/15 via-primary/5 to-transparent rounded-full blur-xl md:blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10">
          <HowItWorks />
        </div>
      </section>

      {/* ==================== INTEGRATION PARTNERS ==================== */}
      <IntegrationPartners />

      {/* ==================== SECTION 3.5: TECHNOLOGY DEEP DIVE ==================== */}
      {/* Part A: AI Voice Technology */}
      <section className="section bg-background relative overflow-hidden">
        {/* Premium glassy background layers */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background-dark via-background to-background-dark" />
          <div className="absolute inset-0 bg-mesh opacity-25" />

          {/* Geometric accent - MOBILE FIX: Hidden on mobile */}
          <div className="absolute top-20 right-20 w-32 sm:w-40 md:w-52 lg:w-64 h-32 sm:h-40 md:h-52 lg:h-64 border border-accent/10 rounded-3xl rotate-12 backdrop-blur-sm animate-float-slow hidden sm:block" />

          {/* Radial glow - MOBILE FIX: Smaller on mobile, reduced blur */}
          <div className="absolute bottom-1/4 left-1/4 w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 bg-gradient-radial from-accent/10 to-transparent blur-xl md:blur-3xl" />
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
                      <CheckCircle2 className="w-5 h-5 text-accent" />
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
                      <CheckCircle2 className="w-5 h-5 text-accent" />
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
                      <CheckCircle2 className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-base sm:text-lg mb-1">Automatic Transcription</p>
                      <p className="text-sm sm:text-base text-foreground-muted leading-relaxed">
                        Every call is recorded, transcribed, and searchable
                      </p>
                    </div>
                  </li>
                </ul>

                <Link href="/services/voice-ai" className="btn-ghost px-8 py-4 rounded-xl inline-flex items-center gap-3 font-semibold hover:scale-[1.02] transition-all duration-300 group w-full sm:w-auto justify-center">
                  Explore Voice AI
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>

              {/* Visual mockup - Right */}
              <div className="relative">
                {/* Decorative glow - Mobile optimized blur */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl blur-xl md:blur-3xl opacity-50" />

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

          {/* Geometric accent (opposite side) - MOBILE FIX: Hidden on mobile */}
          <div className="absolute bottom-20 left-20 w-28 sm:w-36 md:w-44 lg:w-56 h-28 sm:h-36 md:h-44 lg:h-56 border border-primary/10 rounded-3xl -rotate-12 backdrop-blur-sm animate-float-medium hidden sm:block" />

          {/* Radial glow - MOBILE FIX: Smaller on mobile, reduced blur */}
          <div className="absolute top-1/4 right-1/4 w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 bg-gradient-radial from-primary/10 to-transparent blur-xl md:blur-3xl" />
        </div>

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          {/* Glass card wrapper */}
          <div className="glass-premium p-8 sm:p-12 lg:p-16 rounded-3xl">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
              {/* Visual mockup - Left */}
              <div className="order-2 lg:order-1 relative">
                {/* Decorative glow - Mobile optimized blur */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-xl md:blur-3xl opacity-50" />

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
                      <CheckCircle2 className="w-5 h-5 text-primary" />
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
                      <CheckCircle2 className="w-5 h-5 text-primary" />
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
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-base sm:text-lg mb-1">Growth Tracking</p>
                      <p className="text-sm sm:text-base text-foreground-muted leading-relaxed">
                        Visualize your growth trajectory with beautiful, actionable insights
                      </p>
                    </div>
                  </li>
                </ul>

                <Link href="/features" className="btn-ghost px-8 py-4 rounded-xl inline-flex items-center gap-3 font-semibold hover:scale-[1.02] transition-all duration-300 group w-full sm:w-auto justify-center">
                  Explore CRM & Dashboard
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
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

          {/* Floating glow orbs - Mobile optimized blur */}
          <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-gradient-radial from-accent/10 to-transparent rounded-full blur-xl md:blur-3xl animate-float-slow" />
          <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-gradient-radial from-primary/10 to-transparent rounded-full blur-xl md:blur-3xl animate-float-medium" />
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

          {/* Large radial glows - Mobile optimized blur */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-radial from-accent/15 via-accent/5 to-transparent blur-xl md:blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-radial from-primary/10 to-transparent blur-xl md:blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-accent/10 to-transparent blur-xl md:blur-3xl" />

          {/* Geometric accents - MOBILE FIX: Hidden on mobile */}
          <div className="absolute top-20 right-20 w-24 sm:w-32 md:w-40 lg:w-48 h-24 sm:h-32 md:h-40 lg:h-48 border border-accent/10 rounded-3xl rotate-45 backdrop-blur-sm animate-float-slow hidden md:block" />
          <div className="absolute bottom-20 left-20 w-20 sm:w-24 md:w-32 lg:w-40 h-20 sm:h-24 md:h-32 lg:h-40 border border-primary/10 rounded-3xl -rotate-12 backdrop-blur-sm animate-float-medium hidden md:block" />
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

          {/* Subtle glows - Mobile optimized blur */}
          <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-gradient-radial from-accent/8 to-transparent blur-xl md:blur-3xl" />
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-gradient-radial from-primary/8 to-transparent blur-xl md:blur-3xl" />
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

          {/* Large center glow - Mobile optimized blur */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-radial from-accent/15 via-primary/10 to-transparent blur-xl md:blur-3xl" />
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

          {/* Multiple layered glows - Mobile optimized blur */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-gradient-radial from-accent/20 via-primary/15 to-transparent blur-xl md:blur-3xl animate-pulse-glow" />
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-primary/15 to-transparent blur-xl md:blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-accent/15 to-transparent blur-xl md:blur-3xl" />

          {/* Floating geometric shapes - MOBILE FIX: Hidden on mobile */}
          <div className="absolute top-20 right-1/4 w-32 sm:w-40 md:w-52 lg:w-64 h-32 sm:h-40 md:h-52 lg:h-64 border-2 border-accent/10 rounded-3xl rotate-12 backdrop-blur-sm animate-float-slow hidden lg:block" />
          <div className="absolute bottom-20 left-1/4 w-28 sm:w-36 md:w-44 lg:w-56 h-28 sm:h-36 md:h-44 lg:h-56 border-2 border-primary/10 rounded-3xl -rotate-12 backdrop-blur-sm animate-float-medium hidden lg:block" />
        </div>

        <div className="relative z-10">
          <PremiumFinalCTA />
        </div>

        {/* Top divider */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      </section>
    </div>
  );
}
