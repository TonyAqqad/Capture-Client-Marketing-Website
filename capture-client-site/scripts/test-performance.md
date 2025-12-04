# Performance Testing Guide

## Quick Performance Tests

### 1. Test Scroll Performance (Chrome DevTools)

1. Open site in Chrome
2. Open DevTools (F12)
3. Go to **Performance** tab
4. Click **Record** (⚫)
5. Scroll page up and down for 5 seconds
6. Click **Stop**
7. Check **FPS** meter - should show green bars at 60fps
8. Check for **red bars** (frame drops) - should be minimal

**Expected Results:**
- ✅ Green FPS bars (60fps)
- ✅ No red bars (dropped frames)
- ✅ Smooth scrolling experience

---

### 2. Test Core Web Vitals (Lighthouse)

```bash
# Run Lighthouse from DevTools
# Or use CLI:
npx lighthouse https://your-site.vercel.app --view

# Check scores:
# - Performance: > 90
# - LCP: < 2.5s (green)
# - FID: < 100ms (green)
# - CLS: < 0.1 (green)
```

**Expected Results:**
- ✅ Performance Score: 90+
- ✅ LCP < 2.5s
- ✅ FID < 100ms
- ✅ CLS < 0.1

---

### 3. Test on Real Mobile Device

1. Deploy to Vercel
2. Open on actual phone (not simulator)
3. Test scrolling speed
4. Check for jank/stutter
5. Test interactive elements (buttons, forms)

**Expected Results:**
- ✅ Instant, smooth scrolling
- ✅ No lag on touch events
- ✅ Buttons respond immediately

---

### 4. Test Bundle Size

```bash
# Build production bundle
npm run build

# Check bundle size in output
# Look for largest chunks
# Target: < 200KB main bundle
```

**Expected Results:**
- ✅ Main bundle < 200KB
- ✅ No duplicate dependencies
- ✅ Code splitting working

---

### 5. Monitor Real User Metrics

After deploying to production:

1. **Google Search Console**
   - Check Core Web Vitals report
   - Monitor mobile vs desktop performance
   - Track improvements over time

2. **Vercel Analytics**
   - Real User Monitoring (RUM)
   - 75th percentile scores
   - Regional performance

3. **Sentry/LogRocket** (if installed)
   - Performance monitoring
   - User session replays
   - Error tracking

---

## Performance Checklist

### Before Deployment:
- [ ] Run Lighthouse (score > 90)
- [ ] Test scroll performance (60fps)
- [ ] Test on mobile device
- [ ] Check bundle size (< 200KB)
- [ ] Verify images optimized

### After Deployment:
- [ ] Monitor Core Web Vitals in Search Console
- [ ] Check Vercel Analytics
- [ ] Test on multiple devices
- [ ] Monitor error rates
- [ ] Collect user feedback

---

## Common Performance Issues

### Slow Scrolling:
- Check for unthrottled scroll listeners
- Verify GPU acceleration enabled
- Disable heavy animations on mobile

### Long LCP:
- Optimize hero image
- Preload critical fonts
- Remove render-blocking resources

### High FID:
- Reduce JavaScript execution time
- Code split heavy components
- Defer non-critical scripts

### Layout Shifts (CLS):
- Set image dimensions
- Reserve space for dynamic content
- Use font-display: swap

---

## Tools

- **Chrome DevTools Performance:** Real-time FPS monitoring
- **Lighthouse:** Core Web Vitals scoring
- **PageSpeed Insights:** Production testing
- **WebPageTest:** Multi-location testing
- **Vercel Analytics:** Real user metrics

---

**Testing Priority:** High
**Frequency:** Before every major deployment
**Targets:** 60fps scroll, 90+ Lighthouse, < 2.5s LCP
