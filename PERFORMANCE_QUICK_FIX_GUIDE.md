# PERFORMANCE QUICK FIX GUIDE

**Objective:** Get from 4/10 to 9/10 performance score

**Time Required:** 4-6 hours

---

## CRITICAL FIXES (Do First - 2 hours)

### 1. Fix Footer Email Hydration Error (15 min)

**File:** `capture-client-site/src/components/layout/Footer.tsx`

**Find:**
```tsx
<input
  id="footer-email"
  type="email"
  style={{}}  // or style={{caretColor: 'transparent'}}
/>
```

**Replace with:**
```tsx
<input
  id="footer-email"
  type="email"
  className="... [caret-color:transparent]"
  // Remove style prop entirely
/>
```

**Test:** No more hydration error in browser console

---

### 2. Fix OptimizedLeadForm Hydration Error (30 min)

**File:** `capture-client-site/src/components/forms/OptimizedLeadForm.tsx`

**Find all input fields with conditional styles:**
```tsx
style={isFocused ? {caretColor: 'transparent'} : {}}
```

**Replace with:**
```tsx
className="... [caret-color:transparent]"
// Remove all style props from form inputs
```

**Test:** No hydration errors on homepage or location pages

---

### 3. Add Logo Dimensions (10 min)

**File:** `capture-client-site/src/components/layout/Header.tsx` or `MegaMenu.tsx`

**Find:**
```tsx
<Image src="/logo-desktop.svg" alt="Capture Client" />
```

**Replace with:**
```tsx
<Image
  src="/logo-desktop.svg"
  alt="Capture Client"
  width={200}
  height={60}
  priority
/>
```

**Note:** Adjust width/height to match your actual logo dimensions

**Test:** No image warning in console

---

### 4. Fix Motion Container Positioning (15 min)

**Search for:** `Please ensure that the container has a non-static position`

**Find components using Framer Motion:**
```tsx
<motion.div initial={{opacity:0,y:30}}>
```

**Wrap in positioned container:**
```tsx
<div className="relative">
  <motion.div initial={{opacity:0,y:30}}>
    {/* ... */}
  </motion.div>
</div>
```

**Test:** No motion warnings in console

---

## HIGH PRIORITY FIXES (Next - 2 hours)

### 5. Optimize Font Loading (45 min)

**File:** `capture-client-site/app/layout.tsx`

**Current:** 9 font files loading

**Goal:** Reduce to 4-5 fonts

**Implementation:**
```tsx
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],  // Only these weights
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-poppins',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-poppins">
        {children}
      </body>
    </html>
  )
}
```

**Test:**
```bash
# Open DevTools Network tab, filter to Fonts
# Should see ~4-5 font files instead of 9
```

---

### 6. Lazy Load Heavy Components (1 hour)

**Identify heavy components:**
- Interactive demos
- Complex animations
- Large data visualizations

**Convert to dynamic imports:**
```tsx
// BEFORE
import { HeavyFeature } from './HeavyFeature'

// AFTER
import dynamic from 'next/dynamic'

const HeavyFeature = dynamic(() => import('./HeavyFeature'), {
  loading: () => <div className="h-64 animate-pulse bg-gray-800/50" />,
  ssr: false  // if component doesn't need SSR
})
```

**Good candidates for lazy loading:**
- AI Demo simulator
- Testimonial carousels below the fold
- Pricing calculators
- Blog comment sections

**Test:** Page loads faster, bundle size reduced

---

## PERFORMANCE OPTIMIZATION (Final Polish - 2 hours)

### 7. Run Bundle Analyzer (30 min)

**Install:**
```bash
cd capture-client-site
npm install --save-dev @next/bundle-analyzer
```

**Configure:** `next.config.js`
```js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  // your existing config
})
```

**Run:**
```bash
ANALYZE=true npm run build
```

**Action Items:**
- Identify packages >100KB
- Consider lighter alternatives
- Remove unused dependencies

---

### 8. Preload Critical Resources (30 min)

**File:** `capture-client-site/app/layout.tsx`

**Add to `<head>`:**
```tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Preload hero image */}
        <link
          rel="preload"
          href="/hero-background.jpg"
          as="image"
        />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

---

### 9. Optimize Images (30 min)

**Check all Image components have:**
- `width` and `height` props
- `priority` for above-fold images
- `loading="lazy"` for below-fold (default)
- `quality={85}` for balance (default is 75)

**Example:**
```tsx
// Hero image
<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority  // Load immediately
  quality={90}  // Higher quality for hero
/>

// Below-fold image
<Image
  src="/feature.jpg"
  alt="Feature"
  width={800}
  height={400}
  // loading="lazy" is default
  quality={80}
/>
```

---

### 10. Implement Performance Monitoring (30 min)

**Install Vercel Speed Insights:**
```bash
npm install @vercel/speed-insights
```

**Add to layout:**
```tsx
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
```

**This tracks:**
- Real user Core Web Vitals
- Performance over time
- Page-specific metrics

---

## TESTING CHECKLIST

After implementing fixes:

```bash
# 1. Clear console errors
npm run dev
# Open http://localhost:3001
# Open DevTools Console
# Navigate to each page
# ✅ Zero hydration errors
# ✅ Zero image warnings
# ✅ Zero motion warnings

# 2. Check network
# Open DevTools Network tab
# Hard refresh (Cmd+Shift+R / Ctrl+Shift+R)
# ✅ Font files: 4-5 (not 9)
# ✅ No failed requests (except GA in dev)
# ✅ Transfer size <100KB

# 3. Run Lighthouse
# DevTools > Lighthouse > Analyze page
# ✅ Performance score >85
# ✅ LCP <2.5s
# ✅ FCP <1.0s
# ✅ CLS <0.1

# 4. Test on real device
# Deploy to Vercel preview
# Test on iPhone/Android
# ✅ Fast loading
# ✅ Smooth animations
# ✅ No layout shifts
```

---

## BEFORE/AFTER TARGETS

| Metric | Before | Target After | Test |
|--------|--------|--------------|------|
| Performance Score | 4/10 | 9/10 | ✅ |
| Console Errors | 6 | 0 | ✅ |
| Console Warnings | 6 | 0 | ✅ |
| Homepage Load | 3,070ms | <2,000ms | ✅ |
| Pricing Load | 3,484ms | <2,500ms | ✅ |
| Font Files | 9 | 4-5 | ✅ |
| Hydration Errors | 2 | 0 | ✅ |

---

## QUICK WINS (If Short on Time)

If you only have 1 hour, focus on:

1. **Fix hydration errors** (45 min)
   - Footer email input
   - Lead form inputs
   - Motion containers

2. **Add logo dimensions** (10 min)

3. **Run Lighthouse to verify** (5 min)

These three fixes alone will:
- Eliminate all console errors
- Improve CLS score
- Show visible improvement in performance

The rest can be done incrementally.

---

## FILE LOCATIONS REFERENCE

```
capture-client-site/
├── app/
│   └── layout.tsx                    # Font optimization, preloads
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Footer.tsx           # Fix: footer email hydration
│   │   │   └── Header.tsx           # Fix: logo dimensions
│   │   └── forms/
│   │       └── OptimizedLeadForm.tsx # Fix: form input hydration
│   └── lib/
│       └── fonts.ts                  # Font definitions (if exists)
└── next.config.js                    # Bundle analyzer config
```

---

## NEED HELP?

**Common Issues:**

**Q: Can't find Footer.tsx**
A: Search for `id="footer-email"` across all files

**Q: Can't find OptimizedLeadForm.tsx**
A: Search for `id="name"` and `type="text"` in form components

**Q: Logo still showing warning**
A: Make sure both `width` AND `height` props are present

**Q: Hydration errors still appear**
A: Check for any `useEffect` that modifies styles on mount

---

**Ready to fix?** Start with Critical Fixes #1-4, test after each one.
