# WHO-WE-SERVE Dynamic Route 404 Issue - Technical Analysis

## Executive Summary

**CRITICAL ISSUE IDENTIFIED**: Next.js 16 introduced a breaking change where **dynamic route params are now async by default**. The `/who-we-serve/[slug]` route is 404ing in production because the code is treating `params` as synchronous when Next.js 16 requires it to be awaited.

## Root Cause Analysis

### 1. Next.js Version Breaking Change

**Current Version**: `next@16.0.7`

**Breaking Change in Next.js 16**:
- Dynamic route params are now **Promise-based** and must be **awaited**
- The old synchronous `params` access no longer works in production builds
- This affects both `generateStaticParams` and the page component itself

### 2. Current Code Issues

**File**: `capture-client-site/src/app/who-we-serve/[slug]/page.tsx`

#### Problem 1: Synchronous params access in generateMetadata (Line 24-25)

```typescript
// CURRENT CODE (BROKEN in Next.js 16):
export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const industry = getIndustryBySlug(params.slug); // ❌ params.slug is a Promise!
  // ...
}
```

**Issue**: `params.slug` is a Promise in Next.js 16, but the code is trying to access it synchronously.

#### Problem 2: Synchronous params access in page component (Line 65)

```typescript
// CURRENT CODE (BROKEN in Next.js 16):
export default function IndustryPage({ params }: IndustryPageProps) {
  const industry = getIndustryBySlug(params.slug); // ❌ params.slug is a Promise!
  // ...
}
```

**Issue**: Same problem - `params.slug` needs to be awaited.

#### Problem 3: Interface Definition (Lines 10-14)

```typescript
// CURRENT CODE (INCORRECT for Next.js 16):
interface IndustryPageProps {
  params: {
    slug: string; // ❌ Should be Promise<{ slug: string }>
  };
}
```

### 3. Build Evidence

The build successfully generates static files:
```bash
.next/server/app/who-we-serve/
├── legal-law-firms.html       ✅ File exists
├── home-services.html         ✅ File exists
├── healthcare.html            ✅ File exists
└── [slug]/page.js             ✅ Dynamic route exists
```

**BUT**: The routing fails in production because the params aren't being awaited properly.

### 4. Why It Works in Development but Not Production

- **Development mode**: Next.js is more forgiving with type coercion
- **Production mode**: Strict async handling is enforced
- **Build process**: Static files are generated, but the runtime routing logic fails

## The Fix

### Required Changes to `capture-client-site/src/app/who-we-serve/[slug]/page.tsx`

#### Step 1: Update the interface

```typescript
// OLD (Line 10-14):
interface IndustryPageProps {
  params: {
    slug: string;
  };
}

// NEW:
interface IndustryPageProps {
  params: Promise<{
    slug: string;
  }>;
}
```

#### Step 2: Fix generateMetadata

```typescript
// OLD (Line 24-25):
export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const industry = getIndustryBySlug(params.slug);

// NEW:
export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params; // ✅ Await the params Promise
  const industry = getIndustryBySlug(slug);
```

#### Step 3: Fix the page component

```typescript
// OLD (Line 64-65):
export default function IndustryPage({ params }: IndustryPageProps) {
  const industry = getIndustryBySlug(params.slug);

// NEW:
export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params; // ✅ Await the params Promise
  const industry = getIndustryBySlug(slug);
```

**Note**: The component itself must be marked as `async` to use `await`.

#### Step 4: Fix generateStaticParams (Already correct)

The `generateStaticParams` function is actually **correct** because it doesn't receive params - it generates them:

```typescript
// Line 17-21 (ALREADY CORRECT):
export async function generateStaticParams() {
  return INDUSTRIES.map((industry) => ({
    slug: industry.slug,
  }));
}
```

## Complete Fixed Code

Here's the complete fixed version of the critical sections:

```typescript
interface IndustryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all industries
export async function generateStaticParams() {
  return INDUSTRIES.map((industry) => ({
    slug: industry.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params; // ✅ FIXED
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    return {
      title: 'Industry Not Found',
    };
  }

  const title = `${industry.name} AI Voice Agent | ${industry.tagline}`;
  const description = `${industry.description} Trusted by ${industry.category.toLowerCase()} businesses for 24/7 lead capture, appointment booking, and customer service automation.`;

  return {
    title,
    description,
    keywords: [
      `${industry.name.toLowerCase()} ai receptionist`,
      `${industry.name.toLowerCase()} virtual receptionist`,
      `${industry.name.toLowerCase()} answering service`,
      `${industry.name.toLowerCase()} call automation`,
      `ai for ${industry.name.toLowerCase()}`,
      '24/7 call answering',
      'lead capture automation',
      'appointment scheduling ai',
    ],
    openGraph: {
      title,
      description,
      images: [
        {
          url: industry.heroImage,
          width: 1200,
          height: 630,
          alt: `${industry.name} AI Voice Agent`,
        },
      ],
    },
  };
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params; // ✅ FIXED
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    notFound();
  }

  // Rest of the component remains the same...
```

## Testing Checklist

After applying the fix:

1. ✅ Build succeeds: `npm run build`
2. ✅ TypeScript checks pass: `npx tsc --noEmit`
3. ✅ Static files generated in `.next/server/app/who-we-serve/`
4. ✅ Production server works: `npm run start`
5. ✅ Navigate to `/who-we-serve/legal-law-firms` - should load
6. ✅ Navigate to `/who-we-serve/healthcare` - should load
7. ✅ Check all 12 industry pages load correctly

## Related Files That Need the Same Fix

**CONFIRMED**: The following files have the EXACT SAME ISSUE:

### 1. ✅ `/who-we-serve/[slug]/page.tsx` (PRIMARY ISSUE)
- **Lines 10-14**: Interface definition with synchronous params
- **Line 25**: `params.slug` accessed synchronously in generateMetadata
- **Line 65**: `params.slug` accessed synchronously in page component

### 2. ✅ `/integrations/[slug]/page.tsx` (SAME ISSUE)
- **Lines 15-19**: Interface definition with synchronous params
- **Line 37**: `params.slug` accessed synchronously in generateMetadata
- **Line 106**: `params.slug` accessed synchronously in page component

Both files need the EXACT SAME FIX pattern.

## References

- [Next.js 16 Release Notes - Async Params](https://nextjs.org/docs/app/api-reference/file-conventions/page#params)
- [Next.js 16 Migration Guide](https://nextjs.org/docs/app/building-your-application/upgrading/version-16)
- [TypeScript in Next.js Dynamic Routes](https://nextjs.org/docs/app/api-reference/file-conventions/page#typescript)

## Summary

**Issue**: Next.js 16 breaking change - params are now async Promises
**Impact**: All 12 industry pages returning 404 in production
**Fix Complexity**: Low - 3 line changes
**Fix Time**: 5 minutes
**Risk Level**: Low - well-documented Next.js pattern

The fix is simple but critical. Without it, all WHO-WE-SERVE industry pages are completely inaccessible in production.
