# Navigation Audit - Quick Fix Checklist

## Critical Fixes (Do These First)

### 1. Fix 500 Errors on All Pages

**Problem:** 31 of 32 pages return 500 Internal Server Error

**Check dev server logs:**
```bash
cd capture-client-site
# Look for error stack traces in the console where `npm run dev` is running
```

**Likely culprits to investigate:**

**File:** `C:\Users\eaqqa\capture-client-website-seo\capture-client-site\src\lib\data.ts`
- Lines 136-150: `getAllServices()`
- Lines 152-160: `getServiceBySlug()`
- Lines 162-176: `getAllLocations()`
- Lines 178-186: `getLocationBySlug()`

**Check if these directories exist and have JSON files:**
- `src/data/services/` ✅ (confirmed exists)
- `src/data/locations/` ✅ (confirmed exists)
- `src/data/national/` ✅ (confirmed exists)
- `src/data/packages/` ✅ (confirmed exists)

**Add try/catch error handling:**
```typescript
export async function getAllServices(): Promise<ServiceData[]> {
  try {
    const servicesDir = path.join(dataDir, 'services');
    const files = await fs.readdir(servicesDir);
    // ... rest of function
  } catch (error) {
    console.error('Error loading services:', error);
    return []; // Return empty array instead of crashing
  }
}
```

### 2. Create Custom 404 Page

**File to create:** `C:\Users\eaqqa\capture-client-website-seo\capture-client-site\src\app\not-found.tsx`

```typescript
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0F1C]">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#D4AF37] mb-4">404</h1>
        <h2 className="text-2xl text-white mb-4">Page Not Found</h2>
        <p className="text-white/60 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-[#D4AF37] text-[#0A0F1C] rounded-lg hover:bg-[#D4AF37]/90 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
```

### 3. Fix Footer URL Mismatch

**File:** `C:\Users\eaqqa\capture-client-website-seo\capture-client-site\src\components\Footer.tsx`

**Find and replace:**
```typescript
// Change:
<Link href="/privacy">Privacy Policy</Link>
// To:
<Link href="/privacy-policy">Privacy Policy</Link>

// Change:
<Link href="/terms">Terms of Service</Link>
// To:
<Link href="/terms-of-service">Terms of Service</Link>
```

### 4. Replace Broken Clearbit Logo Images

**File:** `C:\Users\eaqqa\capture-client-website-seo\capture-client-site\src\app\page.tsx`
or wherever integration logos are used

**Find all instances of:**
```typescript
https://logo.clearbit.com/{domain}
```

**Replace with:**
- Local SVG files in `public/logos/`
- Or placeholder images
- Or remove the integration logos section entirely

**Example fix:**
```typescript
// Instead of:
<img src="https://logo.clearbit.com/stripe.com" alt="Stripe" />

// Use:
<img src="/logos/stripe.svg" alt="Stripe" />
// Or just use text badges:
<div className="border border-white/20 px-4 py-2 rounded">Stripe</div>
```

---

## Secondary Fixes (Nice to Have)

### 5. Fix Header Logo Link

**File:** `C:\Users\eaqqa\capture-client-website-seo\capture-client-site\src\components\Header.tsx`

**Ensure logo is wrapped in Link:**
```typescript
import Link from 'next/link';

<Link href="/" aria-label="Capture Client Home">
  <img src="/logo-desktop.svg" alt="Capture Client Logo" />
</Link>
```

### 6. Add Breadcrumb Navigation

**Create component:** `C:\Users\eaqqa\capture-client-website-seo\capture-client-site\src\components\Breadcrumbs.tsx`

```typescript
import Link from 'next/link';

interface BreadcrumbItem {
  name: string;
  url: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center gap-2 text-sm text-white/60">
        {items.map((item, index) => (
          <li key={item.url} className="flex items-center gap-2">
            {index > 0 && <span>/</span>}
            {index === items.length - 1 ? (
              <span className="text-white">{item.name}</span>
            ) : (
              <Link href={item.url} className="hover:text-[#D4AF37]">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
```

**Add to service pages:**
```typescript
<Breadcrumbs items={[
  { name: 'Home', url: '/' },
  { name: 'Services', url: '/services' },
  { name: service.service.service_name, url: `/services/${service.service.service_slug}` },
]} />
```

### 7. Add Service Cross-Links

**File:** `C:\Users\eaqqa\capture-client-website-seo\capture-client-site\src\app\services\[slug]\page.tsx`

**Add at bottom of page:**
```typescript
<section className="py-16 bg-[#0A0F1C]/50">
  <div className="container mx-auto px-4">
    <h2 className="text-2xl font-bold text-white mb-8">Related Services</h2>
    <div className="grid md:grid-cols-3 gap-6">
      {relatedServices.map(service => (
        <Link
          key={service.slug}
          href={`/services/${service.slug}`}
          className="p-6 bg-white/5 rounded-lg hover:bg-white/10 transition"
        >
          <h3 className="text-lg font-semibold text-white mb-2">
            {service.name}
          </h3>
          <p className="text-white/60 text-sm">{service.description}</p>
        </Link>
      ))}
    </div>
  </div>
</section>
```

### 8. Standardize Phone Number Formatting

**File:** Search all components for `tel:` links

**Standardize to E.164 format:**
```typescript
// Change all to:
<a href="tel:+18653463339">(865) 346-3339</a>
```

---

## Test Command

After fixes, run audit again:

```bash
cd C:\Users\eaqqa\capture-client-website-seo\capture-client-site
npx playwright test tests/navigation-simple-audit.spec.ts --reporter=list
```

---

## File Locations Reference

### Main Files to Fix:
- **Data loading:** `src/lib/data.ts`
- **404 page:** `src/app/not-found.tsx` (create new)
- **Footer:** `src/components/Footer.tsx`
- **Header:** `src/components/Header.tsx`
- **Homepage:** `src/app/page.tsx` (for Clearbit logos)

### Test Files:
- **Full audit:** `tests/navigation-audit.spec.ts`
- **Simple audit:** `tests/navigation-simple-audit.spec.ts`

### Data Files (confirmed exist):
- `src/data/services/*.json` ✅
- `src/data/locations/*.json` ✅
- `src/data/national/*.json` ✅
- `src/data/packages/*.json` ✅

---

## Priority Order

1. Fix 500 errors (CRITICAL - site is unusable)
2. Create 404 page (HIGH)
3. Fix footer links (HIGH)
4. Replace Clearbit logos (MEDIUM)
5. Fix logo link (MEDIUM)
6. Add breadcrumbs (LOW)
7. Add service cross-links (LOW)
8. Standardize phone formatting (LOW)

---

**Current Status:** ❌ NOT READY FOR DEPLOYMENT

**After Fixes:** Re-run tests and expect:
- ✅ All 32 pages return 200
- ✅ 404 page works
- ✅ Footer links work
- ✅ No broken images
- ✅ Logo links to homepage
