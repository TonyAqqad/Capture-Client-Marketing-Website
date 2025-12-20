# State (keep this file small)

## Current reality
- Canonical domain: https://captureclient.com (no www)
- Phone: 865-346-6111
- App root: `capture-client-site/` (Next.js App Router)
- Brand colors: Blue #2563EB (CAPTURE), Dark #0F172A (CLIENT), Cyan #17B4EF (accents)

## 🚨 CRITICAL: Light Theme Standard (DO NOT REVERT)

**Site-wide light theme migration COMPLETE (2025-12-17).**

### Standard Styling (30+ files converted):
- Backgrounds: `bg-white`, `bg-slate-50`, `bg-gray-50`
- Text: `text-slate-900` (headings), `text-slate-600` (body)
- Cards: `bg-white border border-slate-200`
- Inputs: `bg-white text-slate-900 border-slate-200`
- Buttons: `bg-gradient-to-r from-blue-600 to-cyan-500` (primary), `bg-white border-slate-200` (secondary)
- Glass: `bg-white/70 backdrop-blur-xl border-slate-200/60` (NOT `.glass-premium`)

### NEVER DO:
- Revert to dark backgrounds (`bg-slate-900`, `bg-black`, `#030303`)
- Use semantic dark tokens (`bg-background`, `text-foreground` in dark contexts)
- Use dark glass classes (`.glass`, `.glass-premium`, `.glass-card`)
- Use dark button classes (`btn-gold`, `btn-ghost`)
- Replace light components with dark Premium* equivalents

## Recent fixes (2025-12-19)
1. ✅ **Schema cleanup**: Removed all unverifiable aggregateRating/awards
2. ✅ **OG image**: Created 1200x630px branded `og-image.png` asset
3. ✅ **OG image references**: Updated 33 files from `.jpg`/`.svg` to `.png`
4. ✅ **30-day guarantee removed**: False claim removed from pricing
5. ✅ **Contact form fix**: Floating label overlap issue resolved in LeadCaptureForm.tsx
6. ✅ **Logo restored**: Fixed corrupted 1.3MB logo-desktop-light.svg (restored to 209K)
7. ✅ **SEO claims fixed**: Removed "500+ businesses", "97% satisfaction", "SOC-II compliant"
8. ✅ **Verification codes**: Commented out placeholder codes (add real ones post-deploy)
9. ✅ **Price consistency**: Fixed $997→$950 in enterprise-package.json
10. ✅ **Broken links fixed**: Changed /packages/ → /pricing/ in package JSON files
11. ✅ **Build validated**: Typecheck + build pass (229 pages)
12. ✅ **btn-gold replaced**: Blue gradient on all industry pages (Legal, Dental, HomeServices, PremiumServices)
13. ✅ **Breadcrumb schema**: Updated `/industries` → `/who-we-serve` across 9 industry pages
14. ✅ **CRMCard light theme**: Fixed dark text colors for light background
15. ✅ **Duplicate metadata removed**: Cleaned up home-services/layout.tsx

## Gold→Blue Migration (2025-12-20)
✅ **Complete visual audit** of all 15 pages
✅ **HIGH priority fixes** (70 replacements across 8 files):
- `loading.tsx`: 5 replacements (gold borders/backgrounds)
- `LeadRescueSimulator.tsx`: 4 replacements (gold text/shadows)
- `PremiumServices.tsx`: 42 replacements (comprehensive gold removal)
- `CapacityIndicator.tsx`: 5 replacements (gold gradients/text)
- `HomeServicesClient.tsx`: 2 replacements (gold borders)
- `IntegrationHowItWorks.tsx`: 6 replacements (gold badges/borders)
- `FitnessClient.tsx`: 4 replacements (gold text/borders)
- `MedSpaClient.tsx`: 2 replacements (gold accents)

✅ **Build passing**: 229 pages
📝 **Remaining**: Minor conditional passes (Automotive, Pricing, Real Estate pages have intentional gold in specific contexts)

## P0 Blockers
None - all critical issues resolved ✅

## P1 (all resolved ✅)
1. ✅ Replaced `btn-gold` with blue gradient on all industry pages (Legal, Dental, HomeServices, PremiumServices)
2. ✅ Updated breadcrumb schema to use `/who-we-serve` across all 9 industry pages
3. ✅ Fixed CRMCard dark text colors (`text-white` → `text-slate-900`)
4. ✅ Removed duplicate metadata from `home-services/layout.tsx`
5. ✅ Gold→Blue migration HIGH priority fixes complete (70 replacements across 8 files)

## P2 (nice to have)
1. Add focus-visible states to CTAs across site
2. Update marketing copy in blog posts with verifiable claims
3. Submit sitemap to Google Search Console
4. Test OG images with social media debuggers
5. Delete orphaned logo files (logo-official.*, Desktop-logo-no-white.svg)

## Operating rules
- Keep main-thread context lean: delegate discovery/audits to subagents.
- If a session runs long: `/export`, then `/compact` with the next objective.
- Archived reports + legacy data live in `docs/_archive/` (don't read unless explicitly needed).
