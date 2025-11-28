import { getAllServices, getServiceBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import Link from "next/link";

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

  return {
    title: service.seo.page_title,
    description: service.seo.meta_description,
    keywords: service.seo.keywords,
    openGraph: {
      title: service.seo.og_title || service.seo.page_title,
      description: service.seo.og_description || service.seo.meta_description,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const service = await getServiceBySlug(resolvedParams.slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Hero Section */}
      <div className="relative py-24 px-8 lg:px-16 bg-gradient-to-br from-background-dark via-background-dark to-primary/10">
        {service.hero?.hero_image && (
          <div className="absolute inset-0 opacity-20">
            <Image
              src={service.hero.hero_image.url}
              alt={service.hero.hero_image.alt}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="container mx-auto relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            {service.hero?.headline || service.seo.h1_heading}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mb-8">
            {service.hero?.subheadline}
          </p>
          <div className="flex flex-wrap gap-4">
            {service.hero?.cta_primary && (
              <a
                href={service.hero.cta_primary.action}
                className="bg-primary text-black px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105 glowing-button"
              >
                {service.hero.cta_primary.text}
              </a>
            )}
            {service.hero?.cta_secondary && (
              <a
                href={service.hero.cta_secondary.action}
                className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
              >
                {service.hero.cta_secondary.text}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Intro Section */}
      {service.intro && (
        <div className="container mx-auto px-8 lg:px-16 py-16">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {service.intro.paragraph}
            </p>
          </div>
        </div>
      )}

      {/* Benefits Section */}
      {service.benefits && service.benefits.length > 0 && (
        <section className="py-16 px-8 lg:px-16 bg-gray-50 dark:bg-black/20">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
              Key Benefits
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {service.benefits.map((benefit: any, index: number) => (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900/50 hover:border-primary/50 transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-2xl mb-4">
                    <span className="material-icons">{benefit.icon || "check_circle"}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How It Works Section */}
      {service.how_it_works && service.how_it_works.length > 0 && (
        <section className="py-16 px-8 lg:px-16">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
              How It Works
            </h2>
            <div className="max-w-3xl mx-auto space-y-8">
              {service.how_it_works.map((step: any) => (
                <div
                  key={step.step}
                  className="flex gap-6 border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900/50"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-primary text-xl font-bold">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {service.faq && service.faq.length > 0 && (
        <section className="py-16 px-8 lg:px-16 bg-gray-50 dark:bg-black/20">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {service.faq.map((item: any, index: number) => (
                <details
                  key={index}
                  className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900/50"
                >
                  <summary className="font-bold text-gray-900 dark:text-white cursor-pointer">
                    {item.question}
                  </summary>
                  <p className="mt-4 text-gray-600 dark:text-gray-400">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section with Lead Form */}
      <section className="py-16 px-8 lg:px-16">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white dark:bg-gray-900/50 rounded-lg p-12 border border-gray-200 dark:border-gray-800 shadow-xl">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">
              {service.cta_section?.headline || "Ready to Get Started?"}
            </h2>
            <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-8">
              {service.cta_section?.subheadline ||
                "Contact us today for a free consultation and see how we can help grow your business."}
            </p>
            <LeadCaptureForm source={service.service.service_slug} />
          </div>
        </div>
      </section>

      {/* Related Services */}
      {service.related_pages?.services && service.related_pages.services.length > 0 && (
        <section className="py-16 px-8 lg:px-16 bg-gray-50 dark:bg-black/20">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Related Services
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {service.related_pages.services.map((relatedSlug: string) => (
                <Link
                  key={relatedSlug}
                  href={`/services/${relatedSlug}`}
                  className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-full hover:bg-white/20 transition-all"
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
