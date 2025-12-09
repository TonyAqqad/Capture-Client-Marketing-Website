import { getAllNationalPages, getNationalBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import { Benefit, FAQItem, HowItWorksStep, UseCase } from "@/types/content";
import { getIcon } from "@/lib/icon-map";

export async function generateStaticParams() {
  const nationalPages = await getAllNationalPages();
  return nationalPages.map((page) => ({
    slug: page.keyword.keyword_slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const page = await getNationalBySlug(resolvedParams.slug);

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: page.seo.page_title,
    description: page.seo.meta_description,
    keywords: page.seo.keywords,
    openGraph: {
      title: page.seo.og_title || page.seo.page_title,
      description: page.seo.og_description || page.seo.meta_description,
      url: `https://captureclient.com/${resolvedParams.slug}`,
      siteName: "Capture Client",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.seo.og_title || page.seo.page_title,
      description: page.seo.og_description || page.seo.meta_description,
    },
    alternates: {
      canonical: `https://captureclient.com/${resolvedParams.slug}`,
    },
  };
}

export default async function NationalPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const page = await getNationalBySlug(resolvedParams.slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Hero Section */}
      <div className="relative py-24 px-8 lg:px-16 bg-gradient-to-br from-background-dark via-background-dark to-primary/10">
        {page.hero?.hero_image && (
          <div className="absolute inset-0 opacity-20">
            <Image
              src={page.hero.hero_image.url}
              alt={page.hero.hero_image.alt}
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
          </div>
        )}
        <div className="container mx-auto relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            {page.hero?.headline || page.seo.h1_heading}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mb-8">{page.hero?.subheadline}</p>
          <div className="flex flex-wrap gap-4">
            {page.hero?.cta_primary && (
              <a
                href={page.hero.cta_primary.action}
                className="bg-primary text-black px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105 glowing-button"
              >
                {page.hero.cta_primary.text}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Intro Section */}
      {page.intro && (
        <div className="container mx-auto px-8 lg:px-16 py-16">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {page.intro.paragraph}
            </p>
          </div>
        </div>
      )}

      {/* Benefits Section */}
      { page.benefits && page.benefits.length > 0 && (
        <section className="py-16 px-8 lg:px-16 bg-gray-50 dark:bg-black/20">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
              Key Benefits
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {page.benefits.map((benefit: Benefit, index: number) => {
                const IconComponent = getIcon(benefit.icon || "check_circle");
                return (
                  <div
                    key={index}
                    className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900/50 hover:border-primary/50 transition-all"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-2xl mb-4">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* How It Works Section */}
      { page.how_it_works && page.how_it_works.length > 0 && (
        <section className="py-16 px-8 lg:px-16">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
              How It Works
            </h2>
            <div className="max-w-3xl mx-auto space-y-8">
              {page.how_it_works.map((step: HowItWorksStep) => (
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

      {/* Industry Use Cases */}
      { page.industry_use_cases && page.industry_use_cases.length > 0 && (
        <section className="py-16 px-8 lg:px-16 bg-gray-50 dark:bg-black/20">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
              Industry Success Stories
            </h2>
            <div className="space-y-6">
              {page.industry_use_cases.map((useCase: UseCase, index: number) => (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900/50"
                >
                  <h3 className="text-xl font-bold text-primary mb-2">{useCase.industry}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    <strong>Challenge:</strong> {useCase.challenge}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    <strong>Solution:</strong> {useCase.solution}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Result:</strong> {useCase.result}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Nationwide Coverage */}
      { page.nationwide_coverage && (
        <section className="py-16 px-8 lg:px-16">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {page.nationwide_coverage.heading}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              {page.nationwide_coverage.description}
            </p>
            {page.nationwide_coverage.regions_highlighted && (
              <div className="flex flex-wrap justify-center gap-3">
                {page.nationwide_coverage.regions_highlighted.map(
                  (region: string, index: number) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary"
                    >
                      {region}
                    </span>
                  )
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* FAQ Section */}
      { page.faq && page.faq.length > 0 && (
        <section className="py-16 px-8 lg:px-16 bg-gray-50 dark:bg-black/20">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {page.faq.map((item: FAQItem, index: number) => (
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
              Ready to Get Started?
            </h2>
            <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-8">
              Contact us today for a free consultation and discover how we can help your business
              grow.
            </p>
            <LeadCaptureForm source={page.keyword.keyword_slug} />
          </div>
        </div>
      </section>
    </div>
  );
}
