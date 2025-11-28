import Link from "next/link";
import { getAllPackages } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing & Packages | Voice AI & Marketing Services | Capture Client",
  description: "Transparent pricing for Voice AI, Google Ads, and Facebook Ads services. From starter to enterprise packages, find the perfect fit for your business.",
};

export default async function PricingPage() {
  const packages = await getAllPackages();

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="relative py-24 px-8 lg:px-16 bg-gradient-to-br from-background-dark via-background-dark to-primary/10">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Transparent Pricing
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose the package that fits your business. No hidden fees. Cancel anytime.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-8 lg:px-16 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <div
              key={pkg.package.package_id}
              className={`border rounded-lg p-8 bg-white dark:bg-gray-900/50 ${
                index === 1
                  ? "border-primary shadow-2xl shadow-primary/20 transform scale-105"
                  : "border-gray-200 dark:border-gray-800"
              }`}
            >
              {index === 1 && (
                <div className="bg-primary text-black text-sm font-bold uppercase tracking-wider px-4 py-1 rounded-full inline-block mb-4">
                  Most Popular
                </div>
              )}
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {pkg.package.package_name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {pkg.package.tagline}
              </p>
              <div className="mb-6">
                <span className="text-5xl font-bold text-primary">
                  {pkg.package.price}
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  /{pkg.package.period}
                </span>
              </div>

              {pkg.ideal_for && (
                <div className="mb-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {pkg.ideal_for.description}
                  </p>
                </div>
              )}

              <Link
                href={`/pricing/${pkg.package.package_slug}`}
                className={`block text-center px-6 py-3 rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105 mb-6 ${
                  index === 1
                    ? "bg-primary text-black glowing-button"
                    : "bg-white/10 border border-white/20 text-white hover:bg-white/20"
                }`}
              >
                View Details
              </Link>

              {pkg.features_included && pkg.features_included.features && (
                <div>
                  <p className="font-bold text-gray-900 dark:text-white mb-3">
                    What's Included:
                  </p>
                  <ul className="space-y-2">
                    {pkg.features_included.features.slice(0, 6).map((feature: any, i: number) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                      >
                        <span className="material-icons text-primary text-lg flex-shrink-0">
                          check_circle
                        </span>
                        <span>{feature.feature || feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-white dark:bg-gray-900/50 rounded-lg p-12 border border-gray-200 dark:border-gray-800 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Have specific requirements? We can create a custom package tailored to your business needs and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:865-346-3339"
              className="inline-block bg-primary text-black px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105 glowing-button"
            >
              Call Us: (865) 346-3339
            </a>
            <Link
              href="/contact"
              className="inline-block bg-white/10 border border-white/20 text-white px-8 py-4 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Common Questions
          </h2>
          <div className="space-y-4">
            <details className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900/50">
              <summary className="font-bold text-gray-900 dark:text-white cursor-pointer">
                Can I switch packages later?
              </summary>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Yes! You can upgrade or downgrade your package at any time. Changes take effect at the start of your next billing cycle.
              </p>
            </details>

            <details className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900/50">
              <summary className="font-bold text-gray-900 dark:text-white cursor-pointer">
                Are there any setup fees?
              </summary>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                No setup fees. The price you see is what you pay each month.
              </p>
            </details>

            <details className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900/50">
              <summary className="font-bold text-gray-900 dark:text-white cursor-pointer">
                Do you offer month-to-month billing?
              </summary>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Yes, all our packages are month-to-month with no long-term contracts. Cancel anytime with 30 days' notice.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
