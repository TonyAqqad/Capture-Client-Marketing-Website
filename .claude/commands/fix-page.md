---
description: Fix issues on an existing page to match established patterns
model: claude-sonnet-4.5
---
Fix issues on the page at: $ARGUMENTS

## Step 1: Audit the Page

Read the page files and identify ALL issues:

### Check Against Patterns
1. Read @.claude/memory/patterns.md
2. Compare page against Gold Standard pages
3. List all deviations

### Common Issues to Look For

**Styling Issues**
- [ ] Not using `glass-premium` / `glass-card` classes
- [ ] Custom colors instead of theme classes
- [ ] Wrong button classes (should be `btn-gold` / `btn-ghost`)
- [ ] Missing `text-gradient-gold-cyan` on stats

**Layout Issues**  
- [ ] Missing `relative z-10` on content over backgrounds
- [ ] Not using `container-custom` properly
- [ ] Wrong padding pattern (should be `px-4 sm:px-6 lg:px-8`)
- [ ] Missing responsive classes (`flex-col md:flex-row`)

**Animation Issues**
- [ ] Importing from `framer-motion` instead of `@/lib/motion`
- [ ] Missing `viewport={{ once: true }}`
- [ ] Inconsistent animation patterns

**Mobile Issues**
- [ ] Buttons not full-width on mobile (`w-full sm:w-auto`)
- [ ] Text too small on mobile
- [ ] Grid not responsive (`grid md:grid-cols-2`)
- [ ] Overflow issues

**SEO Issues**
- [ ] Missing or incomplete metadata
- [ ] Missing canonical URL
- [ ] Missing OG/Twitter tags

**Component Issues**
- [ ] Using custom components when standard ones exist
- [ ] Duplicate functionality from other components

## Step 2: Present Findings

Create a summary for Max:

```markdown
## Page Audit: {page-name}

### Issues Found: {count}

**Critical (breaking)**
1. Issue description - impact

**Major (visual/UX)**  
1. Issue description - impact

**Minor (polish)**
1. Issue description - impact

### Recommended Fixes
1. Fix A - estimated changes
2. Fix B - estimated changes

**Files to modify**: list them

Shall I proceed with these fixes?
```

## Step 3: Fix Issues (After Approval)

1. Make one category of fixes at a time
2. Run `cd capture-client-site && pnpm typecheck` after each change
3. Explain each fix in simple terms
4. Test mentally at mobile (375px) and desktop (1440px)

## Step 4: Verify

After all fixes:
1. Run `cd capture-client-site && pnpm typecheck`
2. Run `cd capture-client-site && pnpm audit` if major changes
3. List all changes made
4. Suggest manual testing steps

## Step 5: Document

Offer to update:
- @.claude/memory/learnings.md with any new patterns discovered
- @.claude/memory/progress.md with page status change
