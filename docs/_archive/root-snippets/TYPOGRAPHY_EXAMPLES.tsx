/**
 * TYPOGRAPHY WEIGHT EXTREMES - VISUAL EXAMPLES
 *
 * This file demonstrates the $5M premium typography system
 * with extreme weight contrasts (200-800).
 *
 * Copy these examples into your components for instant premium feel.
 */

import React from 'react';

// ============================================
// EXAMPLE 1: Extreme Contrast Hero
// ============================================
export function ExtremeContrastHero() {
  return (
    <section className="py-20 text-center">
      <h1 className="text-6xl sm:text-7xl lg:text-8xl">
        <span className="font-ultralight text-foreground-muted">
          STOP losing
        </span>
        {' '}
        <span className="font-extrabold text-gradient-gold">
          LEADS
        </span>
      </h1>
      <p className="mt-6 font-light text-xl text-foreground-muted max-w-2xl mx-auto">
        Transform your business with AI-powered lead generation
      </p>
    </section>
  );
}

// ============================================
// EXAMPLE 2: Premium Pricing Card
// ============================================
export function PremiumPricingCard() {
  return (
    <div className="glass-premium p-8 rounded-2xl">
      <h3 className="font-semibold text-lg text-foreground-muted mb-2">
        Enterprise Plan
      </h3>

      <div className="my-6">
        <span className="font-light text-sm text-foreground-muted block">
          Starting at
        </span>
        <div className="flex items-baseline gap-2">
          <span className="font-extrabold text-6xl text-gradient-gold">
            $997
          </span>
          <span className="font-medium text-xl text-foreground-muted">
            /month
          </span>
        </div>
      </div>

      <ul className="space-y-3 mb-8">
        <li className="flex items-center gap-3">
          <span className="text-accent">✓</span>
          <span className="font-normal text-base">Unlimited AI agents</span>
        </li>
        <li className="flex items-center gap-3">
          <span className="text-accent">✓</span>
          <span className="font-normal text-base">24/7 support</span>
        </li>
        <li className="flex items-center gap-3">
          <span className="text-accent">✓</span>
          <span className="font-normal text-base">Custom integrations</span>
        </li>
      </ul>

      <button className="btn-gold w-full font-semibold text-lg">
        Get Started
      </button>
    </div>
  );
}

// ============================================
// EXAMPLE 3: Stat Counter with Contrast
// ============================================
export function StatCounter() {
  return (
    <div className="text-center">
      <div className="font-extrabold text-7xl sm:text-8xl text-gradient-gold mb-2">
        10,000+
      </div>
      <div className="font-light text-xl text-foreground-muted">
        Leads Captured This Year
      </div>
    </div>
  );
}

// ============================================
// EXAMPLE 4: Premium Testimonial
// ============================================
export function PremiumTestimonial() {
  return (
    <div className="testimonial-luxury p-8 rounded-2xl max-w-3xl">
      <div className="mb-6">
        <svg className="w-12 h-12 text-gold-500 opacity-50" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      <blockquote className="font-light text-2xl font-serif-quote mb-6">
        "Capture Client transformed our lead generation completely.
        We went from 50 leads per month to over 500 with their AI voice agents."
      </blockquote>

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-gold" />
        <div>
          <div className="font-semibold text-lg">Sarah Johnson</div>
          <div className="font-normal text-sm text-foreground-muted">
            CEO, TechStart Inc.
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// EXAMPLE 5: Feature Section with Weight Hierarchy
// ============================================
export function FeatureSection() {
  return (
    <section className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-5xl sm:text-6xl lg:text-7xl mb-4">
          <span className="font-ultralight text-foreground-muted">
            Experience the
          </span>
          {' '}
          <span className="font-extrabold text-gradient-gold">
            Future
          </span>
        </h2>
        <p className="font-light text-xl text-foreground-muted max-w-2xl mx-auto">
          Next-generation AI voice technology
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <FeatureCard
          title="24/7 Availability"
          description="Never miss a lead again with round-the-clock AI agents"
          icon="🤖"
        />
        <FeatureCard
          title="Instant Response"
          description="Engage leads in under 3 seconds with intelligent routing"
          icon="⚡"
        />
        <FeatureCard
          title="Smart Qualification"
          description="AI-powered lead scoring and prioritization"
          icon="🎯"
        />
      </div>
    </section>
  );
}

function FeatureCard({
  title,
  description,
  icon
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="glass-card p-8 rounded-2xl hover:border-accent/30 transition-colors">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="font-bold text-2xl mb-3">{title}</h3>
      <p className="font-light text-base text-foreground-muted">{description}</p>
    </div>
  );
}

// ============================================
// EXAMPLE 6: CTA Section with Weight Contrast
// ============================================
export function CTASection() {
  return (
    <section className="py-20 text-center glass-premium rounded-3xl p-12">
      <h2 className="text-5xl sm:text-6xl lg:text-7xl mb-6">
        <span className="font-ultralight text-foreground-muted">
          Ready to
        </span>
        {' '}
        <span className="font-extrabold text-gradient-gold">
          10X
        </span>
        {' '}
        <span className="font-ultralight text-foreground-muted">
          your leads?
        </span>
      </h2>

      <p className="font-light text-xl text-foreground-muted max-w-2xl mx-auto mb-8">
        Join 10,000+ businesses using AI to capture more leads
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="btn-gold px-8 py-4">
          <span className="font-semibold text-lg">Start Free Trial</span>
        </button>
        <button className="btn-ghost px-8 py-4">
          <span className="font-medium text-lg">Watch Demo</span>
        </button>
      </div>

      <div className="mt-8 font-light text-sm text-foreground-muted">
        No credit card required • 14-day free trial • Cancel anytime
      </div>
    </section>
  );
}

// ============================================
// EXAMPLE 7: Premium Hero with All Weight Variants
// ============================================
export function PremiumHeroShowcase() {
  return (
    <section className="min-h-screen flex items-center justify-center py-20">
      <div className="text-center max-w-5xl">
        {/* Eyebrow text - Ultra-light */}
        <div className="font-ultralight text-xl text-accent mb-4 tracking-wide">
          PREMIUM AI VOICE TECHNOLOGY
        </div>

        {/* Main headline - Extreme contrast */}
        <h1 className="text-7xl sm:text-8xl lg:text-9xl mb-6">
          <span className="font-ultralight text-foreground-muted block mb-2">
            DON'T SETTLE FOR
          </span>
          <span className="font-extrabold text-gradient-gold block">
            ORDINARY
          </span>
        </h1>

        {/* Subheading - Light weight */}
        <p className="font-light text-2xl text-foreground-muted max-w-3xl mx-auto mb-8">
          Transform your business with AI agents that work 24/7
          to capture and qualify every lead
        </p>

        {/* Stats row - Mixed weights */}
        <div className="grid grid-cols-3 gap-8 mb-12">
          <div>
            <div className="font-extrabold text-5xl text-accent">500%</div>
            <div className="font-light text-sm text-foreground-muted mt-2">
              Average ROI
            </div>
          </div>
          <div>
            <div className="font-extrabold text-5xl text-accent">10k+</div>
            <div className="font-light text-sm text-foreground-muted mt-2">
              Leads Captured
            </div>
          </div>
          <div>
            <div className="font-extrabold text-5xl text-accent">24/7</div>
            <div className="font-light text-sm text-foreground-muted mt-2">
              Always Online
            </div>
          </div>
        </div>

        {/* CTA buttons - Semibold */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn-gold px-10 py-5">
            <span className="font-semibold text-xl">Get Started Free</span>
          </button>
          <button className="btn-ghost px-10 py-5">
            <span className="font-medium text-xl">See How It Works</span>
          </button>
        </div>

        {/* Trust badge - Normal weight */}
        <div className="mt-8 font-normal text-sm text-foreground-muted">
          Trusted by 1,000+ businesses • No credit card required
        </div>
      </div>
    </section>
  );
}

// ============================================
// EXAMPLE 8: Typography Scale Demonstration
// ============================================
export function TypographyScaleDemo() {
  return (
    <div className="space-y-8 p-8">
      <h2 className="font-bold text-3xl mb-8">Typography Weight Scale</h2>

      {/* Ultra-light (200) */}
      <div>
        <div className="font-ultralight text-5xl mb-2">
          Ultra-light (200) - Elegant & Dramatic
        </div>
        <div className="font-light text-sm text-foreground-muted">
          Best for: Hero contrast, elegant emphasis, large sizes only
        </div>
      </div>

      {/* Light (300) */}
      <div>
        <div className="font-light text-4xl mb-2">
          Light (300) - Subtle & Refined
        </div>
        <div className="font-light text-sm text-foreground-muted">
          Best for: Secondary text, subheadings, supporting content
        </div>
      </div>

      {/* Normal (400) */}
      <div>
        <div className="font-normal text-3xl mb-2">
          Normal (400) - Balanced & Readable
        </div>
        <div className="font-light text-sm text-foreground-muted">
          Best for: Body text, paragraphs, default content
        </div>
      </div>

      {/* Medium (500) */}
      <div>
        <div className="font-medium text-3xl mb-2">
          Medium (500) - Emphasized
        </div>
        <div className="font-light text-sm text-foreground-muted">
          Best for: Slight emphasis, light headings, labels
        </div>
      </div>

      {/* Semibold (600) */}
      <div>
        <div className="font-semibold text-3xl mb-2">
          Semibold (600) - Strong Presence
        </div>
        <div className="font-light text-sm text-foreground-muted">
          Best for: Subheadings, section titles, navigation
        </div>
      </div>

      {/* Bold (700) */}
      <div>
        <div className="font-bold text-3xl mb-2">
          Bold (700) - Confident & Clear
        </div>
        <div className="font-light text-sm text-foreground-muted">
          Best for: Headings, important information, CTAs
        </div>
      </div>

      {/* Extra-bold (800) */}
      <div>
        <div className="font-extrabold text-5xl mb-2">
          Extra-bold (800) - Maximum Impact
        </div>
        <div className="font-light text-sm text-foreground-muted">
          Best for: Hero text, numbers, major headings, dramatic emphasis
        </div>
      </div>
    </div>
  );
}

// ============================================
// USAGE INSTRUCTIONS
// ============================================
/*

COPY THESE COMPONENTS INTO YOUR PROJECT:

1. Import the component you want:
   import { ExtremeContrastHero } from './path/to/TYPOGRAPHY_EXAMPLES';

2. Use in your page:
   <ExtremeContrastHero />

3. Customize the content:
   - Change text to match your brand
   - Adjust colors with Tailwind classes
   - Mix and match weight combinations

QUICK TIPS:
- Use font-ultralight (200) for contrast words in large sizes
- Use font-extrabold (800) for maximum emphasis
- Keep body text at font-normal (400) for readability
- Combine weights in single headlines for drama
- Adjust letter-spacing: wider for light, tighter for bold

$5M QUALITY ACHIEVED! 🎉
*/

export default {
  ExtremeContrastHero,
  PremiumPricingCard,
  StatCounter,
  PremiumTestimonial,
  FeatureSection,
  CTASection,
  PremiumHeroShowcase,
  TypographyScaleDemo,
};
