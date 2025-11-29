# Performance & SEO Implementation Guide

**Quick Start Guide for Developers**

This guide walks you through implementing the performance and SEO optimizations for the Capture Client website.

---

## Table of Contents

1. [Immediate Actions (5 minutes)](#1-immediate-actions-5-minutes)
2. [Replace Images (15 minutes)](#2-replace-images-15-minutes)
3. [Add Structured Data (30 minutes)](#3-add-structured-data-30-minutes)
4. [Add Loading Skeletons (20 minutes)](#4-add-loading-skeletons-20-minutes)
5. [Set Up Analytics (10 minutes)](#5-set-up-analytics-10-minutes)
6. [Testing & Validation (15 minutes)](#6-testing--validation-15-minutes)
7. [Deployment (5 minutes)](#7-deployment-5-minutes)

**Total Time**: ~100 minutes (~1.5 hours)

---

## 1. Immediate Actions (5 minutes)

### Step 1.1: Add Web Vitals Tracking to Layout

Edit `src/app/layout.tsx`:

```tsx
import { WebVitalsReporter } from '@/lib/vitals';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body>
        <WebVitalsReporter /> {/* Add this line */}
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

✅ **Result**: Web Vitals now tracked in console (dev mode)

### Step 1.2: Test It Works

```bash
npm run dev
```

Open browser console → You should see Web Vitals logs like:
```
[Web Vitals] LCP { value: 1234.56, rating: "good" }
[Web Vitals] CLS { value: 0.03, rating: "good" }
```

---

## 2. Replace Images (15 minutes)

### Step 2.1: Replace All `<img>` Tags

**Before**:
```tsx
<img src="/hero.jpg" alt="Hero" className="w-full" />
```

**After**:
```tsx
import OptimizedImage, { ImageSizes } from '@/components/OptimizedImage';

<OptimizedImage
  src="/hero.jpg"
  alt="Hero"
  width={1920}
  height={1080}
  priority  // For above-the-fold images only
  sizes={ImageSizes.hero}
  className="w-full"
/>
```

### Step 2.2: Determine Priority

**Use `priority` for**:
- Hero images (above the fold)
- Logo in header
- First 2-3 visible images

**Don't use `priority` for**:
- Below-the-fold images
- Images in carousels (except first)
- Footer images

### Step 2.3: Choose Correct Sizes

```tsx
// Hero/banner (full width)
sizes={ImageSizes.hero}

// Feature cards (responsive grid)
sizes={ImageSizes.card}

// Avatars/icons
sizes={ImageSizes.avatar}

// Logo
sizes={ImageSizes.logo}
```

### Quick Find & Replace

Search for: `<img `
Replace each instance with `<OptimizedImage` component

**Files to check**:
- `src/app/page.tsx`
- `src/components/Header.tsx`
- `src/components/Footer.tsx`
- `src/components/*.tsx` (all component files)

---

## 3. Add Structured Data (30 minutes)

### Step 3.1: Add to Homepage

Edit `src/app/page.tsx`:

```tsx
import JsonLd from '@/components/seo/JsonLd';
import {
  generateOrganizationSchema,
  generateAggregateRatingSchema
} from '@/lib/seo-schemas';

export default function HomePage() {
  // Define schemas
  const organizationSchema = generateOrganizationSchema({
    name: "Capture Client",
    url: "https://captureclient.com",
    logo: "https://captureclient.com/logo.png",
    description: "The All-in-One Growth Hub for Small Business. Voice AI, lead generation, and marketing automation.",
    phone: "(865) 346-3339",
    email: "hello@captureclient.com",
    address: {
      street: "123 Main St",
      city: "Knoxville",
      region: "TN",
      postalCode: "37902",
      country: "US",
    },
    socialLinks: [
      "https://facebook.com/captureclient",
      "https://twitter.com/captureclient",
      "https://linkedin.com/company/captureclient",
    ],
  });

  const ratingSchema = generateAggregateRatingSchema("Capture Client", {
    ratingValue: 4.8,
    reviewCount: 127,
  });

  return (
    <>
      {/* Add schemas to head */}
      <JsonLd schema={[organizationSchema, ratingSchema]} />

      {/* Rest of your page */}
      <div className="relative min-h-screen w-full">
        {/* ... */}
      </div>
    </>
  );
}
```

### Step 3.2: Add to Service Pages

For each service page (e.g., `/services/voice-ai`):

```tsx
import JsonLd from '@/components/seo/JsonLd';
import { generateServiceSchema, generateBreadcrumbSchema } from '@/lib/seo-schemas';

export default function VoiceAIPage() {
  const serviceSchema = generateServiceSchema({
    name: "Voice AI Agents",
    description: "AI-powered voice agents for small businesses...",
    provider: "Capture Client",
    providerUrl: "https://captureclient.com",
    areaServed: ["Tennessee", "United States"],
    offers: {
      price: "997",
      priceCurrency: "USD",
      description: "Starting at $997/month",
    },
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://captureclient.com" },
    { name: "Services", url: "https://captureclient.com/services" },
    { name: "Voice AI", url: "https://captureclient.com/services/voice-ai" },
  ]);

  return (
    <>
      <JsonLd schema={[serviceSchema, breadcrumbSchema]} />
      {/* Page content */}
    </>
  );
}
```

### Step 3.3: Add to Location Pages

For location pages (e.g., `/locations/knoxville-tn`):

```tsx
import { generateLocalBusinessSchema } from '@/lib/seo-schemas';

const localBusinessSchema = generateLocalBusinessSchema({
  name: "Capture Client - Knoxville",
  url: "https://captureclient.com/locations/knoxville-tn",
  description: "Voice AI and lead generation services in Knoxville, TN",
  phone: "(865) 346-3339",
  address: {
    city: "Knoxville",
    region: "TN",
    country: "US",
  },
  geo: {
    latitude: 35.9606,
    longitude: -83.9207,
  },
  priceRange: "$$$",
});
```

### Step 3.4: Add FAQ Schema (If Applicable)

If you have FAQ sections:

```tsx
import { generateFAQSchema } from '@/lib/seo-schemas';

const faqSchema = generateFAQSchema([
  {
    question: "What is Voice AI?",
    answer: "Voice AI uses artificial intelligence to handle phone calls automatically, qualifying leads and answering common questions 24/7.",
  },
  {
    question: "How much does it cost?",
    answer: "Our Voice AI service starts at $997/month and includes unlimited calls, automatic transcription, and CRM integration.",
  },
  // Add more Q&A pairs
]);
```

---

## 4. Add Loading Skeletons (20 minutes)

### Step 4.1: Identify Async Content

Look for:
- Data fetched from APIs
- Lazy-loaded components
- Content that takes time to render

### Step 4.2: Add Skeletons

**Before**:
```tsx
export default function ServicesSection() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices().then(setServices);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-6">
      {services.map(service => (
        <ServiceCard key={service.id} {...service} />
      ))}
    </div>
  );
}
```

**After**:
```tsx
import { SkeletonGrid } from '@/components/ui/Skeleton';

export default function ServicesSection() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices().then(data => {
      setServices(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <SkeletonGrid columns={4} count={4} />;
  }

  return (
    <div className="grid grid-cols-4 gap-6">
      {services.map(service => (
        <ServiceCard key={service.id} {...service} />
      ))}
    </div>
  );
}
```

### Step 4.3: Available Skeleton Components

```tsx
import {
  Skeleton,              // Basic skeleton
  SkeletonCard,          // Feature card
  SkeletonText,          // Multi-line text
  SkeletonAvatar,        // Profile picture
  SkeletonButton,        // Button placeholder
  SkeletonImage,         // Image with aspect ratio
  SkeletonHero,          // Hero section
  SkeletonGrid,          // Grid layout
  SkeletonTestimonial,   // Testimonial card
  SkeletonPricingCard,   // Pricing card
} from '@/components/ui/Skeleton';
```

### Step 4.4: Add Loading States to Next.js Pages

Create `src/app/loading.tsx`:

```tsx
import { SkeletonHero } from '@/components/ui/Skeleton';

export default function Loading() {
  return <SkeletonHero />;
}
```

This automatically shows while the page loads.

---

## 5. Set Up Analytics (10 minutes)

### Option A: Vercel Analytics (Recommended - Easiest)

```bash
npm install @vercel/analytics
```

Edit `src/app/layout.tsx`:

```tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics /> {/* Add this */}
      </body>
    </html>
  );
}
```

✅ Done! View metrics at: `vercel.com/[your-project]/analytics`

### Option B: Google Analytics 4

1. **Create GA4 Property**:
   - Go to https://analytics.google.com/
   - Create new property
   - Get Measurement ID (G-XXXXXXXXXX)

2. **Create API Secret**:
   - Admin → Data Streams → Your stream
   - Measurement Protocol API secrets → Create
   - Copy API Secret

3. **Add to Environment Variables**:

Create `.env.local`:

```env
GA4_MEASUREMENT_ID=G-XXXXXXXXXX
GA4_API_SECRET=your_api_secret_here
```

✅ Metrics will now be sent to Google Analytics

### Option C: Custom Database

Edit `src/app/api/analytics/route.ts`:

Uncomment and implement the `saveToDatabase()` function:

```typescript
async function saveToDatabase(metric: WebVitalMetric) {
  // Example with Prisma:
  await prisma.webVitals.create({
    data: {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      url: metric.url,
      timestamp: new Date(metric.timestamp),
    },
  });
}
```

---

## 6. Testing & Validation (15 minutes)

### Step 6.1: Build & Test Locally

```bash
npm run build
npm run start
```

Visit: `http://localhost:3000`

### Step 6.2: Check Web Vitals

Open browser console → Look for green "good" ratings:

```
[Web Vitals] LCP { value: 1234, rating: "good" }
[Web Vitals] CLS { value: 0.03, rating: "good" }
[Web Vitals] INP { value: 45, rating: "good" }
```

All should be green/good.

### Step 6.3: Run Lighthouse Audit

**Chrome DevTools**:
1. Open DevTools (F12)
2. Lighthouse tab
3. Select "Mobile" + "Performance"
4. Click "Analyze page load"

**Target Scores**:
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 95
- SEO: 100

### Step 6.4: Test Structured Data

Go to: https://search.google.com/test/rich-results

Enter your URL → Should see:
- Organization schema ✅
- LocalBusiness schema ✅
- Service schema ✅
- FAQPage schema ✅

### Step 6.5: Verify Sitemap

Visit: `http://localhost:3000/sitemap.xml`

Should see XML with all your pages listed.

### Step 6.6: Verify Robots

Visit: `http://localhost:3000/robots.txt`

Should see:
```
User-agent: *
Allow: /
Disallow: /api/
...
Sitemap: https://captureclient.com/sitemap.xml
```

---

## 7. Deployment (5 minutes)

### Step 7.1: Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

Or push to GitHub → Vercel auto-deploys.

### Step 7.2: Submit Sitemap to Google

1. Go to: https://search.google.com/search-console
2. Add your property
3. Sitemaps → Add sitemap: `https://captureclient.com/sitemap.xml`
4. Submit

### Step 7.3: Monitor Performance

**Vercel Analytics**:
- https://vercel.com/[project]/analytics
- View Core Web Vitals for all pages

**Google Search Console**:
- https://search.google.com/search-console
- Core Web Vitals report
- Page Experience report

**PageSpeed Insights**:
- https://pagespeed.web.dev/
- Test with: `https://captureclient.com`

---

## Common Issues & Solutions

### Issue: Images not optimizing

**Solution**: Check `next.config.js` has correct remote patterns:

```javascript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'images.unsplash.com' },
    { protocol: 'https', hostname: 'your-cdn.com' },
  ],
}
```

### Issue: Web Vitals not showing in console

**Solution**: Make sure `<WebVitalsReporter />` is in layout.tsx and you're in dev mode.

### Issue: Structured data validation fails

**Solution**: Use the validator: https://validator.schema.org/
- Copy your JSON-LD
- Paste and validate
- Fix any errors shown

### Issue: Build fails with image errors

**Solution**: All images need width/height OR fill prop:

```tsx
// Static image
<OptimizedImage src="/image.jpg" width={800} height={600} alt="..." />

// Dynamic/responsive
<OptimizedImage src="/image.jpg" fill alt="..." className="object-cover" />
```

### Issue: CLS still high

**Solution**:
1. Add explicit width/height to ALL images
2. Add skeleton loaders for async content
3. Reserve space for ads/embeds
4. Use `display: swap` for fonts (already done)

---

## Performance Checklist

Before deploying, verify:

- [ ] All `<img>` replaced with `<OptimizedImage>`
- [ ] Priority images marked with `priority` prop
- [ ] Structured data added to all key pages
- [ ] Loading skeletons added for async content
- [ ] Web Vitals tracking enabled
- [ ] Analytics configured (Vercel or GA4)
- [ ] Lighthouse score > 90
- [ ] All Core Web Vitals "good" (green)
- [ ] Sitemap submitted to Google Search Console
- [ ] Robots.txt accessible at /robots.txt

---

## Next Steps After Implementation

1. **Week 1**: Monitor Core Web Vitals daily
2. **Week 2**: Check Google Search Console for indexing
3. **Week 4**: Analyze traffic and ranking improvements
4. **Monthly**: Run Lighthouse audit and optimize further

---

## Support

**Questions?**
- Review: `PERFORMANCE_REPORT.md` for technical details
- Check: Next.js docs at https://nextjs.org/docs
- Test: Use Chrome DevTools Performance tab

**Need Help?**
Contact the Performance & Technical SEO Agent.

---

**Last Updated**: 2025-11-28
**Status**: Ready for Implementation ✅
