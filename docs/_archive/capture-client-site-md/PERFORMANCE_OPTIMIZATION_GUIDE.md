# Performance Optimization Implementation Guide
## Capture Client Website - Next.js 16 Performance Best Practices

**Last Updated:** 2025-11-29
**Status:** ✅ Optimizations Applied

---

## What We've Implemented

### 1. Viewport Configuration ✅

**File:** `src/app/layout.tsx`

```typescript
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0F172A',
};
```

**Benefits:**
- Ensures proper mobile rendering
- Sets browser theme color (iOS/Android address bar)
- Allows users to zoom (accessibility)
- Prevents layout shift on mobile devices

---

### 2. Web Vitals Tracking ✅

**File:** `src/components/analytics/WebVitals.tsx`

**Tracks:**
- **LCP** (Largest Contentful Paint) - Target: < 2.5s
- **FID** (First Input Delay) - Target: < 100ms
- **INP** (Interaction to Next Paint) - Target: < 200ms
- **CLS** (Cumulative Layout Shift) - Target: < 0.1
- **TTFB** (Time to First Byte) - Target: < 800ms
- **FCP** (First Contentful Paint) - Target: < 1.8s

**Features:**
- Console logging in development
- Google Analytics integration ready
- Custom endpoint support
- Automatic threshold warnings

**Usage:**
```bash
# Development - See metrics in console
npm run dev

# Production - Metrics sent to analytics
npm run build && npm start
```

---

### 3. Next.js Configuration Optimizations ✅

**File:** `next.config.js`

**Applied Optimizations:**

#### Image Optimization
```javascript
images: {
  formats: ["image/avif", "image/webp"],  // Modern formats
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 60 * 60 * 24 * 30,  // 30 days
}
```

**Impact:**
- 30-60% smaller image files (AVIF)
- Automatic responsive images
- Lazy loading by default
- Long-term caching

#### Compression & Minification
```javascript
compress: true,        // Gzip/Brotli compression
swcMinify: true,       // Faster minification with SWC
```

**Impact:**
- 20-30% smaller JavaScript bundles
- Faster build times
- Better runtime performance

#### Package Import Optimization
```javascript
experimental: {
  optimizePackageImports: ["lucide-react", "framer-motion"],
}
```

**Impact:**
- Tree-shaking for large libraries
- Smaller bundle sizes
- Faster page loads

#### Cache Headers
```javascript
async headers() {
  return [
    {
      source: "/:all*(svg|jpg|jpeg|png|webp|avif|ico|gif)",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" }
      ],
    },
    // ... security headers
  ];
}
```

**Impact:**
- Images cached for 1 year
- Reduced server requests
- Faster repeat visits
- Better Lighthouse scores

---

## Performance Monitoring

### Development Mode

```bash
npm run dev
```

**Check console for Web Vitals:**
```
[Web Vitals] {
  name: 'LCP',
  value: 1234,
  rating: 'good',
  delta: 1234,
  id: 'v3-1234567890'
}

✅ Good LCP: 1234
⚡ Needs improvement FID: 150
⚠️ Poor CLS: 0.3
```

### Production Testing

#### 1. Lighthouse Audit

```bash
# Install Lighthouse
npm install -g lighthouse

# Run mobile audit
lighthouse https://captureclient.net --preset=mobile --output=html --output-path=./lighthouse-mobile.html

# Run desktop audit
lighthouse https://captureclient.net --preset=desktop --output=html --output-path=./lighthouse-desktop.html
```

**Target Scores:**
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 95
- SEO: > 95

#### 2. Bundle Analysis

```bash
# Install bundle analyzer
npm install -g @next/bundle-analyzer

# Analyze production bundle
ANALYZE=true npm run build
```

**Opens interactive treemap showing:**
- Bundle composition
- Largest dependencies
- Code-splitting effectiveness
- Optimization opportunities

#### 3. Web Vitals in Production

**Option A: Vercel Analytics (Recommended if using Vercel)**

```bash
npm install @vercel/analytics @vercel/speed-insights
```

```tsx
// src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

**Option B: Google Analytics 4**

```tsx
// Update src/components/analytics/WebVitals.tsx
// Already configured! Just add GA4 tracking code to your site
```

---

## Performance Optimization Checklist

### Image Optimization ✅

- [x] Next.js Image component used everywhere
- [x] AVIF/WebP formats enabled
- [x] Responsive srcset generated
- [x] Lazy loading enabled
- [ ] Add explicit `sizes` attribute (recommended)
- [ ] Generate blur placeholders for LCP images

**Example - Add sizes attribute:**

```tsx
// Before
<Image
  src="/hero-bg.jpg"
  fill
  priority
/>

// After - Better performance
<Image
  src="/hero-bg.jpg"
  fill
  priority
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
/>
```

### Font Optimization ✅

- [x] next/font for automatic optimization
- [x] display: "swap" to prevent FOIT
- [x] Subset loading (latin)
- [ ] Preload critical fonts (optional)

**Example - Preload critical font:**

```tsx
// src/app/layout.tsx <head>
<link
  rel="preload"
  href="/fonts/poppins-bold.woff2"
  as="font"
  type="font/woff2"
  crossOrigin="anonymous"
/>
```

### JavaScript Optimization

- [x] SWC minification enabled
- [x] Package import optimization
- [ ] Implement dynamic imports for heavy components
- [ ] Defer non-critical JavaScript
- [ ] Remove unused dependencies

**Example - Dynamic Imports:**

```tsx
// src/app/page.tsx

// Before - Loads immediately
import LeadRescueSimulator from '@/components/LeadRescueSimulator';

// After - Loads when needed
import dynamic from 'next/dynamic';

const LeadRescueSimulator = dynamic(
  () => import('@/components/LeadRescueSimulator'),
  {
    loading: () => <Skeleton className="h-96" />,
    ssr: false, // Client-side only if needed
  }
);
```

**Components to Consider for Dynamic Import:**
- LeadRescueSimulator (large, below fold)
- TestimonialsCarousel
- GrowthDashboard
- Any Framer Motion heavy components

### CSS Optimization ✅

- [x] Tailwind CSS with JIT mode
- [x] Automatic purging of unused styles
- [x] Critical CSS inlined
- [ ] Remove unused custom CSS
- [ ] Audit animation performance

### Third-Party Scripts

- [ ] Defer non-critical scripts
- [ ] Use Next.js Script component
- [ ] Implement consent management
- [ ] Lazy load tracking scripts

**Example - Optimize Scripts:**

```tsx
// src/app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}

        {/* Google Analytics - Deferred */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />

        {/* Non-critical - Lazy loaded */}
        <Script
          src="https://widget.example.com/chat.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
```

---

## Advanced Optimizations

### 1. Implement Incremental Static Regeneration (ISR)

**For location pages with 1-hour revalidation:**

```tsx
// src/app/locations/[slug]/page.tsx
export const revalidate = 3600; // Revalidate every hour

export default async function LocationPage({ params }) {
  // Page will be statically generated and revalidated
  // every hour for fresh content
}
```

**Benefits:**
- Static performance with dynamic content
- Reduced server load
- Better CDN caching

### 2. Optimize Framer Motion Bundle

**Create motion wrapper:**

```tsx
// src/lib/motion.ts
export { motion, AnimatePresence } from 'framer-motion';
export type { Variants } from 'framer-motion';
```

**Use in components:**

```tsx
// Before
import { motion } from 'framer-motion';

// After
import { motion } from '@/lib/motion';
```

**Further optimization - Lazy load:**

```tsx
// For below-fold animations
import dynamic from 'next/dynamic';

const motion = dynamic(
  () => import('framer-motion').then(mod => ({ default: mod.motion })),
  { ssr: false }
);
```

### 3. Implement Service Worker (PWA)

```bash
npm install next-pwa
```

```javascript
// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

module.exports = withPWA(nextConfig);
```

**Benefits:**
- Offline functionality
- Faster repeat visits
- App-like experience on mobile

### 4. Database/API Caching

```typescript
// src/lib/data.ts

// Add caching for API calls
export async function getLocationBySlug(slug: string) {
  const cacheKey = `location:${slug}`;

  // Check cache first
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  // Fetch from database
  const data = await db.location.findUnique({ where: { slug } });

  // Cache for 1 hour
  await redis.set(cacheKey, JSON.stringify(data), 'EX', 3600);

  return data;
}
```

---

## Performance Testing Workflow

### Pre-Deployment Checklist

```bash
# 1. Build production bundle
npm run build

# 2. Analyze bundle size
ANALYZE=true npm run build

# 3. Run Lighthouse audit locally
npm run build && npm start
lighthouse http://localhost:3000 --view

# 4. Check for console errors
npm run build && npm start
# Open DevTools and check console

# 5. Test on real devices
# Use ngrok or similar to test on mobile
npx ngrok http 3000
```

### Post-Deployment Monitoring

**Set up alerts for:**
- LCP > 4s (poor)
- FID > 300ms (poor)
- CLS > 0.25 (poor)
- Lighthouse score < 90

**Weekly Review:**
```bash
# Run Lighthouse on production
lighthouse https://captureclient.net --output=json --output-path=./perf-report-$(date +%Y%m%d).json

# Compare with previous week
# Look for regressions
```

---

## Performance Budget

Set limits to prevent performance regressions:

```json
// .lighthouserc.json
{
  "ci": {
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "first-contentful-paint": ["error", { "maxNumericValue": 2000 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
        "total-blocking-time": ["error", { "maxNumericValue": 300 }],
        "speed-index": ["error", { "maxNumericValue": 3000 }]
      }
    }
  }
}
```

**Enforce in CI/CD:**

```yaml
# .github/workflows/performance.yml
name: Performance Audit

on: [push, pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            https://captureclient.net
            https://captureclient.net/locations/voice-ai-knoxville-tn
          budgetPath: ./.lighthouserc.json
          uploadArtifacts: true
```

---

## Quick Wins (Implement Today)

### 1. Add Explicit Image Sizes

```tsx
// Find all <Image> components with fill
// Add sizes attribute

<Image
  src={image}
  fill
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>
```

### 2. Preload Critical Resources

```tsx
// src/app/layout.tsx <head>
<link rel="preload" as="image" href="/hero-bg.jpg" />
<link rel="preload" as="font" href="/fonts/poppins-bold.woff2" type="font/woff2" crossOrigin="anonymous" />
```

### 3. Reduce Third-Party Scripts

```tsx
// Audit and remove unnecessary scripts
// Defer non-critical scripts
// Use Next.js Script component with strategy="lazyOnload"
```

### 4. Implement Progressive Enhancement

```tsx
// Make JavaScript optional where possible
// Ensure forms work without JS
// Add noscript fallbacks
```

---

## Common Performance Issues & Solutions

### Issue: Large LCP (> 2.5s)

**Causes:**
- Large hero images not optimized
- Fonts blocking render
- Too much JavaScript before LCP

**Solutions:**
```tsx
// 1. Prioritize hero image
<Image src="/hero.jpg" priority sizes="100vw" />

// 2. Preload critical fonts
<link rel="preload" href="/fonts/heading.woff2" as="font" type="font/woff2" crossOrigin />

// 3. Defer non-critical JS
const NonCritical = dynamic(() => import('./NonCritical'), { ssr: false });
```

### Issue: High CLS (> 0.1)

**Causes:**
- Images without dimensions
- Ads/embeds causing layout shifts
- Fonts causing FOUT/FOIT

**Solutions:**
```tsx
// 1. Always set image dimensions
<Image src="/logo.png" width={200} height={50} alt="Logo" />

// 2. Reserve space for dynamic content
<div className="min-h-[400px]">
  {loading ? <Skeleton /> : <Content />}
</div>

// 3. Font display swap already set ✅
```

### Issue: High TBT/Long Tasks

**Causes:**
- Large JavaScript bundles
- Heavy synchronous processing
- Unoptimized third-party scripts

**Solutions:**
```tsx
// 1. Code splitting
const Heavy = dynamic(() => import('./Heavy'));

// 2. Break up long tasks
async function processLargeList(items) {
  for (let i = 0; i < items.length; i++) {
    processItem(items[i]);
    if (i % 100 === 0) {
      await new Promise(resolve => setTimeout(resolve, 0)); // Yield to browser
    }
  }
}

// 3. Use Web Workers for heavy computation
```

---

## Resources

### Official Documentation
- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

### Tools
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)
- [Bundle Phobia](https://bundlephobia.com/)

### Next Steps
1. Run Lighthouse audit
2. Implement dynamic imports for heavy components
3. Add image sizes attributes
4. Set up production monitoring
5. Schedule monthly performance reviews

---

**Maintained by:** Performance SEO Agent
**Next Review:** 2025-12-29
