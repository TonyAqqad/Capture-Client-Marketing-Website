# iOS Performance Quick Reference

Fast reference for implementing iOS-optimized animations and interactions.

---

## Import Statement

```typescript
import {
  isIOSDevice,
  isLowPowerDevice,
  getOptimalAnimationConfig,
  createVisibilityAwareInterval,
  rafThrottle,
  addPassiveEventListener,
} from '@/lib/ios-performance';
```

---

## Common Patterns

### 1. Detect iOS and Apply Config

```typescript
const [config, setConfig] = useState({
  isIOS: false,
  enableAnimations: true,
});

useEffect(() => {
  const animConfig = getOptimalAnimationConfig();
  setConfig({
    isIOS: isIOSDevice(),
    enableAnimations: animConfig.enableInfinite,
  });
}, []);
```

### 2. Conditional Animation Rendering

```typescript
{config.enableAnimations && (
  <motion.div
    animate={{ /* complex animation */ }}
    transition={config.isIOS ? { type: 'tween', duration: 0.3 } : { type: 'spring' }}
  />
)}
```

### 3. Visibility-Aware Intervals

```typescript
useEffect(() => {
  const cleanup = createVisibilityAwareInterval(() => {
    // Your periodic logic (e.g., updating stats, rotating content)
  }, 3000); // Pauses when tab is hidden

  return cleanup;
}, []);
```

### 4. Optimized Scroll Handler

```typescript
useEffect(() => {
  const handleScroll = rafThrottle(() => {
    // Your scroll logic
  });

  const cleanup = addPassiveEventListener(window, 'scroll', handleScroll);
  return cleanup;
}, []);
```

### 5. iOS-Safe will-change

```typescript
<motion.div
  style={{
    willChange: isIOS ? 'auto' : 'transform, opacity',
    transform: 'translate3d(0, 0, 0)', // GPU hint for iOS
  }}
/>
```

---

## Animation Decision Tree

```
Is the animation critical to UX?
│
├─ YES → Keep animation, optimize for iOS
│   │
│   ├─ Is it a spring animation?
│   │   └─ Convert to tween on iOS
│   │
│   ├─ Is it infinite?
│   │   └─ Use createVisibilityAwareInterval
│   │
│   └─ Is it parallax/mouse-driven?
│       └─ Disable on iOS (touch devices)
│
└─ NO → Disable on mobile entirely
    └─ Use disableAnimations flag
```

---

## Component Checklist

When creating a new animated component:

- [ ] Import `isIOSDevice()` and check on mount
- [ ] Use `createVisibilityAwareInterval` for any setInterval
- [ ] Convert spring animations to tween on iOS
- [ ] Limit concurrent animations (8-12 max on iOS)
- [ ] Use `rafThrottle` for scroll/mouse handlers
- [ ] Add `passive: true` to all scroll/touch listeners
- [ ] Remove `will-change` after animation completes
- [ ] Test on iPhone SE (low-power device)

---

## Performance Targets

| Metric | Desktop | iOS | iOS Low-Power |
|--------|---------|-----|---------------|
| Frame Rate | 60 FPS | 60 FPS | 50 FPS |
| Concurrent Animations | 20+ | 8-12 | 3-5 |
| Animation Duration | Any | < 0.5s | < 0.3s |
| Interval Frequency | Any | > 1s | > 2s |

---

## Common Mistakes

### ❌ DON'T DO THIS

```typescript
// BAD: Always-running interval
setInterval(() => { /* logic */ }, 1000);

// BAD: Blocking event listener
window.addEventListener('scroll', handler);

// BAD: Spring on iOS
<motion.div transition={{ type: 'spring', stiffness: 200 }} />

// BAD: Excessive will-change
style={{ willChange: 'transform, opacity, width, height, background' }}
```

### ✅ DO THIS INSTEAD

```typescript
// GOOD: Visibility-aware interval
const cleanup = createVisibilityAwareInterval(() => { /* logic */ }, 1000);

// GOOD: Passive listener
addPassiveEventListener(window, 'scroll', handler);

// GOOD: Tween on iOS
<motion.div transition={isIOS ? { type: 'tween', duration: 0.3 } : { type: 'spring' }} />

// GOOD: Limited will-change on iOS
style={{ willChange: isIOS ? 'auto' : 'transform' }}
```

---

## Testing Commands

```bash
# Test on iOS simulator
npm run dev
# Open http://localhost:3000 in iOS Simulator

# Lighthouse mobile audit
npx lighthouse http://localhost:3000 --preset=mobile --view

# Check bundle size
npm run build
npm run analyze
```

---

## Debug Console Warnings

The performance utilities will log warnings in development:

```
[iOS Performance] ComponentName: Low frame rate detected (45 fps).
Consider reducing animations.
```

**Action:** Reduce concurrent animations or disable on low-power devices.

---

## When to Use Each Utility

| Utility | Use Case |
|---------|----------|
| `isIOSDevice()` | Detect iPhone/iPad (any scenario) |
| `isLowPowerDevice()` | Detect older iPhones, adjust animations |
| `getOptimalAnimationConfig()` | Get complete animation settings |
| `createVisibilityAwareInterval()` | Any setInterval/setTimeout loop |
| `rafThrottle()` | Scroll, mousemove, resize handlers |
| `debounce()` | Input handlers, search, window resize |
| `addPassiveEventListener()` | Scroll, touchstart, touchmove events |
| `createIOSOptimizedObserver()` | IntersectionObserver for lazy loading |

---

## Emergency Performance Fix

If a component is causing iOS Safari to crash or freeze:

```typescript
// Quick fix: Disable all animations on iOS
const { isIOS } = useMobileOptimization();

if (isIOS) {
  return <StaticVersion />; // No animations
}

return <AnimatedVersion />;
```

---

## Resources

- **Main Report:** `IOS_PERFORMANCE_OPTIMIZATION_REPORT.md`
- **Utilities:** `src/lib/ios-performance.ts`
- **Example Component:** `src/components/AudioWaveform.tsx`
- **Example Hook:** `src/hooks/useInView.ts`

---

**Last Updated:** 2025-12-02
**Maintained By:** Component Architect Team
