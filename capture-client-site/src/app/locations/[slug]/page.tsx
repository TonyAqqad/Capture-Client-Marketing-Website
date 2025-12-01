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
import MobileCTABar from "@/components/cro/MobileCTABar";
import { Benefit, FAQItem } from "@/types/content";
import {
  SITE_CONFIG,
  generateLocalBusinessSchema,
  generateServiceSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateWebPageSchema,
} from "@/lib/seo-config";

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
  const ogImageUrl = location.hero?.hero_image?.url || `${SITE_CONFIG.url}/og-image.jpg`;

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

  // Combine all schemas (filter out nulls)
  const schemas = [
    localBusinessSchema,
    serviceSchema,
    breadcrumbSchema,
    webPageSchema,
    faqSchema,
  ].filter(Boolean) as Array<Record<string, unknown>>;

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Inject JSON-LD structured data for local SEO */}
      <JsonLd schema={schemas} />

      {/* Mobile CTA Bar - Sticky bottom bar for mobile conversions */}
      <MobileCTABar />

      {/* Hero Section - Innovative Asymmetric Design */}
      <div className="relative overflow-hidden bg-slate-950 pt-16 sm:pt-20 lg:pt-24">
        {/* Layered Background Effects - More Visible */}
        <div className="absolute inset-0">
          {/* Base gradient with rich depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />

          {/* Enhanced mesh gradient overlays - stronger presence */}
          <div className="absolute inset-0 opacity-60">
            <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-cyan-500/20 rounded-full blur-[140px] animate-pulse" />
            <div
              className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse"
              style={{ animationDelay: "1s" }}
            />
          </div>

          {/* Hero image with INCREASED visibility */}
          {location.hero?.hero_image && (
            <div className="absolute inset-0 opacity-25">
              <Image
                src={location.hero.hero_image.url}
                alt={location.hero.hero_image.alt}
                fill
                className="object-cover mix-blend-overlay"
                priority
              />
            </div>
          )}

          {/* Angular accent dividers (not generic curves) */}
          <div className="absolute top-0 right-0 w-1/3 h-full">
            <div className="absolute top-0 right-0 w-full h-64 bg-gradient-to-bl from-cyan-500/5 to-transparent transform skew-y-6" />
          </div>

          {/* Layered grid pattern - more visible */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.08)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>

        {/* Asymmetric content layout - breaks conventional grid */}
        <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-16 py-16 sm:py-20 lg:py-32">
          <div className="grid grid-cols-12 gap-6 lg:gap-8">
            {/* Main content - offset left (7 cols instead of centered) */}
            <div className="col-span-12 lg:col-span-7">
              {/* Location Badge - Magnetic hover effect ready */}
              <div className="inline-flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10 group animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="relative">
                  <div className="absolute inset-0 bg-cyan-400 rounded-full blur-xl opacity-40 group-hover:opacity-70 transition-all duration-300" />
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl shadow-cyan-500/30 group-hover:scale-110 transition-transform duration-300">
                    <span className="material-icons text-white text-xl sm:text-2xl">location_on</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-cyan-200 uppercase tracking-[0.2em] font-bold mb-1">
                    Now Serving
                  </div>
                  <span className="text-cyan-300 font-black text-lg sm:text-2xl tracking-tight">
                    {location.location.city}, {location.location.state_abbr}
                  </span>
                </div>
              </div>

              {/* Headline - BOLD with extreme weight contrast */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-6 sm:mb-8 leading-[1.05] sm:leading-[0.95] tracking-[-0.02em] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
                {location.hero?.headline?.split(" ").map((word, index, words) => {
                  // Make last 2 words stand out with vibrant gradient
                  const isAccent = index >= words.length - 2;
                  return (
                    <span
                      key={index}
                      className={
                        isAccent
                          ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-400 font-black"
                          : "text-white"
                      }
                    >
                      {word}{" "}
                    </span>
                  );
                }) || location.seo.h1_heading}
              </h1>

              {/* Subheadline - IMPROVED readability (no fade) */}
              <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-slate-200 max-w-2xl mb-8 sm:mb-12 leading-relaxed font-normal animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                {location.hero?.subheadline}
              </p>

              {/* CRO: Bold Urgency Indicator - Distinctive design */}
              <div className="mb-8 sm:mb-12 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-450">
                <div className="relative group">
                  {/* Layered frame effect (not generic rounded box) */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
                  <div className="hidden sm:block absolute inset-0 border-2 border-orange-400/30 rounded-2xl translate-x-2 translate-y-2" />

                  <div className="relative bg-gradient-to-br from-orange-500/15 via-amber-500/15 to-orange-500/15 border-2 border-orange-400/50 rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-sm">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                      {/* Animated pulse indicator */}
                      <div className="relative flex-shrink-0 hidden sm:block">
                        <div className="w-5 h-5 bg-orange-400 rounded-full animate-pulse" />
                        <div className="absolute inset-0 w-5 h-5 bg-orange-400 rounded-full animate-ping" />
                      </div>

                      {/* Main text - HIGH CONTRAST */}
                      <div className="flex-1">
                        <div className="flex items-start sm:items-center gap-2 mb-2 sm:mb-1.5">
                          <div className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-orange-400/10 border border-orange-400/20 shrink-0">
                            <span className="material-icons text-orange-300 text-lg sm:text-xl">schedule</span>
                          </div>
                          <p className="text-base sm:text-lg lg:text-xl font-black text-white">
                            Only{" "}
                            <span className="text-orange-300 text-xl sm:text-2xl font-black">
                              5 Spots Left
                            </span>{" "}
                            <span className="block sm:inline">for December Onboarding</span>
                          </p>
                        </div>
                        <p className="text-xs sm:text-sm text-orange-100 font-medium pl-12 sm:pl-0">
                          High demand this month. Book now to secure your spot.
                        </p>
                      </div>

                      {/* Warning icon */}
                      <div className="hidden lg:flex items-center justify-center w-14 h-14 rounded-full bg-orange-400/10 border border-orange-400/20 shrink-0">
                        <span className="material-icons text-orange-300 text-3xl animate-pulse">
                          warning
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Group - Bold, Confident Design */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mb-8 sm:mb-12 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-600">
                {location.hero?.cta_primary && (
                  <a
                    href={location.hero.cta_primary.action}
                    className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-500 text-slate-950 px-8 sm:px-10 lg:px-12 py-5 sm:py-6 rounded-2xl font-black text-base sm:text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-400/50 hover:scale-[1.03] overflow-hidden min-h-[56px]"
                  >
                    {/* Animated shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />

                    <span className="relative z-10">{location.hero.cta_primary.text}</span>
                    <span className="material-icons text-xl sm:text-2xl relative z-10 group-hover:translate-x-2 transition-transform duration-300">
                      arrow_forward
                    </span>
                  </a>
                )}

                <a
                  href="tel:865-346-3339"
                  className="group inline-flex items-center justify-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-md text-white border-2 border-white/30 px-6 sm:px-8 lg:px-10 py-5 sm:py-6 rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 hover:bg-white/15 hover:border-cyan-400/70 hover:shadow-xl hover:shadow-cyan-400/20 min-h-[56px]"
                >
                  <div className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 border border-white/20 shrink-0 group-hover:bg-cyan-400/20 group-hover:border-cyan-400/40 transition-all duration-300">
                    <span className="material-icons text-xl sm:text-2xl text-white group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                      phone
                    </span>
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-slate-300 font-medium uppercase tracking-wider">
                      Call Now
                    </div>
                    <div className="text-base sm:text-lg font-black tracking-tight text-white">
                      (865) 346-3339
                    </div>
                  </div>
                </a>
              </div>

              {/* Trust Signals Row - HIGH CONTRAST */}
              <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 sm:gap-6 animate-in fade-in slide-in-from-bottom-14 duration-700 delay-750">
                {/* Free value offer - more prominent */}
                <div className="inline-flex items-center gap-3 bg-green-500/15 border-2 border-green-400/50 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full backdrop-blur-sm hover:bg-green-500/20 transition-all w-full sm:w-auto">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-green-500/30 shrink-0">
                    <span className="material-icons text-green-300 text-base">verified</span>
                  </div>
                  <span className="font-bold text-green-200 text-sm lg:text-base">
                    Free Strategy Call - No Credit Card Required
                  </span>
                </div>

                {/* Additional trust indicator - improved contrast */}
                <div className="inline-flex items-center gap-2.5 text-slate-200">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-cyan-400/10 border border-cyan-400/20 shrink-0">
                    <span className="material-icons text-cyan-300 text-base">bolt</span>
                  </div>
                  <span className="text-sm font-bold">15-Minute Response Time</span>
                </div>
              </div>
            </div>

            {/* Right column - Floating visual element (asymmetric) */}
            <div className="hidden lg:block col-span-5 relative">
              {/* Decorative geometric accent */}
              <div className="absolute top-20 right-0 w-80 h-80 border-2 border-cyan-400/20 rounded-3xl transform rotate-12 animate-pulse" />
              <div
                className="absolute top-24 right-4 w-80 h-80 border-2 border-blue-400/20 rounded-3xl transform -rotate-6 animate-pulse"
                style={{ animationDelay: "0.5s" }}
              />
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-slate-950" />
      </div>

      {/* CRO: Social Proof Banner - Social proof principle */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 py-6 sm:py-8">
        <SocialProofBanner />
      </div>

      {/* Local Intro Section */}
      {location.local_intro && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto">
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {location.local_intro.paragraph}
            </p>
          </div>
        </div>
      )}

      {/* Benefits Section */}
      {location.benefits && location.benefits.length > 0 && (
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-16 bg-slate-900/50">
          <div className="container mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-8 sm:mb-12">
              Why {location.location.city} Businesses Choose Us
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {location.benefits.slice(0, 6).map((benefit: Benefit, index: number) => (
                <div
                  key={index}
                  className="group border border-slate-800 rounded-xl p-5 sm:p-6 bg-slate-900/50 backdrop-blur-sm hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/10 transition-all duration-300"
                >
                  <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-2xl mb-4 group-hover:bg-cyan-400/20 transition-all shrink-0">
                    <span className="material-icons">{benefit.icon || "check_circle"}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                  <p className="text-sm sm:text-base text-slate-400">{benefit.description}</p>
                </div>
              ))}
            </div>

            {/* CRO: Trust Signals - Authority principle */}
            <div className="max-w-5xl mx-auto mt-16">
              <TrustSignals />
            </div>
          </div>
        </section>
      )}

      {/* Local Use Cases - Social proof through case studies */}
      {location.local_use_cases && location.local_use_cases.length > 0 && (
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-16">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                Success Stories from {location.location.city}
              </h2>
              <p className="text-slate-400 text-base sm:text-lg">
                Real results from local businesses like yours
              </p>
            </div>
            <div className="space-y-5 sm:space-y-6">
              {location.local_use_cases.map((useCase: LocalUseCase, index: number) => (
                <div
                  key={index}
                  className="border border-slate-800 rounded-xl p-5 sm:p-6 lg:p-8 bg-slate-900/30 backdrop-blur-sm hover:border-cyan-400/30 hover:shadow-lg hover:shadow-cyan-400/5 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <div className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-cyan-400/10 border border-cyan-400/20 shrink-0">
                      <span className="material-icons text-cyan-400 text-xl sm:text-2xl">business</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-cyan-400 mb-3 sm:mb-4">
                        {useCase.business_type || useCase.industry}
                      </h3>
                      <p className="text-sm sm:text-base text-slate-300 mb-3">
                        <strong className="text-white font-medium">Challenge:</strong>{" "}
                        {useCase.scenario || useCase.example}
                      </p>
                      <p className="text-sm sm:text-base text-slate-300">
                        <strong className="text-green-400 font-medium">Result:</strong>{" "}
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

      {/* Service Area */}
      {location.service_area && (
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-16 bg-slate-900/50">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4 sm:mb-6">
              {location.service_area.heading}
            </h2>
            <p className="text-center text-slate-400 text-sm sm:text-base mb-6 sm:mb-8 px-4">{location.service_area.description}</p>
            {location.service_area.areas_list && (
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {location.service_area.areas_list.map((area: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 sm:px-4 py-2 bg-cyan-400/10 border border-cyan-400/30 rounded-full text-cyan-400 text-xs sm:text-sm font-medium hover:bg-cyan-400/20 transition-colors"
                  >
                    {area}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* CRO: Objection Handler - Replaces basic FAQ with psychology-driven version */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-16">
        <div className="container mx-auto">
          <ObjectionHandler />
        </div>
      </section>

      {/* CRO: Risk Reversal - Removes fear of commitment */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-16 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <RiskReversal />
        </div>
      </section>

      {/* CTA Section with Optimized Lead Form */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-16">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 sm:p-8 lg:p-12 border border-slate-800 shadow-2xl">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
                Ready to Grow Your {location.location.city} Business?
              </h2>
              <p className="text-base sm:text-lg text-slate-400 mb-2 px-4">
                Get your free strategy call and see exactly how we can capture more leads for you.
              </p>
              <div className="inline-flex items-center gap-2 text-green-400 text-sm">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-400/10 border border-green-400/20 shrink-0">
                  <span className="material-icons text-green-400" style={{ fontSize: '14px' }}>schedule</span>
                </div>
                <span>We'll call you in 15 minutes</span>
              </div>
            </div>

            {/* CRO: Optimized 2-step form - Commitment & consistency principle */}
            <OptimizedLeadForm source={location.page_id} />

            {/* Trust indicators near form */}
            <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-green-500/20 border border-green-500/40 mb-2">
                  <span className="material-icons text-green-400 text-lg sm:text-xl">verified</span>
                </div>
                <p className="text-xs text-slate-400">100% Secure</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-green-500/20 border border-green-500/40 mb-2">
                  <span className="material-icons text-green-400 text-lg sm:text-xl">bolt</span>
                </div>
                <p className="text-xs text-slate-400">15-Min Setup</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-green-500/20 border border-green-500/40 mb-2">
                  <span className="material-icons text-green-400 text-lg sm:text-xl">support_agent</span>
                </div>
                <p className="text-xs text-slate-400">Live Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Locations */}
      {location.location.nearby_areas && location.location.nearby_areas.length > 0 && (
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-16">
          <div className="container mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6 sm:mb-8">
              Also Serving Nearby Areas
            </h2>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {location.location.nearby_areas.map((area: string, index: number) => (
                <span
                  key={index}
                  className="px-3 sm:px-4 py-2 bg-slate-900/30 border border-slate-700 text-slate-300 text-xs sm:text-sm rounded-full hover:border-cyan-400/50 hover:text-cyan-400 transition-all"
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
