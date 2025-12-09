# Known Issues (Updated 2024-12-09 from Site-Wide Audit)

## 🔴 CRITICAL (Fixing Now)
- **Phone Number Mismatch**: Some files use 865-346-3339 instead of correct 865-346-6111. Found in: location JSON files, some components.
- **Wrong backgrounds**: Features page uses `bg-slate-900` instead of `bg-background-dark`.
- **Material Icons**: Who We Serve page uses Google Material Icons instead of lucide-react.
- **Duplicate blog templates**: Both `page.tsx` and `page-glassy.tsx` exist in blog/[slug].

## 🟡 MEDIUM (Next Priority)
- **Mixed design systems**: 3 aesthetics in use (Linear/Stripe, Legacy Gold, Hybrid). Need to standardize.
- **Component duplicates (15 groups)**: GlassCard, Hero, ROI Calculator, FAQ, Testimonials, CTA, FeatureGrid, Stats, IntegrationLogos, ProcessSteps, PricingCard, ContactForm, NavigationMenu, SocialProof, AnimatedSection.
- **Card component overlap**: 4 card components that could be consolidated.

## 🟢 LOW (Ongoing)
- Standardization gaps: button classes (`btn-gold/ghost`), container/padding patterns.
- SEO gaps: some location pages missing comprehensive metadata.
- Mobile/layout: keep checking 375px/1440px; ensure z-10 over backgrounds.

## ✅ RESOLVED
- Domain migration: captureclientai.net → captureclient.com (completed 2024-12-09)
- Motion imports: 100% compliance with @/lib/motion
- Codebase cleanup: ~118 files deleted, ~14MB saved
