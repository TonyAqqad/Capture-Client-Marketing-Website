import { getAllPackages, getPackageBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import Link from "next/link";

export async function generateStaticParams() {
  const packages = await getAllPackages();
  return packages.map((pkg) => ({
    slug: pkg.package.package_slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const pkg = await getPackageBySlug(resolvedParams.slug);

  if (!pkg) {
    return {
      title: "Package Not Found",
    };
  }

  return {
    title: pkg.seo.page_title,
    description: pkg.seo.meta_description,
    keywords: pkg.seo.keywords,
  };
}

export default async function PackagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const pkg = await getPackageBySlug(resolvedParams.slug);

  if (!pkg) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Hero Section */}
      <div className="relative py-24 px-8 lg:px-16 bg-gradient-to-br from-background-dark via-background-dark to-primary/10">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            {pkg.hero?.headline || pkg.package.package_name}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            {pkg.hero?.subheadline || pkg.package.tagline}
          </p>
          <div className="inline-block">
            <div className="text-6xl font-bold text-primary mb-2">
              {pkg.package.price}
            </div>
            <div className="text-gray-400">per {pkg.package.period}</div>
          </div>
        </div>
      </div>

      {/* Ideal For Section */}
      {pkg.ideal_for && (
        <section className="py-16 px-8 lg:px-16 bg-gray-50 dark:bg-black/20">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {pkg.ideal_for.heading || "Perfect For:"}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              {pkg.ideal_for.description}
            </p>
            {pkg.ideal_for.business_types && (
              <div className="flex flex-wrap justify-center gap-3">
                {pkg.ideal_for.business_types.map((type: string, index: number) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary"
                  >
                    {type}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Features Included */}
      {pkg.features_included && (
        <section className="py-16 px-8 lg:px-16">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
              {pkg.features_included.heading || "What's Included"}
            </h2>
            <div className="space-y-4">
              {pkg.features_included.features &&
                pkg.features_included.features.map((feature: any, index: number) => (
                  <div
                    key={index}
                    className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900/50 flex items-start gap-4"
                  >
                    <span className="material-icons text-primary text-3xl flex-shrink-0">
                      check_circle
                    </span>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                        {feature.feature || feature}
                      </h3>
                      {feature.description && (
                        <p className="text-gray-600 dark:text-gray-400">
                          {feature.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Not Included */}
      {pkg.features_not_included && pkg.features_not_included.features && pkg.features_not_included.features.length > 0 && (
        <section className="py-16 px-8 lg:px-16 bg-gray-50 dark:bg-black/20">
          <div className="container mx-auto max-w-4xl">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">
              {pkg.features_not_included.heading || "Not Included"}
            </h3>
            <div className="space-y-2">
              {pkg.features_not_included.features.map((feature: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-gray-600 dark:text-gray-400"
                >
                  <span className="material-icons text-gray-400">cancel</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-500 mt-4">
              Consider upgrading to access these features
            </p>
          </div>
        </section>
      )}

      {/* Value Proposition */}
      {pkg.value_proposition && (
        <section className="py-16 px-8 lg:px-16">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-6">
              {pkg.value_proposition.heading}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-8">
              {pkg.value_proposition.content}
            </p>
            {pkg.value_proposition.benefits && (
              <div className="grid md:grid-cols-2 gap-6">
                {pkg.value_proposition.benefits.map((benefit: any, index: number) => (
                  <div
                    key={index}
                    className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900/50"
                  >
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Package Comparison */}
      {pkg.comparison && (
        <section className="py-16 px-8 lg:px-16 bg-gray-50 dark:bg-black/20">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
              {pkg.comparison.heading || "Compare Packages"}
            </h2>
            <div className="text-center">
              <Link
                href="/pricing"
                className="inline-block bg-white/10 border border-white/20 text-white px-8 py-4 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
              >
                View All Packages
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {pkg.faq && pkg.faq.length > 0 && (
        <section className="py-16 px-8 lg:px-16">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
              Common Questions
            </h2>
            <div className="space-y-4">
              {pkg.faq.map((item: any, index: number) => (
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

      {/* CTA Section */}
      <section className="py-16 px-8 lg:px-16 bg-gray-50 dark:bg-black/20">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white dark:bg-gray-900/50 rounded-lg p-12 border border-gray-200 dark:border-gray-800 shadow-xl">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">
              Ready to Get Started with {pkg.package.package_name}?
            </h2>
            <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-8">
              Contact us today to activate your package and start automating your leads.
            </p>
            <LeadCaptureForm source={pkg.package.package_slug} />
          </div>
        </div>
      </section>
    </div>
  );
}
