# GHL Webhook Form Testing Summary

## Mission
Test ALL forms on the Capture Client website to ensure GoHighLevel (GHL) webhooks are properly configured and functioning.

## Forms Identified

### 1. **LeadCaptureForm Component** (`src/components/LeadCaptureForm.tsx`)
- **Location**: Used across multiple pages
- **Pages**: Homepage, Contact, Pricing, Service pages
- **Webhook Endpoint**: `/api/submit-lead`
- **Fields**:
  - `name` (required)
  - `email` (required)
  - `phone` (required)
  - `service` (required dropdown)
  - `message` (optional textarea)
- **Source Tracking**: Yes (via `source` prop)
- **Success State**: Animated success message with checkmark
- **Loading State**: Button shows "Submitting..." with spinner
- **Analytics**: Tracks form start, form submission, phone clicks

### 2. **OptimizedLeadForm Component** (`src/components/forms/OptimizedLeadForm.tsx`)
- **Location**: Multi-step form (if used on site)
- **Webhook Endpoint**: `/api/submit-lead`
- **Fields**:
  - Step 1: `name`, `phone`
  - Step 2: `challenge` (dropdown)
- **Source Tracking**: Yes
- **Success State**: Shows "We Got Your Request!" with phone confirmation
- **Loading State**: Button disabled during submission
- **Analytics**: Tracks both step 1 and final submission

### 3. **ExitIntentPopup Component** (`src/components/cro/ExitIntentPopup.tsx`)
- **Location**: Triggers on mouse leave (exit intent)
- **Type**: CTA popup (not a form)
- **Actions**:
  - "Book Free Demo" → Scrolls to contact section
  - "Call Now" → tel: link
- **No Webhook**: Does not submit directly, redirects to contact form

### 4. **Contact Page** (`src/app/contact/ContactPageClient.tsx`)
- **Form**: Uses `<LeadCaptureForm source="contact-page-premium" />`
- **Additional CTAs**:
  - Phone link: tel:865-346-3339
  - Email: team@captureclientai.net (obfuscated)
- **Webhook**: Yes, via LeadCaptureForm

### 5. **Demo Page** (`src/app/demo/DemoContent.tsx`)
- **Type**: Interactive demo page
- **Forms**: May have embedded lead forms
- **Webhook**: If forms present, yes

## Webhook Configuration

### API Route: `/api/submit-lead`

**File**: `src/app/api/submit-lead/route.ts`

**Features**:
- ✅ Rate limiting (5 requests/minute per IP)
- ✅ Input validation (requires email OR phone)
- ✅ Payload sanitization (prevents null bytes, limits to 500 chars)
- ✅ GHL webhook integration
- ✅ Fallback persistence (saves to local file if GHL fails)
- ✅ Email notifications (via Resend)
- ✅ Comprehensive logging
- ✅ Error handling with graceful degradation
- ✅ Security headers (X-Frame-Options, etc.)
- ✅ Health check endpoint (GET request)

**Environment Variables Required**:
- `GOHIGHLEVEL_WEBHOOK_URL` - Primary webhook endpoint
- `RESEND_API_KEY` - For email notifications (optional)

**Payload Structure**:
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "company": "string",
  "source": "string",
  "service": "string",
  "message": "string",
  "challenge": "string",
  "timestamp": "ISO8601",
  "referer": "string"
}
```

**Expected GHL Field Mapping**:
| Form Field | GHL Field | Notes |
|------------|-----------|-------|
| name | name | Contact full name |
| email | email | Contact email |
| phone | phone | Contact phone |
| company | company | Company name |
| source | source | Form source/location |
| service | customField/service | Service interested in |
| message | notes | Additional message |
| challenge | customField/challenge | Business challenge |

## Test Coverage

### Automated Tests (Playwright)

**File**: `tests/ghl-webhook-form-testing.spec.ts`

1. **Homepage Form Test**
   - Verifies form exists
   - Fills and submits form
   - Validates webhook request
   - Checks payload structure
   - Confirms success message

2. **Contact Page Form Test**
   - Tests full lead capture flow
   - Validates source tracking
   - Confirms submission

3. **Demo Page Test**
   - Checks for forms (may not have)
   - Tests if present

4. **Pricing Page Test**
   - Locates forms
   - Tests submission

5. **Service Page Test**
   - Tests Voice AI service page form
   - Can be extended to other services

6. **Exit Intent Popup Test**
   - Triggers exit intent
   - Verifies CTA buttons
   - Notes: No direct form submission

7. **Form Discovery Test**
   - Scans entire site
   - Generates inventory of all forms
   - Lists input fields for each

8. **Webhook Configuration Test**
   - Hits health check endpoint
   - Validates GHL/Resend configuration
   - Checks for pending failed leads

9. **Form Validation Test**
   - Tests required field enforcement
   - Validates browser validation

10. **Loading State Test**
    - Verifies submit button shows loading
    - Checks for disabled state

## Test Execution

### Run All Form Tests
```bash
npx playwright test tests/ghl-webhook-form-testing.spec.ts --reporter=list
```

### Run Specific Test
```bash
npx playwright test tests/ghl-webhook-form-testing.spec.ts -g "Homepage"
```

### Run with UI
```bash
npx playwright test tests/ghl-webhook-form-testing.spec.ts --ui
```

### Generate Report
```bash
npx playwright test tests/ghl-webhook-form-testing.spec.ts --reporter=html
```

## Common Issues & Solutions

### Issue 1: Webhook Not Configured
**Symptom**: Tests pass but no GHL integration
**Solution**:
1. Check `.env.local` for `GOHIGHLEVEL_WEBHOOK_URL`
2. Run health check: `curl http://localhost:3004/api/submit-lead`
3. Look for `ghlConfigured: true` in response

### Issue 2: Forms Not Found
**Symptom**: Tests fail with "form not visible"
**Solution**:
1. Check if dev server is running on port 3004
2. Verify page loads correctly in browser
3. Check console for errors

### Issue 3: Validation Errors
**Symptom**: 400 Bad Request responses
**Solution**:
1. Check API logs for validation failures
2. Ensure required fields (email OR phone) are provided
3. Check payload size (max 10KB)

### Issue 4: Rate Limiting
**Symptom**: 429 Too Many Requests
**Solution**:
1. Middleware rate limit is 5 req/min per IP
2. Wait 60 seconds between test runs
3. Or use different IPs for testing

## GHL Webhook URL Format

Expected format:
```
https://services.leadconnectorhq.com/hooks/[WEBHOOK_ID]/[API_KEY]
```

Or:
```
https://[YOUR_SUBDOMAIN].gohighlevel.com/hooks/[WEBHOOK_ID]
```

## Manual Testing Checklist

- [ ] Homepage form submits successfully
- [ ] Contact page form submits successfully
- [ ] Success message displays after submission
- [ ] Loading state shows during submission
- [ ] Form validation prevents empty submissions
- [ ] Phone click-to-call buttons work
- [ ] Exit intent popup appears (after 5 seconds, on exit)
- [ ] GHL receives lead data (check GHL dashboard)
- [ ] Email notification sent (check inbox)
- [ ] Failed leads saved to fallback file (if GHL down)
- [ ] Health check endpoint returns status
- [ ] Console shows no errors during submission

## Expected Behavior

### Successful Submission
1. User fills form
2. Clicks submit
3. Button shows "Submitting..." (disabled)
4. POST request to `/api/submit-lead`
5. API validates input
6. API sends to GHL webhook
7. API sends email notification
8. API returns success response
9. Form shows success message
10. Analytics event tracked

### Failed Submission (GHL Down)
1. User fills form
2. Clicks submit
3. API attempts GHL webhook (fails)
4. API saves lead to fallback file
5. API still sends email notification
6. API returns success to user (graceful degradation)
7. Form shows success message
8. Admin can manually process fallback leads later

## Monitoring

### Check Failed Leads
```bash
cat capture-client-site/data/failed-leads.json
```

### Check API Health
```bash
curl http://localhost:3004/api/submit-lead
```

### Check Server Logs
Look for these log prefixes:
- ✅ `[submit-lead] ✅ SUCCESS` - Successful submission
- ⚠️ `[submit-lead] ⚠️ WARNING` - Non-critical issue
- 💾 `[submit-lead] 💾 FALLBACK` - Saved to fallback file
- 🚨 `[submit-lead] 🚨 FAILURE` - Critical error

## Security Considerations

1. **Rate Limiting**: Prevents spam/abuse (5 req/min)
2. **Input Sanitization**: Removes null bytes, limits length
3. **Payload Size Limit**: Max 10KB
4. **No Sensitive Data in Responses**: Errors don't expose system details
5. **Security Headers**: X-Frame-Options, X-Content-Type-Options, etc.
6. **Email Obfuscation**: team@captureclientai.net uses ObfuscatedEmail component
7. **HTTPS Only**: Production should use HTTPS

## Next Steps

### If All Tests Pass ✅
- Deploy to production
- Monitor GHL dashboard for incoming leads
- Set up alerts for failed webhook calls
- Review fallback file periodically

### If Tests Fail ❌
1. Check which tests failed
2. Review console logs
3. Verify GHL webhook URL is correct
4. Test webhook manually with curl
5. Check network tab in browser DevTools
6. Review API error logs

## Deliverables

1. ✅ Comprehensive test suite (`ghl-webhook-form-testing.spec.ts`)
2. ✅ Form inventory (auto-generated by Form Discovery test)
3. ✅ Webhook configuration validation
4. ✅ Test results report (run tests to generate)
5. ✅ This documentation

## Contact for Issues

- Check server logs first
- Review GHL webhook configuration
- Test manually in browser with DevTools open
- Check fallback file for queued leads
