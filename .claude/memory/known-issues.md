# Known Issues (Updated 2024-12-09 from Site-Wide Audit)

## 🔴 CRITICAL (Fixing Now)
- **Phone Number Mismatch**: Some files use 865-346-3339 instead of correct 865-346-6111. Found in: location JSON files, some components.
- **Wrong backgrounds**: Features page uses `bg-slate-900` instead of `bg-background-dark`.
- **Material Icons**: Who We Serve page uses Google Material Icons instead of lucide-react.
- **Duplicate blog templates**: Both `page.tsx` and `page-glassy.tsx` exist in blog/[slug].

## 🟡 MEDIUM (Next Priority)
- **Search engine verification codes**: seo-config.ts lines 702-706 still contain placeholder values. Need actual verification codes from Bing Webmaster Tools and Pinterest (Google already verified May 29, 2024).
- **Mixed design systems**: 3 aesthetics in use (Linear/Stripe, Legacy Gold, Hybrid). Need to standardize.
- **Component duplicates (14 groups)**: GlassCard, Hero, ROI Calculator, FAQ, Testimonials, CTA, FeatureGrid, Stats, IntegrationLogos, ProcessSteps, PricingCard, ContactForm, NavigationMenu, SocialProof, AnimatedSection. (Phase 1 complete - calculators/schedulers cleaned up)
- **Card component overlap**: 4 card components that could be consolidated.

## 🟢 LOW (Ongoing)
- **Twitter handle claim**: @captureclient is AVAILABLE (not claimed). Should register handle for brand protection and social media presence.
- **Homepage pricing enhancements**: Could add social proof badge and phone CTA above/below pricing cards for improved conversion.
- Standardization gaps: button classes (`btn-gold/ghost`), container/padding patterns.
- Mobile/layout: keep checking 375px/1440px; ensure z-10 over backgrounds.

## ✅ RESOLVED
- **Homepage dark theme reversion**: batch-fixer subagent accidentally replaced Light* components with Premium* components during SEO fixes (caught and fixed 2025-12-15, added LIGHT THEME STANDARD to state.md)
- **Pricing mismatch**: Homepage Growth plan $997/mo → $950/mo (standardized 2025-12-15, matches pricing page)
- **Title tags optimization**: Shortened 14 title tags to under 60 chars (2025-12-15) - pricing, contact, case-studies, features, industries, services
- **Homepage Product schema**: Added Product/Offer JSON-LD to pricing section (2025-12-15) for rich snippets
- **www redirect**: Implemented 301 permanent redirect www.captureclient.com → captureclient.com (2025-12-15)
- **Google Search Console**: Verified active since May 29, 2024 (confirmed 2025-12-15)
- **Domain migration**: captureclientai.net → captureclient.com (completed 2024-12-09, verified 2025-12-15 via SEO audit - 99% complete)
- **SEO metadata coverage**: 100% of 35 pages have complete metadata (verified 2025-12-15)
- **Canonical URLs**: All pages correctly point to captureclient.com domain (verified 2025-12-15)
- **JSON-LD schemas**: Comprehensive implementation across site (Organization, WebSite, LocalBusiness, BreadcrumbList, FAQPage, Service, Product/Offer) (verified 2025-12-15)
- Motion imports: 100% compliance with @/lib/motion
- Codebase cleanup: ~118 files deleted, ~14MB saved
