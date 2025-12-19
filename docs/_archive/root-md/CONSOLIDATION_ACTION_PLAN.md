# Component Consolidation Action Plan

Step-by-step guide to eliminate duplicates and clean up the codebase.

---

## Phase 1: Backup & Preparation (5 minutes)

### Step 1.1: Delete Backup Files

```bash
cd capture-client-site/src/components

# Remove all backup files
rm cro/ScrollProgress.tsx.backup
rm features/InteractiveAIDemo.tsx.backup
rm industries/real-estate/RealEstateHero.tsx.backup
rm navigation/MegaMenu.tsx.backup
rm sections/PremiumHero.tsx.backup

# Or delete all at once:
find . -name "*.backup" -delete
```

**Time**: 1 minute
**Impact**: Cleaner codebase, no confusion about which files are active

---

## Phase 2: Glass Card Consolidation (30 minutes)

### Step 2.1: Identify all GlassCard usages

```bash
grep -r "from.*GlassCard" src/components --include="*.tsx" --include="*.ts"
grep -r "from.*GlassCard" src/app --include="*.tsx" --include="*.ts"
```

**Expected files**: ~8-10 locations

### Step 2.2: Update imports

For each file that imports GlassCard:

**OLD:**
```tsx
import { GlassCard } from "@/components/ui/GlassCard";

<GlassCard className="...">
  {children}
</GlassCard>
```

**NEW:**
```tsx
import { PremiumGlassCard } from "@/components/ui/PremiumGlassCard";

<PremiumGlassCard variant="default" className="...">
  {children}
</PremiumGlassCard>
```

### Step 2.3: Verify and test

```bash
# Check types
pnpm typecheck

# Build
pnpm build

# Visual test - check cards look the same on desktop and mobile
pnpm dev
```

### Step 2.4: Keep GlassCard as a deprecated alias (optional)

If you want a migration period, keep GlassCard.tsx but make it re-export PremiumGlassCard:

```tsx
// ui/GlassCard.tsx - DEPRECATED
import { PremiumGlassCard } from "./PremiumGlassCard";

export const GlassCard = PremiumGlassCard;
```

Then remove in next cleanup pass.

**Time**: 20-30 minutes
**Risk**: Medium (visual changes possible if variants differ)
**Rollback**: Revert imports if visual issues appear

---

## Phase 3: ROI Calculator Consolidation (1-2 hours)

### Step 3.1: Audit all calculator usages

```bash
grep -r "ROICalculator" src/app --include="*.tsx"
grep -r "MissedCallCalculator" src/app --include="*.tsx"
grep -r "RealEstateROICalculator" src/app --include="*.tsx"
```

**Expected**:
- ROICalculator: ~2-3 usages (likely home-services page)
- MissedCallCalculator: ~1-2 usages
- RealEstateROICalculator: 1 usage (real-estate page)

### Step 3.2: Audit feature branches

Check which calculator pages use and what data they pass:

**Check these files:**
```
src/app/industries/home-services/page.tsx (uses ROICalculator)
src/app/industries/real-estate/page.tsx (uses RealEstateROICalculator)
src/app/use-cases/missed-calls/page.tsx (likely uses MissedCallCalculator)
```

### Step 3.3: Understand preset differences

EnhancedROICalculator already has presets for:
- HVAC, Plumbing, Electrical, Roofing (home services)
- Law firms, Dental, Real estate, etc.

**Action**: Verify all existing presets cover the use cases

### Step 3.4: Create migration for each old calculator

**For ROICalculator.tsx users:**

OLD:
```tsx
import { ROICalculator } from "@/components/features/ROICalculator";
<ROICalculator />
```

NEW:
```tsx
import { EnhancedROICalculator } from "@/components/features/EnhancedROICalculator";
<EnhancedROICalculator />
```

**For MissedCallCalculator.tsx users:**

OLD:
```tsx
import MissedCallCalculator from "@/components/features/MissedCallCalculator";
<MissedCallCalculator />
```

NEW:
```tsx
import { EnhancedROICalculator } from "@/components/features/EnhancedROICalculator";
<EnhancedROICalculator /> {/* Uses missed calls preset by default */}
```

**For RealEstateROICalculator.tsx users:**

OLD:
```tsx
import { RealEstateROICalculator } from "@/components/industries/real-estate/RealEstateROICalculator";
<RealEstateROICalculator />
```

NEW:
```tsx
import { EnhancedROICalculator } from "@/components/features/EnhancedROICalculator";
<EnhancedROICalculator /> {/* Real estate preset automatically selected */}
```

### Step 3.5: Test pricing alignment

**CRITICAL**: Verify all 3 calculators are using the same pricing:
- Should be: $497 (Starter) or $999 (Growth)
- Check actual values in each file

```bash
grep -n "MONTHLY_COST\|VOICE_AI" src/components/features/ROICalculator.tsx
grep -n "MONTHLY_COST\|VOICE_AI" src/components/features/EnhancedROICalculator.tsx
grep -n "MONTHLY_COST\|VOICE_AI" src/components/features/MissedCallCalculator.tsx
```

### Step 3.6: Test each calculator separately

**Before**: Screenshot calculator results at each old location
**After**: Verify EnhancedROICalculator produces same results

```bash
pnpm dev
# Visit each page using calculators
# Verify numbers match or are intentionally different
```

### Step 3.7: Delete old calculator files

Only after all migrations and tests pass:

```bash
rm src/components/features/ROICalculator.tsx
rm src/components/features/MissedCallCalculator.tsx
rm src/components/industries/real-estate/RealEstateROICalculator.tsx
```

**Time**: 60-90 minutes
**Risk**: High (financial numbers must be exact)
**Rollback**: Keep deleted files in git history, revert if issues

---

## Phase 4: Testimonial Documentation (15 minutes)

### Step 4.1: Document usage patterns

**Create/update component comments:**

**In TestimonialsCarousel.tsx (line 39):**
```tsx
/**
 * Testimonials Carousel Component
 *
 * Use when: You need a rotating carousel of testimonials
 *
 * Examples:
 * - Pages with single featured testimonial
 * - Rotating client success stories
 * - Auto-rotating social proof
 *
 * Do NOT use if: You need a grid layout with featured card
 * Use PremiumTestimonials instead for grid layouts
 */
export default function TestimonialsCarousel() {
```

**In PremiumTestimonials.tsx (line 61):**
```tsx
/**
 * Premium Testimonials Grid Component
 *
 * Use when: You need a grid layout with featured testimonial
 *
 * Examples:
 * - Industry pages (legal, real estate, HVAC, etc.)
 * - Sections with multiple testimonials and one featured
 * - Pages needing platform capabilities callout
 *
 * Do NOT use if: You need a carousel/rotation effect
 * Use TestimonialsCarousel instead for rotating testimonials
 */
export function PremiumTestimonials() {
```

### Step 4.2: No changes needed

Both components serve different purposes. Leave them as-is but documented.

**Time**: 15 minutes
**Risk**: None (documentation only)

---

## Phase 5: Hero Component Review (20 minutes)

### Step 5.1: Document usage patterns

**In PremiumHero.tsx (line 8):**
```tsx
/**
 * Premium Homepage Hero Component
 *
 * ⚠️ HOMEPAGE ONLY - Do not use on other pages
 *
 * This hero is highly optimized for the homepage including:
 * - Aurora animated backgrounds
 * - Live stats ticker (hydration-safe)
 * - Money counter animation
 * - AI demo visual (desktop only)
 * - Mobile-specific optimizations
 *
 * For other pages: Use ServiceHero instead
 */
export function PremiumHero() {
```

**In ServiceHero.tsx (line 97):**
```tsx
/**
 * Service Page Hero Component
 *
 * Use when: Creating service pages, feature pages, industry pages
 *
 * Features:
 * - Configurable service themes with color variants
 * - Floating animated icons
 * - Responsive stat grid
 * - Industry preset support
 *
 * Do NOT use on: Homepage (use PremiumHero instead)
 */
export default function ServiceHero({ service, hero, stats }: ServiceHeroProps) {
```

### Step 5.2: Verify no misuse

```bash
# ServiceHero should NOT be used on homepage
grep -n "ServiceHero" src/app/page.tsx

# PremiumHero should NOT be used anywhere except homepage
grep -r "PremiumHero" src/app --include="*.tsx" | grep -v "src/app/page.tsx"
```

**Time**: 10-15 minutes
**Risk**: None (audit only)

---

## Phase 6: Button Standardization (20 minutes)

### Step 6.1: Find custom button styles

```bash
grep -r "bg-gradient-to-r.*primary\|bg-\[#" src/components --include="*.tsx" | grep -i button
grep -r "px-.*py-.*text-lg.*font-bold" src/components --include="*.tsx"
```

### Step 6.2: Replace with standard classes

Examples:
- Replace custom gold gradients → use `btn-gold` class
- Replace custom glass styles → use `btn-ghost` class

### Step 6.3: Test button consistency

```bash
pnpm dev
# Visit multiple pages
# Verify all CTA buttons look consistent
```

**Time**: 15-20 minutes
**Risk**: Low (visual consistency)

---

## Phase 7: Final Verification (30 minutes)

### Step 7.1: Full type check

```bash
pnpm typecheck
```

Should have zero errors.

### Step 7.2: Production build

```bash
pnpm build
```

Should complete successfully.

### Step 7.3: Manual testing

Test on both mobile (375px) and desktop (1440px):

**Pages to test:**
- [ ] Homepage (PremiumHero)
- [ ] `/services/ai-voice-agents` (ServiceHero)
- [ ] `/industries/home-services` (ROI calculator)
- [ ] `/industries/legal` (testimonials)
- [ ] `/industries/real-estate` (ROI calculator, testimonials)
- [ ] Any page with cards (GlassCard consolidation)

**Checklist for each:**
- [ ] No visual breaks
- [ ] No console errors
- [ ] Animations smooth
- [ ] Responsive works (mobile/tablet/desktop)
- [ ] Forms still functional
- [ ] CTAs clickable

### Step 7.4: Create git commit

```bash
git add -A
git commit -m "refactor: consolidate duplicate components

- Delete backup files (5 files)
- Merge GlassCard into PremiumGlassCard
- Make EnhancedROICalculator canonical calculator
- Document hero and testimonial usage patterns
- Standardize button styles across components

Components consolidated:
- GlassCard → PremiumGlassCard
- ROICalculator → EnhancedROICalculator
- MissedCallCalculator → EnhancedROICalculator preset
- RealEstateROICalculator → EnhancedROICalculator preset

Removed files:
- cro/ScrollProgress.tsx.backup
- features/InteractiveAIDemo.tsx.backup
- industries/real-estate/RealEstateHero.tsx.backup
- navigation/MegaMenu.tsx.backup
- sections/PremiumHero.tsx.backup
"
```

**Time**: 5 minutes

---

## Total Timeline

| Phase | Task | Time | Risk |
|-------|------|------|------|
| 1 | Delete backups | 5 min | None |
| 2 | Glass card consolidation | 30 min | Medium |
| 3 | ROI calculator consolidation | 90 min | High |
| 4 | Testimonial documentation | 15 min | None |
| 5 | Hero documentation | 20 min | None |
| 6 | Button standardization | 20 min | Low |
| 7 | Verification & testing | 30 min | None |
| **Total** | | **3.5 hours** | |

---

## Rollback Strategy

If issues occur:

1. **For Phase 1-2**: `git revert` last commit
2. **For Phase 3**: Restore old calculator files from git, revert imports
3. **For Phases 4-6**: No risk - documentation/audit only

---

## Preventing Future Duplicates

1. **Add to pre-commit hooks**: Check for new component similarity
2. **Update CLAUDE.md**: Add "Check component-finder before creating new components"
3. **Create component registry**: Document canonical version of each pattern type
4. **Design system review**: Quarterly audit of components

---

## Next Steps

After completing this plan:

1. **Run memory sync**: Update `.claude/memory/` with new patterns
2. **Update patterns.md**: Add consolidation results
3. **Schedule next audit**: 3 months for quarterly review
4. **Create component checklist**: For new feature PRs

---

Start with Phase 1 (backup deletion) as it has zero risk and takes 5 minutes.
