/**
 * Performance Monitoring Utility
 *
 * Core Web Vitals Performance Budget:
 * - LCP (Largest Contentful Paint): < 2.5s (Target: 2.0s)
 * - FID (First Input Delay): < 100ms (Target: 50ms)
 * - INP (Interaction to Next Paint): < 200ms (Target: 100ms)
 * - CLS (Cumulative Layout Shift): < 0.1 (Target: 0.05)
 * - FCP (First Contentful Paint): < 1.8s (Target: 1.2s)
 * - TTFB (Time to First Byte): < 600ms (Target: 400ms)
 *
 * Uses web-vitals library for accurate Core Web Vitals measurement
 */

import type { Metric } from "web-vitals";

/**
 * Performance thresholds based on Google's Web Vitals recommendations
 * https://web.dev/vitals/
 */
export const PERFORMANCE_THRESHOLDS = {
  LCP: {
    good: 2500, // < 2.5s = Good
    poor: 4000, // > 4.0s = Poor
    target: 2000, // Our target: 2.0s
  },
  FID: {
    good: 100, // < 100ms = Good
    poor: 300, // > 300ms = Poor
    target: 50, // Our target: 50ms
  },
  INP: {
    good: 200, // < 200ms = Good
    poor: 500, // > 500ms = Poor
    target: 100, // Our target: 100ms
  },
  CLS: {
    good: 0.1, // < 0.1 = Good
    poor: 0.25, // > 0.25 = Poor
    target: 0.05, // Our target: 0.05
  },
  FCP: {
    good: 1800, // < 1.8s = Good
    poor: 3000, // > 3.0s = Poor
    target: 1200, // Our target: 1.2s
  },
  TTFB: {
    good: 800, // < 800ms = Good
    poor: 1800, // > 1.8s = Poor
    target: 400, // Our target: 400ms
  },
} as const;

export type MetricName = keyof typeof PERFORMANCE_THRESHOLDS;

/**
 * Get rating for a metric value
 */
export function getMetricRating(
  name: MetricName,
  value: number
): "good" | "needs-improvement" | "poor" | "excellent" {
  const threshold = PERFORMANCE_THRESHOLDS[name];

  if (value <= threshold.target) {
    return "excellent";
  } else if (value <= threshold.good) {
    return "good";
  } else if (value <= threshold.poor) {
    return "needs-improvement";
  } else {
    return "poor";
  }
}

/**
 * Format metric value for display
 */
export function formatMetricValue(name: MetricName, value: number): string {
  if (name === "CLS") {
    return value.toFixed(3);
  } else {
    return `${Math.round(value)}ms`;
  }
}

/**
 * Get emoji for metric rating
 */
export function getMetricEmoji(rating: string): string {
  switch (rating) {
    case "excellent":
      return "🚀";
    case "good":
      return "✅";
    case "needs-improvement":
      return "⚡";
    case "poor":
      return "⚠️";
    default:
      return "📊";
  }
}

/**
 * Log metric to console (development only)
 */
export function logMetric(metric: Metric): void {
  if (process.env.NODE_ENV !== "development") return;

  const metricName = metric.name as MetricName;
  const rating = getMetricRating(metricName, metric.value);
  const emoji = getMetricEmoji(rating);
  const formattedValue = formatMetricValue(metricName, metric.value);
  const threshold = PERFORMANCE_THRESHOLDS[metricName];

  console.log(
    `${emoji} [Web Vitals] ${metric.name}: ${formattedValue}`,
    `(Rating: ${rating}, Target: ${formatMetricValue(metricName, threshold.target)})`,
    {
      id: metric.id,
      delta: metric.delta,
      navigationType: metric.navigationType,
      rating: metric.rating,
    }
  );

  // Warning for poor metrics
  if (rating === "poor") {
    console.warn(
      `⚠️ PERFORMANCE WARNING: ${metric.name} is ${formattedValue}, which exceeds the poor threshold of ${formatMetricValue(metricName, threshold.poor)}`
    );
  }
}

/**
 * Send metric to analytics endpoint
 * Uses sendBeacon for reliability (doesn't block page unload)
 */
export function sendToAnalytics(metric: Metric): void {
  // Only send in production or if explicitly enabled
  if (process.env.NODE_ENV !== "production" && !process.env.NEXT_PUBLIC_ENABLE_ANALYTICS) {
    return;
  }

  const metricName = metric.name as MetricName;
  const rating = getMetricRating(metricName, metric.value);

  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    rating: rating,
    id: metric.id,
    delta: metric.delta,
    navigationType: metric.navigationType,
    timestamp: Date.now(),
    url: typeof window !== "undefined" ? window.location.href : "",
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
  });

  // Use sendBeacon if available (preferred for reliability)
  if (typeof navigator !== "undefined" && navigator.sendBeacon) {
    navigator.sendBeacon("/api/analytics", body);
  } else {
    // Fallback to fetch with keepalive
    fetch("/api/analytics", {
      body,
      method: "POST",
      keepalive: true,
      headers: {
        "Content-Type": "application/json",
      },
    }).catch(() => {
      // Silent failure - don't block user experience
    });
  }
}

// gtag type is declared globally in analytics.ts - no duplicate declaration needed

/**
 * Send metric to Google Analytics 4
 */
export function sendToGoogleAnalytics(metric: Metric): void {
  if (typeof window === "undefined") return;

  const gtag = window.gtag;
  if (!gtag) return;

  const metricName = metric.name as MetricName;
  const rating = getMetricRating(metricName, metric.value);

  // Send event to GA4
  gtag("event", metric.name, {
    event_category: "Web Vitals",
    event_label: metric.id,
    value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
    metric_rating: rating,
    metric_delta: metric.delta,
    non_interaction: true,
  });
}

/**
 * Main reporting function - handles all metric reporting
 */
export function reportWebVitals(metric: Metric): void {
  // Always log in development
  if (process.env.NODE_ENV === "development") {
    logMetric(metric);
  }

  // Send to analytics in production
  if (process.env.NODE_ENV === "production") {
    // Send to custom endpoint
    sendToAnalytics(metric);

    // Send to Google Analytics if available
    sendToGoogleAnalytics(metric);
  }
}

/**
 * Initialize Web Vitals monitoring
 * Import this in a client component to start tracking
 *
 * Note: FID is deprecated in web-vitals v4+ in favor of INP
 * We track INP which is a more comprehensive interactivity metric
 */
export async function initWebVitals(): Promise<void> {
  if (typeof window === "undefined") return;

  try {
    // Dynamic import to avoid SSR issues
    const { onCLS, onLCP, onFCP, onTTFB, onINP } = await import("web-vitals");

    // Track all Core Web Vitals
    onCLS(reportWebVitals);
    onLCP(reportWebVitals);
    onFCP(reportWebVitals);
    onTTFB(reportWebVitals);
    onINP(reportWebVitals);

    if (process.env.NODE_ENV === "development") {
      console.log("✅ [Performance] Web Vitals monitoring initialized");
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("❌ [Performance] Failed to initialize Web Vitals:", error);
    }
  }
}

/**
 * Performance marks for custom measurements
 */
export const performanceMark = {
  start: (name: string) => {
    if (typeof performance !== "undefined" && performance.mark) {
      performance.mark(`${name}-start`);
    }
  },

  end: (name: string) => {
    if (typeof performance !== "undefined" && performance.mark) {
      performance.mark(`${name}-end`);

      try {
        performance.measure(name, `${name}-start`, `${name}-end`);

        const measure = performance.getEntriesByName(name)[0];
        if (measure && process.env.NODE_ENV === "development") {
          console.log(`⏱️ [Performance Mark] ${name}: ${Math.round(measure.duration)}ms`);
        }
      } catch {
        // Measurement failed - silent failure
      }
    }
  },
};

/**
 * Get all performance entries for debugging
 */
export function getPerformanceEntries(): PerformanceEntry[] {
  if (typeof performance === "undefined") return [];
  return performance.getEntries();
}

/**
 * Clear all performance marks and measures
 */
export function clearPerformanceMarks(): void {
  if (typeof performance !== "undefined") {
    performance.clearMarks();
    performance.clearMeasures();
  }
}
