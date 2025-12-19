# Use Cases Page - Reusable Code Patterns

This document contains key code patterns from the Use Cases page that can be reused throughout the Capture Client website.

---

## 1. Industry Card with Gradient Overlay

**Use Case:** Display services, features, or industry-specific content with unique color coding

```typescript
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: i * 0.1 }}
  whileHover={{ y: -8 }}
  className="group relative"
>
  <div className="relative h-full glass-premium p-8 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500">
    {/* Gradient overlay - activates on hover */}
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

    {/* Top shine */}
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

    {/* Content */}
    <div className="relative z-10">
      {/* Icon with gradient background */}
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${iconBg} shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
        <span className="material-icons text-white text-3xl">{icon}</span>
      </div>

      {/* Title with hover gradient effect */}
      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80 group-hover:bg-clip-text">
        {title}
      </h3>

      {/* Content */}
      <div className="space-y-3">
        {/* Your content here */}
      </div>
    </div>

    {/* Bottom glow on hover */}
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  </div>
</motion.div>
```

**Key Features:**
- Gradient overlay activates on hover
- Icon scales up on hover
- Top and bottom shine effects
- Smooth transitions

---

## 2. Animated Hero Background with Multiple Orbs

**Use Case:** Premium hero sections with depth and motion

```typescript
<section className="relative min-h-screen flex items-center overflow-hidden">
  {/* Multi-layer animated background */}
  <div className="absolute inset-0">
    <div className="absolute inset-0 bg-gradient-to-br from-background via-background-dark to-background" />

    {/* Animated gradient orbs */}
    <motion.div
      animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-cyan-500/20 to-transparent blur-3xl"
    />

    <motion.div
      animate={{ scale: [1.2, 1, 1.2], x: [0, -50, 0] }}
      transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-purple-500/20 to-transparent blur-3xl"
    />

    <motion.div
      animate={{ scale: [1, 1.3, 1], rotate: [0, 90, 0] }}
      transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-gold/15 to-transparent blur-3xl"
    />

    {/* Grid overlay */}
    <div className="absolute inset-0 opacity-[0.02]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />
    </div>

    {/* Noise texture */}
    <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay bg-noise pointer-events-none" />
  </div>

  {/* Content */}
  <div className="relative z-10">
    {/* Your content here */}
  </div>
</section>
```

**Key Features:**
- 3 independent animated orbs
- Different animation speeds/patterns
- Grid and noise overlays
- Proper z-index layering

---

## 3. Auto-Rotating Carousel with Manual Navigation

**Use Case:** Testimonials, features, case studies

```typescript
const [currentIndex, setCurrentIndex] = useState(0);
const items = [...]; // Your array of items

// Auto-rotation
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, 5000);
  return () => clearInterval(interval);
}, [items.length]);

return (
  <div className="relative">
    {/* Carousel content */}
    <AnimatePresence mode="wait">
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
        className="glass-premium p-10 rounded-3xl"
      >
        {/* Display items[currentIndex] */}
      </motion.div>
    </AnimatePresence>

    {/* Navigation dots */}
    <div className="flex justify-center gap-2 mt-8">
      {items.map((_, i) => (
        <button
          key={i}
          onClick={() => setCurrentIndex(i)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            i === currentIndex
              ? "bg-gold w-8"
              : "bg-white/20 hover:bg-white/40"
          }`}
          aria-label={`Go to item ${i + 1}`}
        />
      ))}
    </div>
  </div>
);
```

**Key Features:**
- Auto-rotation with cleanup
- Slide transition (enter right, exit left)
- Manual navigation
- Active state indicator

---

## 4. Problem vs Solution Comparison Layout

**Use Case:** Before/after, comparison pages, feature contrast

```typescript
<div className="grid lg:grid-cols-2 gap-8">
  {/* PROBLEM SIDE (RED THEME) */}
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
  >
    <div className="glass-premium p-8 rounded-3xl border-2 border-red-500/20 bg-gradient-to-br from-red-500/5 to-transparent">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
          <span className="material-icons text-red-400">close</span>
        </div>
        <h3 className="text-2xl font-bold text-white">The Old Way</h3>
      </div>

      <div className="space-y-4">
        {problems.map((problem, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="material-icons text-red-400 mt-1">cancel</span>
            <p className="text-white/70">{problem}</p>
          </div>
        ))}
      </div>

      {/* Negative stat */}
      <div className="mt-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
        <p className="text-3xl font-bold text-red-400 mb-1">40-60%</p>
        <p className="text-sm text-white/60">of leads lost to missed calls</p>
      </div>
    </div>
  </motion.div>

  {/* SOLUTION SIDE (GOLD/CYAN THEME) */}
  <motion.div
    initial={{ opacity: 0, x: 30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
  >
    <div className="glass-premium p-8 rounded-3xl border-2 border-gold/30 bg-gradient-to-br from-gold/10 via-cyan-500/5 to-transparent shadow-[0_0_60px_rgba(212,175,55,0.2)]">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold to-cyan-400 flex items-center justify-center shadow-glow-gold">
          <span className="material-icons text-black">check_circle</span>
        </div>
        <h3 className="text-2xl font-bold text-white">The New Way</h3>
      </div>

      <div className="space-y-4">
        {solutions.map((solution, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="material-icons text-gold mt-1">check_circle</span>
            <p className="text-white/90 font-medium">{solution}</p>
          </div>
        ))}
      </div>

      {/* Positive stat */}
      <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-gold/20 to-cyan-400/20 border border-gold/30">
        <p className="text-3xl font-bold bg-gradient-to-r from-gold to-cyan-400 bg-clip-text text-transparent mb-1">100%</p>
        <p className="text-sm text-white/80 font-medium">of leads captured</p>
      </div>
    </div>

    {/* External glow */}
    <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-cyan-400/10 blur-3xl -z-10" />
  </motion.div>
</div>
```

**Key Features:**
- Color-coded themes (red vs gold)
- Icon differentiation (cancel vs check)
- Contrasting stats
- External glow effect

---

## 5. Staggered Grid Animation

**Use Case:** Feature grids, service cards, team members

```typescript
<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {items.map((item, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: i * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="glass-premium p-8 rounded-3xl"
    >
      {/* Card content */}
    </motion.div>
  ))}
</div>
```

**Key Features:**
- Staggered reveal (0.1s per item)
- Hover lift effect
- Scales slightly on hover
- Responsive grid

---

## 6. Premium CTA Button with Animated Icon

**Use Case:** Primary call-to-action buttons

```typescript
<Link
  href="/contact"
  className="group inline-flex items-center gap-3 px-10 py-6 rounded-2xl bg-gradient-to-r from-gold via-gold-light to-gold font-bold text-lg text-black overflow-hidden relative hover:shadow-[0_0_60px_rgba(212,175,55,0.5)] transition-all duration-500 hover:scale-[1.02]"
>
  <span className="relative z-10">Book Your Free Demo</span>
  <motion.span
    className="material-icons relative z-10 text-2xl"
    animate={{ x: [0, 5, 0] }}
    transition={{ duration: 1.5, repeat: Infinity }}
  >
    arrow_forward
  </motion.span>
</Link>
```

**Key Features:**
- Gold gradient background
- Animated arrow icon
- Glow shadow on hover
- Scale on hover
- High contrast (black text on gold)

---

## 7. Scroll-Triggered Parallax Effect

**Use Case:** Hero sections, feature showcases

```typescript
const containerRef = useRef<HTMLElement>(null);

const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start start", "end start"]
});

const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

return (
  <section ref={containerRef}>
    <motion.div
      style={{ y, opacity }}
      className="relative z-10"
    >
      {/* Content moves slower than scroll (parallax) */}
    </motion.div>
  </section>
);
```

**Key Features:**
- Parallax scroll effect
- Fade out as you scroll
- Smooth motion value transforms
- Performance optimized

---

## 8. Mobile-Optimized Animation Detection

**Use Case:** Disable heavy animations on mobile devices

```typescript
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

// Use in animations
<motion.div
  animate={disableAnimations ? {} : { scale: [1, 1.1, 1] }}
  transition={disableAnimations ? {} : { duration: 12, repeat: Infinity }}
>
  {/* Content */}
</motion.div>
```

**Key Features:**
- Detects mobile devices
- Respects reduced motion preference
- Disables heavy animations
- Cleans up event listeners

---

## 9. Icon Grid with Hover Effects

**Use Case:** Partner logos, technology stack, service icons

```typescript
<div className="grid grid-cols-4 sm:grid-cols-8 gap-4 sm:gap-6">
  {icons.map((icon, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      whileHover={{ scale: 1.2, rotate: 5 }}
      className="flex items-center justify-center"
    >
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} opacity-20 hover:opacity-100 flex items-center justify-center transition-all duration-300 cursor-pointer`}>
        <span className="material-icons text-white text-2xl">{icon}</span>
      </div>
    </motion.div>
  ))}
</div>
```

**Key Features:**
- Staggered reveal
- Pop-in animation
- Hover scale + rotate
- Opacity change on hover

---

## 10. Trust Signal Bar

**Use Case:** Social proof, credentials, stats

```typescript
<div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
  <div className="flex items-center gap-2">
    <span className="material-icons text-gold">verified</span>
    <span className="text-sm font-medium text-white/70">500+ Businesses</span>
  </div>

  <div className="w-px h-5 bg-white/20 hidden sm:block" />

  <div className="flex items-center gap-2">
    <span className="material-icons text-gold">star</span>
    <span className="text-sm font-medium text-white/70">4.9/5 Rating</span>
  </div>

  <div className="w-px h-5 bg-white/20 hidden sm:block" />

  <div className="flex items-center gap-2">
    <span className="material-icons text-green-400">trending_up</span>
    <span className="text-sm font-medium text-green-400">{count} Leads Today</span>
  </div>
</div>
```

**Key Features:**
- Compact horizontal layout
- Icon + text pairing
- Dividers between items (desktop only)
- Color-coded by type

---

## 11. Section Header with Badge

**Use Case:** Section dividers, content organization

```typescript
<div className="text-center mb-16">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent/20 via-accent/10 to-transparent border border-accent/20 backdrop-blur-xl mb-6"
  >
    <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
    <span className="text-sm font-bold uppercase tracking-widest text-accent">Section Label</span>
  </motion.div>

  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.1 }}
    className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6"
  >
    Section <span className="bg-gradient-to-r from-gold to-cyan-400 bg-clip-text text-transparent">Headline</span>
  </motion.h2>

  <motion.p
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.2 }}
    className="text-xl text-white/60 max-w-3xl mx-auto"
  >
    Section description text
  </motion.p>
</div>
```

**Key Features:**
- Animated badge with pulse dot
- Gradient headline accent
- Staggered text reveal
- Centered alignment

---

## 12. Stat Badge with Icon

**Use Case:** Metrics, achievements, KPIs

```typescript
<div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-gold/20 to-cyan-400/20 border border-gold/30">
  <span className="material-icons text-gold">trending_up</span>
  <span className="text-lg font-bold bg-gradient-to-r from-gold to-cyan-400 bg-clip-text text-transparent">
    +247% ROI
  </span>
</div>
```

**Key Features:**
- Gradient background
- Icon + text
- Gradient text effect
- Compact, inline display

---

## Usage Guidelines

### When to Use Each Pattern:

1. **Industry Card:** Services, features, product categories
2. **Animated Background:** Hero sections, landing pages
3. **Carousel:** Testimonials, case studies, features
4. **Comparison:** Before/after, feature differentiation
5. **Staggered Grid:** Team, portfolio, services
6. **CTA Button:** Primary conversion actions
7. **Parallax:** Hero sections (desktop only)
8. **Mobile Detection:** All pages with animations
9. **Icon Grid:** Partner logos, integrations
10. **Trust Signals:** Headers, footers
11. **Section Header:** Page organization
12. **Stat Badge:** Metrics, proof points

### Performance Considerations:

- Use `whileInView` with `once: true` for scroll animations
- Add `viewport={{ once: true }}` to prevent re-animation
- Disable heavy animations on mobile
- Use `transform: translateZ(0)` for GPU acceleration
- Clean up intervals and event listeners

### Accessibility:

- Always include `aria-label` on icon buttons
- Respect `prefers-reduced-motion`
- Maintain keyboard navigation
- Use semantic HTML
- Ensure color contrast ratios

---

**Note:** All patterns use the Capture Client design system (Tailwind config, global CSS classes). Ensure design tokens are imported before using these patterns.
