/**
 * Lead Submission API Route
 *
 * Accepts lead form submissions and forwards to GoHighLevel webhook.
 * Protected by middleware rate limiting (5 requests/minute per IP).
 *
 * Security measures:
 * - Rate limiting via middleware
 * - Input validation
 * - Graceful error handling
 * - No sensitive data exposure
 */

import { NextResponse } from 'next/server';
import { sendLeadNotification } from '@/lib/email';

// GoHighLevel Webhook URL from environment variable
const GOHIGHLEVEL_WEBHOOK_URL = process.env.GOHIGHLEVEL_WEBHOOK_URL;

// Maximum payload size (prevent abuse)
const MAX_PAYLOAD_SIZE = 10000; // 10KB

export async function POST(request: Request) {
  try {
    // Validate webhook URL is configured
    if (!GOHIGHLEVEL_WEBHOOK_URL) {
      console.error('[submit-lead] GOHIGHLEVEL_WEBHOOK_URL not configured');
      return NextResponse.json({ success: true, warning: 'Webhook not configured' });
    }

    // Basic payload size check (prevent abuse)
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > MAX_PAYLOAD_SIZE) {
      return NextResponse.json(
        { error: 'Payload too large' },
        { status: 413 }
      );
    }

    const body = await request.json();

    // Validate required fields - need at least email OR phone
    if (!body.email && !body.phone) {
      return NextResponse.json(
        { error: 'Email or phone is required' },
        { status: 400 }
      );
    }

    // Basic input sanitization (prevent injection attacks)
    const sanitizeString = (input: unknown): string => {
      if (typeof input !== 'string') return '';
      // Remove null bytes and limit length
      return input.replace(/\0/g, '').slice(0, 500);
    };

    // Build the payload for GoHighLevel - include all collected data
    const payload = {
      name: sanitizeString(body.name),
      email: sanitizeString(body.email),
      phone: sanitizeString(body.phone),
      company: sanitizeString(body.company),
      // Additional fields for better lead context
      source: sanitizeString(body.source) || 'website',
      service: sanitizeString(body.service),
      message: sanitizeString(body.message),
      challenge: sanitizeString(body.challenge),
    };

    // Forward to GoHighLevel webhook (server-side, no CORS issues)
    const ghlResponse = await fetch(GOHIGHLEVEL_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!ghlResponse.ok) {
      console.warn('[submit-lead] GHL webhook returned non-200:', ghlResponse.status);
    }

    // Send email notification (non-blocking - don't fail the request if email fails)
    // Get page URL from referer header if available
    const referer = request.headers.get('referer') || undefined;

    sendLeadNotification({
      name: payload.name,
      email: payload.email || undefined,
      phone: payload.phone,
      company: payload.company || undefined,
      source: payload.source,
      service: payload.service || undefined,
      message: payload.message || undefined,
      challenge: payload.challenge || undefined,
      timestamp: new Date().toISOString(),
      pageUrl: referer,
    }).catch((error) => {
      // Log error but don't fail the request
      console.error('[submit-lead] Email notification failed:', error);
    });

    const response = NextResponse.json({ success: true });
    addSecurityHeaders(response);
    return response;
  } catch (error) {
    // Log error for debugging
    console.error('[submit-lead] Error processing lead:', error);
    // Return success anyway for graceful degradation
    const response = NextResponse.json({ success: true, warning: 'Error forwarding to webhook' });
    addSecurityHeaders(response);
    return response;
  }
}

// ==========================================
// SECURITY HEADERS
// ==========================================

/**
 * Add security headers to response
 * These provide additional protection against common attacks
 */
function addSecurityHeaders(response: NextResponse): void {
  // Prevent clickjacking
  response.headers.set('X-Frame-Options', 'DENY');

  // Prevent MIME sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // XSS Protection (legacy but still useful)
  response.headers.set('X-XSS-Protection', '1; mode=block');

  // Referrer policy
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
}

// ==========================================
// USAGE NOTES
// ==========================================

/**
 * Security Measures Implemented:
 *
 * 1. Rate Limiting (via middleware):
 *    - 5 requests/minute per IP
 *    - Prevents spam and abuse
 *
 * 2. Input Validation:
 *    - Required fields check
 *    - Payload size limit (10KB)
 *    - Input sanitization (null byte removal, length limits)
 *
 * 3. Security Headers:
 *    - X-Frame-Options: Prevent clickjacking
 *    - X-Content-Type-Options: Prevent MIME sniffing
 *    - X-XSS-Protection: XSS protection
 *    - Referrer-Policy: Control referrer information
 *
 * 4. Error Handling:
 *    - Graceful degradation
 *    - No sensitive data in error messages
 *    - Consistent success responses
 *
 * Production Recommendations:
 * - Add CAPTCHA for public forms
 * - Implement honeypot fields
 * - Add request signing/verification
 * - Monitor for suspicious patterns
 * - Consider Cloudflare Bot Management
 */
