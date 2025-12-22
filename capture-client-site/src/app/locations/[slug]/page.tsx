import { getAllLocations, getLocationBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import OptimizedLeadForm from "@/components/forms/OptimizedLeadForm";
import JsonLd from "@/components/seo/JsonLd";
import TrustSignals from "@/components/cro/TrustSignals";
import SocialProofBanner from "@/components/cro/SocialProofBanner";
import RiskReversal from "@/components/cro/RiskReversal";
import ObjectionHandler from "@/components/cro/ObjectionHandler";
// NOTE: MobileCTABar is rendered globally in layout.tsx - do NOT duplicate here
import PremiumLocationFAQ from "@/components/sections/PremiumLocationFAQ";
import PremiumLocationTestimonials from "@/components/sections/PremiumLocationTestimonials";
import LocalMarketStats from "@/components/locations/LocalMarketStats";
import LocalIndustriesServed from "@/components/locations/LocalIndustriesServed";
import ServiceAreaMap from "@/components/locations/ServiceAreaMap";
import CompetitorComparison from "@/components/locations/CompetitorComparison";
import { Benefit, FAQItem } from "@/types/content";
import { MapPin, Phone, ArrowRight, Calendar, BadgeCheck, Zap, Headphones, Award, Building2, Clock, CheckCircle } from "lucide-react";
import { getIcon } from "@/lib/icon-map";
import {
  SITE_CONFIG,
  generateLocalBusinessSchema,
  generateServiceSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateWebPageSchema,
} from "@/lib/seo-config";
import { generateHowToSchema, generateLocationServiceSchema } from "@/lib/advanced-schemas";

// Local use case can have two structures
interface LocalUseCase {
  business_type?: string;
  scenario?: string;
  result: string;
  industry?: string;
  example?: string;
}

export async function generateStaticParams() {
  const locations = await getAllLocations();
  return locations.map((location) => ({
    slug: location.page_id,
  }));
}

// Return true 404 for unknown slugs (prevents soft 404s)
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const location = await getLocationBySlug(resolvedParams.slug);

  if (!location) {
    return {
      title: "Location Not Found",
    };
  }

  const pageUrl = `${SITE_CONFIG.url}/locations/${location.page_id}`;
  const ogImageUrl = location.hero?.hero_image?.url || `${SITE_CONFIG.url}/og-image.png`;

  return {
    title: location.seo.page_title,
    description: location.seo.meta_description,
    keywords: location.seo.keywords,

    // Canonical URL (critical for SEO)
    alternates: {
      canonical: pageUrl,
    },

    // Enhanced Open Graph for social sharing
    openGraph: {
      title: location.seo.og_title || location.seo.page_title,
      description: location.seo.og_description || location.seo.meta_description,
      url: pageUrl,
      type: "website",
      locale: "en_US",
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${location.service.service_name} in ${location.location.city}, ${location.location.state_abbr}`,
        },
      ],
    },

    // Twitter Card optimization
    twitter: {
      card: "summary_large_image",
      title: location.seo.page_title,
      description: location.seo.meta_description,
      images: [ogImageUrl],
    },

    // Robots directives
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },

    // Geographic targeting for local SEO
    other: {
      "geo.region": `US-${location.location.state_abbr}`,
      "geo.placename": location.location.city,
    },
  };
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const location = await getLocationBySlug(resolvedParams.slug);

  if (!location) {
    notFound();
  }

  // Generate JSON-LD schemas for enhanced SEO
  const localBusinessSchema = generateLocalBusinessSchema(location);
  const serviceSchema = generateServiceSchema(location);

  // Generate FAQ schema if FAQs exist
  const faqSchema =
    location.faq && location.faq.length > 0
      ? generateFAQSchema(
          location.faq.map((item: FAQItem) => ({
            question: item.question,
            answer: item.answer,
          }))
        )
      : null;

  // Generate breadcrumb schema for better SERP display
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_CONFIG.url },
    { name: "Locations", url: `${SITE_CONFIG.url}/locations` },
    {
      name: `${location.location.city}, ${location.location.state_abbr}`,
      url: `${SITE_CONFIG.url}/locations/${location.page_id}`,
    },
  ]);

  // Generate WebPage schema
  const webPageSchema = generateWebPageSchema({
    title: location.seo.page_title,
    description: location.seo.meta_description,
    url: `${SITE_CONFIG.url}/locations/${location.page_id}`,
  });

  // Generate HowTo schema from how_it_works data if available
  const howToSchema = location.how_it_works && location.how_it_works.length > 0
    ? generateHowToSchema({
        name: `How to Get Started with ${location.service.service_name} in ${location.location.city}`,
        description: `Step-by-step guide to implementing ${location.service.service_name} for your ${location.location.city} business. Quick setup, immediate results.`,
        totalTime: 'P2W',
        steps: location.how_it_works.map((step: { step?: number; title: string; description: string }, index: number) => ({
          step: step.step || index + 1,
          title: step.title,
          description: step.description,
        })),
        url: `${SITE_CONFIG.url}/locations/${location.page_id}`,
      })
    : null;

  // Generate enhanced Location-Service schema
  const locationServiceSchema = generateLocationServiceSchema({
    serviceName: location.service.service_name,
    serviceDescription: location.seo.meta_description,
    city: location.location.city,
    state: location.location.state,
    stateAbbr: location.location.state_abbr,
    pageUrl: `${SITE_CONFIG.url}/locations/${location.page_id}`,
    benefits: location.benefits?.map((b: Benefit) => ({ title: b.title, description: b.description })),
  });

  // Generate LocalBusiness schema with address for local SEO
  const localBusinessAddressSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Capture Client - ${location.location.city}`,
    description: `AI Voice Agent services in ${location.location.city}, ${location.location.state}`,
    telephone: "865-346-6111",
    url: `${SITE_CONFIG.url}/locations/${location.page_id}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: location.location.city,
      addressRegion: location.location.state_abbr,
      addressCountry: "US"
    },
    areaServed: {
      "@type": "City",
      name: location.location.city
    },
    priceRange: "$$"
  };

  // Combine all schemas (filter out nulls)
  const schemas = [
    localBusinessSchema,
    serviceSchema,
    locationServiceSchema,
    localBusinessAddressSchema,
    breadcrumbSchema,
    webPageSchema,
    faqSchema,
    howToSchema,
  ].filter(Boolean) as Array<Record<string, unknown>>;

  // Extract local phone number (default if not in data)
  const localPhoneNumber = location.local_phone_number || "865-346-6111";

  return (
    <div className="min-h-screen bg-white">
      {/* Inject JSON-LD structured data for local SEO */}
      <JsonLd schema={schemas} />

      {/* NOTE: MobileCTABar is rendered globally in layout.tsx - no duplicate needed */}

      {/* LOCALIZED AURORA HERO - Premium animated background */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Aurora Animated Background */}
        <div className="absolute inset-0 bg-slate-50">
          {/* Base gradient layer */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50" />

          {/* Aurora effect - flowing animated gradients */}
          <div className="absolute inset-0 opacity-40">
            <div
              className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-cyan-400/30 via-blue-500/20 to-transparent rounded-full blur-[120px] animate-aurora-1"
            />
            <div
              className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-gradient-to-bl from-blue-600/20 via-cyan-500/30 to-transparent rounded-full blur-[100px] animate-aurora-2"
            />
            <div
              className="absolute bottom-0 left-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-cyan-300/20 via-blue-400/20 to-transparent rounded-full blur-[110px] animate-aurora-3"
            />
          </div>

          {/* Overlay grid pattern for depth */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:64px_64px] opacity-30" />

          {/* Hero image overlay */}
          {location.hero?.hero_image && (
            <div className="absolute inset-0 opacity-15">
              <Image
                src={location.hero.hero_image.url}
                alt={location.hero.hero_image.alt}
                fill
                sizes="100vw"
                className="object-cover mix-blend-overlay"
                priority
              />
            </div>
          )}

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-slate-50" />
        </div>

        {/* Hero Content */}
        <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-16 py-24 sm:py-32 lg:py-40">
          <div className="max-w-5xl mx-auto text-center">
            {/* Location Badge */}
            <div className="inline-flex items-center gap-3 mb-6 sm:mb-8 group animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-400 rounded-full blur-xl opacity-40 group-hover:opacity-70 transition-all duration-300" />
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl shadow-cyan-500/30">
                  <MapPin className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>
              <div className="text-left">
                <div className="text-xs text-cyan-600 uppercase tracking-[0.2em] font-bold">
                  Voice AI Agency in
                </div>
                <span className="text-cyan-700 font-black text-lg sm:text-2xl tracking-tight">
                  {location.location.city}, {location.location.state_abbr}
                </span>
              </div>
            </div>

            {/* Headline with local loss data */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-6 sm:mb-8 leading-[1.05] tracking-[-0.02em] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
              Stop Losing{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400">
                ${location.estimated_missed_call_loss?.toLocaleString() || "47,000"}
              </span>
              /Year to Missed Calls in {location.location.city}
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl lg:text-2xl text-slate-700 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
              {location.hero?.subheadline}
            </p>

            {/* Local Phone CTA - Prominent */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 sm:mb-12 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-450">
              <a
                href={`tel:${localPhoneNumber.replace(/\D/g, '')}`}
                className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-500 text-slate-950 px-10 sm:px-12 py-6 sm:py-7 rounded-2xl font-black text-lg sm:text-xl transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-400/50 hover:scale-[1.03] overflow-hidden w-full sm:w-auto"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                <Phone className="w-6 h-6 relative z-10" />
                <div className="relative z-10 text-left">
                  <div className="text-sm font-bold opacity-90">Call Our {location.location.city} Team</div>
                  <div className="text-xl sm:text-2xl font-black tracking-tight">{localPhoneNumber}</div>
                </div>
                <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
              </a>

              {location.hero?.cta_primary && (
                <a
                  href={location.hero.cta_primary.action}
                  className="group inline-flex items-center justify-center gap-3 bg-slate-900/10 backdrop-blur-md text-slate-900 border-2 border-slate-900/30 px-8 sm:px-10 py-6 sm:py-7 rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 hover:bg-slate-900/15 hover:border-cyan-400/70 hover:shadow-xl w-full sm:w-auto"
                >
                  <span className="relative z-10">{location.hero.cta_primary.text}</span>
                  <Calendar className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </a>
              )}
            </div>

            {/* Trust indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-600">
              <div className="inline-flex items-center gap-2 bg-green-500/15 border border-green-400/50 px-5 py-3 rounded-full">
                <BadgeCheck className="text-green-600 w-4 h-4" />
                <span className="font-bold text-green-700 text-sm">Free Strategy Call</span>
              </div>
              <div className="inline-flex items-center gap-2 text-slate-700">
                <Zap className="text-cyan-600 w-4 h-4" />
                <span className="text-sm font-bold">15-Min Response Time</span>
              </div>
              <div className="inline-flex items-center gap-2 text-slate-700">
                <Headphones className="text-cyan-600 w-4 h-4" />
                <span className="text-sm font-bold">Local {location.location.city} Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOCAL MARKET STATS - Animated counters with local data */}
      <LocalMarketStats
        city={location.location.city}
        estimatedLoss={location.estimated_missed_call_loss || 47000}
        missedCallPercentage={location.missed_call_percentage || 27}
      />

      {/* CRO: Social Proof Banner */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 py-6 sm:py-8">
        <SocialProofBanner />
      </div>

      {/* Local Intro Section */}
      {location.local_intro && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto">
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              {location.local_intro.paragraph}
            </p>
          </div>
        </div>
      )}

      {/* LOCAL INDUSTRIES SERVED - Interactive tabs/cards */}
      <LocalIndustriesServed
        city={location.location.city}
        popularIndustries={location.popular_industries || [
          { name: "HVAC & Home Services", icon: "build", description: "24/7 call answering for emergency calls" },
          { name: "Legal & Law Firms", icon: "gavel", description: "Pre-qualify leads before attorney consultation" },
          { name: "Medical & Healthcare", icon: "local_hospital", description: "HIPAA-compliant appointment scheduling" },
          { name: "Real Estate", icon: "home", description: "Qualify buyers and schedule property showings" }
        ]}
      />

      {/* Benefits Section - Why Choose Us */}
      {location.benefits && location.benefits.length > 0 && (
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-16 bg-slate-50 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto relative z-10">
            <div className="text-center mb-8 sm:mb-12 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/30 mb-6">
                <Award className="text-cyan-400 w-4 h-4" />
                <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                  Why Choose Us
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 mb-4">
                Why{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-400">
                  {location.location.city}
                </span>{" "}
                Businesses Choose Us
              </h2>
              <p className="text-slate-600 text-base sm:text-lg">
                Proven results for local businesses like yours
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {location.benefits.slice(0, 6).map((benefit: Benefit, index: number) => {
                const IconComponent = benefit.icon ? getIcon(benefit.icon) : CheckCircle;
                return (
                  <div
                    key={index}
                    className="group relative"
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <div className="absolute -inset-px bg-gradient-to-br from-cyan-400/0 via-cyan-400/40 to-cyan-400/0 rounded-2xl opacity-0 group-hover:opacity-100 blur-md transition-all duration-500" />
                    <div className="relative h-full p-6 sm:p-7 rounded-2xl bg-white backdrop-blur-xl border border-slate-200 shadow-[0_8px_32px_rgba(0,0,0,0.15)] group-hover:border-cyan-400/30 transition-all duration-500 group-hover:translate-y-[-4px]">
                      <div className="absolute inset-0 bg-mesh-premium rounded-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />
                      <div className="relative mb-5">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl blur-lg opacity-30 group-hover:opacity-60 transition-opacity" />
                        <div className="relative flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-400/20 via-cyan-500/10 to-blue-500/20 border border-cyan-400/30 group-hover:scale-110 transition-all duration-300">
                          <IconComponent className="text-cyan-300 w-6 h-6" />
                        </div>
                      </div>
                      <div className="relative z-10">
                        <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-cyan-400 transition-all">
                          {benefit.title}
                        </h3>
                        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                      <div className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-xs font-black">
                        {index + 1}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="max-w-5xl mx-auto mt-12 sm:mt-16">
              <TrustSignals />
            </div>
          </div>
        </section>
      )}

      {/* COMPETITOR COMPARISON - Why choose us over competitors */}
      <CompetitorComparison city={location.location.city} />

      {/* Local Use Cases - Success stories */}
      {location.local_use_cases && location.local_use_cases.length > 0 && (
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-16">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                Success Stories from {location.location.city}
              </h2>
              <p className="text-slate-600 text-base sm:text-lg">
                Real results from local businesses like yours
              </p>
            </div>
            <div className="space-y-5 sm:space-y-6">
              {location.local_use_cases.map((useCase: LocalUseCase, index: number) => (
                <div
                  key={index}
                  className="border border-slate-200 rounded-xl p-5 sm:p-6 lg:p-8 bg-white/60 backdrop-blur-sm hover:border-cyan-400/30 hover:shadow-lg hover:shadow-cyan-400/5 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <div className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-cyan-400/10 border border-cyan-400/20 shrink-0">
                      <Building2 className="text-cyan-400 w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-cyan-400 mb-3 sm:mb-4">
                        {useCase.business_type || useCase.industry}
                      </h3>
                      <p className="text-sm sm:text-base text-slate-700 mb-3">
                        <strong className="text-slate-900 font-medium">Challenge:</strong>{" "}
                        {useCase.scenario || useCase.example}
                      </p>
                      <p className="text-sm sm:text-base text-slate-700">
                        <strong className="text-green-600 font-medium">Result:</strong>{" "}
                        {useCase.result}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SERVICE AREA MAP - Visual coverage representation */}
      <ServiceAreaMap
        city={location.location.city}
        state={location.location.state}
        stateAbbr={location.location.state_abbr}
        serviceAreaRadius={location.location.service_area_radius || "30 miles"}
        nearbyAreas={location.location.nearby_areas || []}
        areasList={location.service_area?.areas_list || []}
      />

      {/* Premium Testimonials Section - Local testimonials with business details */}
      {location.local_testimonials && location.local_testimonials.length > 0 && (
        <PremiumLocationTestimonials
          testimonials={location.local_testimonials}
          cityName={location.location.city}
        />
      )}

      {/* Premium FAQ Section */}
      {location.faq && location.faq.length > 0 && (
        <PremiumLocationFAQ
          faqs={location.faq}
          cityName={location.location.city}
        />
      )}

      {/* CRO: Objection Handler */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-16">
        <div className="container mx-auto">
          <ObjectionHandler />
        </div>
      </section>

      {/* CRO: Risk Reversal */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-16 bg-slate-50">
        <div className="container mx-auto max-w-4xl">
          <RiskReversal />
        </div>
      </section>

      {/* CTA Section with Local Context */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-16">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 lg:p-12 border border-slate-200 shadow-2xl">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
                Ready to Grow Your {location.location.city} Business?
              </h2>
              <p className="text-base sm:text-lg text-slate-700 mb-2 px-4">
                Join {location.location.city} businesses using Voice AI to capture more leads 24/7.
              </p>
              <div className="inline-flex items-center gap-2 text-green-400 text-sm">
                <Clock className="w-4 h-4" />
                <span>We'll call you back in 15 minutes</span>
              </div>
            </div>

            <OptimizedLeadForm source={location.page_id} />

            <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-green-500/20 border border-green-500/40 mb-2">
                  <BadgeCheck className="text-green-400 w-5 h-5 sm:w-5 sm:h-5" />
                </div>
                <p className="text-xs text-slate-600">100% Secure</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-green-500/20 border border-green-500/40 mb-2">
                  <Zap className="text-green-400 w-5 h-5 sm:w-5 sm:h-5" />
                </div>
                <p className="text-xs text-slate-600">15-Min Setup</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-green-500/20 border border-green-500/40 mb-2">
                  <Headphones className="text-green-400 w-5 h-5 sm:w-5 sm:h-5" />
                </div>
                <p className="text-xs text-slate-600">Local Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Locations */}
      {location.location.nearby_areas && location.location.nearby_areas.length > 0 && (
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-16">
          <div className="container mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-6 sm:mb-8">
              Also Serving Nearby Areas
            </h2>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {location.location.nearby_areas.map((area: string, index: number) => (
                <span
                  key={index}
                  className="px-3 sm:px-4 py-2 bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm rounded-full hover:border-cyan-400/50 hover:text-cyan-600 transition-all"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
