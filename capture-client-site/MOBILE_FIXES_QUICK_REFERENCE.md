# MOBILE FIXES - QUICK REFERENCE
## Immediate Action Items

**Overall Score:** 7/10 → Target: 9/10
**Timeline:** 2-3 days of focused work

---

## CRITICAL FIXES (Do Today)

### 1. Fix Broken Mobile Navigation
**File:** `src/components/Header.tsx` or `Navigation.tsx`
**Issue:** Hamburger menu button not responding
**Fix:**
```jsx
// Ensure proper z-index
<header className="sticky top-0 z-50">
  <button
    className="z-50 relative lg:hidden" // Force above all
    aria-label="Open menu"
    aria-expanded={isOpen}
    onClick={() => setIsOpen(!isOpen)}
  >
    {isOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
  </button>
</header>

<div className={`fixed inset-0 z-40 ${isOpen ? 'block' : 'hidden'}`}>
  <nav>{/* Menu items */}</nav>
</div>
```

---

### 2. Increase Touch Targets to 44x44px Minimum
**Files:** All components with buttons/links
**Issue:** 14-31 touch targets too small per page
**Fix:**
```css
/* Add to globals.css or Tailwind config */
.touch-target {
  @apply min-h-[44px] min-w-[44px] inline-flex items-center justify-center;
}

/* For navigation links */
nav a {
  @apply min-h-[44px] px-4 flex items-center;
}

/* For buttons */
button {
  @apply min-h-[44px] px-6 py-3;
}
```

**Specific Issues:**
- Logo: 40x40px → Need 44x44px
- Nav links: 20px height → Need 44px height
- "Skip to main content": 48x24px → Need 44x44px
- Phone link: 242x28px → Need 44px height

---

### 3. Fix LCP Performance (4.76s → Target: <2.5s)
**Files:** Hero components, `next.config.js`
**Issue:** LCP at 119% of poor threshold
**Fix:**

```jsx
// Optimize hero images
import Image from 'next/image';

<Image
  src="/hero-bg.webp"
  priority // Loads immediately
  quality={85}
  placeholder="blur"
  width={1920}
  height={1080}
  className="..."
/>
```

```html
<!-- Add preload in layout.tsx or page.tsx -->
<link rel="preload" as="image" href="/hero-bg.webp" />
```

```js
// next.config.js - Enable image optimization
module.exports = {
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
}
```

**Action Items:**
1. Convert all hero images to WebP format
2. Add `priority` prop to hero images
3. Add preload directives
4. Test with Lighthouse

---

### 4. Fix Small Typography (108+ instances below 14px)
**Files:** `globals.css`, Tailwind config
**Issue:** Text too small to read comfortably
**Fix:**
```css
/* globals.css - Set minimum sizes */
html {
  font-size: 16px; /* Base */
}

body {
  @apply text-base; /* 16px */
}

p, span, div {
  font-size: 14px; /* Minimum */
  line-height: 1.5;
}

small, .text-xs {
  font-size: 12px; /* Only for captions */
}
```

```js
// tailwind.config.js - Update fontSize scale
module.exports = {
  theme: {
    fontSize: {
      xs: ['12px', '1.4'], // Captions only
      sm: ['14px', '1.5'], // Body minimum
      base: ['16px', '1.5'], // Default body
      lg: ['18px', '1.6'],
      // ... rest of scale
    }
  }
}
```

---

### 5. Disable Backdrop-Blur on Mobile
**Files:** `globals.css`, all card components
**Issue:** Performance hit on mobile devices
**Fix:**
```css
/* globals.css */
.glass-card {
  background: rgba(15, 23, 42, 0.95);
  border: 1px solid rgba(100, 200, 255, 0.2);
}

/* Only enable on desktop */
@media (min-width: 1024px) {
  .glass-card {
    backdrop-filter: blur(12px);
  }
}
```

---

## PHASE 2: UX IMPROVEMENTS (This Week)

### 6. Add Sticky Mobile CTAs
**Files:** Services, Pricing, Location pages
**Fix:**
```jsx
// Add to bottom of pages
<div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-900/95 border-t border-cyan-500/20 z-50 lg:hidden">
  <div className="flex gap-3">
    <a
      href="tel:8653463339"
      className="flex-1 bg-cyan-500 text-white py-3 rounded-lg font-semibold text-center min-h-[44px] flex items-center justify-center"
    >
      Call Now
    </a>
    <button className="flex-1 bg-gold-500 text-slate-900 py-3 rounded-lg font-semibold min-h-[44px]">
      Book Demo
    </button>
  </div>
</div>
```

---

### 7. Add Image Lazy Loading & Placeholders
**Fix:**
```jsx
<Image
  src={imageUrl}
  loading="lazy" // Lazy load
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..." // Tiny blur
  className="..."
/>
```

---

### 8. Add Skeleton Loaders
**Fix:**
```jsx
{isLoading ? (
  <div className="animate-pulse space-y-4">
    <div className="h-48 bg-slate-700/50 rounded-lg"></div>
    <div className="h-4 bg-slate-700/50 rounded w-3/4"></div>
    <div className="h-4 bg-slate-700/50 rounded w-1/2"></div>
  </div>
) : (
  <Content />
)}
```

---

## TESTING CHECKLIST

After each fix, test:
- [ ] Mobile navigation opens/closes
- [ ] All buttons are 44x44px minimum
- [ ] Text is 14px minimum (12px for captions only)
- [ ] LCP is under 2.5s (run Lighthouse)
- [ ] No horizontal scroll on 390px width
- [ ] Forms are easy to use with thumbs
- [ ] Images load progressively
- [ ] No console errors

---

## FILES TO MODIFY

**Priority 1 (Today):**
- `src/components/Header.tsx` - Mobile nav
- `src/components/ui/Button.tsx` - Touch targets
- `src/components/Hero.tsx` - LCP optimization
- `globals.css` - Typography and backdrop-blur
- `next.config.js` - Image optimization

**Priority 2 (This Week):**
- `src/app/services/page.tsx` - Sticky CTAs
- `src/app/pricing/page.tsx` - Sticky CTAs
- `src/app/locations/[location]/page.tsx` - Sticky CTAs
- All image components - Lazy loading

---

## MEASUREMENT

**Before:**
- Mobile Score: 7/10
- LCP: 4.76s
- Touch Targets: 3/10
- Navigation: Broken

**Target After Fixes:**
- Mobile Score: 9/10
- LCP: <2.5s
- Touch Targets: 10/10
- Navigation: Working perfectly

---

## QUICK WINS (30 mins each)

1. **Fix mobile nav z-index** (30 min)
2. **Convert hero images to WebP** (30 min)
3. **Add `priority` to hero images** (15 min)
4. **Increase button padding to min-h-[44px]** (45 min)
5. **Update base font size to 14px** (30 min)
6. **Disable backdrop-blur on mobile** (20 min)

**Total:** ~3 hours for all quick wins

---

## VERIFY WITH

```bash
# Run Playwright mobile test
node mobile-audit.js

# Check Lighthouse score
npx lighthouse http://localhost:3001 --view --preset=mobile

# Test on real device
# Use ngrok or similar to expose localhost
npx ngrok http 3001
```

---

**Start with mobile navigation fix - it's blocking users from accessing your site!**
