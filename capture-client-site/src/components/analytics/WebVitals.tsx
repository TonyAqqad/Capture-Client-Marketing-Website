"use client";

import { useEffect } from 'react';
import { useReportWebVitals } from 'next/web-vitals';
import { reportWebVitals, initWebVitals, PERFORMANCE_THRESHOLDS } from '@/lib/performance';
import type { Metric } from 'web-vitals';

/**
 * Enhanced Web Vitals Tracking Component
 *
 * Tracks Core Web Vitals metrics using dual approach:
 * 1. Next.js built-in useReportWebVitals hook
 * 2. Direct web-vitals library integration for advanced tracking
 *
 * Metrics tracked:
 * - LCP (Largest Contentful Paint): < 2.5s target
 * - FID (First Input Delay): < 100ms target
 * - INP (Interaction to Next Paint): < 200ms target
 * - CLS (Cumulative Layout Shift): < 0.1 target
 * - FCP (First Contentful Paint): < 1.8s target
 * - TTFB (Time to First Byte): < 600ms target
 *
 * Performance Budget (STRICT):
 * - All metrics must be in "good" range
 * - Target "excellent" ratings for competitive advantage
 * - Automatic alerts for poor performance in development
 */
export function WebVitals() {
  // Initialize direct web-vitals monitoring
  useEffect(() => {
    initWebVitals();
  }, []);

  // Use Next.js hook for additional tracking
  useReportWebVitals((metric) => {
    // Extended metric type from Next.js
    interface ExtendedMetric {
      navigationType?: 'navigate' | 'reload' | 'back-forward' | 'prerender';
    }

    // Convert Next.js metric to web-vitals Metric format
    const webVitalsMetric: Metric = {
      name: metric.name as Metric['name'],
      value: metric.value,
      rating: metric.rating as Metric['rating'],
      delta: metric.delta,
      id: metric.id,
      navigationType: (metric as ExtendedMetric).navigationType || 'navigate',
      entries: [],
    };

    // Use centralized reporting function
    reportWebVitals(webVitalsMetric);

    // Additional development-only insights
    if (process.env.NODE_ENV === 'development') {
      const threshold = PERFORMANCE_THRESHOLDS[metric.name as keyof typeof PERFORMANCE_THRESHOLDS];

      if (threshold) {
        const value = metric.value;
        const percentOfTarget = ((value / threshold.target) * 100).toFixed(0);
        const percentOfGood = ((value / threshold.good) * 100).toFixed(0);

        console.log(`📊 [Web Vitals Analysis] ${metric.name}`, {
          value: `${metric.name === 'CLS' ? value.toFixed(3) : Math.round(value)}${metric.name === 'CLS' ? '' : 'ms'}`,
          rating: metric.rating,
          target: `${threshold.target}${metric.name === 'CLS' ? '' : 'ms'}`,
          good: `${threshold.good}${metric.name === 'CLS' ? '' : 'ms'}`,
          percentOfTarget: `${percentOfTarget}%`,
          percentOfGood: `${percentOfGood}%`,
          delta: metric.delta,
        });

        // Performance warnings with actionable insights
        if (value > threshold.poor) {
          console.error(
            `🚨 CRITICAL: ${metric.name} is ${Math.round((value / threshold.poor) * 100)}% of poor threshold!`,
            '\nImmediate action required. This will hurt SEO rankings and conversions.'
          );
        } else if (value > threshold.good) {
          console.warn(
            `⚠️ WARNING: ${metric.name} needs improvement (${Math.round((value / threshold.good) * 100)}% of good threshold)`,
            '\nOptimize to improve user experience and Core Web Vitals score.'
          );
        } else if (value > threshold.target) {
          console.info(
            `ℹ️ INFO: ${metric.name} is good but not excellent (${Math.round((value / threshold.target) * 100)}% of target)`,
            '\nRoom for optimization to achieve competitive advantage.'
          );
        } else {
          console.log(
            `🚀 EXCELLENT: ${metric.name} meets or exceeds target!`,
            '\nKeep monitoring to maintain this performance level.'
          );
        }
      }
    }
  });

  return null;
}

/**
 * Performance Budget Summary (Reference)
 *
 * CURRENT TARGETS (Capture Client):
 * ┌─────────┬──────────┬──────────┬──────────┐
 * │ Metric  │ Target   │ Good     │ Poor     │
 * ├─────────┼──────────┼──────────┼──────────┤
 * │ LCP     │ 2.0s     │ 2.5s     │ 4.0s     │
 * │ FID     │ 50ms     │ 100ms    │ 300ms    │
 * │ INP     │ 100ms    │ 200ms    │ 500ms    │
 * │ CLS     │ 0.05     │ 0.1      │ 0.25     │
 * │ FCP     │ 1.2s     │ 1.8s     │ 3.0s     │
 * │ TTFB    │ 400ms    │ 800ms    │ 1800ms   │
 * └─────────┴──────────┴──────────┴──────────┘
 *
 * WHY THESE TARGETS MATTER:
 * - LCP: First impression - affects bounce rate
 * - FID/INP: Interactivity - affects engagement
 * - CLS: Visual stability - affects trust
 * - FCP: Perceived speed - affects user confidence
 * - TTFB: Server performance - affects everything
 *
 * MONITORING STRATEGY:
 * 1. Development: Console logs with detailed analysis
 * 2. Production: Send to /api/analytics endpoint
 * 3. Analytics: Track in Google Analytics 4
 * 4. Alerts: Email notifications for poor metrics (TODO)
 */
