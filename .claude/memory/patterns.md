# Patterns (lean)

## Gold Standards (copy patterns)
- Home Services: `capture-client-site/src/app/industries/home-services/page.tsx`
- Legal: `capture-client-site/src/app/industries/legal/LegalIndustryClient.tsx`
- Homepage: `capture-client-site/src/app/page.tsx`

## Required classes / styling
- Cards: `glass-premium` / `glass-card` / `glass`
- Buttons: `btn-gold`, `btn-ghost`; width `w-full sm:w-auto`
- Containers/padding: `container-custom` + `px-4 sm:px-6 lg:px-8`
- Text gradients: `text-gradient-gold-cyan`, `text-gradient-premium`
- Backgrounds: `bg-background-dark`, `bg-background`, `bg-aurora-animated`, `bg-mesh(-premium)`
- Z-index: content over backgrounds needs `relative z-10`

## Responsive patterns
- Flex: `flex flex-col md:flex-row gap-4`
- Grid: `grid md:grid-cols-2 lg:grid-cols-3 gap-6`
- Headings/text scale: e.g., `text-display-md` / `text-lg sm:text-xl lg:text-2xl`

## Motion / animation
- Import: `import { motion } from "@/lib/motion";` (never from `framer-motion`)
- Scroll animations include `viewport={{ once: true }}`
- Standard fade-up: `initial {{opacity:0,y:20}}` → `whileInView {{opacity:1,y:0}}`
- Stagger: `transition {{ delay: index * 0.1 }}`

## Metadata template (short)
```tsx
export const metadata = {
  title: "Page Title | Capture Client",
  description: "150-160 chars",
  openGraph: { title, description, url, siteName: "Capture Client", type: "website" },
  twitter: { card: "summary_large_image", title, description },
  alternates: { canonical: "https://captureclientai.net/path" },
};
```

## Canonical Components (use these, don't create duplicates)

### Forms
- `LeadCaptureForm` - General 5-field form (Contact, Pricing, Services pages)
- `OptimizedLeadForm` - 3-field multi-step form (Locations, Final CTA) - supports optional email

### Heroes
- `PremiumHero` - Homepage only (particles, parallax, aurora orbs)
- `ServiceHero` - Service/industry pages (props-driven, themeable)

### CTAs
- `PremiumFinalCTA` - Homepage final CTA with embedded form

### Calculators
- `RealEstateROICalculator` - Real estate industry page only (specialized)

### Cards
- `GlassCard` - General purpose (15+ usages across site)
- `PremiumGlassCard` - Slot-based layouts (header/body/footer)

### CRO Components
- `ExitIntentPopup` - Exit intent modal (homepage via dynamic import)
- `InteractiveAIDemo` - Live chat demo (homepage via dynamic import)

### Testimonials
- `PremiumTestimonials` - Grid layout (standard)
- `TestimonialsCarousel` - Carousel/slider layout

### Integration Partners
- `IntegrationPartners` - Partner logo grid (homepage and feature pages)

## Homepage Design System ($100B Linear/Stripe Aesthetic)

### Background System
- **Base**: Deep space black `#030303` or `bg-[#030303]`
- **Mesh gradients**: Using radial gradients with cyan (#00C9FF) and indigo (#4A69E2)
- **Example**:
```tsx
backgroundImage: `
  radial-gradient(ellipse 80% 80% at 20% 20%, #00C9FF10 0%, transparent 50%),
  radial-gradient(ellipse 80% 80% at 80% 80%, #4A69E210 0%, transparent 50%)
`
```

### Typography
- **Font**: Bricolage Grotesque via `style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}`
- **Editorial weight contrast**: Light (200) → Bold (800)
- **Pattern**:
```tsx
<span className="font-extralight" style={{ fontWeight: 200 }}>Light text </span>
<span className="font-extrabold" style={{ fontWeight: 800 }}>Bold text</span>
```

### Glass Morphism
```tsx
className="border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl"
```

### Color Palette (NO PURPLE)
- Cyan: `#00C9FF`
- Indigo: `#4A69E2`
- White at various opacities: `text-white/40`, `text-white/60`, `text-white/80`
- Gradients: `bg-gradient-to-r from-[#00C9FF] to-[#4A69E2]`

### Motion
- Import: `import { motion } from "@/lib/motion";`
- Standard easing: `[0.22, 1, 0.36, 1]`
- Duration: 0.5-0.7s for entrances

### Section Labels
```tsx
<p className="text-xs font-medium uppercase tracking-[0.25em] text-white/40 mb-6">
  Section Label
</p>
```

### Transformed Components (use as reference)
- PricingCards.tsx
- PremiumHero.tsx
- PremiumFAQ.tsx
- PremiumStats.tsx
- ComparisonTable.tsx
- Footer.tsx

## Do / Don't
- Do reuse existing components/patterns before adding new.
- Do check canonical components list before creating new ones.
- Do keep server/client split for SEO (metadata in server page).
- Don't hardcode colors; use theme classes.
- Don't invent new button/glass styles.
- Don't skip mobile checks (375px) and desktop (1440px).
