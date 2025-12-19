# Premium UI Components - Visual Reference

**Quick visual guide for the anti-AI-slop design system**

---

## Color Palette

### Primary Accents (USE THESE)
```
Gold:    #D4AF37 ████████  Luxury, Premium, CTAs
Cyan:    #00C9FF ████████  Tech, Innovation, Links
Primary: #4A69E2 ████████  Brand Blue, Trust
```

### Industry Colors
```
Healthcare:    Blue   #3B82F6 ████████
Automotive:    Red    #EF4444 ████████
Real Estate:   Green  #22C65E ████████
Legal:         Amber  #F59E0B ████████
Home Services: Orange #F97316 ████████
Restaurant:    Purple #A855F7 ████████
```

### Backgrounds
```
Dark:        #0F172A ████████  Main background
Darker:      #0A0F1C ████████  Deeper sections
Card:        #1E293B ████████  Glass cards base
```

### Text
```
Foreground:       #F8FAFC ████████  Primary text
Foreground Muted: #94A3B8 ████████  Secondary text
Foreground Subtle:#64748B ████████  Tertiary text
```

---

## Typography Scale

```
Display Hero (96px):  █████████████████  "Transform Your Business"
5XL (48px):           ████████████       "Integration Hub"
4XL (36px):           ███████████        "Key Features"
3XL (30px):           ██████████         Section Subheadings
2XL (24px):           █████████          Card Titles
XL (20px):            ████████           Card Subtitles
Base (16px):          ███████            Body Text
SM (15px):            ██████             Small Text
XS (14px):            █████              Captions, Badges
```

---

## Component Anatomy

### PremiumGlassCard

```
┌─────────────────────────────────────┐
│ ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ │ ← Top gradient highlight
│                                     │
│ ┌─────────────────────────────────┐ │
│ │  HEADER SLOT                    │ │ ← Header with border-b
│ │  Title + Badge                  │ │
│ └─────────────────────────────────┘ │
│                                     │
│   BODY SLOT                         │ ← Main content area
│   Content with proper spacing       │
│   and typography hierarchy          │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │  FOOTER SLOT                    │ │ ← Footer with border-t
│ │  CTA Button                     │ │
│ └─────────────────────────────────┘ │
│ ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ │ ← Bottom glow on hover
└─────────────────────────────────────┘
  ↑                                 ↑
  Gradient border              Shadow glow
```

**States:**
- Default: Subtle glass effect
- Hover: Lift (-4px), glow, border color change
- Active: Scale (0.98)

---

### SectionHeader

```
┌────────────────────────────────────────┐
│                                        │
│        ┌──────────────────┐            │
│        │  INTEGRATION HUB │            │ ← Overline (gold badge)
│        └──────────────────┘            │
│                                        │
│     Connect Your Business              │
│          Ecosystem                     │ ← Heading (display font)
│         ━━━━━━━━━━                     │ ← Decorative line
│                                        │
│   Seamlessly integrate with 100+      │
│   platforms to automate workflows     │ ← Subtitle (muted text)
│                                        │
└────────────────────────────────────────┘
```

**Animation:**
- Stagger: Overline → Heading → Decorator → Subtitle
- Duration: 0.6s ease-out
- Trigger: Scroll into view

---

### FeatureGrid (Cards Variant)

```
┌──────────┐  ┌──────────┐  ┌──────────┐
│ ┌──────┐ │  │ ┌──────┐ │  │ ┌──────┐ │
│ │ Icon │ │  │ │ Icon │ │  │ │ Icon │ │ ← Icon in gradient bg
│ └──────┘ │  │ └──────┘ │  │ └──────┘ │
│          │  │          │  │          │
│  Title   │  │  Title   │  │  Title   │ ← Bold display font
│          │  │          │  │          │
│ Descr.   │  │ Descr.   │  │ Descr.   │ ← Muted text
│ iption   │  │ iption   │  │ iption   │
│          │  │          │  │          │
└──────────┘  └──────────┘  └──────────┘
     ↓             ↓             ↓
   Card 1       Card 2       Card 3
   Stagger:     0.1s         0.2s
```

**Responsive:**
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3-4 columns

---

### StatCard

```
┌─────────────────────────┐
│                         │
│   ┌────┐                │
│   │Icon│                │ ← Optional icon
│   └────┐                │
│                         │
│   98%                   │ ← Animated number (gold)
│   ▔▔▔                   │
│   Call Answer Rate      │ ← Label (muted)
│                         │
│   ┌──────┐              │
│   │ ↗ 12%│              │ ← Trend indicator
│   └──────┘              │
│                         │
└─────────────────────────┘
```

**Animation:**
- Number counts from 0 to value
- Spring physics (smooth easing)
- Triggers when scrolled into view

---

### IntegrationShowcase (Scroll Variant)

```
┌────────────────────────────────────────────┐
│░░░                                    ░░░░ │ ← Fade gradients
│                                            │
│  ┌──┐  ┌──┐  ┌──┐  ┌──┐  ┌──┐  ┌──┐      │
│  │██│  │██│  │██│  │██│  │██│  │██│      │ ← Integration logos
│  └──┘  └──┘  └──┘  └──┘  └──┘  └──┘      │
│   ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←        │ ← Auto-scroll
│  ┌──┐  ┌──┐  ┌──┐  ┌──┐  ┌──┐  ┌──┐      │
│  │██│  │██│  │██│  │██│  │██│  │██│      │ ← Duplicate for loop
│  └──┘  └──┘  └──┘  └──┘  └──┘  └──┘      │
│                                            │
│░░░                                    ░░░░ │
└────────────────────────────────────────────┘
```

**Interaction:**
- Hover anywhere to pause scrolling
- Logos: Grayscale → Color on hover
- Glow effect on hover

---

### IndustryBadge

```
Healthcare:  ┌────────────────┐
             │ 🏥  Healthcare │  Blue glass
             └────────────────┘

Automotive:  ┌────────────────┐
             │ 🚗  Automotive │  Red glass
             └────────────────┘

Real Estate: ┌────────────────┐
             │ 🏠 Real Estate │  Green glass
             └────────────────┘

Legal:       ┌────────────────┐
             │ ⚖️  Legal      │  Amber glass
             └────────────────┘
```

**Sizes:**
- SM: 12px height, 10px icon
- MD: 16px height, 14px icon
- LG: 20px height, 18px icon

---

## Animation Timing Reference

### Hover Transitions
```
Default:      200ms
Smooth:       300ms
Slow:         500ms

Easing:       cubic-bezier(0.25, 0.1, 0.25, 1)
              (Custom "premium" easing)
```

### Scale Values
```
Subtle Hover: 1.02  ✓ Use this
Button Hover: 1.05  ✓ Use this
Active/Tap:   0.98  ✓ Use this

Bouncy Hover: 1.15  ✗ Too much (AI slop)
```

### Scroll Animations
```
Fade In:      opacity: 0 → 1
Slide Up:     y: 20px → 0
Duration:     0.5s - 0.6s
Stagger:      0.1s - 0.15s per item
```

---

## Spacing System

### Component Padding
```
Card:         p-6  (24px)
Card Header:  px-6 py-5  (24px, 20px)
Card Body:    px-6 py-6  (24px, 24px)
Card Footer:  px-6 py-4  (24px, 16px)
```

### Gap Spacing
```
Grid Gap:     gap-6  (24px)
Stack Gap:    gap-4  (16px)
Inline Gap:   gap-2  (8px)
```

### Section Spacing
```
Section:      py-20 (80px top/bottom)
Container:    px-6  (24px left/right)
Max Width:    max-w-7xl (1280px)
```

---

## Responsive Breakpoints

```
Mobile:       0px - 767px     (1 column)
Tablet:       768px - 1023px  (2 columns)
Desktop:      1024px+         (3-4 columns)

Tailwind:
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

---

## Glass Effect Anatomy

### Premium Glass (Recommended)
```css
background: linear-gradient(135deg,
  rgba(255,255,255,0.12),  /* Top left */
  rgba(255,255,255,0.06),  /* Center */
  rgba(255,255,255,0.03)   /* Bottom right */
);
backdrop-filter: blur(24px);
border: 1px solid rgba(255,255,255,0.2);
box-shadow: 0 8px 32px rgba(0,0,0,0.2),
            inset 0 1px 1px rgba(255,255,255,0.1);
```

### Gold Glass (For Premium Features)
```css
background: linear-gradient(135deg,
  rgba(212,175,55,0.12),  /* Gold tint top */
  rgba(212,175,55,0.06),  /* Center */
  rgba(255,255,255,0.03)  /* Bottom */
);
border: 1px solid rgba(212,175,55,0.3);
box-shadow: 0 0 20px rgba(212,175,55,0.3);
```

### Subtle Glass (For Backgrounds)
```css
background: rgba(255,255,255,0.05);
backdrop-filter: blur(12px);
border: 1px solid rgba(255,255,255,0.1);
```

---

## Anti-AI-Slop Checklist

Before shipping any component, verify:

- [ ] No purple gradients (#8B5CF6, #A855F7)
- [ ] Gold (#D4AF37) used for primary CTAs
- [ ] Cyan (#00C9FF) used for links/tech elements
- [ ] Hover scale ≤ 1.05 (no bouncy effects)
- [ ] Transition duration 200-300ms (not instant)
- [ ] Display font (Bricolage Grotesque) for headings
- [ ] Asymmetric spacing (not perfectly centered)
- [ ] Intentional whitespace (not cramped)
- [ ] Glassmorphism used sparingly (not everywhere)
- [ ] Icons are meaningful (not decorative noise)

---

## Usage Example: Full Integration Page

```tsx
import {
  SectionHeader,
  PremiumGlassCard,
  FeatureGrid,
  StatCard,
  IntegrationShowcase,
  IndustryBadge
} from "@/components/ui/premium-components";

<main className="min-h-screen bg-background-dark">
  {/* Hero */}
  <section className="container mx-auto px-6 py-20">
    <SectionHeader
      overline="Integration Hub"
      heading="100+ Integrations"
      subtitle="Connect your favorite tools"
      decoratorColor="gold"
    />
  </section>

  {/* Stats */}
  <section className="container mx-auto px-6 py-12">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard value={100} suffix="+" label="Partners" color="gold" />
      <StatCard value={98} suffix="%" label="Uptime" color="cyan" />
      <StatCard value={5000} suffix="+" label="Active" color="success" />
    </div>
  </section>

  {/* Logos */}
  <IntegrationShowcase
    integrations={[...]}
    variant="scroll"
    autoScroll={true}
  />

  {/* Features */}
  <section className="container mx-auto px-6 py-20">
    <FeatureGrid
      columns={3}
      variant="cards"
      features={[...]}
    />
  </section>

  {/* By Industry */}
  <section className="container mx-auto px-6 py-20">
    <div className="grid md:grid-cols-2 gap-6">
      <PremiumGlassCard
        variant="premium"
        glowColor="cyan"
        header={
          <IndustryBadge category="healthcare">
            Healthcare
          </IndustryBadge>
        }
        body={<p>Epic, Cerner, Athena...</p>}
      />
    </div>
  </section>
</main>
```

---

**Visual Quality Standards:**

- Spacing: Generous (not cramped)
- Contrast: WCAG AA minimum
- Animations: Subtle (not distracting)
- Colors: Intentional (not random)
- Typography: Clear hierarchy (not flat)
- Glass: Elegant (not overdone)
- Hover: Responsive (not laggy)
- Mobile: Touch-friendly (44px targets)

---

**File Location**: `C:/Users/eaqqa/capture-client-website-seo/PREMIUM_UI_VISUAL_REFERENCE.md`
