# Performance Fixes - Code Reference

## Quick Copy-Paste Guide for Similar Issues

---

## 1. THROTTLED SCROLL LISTENER

**Use this pattern for ANY scroll listener:**

```typescript
useEffect(() => {
  let ticking = false;

  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        // Your scroll logic here
        const scrollY = window.scrollY;
        const progress = (scrollY / documentHeight) * 100;
        setScrollProgress(progress);

        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
```

**Key Points:**
- `ticking` flag prevents multiple RAF calls
- `requestAnimationFrame` syncs with browser repaint (60fps)
- `{ passive: true }` tells browser we won't call preventDefault

---

## 2. THROTTLED MOUSEMOVE LISTENER

**Use this pattern for ANY mousemove listener:**

```typescript
useEffect(() => {
  // Skip on mobile - no benefit, big cost
  if (typeof window !== 'undefined' && window.innerWidth < 1024) {
    return;
  }

  let ticking = false;

  const handleMouseMove = (e: MouseEvent) => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        // Your mouse logic here
        const { clientX, clientY } = e;
        mouseX.set(clientX);
        mouseY.set(clientY);

        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener("mousemove", handleMouseMove, { passive: true });
  return () => window.removeEventListener("mousemove", handleMouseMove);
}, []);
```

**Key Points:**
- ALWAYS disable on mobile (< 1024px)
- Throttle with requestAnimationFrame
- Use passive listeners

---

## 3. GPU ACCELERATION FOR ANIMATIONS

**Add to EVERY animated element in CSS:**

```css
.animated-element {
  /* Your existing styles */
  transition: transform 0.3s ease;

  /* GPU acceleration */
  will-change: transform;
  transform: translateZ(0);
}
```

**Or in Framer Motion:**

```typescript
<motion.div
  style={{
    willChange: 'transform',
    transform: 'translateZ(0)'
  }}
  animate={{ scale: [1, 1.1, 1] }}
>
  {/* content */}
</motion.div>
```

**Key Points:**
- `will-change` tells browser to optimize this property
- `translateZ(0)` forces GPU compositing layer
- Use for transform, opacity, filter animations

---

## 4. REDUCE ANIMATION COMPLEXITY

**Before (Heavy):**
```typescript
<motion.div
  animate={{
    scale: [1, 1.5, 1],      // 50% scale change
    opacity: [0.2, 1, 0.2],   // Large opacity changes
  }}
  transition={{
    duration: 3,              // Fast = more calculations
    repeat: Infinity
  }}
/>
```

**After (Light):**
```typescript
<motion.div
  animate={{
    scale: [1, 1.1, 1],      // 10% scale change
    opacity: [0.3, 0.5, 0.3], // Subtle opacity changes
  }}
  transition={{
    duration: 8,              // Slower = fewer calculations
    repeat: Infinity
  }}
  className="hidden lg:block" // Hide on mobile
/>
```

**Key Points:**
- Smaller scale changes (1.1x instead of 1.5x)
- Slower durations (8s instead of 3s)
- Hide decorative animations on mobile

---

## 5. CONTENT-VISIBILITY FOR OFF-SCREEN SECTIONS

**Add to section containers:**

```css
.section {
  /* Your existing styles */
  padding: 80px 0;

  /* Performance optimization */
  content-visibility: auto;
  contain-intrinsic-size: auto 500px;
}
```

**Key Points:**
- Browser skips rendering off-screen sections
- `contain-intrinsic-size` prevents layout shifts
- Massive performance boost for long pages

---

## 6. DISABLE SMOOTH SCROLL ON MOBILE

```css
html {
  scroll-behavior: smooth;
}

/* Disable on mobile for performance */
@media (max-width: 768px) {
  html {
    scroll-behavior: auto;
  }
}
```

**Key Points:**
- Smooth scroll forces animation calculations
- Mobile users expect instant scrolling anyway
- Desktop keeps smooth scroll for UX

---

## 7. LAZY LOAD HEAVY COMPONENTS

```typescript
import dynamic from 'next/dynamic';

// Instead of:
// import LeadRescueSimulator from '@/components/LeadRescueSimulator';

// Use:
const LeadRescueSimulator = dynamic(
  () => import('@/components/LeadRescueSimulator'),
  {
    loading: () => <Skeleton />,
    ssr: false  // Skip server-side render if not needed
  }
);
```

**Key Points:**
- Splits heavy components into separate chunks
- Only loads when component renders
- Use for below-fold components

---

## 8. INTERSECTION OBSERVER FOR IN-VIEW ANIMATIONS

**Already optimized in the codebase:**

```typescript
const containerRef = useRef<HTMLDivElement>(null);
const isInView = useInView(containerRef, { threshold: 0.3 });

useEffect(() => {
  if (!isInView) return; // Skip if not visible

  const interval = setInterval(() => {
    // Animation logic only when visible
  }, 1000);

  return () => clearInterval(interval);
}, [isInView]);
```

**Key Points:**
- Only run animations when element is visible
- Saves CPU/GPU when scrolled past
- Already using in `useInView.ts` hook

---

## PERFORMANCE TESTING CHECKLIST

### Chrome DevTools:
```
1. Open DevTools (F12)
2. Go to Performance tab
3. Click Record (red dot)
4. Scroll page for 5 seconds
5. Click Stop
6. Look at FPS chart - should be green 60fps
7. Check for red bars (dropped frames) - should be minimal
```

### Lighthouse CLI:
```bash
npx lighthouse https://your-site.com --view
```

**Target Scores:**
- Performance: > 90
- LCP: < 2.5s (green)
- FID: < 100ms (green)
- CLS: < 0.1 (green)

### Real Device Testing:
1. Deploy to production
2. Open on actual phone (not simulator)
3. Scroll rapidly
4. Should feel instant and smooth
5. No jank or stutter

---

## COMMON PATTERNS TO AVOID

### ❌ DON'T DO THIS:
```typescript
// Unthrottled scroll listener
window.addEventListener("scroll", () => {
  setScrollY(window.scrollY); // Fires 100+ times/second
});

// Heavy animation on every element
<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 1, repeat: Infinity }}
/>

// No GPU acceleration
.animated {
  transition: transform 0.3s;
  /* Missing: will-change, translateZ(0) */
}

// Mouse tracking on mobile
// No mobile check - wastes battery
```

### ✅ DO THIS INSTEAD:
```typescript
// Throttled with RAF
let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      setScrollY(window.scrollY);
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

// Slower, subtler animations
<motion.div
  animate={{ rotate: [0, 5, 0] }}
  transition={{ duration: 8, repeat: Infinity }}
  className="hidden lg:block" // Hide on mobile
/>

// GPU acceleration
.animated {
  transition: transform 0.3s;
  will-change: transform;
  transform: translateZ(0);
}

// Mobile detection
if (window.innerWidth < 1024) return; // Skip on mobile
```

---

## PERFORMANCE BUDGET

**Target Bundle Sizes:**
- Main bundle: < 200KB
- Total JavaScript: < 500KB
- Images (per page): < 1MB

**Target Metrics:**
- Scroll FPS: 60fps
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1

**Animation Budget:**
- Max simultaneous animations: 5
- Max animation complexity: 1.2x scale
- Mobile animations: 0 (decorative only)

---

## QUICK DEBUGGING

### Laggy Scrolling?
1. Check for unthrottled scroll listeners
2. Add GPU acceleration to animated elements
3. Use `content-visibility: auto` on sections
4. Disable smooth scroll on mobile

### Laggy Mouse Movement?
1. Throttle mousemove with requestAnimationFrame
2. Disable on mobile
3. Use passive listeners
4. Add GPU acceleration

### Low FPS?
1. Reduce animation complexity
2. Hide decorative animations on mobile
3. Use longer animation durations
4. Check Chrome DevTools Performance tab

### High Bundle Size?
1. Use dynamic imports
2. Tree-shake unused code
3. Analyze bundle with `@next/bundle-analyzer`
4. Remove unused dependencies

---

**Reference:** Capture Client Performance Optimizations
**Date:** 2025-12-01
