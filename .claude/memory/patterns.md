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

## Do / Don't
- Do reuse existing components/patterns before adding new.
- Do check canonical components list before creating new ones.
- Do keep server/client split for SEO (metadata in server page).
- Don't hardcode colors; use theme classes.
- Don't invent new button/glass styles.
- Don't skip mobile checks (375px) and desktop (1440px).
