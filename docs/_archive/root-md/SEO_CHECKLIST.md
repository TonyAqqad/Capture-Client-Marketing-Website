# SEO Optimization Checklist
**Project:** Capture Client - Integrations & Industries Pages
**Total Pages:** 72 pages (58 integrations + 12 industries + 2 hubs)

---

## Status Overview

**Completed:** 1/4 tasks (25%)
**Remaining:** 3/4 tasks (75%)
**Estimated Time Remaining:** 2-3 hours

---

## Task Checklist

### Phase 1: Sitemap Optimization
- [x] **COMPLETED:** Add integration pages to sitemap.ts (58 detail + 1 hub)
- [x] **COMPLETED:** Add industry pages to sitemap.ts (12 detail + 1 hub)
- [x] **COMPLETED:** Set proper priority levels (0.7-0.85)
- [x] **COMPLETED:** Set changeFrequency (monthly/weekly)
- [x] **COMPLETED:** Verify sitemap compiles without errors

**Status:** ✅ 100% COMPLETE

---

### Phase 2: Internal Linking
- [ ] **TODO:** Make related integration links clickable on industry pages
  - **File:** `src/app/who-we-serve/[slug]/page.tsx`
  - **Line:** 432-438
  - **Change:** Wrap div in Link component
  - **Time:** 15 minutes
  - **Impact:** SEO link juice + better UX

**Status:** ⚠️ 0% COMPLETE

---

### Phase 3: BreadcrumbList Schema - Integration Pages
- [ ] **TODO:** Add BreadcrumbList schema to integration detail pages
  - **File:** `src/app/integrations/[slug]/page.tsx`
  - **Location:** After line 167 (after howToSchema)
  - **Lines to Add:** ~30 lines
  - **Time:** 45 minutes
  - **Impact:** Rich breadcrumbs in Google search results (+15-25% CTR)

**Status:** ⚠️ 0% COMPLETE

---

### Phase 4: BreadcrumbList Schema - Industry Pages
- [ ] **TODO:** Add BreadcrumbList schema to industry detail pages
  - **File:** `src/app/who-we-serve/[slug]/page.tsx`
  - **Location:** After line 105 (after serviceSchema)
  - **Lines to Add:** ~30 lines
  - **Time:** 45 minutes
  - **Impact:** Rich breadcrumbs in Google search results (+15-25% CTR)

**Status:** ⚠️ 0% COMPLETE

---

### Phase 5: Testing & Validation
- [ ] **TODO:** Test build (`npm run build`)
- [ ] **TODO:** Test in dev mode (`npm run dev`)
- [ ] **TODO:** Verify clickable links work
- [ ] **TODO:** Validate BreadcrumbList schema (validator.schema.org)
- [ ] **TODO:** Test Google Rich Results (search.google.com/test/rich-results)

**Status:** ⚠️ 0% COMPLETE

---

### Phase 6: Deployment
- [ ] **TODO:** Commit changes with descriptive message
- [ ] **TODO:** Push to production
- [ ] **TODO:** Submit sitemap to Google Search Console
- [ ] **TODO:** Monitor indexation in GSC Coverage Report

**Status:** ⚠️ 0% COMPLETE

---

## Priority Order

1. **HIGH PRIORITY** (Complete today)
   - [ ] Make integration links clickable (15 min)
   - [ ] Add BreadcrumbList to integration pages (45 min)
   - [ ] Add BreadcrumbList to industry pages (45 min)

2. **MEDIUM PRIORITY** (Complete this week)
   - [ ] Test and validate (30 min)
   - [ ] Deploy to production (15 min)

3. **LOW PRIORITY** (Complete next week)
   - [ ] Submit sitemap to GSC (5 min)
   - [ ] Monitor indexation (ongoing)

---

## Quick Reference - Files to Modify

### File 1: Industry Detail Pages
**Path:** `src/app/who-we-serve/[slug]/page.tsx`

**Changes Needed:**
1. Add Link import at top
2. Make integration links clickable (line 432)
3. Add breadcrumbSchema after serviceSchema (line 105)
4. Update JsonLd component to include breadcrumbSchema

**Time:** 1 hour

---

### File 2: Integration Detail Pages
**Path:** `src/app/integrations/[slug]/page.tsx`

**Changes Needed:**
1. Add breadcrumbSchema after howToSchema (line 167)
2. Add script tag in JSX (after line 185)

**Time:** 45 minutes

---

## Code Snippets (Copy-Paste Ready)

### Snippet 1: Clickable Integration Links
**File:** `src/app/who-we-serve/[slug]/page.tsx`
**Line:** 432

```tsx
import Link from 'next/link'; // Add at top if not present

{industry.relatedIntegrations.map((integrationSlug, index) => (
  <Link
    key={index}
    href={`/integrations/${integrationSlug}`}
    className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-foreground font-semibold hover:border-accent-500/50 hover:bg-white/15 transition-all duration-300 inline-block"
  >
    {integrationSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
  </Link>
))}
```

---

### Snippet 2: BreadcrumbList for Integration Pages
**File:** `src/app/integrations/[slug]/page.tsx`
**Location:** After line 167

```tsx
// BreadcrumbList Schema
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://captureclientai.net"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Integrations",
      "item": "https://captureclientai.net/integrations"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": integration.name,
      "item": `https://captureclientai.net/integrations/${integration.slug}`
    }
  ]
};
```

**Add after line 185:**
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
/>
```

---

### Snippet 3: BreadcrumbList for Industry Pages
**File:** `src/app/who-we-serve/[slug]/page.tsx`
**Location:** After line 105

```tsx
// BreadcrumbList schema
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  'itemListElement': [
    {
      '@type': 'ListItem',
      'position': 1,
      'name': 'Home',
      'item': `${SITE_CONFIG.url}`
    },
    {
      '@type': 'ListItem',
      'position': 2,
      'name': 'Industries We Serve',
      'item': `${SITE_CONFIG.url}/who-we-serve`
    },
    {
      '@type': 'ListItem',
      'position': 3,
      'name': industry.name,
      'item': `${SITE_CONFIG.url}/who-we-serve/${industry.slug}`
    }
  ]
};
```

**Update line 109:**
```tsx
<JsonLd schema={[pageSchema, serviceSchema, breadcrumbSchema]} />
```

---

## Testing Commands

```bash
# Navigate to project
cd C:/Users/eaqqa/capture-client-website-seo/capture-client-site

# Test build (must pass with no errors)
npm run build

# Test in dev mode
npm run dev

# Visit test pages
# http://localhost:3000/who-we-serve/legal-law-firms
# http://localhost:3000/integrations/stripe
```

---

## Validation URLs

- **Schema Validator:** https://validator.schema.org/
- **Rich Results Test:** https://search.google.com/test/rich-results
- **Google Search Console:** https://search.google.com/search-console

---

## Success Criteria

### Immediate
- [ ] Build passes without TypeScript errors
- [ ] Integration links are clickable on industry pages
- [ ] BreadcrumbList appears in page source (view-source)
- [ ] Schema validates without errors

### Week 1
- [ ] Deployed to production
- [ ] Sitemap submitted to GSC
- [ ] No 404 errors in GSC

### Week 2-4
- [ ] 70 pages appear in GSC Coverage Report
- [ ] Breadcrumbs show in Rich Results Test
- [ ] Indexation progress > 50%

### Month 2-3
- [ ] 50+ pages fully indexed
- [ ] First keyword rankings appear
- [ ] Organic traffic begins

### Month 4-6
- [ ] 70-100 keywords in top 10
- [ ] 6,000-10,000 monthly visits
- [ ] 180-300 monthly leads

---

## Time Estimate Breakdown

| Task | Time | Status |
|------|------|--------|
| Add pages to sitemap | 30 min | ✅ DONE |
| Make links clickable | 15 min | ⚠️ TODO |
| Add breadcrumbs (integrations) | 45 min | ⚠️ TODO |
| Add breadcrumbs (industries) | 45 min | ⚠️ TODO |
| Testing & validation | 30 min | ⚠️ TODO |
| Deployment | 15 min | ⚠️ TODO |
| **TOTAL** | **3 hours** | **25% COMPLETE** |

---

## Risk Mitigation

### Build Errors
- **Risk:** TypeScript compilation errors
- **Mitigation:** Test incrementally after each change

### Schema Errors
- **Risk:** Invalid JSON-LD causing rich result penalties
- **Mitigation:** Validate at validator.schema.org before deployment

### Link Errors
- **Risk:** Broken integration links
- **Mitigation:** Test clicking all links in dev mode

---

## Next Action

**Start with:** Make integration links clickable (15 minutes)
**Why:** Quickest win, immediate SEO + UX improvement
**File:** `src/app/who-we-serve/[slug]/page.tsx`
**Line:** 432

---

**Checklist Created By:** Claude Code SEO Specialist
**Date:** December 4, 2025
**Last Updated:** December 4, 2025
