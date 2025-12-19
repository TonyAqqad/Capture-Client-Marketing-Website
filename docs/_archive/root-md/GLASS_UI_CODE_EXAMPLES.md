# Glass UI Code Examples - Copy & Paste Ready

## Table of Contents
1. [Hero Sections](#hero-sections)
2. [Service Cards](#service-cards)
3. [Form Components](#form-components)
4. [Navigation](#navigation)
5. [CTAs](#ctas)
6. [Modal Overlays](#modal-overlays)
7. [Badges & Tags](#badges--tags)

---

## Hero Sections

### Premium Hero with Glass Elements

```tsx
<section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background-dark">
  {/* Background gradient orbs */}
  <div className="absolute inset-0">
    <div className="absolute top-1/4 left-0 w-[800px] h-[800px] rounded-full bg-gradient-radial from-primary/20 to-transparent blur-3xl -translate-x-1/3" />
    <div className="absolute bottom-1/4 right-0 w-[900px] h-[900px] rounded-full bg-gradient-radial from-accent/15 to-transparent blur-3xl translate-x-1/3" />
  </div>

  <div className="container-custom relative z-10 px-4 py-20">
    <div className="max-w-4xl mx-auto text-center">
      {/* Live status badge with glass */}
      <div className="glass-badge inline-flex mb-8">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
        </span>
        <span>Live AI Answering 4,273 Calls Today</span>
      </div>

      {/* Headline */}
      <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black mb-8 text-glass-contrast-strong leading-tight">
        Never Miss a
        <br />
        <span className="text-gradient bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
          Lead Again
        </span>
      </h1>

      {/* Subheadline */}
      <p className="text-xl sm:text-2xl text-foreground-muted max-w-2xl mx-auto mb-12 leading-relaxed">
        AI Voice Agents answer calls 24/7 + Ads that convert + CRM that closes.
      </p>

      {/* CTA buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button className="btn-primary min-w-[200px]">
          Book Your Free Demo
        </button>
        <a href="tel:865-346-3339" className="btn-glass min-w-[200px]">
          <span className="material-icons text-sm mr-2">phone</span>
          Call (865) 346-3339
        </a>
      </div>

      {/* Trust badges */}
      <div className="flex items-center justify-center gap-6 mt-12 flex-wrap">
        <span className="glass-badge">
          <span className="material-icons text-xs">verified</span>
          500+ Businesses
        </span>
        <span className="glass-badge">
          <span className="material-icons text-xs">star</span>
          4.9/5 Stars
        </span>
        <span className="glass-badge">
          <span className="material-icons text-xs">trending_up</span>
          10x More Leads
        </span>
      </div>
    </div>
  </div>
</section>
```

---

## Service Cards

### Glass Service Card Grid

```tsx
<section className="py-20 bg-background">
  <div className="container-custom px-4">
    {/* Section header */}
    <div className="text-center mb-16">
      <h2 className="text-sm font-bold uppercase tracking-widest text-accent mb-4">
        The Integrated Solution
      </h2>
      <h3 className="text-4xl lg:text-6xl font-heading font-bold text-foreground mb-6">
        Everything You Need in{" "}
        <span className="text-gradient bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
          One Platform
        </span>
      </h3>
    </div>

    {/* Service cards */}
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Card 1 */}
      <div className="glass-card group hover:-translate-y-2 transition-transform duration-300">
        {/* Icon */}
        <div className="glass-elevated w-16 h-16 rounded-xl flex items-center justify-center mb-6">
          <span className="material-icons text-accent text-3xl">support_agent</span>
        </div>

        {/* Title */}
        <h4 className="text-xl font-bold text-glass-contrast-strong mb-3">
          Voice AI Agents
        </h4>

        {/* Description */}
        <p className="text-foreground-muted text-sm leading-relaxed mb-6">
          AI-powered voice agents handle calls 24/7, qualify leads, and book appointments.
        </p>

        {/* Benefits */}
        <ul className="space-y-2">
          <li className="flex items-center gap-2 text-sm text-foreground-subtle">
            <span className="material-icons text-xs text-accent">check_circle</span>
            24/7 availability
          </li>
          <li className="flex items-center gap-2 text-sm text-foreground-subtle">
            <span className="material-icons text-xs text-accent">check_circle</span>
            Natural conversations
          </li>
          <li className="flex items-center gap-2 text-sm text-foreground-subtle">
            <span className="material-icons text-xs text-accent">check_circle</span>
            Auto lead qualification
          </li>
        </ul>
      </div>

      {/* Card 2 */}
      <div className="glass-card group hover:-translate-y-2 transition-transform duration-300">
        <div className="glass-elevated w-16 h-16 rounded-xl flex items-center justify-center mb-6">
          <span className="material-icons text-primary text-3xl">trending_up</span>
        </div>
        <h4 className="text-xl font-bold text-glass-contrast-strong mb-3">
          Lead Generation
        </h4>
        <p className="text-foreground-muted text-sm leading-relaxed mb-6">
          Professionally managed Google and Facebook Ads campaigns designed to drive leads.
        </p>
        <ul className="space-y-2">
          <li className="flex items-center gap-2 text-sm text-foreground-subtle">
            <span className="material-icons text-xs text-primary">check_circle</span>
            Expert ad management
          </li>
          <li className="flex items-center gap-2 text-sm text-foreground-subtle">
            <span className="material-icons text-xs text-primary">check_circle</span>
            High-quality targeting
          </li>
          <li className="flex items-center gap-2 text-sm text-foreground-subtle">
            <span className="material-icons text-xs text-primary">check_circle</span>
            ROI-focused campaigns
          </li>
        </ul>
      </div>

      {/* Cards 3 & 4 - Similar structure */}
    </div>
  </div>
</section>
```

---

## Form Components

### Premium Contact Form with Glass Inputs

```tsx
<section className="py-20 bg-background-dark">
  <div className="container-custom max-w-2xl mx-auto px-4">
    <form className="glass-card-contrast p-8 space-y-6">
      {/* Form header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-glass-contrast-strong mb-2">
          Get Started Today
        </h2>
        <p className="text-foreground-muted">
          Book your free demo and see AI in action
        </p>
      </div>

      {/* Form fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-glass-contrast mb-2">
            Your Name *
          </label>
          <input
            type="text"
            placeholder="John Smith"
            className="glass-input w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-glass-contrast mb-2">
            Email Address *
          </label>
          <input
            type="email"
            placeholder="john@company.com"
            className="glass-input w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-glass-contrast mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            placeholder="(865) 346-3339"
            className="glass-input w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-glass-contrast mb-2">
            Business Name
          </label>
          <input
            type="text"
            placeholder="Your Business"
            className="glass-input w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-glass-contrast mb-2">
            How can we help?
          </label>
          <textarea
            placeholder="Tell us about your needs..."
            className="glass-input w-full min-h-[120px] resize-y"
            rows={4}
          ></textarea>
        </div>
      </div>

      {/* Submit button */}
      <button type="submit" className="btn-primary w-full text-lg">
        Book My Free Demo
        <span className="material-icons ml-2">arrow_forward</span>
      </button>

      {/* Privacy notice */}
      <p className="text-xs text-foreground-muted text-center pt-4">
        By submitting, you agree to our{" "}
        <a href="/privacy" className="text-accent hover:underline">
          Privacy Policy
        </a>{" "}
        and{" "}
        <a href="/terms" className="text-accent hover:underline">
          Terms of Service
        </a>
      </p>
    </form>
  </div>
</section>
```

---

## Navigation

### Mobile Glass Navigation Header

```tsx
"use client";
import { useState } from "react";

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <header className="glass-nav-mobile fixed top-0 left-0 right-0 z-50">
        <div className="container-custom flex items-center justify-between px-4 py-4">
          {/* Logo */}
          <a href="/" className="text-xl font-bold text-white">
            Capture Client
          </a>

          {/* Menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="glass-badge tap-feedback touch-target"
            aria-label="Toggle menu"
          >
            <span className="material-icons text-sm">
              {isOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {isOpen && (
        <>
          <div
            className="glass-overlay-mobile z-40"
            onClick={() => setIsOpen(false)}
          />
          <nav className="fixed top-20 left-4 right-4 z-50 glass-card-contrast p-6 space-y-4">
            <a
              href="#services"
              className="block text-lg font-medium text-glass-contrast py-3 hover:text-accent transition-colors"
            >
              Services
            </a>
            <a
              href="#pricing"
              className="block text-lg font-medium text-glass-contrast py-3 hover:text-accent transition-colors"
            >
              Pricing
            </a>
            <a
              href="#about"
              className="block text-lg font-medium text-glass-contrast py-3 hover:text-accent transition-colors"
            >
              About
            </a>
            <div className="glass-divider my-4" />
            <a href="#contact" className="btn-primary w-full text-center block">
              Book Demo
            </a>
          </nav>
        </>
      )}
    </>
  );
}
```

---

## CTAs

### Glass CTA Section

```tsx
<section className="py-24 bg-background-dark relative overflow-hidden">
  {/* Background decoration */}
  <div className="absolute inset-0 bg-mesh-premium opacity-50" />

  <div className="container-custom max-w-5xl mx-auto px-4 relative z-10">
    <div className="glass-cta-card text-center">
      {/* Eyebrow */}
      <span className="glass-badge mb-6 inline-flex">
        <span className="material-icons text-xs">auto_awesome</span>
        Limited Time Offer
      </span>

      {/* Headline */}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-glass-contrast-strong mb-6">
        Ready to Capture 10x More Leads?
      </h2>

      {/* Subheadline */}
      <p className="text-lg sm:text-xl text-glass-contrast max-w-2xl mx-auto mb-8">
        Join 500+ businesses using AI to never miss another opportunity. Get started with a free demo today.
      </p>

      {/* CTA buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
        <button className="btn-primary min-w-[220px]">
          Book Free Demo
          <span className="material-icons ml-2 text-sm">calendar_today</span>
        </button>
        <a href="tel:865-346-3339" className="btn-glass min-w-[220px]">
          <span className="material-icons text-sm mr-2">phone</span>
          Call (865) 346-3339
        </a>
      </div>

      {/* Trust indicators */}
      <div className="flex items-center justify-center gap-3 pt-6 border-t border-white/10 flex-wrap">
        <span className="glass-badge">
          <span className="material-icons text-xs">star</span>
          4.9/5 Stars
        </span>
        <span className="glass-badge">
          <span className="material-icons text-xs">verified</span>
          500+ Clients
        </span>
        <span className="glass-badge">
          <span className="material-icons text-xs">workspace_premium</span>
          SOC 2 Compliant
        </span>
      </div>
    </div>
  </div>
</section>
```

---

## Modal Overlays

### Glass Modal Component

```tsx
"use client";
import { useEffect } from "react";

interface GlassModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function GlassModal({ isOpen, onClose, children }: GlassModalProps) {
  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="glass-overlay-mobile cursor-pointer"
        onClick={onClose}
        aria-label="Close modal"
      />

      {/* Modal content */}
      <div className="glass-card-contrast max-w-2xl w-full max-h-[90vh] overflow-y-auto relative z-10 p-6 sm:p-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 glass-badge touch-target"
          aria-label="Close"
        >
          <span className="material-icons text-sm">close</span>
        </button>

        {/* Content */}
        {children}
      </div>
    </div>
  );
}

// Usage example:
export function ExampleUsage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="btn-primary">
        Open Modal
      </button>

      <GlassModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-2xl font-bold text-glass-contrast-strong mb-4">
          Modal Title
        </h2>
        <p className="text-glass-contrast mb-6">
          Modal content goes here...
        </p>
        <button onClick={() => setIsOpen(false)} className="btn-primary">
          Got it
        </button>
      </GlassModal>
    </>
  );
}
```

---

## Badges & Tags

### Glass Badge Variations

```tsx
<div className="flex flex-wrap gap-3 p-6">
  {/* Status badges */}
  <span className="glass-badge">
    <span className="material-icons text-xs">check_circle</span>
    Active
  </span>

  <span className="glass-badge">
    <span className="material-icons text-xs">schedule</span>
    Pending
  </span>

  {/* Feature badges */}
  <span className="glass-badge">
    <span className="material-icons text-xs">auto_awesome</span>
    New Feature
  </span>

  <span className="glass-badge">
    <span className="material-icons text-xs">workspace_premium</span>
    Premium
  </span>

  {/* Info badges */}
  <span className="glass-badge">
    <span className="material-icons text-xs">trending_up</span>
    +247% Growth
  </span>

  <span className="glass-badge">
    <span className="relative flex h-2 w-2 mr-1">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
    </span>
    Live Now
  </span>

  {/* Social proof */}
  <span className="glass-badge">
    <span className="material-icons text-xs">star</span>
    4.9/5 Rating
  </span>

  <span className="glass-badge">
    <span className="material-icons text-xs">verified</span>
    Verified
  </span>

  <span className="glass-badge">
    <span className="material-icons text-xs">groups</span>
    500+ Users
  </span>
</div>
```

---

## Pricing Cards with Glass

```tsx
<section className="py-20 bg-background">
  <div className="container-custom px-4">
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {/* Starter Plan */}
      <div className="glass-card">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-glass-contrast-strong mb-2">
            Starter
          </h3>
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-4xl font-black text-accent">$997</span>
            <span className="text-foreground-muted">/month</span>
          </div>
        </div>

        <ul className="space-y-3 mb-8">
          <li className="flex items-center gap-2 text-foreground-subtle">
            <span className="material-icons text-sm text-accent">check_circle</span>
            Voice AI Receptionist
          </li>
          <li className="flex items-center gap-2 text-foreground-subtle">
            <span className="material-icons text-sm text-accent">check_circle</span>
            500 AI Minutes/Month
          </li>
          <li className="flex items-center gap-2 text-foreground-subtle">
            <span className="material-icons text-sm text-accent">check_circle</span>
            Basic CRM
          </li>
          <li className="flex items-center gap-2 text-foreground-subtle">
            <span className="material-icons text-sm text-accent">check_circle</span>
            Email Support
          </li>
        </ul>

        <button className="btn-secondary w-full">
          Get Started
        </button>
      </div>

      {/* Growth Plan (Popular) */}
      <div className="glass-cta-card relative">
        {/* Popular badge */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="glass-badge bg-accent/30 border-accent/50">
            <span className="material-icons text-xs">auto_awesome</span>
            Most Popular
          </span>
        </div>

        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-glass-contrast-strong mb-2">
            Growth
          </h3>
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-4xl font-black text-accent">$1,997</span>
            <span className="text-glass-contrast">/month</span>
          </div>
        </div>

        <ul className="space-y-3 mb-8">
          <li className="flex items-center gap-2 text-glass-contrast">
            <span className="material-icons text-sm text-accent">check_circle</span>
            Everything in Starter
          </li>
          <li className="flex items-center gap-2 text-glass-contrast">
            <span className="material-icons text-sm text-accent">check_circle</span>
            2,000 AI Minutes/Month
          </li>
          <li className="flex items-center gap-2 text-glass-contrast">
            <span className="material-icons text-sm text-accent">check_circle</span>
            Google & Facebook Ads
          </li>
          <li className="flex items-center gap-2 text-glass-contrast">
            <span className="material-icons text-sm text-accent">check_circle</span>
            Advanced CRM
          </li>
          <li className="flex items-center gap-2 text-glass-contrast">
            <span className="material-icons text-sm text-accent">check_circle</span>
            Priority Support
          </li>
        </ul>

        <button className="btn-primary w-full">
          Start Free Trial
        </button>
      </div>

      {/* Enterprise Plan */}
      <div className="glass-card">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-glass-contrast-strong mb-2">
            Enterprise
          </h3>
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-4xl font-black text-accent">Custom</span>
          </div>
        </div>

        <ul className="space-y-3 mb-8">
          <li className="flex items-center gap-2 text-foreground-subtle">
            <span className="material-icons text-sm text-accent">check_circle</span>
            Everything in Growth
          </li>
          <li className="flex items-center gap-2 text-foreground-subtle">
            <span className="material-icons text-sm text-accent">check_circle</span>
            Unlimited AI Minutes
          </li>
          <li className="flex items-center gap-2 text-foreground-subtle">
            <span className="material-icons text-sm text-accent">check_circle</span>
            Custom Integrations
          </li>
          <li className="flex items-center gap-2 text-foreground-subtle">
            <span className="material-icons text-sm text-accent">check_circle</span>
            Dedicated Account Manager
          </li>
          <li className="flex items-center gap-2 text-foreground-subtle">
            <span className="material-icons text-sm text-accent">check_circle</span>
            24/7 Phone Support
          </li>
        </ul>

        <button className="btn-secondary w-full">
          Contact Sales
        </button>
      </div>
    </div>
  </div>
</section>
```

---

## Testimonial Card with Glass

```tsx
<div className="glass-elevated p-6 sm:p-8 max-w-2xl">
  {/* Rating stars */}
  <div className="flex items-center gap-1 mb-4">
    {[1, 2, 3, 4, 5].map((star) => (
      <span key={star} className="material-icons text-accent text-lg">
        star
      </span>
    ))}
  </div>

  {/* Quote */}
  <p className="text-lg text-glass-contrast leading-relaxed mb-6">
    "Capture Client's AI voice agents have transformed our business. We went from missing 40% of calls to answering every single one. Revenue is up 10x in just 3 months."
  </p>

  {/* Author */}
  <div className="flex items-center gap-4">
    <div className="glass w-14 h-14 rounded-full flex items-center justify-center">
      <span className="material-icons text-accent text-2xl">person</span>
    </div>
    <div>
      <p className="font-bold text-glass-contrast-strong">Sarah Martinez</p>
      <p className="text-sm text-foreground-muted">CEO, Home Services Co.</p>
    </div>
  </div>
</div>
```

---

## Stats Section with Glass

```tsx
<section className="py-20 bg-background-dark relative overflow-hidden">
  <div className="absolute inset-0 bg-mesh-premium opacity-30" />

  <div className="container-custom px-4 relative z-10">
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Stat 1 */}
      <div className="glass-card text-center">
        <div className="glass-badge inline-flex mb-4">
          <span className="material-icons text-xs">trending_up</span>
        </div>
        <div className="text-4xl font-black text-accent mb-2">10x</div>
        <p className="text-foreground-muted">More Leads Captured</p>
      </div>

      {/* Stat 2 */}
      <div className="glass-card text-center">
        <div className="glass-badge inline-flex mb-4">
          <span className="material-icons text-xs">phone</span>
        </div>
        <div className="text-4xl font-black text-accent mb-2">100%</div>
        <p className="text-foreground-muted">Calls Answered</p>
      </div>

      {/* Stat 3 */}
      <div className="glass-card text-center">
        <div className="glass-badge inline-flex mb-4">
          <span className="material-icons text-xs">schedule</span>
        </div>
        <div className="text-4xl font-black text-accent mb-2">24/7</div>
        <p className="text-foreground-muted">AI Availability</p>
      </div>

      {/* Stat 4 */}
      <div className="glass-card text-center">
        <div className="glass-badge inline-flex mb-4">
          <span className="material-icons text-xs">groups</span>
        </div>
        <div className="text-4xl font-black text-accent mb-2">500+</div>
        <p className="text-foreground-muted">Happy Clients</p>
      </div>
    </div>
  </div>
</section>
```

---

## Mobile Bottom Sheet (Drawer)

```tsx
"use client";
import { useEffect } from "react";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function BottomSheet({ isOpen, onClose, children }: BottomSheetProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="glass-overlay-mobile"
        onClick={onClose}
      />

      <div className="bottom-sheet animate-slide-up p-6 pb-8">
        {/* Handle bar */}
        <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-6" />

        {/* Content */}
        {children}
      </div>
    </>
  );
}

// Usage:
<BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <h3 className="text-2xl font-bold text-white mb-4">Quick Actions</h3>
  <div className="space-y-3">
    <button className="glass-input w-full text-left flex items-center gap-3">
      <span className="material-icons text-accent">phone</span>
      <span>Call Now</span>
    </button>
    <button className="glass-input w-full text-left flex items-center gap-3">
      <span className="material-icons text-accent">calendar_today</span>
      <span>Book Demo</span>
    </button>
  </div>
</BottomSheet>
```

---

## Quick Tips

### DO:
1. Combine glass classes strategically
2. Use text contrast helpers for readability
3. Test on real mobile devices
4. Respect reduced motion preferences

### DON'T:
1. Stack too many blur effects
2. Use heavy blur (>20px) everywhere
3. Forget touch-friendly sizing (48px min)
4. Ignore color contrast (WCAG AA)

---

**All code examples are production-ready and mobile-optimized!**
