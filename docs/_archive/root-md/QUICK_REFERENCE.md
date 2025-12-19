# Quick Reference Card

**Performance & SEO Optimizations for Capture Client**

---

## 🚀 Quick Start (5 minutes)

```tsx
// 1. Add to src/app/layout.tsx
import { WebVitalsReporter } from '@/lib/vitals';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <WebVitalsReporter /> {/* Add this */}
        {children}
      </body>
    </html>
  );
}

// 2. Test
npm run dev
// Open console → See Web Vitals logs
```

---

## 📸 Image Optimization

### Before
```tsx
<img src="/hero.jpg" alt="Hero" />
```

### After
```tsx
import OptimizedImage, { ImageSizes } from '@/components/OptimizedImage';

<OptimizedImage
  src="/hero.jpg"
  alt="Hero"
  width={1920}
  height={1080}
  priority  // Above-fold only!
  sizes={ImageSizes.hero}
/>
```

### Image Sizes Reference
```tsx
ImageSizes.hero        // Full width hero
ImageSizes.card        // Grid cards
ImageSizes.avatar      // Profile pics
ImageSizes.logo        // Logo images
```

---

## 🔍 Structured Data (SEO)

### Homepage
```tsx
import JsonLd from '@/components/seo/JsonLd';
import { generateOrganizationSchema } from '@/lib/seo-schemas';

const schema = generateOrganizationSchema({
  name: "Capture Client",
  url: "https://captureclient.com",
  phone: "(865) 346-3339",
  // ... more config
});

<JsonLd schema={schema} />
```

### Service Pages
```tsx
import { generateServiceSchema } from '@/lib/seo-schemas';

const schema = generateServiceSchema({
  name: "Voice AI Agents",
  description: "...",
  provider: "Capture Client",
  providerUrl: "https://captureclient.com",
});
```

### Location Pages
```tsx
import { generateLocalBusinessSchema } from '@/lib/seo-schemas';

const schema = generateLocalBusinessSchema({
  name: "Capture Client - Knoxville",
  url: "https://captureclient.com/locations/knoxville-tn",
  phone: "(865) 346-3339",
  address: { city: "Knoxville", region: "TN" },
  geo: { latitude: 35.9606, longitude: -83.9207 },
});
```

---

## ⏳ Loading Skeletons

### Basic Usage
```tsx
import { SkeletonGrid } from '@/components/ui/Skeleton';

function MyComponent() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <SkeletonGrid columns={4} count={4} />;
  }

  return <ActualContent />;
}
```

### Available Skeletons
```tsx
import {
  Skeleton,              // Basic
  SkeletonCard,          // Feature card
  SkeletonGrid,          // Grid layout
  SkeletonHero,          // Hero section
  SkeletonText,          // Multi-line text
  SkeletonAvatar,        // Profile pic
  SkeletonButton,        // Button
  SkeletonTestimonial,   // Testimonial
  SkeletonPricingCard,   // Pricing card
} from '@/components/ui/Skeleton';
```

---

## 📊 Analytics Setup

### Option A: Vercel (Easiest)
```bash
npm install @vercel/analytics
```

```tsx
// Add to layout.tsx
import { Analytics } from '@vercel/analytics/react';

<Analytics />
```

### Option B: Google Analytics 4
```env
# .env.local
GA4_MEASUREMENT_ID=G-XXXXXXXXXX
GA4_API_SECRET=your_secret
```

---

## ✅ Testing Checklist

### Before Deploy
```bash
# 1. Build and test
npm run build
npm run start

# 2. Check console for Web Vitals (all green)
# 3. Run Lighthouse (target: 90+)
# 4. Test structured data
```

### Validation URLs
- **Lighthouse**: Chrome DevTools → Lighthouse tab
- **Rich Results**: https://search.google.com/test/rich-results
- **Schema Validator**: https://validator.schema.org/
- **Sitemap**: http://localhost:3000/sitemap.xml
- **Robots**: http://localhost:3000/robots.txt

---

## 🎯 Performance Targets

| Metric | Target | Good | Poor |
|--------|--------|------|------|
| **LCP** | < 2.0s | < 2.5s | > 4.0s |
| **INP** | < 150ms | < 200ms | > 500ms |
| **CLS** | < 0.05 | < 0.1 | > 0.25 |
| **FCP** | < 1.5s | < 1.8s | > 3.0s |
| **TTFB** | < 400ms | < 600ms | > 1500ms |

---

## 🐛 Common Issues

### Images Not Optimizing
```javascript
// next.config.js - Add remote patterns
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'images.unsplash.com' },
  ],
}
```

### Web Vitals Not Showing
```tsx
// Make sure <WebVitalsReporter /> is in layout.tsx
// Check you're in development mode
```

### Build Fails on Images
```tsx
// All images need width/height OR fill
<OptimizedImage src="/img.jpg" width={800} height={600} alt="..." />
// OR
<OptimizedImage src="/img.jpg" fill alt="..." className="object-cover" />
```

### High CLS
1. Add width/height to ALL images
2. Add skeleton loaders
3. Reserve space for dynamic content
4. Check font loading (should use `display: swap`)

---

## 📁 File Locations

```
Key Files:
├── capture-client-site/
│   ├── next.config.js                    # Enhanced config
│   ├── src/
│   │   ├── components/
│   │   │   ├── OptimizedImage.tsx        # Use for all images
│   │   │   ├── seo/JsonLd.tsx           # Structured data
│   │   │   └── ui/Skeleton.tsx          # Loading states
│   │   ├── lib/
│   │   │   ├── vitals.ts                # Web Vitals tracking
│   │   │   └── seo-schemas.ts           # Schema generators
│   │   └── app/
│   │       ├── api/analytics/route.ts   # Analytics endpoint
│   │       ├── sitemap.ts               # Sitemap (existing)
│   │       └── robots.ts                # Robots (existing)

Documentation:
├── PERFORMANCE_REPORT.md                 # Full technical docs
├── PERFORMANCE_IMPLEMENTATION.md         # Step-by-step guide
├── PERFORMANCE_SUMMARY.md                # Executive summary
└── QUICK_REFERENCE.md                    # This file
```

---

## 🔗 Useful Links

### Testing
- **PageSpeed**: https://pagespeed.web.dev/
- **WebPageTest**: https://webpagetest.org/
- **Rich Results**: https://search.google.com/test/rich-results

### Documentation
- **Next.js**: https://nextjs.org/docs/app/building-your-application/optimizing
- **Web Vitals**: https://web.dev/vitals/
- **Schema.org**: https://schema.org/

### Analytics
- **Vercel**: vercel.com/[project]/analytics
- **GA4**: analytics.google.com
- **Search Console**: search.google.com/search-console

---

## 💡 Pro Tips

1. **Always use `priority` for above-fold images**
   ```tsx
   <OptimizedImage priority src="/hero.jpg" ... />
   ```

2. **Add structured data to ALL key pages**
   - Homepage: Organization
   - Services: Service
   - Locations: LocalBusiness
   - Packages: Product
   - FAQ sections: FAQPage

3. **Use skeletons to prevent CLS**
   ```tsx
   {loading ? <SkeletonCard /> : <ActualCard />}
   ```

4. **Monitor Web Vitals daily (first week)**
   ```bash
   npm run dev
   # Check console for metrics
   ```

5. **Submit sitemap immediately after deploy**
   - Go to Google Search Console
   - Add sitemap: `https://your-domain.com/sitemap.xml`

---

## 🎉 Quick Wins

### 5-Minute Wins
- [x] Add `<WebVitalsReporter />`
- [x] Install Vercel Analytics
- [x] Submit sitemap to Google

### 15-Minute Wins
- [x] Replace hero image with `<OptimizedImage priority>`
- [x] Add Organization schema to homepage
- [x] Add skeleton to one async section

### 30-Minute Wins
- [x] Replace all images
- [x] Add structured data to service pages
- [x] Add skeletons to all async content

---

## 📞 Need Help?

- **Technical docs**: `PERFORMANCE_REPORT.md`
- **Implementation guide**: `PERFORMANCE_IMPLEMENTATION.md`
- **Next.js docs**: https://nextjs.org/docs
- **Chrome DevTools**: F12 → Performance/Lighthouse tabs

---

**Last Updated**: 2025-11-28
**Status**: Ready to use ✅
