# UI POSITIONING BEST PRACTICES
## Capture Client Design System Guidelines

---

## ABSOLUTE POSITIONING GUIDELINES

### When to Use Absolute Positioning

✅ **Good Use Cases**:
1. **Decorative badges** outside card boundaries
2. **Background effects** that don't affect layout
3. **Overlay elements** like close buttons or status indicators
4. **Timeline connectors** in vertical/horizontal flows
5. **Floating labels** above form inputs

❌ **Avoid For**:
1. Main content that affects text flow
2. Interactive elements users need to find easily
3. Anything critical to page comprehension
4. Elements that should respond to content height changes

---

## SAFE POSITIONING PATTERNS

### Pattern 1: Centered Badge Above Card
```tsx
<div className="relative">
  {/* SAFE: Badge positioned above card, centered */}
  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
    <span className="badge">BEST VALUE</span>
  </div>

  <div className="card p-6">
    {/* Card content starts at top, no overlap */}
  </div>
</div>
```
**Why it works**: Negative top + adequate top padding prevents overlap.

### Pattern 2: Corner Badge (Decorative)
```tsx
<div className="relative p-8">
  {/* SAFE: Small badge in top-right corner */}
  <div className="absolute top-6 right-6 w-12 h-12">
    <span className="badge-number">1</span>
  </div>

  {/* Content with enough margin-top to avoid badge */}
  <div className="mt-2">
    <h3 className="text-2xl">Title</h3>
  </div>
</div>
```
**Why it works**: Badge in padding area, content has margin.

### Pattern 3: Timeline with External Badges
```tsx
<div className="relative pl-20">
  {/* Timeline line */}
  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-accent" />

  {/* Timeline items */}
  <div className="relative">
    {/* SAFE: Badge positioned OUTSIDE card content */}
    <div className="absolute left-[-3.5rem] top-6">
      <div className="badge">01</div>
    </div>

    {/* Card starts at left: 0 (inside pl-20 padding) */}
    <div className="card">Content</div>
  </div>
</div>
```
**Why it works**: Parent padding creates space, badges use negative positioning to sit in that space.

### Pattern 4: Full-Coverage Overlay
```tsx
<div className="relative">
  {/* SAFE: Full overlay for background effects */}
  <div className="absolute inset-0 bg-gradient-to-br opacity-20" />

  {/* Content with relative z-index */}
  <div className="relative z-10 p-8">
    Content here
  </div>
</div>
```
**Why it works**: `inset-0` matches parent size exactly, content has higher z-index.

---

## DANGEROUS ANTI-PATTERNS

### ❌ Anti-Pattern 1: Mixed Padding + Absolute
```tsx
{/* BAD: Double padding with absolute inside */}
<div className="ml-4 pl-16">
  <div className="absolute left-0 -translate-x-1/2">
    Badge
  </div>
  <div>Content</div>  {/* Content too close to left edge */}
</div>
```
**Problem**: `left-0` is relative to the padded container, creates overlap.

**Fix**:
```tsx
{/* GOOD: Single padding, explicit negative position */}
<div className="pl-20">
  <div className="absolute left-[-3rem]">
    Badge
  </div>
  <div>Content</div>
</div>
```

### ❌ Anti-Pattern 2: Absolute Over Text Without Z-Index
```tsx
{/* BAD: Badge might cover text */}
<div className="relative">
  <div className="absolute top-4 left-4">
    Badge
  </div>
  <h3 className="text-2xl">
    Long Title That Might Wrap
  </h3>
</div>
```
**Problem**: If title wraps, it might go under the badge.

**Fix**:
```tsx
{/* GOOD: Content has margin to avoid badge */}
<div className="relative">
  <div className="absolute top-4 left-4">
    Badge
  </div>
  <h3 className="text-2xl mt-16">
    Long Title With Top Margin
  </h3>
</div>
```

### ❌ Anti-Pattern 3: Percentage Positioning on Variable Content
```tsx
{/* BAD: Badge might shift unexpectedly */}
<div className="relative">
  <div className="absolute top-[20%] right-4">
    Badge
  </div>
  <div>
    {/* Dynamic content of varying height */}
  </div>
</div>
```
**Problem**: 20% of a short container vs tall container = inconsistent badge position.

**Fix**:
```tsx
{/* GOOD: Fixed pixel position */}
<div className="relative">
  <div className="absolute top-4 right-4">
    Badge
  </div>
  <div>
    {/* Content */}
  </div>
</div>
```

---

## RESPONSIVE POSITIONING

### Mobile-First Approach
```tsx
{/* Start mobile, scale up */}
<div className="relative pl-16 sm:pl-20 lg:pl-24">
  <div className="absolute left-[-2.5rem] sm:left-[-3rem] lg:left-[-3.5rem]">
    Badge
  </div>
</div>
```

### Breakpoint Guidelines:
- **Mobile (< 640px)**: Minimum spacing, larger touch targets
- **Tablet (640-1024px)**: Moderate spacing
- **Desktop (>= 1024px)**: Maximum spacing, decorative elements

### Example:
```tsx
<div className="
  pl-12 sm:pl-16 lg:pl-20    // Increasing left padding
  gap-4 sm:gap-6 lg:gap-8    // Increasing gaps
">
  <div className="
    absolute
    left-[-2rem] sm:left-[-2.5rem] lg:left-[-3rem]  // Proportional badge position
    w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14      // Scaling badge size
  ">
    Badge
  </div>
</div>
```

---

## Z-INDEX SYSTEM

### Standard Z-Index Stack:
```css
z-50   /* Modals, dialogs, critical overlays */
z-40   /* Popovers, tooltips */
z-30   /* Floating badges, decorative elements */
z-20   /* Hover effects, subtle overlays */
z-10   /* Card content, main UI elements */
z-0    /* Background layers, timelines */
z-[-1] /* Behind everything */
```

### Context-Specific Stacks:
```tsx
{/* Card with multiple layers */}
<div className="relative z-0">
  {/* Background gradient */}
  <div className="absolute inset-0 z-0">...</div>

  {/* Content */}
  <div className="relative z-10">...</div>

  {/* Badge on top */}
  <div className="absolute top-4 right-4 z-20">...</div>

  {/* Hover overlay */}
  <div className="absolute inset-0 z-15 opacity-0 hover:opacity-100">...</div>
</div>
```

---

## SPACING CALCULATIONS

### Tailwind Spacing Scale:
```
px = 1px
0.5 = 2px   (0.125rem)
1 = 4px     (0.25rem)
2 = 8px     (0.5rem)
3 = 12px    (0.75rem)
4 = 16px    (1rem)
5 = 20px    (1.25rem)
6 = 24px    (1.5rem)
8 = 32px    (2rem)
10 = 40px   (2.5rem)
12 = 48px   (3rem)
16 = 64px   (4rem)
20 = 80px   (5rem)
24 = 96px   (6rem)
```

### Negative Positioning Math:
```tsx
{/* If parent has pl-20 (80px) and badge is 48px wide */}
<div className="pl-20">
  {/* To center badge at left edge: */}
  {/* Badge left = 0 - (badge_width / 2) = 0 - 24px = -24px = -6 */}
  <div className="absolute left-[-6]">...</div>

  {/* To align badge left edge with padding edge: */}
  {/* Badge left = 0 - padding = 0 - 80px = -80px = -20 */}
  <div className="absolute left-[-20]">...</div>

  {/* To position badge 24px from left (centered in 80px padding): */}
  {/* Badge center needs to be at 40px (half of 80px) */}
  {/* Badge left = 40px - 24px = 16px */}
  {/* But badge is inside padding, so: */}
  {/* Badge left from card edge = 16px - 80px = -64px = -16 */}
  <div className="absolute left-[-16]">...</div>
</div>
```

---

## TOUCH TARGET OPTIMIZATION

### Minimum Sizes:
```tsx
{/* WCAG AA: 44x44px minimum */}
<button className="min-w-[44px] min-h-[44px]">

{/* WCAG AAA: 56x56px minimum (use for mobile) */}
<button className="min-w-[56px] min-h-[56px] sm:min-w-[44px] sm:min-h-[44px]">

{/* Capture Client standard: 48x48px mobile, 40x40px desktop */}
<button className="w-12 h-12 sm:w-10 sm:h-10">
```

### Tap Area Expansion:
```tsx
{/* Visual element smaller than tap target */}
<button className="relative w-8 h-8 p-0">
  <span className="sr-only">Close</span>
  <XIcon className="w-4 h-4" />

  {/* Expand tap area invisibly */}
  <span className="absolute inset-[-8px]" />
</button>
```

---

## ANIMATION CONSIDERATIONS

### Safe Transforms:
```tsx
{/* SAFE: Transform doesn't affect layout */}
<motion.div
  className="absolute top-4 right-4"
  whileHover={{ scale: 1.1, rotate: 5 }}
>
  Badge
</motion.div>
```

### Unsafe Layout Changes:
```tsx
{/* UNSAFE: Width change causes reflow */}
<motion.div
  className="absolute top-4 right-4"
  whileHover={{ width: 200 }}  // DON'T DO THIS
>
  Badge
</motion.div>
```

### Preferred Animation Properties:
1. `transform` (translate, rotate, scale)
2. `opacity`
3. `filter` (blur, brightness)

**Avoid animating**:
- `width`, `height`
- `padding`, `margin`
- `top`, `left` (use transform instead)

---

## ACCESSIBILITY

### Screen Reader Considerations:
```tsx
{/* Decorative badge - hide from screen readers */}
<div className="absolute top-4 right-4" aria-hidden="true">
  <span className="badge">01</span>
</div>

{/* Functional badge - include for screen readers */}
<div className="absolute top-4 right-4">
  <span className="sr-only">Step 1 of 4:</span>
  <span className="badge" aria-label="Step 1">01</span>
</div>
```

### Keyboard Navigation:
```tsx
{/* Absolutely positioned interactive elements need tab order */}
<div className="relative">
  <button className="absolute top-4 right-4" tabIndex={0}>
    Close
  </button>

  {/* Main content */}
  <div tabIndex={0}>Content</div>
</div>
```

---

## COMMON LAYOUTS

### Card with Corner Badge:
```tsx
<div className="relative p-6 sm:p-8 rounded-2xl glass-3d">
  {/* Number badge in corner */}
  <div className="absolute top-6 right-6 w-12 h-12 rounded-full glass-premium flex items-center justify-center">
    <span className="text-2xl font-black bg-gradient-to-br from-accent to-primary bg-clip-text text-transparent">
      1
    </span>
  </div>

  {/* Content with margin to avoid badge */}
  <div className="mt-2 mr-16">
    <h3 className="text-3xl font-hero mb-4">Service Title</h3>
    <p className="text-foreground-muted">Description...</p>
  </div>
</div>
```

### Timeline with Steps:
```tsx
<div className="relative pl-20 space-y-12">
  {/* Vertical timeline */}
  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent to-primary" />

  {/* Step items */}
  {steps.map((step, index) => (
    <div key={index} className="relative">
      {/* Step badge aligned with timeline */}
      <div className="absolute left-[-3.5rem] top-6 w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-glow">
        <span className="text-xl font-black text-white">{step.number}</span>
      </div>

      {/* Step card */}
      <div className="glass-3d p-6 rounded-2xl">
        <h4 className="text-2xl font-bold mb-3">{step.title}</h4>
        <p className="text-foreground-muted">{step.description}</p>
      </div>
    </div>
  ))}
</div>
```

### Floating "BEST VALUE" Badge:
```tsx
<div className="relative">
  {/* Badge floats above card */}
  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 px-6 py-2 bg-gradient-to-r from-accent to-primary text-white text-sm font-bold rounded-full shadow-glow">
    BEST VALUE
  </div>

  {/* Card with top padding */}
  <div className="pt-6 p-8 rounded-2xl glass-3d">
    <h3 className="text-3xl font-bold">Pro Plan</h3>
    {/* Content */}
  </div>
</div>
```

---

## DEBUGGING CHECKLIST

When you encounter overlap issues:

1. **Check parent padding/margin**:
   - [ ] Is there `ml-`, `pl-`, or both?
   - [ ] What's the total left spacing?

2. **Check absolute positioning**:
   - [ ] Where is `left-` value calculated from?
   - [ ] Is `-translate-x-` being used?
   - [ ] What's the element width?

3. **Calculate actual position**:
   - [ ] Parent padding + element left offset = actual position
   - [ ] Does badge fit in the available space?

4. **Check z-index stacking**:
   - [ ] Is badge on top of content?
   - [ ] Are there conflicting z-index values?

5. **Test responsive breakpoints**:
   - [ ] Does it work on mobile (375px)?
   - [ ] Does it work on tablet (768px)?
   - [ ] Does it work on desktop (1440px)?

---

## TOOLS & UTILITIES

### Browser DevTools:
1. **Highlight absolute elements**: `position: absolute` filter
2. **Show rulers**: Toggle grid overlay
3. **Inspect computed styles**: See actual pixel values

### Tailwind Debugging:
```tsx
{/* Add visible border to debug spacing */}
<div className="border-2 border-red-500">
  <div className="absolute border-2 border-blue-500">
    Badge
  </div>
</div>

{/* Use bg-red-500/20 to see overlay areas */}
<div className="absolute inset-0 bg-red-500/20">
  Debug overlay
</div>
```

---

## SUMMARY

### Golden Rules:
1. ✅ Use **single source of padding** (`pl-20`, not `ml-4 pl-16`)
2. ✅ Position badges **explicitly** (`left-[-3rem]`, not complex calc)
3. ✅ Maintain **consistent spacing ratios** across breakpoints
4. ✅ Keep **z-index values predictable** (use standard stack)
5. ✅ Ensure **touch targets >= 44px** on mobile
6. ✅ Animate only **transform and opacity**
7. ✅ Test at **375px, 768px, 1440px** widths

### Quick Reference:
- Timeline badges: Use parent `pl-20` + child `left-[-3.5rem]`
- Corner badges: Use `top-6 right-6` with enough card padding
- Floating badges: Use `-top-4` with adequate card `pt-`
- Full overlays: Use `inset-0` with `z-10` content

---

**Version**: 1.0
**Last Updated**: December 6, 2025
**Maintained by**: UI Design Agent
