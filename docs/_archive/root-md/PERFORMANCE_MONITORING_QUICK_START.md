# Core Web Vitals Monitoring - Quick Start Guide

## What You Get

Real-time performance monitoring for the Capture Client website tracking 6 Core Web Vitals metrics with actionable insights.

## How to Use

### Development Mode

1. **Start the server**:
   ```bash
   cd capture-client-site
   npm run dev
   ```

2. **Open browser console** at `http://localhost:3000`

3. **See performance metrics in console**:
   ```
   🚀 [Web Vitals] LCP: 1834ms (Rating: excellent, Target: 2000ms)
   ✅ [Web Vitals] CLS: 0.042 (Rating: excellent, Target: 0.05)
   ⚡ [Web Vitals] FCP: 1521ms (Rating: needs-improvement)
   ```

### Production Mode

1. **Build and start**:
   ```bash
   npm run build
   npm start
   ```

2. **Metrics are sent to**:
   - `/api/analytics` endpoint (logged server-side)
   - Google Analytics (if configured)
   - Vercel Analytics (if installed)

3. **Check server logs** for detailed reports:
   ```
   ✅ [Analytics API] Web Vitals Report: {
     metric: 'LCP',
     value: '2341ms',
     rating: 'good',
     status: 'Within good range'
   }
   ```

## Understanding the Metrics

| Metric | Target | What It Means | Fix If Poor |
|--------|--------|---------------|-------------|
| **LCP** | < 2.0s | Loading speed of main content | Optimize images, reduce server time |
| **FID** | < 50ms | First click/tap response time | Reduce JavaScript, split code |
| **INP** | < 100ms | Overall interactivity | Optimize event handlers, defer JS |
| **CLS** | < 0.05 | Visual stability (no jumps) | Add image dimensions, reserve space |
| **FCP** | < 1.2s | First paint of any content | Reduce render-blocking resources |
| **TTFB** | < 400ms | Server response time | Optimize APIs, use caching |

## Rating System

- 🚀 **Excellent**: Meets or exceeds target
- ✅ **Good**: Within acceptable range
- ⚡ **Needs Improvement**: Should optimize soon
- ⚠️ **Poor**: Immediate action required

## Quick Commands

### Check Performance
```bash
# Development mode with console logging
npm run dev

# Production mode with analytics
npm run build && npm start
```

### Test in Chrome DevTools
1. Open DevTools (F12)
2. Network tab > Throttling > "Slow 3G"
3. Reload page
4. See how metrics change with slow connection

### Run Lighthouse
```bash
# Test production build
npm run build
npm start

# In another terminal
npx lighthouse http://localhost:3000 --view
```

## Files Modified

```
CREATED:
└── src/lib/performance.ts                 - Core monitoring logic

ENHANCED:
├── src/components/analytics/WebVitals.tsx - Tracking component
└── src/app/api/analytics/route.ts         - Analytics endpoint

ALREADY ACTIVE:
└── src/app/layout.tsx                     - WebVitals imported & active
```

## Common Issues

### No Console Logs?
- Check you're in development mode (`npm run dev`)
- Verify browser console shows all log levels
- Look for `[Web Vitals]` prefix in logs

### Metrics Not Sent to API?
- Production mode only (`npm run build && npm start`)
- Check `/api/analytics` endpoint is accessible
- Look for network requests in DevTools

### Poor Performance?
- Check specific metric recommendations in console
- Run Lighthouse for detailed analysis
- Review PERFORMANCE_MONITORING_SETUP.md for optimization tips

## Next Steps

1. **Baseline**: Run tests to establish current performance
2. **Monitor**: Watch for regressions during development
3. **Optimize**: Focus on metrics that need improvement
4. **Track**: Monitor production metrics over time

## Resources

- 📖 Full documentation: `PERFORMANCE_MONITORING_SETUP.md`
- 🌐 Web Vitals: https://web.dev/vitals/
- 🔧 Next.js Performance: https://nextjs.org/docs/app/building-your-application/optimizing

---

**Status**: ✅ Ready to use - monitoring is active in development and production
