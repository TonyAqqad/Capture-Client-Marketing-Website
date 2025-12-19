# Typography System - Quick Start Guide

## Import Components

```tsx
import {
  HeroHeadline,
  SectionHeadline,
  Subheadline,
  Eyebrow,
  GoldGradientText,
  CyanGradientText,
  PremiumBody
} from '@/components/ui/Typography';
```

## 5-Second Examples

### Hero Section
```tsx
<HeroHeadline>
  Never Miss <GoldGradientText>Another Client</GoldGradientText>
</HeroHeadline>
```

### Section Header
```tsx
<SectionHeadline className="text-center mb-6">
  How It Works
</SectionHeadline>
```

### With Eyebrow
```tsx
<Eyebrow>Featured Solution</Eyebrow>
<SectionHeadline>AI Voice Agents</SectionHeadline>
```

### Body Text
```tsx
<PremiumBody className="mb-4">
  Your important paragraph text here.
</PremiumBody>
```

## Tailwind Utilities

### Fluid Hero Sizes
```tsx
<h1 className="text-hero-xl">       // 3rem → 5rem
<h1 className="text-hero-lg">       // 2.5rem → 4rem
<h1 className="text-hero-md">       // 2rem → 3rem
<h1 className="text-hero-sm">       // 1.75rem → 2.5rem
```

### Fluid Body Sizes
```tsx
<p className="text-body-xl">        // 1.25rem → 1.5rem
<p className="text-body-lg">        // 1.125rem → 1.25rem
<p className="text-body-md">        // 1rem → 1.125rem
<p className="text-body-sm">        // 0.875rem → 1rem
```

## CSS Utilities

### Premium Link
```tsx
<a href="/contact" className="link-premium text-accent">
  Book Your Demo
</a>
```

### Text Depth
```tsx
<h1 className="text-hero-xl text-depth-premium">
  Luxury Headline
</h1>
```

### Text Balance
```tsx
<h1 className="text-hero-xl text-balance">
  Better Headline Wrapping
</h1>
```

## Common Patterns

### Hero with Everything
```tsx
<section className="min-h-screen flex items-center">
  <div className="max-w-4xl mx-auto text-center">
    <Eyebrow>AI Technology</Eyebrow>

    <HeroHeadline className="mb-6">
      Never Miss <GoldGradientText>Another Client</GoldGradientText>
    </HeroHeadline>

    <Subheadline className="mb-8">
      AI agents that work 24/7
    </Subheadline>

    <a href="/contact" className="btn-gold">Book Demo</a>
  </div>
</section>
```

### Feature Section
```tsx
<section className="section">
  <SectionHeadline className="text-center mb-6">
    Powered by <CyanGradientText>Advanced AI</CyanGradientText>
  </SectionHeadline>

  <PremiumBody className="text-center mb-12 max-w-3xl mx-auto">
    Our AI voice agents understand natural language.
  </PremiumBody>

  {/* Feature cards */}
</section>
```

## Mobile Scaling

All sizes scale smoothly:
- Mobile (375px): Smaller
- Tablet (768px): Medium
- Desktop (1440px+): Maximum

**Example**:
- `text-hero-xl`: 48px → 64px → 80px (smooth scaling)

## That's It!

You're ready to use premium typography. For full documentation, see:
`capture-client-site/TYPOGRAPHY_SYSTEM_UPGRADE_COMPLETE.md`
