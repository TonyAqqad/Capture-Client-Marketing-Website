# Desktop Features Quick Reference

**Visual Guide to Desktop-Specific Features**

---

## Desktop Hero Section (1024px+)

```
┌─────────────────────────────────────────────────────────────┐
│                      FULL-WIDTH HERO                        │
│                                                             │
│  ┌──────────────────────┐    ┌──────────────────────────┐ │
│  │   TEXT CONTENT       │    │   FLOATING VISUALS       │ │
│  │   (7 COLUMNS)        │    │   (5 COLUMNS)            │ │
│  │                      │    │                          │ │
│  │  • Large headline    │    │  ┌────────────────┐     │ │
│  │  • Subhead           │    │  │ Live Call Card │     │ │
│  │  • CTA buttons       │    │  │  (floating)    │     │ │
│  │  • Trust badges      │    │  └────────────────┘     │ │
│  │                      │    │                          │ │
│  │                      │    │  ┌──────────────┐       │ │
│  └──────────────────────┘    │  │ Performance  │       │ │
│                               │  │  Stats Card  │       │ │
│                               │  └──────────────┘       │ │
│                               └──────────────────────────┘ │
│                                                             │
│  [Scroll Indicator]                                         │
└─────────────────────────────────────────────────────────────┘
```

**Desktop-Only Elements:**
- Floating dashboard cards (right side)
- Mouse parallax tracking
- Rotating geometric shapes
- Animated scroll indicator
- Live stats ticker

---

## Desktop Navigation (1024px+)

```
┌─────────────────────────────────────────────────────────────┐
│  [LOGO]    Services  Features  Pricing  Contact    [PHONE] [DEMO] │
│                                                             │
│           ▔▔▔▔▔▔▔▔                                         │
│        (hover underline)                                    │
└─────────────────────────────────────────────────────────────┘
```

**Desktop Features:**
- Horizontal navigation menu
- Hover effects with gradient underlines
- Phone number visible
- Primary CTA button
- Scroll-based backdrop blur

---

## Desktop Service Cards (1024px+)

```
┌──────────────────────────────────────────────────────────────┐
│                    4-COLUMN GRID LAYOUT                      │
│                                                              │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐      │
│  │ [ICON]  │  │ [ICON]  │  │ [ICON]  │  │ [ICON]  │      │
│  │         │  │         │  │         │  │         │      │
│  │ Voice   │  │  Lead   │  │   CRM   │  │Dashboard│      │
│  │   AI    │  │  Gen    │  │         │  │         │      │
│  │         │  │         │  │         │  │         │      │
│  │ • Feat  │  │ • Feat  │  │ • Feat  │  │ • Feat  │      │
│  │ • Feat  │  │ • Feat  │  │ • Feat  │  │ • Feat  │      │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘      │
│       ↑             ↑             ↑             ↑          │
│   (hovers up)   (hovers up)   (hovers up)   (hovers up)   │
└──────────────────────────────────────────────────────────────┘
```

**Desktop Hover Effects:**
- Cards lift -12px on hover
- Border glow appears
- Icon rotates slightly
- Background gradient intensifies
- Shadow becomes more prominent

---

## Desktop Footer (1024px+)

```
┌─────────────────────────────────────────────────────────────┐
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │  LOGO &  │  │ SERVICES │  │ COMPANY  │  │ RESOURCES│  │
│  │ CONTACT  │  │          │  │          │  │          │  │
│  │          │  │ • Link   │  │ • Link   │  │ • Link   │  │
│  │ [PHONE]  │  │ • Link   │  │ • Link   │  │ • Link   │  │
│  │ [EMAIL]  │  │ • Link   │  │ • Link   │  │ • Link   │  │
│  │ [ADDR]   │  │ • Link   │  │ • Link   │  │ • Link   │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  Newsletter Signup (Horizontal Layout)              │  │
│  │  [Email Input ──────────────] [Subscribe Button]    │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                             │
│  © 2025 Capture Client        [Twitter] [LinkedIn] [FB]   │
└─────────────────────────────────────────────────────────────┘
```

**Desktop Features:**
- 4-column layout (3 cols each)
- Horizontal newsletter form
- Link hover with gradient underlines
- Social icons with scale hover
- Contact info with hover highlights

---

## Desktop Animations

### 1. Mouse Parallax (Hero)
```
         Mouse Position
              ↓
    ┌─────────●─────────┐
    │     ↙   ↓   ↘     │
    │   Orb  Shapes Card │
    │    ↖   ↓   ↗      │
    └───────────────────┘
```
Elements move based on mouse position with spring physics.

### 2. Scroll Parallax
```
Scroll Direction: ↓

Background:  ▓▓▓▓  (slower)
Midground:   ████  (medium)
Foreground:  ████  (faster)
```
Different layers scroll at different speeds for depth effect.

### 3. Hover Lift Effect
```
Default State:     Hover State:
┌──────────┐
│  Card    │      ┌──────────┐
│          │      │  Card    │  ← Lifts up
│          │  →   │          │
└──────────┘      │          │
                  └──────────┘
                      ↓
                  [shadow grows]
```

---

## Desktop Breakpoint Behavior

### 1024px (lg) - Standard Desktop
- Navigation goes horizontal
- Hero splits into 7/5 columns
- Service grid shows 4 columns
- Floating elements appear
- Hover effects activate

### 1280px (xl) - Large Desktop
- Max-width containers expand
- Larger font sizes applied
- More generous spacing
- Premium shadows enhanced

### 1440px+ - High-Resolution
- Content centered with max-width
- Background effects full-width
- Typography optimized for readability
- No excessive whitespace

---

## Desktop-Specific CSS Classes

### Hover Effects
```css
.desktop-hover-lift:hover        // Lifts -8px
.desktop-scale-hover:hover       // Scales 1.02x
.desktop-glow-hover:hover        // Adds glow shadow
.desktop-btn-premium:hover       // Button premium effect
```

### Layout
```css
.hidden lg:block                 // Desktop-only elements
.lg:grid-cols-12                 // 12-column grid
.lg:col-span-7                   // Span 7 columns
```

### Focus States
```css
.focus-ring-premium              // Keyboard nav focus
button:focus-visible             // Button focus with glow
a:focus-visible                  // Link focus ring
```

---

## Desktop Performance Features

### GPU Acceleration
```css
transform: translateZ(0);        // Force GPU layer
will-change: transform;          // Hint to browser (on hover only)
```

### Optimized Animations
```tsx
// Only animate on desktop, skip on mobile
const shouldAnimate = window.innerWidth >= 1024;

<motion.div
  animate={shouldAnimate ? { y: [0, -20, 0] } : {}}
  transition={shouldAnimate ? { duration: 6 } : { duration: 0 }}
>
```

---

## Desktop Keyboard Navigation

### Tab Order
```
1. Skip to Content (invisible until focused)
2. Logo
3. Navigation Links (Services, Features, Pricing, Contact)
4. Phone CTA
5. Primary CTA (Book Demo)
6. Hero CTA Buttons
7. Service Cards (tabbable)
8. Footer Links
9. Newsletter Form
10. Social Icons
```

### Focus Indicators
- Blue glow ring on focus
- High contrast for visibility
- Never removed (only hidden for mouse users)
- Enhanced for buttons with shadow

---

## Desktop Testing Checklist

### Visual Tests
- [ ] Hero asymmetric layout displays correctly
- [ ] Floating cards appear on right side
- [ ] Mouse parallax tracking works
- [ ] Navigation shows horizontally
- [ ] Service cards in 4-column grid
- [ ] Hover effects lift cards smoothly
- [ ] Footer in multi-column layout
- [ ] No horizontal scrollbar at any width

### Interaction Tests
- [ ] Mouse parallax responds to movement
- [ ] Hover effects appear on all cards
- [ ] Button hover glows are smooth
- [ ] Navigation underlines animate
- [ ] Forms have proper focus states
- [ ] Keyboard navigation works
- [ ] Tab order is logical
- [ ] All CTAs clickable and styled

### Performance Tests
- [ ] No jank during scroll
- [ ] Animations run at 60fps
- [ ] No layout shifts on load
- [ ] Images load progressively
- [ ] Fonts don't cause FOUT
- [ ] No excessive repaints

---

## Common Desktop Breakpoints

```
┌─────────────────────────────────────────────────┐
│  320px  Phone (ignore)                          │
├─────────────────────────────────────────────────┤
│  640px  sm: Large phone / small tablet          │
├─────────────────────────────────────────────────┤
│  768px  md: Tablet / small laptop               │
│         ─────────────────────────────────────   │
│         START OF DESKTOP EXPERIENCE             │
├─────────────────────────────────────────────────┤
│  1024px lg: Desktop (most features activate)    │
│         • Horizontal nav                        │
│         • 4-column grids                        │
│         • Hover effects                         │
│         • Floating elements                     │
├─────────────────────────────────────────────────┤
│  1280px xl: Large desktop                       │
│         • Larger font sizes                     │
│         • More spacing                          │
├─────────────────────────────────────────────────┤
│  1536px 2xl: Ultra-wide                         │
│         • Max-width containers                  │
│         • Centered content                      │
├─────────────────────────────────────────────────┤
│  1920px Full HD (common)                        │
│         • Optimal viewing                       │
├─────────────────────────────────────────────────┤
│  2560px 2K / 4K                                 │
│         • Content centered with max-width       │
└─────────────────────────────────────────────────┘
```

---

## Desktop Color System

### Primary Colors (Desktop)
```
Primary Blue:  #4A69E2 (headings, accents)
Accent Cyan:   #00C9FF (highlights, CTAs)
Background:    #0F172A (dark navy)
Foreground:    #F8FAFC (white text)
Muted:         #94A3B8 (secondary text)
```

### Hover Colors
```
Primary Hover:   Lightens + Glow
Accent Hover:    Brightens + Shadow
Button Hover:    Scale + Glow + Gradient Shift
Card Hover:      Border glow + Lift + Background shift
```

---

## Desktop Typography Scale

```
Hero Headline:      4rem (64px)  lg:7xl
Section Heading:    3rem (48px)  lg:5xl
Card Title:         1.5rem (24px) lg:2xl
Body Text:          1rem (16px)   lg:text-lg
Small Text:         0.875rem (14px) text-sm
```

All with responsive scaling:
- Mobile: Smaller sizes
- Desktop: Larger, more prominent
- Line heights optimized for readability

---

## Quick Desktop Testing URL

Dev Server: http://localhost:3000

**Test at these widths:**
1. 1024px - Minimum desktop
2. 1280px - Standard laptop
3. 1440px - Common desktop
4. 1920px - Full HD

**Chrome DevTools:**
1. F12 to open DevTools
2. Click "Toggle Device Toolbar" (Ctrl+Shift+M)
3. Select "Responsive"
4. Set width manually
5. Test hover states with mouse
6. Test keyboard nav with Tab key

---

**Last Updated:** 2025-12-02
**Status:** All desktop features verified and working
