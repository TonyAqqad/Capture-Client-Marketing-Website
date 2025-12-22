import { getAllServices, getServiceBySlug, BenefitItem, ProcessStep } from "@/lib/data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import ServiceHero from "@/components/ServiceHero";
import {
  SITE_CONFIG,
  generateServiceSchema,
  generateBreadcrumbSchema,
  generateWebPageSchema,
  generateFAQSchema,
} from "@/lib/seo-config";
import { generateHowToSchema } from "@/lib/advanced-schemas";
import { getIcon } from "@/lib/icon-map";
import { ChevronDown } from "lucide-react";

export async function generateStaticParams() {
  const services = await getAllServices();
  return services.map((service) => ({
    slug: service.service.service_slug,
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
  const service = await getServiceBySlug(resolvedParams.slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  const pageUrl = `${SITE_CONFIG.url}/services/${service.service.service_slug}`;
  const ogImageUrl = service.hero?.hero_image?.url || `${SITE_CONFIG.url}/og-image.png`;

  return {
    title: service.seo.page_title,
    description: service.seo.meta_description,
    keywords: service.seo.keywords,

    // Canonical URL
    alternates: {
      canonical: pageUrl,
    },

    // Enhanced Open Graph
    openGraph: {
      title: service.seo.og_title || service.seo.page_title,
      description: service.seo.og_description || service.seo.meta_description,
      url: pageUrl,
      type: "website",
      locale: "en_US",
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: service.service.service_name,
        },
      ],
    },

    // Twitter Card
    twitter: {
      card: "summary_large_image",
      title: service.seo.page_title,
      description: service.seo.meta_description,
      images: [ogImageUrl],
    },

    // Robots
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const service = await getServiceBySlug(resolvedParams.slug);

  if (!service) {
    notFound();
  }

  // Generate JSON-LD schemas for service SEO
  const serviceSchema = generateServiceSchema(service);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_CONFIG.url },
    { name: "Services", url: `${SITE_CONFIG.url}/services` },
    {
      name: service.service.service_name,
      url: `${SITE_CONFIG.url}/services/${service.service.service_slug}`,
    },
  ]);

  const webPageSchema = generateWebPageSchema({
    title: service.seo.page_title,
    description: service.seo.meta_description,
    url: `${SITE_CONFIG.url}/services/${service.service.service_slug}`,
  });

  // Generate FAQ schema if FAQs exist
  const faqSchema =
    service.faq && service.faq.length > 0
      ? generateFAQSchema(
          service.faq.map((item: { question: string; answer: string }) => ({
            question: item.question,
            answer: item.answer,
          }))
        )
      : null;

  // Generate HowTo schema if process steps exist
  const howToSchema =
    service.process && service.process.steps && service.process.steps.length > 0
      ? generateHowToSchema({
          name: `How to Get Started with ${service.service.service_name}`,
          description: `Step-by-step guide to implementing ${service.service.service_name} for your business with Capture Client.`,
          totalTime: "P2W", // 2 weeks typical setup
          steps: service.process.steps.map((step: ProcessStep, index: number) => ({
            step: index + 1,
            title: step.title,
            description: step.description,
          })),
          url: `${SITE_CONFIG.url}/services/${service.service.service_slug}`,
        })
      : null;

  const schemas = [serviceSchema, breadcrumbSchema, webPageSchema, faqSchema, howToSchema].filter(
    Boolean
  ) as Array<Record<string, unknown>>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Inject JSON-LD structured data */}
      <JsonLd schema={schemas} />

      {/* Premium Service Hero Section */}
      <ServiceHero
        service={service.service}
        hero={service.hero}
        stats={service.social_proof?.stats}
      />

      {/* Intro Section - Premium glassy design */}
      {service.intro && (
        <div className="relative container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-12 sm:py-16">
          {/* Floating gradient orb */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
          </div>

          <div className="max-w-4xl mx-auto relative">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
              <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed">
                {service.intro.paragraph}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Benefits Section - Premium glassy cards */}
      {service.benefits && service.benefits.length > 0 && (
        <section className="relative py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-16 overflow-hidden">
          {/* Background gradient mesh */}
          <div className="absolute inset-0 bg-mesh-premium opacity-30 pointer-events-none" />

          <div className="container mx-auto relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-slate-900 text-center mb-8 sm:mb-12 px-4">
              <span className="text-slate-400 font-extralight">Key</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-slate-900 to-primary">
                Benefits
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {service.benefits.map((benefit: BenefitItem, index: number) => {
                const IconComponent = getIcon(benefit.icon || "check_circle");
                return (
                  <div
                    key={index}
                    className="group relative bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 transition-all duration-500 hover:border-accent/50 hover:shadow-[0_20px_60px_rgba(0,201,255,0.2)] hover:-translate-y-1"
                  >
                    {/* Inner glow on hover */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />

                    {/* Icon - enhanced with glass effect */}
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 mb-4">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-primary/20 rounded-2xl blur-sm" />
                      <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-white/[0.15] to-white/[0.05] backdrop-blur-sm border border-accent/30 flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] group-hover:border-accent/50 transition-colors duration-500">
                        <IconComponent className="w-6 h-6 text-accent drop-shadow-[0_4px_8px_rgba(0,201,255,0.5)]" />
                      </div>
                    </div>

                    <h3 className="relative text-lg sm:text-xl font-bold text-slate-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-accent transition-all duration-500">
                      {benefit.title}
                    </h3>
                    <p className="relative text-base text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* How It Works Section - Premium stepped process */}
      {service.how_it_works && service.how_it_works.length > 0 && (
        <section className="relative py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-16 bg-gradient-to-b from-slate-50 via-white to-slate-50">
          {/* Mesh gradient background */}
          <div className="absolute inset-0 bg-mesh-gradient opacity-30 pointer-events-none" />

          <div className="container mx-auto relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-slate-900 text-center mb-8 sm:mb-12 px-4">
              <span className="text-slate-400 font-extralight">How It</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
                Works
              </span>
            </h2>
            <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8">
              {service.how_it_works.map((step: ProcessStep, index: number) => (
                <div
                  key={step.step}
                  className="group relative flex gap-4 sm:gap-6 bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 transition-all duration-500 hover:border-primary/50 hover:shadow-[0_20px_60px_rgba(74,105,226,0.2)] hover:-translate-y-1"
                >
                  {/* Connection line to next step (except last) */}
                  {index < service.how_it_works.length - 1 && (
                    <div className="absolute left-[30px] sm:left-[35px] top-[56px] sm:top-[64px] w-px h-[calc(100%+16px)] sm:h-[calc(100%+24px)] bg-gradient-to-b from-primary/50 to-transparent" />
                  )}

                  {/* Inner glow on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

                  {/* Step number badge - glassy */}
                  <div className="relative flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 z-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-accent/30 rounded-full blur-md" />
                    <div className="relative w-full h-full rounded-full bg-gradient-to-br from-primary/90 to-accent/90 backdrop-blur-xl border-2 border-white/20 flex items-center justify-center shadow-[0_8px_24px_rgba(74,105,226,0.4)] group-hover:shadow-[0_12px_32px_rgba(0,201,255,0.6)] transition-shadow duration-500">
                      <span className="text-lg sm:text-xl font-black text-white drop-shadow-lg">
                        {step.step}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 relative">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-accent transition-all duration-500">
                      {step.title}
                    </h3>
                    <p className="text-base text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section - Premium glassy accordion */}
      {service.faq && service.faq.length > 0 && (
        <section className="relative py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-16 overflow-hidden">
          {/* Background mesh */}
          <div className="absolute inset-0 bg-mesh-premium opacity-20 pointer-events-none" />

          <div className="container mx-auto max-w-4xl relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-slate-900 text-center mb-8 sm:mb-12 px-4">
              <span className="text-slate-400 font-extralight">Frequently Asked</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-slate-900 to-accent">
                Questions
              </span>
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {service.faq.map((item: { question: string; answer: string }, index: number) => (
                <details
                  key={index}
                  className="group bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 transition-all duration-500 hover:border-accent/50 hover:shadow-[0_20px_60px_rgba(0,201,255,0.15)] open:border-primary/50"
                >
                  {/* Inner glow on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />

                  <summary className="relative font-bold text-base sm:text-lg text-slate-900 cursor-pointer min-h-[44px] flex items-center list-none group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-accent transition-all duration-500">
                    <span className="flex-1 pr-4">{item.question}</span>
                    <ChevronDown className="w-5 h-5 text-accent ml-4 group-open:rotate-180 transition-transform duration-300 drop-shadow-[0_4px_8px_rgba(0,201,255,0.5)]" />
                  </summary>
                  <p className="relative mt-3 sm:mt-4 text-base text-slate-600 leading-relaxed group-open:text-slate-700 transition-colors duration-300">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section with Lead Form - Premium glassy design */}
      <section className="relative py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-16 bg-gradient-to-b from-slate-50 via-white to-slate-50">
        {/* Floating gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="relative bg-white rounded-3xl p-6 sm:p-8 md:p-12 border border-slate-200 shadow-[0_20px_80px_rgba(0,0,0,0.3)] overflow-hidden">
            {/* Inner mesh gradient */}
            <div className="absolute inset-0 bg-mesh-premium opacity-30 pointer-events-none" />

            {/* Animated gradient border glow */}
            <div className="absolute -inset-px rounded-3xl opacity-50 bg-gradient-to-r from-accent via-primary to-accent blur-sm" />

            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-black text-slate-900 text-center mb-3 sm:mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-accent to-slate-900">
                  {service.cta_section?.headline || "Ready to Get Started?"}
                </span>
              </h2>
              <p className="text-center text-base sm:text-lg text-slate-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
                {service.cta_section?.subheadline ||
                  "Contact us today for a free consultation and see how we can help grow your business."}
              </p>
              <LeadCaptureForm source={service.service.service_slug} />
            </div>
          </div>
        </div>
      </section>

      {/* Related Services - Premium pill buttons */}
      {service.related_pages?.services && service.related_pages.services.length > 0 && (
        <section className="relative py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-16">
          {/* Mesh gradient background */}
          <div className="absolute inset-0 bg-mesh-gradient opacity-20 pointer-events-none" />

          <div className="container mx-auto relative z-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-slate-900 text-center mb-6 sm:mb-8 px-4">
              <span className="text-slate-400 font-extralight">Related</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Services
              </span>
            </h2>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {service.related_pages.services.map((relatedSlug: string) => (
                <Link
                  key={relatedSlug}
                  href={`/services/${relatedSlug}`}
                  className="group relative px-5 sm:px-6 py-3 min-h-[44px] bg-white border border-slate-200 text-slate-900 text-sm sm:text-base rounded-full transition-all duration-300 hover:border-accent/50 hover:shadow-[0_8px_24px_rgba(0,201,255,0.3)] hover:-translate-y-0.5 flex items-center justify-center overflow-hidden"
                >
                  {/* Inner glow on hover */}
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-accent/10 to-primary/10" />

                  <span className="relative z-10 font-semibold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-accent transition-all duration-300">
                    {relatedSlug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
