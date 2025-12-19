# FEATURES PAGE - PREMIUM CODE PATTERNS REFERENCE

Quick reference for reusing these premium design patterns across other pages.

---

## 1. STAGGERED GRID LAYOUT

```tsx
{/* Create visual interest with vertical offsets */}
<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
  <div className="md:mt-0">     {/* Base - no offset */}
    <FeatureCard />
  </div>
  <div className="md:mt-12">    {/* Offset down 48px */}
    <FeatureCard />
  </div>
  <div className="md:mt-6">     {/* Offset down 24px */}
    <FeatureCard />
  </div>
</div>
```

**Pattern:** Vary `mt-` values: `mt-0`, `mt-6`, `mt-12` for 3 columns
**Mobile:** Offsets disabled on mobile (md: breakpoint only)

---

## 2. LAYERED FRAME EFFECT

```tsx
<motion.div className="group relative">
  {/* Layer 3 - Furthest back, lightest */}
  <div className="absolute inset-0 border border-white/5 translate-x-3 translate-y-3 rounded-2xl" />

  {/* Layer 2 - Middle layer */}
  <div className="absolute inset-0 border border-white/10 translate-x-1.5 translate-y-1.5 rounded-2xl" />

  {/* Glow layer - appears on hover */}
  <div className="absolute -inset-px bg-gradient-to-r from-[#00C9FF]/30 to-[#4A69E2]/30
    rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />

  {/* Layer 1 - Main card (front) */}
  <div className="relative bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
    {/* Content here */}
  </div>
</motion.div>
```

**Pattern:** 3 layers (back, middle, front) with progressive offsets and opacity

---

## 3. NUMBERED BADGE

```tsx
{/* Positioned absolutely at top-left corner */}
<div className="absolute -top-3 -left-3 w-10 h-10 sm:w-12 sm:h-12
  bg-[#00C9FF]/10 border-[#00C9FF]/20 border rounded-full
  flex items-center justify-center font-black text-sm sm:text-base shadow-lg">
  01
</div>
```

**Variations:**
- Cyan: `bg-[#00C9FF]/10 border-[#00C9FF]/20 text-[#00C9FF]`
- Blue: `bg-[#4A69E2]/10 border-[#4A69E2]/20 text-[#4A69E2]`

---

## 4. ROTATING ICON BACKGROUND

```tsx
<div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-6">
  {/* Continuous rotating glow */}
  <motion.div
    className="absolute inset-0 bg-gradient-to-br from-[#00C9FF]/10 to-transparent
      rounded-xl blur-md opacity-50"
    animate={{ rotate: 360 }}
    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
  />

  {/* Hover rotation */}
  <motion.div
    className="absolute inset-0 bg-gradient-to-br from-[#00C9FF]/10 to-transparent
      rounded-xl border border-white/10"
    whileHover={{ rotate: 90 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  />

  {/* Icon */}
  <div className="relative w-full h-full flex items-center justify-center text-[#00C9FF]">
    <IconComponent className="w-10 h-10" />
  </div>
</div>
```

**Pattern:** Layer continuous rotation + hover rotation for depth

---

## 5. GLASS CARD WITH SHIMMER

```tsx
<motion.div className="group relative ... overflow-hidden">
  {/* Glass base layer */}
  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-white/[0.02]
    to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

  {/* Horizontal shimmer sweep on hover */}
  <motion.div
    className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
    initial={false}
    animate={{
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "linear"
    }}
    style={{
      background: 'linear-gradient(90deg, transparent 0%, rgba(0, 201, 255, 0.1) 50%, transparent 100%)',
      backgroundSize: '200% 100%'
    }}
  />

  {/* Content */}
  <div className="relative z-10">
    {/* Your content */}
  </div>
</motion.div>
```

**Effect:** Glass overlay + infinite shimmer on hover

---

## 6. BOTTOM EDGE HIGHLIGHT

```tsx
{/* Subtle bottom border that appears on hover */}
<div className="absolute bottom-0 left-0 right-0 h-px
  bg-gradient-to-r from-transparent via-white/10 to-transparent
  opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
```

**Pattern:** Gradient border (transparent → white → transparent)

---

## 7. PREMIUM CAROUSEL WITH FADE EDGES

```tsx
<div className="relative">
  {/* Left fade edge */}
  <div className="absolute left-0 top-0 bottom-0 w-32 sm:w-40
    bg-gradient-to-r from-[#1a1a3e] to-transparent z-10 pointer-events-none" />

  {/* Right fade edge */}
  <div className="absolute right-0 top-0 bottom-0 w-32 sm:w-40
    bg-gradient-to-l from-[#1a1a3e] to-transparent z-10 pointer-events-none" />

  {/* Scrolling content */}
  <motion.div
    animate={{ x: [0, -1000] }}
    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
    className="flex gap-8 items-center"
  >
    {items.map((item) => (
      <div key={item.id}>{/* Item */}</div>
    ))}
  </motion.div>
</div>
```

**Pattern:** Absolute positioned gradient overlays (pointer-events-none)

---

## 8. MULTI-LAYER BACKGROUND

```tsx
<div className="absolute inset-0">
  {/* Base solid color */}
  <div className="absolute inset-0 bg-[#0F172A]" />

  {/* Gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#00C9FF]/10
    via-[#4A69E2]/10 to-transparent" />

  {/* Animated orb 1 */}
  <motion.div
    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
    transition={{ duration: 8, repeat: Infinity }}
    className="absolute top-20 left-20 w-96 h-96 bg-[#00C9FF]/20 rounded-full blur-3xl"
  />

  {/* Animated orb 2 */}
  <motion.div
    animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
    transition={{ duration: 10, repeat: Infinity, delay: 1 }}
    className="absolute bottom-20 right-20 w-[500px] h-[500px]
      bg-[#4A69E2]/20 rounded-full blur-3xl"
  />

  {/* Grid overlay */}
  <div
    className="absolute inset-0 opacity-[0.02]"
    style={{
      backgroundImage: `
        linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
      `,
      backgroundSize: '60px 60px'
    }}
  />
</div>
```

**Pattern:** 5 layers (base → gradient → orb 1 → orb 2 → grid)

---

## 9. PREMIUM CTA BUTTON

```tsx
<motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
  <Link className="group relative px-10 py-5 bg-[#00C9FF] text-[#0F172A]
    font-bold text-lg rounded-full overflow-hidden
    hover:shadow-[0_0_40px_rgba(0,201,255,0.6)] transition-all">

    {/* Shine effect sweeps across on hover */}
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent
        via-white/30 to-transparent"
      initial={{ x: "-100%" }}
      whileHover={{ x: "100%" }}
      transition={{ duration: 0.6 }}
    />

    {/* Content */}
    <span className="relative z-10 flex items-center gap-2">
      Book a Demo
      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
    </span>
  </Link>
</motion.div>
```

**Pattern:** Scale on hover/tap + shine sweep effect

---

## 10. GLASS BUTTON (Secondary)

```tsx
<motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
  <a className="group relative px-10 py-5 bg-white/[0.05] border-2 border-white/20
    text-white font-bold rounded-full backdrop-blur-lg
    hover:bg-white/10 hover:border-[#00C9FF]/50 transition-all overflow-hidden">

    {/* Glass shimmer on hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/10
      via-transparent to-transparent opacity-0 group-hover:opacity-100
      transition-opacity duration-500" />

    <span className="relative z-10">
      Call Us: (865) 346-3339
    </span>
  </a>
</motion.div>
```

**Pattern:** Glass base + shimmer overlay + border color shift

---

## Color Variations

### Cyan Accent
```tsx
bg-[#00C9FF]/10          // Background
border-[#00C9FF]/20      // Border
text-[#00C9FF]           // Text/Icon
shadow-[0_0_30px_rgba(0,201,255,0.2)]  // Glow
```

### Blue Accent
```tsx
bg-[#4A69E2]/10
border-[#4A69E2]/20
text-[#4A69E2]
shadow-[0_0_30px_rgba(74,105,226,0.2)]
```

---

## Animation Durations (Recommended)

```tsx
// Hover transitions
transition-all duration-300    // Quick responses
transition-all duration-500    // Medium transitions
transition-all duration-700    // Smooth, luxurious

// Framer Motion
duration: 0.5                  // Quick
duration: 0.8                  // Standard
duration: 1.0                  // Slow, dramatic

// Infinite loops
duration: 2                    // Shimmer effects
duration: 8                    // Breathing animations
duration: 20                   // Slow rotations
```

---

## Responsive Breakpoints

```tsx
// Mobile-first approach
text-sm sm:text-base md:text-lg    // Text
p-4 sm:p-6 md:p-8                  // Padding
gap-4 sm:gap-6 md:gap-8            // Gaps
w-12 sm:w-14 md:w-16               // Icon sizes

// Disable desktop-only effects
md:mt-12                           // Only on medium+
lg:grid-cols-3                     // Grid only on large+
```

---

## Copy-Paste Ready Patterns

### Premium Card Template
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className="group relative"
>
  {/* Layered frames */}
  <div className="absolute inset-0 border border-white/5 translate-x-3 translate-y-3 rounded-2xl" />
  <div className="absolute inset-0 border border-white/10 translate-x-1.5 translate-y-1.5 rounded-2xl" />

  {/* Glow */}
  <div className="absolute -inset-px bg-gradient-to-r from-[#00C9FF]/30 to-[#4A69E2]/30
    rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />

  {/* Main card */}
  <div className="relative bg-[#0F172A]/80 backdrop-blur-xl border border-white/10
    rounded-2xl p-8 transition-all group-hover:-translate-y-2">

    {/* Badge */}
    <div className="absolute -top-3 -left-3 w-12 h-12 bg-[#00C9FF]/10
      border-[#00C9FF]/20 border rounded-full flex items-center justify-center
      font-black shadow-lg">01</div>

    {/* Content */}
    <div>{/* Your content here */}</div>

    {/* Bottom highlight */}
    <div className="absolute bottom-0 left-0 right-0 h-px
      bg-gradient-to-r from-transparent via-white/10 to-transparent
      opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  </div>
</motion.div>
```

---

**End of Code Patterns Reference**

All patterns are production-ready, performance-optimized, and fully responsive.
