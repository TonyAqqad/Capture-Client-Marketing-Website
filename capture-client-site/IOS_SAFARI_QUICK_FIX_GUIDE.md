# iOS Safari Quick Fix Guide

## TL;DR - Copy/Paste Solutions

### Fix 1: 100vh Viewport Height Bug

**Problem:** Content cut off by Safari address bar.

**CSS Solution:**
```css
@supports (-webkit-touch-callout: none) {
  .your-fullscreen-section {
    min-height: 100vh;
    min-height: -webkit-fill-available;
    min-height: 100dvh; /* iOS 15+ */
  }

  html {
    height: -webkit-fill-available;
  }
}
```

**React/TSX Solution:**
```tsx
<section
  className="min-h-screen"
  style={{
    minHeight: '100vh',
    minHeight: '-webkit-fill-available',
  }}
>
  {/* Your content */}
</section>
```

---

### Fix 2: Safe Area Insets (Notch & Home Indicator)

**CSS Solution:**
```css
/* Bottom fixed elements (CTA bars, nav) */
.fixed-bottom-bar {
  position: fixed;
  bottom: 0;
  padding-bottom: env(safe-area-inset-bottom, 12px);
}

/* Footer */
footer {
  padding-bottom: calc(env(safe-area-inset-bottom) + 1rem);
}

/* Top fixed elements (header) */
header.fixed {
  top: 0;
  padding-top: env(safe-area-inset-top);
}
```

**React/TSX Solution:**
```tsx
<div
  className="fixed bottom-0"
  style={{
    paddingBottom: 'env(safe-area-inset-bottom, 12px)',
  }}
>
  {/* Your CTA buttons */}
</div>
```

**Required Meta Tag (in layout.tsx):**
```tsx
export const viewport = {
  viewportFit: 'cover', // REQUIRED for safe-area-inset-*
};
```

---

### Fix 3: Remove 300ms Tap Delay

**CSS Solution (Global):**
```css
@media (max-width: 768px) {
  a, button, input, [role="button"] {
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }
}
```

**React/TSX Solution (Per Element):**
```tsx
<button
  style={{
    touchAction: 'manipulation',
    WebkitTapHighlightColor: 'transparent',
  }}
>
  Click me
</button>
```

---

### Fix 4: Smooth Momentum Scrolling

**CSS Solution:**
```css
@media (max-width: 768px) {
  body,
  .scrollable-container {
    -webkit-overflow-scrolling: touch;
  }

  /* Prevent rubber-band on body */
  body {
    overscroll-behavior-y: none;
  }
}
```

---

### Fix 5: Prevent Input Zoom

**Problem:** Safari zooms in when focusing inputs < 16px font-size.

**CSS Solution:**
```css
@supports (-webkit-touch-callout: none) {
  input[type="text"],
  input[type="email"],
  input[type="tel"],
  select,
  textarea {
    font-size: 16px !important;
  }
}
```

---

### Fix 6: Position Fixed with Keyboard

**CSS Solution:**
```css
@supports (-webkit-touch-callout: none) {
  .fixed {
    position: -webkit-sticky;
    position: fixed;
  }
}
```

---

### Fix 7: Disable Backdrop-filter on Mobile

**Problem:** `backdrop-filter: blur()` is GPU-intensive on iOS.

**CSS Solution:**
```css
@media (max-width: 768px) {
  .glass-effect,
  .backdrop-blur {
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
  }
}
```

---

## iOS Safari Detection

**Best Method (CSS):**
```css
@supports (-webkit-touch-callout: none) {
  /* iOS Safari only styles */
}
```

**JavaScript Detection (if needed):**
```javascript
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
const isIOSSafari = isIOS && isSafari;
```

---

## Common Pitfalls to Avoid

### DON'T:
```css
/* ❌ Will break on iOS */
height: 100vh; /* No fallback */

/* ❌ Content hidden behind notch */
.fixed-bottom {
  bottom: 0; /* No safe area */
}

/* ❌ GPU overload on iOS */
.card {
  backdrop-filter: blur(20px); /* On mobile */
}

/* ❌ Zoom on input focus */
input {
  font-size: 14px; /* Too small */
}
```

### DO:
```css
/* ✅ iOS-safe viewport */
min-height: 100vh;
min-height: -webkit-fill-available;

/* ✅ Respect safe areas */
padding-bottom: env(safe-area-inset-bottom, 12px);

/* ✅ Performance on mobile */
@media (max-width: 768px) {
  backdrop-filter: none;
}

/* ✅ No zoom */
input {
  font-size: 16px;
}
```

---

## Testing Checklist

On iOS Safari (iPhone 12+):

- [ ] Full-screen sections fill viewport (address bar hidden/shown)
- [ ] Bottom CTA bar above home indicator
- [ ] No content behind notch
- [ ] Buttons respond instantly (no 300ms delay)
- [ ] Smooth momentum scrolling
- [ ] No zoom on input focus
- [ ] Fixed elements stable with keyboard

---

## Utility Classes (Add to your CSS)

```css
/* iOS-safe viewport */
.ios-vh-100 {
  min-height: 100vh;
  min-height: -webkit-fill-available;
  min-height: 100dvh;
}

/* Safe area utilities */
.safe-pb {
  padding-bottom: env(safe-area-inset-bottom, 12px);
}

.safe-pt {
  padding-top: env(safe-area-inset-top);
}

.safe-pl {
  padding-left: env(safe-area-inset-left);
}

.safe-pr {
  padding-right: env(safe-area-inset-right);
}

/* Touch optimization */
.touch-optimized {
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

/* iOS momentum scroll */
.ios-scroll {
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-y: none;
}
```

---

## Resources

- [Apple: Supporting iPhone X](https://webkit.org/blog/7929/designing-websites-for-iphone-x/)
- [MDN: env()](https://developer.mozilla.org/en-US/docs/Web/CSS/env)
- [Can I Use: safe-area-inset](https://caniuse.com/css-env-function)
- [Web.dev: Mobile Touch](https://web.dev/mobile-touch-and-pointer/)

---

**Pro Tip:** Always test on real iOS devices, not just simulators. Viewport and touch behavior differs.
