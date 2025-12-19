# Quick Guide: Run Form Webhook Tests

## Prerequisites
1. Dev server must be running on `http://localhost:3000`
2. Playwright installed (`npm install -D @playwright/test`)
3. Chromium browser installed (`npx playwright install chromium`)

## Step-by-Step Instructions

### Step 1: Start the Dev Server
```bash
# Open Terminal 1
cd C:\Users\eaqqa\capture-client-website-seo\capture-client-site
npm run dev
```

Wait for the server to start (you should see "Ready on http://localhost:3000")

### Step 2: Run the Tests
```bash
# Open Terminal 2
cd C:\Users\eaqqa\capture-client-website-seo\capture-client-site
npx playwright test tests/form-webhook.spec.ts
```

## Test Commands

### Run All Form Tests
```bash
npx playwright test tests/form-webhook.spec.ts
```

### Run Desktop Tests Only
```bash
npx playwright test tests/form-webhook.spec.ts --grep "Desktop"
```

### Run Mobile Tests Only
```bash
npx playwright test tests/form-webhook.spec.ts --grep "Mobile"
```

### Run Single Test
```bash
npx playwright test tests/form-webhook.spec.ts --grep "Homepage - Lead Capture Form"
```

### Run with UI (Visual Debugger)
```bash
npx playwright test tests/form-webhook.spec.ts --ui
```

### Run and Show Report
```bash
npx playwright test tests/form-webhook.spec.ts --reporter=html
npx playwright show-report
```

### Run in Debug Mode
```bash
npx playwright test tests/form-webhook.spec.ts --debug
```

## What the Tests Verify

### ✅ Desktop (1440x900)
- Homepage lead capture form works
- Contact page form works
- Optimized 2-step form works
- Pricing page CTAs exist
- API calls go to `/api/submit-lead`
- Request body has correct fields
- Success messages appear

### ✅ Mobile (375x812)
- All forms fit on mobile screen
- All inputs are touch-friendly (44px+ height)
- Submit buttons are tappable
- Click-to-call buttons work
- Forms work with tap instead of click

### ✅ Error Handling
- Forms handle API errors gracefully
- Required field validation works
- No error messages shown to users (fail silently)

## Expected Output

```
Running 11 tests using 1 worker

✓ Desktop Form Tests (1440x900) > Homepage - Lead Capture Form (2.3s)
✓ Desktop Form Tests (1440x900) > Contact Page - Main Contact Form (1.8s)
✓ Desktop Form Tests (1440x900) > Homepage - Optimized Lead Form (2-step) (2.1s)
✓ Desktop Form Tests (1440x900) > Pricing Page - CTA Forms (1.2s)
✓ Mobile Form Tests (375x812) > Homepage - Lead Capture Form (Mobile) (3.1s)
✓ Mobile Form Tests (375x812) > Contact Page - Main Contact Form (Mobile) (2.9s)
✓ Mobile Form Tests (375x812) > Mobile - Optimized Lead Form (2-step) (3.4s)
✓ Mobile Form Tests (375x812) > Mobile - Click-to-Call Buttons (1.5s)
✓ Form Error Handling > Graceful error handling on API failure (1.7s)
✓ Form Error Handling > Required field validation (1.3s)
✓ Form Testing Summary > Generate forms tested list (0.2s)

11 passed (24.5s)
```

## Forms Tested

1. **Homepage - Lead Capture Form**
   - Fields: Name, Email, Phone, Service, Message
   - API: `/api/submit-lead`
   - Source: `general`

2. **Contact Page - Main Form**
   - Fields: Name, Email, Phone, Service, Message
   - API: `/api/submit-lead`
   - Source: `contact-page-premium`

3. **Optimized Lead Form (2-step)**
   - Step 1: Name, Phone
   - Step 2: Challenge dropdown
   - API: `/api/submit-lead`
   - Source: `optimized_lead_form_[source]`

4. **Exit Intent Modal**
   - No form (CTA buttons only)
   - Status: Verified

5. **Pricing Page CTAs**
   - No form (links to contact)
   - Status: Verified

6. **Click-to-Call Buttons**
   - Format: `tel:865-346-3339`
   - Status: Verified on mobile

## Troubleshooting

### Test Fails: "Navigation timeout"
**Solution**: Make sure dev server is running on `http://localhost:3000`

### Test Fails: "Element not found"
**Solution**: Check that the form elements exist on the page. Forms may have changed.

### Test Fails: "API not called"
**Solution**: Check browser console for JavaScript errors. Verify `/api/submit-lead` route exists.

### All Tests Timeout
**Solution**: Increase timeout in test file or check network connectivity.

## View Detailed Test Report

After running tests, view the HTML report:
```bash
npx playwright show-report
```

This opens a browser with:
- Test results
- Screenshots of failures
- Network requests
- Console logs
- Traces

## Files Created

- **Test File**: `C:\Users\eaqqa\capture-client-website-seo\capture-client-site\tests\form-webhook.spec.ts`
- **Summary Doc**: `C:\Users\eaqqa\capture-client-website-seo\capture-client-site\FORM_WEBHOOK_TEST_SUMMARY.md`
- **This Guide**: `C:\Users\eaqqa\capture-client-website-seo\capture-client-site\RUN_FORM_TESTS.md`

## Questions?

Check the comprehensive summary document:
`FORM_WEBHOOK_TEST_SUMMARY.md`

It contains:
- Detailed test coverage
- API endpoint documentation
- Mobile optimization details
- Error handling strategies
- Production deployment considerations
