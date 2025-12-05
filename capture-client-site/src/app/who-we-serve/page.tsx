import { Metadata } from 'next';
import { INDUSTRIES, getCategories, Industry } from '@/data/industries';
import { IndustryCard } from '@/components/industries/IndustryCard';
import { Button } from '@/components/ui/Button';
import { generateWebPageSchema } from '@/lib/seo-config';
import JsonLd from '@/components/seo/JsonLd';
import { SITE_CONFIG } from '@/lib/seo-config';

export const metadata: Metadata = {
  title: 'Industries We Serve | AI Voice Agents for Every Business',
  description: 'Capture Client serves 12+ industries with AI voice agents, lead generation, and marketing automation. From legal to healthcare, real estate to restaurants - never miss a call again.',
  keywords: [
    'ai voice agents by industry',
    'virtual receptionist for law firms',
    'ai answering service healthcare',
    'automated booking home services',
    'real estate lead capture ai',
    'restaurant reservation ai',
    'property management ai',
    'insurance quote ai',
  ],
  openGraph: {
    title: 'Industries We Serve | AI Voice Agents for Every Business',
    description: '12+ industries trust Capture Client for 24/7 AI voice agents, lead capture, and appointment booking.',
    images: [
      {
        url: `${SITE_CONFIG.url}/og-image-industries.jpg`,
        width: 1200,
        height: 630,
        alt: 'Capture Client Industries',
      },
    ],
  },
};

export default function WhoWeServePage() {
  const categories = getCategories();

  // Generate schema
  const pageSchema = generateWebPageSchema({
    title: 'Industries We Serve - Capture Client',
    description: 'AI voice agents and lead generation for 12+ industries including legal, healthcare, home services, real estate, and more.',
    url: `${SITE_CONFIG.url}/who-we-serve`,
  });

  return (
    <>
      <JsonLd schema={pageSchema} />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-mesh-premium opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

          {/* Animated Orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-gold-500/20 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl animate-float-medium" />

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
                <span className="material-icons text-gold-400 text-sm">business_center</span>
                <span className="text-sm font-semibold text-foreground">12+ Industries Served</span>
              </div>

              {/* Headline */}
              <h1 className="font-heading text-5xl md:text-7xl font-bold text-foreground mb-6">
                Your Industry.{' '}
                <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
                  Our Expertise.
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl md:text-2xl text-foreground-muted mb-8 leading-relaxed">
                AI voice agents built for your industry's unique needs. From legal intake to emergency dispatch,
                healthcare scheduling to restaurant reservations - we speak your language.
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="primary"
                  size="lg"
                  href="/contact"
                  icon="arrow_forward"
                  ariaLabel="Book a free consultation"
                >
                  Book Free Consultation
                </Button>
                <Button
                  variant="glass"
                  size="lg"
                  href="/demo"
                  icon="play_circle"
                  ariaLabel="Watch industry demo"
                >
                  Watch Industry Demos
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Overview */}
        <section className="py-16 bg-gradient-to-b from-background to-background-darker">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="font-heading text-4xl font-bold text-foreground mb-4">
                Solutions for Every Sector
              </h2>
              <p className="text-lg text-foreground-muted">
                Whether you're managing a law firm, running a restaurant, or operating a home service business,
                our AI adapts to your industry's specific workflows and terminology.
              </p>
            </div>

            {/* Category Grid */}
            <div className="grid md:grid-cols-5 gap-6 max-w-5xl mx-auto mb-20">
              {categories.map((category, index) => {
                const categoryCount = INDUSTRIES.filter(i => i.category === category).length;
                const categoryIcon = {
                  'Professional Services': 'business_center',
                  'Home Services': 'home_repair_service',
                  'Real Estate & Property': 'real_estate_agent',
                  'Healthcare': 'medical_services',
                  'Hospitality': 'restaurant',
                }[category] || 'business';

                return (
                  <div
                    key={category}
                    className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-gold-500/30 transition-all duration-500 hover:shadow-glow-gold text-center"
                  >
                    <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-gold-500/20 to-gold-600/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="material-icons text-2xl text-gold-400">{categoryIcon}</span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-gold-400 transition-colors duration-300">
                      {category}
                    </h3>
                    <p className="text-sm text-foreground-muted">
                      {categoryCount} {categoryCount === 1 ? 'industry' : 'industries'}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Industries Grid */}
        <section className="py-20 bg-background-darker">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {INDUSTRIES.map((industry, index) => (
                <IndustryCard key={industry.id} industry={industry} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Why Industry-Specific Matters */}
        <section className="py-20 bg-gradient-to-b from-background-darker to-background">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Why Industry-Specific{' '}
                  <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
                    AI Matters
                  </span>
                </h2>
                <p className="text-xl text-foreground-muted">
                  Generic answering services can't handle your industry's unique terminology, compliance needs, and workflows.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-8 rounded-2xl bg-gradient-to-br from-white/[0.12] to-white/[0.03] backdrop-blur-2xl border border-white/20">
                  <span className="material-icons text-4xl text-gold-400 mb-4">language</span>
                  <h3 className="text-2xl font-bold text-foreground mb-3">Industry Vocabulary</h3>
                  <p className="text-foreground-muted leading-relaxed">
                    Legal conflict checking. HVAC diagnostics. Real estate MLS terms. Our AI speaks your industry's language naturally.
                  </p>
                </div>

                <div className="p-8 rounded-2xl bg-gradient-to-br from-white/[0.12] to-white/[0.03] backdrop-blur-2xl border border-white/20">
                  <span className="material-icons text-4xl text-accent-400 mb-4">verified_user</span>
                  <h3 className="text-2xl font-bold text-foreground mb-3">Compliance Ready</h3>
                  <p className="text-foreground-muted leading-relaxed">
                    HIPAA for healthcare. Attorney-client privilege for law. SOC-II across the board. Industry-specific security baked in.
                  </p>
                </div>

                <div className="p-8 rounded-2xl bg-gradient-to-br from-white/[0.12] to-white/[0.03] backdrop-blur-2xl border border-white/20">
                  <span className="material-icons text-4xl text-primary-400 mb-4">integration_instructions</span>
                  <h3 className="text-2xl font-bold text-foreground mb-3">Native Integrations</h3>
                  <p className="text-foreground-muted leading-relaxed">
                    Clio for legal. ServiceTitan for HVAC. Epic for healthcare. We integrate with the tools you already use.
                  </p>
                </div>

                <div className="p-8 rounded-2xl bg-gradient-to-br from-white/[0.12] to-white/[0.03] backdrop-blur-2xl border border-white/20">
                  <span className="material-icons text-4xl text-cyan-400 mb-4">psychology</span>
                  <h3 className="text-2xl font-bold text-foreground mb-3">Smart Workflows</h3>
                  <p className="text-foreground-muted leading-relaxed">
                    Emergency triage for home services. Lead qualification for real estate. Symptom assessment for healthcare. Industry-tuned logic.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-background relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 via-background to-accent-500/10" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-mesh-premium opacity-30" />

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
                Ready to See Your Industry in Action?
              </h2>
              <p className="text-xl text-foreground-muted mb-8">
                Book a personalized demo with industry-specific examples from businesses like yours.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="primary"
                  size="lg"
                  href="/contact"
                  icon="calendar_month"
                  ariaLabel="Schedule industry demo"
                >
                  Schedule Industry Demo
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
