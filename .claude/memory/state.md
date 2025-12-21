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
✅ **Complete visual audit** of all 15 pages (8 parallel site-auditor agents)
✅ **HIGH priority fixes** (70 replacements across 8 files, commit 8b89ec9):
- `loading.tsx`: 5 replacements (gold borders/backgrounds)
- `LeadRescueSimulator.tsx`: 4 replacements (gold text/shadows)
- `PremiumServices.tsx`: 42 replacements (comprehensive gold removal)
- `CapacityIndicator.tsx`: 5 replacements (gold gradients/text)
- `HomeServicesClient.tsx`: 2 replacements (gold borders)
- `IntegrationHowItWorks.tsx`: 6 replacements (gold badges/borders)
- `FitnessClient.tsx`: 4 replacements (gold text/borders)
- `MedSpaClient.tsx`: 2 replacements (gold accents)

✅ **MEDIUM priority fixes** (7 files, commit 987144a):
- Industry pages, pricing components, homepage features
- All gold→blue migration on main components complete

✅ **Blog content light theme** (20 files, commit 27b3b3e):
- `text-gray-300` → `text-slate-600`
- `text-white` → `text-slate-900`
- `text-amber-400` → `text-blue-600`
- `bg-gray-800/50` → `bg-slate-50`
- All blog articles now readable on light theme

✅ **Build passing**: 229 pages

## Recent fixes (2025-12-21 AM)
1. ✅ **Mobile hero enhancements**: Centered layout, 3 floating accent dots, stronger CTA shadows
2. ✅ **Mobile integration strip**: Added 6 key integrations (HubSpot, Slack, Google Calendar, Zapier, Stripe, Salesforce)
3. ✅ **Scroll fixes**: Fixed LightTextDemo chat scroll trap + ROICalculator range sliders blocking scroll
4. ✅ **How It Works step badges**: Fixed cut-off on mobile (changed positioning from `-right-3` to `top-4 right-4`)
5. ✅ **New shared utilities**: Created `src/lib/depth-utils.ts` for 3D depth effects (useIsMobile, use3DTilt, cardShadow)
6. ✅ **Demo page mobile UX**: Bottom sheet modal, swipe gestures, collapsible filters, 44px touch targets
7. ✅ **P1 SEO fixes**: Absolute OG URLs, Twitter metadata, canonical/robots on legal pages, trimmed descriptions
8. ✅ **Orphaned pages deleted**: Removed `/demo-text` and `/integrations-demo` (no links found)
9. ✅ **Dark mode cleanup** (12+ files): MegaMenu, PulseOrb, MobileHeroVisual, ScenarioCard, DemoContent, BlogContent, categoryThemes, UrgencyTimer, ServicesPageClient, TestimonialsCarousel, SocialProofWall, MagneticButtonExample
   - Indigo/violet/purple → blue/cyan gradients
   - `text-foreground-muted` → `text-slate-500/600`
   - `bg-background-dark` → `bg-slate-900`
   - Removed unused `isLightMode` variables
10. ✅ **Health check endpoint**: Created `/api/health` for monitoring
11. ✅ **Sentry config ready**: Config files created (needs `npm install @sentry/nextjs` + SENTRY_DSN)

## Deployment Readiness Push (2025-12-21 PM)
**All P0 blockers resolved. Site ready for deployment at ~99% confidence.**

### P0 Fixes Completed (Morning):
1. ✅ **LocalMarketStats.tsx**: Converted dark slate-950 backgrounds to light theme (white/slate-50)
2. ✅ **globals-mobile-optimized.css**: Fixed dark mobile header/glass forcing, now uses light theme colors
3. ✅ **CaseStudiesPreview.tsx**: Replaced gold #D4AF370F with blue #2563EB0F
4. ✅ **Schema cleanup**: Deleted fake aggregateRating schemas from page.tsx, pricing/page.tsx, integrations/page.tsx
5. ✅ **Trust claims standardized**: Changed all "Trusted by 500+/1000+/100+" to "Trusted by growing businesses" (26 instances across 14 files)

### P1 Fixes Completed (Morning):
1. ✅ **who-we-serve/[slug] metadata**: Added twitter metadata + alternates.canonical
2. ✅ **Unused files deleted**: schema-config.ts, seo-schemas.ts, page.tsx.bak
3. ✅ **Lint warnings fixed**: Removed 5 unused imports/variables

### Final Schema & Integration Fixes (Afternoon):
1. ✅ **Martial Arts page schema** (commit d3e5cac): Fixed areaServed object structure, removed AggregateOffer issues
2. ✅ **who-we-serve BreadcrumbList**: Added schema to base layout
3. ✅ **Google Reviews API activated**: Added GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID to .env.local
4. ✅ **LocalBusiness schema URL fixed**: Changed `location.slug` → `page_id` in seo-config.ts (lines 151, 177) - fixes 20+ industry pages
5. ✅ **RiskReversal.tsx light theme**: Converted from dark (text-white, border-white/0.06) to light theme
6. ✅ **Deleted leftover logos**: Removed Desktop-logo-no-white.svg (1.3MB) and logo-desktop-light-OLD.svg (213KB)

### Final Validation Results:
- `npm run typecheck`: PASSED ✅
- `npm run lint`: PASSED (0 warnings) ✅
- `npm run build`: PASSED (230 pages) ✅

## P0 Blockers
None - all critical issues resolved ✅

## P1 (high-priority items)
1. ⚠️ **Pricing pages**: `text-cyan-400`, `text-green-400`, `text-blue-300` need better contrast
2. ⚠️ **Automotive**: `text-green-400` in ROI calculator
3. ⚠️ **Legal**: Urgency badges with -400 color variants
4. ⚠️ **SpeedToLeadTimeline**: -400 color variants need audit
5. ⚠️ **Core components**: Legacy `text-foreground` token cleanup

### Pending Decisions (awaiting approval):
1. ⚠️ **Sentry setup**: Run `npm install @sentry/nextjs` and add SENTRY_DSN to .env.local (config files ready)
2. ⚠️ **Protected files dark mode cleanup**: Strip dark mode from tailwind.config.ts and globals.css
3. ⚠️ **Color token standardization**: Protected files (ui/**, globals.css, tailwind.config)

### Recently resolved (2025-12-21):
- ✅ Google Reviews API activated (GOOGLE_PLACES_API_KEY + GOOGLE_PLACE_ID added)
- ✅ LocalBusiness schema URL fixed (location.slug → page_id in seo-config.ts)
- ✅ RiskReversal.tsx light theme conversion
- ✅ Leftover logos deleted (Desktop-logo-no-white.svg 1.3MB, logo-desktop-light-OLD.svg 213KB)
- ✅ Martial Arts page schema (areaServed object, AggregateOffer issues)
- ✅ who-we-serve BreadcrumbList schema added
- ✅ who-we-serve/[slug] metadata (twitter + canonical)
- ✅ Unused files deleted (schema-config.ts, seo-schemas.ts, page.tsx.bak)
- ✅ Lint warnings fixed (5 unused imports/variables)
- ✅ LocalMarketStats light theme conversion
- ✅ Mobile CSS dark mode forcing removed
- ✅ CaseStudiesPreview gold→blue (#D4AF370F → #2563EB0F)
- ✅ Fake aggregateRating schemas deleted (3 pages)
- ✅ Trust claims standardized (26 instances, 14 files)
- ✅ Orphaned pages (`/demo-text`, `/integrations-demo`) deleted
- ✅ Dark mode cleanup in 12+ component files (indigo/violet/purple → blue/cyan)
- ✅ Health check endpoint created (`/api/health`)
- ✅ Fitness: Step number badge contrast issue
- ✅ Replaced `btn-gold` with blue gradient on all industry pages
- ✅ Updated breadcrumb schema to use `/who-we-serve` across all 9 industry pages
- ✅ Fixed CRMCard dark text colors (`text-white` → `text-slate-900`)
- ✅ Removed duplicate metadata from `home-services/layout.tsx`
- ✅ Gold→Blue migration (HIGH + MEDIUM priority, 15 files total)

## Recently completed features (2025-12-21)
1. ✅ **Missed Call Cost Calculator** (commit 2475dac)
   - Created `/tools/missed-call-calculator` route with full SEO
   - Created `src/data/industry-benchmarks.ts` with 8 industries
   - MissedCallCalculatorClient.tsx: Industry dropdown, 3 sliders, 3 animated result cards
   - 3D tilt effects on desktop (disabled on mobile)
   - useCountUp for animated number counters
   - 3 JSON-LD schemas (SoftwareApplication, FAQ, Breadcrumb)
   - FAQ section for SEO
   - Added tools section to sitemap.ts

2. ✅ **Demo Personalization** (commit 2475dac)
   - Created PersonalizationForm.tsx: Collapsible accordion UI (collapsed by default)
   - Business name, industry (required), phone, location (optional)
   - SessionStorage persistence
   - 8 industry options with Lucide icons
   - Modified LeadResponseSimulator.tsx: Added personalization prop, dynamic subtitle, "Personalized" badge
   - Modified DemoContent.tsx: Integrated form above simulator
   - Personalization data sent to `/api/demo-response` Claude endpoint

3. ✅ **Lead Response Simulator Conversation Tracking** (commit 81a4d8d)
   - Added ConversationMessage interface and conversationHistory state
   - User messages appear on right (blue bubbles), AI responses on left (white bubbles with intent badge)
   - Input clears after submit, messages appear in chat history
   - Typewriter effect preserved for latest AI message only
   - Lead score and CRM fields panels show after conversation starts

4. ✅ **Lead Response Simulator Personalization Sync** (commit 81a4d8d)
   - Industry sync via useEffect when personalization changes
   - Mapped personalization industries to simulator BusinessType
   - Hide "Try an example" section when personalized
   - Dynamic placeholder: "Type your test message for {businessName}..."
   - "Personalized" badge indicator when active

5. ✅ **Integration Pages Light Theme Fix** (commit 81a4d8d)
   - GradientCard.tsx: Changed bg-premium-card (dark) to bg-white/90 (light)
   - GradientCard.tsx: Changed overlay to-black/[0.05] to to-slate-100/10
   - IntegrationHowItWorks.tsx: Replaced glass-premium-mobile with light theme styling
   - IntegrationHowItWorks.tsx: Changed step number text from text-black to text-white

6. ✅ **Scenario Builder** (commit 0242a26)
   - Created 7 new files in `src/components/demo/scenarios/`
   - scenarios.ts: 18 pre-built scenarios across 6 industries
   - ScenarioCard.tsx: Premium glass morphism cards with mobile touch targets
   - ScenarioLibrary.tsx: Filterable grid with collapsible mobile filters
   - ScenarioPlayer.tsx: Cinematic conversation playback
   - ScenarioOutcome.tsx: Animated lead score + CRM display
   - ScenarioBuilder.tsx: Bottom sheet modal on mobile with swipe-to-dismiss
   - Added "Scenario Library" section on demo page
   - 18 scenarios: 3 per industry (plumbing, dental, hvac, auto, law, general)
   - Mobile UX: Bottom sheet, swipe gestures, 44px touch targets, collapsible filters

## Next up (Planned Features)
None active - demo + calculator features complete

## P2 (nice to have)
1. Add focus-visible states to CTAs across site
2. Update marketing copy in blog posts with verifiable claims
3. Submit sitemap to Google Search Console
4. Test OG images with social media debuggers

## Operating rules
- Keep main-thread context lean: delegate discovery/audits to subagents.
- If a session runs long: `/export`, then `/compact` with the next objective.
- Archived reports + legacy data live in `docs/_archive/` (don't read unless explicitly needed).
