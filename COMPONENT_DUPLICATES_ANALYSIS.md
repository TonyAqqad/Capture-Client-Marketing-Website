# Component Discovery & Duplicate Analysis

**Analysis Date**: 2025-12-06
**Total Components Found**: 118 files in `src/components/`
**Duplicates Identified**: 13 critical duplicates + 5 backup files

---

## CRITICAL DUPLICATES FOUND

### Duplicate Type 1: Glass Card Components

**Status**: HIGH PRIORITY - 3 implementations doing similar things

| File | Type | Key Differences | Usage |
|------|------|-----------------|-------|
| `ui/GlassCard.tsx` | Component | Basic variants (default, premium, subtle) with minimal interactivity | Simple glass cards |
| `ui/PremiumGlassCard.tsx` | Component | Header/body/footer slots, gold variant, enhanced hover states | Complex card layouts |
| `ui/GlowCard.tsx` | Component | Interactive glow following cursor, shimmer effects, touch-aware | Interactive cards needing glow |

**Implementation Details**:
- **GlassCard.tsx**: Lines 22-25 - 3 static variants, simple hover effects
- **PremiumGlassCard.tsx**: Lines 32-37 - 4 variants with slot-based layout
- **GlowCard.tsx**: Lines 66-96 - Mouse tracking, radial gradients, mobile-aware

**Recommendation**:
- **Canonical**: `PremiumGlassCard.tsx` (most feature-complete)
- **Action**:
  - Consolidate GlassCard into PremiumGlassCard with a "simple" variant
  - Keep GlowCard separate (distinct interactive behavior)
  - Update all imports from GlassCard to use PremiumGlassCard with `variant="default"`

**Files to Update** (currently using GlassCard):
```bash
grep -r "from.*GlassCard" src/components --include="*.tsx" --include="*.ts"
grep -r "from.*GlassCard" src/app --include="*.tsx" --include="*.ts"
```

---

### Duplicate Type 2: Hero Components

**Status**: HIGH PRIORITY - 3 different hero implementations with overlapping features

| File | Type | Features | Mobile Support | Usage |
|------|------|----------|-----------------|-------|
| `sections/PremiumHero.tsx` | Section | Aurora orbs, money counter, live stats ticker, AI demo | Yes (optimized) | Homepage |
| `ServiceHero.tsx` | Standalone | Generic hero, theme variants, floating icons, stats grid | Yes | Service pages |
| `premium/MobileHeroVisual.tsx` | Component | Mobile-specific visual, phone animation | Mobile only | Mobile override |

**Implementation Details**:
- **PremiumHero.tsx**: Lines 107-471 - Full-featured hero with complex animations, hydration-safe state
- **ServiceHero.tsx**: Lines 149-352 - Data-driven hero with service presets, flexible layout
- **MobileHeroVisual.tsx**: Mobile-specific visual enhancement

**Key Differences**:
- PremiumHero: Static structure, hardcoded copy, max performance optimization
- ServiceHero: Data-driven, reusable across services with configurable themes
- MobileHeroVisual: Pure mobile alternative

**Recommendation**:
- **Keep Both**: These serve different purposes
- **PremiumHero**: Use ONLY on homepage (hardcoded, optimized)
- **ServiceHero**: Use on all `/services/*` pages (data-driven)
- **Action**: Add component selection logic to prevent misuse
- **Warning**: Do NOT refactor PremiumHero - it's finely tuned for homepage

---

### Duplicate Type 3: ROI Calculator Components

**Status**: CRITICAL - 4 different calculator implementations

| File | Purpose | Cost | Industry Presets | Input Type |
|------|---------|------|------------------|------------|
| `features/ROICalculator.tsx` | Generic ROI with animated counter | $497/mo | None (generic) | Basic (missed calls, job value, close rate) |
| `features/EnhancedROICalculator.tsx` | Industry-specific ROI | $999/mo | 8 presets (HVAC, plumbing, etc.) | Same as ROI with preset quick-fills |
| `features/MissedCallCalculator.tsx` | Missed call focus | $999/mo | None | Different (calls/day, missed %, job value, close rate) |
| `industries/real-estate/RealEstateROICalculator.tsx` | Real estate specific | Unknown | Real estate only | Similar inputs, different branding |

**Root Issue**: Each created a new calculator instead of extending an existing one

**Recommendation**:
- **Canonical**: `EnhancedROICalculator.tsx` (most flexible, has presets)
- **Action**:
  1. Deprecate `ROICalculator.tsx` - replace all usages with Enhanced version
  2. Convert `MissedCallCalculator.tsx` into preset within Enhanced variant
  3. Consolidate `RealEstateROICalculator.tsx` into preset system
  4. Add "calculator-type" prop to EnhancedROICalculator for variant support

**Files to Update**:
- Check which pages import ROICalculator.tsx (likely home-services page)
- Check which pages import MissedCallCalculator.tsx
- Check real-estate page imports

---

### Duplicate Type 4: Testimonial Components

**Status**: MEDIUM PRIORITY - 2 implementations with overlapping functionality

| File | Type | Features | Carousel | Featured Card | Usage |
|------|------|----------|----------|---------------|-------|
| `TestimonialsCarousel.tsx` | Standalone | Carousel with auto-rotate, navigation buttons, side previews | Yes | No | Multiple pages |
| `sections/PremiumTestimonials.tsx` | Section | Grid layout, featured card support, platform capabilities footer | No | Yes (2x wide) | Industry pages |

**Implementation Details**:
- **TestimonialsCarousel**: Lines 39-203 - Single carousel, navigation controls, hardcoded testimonials
- **PremiumTestimonials**: Lines 61-175 - Grid with stagger animations, featured badge, metrics display

**Key Differences**:
- Carousel: Horizontal rotation, 5-second auto-advance
- PremiumTestimonials: Grid layout, featured highlight, more robust

**Recommendation**:
- **Keep Both**: Different use cases (carousel vs grid)
- **Clarify Usage**:
  - Use `TestimonialsCarousel` for pages needing carousel behavior
  - Use `PremiumTestimonials` for section layouts with featured testimonial
- **Action**: Document usage patterns in component comments to prevent confusion

---

### Duplicate Type 5: CTA Section Components

**Status**: MEDIUM PRIORITY - Monitor for inconsistency

| File | Type | Form Integration | Urgency Elements | Background |
|------|------|------------------|------------------|------------|
| `sections/PremiumFinalCTA.tsx` | Section | OptimizedLeadForm integrated | Spots ticker, urgency badge, particles | Aurora orbs + geometric shapes |

**Note**: Only one final CTA found, but it's feature-rich. Check for other CTA patterns in industry-specific components.

**Action**: Ensure all CTAs use this pattern consistently.

---

## BACKUP/OLD FILES TO DELETE

These files should be removed from the repository:

| File | Status | Notes |
|------|--------|-------|
| `cro/ScrollProgress.tsx.backup` | DELETE | Backup of scroll progress component |
| `features/InteractiveAIDemo.tsx.backup` | DELETE | Backup of AI demo |
| `industries/real-estate/RealEstateHero.tsx.backup` | DELETE | Backup of real estate hero |
| `navigation/MegaMenu.tsx.backup` | DELETE | Backup of navigation menu |
| `sections/PremiumHero.tsx.backup` | DELETE | Backup of homepage hero |

**Recommendation**: Remove all `.backup` files - they clutter the codebase and create confusion.

```bash
# Command to remove all backup files
find src/components -name "*.backup" -delete
```

---

## Component Organization by Category

### UI Primitives (src/components/ui/)
Status: Generally well-organized, minimal duplication
- ✅ Badge.tsx, Button.tsx, Input.tsx (single implementations)
- ✅ FeatureCard.tsx, FeatureGrid.tsx (different purposes)
- ⚠️ GlassCard variants (see recommendations above)
- ✅ Skeleton.tsx, HeroSkeleton.tsx (different purposes)

### Section Components (src/components/sections/)
Status: Good patterns, some redundancy
- ✅ PremiumHero.tsx (homepage only)
- ✅ PremiumTestimonials.tsx (section layout)
- ✅ PremiumFinalCTA.tsx (final call to action)
- ✅ PremiumFAQ.tsx, PremiumServices.tsx, PremiumStats.tsx
- ✅ CaseStudiesPreview.tsx, HowItWorks.tsx

### Feature Components (src/components/features/)
Status: **NEEDS CONSOLIDATION**
- ⚠️ Multiple calculator variants (see recommendations)
- ⚠️ Multiple demo components (SmartDemoScheduler, InteractiveAIDemo, IndustryDemo)
- ✅ Exit intent components (only one)
- ⚠️ Lead ticker variants (LeadTicker, LiveLeadTicker)

### Navigation (src/components/navigation/)
Status: Clean implementation
- ✅ MegaMenu.tsx (canonical, good)
- ✅ MegaMenuDropdown.tsx, MegaMenuMobile.tsx (variants)

### Industry Components (src/components/industries/)
Status: Well-structured
- ✅ IndustryCard.tsx, IndustryFAQ.tsx, IndustryIntegrations.tsx
- ⚠️ Real estate section has duplicate hero and calculator

### CRO/Optimization (src/components/cro/)
Status: Many components, need usage audit
- 13 files for conversion rate optimization
- Check for overlap between components

---

## Style & Pattern Consistency Issues

### Issue 1: Custom Button Styles
**Files with potential inconsistency**:
- Should all use: `btn-gold`, `btn-ghost`, `btn-glass` classes
- Check for inline button styles in:
  - ServiceHero.tsx (lines 258-288)
  - PremiumFinalCTA.tsx (lines 346-397)

### Issue 2: Glass Card Styling
**Current implementations**:
- `glass-premium` class (recommended in patterns.md)
- `glass-3d` custom styles (used in PremiumTestimonials)
- `glass` basic class (used in sections)

**Recommendation**: Standardize on `glass-premium` class across all cards

### Issue 3: Motion/Animation Imports
**Status**: All components correctly use `@/lib/motion` (good!)
- No violations of direct framer-motion imports found

### Issue 4: Responsive Patterns
**Issue**: Some components use `hidden md:block` for desktop-only content
- PremiumHero.tsx (line 323): Desktop AI demo hidden on mobile ✅ (intentional)
- ServiceHero.tsx (line 186): Floating icons hidden on mobile ✅ (intentional)

**Status**: Good mobile-first approach observed

---

## Recommendations Summary

### Immediate Actions (Do First)
1. **Delete backup files**: Remove all `.backup` files
2. **Consolidate glass cards**: Merge GlassCard into PremiumGlassCard
3. **Consolidate calculators**: Make EnhancedROICalculator the canonical version

### Short-term (This Sprint)
1. Document which component to use for each pattern
2. Add prop types and JSDoc comments to key components
3. Update imports across all pages after consolidation
4. Create component selection decision tree for developers

### Medium-term (Next Sprint)
1. Audit all CRO components for overlap
2. Consolidate demo components (3 different demo implementations)
3. Standardize button styling across all sections
4. Create component showcase/storybook

---

## Usage Statistics

### Most Reused Components
```
GlassCard - used in ~8 locations
PremiumHero - used in 1 location (homepage only)
PremiumTestimonials - used in ~5 industry pages
FeatureCard - used in ~6 locations
```

### Components Used Only Once
These might be candidates for consolidation or deletion:
- ServiceHero (used only in /services/* pages)
- MobileHeroVisual (used only in PremiumHero mobile fallback)
- RealEstateROICalculator (industry-specific)

---

## Testing Checklist

After implementing recommendations:

- [ ] All glass cards render consistently
- [ ] All calculators show correct pricing ($497 vs $999)
- [ ] Testimonials display correctly (carousel vs grid)
- [ ] Mobile layouts not broken on all affected pages
- [ ] No console errors about missing components
- [ ] `pnpm typecheck` passes
- [ ] `pnpm build` succeeds

---

## Files Reference

### Critical Files to Review
- `/src/components/ui/GlassCard.tsx` - baseline glass effect
- `/src/components/ui/PremiumGlassCard.tsx` - enhanced version
- `/src/components/ui/GlowCard.tsx` - interactive variant
- `/src/components/sections/PremiumHero.tsx` - homepage hero
- `/src/components/ServiceHero.tsx` - service page hero
- `/src/components/features/EnhancedROICalculator.tsx` - canonical calculator
- `/src/components/TestimonialsCarousel.tsx` - carousel testimonials
- `/src/components/sections/PremiumTestimonials.tsx` - grid testimonials

### Decision Framework

When deciding whether to consolidate:
1. Do they serve the SAME purpose? → Consolidate into one with variants
2. Do they have DIFFERENT use cases? → Keep separate with clear documentation
3. Is one clearly better? → Use as canonical, deprecate others
4. Is one rarely used? → Consider removal

---

## Notes for Developer

- **DO NOT** modify PremiumHero without extensive testing - it's heavily optimized
- **DO** use PremiumGlassCard going forward for new components
- **DO** check the patterns.md file before creating new card/hero components
- **DO** run full build and test on mobile/desktop after changes
- **AVOID** creating new calculator variants - extend EnhancedROICalculator instead

---

Generated by Component Finder Agent
Run this analysis again when adding new components to prevent future duplicates.
