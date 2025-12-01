/**
 * Rate Limiting Utility
 *
 * Edge-compatible rate limiting using sliding window algorithm.
 * Uses in-memory Map storage (suitable for Vercel Edge runtime).
 *
 * For high-traffic production, consider:
 * - Redis/Upstash for distributed rate limiting
 * - Cloudflare Rate Limiting
 * - Vercel Edge Config
 */

import { NextRequest } from "next/server";

// ==========================================
// TYPE DEFINITIONS
// ==========================================

interface RateLimitEntry {
  count: number;
  windowStart: number;
}

interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
}

interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetTime: number;
}

// ==========================================
// IN-MEMORY STORE
// ==========================================

/**
 * In-memory store for rate limit tracking
 * Note: Resets on serverless function cold starts (acceptable for demo site)
 */
const rateLimitStore = new Map<string, RateLimitEntry>();

// ==========================================
// RATE LIMIT CONFIGURATIONS
// ==========================================

export const RATE_LIMIT_CONFIGS = {
  general: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 20, // 20 requests per minute
  },
  leadSubmission: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 5, // 5 requests per minute (strict to prevent spam)
  },
  demoApi: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 10, // 10 requests per minute (for AI demo)
  },
} as const;

// ==========================================
// IP EXTRACTION
// ==========================================

/**
 * Extract client IP from request headers
 * Handles various proxy headers (Vercel, Cloudflare, etc.)
 */
export function getClientIP(request: NextRequest): string {
  // Check common proxy headers
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const cfConnectingIp = request.headers.get("cf-connecting-ip"); // Cloudflare

  // x-forwarded-for can contain multiple IPs (client, proxy1, proxy2)
  // We want the first one (actual client)
  if (forwardedFor) {
    const ips = forwardedFor.split(",").map((ip) => ip.trim());
    return ips[0] || "unknown";
  }

  if (realIp) {
    return realIp;
  }

  if (cfConnectingIp) {
    return cfConnectingIp;
  }

  // Fallback - in Edge runtime, ip property may not be available
  // Use 'unknown' as final fallback for rate limiting
  return "unknown";
}

// ==========================================
// SLIDING WINDOW RATE LIMITER
// ==========================================

/**
 * Check if request is allowed under rate limit
 * Uses sliding window algorithm for accurate rate limiting
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig = RATE_LIMIT_CONFIGS.general
): RateLimitResult {
  const now = Date.now();
  const windowStart = now - config.windowMs;

  // Get or create entry
  let entry = rateLimitStore.get(identifier);

  // Clean up expired entry or create new one
  if (!entry || entry.windowStart < windowStart) {
    entry = {
      count: 1,
      windowStart: now,
    };
    rateLimitStore.set(identifier, entry);

    return {
      allowed: true,
      limit: config.maxRequests,
      remaining: config.maxRequests - 1,
      resetTime: now + config.windowMs,
    };
  }

  // Check if limit exceeded
  if (entry.count >= config.maxRequests) {
    return {
      allowed: false,
      limit: config.maxRequests,
      remaining: 0,
      resetTime: entry.windowStart + config.windowMs,
    };
  }

  // Increment count
  entry.count++;

  return {
    allowed: true,
    limit: config.maxRequests,
    remaining: config.maxRequests - entry.count,
    resetTime: entry.windowStart + config.windowMs,
  };
}

// ==========================================
// STORE CLEANUP
// ==========================================

/**
 * Clean up expired entries from the store
 * Runs periodically to prevent memory leaks
 */
function cleanupExpiredEntries(): void {
  const now = Date.now();
  const maxAge = Math.max(
    RATE_LIMIT_CONFIGS.general.windowMs,
    RATE_LIMIT_CONFIGS.leadSubmission.windowMs,
    RATE_LIMIT_CONFIGS.demoApi.windowMs
  );

  const entries = Array.from(rateLimitStore.entries());
  for (const [key, entry] of entries) {
    // Remove entries older than the longest window
    if (now - entry.windowStart > maxAge) {
      rateLimitStore.delete(key);
    }
  }
}

// Run cleanup every 5 minutes
// Note: This may not run in Edge environments - cleanup happens on access too
if (typeof setInterval !== "undefined") {
  setInterval(cleanupExpiredEntries, 5 * 60 * 1000);
}

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Get rate limit config for specific route pattern
 */
export function getRateLimitConfig(pathname: string): RateLimitConfig {
  if (pathname.includes("/api/submit-lead")) {
    return RATE_LIMIT_CONFIGS.leadSubmission;
  }

  if (pathname.includes("/api/demo-response")) {
    return RATE_LIMIT_CONFIGS.demoApi;
  }

  return RATE_LIMIT_CONFIGS.general;
}

/**
 * Format seconds for human-readable output
 */
export function formatResetTime(resetTime: number): string {
  const secondsUntilReset = Math.ceil((resetTime - Date.now()) / 1000);

  if (secondsUntilReset < 60) {
    return `${secondsUntilReset} second${secondsUntilReset === 1 ? "" : "s"}`;
  }

  const minutes = Math.ceil(secondsUntilReset / 60);
  return `${minutes} minute${minutes === 1 ? "" : "s"}`;
}
