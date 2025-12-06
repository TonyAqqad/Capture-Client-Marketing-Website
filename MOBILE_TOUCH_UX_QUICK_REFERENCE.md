# MOBILE TOUCH UX - QUICK REFERENCE GUIDE

**For:** Capture Client Development Team
**Purpose:** Quick lookup for mobile touch patterns and standards
**Updated:** December 2, 2025

---

## TOUCH TARGET STANDARDS

### Minimum Sizes (Industry Standard)
```
Apple iOS HIG:  44×44pt minimum
Google Material: 48×48dp minimum
WCAG 2.1:       44×44px minimum
```

### Capture Client Standards (Exceeds Industry)
```
Buttons (small):   48×48px minimum  ✅
Buttons (medium):  48×52px minimum  ✅
Buttons (large):   52×56px minimum  ✅
Form inputs:       52px height      ✅
Links (footer):    48px height      ✅
Social icons:      48×48px         ✅
Slider thumbs:     28-32px mobile  ✅
```

---

## COMPONENT TOUCH TARGET REFERENCE

### Header
```tsx
// Mobile menu button
<button className="w-11 h-11">                    // 44×44px ✅

// Mobile nav links
<Link className="min-h-[56px]">                   // 56px height ✅

// Phone CTA
<a className="min-h-[56px]">                      // 56px height ✅

// Desktop CTA
<Link className="px-6 py-2.5">                    // ~48px ✅
```

### Footer
```tsx
// Phone/email links
<a className="min-h-[48px]">                      // 48px ✅

// Social icons
<a className="min-w-[48px] min-h-[48px]">        // 48×48px ✅

// Newsletter input
<input className="min-h-[48px]">                  // 48px ✅

// Newsletter button
<button className="min-h-[48px]">                 // 48px ✅
```

### Forms (LeadCaptureForm.tsx)
```tsx
// All inputs
<input className="min-h-[52px]">                  // 52px ✅

// Select dropdown
<select className="min-h-[52px]">                 // 52px ✅

// Textarea (multi-line)
<textarea rows={4}>                                // Auto-height ✅

// Submit button
<button className="min-h-[56px]">                 // 56px ✅

// Call alternative
<a className="min-h-[56px]">                      // 56px ✅
```

### Buttons (Button.tsx)
```tsx
// Small (min 48px)
<Button size="sm">                                 // 48×auto ✅

// Medium (min 48px)
<Button size="md">                                 // 48×auto ✅

// Large (min 52px)
<Button size="lg">                                 // 52×auto ✅
```

### Mobile CTA Bar
```tsx
// Both buttons
<a className="min-h-[52px]">                      // 52px ✅
```

### Calculators
```tsx
// Slider input
<input
  type="range"
  className="h-3 sm:h-2"                          // Larger on mobile ✅
  style={{ touchAction: 'manipulation' }}         // No zoom delay ✅
/>

// Slider thumb (CSS)
width: 28-32px mobile                             // 32px on small ✅
width: 24-28px desktop                            // 28px on large ✅
```

### Interactive Demo
```tsx
// Business type buttons
<button className="min-h-[44px] min-w-[44px]">   // 44×44px ✅

// Message input
<input className="min-h-[48px]">                  // 48px ✅

// Send button
<button className="min-h-[48px] min-w-[48px]">   // 48×48px ✅

// Example questions
<button className="min-h-[48px]">                 // 48px (full width) ✅
```

---

## FEEDBACK STATES (REQUIRED)

### Active State (Touch Feedback)
```tsx
// All interactive elements MUST include
className="active:scale-95"

// Example
<button className="px-6 py-4 active:scale-95">
  Click Me
</button>
```

### Hover State (Desktop Only)
```tsx
// Use hover: prefix (ignored on touch)
className="hover:bg-white/10 active:scale-95"

// Example
<button className="hover:shadow-glow active:scale-95">
  Hover & Tap
</button>
```

### Focus State (Keyboard Navigation)
```tsx
// Use focus-visible: for keyboard users
className="focus-visible:ring-2 focus-visible:ring-accent/80"

// Example
<button className="focus-visible:ring-2 focus-visible:ring-accent/80 active:scale-95">
  Keyboard Accessible
</button>
```

### Disabled State
```tsx
// Reduce opacity, remove interactions
className="disabled:opacity-50 disabled:cursor-not-allowed"

// Example
<button
  disabled={isLoading}
  className="disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
>
  Submit
</button>
```

---

## IOS-SPECIFIC OPTIMIZATIONS

### Remove Tap Highlight (Blue Flash)
```tsx
// Inline style (preferred for iOS)
<a
  href="tel:..."
  style={{ WebkitTapHighlightColor: 'transparent' }}
>
```

### Remove 300ms Tap Delay
```tsx
// Inline style
<button
  style={{ touchAction: 'manipulation' }}
>
```

### Safe Area Insets (Notch/Island)
```tsx
// Bottom padding for home indicator
<div
  style={{
    paddingBottom: 'env(safe-area-inset-bottom, 12px)'
  }}
>
```

### Disable Text Selection
```css
/* For buttons/interactive elements */
user-select: none;
-webkit-user-select: none;
```

---

## UTILITY CLASSES (globals.css)

### Available Touch Classes
```css
/* Minimum touch target */
.touch-target {
  min-height: 44px;
  min-width: 44px;
}

/* Remove delays and highlight */
.touch-manipulation {
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
}

/* Active feedback */
.tap-feedback {
  @apply transition-all duration-150 active:scale-95 active:brightness-90;
}

/* Ripple effect (Material Design) */
.ripple-effect {
  position: relative;
  overflow: hidden;
}
/* Animated on tap */
```

### Usage Example
```tsx
<button className="touch-target touch-manipulation tap-feedback">
  Fully Optimized Button
</button>
```

---

## SPACING GUIDELINES

### Between Interactive Elements
```
Minimum gap: 8px
Recommended: 12-16px
Premium: 16-24px
```

### Form Field Spacing
```tsx
// Mobile (increased spacing to prevent mis-taps)
<form className="space-y-5 sm:space-y-6">
  {/* space-y-5 = 20px on mobile */}
  {/* space-y-6 = 24px on desktop */}
</form>
```

### Button Groups
```tsx
// Horizontal spacing
<div className="flex gap-3">           // 12px gap
  <button>Button 1</button>
  <button>Button 2</button>
</div>

// Vertical spacing
<div className="flex flex-col gap-3">  // 12px gap
  <button>Button 1</button>
  <button>Button 2</button>
</div>
```

---

## COMMON PATTERNS

### Call-to-Action Button (Primary)
```tsx
<button
  className="min-h-[52px] px-6 py-4 rounded-xl
             bg-gradient-to-r from-accent to-primary
             text-white font-bold
             active:scale-95
             hover:shadow-glow
             focus-visible:ring-2 focus-visible:ring-accent/80"
  style={{
    touchAction: 'manipulation',
    WebkitTapHighlightColor: 'transparent'
  }}
>
  Book Demo
</button>
```

### Phone Link (Click-to-Call)
```tsx
<a
  href="tel:8653463339"
  className="min-h-[48px] px-6 py-3 flex items-center gap-2
             bg-white/5 border border-white/10 rounded-xl
             active:scale-95
             hover:bg-white/10"
  style={{
    touchAction: 'manipulation',
    WebkitTapHighlightColor: 'transparent'
  }}
>
  <span className="material-icons">phone</span>
  (865) 346-3339
</a>
```

### Form Input (Text/Email/Phone)
```tsx
<input
  type="email"
  className="w-full min-h-[52px] px-5 py-4 text-base
             bg-white/[0.03] backdrop-blur-xl
             border-2 border-white/10 rounded-xl
             text-white placeholder-white/40
             focus:outline-none focus:border-accent
             focus:ring-4 focus:ring-accent/20"
  style={{ touchAction: 'manipulation' }}
  autoComplete="email"
/>
```

### Slider (Range Input)
```tsx
<input
  type="range"
  min={0}
  max={100}
  className="w-full h-3 sm:h-2 rounded-lg
             appearance-none cursor-pointer"
  style={{ touchAction: 'manipulation' }}
  aria-label="Value slider"
/>

<style jsx>{`
  input[type="range"]::-webkit-slider-thumb {
    width: 32px;  /* Mobile */
    height: 32px;
    border-radius: 50%;
    background: linear-gradient(135deg, #00c9ff, #4a69e2);
    cursor: pointer;
  }

  @media (min-width: 640px) {
    input[type="range"]::-webkit-slider-thumb {
      width: 28px;  /* Desktop */
      height: 28px;
    }
  }
`}</style>
```

---

## ACCESSIBILITY CHECKLIST

### ARIA Attributes (Required)
```tsx
// Buttons
<button
  aria-label="Close menu"              // Describe action
  aria-expanded={isOpen}                // State (for menus)
  aria-controls="menu-id"               // What it controls
  aria-pressed={isActive}               // Toggle state
>

// Inputs
<input
  aria-label="Email address"           // Label
  aria-required="true"                  // Required field
  aria-invalid={hasError}               // Error state
  aria-describedby="error-message"     // Error message link
/>

// Sliders
<input
  type="range"
  aria-label="Choose value"
  aria-valuemin={0}
  aria-valuemax={100}
  aria-valuenow={currentValue}
  aria-valuetext={`${currentValue} dollars`}
/>
```

### Keyboard Navigation
```tsx
// All interactive elements must be focusable
tabIndex={0}                            // Focusable
tabIndex={-1}                           // Programmatically focusable

// Handle Enter and Space for buttons
onKeyDown={(e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    handleClick();
  }
}}
```

---

## TESTING CHECKLIST

### Visual Testing (Every Component)
- [ ] Buttons are at least 48×48px
- [ ] Adequate spacing between interactive elements (8px+)
- [ ] Text is readable (14px+ font size)
- [ ] Contrast ratio meets WCAG AA (4.5:1)

### Interaction Testing (Every Component)
- [ ] Active state feedback (scale-95 or similar)
- [ ] No iOS blue tap highlight
- [ ] No 300ms tap delay
- [ ] Focus states visible (keyboard)
- [ ] Disabled states clear

### Device Testing (Critical Pages)
- [ ] iPhone SE (375px) - smallest iOS
- [ ] iPhone 14 Pro - notch/island
- [ ] Samsung Galaxy S21 - Android
- [ ] iPad Mini - tablet mode

### Scenario Testing
- [ ] Tap all buttons in sequence (no mis-taps)
- [ ] Complete form on mobile
- [ ] Use sliders with thumb
- [ ] Navigate with keyboard
- [ ] Test with screen reader (VoiceOver/TalkBack)

---

## COMMON MISTAKES TO AVOID

### ❌ DON'T
```tsx
// Too small (relies on padding only)
<button className="px-3 py-2">Click</button>

// No touch feedback
<button className="px-6 py-4">Click</button>

// Missing iOS optimization
<a href="tel:...">Call</a>

// No ARIA label for icon-only
<button>
  <span className="material-icons">close</span>
</button>

// Hover-only feedback (doesn't work on touch)
<button className="hover:bg-blue-500">
  Click
</button>
```

### ✅ DO
```tsx
// Explicit minimum height
<button className="min-h-[48px] px-6 py-4 active:scale-95">
  Click
</button>

// Active feedback for touch
<button className="min-h-[48px] active:scale-95 hover:bg-blue-500">
  Click
</button>

// iOS optimized
<a
  href="tel:..."
  style={{
    touchAction: 'manipulation',
    WebkitTapHighlightColor: 'transparent'
  }}
  className="active:scale-95"
>
  Call
</a>

// ARIA label for accessibility
<button aria-label="Close dialog">
  <span className="material-icons">close</span>
</button>

// Both hover AND active
<button className="min-h-[48px] hover:bg-blue-500 active:scale-95">
  Click
</button>
```

---

## VIEWPORT BREAKPOINTS

### Capture Client Standard
```css
/* Mobile-first (default) */
/* 0-639px */

sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large desktops */
```

### Mobile-First Class Example
```tsx
// Mobile: 52px, Desktop: 48px
<button className="min-h-[52px] lg:min-h-[48px]">
  Mobile-First Button
</button>

// Mobile: space-y-5 (20px), Desktop: space-y-6 (24px)
<div className="space-y-5 sm:space-y-6">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

---

## PERFORMANCE TIPS

### Optimize Touch Events
```tsx
// Use passive listeners for scroll
useEffect(() => {
  const handleScroll = () => { /* ... */ };
  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

### Debounce/Throttle Expensive Operations
```tsx
// Throttle slider updates (better performance)
const throttledUpdate = useCallback(
  throttle((value) => setValue(value), 100),
  []
);
```

### Avoid Layout Shifts
```tsx
// Use explicit widths/heights
<button className="min-h-[48px] min-w-[120px]">
  Submit
</button>
```

---

## QUICK DECISION FLOWCHART

```
Is it interactive?
├─ YES
│  ├─ Is it a button/link?
│  │  ├─ Make it min 48×48px
│  │  ├─ Add active:scale-95
│  │  ├─ Add iOS optimization (tap highlight, touch-action)
│  │  └─ Add ARIA if icon-only
│  │
│  ├─ Is it a form input?
│  │  ├─ Make it min 52px height
│  │  ├─ Add touch-action: manipulation
│  │  ├─ Add proper autocomplete
│  │  └─ Add ARIA labels
│  │
│  └─ Is it a slider?
│     ├─ Make thumb 28-32px on mobile
│     ├─ Add touch-action: manipulation
│     └─ Add ARIA value attributes
│
└─ NO
   └─ No touch optimization needed
```

---

## RESOURCES

### Documentation
- [Full Mobile UX Audit](./MOBILE_INTERACTIVE_UX_AUDIT_REPORT.md)
- [Implementation Summary](./MOBILE_UX_ENHANCEMENTS_SUMMARY.md)
- [Component Examples](./capture-client-site/src/components/)

### External References
- [Apple HIG - Touch](https://developer.apple.com/design/human-interface-guidelines/inputs/touchscreen-gestures)
- [Google Material - Touch](https://material.io/design/usability/accessibility.html)
- [WCAG 2.1 - Target Size](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html)

### Testing Tools
- Chrome DevTools (Device Mode)
- Safari Web Inspector (iOS Simulator)
- Playwright (Automated Testing)
- Lighthouse (Accessibility Audit)

---

**Last Updated:** December 2, 2025
**Maintained By:** Capture Client Development Team
**Version:** 1.0

---

## PRINT THIS PAGE

**Tape to your monitor or keep handy for quick reference during development.**

All interactive elements should meet these standards before code review!
