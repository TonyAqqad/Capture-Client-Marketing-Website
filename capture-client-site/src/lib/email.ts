import { Resend } from "resend";
import { getLeadNotificationEmailHtml } from "./email-templates";

// Email configuration from environment variables
const FROM_EMAIL = process.env.FROM_EMAIL || "onboarding@resend.dev";
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || "";

// Initialize Resend lazily to avoid build-time errors if API key is missing
let resendInstance: Resend | null = null;

function getResendClient(): Resend | null {
  if (!process.env.RESEND_API_KEY) {
    return null;
  }

  if (!resendInstance) {
    resendInstance = new Resend(process.env.RESEND_API_KEY);
  }

  return resendInstance;
}

interface LeadData {
  name: string;
  email?: string;
  phone: string;
  company?: string;
  source: string;
  service?: string;
  message?: string;
  challenge?: string;
  timestamp?: string;
  pageUrl?: string;
}

interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Send lead notification email to the agency
 * Non-blocking: errors are logged but don't fail the request
 */
export async function sendLeadNotification(leadData: LeadData): Promise<EmailResult> {
  try {
    // Get Resend client (returns null if API key not configured)
    const resend = getResendClient();

    if (!resend) {
      console.warn("[email] RESEND_API_KEY not configured - skipping email notification");
      return { success: false, error: "RESEND_API_KEY not configured" };
    }

    if (!NOTIFICATION_EMAIL) {
      console.warn("[email] NOTIFICATION_EMAIL not configured - skipping email notification");
      return { success: false, error: "NOTIFICATION_EMAIL not configured" };
    }

    // Add timestamp if not provided
    const enrichedLeadData = {
      ...leadData,
      timestamp: leadData.timestamp || new Date().toISOString(),
    };

    // Get HTML email template
    const htmlContent = getLeadNotificationEmailHtml(enrichedLeadData);

    // Determine subject based on challenge/service
    let subject = `New Lead: ${enrichedLeadData.name}`;
    if (enrichedLeadData.challenge) {
      const challengeLabels: Record<string, string> = {
        "missing-calls": "Missing Calls",
        "not-enough-leads": "Not Enough Leads",
        "poor-roi": "Poor ROI",
        "no-system": "No Lead System",
        overwhelmed: "Overwhelmed",
        other: "Other Challenge",
      };
      const challengeText =
        challengeLabels[enrichedLeadData.challenge] || enrichedLeadData.challenge;
      subject += ` - ${challengeText}`;
    } else if (enrichedLeadData.service) {
      subject += ` - ${enrichedLeadData.service}`;
    }

    // Send email via Resend
    const response = await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFICATION_EMAIL,
      subject,
      html: htmlContent,
    });

    if (response.error) {
      console.error("[email] Failed to send notification:", response.error);
      return { success: false, error: response.error.message };
    }

    console.log("[email] Lead notification sent successfully:", response.data?.id);
    return { success: true, messageId: response.data?.id };
  } catch (error) {
    // Log error but don't throw - we don't want email failures to break lead capture
    console.error("[email] Error sending lead notification:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Calculate lead score based on provided information
 * Higher score = more qualified lead
 */
export function calculateLeadScore(leadData: LeadData): number {
  let score = 0;

  // Base score for having contact info
  if (leadData.phone) score += 20;
  if (leadData.email) score += 15;

  // Name provided (shows commitment)
  if (leadData.name && leadData.name.length > 2) score += 10;

  // Company name provided (business context)
  if (leadData.company && leadData.company.length > 2) score += 15;

  // Challenge identified (shows pain point awareness)
  if (leadData.challenge) {
    score += 25;
    // High-intent challenges get bonus
    if (["missing-calls", "not-enough-leads", "poor-roi"].includes(leadData.challenge)) {
      score += 10;
    }
  }

  // Service interest specified
  if (leadData.service) score += 15;

  // Custom message (high engagement signal)
  if (leadData.message && leadData.message.length > 20) score += 10;

  return Math.min(score, 100); // Cap at 100
}

/**
 * Get lead priority label based on score
 */
export function getLeadPriority(score: number): {
  label: string;
  color: string;
  emoji: string;
} {
  if (score >= 80) {
    return { label: "HOT", color: "#FF6B35", emoji: "🔥" };
  } else if (score >= 60) {
    return { label: "WARM", color: "#FFA500", emoji: "⚡" };
  } else if (score >= 40) {
    return { label: "QUALIFIED", color: "#4CAF50", emoji: "✓" };
  } else {
    return { label: "COLD", color: "#666666", emoji: "❄️" };
  }
}
