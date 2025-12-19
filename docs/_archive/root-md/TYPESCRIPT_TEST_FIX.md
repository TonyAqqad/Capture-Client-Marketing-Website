# TypeScript Test File Fix

## Issue: Index Signature Error in `navigation-audit.spec.ts`

**Lines Affected:** 47, 50, 58, 62

### Current Code (Lines 22-27):
```typescript
const results = {
  'Voice AI': { expected: '/services/voice-ai', status: '' },
  'Google Ads': { expected: '/services/google-ads', status: '' },
  'Facebook Ads': { expected: '/services/facebook-ads', status: '' },
  'Lead Generation': { expected: '/services/lead-generation', status: '' },
};
```

### Problem:
When accessing `results[serviceName].status = 'WORKS'`, TypeScript doesn't know that `serviceName` (a string from `Object.entries()`) is a valid key.

---

## Fix: Add Type Annotation

### Option 1 - Record Type (Recommended):
```typescript
const results: Record<string, { expected: string; status: string }> = {
  'Voice AI': { expected: '/services/voice-ai', status: '' },
  'Google Ads': { expected: '/services/google-ads', status: '' },
  'Facebook Ads': { expected: '/services/facebook-ads', status: '' },
  'Lead Generation': { expected: '/services/lead-generation', status: '' },
};
```

### Option 2 - String Literal Union (Most Type-Safe):
```typescript
type ServiceName = 'Voice AI' | 'Google Ads' | 'Facebook Ads' | 'Lead Generation';
type ServiceResult = { expected: string; status: string };

const results: Record<ServiceName, ServiceResult> = {
  'Voice AI': { expected: '/services/voice-ai', status: '' },
  'Google Ads': { expected: '/services/google-ads', status: '' },
  'Facebook Ads': { expected: '/services/facebook-ads', status: '' },
  'Lead Generation': { expected: '/services/lead-generation', status: '' },
};
```

### Option 3 - Type Assertion (Quick Fix):
```typescript
// Keep existing code, just cast when accessing:
(results as Record<string, { expected: string; status: string }>)[serviceName].status = 'WORKS';
```

---

## Recommended Fix (Option 1):

**File:** `capture-client-site/tests/navigation-audit.spec.ts`

**Change Line 22-27 to:**
```typescript
const results: Record<string, { expected: string; status: string }> = {
  'Voice AI': { expected: '/services/voice-ai', status: '' },
  'Google Ads': { expected: '/services/google-ads', status: '' },
  'Facebook Ads': { expected: '/services/facebook-ads', status: '' },
  'Lead Generation': { expected: '/services/lead-generation', status: '' },
};
```

**Why Option 1?**
- Simple one-line change
- No code refactoring needed
- Type-safe access to results
- Standard TypeScript pattern

---

## How to Apply:

```bash
# Navigate to project
cd C:/Users/eaqqa/capture-client-website-seo/capture-client-site

# Edit file (manual or script)
# Replace line 22 with the typed version above

# Verify fix works
npx tsc --noEmit
# Should now pass with 0 errors
```

---

**Status:** Non-critical (test file only)
**Impact:** Low (doesn't affect production build)
**Effort:** 30 seconds
**Priority:** Optional
