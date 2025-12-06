# Use Cases Page - Visual Design Reference

## Color System by Industry

```
HEALTHCARE & MEDICAL
├── Gradient: Cyan → Blue → Purple
├── Icon Background: from-cyan-500 to-blue-500
├── Primary Color: Cyan (#00C9FF)
└── Use Case: Medical, Dental, Veterinary

HOME SERVICES
├── Gradient: Gold → Orange → Red
├── Icon Background: from-gold to-orange-500
├── Primary Color: Gold (#D4AF37)
└── Use Case: HVAC, Plumbing, Electrical

LEGAL SERVICES
├── Gradient: Purple → Indigo → Blue
├── Icon Background: from-purple-500 to-indigo-500
├── Primary Color: Purple (#8B5CF6)
└── Use Case: Law Firms, Attorneys

REAL ESTATE
├── Gradient: Green → Emerald → Teal
├── Icon Background: from-green-500 to-emerald-500
├── Primary Color: Green (#10B981)
└── Use Case: Agents, Property Management

AUTOMOTIVE
├── Gradient: Red → Orange → Yellow
├── Icon Background: from-red-500 to-orange-500
├── Primary Color: Red (#EF4444)
└── Use Case: Dealerships, Repair Shops

RESTAURANTS & HOSPITALITY
├── Gradient: Pink → Rose → Red
├── Icon Background: from-pink-500 to-rose-500
├── Primary Color: Pink (#EC4899)
└── Use Case: Restaurants, Hotels, Catering

FITNESS & WELLNESS
├── Gradient: Lime → Green → Emerald
├── Icon Background: from-lime-500 to-green-500
├── Primary Color: Lime (#84CC16)
└── Use Case: Gyms, Yoga Studios, Trainers

FINANCIAL SERVICES
├── Gradient: Blue → Cyan → Teal
├── Icon Background: from-blue-500 to-cyan-500
├── Primary Color: Blue (#3B82F6)
└── Use Case: Mortgage, Insurance, Investment
```

---

## Typography Hierarchy

```
HERO HEADLINE (text-hero-xl)
├── Font: Bricolage Grotesque
├── Size: clamp(3rem, 12vw, 7rem)
├── Weight: 800 (Extra Bold)
├── Tracking: -0.04em (Tight)
└── Line Height: 0.95

SECTION HEADLINES (text-display-lg)
├── Font: Bricolage Grotesque
├── Size: clamp(2rem, 6vw, 3.75rem)
├── Weight: 700 (Bold)
├── Tracking: -0.025em
└── Line Height: 1.1

CARD TITLES
├── Font: Space Grotesk
├── Size: text-2xl (1.5rem)
├── Weight: 700 (Bold)
└── Color: White

BODY TEXT
├── Font: Inter
├── Size: text-base (1rem) or text-lg (1.125rem)
├── Weight: 400 (Regular)
└── Color: white/70 (70% opacity)
```

---

## Card Design Patterns

### Industry Card (Default State)
```
┌─────────────────────────────────┐
│ ╔═══════════════╗               │ ← Top shine (via-white/40)
│ ║  [ICON]       ║               │
│ ║   Gradient    ║               │ Glass Background:
│ ║   64x64       ║               │ from-white/12 → to-white/3
│ ╚═══════════════╝               │
│                                 │ Border: border-white/10
│ Healthcare & Medical            │
│                                 │ Backdrop Blur: 24px
│ ✓ Use case bullet point 1      │
│ ✓ Use case bullet point 2      │ Text: white (title)
│ ✓ Use case bullet point 3      │       white/70 (body)
│                                 │
│ ┌─────────────────────┐        │
│ │ ↗ 42% more appts    │        │ ← Stat badge
│ └─────────────────────┘        │
│                                 │
│ Learn More →                    │
└─────────────────────────────────┘
```

### Industry Card (Hover State)
```
┌─────────────────────────────────┐
│ ╔═══════════════╗ ← Glow       │ ← Top shine (stronger)
│ ║  [ICON]       ║               │
│ ║   Gradient    ║ Scale: 1.1    │ Gradient Overlay ACTIVE:
│ ║   64x64       ║               │ from-cyan/20 → purple/20
│ ╚═══════════════╝               │
│                                 │ Border: border-white/20
│ Healthcare & Medical ← Gradient │
│                                 │ Transform: translateY(-8px)
│ ✓ Use case bullet point 1      │
│ ✓ Use case bullet point 2      │ Shadow: 0 20px 60px black/40
│ ✓ Use case bullet point 3      │
│                                 │
│ ┌─────────────────────┐        │
│ │ ↗ 42% more appts    │        │
│ └─────────────────────┘        │
│                                 │
│ Learn More →→→ ← Animated      │
└─────────────────────────────────┘
      ═══════════════════════════   ← Bottom glow (cyan/50)
```

---

## Animation Timings

```
SCROLL ANIMATIONS (whileInView)
├── Duration: 0.6s
├── Delay: Staggered by 0.1s per item
├── Easing: Default (ease-out)
└── Viewport: { once: true }

HOVER ANIMATIONS (whileHover)
├── translateY: -8px
├── Scale: 1.02 - 1.1 (context dependent)
├── Duration: 0.3s - 0.5s
└── Easing: ease-out

GRADIENT ORBS (background)
├── Scale: [1, 1.2, 1]
├── Rotate: [0, 90, 0]
├── Duration: 12s - 30s
├── Repeat: Infinity
└── Easing: easeInOut

CAROUSEL TRANSITIONS
├── Enter: opacity 0→1, x: 100→0
├── Exit: opacity 1→0, x: 0→-100
├── Duration: 0.5s
└── Auto-rotate: 5s interval
```

---

## Responsive Breakpoints

```
MOBILE (< 640px)
├── Grid: 1 column
├── Typography: Minimum clamp values
├── Padding: p-4
├── Icons: 14px (w-14 h-14)
└── Animations: Reduced/disabled

TABLET (640px - 1024px)
├── Grid: 2 columns
├── Typography: Mid-range clamp values
├── Padding: p-6
├── Icons: 16px (w-16 h-16)
└── Animations: Partial

DESKTOP (> 1024px)
├── Grid: 4 columns
├── Typography: Maximum clamp values
├── Padding: p-8
├── Icons: Full size with rotation
└── Animations: Full suite
```

---

## Interactive States

### Button States
```
PRIMARY (Gold Gradient)
├── Default: bg-gradient-to-r from-gold to-gold
├── Hover: shadow-[0_0_60px_gold/50], scale: 1.02
├── Active: scale: 0.98
└── Focus: ring-2 ring-gold/50

SECONDARY (Glass)
├── Default: bg-white/10, border-white/20
├── Hover: bg-white/15, border-white/30, shadow-glow
├── Active: scale: 0.98
└── Focus: ring-2 ring-cyan/50
```

### Card States
```
INDUSTRY CARD
├── Default: border-white/10
├── Hover: border-white/20, translateY(-8px)
├── Active: scale: 0.99
└── Focus: ring-2 ring-accent/50

TESTIMONIAL CARD
├── Current: Visible, scale: 1
├── Entering: opacity 0→1, x: 100→0
├── Exiting: opacity 1→0, x: 0→-100
└── Duration: 0.5s
```

---

## Spacing System

```
SECTION PADDING
├── Mobile: py-24 (6rem)
├── Tablet: py-28 (7rem)
├── Desktop: py-32 (8rem)
└── Between sections: 0 (handled by section padding)

CONTAINER PADDING
├── Mobile: px-4 (1rem)
├── Tablet: px-6 (1.5rem)
└── Desktop: px-8 (2rem)

CARD PADDING
├── Mobile: p-6 (1.5rem)
├── Tablet: p-8 (2rem)
└── Desktop: p-8 (2rem)

GRID GAPS
├── Mobile: gap-4 (1rem)
├── Tablet: gap-6 (1.5rem)
└── Desktop: gap-8 (2rem)
```

---

## Background Layers (Z-Index)

```
HERO SECTION
├── z-[-10]: External glow effects
├── z-0: Aurora animated background
├── z-1: Gradient orbs (top-left, bottom-right, center)
├── z-2: Grid pattern overlay
├── z-3: Noise texture overlay
└── z-10: Content (text, buttons, images)

SECTION BACKGROUNDS
├── z-0: Base gradient (from-bg via-bg-dark to-bg)
├── z-1: Mesh pattern (bg-mesh-premium)
├── z-2: Floating orbs (top-1/4, bottom-1/4)
└── z-10: Content
```

---

## Glass Morphism Variants

```
.glass-premium
├── Background: from-white/8 → to-white/2
├── Border: 2px border-white/20
├── Backdrop Blur: 16px
├── Shadow: xl (large shadow)
└── Use Case: Industry cards, testimonials

.glass-3d
├── Background: from-white/12 → to-white/6
├── Border: 2px border-white/20
├── Backdrop Blur: 24px
├── Shadow: [0_8px_32px_black/20, inset_0_1px_1px_white/10]
├── Top Shine: bg-gradient-to-b from-white/8
└── Use Case: Hero floating cards (desktop only)

.glass (basic)
├── Background: white/5
├── Border: 1px border-white/10
├── Backdrop Blur: 10px
└── Use Case: Badges, small elements
```

---

## Icon System

### Material Icons Used
```
HERO & NAVIGATION
├── business_center: Industry badge
├── rocket_launch: CTA badge
└── arrow_forward: CTA buttons (animated)

INDUSTRY ICONS
├── medical_services: Healthcare
├── home_repair_service: Home Services
├── gavel: Legal
├── apartment: Real Estate
├── directions_car: Automotive
├── restaurant: Hospitality
├── fitness_center: Fitness
└── account_balance: Financial

BENEFIT ICONS
├── schedule: 24/7 Availability
├── speed: Instant Response
├── verified: Lead Qualification
└── integration_instructions: CRM Integration

STATUS ICONS
├── check_circle: Use case bullets, solutions
├── cancel: Problems (old way)
├── trending_up: Growth stats
└── star: Ratings

SOCIAL PROOF
├── verified: Active clients
├── star: Ratings
└── trending_up: ROI metrics
```

---

## Gradient Recipes

### Hero Headline Gradient
```css
background: linear-gradient(to right,
  #D4AF37,  /* Gold */
  #00C9FF,  /* Cyan */
  #8B5CF6   /* Purple */
);
background-clip: text;
-webkit-background-clip: text;
color: transparent;
```

### Primary Button Gradient
```css
background: linear-gradient(to right,
  #D4AF37,       /* Gold */
  #E7C96F,       /* Gold Light */
  #D4AF37        /* Gold */
);
```

### Aurora Background (Animated)
```css
background: radial-gradient(
  ellipse at top,
  rgba(0, 201, 255, 0.15),    /* Cyan */
  rgba(79, 70, 229, 0.1),     /* Indigo */
  rgba(139, 92, 246, 0.1),    /* Purple */
  rgba(212, 175, 55, 0.05)    /* Gold */
);
animation: gradientShift 20s ease infinite;
```

### Mesh Pattern
```css
background-image:
  radial-gradient(at 27% 37%, rgba(74, 105, 226, 0.2) 0px, transparent 50%),
  radial-gradient(at 97% 21%, rgba(0, 201, 255, 0.15) 0px, transparent 50%),
  radial-gradient(at 52% 99%, rgba(74, 105, 226, 0.12) 0px, transparent 50%);
```

---

## Accessibility Features

### Color Contrast
```
WHITE TEXT ON DARK BACKGROUND
├── Foreground: #FFFFFF (white)
├── Background: #0F172A (navy)
├── Contrast Ratio: 15.3:1
└── WCAG Level: AAA ✅

GOLD TEXT ON DARK BACKGROUND
├── Foreground: #D4AF37 (gold)
├── Background: #0F172A (navy)
├── Contrast Ratio: 6.2:1
└── WCAG Level: AA ✅

CYAN TEXT ON DARK BACKGROUND
├── Foreground: #00C9FF (cyan)
├── Background: #0F172A (navy)
├── Contrast Ratio: 7.8:1
└── WCAG Level: AAA ✅
```

### Focus States
```
KEYBOARD NAVIGATION
├── Focus Ring: ring-2
├── Ring Color: ring-accent/50 or ring-gold/50
├── Ring Offset: ring-offset-2
└── Ring Offset Color: ring-offset-background
```

### Motion Preferences
```
REDUCED MOTION SUPPORT
├── Disable: Parallax effects
├── Disable: Continuous animations
├── Keep: Transition animations (short duration)
└── Keep: User-triggered animations (hover, click)
```

---

## Performance Optimizations

### GPU Acceleration
```css
/* Force GPU compositing */
transform: translateZ(0);
will-change: transform;

/* Used on: */
- Animated gradient orbs
- Hover lift effects
- Parallax scrolling elements
```

### Lazy Loading Strategy
```
ABOVE THE FOLD
├── Hero section: Immediate load
├── Industry icons: Immediate load
└── Critical CSS: Inlined

BELOW THE FOLD
├── Testimonial images: Lazy load
├── Industry cards: Load on scroll
└── CTA section: Load on scroll
```

### Animation Performance
```
MOBILE DEVICES
├── Detect: window.innerWidth < 768
├── Disable: Complex animations
├── Disable: Parallax effects
├── Keep: Simple transitions
└── Keep: User-triggered interactions

PREFER-REDUCED-MOTION
├── Disable: All continuous animations
├── Disable: Parallax effects
├── Keep: Essential transitions
└── Duration: Reduce to 0.01s
```

---

## Component Reusability

### Pattern: Industry Card
```typescript
// Can be extracted to component
<IndustryCard
  industry={industry}
  gradient={gradient}
  icon={icon}
  useCases={useCases}
  stat={stat}
  color={color}
/>
```

### Pattern: Testimonial Card
```typescript
// Can be extracted to component
<TestimonialCard
  quote={quote}
  author={author}
  role={role}
  industry={industry}
  avatar={avatar}
  metric={metric}
/>
```

### Pattern: Benefit Card
```typescript
// Can be extracted to component
<BenefitCard
  icon={icon}
  title={title}
  description={description}
/>
```

---

## Testing Scenarios

### Visual Regression
```
COMPARE:
├── Desktop: 1920x1080, 1366x768
├── Tablet: 1024x768, 768x1024
├── Mobile: 375x667, 414x896
└── Large: 2560x1440

CHECK:
├── Layout shifts
├── Text overflow
├── Image scaling
├── Button sizing
└── Grid alignment
```

### Interaction Testing
```
USER FLOWS:
1. Scroll through all sections
2. Hover each industry card
3. Navigate testimonial carousel
4. Click all CTAs
5. Test keyboard navigation
6. Test with screen reader
```

### Performance Testing
```
LIGHTHOUSE TARGETS:
├── Performance: 90+
├── Accessibility: 95+
├── Best Practices: 95+
└── SEO: 100

CORE WEB VITALS:
├── LCP: < 2.5s (Largest Contentful Paint)
├── FID: < 100ms (First Input Delay)
└── CLS: < 0.1 (Cumulative Layout Shift)
```

---

## Design Inspiration Sources

This page draws from:
- **Apple.com:** Clean layouts, bold typography, product showcasing
- **Stripe.com:** Gradient usage, glass morphism, developer-focused
- **Linear.app:** Dark mode, subtle animations, premium feel
- **Vercel.com:** Editorial typography, asymmetry, contrast
- **Notion.so:** Card-based layouts, color systems, clarity

**Result:** A unique blend that's distinctly Capture Client—not copying any single source.

---

**Last Updated:** December 4, 2025
**Status:** Visual Reference Complete ✅
**Use:** Design handoff, QA testing, future enhancements
