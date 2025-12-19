# Component Duplicates - At A Glance

Quick reference table of all duplicates found and recommendations.

---

## Priority 1: Delete These Files (Zero Risk)

| File | Size | Action | Notes |
|------|------|--------|-------|
| `cro/ScrollProgress.tsx.backup` | Backup | DELETE | Old version, not in use |
| `features/InteractiveAIDemo.tsx.backup` | Backup | DELETE | Old version, not in use |
| `industries/real-estate/RealEstateHero.tsx.backup` | Backup | DELETE | Old version, not in use |
| `navigation/MegaMenu.tsx.backup` | Backup | DELETE | Old version, not in use |
| `sections/PremiumHero.tsx.backup` | Backup | DELETE | Old version, not in use |

**Command:**
```bash
find src/components -name "*.backup" -delete
```

**Risk**: NONE
**Time**: 5 minutes
**Status**: Ready to implement

---

## Priority 2: Consolidate Glass Cards (Medium Risk)

| Current | Type | Status | Solution |
|---------|------|--------|----------|
| `ui/GlassCard.tsx` | Component | Keep | Update imports to PremiumGlassCard |
| `ui/PremiumGlassCard.tsx` | Component | CANONICAL | Keep + enhance with former GlassCard features |
| `ui/GlowCard.tsx` | Component | Keep | Different use case (interactive glow) |

**What to do:**
1. Find all imports of `GlassCard`
2. Replace with `PremiumGlassCard`
3. Use `variant="default"` for basic usage
4. Test on mobile (375px) and desktop (1440px)

**Affected files** (~8-10):
- Various section components
- Feature showcase cards
- Testimonial cards

**Risk**: MEDIUM (visual changes if variants don't match)
**Time**: 30 minutes
**Status**: Ready after Phase 1

---

## Priority 3: Consolidate ROI Calculators (High Risk)

| Current | Type | Cost | Usage | Solution |
|---------|------|------|-------|----------|
| `features/ROICalculator.tsx` | Component | $497 | Old, generic | REPLACE with Enhanced |
| `features/EnhancedROICalculator.tsx` | Component | $999 | Modern, presets | **CANONICAL** |
| `features/MissedCallCalculator.tsx` | Component | $999 | Old, focused | REPLACE with Enhanced |
| `industries/real-estate/RealEstateROICalculator.tsx` | Component | Unknown | Industry-specific | REPLACE with Enhanced |

**What to do:**
1. Update all imports to use `EnhancedROICalculator`
2. Verify pricing ($497 vs $999) matches expectations
3. Test each page's calculator shows correct numbers
4. Delete old calculator files

**Affected files:**
- `/industries/home-services` page
- `/industries/real-estate` page
- `/use-cases/missed-calls` page (if exists)
- Other service/industry pages

**Risk**: HIGH (pricing must be exact)
**Time**: 90 minutes
**Status**: Do after glass card consolidation

---

## Priority 4: Document (No Risk)

| Component | Type | Issue | Action |
|-----------|------|-------|--------|
| `sections/PremiumHero.tsx` | Hero | Only for homepage | Add JSDoc warning |
| `ServiceHero.tsx` | Hero | For other pages | Add JSDoc clarification |
| `TestimonialsCarousel.tsx` | Testimonials | Rotating carousel | Document usage |
| `sections/PremiumTestimonials.tsx` | Testimonials | Grid with featured | Document usage |

**What to do:**
1. Add detailed JSDoc comments explaining when to use each
2. Add comments warning against misuse
3. Reference this guide in comments

**Risk**: NONE
**Time**: 35 minutes
**Status**: Can do anytime

---

## Component Consolidation Matrix

```
GLASS CARDS:
  ├─ GlassCard.tsx ───────────┐
  ├─ PremiumGlassCard.tsx ────┼──> CONSOLIDATE TO: PremiumGlassCard
  └─ GlowCard.tsx ────────────┘    (GlowCard stays separate - different purpose)

ROI CALCULATORS:
  ├─ ROICalculator.tsx ───────────────┐
  ├─ EnhancedROICalculator.tsx ───────┼──> CONSOLIDATE TO: EnhancedROICalculator
  ├─ MissedCallCalculator.tsx ────────┤
  └─ RealEstateROICalculator.tsx ─────┘

HEROES:
  ├─ PremiumHero.tsx (homepage only) ──> KEEP (different optimization needs)
  └─ ServiceHero.tsx (all other pages) ─> KEEP (data-driven, reusable)

TESTIMONIALS:
  ├─ TestimonialsCarousel.tsx ────────> KEEP (carousel use case)
  └─ PremiumTestimonials.tsx ────────> KEEP (grid use case)
```

---

## Risk & Timeline Summary

```
PHASE 1: Delete Backups
├─ Risk: NONE
├─ Time: 5 minutes
├─ Files: 5 backup files
└─ Status: GO NOW ✓

PHASE 2: Glass Cards
├─ Risk: MEDIUM
├─ Time: 30 minutes
├─ Files: 1 to consolidate, ~8 to update
└─ Status: DO AFTER PHASE 1

PHASE 3: ROI Calculators
├─ Risk: HIGH
├─ Time: 90 minutes
├─ Files: 3 to delete, 3-4 pages to update
└─ Status: DO AFTER PHASE 2 (critical testing needed)

PHASE 4: Documentation
├─ Risk: NONE
├─ Time: 35 minutes
├─ Files: 4 to document
└─ Status: DO ANYTIME (but do before Phase 3)

TOTAL TIME: 3.5 hours (across 2-3 weeks recommended)
```

---

## Before/After Code Examples

### Glass Card Example

**BEFORE:**
```tsx
import { GlassCard } from "@/components/ui/GlassCard";

<GlassCard className="p-8">
  <p>Content</p>
</GlassCard>
```

**AFTER:**
```tsx
import { PremiumGlassCard } from "@/components/ui/PremiumGlassCard";

<PremiumGlassCard variant="default" className="p-8">
  <p>Content</p>
</PremiumGlassCard>
```

### ROI Calculator Example

**BEFORE (Multiple versions):**
```tsx
import { ROICalculator } from "@/components/features/ROICalculator";
import { EnhancedROICalculator } from "@/components/features/EnhancedROICalculator";
import { RealEstateROICalculator } from "@/components/industries/real-estate/RealEstateROICalculator";
```

**AFTER (One canonical):**
```tsx
import { EnhancedROICalculator } from "@/components/features/EnhancedROICalculator";

<EnhancedROICalculator />
```

---

## Verification Checklist

After each consolidation phase:

```bash
# Type checking
pnpm typecheck

# Build
pnpm build

# Visual testing
pnpm dev
# Visit affected pages
# Check mobile (375px) and desktop (1440px)
# Verify no console errors
```

---

## Rollback Quick Links

If consolidation causes issues:

```bash
# View recent commits
git log --oneline -10

# Revert last commit
git revert HEAD

# Restore deleted files
git checkout HEAD~1 src/components/path/to/deleted/file.tsx

# Show what changed
git diff HEAD~1 HEAD
```

---

## Impact Assessment

### Glass Card Consolidation Impact
- **Pages affected**: ~8-10
- **Breaking change risk**: LOW (same visual output expected)
- **Build risk**: MEDIUM (types must match)
- **Testing needed**: Mobile + Desktop visual test

### ROI Calculator Impact
- **Pages affected**: 3-5 industry/service pages
- **Breaking change risk**: LOW (same calculation expected)
- **Build risk**: HIGH (pricing must be exact)
- **Testing needed**: Verify numbers on each page before/after

### Backup Deletion Impact
- **Pages affected**: NONE
- **Breaking change risk**: NONE
- **Build risk**: NONE
- **Testing needed**: NONE

---

## FAQ

**Q: Can I do all consolidations at once?**
A: No. Do backups (safe), then glass cards (medium risk), then calculators (high risk).

**Q: What if I break something?**
A: `git revert` to undo. All changes are reversible.

**Q: Which is more important?**
A: Backup deletion (no risk), then glass cards, then calculators.

**Q: Do I need to update documentation?**
A: Yes. Update imports, test thoroughly, document changes.

**Q: When should I do this?**
A: Backup deletion: now. Glass cards: this week. Calculators: next week with team.

---

## One-Liner Quick Start

```bash
# Phase 1: Delete backups (5 min, zero risk)
find src/components -name "*.backup" -delete && git add -A && git commit -m "chore: delete backup files"

# Then follow CONSOLIDATION_ACTION_PLAN.md for phases 2-4
```

---

**Status**: Analysis complete, ready for implementation
**Recommendation**: Start with Phase 1 (backup deletion) today
