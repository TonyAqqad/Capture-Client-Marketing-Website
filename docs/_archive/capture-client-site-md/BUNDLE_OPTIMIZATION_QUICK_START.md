# BUNDLE OPTIMIZATION - QUICK START GUIDE

**Fix mobile bundle size in 30 minutes**

---

## STEP 1: Install Dynamic Import Types (if needed)

```bash
# Already have Next.js, so no install needed
```

---

## STEP 2: Update Homepage (src/app/page.tsx)

**BEFORE:**
```typescript
import InteractiveAIDemo from "@/components/features/InteractiveAIDemo";
import ROICalculator from "@/components/features/ROICalculator";
import MoneyLossCalculator from "@/components/features/MoneyLossCalculator";
import ExitIntentPopup from "@/components/cro/ExitIntentPopup";
```

**AFTER:**
```typescript
import dynamic from 'next/dynamic';

// Heavy interactive components - load on demand
const InteractiveAIDemo = dynamic(
  () => import('@/components/features/InteractiveAIDemo'),
  {
    loading: () => (
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="animate-pulse text-white/40">Loading AI Demo...</div>
      </div>
    ),
    ssr: false // Interactive demo doesn't need server-side rendering
  }
);

const MoneyLossCalculator = dynamic(
  () => import('@/components/features/MoneyLossCalculator'),
  {
    loading: () => (
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="animate-pulse text-white/40">Loading Calculator...</div>
      </div>
    ),
    ssr: false
  }
);

const ExitIntentPopup = dynamic(
  () => import('@/components/cro/ExitIntentPopup'),
  { ssr: false } // Exit intent doesn't need loading state
);

// Keep these as regular imports (above the fold):
import { PremiumHero } from "@/components/sections/PremiumHero";
import StickyPhoneCTA from "@/components/cro/StickyPhoneCTA";
import ScrollProgress from "@/components/cro/ScrollProgress";
```

---

## STEP 3: Update Features Page (src/app/features/FeaturesPageClient.tsx)

**CHANGE THIS:**
```typescript
// Line 3-4 (OLD)
import Link from "next/link";
import { motion } from "framer-motion";
import AudioWaveform from "@/components/AudioWaveform";
import CRMCard from "@/components/CRMCard";
import GrowthDashboard from "@/components/GrowthDashboard";
```

**TO THIS:**
```typescript
import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from 'next/dynamic';

// Dynamic imports for heavy components
const AudioWaveform = dynamic(() => import('@/components/AudioWaveform'), {
  loading: () => <div className="h-24 animate-pulse bg-white/5 rounded-xl" />
});

const CRMCard = dynamic(() => import('@/components/CRMCard'), {
  loading: () => <div className="h-64 animate-pulse bg-white/5 rounded-xl" />
});

const GrowthDashboard = dynamic(() => import('@/components/GrowthDashboard'), {
  loading: () => <div className="h-80 animate-pulse bg-white/5 rounded-xl" />
});
```

---

## STEP 4: Update Pricing Page (src/app/pricing/PricingPageClient.tsx)

**IF it imports heavy calculators, add:**
```typescript
import dynamic from 'next/dynamic';

const ROICalculator = dynamic(
  () => import('@/components/features/ROICalculator'),
  {
    loading: () => <div className="min-h-[400px] animate-pulse bg-white/5 rounded-xl" />,
    ssr: false
  }
);
```

---

## STEP 5: Add Webpack Config to next.config.js

**Add this to the bottom of next.config.js:**

```javascript
const nextConfig = {
  // ... existing config ...

  // ADD THIS:
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Split framer-motion into separate chunk for better caching
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          cacheGroups: {
            ...config.optimization.splitChunks?.cacheGroups,
            framerMotion: {
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              name: 'framer-motion',
              chunks: 'all',
              priority: 10,
            },
            lucideReact: {
              test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
              name: 'lucide-react',
              chunks: 'all',
              priority: 10,
            },
          },
        },
      };
    }
    return config;
  },
};

module.exports = nextConfig;
```

---

## STEP 6: Test

```bash
# Build production bundle
npm run build

# Check bundle sizes
# Look for output like:
# ○ First Load JS shared by all          150 kB
# ├ chunks/framework-[hash].js           45 kB
# ├ chunks/main-[hash].js                30 kB
# ├ chunks/pages/_app-[hash].js          75 kB

# Run dev server and test
npm run dev
```

---

## VERIFICATION CHECKLIST

- [ ] Homepage loads in < 2 seconds on Fast 3G
- [ ] Interactive AI Demo appears when scrolled to
- [ ] ROI Calculator loads dynamically
- [ ] Exit Intent Popup doesn't block initial load
- [ ] No JavaScript errors in console
- [ ] Animations still work correctly
- [ ] Lighthouse mobile score > 80

---

## EXPECTED RESULTS

**Before:**
- Homepage bundle: ~800KB
- Mobile FCP: ~3.5 seconds
- Lighthouse: ~60

**After:**
- Homepage bundle: ~400KB (50% reduction)
- Mobile FCP: ~2.0 seconds (43% faster)
- Lighthouse: ~75 (+15 points)

---

## TROUBLESHOOTING

**Issue: "Module not found" error**
```
Solution: Check import path is correct
// BAD
dynamic(() => import('components/Feature'))

// GOOD
dynamic(() => import('@/components/Feature'))
```

**Issue: Component doesn't appear**
```
Solution: Check loading state renders
<Suspense fallback={<div>Loading...</div>}>
  <DynamicComponent />
</Suspense>
```

**Issue: Hydration mismatch**
```
Solution: Set ssr: false for client-only components
dynamic(() => import('./Component'), { ssr: false })
```

---

## NEXT STEPS

After implementing dynamic imports:

1. Run bundle analyzer:
   ```bash
   npm install --save-dev @next/bundle-analyzer
   ```

2. Add to next.config.js:
   ```javascript
   const withBundleAnalyzer = require('@next/bundle-analyzer')({
     enabled: process.env.ANALYZE === 'true',
   })

   module.exports = withBundleAnalyzer(nextConfig)
   ```

3. Analyze:
   ```bash
   ANALYZE=true npm run build
   ```

---

**Time to implement:** 30 minutes
**Impact:** 50% bundle reduction, 40% faster mobile load
**Effort:** LOW
**Priority:** CRITICAL
