# Mobile Typography & Color Quick Reference
## Copy-Paste Code Examples for Capture Client

---

## 1. Typography Classes - Quick Copy

### Before/After Fixes

```tsx
// ❌ BEFORE: Too small on mobile
<p className="text-[10px] sm:text-xs text-foreground-muted">
  Badge Text
</p>

// ✅ AFTER: Readable on mobile (14px minimum)
<p className="text-mobile-xs sm:text-xs text-foreground-muted-mobile">
  Badge Text
</p>
```

```tsx
// ❌ BEFORE: Generic sizing
<h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold">
  Stop Losing Leads to Voicemail
</h1>

// ✅ AFTER: Optimized mobile hierarchy
<h1 className="text-mobile-display sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-heading-tight">
  <span className="block text-white">Stop Losing Leads</span>
  <span className="block text-gradient-warm">to Voicemail</span>
</h1>
```

```tsx
// ❌ BEFORE: Poor mobile readability
<p className="text-base text-foreground-muted">
  Long paragraph with default line height.
</p>

// ✅ AFTER: Enhanced readability
<p className="text-mobile-base text-readable text-foreground-mobile">
  Long paragraph with optimized line height for comfortable mobile reading.
</p>
```

---

## 2. Button Styles - Enhanced

```tsx
// ✅ PRIMARY: Warm gradient (teal → amber)
<button className="btn-primary-enhanced touch-target-enhanced">
  <span className="relative z-10">Watch Demo</span>
  <span className="material-icons ml-2">play_circle_outline</span>
</button>

// ✅ SECONDARY: Glass with teal border
<button className="btn-secondary-enhanced touch-target-enhanced">
  Learn More
</button>

// ✅ GHOST: Minimal amber accent
<button className="btn-ghost-enhanced touch-target-enhanced">
  Contact Us
</button>
```

---

## 3. Glass Card Components

```tsx
// ✅ TEAL ACCENT GLASS CARD
<div className="glass-card-mobile-enhanced p-6 sm:p-8">
  <h3 className="text-mobile-h3 text-glass-mobile mb-4">
    AI Voice Agents
  </h3>
  <p className="text-mobile-base text-readable text-foreground-muted-mobile">
    Never miss a call. AI answers 24/7, qualifies leads, and books appointments.
  </p>
</div>

// ✅ WARM AMBER GLASS CARD
<div className="glass-card-warm-mobile p-6 sm:p-8">
  <h3 className="text-mobile-h3 text-glass-mobile mb-4">
    Lead Generation
  </h3>
  <p className="text-mobile-base text-readable text-foreground-muted-mobile">
    Facebook & Google Ads managed by experts. Pay-per-qualified-lead pricing.
  </p>
</div>

// ✅ PRIMARY SAPPHIRE GLASS CARD
<div className="glass-card-primary-mobile p-6 sm:p-8">
  <h3 className="text-mobile-h3 text-glass-mobile mb-4">
    CRM & Dashboard
  </h3>
  <p className="text-mobile-base text-readable text-foreground-muted-mobile">
    Unified platform. Track campaigns, manage leads, analyze performance.
  </p>
</div>
```

---

## 4. Form Inputs

```tsx
// ✅ ENHANCED GLASS INPUT
<input
  type="text"
  placeholder="Your name"
  className="glass-input-mobile-enhanced w-full"
/>

<input
  type="email"
  placeholder="your@email.com"
  className="glass-input-mobile-enhanced w-full"
/>

// ✅ ENHANCED TEXTAREA
<textarea
  placeholder="Tell us about your business..."
  className="glass-textarea-mobile-enhanced w-full"
  rows={4}
/>
```

---

## 5. Badges & Tags

```tsx
// ✅ TEAL BADGE
<span className="badge-mobile-teal">
  <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
  AI-Powered
</span>

// ✅ AMBER BADGE (Warm accent)
<span className="badge-mobile-amber">
  <span className="material-icons text-sm">local_fire_department</span>
  Hot Offer
</span>

// ✅ PRIMARY BADGE
<span className="badge-mobile-primary">
  <span className="material-icons text-sm">verified</span>
  Trusted
</span>
```

---

## 6. Headings with Style

```tsx
// ✅ GRADIENT HEADING
<h2 className="heading-mobile-gradient text-mobile-h2 mb-4">
  Transform Your Business
</h2>

// ✅ HEADING WITH WARM UNDERLINE
<h2 className="heading-mobile-warm text-mobile-h2 mb-8">
  Why Choose Us
</h2>

// ✅ EYEBROW + HEADING COMBO
<div>
  <p className="eyebrow-mobile mb-2">Our Services</p>
  <h2 className="text-mobile-h2 text-heading-tight text-foreground-mobile-bright">
    Everything You Need to <span className="text-gradient-warm">Grow</span>
  </h2>
</div>

// ✅ EYEBROW WITH AMBER ACCENT
<div>
  <p className="eyebrow-mobile-amber mb-2">Limited Time</p>
  <h2 className="text-mobile-h2 text-heading-tight text-foreground-mobile-bright">
    Special Offer Ends Soon
  </h2>
</div>
```

---

## 7. Text Gradients

```tsx
// ✅ THREE-COLOR GRADIENT (Sapphire → Teal → Amber)
<h1 className="text-gradient-enhanced text-mobile-display">
  Premium AI Solutions
</h1>

// ✅ WARM GRADIENT (Teal → Amber)
<h2 className="text-gradient-warm text-mobile-h2">
  Capture More Leads
</h2>

// ✅ COOL GRADIENT (Sapphire → Teal)
<h2 className="text-gradient-cool text-mobile-h2">
  Advanced Technology
</h2>

// ✅ AMBER GRADIENT (Pure warmth)
<span className="text-gradient-amber text-mobile-lg font-semibold">
  Limited Spots Available
</span>
```

---

## 8. Section Backgrounds

```tsx
// ✅ PREMIUM ENHANCED MESH (3 colors)
<section className="relative overflow-hidden bg-background-dark">
  <div className="absolute inset-0 bg-mesh-premium-enhanced" />
  <div className="relative z-10 container-mobile-safe section-mobile-breathable">
    {/* Content */}
  </div>
</section>

// ✅ WARM MESH (Amber-focused)
<section className="relative overflow-hidden bg-background-dark">
  <div className="absolute inset-0 bg-mesh-warm" />
  <div className="relative z-10 container-mobile-safe section-mobile-breathable">
    {/* Content */}
  </div>
</section>

// ✅ COOL MESH (Sapphire-focused)
<section className="relative overflow-hidden bg-background-dark">
  <div className="absolute inset-0 bg-mesh-cool" />
  <div className="relative z-10 container-mobile-safe section-mobile-breathable">
    {/* Content */}
  </div>
</section>
```

---

## 9. Glow Effects

```tsx
// ✅ AMBER GLOW (CTAs)
<button className="btn-primary-enhanced glow-amber">
  Book Demo
</button>

// ✅ TEAL GLOW (Accent elements)
<div className="glass-card-mobile-enhanced glow-teal p-6">
  <h3>Featured Service</h3>
</div>

// ✅ DUAL-COLOR GLOW (Premium)
<div className="glass-card-mobile-enhanced glow-dual p-8">
  <h3>Premium Package</h3>
</div>

// ✅ PRIMARY SAPPHIRE GLOW
<div className="glass-card-primary-mobile glow-primary-enhanced p-6">
  <h3>Enterprise Solution</h3>
</div>
```

---

## 10. Complete Component Examples

### Service Card (Premium Glass)

```tsx
<div className="glass-card-mobile-enhanced p-6 sm:p-8 hover:glow-teal transition-all duration-300">
  {/* Icon */}
  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 border border-accent/20 flex items-center justify-center mb-4">
    <span className="material-icons text-accent-mobile text-2xl">phone_in_talk</span>
  </div>

  {/* Badge */}
  <span className="badge-mobile-teal mb-4">
    <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
    AI-Powered
  </span>

  {/* Heading */}
  <h3 className="text-mobile-h3 text-glass-mobile mb-3">
    Voice AI Agents
  </h3>

  {/* Description */}
  <p className="text-mobile-base text-readable text-foreground-muted-mobile mb-6">
    AI voice agents answer calls 24/7, qualify leads, and book appointments automatically. Never miss another opportunity.
  </p>

  {/* CTA */}
  <button className="btn-secondary-enhanced w-full">
    Learn More
    <span className="material-icons ml-2">arrow_forward</span>
  </button>
</div>
```

### Hero Section (Enhanced)

```tsx
<section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background-dark">
  {/* Background */}
  <div className="absolute inset-0 bg-mesh-premium-enhanced" />

  {/* Content */}
  <div className="relative z-10 container-mobile-safe section-mobile-breathable text-center">
    {/* Eyebrow */}
    <p className="eyebrow-mobile mb-4">
      The Future of Lead Capture
    </p>

    {/* Headline */}
    <h1 className="text-mobile-display sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-heading-ultra-tight mb-6">
      <span className="block text-foreground-mobile-bright">Stop Losing Leads</span>
      <span className="block text-gradient-warm">to Voicemail</span>
    </h1>

    {/* Subheading */}
    <p className="text-mobile-lg text-readable text-foreground-muted-mobile max-w-2xl mx-auto mb-8">
      AI voice agents answer every call, qualify leads, and book appointments—while you focus on running your business.
    </p>

    {/* CTA Group */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <button className="btn-primary-enhanced glow-amber w-full sm:w-auto">
        <span className="relative z-10">Watch Demo</span>
        <span className="material-icons ml-2">play_circle_outline</span>
      </button>
      <button className="btn-secondary-enhanced w-full sm:w-auto">
        <span className="material-icons mr-2">phone</span>
        (865) 346-3339
      </button>
    </div>

    {/* Social Proof */}
    <div className="mt-12 flex items-center justify-center gap-8 flex-wrap">
      <div className="text-center">
        <p className="text-mobile-h3 text-gradient-warm font-bold">500+</p>
        <p className="text-mobile-xs text-foreground-muted-mobile uppercase tracking-wider">Businesses</p>
      </div>
      <div className="text-center">
        <p className="text-mobile-h3 text-gradient-cool font-bold">4.9/5</p>
        <p className="text-mobile-xs text-foreground-muted-mobile uppercase tracking-wider">Rating</p>
      </div>
      <div className="text-center">
        <p className="text-mobile-h3 text-gradient-enhanced font-bold">24/7</p>
        <p className="text-mobile-xs text-foreground-muted-mobile uppercase tracking-wider">Available</p>
      </div>
    </div>
  </div>
</section>
```

### CTA Section (Warm Accent)

```tsx
<section className="relative overflow-hidden bg-background-dark">
  {/* Background */}
  <div className="absolute inset-0 bg-mesh-warm" />

  {/* Content */}
  <div className="relative z-10 container-mobile-safe section-mobile-breathable">
    <div className="glass-card-warm-mobile glow-amber p-8 sm:p-12 text-center">
      {/* Badge */}
      <span className="badge-mobile-amber inline-flex mb-6">
        <span className="material-icons text-sm">local_fire_department</span>
        Limited Time Offer
      </span>

      {/* Heading */}
      <h2 className="heading-mobile-warm text-mobile-h2 mb-4">
        Ready to Transform Your Lead Generation?
      </h2>

      {/* Description */}
      <p className="text-mobile-lg text-readable text-foreground-muted-mobile max-w-2xl mx-auto mb-8">
        Join 500+ businesses using AI to capture and convert more leads. Book your free strategy session today.
      </p>

      {/* CTA */}
      <button className="btn-primary-enhanced glow-amber-strong">
        <span className="relative z-10">Book Free Demo</span>
        <span className="material-icons ml-2">arrow_forward</span>
      </button>

      {/* Trust Signal */}
      <p className="text-mobile-xs text-foreground-subtle-mobile mt-6">
        No credit card required • 14-day money-back guarantee
      </p>
    </div>
  </div>
</section>
```

---

## 11. Color Palette Reference

### Current (Generic "AI Slop")
```
Primary: #4A69E2 (Standard AI blue)
Accent:  #00C9FF (Standard tech cyan)
Result:  Looks like 100+ other AI startups
```

### Enhanced (Distinctive Premium)
```
Primary: #1E3A8A (Deep sapphire - sophisticated)
Accent:  #06B6D4 (Electric teal - less neon)
Warm:    #F59E0B (Amber - adds human warmth)
Result:  Unique, memorable, premium feel
```

---

## 12. Installation Steps

### Step 1: Add Enhanced CSS
```bash
# The file is already created at:
# src/app/mobile-typography-enhanced.css
```

### Step 2: Import in Layout
```tsx
// src/app/layout.tsx
import "./globals.css";
import "./globals-mobile-optimized.css";
import "./mobile-typography-enhanced.css"; // ADD THIS LINE
```

### Step 3: Update Tailwind Config (Optional - for color changes)
```typescript
// tailwind.config.ts
colors: {
  primary: {
    DEFAULT: "#1E3A8A", // Change from #4A69E2
    // ... rest of shades
  },
  accent: {
    DEFAULT: "#06B6D4", // Change from #00C9FF
    warm: "#F59E0B", // NEW: Add warm accent
    // ... rest of shades
  },
  // Add amber palette
  amber: {
    DEFAULT: "#F59E0B",
    50: "#FFFBEB",
    // ... full scale
  },
}
```

### Step 4: Fix 10px Badge Text (Critical)
```tsx
// Find all instances of text-[10px] and replace:
// BEFORE: text-[10px]
// AFTER:  text-mobile-xs (14px minimum)
```

---

## 13. Testing Checklist

- [ ] Test on iOS Safari (iPhone 12+)
- [ ] Test on Chrome Android
- [ ] Verify 16px input fields (no zoom)
- [ ] Check contrast ratios (WCAG AA)
- [ ] Test with VoiceOver/TalkBack
- [ ] Verify touch targets (48px minimum)
- [ ] Test in landscape orientation
- [ ] Check safe area insets (iPhone notch)

---

## 14. Common Mistakes to Avoid

❌ **DON'T use text-[10px]** - too small for mobile
✅ **DO use text-mobile-xs** - 14px minimum

❌ **DON'T forget 16px on inputs** - causes iOS zoom
✅ **DO use glass-input-mobile-enhanced** - has 16px

❌ **DON'T use generic blue/cyan everywhere**
✅ **DO mix in warm amber accents** - adds personality

❌ **DON'T forget text shadows on glass**
✅ **DO use text-glass-mobile** - ensures readability

❌ **DON'T use complex gradients on small text**
✅ **DO reserve gradients for headings**

---

## Need Help?

Reference the full report: `MOBILE_TYPOGRAPHY_COLOR_ENHANCEMENT_REPORT.md`

All utility classes are defined in: `src/app/mobile-typography-enhanced.css`
