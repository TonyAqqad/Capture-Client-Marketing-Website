# Touch UX Quick Reference Guide

**For:** Developers, Designers, QA Team
**Updated:** 2025-12-02

---

## Touch Target Sizes (Apple & Android Standards)

| Size | Use Case | Platform Standard |
|------|----------|-------------------|
| 44px | Minimum (iOS) | Apple HIG minimum |
| 48px | Comfortable (Android) | Material Design recommended |
| 56px | Preferred (All) | Our standard for primary actions |

**Rule:** Never go below 44px. Prefer 48-56px for comfort.

---

## CSS Classes Available

### Touch Optimization
```tsx
// Fast taps - removes 300ms delay
className="touch-manipulation"

// Touch target minimum size
className="touch-target" // min-height: 44px, min-width: 44px

// Tap feedback
className="tap-feedback" // active:scale-95 + brightness-90

// Smooth scrolling container
className="smooth-scroll"

// Prevent pull-to-refresh
className="no-overscroll"
```

### Common Patterns
```tsx
// Standard Button
className="min-h-[56px] touch-manipulation active:scale-95 transition-transform duration-100"

// Phone Link
className="min-h-[56px] touch-manipulation active:scale-95 inline-flex items-center"

// Form Input
className="min-h-[52px] touch-manipulation"

// Card/Interactive Surface
className="touch-manipulation active:scale-98 transition-transform duration-150"
```

---

## Component Checklist

When creating or editing interactive components:

- [ ] Touch target ≥ 44px (prefer 56px)
- [ ] `touch-manipulation` class applied
- [ ] Active state for visual feedback
- [ ] Proper spacing between touch targets (8px minimum)
- [ ] Works on iPhone SE (375px width)
- [ ] No 300ms delay on tap
- [ ] Proper input types (tel, email, etc.)

---

## Framer Motion Touch Feedback

```tsx
// Standard button feedback
<motion.button
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.1 }}
  className="touch-manipulation"
>
```

```tsx
// Card/larger surface feedback
<motion.div
  whileTap={{ scale: 0.99 }}
  transition={{ duration: 0.1 }}
  className="touch-manipulation"
>
```

```tsx
// Small icon button feedback
<motion.button
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.1 }}
  className="touch-manipulation"
>
```

---

## Mobile Detection Pattern

Use this pattern when an interaction should behave differently on touch vs mouse:

```tsx
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const checkMobile = () => {
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth < 1024;
    setIsMobile(hasTouch || isSmallScreen);
  };

  checkMobile();
  window.addEventListener('resize', checkMobile);
  return () => window.removeEventListener('resize', checkMobile);
}, []);

// Then use isMobile to conditionally apply behaviors
```

**Example Use Cases:**
- Disable hover effects on mobile
- Disable magnetic/parallax effects on mobile
- Show different UI on touch devices

---

## Form Input Optimization

```tsx
// Text input
<input
  type="text"
  autoComplete="name"
  className="min-h-[52px] touch-manipulation"
/>

// Phone input
<input
  type="tel"
  inputMode="numeric"
  autoComplete="tel"
  className="min-h-[52px] touch-manipulation"
/>

// Email input
<input
  type="email"
  autoComplete="email"
  className="min-h-[52px] touch-manipulation"
/>

// Select dropdown
<select
  className="min-h-[52px] touch-manipulation appearance-none"
>
```

**Key Points:**
- Always use proper input types (tel, email, url)
- Always add `inputMode` for numeric keyboards
- Always add `autoComplete` attributes
- Font size ≥ 16px (prevents iOS zoom)
- Add `touch-manipulation` to all inputs

---

## Common Mistakes to Avoid

### ❌ Don't Do This
```tsx
// Too small
<button className="h-8">Click</button>

// No touch feedback
<button className="...">Click</button>

// No touch-manipulation
<input type="text" />

// Magnetic effect on mobile
<MagneticButton /> // Without mobile detection

// Arbitrary small spacing
<div className="gap-2"> // Touch targets too close
```

### ✅ Do This Instead
```tsx
// Proper size
<button className="min-h-[56px]">Click</button>

// With feedback
<button className="touch-manipulation active:scale-95">Click</button>

// Optimized input
<input type="text" className="touch-manipulation" />

// Magnetic only on desktop
<MagneticButton /> // With built-in mobile detection

// Adequate spacing
<div className="gap-4"> // 16px between touch targets
```

---

## Testing Commands

### TypeScript Check
```bash
cd capture-client-site
npm run type-check
```

### Build Test
```bash
npm run build
```

### Dev Server
```bash
npm run dev
```

### Touch Testing in Chrome
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select mobile device
4. Enable "Show rulers"
5. Click touch targets - should see 44px+ circles

---

## QA Test Cases

### Test 1: Tap Latency
1. Open site on real mobile device
2. Tap any button
3. **Expected:** Instant visual feedback (<50ms)
4. **Fail:** If there's a noticeable delay

### Test 2: Touch Targets
1. Enable Chrome DevTools touch emulation
2. Click interactive elements
3. **Expected:** Touch circle shows ≥44px diameter
4. **Fail:** If circle is smaller than 44px

### Test 3: Scroll Smoothness
1. Scroll rapidly on homepage
2. **Expected:** Buttery smooth, no stuttering
3. **Fail:** If scrolling feels janky or laggy

### Test 4: Form Inputs
1. Tap any form input
2. **Expected:** Keyboard appears immediately
3. **Fail:** If there's a 300ms delay

### Test 5: Active States
1. Tap and hold any button
2. **Expected:** Button scales down slightly
3. **Fail:** If no visual change occurs

---

## Browser DevTools Tips

### Chrome DevTools - Mobile Emulation
1. F12 → Toggle device toolbar
2. Select "iPhone 12 Pro"
3. Enable "Show media queries"
4. Throttle network to "Fast 3G"
5. Test all interactions

### Chrome DevTools - Touch Visualization
1. F12 → More tools → Rendering
2. Enable "Show touch targets"
3. All interactive elements show size circles
4. Look for red circles (too small)

### Safari Web Inspector (iOS)
1. Settings → Safari → Advanced → Web Inspector
2. Connect iPhone to Mac
3. Safari → Develop → [Your iPhone]
4. Test on real device, debug on Mac

---

## Lighthouse Mobile Audit

Run this to check mobile performance:

```bash
npm run build
npx lighthouse http://localhost:3000 --view --preset=desktop
npx lighthouse http://localhost:3000 --view --preset=mobile
```

**Target Scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 100
- SEO: 100

---

## When to Use Each Touch Feedback

| Element Type | Feedback | Example |
|-------------|----------|---------|
| Primary CTA | `whileTap={{ scale: 0.98 }}` | "Book Demo" button |
| Secondary button | `active:scale-95` | "Learn More" link |
| Card/Surface | `active:scale-99` | Pricing card |
| Icon button | `active:scale-95` | Mobile menu toggle |
| Link | `active:opacity-80` | Footer links |
| Form input | `active:ring-4` | Text input focus |

---

## Touch-Friendly Spacing

```tsx
// Buttons in a row
<div className="flex gap-4"> // 16px = comfortable
  <button className="min-h-[56px]">Button 1</button>
  <button className="min-h-[56px]">Button 2</button>
</div>

// Stacked links
<div className="flex flex-col gap-3"> // 12px = minimum
  <a className="min-h-[48px]">Link 1</a>
  <a className="min-h-[48px]">Link 2</a>
</div>

// Form fields
<div className="space-y-5"> // 20px = optimal
  <input className="min-h-[52px]" />
  <input className="min-h-[52px]" />
</div>
```

---

## Resources

### Documentation
- [Apple Human Interface Guidelines - Touch Targets](https://developer.apple.com/design/human-interface-guidelines/inputs/touchscreen-gestures/)
- [Material Design - Touch Targets](https://m3.material.io/foundations/interaction/gestures)
- [WCAG 2.5.5 - Target Size](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html)

### Tools
- [Chrome DevTools - Mobile Emulation](https://developer.chrome.com/docs/devtools/device-mode/)
- [iOS Simulator (Xcode)](https://developer.apple.com/documentation/xcode/running-your-app-in-simulator-or-on-a-device)
- [BrowserStack - Real Device Testing](https://www.browserstack.com/)

### Internal
- Full Audit Report: `TOUCH_UX_OPTIMIZATION_REPORT.md`
- Implementation Summary: `TOUCH_UX_OPTIMIZATION_COMPLETE.md`
- Code Examples: Check `src/components/ui/MagneticButton.tsx`

---

## Quick Wins for Touch UX

1. **Add `touch-manipulation` to everything interactive** (5 min)
2. **Increase all touch targets to 48px minimum** (10 min)
3. **Add active states to all buttons** (10 min)
4. **Use proper input types (tel, email)** (5 min)
5. **Test on real device** (15 min)

**Total time investment:** 45 minutes
**Expected mobile conversion lift:** 5-15%

---

## Support

**Questions?** Check these files:
- Component patterns: `src/components/ui/Button.tsx`
- Form patterns: `src/components/LeadCaptureForm.tsx`
- Mobile detection: `src/components/ui/MagneticButton.tsx`
- CSS utilities: `src/app/globals.css`

**Need help?** Contact the Component Architect team.

**Found a bug?** Check `TOUCH_UX_OPTIMIZATION_REPORT.md` for known issues.
