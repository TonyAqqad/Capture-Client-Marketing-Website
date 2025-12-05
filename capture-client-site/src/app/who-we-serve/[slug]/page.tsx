import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { INDUSTRIES, getIndustryBySlug, Industry } from '@/data/industries';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { generateWebPageSchema, SITE_CONFIG } from '@/lib/seo-config';
import JsonLd from '@/components/seo/JsonLd';

interface IndustryPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all industries
export async function generateStaticParams() {
  return INDUSTRIES.map((industry) => ({
    slug: industry.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const industry = getIndustryBySlug(params.slug);

  if (!industry) {
    return {
      title: 'Industry Not Found',
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
      '24/7 call answering',
      'lead capture automation',
      'appointment scheduling ai',
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
  };
}

export default function IndustryPage({ params }: IndustryPageProps) {
  const industry = getIndustryBySlug(params.slug);

  if (!industry) {
    notFound();
  }

  // Generate schema
  const pageSchema = generateWebPageSchema({
    title: `${industry.name} - Capture Client`,
    description: industry.description,
    url: `${SITE_CONFIG.url}/who-we-serve/${industry.slug}`,
  });

  // Service schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_CONFIG.url}/who-we-serve/${industry.slug}#service`,
    name: `AI Voice Agent for ${industry.name}`,
    description: industry.description,
    provider: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      '@id': `${SITE_CONFIG.url}/#organization`,
    },
    serviceType: `${industry.name} Answering Service`,
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${industry.name} Solutions`,
      itemListElement: industry.solutions.map((solution, index) => ({
        '@type': 'Offer',
        name: solution.title,
        description: solution.description,
        position: index + 1,
      })),
    },
  };

  return (
    <>
      <JsonLd schema={[pageSchema, serviceSchema]} />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <Image
              src={industry.heroImage}
              alt={`${industry.name} AI Voice Agent`}
              fill
              className="object-cover opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />
          </div>

          {/* Mesh Background */}
          <div className="absolute inset-0 bg-mesh-premium opacity-30" />

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-foreground-muted mb-8" aria-label="Breadcrumb">
                <a href="/who-we-serve" className="hover:text-gold-400 transition-colors">
                  Industries
                </a>
                <span className="material-icons text-xs">chevron_right</span>
                <span className="text-foreground">{industry.name}</span>
              </nav>

              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                <span className="text-sm font-semibold text-gold-400">{industry.category}</span>
              </div>

              {/* Headline */}
              <h1 className="font-heading text-5xl md:text-7xl font-bold text-foreground mb-6">
                {industry.name}
              </h1>

              {/* Tagline */}
              <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent mb-6">
                {industry.tagline}
              </p>

              {/* Description */}
              <p className="text-xl text-foreground-muted mb-8 leading-relaxed">
                {industry.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  href="/contact"
                  icon="arrow_forward"
                  ariaLabel={industry.ctaText}
                >
                  {industry.ctaText}
                </Button>
                <Button
                  variant="glass"
                  size="lg"
                  href="/demo"
                  icon="play_circle"
                  ariaLabel="Watch demo"
                >
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        {industry.stats && industry.stats.length > 0 && (
          <section className="py-16 bg-gradient-to-b from-background to-background-darker">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                {industry.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-foreground-muted">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Pain Points Section */}
        <section className="py-20 bg-background-darker">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Challenges Facing{' '}
                  <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
                    {industry.name}
                  </span>
                </h2>
                <p className="text-xl text-foreground-muted">
                  We understand the unique pain points of your industry.
                </p>
              </div>

              <div className="space-y-4">
                {industry.painPoints.map((pain, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-gold-500/30 transition-all duration-300"
                  >
                    <span className="material-icons text-gold-400 text-2xl flex-shrink-0 mt-1">
                      error_outline
                    </span>
                    <p className="text-foreground-muted leading-relaxed text-lg">
                      {pain}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section className="py-20 bg-gradient-to-b from-background-darker to-background">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
                  How We{' '}
                  <span className="bg-gradient-to-r from-accent-400 to-accent-600 bg-clip-text text-transparent">
                    Solve It
                  </span>
                </h2>
                <p className="text-xl text-foreground-muted">
                  Industry-specific AI solutions that understand your business inside and out.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {industry.solutions.map((solution, index) => (
                  <GlassCard key={index} variant="premium" hover={true}>
                    <div className="p-8">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-500/20 to-accent-600/10 flex items-center justify-center mb-6">
                        <span className="material-icons text-4xl text-accent-400">
                          {solution.icon}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-foreground mb-4">
                        {solution.title}
                      </h3>

                      <p className="text-foreground-muted leading-relaxed text-lg">
                        {solution.description}
                      </p>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Industry-Specific Features
                </h2>
                <p className="text-xl text-foreground-muted">
                  Everything you need to automate customer interactions in {industry.name.toLowerCase()}.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {industry.keyFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <span className="material-icons text-gold-400">check_circle</span>
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ROI Calculator Section */}
        {industry.roiCalculation && (
          <section className="py-20 bg-gradient-to-b from-background to-background-darker">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
                    The ROI is{' '}
                    <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
                      Undeniable
                    </span>
                  </h2>
                  <p className="text-xl text-foreground-muted">
                    See how much you could save by switching to AI.
                  </p>
                </div>

                <GlassCard variant="premium">
                  <div className="p-8">
                    {/* Comparison */}
                    <div className="grid md:grid-cols-3 gap-8 mb-8">
                      <div className="text-center">
                        <div className="text-sm text-foreground-muted mb-2">Traditional Cost</div>
                        <div className="text-4xl font-bold text-foreground-muted line-through">
                          {industry.roiCalculation.traditionalCost}
                        </div>
                      </div>

                      <div className="flex items-center justify-center">
                        <span className="material-icons text-4xl text-gold-400">arrow_forward</span>
                      </div>

                      <div className="text-center">
                        <div className="text-sm text-gold-400 mb-2">With Capture Client</div>
                        <div className="text-4xl font-bold text-gold-400">
                          {industry.roiCalculation.aiSolution}
                        </div>
                      </div>
                    </div>

                    {/* Savings */}
                    <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-gold-500/20 to-gold-600/10 border border-gold-500/30 mb-8">
                      <div className="text-sm text-gold-400 mb-2">Your Annual Savings</div>
                      <div className="text-5xl font-bold text-gold-400">
                        {industry.roiCalculation.annualSavings}
                      </div>
                    </div>

                    {/* Breakdown */}
                    <div className="space-y-4">
                      {industry.roiCalculation.breakdownItems.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                          <span className="text-foreground">{item.item}</span>
                          <div className="flex items-center gap-4">
                            <span className="text-foreground-muted line-through">{item.traditional}</span>
                            <span className="material-icons text-xs text-gold-400">arrow_forward</span>
                            <span className="text-gold-400 font-bold">{item.ai}</span>
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
          <section className="py-20 bg-background-darker">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto">
                <GlassCard variant="premium">
                  <div className="p-8 md:p-12">
                    <div className="flex items-start gap-6">
                      {industry.testimonial.avatar && (
                        <Image
                          src={industry.testimonial.avatar}
                          alt={industry.testimonial.author}
                          width={80}
                          height={80}
                          className="rounded-full"
                        />
                      )}

                      <div className="flex-1">
                        <span className="material-icons text-5xl text-gold-400 mb-4">format_quote</span>

                        <p className="text-xl md:text-2xl text-foreground leading-relaxed mb-6 italic">
                          "{industry.testimonial.quote}"
                        </p>

                        <div className="border-t border-white/10 pt-6">
                          <div className="font-bold text-foreground text-lg">
                            {industry.testimonial.author}
                          </div>
                          <div className="text-gold-400">
                            {industry.testimonial.company}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          </section>
        )}

        {/* Related Integrations */}
        {industry.relatedIntegrations && industry.relatedIntegrations.length > 0 && (
          <section className="py-20 bg-background">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Works With Your Existing Tools
                </h2>
                <p className="text-lg text-foreground-muted mb-12">
                  Seamless integrations with the platforms you already use.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  {industry.relatedIntegrations.map((integration, index) => (
                    <div
                      key={index}
                      className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-foreground font-semibold hover:border-accent-500/50 hover:bg-white/15 transition-all duration-300"
                    >
                      {integration.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-br from-background-darker via-background to-background-darker relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-mesh-premium opacity-40" />
          <div className="absolute top-10 left-10 w-72 h-72 bg-gold-500/20 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl animate-float-medium" />

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
                Ready to Transform Your {industry.name} Business?
              </h2>
              <p className="text-xl text-foreground-muted mb-8">
                Join hundreds of {industry.category.toLowerCase()} businesses that never miss a call.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="primary"
                  size="lg"
                  href="/contact"
                  icon="calendar_month"
                  ariaLabel={industry.ctaText}
                >
                  {industry.ctaText}
                </Button>
                <Button
                  variant="glass"
                  size="lg"
                  href="/pricing"
                  icon="attach_money"
                  ariaLabel="View pricing"
                >
                  View Pricing
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
