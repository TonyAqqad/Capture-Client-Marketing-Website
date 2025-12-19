# Mobile Sections Quick Reference

**Apple-Level Quality Standards Applied**

---

## Typography Scale

### Headings
```
Mobile:   text-4xl (2.25rem / 36px)
Tablet:   text-5xl (3rem / 48px)
Desktop:  text-6xl → text-7xl (4rem → 4.5rem)
```

### Body Text
```
Mobile:   text-base to text-lg (16-18px)
Tablet:   text-lg to text-xl (18-20px)
Desktop:  text-xl to text-2xl (20-24px)
```

### Line Heights
```
Headings:     leading-[1.1] (tight, Apple style)
Body:         leading-[1.6] to leading-[1.7]
Small Text:   leading-[1.5]
```

### Letter Spacing
```
Labels:       tracking-[0.15em] to tracking-[0.2em]
Body:         default
Headings:     tracking-tight (negative)
```

---

## Spacing System

### Section Padding (Vertical)
```
Mobile:   py-16 (4rem / 64px)
Tablet:   py-20 (5rem / 80px)
Desktop:  py-24 (6rem / 96px)
```

### Container Padding (Horizontal)
```
Mobile:   px-6 (1.5rem / 24px)
Tablet:   px-6 (maintained)
Desktop:  px-8 (2rem / 32px)
```

### Card Padding
```
Mobile:   p-8 (2rem / 32px)
Tablet:   p-10 (2.5rem / 40px)
Desktop:  p-12 (3rem / 48px)
```

### Margin Between Sections
```
Header → Content:     mb-16 sm:mb-20 lg:mb-24
Card → Card:          gap-8 sm:gap-10
List Items:           space-y-3 to space-y-5
```

---

## Touch Targets

### Minimum Sizes
```
Buttons:         min-h-[56px] (exceeds 44px WCAG standard)
FAQ Accordion:   min-h-[72px] (generous tap area)
Icons:           w-12 h-12 to w-14 h-14
```

### Button Padding
```
Primary CTA:     px-8 py-6
Secondary:       px-6 py-5
FAQ Button:      px-6 py-6 (full width on mobile)
```

### Icon Containers
```
Services:        w-16 h-16 (mobile)
FAQ:             w-12 h-12 sm:w-14 h-14
Case Studies:    icon text-lg sm:text-xl
```

---

## Border Radius

### Cards
```
Mobile:    rounded-2xl (1rem / 16px)
Tablet:    rounded-2xl to rounded-3xl
Desktop:   rounded-3xl (1.5rem / 24px)
```

### Buttons
```
Primary:       rounded-xl to rounded-2xl
Secondary:     rounded-full (navigation)
Small:         rounded-lg
```

---

## Performance Rules

### Disabled on Mobile
```tsx
{!isMobile && (
  <motion.div animate={{ blur, scale }} />
)}
```

### Simplified Animations
```tsx
transition={{
  duration: isMobile ? 0.3 : 0.6,
  type: isMobile ? "tween" : "spring"
}}
```

### GPU Optimization
```tsx
className="will-change-transform transform-gpu"
style={{ transform: 'translateZ(0)' }}
```

---

## File-by-File Changes

### PremiumTestimonials.tsx
- Heading: text-3xl → text-4xl
- Body: text-base → text-lg, leading-[1.7]
- Padding: p-6 → p-8 sm:p-10 md:p-12
- Buttons: w-12 → w-14 with min-h-[56px]
- Disabled blur animations on mobile

### CaseStudiesPreview.tsx
- Heading: text-3xl → text-4xl
- Company: text-xl → text-2xl sm:text-3xl
- Padding: p-6 → p-8 sm:p-10
- Gap: gap-6 → gap-8 sm:gap-10
- Border: rounded-xl → rounded-2xl sm:rounded-3xl

### PremiumServices.tsx
- Heading: text-3xl → text-4xl
- Service title: text-lg → text-xl sm:text-2xl
- Description: text-sm → text-base sm:text-lg
- Icon: w-14 → w-16, text-2xl → text-3xl
- Padding: p-6 → p-8 sm:p-10

### HowItWorks.tsx
- Heading: text-3xl → text-4xl
- Step title: text-lg → text-xl
- Description: text-sm → text-base
- Padding: p-5 → p-7 sm:p-8
- Spacing: space-y-6 → space-y-10 sm:space-y-12

### PremiumFAQ.tsx
- Heading: text-3xl → text-4xl
- Question: text-sm → text-base sm:text-lg lg:text-xl
- Answer: text-sm → text-base sm:text-lg, leading-[1.7]
- Button: py-5 → py-6 sm:py-7, min-h-[72px]
- Icon: w-10 → w-12 sm:w-14

---

## Typography Utilities

### Prevent Hyphens
```tsx
style={{ hyphens: 'none' }}
```

### Prevent Wrapping
```tsx
className="whitespace-nowrap"
```

### Tight Leading
```tsx
className="leading-tight" // Use for multi-line headings
```

### Generous Leading
```tsx
className="leading-[1.6]" or "leading-[1.7]" // Body text
```

---

## Common Patterns

### Section Header
```tsx
<h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-accent mb-4 sm:mb-5">
  Eyebrow Text
</h2>
<h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground mb-6 sm:mb-8 text-depth px-4 leading-[1.1] tracking-tight" style={{ hyphens: 'none' }}>
  <span className="whitespace-nowrap">Main Heading</span>
</h3>
<p className="text-lg sm:text-xl md:text-2xl text-foreground-muted max-w-2xl mx-auto leading-[1.6] px-6">
  Description text with generous line height.
</p>
```

### Card Component
```tsx
<div className="glass p-8 sm:p-10 rounded-2xl sm:rounded-3xl border-2 border-accent/20">
  {/* Card content */}
</div>
```

### Touch-Friendly Button
```tsx
<button className="w-full px-6 py-6 min-h-[56px] touch-manipulation flex items-center gap-4">
  <span className="material-icons text-2xl">icon</span>
  <span className="text-base sm:text-lg">Button Text</span>
</button>
```

---

## Testing Checklist

### Typography
- [ ] Body text minimum 16px (text-base)
- [ ] Line height 1.6+ for readability
- [ ] No awkward hyphens on headings
- [ ] Clear visual hierarchy

### Spacing
- [ ] Cards feel substantial (32-48px padding)
- [ ] Sections have breathing room (64-96px)
- [ ] No cramped feeling anywhere
- [ ] Consistent spacing rhythm

### Touch Targets
- [ ] All buttons minimum 56px height
- [ ] Comfortable thumb reach (full width on mobile)
- [ ] Clear visual feedback on tap
- [ ] No accidental taps

### Performance
- [ ] Smooth scrolling (60fps)
- [ ] No animation jank
- [ ] Fast initial render
- [ ] No layout shifts

---

## Apple.com Inspiration

**What Makes Apple's Mobile Design Stand Out:**
1. Generous white space (80-100px section padding)
2. Large, bold typography (48-60px headings)
3. Perfect line heights (1.6-1.7 for body)
4. Comfortable touch targets (56px+)
5. Subtle animations (no heavy effects on mobile)
6. Clear visual hierarchy (spacing tells the story)

**We've Applied:**
- Increased all spacing by 25-35%
- Bumped typography by 14-20%
- Touch targets exceed Apple's standards
- Disabled GPU-intensive effects on mobile
- Created clear, breathable layouts

---

**Result:** Mobile sections that look and feel premium, not AI-generated.
