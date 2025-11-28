import { getAllLocations, getLocationBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import Link from "next/link";

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

  return {
    title: location.seo.page_title,
    description: location.seo.meta_description,
    keywords: location.seo.keywords,
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const location = await getLocationBySlug(resolvedParams.slug);

  if (!location) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Hero Section */}
      <div className="relative py-24 px-8 lg:px-16 bg-gradient-to-br from-background-dark via-background-dark to-primary/10">
        {location.hero?.hero_image && (
          <div className="absolute inset-0 opacity-20">
            <Image
              src={location.hero.hero_image.url}
              alt={location.hero.hero_image.alt}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="container mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-icons text-primary text-3xl">location_on</span>
            <span className="text-primary font-semibold text-lg">
              {location.location.city}, {location.location.state_abbr}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            {location.hero?.headline || location.seo.h1_heading}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mb-8">
            {location.hero?.subheadline}
          </p>
          <div className="flex flex-wrap gap-4">
            {location.hero?.cta_primary && (
              <a
                href={location.hero.cta_primary.action}
                className="bg-primary text-black px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105 glowing-button"
              >
                {location.hero.cta_primary.text}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Local Intro Section */}
      {location.local_intro && (
        <div className="container mx-auto px-8 lg:px-16 py-16">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {location.local_intro.paragraph}
            </p>
          </div>
        </div>
      )}

      {/* Benefits Section */}
      {location.benefits && location.benefits.length > 0 && (
        <section className="py-16 px-8 lg:px-16 bg-gray-50 dark:bg-black/20">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
              Why {location.location.city} Businesses Choose Us
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {location.benefits.slice(0, 6).map((benefit: any, index: number) => (
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

      {/* Local Use Cases */}
      {location.local_use_cases && location.local_use_cases.length > 0 && (
        <section className="py-16 px-8 lg:px-16">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
              Success Stories from {location.location.city}
            </h2>
            <div className="space-y-6">
              {location.local_use_cases.map((useCase: any, index: number) => (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900/50"
                >
                  <h3 className="text-xl font-bold text-primary mb-2">
                    {useCase.business_type}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    <strong>Challenge:</strong> {useCase.scenario}
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

      {/* Service Area */}
      {location.service_area && (
        <section className="py-16 px-8 lg:px-16 bg-gray-50 dark:bg-black/20">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-6">
              {location.service_area.heading}
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
              {location.service_area.description}
            </p>
            {location.service_area.areas_list && (
              <div className="flex flex-wrap justify-center gap-3">
                {location.service_area.areas_list.map((area: string, index: number) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm"
                  >
                    {area}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {location.faq && location.faq.length > 0 && (
        <section className="py-16 px-8 lg:px-16">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
              Common Questions from {location.location.city} Businesses
            </h2>
            <div className="space-y-4">
              {location.faq.slice(0, 8).map((item: any, index: number) => (
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
      <section className="py-16 px-8 lg:px-16 bg-gray-50 dark:bg-black/20">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white dark:bg-gray-900/50 rounded-lg p-12 border border-gray-200 dark:border-gray-800 shadow-xl">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">
              Ready to Grow Your {location.location.city} Business?
            </h2>
            <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-8">
              Contact us today for a free consultation and see how we can help automate your leads.
            </p>
            <LeadCaptureForm source={location.page_id} />
          </div>
        </div>
      </section>

      {/* Nearby Locations */}
      {location.location.nearby_areas && location.location.nearby_areas.length > 0 && (
        <section className="py-16 px-8 lg:px-16">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Also Serving Nearby Areas
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {location.location.nearby_areas.map((area: string, index: number) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-white/10 border border-white/20 text-gray-900 dark:text-white rounded-full"
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
