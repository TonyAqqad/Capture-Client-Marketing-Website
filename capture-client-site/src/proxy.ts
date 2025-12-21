/**
 * Next.js Proxy - Global Rate Limiting
 *
 * Applies rate limiting to all API routes before they execute.
 * Runs on Node.js runtime (Next.js 16+ proxy convention).
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/proxy
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  checkRateLimit,
  getClientIP,
  getRateLimitConfig,
  formatResetTime,
} from "@/lib/rate-limit";

// ==========================================
// PROXY CONFIGURATION
// ==========================================

export const config = {
  matcher: [
    // Apply only to API routes
    "/api/:path*",
  ],
};

// ==========================================
// MAIN PROXY HANDLER
// ==========================================

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get client identifier (IP address)
  const clientIP = getClientIP(request);

  // Get appropriate rate limit config for this route
  const rateLimitConfig = getRateLimitConfig(pathname);

  // Check rate limit
  const rateLimitResult = checkRateLimit(clientIP, rateLimitConfig);

  // If rate limit exceeded, return 429
  if (!rateLimitResult.allowed) {
    const retryAfter = formatResetTime(rateLimitResult.resetTime);

    return NextResponse.json(
      {
        error: "Too many requests",
        message: `Rate limit exceeded. Please try again in ${retryAfter}.`,
        retryAfter,
      },
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "X-RateLimit-Limit": rateLimitResult.limit.toString(),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": new Date(rateLimitResult.resetTime).toISOString(),
          "Retry-After": Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString(),
        },
      }
    );
  }

  // Rate limit OK - add headers and continue
  const response = NextResponse.next();

  // Add rate limit headers to successful responses
  response.headers.set("X-RateLimit-Limit", rateLimitResult.limit.toString());
  response.headers.set("X-RateLimit-Remaining", rateLimitResult.remaining.toString());
  response.headers.set("X-RateLimit-Reset", new Date(rateLimitResult.resetTime).toISOString());

  return response;
}

// ==========================================
// USAGE NOTES
// ==========================================

/**
 * Rate Limit Configuration:
 *
 * General API routes: 20 requests/minute
 * Lead submission: 5 requests/minute (stricter to prevent spam)
 * Demo API: 10 requests/minute (AI calls are expensive)
 *
 * Headers returned:
 * - X-RateLimit-Limit: Maximum requests allowed
 * - X-RateLimit-Remaining: Requests remaining in current window
 * - X-RateLimit-Reset: ISO timestamp when limit resets
 * - Retry-After: Seconds until rate limit resets (only on 429)
 *
 * Production Considerations:
 * - This uses in-memory storage (resets on cold starts)
 * - For distributed rate limiting, use Redis/Upstash
 * - Consider IP allowlisting for trusted clients
 * - Monitor rate limit violations in analytics
 */
