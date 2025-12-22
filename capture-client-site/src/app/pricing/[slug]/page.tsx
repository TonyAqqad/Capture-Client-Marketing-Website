import { getAllPackages, getPackageBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import Link from "next/link";
import {
  Benefit,
  FAQItem,
  Testimonial,
  TrustSignal,
  ComparisonRow,
  PackageFeature,
} from "@/types/content";
import {
  Star,
  ArrowRight,
  CheckCircle2,
  BadgeCheck,
  X,
  ChevronDown,
  Gift
} from "lucide-react";

export async function generateStaticParams() {
  const packages = await getAllPackages();
  return packages.map((pkg) => ({
    slug: pkg.package.package_slug,
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
    openGraph: {
      title: pkg.seo.og_title || pkg.seo.page_title,
      description: pkg.seo.og_description || pkg.seo.meta_description,
      url: `https://captureclient.com/pricing/${resolvedParams.slug}`,
      siteName: "Capture Client",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pkg.seo.og_title || pkg.seo.page_title,
      description: pkg.seo.og_description || pkg.seo.meta_description,
    },
    alternates: {
      canonical: `https://captureclient.com/pricing/${resolvedParams.slug}`,
    },
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
    <div className="min-h-screen bg-white">
      {/* Premium Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/30 via-white to-blue-50/30">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          {/* Glow effects */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-6 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            {pkg.hero?.badge && (
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 backdrop-blur-sm">
                <Star className="w-4 h-4 text-cyan-600" />
                <span className="text-cyan-600 font-semibold text-sm tracking-wider">
                  {pkg.hero.badge}
                </span>
              </div>
            )}

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-cyan-600 to-blue-600 bg-clip-text text-transparent leading-tight px-4 sm:px-0">
              {pkg.hero?.headline || pkg.package.package_name}
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 mb-12 leading-relaxed max-w-3xl mx-auto px-4 sm:px-6 md:px-0">
              {pkg.hero?.subheadline || pkg.package.tagline}
            </p>

            {/* Price Display */}
            <div className="mb-12 px-4 sm:px-0">
              <div className="inline-block relative w-full max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur-xl opacity-30"></div>
                <div className="relative bg-white/80 border border-slate-200 rounded-2xl px-6 sm:px-8 md:px-12 py-6 sm:py-8">
                  <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2">
                    {pkg.package.price}
                  </div>
                  <div className="text-slate-600 text-base sm:text-lg">{pkg.package.period}</div>
                  {pkg.hero?.price_display?.note && (
                    <div className="text-slate-600 text-xs sm:text-sm mt-2">
                      {pkg.hero.price_display.note}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 px-4 sm:px-0 max-w-2xl mx-auto">
              {pkg.hero?.cta?.primary && (
                <Link
                  href={pkg.hero.cta.primary.action}
                  className="group relative px-6 sm:px-8 py-4 min-h-[56px] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full font-bold text-white text-base sm:text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-105 touch-manipulation w-full sm:w-auto"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {pkg.hero.cta.primary.text}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              )}
              {pkg.hero?.cta?.secondary && (
                <Link
                  href={pkg.hero.cta.secondary.action}
                  className="px-6 sm:px-8 py-4 min-h-[56px] bg-white border border-slate-200 rounded-full font-bold text-slate-900 text-base sm:text-lg hover:bg-slate-50 transition-all duration-300 backdrop-blur-sm touch-manipulation w-full sm:w-auto"
                >
                  {pkg.hero.cta.secondary.text}
                </Link>
              )}
            </div>

            {/* Trust Signals */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-6 text-sm sm:text-base text-slate-600 px-4 sm:px-0">
              <div className="flex items-center gap-3 py-1">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center gap-3 py-1">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-3 py-1">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span>No long-term contract</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perfect For Section */}
      {pkg.ideal_for && (
        <section className="py-20 px-6 bg-gradient-to-b from-white to-slate-50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-slate-900">
              {pkg.ideal_for.headline || "Perfect For:"}
            </h2>
            {pkg.ideal_for.description && (
              <p className="text-xl text-slate-600 text-center mb-12 max-w-3xl mx-auto">
                {pkg.ideal_for.description}
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {pkg.ideal_for.audience?.map((item: string, index: number) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 p-5 sm:p-6 hover:border-cyan-500/30 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative flex items-start gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-500/30">
                      <BadgeCheck className="w-5 h-5 text-cyan-600" />
                    </div>
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* What's Included Section */}
      {pkg.features_included && pkg.features_included.length > 0 && (
        <section className="py-20 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-white"></div>
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>

          <div className="relative container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
                What&apos;s Included
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Everything you need to capture, qualify, and convert more leads
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {pkg.features_included.map((feature: PackageFeature, index: number) => (
                <div
                  key={index}
                  className="group relative rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 p-6 sm:p-8 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 rounded-2xl transition-all duration-300"></div>

                  <div className="relative">
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-3">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-500/30">
                          <CheckCircle2 className="w-6 h-6 text-cyan-600" />
                        </div>
                        <h3 className="font-bold text-lg sm:text-xl text-slate-900">
                          {feature.name}
                        </h3>
                      </div>
                      {feature.value && (
                        <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 text-xs sm:text-sm font-semibold whitespace-nowrap self-start sm:self-auto">
                          {feature.value}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Not Included Section */}
      {pkg.features_not_included &&
        pkg.features_not_included.length > 0 &&
        pkg.features_not_included[0].name !== "Nothing" && (
          <section className="py-20 px-6 bg-slate-50">
            <div className="container mx-auto max-w-4xl">
              <h3 className="text-3xl font-bold text-center mb-12 text-slate-900">
                Available in Higher Tiers
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {pkg.features_not_included.map((feature: PackageFeature, index: number) => (
                  <div
                    key={index}
                    className="rounded-xl bg-white border border-slate-200 p-6"
                  >
                    <div className="flex items-start gap-4">
                      <X className="w-5 h-5 text-slate-600 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-slate-600 mb-1">{feature.name}</p>
                        {feature.available_in && (
                          <Link
                            href={`/pricing/${feature.available_in
                              .toLowerCase()
                              .replace(" ", "-")}`}
                            className="text-cyan-600 hover:text-cyan-700 text-sm font-semibold inline-flex items-center gap-1"
                          >
                            Available in {feature.available_in}
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        )}
                        {feature.note && (
                          <p className="text-slate-600 text-sm mt-1">{feature.note}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-center text-slate-600 mt-8">
                Upgrade anytime to access these features
              </p>
            </div>
          </section>
        )}

      {/* Value Proposition Section */}
      {pkg.value_proposition && pkg.value_proposition.benefits && (
        <section className="py-20 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white"></div>
          <div className="absolute top-1/3 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

          <div className="relative container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
                {pkg.value_proposition.heading}
              </h2>
              {pkg.value_proposition.content && (
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                  {pkg.value_proposition.content}
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {pkg.value_proposition.benefits.map((benefit: Benefit, index: number) => (
                <div
                  key={index}
                  className="group relative rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 p-8 hover:border-cyan-500/30 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 rounded-2xl transition-all duration-300"></div>

                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-500/30 mb-6">
                      <Star className="w-8 h-8 text-cyan-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">
                      {benefit.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-lg">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Comparison Table Section */}
      {pkg.comparison?.compare_table && pkg.comparison.compare_table.length > 0 && (
        <section className="py-20 px-6 bg-slate-50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-slate-900">
              Compare All Packages
            </h2>
            <p className="text-xl text-slate-600 text-center mb-12">
              See how this package stacks up against our other offerings
            </p>

            {/* Mobile: Stacked cards */}
            <div className="lg:hidden space-y-4">
              {pkg.comparison.compare_table.map((row: ComparisonRow, index: number) => (
                <div
                  key={index}
                  className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm"
                >
                  <div className="text-slate-900 font-semibold text-base mb-4 pb-3 border-b border-slate-200">
                    {row.feature}
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div className="text-center">
                      <div className="text-slate-500 text-xs mb-1">Starter</div>
                      <div className="text-slate-900 font-medium">{row.starter}</div>
                    </div>
                    <div className="text-center bg-cyan-50 rounded-lg py-2 px-1">
                      <div className="text-cyan-600 text-xs mb-1 font-semibold">Growth</div>
                      <div className="text-cyan-600 font-bold">{row.growth}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-slate-500 text-xs mb-1">Enterprise</div>
                      <div className="text-slate-900 font-medium">{row.enterprise}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: Table view */}
            <div className="hidden lg:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-slate-600 font-semibold text-sm sm:text-base">
                      Feature
                    </th>
                    <th className="text-center py-3 sm:py-4 px-3 sm:px-6 text-slate-600 font-semibold text-sm sm:text-base">
                      Starter
                    </th>
                    <th className="text-center py-3 sm:py-4 px-3 sm:px-6">
                      <div className="inline-block px-3 sm:px-4 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-600 font-semibold text-xs sm:text-sm">
                        Growth
                      </div>
                    </th>
                    <th className="text-center py-3 sm:py-4 px-3 sm:px-6 text-slate-600 font-semibold text-sm sm:text-base">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pkg.comparison.compare_table.map((row: ComparisonRow, index: number) => (
                    <tr
                      key={index}
                      className="border-b border-slate-200 hover:bg-white/50 transition-colors"
                    >
                      <td className="py-3 sm:py-4 px-3 sm:px-6 text-slate-900 font-medium text-sm sm:text-base">
                        {row.feature}
                      </td>
                      <td className="py-3 sm:py-4 px-3 sm:px-6 text-center text-slate-600 text-sm sm:text-base">
                        {row.starter}
                      </td>
                      <td className="py-3 sm:py-4 px-3 sm:px-6 text-center">
                        <span className="text-cyan-600 font-semibold text-sm sm:text-base">{row.growth}</span>
                      </td>
                      <td className="py-3 sm:py-4 px-3 sm:px-6 text-center text-slate-600 text-sm sm:text-base">
                        {row.enterprise}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-center mt-8">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 min-h-[48px] bg-white border border-slate-200 rounded-full text-slate-900 font-semibold hover:bg-slate-50 transition-all duration-300 backdrop-blur-sm touch-manipulation text-sm sm:text-base"
              >
                View Full Comparison
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {pkg.testimonials && pkg.testimonials.length > 0 && (
        <section className="py-20 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white"></div>

          <div className="relative container mx-auto max-w-6xl">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-slate-900">
              Success Stories
            </h2>
            <p className="text-xl text-slate-600 text-center mb-16">
              Real results from real businesses
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {pkg.testimonials.map((testimonial: Testimonial, index: number) => (
                <div
                  key={index}
                  className="relative rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 p-8 hover:border-cyan-500/30 transition-all duration-300"
                >
                  {/* Rating stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-blue-600 fill-blue-600" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-slate-600 text-lg leading-relaxed mb-6">
                    &quot;{testimonial.quote}&quot;
                  </blockquote>

                  {/* Author info */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">{testimonial.author}</div>
                      <div className="text-slate-600 text-sm">
                        {testimonial.business}
                      </div>
                      <div className="text-slate-600 text-sm">
                        {testimonial.location}
                      </div>
                    </div>
                    {testimonial.result && (
                      <div className="px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-600 font-semibold text-sm text-right">
                          {testimonial.result}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {pkg.faq && pkg.faq.length > 0 && (
        <section className="py-20 px-6 bg-slate-50">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600 text-center mb-12">
              Everything you need to know about this package
            </p>

            <div className="space-y-4">
              {pkg.faq.map((item: FAQItem, index: number) => (
                <details
                  key={index}
                  className="group rounded-xl bg-white border border-slate-200 overflow-hidden hover:border-cyan-500/30 transition-all duration-300"
                >
                  <summary className="flex items-center justify-between cursor-pointer p-6 text-slate-900 font-bold text-lg">
                    <span>{item.question}</span>
                    <ChevronDown className="w-5 h-5 text-cyan-600 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-200 pt-4">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trust Signals Grid */}
      {pkg.trust_signals && pkg.trust_signals.length > 0 && (
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {pkg.trust_signals.map((signal: TrustSignal, index: number) => (
                <div
                  key={index}
                  className="text-center p-5 sm:p-6 rounded-xl bg-white border border-slate-200"
                >
                  <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <BadgeCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2 text-base sm:text-lg">{signal.title}</h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{signal.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/30 via-white to-blue-50/30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto max-w-5xl">
          <div className="rounded-3xl bg-gradient-to-br from-white/80 to-slate-50/80 border border-slate-200 p-12 backdrop-blur-sm">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
                {pkg.cta_footer?.headline || `Ready to Get Started with ${pkg.package.package_name}?`}
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                {pkg.cta_footer?.subheadline || "Contact us today to activate your package and start automating your leads."}
              </p>
            </div>

            {/* CTA Buttons */}
            {pkg.cta_footer && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                {pkg.cta_footer.primary_cta && (
                  <Link
                    href={pkg.cta_footer.primary_cta.action}
                    className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full font-bold text-white text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-105"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {pkg.cta_footer.primary_cta.text}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                )}
                {pkg.cta_footer.secondary_cta && (
                  <Link
                    href={pkg.cta_footer.secondary_cta.action}
                    className="px-8 py-4 bg-white border border-slate-200 rounded-full font-bold text-slate-900 text-lg hover:bg-slate-50 transition-all duration-300 backdrop-blur-sm"
                  >
                    {pkg.cta_footer.secondary_cta.text}
                  </Link>
                )}
              </div>
            )}

            {/* Guarantee */}
            {pkg.cta_footer?.guarantee && (
              <p className="text-center text-slate-600 mb-4">{pkg.cta_footer.guarantee}</p>
            )}

            {/* Bonus */}
            {pkg.cta_footer?.bonus && (
              <div className="inline-flex items-center gap-2 px-6 py-3 mx-auto rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                <Gift className="w-5 h-5 text-blue-600" />
                <span className="text-blue-600 font-semibold">{pkg.cta_footer.bonus}</span>
              </div>
            )}

            {/* Lead Form */}
            <div className="mt-12">
              <LeadCaptureForm source={pkg.package.package_slug} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
