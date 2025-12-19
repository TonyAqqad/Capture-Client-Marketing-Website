# PRICING PAGES - VISUAL REFERENCE GUIDE

Quick reference for the premium styling patterns used.

---

## PRICING CARD LAYERS (Most Popular)

```
┌─────────────────────────────────────────────┐
│  FLOATING BADGE (z-20)                      │
│  ⭐ Most Popular - Glowing                   │
│  - animate: y, boxShadow                    │
│  - rotate: star emoji                       │
└─────────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────────┐
│  HOVER GLOW LAYER (-inset-[2px])            │
│  - gradient: accent → primary → accent       │
│  - blur-xl                                   │
│  - opacity: 0 → 0.6 on hover                 │
└─────────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────────┐
│  FLOATING ORBS                               │
│  - Top-right: accent/20, blur-3xl           │
│  - Bottom-left: primary/15, blur-3xl        │
│  - animate: scale, opacity, y                │
└─────────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────────┐
│  MESH GRADIENT OVERLAY                       │
│  - bg-mesh-premium                           │
│  - opacity: 0.4 → 0.7 animate                │
└─────────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────────┐
│  GLASSMORPHISM LAYER                         │
│  - bg-white/[0.02]                           │
│  - backdrop-blur-xl                          │
└─────────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────────┐
│  ANIMATED GRADIENT BORDER (p-[2px])         │
│  - from-accent/50 via-primary/50 to-accent  │
│  - Contains inner rounded content           │
└─────────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────────┐
│  BASE GRADIENT BACKGROUND                    │
│  - from-[#1a2942] via-[#0f1c2e]             │
│  - to-[#0a1220]                              │
└─────────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────────┐
│  CONTENT (z-10)                              │
│  - Padding: p-8 lg:p-10                      │
│  - Plan name, price, features, CTA          │
└─────────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────────┐
│  SHINE EFFECT (on hover)                     │
│  - via-white/10 gradient                     │
│  - translateZ(40px) skewX(-15deg)            │
│  - x: 0% → 200% animate                      │
└─────────────────────────────────────────────┘
```

---

## KEY TAILWIND CLASSES USED

### Glass-Morphism Pattern:
```css
bg-gradient-to-br from-white/10 to-white/5
backdrop-blur-xl
rounded-3xl
border-2 border-accent/30
```

### Bold Gradient Text (Popular Plan Price):
```css
text-6xl lg:text-7xl
font-bold
leading-none
tracking-tight
bg-gradient-to-br from-accent via-white to-primary
bg-clip-text
text-transparent
```

### Floating Badge:
```css
animate: {
  y: [0, -8, 0],
  boxShadow: [
    '0 0 20px rgba(0, 201, 255, 0.5)',
    '0 0 35px rgba(0, 201, 255, 0.8)',
    '0 0 20px rgba(0, 201, 255, 0.5)'
  ]
}
transition: { duration: 2.5, repeat: Infinity }
```

### Premium Button (Popular):
```css
bg-gradient-to-r from-accent via-primary to-accent
bg-[length:200%_100%]
rounded-2xl
font-bold
text-lg
overflow-hidden
```

### Checkmark Icon (Animated):
```css
w-6 h-6
rounded-full
bg-gradient-to-br from-accent to-primary
flex items-center justify-center

// On hover:
scale: [1, 1.3, 1]
rotate: [0, 360]
```

---

## ROI STATS CARD LAYERS

```
┌─────────────────────────────────────────────┐
│  LAYER 3 (Back, Largest)                    │
│  - translate-x-6 translate-y-6              │
│  - from-accent/10 to-primary/10             │
│  - backdrop-blur-xl, rounded-3xl            │
│  - animate: scale [1, 1.02, 1]              │
└─────────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────────┐
│  LAYER 2 (Middle)                            │
│  - translate-x-3 translate-y-3              │
│  - from-accent/20 to-primary/15             │
│  - backdrop-blur-xl, rounded-3xl            │
│  - animate: scale [1, 1.01, 1]              │
└─────────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────────┐
│  LAYER 1 (Front, Content)                   │
│  - Contains all content                      │
│  - Animated gradient background             │
│  - Floating orbs (2)                         │
│  - Glass overlay                             │
│  - Pulsing badge                             │
│  - 8xl ROI stat (gradient text)             │
│  - 2 stat cards with hover scale            │
└─────────────────────────────────────────────┘
```

### Ultra-Bold ROI Number:
```css
text-6xl sm:text-7xl md:text-8xl
font-bold
bg-gradient-to-br from-accent via-white to-primary
bg-clip-text
text-transparent
leading-none
```

---

## COMPARISON TABLE STRUCTURE

```
┌─────────────────────────────────────────────┐
│  GLASS CONTAINER (rounded-3xl)              │
│                                              │
│  ┌────────────────────────────────────────┐ │
│  │ MESH GRADIENT OVERLAY (opacity-30)     │ │
│  └────────────────────────────────────────┘ │
│                                              │
│  ┌────────────────────────────────────────┐ │
│  │ GRADIENT BORDER (p-[1px])              │ │
│  │   accent/20 → primary/20 → accent/20   │ │
│  └────────────────────────────────────────┘ │
│                                              │
│  ┌────────────────────────────────────────┐ │
│  │ TABLE CONTENT                          │ │
│  │                                        │ │
│  │  THEAD:                                │ │
│  │  - Sticky header (border-b)           │ │
│  │  - Feature | Starter | Growth | Ent  │ │
│  │  - Growth has badge + "Recommended"   │ │
│  │                                        │ │
│  │  TBODY:                                │ │
│  │  - Icon + Feature name                │ │
│  │  - Hover: bg-white/5                   │ │
│  │  - Growth column: bg-accent/5          │ │
│  │  - Sticky first column (mobile)       │ │
│  └────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

### Table Header (Growth):
```css
<div className="inline-flex flex-col items-center gap-1">
  <div className="px-3 py-1 rounded-full bg-gradient-to-r from-accent/20 to-primary/20 border border-accent/30">
    <span className="text-accent font-bold">Growth</span>
  </div>
  <span className="text-xs text-accent/60">Recommended</span>
</div>
```

### Feature Row:
```css
<tr className="border-b border-white/5 hover:bg-white/5 group">
  <td className="sticky left-0 bg-gradient-to-r from-[#1e293b]/95 to-[#1e293b]/80 backdrop-blur-xl">
    <div className="flex items-center gap-3">
      <span className="material-icons text-accent/60 group-hover:text-accent">{icon}</span>
      <span className="text-white font-medium">{feature}</span>
    </div>
  </td>
  <td className="text-center text-white/60">{starter}</td>
  <td className="text-center bg-accent/5">
    <span className="text-white font-semibold">{growth}</span>
  </td>
  <td className="text-center text-white/70">{enterprise}</td>
</tr>
```

---

## MOBILE OPTIMIZATIONS

### Responsive Font Sizes:
```
Price:
- Desktop: text-7xl (72px)
- Mobile: text-6xl (60px)

ROI Stat:
- Desktop: text-8xl (96px)
- Mobile: text-7xl (72px)

Headlines:
- Desktop: text-5xl (48px)
- Mobile: text-4xl (36px)
```

### Responsive Spacing:
```
Card gap:
- Desktop: gap-8 (32px)
- Mobile: gap-6 (24px)

Card padding:
- Desktop: p-10 (40px)
- Mobile: p-8 (32px)

Badge offset:
- Desktop: -top-4 (-16px)
- Mobile: -top-3 (-12px)
```

### Disabled on Mobile:
```typescript
// 3D tilt effects
const isMobile = window.innerWidth < 1024;

if (isMobile) {
  // Disable: rotateX, rotateY, perspective
  // Keep: badges, glow, scale, opacity
}
```

---

## COLOR SWATCHES

```
ACCENT (Electric Cyan):
████ #00C9FF
Used for: Popular badge, CTAs, highlights

PRIMARY (Indigo Blue):
████ #4A69E2
Used for: Gradients, secondary accents

AMBER (Enterprise):
████ #F59E0B
Used for: Enterprise tier, premium feel

DARK SLATE:
████ #0F172A (Base)
████ #1E293B (Cards)
████ #0A0F1C (Darkest)

WHITE VARIATIONS:
████ #FFFFFF (100%)
████ rgba(255,255,255,0.8) (80%)
████ rgba(255,255,255,0.6) (60%)
████ rgba(255,255,255,0.4) (40%)
```

---

## ANIMATION QUICK REFERENCE

### Badge Float:
```javascript
animate: {
  y: [0, -8, 0],
  boxShadow: ['0 0 20px ...', '0 0 35px ...', '0 0 20px ...']
}
transition: {
  duration: 2.5,
  repeat: Infinity,
  repeatType: 'reverse'
}
```

### Floating Orbs:
```javascript
// Accent orb (top-right)
animate: {
  scale: [1, 1.4, 1],
  opacity: [0.2, 0.4, 0.2],
  y: [0, 20, 0]
}
transition: { duration: 5, repeat: Infinity }

// Primary orb (bottom-left)
animate: {
  scale: [1, 1.3, 1],
  opacity: [0.15, 0.3, 0.15],
  y: [0, -25, 0]
}
transition: { duration: 6, repeat: Infinity, delay: 1 }
```

### Shimmer Effect:
```javascript
animate: { x: ['-200%', '200%'] }
transition: {
  duration: 2,
  repeat: Infinity,
  repeatDelay: 1,
  ease: 'linear'
}
```

### Checkmark Spin:
```javascript
animate: {
  scale: [1, 1.3, 1],
  rotate: [0, 360]
}
transition: {
  delay: i * 0.1, // Staggered
  duration: 0.6
}
```

### 3D Card Tilt:
```javascript
// On mouse move
const rotateX = ((y - centerY) / centerY) * -8;
const rotateY = ((x - centerX) / centerX) * 8;

animate: { rotateX, rotateY, scale: 1.03 }
transition: {
  type: 'spring',
  stiffness: 300,
  damping: 25
}
```

---

## COPY-PASTE SNIPPETS

### Premium Glass Card:
```tsx
<div className="relative overflow-hidden rounded-3xl">
  {/* Background gradient */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#1e293b]/90 via-[#0f172a]/95 to-[#0a0f1c]" />

  {/* Glass layer */}
  <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-xl" />

  {/* Gradient border */}
  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/10 via-white/5 to-white/10 p-[1px]">
    <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-br from-[#1e293b]/95 via-[#0f172a]/98 to-[#0a0f1c]" />
  </div>

  {/* Content */}
  <div className="relative z-10 p-8">
    {/* Your content here */}
  </div>
</div>
```

### Glowing Badge:
```tsx
<motion.div
  animate={{
    y: [0, -8, 0],
    boxShadow: [
      '0 0 20px rgba(0, 201, 255, 0.5)',
      '0 0 35px rgba(0, 201, 255, 0.8)',
      '0 0 20px rgba(0, 201, 255, 0.5)',
    ],
  }}
  transition={{ duration: 2.5, repeat: Infinity, repeatType: 'reverse' }}
  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-accent via-primary to-accent"
>
  <span className="font-bold text-sm tracking-wider text-background-dark uppercase">
    Most Popular
  </span>
</motion.div>
```

### Bold Gradient Price:
```tsx
<span className="text-6xl lg:text-7xl font-bold leading-none tracking-tight bg-gradient-to-br from-accent via-white to-primary bg-clip-text text-transparent">
  $2,195
</span>
```

### Animated Checkmark:
```tsx
<motion.div
  animate={isHovered ? { scale: [1, 1.3, 1], rotate: [0, 360] } : {}}
  transition={{ delay: i * 0.1, duration: 0.6 }}
  className="w-6 h-6 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center"
>
  <span className="material-icons text-background-dark text-base">check</span>
</motion.div>
```

### Premium CTA Button:
```tsx
<Link
  href="/pricing/growth-package"
  className="relative block w-full text-center py-4 rounded-2xl font-bold text-lg overflow-hidden bg-gradient-to-r from-accent via-primary to-accent bg-[length:200%_100%]"
>
  {/* Shimmer effect */}
  <motion.div
    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
    animate={{ x: ['-200%', '200%'] }}
    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: 'linear' }}
  />

  <span className="relative z-10 text-background-dark">Get Started</span>
</Link>
```

---

## TESTING COMMANDS

### Check for hydration errors:
```bash
npm run dev
# Open http://localhost:3000/pricing
# Check console for warnings
```

### Build for production:
```bash
npm run build
# Should complete with no TypeScript errors
```

### Lighthouse audit:
```bash
npm run build
npm run start
# Open Chrome DevTools > Lighthouse
# Run audit on /pricing page
```

---

**Quick Reference Created**: December 1, 2025
**For**: Capture Client Pricing Pages
**Designer**: UI Design Agent
