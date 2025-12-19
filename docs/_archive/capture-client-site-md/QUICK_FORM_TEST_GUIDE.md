# Quick Form Testing Guide

## Run All Form Tests
```bash
cd capture-client-site
npx playwright test tests/ghl-webhook-form-testing.spec.ts --reporter=list
```

## Run Specific Tests

### Check GHL Configuration
```bash
npx playwright test tests/ghl-webhook-form-testing.spec.ts -g "Webhook Configuration"
```

### Find All Forms
```bash
npx playwright test tests/ghl-webhook-form-testing.spec.ts -g "Form Discovery"
```

### Test Contact Page
```bash
npx playwright test tests/ghl-webhook-form-testing.spec.ts -g "Contact Page"
```

### Test Service Pages
```bash
npx playwright test tests/ghl-webhook-form-testing.spec.ts -g "Service Page"
```

## Quick Health Check
```bash
curl http://localhost:3004/api/submit-lead
```

Expected response:
```json
{
  "healthy": true,
  "timestamp": "2025-12-06T...",
  "config": {
    "ghlConfigured": true,
    "resendConfigured": false
  },
  "pendingFailedLeads": 0
}
```

## Manual Form Test

1. **Open Contact Page**: http://localhost:3004/contact
2. **Fill Form**:
   - Name: Test User
   - Email: test@example.com
   - Phone: (865) 555-1234
   - Service: Voice AI
   - Message: Test submission
3. **Submit**
4. **Expected**:
   - Button shows "Submitting..."
   - Success message appears
   - Check server logs for: `[submit-lead] ✅ SUCCESS`
   - Check GHL dashboard for new lead

## Check Failed Leads
```bash
cat data/failed-leads.json
```

## Server Logs

Look for these prefixes:
- ✅ `SUCCESS` - Submitted to GHL
- ⚠️ `WARNING` - Non-critical issue
- 💾 `FALLBACK` - Saved locally (GHL failed)
- 🚨 `FAILURE` - Critical error

## Forms Found on Site

**Lead Capture Forms** (send to GHL):
- Contact page: ✅ Working
- Voice AI service: ✅ Working
- Google Ads service: ✅ Working
- Facebook Ads service: ✅ Working
- Homepage: ⚠️ Needs investigation

**Other Forms** (search/filter, no GHL):
- Integration search
- Navigation search
- Site search

## Known Issues

1. **Homepage form**: Submit button disabled
2. **Email notifications**: RESEND_API_KEY not set (optional)

## Quick Fixes

### Issue: "ghlConfigured: false"
**Fix**: Add to `.env.local`:
```
GOHIGHLEVEL_WEBHOOK_URL=https://services.leadconnectorhq.com/hooks/YOUR_WEBHOOK_ID
```

### Issue: "No forms found"
**Check**: Dev server running on port 3004
```bash
netstat -ano | findstr :3004
```

### Issue: Rate limiting (429 error)
**Wait**: 60 seconds between submissions (5 req/min limit)

## Test Reports

After running tests, view HTML report:
```bash
npx playwright show-report
```

## Files to Check

- **Test Suite**: `tests/ghl-webhook-form-testing.spec.ts`
- **API Route**: `src/app/api/submit-lead/route.ts`
- **Lead Form**: `src/components/LeadCaptureForm.tsx`
- **Contact Page**: `src/app/contact/ContactPageClient.tsx`
- **Test Results**: `GHL_WEBHOOK_TEST_RESULTS.md`
- **Summary**: `GHL_WEBHOOK_FORM_TEST_SUMMARY.md`

## Production Readiness

- ✅ GHL webhook: Configured
- ✅ Contact form: Working
- ✅ Service forms: Working
- ⚠️ Homepage form: Needs fix
- ❌ Email notifications: Not configured

**Status**: Ready for production (fix homepage form first)
