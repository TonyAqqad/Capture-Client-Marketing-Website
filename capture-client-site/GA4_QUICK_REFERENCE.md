# GA4 Quick Reference Card

## 🚀 Quick Start

```bash
# 1. Add to .env.local
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# 2. Restart server
npm run dev

# 3. Done! Events are being tracked.
```

---

## 📝 Common Tracking Examples

### Track a Form

```typescript
import { trackFormStart, trackFormSubmission } from '@/lib/analytics';

const MyForm = () => {
  const [started, setStarted] = useState(false);

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      trackFormSubmission('contact_form', { source: 'homepage' });
    }}>
      <input
        onFocus={() => {
          if (!started) {
            trackFormStart('contact_form');
            setStarted(true);
          }
        }}
      />
    </form>
  );
};
```

### Track a Phone Link

```typescript
import { trackPhoneClick } from '@/lib/analytics';

<a
  href="tel:8653463339"
  onClick={() => trackPhoneClick('865-346-3339', 'hero')}
>
  Call Us
</a>
```

### Track a CTA Button

```typescript
import { trackCTAClick } from '@/lib/analytics';

<button onClick={() => trackCTAClick('Get Started', 'hero', '/signup')}>
  Get Started
</button>
```

### Track Custom Event

```typescript
import { trackEvent } from '@/lib/analytics';

trackEvent('video_play', {
  video_title: 'Product Demo',
  video_duration: 120,
});
```

---

## 🎯 All Available Functions

```typescript
import {
  // Generic
  trackEvent(name, params?),

  // Forms
  trackFormStart(formName),
  trackFormSubmission(formName, { service?, source?, step? }),

  // Clicks
  trackCTAClick(name, location, destination?),
  trackPhoneClick(number?, location?),
  trackEmailClick(location?),
  trackOutboundClick(url, linkText?),

  // Engagement
  trackScrollDepth(25 | 50 | 75 | 100),
  trackEngagementTime(pagePath, timeSeconds),

  // Advanced
  trackFileDownload(fileName, fileType),
  trackVideoInteraction('play'|'pause'|'complete', title),
  trackSearch(term, resultCount?),
  trackServiceInterest(serviceName, interactionType),
  trackCalculatorInteraction(name, action, result?),
} from '@/lib/analytics';
```

---

## 🔍 Testing

### Development

```javascript
// Open browser console (F12)
// You'll see:
[GA4 Event] form_start { form_name: 'contact_form' }
[GA4 Event] cta_click { cta_name: 'Book Demo', cta_location: 'hero' }
```

### Production

1. Open GA4 → **Reports** → **Realtime**
2. Click around your site
3. See events appear live

---

## 📊 GA4 Setup

### Mark as Conversions

Admin → Events → Toggle "Mark as conversion"

- ✅ `form_submit`
- ✅ `phone_click`
- ✅ `cta_click` (optional)

### Custom Dimensions

Admin → Custom Definitions → Create

| Name | Parameter | Scope |
|------|-----------|-------|
| Form Name | `form_name` | Event |
| CTA Name | `cta_name` | Event |
| Service | `service` | Event |

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Events not showing | Check `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set |
| Console warning | Add Measurement ID to `.env.local`, restart server |
| No real-time data | Wait 10 seconds, refresh GA4 Real-time report |
| Historical data missing | Wait 24-48 hours for processing |

---

## 📁 File Locations

```
src/components/analytics/
├── GoogleAnalytics.tsx       → Loads GA4
├── ScrollDepthTracker.tsx    → Auto scroll tracking
└── WebVitals.tsx            → Performance tracking

src/lib/
└── analytics.ts             → All tracking functions (import from here!)
```

---

## 🎯 What's Tracked Automatically

- ✅ Page views (all routes)
- ✅ Scroll depth (25%, 50%, 75%, 100%)
- ✅ Core Web Vitals (LCP, FID, CLS, TTFB, FCP)

---

## 🔐 Privacy

- ✅ IP anonymization: **Enabled**
- ✅ No PII sent to GA4
- ⚠️ Cookie consent: **Not included** (add if needed for GDPR)

---

## 📚 Full Documentation

- `GA4_SETUP_GUIDE.md` - Complete setup walkthrough
- `GA4_IMPLEMENTATION_SUMMARY.md` - Technical details
- `src/lib/analytics.ts` - Code reference

---

## ⚡ Pro Tips

1. **Use Real-time reports** for instant feedback during testing
2. **Wait 24-48 hours** for historical data to appear
3. **Mark key events as conversions** immediately
4. **Create custom dimensions** for better segmentation
5. **Build funnels** to visualize user journey
6. **Check console** in development to verify events

---

Need help? Check the full guide: `GA4_SETUP_GUIDE.md`
