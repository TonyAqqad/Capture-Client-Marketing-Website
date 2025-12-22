# Progress (lean)

> Entries older than 1 week are archived to `progress-archive.md`.

- Overall: ~99% complete (last updated 2025-12-21). Builds passing (230 pages).
- Current focus: Orchestration system improvements. All P0/P1 items resolved.

## Recent (Dec 20-21, 2025)

### JSON-LD SCHEMA COMPLIANCE + ORCHESTRATION CLEANUP (2025-12-21)
- Schema compliance fixes (commit c252f77):
  - JsonLd.tsx: Added idPrefix prop to prevent duplicate script IDs
  - Homepage: Removed invalid SearchAction and unverified AggregateRating
  - Locations: Removed invalid GeoCoordinates (no lat/long data available)
  - Integrations: Changed non-standard `integrationWith` → valid `isRelatedTo`
  - Added WebPage schemas to: blog, demo, privacy-policy, terms-of-service
- Orchestration docs cleanup:
  - Renamed skill `frontend-aesthetics` → `frontend-design` (match docs)
  - Clarified `/mobile-frontend` is a command, not a skill
  - Added note that protected files policy is guidance, not enforced
  - Removed unused ccmem.json MCP config

### DEPLOYMENT READINESS AUDIT + SCHEMA ENHANCEMENTS (2025-12-21)
- Comprehensive audit: 4 parallel subagents (Desktop UI, Mobile UI, Schema, Component)
- Schema additions: WebSite + SoftwareApplication (homepage), LocalBusiness (locations), pricing fix (integrations)
- Documentation cleanup: 20 legacy files moved to docs/_archive/ (gitignored)
- Agent guardrails: Created 05-ignore-paths.md to prevent confusion from archived docs
- Build status: TypeScript clean, 230 pages generated successfully (commit 0f4ca1d)

### LEAD RESPONSE SIMULATOR ENHANCEMENTS (2025-12-21)
- Conversation tracking with multi-turn chat UI (commit 81a4d8d)
- Personalization sync between form and simulator
- Integration pages light theme fix (GradientCard, IntegrationHowItWorks)

### MISSED CALL CALCULATOR + DEMO PERSONALIZATION (2025-12-21)
- Created `/tools/missed-call-calculator` with industry benchmarks (commit 2475dac)
- PersonalizationForm.tsx with sessionStorage persistence
- 3D tilt effects, animated counters, 3 JSON-LD schemas

### LEAD RESPONSE SIMULATOR + SCENARIO BUILDER (2025-12-21)
- 4 new components: LeadResponseSimulator, LeadScoreIndicator, IntentBadge, CRMFieldsDisplay
- 18 pre-built scenarios across 6 industries (commit 0242a26)

### MOBILE UX + SCROLL FIXES (2025-12-21)
- Mobile hero improvements (centered layout, accent dots, integration strip)
- Fixed scroll traps in LightTextDemo, ROICalculator, HowItWorks

### TYPOGRAPHY & CONTRAST AUDIT (2025-12-20)
- Blog content fixed (20 files): text-gray-300 → text-slate-600
- Gold→Blue migration (15 files, 70+ replacements)

## Outstanding (essentials)
- **Search engine verification codes**: Update seo-config.ts (lines 702-706)
- **Twitter setup**: Claim @captureclient handle
- Component duplicates: 14 groups to merge
- Standardization: buttons, containers, responsive padding
