# FEATURE IMPLEMENTATION QUICK GUIDE

## How to Add New Features to Your Site

### 1. Enhanced ROI Calculator

**Import:**
```tsx
import EnhancedROICalculator from '@/components/features/EnhancedROICalculator';
```

**Usage:**
```tsx
// Add after hero section on homepage
<EnhancedROICalculator />
```

**What It Does:**
- Shows 6 industry presets (HVAC, Plumbing, Dental, Legal, Auto, Custom)
- User adjusts 3 sliders (missed calls, job value, close rate)
- Displays animated bar chart comparison
- Captures email for detailed report

**Best Placement:** After hero section, before testimonials

---

### 2. Voice AI vs. Receptionist Comparison

**Import:**
```tsx
import VoiceAIvsReceptionist from '@/components/features/VoiceAIvsReceptionist';
```

**Usage:**
```tsx
// Add mid-page for social proof
<VoiceAIvsReceptionist />
```

**What It Does:**
- Toggle between "Feature Comparison" and "Cost Savings" views
- Shows 8 feature comparisons side-by-side
- Detailed annual cost breakdown ($45K vs. $5.9K)
- Highlights $39K annual savings

**Best Placement:** Mid-page, before pricing section

---

### 3. Smart Demo Scheduler

**Import:**
```tsx
import SmartDemoScheduler from '@/components/features/SmartDemoScheduler';
```

**Usage:**
```tsx
// Add above footer or as standalone page
<SmartDemoScheduler />
```

**What It Does:**
- 3-step booking flow (Time → Details → Confirmation)
- 7-day visual calendar
- Real-time slot availability
- Industry-specific demo customization
- Sends calendar invite via email

**Best Placement:** Above footer CTA or dedicated /demo-booking page

---

## Example Homepage Integration

```tsx
// src/app/page.tsx
import EnhancedROICalculator from '@/components/features/EnhancedROICalculator';
import VoiceAIvsReceptionist from '@/components/features/VoiceAIvsReceptionist';
import SmartDemoScheduler from '@/components/features/SmartDemoScheduler';

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* NEW: Enhanced ROI Calculator */}
      <EnhancedROICalculator />

      <Features />

      {/* NEW: Comparison Tool */}
      <VoiceAIvsReceptionist />

      <Testimonials />
      <Pricing />

      {/* NEW: Demo Scheduler */}
      <SmartDemoScheduler />

      <Footer />
    </>
  );
}
```

---

## API Endpoint Requirements

### Lead Submission Endpoint
**Path:** `/api/submit-lead`

**Expected Payload:**
```json
{
  "name": "John Smith",
  "email": "john@example.com",
  "phone": "(555) 123-4567",
  "company": "ABC Company",
  "source": "roi_calculator | smart_demo_scheduler | exit_intent_modal",
  "metadata": {
    "industry": "HVAC",
    "roi": 854,
    "monthlyLoss": 4247,
    "selectedDate": "2025-12-10T15:00:00.000Z",
    "selectedTime": "3:00 PM"
  }
}
```

**Current Implementation:** Already exists at `src/app/api/submit-lead/route.ts`

---

## Analytics Events

All features track:

```tsx
// Form start
trackFormStart('enhanced_roi_calculator');
trackFormStart('smart_demo_scheduler');
trackFormStart('exit_intent_modal');

// Form submission
trackFormSubmission('enhanced_roi_calculator', {
  industry: 'HVAC',
  roi: 854
});

trackFormSubmission('smart_demo_scheduler', {
  industry: 'Dental',
  selectedTime: '3:00 PM'
});
```

**Current Implementation:** Already exists in `src/lib/analytics.ts`

---

## Mobile Testing Checklist

- [ ] Test on iPhone Safari (iOS 15+)
- [ ] Test on Android Chrome
- [ ] Verify sliders work with touch
- [ ] Check 48px minimum touch targets
- [ ] Test horizontal scroll on comparison table
- [ ] Verify no layout shift on load
- [ ] Check form inputs are not zoomed on focus
- [ ] Test calendar date picker on mobile

---

## Performance Checklist

- [ ] Lazy load components below fold
- [ ] Verify animations are 60fps
- [ ] Check bundle size increase (< 50KB per feature)
- [ ] Test on 3G connection
- [ ] Verify no backdrop-filter on mobile
- [ ] Check Core Web Vitals (LCP, FID, CLS)

---

## A/B Testing Ideas

### Enhanced ROI Calculator
- **Test:** Industry presets vs. no presets
- **Metric:** Lead capture rate
- **Hypothesis:** Presets increase engagement by 25%

### Voice AI vs. Receptionist
- **Test:** Comparison view as default vs. Savings view as default
- **Metric:** Demo booking rate
- **Hypothesis:** Savings view converts 15% higher

### Smart Demo Scheduler
- **Test:** With urgency ("Only 1 left!") vs. without
- **Metric:** Booking completion rate
- **Hypothesis:** Urgency increases bookings by 20%

---

## Customization Options

### Change Industry Presets
Edit `INDUSTRY_PRESETS` array in `EnhancedROICalculator.tsx`:
```tsx
const INDUSTRY_PRESETS = [
  {
    id: "hvac",
    name: "HVAC",
    icon: "ac_unit",
    defaults: { missedCalls: 35, avgJobValue: 850, closeRate: 40 },
  },
  // Add more industries here
];
```

### Change Time Slots
Edit `generateTimeSlots` function in `SmartDemoScheduler.tsx`:
```tsx
const times = [
  "9:00 AM", "10:00 AM", "11:00 AM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
];
```

### Change Cost Comparison
Edit constants in `VoiceAIvsReceptionist.tsx`:
```tsx
const TRADITIONAL_ANNUAL_COST = 45000; // $3,750/mo avg
const VOICE_AI_ANNUAL_COST = 5964; // $497/mo
```

---

## Troubleshooting

### Issue: Forms not submitting
**Solution:** Check `/api/submit-lead` endpoint is working
```bash
curl -X POST http://localhost:3000/api/submit-lead \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","source":"test"}'
```

### Issue: Animations laggy on mobile
**Solution:** Reduce animation complexity in `framer-motion` variants
```tsx
// Change from:
animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}

// To:
animate={{ opacity: 1, y: 0 }}
```

### Issue: Calendar not showing correct timezone
**Solution:** Update timezone notice in `SmartDemoScheduler.tsx`:
```tsx
<p className="text-center text-foreground-muted text-sm mb-8">
  <span className="material-icons text-xs align-middle mr-1">schedule</span>
  Times shown in your local timezone (
    {Intl.DateTimeFormat().resolvedOptions().timeZone}
  )
</p>
```

---

## Quick Copy-Paste Setup

**1. Add to homepage (copy this entire block):**
```tsx
import EnhancedROICalculator from '@/components/features/EnhancedROICalculator';
import VoiceAIvsReceptionist from '@/components/features/VoiceAIvsReceptionist';
import SmartDemoScheduler from '@/components/features/SmartDemoScheduler';

// Add after Hero section:
<EnhancedROICalculator />

// Add before Pricing:
<VoiceAIvsReceptionist />

// Add above Footer:
<SmartDemoScheduler />
```

**2. Test locally:**
```bash
cd capture-client-site
npm run dev
```

**3. Visit:**
- http://localhost:3000 (should see new features)
- Test each feature's form submission
- Verify analytics events in browser console

---

## Production Deployment

**Before deploying:**
1. ✅ All forms submit successfully
2. ✅ Analytics events firing
3. ✅ Mobile testing complete
4. ✅ No TypeScript errors
5. ✅ No console errors
6. ✅ Core Web Vitals passing

**Deploy command:**
```bash
npm run build
npm run start
```

**Or deploy to Vercel:**
```bash
vercel deploy --prod
```

---

## Support

If you encounter issues:
1. Check browser console for errors
2. Verify API endpoints are working
3. Test analytics events
4. Check mobile compatibility
5. Review this guide's troubleshooting section

---

**Last Updated:** 2025-12-02
**Version:** 1.0.0
**Status:** Production Ready
