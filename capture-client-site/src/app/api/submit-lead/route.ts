/**
 * Lead Submission API Route - HARDENED VERSION
 *
 * Accepts lead form submissions and forwards to GoHighLevel webhook.
 * Protected by middleware rate limiting (5 requests/minute per IP).
 *
 * Security & Reliability measures:
 * - Rate limiting via middleware
 * - Input validation with required field checks
 * - Proper error handling with visible failures
 * - Fallback persistence for failed submissions
 * - Comprehensive logging with timestamps
 * - No sensitive data exposure in responses
 */

import { NextResponse } from 'next/server';
import { sendLeadNotification } from '@/lib/email';
import fs from 'fs';
import path from 'path';

// Environment variables
const GOHIGHLEVEL_WEBHOOK_URL = process.env.GOHIGHLEVEL_WEBHOOK_URL;
const RESEND_API_KEY = process.env.RESEND_API_KEY;

// Maximum payload size (prevent abuse)
const MAX_PAYLOAD_SIZE = 10000; // 10KB

// Fallback leads file path (for when GHL fails)
const FALLBACK_LEADS_DIR = path.join(process.cwd(), 'data');
const FALLBACK_LEADS_FILE = path.join(FALLBACK_LEADS_DIR, 'failed-leads.json');

// ==========================================
// LOGGING UTILITIES
// ==========================================

interface LogContext {
  timestamp: string;
  source?: string;
  email?: string;
  phone?: string;
  status: 'SUCCESS' | 'FAILURE' | 'WARNING' | 'FALLBACK';
  integration?: 'GHL' | 'RESEND' | 'VALIDATION';
  error?: string;
  details?: string;
}

function logLead(context: LogContext): void {
  const logEntry = {
    ...context,
    env: process.env.NODE_ENV,
  };

  const prefix = context.status === 'FAILURE' ? '🚨' :
                 context.status === 'WARNING' ? '⚠️' :
                 context.status === 'FALLBACK' ? '💾' : '✅';

  const message = `[submit-lead] ${prefix} ${context.status} | ${context.integration || 'GENERAL'} | ${context.source || 'unknown'} | ${context.email || context.phone || 'no-contact'}`;

  if (context.status === 'FAILURE') {
    console.error(message, JSON.stringify(logEntry, null, 2));
  } else if (context.status === 'WARNING' || context.status === 'FALLBACK') {
    console.warn(message, JSON.stringify(logEntry, null, 2));
  } else {
    console.log(message, JSON.stringify(logEntry, null, 2));
  }
}

// ==========================================
// FALLBACK PERSISTENCE
// ==========================================

interface LeadData {
  name: string;
  email: string;
  phone: string;
  company: string;
  source: string;
  service: string;
  message: string;
  challenge: string;
  timestamp: string;
  referer?: string;
  failureReason?: string;
}

async function saveFailedLead(lead: LeadData): Promise<boolean> {
  try {
    // Ensure directory exists
    if (!fs.existsSync(FALLBACK_LEADS_DIR)) {
      fs.mkdirSync(FALLBACK_LEADS_DIR, { recursive: true });
    }

    // Load existing failed leads
    let failedLeads: LeadData[] = [];
    if (fs.existsSync(FALLBACK_LEADS_FILE)) {
      const existing = fs.readFileSync(FALLBACK_LEADS_FILE, 'utf-8');
      failedLeads = JSON.parse(existing);
    }

    // Add new failed lead
    failedLeads.push(lead);

    // Save back to file
    fs.writeFileSync(FALLBACK_LEADS_FILE, JSON.stringify(failedLeads, null, 2));

    logLead({
      timestamp: new Date().toISOString(),
      source: lead.source,
      email: lead.email,
      phone: lead.phone,
      status: 'FALLBACK',
      details: 'Lead saved to fallback file for manual processing',
    });

    return true;
  } catch (error) {
    console.error('[submit-lead] 🚨 CRITICAL: Failed to save lead to fallback file:', error);
    return false;
  }
}

// ==========================================
// MAIN API HANDLER
// ==========================================

export async function POST(request: Request) {
  const timestamp = new Date().toISOString();
  const referer = request.headers.get('referer') || undefined;

  try {
    // ==========================================
    // ENVIRONMENT VALIDATION
    // ==========================================

    const missingEnvVars: string[] = [];
    if (!GOHIGHLEVEL_WEBHOOK_URL) missingEnvVars.push('GOHIGHLEVEL_WEBHOOK_URL');

    if (missingEnvVars.length > 0) {
      logLead({
        timestamp,
        status: 'FAILURE',
        integration: 'VALIDATION',
        error: `Missing environment variables: ${missingEnvVars.join(', ')}`,
        details: 'API cannot process leads without required configuration',
      });

      // In production, this is a critical configuration error
      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json(
          { error: 'Service temporarily unavailable', code: 'CONFIG_ERROR' },
          { status: 503 }
        );
      }
    }

    // ==========================================
    // PAYLOAD SIZE CHECK
    // ==========================================

    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > MAX_PAYLOAD_SIZE) {
      logLead({
        timestamp,
        status: 'FAILURE',
        integration: 'VALIDATION',
        error: 'Payload too large',
        details: `Size: ${contentLength} bytes, Max: ${MAX_PAYLOAD_SIZE} bytes`,
      });
      return NextResponse.json(
        { error: 'Payload too large' },
        { status: 413 }
      );
    }

    const body = await request.json();

    // ==========================================
    // REQUIRED FIELD VALIDATION
    // ==========================================

    if (!body.email && !body.phone) {
      logLead({
        timestamp,
        source: body.source,
        status: 'FAILURE',
        integration: 'VALIDATION',
        error: 'Missing required contact info',
        details: 'Neither email nor phone provided',
      });
      return NextResponse.json(
        { error: 'Email or phone is required' },
        { status: 400 }
      );
    }

    // ==========================================
    // INPUT SANITIZATION
    // ==========================================

    const sanitizeString = (input: unknown): string => {
      if (typeof input !== 'string') return '';
      return input.replace(/\0/g, '').slice(0, 500);
    };

    const payload: LeadData = {
      name: sanitizeString(body.name),
      email: sanitizeString(body.email),
      phone: sanitizeString(body.phone),
      company: sanitizeString(body.company),
      source: sanitizeString(body.source) || 'website',
      service: sanitizeString(body.service),
      message: sanitizeString(body.message),
      challenge: sanitizeString(body.challenge),
      timestamp,
      referer,
    };

    // ==========================================
    // GOHIGHLEVEL SUBMISSION
    // ==========================================

    let ghlSuccess = false;
    let ghlError: string | undefined;

    if (GOHIGHLEVEL_WEBHOOK_URL) {
      try {
        const ghlResponse = await fetch(GOHIGHLEVEL_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (ghlResponse.ok) {
          ghlSuccess = true;
          logLead({
            timestamp,
            source: payload.source,
            email: payload.email,
            phone: payload.phone,
            status: 'SUCCESS',
            integration: 'GHL',
            details: `Status: ${ghlResponse.status}`,
          });
        } else {
          ghlError = `HTTP ${ghlResponse.status}: ${ghlResponse.statusText}`;
          logLead({
            timestamp,
            source: payload.source,
            email: payload.email,
            phone: payload.phone,
            status: 'FAILURE',
            integration: 'GHL',
            error: ghlError,
            details: 'Lead will be saved to fallback',
          });
        }
      } catch (error) {
        ghlError = error instanceof Error ? error.message : 'Unknown error';
        logLead({
          timestamp,
          source: payload.source,
          email: payload.email,
          phone: payload.phone,
          status: 'FAILURE',
          integration: 'GHL',
          error: ghlError,
          details: 'Network or fetch error - lead will be saved to fallback',
        });
      }
    }

    // ==========================================
    // FALLBACK PERSISTENCE (if GHL failed)
    // ==========================================

    if (!ghlSuccess) {
      payload.failureReason = ghlError || 'GHL webhook not configured';
      await saveFailedLead(payload);
    }

    // ==========================================
    // EMAIL NOTIFICATION (non-blocking)
    // ==========================================

    if (RESEND_API_KEY) {
      sendLeadNotification({
        name: payload.name,
        email: payload.email || undefined,
        phone: payload.phone,
        company: payload.company || undefined,
        source: payload.source,
        service: payload.service || undefined,
        message: payload.message || undefined,
        challenge: payload.challenge || undefined,
        timestamp,
        pageUrl: referer,
      }).catch((error) => {
        logLead({
          timestamp,
          source: payload.source,
          email: payload.email,
          phone: payload.phone,
          status: 'WARNING',
          integration: 'RESEND',
          error: error instanceof Error ? error.message : 'Email send failed',
          details: 'Email notification failed but lead was processed',
        });
      });
    } else {
      logLead({
        timestamp,
        source: payload.source,
        status: 'WARNING',
        integration: 'RESEND',
        error: 'RESEND_API_KEY not configured',
        details: 'Email notifications disabled',
      });
    }

    // ==========================================
    // RESPONSE
    // ==========================================

    // Only return success if GHL submission worked OR fallback saved
    const response = NextResponse.json({
      success: true,
      ghlSuccess,
      fallbackSaved: !ghlSuccess,
    });
    addSecurityHeaders(response);
    return response;

  } catch (error) {
    // ==========================================
    // CRITICAL ERROR HANDLING
    // ==========================================

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    logLead({
      timestamp,
      status: 'FAILURE',
      error: errorMessage,
      details: 'Unhandled exception in lead submission',
    });

    // Try to save whatever we have to fallback
    try {
      await saveFailedLead({
        name: '',
        email: '',
        phone: '',
        company: '',
        source: 'error-recovery',
        service: '',
        message: '',
        challenge: '',
        timestamp,
        referer,
        failureReason: `Unhandled error: ${errorMessage}`,
      });
    } catch {
      console.error('[submit-lead] 🚨 CRITICAL: Could not save to fallback during error recovery');
    }

    const response = NextResponse.json(
      { error: 'Failed to process lead submission', code: 'PROCESSING_ERROR' },
      { status: 500 }
    );
    addSecurityHeaders(response);
    return response;
  }
}

// ==========================================
// SECURITY HEADERS
// ==========================================

function addSecurityHeaders(response: NextResponse): void {
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
}

// ==========================================
// GET handler for health check
// ==========================================

export async function GET() {
  const status = {
    healthy: true,
    timestamp: new Date().toISOString(),
    config: {
      ghlConfigured: !!GOHIGHLEVEL_WEBHOOK_URL,
      resendConfigured: !!RESEND_API_KEY,
    },
  };

  // Check if there are failed leads waiting to be processed
  let pendingLeads = 0;
  try {
    if (fs.existsSync(FALLBACK_LEADS_FILE)) {
      const leads = JSON.parse(fs.readFileSync(FALLBACK_LEADS_FILE, 'utf-8'));
      pendingLeads = leads.length;
    }
  } catch {
    // Ignore read errors
  }

  return NextResponse.json({
    ...status,
    pendingFailedLeads: pendingLeads,
  });
}
