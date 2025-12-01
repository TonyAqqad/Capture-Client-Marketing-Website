/**
 * Web Vitals Analytics API Endpoint
 *
 * Receives Core Web Vitals metrics from the client and logs them.
 * Extend this to send metrics to your analytics service.
 *
 * Supported Analytics Services:
 * - Google Analytics 4 (Measurement Protocol)
 * - Vercel Analytics
 * - Custom analytics database
 * - DataDog / New Relic
 * - Sentry Performance Monitoring
 */

import { NextRequest, NextResponse } from "next/server";

interface WebVitalMetric {
  name: "CLS" | "FID" | "FCP" | "LCP" | "TTFB" | "INP";
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  delta: number;
  id: string;
  navigationType: string;
  timestamp: number;
  url: string;
  userAgent: string;
}

export async function POST(request: NextRequest) {
  try {
    const metric: WebVitalMetric = await request.json();

    // Basic validation
    if (!metric.name || !metric.value || !metric.rating) {
      return NextResponse.json({ error: "Invalid metric data" }, { status: 400 });
    }

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
    // await saveToDatabase(metric);

    // ==========================================
    // OPTION 4: Log Aggregation Service
    // ==========================================
    // await sendToDataDog(metric);
    // await sendToNewRelic(metric);
    // await sendToSentry(metric);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
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
