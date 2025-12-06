# Mobile Design Quick Reference - Services Pages

## Quick Copy-Paste Patterns

### Container
```jsx
className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16"
```

### Section Wrapper
```jsx
className="py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-16"
```

### Responsive Grid
```jsx
// 1 → 2 → 3 columns
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"

// 1 → 2 columns
className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"

// 1 → 3 columns (stats)
className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6"
```

### Typography Scales

#### Hero Headline
```jsx
className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
```

#### Section Heading
```jsx
className="text-3xl sm:text-4xl"
```

#### Subsection Heading
```jsx
className="text-2xl sm:text-3xl md:text-4xl"
```

#### Card Title
```jsx
className="text-lg sm:text-xl"
```

#### Body Text
```jsx
className="text-base sm:text-lg"
```

#### Small Body Text
```jsx
className="text-base" // Never go below 16px
```

### Icon Containers

#### Large Icon (Hero)
```jsx
className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center"
```

#### Medium Icon (Features)
```jsx
className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center"
```

#### Icon Inside
```jsx
className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10"
```

### CTA Buttons

#### Primary CTA (Full-width mobile)
```jsx
className="w-full sm:w-auto px-6 sm:px-8 py-4 min-h-[48px] flex items-center justify-center"
```

#### CTA Container
```jsx
className="flex flex-col sm:flex-row gap-3 sm:gap-4"
```

#### Pill Button (Related Services)
```jsx
className="px-5 sm:px-6 py-3 min-h-[44px] flex items-center justify-center"
```

### Cards

#### Card Container
```jsx
className="border rounded-lg p-5 sm:p-6 bg-white dark:bg-gray-900/50"
```

#### Card with Equal Height
```jsx
<div className="h-full flex flex-col">
  <div className="flex-1">
    {/* Main content */}
  </div>
  <div className="mt-auto">
    {/* CTA pinned to bottom */}
  </div>
</div>
```

### Spacing

#### Vertical Section Spacing
```jsx
className="py-12 sm:py-16"          // Section padding
className="mb-8 sm:mb-12"           // Large margin
className="mb-6 sm:mb-8"            // Medium margin
className="mb-4 sm:mb-6"            // Small margin
```

#### Horizontal Padding
```jsx
className="px-4 sm:px-6"            // Mobile to tablet
className="px-4 sm:px-6 md:px-8 lg:px-16" // Full scale
```

#### Gap Spacing
```jsx
className="gap-4 sm:gap-6 lg:gap-8" // Grid gaps
className="gap-3 sm:gap-4"          // Button groups
className="space-y-4 sm:space-y-6 lg:space-y-8" // Vertical stacking
```

### FAQ Accordion

```jsx
<details className="border rounded-lg p-4 sm:p-6 bg-white dark:bg-gray-900/50 group">
  <summary className="font-bold text-base sm:text-lg cursor-pointer min-h-[44px] flex items-center list-none">
    <span className="flex-1">{question}</span>
    <span className="material-icons text-primary ml-4 group-open:rotate-180 transition-transform">
      expand_more
    </span>
  </summary>
  <p className="mt-3 sm:mt-4 text-base leading-relaxed">{answer}</p>
</details>
```

### Process Steps

```jsx
<div className="flex gap-4 sm:gap-6 border rounded-lg p-4 sm:p-6">
  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
    {stepNumber}
  </div>
  <div className="flex-1 min-w-0">
    <h3 className="text-lg sm:text-xl font-bold mb-2">{title}</h3>
    <p className="text-base leading-relaxed">{description}</p>
  </div>
</div>
```

---

## Responsive Breakpoints Reference

```
Default (mobile): 0px - 639px
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

---

## Touch Target Sizes

```
Minimum: 44x44px (Apple HIG)
Recommended: 48x48px
Comfortable: 52x52px

Implementation:
- Use min-h-[44px] or min-h-[48px]
- Add padding to reach size
- Use flex items-center justify-center
```

---

## Common Mistakes to Avoid

❌ **Don't**: `w-[350px]` (arbitrary fixed width)
✅ **Do**: `w-full max-w-sm` (responsive width)

❌ **Don't**: `text-xs` (12px - too small on mobile)
✅ **Do**: `text-base` (16px minimum)

❌ **Don't**: `px-8` (fixed padding)
✅ **Do**: `px-4 sm:px-6 md:px-8` (responsive padding)

❌ **Don't**: `gap-8` (fixed gap)
✅ **Do**: `gap-4 sm:gap-6 lg:gap-8` (responsive gap)

❌ **Don't**: `md:grid-cols-3` (skips mobile definition)
✅ **Do**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` (explicit mobile-first)

❌ **Don't**: Buttons without min-height
✅ **Do**: `min-h-[48px]` for all clickable elements

❌ **Don't**: Icon containers without flex centering
✅ **Do**: `flex items-center justify-center` for perfect centering

---

## Mobile-First Workflow

1. **Start with mobile** (375px width)
2. **Add sm: breakpoint** (640px - small tablet)
3. **Add md: breakpoint** (768px - tablet portrait)
4. **Add lg: breakpoint** (1024px - desktop)
5. **Add xl: breakpoint** (1280px - large desktop) if needed

Example:
```jsx
// Step 1: Mobile
className="text-base px-4 py-3"

// Step 2: Add small tablet
className="text-base sm:text-lg px-4 sm:px-6 py-3"

// Step 3: Add tablet
className="text-base sm:text-lg md:text-xl px-4 sm:px-6 md:px-8 py-3"

// Step 4: Add desktop
className="text-base sm:text-lg md:text-xl lg:text-2xl px-4 sm:px-6 md:px-8 lg:px-16 py-3"
```

---

## Testing Checklist

### Mobile (375px)
- [ ] Text is 16px minimum
- [ ] All buttons are 44px+ tall
- [ ] No horizontal scroll
- [ ] Content is readable
- [ ] Images don't overflow
- [ ] Spacing feels comfortable

### Tablet (768px)
- [ ] Layout adapts (1 col → 2 col)
- [ ] Typography scales up
- [ ] Spacing increases
- [ ] Touch targets still 44px+

### Desktop (1024px+)
- [ ] Full layout (2-3 columns)
- [ ] Typography at max scale
- [ ] Hover states work
- [ ] Decorative elements appear

---

## Component Checklist

When creating a new component, ensure:

- [ ] **Padding**: Uses responsive scale (px-4 sm:px-6 md:px-8 lg:px-16)
- [ ] **Typography**: Scales from text-base upward
- [ ] **Grid**: Defined mobile-first (grid-cols-1 md:grid-cols-2)
- [ ] **Gaps**: Responsive (gap-4 sm:gap-6 lg:gap-8)
- [ ] **Touch targets**: All buttons min-h-[44px] or larger
- [ ] **Icons**: Properly centered (flex items-center justify-center)
- [ ] **CTAs**: Full-width on mobile (w-full sm:w-auto)
- [ ] **Spacing**: Responsive vertical spacing (mb-4 sm:mb-6 md:mb-8)

---

## File Locations

```
ServiceHero component:
C:\Users\eaqqa\capture-client-website-seo\capture-client-site\src\components\ServiceHero.tsx

Individual service pages:
C:\Users\eaqqa\capture-client-website-seo\capture-client-site\src\app\services\[slug]\page.tsx

Services listing page:
C:\Users\eaqqa\capture-client-website-seo\capture-client-site\src\app\services\ServicesPageClient.tsx
```

---

## Need More Patterns?

Refer to the full optimization report:
`C:\Users\eaqqa\capture-client-website-seo\capture-client-site\SERVICES_MOBILE_OPTIMIZATION_REPORT.md`
