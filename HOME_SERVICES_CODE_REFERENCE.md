# Home Services Page - Code Patterns & Examples

## ROI Calculator Implementation

### State Management
```typescript
// Calculator state
const [monthlyCalls, setMonthlyCalls] = useState(100);
const [avgJobValue, setAvgJobValue] = useState(1200);
const [calculatedLoss, setCalculatedLoss] = useState(0);
const [lostRevenue, setLostRevenue] = useState(0);

// Real-time calculation
useEffect(() => {
  const missedCalls = monthlyCalls * 0.27; // 27% industry average
  const annualLoss = missedCalls * avgJobValue * 12;
  setCalculatedLoss(Math.round(annualLoss));
}, [monthlyCalls, avgJobValue]);
```

### Animated Counter
```typescript
// Smooth number counting animation
useEffect(() => {
  if (calculatedLoss === 0) return;
  let current = 0;
  const increment = calculatedLoss / 50; // 50 steps
  const timer = setInterval(() => {
    current += increment;
    if (current >= calculatedLoss) {
      setLostRevenue(calculatedLoss);
      clearInterval(timer);
    } else {
      setLostRevenue(Math.round(current));
    }
  }, 30); // 30ms per step = ~1.5s total
  return () => clearInterval(timer);
}, [calculatedLoss]);
```

### Range Slider Component
```tsx
<input
  type="range"
  min="20"
  max="500"
  step="10"
  value={monthlyCalls}
  onChange={(e) => setMonthlyCalls(Number(e.target.value))}
  className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-gold"
/>
```

---

## Trade Tabs Implementation

### Trade Data Structure
```typescript
const TRADES = [
  {
    id: "hvac",
    name: "HVAC",
    icon: "🔥",
    color: "from-red-500/20 to-orange-500/20",
    borderColor: "border-red-500/30",
    scenario: "3 AM emergency call",
    value: "$900+",
    pain: "AC dies at midnight. Customer calls 5 companies. First to answer wins.",
  },
  // ... other trades
];
```

### Tab Navigation
```tsx
<div className="flex flex-wrap justify-center gap-4">
  {TRADES.map((trade) => (
    <button
      key={trade.id}
      onClick={() => setActiveTrade(trade.id)}
      className={`px-6 py-3 rounded-xl font-semibold transition-all ${
        activeTrade === trade.id
          ? `glass-premium ${trade.borderColor} border-2 text-foreground shadow-glow-gold`
          : "glass text-foreground-muted hover:text-foreground"
      }`}
    >
      <span className="mr-2">{trade.icon}</span>
      {trade.name}
    </button>
  ))}
</div>
```

### Tab Content with Animation
```tsx
<AnimatePresence mode="wait">
  {TRADES.filter(t => t.id === activeTrade).map((trade) => (
    <motion.div
      key={trade.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Trade-specific content */}
    </motion.div>
  ))}
</AnimatePresence>
```

---

## Premium Design Patterns

### Glass Card with Gold Accent
```tsx
<div className="glass-premium p-8 rounded-3xl bg-gradient-to-br from-gold/10 to-cyan-500/10 border-2 border-gold/30">
  {/* Content */}
</div>
```

### Gradient Text
```tsx
<span className="text-gradient-gold-cyan">
  $69K/Year
</span>
```

### Animated Gradient Orb
```tsx
<motion.div
  className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-30"
  animate={{
    scale: [1, 1.2, 1],
    opacity: [0.3, 0.4, 0.3]
  }}
  transition={{ duration: 8, repeat: Infinity }}
>
  <div className="w-full h-full bg-gradient-radial from-gold-500/40 via-gold-500/20 to-transparent blur-3xl" />
</motion.div>
```

### Gold Button with Glow
```tsx
<a
  href="tel:865-346-3339"
  className="btn-gold px-10 py-5 text-xl font-bold rounded-xl shadow-glow-gold-intense hover:scale-105 transition-all"
>
  📞 Call 865-346-3339
</a>
```

---

## Framer Motion Patterns

### Staggered Reveal
```tsx
{items.map((item, index) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
  >
    {/* Content */}
  </motion.div>
))}
```

### Hero Badge Animation
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gold/20 via-gold/10 to-transparent border border-gold/30 backdrop-blur-xl"
>
  <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
  <span className="text-sm font-bold uppercase tracking-wider text-gold">
    Badge Text
  </span>
</motion.div>
```

---

## Responsive Design Patterns

### Mobile-First Grid
```tsx
<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
  {/* Stacks on mobile, 2 cols on tablet, 4 cols on desktop */}
</div>
```

### Conditional Layout
```tsx
<div className="grid lg:grid-cols-2 gap-8 items-center">
  <div className="order-2 lg:order-1">
    {/* Visual on left for desktop */}
  </div>
  <div className="order-1 lg:order-2">
    {/* Text on right for desktop */}
  </div>
</div>
```

### Mobile CTA Buttons
```tsx
<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
  <a className="btn-gold w-full sm:w-auto">
    Primary CTA
  </a>
  <a className="btn-ghost w-full sm:w-auto">
    Secondary CTA
  </a>
</div>
```

---

## SEO Schema Patterns

### Service Schema
```typescript
const industrySchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "AI Answering Service for Home Service Contractors",
  provider: {
    "@type": "Organization",
    name: "Capture Client",
  },
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
};
```

### FAQ Schema
```typescript
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much revenue do contractors lose?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "27% of contractor calls go unanswered...",
      },
    },
  ],
};
```

---

## Interactive Elements

### Before/After Comparison
```tsx
<div className="grid md:grid-cols-2 gap-8">
  {/* Before - Red accent */}
  <div className="glass-card p-8 border-2 border-red-500/30">
    <div className="text-center mb-6">
      <div className="text-6xl mb-4">😴</div>
      <h3 className="text-2xl font-bold text-red-400">Before: Voicemail</h3>
    </div>
    <ul className="space-y-3">
      <li className="flex items-start gap-3">
        <span className="text-red-400">❌</span>
        <span>Negative outcome</span>
      </li>
    </ul>
  </div>

  {/* After - Green accent */}
  <div className="glass-premium p-8 border-2 border-green-500/30 bg-gradient-to-br from-green-500/10 to-gold/10">
    <div className="text-center mb-6">
      <div className="text-6xl mb-4">🤖</div>
      <h3 className="text-2xl font-bold text-green-400">After: AI Answers</h3>
    </div>
    <ul className="space-y-3">
      <li className="flex items-start gap-3">
        <span className="text-green-400">✓</span>
        <span>Positive outcome</span>
      </li>
    </ul>
  </div>
</div>
```

### 4-Step Process Cards
```tsx
{[
  { step: "1", title: "Step Title", description: "Details", icon: "📞" },
  // ... more steps
].map((item, index) => (
  <motion.div
    key={item.step}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="glass-card p-8 text-center"
  >
    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold/20 to-cyan-500/20 border border-gold/30 flex items-center justify-center mx-auto mb-4 text-3xl">
      {item.icon}
    </div>
    <div className="text-sm text-gold font-bold mb-2">STEP {item.step}</div>
    <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
    <p className="text-foreground-muted">{item.description}</p>
  </motion.div>
))}
```

---

## Typography Classes Reference

```css
/* Hero Headlines */
.text-display-lg      /* 2.5-5rem, responsive */
.text-hero-xl         /* 3-7rem, maximum impact */
.text-display-md      /* 1.5-2.75rem */

/* Accent Text */
.text-gradient-gold-cyan  /* Gold to Cyan gradient */
.text-gradient-gold       /* Pure gold gradient */

/* Font Families */
.font-display         /* Bricolage Grotesque */
.font-accent          /* Syne */
.font-body            /* Poppins */
```

---

## Color Utility Classes

```css
/* Gold Accents */
.text-gold            /* #D4AF37 */
.border-gold/30       /* Gold border 30% opacity */
.bg-gold/10           /* Gold background 10% opacity */

/* Gradients */
.from-gold/20 to-cyan-500/20    /* Gold to Cyan gradient */
.from-red-500/20 to-orange-500/20  /* HVAC red/orange */
.from-blue-500/20 to-cyan-500/20   /* Plumbing blue */
.from-yellow-500/20 to-amber-500/20 /* Electrical yellow */
.from-green-500/20 to-emerald-500/20 /* Roofing green */

/* Shadows */
.shadow-glow-gold        /* Gold glow */
.shadow-glow-gold-lg     /* Large gold glow */
.shadow-glow-gold-intense /* Intense gold glow */
```

---

## Glass Components Reference

```css
/* Glass Cards */
.glass                /* Basic glass: bg-white/5 blur-10px */
.glass-card           /* Glass card with gradient */
.glass-premium        /* Premium glass with stronger blur */

/* Glass Buttons */
.btn-gold             /* Solid gold gradient button */
.btn-gold-outline     /* Outlined gold button */
.btn-ghost            /* Transparent ghost button */
```

---

## Performance Optimization Patterns

### Conditional Animation Loading
```typescript
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const checkMobile = () => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
  };
  checkMobile();
  window.addEventListener("resize", checkMobile);
  return () => window.removeEventListener("resize", checkMobile);
}, []);

// Use in motion components
<motion.div
  animate={isMobile ? {} : { scale: [1, 1.2, 1] }}
>
```

### Lazy Loading Heavy Sections
```typescript
// Only animate on scroll into view
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
>
```

---

## Accessibility Patterns

### Semantic HTML
```tsx
<section className="section">
  <h2 className="text-display-md">Section Title</h2>
  <div className="grid">
    <article className="glass-card">
      {/* Card content */}
    </article>
  </div>
</section>
```

### ARIA Labels for Icons
```tsx
<button aria-label="Calculate lost revenue">
  💰
</button>
```

### Keyboard Navigation
```tsx
<button
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setActiveTrade(trade.id);
    }
  }}
>
  Trade Tab
</button>
```

---

## File Structure

```
src/app/industries/home-services/
├── layout.tsx          # Metadata + SEO schemas
└── page.tsx            # Main page component

Component breakdown:
├── Hero Section        (lines 72-140)
├── Problem Impact      (lines 142-190)
├── Trade Tabs          (lines 192-275)
├── FSM Integration     (lines 277-310)
├── ROI Calculator      (lines 312-380)
├── How It Works        (lines 382-430)
├── Testimonials        (lines 432-480)
├── After Hours         (lines 482-530)
└── Final CTA           (lines 532-580)
```

---

## Testing Checklist

### Functional Testing
- [ ] Trade tabs switch smoothly
- [ ] ROI calculator updates in real-time
- [ ] Range sliders work on mobile
- [ ] Phone number links work (tel:)
- [ ] Internal links navigate correctly
- [ ] Animations play smoothly

### Visual Testing
- [ ] Glass morphism renders correctly
- [ ] Gold gradient text displays properly
- [ ] Icons show (emoji fallback)
- [ ] Responsive breakpoints work
- [ ] Dark mode compatibility

### SEO Testing
- [ ] Metadata tags present in `<head>`
- [ ] JSON-LD validates (Google Rich Results Test)
- [ ] Open Graph tags work (Facebook Debugger)
- [ ] Canonical URL set correctly
- [ ] Alt text on any images (currently using emojis)

---

## Key Formulas

### Lost Revenue Calculation
```
Missed Calls = Monthly Calls × 0.27
Annual Lost Revenue = Missed Calls × Avg Job Value × 12 months

Example:
100 calls/month × 0.27 = 27 missed calls/month
27 × $1,200 × 12 = $388,800/year
```

### Industry Stats Used
- 27% of contractor calls go unanswered
- 85% of missed callers never call back
- 35-40% of jobs come from after-hours calls

---

## Brand Voice Guidelines

### Tone
- Direct and urgent (pain-focused)
- Solution-oriented
- Industry-specific (contractor language)

### Key Phrases
- "Stop losing $X to missed calls"
- "Never miss a 3 AM emergency"
- "Capture every call, win every job"
- "Your competitors are answering"

### Numbers to Emphasize
- $69K average annual loss
- 27% missed call rate
- $900+ average emergency job
- 2 rings response time

---

## Deployment Notes

### Environment Variables
None required (static page)

### Build Command
```bash
npm run build
```

### Test Locally
```bash
npm run dev
# Navigate to: http://localhost:3000/industries/home-services
```

### Production URL
```
https://captureclientai.net/industries/home-services
```

---

## Future Enhancements

### Potential Additions
1. **Video Background:** Add video of contractor on emergency call
2. **Live Chat Widget:** Integrate Intercom/Drift
3. **Testimonial Videos:** Embed contractor video testimonials
4. **Interactive Demo:** Show AI voice agent in action
5. **Calendar Integration:** Direct booking calendar embed
6. **A/B Testing:** Test different headlines/CTAs
7. **Heatmap Tracking:** Hotjar for user behavior analysis

### Analytics Events to Track
```javascript
// Track ROI calculator usage
gtag('event', 'roi_calculator_used', {
  monthly_calls: monthlyCalls,
  job_value: avgJobValue,
  calculated_loss: lostRevenue
});

// Track trade tab clicks
gtag('event', 'trade_tab_clicked', {
  trade: tradeId
});

// Track CTA clicks
gtag('event', 'phone_cta_clicked', {
  location: 'hero' | 'calculator' | 'final_cta'
});
```

---

This reference document provides all the code patterns and implementation details for the Home Services industry page.
