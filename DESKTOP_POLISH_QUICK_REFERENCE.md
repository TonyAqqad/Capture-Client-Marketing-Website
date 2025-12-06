# DESKTOP POLISH - QUICK REFERENCE CARD

**Use this guide when building new components to maintain desktop polish consistency.**

---

## CURSOR FEEDBACK

```tsx
// All interactive elements
className="cursor-pointer"

// Text inputs
className="cursor-text" // (default, usually not needed)

// Drag/drop elements
className="cursor-grab active:cursor-grabbing"
```

---

## FOCUS STATES (KEYBOARD NAVIGATION)

```tsx
// Premium focus ring (recommended for all interactive elements)
className="focus-ring-premium"

// Manual focus state (if custom styling needed)
className="focus-visible:ring-2 focus-visible:ring-accent/80
           focus-visible:ring-offset-4 focus-visible:ring-offset-background-dark
           focus-visible:shadow-glow-lg"
```

---

## BUTTONS

### Primary CTA

```tsx
<button className="
  relative group overflow-hidden
  bg-gradient-to-r from-accent via-primary to-accent
  text-white font-bold px-8 py-4 rounded-xl

  /* Desktop hover */
  lg:hover:shadow-[0_0_60px_rgba(0,201,255,0.6)]
  lg:hover:scale-[1.03]
  lg:hover:-translate-y-1

  /* Focus visible */
  focus-ring-premium

  /* Smooth transition */
  transition-all duration-500 ease-out
  cursor-pointer
">
  Get Started
</button>
```

### Secondary Button

```tsx
<button className="
  bg-transparent border-2 border-white/20
  text-foreground font-medium px-6 py-3 rounded-xl

  /* Desktop hover */
  lg:hover:bg-white/10
  lg:hover:border-white/30

  /* Focus visible */
  focus-ring-premium

  transition-all duration-300
  cursor-pointer
">
  Learn More
</button>
```

---

## LINKS

### Navigation Link (Header)

```tsx
<Link href="/services" className="
  relative px-4 py-2
  text-foreground-muted hover:text-accent
  font-medium transition-colors duration-300
  group cursor-pointer
  focus-ring-premium
">
  <span className="relative z-10">Services</span>

  {/* Double underline effect */}
  <span className="absolute inset-x-4 -bottom-px h-px
                   bg-gradient-to-r from-primary to-accent
                   scale-x-0 group-hover:scale-x-100
                   transition-transform duration-300 origin-left" />
  <span className="absolute inset-x-4 -bottom-0.5 h-px
                   bg-gradient-to-r from-accent to-primary opacity-50
                   scale-x-0 group-hover:scale-x-100
                   transition-transform duration-300 delay-75 origin-left" />
</Link>
```

### Footer Link

```tsx
<Link href="/about" className="
  group inline-flex items-center gap-2
  text-foreground-muted hover:text-accent
  transition-all duration-300
  cursor-pointer focus-ring-premium
">
  <span className="w-1 h-1 rounded-full bg-primary
                   group-hover:bg-accent transition-colors" />
  <span className="group-hover:translate-x-1 transition-transform">
    About Us
  </span>
</Link>
```

### Text Link with Underline

```tsx
<a href="#" className="link-desktop-premium focus-ring-premium">
  Learn more
</a>
```

---

## CARDS

### Standard Card

```tsx
<div className="
  card
  desktop-hover-lift
  cursor-pointer
  focus-ring-premium
  tabindex='0'
">
  {/* Card content */}
</div>
```

### Premium Card

```tsx
<div className="
  card-desktop-premium
  cursor-pointer
  focus-ring-premium
  tabindex='0'
">
  {/* Card content */}
</div>
```

### Service Card (with Framer Motion)

```tsx
<motion.div
  whileHover={{ y: -12, transition: { duration: 0.3 } }}
  className="group relative cursor-pointer"
  tabIndex={0}
>
  {/* Gradient glow on hover */}
  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/10
                  opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

  <div className="relative bg-surface/50 border-2 border-accent/30
                  group-hover:border-accent/100 group-hover:shadow-glow
                  rounded-2xl p-8 transition-all duration-500
                  focus-visible:ring-2 focus-visible:ring-accent/60">
    {/* Content */}
  </div>
</motion.div>
```

---

## FORMS

### Input Field

```tsx
<input
  type="text"
  className="
    w-full px-4 py-3
    bg-white/5 border border-white/10 rounded-lg
    text-foreground placeholder:text-foreground-muted

    /* Focus state */
    focus:outline-none
    focus:ring-2 focus:ring-accent/80
    focus:ring-offset-2 focus:ring-offset-background-dark
    focus:border-accent/50

    /* Hover state */
    hover:border-white/20

    transition-all duration-300
  "
  placeholder="Enter your email"
/>
```

### Textarea

```tsx
<textarea
  className="
    w-full px-4 py-3
    bg-white/5 border border-white/10 rounded-lg
    text-foreground placeholder:text-foreground-muted
    resize-none

    /* Focus state */
    focus-ring-premium

    transition-all duration-300
  "
  rows={4}
  placeholder="Your message"
/>
```

---

## LAYOUT

### Container (Ultra-wide Support)

```tsx
<div className="container-desktop-max px-4 sm:px-6 lg:px-8">
  {/* Content constrained to max 1920px */}
</div>
```

### Hero Content

```tsx
<div className="hero-content-desktop">
  {/* Max-width 4xl for readable line length */}
  <h1>Your headline</h1>
  <p>Your description with optimal line length</p>
</div>
```

### Grid (Responsive)

```tsx
{/* Service grid: 1 → 2 → 4 columns */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
  {services.map(service => <ServiceCard key={service.id} {...service} />)}
</div>

{/* Pricing grid: 1 → 2 → 3 columns */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
  {plans.map(plan => <PricingCard key={plan.id} {...plan} />)}
</div>
```

---

## ANIMATIONS (FRAMER MOTION)

### Parallax Scroll

```tsx
import { useScroll, useTransform } from "framer-motion";

const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start end", "end start"]
});

const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

<motion.div
  style={{ y, opacity }}
  className="absolute inset-0 hidden lg:block"
>
  {/* Background elements */}
</motion.div>
```

### Stagger Children

```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
  }
};

<motion.div
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
>
  {items.map(item => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### Hover Scale

```tsx
<motion.div
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  className="cursor-pointer"
>
  {/* Content */}
</motion.div>
```

---

## ACCESSIBILITY

### Skip to Main Content (Already in layout.tsx)

```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4
             bg-accent text-background-dark px-6 py-3 rounded-lg font-bold z-50
             focus-ring-premium"
>
  Skip to main content
</a>

<main id="main-content">
  {/* Page content */}
</main>
```

### Keyboard-Accessible Card

```tsx
<div
  className="card cursor-pointer focus-ring-premium"
  tabIndex={0}
  role="button"
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
  {/* Card content */}
</div>
```

---

## PERFORMANCE

### Desktop-Only Animations

```tsx
// Disable complex animations on mobile
const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

<motion.div
  animate={isMobile ? {} : {
    y: [0, -20, 0],
    transition: { duration: 6, repeat: Infinity }
  }}
>
```

### will-change (Automatic in CSS)

Will-change is automatically applied on hover in globals.css for:
- `.card`
- `.card-desktop-premium`
- `button`
- `.btn-primary`
- `.btn-premium`
- `.link-desktop-premium`

No need to manually add will-change in components.

---

## COMMON PATTERNS

### Magnetic Button (Desktop Only)

```tsx
import { MagneticButton } from "@/components/ui/MagneticButton";

<MagneticButton className="
  bg-gradient-to-r from-accent via-primary to-accent
  text-white font-bold px-8 py-4 rounded-xl
  desktop-btn-premium focus-ring-premium
">
  <Link href="/contact">Get Started</Link>
</MagneticButton>
```

### Icon with Rotation on Hover

```tsx
<motion.div
  whileHover={{
    rotate: [0, -10, 10, -10, 0],
    scale: 1.1
  }}
  transition={{ duration: 0.5 }}
  className="flex items-center justify-center w-16 h-16 rounded-xl
             bg-gradient-to-br from-accent/20 to-primary/10"
>
  <span className="material-icons text-accent text-3xl">support_agent</span>
</motion.div>
```

### Gradient Border with Hover

```tsx
<div className="relative group">
  {/* Gradient border (appears on hover) */}
  <div className="absolute -inset-px bg-gradient-to-r from-accent to-primary
                  rounded-2xl opacity-0 group-hover:opacity-100 blur-sm
                  transition-opacity duration-500" />

  {/* Content */}
  <div className="relative bg-surface rounded-2xl p-8">
    {/* Card content */}
  </div>
</div>
```

---

## UTILITY CLASSES CHEAT SHEET

```css
/* Focus */
.focus-ring-premium          → Premium accent focus ring

/* Desktop Hover (lg+ only) */
.desktop-hover-lift          → Lift -2px + shadow
.desktop-scale-hover         → Scale 1.02x
.desktop-glow-hover          → 40px cyan glow
.desktop-btn-premium         → Lift + scale + glow
.card-desktop-premium        → Large shadow + scale + lift
.link-desktop-premium        → Color + gradient underline

/* Layout */
.container-desktop-max       → Max-width 1920px
.hero-content-desktop        → Max-width 4xl

/* Cursor */
.cursor-interactive          → Cursor pointer
```

---

## TESTING CHECKLIST

Before shipping a new component:

- [ ] All interactive elements have cursor-pointer
- [ ] Focus-visible states on all buttons/links
- [ ] Hover effects smooth (300-500ms transitions)
- [ ] Keyboard accessible (Tab order logical)
- [ ] Works on ultra-wide screens (test at 1920px+)
- [ ] Animations respect prefers-reduced-motion
- [ ] No horizontal overflow on any viewport
- [ ] Retina-ready (SVG icons, sharp text)

---

**Reference:** `src/app/globals.css` for all utility class definitions

**Examples:** See existing components in `src/components/` for implementation patterns
