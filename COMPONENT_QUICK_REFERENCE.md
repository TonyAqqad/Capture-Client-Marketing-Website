# Component Quick Reference Guide

A fast lookup for which component to use and when.

---

## Card Components

### Question: "I need to display content in a glass-styled card"

**Single simple card?**
→ Use `PremiumGlassCard` with `variant="default"`

```tsx
import { PremiumGlassCard } from "@/components/ui/PremiumGlassCard";

<PremiumGlassCard variant="default">
  <p>Your content here</p>
</PremiumGlassCard>
```

**Card with header/body/footer?**
→ Use `PremiumGlassCard` with slots

```tsx
<PremiumGlassCard
  header={<h3>Title</h3>}
  body={<p>Content</p>}
  footer={<span>Footer</span>}
/>
```

**Card with interactive glow following cursor?**
→ Use `GlowCard`

```tsx
import { GlowCard } from "@/components/ui/GlowCard";

<GlowCard glassEffect={true} interactiveGlow={true}>
  <p>Interactive content</p>
</GlowCard>
```

**Gold accent variant?**
→ Use `PremiumGlassCard` with `variant="gold"`

```tsx
<PremiumGlassCard variant="gold" glowColor="gold">
  <p>Premium gold card</p>
</PremiumGlassCard>
```

---

## Hero Sections

### Question: "I need a hero section"

**Homepage hero?**
→ Use `PremiumHero` (ONLY for homepage)

```tsx
import { PremiumHero } from "@/components/sections/PremiumHero";

<PremiumHero />
```

**Service page hero?**
→ Use `ServiceHero` with data prop

```tsx
import ServiceHero from "@/components/ServiceHero";

<ServiceHero
  service={{ service_name: "AI Voice Agents", service_slug: "voice-ai" }}
  hero={{ headline: "...", subheadline: "..." }}
  stats={[...]}
/>
```

**Industry page hero?**
→ Check the industry-specific page structure, likely uses ServiceHero or custom

---

## Testimonials

### Question: "I need to display testimonials"

**Rotating carousel?**
→ Use `TestimonialsCarousel`

```tsx
import TestimonialsCarousel from "@/components/TestimonialsCarousel";

<TestimonialsCarousel />
```

**Grid layout with featured card?**
→ Use `PremiumTestimonials`

```tsx
import { PremiumTestimonials } from "@/components/sections/PremiumTestimonials";

<PremiumTestimonials />
```

---

## Calculators

### Question: "I need an ROI/calculator component"

**Generic ROI calculator with industry presets?**
→ Use `EnhancedROICalculator` (CANONICAL)

```tsx
import { EnhancedROICalculator } from "@/components/features/EnhancedROICalculator";

<EnhancedROICalculator />
```

**Missed calls focused calculator?**
→ DEPRECATED - Use EnhancedROICalculator instead with preset

**Real estate calculator?**
→ DEPRECATED - Use EnhancedROICalculator instead with real-estate preset

**Avoid**:
- ❌ ROICalculator.tsx (old, basic)
- ❌ MissedCallCalculator.tsx (outdated)
- ❌ RealEstateROICalculator.tsx (redundant)

---

## Feature Cards

### Question: "I need a card to showcase a feature"

**Standard feature card with icon?**
→ Use `FeatureCard`

```tsx
import { FeatureCard } from "@/components/ui/FeatureCard";

<FeatureCard
  icon="bolt"
  title="Fast Setup"
  description="Get running in 48 hours"
  iconColor="primary"
  index={0}
/>
```

**Multiple feature cards in grid?**
→ Use `FeatureGrid` (if exists) or wrap multiple FeatureCard components

---

## CTAs & Forms

### Question: "I need a call-to-action section"

**Final/bottom page CTA with form?**
→ Use `PremiumFinalCTA`

```tsx
import { PremiumFinalCTA } from "@/components/sections/PremiumFinalCTA";

<PremiumFinalCTA />
```

**Simple lead form?**
→ Use `OptimizedLeadForm`

```tsx
import OptimizedLeadForm from "@/components/forms/OptimizedLeadForm";

<OptimizedLeadForm source="page-name" />
```

---

## Buttons

### Question: "I need a button"

**Primary gold CTA?**
→ Use `btn-gold` class

```tsx
<Link href="/contact" className="btn-gold px-8 py-4">
  Get Started
</Link>
```

**Secondary ghost button?**
→ Use `btn-ghost` class

```tsx
<Link href="/demo" className="btn-ghost px-8 py-4">
  Watch Demo
</Link>
```

**Glass button?**
→ Use `btn-glass` class

```tsx
<button className="btn-glass px-8 py-4">
  Learn More
</button>
```

---

## FAQs

### Question: "I need an FAQ section"

**Premium accordion FAQ?**
→ Use `PremiumFAQ`

```tsx
import { PremiumFAQ } from "@/components/sections/PremiumFAQ";

<PremiumFAQ />
```

**Industry-specific FAQ?**
→ Use `IndustryFAQ`

```tsx
import { IndustryFAQ } from "@/components/industries/IndustryFAQ";

<IndustryFAQ industry="legal" />
```

---

## Navigation

### Question: "I need navigation/menu components"

**Main navigation menu?**
→ Use `MegaMenu`

```tsx
import { MegaMenu } from "@/components/navigation/MegaMenu";

<MegaMenu />
```

**Mobile menu variant?**
→ Use `MegaMenuMobile`

**Dropdown for menu?**
→ Use `MegaMenuDropdown`

---

## Stats/Metrics

### Question: "I need to display statistics"

**Animated stats section?**
→ Use `PremiumStats`

```tsx
import { PremiumStats } from "@/components/sections/PremiumStats";

<PremiumStats />
```

**Animated counter component?**
→ Check inside calculators or AnimatedStats

---

## Integration Display

### Question: "I need to show integrations/partners"

**Integrations hero/section?**
→ Use `IntegrationsHero` or `IntegrationsGrid`

```tsx
import { IntegrationsHero } from "@/components/integrations/IntegrationsHero";

<IntegrationsHero />
```

**Integration partners grid?**
→ Use `IntegrationPartnersGrid` or `IntegrationPartners`

**Client logos carousel?**
→ Use `ClientLogosCarousel`

---

## Services Section

### Question: "I need a services overview section"

**Premium services grid?**
→ Use `PremiumServices`

```tsx
import { PremiumServices } from "@/components/sections/PremiumServices";

<PremiumServices />
```

---

## Case Studies

### Question: "I need case studies/social proof"

**Case studies preview?**
→ Use `CaseStudiesPreview`

```tsx
import { CaseStudiesPreview } from "@/components/sections/CaseStudiesPreview";

<CaseStudiesPreview />
```

---

## Decision Tree

```
Need a card?
├─ Simple glass → PremiumGlassCard (variant="default")
├─ Gold variant → PremiumGlassCard (variant="gold")
├─ With slots → PremiumGlassCard (use header/body/footer)
└─ Interactive glow → GlowCard

Need a hero?
├─ Homepage → PremiumHero (ONLY HERE)
└─ Service/industry → ServiceHero

Need testimonials?
├─ Rotating carousel → TestimonialsCarousel
└─ Grid layout → PremiumTestimonials

Need calculator?
└─ ANY → EnhancedROICalculator (canonical)

Need buttons?
├─ Primary CTA → btn-gold
├─ Secondary → btn-ghost
└─ Glass style → btn-glass
```

---

## Common Mistakes to Avoid

1. **Don't create new calculators** - Use EnhancedROICalculator
2. **Don't use GlassCard** - Use PremiumGlassCard instead
3. **Don't modify PremiumHero** - It's optimized for homepage only
4. **Don't hardcode button styles** - Use btn-gold, btn-ghost, btn-glass classes
5. **Don't create new glass-card variants** - Extend PremiumGlassCard
6. **Don't import from framer-motion directly** - Use @/lib/motion

---

## Testing Each Component

After using a component:

```bash
# Check types
pnpm typecheck

# Build test
pnpm build

# Visual test on mobile (375px) and desktop (1440px)
pnpm dev
```

---

Last Updated: 2025-12-06
Generated by Component Finder Agent
