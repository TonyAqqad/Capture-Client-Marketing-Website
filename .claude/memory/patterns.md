# Patterns (lean)

## Gold Standards (copy patterns)
- Home Services: `capture-client-site/src/app/industries/home-services/page.tsx`
- Legal: `capture-client-site/src/app/industries/legal/LegalIndustryClient.tsx`
- Homepage: `capture-client-site/src/app/page.tsx`

## Brand Colors (Updated 2025-12-16)
- **Blue**: `#2563EB` (blue-600) — Primary brand color for "CAPTURE" in logo
- **Dark Navy**: `#0F172A` (slate-900) — Secondary brand color for "CLIENT" in logo
- **Cyan**: `#17B4EF` — Accent color for highlights and interactive elements
- **Gradient Pattern**: `bg-gradient-to-r from-blue-600 to-cyan-500` for CTAs

## Required classes / styling (LIGHT THEME)
- Backgrounds: `bg-white`, `bg-slate-50`, `bg-gray-50`
- Text: `text-slate-900` (headings), `text-slate-600` (body), `text-slate-500` (muted)
- Cards: `bg-white border border-slate-200` or light glass `bg-white/70 backdrop-blur-xl border-slate-200/60`
- Buttons: `bg-gradient-to-r from-blue-600 to-cyan-500` (primary), `bg-white border-slate-200` (secondary); width `w-full sm:w-auto`
- Containers/padding: `container-custom` + `px-4 sm:px-6 lg:px-8`
- Z-index: content over backgrounds needs `relative z-10`

## NEVER USE (dark theme artifacts - deprecated)
- Dark backgrounds: `bg-slate-900`, `bg-black`, `#030303`, `bg-background-dark`, `bg-background`
- Dark glass: `.glass`, `.glass-premium`, `.glass-card`
- Dark buttons: `btn-gold`, `btn-ghost`
- Dark text: `text-white`, `text-white/80`, `text-gradient-gold-cyan`

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
  alternates: { canonical: "https://captureclient.com/path" },
};
```

## Canonical Components (use these, don't create duplicates)

### Forms
- `LeadCaptureForm` - General 5-field form (Contact, Pricing, Services pages)
- `OptimizedLeadForm` - 3-field multi-step form - **LIGHT THEME VERSION** for use in light sections (PremiumFinalCTA, locations)

### Heroes
- `LightHero` - Homepage hero (light theme with glass morphism)
- `PremiumHero` - Dark themed hero (particles, parallax, aurora orbs)
- `ServiceHero` - Service/industry pages (props-driven, themeable)

## Light Hero Pattern (Homepage Standard)

### Structure
```tsx
<section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
  {/* Background gradient orbs */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl" />
    <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-3xl" />
  </div>

  {/* Content */}
  <div className="container-custom relative z-10">
    {/* Hero content */}
  </div>
</section>
```

### Key Features
- **Background**: `bg-white` or `bg-slate-50`
- **Glass effects**: `backdrop-blur-xl bg-white/70 border border-slate-200/60`
- **Gradient text**: `bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent`
- **Typography**: Bricolage Grotesque via `style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}`
- **Motion**: Import from `@/lib/motion` with `viewport={{ once: true }}`
- **CTA Buttons**: Blue-to-cyan gradient (`from-blue-600 to-cyan-500`)

### Responsive Pattern
- Mobile (375px): Simplified layout, no decorative orbs
- Tablet (768px): Show background gradients
- Desktop (1440px): Full effects with large gradient orbs

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

## ~~LEGACY: Homepage Design System ($100B Linear/Stripe Aesthetic)~~ — DEPRECATED

> **⚠️ DO NOT USE**: This dark theme aesthetic has been replaced by the light theme (2025-12-17).
> Keeping for historical reference only. Use "Light Theme Conversion Patterns" below instead.

<details>
<summary>Archived dark theme patterns (click to expand)</summary>

### Background System (DEPRECATED)
- **Base**: Deep space black `#030303` or `bg-[#030303]`
- **Mesh gradients**: Using radial gradients with cyan (#00C9FF) and indigo (#4A69E2)

### Glass Morphism (DEPRECATED)
```tsx
className="border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl"
```

### Color Palette (DEPRECATED)
- Cyan: `#00C9FF`
- Indigo: `#4A69E2`
- White at various opacities: `text-white/40`, `text-white/60`, `text-white/80`

</details>

### Mobile Trust Badge Pattern
For trust/social proof badges on mobile:
```tsx
// ✅ Correct - Solid backgrounds for readability
className="flex items-center gap-3 px-3 py-2 rounded-full bg-white border border-slate-200 shadow-sm"

// ✅ Correct - Strong contrast text
className="font-semibold text-slate-900 text-xs sm:text-sm"

// ❌ Avoid - Transparent backgrounds on mobile
className="bg-white/60 backdrop-blur-sm" // Poor mobile readability

// ❌ Avoid - Weak text contrast
className="text-slate-800 text-xs" // Not enough contrast on small screens
```

## Light Theme Conversion Patterns

### Dark-to-Light Color Mapping
| Dark Theme | Light Theme |
|------------|-------------|
| `bg-[#030303]` or `bg-background-dark` | `bg-white` or `bg-slate-50` |
| `text-white` | `text-slate-900` |
| `text-white/80` or `text-white/60` | `text-slate-600` |
| `text-white/40` | `text-slate-500` |
| `border-white/10` or `border-white/[0.06]` | `border-slate-200` |
| `bg-white/5` or `bg-white/[0.03]` | `bg-white` or `bg-slate-50` |
| `from-white/[0.08] to-white/[0.02]` | `bg-white/70` or solid `bg-white` |

### Light Glass Morphism
```tsx
// ✅ Correct - Light glass card
className="bg-white/70 backdrop-blur-xl border border-slate-200/60 shadow-lg shadow-slate-900/[0.03]"

// ✅ Correct - Solid light card
className="bg-white border border-slate-200 shadow-lg"

// ❌ Avoid on light pages - Dark glass
className="glass-premium" // Uses bg-white/[0.08]
className="glass" // Uses bg-white/5
```

### Light Theme Button Pattern
```tsx
// ✅ Primary CTA (blue gradient)
className="text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"

// ✅ Secondary/Ghost (light)
className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"

// ❌ Avoid on light pages
className="btn-ghost" // Uses bg-white/5, text-foreground (white)
```

## Do / Don't
- Do reuse existing components/patterns before adding new.
- Do check canonical components list before creating new ones.
- Do keep server/client split for SEO (metadata in server page).
- Don't hardcode colors; use theme classes.
- Don't invent new button/glass styles.
- Don't skip mobile checks (375px) and desktop (1440px).
- Don't use `.glass`, `.glass-premium` on light-themed pages - use inline light glass or `.glass-card-light`.

## Responsive Patterns

### Responsive Spacing Scale
| Element | Mobile (375px) | Tablet (768px) | Desktop (1440px) |
|---------|----------------|----------------|------------------|
| Section padding | `py-12 px-4` | `py-16 px-6` | `py-20 px-8` |
| Card padding | `p-4` | `p-6` | `p-8` |
| Grid gap | `gap-4` | `gap-6` | `gap-8` |
| Hero padding-top | `pt-24` | `pt-32` | `pt-28` (lg) |

### Background Orb Responsive Pattern
For decorative background gradient orbs, use responsive scaling:
```tsx
// Small orb (accent)
className="w-[200px] sm:w-[350px] md:w-[500px] lg:w-[600px] h-[200px] sm:h-[350px] md:h-[500px] lg:h-[600px]"

// Medium orb
className="w-[250px] sm:w-[400px] md:w-[600px] lg:w-[800px] h-[250px] sm:h-[400px] md:h-[600px] lg:h-[800px]"

// Large orb
className="w-[300px] sm:w-[500px] md:w-[700px] lg:w-[1000px] h-[300px] sm:h-[500px] md:h-[700px] lg:h-[1000px]"
```

### Typography Scale (Existing Fluid Typography)
These fluid typography classes already exist and should be used:
- `text-hero-2xl` - Main hero headline only
- `text-hero-xl` - Section headlines
- `text-hero-lg` - Sub-section headlines
- `text-body-lg` - Lead paragraphs
- `text-body-md` - Body text (default)
- `text-body-sm` - Secondary/meta text

### Responsive Hook (NEW)
Import from `@/lib/responsive`:
```tsx
import { useBreakpoint, useIsMobile, useIsDesktop } from '@/lib/responsive';

// Usage
const breakpoint = useBreakpoint(); // 'mobile' | 'tablet' | 'desktop'
const isMobile = useIsMobile();
```

### Container Pattern
Always use `container-custom` class instead of custom max-width:
```tsx
// ✅ Correct
className="container-custom"

// ❌ Avoid
className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8"
```
