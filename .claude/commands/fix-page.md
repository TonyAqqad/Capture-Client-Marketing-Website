---
description: Fix issues on an existing page to match established patterns
argument-hint: [/route/path]
model: sonnet
---
Fix issues on the page at: $ARGUMENTS

## Step 1: Audit the Page

Read the page files and identify ALL issues:

### Check Against Patterns
1. Read @.claude/memory/patterns.md
2. Compare page against Gold Standard pages
3. List all deviations

### Common Issues to Look For

**Styling Issues (LIGHT THEME)**
- [ ] Using dark glass classes (`.glass-premium`, `.glass-card`) - should use `bg-white border-slate-200`
- [ ] Using dark backgrounds (`bg-slate-900`, `#030303`) - should use `bg-white` or `bg-slate-50`
- [ ] Using dark text (`text-white`) - should use `text-slate-900` or `text-slate-600`
- [ ] Wrong button classes (`btn-gold`, `btn-ghost`) - should use blue gradient or white secondary
- [ ] Custom colors instead of theme classes

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
- [ ] Using custom components when standard ones exist (use `component-finder` agent)
- [ ] Duplicate functionality from other components
- [ ] Legacy colors present (run `/check-palette` on the file)

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
2. Run `cd capture-client-site && npm run typecheck` after each change
3. Explain each fix in simple terms
4. Test mentally at mobile (375px) and desktop (1440px)

## Step 4: Verify

After all fixes:
1. Run `cd capture-client-site && npm run typecheck`
2. Run `cd capture-client-site && npm run lint` if major changes
3. List all changes made
4. Suggest manual testing steps

## Step 4.5: Visual Verification (Chrome)

After fixes, use Claude Code’s Chrome integration (beta) to visually confirm:
1. Ensure dev server is running: `cd capture-client-site && npm run dev`
2. Start Claude Code with Chrome enabled: `claude --chrome` and run `/chrome` to verify connection
3. Open the fixed route at `http://localhost:3000{route}`
4. Verify no truncation/overlap and that the page matches light-theme patterns at **375px** and **1440px** widths

## Step 5: Document

Offer to update:
- @.claude/memory/learnings.md with any new patterns discovered
- @.claude/memory/progress.md with page status change

## Related Tools
- Use `component-finder` agent to find existing components before creating new ones
- Use `/check-palette` to scan for legacy colors
- Use `/frontend-design` skill for UI/UX guardrails
- Use `/mobile-frontend` command for mobile responsiveness
