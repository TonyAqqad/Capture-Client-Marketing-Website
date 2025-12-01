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

export async function generateStaticParams() {
  const services = await getAllServices();
  return services.map((service) => ({
    slug: service.service.service_slug,
  }));
}

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
  const ogImageUrl = service.hero?.hero_image?.url || `${SITE_CONFIG.url}/og-image.jpg`;

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

  const schemas = [serviceSchema, breadcrumbSchema, webPageSchema, faqSchema].filter(Boolean) as Array<Record<string, any>>;

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Inject JSON-LD structured data */}
      <JsonLd schema={schemas} />

      {/* Premium Service Hero Section */}
      <ServiceHero
        service={service.service}
        hero={service.hero}
        stats={service.social_proof?.stats}
      />

      {/* Intro Section - Mobile-optimized padding */}
      {service.intro && (
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto">
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {service.intro.paragraph}
            </p>
          </div>
        </div>
      )}

      {/* Benefits Section - Mobile-first grid */}
      {service.benefits && service.benefits.length > 0 && (
        <section className="py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-16 bg-gray-50 dark:bg-black/20">
          <div className="container mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white text-center mb-8 sm:mb-12 px-4">
              Key Benefits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {service.benefits.map((benefit: BenefitItem, index: number) => (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-gray-800 rounded-lg p-5 sm:p-6 bg-white dark:bg-gray-900/50 hover:border-primary/50 transition-all"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-2xl mb-4">
                    <span className="material-icons">{benefit.icon || "check_circle"}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How It Works Section - Mobile-optimized steps */}
      {service.how_it_works && service.how_it_works.length > 0 && (
        <section className="py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-16">
          <div className="container mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white text-center mb-8 sm:mb-12 px-4">
              How It Works
            </h2>
            <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8">
              {service.how_it_works.map((step: ProcessStep) => (
                <div
                  key={step.step}
                  className="flex gap-4 sm:gap-6 border border-gray-200 dark:border-gray-800 rounded-lg p-4 sm:p-6 bg-white dark:bg-gray-900/50"
                >
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-primary text-lg sm:text-xl font-bold">
                    {step.step}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section - Mobile-optimized accordion */}
      {service.faq && service.faq.length > 0 && (
        <section className="py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-16 bg-gray-50 dark:bg-black/20">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white text-center mb-8 sm:mb-12 px-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {service.faq.map((item: { question: string; answer: string }, index: number) => (
                <details
                  key={index}
                  className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 sm:p-6 bg-white dark:bg-gray-900/50 group"
                >
                  <summary className="font-bold text-base sm:text-lg text-gray-900 dark:text-white cursor-pointer min-h-[44px] flex items-center list-none">
                    <span className="flex-1">{item.question}</span>
                    <span className="material-icons text-primary ml-4 group-open:rotate-180 transition-transform">
                      expand_more
                    </span>
                  </summary>
                  <p className="mt-3 sm:mt-4 text-base text-gray-600 dark:text-gray-400 leading-relaxed">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section with Lead Form - Mobile-optimized */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white dark:bg-gray-900/50 rounded-lg p-6 sm:p-8 md:p-12 border border-gray-200 dark:border-gray-800 shadow-xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-3 sm:mb-4">
              {service.cta_section?.headline || "Ready to Get Started?"}
            </h2>
            <p className="text-center text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-6 sm:mb-8">
              {service.cta_section?.subheadline ||
                "Contact us today for a free consultation and see how we can help grow your business."}
            </p>
            <LeadCaptureForm source={service.service.service_slug} />
          </div>
        </div>
      </section>

      {/* Related Services - Mobile-optimized */}
      {service.related_pages?.services && service.related_pages.services.length > 0 && (
        <section className="py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-16 bg-gray-50 dark:bg-black/20">
          <div className="container mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-center mb-6 sm:mb-8 px-4">
              Related Services
            </h2>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {service.related_pages.services.map((relatedSlug: string) => (
                <Link
                  key={relatedSlug}
                  href={`/services/${relatedSlug}`}
                  className="px-5 sm:px-6 py-3 min-h-[44px] bg-white/10 border border-white/20 text-white text-sm sm:text-base rounded-full hover:bg-white/20 transition-all flex items-center justify-center"
                >
                  {relatedSlug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
