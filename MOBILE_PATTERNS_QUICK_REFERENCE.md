# MOBILE PATTERNS QUICK REFERENCE
## Copy-Paste Patterns for Mobile Optimization

---

## 1. TOUCH TARGETS (48px Minimum)

### Buttons
```tsx
// CORRECT: 48px+ touch target
<button className="px-6 py-3 min-h-[48px] touch-manipulation">
  Click Me
</button>

// INCORRECT: Too small
<button className="px-3 py-1">Click Me</button>
```

### Links
```tsx
// CORRECT: Adequate touch area
<a href="/page" className="inline-flex items-center min-h-[48px] px-4 touch-manipulation">
  Learn More
</a>

// INCORRECT: Inline text link (too small)
<a href="/page">Learn More</a>
```

### Icon Buttons
```tsx
// CORRECT: Icon with sufficient padding
<button className="w-12 h-12 flex items-center justify-center touch-manipulation">
  <span className="material-icons">menu</span>
</button>

// INCORRECT: Icon only (too small)
<span className="material-icons cursor-pointer">menu</span>
```

---

## 2. RESPONSIVE TYPOGRAPHY

### Headlines
```tsx
// CORRECT: Fluid scaling with clamp()
<h1 className="text-hero-xl">
  {/* CSS: clamp(3rem, 12vw, 7rem) */}
  Never Miss Another Client
</h1>

// INCORRECT: Fixed size
<h1 className="text-6xl">Never Miss Another Client</h1>
```

### Body Text
```tsx
// CORRECT: 16px base, 18px+ on mobile
<p className="text-base sm:text-lg">
  Description text here...
</p>

// INCORRECT: Too small on mobile
<p className="text-xs">Description text here...</p>
```

### Labels
```tsx
// CORRECT: Readable size
<label className="text-sm font-semibold">
  Your Name <span className="text-accent">*</span>
</label>

// INCORRECT: Too small
<label className="text-xs">Name</label>
```

---

## 3. FORM INPUTS

### Text Input
```tsx
// CORRECT: 52px height, 16px font, proper attributes
<input
  type="text"
  placeholder="John Smith"
  autoComplete="name"
  className="w-full min-h-[52px] px-5 py-4 text-base
             bg-white/[0.03] border-2 border-white/10 rounded-xl
             text-white placeholder-white/40
             focus:border-accent focus:ring-4 focus:ring-accent/20
             touch-manipulation"
/>

// INCORRECT: Too small, no autocomplete
<input type="text" placeholder="Name" className="p-2" />
```

### Phone Input
```tsx
// CORRECT: tel type + numeric keyboard
<input
  type="tel"
  inputMode="numeric"
  placeholder="(865) 555-1234"
  autoComplete="tel"
  pattern="[0-9\s\(\)\-\+]+"
  className="min-h-[52px] text-base touch-manipulation"
/>

// INCORRECT: Text input for phone
<input type="text" placeholder="Phone" />
```

### Select Dropdown
```tsx
// CORRECT: 52px height, styled properly
<select
  className="w-full min-h-[52px] px-5 py-4 text-base
             bg-white/[0.03] border-2 border-white/10 rounded-xl
             appearance-none touch-manipulation
             [&>option]:bg-background-dark [&>option]:text-white"
>
  <option value="">Select...</option>
</select>

// INCORRECT: Default browser styling
<select><option>Select...</option></select>
```

---

## 4. CARDS & CONTAINERS

### Mobile Card
```tsx
// CORRECT: Responsive padding, no blur
<div className="glass-premium-mobile p-6 sm:p-8 rounded-2xl">
  {/* GPU-friendly, no backdrop-blur */}
  Content here...
</div>

// INCORRECT: Backdrop blur kills performance
<div className="backdrop-blur-xl p-4">Content</div>
```

### Grid Layout
```tsx
// CORRECT: Single column mobile, 2+ desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
</div>

// INCORRECT: Fixed columns (overflow on mobile)
<div className="grid grid-cols-3 gap-4">...</div>
```

---

## 5. SPACING & PADDING

### Section Padding
```tsx
// CORRECT: Scales from mobile to desktop
<section className="py-16 sm:py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
  Content...
</section>

// INCORRECT: Fixed large padding
<section className="py-32 px-8">Content</section>
```

### Container Max Width
```tsx
// CORRECT: Responsive max width
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  Content...
</div>

// INCORRECT: Fixed width (overflow on mobile)
<div className="max-w-7xl px-8">Content</div>
```

---

## 6. ANIMATIONS (Mobile-Friendly)

### Disable on Mobile
```tsx
// CORRECT: Conditional animations
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  setIsMobile(window.innerWidth < 768);
}, []);

// In render:
{!isMobile && (
  <motion.div animate={{ rotate: 360 }}>
    Animated content
  </motion.div>
)}

// INCORRECT: Always animate (janky on mobile)
<motion.div animate={{ rotate: 360 }}>Content</motion.div>
```

### GPU-Accelerated
```tsx
// CORRECT: Only animate transform & opacity
<motion.div
  animate={{ y: [0, -10, 0] }}
  transition={{ duration: 2 }}
  style={{ transform: 'translateZ(0)' }}  // GPU acceleration
>
  Content
</motion.div>

// INCORRECT: Animating expensive properties
<motion.div animate={{ height: '100%', width: '100%' }}>
  Content
</motion.div>
```

---

## 7. IMAGES

### Responsive Image
```tsx
// CORRECT: Multiple sizes, lazy loading
<Image
  src="/hero-image.jpg"
  alt="Description"
  width={1200}
  height={800}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  priority={false}  // Lazy load if not above fold
  className="w-full h-auto"
/>

// INCORRECT: Fixed size
<img src="/hero-image.jpg" width="1200" height="800" />
```

---

## 8. NAVIGATION

### Mobile Menu Button
```tsx
// CORRECT: 48px touch target
<button
  onClick={toggleMenu}
  className="w-12 h-12 flex items-center justify-center
             touch-manipulation active:scale-95"
  aria-label="Toggle menu"
>
  <span className="material-icons text-2xl">menu</span>
</button>

// INCORRECT: Too small
<button onClick={toggleMenu}>
  <span className="material-icons">menu</span>
</button>
```

### Mobile Menu Panel
```tsx
// CORRECT: Full height, smooth transition
<motion.div
  initial={{ x: '-100%' }}
  animate={{ x: 0 }}
  className="fixed inset-y-0 left-0 w-80 max-w-full
             bg-background-dark/95 backdrop-blur-xl
             border-r border-white/10
             overflow-y-auto smooth-scroll"
>
  Menu items...
</motion.div>

// INCORRECT: Fixed positioning without smooth scroll
<div className="fixed top-0 left-0">Menu</div>
```

---

## 9. MODALS & OVERLAYS

### Mobile Modal
```tsx
// CORRECT: Full-screen on mobile, centered on desktop
<div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

  {/* Modal content */}
  <div className="relative w-full sm:max-w-lg
                  bg-background-dark border border-white/20
                  rounded-t-3xl sm:rounded-2xl
                  max-h-[90vh] overflow-y-auto">
    Content...
  </div>
</div>

// INCORRECT: Fixed size modal
<div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96">
  Content
</div>
```

---

## 10. SAFE AREA INSETS (iPhone Notch)

### Bottom Navigation/CTA Bar
```tsx
// CORRECT: Respect safe area
<div className="fixed bottom-0 left-0 right-0
                bg-background-dark border-t border-white/10
                pb-safe-area-pb">
  <div className="px-4 py-4">
    CTA buttons...
  </div>
</div>

// INCORRECT: No safe area padding (covered by home indicator)
<div className="fixed bottom-0 left-0 right-0 p-4">
  CTA buttons...
</div>
```

### CSS Utility
```css
/* Add to globals.css */
.pb-safe-area-pb {
  padding-bottom: env(safe-area-inset-bottom, 0px);
}
```

---

## 11. PERFORMANCE PATTERNS

### Disable Backdrop Blur on Mobile
```css
/* Add to globals.css */
@media (max-width: 768px) {
  .backdrop-blur,
  .backdrop-blur-sm,
  .backdrop-blur-lg,
  [class*="backdrop-blur"] {
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
  }
}
```

### Hardware Acceleration
```tsx
// CORRECT: GPU-accelerated transform
<div style={{ transform: 'translateZ(0)' }}>
  Content
</div>

// CSS:
.gpu-accelerated {
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}
```

### Touch Manipulation
```css
/* Remove 300ms tap delay */
.touch-manipulation {
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
}
```

---

## 12. ACCESSIBILITY

### Skip Link
```tsx
// CORRECT: Screen reader accessible, shows on focus
<a
  href="#main-content"
  className="sr-only focus:not-sr-only
             focus:absolute focus:top-4 focus:left-4
             bg-accent text-background-dark
             px-6 py-3 rounded-lg font-bold z-50"
>
  Skip to main content
</a>

<main id="main-content">
  Page content...
</main>
```

### Focus Indicators
```css
/* Show focus ring only on keyboard navigation */
*:focus:not(:focus-visible) {
  outline: none;
}

*:focus-visible {
  outline: 2px solid rgba(0, 201, 255, 0.8);
  outline-offset: 4px;
  border-radius: 4px;
}
```

---

## 13. TESTING PATTERNS

### Viewport Sizes to Test

| Device | Width | Height | Notes |
|--------|-------|--------|-------|
| iPhone 13/14/15 | 390px | 844px | Standard iPhone |
| iPhone Pro Max | 430px | 932px | Largest iPhone |
| Samsung Galaxy S23 | 360px | 740px | Common Android |
| iPad Mini | 768px | 1024px | Tablet breakpoint |
| iPad Pro | 1024px | 1366px | Large tablet |

### Chrome DevTools Testing
```
1. Open DevTools (F12)
2. Click device toolbar icon (Ctrl+Shift+M)
3. Test these viewports:
   - 375px (iPhone SE)
   - 390px (iPhone 13/14/15)
   - 430px (iPhone Pro Max)
   - 768px (iPad Mini)
```

---

## 14. COMMON MISTAKES TO AVOID

### DON'T:
```tsx
// Too small touch targets
<button className="px-2 py-1">Click</button>

// Fixed text sizes
<p className="text-xs">Important text</p>

// Backdrop blur on mobile
<div className="backdrop-blur-xl">Content</div>

// Missing autocomplete
<input type="email" placeholder="Email" />

// Fixed width containers
<div className="w-96">Content</div>

// Always-on animations
<motion.div animate={{ rotate: 360 }}>Content</motion.div>
```

### DO:
```tsx
// Adequate touch targets
<button className="px-6 py-3 min-h-[48px] touch-manipulation">
  Click
</button>

// Responsive text
<p className="text-base sm:text-lg">Important text</p>

// Solid backgrounds on mobile
<div className="glass-premium-mobile">Content</div>

// Proper autocomplete
<input type="email" placeholder="Email" autoComplete="email" />

// Responsive containers
<div className="w-full max-w-7xl mx-auto px-4">Content</div>

// Conditional animations
{!isMobile && <motion.div>Content</motion.div>}
```

---

## 15. QUICK CHECKLIST

Before deploying any mobile feature:

- [ ] All buttons >= 48px height
- [ ] All text >= 14px (16px for body)
- [ ] No backdrop-blur on mobile
- [ ] Touch-manipulation on interactive elements
- [ ] Proper input types (tel, email, etc.)
- [ ] Autocomplete attributes on forms
- [ ] Visible labels (not placeholder-only)
- [ ] Responsive spacing (sm:, md:, lg: variants)
- [ ] Safe area padding for iPhone notch
- [ ] GPU acceleration for animations
- [ ] Test on 375px, 390px, 768px viewports
- [ ] Focus indicators on all interactive elements

---

**Last Updated**: December 5, 2025
**Use This**: As a reference when building new mobile features
