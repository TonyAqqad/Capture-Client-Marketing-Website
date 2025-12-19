# Quick Reference: Fix WHO-WE-SERVE & INTEGRATIONS 404 Errors

## Problem
Next.js 16 breaking change: Dynamic route params are now async Promises.

## Impact
- ❌ `/who-we-serve/legal-law-firms` → 404
- ❌ `/who-we-serve/healthcare` → 404
- ❌ `/who-we-serve/*` (all 12 industry pages) → 404
- ❌ `/integrations/calendly` → 404
- ❌ `/integrations/hubspot` → 404
- ❌ `/integrations/*` (all integration pages) → 404

## Files to Fix

1. `capture-client-site/src/app/who-we-serve/[slug]/page.tsx`
2. `capture-client-site/src/app/integrations/[slug]/page.tsx`

---

## File 1: `/who-we-serve/[slug]/page.tsx`

### Change 1: Interface (Lines 10-14)

```diff
interface IndustryPageProps {
-  params: {
-    slug: string;
-  };
+  params: Promise<{
+    slug: string;
+  }>;
}
```

### Change 2: generateMetadata (Lines 24-25)

```diff
export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
-  const industry = getIndustryBySlug(params.slug);
+  const { slug } = await params;
+  const industry = getIndustryBySlug(slug);
```

### Change 3: Page Component (Lines 64-65)

```diff
-export default function IndustryPage({ params }: IndustryPageProps) {
-  const industry = getIndustryBySlug(params.slug);
+export default async function IndustryPage({ params }: IndustryPageProps) {
+  const { slug } = await params;
+  const industry = getIndustryBySlug(slug);
```

**Note**: The component signature changes from `function` to `async function`.

---

## File 2: `/integrations/[slug]/page.tsx`

### Change 1: Interface (Lines 15-19)

```diff
interface IntegrationDetailPageProps {
-  params: {
-    slug: string;
-  };
+  params: Promise<{
+    slug: string;
+  }>;
}
```

### Change 2: generateMetadata (Lines 34-37)

```diff
export async function generateMetadata({
  params,
}: IntegrationDetailPageProps): Promise<Metadata> {
-  const integration = getIntegrationBySlug(params.slug);
+  const { slug } = await params;
+  const integration = getIntegrationBySlug(slug);
```

### Change 3: Page Component (Lines 103-106)

```diff
-export default function IntegrationDetailPage({
+export default async function IntegrationDetailPage({
  params,
}: IntegrationDetailPageProps) {
-  const integration = getIntegrationBySlug(params.slug);
+  const { slug } = await params;
+  const integration = getIntegrationBySlug(slug);
```

---

## Testing After Fix

```bash
# 1. Clean build
cd capture-client-site
rm -rf .next
npm run build

# 2. TypeScript check
npx tsc --noEmit

# 3. Start production server
npm run start

# 4. Test industry pages
curl http://localhost:3000/who-we-serve/legal-law-firms
curl http://localhost:3000/who-we-serve/healthcare
curl http://localhost:3000/who-we-serve/home-services

# 5. Test integration pages
curl http://localhost:3000/integrations/calendly
curl http://localhost:3000/integrations/hubspot
curl http://localhost:3000/integrations/salesforce
```

All should return **200 OK** instead of **404 Not Found**.

---

## Why This Happens

**Next.js 15 (old)**:
```typescript
// params was synchronous
function Page({ params }: { params: { slug: string } }) {
  const value = params.slug; // ✅ Works
}
```

**Next.js 16 (new)**:
```typescript
// params is now a Promise
async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // ✅ Must await
  const value = slug;
}
```

This breaking change improves performance by allowing Next.js to stream params asynchronously, but requires code updates.

---

## Deployment Checklist

- [ ] Fix `who-we-serve/[slug]/page.tsx` (3 changes)
- [ ] Fix `integrations/[slug]/page.tsx` (3 changes)
- [ ] Run `npm run build` - verify success
- [ ] Run `npx tsc --noEmit` - zero errors
- [ ] Test 3+ industry pages locally
- [ ] Test 3+ integration pages locally
- [ ] Deploy to production
- [ ] Verify on production: `/who-we-serve/legal-law-firms`
- [ ] Verify on production: `/integrations/hubspot`

---

## Total Changes

- **2 files**
- **6 total changes** (3 per file)
- **5 minutes** to implement
- **Critical severity** (breaks 24+ pages)

Fix immediately before deployment.
