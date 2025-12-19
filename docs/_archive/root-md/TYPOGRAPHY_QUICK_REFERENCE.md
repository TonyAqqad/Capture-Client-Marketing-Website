# Typography Weight Extremes - Quick Reference

## 🎯 Quick Usage Guide

### Available Font Weights

| Tailwind Class | Weight | Font | Purpose |
|----------------|--------|------|---------|
| `font-ultralight` | 200 | Bricolage | Dramatic contrast, elegant emphasis |
| `font-light` | 300 | Inter | Subtle text, secondary content |
| `font-normal` | 400 | Both | Body text, paragraphs |
| `font-medium` | 500 | Inter | Emphasized text |
| `font-semibold` | 600 | Both | Subheadings |
| `font-bold` | 700 | Both | Headings |
| `font-extrabold` | 800 | Bricolage | Hero text, maximum impact |

---

## 🚀 Ready-to-Use Examples

### 1. Extreme Contrast Hero
```jsx
<h1 className="text-7xl">
  <span className="font-ultralight">STOP losing</span>{' '}
  <span className="font-extrabold">LEADS</span>
</h1>
```

### 2. Premium Utility Classes
```jsx
// Ultra-light display
<h2 className="text-display-ultralight text-5xl">
  Elegant Headline
</h2>

// Extra-bold hero
<h1 className="text-display-hero text-8xl">
  POWERFUL IMPACT
</h1>

// Contrast headline container
<h1 className="text-contrast-headline text-6xl">
  <span className="font-ultralight">TRANSFORM</span>
  <span className="font-extrabold">YOUR BUSINESS</span>
</h1>
```

### 3. Pricing Cards
```jsx
<div className="pricing-card">
  <span className="font-light text-sm">Starting at</span>
  <span className="font-extrabold text-5xl">$997</span>
  <span className="font-medium text-base">/month</span>
</div>
```

### 4. Testimonial
```jsx
<blockquote>
  <p className="font-light text-xl italic">
    "Absolutely transformed our business"
  </p>
  <cite className="font-semibold text-base">
    — John Doe, CEO
  </cite>
</blockquote>
```

### 5. Feature List
```jsx
<div className="feature">
  <h3 className="font-bold text-2xl">AI Voice Agents</h3>
  <p className="font-light text-lg">
    24/7 automated lead qualification
  </p>
</div>
```

---

## 💎 Premium CSS Utility Classes

### Pre-built Classes

```css
.text-display-ultralight   /* Weight 200, wider spacing */
.text-display-hero         /* Weight 800, tighter spacing */
.text-contrast-headline    /* Container for mixed weights */
.text-display-light        /* Weight 200, relaxed spacing */
```

### Usage
```jsx
<h1 className="text-display-hero text-8xl text-gradient-gold">
  PREMIUM
</h1>
```

---

## ⚡ Performance Tips

1. **Preloaded fonts** - No FOIT (Flash of Invisible Text)
2. **Swap display** - Content appears immediately
3. **Optimized letter-spacing** - Automatic in utility classes
4. **Variable fonts** - Single file, multiple weights

---

## 🎨 Design Guidelines

### When to Use Ultra-Light (200)
- ✅ Large hero text for contrast
- ✅ Elegant subheadings
- ✅ Premium branding moments
- ❌ Body text (too light)
- ❌ Small sizes (hard to read)

### When to Use Extra-Bold (800)
- ✅ Hero headlines
- ✅ Important numbers (prices, stats)
- ✅ Strong CTAs
- ✅ Brand emphasis
- ❌ Long paragraphs (too heavy)

### Best Practices
1. **Maximum 600-point contrast** in single headline
2. **Use medium weights (400-600)** for body text
3. **Pair ultra-light with extra-bold** for drama
4. **Keep letter-spacing adjusted** (wider for light, tighter for bold)

---

## 📦 Component Snippets

### Premium CTA Button
```jsx
<button className="btn-gold px-8 py-4">
  <span className="block font-light text-xs">FROM</span>
  <span className="block font-extrabold text-3xl">$997</span>
</button>
```

### Stat Counter
```jsx
<div className="stat">
  <span className="font-extrabold text-7xl text-gradient-gold">
    10,000+
  </span>
  <span className="font-light text-xl">
    Leads Captured
  </span>
</div>
```

### Feature Heading
```jsx
<h2 className="text-5xl">
  <span className="font-ultralight">Experience</span>{' '}
  <span className="font-extrabold text-gradient-gold">Excellence</span>
</h2>
```

---

## 🔧 Troubleshooting

### Text looks too thin
```jsx
// ❌ Wrong
<p className="font-ultralight text-sm">Body text</p>

// ✅ Correct
<p className="font-normal text-base">Body text</p>
```

### Text looks too heavy
```jsx
// ❌ Wrong
<p className="font-extrabold text-base">Long paragraph...</p>

// ✅ Correct
<p className="font-normal text-base">Long paragraph...</p>
```

### Letter-spacing issues
```jsx
// ❌ Wrong
<h1 className="font-ultralight">TIGHT</h1>

// ✅ Correct - Use utility class with proper spacing
<h1 className="text-display-ultralight">PROPER SPACING</h1>
```

---

## 📱 Mobile Considerations

### Responsive Typography
```jsx
<h1 className="text-4xl sm:text-6xl lg:text-8xl">
  <span className="font-ultralight">Transform</span>{' '}
  <span className="font-extrabold">Today</span>
</h1>
```

### Touch-Friendly Sizing
```jsx
// Always use readable sizes on mobile
<p className="font-light text-base sm:text-lg">
  Mobile-optimized text
</p>
```

---

## ✅ Build Status
**✅ TypeScript compilation:** PASSED
**✅ Next.js build:** SUCCESS
**✅ Zero errors:** Confirmed

---

## 🎯 Summary

You now have:
- **7 font weight variants** (200-800)
- **Premium utility classes** for instant use
- **Extreme contrast capability** (600-point difference)
- **Production-ready** typography system
- **$5M quality** visual hierarchy

**Start using:** Add `font-ultralight` and `font-extrabold` to your hero sections today!
