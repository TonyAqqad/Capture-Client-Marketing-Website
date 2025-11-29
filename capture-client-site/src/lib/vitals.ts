/**
 * Web Vitals Tracking
 *
 * Tracks Core Web Vitals and sends them to analytics.
 * Core Web Vitals are key metrics for page experience:
 * - LCP (Largest Contentful Paint): Loading performance (target: < 2.5s)
 * - INP (Interaction to Next Paint): Interactivity (target: < 200ms) [Replaces FID as of 2024]
 * - CLS (Cumulative Layout Shift): Visual stability (target: < 0.1)
 *
 * Additional metrics:
 * - FCP (First Contentful Paint): First paint (target: < 1.8s)
 * - TTFB (Time to First Byte): Server response (target: < 600ms)
 *
 * Note: FID (First Input Delay) was deprecated in favor of INP in 2024.
 *
 * Usage in app/layout.tsx:
 * ```tsx
 * import { WebVitalsReporter } from '@/lib/vitals';
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <WebVitalsReporter />
 *         {children}
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */

import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from "web-vitals";

/**
 * Analytics endpoint for sending metrics
 * Replace with your analytics service (Google Analytics, Vercel Analytics, etc.)
 */
const ANALYTICS_ENDPOINT = "/api/analytics";

interface WebVitalsMetric extends Metric {
  label: "web-vital";
}

/**
 * Send metric to analytics service
 */
function sendToAnalytics(metric: WebVitalsMetric) {
  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
    navigationType: metric.navigationType,
    timestamp: Date.now(),
    url: window.location.href,
    userAgent: navigator.userAgent,
  });

  // Use `navigator.sendBeacon()` if available, falling back to `fetch()`
  if (navigator.sendBeacon) {
    navigator.sendBeacon(ANALYTICS_ENDPOINT, body);
  } else {
    fetch(ANALYTICS_ENDPOINT, {
      body,
      method: "POST",
      keepalive: true,
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((err) => {
      console.error("Failed to send web vital:", err);
    });
  }

  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log(
      `%c[Web Vitals] ${metric.name}`,
      `color: ${getMetricColor(metric.rating)}; font-weight: bold;`,
      {
        value: metric.value.toFixed(2),
        rating: metric.rating,
        delta: metric.delta.toFixed(2),
      }
    );
  }
}

/**
 * Get color based on metric rating
 */
function getMetricColor(rating: string): string {
  switch (rating) {
    case "good":
      return "#0CCE6B";
    case "needs-improvement":
      return "#FFA400";
    case "poor":
      return "#FF4E42";
    default:
      return "#666";
  }
}

/**
 * Report all Web Vitals
 * Call this once in your app (e.g., in layout.tsx or _app.tsx)
 */
export function reportWebVitals() {
  try {
    // Core Web Vitals (Note: FID is deprecated in favor of INP as of 2024)
    onCLS((metric: Metric) => sendToAnalytics({ ...metric, label: "web-vital" }));
    onINP((metric: Metric) => sendToAnalytics({ ...metric, label: "web-vital" }));
    onLCP((metric: Metric) => sendToAnalytics({ ...metric, label: "web-vital" }));

    // Additional metrics
    onFCP((metric: Metric) => sendToAnalytics({ ...metric, label: "web-vital" }));
    onTTFB((metric: Metric) => sendToAnalytics({ ...metric, label: "web-vital" }));
  } catch (err) {
    console.error("Failed to initialize web vitals:", err);
  }
}

/**
 * Client-side component to initialize Web Vitals tracking
 * Use this in your root layout
 */
"use client";

import { useEffect } from "react";

export function WebVitalsReporter() {
  useEffect(() => {
    // Only report on client-side
    if (typeof window !== "undefined") {
      reportWebVitals();
    }
  }, []);

  return null;
}

/**
 * Performance Budget Thresholds
 * Use these to validate your metrics
 */
export const PERFORMANCE_BUDGETS = {
  // Core Web Vitals (Google thresholds)
  LCP: {
    good: 2500, // 2.5 seconds
    needsImprovement: 4000, // 4 seconds
  },
  FID: {
    good: 100, // 100 milliseconds
    needsImprovement: 300, // 300 milliseconds
  },
  CLS: {
    good: 0.1, // 0.1 score
    needsImprovement: 0.25, // 0.25 score
  },
  INP: {
    good: 200, // 200 milliseconds
    needsImprovement: 500, // 500 milliseconds
  },
  FCP: {
    good: 1800, // 1.8 seconds
    needsImprovement: 3000, // 3 seconds
  },
  TTFB: {
    good: 600, // 600 milliseconds
    needsImprovement: 1500, // 1.5 seconds
  },
};

/**
 * Check if metric passes budget
 */
export function checkPerformanceBudget(
  metricName: keyof typeof PERFORMANCE_BUDGETS,
  value: number
): "good" | "needs-improvement" | "poor" {
  const budget = PERFORMANCE_BUDGETS[metricName];
  if (value <= budget.good) return "good";
  if (value <= budget.needsImprovement) return "needs-improvement";
  return "poor";
}

/**
 * Format metric value for display
 */
export function formatMetricValue(metricName: string, value: number): string {
  // CLS is unitless, others are in milliseconds
  if (metricName === "CLS") {
    return value.toFixed(3);
  }
  return `${Math.round(value)}ms`;
}

/**
 * Get metric recommendations
 */
export function getMetricRecommendations(
  metricName: string,
  rating: string
): string[] {
  if (rating === "good") return ["Keep up the good work!"];

  const recommendations: Record<string, string[]> = {
    LCP: [
      "Optimize images with next/image",
      "Use AVIF/WebP formats",
      "Implement lazy loading for below-fold content",
      "Reduce server response time",
      "Use a CDN for static assets",
      "Preload critical resources",
    ],
    FID: [
      "Minimize JavaScript execution time",
      "Code-split large bundles",
      "Defer non-critical JavaScript",
      "Use web workers for heavy computations",
      "Remove unused third-party scripts",
    ],
    CLS: [
      "Add width/height to images",
      "Reserve space for ads and embeds",
      "Avoid inserting content above existing content",
      "Use CSS aspect-ratio for dynamic content",
      "Preload fonts with font-display: swap",
    ],
    INP: [
      "Optimize event handlers",
      "Debounce/throttle frequent events",
      "Break up long tasks",
      "Use CSS animations over JavaScript",
      "Reduce DOM size",
    ],
    FCP: [
      "Eliminate render-blocking resources",
      "Inline critical CSS",
      "Optimize fonts",
      "Reduce server response time",
    ],
    TTFB: [
      "Optimize server performance",
      "Use edge caching",
      "Reduce server-side processing",
      "Use HTTP/2 or HTTP/3",
      "Optimize database queries",
    ],
  };

  return recommendations[metricName] || [];
}
