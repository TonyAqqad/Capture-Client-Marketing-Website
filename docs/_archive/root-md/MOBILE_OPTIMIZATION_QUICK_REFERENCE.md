# Mobile Optimization Quick Reference Guide

## Touch Target Sizes (WCAG 2.1)

```tsx
// Minimum touch target: 44x44px
// Recommended: 48x48px or larger

// BUTTONS
min-h-[48px]  // Standard buttons
min-h-[52px]  // Primary CTAs

// LINKS (clickable phone numbers, nav items)
min-h-[44px]

// CARDS (contact cards, feature cards)
min-h-[80px]  // Larger clickable cards

// FORM INPUTS
min-h-[48px]  // All text inputs, selects, textareas
```

---

## Typography Scale (Mobile-First)

```tsx
// HEADINGS
h1: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
h2: "text-2xl sm:text-3xl md:text-4xl"
h3: "text-lg sm:text-xl md:text-2xl"

// BODY TEXT
Large:   "text-base sm:text-lg"
Regular: "text-sm sm:text-base"
Small:   "text-xs sm:text-sm"

// LINE HEIGHT
Body text: style={{lineHeight: '1.7'}} or style={{lineHeight: '1.8'}}
Headings: className="leading-tight" (1.25)
```

---

## Spacing Patterns

```tsx
// HERO SECTIONS
py-16 sm:py-20 md:py-24
px-4 sm:px-6 lg:px-16

// CONTENT SECTIONS
py-12 sm:py-16 md:py-20
px-4 sm:px-6 lg:px-16

// CARD PADDING
p-4 sm:p-5 md:p-6

// ELEMENT GAPS
gap-3 sm:gap-4 lg:gap-6
space-y-4 sm:space-y-6
```

---

## Responsive Layout Patterns

```tsx
// GRID LAYOUTS
grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
grid-cols-1 md:grid-cols-2

// FLEX LAYOUTS
flex-col sm:flex-row
flex flex-col items-stretch

// ORDERING (mobile vs desktop)
order-1 lg:order-2  // Desktop: second position
order-2 lg:order-1  // Desktop: first position
```

---

## Button Patterns

### Primary Button (Full Mobile Pattern)
```tsx
<button className="
  inline-flex items-center justify-center
  min-h-[52px]
  w-full sm:w-auto
  px-6 sm:px-8
  py-3 sm:py-4
  text-sm sm:text-base
  font-bold uppercase tracking-wider
  rounded-full
  bg-primary text-black
  transition-all duration-300
  hover:scale-105
  active:scale-95
  glowing-button
">
  Button Text
</button>
```

### Secondary Button
```tsx
<button className="
  inline-flex items-center justify-center
  min-h-[52px]
  w-full sm:w-auto
  px-6 sm:px-8
  py-3 sm:py-4
  text-sm sm:text-base
  font-semibold
  rounded-full
  bg-white/10 border border-white/20 text-white
  backdrop-blur-sm
  hover:bg-white/20
  transition-all duration-300
  active:scale-95
">
  Button Text
</button>
```

---

## Card Patterns

### Basic Card (Mobile-Optimized)
```tsx
<div className="
  bg-white dark:bg-gray-900/50
  border border-gray-200 dark:border-gray-800
  rounded-lg
  p-4 sm:p-5 md:p-6
">
  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
    Card Title
  </h3>
  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed"
     style={{lineHeight: '1.7'}}>
    Card content text
  </p>
</div>
```

### Clickable Card
```tsx
<Link href="/link" className="
  block group
  bg-white dark:bg-gray-900/50
  border border-gray-200 dark:border-gray-800
  rounded-lg
  p-4 sm:p-5 md:p-6
  hover:border-primary/50
  transition-all duration-300
  active:scale-[0.98]
  min-h-[80px]
">
  {/* Card content */}
</Link>
```

---

## Form Input Patterns

### Text Input
```tsx
<div>
  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
    Your Name <span className="text-primary">*</span>
  </label>
  <input
    id="name"
    type="text"
    placeholder="John Smith"
    className="
      w-full
      min-h-[48px]
      px-4 py-3
      text-base
      bg-white/5
      border-2 border-gray-700
      rounded-lg
      text-white placeholder-gray-500
      focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
      transition-all duration-200
    "
  />
</div>
```

### Select Dropdown
```tsx
<select className="
  w-full
  min-h-[48px]
  px-4 py-3
  text-base
  bg-white
  border-2 border-gray-700
  rounded-lg
  text-black
  focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
  transition-all duration-200
">
  <option value="">Select an option</option>
</select>
```

### Textarea
```tsx
<textarea className="
  w-full
  px-4 py-3
  text-base
  bg-white/5
  border-2 border-gray-700
  rounded-lg
  text-white placeholder-gray-500
  focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
  transition-all duration-200
  resize-none
  min-h-[120px]
" />
```

---

## FAQ/Accordion Pattern

```tsx
<details className="
  border border-gray-200 dark:border-gray-800
  rounded-lg
  p-4 sm:p-5 md:p-6
  bg-white dark:bg-gray-900/50
  hover:border-primary/50
  transition-all
  group
">
  <summary className="
    font-bold
    text-base sm:text-lg
    text-gray-900 dark:text-white
    cursor-pointer
    flex items-center justify-between
    min-h-[48px]
    list-none
  ">
    <span className="pr-4 faq-question">
      Question text here?
    </span>
    <span className="material-icons text-accent text-2xl sm:text-3xl flex-shrink-0">
      expand_more
    </span>
  </summary>
  <p className="
    mt-3 sm:mt-4
    text-sm sm:text-base
    text-gray-600 dark:text-gray-400
    leading-relaxed faq-answer
  " style={{lineHeight: '1.7'}}>
    Answer text here.
  </p>
</details>
```

---

## Hero Section Pattern

```tsx
<section className="
  relative
  py-16 sm:py-20 md:py-24
  px-4 sm:px-6 lg:px-16
  bg-gradient-to-br from-background-dark via-background-dark to-primary/10
">
  <div className="container mx-auto text-center">
    <h1 className="
      text-4xl sm:text-5xl md:text-6xl lg:text-7xl
      font-bold text-white
      mb-4 sm:mb-6
      leading-tight
    ">
      Page Title
    </h1>
    <p className="
      text-lg sm:text-xl
      text-gray-300
      max-w-3xl mx-auto
      px-4
    ">
      Subtitle or description text
    </p>
  </div>
</section>
```

---

## Stats/Numbers Grid

```tsx
<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
  <div className="
    text-center
    bg-white dark:bg-gray-900/50
    border border-gray-200 dark:border-gray-800
    rounded-lg
    p-6 sm:p-8
  ">
    <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">
      500+
    </div>
    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
      Stat Description
    </p>
  </div>
  {/* Repeat for other stats */}
</div>
```

---

## Feature List with Icons

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
  <div className="
    flex items-start gap-3 sm:gap-4
    bg-white dark:bg-gray-900/50
    border border-gray-200 dark:border-gray-800
    rounded-lg
    p-4 sm:p-5
  ">
    <span className="
      material-icons
      text-primary
      text-2xl sm:text-3xl
      flex-shrink-0
    ">
      check_circle
    </span>
    <div>
      <h3 className="
        text-base sm:text-lg
        font-bold
        text-gray-900 dark:text-white
        mb-1
      ">
        Feature Title
      </h3>
      <p className="
        text-sm sm:text-base
        text-gray-600 dark:text-gray-400
        leading-relaxed
      ">
        Feature description text
      </p>
    </div>
  </div>
  {/* Repeat for other features */}
</div>
```

---

## Legal Page Content

```tsx
<section className="
  container mx-auto
  px-4 sm:px-6 lg:px-16
  py-12 sm:py-16 md:py-20
">
  <div className="max-w-4xl mx-auto prose prose-base sm:prose-lg dark:prose-invert">
    <div className="
      bg-white dark:bg-gray-900/50
      border border-gray-200 dark:border-gray-800
      rounded-xl
      p-5 sm:p-6 md:p-8 lg:p-12
      space-y-6 sm:space-y-8
    ">
      <div>
        <h2 className="
          text-2xl sm:text-3xl
          font-bold
          text-gray-900 dark:text-white
          mb-3 sm:mb-4
        ">
          Section Title
        </h2>
        <p className="
          text-sm sm:text-base
          text-gray-600 dark:text-gray-400
          leading-relaxed
        " style={{lineHeight: '1.8'}}>
          Section content text
        </p>

        <ul className="
          list-disc list-inside
          space-y-2 sm:space-y-3
          text-sm sm:text-base
          text-gray-600 dark:text-gray-400
        " style={{lineHeight: '1.8', paddingLeft: '0.5rem'}}>
          <li>List item one</li>
          <li>List item two</li>
        </ul>
      </div>
    </div>
  </div>
</section>
```

---

## Common Mobile Breakpoints

```
Mobile:  320px - 639px  (base styles, no prefix)
Tablet:  640px - 1023px (sm: prefix)
Desktop: 1024px+        (md:, lg:, xl: prefixes)

// Tailwind breakpoints
sm: 640px   @media (min-width: 640px)
md: 768px   @media (min-width: 768px)
lg: 1024px  @media (min-width: 1024px)
xl: 1280px  @media (min-width: 1280px)
2xl: 1536px @media (min-width: 1536px)
```

---

## Active/Hover States

```tsx
// Standard button hover/active
hover:scale-105
active:scale-95
transition-all duration-300

// Subtle card hover/active
hover:border-primary/50
active:scale-[0.98]
transition-all duration-300

// Link hover
hover:text-primary
hover:underline
transition-colors duration-300
```

---

## Accessibility Checklist

### Touch Targets
- [ ] All buttons min-h-[44px] or larger
- [ ] All links min-h-[44px] when clickable
- [ ] FAQ accordions min-h-[48px] on summary
- [ ] Form inputs min-h-[48px]

### Typography
- [ ] Base text 14px (text-sm) minimum on mobile
- [ ] Line-height 1.6+ for readability
- [ ] Text contrast 4.5:1 minimum

### Navigation
- [ ] Keyboard accessible (tab navigation works)
- [ ] Focus states visible
- [ ] Active states provide feedback

### Forms
- [ ] All inputs have labels
- [ ] Labels properly associated (htmlFor/id)
- [ ] Required fields marked
- [ ] Error messages clear

### Semantic HTML
- [ ] Proper heading hierarchy (h1, h2, h3)
- [ ] Lists use ul/ol/li
- [ ] Buttons use <button> not <div>
- [ ] Links use <a> not <div>

---

## Testing Viewports

```
iPhone SE:       375px × 667px
iPhone 12/13:    390px × 844px
iPhone 14 Pro:   393px × 852px
iPad Mini:       768px × 1024px
iPad Pro:        1024px × 1366px
Android (small): 360px × 640px
Android (large): 412px × 915px
```

---

## Performance Tips

1. **Use Server Components** where possible (no 'use client')
2. **Minimize inline styles** (use Tailwind classes)
3. **Avoid layout shifts** (set explicit heights where needed)
4. **Optimize images** (use next/image with proper sizing)
5. **Lazy load** components below the fold
6. **Debounce** expensive operations (search, filters)

---

## Common Mobile Issues to Avoid

### ❌ Don't Do This
```tsx
// Too small touch target
<button className="px-2 py-1">Click</button>

// Text too small
<p className="text-xs">Important text</p>

// Fixed width that breaks mobile
<div className="w-[800px]">Content</div>

// No mobile consideration
<div className="flex gap-12">
  <div>Item</div>
  <div>Item</div>
  <div>Item</div>
</div>
```

### ✅ Do This Instead
```tsx
// Proper touch target
<button className="min-h-[48px] px-6 py-3">Click</button>

// Readable text
<p className="text-sm sm:text-base">Important text</p>

// Responsive width
<div className="w-full max-w-4xl">Content</div>

// Mobile-first stacking
<div className="flex flex-col sm:flex-row gap-4 sm:gap-12">
  <div>Item</div>
  <div>Item</div>
  <div>Item</div>
</div>
```

---

**This reference guide provides copy-paste patterns for all common mobile optimization scenarios.**
