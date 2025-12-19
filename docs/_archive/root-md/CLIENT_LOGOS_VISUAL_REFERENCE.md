# Client Logos Carousel - Visual Reference Guide

## 🎨 Component Structure Breakdown

### ClientLogosCarousel Component

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                       │
│  TRUSTED BY 500+ GROWING BUSINESSES • INTEGRATES WITH YOUR TOOLS    │  ← Header Text
│                           (text-white/40)                            │     (uppercase, tracking-wide)
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ ╔══════╗  ╔══════╗  ╔══════╗  ╔══════╗  ╔══════╗  ╔══════╗         │
│ ║ [ST] ║  ║ [HS] ║  ║ [CA] ║  ║ [SF] ║  ║ [ZP] ║  ║ [QB] ║   ───►  │  ← Infinite Scroll
│ ║ Name ║  ║ Name ║  ║ Name ║  ║ Name ║  ║ Name ║  ║ Name ║         │     (smooth animation)
│ ╚══════╝  ╚══════╝  ╚══════╝  ╚══════╝  ╚══════╝  ╚══════╝         │
└─────────────────────────────────────────────────────────────────────┘
 ▲                                                                     ▲
 │                                                                     │
Gradient                                                         Gradient
Fade Left                                                       Fade Right
```

#### Visual Specs

**Card Structure:**
```
╔════════════════════════════╗
║  ┌────┐                    ║  ← Glass Card Container
║  │ ST │  ServiceTitan      ║    - bg: white/5 + backdrop-blur
║  └────┘                    ║    - border: white/10
║    ▲        ▲              ║    - rounded-xl
║    │        │              ║
║  Badge   Name              ║
║ (accent  (white/80)        ║
║  cyan)                     ║
╚════════════════════════════╝

HOVER STATE:
╔════════════════════════════╗
║  ┌────┐                    ║  ← Opacity: 60% → 100%
║  │ ST │  ServiceTitan      ║  ← Border: white/10 → accent/30
║  └────┘                    ║  ← Glow effect
║                            ║
╚════════════════════════════╝
```

**Dimensions:**
- Mobile: 112px wide × 48px tall
- Desktop: 144px wide × 56px tall
- Gap: 32px mobile, 48px desktop
- Badge: 32px × 32px

**Colors:**
- Background: `bg-background-dark/50` (semi-transparent)
- Card: `glass` class (white/5 + blur)
- Border: `border-white/10` (default), `border-accent/30` (hover)
- Badge gradient: `from-accent/20 to-primary/20`
- Badge text: `text-accent` (cyan)
- Name text: `text-white/80`

---

### IntegrationPartnersGrid Component

```
MOBILE (2 columns)          TABLET (3 columns)         DESKTOP (4 columns)
┌──────┬──────┐            ┌──────┬──────┬──────┐    ┌──────┬──────┬──────┬──────┐
│ Card │ Card │            │ Card │ Card │ Card │    │ Card │ Card │ Card │ Card │
├──────┼──────┤            ├──────┼──────┼──────┤    ├──────┼──────┼──────┼──────┤
│ Card │ Card │            │ Card │ Card │ Card │    │ Card │ Card │ Card │ Card │
└──────┴──────┘            └──────┴──────┴──────┘    └──────┴──────┴──────┴──────┘
```

#### Individual Card Structure

```
┌─────────────────────────────┐
│                             │
│         ┌─────────┐         │  ← Logo Container (64px × 64px)
│         │         │         │    - bg: white/5
│         │   ST    │         │    - rounded-xl
│         │         │         │    - Hover: bg → white/10
│         └─────────┘         │
│                             │
│      ServiceTitan           │  ← Name (font-semibold, white)
│                             │
│     Field Service           │  ← Category (text-xs, white/50)
│                             │
│  Sync leads directly...     │  ← Description (optional)
│                             │    (text-xs, white/40)
│                             │
└─────────────────────────────┘

HOVER STATE:
┌─────────────────────────────┐
│                             │  ← Lift: translateY(-4px)
│         ┌─────────┐         │  ← Scale: 1.02
│         │         │         │  ← Border: accent/30 glow
│         │   ST    │         │  ← Shadow: enhanced
│         │         │         │
│         └─────────┘         │
│                             │
│      ServiceTitan           │
│     Field Service           │
│  Sync leads directly...     │
└─────────────────────────────┘
```

**Card Specs:**
- Padding: 24px (p-6)
- Border radius: 12px (rounded-xl)
- Text alignment: center
- Min height: Auto-sized by content

**Logo Badge:**
- Size: 64px × 64px (w-16 h-16)
- Background: `bg-white/5` → `bg-white/10` (hover)
- Contains: Icon emoji OR first letter
- Text size: 24px (text-2xl)

---

## 🎬 Animation Specifications

### ClientLogosCarousel Animation

**Type:** Infinite linear translation
```
Starting position: x = 0
Ending position: x = -1200px
Duration: 25 seconds
Easing: linear (no easing curve)
Repeat: Infinity
RepeatType: loop (seamless)
```

**Performance Optimization:**
```css
/* Applied automatically */
transform: translateZ(0);      /* GPU acceleration */
will-change: transform;        /* Browser hint */
```

**Reduced Motion:**
```css
@media (prefers-reduced-motion: reduce) {
  /* Animation pauses automatically via Framer Motion */
}
```

### IntegrationPartnersGrid Animation

**Hover Animation:**
```
Property: y (vertical position)
From: 0
To: -4px
Duration: 300ms
Easing: ease-out

Property: scale
From: 1
To: 1.02
Duration: 300ms
Easing: ease-out
```

**Tap Animation (Mobile):**
```
Property: scale
From: 1
To: 0.98
Duration: 150ms
Easing: ease-out
```

---

## 📐 Responsive Breakpoints

### ClientLogosCarousel Responsive Behavior

| Breakpoint | Width      | Card Size | Gap  | Fade Width | Visible Logos |
|------------|------------|-----------|------|------------|---------------|
| Mobile     | < 640px    | 112×48px  | 32px | 80px       | ~3-4          |
| SM         | ≥ 640px    | 112×48px  | 32px | 80px       | ~4-5          |
| LG         | ≥ 1024px   | 144×56px  | 48px | 128px      | ~5-6          |
| XL         | ≥ 1280px   | 144×56px  | 48px | 128px      | ~6-7          |

### IntegrationPartnersGrid Responsive Behavior

| Breakpoint | Width      | Columns | Gap  | Card Min Width |
|------------|------------|---------|------|----------------|
| Mobile     | < 768px    | 2       | 16px | ~140px         |
| MD         | ≥ 768px    | 3       | 16px | ~200px         |
| LG         | ≥ 1024px   | 4       | 24px | ~220px         |
| XL         | ≥ 1280px   | 4       | 24px | ~280px         |

---

## 🎨 Color Palette Reference

### Background Colors
```
bg-background-dark:     #0F172A  (Main dark background)
bg-background-darker:   #0A0F1C  (Deeper dark)
bg-surface:             #1E293B  (Card surfaces)
```

### Glass Effect Colors
```
glass background:       rgba(255, 255, 255, 0.05)  (5% white)
glass border:           rgba(255, 255, 255, 0.10)  (10% white)
backdrop-blur:          10px (mobile), 16px (desktop)
```

### Accent Colors
```
accent (cyan):          #00C9FF  (Primary accent)
primary (blue):         #4A69E2  (Secondary accent)
gold:                   #D4AF37  (Premium accent)
```

### Text Colors
```
text-white:             #FFFFFF  (100% opacity)
text-white/80:          rgba(255, 255, 255, 0.8)
text-white/60:          rgba(255, 255, 255, 0.6)
text-white/40:          rgba(255, 255, 255, 0.4)
```

---

## 🔍 Hover State Comparison

### ClientLogosCarousel Card

**Default State:**
```
┌────────────────┐
│ [ST] Service   │  Opacity: 60%
│                │  Border: white/10
└────────────────┘  Grayscale: 0%
```

**Hover State:**
```
╔════════════════╗
║ [ST] Service   ║  Opacity: 100%
║                ║  Border: accent/30 (cyan glow)
╚════════════════╝  Grayscale: 0%
                    Transform: none (intentionally stable)
```

### IntegrationPartnersGrid Card

**Default State:**
```
┌────────────────┐
│   ┌────┐       │  Position: y = 0
│   │ ST │       │  Scale: 1.0
│   └────┘       │  Border: white/10
│  ServiceTitan  │
└────────────────┘
```

**Hover State:**
```
┌────────────────┐
│   ┌────┐       │  Position: y = -4px
│   │ ST │       │  Scale: 1.02
│   └────┘       │  Border: accent/30 (glow)
│  ServiceTitan  │  Shadow: enhanced
└────────────────┘  Logo bg: white/5 → white/10
```

---

## 📱 Mobile-Specific Design Decisions

### Why These Mobile Choices?

**1. Name Hidden on Mobile (Carousel)**
```
Mobile:                Desktop:
┌──────┐              ┌─────────────────┐
│ [ST] │              │ [ST] ServiceTitan│
└──────┘              └─────────────────┘
```
**Reason:** Limited horizontal space, initials convey the info

**2. 2-Column Grid (Partners)**
```
┌──────┬──────┐
│ Card │ Card │
├──────┼──────┤
│ Card │ Card │
└──────┴──────┘
```
**Reason:** Optimal touch targets (44×44px+), readable text

**3. Lighter Blur on Mobile**
```
Desktop: backdrop-blur-2xl (16px)
Mobile:  backdrop-blur-lg  (10px)
```
**Reason:** Better performance on lower-end devices

---

## ♿ Accessibility Visual Indicators

### Focus States (Keyboard Navigation)

**Grid Card Focus:**
```
┌────────────────────┐
│ ╔════════════════╗ │  ← 2px focus ring
│ ║   ┌────┐       ║ │    (accent color)
│ ║   │ ST │       ║ │
│ ║   └────┘       ║ │
│ ║  ServiceTitan  ║ │
│ ╚════════════════╝ │
└────────────────────┘
```

**Interactive Elements:**
- Focus ring: 2px solid accent
- Focus visible: Outline offset 2px
- Tab order: Left to right, top to bottom

---

## 🎯 Use Case Visual Examples

### Homepage Layout
```
┌───────────────────────────────────────┐
│                                       │
│           HERO SECTION                │
│         (large heading)               │
│                                       │
└───────────────────────────────────────┘
┌───────────────────────────────────────┐
│  TRUSTED BY 500+ • INTEGRATIONS       │  ← ClientLogosCarousel
│  ╔═╗ ╔═╗ ╔═╗ ╔═╗ ╔═╗ ╔═╗  ───►      │    (subtle social proof)
└───────────────────────────────────────┘
┌───────────────────────────────────────┐
│                                       │
│        FEATURES SECTION               │
│                                       │
└───────────────────────────────────────┘
```

### Integrations Page Layout
```
┌───────────────────────────────────────┐
│       SEAMLESS INTEGRATIONS           │
│    (hero heading + description)       │
└───────────────────────────────────────┘
┌───────────────────────────────────────┐
│  TRUSTED BY 500+ • INTEGRATIONS       │  ← ClientLogosCarousel
│  ╔═╗ ╔═╗ ╔═╗ ╔═╗ ╔═╗ ╔═╗  ───►      │    (animated showcase)
└───────────────────────────────────────┘
┌───────────────────────────────────────┐
│   ALL INTEGRATION PARTNERS            │
│                                       │
│  ┌────┬────┬────┬────┐               │  ← IntegrationPartnersGrid
│  │Card│Card│Card│Card│               │    (interactive grid)
│  ├────┼────┼────┼────┤               │
│  │Card│Card│Card│Card│               │
│  └────┴────┴────┴────┘               │
└───────────────────────────────────────┘
```

---

## 📊 Performance Visual Metrics

### Animation Performance

**Target FPS:**
```
Carousel Scroll:    60 FPS (smooth)
Hover Transitions:  60 FPS (smooth)
Mobile Performance: 60 FPS (optimized)
```

**Frame Budget:**
```
16.67ms per frame @ 60 FPS
├─ Layout:        < 2ms
├─ Paint:         < 3ms
├─ Composite:     < 2ms
└─ JavaScript:    < 5ms
   Total:         < 12ms ✅
```

---

## 🎨 Design System Integration

### How Components Use Design System

**Typography:**
```
Header:       font-semibold, uppercase, tracking-[0.2em]
Card Name:    font-semibold, text-white
Category:     text-xs, text-white/50
Description:  text-xs, text-white/40, leading-relaxed
```

**Spacing:**
```
Section padding:  py-12 lg:py-16
Container:        container mx-auto px-4 sm:px-6 lg:px-8
Card padding:     p-6 (24px)
Grid gap:         gap-4 lg:gap-6
```

**Effects:**
```
Glass:         .glass class (backdrop-blur)
Transitions:   duration-300 (all hover effects)
Shadows:       Custom box-shadow on hover
```

---

## 🚀 Before/After Comparison

### WITHOUT Client Logos

```
┌─────────────────────────┐
│                         │
│    HERO SECTION         │
│                         │
└─────────────────────────┘
┌─────────────────────────┐
│                         │  ← Empty space, no trust signal
│    FEATURES SECTION     │
│                         │
└─────────────────────────┘
```

### WITH Client Logos

```
┌─────────────────────────┐
│                         │
│    HERO SECTION         │
│                         │
└─────────────────────────┘
┌─────────────────────────┐
│  TRUSTED BY 500+        │  ← Strong social proof
│  ╔═╗ ╔═╗ ╔═╗  ───►     │  ← Premium animation
└─────────────────────────┘  ← Fills visual gap
┌─────────────────────────┐
│                         │
│    FEATURES SECTION     │
│                         │
└─────────────────────────┘
```

**Impact:**
- ✅ Adds instant credibility
- ✅ Fills empty space elegantly
- ✅ Creates visual flow between sections
- ✅ Increases perceived value
- ✅ Provides social proof without being pushy

---

## 💡 Pro Tips

### Visual Design Tips

1. **Spacing Matters**
   - Keep consistent vertical rhythm (multiples of 8px)
   - Use the carousel as a section divider

2. **Color Balance**
   - Carousel is intentionally subtle (60% opacity)
   - Grid cards are more vibrant (100% on hover)

3. **Animation Subtlety**
   - Carousel scrolls slowly (25s duration)
   - Hover effects are quick (300ms)
   - No jarring movements

4. **Mobile First**
   - Design looks great on small screens first
   - Desktop enhancements are additive

---

**Visual Reference Complete!** 🎨

Use this guide when:
- Customizing component styling
- Explaining design to stakeholders
- Debugging visual issues
- Creating new variants
