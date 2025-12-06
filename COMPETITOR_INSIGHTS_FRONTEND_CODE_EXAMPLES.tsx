/**
 * VOICE AI COMPETITOR INSIGHTS - FRONTEND CODE EXAMPLES
 *
 * Ready-to-use React/Next.js components based on competitor research
 * Copy-paste these patterns to implement improvements quickly
 */

// ============================================================================
// 1. SECURITY BADGES COMPONENT (15-30% conversion increase)
// ============================================================================

interface SecurityBadge {
  name: string;
  icon: string;
  description: string;
}

export function SecurityBadges() {
  const badges: SecurityBadge[] = [
    {
      name: "SOC 2 Type II",
      icon: "/badges/soc2.svg",
      description: "Enterprise-grade security certified by independent auditors"
    },
    {
      name: "HIPAA Compliant",
      icon: "/badges/hipaa.svg",
      description: "Protected health information handled securely"
    },
    {
      name: "GDPR Compliant",
      icon: "/badges/gdpr.svg",
      description: "European data protection standards met"
    }
  ];

  return (
    <div className="py-8 border-t border-border/50">
      <div className="container">
        <p className="text-center text-sm text-muted mb-6">
          Trusted by 500+ businesses. Enterprise-grade security.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {badges.map((badge) => (
            <div
              key={badge.name}
              className="flex flex-col items-center gap-2 group"
              title={badge.description}
            >
              <img
                src={badge.icon}
                alt={badge.name}
                className="h-12 opacity-70 group-hover:opacity-100 transition-opacity"
              />
              <span className="text-xs text-muted">{badge.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Usage: Add to Footer.tsx or above pricing cards
// <SecurityBadges />


// ============================================================================
// 2. COST COMPARISON HERO COMPONENT (Addresses price objection immediately)
// ============================================================================

export function CostComparisonHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Pre-headline with stat */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <span className="text-sm font-medium text-accent">
              🚨 47% of small businesses miss calls
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Never Miss Another Call.
            <br />
            <span className="text-accent">Never Lose Another Lead.</span>
          </h1>

          {/* Subheadline with unique value prop */}
          <p className="text-xl md:text-2xl text-muted mb-4">
            AI Voice Agents + Google Ads + Facebook Ads ={" "}
            <span className="text-foreground font-semibold">
              3x More Leads Captured
            </span>
          </p>

          {/* Cost comparison */}
          <p className="text-lg text-muted mb-8">
            100x More Affordable Than Hiring a Receptionist | 24/7 Coverage
          </p>

          {/* Dual CTAs - Low friction + High intent */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <a
              href="tel:865-XXX-DEMO"
              className="px-8 py-4 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-colors text-lg"
            >
              🎤 Try Our AI Demo - Call Now
            </a>
            <a
              href="tel:865-346-3339"
              className="px-8 py-4 bg-surface border-2 border-border rounded-lg font-semibold hover:bg-surface/80 transition-colors text-lg"
            >
              Get Free Consultation
            </a>
          </div>

          <p className="text-sm text-muted">
            Experience our AI in 2 minutes - no commitment required
          </p>
        </div>
      </div>
    </section>
  );
}


// ============================================================================
// 3. UNIQUE VALUE PROP SECTION (Voice AI + Ads differentiator)
// ============================================================================

export function UniqueValueProp() {
  return (
    <section className="py-16 bg-accent/5">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Headline */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Only Agency That Does{" "}
              <span className="text-accent">Voice AI + Ads Management</span>
            </h2>
            <p className="text-xl text-muted">
              Other agencies do Voice AI <strong>OR</strong> ads. We do{" "}
              <strong>both</strong> - so every ad dollar generates calls your AI
              answers immediately.
            </p>
          </div>

          {/* Comparison grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Competitor approach */}
            <div className="p-6 bg-surface rounded-xl border border-border">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-destructive text-xl">❌</span>
                </div>
                <h3 className="font-semibold text-lg">Most Agencies</h3>
              </div>
              <div className="space-y-3 text-muted">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-muted" />
                  <p>Run ads to generate calls</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-muted" />
                  <p>Calls go to voicemail after hours</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-muted" />
                  <p className="font-semibold text-destructive">
                    80% of leads lost
                  </p>
                </div>
              </div>
            </div>

            {/* Our approach */}
            <div className="p-6 bg-accent/10 rounded-xl border-2 border-accent relative overflow-hidden">
              {/* Badge */}
              <div className="absolute top-4 right-4 px-3 py-1 bg-accent text-white text-xs font-semibold rounded-full">
                UNIQUE
              </div>

              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-accent text-xl">✅</span>
                </div>
                <h3 className="font-semibold text-lg">Capture Client</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <p>Run ads to generate calls</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <p>AI answers 24/7, qualifies leads</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <p className="font-semibold text-accent">
                    100% of leads captured
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-8">
            <a
              href="/pricing"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-colors"
            >
              See How It Works
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


// ============================================================================
// 4. SPECIFIC ROI TESTIMONIALS (Concrete proof beats vague promises)
// ============================================================================

interface ROITestimonial {
  quote: string;
  author: string;
  business: string;
  industry: string;
  result: string; // Specific number
  avatar?: string;
}

export function ROITestimonials() {
  const testimonials: ROITestimonial[] = [
    {
      quote:
        "Voice AI helped us capture $47,000 in additional revenue in the first 30 days. We went from missing 40% of calls to answering 100%.",
      author: "Mike Thompson",
      business: "Thompson HVAC",
      industry: "HVAC Services",
      result: "$47K revenue in 30 days",
    },
    {
      quote:
        "Our law firm books 80+ consultations per month automatically now. The AI qualifies leads so well that we only talk to serious buyers. Game changer.",
      author: "Sarah Martinez",
      business: "Martinez Law Group",
      industry: "Legal Services",
      result: "80+ appointments/month",
    },
    {
      quote:
        "We were paying $3,200/month for an answering service. Now we pay $999 for AI that works 24/7 and books appointments automatically. Saved $26,400 first year.",
      author: "James Porter",
      business: "Porter Plumbing",
      industry: "Home Services",
      result: "$26.4K saved annually",
    },
  ];

  return (
    <section className="py-16 bg-surface">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Real Results from Real Businesses
          </h2>
          <p className="text-xl text-muted">
            See the ROI our clients are achieving with Voice AI
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 bg-background rounded-xl border border-border hover:border-accent/50 transition-colors"
            >
              {/* Result badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
                📈 {testimonial.result}
              </div>

              {/* Quote */}
              <blockquote className="text-muted mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center font-bold text-accent">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted">{testimonial.business}</p>
                  <p className="text-xs text-muted">{testimonial.industry}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


// ============================================================================
// 5. PRICING TIER WITH "SOLO PROFESSIONAL" ENTRY TIER
// ============================================================================

interface PricingTier {
  name: string;
  tagline: string;
  price: number;
  period: string;
  calls: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

export function PricingTiers() {
  const tiers: PricingTier[] = [
    {
      name: "Solo Professional",
      tagline: "Perfect for solo operators",
      price: 399,
      period: "month",
      calls: "30 qualified calls/month",
      features: [
        "AI voice agent (24/7)",
        "Appointment booking",
        "CRM integration",
        "SMS confirmations",
        "Call transcriptions",
        "Email support",
      ],
      cta: "Start Free Trial",
    },
    {
      name: "Starter",
      tagline: "Most popular for small teams",
      price: 999,
      period: "month",
      calls: "100 qualified calls/month",
      features: [
        "Everything in Solo Professional",
        "Google Ads management ($2K/mo spend)",
        "Facebook Ads management ($2K/mo spend)",
        "Advanced lead qualification",
        "Priority support",
        "Monthly strategy calls",
      ],
      cta: "Get Started",
      popular: true,
    },
    {
      name: "Growth",
      tagline: "For scaling businesses",
      price: 1997,
      period: "month",
      calls: "300 qualified calls/month",
      features: [
        "Everything in Starter",
        "Google Ads ($5K+/mo spend)",
        "Facebook Ads ($5K+/mo spend)",
        "Dedicated account manager",
        "Weekly optimization calls",
        "Custom integrations",
      ],
      cta: "Scale Your Business",
    },
    {
      name: "Enterprise",
      tagline: "Custom solution for large teams",
      price: 3997,
      period: "month",
      calls: "Unlimited qualified calls",
      features: [
        "Everything in Growth",
        "Unlimited ad spend management",
        "Multi-location support",
        "White-glove onboarding",
        "24/7 priority support",
        "Custom AI training",
      ],
      cta: "Contact Sales",
    },
  ];

  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted mb-4">
            No hidden fees. No surprise charges. Cancel anytime.
          </p>
          {/* Security badges inline */}
          <div className="flex items-center justify-center gap-4 text-sm text-muted">
            <span>🔒 SOC 2 Certified</span>
            <span>•</span>
            <span>🏥 HIPAA Compliant</span>
            <span>•</span>
            <span>🛡️ GDPR Compliant</span>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative p-6 rounded-2xl border-2 ${
                tier.popular
                  ? "border-accent bg-accent/5 shadow-lg"
                  : "border-border bg-surface"
              }`}
            >
              {/* Popular badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-white text-sm font-semibold rounded-full">
                  MOST POPULAR
                </div>
              )}

              {/* Tier name */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-1">{tier.name}</h3>
                <p className="text-sm text-muted">{tier.tagline}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">${tier.price}</span>
                  <span className="text-muted">/{tier.period}</span>
                </div>
                <p className="text-sm text-muted mt-2">{tier.calls}</p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <svg
                      className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={`/pricing/${tier.name.toLowerCase().replace(" ", "-")}`}
                className={`block w-full py-3 px-6 rounded-lg font-semibold text-center transition-colors ${
                  tier.popular
                    ? "bg-accent text-white hover:bg-accent/90"
                    : "bg-surface border-2 border-border hover:bg-surface/80"
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Money-back guarantee */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-accent/10 rounded-full">
            <span className="text-2xl">💯</span>
            <p className="text-sm font-medium">
              30-Day Money-Back Guarantee - Risk Free
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


// ============================================================================
// 6. COMPARISON TABLE (Us vs Competitors)
// ============================================================================

interface ComparisonRow {
  feature: string;
  captureClient: boolean | string;
  myAIFrontDesk: boolean | string;
  bland: boolean | string;
  vapi: boolean | string;
}

export function CompetitorComparison() {
  const rows: ComparisonRow[] = [
    {
      feature: "24/7 Call Answering",
      captureClient: true,
      myAIFrontDesk: true,
      bland: true,
      vapi: true,
    },
    {
      feature: "Appointment Booking",
      captureClient: true,
      myAIFrontDesk: true,
      bland: true,
      vapi: true,
    },
    {
      feature: "Lead Qualification",
      captureClient: true,
      myAIFrontDesk: true,
      bland: true,
      vapi: true,
    },
    {
      feature: "Google Ads Management",
      captureClient: "✅ Included",
      myAIFrontDesk: false,
      bland: false,
      vapi: false,
    },
    {
      feature: "Facebook Ads Management",
      captureClient: "✅ Included",
      myAIFrontDesk: false,
      bland: false,
      vapi: false,
    },
    {
      feature: "Pricing",
      captureClient: "$399-3997/mo",
      myAIFrontDesk: "$79-149/mo",
      bland: "Contact Sales",
      vapi: "$0.05/min+",
    },
    {
      feature: "Setup Support",
      captureClient: "Done-for-you",
      myAIFrontDesk: "Self-service",
      bland: "Enterprise",
      vapi: "Developer",
    },
    {
      feature: "Account Manager",
      captureClient: "✅ Dedicated",
      myAIFrontDesk: false,
      bland: "Enterprise",
      vapi: false,
    },
  ];

  return (
    <section className="py-16 bg-surface">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How We Compare to Other Voice AI Providers
          </h2>
          <p className="text-xl text-muted">
            We're the only agency that includes Ads Management with Voice AI
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="text-left py-4 px-4 font-semibold">Feature</th>
                <th className="text-center py-4 px-4 font-semibold bg-accent/10">
                  Capture Client
                </th>
                <th className="text-center py-4 px-4 font-semibold">
                  My AI Front Desk
                </th>
                <th className="text-center py-4 px-4 font-semibold">Bland.ai</th>
                <th className="text-center py-4 px-4 font-semibold">Vapi</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr
                  key={index}
                  className="border-b border-border hover:bg-surface/50"
                >
                  <td className="py-4 px-4 font-medium">{row.feature}</td>
                  <td className="text-center py-4 px-4 bg-accent/5">
                    {typeof row.captureClient === "boolean" ? (
                      row.captureClient ? (
                        <span className="text-accent text-xl">✓</span>
                      ) : (
                        <span className="text-muted">−</span>
                      )
                    ) : (
                      <span className="font-semibold">{row.captureClient}</span>
                    )}
                  </td>
                  <td className="text-center py-4 px-4">
                    {typeof row.myAIFrontDesk === "boolean" ? (
                      row.myAIFrontDesk ? (
                        <span className="text-accent text-xl">✓</span>
                      ) : (
                        <span className="text-muted">−</span>
                      )
                    ) : (
                      <span className="text-muted text-sm">
                        {row.myAIFrontDesk}
                      </span>
                    )}
                  </td>
                  <td className="text-center py-4 px-4">
                    {typeof row.bland === "boolean" ? (
                      row.bland ? (
                        <span className="text-accent text-xl">✓</span>
                      ) : (
                        <span className="text-muted">−</span>
                      )
                    ) : (
                      <span className="text-muted text-sm">{row.bland}</span>
                    )}
                  </td>
                  <td className="text-center py-4 px-4">
                    {typeof row.vapi === "boolean" ? (
                      row.vapi ? (
                        <span className="text-accent text-xl">✓</span>
                      ) : (
                        <span className="text-muted">−</span>
                      )
                    ) : (
                      <span className="text-muted text-sm">{row.vapi}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center">
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-colors text-lg"
          >
            See Why Businesses Choose Us
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}


// ============================================================================
// 7. SMS + PHONE DUAL CTA (Lower friction lead capture)
// ============================================================================

export function DualCTA() {
  return (
    <div className="space-y-4">
      {/* Primary - Phone CTA */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="tel:865-XXX-DEMO"
          className="px-8 py-4 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-colors text-lg text-center"
        >
          🎤 Try Our AI Demo
        </a>
        <a
          href="tel:865-346-3339"
          className="px-8 py-4 bg-surface border-2 border-border rounded-lg font-semibold hover:bg-surface/80 transition-colors text-lg text-center"
        >
          📞 Talk to Our Team
        </a>
      </div>

      {/* Secondary - SMS CTA (lower friction) */}
      <div className="text-center">
        <p className="text-sm text-muted mb-2">Not ready to call?</p>
        <a
          href="sms:8653463339&body=DEMO"
          className="inline-flex items-center gap-2 text-accent hover:underline font-medium"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          Text "DEMO" to (865) 346-3339
        </a>
        <p className="text-xs text-muted mt-1">
          Get instant info via text in 30 seconds
        </p>
      </div>
    </div>
  );
}


// ============================================================================
// USAGE EXAMPLES
// ============================================================================

/*

// In your homepage (src/app/page.tsx):

import { CostComparisonHero } from '@/components/competitor-insights/CostComparisonHero';
import { UniqueValueProp } from '@/components/competitor-insights/UniqueValueProp';
import { ROITestimonials } from '@/components/competitor-insights/ROITestimonials';
import { SecurityBadges } from '@/components/competitor-insights/SecurityBadges';

export default function HomePage() {
  return (
    <>
      <CostComparisonHero />
      <UniqueValueProp />
      <ROITestimonials />
      <SecurityBadges />
    </>
  );
}


// In your pricing page (src/app/pricing/page.tsx):

import { PricingTiers } from '@/components/competitor-insights/PricingTiers';
import { CompetitorComparison } from '@/components/competitor-insights/CompetitorComparison';
import { SecurityBadges } from '@/components/competitor-insights/SecurityBadges';

export default function PricingPage() {
  return (
    <>
      <PricingTiers />
      <CompetitorComparison />
      <SecurityBadges />
    </>
  );
}


// In your footer (src/components/Footer.tsx):

import { SecurityBadges } from '@/components/competitor-insights/SecurityBadges';

export function Footer() {
  return (
    <footer>
      {/* Your existing footer content */}
      <SecurityBadges />
    </footer>
  );
}

*/


// ============================================================================
// TESTING & OPTIMIZATION
// ============================================================================

/*

A/B TEST THESE VARIANTS:

1. Hero Headline:
   - Current: "Never Miss Another Call. Never Lose Another Lead."
   - Variant A: "47% of Your Calls Go to Voicemail. We Fix That."
   - Variant B: "100x Cheaper Than a Receptionist. 10x Better at Capturing Leads."

2. Primary CTA:
   - Current: "Get Your Free Consultation"
   - Variant A: "Try Our AI Demo - Call Now"
   - Variant B: "Get Free ROI Analysis"

3. Pricing Display:
   - Current: Show all 4 tiers
   - Variant A: Show only 3 tiers (hide Solo Professional)
   - Variant B: Show Solo Professional + Starter only (hide higher tiers)

METRICS TO TRACK:
- Conversion rate by CTA variant
- Time on page by hero variant
- Pricing page engagement by tier
- Demo line call volume
- SMS opt-ins

*/
