# VISUAL DESIGN REFERENCE
## Quick Copy-Paste Patterns for Distinctive UI

---

## 1. GOLD MAGNETIC CTA (Primary Action)

```tsx
import { MagneticButton } from "@/components/ui/MagneticButton";

<MagneticButton className="group relative overflow-hidden bg-gradient-to-r from-gold via-gold-300 to-gold text-background-dark font-bold text-lg px-12 py-6 rounded-2xl shadow-glow-gold-lg transition-all duration-500 hover:shadow-glow-gold-intense border-2 border-gold-400/50 hover:border-gold-300">
  <span className="relative z-10 flex items-center gap-3">
    Book Your Free Demo
    <motion.span
      className="material-icons text-2xl"
      animate={{ x: [0, 5, 0] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      arrow_forward
    </motion.span>
  </span>
  <motion.div
    className="absolute inset-0 bg-gradient-to-r from-gold-400 via-gold-200 to-gold-400 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
    style={{ backgroundSize: "200% 200%" }}
    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
    transition={{ duration: 3, repeat: Infinity }}
  />
</MagneticButton>
```

**When to Use:** Primary CTAs, main conversion points

---

## 2. NUMBERED SERVICE CARD (Distinctive Layout)

```tsx
<div className="group relative">
  {/* Numbered badge - positioned outside card */}
  <span className="absolute -top-4 -left-4 w-12 h-12 bg-primary-800 border border-white/10 rounded-full flex items-center justify-center text-accent font-bold shadow-lg z-10">
    01
  </span>

  {/* Glowing background on hover */}
  <div className="absolute -inset-px bg-gradient-to-r from-accent/20 to-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

  {/* Main card */}
  <div className="relative bg-surface/50 backdrop-blur-lg border-2 border-accent/30 rounded-2xl p-8 transition-all duration-500 group-hover:border-accent/50 group-hover:shadow-glow">

    {/* Icon with rotating background */}
    <div className="relative w-16 h-16 mb-6">
      <motion.div
        className="absolute inset-0 bg-accent/20 rounded-xl"
        animate={{ rotate: [0, 90, 180, 270, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <div className="relative w-full h-full bg-surface-elevated rounded-xl flex items-center justify-center">
        <span className="material-icons text-accent text-3xl">phone</span>
      </div>
    </div>

    {/* Title with gold-cyan gradient */}
    <h3 className="text-2xl font-heading font-bold text-gradient-gold-cyan mb-3">
      Voice AI Agents
    </h3>

    {/* Description */}
    <p className="text-foreground-muted leading-relaxed mb-6">
      AI-powered voice agents handle calls 24/7, qualify leads, and book appointments automatically.
    </p>

    {/* Benefits list */}
    <ul className="space-y-2">
      <li className="flex items-center gap-2 text-sm text-foreground-subtle">
        <span className="material-icons text-accent text-sm">check_circle</span>
        24/7 availability
      </li>
    </ul>

    {/* Corner accent */}
    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-accent/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  </div>
</div>
```

**When to Use:** Service grids, feature cards, package comparisons

---

## 3. HERO HEADLINE (Extreme Weight Contrast)

```tsx
<h1 className="text-display-xl mb-8">
  <span className="font-extralight text-foreground-muted">
    Never Miss a
  </span>
  <br />
  <span className="relative inline-block">
    <span className="font-black text-gradient-gold-cyan">
      Lead Again
    </span>
    {/* Animated underline */}
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 1.2, delay: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="absolute -bottom-2 left-0 right-0 h-4 bg-gradient-to-r from-gold/30 to-accent/30 blur-sm -z-10 origin-left"
    />
  </span>
</h1>
```

**CSS Required:**
```css
.text-display-xl {
  font-family: var(--font-space-grotesk);
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  line-height: 1.1;
  letter-spacing: -0.03em;
}

.text-gradient-gold-cyan {
  @apply bg-clip-text text-transparent;
  background-image: linear-gradient(135deg, #D4AF37 0%, #00C9FF 100%);
}
```

**When to Use:** Hero sections, major page headlines

---

## 4. FLOATING DASHBOARD CARD (3D Depth)

```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 1.2 }}
>
  <motion.div
    animate={{
      y: [0, -20, 0],
      rotate: [-1, 1, -1],
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className="w-[380px] bg-gradient-to-br from-surface/90 to-surface/60 backdrop-blur-2xl border-2 border-accent/30 rounded-3xl p-8 shadow-glow-lg"
    style={{
      transform: "perspective(1000px) rotateY(-5deg)",
      transformStyle: "preserve-3d"
    }}
  >
    {/* Live Call Header */}
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="relative flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-accent"></span>
        </div>
        <p className="text-sm font-bold text-accent uppercase tracking-wider">Live Call</p>
      </div>
    </div>

    {/* Content here */}
  </motion.div>
</motion.div>
```

**When to Use:** Hero sections, product demos, interactive showcases

---

## 5. PREMIUM MOBILE GLASS (No Performance Hit)

```tsx
<div className="glass-premium-mobile p-6 rounded-2xl">
  {/* Content */}
</div>
```

**CSS:**
```css
.glass-premium-mobile {
  /* Semi-transparent base - NO backdrop-filter! */
  background: rgba(26, 31, 38, 0.85);

  /* Gradient overlay for depth (GPU-friendly) */
  background-image: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.08) 0%,
    rgba(255, 255, 255, 0.02) 100%
  );

  /* Gold-tinted border */
  border: 1px solid rgba(212, 175, 55, 0.15);

  /* Single clean shadow */
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);

  /* GPU acceleration */
  transform: translateZ(0);

  /* NO backdrop-filter = 60fps scrolling on mobile */
}
```

**When to Use:** All cards on mobile, overlays, modals

---

## 6. ASYMMETRIC HERO LAYOUT

```tsx
<section className="min-h-screen flex items-center">
  <div className="container mx-auto px-8">
    <div className="grid lg:grid-cols-12 gap-12 items-center">

      {/* Left: Content (7 columns) */}
      <div className="lg:col-span-7">
        <h1>Headline Here</h1>
        <p>Subtext here</p>
        {/* CTAs */}
      </div>

      {/* Right: Visual (5 columns) - overlapping */}
      <div className="lg:col-span-5 relative">
        {/* Floating visual elements */}
      </div>

    </div>
  </div>
</section>
```

**Why 7/5:** Breaks the predictable 6/6 symmetry

---

## 7. STAGGERED GRID LAYOUT

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
  <div className="mt-0">{/* Card 1 */}</div>
  <div className="mt-12">{/* Card 2 - offset down */}</div>
  <div className="mt-6">{/* Card 3 - medium offset */}</div>
  <div className="mt-0">{/* Card 4 */}</div>
</div>
```

**Creates visual rhythm instead of rigid alignment**

---

## 8. TEXT REVEAL ANIMATION

```tsx
import { TextReveal } from "@/components/ui/TextReveal";

<TextReveal delay={0.3}>
  <h2 className="text-5xl font-bold text-foreground">
    Your Headline Here
  </h2>
</TextReveal>
```

**Component Implementation:**
```tsx
// src/components/ui/TextReveal.tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function TextReveal({
  children,
  delay = 0
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      whileInView={{ clipPath: "inset(0% 0 0 0)" }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.76, 0, 0.24, 1] // Custom easing
      }}
    >
      {children}
    </motion.div>
  );
}
```

---

## 9. 3D CARD FLIP TESTIMONIALS

```tsx
<AnimatePresence mode="wait" custom={direction}>
  <motion.div
    key={currentIndex}
    custom={direction}
    variants={{
      enter: (direction) => ({
        x: direction > 0 ? 400 : -400,
        opacity: 0,
        scale: 0.8,
        rotateY: direction > 0 ? 45 : -45, // 3D rotation
      }),
      center: {
        x: 0,
        opacity: 1,
        scale: 1,
        rotateY: 0,
      },
      exit: (direction) => ({
        x: direction > 0 ? -400 : 400,
        opacity: 0,
        scale: 0.8,
        rotateY: direction > 0 ? -45 : 45,
      }),
    }}
    initial="enter"
    animate="center"
    exit="exit"
    transition={{
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.4 },
      scale: { duration: 0.4 },
      rotateY: { duration: 0.4 },
    }}
  >
    <TestimonialCard testimonial={testimonials[currentIndex]} />
  </motion.div>
</AnimatePresence>
```

**Creates 3D card flip effect (not flat slide)**

---

## 10. MESH GRADIENT BACKGROUND

```tsx
<section className="relative overflow-hidden">
  {/* Mesh gradient background */}
  <div className="absolute inset-0 bg-mesh-premium opacity-30" />

  {/* Animated orbs */}
  <motion.div
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.1, 0.2, 0.1],
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className="absolute top-1/4 right-0 w-[800px] h-[800px] rounded-full bg-gradient-radial from-accent/10 to-transparent blur-3xl"
  />

  {/* Content */}
  <div className="relative z-10">
    {/* Your content */}
  </div>
</section>
```

**CSS:**
```css
.bg-mesh-premium {
  background:
    radial-gradient(at 27% 37%, rgba(74, 105, 226, 0.2) 0px, transparent 50%),
    radial-gradient(at 97% 21%, rgba(0, 201, 255, 0.15) 0px, transparent 50%),
    radial-gradient(at 52% 99%, rgba(74, 105, 226, 0.12) 0px, transparent 50%),
    radial-gradient(at 10% 29%, rgba(0, 201, 255, 0.1) 0px, transparent 50%);
}
```

---

## 11. ANGULAR SECTION DIVIDER (Not Curves)

```tsx
<div className="relative">
  {/* Angular divider at bottom */}
  <svg
    className="absolute bottom-0 w-full h-24"
    preserveAspectRatio="none"
    viewBox="0 0 100 100"
  >
    <polygon
      points="0,100 100,0 100,100"
      fill="currentColor"
      className="text-background-dark"
    />
  </svg>

  {/* Section content */}
  <div className="relative z-10 pb-32">
    {/* Content */}
  </div>
</div>
```

**Creates diagonal section breaks (not typical curves)**

---

## 12. LAYERED FRAME EFFECT

```tsx
<div className="relative">
  {/* Background frames */}
  <div className="absolute inset-0 border border-white/10 translate-x-4 translate-y-4 rounded-2xl" />
  <div className="absolute inset-0 border border-white/20 translate-x-2 translate-y-2 rounded-2xl" />

  {/* Main content */}
  <div className="relative bg-surface-glass backdrop-blur-xl border border-white/30 rounded-2xl p-8">
    {/* Your content */}
  </div>
</div>
```

**Creates depth with layered borders**

---

## 13. ANIMATED COUNTER STATS

```tsx
import { useCountUp } from "@/hooks/useCountUp";

function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string; }) {
  const count = useCountUp({
    end: value,
    duration: 2000,
    isActive: true,
  });

  return (
    <div className="text-center">
      <motion.p className="text-5xl font-black text-accent">
        {count.toLocaleString()}{suffix}
      </motion.p>
      <p className="text-foreground-muted">{label}</p>
    </div>
  );
}
```

**Animates from 0 to final number**

---

## 14. GOLD BADGE (Premium Status)

```tsx
<div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gold/10 via-gold/5 to-accent/10 border border-gold/20 rounded-full backdrop-blur-xl shadow-glow-lg">
  <span className="relative flex h-3 w-3">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
    <span className="relative inline-flex rounded-full h-3 w-3 bg-gold"></span>
  </span>
  <span className="text-sm font-bold text-gold uppercase tracking-wider">
    Premium Feature
  </span>
</div>
```

---

## 15. MOBILE-SPECIFIC OPTIMIZATIONS

```tsx
const [isMobile, setIsMobile] = useState(false);
const [disableAnimations, setDisableAnimations] = useState(false);

useEffect(() => {
  const checkMobile = () => {
    const mobile = window.innerWidth < 768;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsMobile(mobile);
    setDisableAnimations(mobile || reducedMotion);
  };
  checkMobile();
  window.addEventListener("resize", checkMobile);
  return () => window.removeEventListener("resize", checkMobile);
}, []);

// Use in animations:
<motion.div
  animate={disableAnimations ? {} : { y: [0, -20, 0] }}
  transition={disableAnimations ? { duration: 0 } : { duration: 6 }}
>
  {/* Content */}
</motion.div>
```

**Disables heavy animations on mobile for performance**

---

## COLOR USAGE QUICK REFERENCE

```tsx
// PRIMARY CTA - Gold gradient
className="bg-gradient-to-r from-gold via-gold-300 to-gold shadow-glow-gold-lg"

// SECONDARY CTA - Cyan border
className="border-2 border-accent text-accent hover:bg-accent/10"

// TERTIARY ACTION - Mocha accent
className="border border-mocha text-mocha hover:bg-mocha/5"

// SUCCESS STATE - Gold
className="bg-gold/10 border border-gold/30 text-gold"

// TECH ELEMENT - Cyan
className="bg-accent/10 border border-accent/30 text-accent"

// LIVE INDICATOR - Animated cyan
<div className="relative flex h-3 w-3">
  <span className="animate-ping absolute h-full w-full rounded-full bg-accent opacity-75"></span>
  <span className="relative rounded-full h-3 w-3 bg-accent"></span>
</div>
```

---

## TYPOGRAPHY QUICK REFERENCE

```tsx
// Hero Headline (XL)
className="text-display-xl font-black text-gradient-gold-cyan"

// Section Headline (LG)
className="text-display-lg font-bold text-foreground"

// Card Headline (MD)
className="text-display-md font-semibold text-foreground"

// Body Copy
className="text-lg text-foreground-muted leading-relaxed"

// Small Text
className="text-sm text-foreground-subtle"

// Eyebrow Label
className="text-xs font-bold uppercase tracking-widest text-accent"
```

---

## SPACING QUICK REFERENCE

```tsx
// Section Padding
className="py-16 sm:py-20 md:py-24 lg:py-32"

// Card Padding
className="p-6 sm:p-8 lg:p-10"

// Element Gap
className="gap-4 sm:gap-6 lg:gap-8"

// Margin Bottom
className="mb-8 sm:mb-12 lg:mb-16"

// Touch Target (Mobile)
className="min-h-[48px] min-w-[48px]"
```

---

## RESPONSIVE PATTERNS

```tsx
// Mobile-First Column Layout
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"

// Hide on Mobile
className="hidden lg:block"

// Show Only on Mobile
className="lg:hidden"

// Responsive Text Size
className="text-base sm:text-lg md:text-xl lg:text-2xl"

// Responsive Padding
className="px-4 sm:px-6 lg:px-8"
```

---

**Remember:** Every pattern here is designed to be DISTINCTIVE and avoid AI slop aesthetics. Use gold for premium, mix font weights dramatically, and always add intentional asymmetry.
