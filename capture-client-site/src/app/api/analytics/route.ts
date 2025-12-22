/**
 * Enhanced Web Vitals Analytics API Endpoint
 *
 * Receives Core Web Vitals metrics from the client and processes them.
 * Supports multiple analytics integrations and provides detailed logging.
 *
 * Performance Budget Enforcement:
 * - LCP: < 2.5s (Target: 2.0s)
 * - FID: < 100ms (Target: 50ms)
 * - INP: < 200ms (Target: 100ms)
 * - CLS: < 0.1 (Target: 0.05)
 * - FCP: < 1.8s (Target: 1.2s)
 * - TTFB: < 600ms (Target: 400ms)
 *
 * Supported Analytics Services:
 * - Google Analytics 4 (Measurement Protocol)
 * - Vercel Analytics
 * - Custom analytics database
 * - DataDog / New Relic
 * - Sentry Performance Monitoring
 */

import { NextRequest, NextResponse } from "next/server";
import { PERFORMANCE_THRESHOLDS, getMetricRating, formatMetricValue } from "@/lib/performance";

interface WebVitalMetric {
  name: "CLS" | "FID" | "FCP" | "LCP" | "TTFB" | "INP";
  value: number;
  rating: "good" | "needs-improvement" | "poor" | "excellent";
  delta: number;
  id: string;
  navigationType: string;
  timestamp: number;
  url: string;
  userAgent: string;
}

interface PerformanceSummary {
  metric: string;
  value: string;
  rating: string;
  thresholds: {
    target: string;
    good: string;
    poor: string;
  };
  percentOfTarget: string;
  status: string;
}

export async function POST(request: NextRequest) {
  try {
    const metric: WebVitalMetric = await request.json();

    // Basic validation
    if (!metric.name || metric.value === undefined || !metric.rating) {
      return NextResponse.json({ error: "Invalid metric data" }, { status: 400 });
    }

    // Enhanced metric analysis
    const threshold = PERFORMANCE_THRESHOLDS[metric.name];
    const enhancedRating = getMetricRating(metric.name, metric.value);
    const formattedValue = formatMetricValue(metric.name, metric.value);
    const percentOfTarget = ((metric.value / threshold.target) * 100).toFixed(0);

    // Create performance summary
    const summary: PerformanceSummary = {
      metric: metric.name,
      value: formattedValue,
      rating: enhancedRating,
      thresholds: {
        target: formatMetricValue(metric.name, threshold.target),
        good: formatMetricValue(metric.name, threshold.good),
        poor: formatMetricValue(metric.name, threshold.poor),
      },
      percentOfTarget: `${percentOfTarget}%`,
      status: getStatusMessage(enhancedRating),
    };

    // Log metrics with detailed analysis
    logMetricToConsole(metric, summary);

    // ==========================================
    // OPTION 1: Google Analytics 4 (GA4)
    // ==========================================
    if (process.env.GA4_MEASUREMENT_ID && process.env.GA4_API_SECRET) {
      await sendToGoogleAnalytics(metric);
    }

    // ==========================================
    // OPTION 2: Vercel Analytics (Built-in)
    // ==========================================
    // Vercel automatically tracks Web Vitals if @vercel/analytics is installed
    // No additional code needed here

    // ==========================================
    // OPTION 3: Custom Database
    // ==========================================
    // await saveToDatabase(metric, summary);

    // ==========================================
    // OPTION 4: Log Aggregation Service
    // ==========================================
    // await sendToDataDog(metric, summary);
    // await sendToNewRelic(metric, summary);
    // await sendToSentry(metric, summary);

    // ==========================================
    // OPTION 5: Alert System (for poor metrics)
    // ==========================================
    if (enhancedRating === "poor") {
      // TODO: Send alert email/Slack notification
      console.error(`🚨 ALERT: Poor ${metric.name} detected: ${formattedValue}`);
    }

    return NextResponse.json(
      {
        success: true,
        summary,
        received: {
          metric: metric.name,
          value: metric.value,
          rating: enhancedRating,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Analytics API] Error processing metric:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * Get status message based on rating
 */
function getStatusMessage(rating: string): string {
  switch (rating) {
    case "excellent":
      return "Exceeds target - excellent performance";
    case "good":
      return "Within good range - acceptable performance";
    case "needs-improvement":
      return "Needs improvement - optimization recommended";
    case "poor":
      return "Poor performance - immediate action required";
    default:
      return "Unknown status";
  }
}

/**
 * Log metric to console with detailed analysis
 */
function logMetricToConsole(metric: WebVitalMetric, summary: PerformanceSummary): void {
  const emoji =
    summary.rating === "excellent"
      ? "🚀"
      : summary.rating === "good"
        ? "✅"
        : summary.rating === "needs-improvement"
          ? "⚡"
          : "⚠️";

  console.log(`${emoji} [Analytics API] Web Vitals Report:`, {
    metric: summary.metric,
    value: summary.value,
    rating: summary.rating,
    status: summary.status,
    percentOfTarget: summary.percentOfTarget,
    url: new URL(metric.url).pathname,
    navigationType: metric.navigationType,
    timestamp: new Date(metric.timestamp).toISOString(),
  });

  // Additional context for poor metrics
  if (summary.rating === "poor") {
    console.error(`\n🚨 CRITICAL PERFORMANCE ISSUE:`, {
      metric: metric.name,
      value: summary.value,
      poorThreshold: summary.thresholds.poor,
      url: metric.url,
      userAgent: metric.userAgent,
    });
  }
}

/**
 * Send metric to Google Analytics 4
 * Uses the Measurement Protocol API
 */
async function sendToGoogleAnalytics(metric: WebVitalMetric) {
  const measurementId = process.env.GA4_MEASUREMENT_ID;
  const apiSecret = process.env.GA4_API_SECRET;

  if (!measurementId || !apiSecret) return;

  const url = `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`;

  const body = {
    client_id: metric.id, // Unique client identifier
    events: [
      {
        name: "web_vitals",
        params: {
          metric_name: metric.name,
          metric_value: metric.value,
          metric_rating: metric.rating,
          metric_delta: metric.delta,
          page_path: new URL(metric.url).pathname,
          event_category: "Web Vitals",
          event_label: metric.name,
          value: Math.round(metric.value),
        },
      },
    ],
  };

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    // Failed to send metric - silent failure
  }
}

/**
 * Save metric to database (example)
 * Uncomment and implement when ready to use
 */
// async function _saveToDatabase(metric: WebVitalMetric) {
//   // Example with Prisma:
//   // await prisma.webVitals.create({
//   //   data: {
//   //     name: metric.name,
//   //     value: metric.value,
//   //     rating: metric.rating,
//   //     url: metric.url,
//   //     timestamp: new Date(metric.timestamp),
//   //     userAgent: metric.userAgent,
//   //   },
//   // });

//   // Example with Supabase:
//   // await supabase.from('web_vitals').insert({
//   //   name: metric.name,
//   //   value: metric.value,
//   //   rating: metric.rating,
//   //   url: metric.url,
//   //   timestamp: new Date(metric.timestamp).toISOString(),
//   // });

//   console.log("[Database] Would save metric:", metric.name);
// }

/**
 * Send to DataDog
 * Uncomment and implement when ready to use
 */
// async function _sendToDataDog(_metric: WebVitalMetric) {
//   const apiKey = process.env.DATADOG_API_KEY;
//   if (!apiKey) return;

//   // DataDog metrics API example
//   // See: https://docs.datadoghq.com/api/latest/metrics/
// }

/**
 * Send to Sentry Performance Monitoring
 * Uncomment and implement when ready to use
 */
// async function _sendToSentry(_metric: WebVitalMetric) {
//   // Sentry automatically captures Web Vitals if configured
//   // See: https://docs.sentry.io/platforms/javascript/performance/
// }

/**
 * Setup Instructions:
 *
 * 1. Google Analytics 4:
 *    - Create GA4 property: https://analytics.google.com/
 *    - Get Measurement ID and API Secret
 *    - Add to .env.local:
 *      GA4_MEASUREMENT_ID=G-XXXXXXXXXX
 *      GA4_API_SECRET=your_api_secret
 *
 * 2. Vercel Analytics:
 *    - Install: npm install @vercel/analytics
 *    - Add to layout.tsx: <Analytics />
 *    - Metrics automatically tracked
 *
 * 3. Custom Database:
 *    - Create table schema for web_vitals
 *    - Implement saveToDatabase() function
 *    - Add database client (Prisma, Supabase, etc.)
 *
 * 4. Access Metrics:
 *    - GA4: Analytics dashboard
 *    - Vercel: vercel.com/[project]/analytics
 *    - Custom: Build your own dashboard
 */
