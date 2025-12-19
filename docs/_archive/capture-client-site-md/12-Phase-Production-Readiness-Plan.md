 Capture Client Website - Production Readiness Plan

---
## EXECUTION STATUS

| Phase | Status | Commit | Date |
|-------|--------|--------|------|
| Phase 1: Critical SEO | ✅ COMPLETE | 5e0e989 | 2025-12-07 |
| Phase 2: Asset & CSS | ✅ COMPLETE | a24873b | 2025-12-07 |
| Phase 3: Unused Code | ✅ COMPLETE | 69196f2 | 2025-12-07 |
| Phase 4: Material Icons | ⏳ PENDING | - | - |
| Phase 5: Forms | ⏳ PENDING | - | - |
| Phase 6: GlassCard | ⏳ PENDING | - | - |
| Phase 7: Hero | ⏳ PENDING | - | - |
| Phase 8: Calculator | ⏳ PENDING | - | - |
| Phase 9: FAQ | ⏳ PENDING | - | - |
| Phase 10: CTA & Integration | ⏳ PENDING | - | - |
| Phase 11: Performance | ⏳ PENDING | - | - |
| Phase 12: Validation | ⏳ PENDING | - | - |

---

 Executive Summary

 Current State: 87% Production Ready

 | Area                   | Score  | Risk   | Status                        |
 |------------------------|--------|--------|-------------------------------|
 | Build Stability        | 95/100 | LOW    | ✅ 228 pages, 0 errors         |
 | SEO Architecture       | 100/100| LOW    | ✅ All pages have metadata    |
 | Responsive Design      | 95/100 | LOW    | ✅ Excellent mobile            |
 | Component Architecture | 65/100 | MEDIUM | ⚠️ 15 duplicate groups        |
 | Performance            | 65/100 | MEDIUM | ⚠️ Bundle optimization needed |
 | Data Integrity         | 90/100 | LOW    | ✅ Consistent                  |

 User Decisions:
 - Components: Create configurable versions (merge duplicates into single component with variant props)
 - Forms: Keep 2-step OptimizedLeadForm, deprecate LeadCaptureForm
 - Stats: "15,000+ Leads" is correct (shared stat across platforms)

 ---
 Execution Protocol

 For Every Phase:

 1. EXECUTE agents do the actual work (not preview)
 2. AUDIT agents verify completion after each task
 3. BUILD verification at phase end
 4. COMMIT to https://github.com/TonyAqqad/Capture-Client-Marketing-Website 'main' branch checkpoint if build passes
 5. Memory-sync after each checkpoint

 Agent Directive Template:

 ACTION: You must EXECUTE this change, not just describe it.
 - Use Edit tool to modify files
 - Use Write tool to create files
 - Run typecheck after changes
 - Report: files modified, lines changed, any errors

 ---
 PHASE 1: Critical SEO Fixes (Production Blockers) ✅ COMPLETE

 Estimated Time: 30 minutes
 Actual Time: ~25 minutes
 Context Scope: 2 files only

 Goal

 Fix the 2 pages missing SEO metadata that block production deployment.

 Status: ✅ COMPLETE (2025-12-07)
 - /use-cases: Server/client split complete, full metadata + 3 JSON-LD schemas added
 - /integrations-demo: noindex robots directive added
 - Build: PASSED (228 pages)
 - TypeCheck: PASSED
 - Verification: All SEO metadata complete (100% coverage)

 Tasks

 Task 1.1: Fix /use-cases metadata

 Agent: batch-fixer (sonnet)
 Directive:
 ACTION: EXECUTE these changes to add SEO metadata to the use-cases page.

 Current issue: src/app/use-cases/page.tsx has "use client" at top, cannot export Metadata.

 EXECUTE:
 1. Read src/app/use-cases/page.tsx
 2. Create new file: src/app/use-cases/UseCasesClient.tsx
    - Move ALL content from current page.tsx here
    - Keep "use client" directive
 3. Rewrite src/app/use-cases/page.tsx as server component:
    - Remove "use client"
    - Add Metadata export with title, description, OG tags, canonical
    - Add JSON-LD schema (WebPage type)
    - Import and render UseCasesClient

 Files to modify:
 - src/app/use-cases/page.tsx (rewrite)
 - src/app/use-cases/UseCasesClient.tsx (create)

 After completion, run: pnpm typecheck
 Report: exact files created/modified

 Task 1.2: Fix /integrations-demo metadata

 Agent: batch-fixer (sonnet)
 Directive:
 ACTION: EXECUTE this change to add noindex to integrations-demo.

 EXECUTE:
 1. Read src/app/integrations-demo/page.tsx (or find correct path)
 2. Add Metadata export with robots: { index: false, follow: false }
 3. This is a demo page - should not be indexed by search engines

 After completion, run: pnpm typecheck
 Report: files modified

 Task 1.3: AUDIT Phase 1

 Agent: page-auditor (opus)
 Directive:
 AUDIT: Verify Phase 1 completion.

 Check:
 1. src/app/use-cases/page.tsx - Does it export Metadata? No "use client"?
 2. src/app/use-cases/UseCasesClient.tsx - Does it exist? Has "use client"?
 3. src/app/integrations-demo/page.tsx - Has robots noindex?
 4. Run: pnpm typecheck - passes?
 5. Run: pnpm build - passes?

 Report: PASS/FAIL for each item

 Phase 1 Checkpoint

 pnpm build  # Must pass with 228+ pages
 git add -A && git commit -m "fix: Add SEO metadata to use-cases and integrations-demo"

 ---
 PHASE 2: Asset & CSS Optimization ✅ COMPLETE

 Estimated Time: 2 hours
 Actual Time: ~1.5 hours
 Context Scope: CSS files, public assets

 Status: ✅ COMPLETE (2025-12-07)
 - Logo optimization: Created logo-full.svg (2.5KB) and logo-official.svg (2.5KB)
 - Logo size savings: ~365KB (99% reduction from 368KB PNGs)
 - CSS cleanup: Deleted 4 unused CSS files (1,233 lines removed)
   - critical.css (94 lines)
   - mobile-typography-enhanced.css (702 lines)
   - touch_targets_addition.css (32 lines)
   - desktop-polish.css (405 lines)
 - CSS kept: globals.css + globals-mobile-optimized.css (serve different purposes)
 - JSON-LD logo URLs updated in 8 files (.png → .svg)
 - Build: PASSED (228 pages)
 - TypeCheck: PASSED

 Goal

 Reduce page load by ~400KB through asset optimization and CSS consolidation.

 Tasks

 Task 2.1: Convert PNG logos to SVG

 Agent: batch-fixer (sonnet)
 Directive:
 ACTION: EXECUTE logo optimization.

 Current issue: PNG logos total 368KB, SVG would be ~16KB.

 EXECUTE:
 1. Read public/logo-full.png dimensions and design
 2. Create public/logo-full.svg as vector version
    - Match exact dimensions
    - Use brand colors (gold #F5A623, dark background compatible)
 3. Read public/logo-official.png
 4. Create public/logo-official.svg as vector version
 5. Search codebase for logo imports and note which files use them
    (Do NOT update imports yet - just list files for Task 2.2)

 Note: If SVG creation requires design skills, create a placeholder SVG
 and document that manual design work is needed.

 Report: files created, size comparison

 Task 2.2: Update logo imports across codebase

 Agent: batch-fixer (sonnet)
 Directive:
 ACTION: EXECUTE logo import updates.

 EXECUTE:
 1. Search for all imports of logo-full.png and logo-official.png
 2. Update each import to use .svg version instead
 3. Verify next/image components have proper width/height

 Files likely affected:
 - src/components/navigation/Header.tsx
 - src/app/layout.tsx
 - Any component importing logos

 After completion, run: pnpm typecheck
 Report: files modified, import count changed

 Task 2.3: Consolidate CSS files

 Agent: batch-fixer (sonnet)
 Directive:
 ACTION: EXECUTE CSS consolidation.

 Current issue: 4 CSS files causing extra HTTP requests:
 - globals.css (2,916 lines)
 - mobile-typography-enhanced.css (702 lines)
 - globals-mobile-optimized.css (543 lines)
 - desktop-polish.css (405 lines)

 EXECUTE:
 1. Read all 4 CSS files
 2. Identify duplicate rules
 3. Merge into single globals.css:
    - Keep base styles
    - Use @media queries for responsive styles
    - Remove duplicate rules
 4. Delete the 3 extra CSS files
 5. Update any imports in layout.tsx or _app.tsx

 After completion, run: pnpm build
 Report: lines before/after, files deleted

 Task 2.4: AUDIT Phase 2

 Agent: page-auditor (opus)
 Directive:
 AUDIT: Verify Phase 2 completion.

 Check:
 1. public/logo-full.svg exists?
 2. public/logo-official.svg exists?
 3. No imports of .png logos remain in src/?
 4. Only globals.css remains (other CSS files deleted)?
 5. globals.css contains @media queries for mobile/desktop?
 6. pnpm build passes?

 Report: PASS/FAIL for each, estimated size savings

 Phase 2 Checkpoint

 pnpm build  # Must pass
 git add -A && git commit -m "perf: Optimize logos to SVG, consolidate CSS files"

 ---
 PHASE 3: Unused Code Cleanup

 Estimated Time: 1 hour
 Context Scope: 16 source files with unused imports

 Goal

 Remove 38 unused imports across 16 files to clean up codebase.

 Tasks

 Task 3.1: Clean unused imports (batch 1 - industry pages)

 Agent: batch-fixer (sonnet)
 Directive:
 ACTION: EXECUTE unused import removal.

 Files to clean:
 1. src/app/industries/automotive/AutomotivePageClient.tsx
    - Remove: Phone, Clock, Users, Shield, Star, ArrowRight, Mail (7 unused)
 2. src/app/industries/dental/DentalClient.tsx
    - Remove 3 unused imports
 3. src/app/industries/fitness/FitnessClient.tsx
    - Remove 4 unused imports
 4. src/app/industries/healthcare/HealthcarePageClient.tsx
    - Remove 3 unused imports
 5. src/app/industries/martial-arts/MartialArtsClient.tsx
    - Remove 1 unused import
 6. src/app/industries/med-spa/MedSpaClient.tsx
    - Remove 1 unused import

 EXECUTE: Use Edit tool to remove each unused import line.
 After completion, run: pnpm typecheck
 Report: files modified, total imports removed

 Task 3.2: Clean unused imports (batch 2 - core pages)

 Agent: batch-fixer (sonnet)
 Directive:
 ACTION: EXECUTE unused import removal.

 Files to clean:
 1. src/app/demo/DemoContent.tsx
    - Remove: Mic, Volume2, Settings, DollarSign, currentTranscriptIndex (5 unused)
 2. src/app/how-it-works/HowItWorksPageClient.tsx
    - Remove: TrendingUp, Zap, processSteps, isMobile (4 unused)
 3. src/app/case-studies/CaseStudiesPageClient.tsx
    - Remove: Button (1 unused)
 4. src/app/use-cases/page.tsx (or UseCasesClient.tsx)
    - Remove 2 unused variables
 5. src/app/who-we-serve/[slug]/page.tsx
    - Remove: Industry (1 unused)
 6. src/app/who-we-serve/page.tsx
    - Remove 2 unused imports

 EXECUTE: Use Edit tool to remove each unused import.
 After completion, run: pnpm typecheck
 Report: files modified, total imports removed

 Task 3.3: Clean unused imports (batch 3 - components)

 Agent: batch-fixer (sonnet)
 Directive:
 ACTION: EXECUTE unused import removal.

 Files to clean:
 1. src/components/cro/SecurityBadges.tsx
    - Remove: ShieldAlert, ShieldBan, LucideIcon (2-3 unused)
 2. src/components/cro/TrustSignals.tsx
    - Remove: LucideIcon (1 unused)
 3. src/components/industries/real-estate/RealEstateROICalculator.tsx
    - Remove: useTransform (1 unused)
 4. src/app/api/analytics/route.ts
    - Remove: percentOfGood (1 unused variable)

 EXECUTE: Use Edit tool to remove each unused import/variable.
 After completion, run: pnpm typecheck
 Report: files modified, total removed

 Task 3.4: AUDIT Phase 3

 Agent: code-searcher (sonnet)
 Directive:
 AUDIT: Verify Phase 3 completion.

 Run: pnpm lint --quiet (should show 0 unused import warnings in src/)

 Check each file from Tasks 3.1-3.3:
 - No ESLint warnings about unused imports?
 - Files still compile?

 Report: remaining lint warnings count, PASS/FAIL

 Phase 3 Checkpoint

 pnpm typecheck && pnpm build  # Must pass
 git add -A && git commit -m "chore: Remove 38 unused imports across 16 files"

 ---
 PHASE 4: Material Icons Conversion

 Estimated Time: 4 hours
 Context Scope: Icon system files, data files

 Goal

 Complete lucide-react migration (currently 38% done, ~288 icons remaining).

 Tasks

 Task 4.1: Create icon mapping utility

 Agent: batch-fixer (sonnet)
 Directive:
 ACTION: EXECUTE icon utility creation.

 EXECUTE:
 1. Create src/lib/icon-map.ts with mapping from Material Icon names to lucide-react:

    Example mappings needed:
    - schedule → Clock
    - filter → Filter
    - event → Calendar
    - attach_money → DollarSign
    - workspace_premium → Award
    - link → Link
    - search → Search
    - gps_fixed → MapPin
    - verified → CheckCircle
    - trending_up → TrendingUp
    - emoji_events → Trophy
    - shield → Shield
    - image → Image
    - group → Users
    - replay → RotateCcw
    - verified_user → UserCheck
    - photo_camera → Camera
    - hub → Network
    - insights → BarChart
    - web → Globe
    - ac_unit → Snowflake
    - medical_services → Stethoscope
    - gavel → Gavel
    - plumbing → Wrench

 2. Export function: getIcon(materialIconName: string) => LucideIcon

 Report: file created, icon count mapped

 Task 4.2: Convert service data file icons

 Agent: batch-fixer (sonnet)
 Directive:
 ACTION: EXECUTE data file icon conversion.

 Files to update:
 1. src/data/services/voice-ai.json
 2. src/data/services/google-ads.json
 3. src/data/services/facebook-ads.json
 4. src/data/services/lead-generation.json

 For each file:
 1. Find all icon string references
 2. Update to use lucide-react icon names (use mapping from Task 4.1)
 3. Ensure component that renders these uses the icon-map utility

 After completion, run: pnpm typecheck
 Report: files modified, icons converted count

 Task 4.3: Convert case-studies icons

 Agent: batch-fixer (sonnet)
 Directive:
 ACTION: EXECUTE case studies icon conversion.

 File: src/data/case-studies.json

 Icons to convert:
 - ac_unit → Snowflake
 - medical_services → Stethoscope
 - gavel → Gavel
 - plumbing → Wrench

 EXECUTE using Edit tool.
 After completion, run: pnpm typecheck
 Report: icons converted

 Task 4.4: Fix ServiceHero Material Icons

 Agent: batch-fixer (sonnet)
 Directive:
 ACTION: EXECUTE ServiceHero component conversion.

 File: src/components/ServiceHero.tsx

 Current issue: Uses custom MaterialIcon component.

 EXECUTE:
 1. Read the file
 2. Remove MaterialIcon component/import
 3. Replace with lucide-react icons
 4. Update icon rendering to use icon-map utility or direct imports

 After completion, run: pnpm typecheck
 Report: changes made

 Task 4.5: Fix Button component Material Icons

 Agent: batch-fixer (sonnet)
 Directive:
 ACTION: EXECUTE Button component conversion.

 File: src/components/ui/Button.tsx

 Current issue: Accepts icon prop expecting Material Icon name strings.

 EXECUTE:
 1. Read the file
 2. Change icon prop type to accept LucideIcon component
 3. Update rendering to use the passed component directly
 4. Example: icon={Phone} instead of icon="phone"

 After completion, run: pnpm typecheck
 Report: changes made, new prop type

 Task 4.6: Fix EnhancedROICalculator icons

 Agent: batch-fixer (sonnet)
 Directive:
 ACTION: EXECUTE ROI calculator icon conversion.

 File: src/components/features/EnhancedROICalculator.tsx

 Current issue: Industry presets use Material Icon names.

 EXECUTE:
 1. Read the file
 2. Update industry preset icons to use lucide-react
 3. Import required icons from lucide-react
 4. Update icon rendering

 After completion, run: pnpm typecheck
 Report: icons converted

 Task 4.7: AUDIT Phase 4

 Agent: code-searcher (sonnet)
 Directive:
 AUDIT: Verify Phase 4 completion.

 Search for:
 1. grep -r "material-icons" src/ → Should return 0 results
 2. grep -r "MaterialIcon" src/ → Should return 0 results
 3. Check data files have lucide-react icon names

 Run: pnpm build
 Report: remaining Material Icon references, PASS/FAIL

 Phase 4 Checkpoint

 pnpm build  # Must pass
 git add -A && git commit -m "refactor: Complete Material Icons to lucide-react migration"

 ---
 PHASE 5: Component Consolidation - Forms

 Estimated Time: 2 hours
 Context Scope: Form components only

 Goal

 Standardize on OptimizedLeadForm (2-step), deprecate LeadCaptureForm.

 Tasks

 Task 5.1: Enhance OptimizedLeadForm as canonical

 Agent: batch-fixer (sonnet)
 Directive:
 ACTION: EXECUTE form standardization.

 Keep: src/components/forms/OptimizedLeadForm.tsx (2-step flow)
 Deprecate: src/components/LeadCaptureForm.tsx

 EXECUTE:
 1. Read both form components
 2. Ensure OptimizedLeadForm has all features from LeadCaptureForm:
    - All field validations
    - Webhook submission to /api/submit-lead
    - Success/error states
    - Proper lucide-react icons
 3. Add variant prop to OptimizedLeadForm:
    - variant="compact" - minimal fields
    - variant="full" - all fields (name, email, phone, service, message)
    - Default: 2-step flow

 After completion, run: pnpm typecheck
 Report: features added/merged

 Task 5.2: Update all LeadCaptureForm imports

 Agent: batch-fixer (sonnet)
 Directive:
 ACTION: EXECUTE form import updates.

 EXECUTE:
 1. Search for all imports of LeadCaptureForm
 2. Replace with OptimizedLeadForm
 3. Add appropriate variant prop if needed
 4. Delete src/components/LeadCaptureForm.tsx

 After completion, run: pnpm typecheck
 Report: files updated, import count

 Task 5.3: AUDIT Phase 5

 Agent: page-auditor (opus)
 Directive:
 AUDIT: Verify Phase 5 completion.

 Check:
 1. LeadCaptureForm.tsx deleted?
 2. No imports of LeadCaptureForm in codebase?
 3. OptimizedLeadForm has variant prop?
 4. All forms still work (check /contact, /demo pages)?
 5. pnpm build passes?

 Report: PASS/FAIL for each

 Phase 5 Checkpoint

 pnpm build  # Must pass
 git add -A && git commit -m "refactor: Standardize on OptimizedLeadForm, remove LeadCaptureForm"

 ---
 PHASE 6: Component Consolidation - GlassCard

 Estimated Time: 2 hours
 Context Scope: Card components only

 Goal

 Create single configurable GlassCard component with variants.

 Tasks

 Task 6.1: Enhance GlassCard as canonical

 Agent: batch-fixer (sonnet)
 Directive:
 ACTION: EXECUTE GlassCard consolidation.

 Keep: src/components/ui/GlassCard.tsx
 Deprecate: PremiumGlassCard.tsx, GlowCard.tsx, GradientCard.tsx

 EXECUTE:
 1. Read all 4 card components
 2. Update GlassCard.tsx with configurable props:

    interface GlassCardProps {
      variant?: 'default' | 'premium' | 'subtle' | 'glow' | 'gradient';
      header?: ReactNode;
      footer?: ReactNode;
      glowColor?: string;  // For glow variant
      gradientFrom?: string;  // For gradient variant
      gradientTo?: string;
      children: ReactNode;
      className?: string;
    }

 3. Implement each variant's styling from the original components

 After completion, run: pnpm typecheck
 Report: variants added, props interface

 Task 6.2: Update GlassCard imports across codebase

 Agent: batch-fixer (sonnet)
 Directive:
 ACTION: EXECUTE GlassCard import updates.

 EXECUTE:
 1. Search for all imports of PremiumGlassCard
 2. Replace with GlassCard variant="premium"
 3. Search for GlowCard imports → GlassCard variant="glow"
 4. Search for GradientCard imports → GlassCard variant="gradient"
 5. Delete deprecated component files

 After completion, run: pnpm typecheck
 Report: files updated, components deleted

 Task 6.3: AUDIT Phase 6

 Agent: code-searcher (sonnet)
 Directive:
 AUDIT: Verify Phase 6 completion.

 Check:
 1. Only GlassCard.tsx exists in src/components/ui/
 2. No imports of PremiumGlassCard, GlowCard, GradientCard
 3. GlassCard has variant prop
 4. pnpm build passes

 Report: PASS/FAIL

 Phase 6 Checkpoint

 pnpm build  # Must pass
 git add -A && git commit -m "refactor: Consolidate card components into configurable GlassCard"

 ---
 PHASE 7: Component Consolidation - Hero

 Estimated Time: 3 hours
 Context Scope: Hero components only

 Goal

 Create configurable PremiumHero with variants for all use cases.

 Tasks

 Task 7.1: Analyze Hero variants

 Agent: component-finder (opus)
 Directive:
 ANALYZE: Document all Hero component variants.

 Find and document:
 1. src/components/sections/PremiumHero.tsx - features, props
 2. src/components/ServiceHero.tsx - features, props
 3. src/components/integrations/IntegrationsHero.tsx - features, props
 4. src/components/integrations/IntegrationDetailHero.tsx - features, props
 5. src/components/industries/real-estate/RealEstateHero.tsx - features, props

 Report:
 - Common props across all
 - Unique features per variant
 - Recommended unified prop interface

 Task 7.2: Create unified PremiumHero

 Agent: batch-fixer (sonnet)
 Directive:
 ACTION: EXECUTE Hero unification (based on Task 7.1 analysis).

 EXECUTE:
 1. Update src/components/sections/PremiumHero.tsx with:

    interface PremiumHeroProps {
      variant?: 'homepage' | 'service' | 'industry' | 'integration' | 'integration-detail';
      title: string;
      subtitle?: string;
      description?: string;
      badge?: string;
      stats?: Array<{ value: string; label: string }>;
      cta?: { primary: CTAProps; secondary?: CTAProps };
      backgroundStyle?: 'aurora' | 'mesh' | 'gradient' | 'minimal';
      showDemo?: boolean;  // For homepage phone demo
      industry?: string;   // For industry-specific theming
      integration?: Integration;  // For integration detail pages
    }

 2. Implement conditional rendering based on variant
 3. Keep all animations working

 After completion, run: pnpm typecheck
 Report: new interface, variants implemented

 Task 7.3: Update Hero imports across codebase

 Agent: batch-fixer (sonnet)
 Directive:
 ACTION: EXECUTE Hero import updates.

 EXECUTE:
 1. Find all pages using ServiceHero → PremiumHero variant="service"
 2. Find IntegrationsHero usages → PremiumHero variant="integration"
 3. Find IntegrationDetailHero → PremiumHero variant="integration-detail"
 4. Find RealEstateHero → PremiumHero variant="industry"
 5. Delete deprecated Hero component files

 After completion, run: pnpm typecheck
 Report: files updated, components deleted

 Task 7.4: AUDIT Phase 7

 Agent: page-auditor (opus)
 Directive:
 AUDIT: Verify Phase 7 completion.

 Check:
 1. Only PremiumHero.tsx exists for heroes
 2. No imports of ServiceHero, IntegrationsHero, etc.
 3. All hero pages still render correctly
 4. Animations still work
 5. pnpm build passes

 Report: PASS/FAIL, visual issues if any

 Phase 7 Checkpoint

 pnpm build  # Must pass
 git add -A && git commit -m "refactor: Consolidate Hero components into configurable PremiumHero"

 ---
 PHASE 8: Component Consolidation - ROI Calculator

 Estimated Time: 2 hours
 Context Scope: Calculator components only

 Goal

 Merge 3 ROI calculator variants into single configurable component.

 Tasks

 Task 8.1: Create unified ROICalculator

 Agent: batch-fixer (sonnet)
 Directive:
 ACTION: EXECUTE ROI Calculator unification.

 Keep: src/components/features/ROICalculator.tsx
 Merge features from: EnhancedROICalculator.tsx, MoneyLossCalculator.tsx

 EXECUTE:
 1. Read all 3 calculator components
 2. Update ROICalculator.tsx with:

    interface ROICalculatorProps {
      variant?: 'standard' | 'enhanced' | 'money-loss';
      industry?: 'hvac' | 'plumbing' | 'legal' | 'dental' | 'fitness' | 'restaurant' | 'real-estate';
      showIndustryPresets?: boolean;
      pricing?: { starter: number; growth: number };
      className?: string;
    }

 3. Merge industry presets from EnhancedROICalculator
 4. Merge money-loss calculation from MoneyLossCalculator
 5. Standardize pricing to $797 Growth tier

 After completion, run: pnpm typecheck
 Report: features merged, new props

 Task 8.2: Update calculator imports

 Agent: batch-fixer (sonnet)
 Directive:
 ACTION: EXECUTE calculator import updates.

 EXECUTE:
 1. Find all EnhancedROICalculator usages → ROICalculator with appropriate props
 2. Find MoneyLossCalculator usages → ROICalculator variant="money-loss"
 3. Delete deprecated calculator files

 After completion, run: pnpm typecheck
 Report: files updated, components deleted

 Task 8.3: AUDIT Phase 8

 Agent: code-searcher (sonnet)
 Directive:
 AUDIT: Verify Phase 8 completion.

 Check:
 1. Only ROICalculator.tsx exists
 2. No imports of EnhancedROICalculator or MoneyLossCalculator
 3. All calculator pages work
 4. Pricing shows $797 for Growth tier
 5. pnpm build passes

 Report: PASS/FAIL

 Phase 8 Checkpoint

 pnpm build  # Must pass
 git add -A && git commit -m "refactor: Consolidate ROI calculators into single configurable component"

 ---
 PHASE 9: Component Consolidation - FAQ

 Estimated Time: 1.5 hours
 Context Scope: FAQ components only

 Goal

 Unify FAQ/Accordion components into single configurable PremiumFAQ.

 Tasks

 Task 9.1: Create unified PremiumFAQ

 Agent: batch-fixer (sonnet)
 Directive:
 ACTION: EXECUTE FAQ unification.

 Keep: src/components/sections/PremiumFAQ.tsx
 Merge: IndustryFAQ.tsx, PremiumLocationFAQ.tsx

 EXECUTE:
 1. Read all FAQ components
 2. Update PremiumFAQ.tsx:

    interface PremiumFAQProps {
      variant?: 'standard' | 'industry' | 'location';
      faqs?: FAQ[];  // External data (for industry/location)
      categories?: string[];  // Filter categories
      industry?: string;  // For theming
      location?: string;  // For location-specific content
      maxItems?: number;
      className?: string;
    }

 3. Support both internal FAQ data AND external props
 4. Keep accordion animation patterns

 After completion, run: pnpm typecheck
 Report: features merged

 Task 9.2: Update FAQ imports

 Agent: batch-fixer (sonnet)
 Directive:
 ACTION: EXECUTE FAQ import updates.

 EXECUTE:
 1. Find IndustryFAQ usages → PremiumFAQ with faqs prop
 2. Find PremiumLocationFAQ usages → PremiumFAQ variant="location"
 3. Delete deprecated FAQ files

 After completion, run: pnpm typecheck
 Report: files updated

 Task 9.3: AUDIT Phase 9

 Agent: code-searcher (sonnet)
 Directive:
 AUDIT: Verify Phase 9 completion.

 Check:
 1. Only PremiumFAQ.tsx exists
 2. No imports of IndustryFAQ or PremiumLocationFAQ
 3. FAQ accordions work on all pages
 4. pnpm build passes

 Report: PASS/FAIL

 Phase 9 Checkpoint

 pnpm build  # Must pass
 git add -A && git commit -m "refactor: Consolidate FAQ components into configurable PremiumFAQ"

 ---
 PHASE 10: Component Consolidation - CTA & Integration

 Estimated Time: 2 hours
 Context Scope: CTA and Integration display components

 Goal

 Reduce 6 integration display components to 2, merge CTA sections.

 Tasks

 Task 10.1: Consolidate CTA sections

 Agent: batch-fixer (sonnet)
 Directive:
 ACTION: EXECUTE CTA consolidation.

 Keep: src/components/sections/PremiumFinalCTA.tsx
 Merge: IntegrationCTA.tsx, IntegrationsCTA.tsx, RealEstateFinalCTA.tsx

 EXECUTE:
 1. Update PremiumFinalCTA with variant prop:
    variant?: 'standard' | 'integration' | 'industry';
 2. Support context-specific content via props
 3. Delete redundant CTA components

 After completion, run: pnpm typecheck
 Report: components merged

 Task 10.2: Consolidate Integration display components

 Agent: batch-fixer (sonnet)
 Directive:
 ACTION: EXECUTE Integration component consolidation.

 Reduce 6 components to 2:
 Keep:
 - IntegrationCard.tsx (for grid display)
 - IntegrationShowcase.tsx (for carousel/featured)

 Merge into these and delete:
 - IntegrationPartners.tsx
 - IntegrationPartnersGrid.tsx
 - cro/IntegrationPartners.tsx

 EXECUTE consolidation with variant props.

 After completion, run: pnpm typecheck
 Report: components merged, deleted

 Task 10.3: AUDIT Phase 10

 Agent: code-searcher (sonnet)
 Directive:
 AUDIT: Verify Phase 10 completion.

 Check:
 1. CTA components reduced to PremiumFinalCTA only
 2. Integration display components reduced to 2
 3. All CTA and integration sections render
 4. pnpm build passes

 Report: PASS/FAIL, component count before/after

 Phase 10 Checkpoint

 pnpm build  # Must pass
 git add -A && git commit -m "refactor: Consolidate CTA and Integration display components"

 ---
 PHASE 11: Performance Optimization

 Estimated Time: 3 hours
 Context Scope: Large data files, timers

 Goal

 Improve load time by optimizing large bundles and fixing timer issues.

 Tasks

 Task 11.1: Split demo-transcripts

 Agent: batch-fixer (sonnet)
 Directive:
 ACTION: EXECUTE demo transcripts optimization.

 Current: src/data/demo-transcripts.ts (51KB loaded on demo page)

 EXECUTE:
 1. Read current demo-transcripts.ts structure
 2. Split into category files:
    - demo-transcripts/hvac.ts
    - demo-transcripts/legal.ts
    - demo-transcripts/dental.ts
    - demo-transcripts/index.ts (lazy loader)
 3. Update DemoContent.tsx to lazy load by selected category
 4. Delete original 51KB file

 After completion, run: pnpm build
 Report: files created, size reduction

 Task 11.2: Fix UrgencyTimer interval

 Agent: batch-fixer (sonnet)
 Directive:
 ACTION: EXECUTE timer optimization.

 File: src/components/cro/UrgencyTimer.tsx

 Current: Updates every 1000ms (1 second) - causes 86,400 DOM updates/day

 EXECUTE:
 1. Change interval from 1000ms to 4000ms (match LiveLeadTicker)
 2. Add visibility-aware interval (pause when tab not visible)
 3. Add reduced motion support

 After completion, run: pnpm typecheck
 Report: changes made

 Task 11.3: Add React.memo to CRO components

 Agent: batch-fixer (sonnet)
 Directive:
 ACTION: EXECUTE memo optimization.

 Components to wrap with React.memo:
 1. src/components/cro/UrgencyTimer.tsx
 2. src/components/cro/LiveLeadTicker.tsx
 3. src/components/cro/SocialProofBanner.tsx
 4. src/components/cro/TrustSignals.tsx
 5. src/components/cro/SecurityBadges.tsx

 EXECUTE:
 1. Import memo from React
 2. Wrap component export with memo()
 3. Add proper comparison function if needed

 After completion, run: pnpm typecheck
 Report: components optimized

 Task 11.4: AUDIT Phase 11

 Agent: page-auditor (opus)
 Directive:
 AUDIT: Verify Phase 11 completion.

 Check:
 1. Demo transcripts split into category files?
 2. DemoContent lazy loads transcripts?
 3. UrgencyTimer uses 4000ms interval?
 4. CRO components wrapped with memo?
 5. pnpm build passes?

 Report: PASS/FAIL, estimated performance improvement

 Phase 11 Checkpoint

 pnpm build  # Must pass
 git add -A && git commit -m "perf: Split demo-transcripts, optimize timers, add React.memo"

 ---
 PHASE 12: Final Validation & Documentation

 Estimated Time: 1 hour
 Context Scope: Full codebase verification

 Goal

 Comprehensive validation and memory bank update.

 Tasks

 Task 12.1: Full build verification

 Agent: page-auditor (opus)
 Directive:
 AUDIT: Final production readiness check.

 Run and verify:
 1. pnpm typecheck - 0 errors
 2. pnpm lint - minimal warnings
 3. pnpm build - 228+ pages compile
 4. Check for any console errors in source

 Report: PASS/FAIL for each, final page count

 Task 12.2: Component inventory verification

 Agent: component-finder (opus)
 Directive:
 AUDIT: Verify component consolidation complete.

 Check remaining component variants:
 1. Hero components - should be 1 (PremiumHero)
 2. Card components - should be 1 (GlassCard)
 3. Form components - should be 1 (OptimizedLeadForm)
 4. Calculator components - should be 1 (ROICalculator)
 5. FAQ components - should be 1 (PremiumFAQ)
 6. Material Icons - should be 0

 Report: actual counts vs expected

 Task 12.3: Update memory bank

 Agent: memory-sync (sonnet)
 Directive:
 ACTION: Update memory bank files with completed work.

 Update:
 1. .claude/memory/progress.md - Mark phases complete
 2. .claude/memory/known-issues.md - Remove resolved issues
 3. .claude/memory/patterns.md - Add new component patterns
 4. .claude/memory/learnings.md - Document consolidation patterns

 Report: files updated

 Phase 12 Checkpoint

 pnpm build  # Final verification
 git add -A && git commit -m "docs: Update memory bank, production ready"

 ---
 Success Metrics

 | Metric             | Before | After |
 |--------------------|--------|-------|
 | Component variants | 40-50  | <15   |
 | Material Icons     | ~288   | 0     |
 | CSS files          | 4      | 1     |
 | Logo assets        | 368KB  | ~16KB |
 | Unused imports     | 38     | 0     |
 | Forms              | 2      | 1     |
 | Build status       | PASS   | PASS  |
 | SEO coverage       | 95%    | 100%  |

 ---
 Execution Order

 PHASE 1  → Critical SEO (30 min)      → COMMIT
 PHASE 2  → Assets & CSS (2 hrs)       → COMMIT
 PHASE 3  → Unused code (1 hr)         → COMMIT
 PHASE 4  → Material Icons (4 hrs)     → COMMIT
 PHASE 5  → Forms consolidation (2 hrs) → COMMIT
 PHASE 6  → GlassCard consolidation (2 hrs) → COMMIT
 PHASE 7  → Hero consolidation (3 hrs)  → COMMIT
 PHASE 8  → Calculator consolidation (2 hrs) → COMMIT
 PHASE 9  → FAQ consolidation (1.5 hrs) → COMMIT
 PHASE 10 → CTA & Integration (2 hrs)   → COMMIT
 PHASE 11 → Performance (3 hrs)         → COMMIT
 PHASE 12 → Validation (1 hr)           → COMMIT
 ─────────────────────────────────────────────────
 TOTAL: ~24 hours across 12 phases

 Each phase is self-contained with clear context boundaries. Execute one phase at a time, verify with audit, commit, then proceed to next phase./co