---
argument-hint: "[/route/path]"
description: Mobile-first frontend design and responsive optimization
---

# Mobile Frontend Command

Optimize pages for mobile-first design with responsive patterns and touch-friendly interactions.

## When to Use
- After creating new pages with `/new-page`
- When fixing mobile-specific issues
- During responsive design audits
- For iOS performance optimization

## Mobile-First Principles

### 1. Breakpoint Strategy
```
375px  → Mobile (base styles)
768px  → Tablet (md: prefix)
1440px → Desktop (lg: prefix)
```

### 2. Touch-Friendly Sizing
- Minimum tap target: 44px × 44px
- Button padding: `py-3 px-6` minimum
- Spacing between interactive elements: 8px minimum

### 3. Typography Scaling
```css
/* Mobile */
h1: text-3xl (30px)
h2: text-2xl (24px)
body: text-base (16px)

/* Desktop */
h1: text-5xl (48px)
h2: text-4xl (36px)
body: text-lg (18px)
```

### 4. Full-Width CTAs on Mobile
```tsx
<button className="w-full sm:w-auto">
  Get Started
</button>
```

## Audit Checklist

### Layout
- [ ] Stack columns on mobile: `flex-col md:flex-row`
- [ ] Full-width containers on mobile
- [ ] Appropriate padding: `px-4 sm:px-6 lg:px-8`
- [ ] No horizontal scroll at 375px

### Typography
- [ ] Text scales appropriately
- [ ] No text truncation
- [ ] Line heights readable on mobile
- [ ] Font sizes use responsive classes

### Images
- [ ] Responsive images with `sizes` attribute
- [ ] WebP format with fallbacks
- [ ] Lazy loading for below-fold images
- [ ] No oversized images on mobile

### Forms
- [ ] Full-width inputs on mobile
- [ ] Large enough touch targets
- [ ] Appropriate keyboard types (email, tel)
- [ ] Visible labels (not just placeholders)

### Performance
- [ ] Minimal JavaScript on mobile
- [ ] Optimized animations (reduce motion preference)
- [ ] iOS-specific fixes applied (see ios-performance.ts)

## iOS-Specific Considerations

Reference: `capture-client-site/src/lib/ios-performance.ts`

- Disable hover effects that cause double-tap
- Handle safe area insets
- Smooth scrolling with `-webkit-overflow-scrolling: touch`
- Prevent zoom on input focus

## Visual Testing

Use Claude Code Chrome integration:

```
1. Start dev server: npm run dev
2. Start Claude with Chrome: claude --chrome
3. Use /chrome command
4. Test at 375px width (iPhone SE)
5. Test at 768px width (iPad)
6. Test at 1440px width (Desktop)
```

## Output Format

```markdown
## Mobile Audit: [/route]

### Viewport Tests
| Width | Status | Issues |
|-------|--------|--------|
| 375px | ⚠️ | CTA button too small |
| 768px | ✅ | Pass |
| 1440px | ✅ | Pass |

### Issues Found
1. **P0**: Button tap target 32px (need 44px minimum)
   - File: `src/app/[route]/page.tsx:45`
   - Fix: Add `min-h-[44px] min-w-[44px]`

2. **P1**: Hero text truncates on small screens
   - File: `src/components/hero/X.tsx:23`
   - Fix: Use `text-2xl sm:text-4xl lg:text-5xl`

### Fixes Applied
- [x] Updated button sizing
- [x] Fixed responsive typography
- [ ] Pending: Image optimization
```

## Related
- `/frontend-design` - Desktop UI patterns
- `/audit-page` - Full page audit
- iOS performance: `capture-client-site/src/lib/ios-performance.ts`
