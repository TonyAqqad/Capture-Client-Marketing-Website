# Integration Dynamic Route 404 Analysis - CRITICAL FIX REQUIRED

## Issue Summary

**Problem**: `/integrations/hubspot` and all other integration detail pages return 404 on production deployment, despite the main `/integrations` page working correctly.

**Root Cause**: Next.js 16.x requires `params` to be **awaited** in dynamic route components. The current implementation does not await params, causing the pages to fail at runtime.

---

## Technical Analysis

### Current Code Structure

**File**: `capture-client-site/src/app/integrations/[slug]/page.tsx`

```typescript
// CURRENT IMPLEMENTATION (BROKEN on Next.js 16)
export default function IntegrationDetailPage({
  params,
}: IntegrationDetailPageProps) {
  const integration = getIntegrationBySlug(params.slug);  // ❌ params.slug accessed synchronously

  if (!integration) {
    notFound();
  }

  // ... rest of component
}

// ALSO BROKEN in generateMetadata
export async function generateMetadata({
  params,
}: IntegrationDetailPageProps): Promise<Metadata> {
  const integration = getIntegrationBySlug(params.slug);  // ❌ params.slug accessed synchronously

  // ... rest of function
}
```

### Why This Fails on Next.js 16

**Next.js 15+ Breaking Change**:
- In Next.js 15 and above, `params` is now a **Promise** that must be awaited
- This is part of the gradual async transition to support React Server Components better
- The old synchronous `params.slug` pattern no longer works

**Build vs Runtime Behavior**:
- ✅ **Build time**: `generateStaticParams()` works correctly - all pages are generated (confirmed by `.next/server/app/integrations/hubspot.html` existing)
- ❌ **Runtime**: When accessing the page, `params.slug` is undefined because it wasn't awaited, causing `getIntegrationBySlug()` to return undefined, triggering `notFound()`

---

## Evidence from Build Output

**Build artifacts confirm pages ARE being generated**:

```bash
$ ls .next/server/app/integrations/
hubspot.html          # ✅ File exists
hubspot.meta          # ✅ Metadata exists
hubspot.rsc           # ✅ React Server Component exists
salesforce.html       # ✅ All 65+ integrations built successfully
calendly.html
zapier.html
# ... 65+ total integration pages
```

**This proves**:
1. ✅ `generateStaticParams()` is working correctly
2. ✅ Data is being read from `integrations.ts` successfully
3. ✅ Pages are being pre-rendered at build time
4. ❌ Runtime hydration/routing is failing due to async params

---

## The Exact Fix Required

### Fix #1: Update page.tsx Component

```typescript
// FIXED IMPLEMENTATION for Next.js 16
export default async function IntegrationDetailPage({
  params,
}: IntegrationDetailPageProps) {
  const { slug } = await params;  // ✅ MUST AWAIT params
  const integration = getIntegrationBySlug(slug);

  if (!integration) {
    notFound();
  }

  const category = getCategoryById(integration.category);
  const relatedIntegrations = getIntegrationsByCategory(integration.category)
    .filter((int) => int.slug !== integration.slug)
    .slice(0, 4);

  // ... rest of component (no changes needed below this point)
}
```

### Fix #2: Update generateMetadata Function

```typescript
// FIXED IMPLEMENTATION for Next.js 16
export async function generateMetadata({
  params,
}: IntegrationDetailPageProps): Promise<Metadata> {
  const { slug } = await params;  // ✅ MUST AWAIT params
  const integration = getIntegrationBySlug(slug);

  if (!integration) {
    return {
      title: "Integration Not Found | Capture Client",
      description: "The requested integration could not be found.",
    };
  }

  // ... rest of function (no changes needed below this point)
}
```

### Fix #3: Update TypeScript Interface (Optional but Recommended)

```typescript
// UPDATED INTERFACE to reflect Next.js 16 behavior
interface IntegrationDetailPageProps {
  params: Promise<{  // ✅ Explicitly type as Promise
    slug: string;
  }>;
}
```

---

## Why This Wasn't Caught Earlier

1. **TypeScript doesn't catch this**: The types allow both synchronous and async access patterns during the Next.js 15->16 transition period
2. **Build succeeds**: Static generation works because `generateStaticParams()` provides all slugs at build time
3. **Dev mode might work**: Next.js dev mode has different hydration behavior than production
4. **Only fails on production**: The issue only manifests when actually routing to the page in production

---

## Related Files That May Need Similar Fixes

Check these other dynamic routes for the same pattern:

```bash
# Search for other dynamic routes that might have the same issue
$ grep -r "params\.slug" capture-client-site/src/app/

# Likely affected files:
- src/app/who-we-serve/[industry]/page.tsx
- src/app/locations/[state]/[city]/page.tsx
- src/app/blog/[slug]/page.tsx
- Any other [slug] or [param] routes
```

---

## Deployment Checklist

Before redeploying:

- [ ] Update `IntegrationDetailPage` component to await params
- [ ] Update `generateMetadata` function to await params
- [ ] Update TypeScript interface to reflect Promise type
- [ ] Search for and fix other dynamic routes with same pattern
- [ ] Run `npm run build` locally to verify build succeeds
- [ ] Test dynamic routes in production build: `npm run start`
- [ ] Commit and push changes
- [ ] Verify `/integrations/hubspot` works on production after deployment

---

## Testing Commands

```bash
# 1. Clean build
cd capture-client-site
rm -rf .next
npm run build

# 2. Start production server locally
npm run start

# 3. Test integration pages (in browser or curl)
curl http://localhost:3000/integrations/hubspot
curl http://localhost:3000/integrations/salesforce
curl http://localhost:3000/integrations/calendly

# Expected: All should return 200 OK with full HTML content
# NOT: 404 errors
```

---

## Summary for Deployment

**What's broken**:
- Synchronous access to `params.slug` in Next.js 16 dynamic routes

**Why it's broken**:
- Next.js 16 requires `params` to be awaited (breaking change from Next.js 14)

**The fix**:
- Change `params.slug` to `const { slug } = await params` in both the component and `generateMetadata`

**Estimated fix time**:
- 2 minutes to update the code
- 5 minutes to test locally
- Deploy and verify

**Files to modify**:
1. `capture-client-site/src/app/integrations/[slug]/page.tsx` (CRITICAL)
2. Check and fix other `[param]` routes across the app

---

## Additional Context

The build output shows **65+ integration pages successfully built**, so the data structure, `generateStaticParams()`, and static generation are all working perfectly. This is purely a runtime hydration issue caused by the Next.js 16 async params requirement.

Once the async/await pattern is fixed, all integration pages will work immediately because the pre-rendered HTML already exists - it's just not being hydrated correctly due to the synchronous params access.
