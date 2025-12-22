# Production Readiness Audit Report
**Generated**: December 18, 2025
**Site**: Capture Client Marketing Site
**Canonical Domain**: https://captureclient.com

---

## Executive Summary

| Priority | Count | Status |
|----------|-------|--------|
| **P0 Ship Blockers** | 4 | 🔴 Must fix before launch |
| **P1 Visual Polish** | 6 | 🟡 Should fix soon |
| **P2 SEO Indexing** | 8 | 🟢 Checklist items |

---

## P0 — SHIP BLOCKERS (Must Fix)

### P0-1: Missing OG Images (31+ broken references)

**Impact**: Social sharing shows broken images on Twitter/Facebook/LinkedIn. Damages credibility and click-through rates.

| File | Line | Broken Reference | Fix |
|------|------|------------------|-----|
| `src/app/page.tsx` | 53 | `/og-image.jpg` | Create JPG or change to `/og-image.svg` |
| `src/app/contact/page.tsx` | 23 | `/og-image.jpg` | Same |
| `src/app/case-studies/page.tsx` | 28 | `/og-case-studies.jpg` | Create asset |
| `src/app/integrations/page.tsx` | 38 | `/og-integrations.jpg` | Create asset |
| `src/app/integrations/[slug]/page.tsx` | 75 | `/og-integration-${slug}.jpg` | Use generic fallback |
| `src/app/use-cases/metadata.ts` | 32 | `/og-use-cases.jpg` | Create asset |
| `src/app/how-it-works/page.tsx` | 27 | `/og-how-it-works.jpg` | Create asset |
| `src/app/who-we-serve/page.tsx` | 28 | `/og-image-industries.jpg` | Create asset |
| `src/app/who-we-serve/[slug]/page.tsx` | ~45 | `/og-image.jpg` | Same |
| `src/app/industries/*/page.tsx` | Various | `/og-image.jpg` | Same |
| `src/app/pricing/page.tsx` | ~35 | `/og-image.jpg` | Same |
| `src/app/features/page.tsx` | ~30 | `/og-image.jpg` | Same |

**Existing Assets** (in `capture-client-site/public/`):
- ✅ `og-image.svg` — exists but SVG not ideal for social
- ✅ `logo-full.svg`, `logo-full.png`
- ❌ NO `.jpg` OG images exist

**Recommended Fix**:
1. Create `og-image.jpg` (1200×630px) as primary fallback
2. Create page-specific OG images OR use single fallback everywhere
3. Social platforms prefer JPG/PNG over SVG for previews

---

### P0-2: Unverifiable Schema Claims (E-E-A-T Risk)

**Impact**: Google may penalize for false trust signals. Potential legal issues with fake certifications.

**File**: `src/lib/seo-config.ts`

| Line | Claim | Issue |
|------|-------|-------|
| 113-118 | `aggregateRating: { ratingValue: '4.9', reviewCount: '127' }` | No real review source linked |
| 120-125 | `award: ['Google Ads Partner', 'Meta Business Partner']` | Cannot verify partnerships |
| 120-125 | `award: ['BBB Accredited Business']` | No BBB listing found |
| 120-125 | `award: ['SOC-II Certified']` | No certificate link |

**Recommended Fix**:
```typescript
// Option A: Remove unverifiable claims entirely
// Delete lines 113-125 from aggregateRating and award

// Option B: Replace with verifiable claims only
// Link to actual review platforms (Google Business Profile, Trustpilot, etc.)
```

---

### P0-3: Missing Screenshot Assets in Schema

**Impact**: SoftwareApplication schema references non-existent images.

**File**: `src/lib/seo-config.ts` (lines 828-836)

```typescript
screenshot: [
  {
    '@type': 'ImageObject',
    url: `${SITE_CONFIG.url}/screenshots/dashboard.jpg`,  // DOES NOT EXIST
  },
  {
    '@type': 'ImageObject',
    url: `${SITE_CONFIG.url}/screenshots/ai-voice.jpg`,   // DOES NOT EXIST
  },
],
```

**Recommended Fix**:
1. Create `public/screenshots/` directory
2. Add actual product screenshots (dashboard.jpg, ai-voice.jpg)
3. Or remove screenshot array from schema until assets exist

---

### P0-4: Incomplete LocalBusiness Address

**Impact**: Local SEO signals broken; Google may not surface in local searches.

**File**: `src/lib/seo-config.ts` (LocalBusiness schema)

```typescript
address: {
  '@type': 'PostalAddress',
  streetAddress: '',      // EMPTY
  addressLocality: 'Knoxville',
  addressRegion: 'TN',
  postalCode: '',         // EMPTY
  addressCountry: 'US',
},
```

**Recommended Fix**: Add complete physical address or remove LocalBusiness schema if no physical location.

---

## P1 — VISUAL POLISH (Should Fix)

### P1-1: Gold/Amber Color Remnants

**Status**: ✅ FIXED in integration components (19 fixes applied)

Fixed files:
- `IntegrationFeatures.tsx`
- `IntegrationBenefits.tsx`
- `IntegrationCTA.tsx`
- `IntegrationRelated.tsx`
- `IntegrationHowItWorks.tsx`

**Remaining**: Audit other components for stray gold/amber colors.

---

### P1-2: `text-foreground` Usage

**Issue**: `text-foreground` relies on CSS variable that may not be set correctly. Use explicit colors.

**Files to check**:
- Any component using `text-foreground` should use `text-slate-900` instead
- Search pattern: `grep -r "text-foreground" src/`

---

### P1-3: Integration Page Scroll Position

**Status**: ✅ FIXED — Created `ScrollToTop` component

**File**: `src/components/integrations/ScrollToTop.tsx`

---

### P1-4: Browse Integrations Button Contrast

**Status**: ✅ FIXED — Changed `text-foreground` to `text-slate-900`

---

### P1-5: Navigation Menu Updated

**Status**: ✅ FIXED — Added Fitness & Martial Arts to Industries nav

**File**: `src/components/navigation/navData.ts`

---

### P1-6: Dark Background Remnants

**Check for**: Any sections still using dark backgrounds that should be light:
- `bg-slate-800`, `bg-slate-900`, `bg-gray-800`, `bg-gray-900`
- `bg-white/5`, `bg-white/10` (dark-mode patterns)
- `border-white/10`, `border-white/20`

---

## P2 — SEO INDEXING CHECKLIST

### ✅ Completed

| Item | Status | Notes |
|------|--------|-------|
| Metadata on all pages | ✅ | All key pages have title, description, OG |
| Canonical URLs | ✅ | Consistent `https://captureclient.com` |
| robots.txt | ✅ | Properly configured at `src/app/robots.ts` |
| sitemap.xml | ✅ | 270+ URLs with proper priorities |
| JSON-LD Organization | ✅ | Present in layout |
| JSON-LD LocalBusiness | ⚠️ | Incomplete address (see P0-4) |

### 🔲 Outstanding Tasks

| Task | Priority | Action |
|------|----------|--------|
| Submit sitemap to GSC | P2 | Visit Google Search Console → Sitemaps → Add |
| Request indexing for key pages | P2 | GSC → URL Inspection → Request Indexing |
| Validate OG images with debugger | P2 | Use https://cards-dev.twitter.com/validator |
| Test rich results | P2 | Use https://search.google.com/test/rich-results |
| Verify schema with validator | P2 | Use https://validator.schema.org/ |
| Set up Google Business Profile | P2 | If physical location exists |
| Configure Bing Webmaster Tools | P2 | Secondary search engine coverage |
| Add review platform integration | P2 | Connect real reviews for E-E-A-T |

---

## Step-by-Step Execution Plan

### Phase 1: Asset Creation (P0 fixes)

```bash
# 1. Create OG images directory structure
mkdir -p capture-client-site/public/screenshots

# 2. Required OG images to create (1200x630px JPG):
# - og-image.jpg (primary fallback)
# - og-case-studies.jpg
# - og-integrations.jpg
# - og-use-cases.jpg
# - og-how-it-works.jpg
# - og-image-industries.jpg

# 3. Required screenshots to create:
# - screenshots/dashboard.jpg
# - screenshots/ai-voice.jpg
```

### Phase 2: Schema Cleanup (P0 fixes)

**Edit `src/lib/seo-config.ts`**:

1. Remove or comment out unverifiable `aggregateRating` (lines 113-118)
2. Remove or comment out unverifiable `award` array (lines 120-125)
3. Remove `screenshot` array until real assets exist (lines 828-836)
4. Either complete `LocalBusiness` address or remove schema

### Phase 3: Code Audit (P1 fixes)

```bash
# Run from capture-client-site/
cd capture-client-site

# Find remaining gold/amber colors
grep -rn "gold\|amber\|#D4AF37" src/

# Find text-foreground usage
grep -rn "text-foreground" src/

# Find dark background patterns
grep -rn "bg-slate-800\|bg-slate-900\|bg-gray-800\|bg-gray-900" src/
grep -rn "bg-white/5\|bg-white/10" src/
```

### Phase 4: Validation

```bash
# Build and verify
cd capture-client-site
npm run typecheck
npm run lint
npm run build

# Start production server
npm run start -- -p 3005

# Test in browser:
# - Check OG images load: view-source on any page, find og:image
# - Test with social debuggers
# - Validate schema at validator.schema.org
```

### Phase 5: GSC Submission

1. Go to https://search.google.com/search-console
2. Add property for `https://captureclient.com`
3. Submit sitemap: `https://captureclient.com/sitemap.xml`
4. Request indexing for priority pages:
   - `/`
   - `/pricing`
   - `/integrations`
   - `/demo`
   - `/contact`

---

## Guardrails Reminder

Per project rules, do NOT edit without explicit approval:
- `capture-client-site/src/components/ui/**`
- `capture-client-site/src/app/globals*.css`
- `capture-client-site/tailwind.config.ts`

---

## Files Modified This Session

| File | Change |
|------|--------|
| `src/components/navigation/navData.ts` | Added Fitness & Martial Arts to Industries |
| `src/components/integrations/ScrollToTop.tsx` | Created (new file) |
| `src/app/integrations/[slug]/page.tsx` | Added ScrollToTop import |
| `src/components/integrations/IntegrationFeatures.tsx` | Gold → blue colors |
| `src/components/integrations/IntegrationBenefits.tsx` | Gold → blue colors |
| `src/components/integrations/IntegrationCTA.tsx` | Gold → blue colors |
| `src/components/integrations/IntegrationRelated.tsx` | Gold → blue, fixed text color |
| `src/components/integrations/IntegrationHowItWorks.tsx` | Fixed background colors |

---

## Report End
