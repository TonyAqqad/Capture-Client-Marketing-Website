# Google Analytics 4 (GA4) Setup Guide

## Overview

This Next.js marketing website now has comprehensive Google Analytics 4 (GA4) tracking integrated. The setup includes automatic page view tracking, custom event tracking for lead generation, form submissions, phone clicks, and user engagement metrics.

---

## 🚀 Quick Start

### 1. Get Your GA4 Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property (or use an existing one)
3. Navigate to **Admin** → **Data Streams** → Select your web stream
4. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

### 2. Configure Environment Variable

1. Create a `.env.local` file in the project root (if it doesn't exist):
   ```bash
   touch .env.local
   ```

2. Add your GA4 Measurement ID:
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

3. **Important**: Never commit `.env.local` to version control. It's already in `.gitignore`.

### 3. Restart Your Development Server

```bash
npm run dev
```

That's it! GA4 is now tracking your website.

---

## 📊 What's Being Tracked

### Automatic Tracking

1. **Page Views**: Every page navigation is tracked automatically
2. **Web Vitals**: Core Web Vitals metrics (LCP, FID/INP, CLS, TTFB, FCP)
3. **Scroll Depth**: User scroll depth at 25%, 50%, 75%, and 100%

### Custom Events

#### Form Tracking
- `form_start`: When user starts filling out a form (first field interaction)
- `form_submit`: When a form is successfully submitted
  - Tracks: form name, service selected, source page, step number

#### Lead Generation
- Tracks both `LeadCaptureForm` and `OptimizedLeadForm` submissions
- Multi-step form progression tracking
- Source attribution (which page/component the form is on)

#### Click-to-Call Tracking
- `phone_click`: Tracks every phone number click
  - Location: header, footer, mobile menu, lead forms

#### Email Clicks
- `email_click`: Tracks mailto link clicks
  - Location tracking included

#### CTA Tracking
- `cta_click`: Tracks Call-to-Action button clicks
  - Tracks: CTA name, location on page, destination URL

---

## 🔧 Implementation Details

### Components & Files

#### Core Analytics Files

1. **`src/components/analytics/GoogleAnalytics.tsx`**
   - Loads GA4 gtag.js script
   - Initializes GA4 with your Measurement ID
   - Only loads in production or when ID is configured

2. **`src/lib/analytics.ts`**
   - Utility functions for tracking custom events
   - Type-safe event tracking helpers
   - Examples:
     ```typescript
     import { trackEvent, trackFormSubmission, trackPhoneClick } from '@/lib/analytics';

     // Track generic event
     trackEvent('button_click', { button_name: 'signup' });

     // Track form submission
     trackFormSubmission('lead_capture_hero', { service: 'voice-ai' });

     // Track phone click
     trackPhoneClick('865-346-3339', 'header');
     ```

3. **`src/components/analytics/ScrollDepthTracker.tsx`**
   - Automatically tracks scroll depth milestones
   - Fires events at 25%, 50%, 75%, 100% scroll
   - Each milestone only fires once per page load

4. **`src/components/analytics/WebVitals.tsx`**
   - Tracks Core Web Vitals performance metrics
   - Sends data to GA4 in production
   - Logs to console in development

#### Integrated Components

GA4 tracking is integrated into these components:

- ✅ `src/app/layout.tsx` - GoogleAnalytics, ScrollDepthTracker, WebVitals
- ✅ `src/components/Header.tsx` - Phone clicks, CTA clicks
- ✅ `src/components/Footer.tsx` - Phone clicks, email clicks
- ✅ `src/components/LeadCaptureForm.tsx` - Form start/submit, phone clicks
- ✅ `src/components/forms/OptimizedLeadForm.tsx` - Multi-step form tracking

---

## 📈 Custom Events Reference

### Available Tracking Functions

```typescript
// Generic event tracking
trackEvent(eventName: string, parameters?: Record<string, any>)

// Form tracking
trackFormStart(formName: string)
trackFormSubmission(formName: string, data?: { service?, source?, step? })

// Click tracking
trackCTAClick(ctaName: string, location: string, destination?: string)
trackPhoneClick(phoneNumber?: string, location?: string)
trackEmailClick(location?: string)

// Engagement tracking
trackScrollDepth(percentage: 25 | 50 | 75 | 100)

// Additional utilities
trackFileDownload(fileName: string, fileType: string)
trackVideoInteraction(action: 'play'|'pause'|'complete', videoTitle: string)
trackOutboundClick(url: string, linkText?: string)
trackSearch(searchTerm: string, resultCount?: number)
trackServiceInterest(serviceName: string, interactionType: string)
trackCalculatorInteraction(calculatorName: string, action: string, result?: any)
```

---

## 🎯 Adding Tracking to New Components

### Example: Track a CTA Button

```typescript
import { trackCTAClick } from '@/lib/analytics';

<button onClick={() => trackCTAClick('Get Started', 'hero', '/contact')}>
  Get Started
</button>
```

### Example: Track a Custom Form

```typescript
import { trackFormStart, trackFormSubmission } from '@/lib/analytics';

const MyForm = () => {
  const [started, setStarted] = useState(false);

  const handleFieldFocus = () => {
    if (!started) {
      trackFormStart('newsletter_signup');
      setStarted(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ... your submission logic
    trackFormSubmission('newsletter_signup', { source: 'homepage' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onFocus={handleFieldFocus} />
      <button type="submit">Subscribe</button>
    </form>
  );
};
```

### Example: Track Phone Link

```typescript
import { trackPhoneClick } from '@/lib/analytics';

<a
  href="tel:8653463339"
  onClick={() => trackPhoneClick('865-346-3339', 'pricing_page')}
>
  (865) 346-3339
</a>
```

---

## 🔍 Viewing Analytics in GA4

### Real-Time Reports

1. Go to **Reports** → **Realtime**
2. You'll see live user activity, page views, and events
3. Test by clicking around your site and watching events appear

### Custom Events

1. Go to **Reports** → **Engagement** → **Events**
2. You'll see all custom events:
   - `form_start`
   - `form_submit`
   - `phone_click`
   - `cta_click`
   - `scroll_depth`
   - etc.

### Create Custom Reports

1. Go to **Explore** → **Create a new exploration**
2. Add dimensions like `event_name`, `cta_name`, `form_name`, `page_location`
3. Add metrics like `event_count`, `total_users`
4. Build funnels for lead generation conversion tracking

---

## 🎨 Recommended GA4 Configuration

### Conversions

Mark these events as conversions in GA4:

1. `form_submit` - Lead form submissions
2. `phone_click` - Click-to-call actions
3. `cta_click` - Important CTA clicks (Book a Demo, Get Started)

**How to mark conversions:**
1. Go to **Admin** → **Events**
2. Toggle "Mark as conversion" for key events

### Custom Dimensions

Create custom dimensions for better segmentation:

| Dimension Name | Event Parameter | Scope |
|----------------|-----------------|-------|
| Form Name | `form_name` | Event |
| CTA Name | `cta_name` | Event |
| CTA Location | `cta_location` | Event |
| Click Location | `click_location` | Event |
| Service Selected | `service` | Event |

**How to create custom dimensions:**
1. Go to **Admin** → **Custom Definitions** → **Custom Dimensions**
2. Click "Create custom dimension"
3. Enter dimension name and select parameter

### Goals & Funnels

Create funnels to track lead generation paths:

1. **Lead Generation Funnel**:
   - Step 1: Page view (landing page)
   - Step 2: `form_start`
   - Step 3: `form_submit`

2. **Phone Call Funnel**:
   - Step 1: Page view
   - Step 2: `phone_click`

---

## 🧪 Testing Your Setup

### Development Testing

In development mode, analytics events are logged to the browser console:

```javascript
// Open browser DevTools (F12)
// Console will show:
[GA4 Event] form_start { form_name: 'lead_capture_hero' }
[GA4 Event] cta_click { cta_name: 'Book a Demo', cta_location: 'header' }
```

### Production Testing

1. **Use GA4 DebugView**:
   - Install [Google Analytics Debugger Chrome Extension](https://chrome.google.com/webstore/detail/google-analytics-debugger)
   - Go to GA4 → **Admin** → **DebugView**
   - Events appear in real-time

2. **Check Network Tab**:
   - Open DevTools → Network tab
   - Filter by "google-analytics"
   - See GA4 requests being sent

---

## 🚨 Troubleshooting

### Events Not Showing in GA4

**Problem**: Events aren't appearing in GA4 reports

**Solutions**:
1. Check that `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set in `.env.local`
2. Verify Measurement ID format: `G-XXXXXXXXXX`
3. Restart your dev server after adding env variable
4. Wait 24-48 hours for historical reports (Real-time should work immediately)
5. Use DebugView for instant feedback

### Console Warning: "GA4 Measurement ID not found"

**Problem**: You see this warning in development console

**Solution**: This is expected if you haven't set up the env variable yet. Add your Measurement ID to `.env.local`

### Events Fire Multiple Times

**Problem**: Same event fires repeatedly

**Solution**: Check that you're not calling tracking functions in render loops or useEffect without dependencies

---

## 🔐 Privacy & GDPR Compliance

### Current Setup

- ✅ IP anonymization enabled (`anonymize_ip: true`)
- ✅ No PII (Personally Identifiable Information) is sent to GA4
- ⚠️ Cookie consent banner NOT included (you may need to add this)

### Adding Cookie Consent

For GDPR compliance, consider adding a cookie consent banner:

**Recommended Libraries**:
- [react-cookie-consent](https://www.npmjs.com/package/react-cookie-consent)
- [cookiebot](https://www.cookiebot.com/)
- [onetrust](https://www.onetrust.com/)

**Implementation Pattern**:
```typescript
// Only load GA4 after user consent
const [hasConsent, setHasConsent] = useState(false);

{hasConsent && <GoogleAnalytics />}
```

---

## 📚 Additional Resources

- [GA4 Documentation](https://support.google.com/analytics/answer/9304153)
- [GA4 Event Reference](https://support.google.com/analytics/answer/9267735)
- [Next.js Analytics Documentation](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)
- [Web Vitals](https://web.dev/vitals/)

---

## ✅ Verification Checklist

Before going live, verify:

- [ ] GA4 Measurement ID added to `.env.local` (dev) and production env variables
- [ ] Test form submissions appear in GA4 Real-time
- [ ] Phone clicks are tracked
- [ ] CTA clicks are tracked
- [ ] Scroll depth events appear
- [ ] Web Vitals data is being sent
- [ ] No console errors related to gtag
- [ ] Events marked as conversions in GA4
- [ ] Custom dimensions configured
- [ ] Cookie consent (if required by your region)

---

## 🎉 You're All Set!

Your marketing website now has enterprise-level analytics tracking. Monitor your leads, optimize conversion funnels, and make data-driven decisions to grow your business.

**Questions?** Check the GA4 documentation or review the code in `src/lib/analytics.ts` for examples.
