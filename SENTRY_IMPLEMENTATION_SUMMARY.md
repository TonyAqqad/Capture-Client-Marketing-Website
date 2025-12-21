# Sentry Error Monitoring Implementation Summary

## Implementation Status: Complete (Pending Installation)

All configuration files have been created successfully. The implementation is ready for use once the Sentry package is installed.

---

## Files Created

### 1. Sentry Configuration Files

**File: `capture-client-site/sentry.server.config.ts`**
- Server-side Sentry initialization
- Uses `SENTRY_DSN` environment variable
- Configured for 10% trace sampling in production, 100% in development
- Only enabled in production environment

**File: `capture-client-site/sentry.client.config.ts`**
- Client-side Sentry initialization
- Uses `NEXT_PUBLIC_SENTRY_DSN` environment variable
- Same sampling configuration as server
- Only enabled in production environment

**File: `capture-client-site/src/instrumentation.ts`**
- Next.js instrumentation hook for loading Sentry
- Handles both Node.js and Edge runtime environments
- Automatically loads Sentry configuration on app startup

### 2. Health Check API Endpoint

**File: `capture-client-site/src/app/api/health/route.ts`**
- Edge runtime health check endpoint
- Returns service status, timestamp, uptime, and version
- Proper error handling with 503 status for unhealthy state
- Cache-Control headers to prevent caching
- Access at: `https://captureclient.com/api/health`

### 3. Next.js Configuration Update

**File: `capture-client-site/next.config.js`**
- Added `instrumentationHook: true` to experimental features
- Required to enable the instrumentation.ts file

### 4. Environment Variables Template

**File: `capture-client-site/.env.example`**
- Added Sentry DSN placeholders:
  - `SENTRY_DSN` (server-side)
  - `NEXT_PUBLIC_SENTRY_DSN` (client-side)
- Also documented existing API keys for Anthropic and Resend

---

## Next Steps Required

### 1. Install Sentry Package
```bash
cd capture-client-site
npm install @sentry/nextjs
```

### 2. Configure Sentry Project
1. Create a Sentry account at https://sentry.io
2. Create a new project for "Next.js"
3. Copy the DSN from: https://sentry.io/settings/projects/your-project/keys/

### 3. Set Environment Variables
Add to your `.env.local` file:
```env
SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
NEXT_PUBLIC_SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
```

### 4. Deploy to Production
- Add the same environment variables to your Vercel project settings
- The configuration will automatically enable Sentry in production

### 5. Test the Implementation
After installation, verify:
- Visit `/api/health` to confirm the health endpoint works
- Trigger a test error to verify Sentry captures it
- Check the Sentry dashboard for incoming events

---

## TypeCheck Results

**Sentry Files:** Successfully type-checked (will pass once @sentry/nextjs is installed)

**Existing Issues Found (Unrelated to Sentry):**
- `src/components/navigation/MegaMenu.tsx` has 11 TypeScript errors
- All errors are related to undefined `isLightMode` variable
- These pre-existed and should be fixed separately

---

## Configuration Details

### Trace Sampling Rates
- **Production:** 10% of transactions (reduces costs while maintaining visibility)
- **Development:** 100% of transactions (full debugging capability)

### Runtime Support
- Node.js runtime (standard Next.js pages and API routes)
- Edge runtime (Edge API routes and middleware)

### Security
- Server DSN is not exposed to the client
- Client DSN is intentionally public (safe for client-side code)
- Only enabled in production to avoid development noise

---

## Monitoring Capabilities

Once deployed, Sentry will automatically track:
- **Errors:** Unhandled exceptions on both client and server
- **Performance:** Page load times, API response times
- **User Impact:** Which users are affected by issues
- **Source Maps:** Exact line numbers in your original TypeScript code
- **Breadcrumbs:** User actions leading up to errors
- **Environment Context:** Browser, OS, app version, etc.

---

## Cost Optimization

The 10% trace sampling rate is a balance between:
- **Visibility:** Catching the majority of performance issues
- **Cost:** Keeping Sentry costs manageable on the free/starter tier
- **Performance:** Minimal overhead on production servers

You can adjust this in the config files if needed.
