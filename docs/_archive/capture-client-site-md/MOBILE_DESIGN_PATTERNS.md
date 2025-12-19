# Mobile Design Patterns - Quick Reference

## Essential Mobile UI Patterns for Capture Client Website

---

## 1. Touch Target Pattern

### Minimum Size: 48px x 48px

```tsx
// ✅ CORRECT - 48px minimum tap target
<a
  href="tel:865-346-3339"
  className="flex items-center justify-center min-h-[48px] min-w-[48px] ..."
>
  <span className="material-icons">phone</span>
</a>

// ❌ WRONG - Too small for mobile
<a href="tel:865-346-3339" className="p-2">
  <span className="material-icons">phone</span>
</a>
```

**When to use:**
- All buttons
- All links
- Social icons
- Form inputs
- Toggle switches
- Navigation items

---

## 2. Form Input Pattern

### Key Requirements:
- **Min height**: 48px
- **Font size**: 16px (prevents iOS zoom)
- **Labels**: Always visible (not just placeholder)
- **Focus state**: 2px ring + border color

```tsx
// ✅ CORRECT - Mobile-optimized form input
<div>
  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
    Email Address <span className="text-primary">*</span>
  </label>
  <input
    id="email"
    type="email"
    placeholder="john@company.com"
    className="w-full min-h-[48px] px-4 py-3 text-base bg-white/5 border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
  />
</div>

// ❌ WRONG - Will cause iOS zoom
<input
  type="email"
  placeholder="Email"
  className="px-2 py-1 text-sm"
/>
```

---

## 3. Button Pattern

### Primary Button (CTA):

```tsx
<button
  type="submit"
  disabled={isSubmitting}
  className="w-full min-h-[52px] bg-accent text-background-dark font-bold px-6 sm:px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-glow-lg hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
>
  {isSubmitting ? (
    <span className="flex items-center justify-center gap-2">
      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
      Submitting...
    </span>
  ) : (
    "Submit"
  )}
</button>
```

### Secondary Button:

```tsx
<button
  type="button"
  className="min-h-[48px] px-6 py-3 border-2 border-accent/50 text-foreground font-bold rounded-xl hover:bg-accent/10 active:scale-95 transition-all duration-300"
>
  Cancel
</button>
```

---

## 4. Tactile Feedback Pattern

### Use `active:scale-95` on all tappable elements:

```tsx
// Buttons
className="... active:scale-95"

// Links
className="... active:scale-95"

// Cards (if clickable)
className="... active:scale-95"
```

**Why:** Gives instant visual confirmation that the tap was registered.

---

## 5. Safe Area Pattern

### For Fixed Bottom Elements:

```tsx
<div
  className="fixed bottom-0 left-0 right-0 z-50"
  style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
>
  {/* Content */}
</div>
```

**When to use:**
- Mobile CTA bars
- Fixed bottom navigation
- Cookie banners
- Bottom sheets

---

## 6. Responsive Text Pattern

### Mobile-first text sizing:

```tsx
// Headings
<h1 className="text-3xl sm:text-4xl lg:text-5xl">

// Body text
<p className="text-base sm:text-lg">

// Small text
<span className="text-xs sm:text-sm">

// Form inputs - ALWAYS 16px minimum on mobile
<input className="text-base" />
```

---

## 7. Responsive Spacing Pattern

### Padding:

```tsx
// Container padding
className="px-4 sm:px-6 lg:px-8"

// Section padding
className="py-12 sm:py-16 lg:py-20"

// Component padding
className="p-4 sm:p-6 lg:p-8"
```

### Gaps:

```tsx
// Grid/flex gaps
className="gap-4 sm:gap-6 lg:gap-8"

// Stack gaps
className="space-y-4 sm:space-y-6 lg:space-y-8"
```

---

## 8. Mobile CTA Bar Pattern

### Fixed Bottom Bar (Mobile Only):

```tsx
<div
  className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-all duration-300 ${
    isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
  }`}
  style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
>
  <div className="bg-background-dark/98 backdrop-blur-xl border-t-2 border-accent/20 shadow-2xl">
    <div className="px-4 py-3 flex items-center gap-3">
      <a
        href="tel:865-346-3339"
        className="flex-1 flex items-center justify-center gap-2 min-h-[48px] bg-accent text-background-dark font-bold px-4 py-3 rounded-xl active:scale-95"
      >
        <span className="material-icons text-xl">phone</span>
        <span className="text-sm font-bold uppercase tracking-wide">Call Now</span>
      </a>

      <a
        href="#contact"
        className="flex-1 flex items-center justify-center gap-2 min-h-[48px] bg-primary text-white font-bold px-4 py-3 rounded-xl active:scale-95"
      >
        <span className="material-icons text-xl">rocket_launch</span>
        <span className="text-sm font-bold uppercase tracking-wide">Get Demo</span>
      </a>
    </div>
  </div>
</div>
```

---

## 9. Loading State Pattern

### Spinner SVG:

```tsx
<svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
  <circle
    className="opacity-25"
    cx="12"
    cy="12"
    r="10"
    stroke="currentColor"
    strokeWidth="4"
    fill="none"
  />
  <path
    className="opacity-75"
    fill="currentColor"
    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  />
</svg>
```

### Button with Loading:

```tsx
<button disabled={isSubmitting}>
  {isSubmitting ? (
    <span className="flex items-center justify-center gap-2">
      {/* Spinner SVG here */}
      Loading...
    </span>
  ) : (
    "Submit"
  )}
</button>
```

---

## 10. Focus State Pattern

### Clear, Accessible Focus Rings:

```tsx
// Form inputs
className="focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"

// Buttons
className="focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background-dark"

// Links
className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
```

---

## Common Mistakes to Avoid

### ❌ Don't:
1. Use placeholder-only form fields (no labels)
2. Make tap targets smaller than 48px
3. Use font sizes smaller than 16px on inputs
4. Forget tactile feedback (`active:scale-95`)
5. Ignore safe areas on fixed bottom elements
6. Use hover-only states on mobile
7. Make buttons full-width on desktop
8. Forget loading states on async actions

### ✅ Do:
1. Always show labels on form fields
2. Make all tap targets 48px minimum
3. Use 16px+ font on all inputs
4. Add tactile feedback to all tappable elements
5. Support safe areas with `env(safe-area-inset-bottom)`
6. Use `active:` states for mobile
7. Use responsive widths (`w-full sm:w-auto`)
8. Show loading spinners during async operations

---

## Tailwind CSS Utilities Quick Reference

### Sizing:
- `min-h-[48px]` - Minimum 48px height
- `min-w-[48px]` - Minimum 48px width
- `w-full` - Full width
- `w-full sm:w-auto` - Full on mobile, auto on desktop

### Typography:
- `text-base` - 16px (mobile-safe)
- `text-sm sm:text-base` - Responsive text
- `font-bold` - Bold weight

### Spacing:
- `px-4 sm:px-6` - Responsive horizontal padding
- `py-3 sm:py-4` - Responsive vertical padding
- `gap-3 sm:gap-4` - Responsive gap

### Interactive:
- `hover:scale-105` - Desktop hover scale
- `active:scale-95` - Mobile tap feedback
- `transition-all duration-300` - Smooth transitions
- `disabled:opacity-50` - Disabled state
- `disabled:cursor-not-allowed` - Disabled cursor

### Focus:
- `focus:outline-none` - Remove default outline
- `focus:ring-2` - 2px focus ring
- `focus:ring-primary` - Primary color ring
- `focus:ring-primary/20` - 20% opacity ring
- `focus:border-primary` - Border color on focus

---

## Testing Commands

### Test on Real Devices:
```bash
# Start dev server
npm run dev

# Find your local IP
ipconfig  # Windows
ifconfig  # Mac/Linux

# Access from phone
http://192.168.x.x:3000
```

### Responsive Testing in Browser:
```
Chrome DevTools → Toggle Device Toolbar (Cmd+Shift+M)
Test devices:
- iPhone SE (375px)
- iPhone 14 Pro (393px)
- Pixel 7 (412px)
- iPad Mini (768px)
```

---

## Color Reference

```tsx
// Primary colors
bg-primary      // #4A69E2 (indigo)
bg-accent       // #00C9FF (cyan)
bg-background-dark  // #0F172A (dark navy)

// Text colors
text-foreground      // White/light
text-foreground-muted  // Gray

// Borders
border-surface-border  // Gray border
border-accent/20       // 20% opacity accent
```

---

## Remember:

1. **Mobile first**: Start with mobile, enhance for desktop
2. **Touch targets**: 48px minimum always
3. **Text size**: 16px on inputs (iOS zoom prevention)
4. **Labels**: Always visible, not just placeholders
5. **Feedback**: Visual confirmation on tap (`active:scale-95`)
6. **Safe areas**: Support iPhone notches
7. **Loading states**: Show during async operations
8. **Focus states**: Clear and accessible

---

**When in doubt, test on a real device!**
