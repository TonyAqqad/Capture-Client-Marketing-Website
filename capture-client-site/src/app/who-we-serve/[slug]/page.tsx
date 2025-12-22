import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  ArrowRight,
  PlayCircle,
  Calendar,
  DollarSign,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  Quote,
} from "lucide-react";
import { INDUSTRIES, getIndustryBySlug } from "@/data/industries";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { generateWebPageSchema, SITE_CONFIG } from "@/lib/seo-config";
import JsonLd from "@/components/seo/JsonLd";
import { IndustryIntegrations } from "@/components/industries/IndustryIntegrations";
import IndustryCaseStudies from "@/components/industries/IndustryCaseStudies";
import { IndustryTrustBadges } from "@/components/industries/IndustryTrustBadges";
import { IndustryFAQ } from "@/components/industries/IndustryFAQ";
import { getIndustryFAQs } from "@/data/industryFAQs";
import { IndustrySolutions } from "./IndustrySolutions";

interface IndustryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all industries
export async function generateStaticParams() {
  return INDUSTRIES.map((industry) => ({
    slug: industry.slug,
  }));
}

// Return true 404 for unknown slugs (prevents soft 404s)
export const dynamicParams = false;

// Generate metadata for SEO
export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    return {
      title: "Industry Not Found",
    };
  }

  const title = `${industry.name} AI Voice Agent | ${industry.tagline}`;
  const description = `${industry.description} Trusted by ${industry.category.toLowerCase()} businesses for 24/7 lead capture, appointment booking, and customer service automation.`;

  return {
    title,
    description,
    keywords: [
      `${industry.name.toLowerCase()} ai receptionist`,
      `${industry.name.toLowerCase()} virtual receptionist`,
      `${industry.name.toLowerCase()} answering service`,
      `${industry.name.toLowerCase()} call automation`,
      `ai for ${industry.name.toLowerCase()}`,
      "24/7 call answering",
      "lead capture automation",
      "appointment scheduling ai",
    ],
    openGraph: {
      title,
      description,
      images: [
        {
          url: industry.heroImage,
          width: 1200,
          height: 630,
          alt: `${industry.name} AI Voice Agent`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [industry.heroImage],
    },
    alternates: {
      canonical: `https://captureclient.com/who-we-serve/${slug}`,
    },
  };
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    notFound();
  }

  // Generate schema
  const pageSchema = generateWebPageSchema({
    title: `${industry.name} - Capture Client`,
    description: industry.description,
    url: `${SITE_CONFIG.url}/who-we-serve/${industry.slug}`,
  });

  // Get FAQs for this industry
  const faqs = getIndustryFAQs(industry.slug);

  // Service schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_CONFIG.url}/who-we-serve/${industry.slug}#service`,
    name: `AI Voice Agent for ${industry.name}`,
    description: industry.description,
    provider: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      "@id": `${SITE_CONFIG.url}/#organization`,
    },
    serviceType: `${industry.name} Answering Service`,
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${industry.name} Solutions`,
      itemListElement: industry.solutions.map((solution, index) => ({
        "@type": "Offer",
        name: solution.title,
        description: solution.description,
        position: index + 1,
      })),
    },
  };

  // FAQPage schema
  const faqSchema =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${SITE_CONFIG.url}/who-we-serve/${industry.slug}#faq`,
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  // BreadcrumbList schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://captureclient.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Industries",
        item: "https://captureclient.com/who-we-serve",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: industry.name,
        item: `https://captureclient.com/who-we-serve/${slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd
        schema={
          faqSchema
            ? [pageSchema, serviceSchema, faqSchema, breadcrumbSchema]
            : [pageSchema, serviceSchema, breadcrumbSchema]
        }
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-16 md:pb-24 overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <Image
              src={industry.heroImage}
              alt={`${industry.name} AI Voice Agent`}
              fill
              className="object-cover opacity-20"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/90 to-white" />
          </div>

          {/* Mesh Background - Reduced on mobile for performance */}
          <div className="absolute inset-0 bg-mesh-premium opacity-20 md:opacity-30" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumb */}
              <nav
                className="flex items-center gap-2 text-sm text-slate-600 mb-8"
                aria-label="Breadcrumb"
              >
                <a href="/who-we-serve" className="hover:text-blue-500 transition-colors">
                  Industries
                </a>
                <ChevronRight className="w-3 h-3" />
                <span className="text-slate-900">{industry.name}</span>
              </nav>

              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white backdrop-blur-sm border border-slate-200 mb-6">
                <span className="text-sm font-semibold text-blue-500">{industry.category}</span>
              </div>

              {/* Headline */}
              <h1 className="font-heading text-5xl md:text-7xl font-bold text-slate-900 mb-6">
                {industry.name}
              </h1>

              {/* Tagline */}
              <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent mb-6">
                {industry.tagline}
              </p>

              {/* Description */}
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">{industry.description}</p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="primary" size="lg" href="/contact" ariaLabel={industry.ctaText}>
                  <span className="flex items-center gap-2">
                    {industry.ctaText}
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </Button>
                <Button variant="glass" size="lg" href="/demo" ariaLabel="Watch demo">
                  <span className="flex items-center gap-2">
                    Watch Demo
                    <PlayCircle className="w-5 h-5" />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        {industry.stats && industry.stats.length > 0 && (
          <section className="py-12 md:py-16 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                {industry.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Trust Badges Section */}
        {industry.trustBadges && industry.trustBadges.length > 0 && (
          <IndustryTrustBadges
            badges={industry.trustBadges}
            clientCount={industry.clientCount}
            industryName={industry.name}
          />
        )}

        {/* Pain Points Section */}
        <section className="py-16 md:py-20 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                  Challenges Facing{" "}
                  <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                    {industry.name}
                  </span>
                </h2>
                <p className="text-xl text-slate-600">
                  We understand the unique pain points of your industry.
                </p>
              </div>

              <div className="space-y-4">
                {industry.painPoints.map((pain, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-6 rounded-2xl bg-white backdrop-blur-xl border border-slate-200 hover:border-blue-500/30 transition-all duration-300"
                  >
                    <AlertCircle className="text-blue-500 w-6 h-6 flex-shrink-0 mt-1" />
                    <p className="text-slate-600 leading-relaxed text-lg">{pain}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <IndustrySolutions solutions={industry.solutions} industryName={industry.name} />

        {/* Key Features Section */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                  Industry-Specific Features
                </h2>
                <p className="text-xl text-slate-600">
                  Everything you need to automate customer interactions in{" "}
                  {industry.name.toLowerCase()}.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {industry.keyFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 backdrop-blur-sm border border-slate-200 hover:bg-white transition-all duration-300"
                  >
                    <CheckCircle className="text-blue-500 w-4 h-4" />
                    <span className="text-slate-900">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ROI Calculator Section */}
        {industry.roiCalculation && (
          <section className="py-16 md:py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                    The ROI is{" "}
                    <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                      Undeniable
                    </span>
                  </h2>
                  <p className="text-xl text-slate-600">
                    See how much you could save by switching to AI.
                  </p>
                </div>

                <GlassCard variant="premium">
                  <div className="p-8">
                    {/* Comparison */}
                    <div className="grid md:grid-cols-3 gap-8 mb-8">
                      <div className="text-center">
                        <div className="text-sm text-slate-600 mb-2">Traditional Cost</div>
                        <div className="text-4xl font-bold text-slate-600 line-through">
                          {industry.roiCalculation.traditionalCost}
                        </div>
                      </div>

                      <div className="flex items-center justify-center">
                        <ArrowRight className="text-blue-500 w-9 h-9" />
                      </div>

                      <div className="text-center">
                        <div className="text-sm text-blue-500 mb-2">With Capture Client</div>
                        <div className="text-4xl font-bold text-blue-500">
                          {industry.roiCalculation.aiSolution}
                        </div>
                      </div>
                    </div>

                    {/* Savings */}
                    <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-blue-500/20 to-blue-600/10 border border-blue-500/30 mb-8">
                      <div className="text-sm text-blue-500 mb-2">Your Annual Savings</div>
                      <div className="text-5xl font-bold text-blue-500">
                        {industry.roiCalculation.annualSavings}
                      </div>
                    </div>

                    {/* Breakdown */}
                    <div className="space-y-4">
                      {industry.roiCalculation.breakdownItems.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 rounded-xl bg-slate-50"
                        >
                          <span className="text-slate-900">{item.item}</span>
                          <div className="flex items-center gap-4">
                            <span className="text-slate-600 line-through">{item.traditional}</span>
                            <ArrowRight className="text-blue-500 w-3 h-3" />
                            <span className="text-blue-500 font-bold">{item.ai}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          </section>
        )}

        {/* Testimonial Section */}
        {industry.testimonial && (
          <section className="py-16 md:py-20 bg-slate-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
              <div className="max-w-4xl mx-auto">
                <GlassCard variant="premium">
                  <div className="p-8 md:p-12">
                    <div className="flex flex-col sm:flex-row items-start gap-6">
                      {industry.testimonial.avatar && (
                        <Image
                          src={industry.testimonial.avatar}
                          alt={industry.testimonial.author}
                          width={80}
                          height={80}
                          className="rounded-full flex-shrink-0"
                          sizes="80px"
                        />
                      )}

                      <div className="flex-1">
                        <Quote className="text-blue-500 w-12 h-12 mb-4" />

                        <p className="text-xl md:text-2xl text-slate-900 leading-relaxed mb-6 italic">
                          "{industry.testimonial.quote}"
                        </p>

                        <div className="border-t border-slate-200 pt-6">
                          <div className="font-bold text-slate-900 text-lg">
                            {industry.testimonial.author}
                          </div>
                          <div className="text-blue-500">{industry.testimonial.company}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          </section>
        )}

        {/* Case Studies Section */}
        {industry.relatedCaseStudies && industry.relatedCaseStudies.length > 0 && (
          <IndustryCaseStudies
            caseStudyIds={industry.relatedCaseStudies}
            industryName={industry.name}
            industryTheme="accent"
          />
        )}

        {/* Related Integrations */}
        {industry.relatedIntegrations && industry.relatedIntegrations.length > 0 && (
          <IndustryIntegrations industry={industry} maxDisplay={6} />
        )}

        {/* FAQ Section */}
        {faqs.length > 0 && (
          <IndustryFAQ faqs={faqs} industryName={industry.name} categoryColor="accent" />
        )}

        {/* Final CTA */}
        <section className="py-16 md:py-20 bg-white relative overflow-hidden">
          {/* Background - Performance optimized for mobile */}
          <div className="absolute inset-0 bg-mesh-premium opacity-20 md:opacity-40" />
          <div className="hidden md:block absolute top-10 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-float-slow" />
          <div className="hidden md:block absolute bottom-10 right-10 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl animate-float-medium" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Ready to Transform Your {industry.name} Business?
              </h2>
              <p className="text-xl text-slate-600 mb-8">
                Join hundreds of {industry.category.toLowerCase()} businesses that never miss a
                call.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" size="lg" href="/contact" ariaLabel={industry.ctaText}>
                  <span className="flex items-center gap-2">
                    {industry.ctaText}
                    <Calendar className="w-5 h-5" />
                  </span>
                </Button>
                <Button variant="glass" size="lg" href="/pricing" ariaLabel="View pricing">
                  <span className="flex items-center gap-2">
                    View Pricing
                    <DollarSign className="w-5 h-5" />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
