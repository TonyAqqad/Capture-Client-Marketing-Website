---
description: Audit a page against established patterns (no changes)
model: claude-opus-4.5
---
Audit the page at: $ARGUMENTS

This is a READ-ONLY audit. Do NOT make any changes.

## Audit Checklist

### 1. File Structure ✓/✗
- [ ] Has `page.tsx` with metadata
- [ ] Client component if interactive (with `"use client"`)
- [ ] Layout.tsx if needed for JSON-LD
- [ ] Follows naming conventions

### 2. SEO Metadata ✓/✗
- [ ] Title present and under 60 chars
- [ ] Description present and 150-160 chars
- [ ] Keywords array present
- [ ] OpenGraph title, description, url, image
- [ ] Twitter card, title, description, image
- [ ] Canonical URL set
- [ ] Robots directives present

### 3. Styling Patterns ✓/✗
- [ ] Using `glass-premium` for cards
- [ ] Using `btn-gold` / `btn-ghost` for buttons
- [ ] Using theme colors (not hardcoded)
- [ ] Using `text-gradient-gold-cyan` for emphasis
- [ ] Using `container-custom` for width
- [ ] Using `px-4 sm:px-6 lg:px-8` padding

### 4. Layout & Structure ✓/✗
- [ ] Hero section follows pattern
- [ ] Content has `relative z-10` over backgrounds
- [ ] Sections use `section` class
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] Background patterns using standard classes

### 5. Responsive Design ✓/✗
- [ ] Uses `flex-col md:flex-row` patterns
- [ ] Grid responsive (`grid md:grid-cols-2 lg:grid-cols-3`)
- [ ] Buttons `w-full sm:w-auto`
- [ ] Text sizes scale (`text-lg md:text-xl`)
- [ ] Proper spacing responsive (`gap-4 md:gap-8`)

### 6. Animations ✓/✗
- [ ] Motion imported from `@/lib/motion`
- [ ] Has `viewport={{ once: true }}`
- [ ] Uses standard animation patterns
- [ ] Stagger delay on lists (`delay: index * 0.1`)

### 7. Components ✓/✗
- [ ] Icons from `lucide-react` only
- [ ] Using existing shared components
- [ ] Not duplicating existing component functionality
- [ ] Link from `next/link` for internal links

### 8. Content ✓/✗
- [ ] Phone number is 865-346-3339
- [ ] CTA links work
- [ ] No placeholder text
- [ ] Consistent brand voice

## Output Format

```markdown
# Page Audit Report: {route}

## Score: {X}/8 categories passing

### ✅ Passing
- Category: Details

### ❌ Issues Found

#### Category Name
| Issue | Current | Should Be | Severity |
|-------|---------|-----------|----------|
| ... | ... | ... | High/Med/Low |

### Recommendations
1. ...
2. ...

### Comparison to Gold Standard
Closest match: `/industries/home-services`
Differences: list them
```

## Notes
- This audit does NOT modify any files
- Use `/project:fix-page` to apply fixes
- Severity levels: High (broken), Medium (visual), Low (polish)
