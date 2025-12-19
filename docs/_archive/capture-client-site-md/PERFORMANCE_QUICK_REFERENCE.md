# PERFORMANCE OPTIMIZATION QUICK REFERENCE

## Core Web Vitals Targets

| Metric | Target | Current | Action |
|--------|--------|---------|--------|
| LCP | < 2.5s | ~3.5s | Self-host fonts, inline CSS |
| FID/INP | < 100ms | ~150ms | Remove puppeteer, optimize motion |
| CLS | < 0.1 | ~0.08 | Reserve icon space |
| TTI | < 3.8s | ~5.2s | Reduce bundle size |

---

## Quick Wins Checklist

### 1. Remove puppeteer-core
```bash
npm uninstall puppeteer-core
# OR move to devDependencies in package.json
```
**Impact:** -24MB bundle, -1s TTI

### 2. Use Optimized Motion Wrapper
```tsx
// Import from lib instead of framer-motion
import { motion } from "@/lib/motion"
```
**Impact:** -60KB bundle, -200ms FID

### 3. Inline Critical CSS
```tsx
// In layout.tsx <head>
<style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
```
**Impact:** -200ms FCP, -400ms LCP

### 4. Self-Host Material Icons
```tsx
// Replace CDN font with local
import localFont from 'next/font/local'
```
**Impact:** -300ms to -500ms LCP

---

## Performance Scripts

```bash
# Development
npm run dev                 # Start dev server with Web Vitals logging

# Build & Analyze
npm run build              # Production build
npm run analyze            # Build with bundle analyzer

# Testing
npm run lighthouse         # Run Lighthouse audit
```

---

## Bundle Optimization Commands

```bash
# Check current bundle size
npm run build | grep "Total size"

# Analyze what's in the bundle
npm run analyze

# Find large files
find .next -type f -size +100k -exec ls -lh {} \;
```

---

## Monitoring in Production

### Web Vitals Tracking (Already Implemented)

```tsx
// src/components/analytics/WebVitals.tsx
export function WebVitals() {
  useReportWebVitals((metric) => {
    console.log(metric.name, metric.value, metric.rating);
  });
}
```

### Check Live Performance

1. Open Chrome DevTools
2. Network tab > Disable cache
3. Performance tab > Record page load
4. Lighthouse tab > Run audit

---

## Common Issues & Fixes

### Issue: Large Bundle Size

**Check:**
```bash
npm run analyze
```

**Fix:**
- Remove unused dependencies
- Use dynamic imports for heavy components
- Enable tree-shaking for icon libraries

### Issue: Slow LCP

**Check:**
```javascript
// In console
PerformanceObserver.supportedEntryTypes.includes('largest-contentful-paint')
```

**Fix:**
- Preload critical fonts
- Inline critical CSS
- Optimize hero images
- Self-host external fonts

### Issue: High FID/INP

**Fix:**
- Reduce JavaScript bundle
- Code split heavy components
- Defer non-critical scripts
- Use web workers for heavy computation

---

## Performance Budget

| Resource | Budget | Current | Status |
|----------|--------|---------|--------|
| Total JS | < 400KB | ~800KB | OVER |
| Total CSS | < 100KB | ~120KB | OVER |
| Fonts | < 100KB | ~80KB | OK |
| Images | Lazy load | Lazy load | OK |

---

## Next.js Optimization Checklist

- [x] Image optimization (AVIF, WebP)
- [x] Font optimization (next/font)
- [x] Compression enabled
- [x] Cache headers configured
- [x] Dynamic imports for heavy components
- [x] Web Vitals tracking
- [ ] Material Icons self-hosted
- [ ] Critical CSS inlined
- [ ] puppeteer-core removed
- [ ] LazyMotion implemented
- [ ] Bundle analyzer configured

---

## Files Created/Modified

### Created:
1. `src/lib/motion.ts` - LazyMotion wrapper
2. `package.json.optimized` - Optimized dependencies
3. `next.config.with-analyzer.js` - Bundle analyzer config
4. `PERFORMANCE_OPTIMIZATION_REPORT.md` - Full audit
5. `PERFORMANCE_IMPLEMENTATION_GUIDE.md` - Step-by-step guide
6. `PERFORMANCE_QUICK_REFERENCE.md` - This file

### To Modify:
1. `package.json` - Move puppeteer to devDependencies
2. `src/app/layout.tsx` - Inline critical CSS, self-host icons
3. Components using framer-motion - Use @/lib/motion

---

## Resources

- [Web Vitals](https://web.dev/vitals/)
- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

---

**Quick Reference Card - Performance SEO Agent**
