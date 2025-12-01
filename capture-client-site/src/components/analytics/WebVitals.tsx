"use client";

import { useReportWebVitals } from 'next/web-vitals';

/**
 * Web Vitals Tracking Component
 *
 * Tracks Core Web Vitals metrics and sends them to analytics
 * - LCP (Largest Contentful Paint)
 * - FID (First Input Delay) / INP (Interaction to Next Paint)
 * - CLS (Cumulative Layout Shift)
 * - TTFB (Time to First Byte)
 * - FCP (First Contentful Paint)
 */
export function WebVitals() {
  useReportWebVitals((metric) => {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Web Vitals]', {
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id,
      });
    }

    // Send to analytics in production
    if (process.env.NODE_ENV === 'production') {
      // Option 1: Send to Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', metric.name, {
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          event_category: 'Web Vitals',
          event_label: metric.id,
          non_interaction: true,
        });
      }

      // Option 2: Send to custom analytics endpoint
      // Uncomment and configure your endpoint
      /*
      const body = JSON.stringify({
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id,
        navigationType: metric.navigationType,
      });

      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/analytics', body);
      } else {
        fetch('/api/analytics', {
          body,
          method: 'POST',
          keepalive: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
      */

      // Option 3: Send to Vercel Analytics (if using Vercel)
      // This is automatically handled if @vercel/analytics is installed
    }

    // Performance thresholds (following Google recommendations)
    const thresholds = {
      LCP: { good: 2500, poor: 4000 },
      FID: { good: 100, poor: 300 },
      INP: { good: 200, poor: 500 },
      CLS: { good: 0.1, poor: 0.25 },
      TTFB: { good: 800, poor: 1800 },
      FCP: { good: 1800, poor: 3000 },
    };

    // Alert if metrics are poor (development only)
    if (process.env.NODE_ENV === 'development') {
      const threshold = thresholds[metric.name as keyof typeof thresholds];
      if (threshold) {
        const value = metric.name === 'CLS' ? metric.value : metric.value;
        if (value > threshold.poor) {
          console.warn(`⚠️ Poor ${metric.name}:`, value, `(threshold: ${threshold.poor})`);
        } else if (value > threshold.good) {
          console.log(`⚡ Needs improvement ${metric.name}:`, value);
        } else {
          console.log(`✅ Good ${metric.name}:`, value);
        }
      }
    }
  });

  return null;
}
