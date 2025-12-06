# Mobile Optimization Quick Reference Guide

## Component Architect - Mobile-First Patterns

---

## Critical Mobile Rules

### 1. Touch Targets (Non-Negotiable)
```tsx
// ❌ BAD - Too small for fingers
<button className="w-8 h-8 p-1">

// ✅ GOOD - Minimum 48px tap target
<button className="min-w-[48px] min-h-[48px] px-4 py-3">
```

**Rule**: All interactive elements must be **48px x 48px minimum** (iOS/Android standard)

---

### 2. Safe Area Insets (iPhone Required)
```tsx
// ❌ BAD - Overlaps iPhone home indicator
<div className="fixed bottom-0 pb-4">

// ✅ GOOD - Respects safe areas
<div className="fixed bottom-0 pb-[calc(1rem+env(safe-area-inset-bottom))]">
```

**Rule**: Use `env(safe-area-inset-bottom)` for fixed bottom elements on iOS

---

### 3. Responsive Typography
```tsx
// ❌ BAD - Same size on all screens
<h1 className="text-4xl">

// ✅ GOOD - Scales with viewport
<h1 className="text-2xl sm:text-3xl md:text-4xl">
```

**Pattern**:
- Headings: `text-xl sm:text-2xl md:text-3xl lg:text-4xl`
- Body: `text-sm sm:text-base md:text-lg`
- Small: `text-xs sm:text-sm`

---

### 4. Flexible Grids
```tsx
// ❌ BAD - Cramped on mobile
<div className="grid grid-cols-4 gap-4">

// ✅ GOOD - Stacks on mobile
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
```

**Pattern**:
- Mobile: `grid-cols-1` (single column)
- Tablet: `sm:grid-cols-2`
- Desktop: `md:grid-cols-3` or `md:grid-cols-4`

---

### 5. Overflow Prevention
```tsx
// ❌ BAD - Text can wrap/break
<span className="text-sm">Very Long Text That Might Break</span>

// ✅ GOOD - Controlled wrapping
<span className="text-xs sm:text-sm whitespace-nowrap">Very Long Text</span>
```

**Tools**:
- `whitespace-nowrap` - Prevent text wrapping
- `truncate` - Ellipsis for long text
- `flex-wrap` - Allow items to wrap
- `flex-shrink-0` - Prevent squishing

---

### 6. Modal/Popup Scrolling
```tsx
// ❌ BAD - Can overflow viewport
<div className="fixed inset-0 p-4">
  <div className="w-full max-w-2xl">

// ✅ GOOD - Scrollable on small screens
<div className="fixed inset-0 p-4 flex items-center justify-center">
  <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
```

**Pattern**: Use `max-h-[90vh] overflow-y-auto` for tall modals

---

### 7. Touch Feedback
```tsx
// ❌ BAD - No visual feedback
<button className="hover:scale-105">

// ✅ GOOD - Touch feedback
<button className="hover:scale-105 active:scale-95 transition-transform">
```

**Rule**: Add `active:scale-95` to all clickable elements for tactile feedback

---

## Common Responsive Patterns

### Responsive Spacing
```tsx
// Padding
p-4 sm:p-6 md:p-8 lg:p-12

// Gap
gap-2 sm:gap-3 md:gap-4 lg:gap-6

// Margin
space-y-4 sm:space-y-6 md:space-y-8

// Border radius
rounded-lg sm:rounded-xl md:rounded-2xl
```

### Responsive Layout
```tsx
// Stack on mobile, row on desktop
flex flex-col sm:flex-row

// Hide on mobile
hidden sm:block

// Show only on mobile
block sm:hidden

// Full width mobile, auto desktop
w-full sm:w-auto
```

### Responsive Sizing
```tsx
// Icons
text-lg sm:text-xl md:text-2xl

// Images
w-16 sm:w-20 md:w-24

// Heights
min-h-[48px] sm:min-h-[52px] md:min-h-[56px]
```

---

## Tailwind Breakpoints

| Breakpoint | Min Width | Device |
|------------|-----------|--------|
| `(default)` | 0px | Mobile first |
| `sm:` | 640px | Large phones, small tablets |
| `md:` | 768px | Tablets, small laptops |
| `lg:` | 1024px | Laptops, desktops |
| `xl:` | 1280px | Large desktops |
| `2xl:` | 1536px | Extra large screens |

**Design from mobile up**: Start with mobile styles, add breakpoints for larger screens

---

## Mobile Testing Checklist

### Device Sizes to Test
- [ ] iPhone SE (375px) - Smallest modern iPhone
- [ ] iPhone 14 Pro (393px) - Current gen
- [ ] Android small (360px) - Common Android
- [ ] iPad Mini (768px) - Tablet breakpoint
- [ ] Desktop (1920px) - Full screen

### Interaction Tests
- [ ] All buttons are easy to tap (48px minimum)
- [ ] Forms are easy to fill on mobile
- [ ] No horizontal scrolling
- [ ] No text overflow or cut-off
- [ ] Modals/popups are scrollable
- [ ] Fixed elements don't overlap content
- [ ] Touch feedback on all interactive elements

### Visual Tests
- [ ] Text is readable (16px minimum for body)
- [ ] Images are properly sized
- [ ] Spacing feels comfortable
- [ ] Grids stack properly on mobile
- [ ] No elements get squished

---

## Component-Specific Patterns

### Header/Navigation
```tsx
<header className="fixed top-0 inset-x-0 z-50">
  <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
    {/* Desktop nav */}
    <div className="hidden lg:flex items-center gap-4">

    {/* Mobile hamburger */}
    <button className="lg:hidden w-11 h-11 rounded-lg active:scale-95">
```

### Footer
```tsx
<footer className="bg-background">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
    {/* Stack on mobile, grid on desktop */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
```

### CTA Bar
```tsx
<div className="fixed bottom-0 inset-x-0 z-50 md:hidden
  pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
  <div className="px-4 py-3 flex items-center gap-3">
    <a href="tel:..." className="flex-1 min-h-[48px] rounded-xl active:scale-95">
```

### Modal/Popup
```tsx
<div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
  <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
    <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12">
      <button className="absolute top-3 right-3 sm:top-4 sm:right-4
        w-11 h-11 sm:w-10 sm:h-10 active:scale-95">
```

### Form
```tsx
<form className="space-y-4">
  <input
    className="w-full min-h-[48px] px-4 py-3 text-base rounded-lg
      focus:ring-2 focus:ring-primary"
  />
  <button
    className="w-full min-h-[52px] px-6 py-4 rounded-xl
      active:scale-95 transition-transform"
  >
```

---

## Performance Tips

### Lazy Loading
```tsx
// Only load heavy components when needed
const ExitIntentPopup = dynamic(() => import('./ExitIntentPopup'))
```

### Reduced Motion
```tsx
// Respect user preferences
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3, ease: "easeOut" }}
  // Automatically respects prefers-reduced-motion
>
```

### Image Optimization
```tsx
// Use Next.js Image with responsive sizes
<Image
  src="/image.jpg"
  width={800}
  height={600}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  className="w-full h-auto object-cover"
/>
```

---

## Common Mistakes to Avoid

### ❌ Don't
```tsx
// Hard-coded pixel widths
<div className="w-[350px]">

// Missing tap targets
<button className="w-8 h-8">

// Desktop-only thinking
<div className="grid grid-cols-4">

// No safe area handling
<div className="fixed bottom-0 pb-4">

// Same font size everywhere
<h1 className="text-4xl">
```

### ✅ Do
```tsx
// Percentage-based widths
<div className="w-full max-w-sm">

// Proper tap targets
<button className="min-w-[48px] min-h-[48px]">

// Mobile-first grids
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">

// Safe area insets
<div className="fixed bottom-0 pb-[calc(1rem+env(safe-area-inset-bottom))]">

// Responsive typography
<h1 className="text-2xl sm:text-3xl md:text-4xl">
```

---

## Resources

### Official Guidelines
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Android Material Design](https://m3.material.io/)
- [WCAG 2.1 AA (Accessibility)](https://www.w3.org/WAI/WCAG21/quickref/)

### Tools
- Chrome DevTools (Device Mode)
- Responsive Design Checker
- Lighthouse Mobile Audit
- Real device testing

### Tailwind CSS
- [Responsive Design Docs](https://tailwindcss.com/docs/responsive-design)
- [Breakpoint System](https://tailwindcss.com/docs/breakpoints)

---

**Remember**: Design mobile-first, then enhance for larger screens. Most users are on mobile devices!
