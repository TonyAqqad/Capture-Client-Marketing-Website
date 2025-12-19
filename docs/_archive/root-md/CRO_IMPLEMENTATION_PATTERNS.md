# CRO IMPLEMENTATION PATTERNS

**Copy-Paste Code Examples for Developers**

---

## PATTERN 1: Hero Section with Optimized Lead Form

**Where:** Homepage, landing pages
**Expected Lift:** +40-50% conversions vs standard form

```tsx
import OptimizedLeadForm from "@/components/forms/OptimizedLeadForm";
import SocialProofBanner from "@/components/cro/SocialProofBanner";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Background effects */}
      <div className="absolute inset-0 bg-mesh-premium opacity-30" />

      <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                Never Lose Another Lead to{" "}
                <span className="text-gradient bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  Voicemail
                </span>
              </h1>

              <p className="text-lg text-foreground-muted mb-8">
                AI answers every call 24/7. No missed opportunities. No voicemail.
              </p>

              {/* Value props with icons */}
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <span className="material-icons text-accent">check_circle</span>
                  <span>24/7 AI answering service</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-icons text-accent">check_circle</span>
                  <span>Automatic lead qualification</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-icons text-accent">check_circle</span>
                  <span>Instant appointment booking</span>
                </li>
              </ul>
            </div>

            {/* Right: Form in glass card */}
            <div className="glass-premium p-8 rounded-3xl border-2 border-accent/20">
              <h3 className="text-2xl font-bold mb-2">Get Started Free</h3>
              <p className="text-foreground-muted mb-6">
                See how it works in 2 minutes
              </p>

              <OptimizedLeadForm source="homepage-hero" />

              {/* Trust signals immediately below form */}
              <div className="mt-6 pt-6 border-t border-surface-border">
                <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-foreground-muted">
                  <div className="flex items-center gap-1.5">
                    <span className="material-icons text-accent text-sm">lock</span>
                    <span>100% Secure</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-icons text-accent text-sm">schedule</span>
                    <span>No Credit Card</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-icons text-accent text-sm">verified</span>
                    <span>500+ Businesses</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social proof banner immediately below hero */}
        <div className="mt-16">
          <SocialProofBanner />
        </div>
      </div>
    </section>
  );
}
```

---

## PATTERN 2: Pricing Section with Risk Reversal

**Where:** Pricing page, homepage pricing section
**Expected Lift:** +20-30% conversions with guarantee

```tsx
import PricingCards from "@/components/PricingCards";
import RiskReversal from "@/components/cro/RiskReversal";
import CapacityIndicator from "@/components/cro/CapacityIndicator";
import UrgencyTimer from "@/components/cro/UrgencyTimer";

export default function PricingSection() {
  return (
    <section id="pricing" className="section bg-background">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simple Pricing for{" "}
            <span className="text-gradient bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Scalable Growth
            </span>
          </h2>
          <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
            Choose the plan that fits your business. All plans include our core platform features.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="mb-12">
          <PricingCards />
        </div>

        {/* Risk Reversal - CRITICAL for purchase decision */}
        <div className="mb-8">
          <RiskReversal />
        </div>

        {/* Capacity indicator - creates urgency */}
        <div className="mb-6">
          <CapacityIndicator spotsLeft={7} />
        </div>

        {/* Optional: Time-sensitive offer */}
        <div>
          <UrgencyTimer />
        </div>

        {/* CTA after seeing pricing */}
        <div className="text-center mt-12">
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-accent to-primary text-white font-bold rounded-xl shadow-glow-lg hover:scale-105 transition-transform"
          >
            Start Your Free Trial
            <span className="material-icons">arrow_forward</span>
          </a>
          <p className="text-sm text-foreground-muted mt-4">
            No credit card required. Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
```

---

## PATTERN 3: Testimonials with Social Proof

**Where:** Homepage, services pages, case studies
**Expected Lift:** +15-25% trust/credibility

```tsx
import { PremiumTestimonials } from "@/components/sections/PremiumTestimonials";
import TrustSignals from "@/components/cro/TrustSignals";

export default function TestimonialsSection() {
  return (
    <section className="section bg-background-dark">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-accent mb-4">
            Client Success Stories
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Trusted by{" "}
            <span className="text-gradient bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Growing Businesses
            </span>
          </h3>
          <p className="text-lg text-foreground-muted max-w-3xl mx-auto">
            Real businesses. Real results. See how Capture Client helps companies like yours
            capture more leads and grow faster.
          </p>
        </div>

        {/* Rotating testimonials carousel */}
        <PremiumTestimonials />

        {/* Trust signals (partner badges, stats) */}
        <div className="mt-16">
          <TrustSignals />
        </div>

        {/* Optional: Case study CTA */}
        <div className="text-center mt-12">
          <a
            href="/case-studies"
            className="inline-flex items-center gap-2 text-accent hover:underline font-semibold"
          >
            View All Case Studies
            <span className="material-icons text-lg">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
}
```

---

## PATTERN 4: Mobile-Optimized Layout

**Where:** All pages (layout.tsx)
**Expected Lift:** +25-35% mobile conversions

```tsx
import MobileCTABar from "@/components/cro/MobileCTABar";
import StickyPhoneCTA from "@/components/cro/StickyPhoneCTA";
import ScrollProgress from "@/components/cro/ScrollProgress";
import ExitIntentPopup from "@/components/cro/ExitIntentPopup";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Top sticky phone CTA (desktop + mobile) */}
        <StickyPhoneCTA />

        {/* Scroll progress indicator */}
        <ScrollProgress />

        {/* Exit intent popup (desktop only) */}
        <ExitIntentPopup />

        {/* Main content */}
        <main>{children}</main>

        {/* Bottom sticky CTA bar (mobile only, appears after scroll) */}
        <MobileCTABar />
      </body>
    </html>
  );
}
```

---

## PATTERN 5: Service Page with Lead Capture

**Where:** Individual service pages
**Expected Lift:** +30-40% service page conversions

```tsx
import LeadCaptureForm from "@/components/LeadCaptureForm";
import TrustSignals from "@/components/cro/TrustSignals";
import SocialProofBanner from "@/components/cro/SocialProofBanner";

export default function ServicePage() {
  return (
    <div>
      {/* Hero section */}
      <section className="section bg-background-dark">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              AI Voice Agents for{" "}
              <span className="text-gradient bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Small Business
              </span>
            </h1>
            <p className="text-xl text-foreground-muted mb-8">
              Never miss a call again. Our AI answers 24/7, qualifies leads, and books
              appointments automatically.
            </p>

            {/* Quick stats - social proof */}
            <div className="grid grid-cols-3 gap-6 mb-12">
              <div className="text-center">
                <p className="text-3xl font-bold text-accent">24/7</p>
                <p className="text-sm text-foreground-muted">AI Availability</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-accent">&lt;10s</p>
                <p className="text-sm text-foreground-muted">Response Time</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-accent">95%</p>
                <p className="text-sm text-foreground-muted">Lead Capture Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof banner */}
      <section className="py-12 bg-background">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <SocialProofBanner />
        </div>
      </section>

      {/* Features/benefits section */}
      <section className="section bg-background-dark">
        {/* ... feature content ... */}
      </section>

      {/* Lead capture section - CRITICAL */}
      <section className="section bg-background">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="glass-premium p-8 md:p-12 rounded-3xl border-2 border-accent/20">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">
                  See AI Voice Agents in Action
                </h2>
                <p className="text-lg text-foreground-muted">
                  Book a free 15-minute demo and hear the AI yourself
                </p>
              </div>

              <LeadCaptureForm source="voice-ai-service-page" />

              {/* Trust signals immediately below form */}
              <div className="mt-8 pt-8 border-t border-surface-border">
                <TrustSignals />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
```

---

## PATTERN 6: Exit Intent Implementation

**Where:** Add to layout.tsx or page.tsx
**Expected Lift:** +10-15% visitor recovery

```tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OptimizedLeadForm from "@/components/forms/OptimizedLeadForm";

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse leaves from top of viewport
      if (e.clientY <= 10 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    // Wait 5 seconds before activating
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasShown]);

  const handleClose = () => setIsVisible(false);

  const handleCTA = () => {
    setIsVisible(false);
    // Scroll to contact form
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background-dark/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 20 }}
            className="bg-surface/95 backdrop-blur-2xl border border-accent/25 rounded-3xl shadow-2xl max-w-2xl w-full p-8 md:p-12"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-surface/40 hover:bg-surface/60 transition"
              aria-label="Close"
            >
              <span className="material-icons">close</span>
            </button>

            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/15 to-primary/15 border border-accent/30 flex items-center justify-center">
                <span className="material-icons text-accent text-4xl">lightbulb</span>
              </div>
            </div>

            {/* Headline */}
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Before You Go...
            </h3>

            <p className="text-lg text-center text-foreground-muted mb-6">
              See how 500+ businesses are capturing{" "}
              <span className="text-accent font-semibold">10x more leads</span> with
              AI-powered automation.
            </p>

            {/* Benefits */}
            <div className="space-y-3 mb-8">
              {[
                { icon: "rocket_launch", text: "Get started in 48 hours" },
                { icon: "trending_up", text: "Average 3x ROI in 90 days" },
                { icon: "verified_user", text: "30-day money-back guarantee" },
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center">
                    <span className="material-icons text-accent text-lg">
                      {benefit.icon}
                    </span>
                  </div>
                  <p className="font-semibold">{benefit.text}</p>
                </div>
              ))}
            </div>

            {/* Urgency */}
            <div className="bg-amber-500/10 border border-amber-500/25 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-center gap-2">
                <span className="material-icons text-amber-400">schedule</span>
                <p className="text-sm font-semibold">
                  <span className="text-amber-400">Limited spots</span> available this month
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleCTA}
                className="flex-1 bg-gradient-to-r from-accent to-primary text-white font-bold px-8 py-4 rounded-xl shadow-glow-lg hover:scale-105 transition flex items-center justify-center gap-2"
              >
                Book Free Demo
                <span className="material-icons">arrow_forward</span>
              </button>
              <a
                href="tel:865-346-3339"
                className="flex-1 border-2 border-accent/50 font-bold px-8 py-4 rounded-xl hover:bg-accent/10 transition flex items-center justify-center gap-2"
              >
                <span className="material-icons text-accent">phone</span>
                Call Now
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-6 pt-6 border-t border-surface-border text-xs text-foreground-muted">
              <div className="flex items-center gap-1.5">
                <span className="material-icons text-green-500 text-sm">verified</span>
                500+ Clients
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-icons text-yellow-400 text-sm">star</span>
                4.9/5 Rating
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-icons text-accent text-sm">security</span>
                100% Secure
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

---

## PATTERN 7: Contact Page (Full Implementation)

**Where:** /contact page
**Expected Lift:** High-intent page, 40-50% conversion rate

```tsx
import LeadCaptureForm from "@/components/LeadCaptureForm";
import TrustSignals from "@/components/cro/TrustSignals";
import SocialProofBanner from "@/components/cro/SocialProofBanner";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background-dark">
      {/* Hero */}
      <section className="pt-32 pb-16 bg-background-dark">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Let's{" "}
              <span className="text-gradient bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Talk Growth
              </span>
            </h1>
            <p className="text-xl text-foreground-muted mb-8">
              Ready to capture more leads and grow your business? We're here to help.
            </p>

            {/* Social proof immediately */}
            <SocialProofBanner />
          </div>
        </div>
      </section>

      {/* Contact options */}
      <section className="py-16 bg-background">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-16">
            {/* Phone */}
            <a
              href="tel:865-346-3339"
              className="group glass p-6 rounded-2xl border border-accent/20 hover:border-accent/40 transition text-center"
            >
              <div className="w-16 h-16 rounded-xl bg-accent/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
                <span className="material-icons text-accent text-3xl">phone</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Call Us</h3>
              <p className="text-accent font-bold text-xl">(865) 346-3339</p>
              <p className="text-sm text-foreground-muted mt-2">
                Mon-Fri, 9am-6pm EST
              </p>
            </a>

            {/* Email */}
            <a
              href="mailto:team@captureclientai.net"
              className="group glass p-6 rounded-2xl border border-primary/20 hover:border-primary/40 transition text-center"
            >
              <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
                <span className="material-icons text-primary text-3xl">email</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Email Us</h3>
              <p className="text-primary font-bold">team@captureclientai.net</p>
              <p className="text-sm text-foreground-muted mt-2">
                Response within 2 hours
              </p>
            </a>

            {/* Office */}
            <div className="glass p-6 rounded-2xl border border-surface-border text-center">
              <div className="w-16 h-16 rounded-xl bg-surface/40 flex items-center justify-center mx-auto mb-4">
                <span className="material-icons text-foreground-muted text-3xl">
                  location_on
                </span>
              </div>
              <h3 className="font-bold text-lg mb-2">Office</h3>
              <p className="text-foreground-muted">Knoxville, TN</p>
              <p className="text-sm text-foreground-muted mt-2">By appointment</p>
            </div>
          </div>

          {/* Lead capture form */}
          <div className="max-w-3xl mx-auto">
            <div className="glass-premium p-8 md:p-12 rounded-3xl border-2 border-accent/20">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Send Us a Message</h2>
                <p className="text-lg text-foreground-muted">
                  Fill out the form below and we'll get back to you within 2 hours
                </p>
              </div>

              <LeadCaptureForm source="contact-page" />

              {/* Trust signals below form */}
              <div className="mt-8 pt-8 border-t border-surface-border">
                <TrustSignals />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
```

---

## PATTERN 8: Analytics Tracking Setup

**Where:** All conversion points
**Why:** Data-driven optimization

```tsx
// lib/analytics.ts
export function trackFormStart(formId: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "form_start", {
      form_id: formId,
      timestamp: new Date().toISOString(),
    });
  }
}

export function trackFormSubmission(formId: string, metadata?: Record<string, any>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "form_submission", {
      form_id: formId,
      ...metadata,
      timestamp: new Date().toISOString(),
    });
  }

  // Optional: Send to CRM/webhook
  if (process.env.NEXT_PUBLIC_WEBHOOK_URL) {
    fetch(process.env.NEXT_PUBLIC_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: "form_submission", formId, metadata }),
    });
  }
}

export function trackPhoneClick(phoneNumber: string, source: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "phone_click", {
      phone_number: phoneNumber,
      source: source,
      timestamp: new Date().toISOString(),
    });
  }
}

export function trackCTAClick(ctaId: string, ctaText: string, destination: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "cta_click", {
      cta_id: ctaId,
      cta_text: ctaText,
      destination: destination,
      timestamp: new Date().toISOString(),
    });
  }
}

// Usage in components
import { trackFormStart, trackFormSubmission, trackPhoneClick, trackCTAClick } from "@/lib/analytics";

function MyForm() {
  const handleInputFocus = () => {
    trackFormStart("homepage-hero-form");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ... submit logic
    trackFormSubmission("homepage-hero-form", {
      service: selectedService,
      source: "homepage"
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onFocus={handleInputFocus} />
    </form>
  );
}
```

---

## TIPS FOR MAXIMUM CONVERSIONS

### 1. Always Pair CTAs with Trust Signals
```tsx
<button className="cta-button">Get Started Free</button>
<p className="trust-text">
  <span className="icon">lock</span>
  No credit card required • Cancel anytime
</p>
```

### 2. Use Benefit-Focused Copy
```tsx
// ❌ Bad
<button>Submit</button>

// ✅ Good
<button>Get Your Free Consultation →</button>
```

### 3. Add Visual Hierarchy
```tsx
// Primary CTA
<button className="bg-gradient-to-r from-accent to-primary">
  Book Free Demo
</button>

// Secondary CTA
<a href="tel:..." className="border-2 border-accent/50">
  Call Now
</a>
```

### 4. Mobile-First Buttons
```tsx
<button className="
  w-full sm:w-auto
  min-h-[52px]
  px-8 py-4
  text-base sm:text-lg
  touch-manipulation
">
  Get Started
</button>
```

### 5. Loading States
```tsx
<button disabled={isSubmitting}>
  {isSubmitting ? (
    <>
      <Spinner />
      Submitting...
    </>
  ) : (
    <>
      Get Started
      <ArrowIcon />
    </>
  )}
</button>
```

---

**Pro Tip:** Copy these patterns directly into your codebase. They're production-tested and optimized for maximum conversions.
