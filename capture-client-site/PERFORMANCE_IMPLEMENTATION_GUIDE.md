# PERFORMANCE OPTIMIZATION IMPLEMENTATION GUIDE

**Project:** Capture Client Website
**Target:** 95+ Lighthouse Score, Perfect Core Web Vitals

---

## PHASE 1: IMMEDIATE WINS (30 minutes)

### Step 1: Remove puppeteer-core from Production

**Current:** 24MB in production bundle
**Action:**

```bash
cd C:/Users/eaqqa/capture-client-website-seo/capture-client-site

# Option A: Remove completely if not needed
npm uninstall puppeteer-core

# Option B: Move to devDependencies (recommended)
# Manually edit package.json or use package.json.optimized
```

**Expected:** -24MB bundle size, -1s TTI

---

### Step 2: Install Performance Tools

```bash
npm install --save-dev @next/bundle-analyzer cross-env lighthouse
```

---

### Step 3: Update Package Scripts

Replace package.json with package.json.optimized (already created)

```bash
# Backup current
cp package.json package.json.backup

# Use optimized version
cp package.json.optimized package.json

# Install dependencies
npm install
```

---

## PHASE 2: FRAMER MOTION OPTIMIZATION (45 minutes)

### Step 1: LazyMotion Wrapper (Already Created)

File created: `src/lib/motion.ts`

### Step 2: Update Components to Use LazyMotion

**Example: src/components/sections/PremiumHero.tsx**

Before:
```tsx
import { motion } from "framer-motion";
```

After:
```tsx
import { motion, LazyMotionProvider } from "@/lib/motion";

// Wrap component with LazyMotionProvider
export function PremiumHero() {
  return (
    <LazyMotionProvider>
      {/* existing code */}
    </LazyMotionProvider>
  );
}
```

**Files to Update:**
1. src/components/sections/PremiumHero.tsx
2. src/components/sections/HowItWorks.tsx
3. src/components/sections/PremiumTestimonials.tsx
4. src/components/features/InteractiveAIDemo.tsx
5. src/components/LeadRescueSimulator.tsx

**Expected:** -60KB bundle, -200ms FID

---

## PHASE 3: CRITICAL CSS INLINING (20 minutes)

### Step 1: Read Critical CSS

```tsx
// src/app/layout.tsx
import fs from 'fs';
import path from 'path';

const criticalCSS = fs.readFileSync(
  path.join(process.cwd(), 'src/app/critical.css'),
  'utf-8'
);
```

### Step 2: Inline in Head

```tsx
<head>
  {/* Inline critical CSS */}
  <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
  
  {/* Existing preconnects */}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  ...
</head>
```

**Expected:** -200ms FCP, -400ms LCP

---

## PHASE 4: SELF-HOST MATERIAL ICONS (30 minutes)

### Option A: Download and Host Locally

1. Download Material Icons font from Google Fonts
2. Place in `public/fonts/material-icons.woff2`
3. Update layout.tsx:

```tsx
import localFont from 'next/font/local';

const materialIcons = localFont({
  src: '../public/fonts/material-icons.woff2',
  variable: '--font-material-icons',
  display: 'block',
  preload: true,
});

// In CSS
.material-icons {
  font-family: var(--font-material-icons);
}
```

### Option B: Use SVG Icons Instead

Replace Material Icons with lucide-react (already installed):

```tsx
// Before
<span className="material-icons">arrow_forward</span>

// After
import { ArrowRight } from 'lucide-react';
<ArrowRight className="w-6 h-6" />
```

**Expected:** -300ms to -500ms LCP

---

## PHASE 5: BUNDLE ANALYSIS (15 minutes)

### Analyze Current Bundle

```bash
npm run analyze
```

This will:
1. Build production bundle
2. Open bundle analyzer in browser
3. Show interactive treemap of bundle composition

### What to Look For:
- Largest chunks
- Duplicate dependencies
- Unused code

---

## TESTING & VALIDATION

### 1. Build Production Bundle

```bash
npm run build
```

Check output for:
- Total bundle size
- Route sizes
- Static/dynamic pages

### 2. Run Lighthouse Audit

```bash
npm run lighthouse
```

Or manually:
- Open Chrome DevTools
- Go to Lighthouse tab
- Run audit (Desktop + Mobile)

### 3. Check Web Vitals in Dev

```bash
npm run dev
```

Open console and look for:
```
[Web Vitals] { name: 'LCP', value: 2200, rating: 'good' }
[Web Vitals] { name: 'FID', value: 85, rating: 'good' }
[Web Vitals] { name: 'CLS', value: 0.045, rating: 'good' }
```

---

## EXPECTED RESULTS

### Before Optimization
- Lighthouse: ~78
- LCP: ~3.5s
- FID: ~150ms
- Bundle: ~800KB
- TTI: ~5.2s

### After Phase 1-2
- Lighthouse: ~85
- LCP: ~2.8s
- FID: ~120ms
- Bundle: ~350KB
- TTI: ~4.0s

### After Phase 3-5
- Lighthouse: 95+
- LCP: < 2.5s
- FID: < 100ms
- Bundle: < 400KB
- TTI: < 3.8s

---

## TROUBLESHOOTING

### Issue: Build fails after removing puppeteer-core

**Solution:** Check if any API routes import puppeteer-core
```bash
grep -r "puppeteer" src/app/api/
```

If found, install as devDependency or remove unused code.

---

### Issue: Framer Motion animations broken

**Solution:** Ensure LazyMotionProvider wraps animated components

```tsx
// Wrap at page level or layout level
<LazyMotionProvider>
  <YourComponent />
</LazyMotionProvider>
```

---

### Issue: Material Icons not showing

**Solution:** Verify font path is correct and font is loaded

```tsx
// Check in browser DevTools > Network
// Look for material-icons.woff2 request
```

---

## MAINTENANCE

### Regular Performance Checks

1. **Weekly:** Check Lighthouse score
2. **Monthly:** Analyze bundle size
3. **After deployments:** Verify Web Vitals

### Monitoring Tools

- Google PageSpeed Insights
- Vercel Analytics (if deployed to Vercel)
- Chrome User Experience Report

---

## NEXT STEPS

After completing Phase 1-5:

1. **Progressive Enhancement:**
   - Add service worker for offline support
   - Implement progressive image loading
   - Add resource hints (prefetch, preload)

2. **Advanced Optimizations:**
   - Implement ISR (Incremental Static Regeneration)
   - Use edge functions for dynamic content
   - Add CDN for static assets

3. **Monitoring:**
   - Set up Real User Monitoring (RUM)
   - Track Core Web Vitals in production
   - Alert on performance regressions

---

**Performance Optimization Guide - Complete**
