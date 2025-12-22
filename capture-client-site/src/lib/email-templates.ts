import { calculateLeadScore, getLeadPriority } from "./email";

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

/**
 * Generate HTML email template for lead notifications
 * Branded with Capture Client colors and design
 */
export function getLeadNotificationEmailHtml(leadData: LeadData): string {
  // Calculate lead score and priority
  const score = calculateLeadScore(leadData);
  const priority = getLeadPriority(score);

  // Format timestamp
  const timestamp = leadData.timestamp
    ? new Date(leadData.timestamp).toLocaleString("en-US", {
        dateStyle: "full",
        timeStyle: "short",
      })
    : "Just now";

  // Map challenge codes to readable labels
  const challengeLabels: Record<string, string> = {
    "missing-calls": "Missing too many customer calls",
    "not-enough-leads": "Not getting enough leads",
    "poor-roi": "Ad campaigns not profitable",
    "no-system": "No system to track leads",
    overwhelmed: "Too much to manage manually",
    other: "Something else",
  };

  const challengeText = leadData.challenge
    ? challengeLabels[leadData.challenge] || leadData.challenge
    : "Not specified";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Lead Notification</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0a0a0a; color: #ffffff;">

  <!-- Email Container -->
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #0a0a0a;">
    <tr>
      <td align="center" style="padding: 40px 20px;">

        <!-- Main Content Card -->
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);">

          <!-- Header with Priority Badge -->
          <tr>
            <td style="padding: 32px 32px 24px; background: linear-gradient(135deg, #FF6B35 0%, #ff8559 100%); position: relative;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td>
                    <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                      ${priority.emoji} New Lead Captured!
                    </h1>
                    <p style="margin: 8px 0 0; font-size: 14px; color: rgba(255,255,255,0.9); font-weight: 500;">
                      ${timestamp}
                    </p>
                  </td>
                  <td align="right" style="vertical-align: top;">
                    <div style="background-color: ${priority.color}; color: #ffffff; padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: 700; letter-spacing: 0.5px; display: inline-block; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">
                      ${priority.label}
                    </div>
                    <div style="background-color: rgba(255,255,255,0.2); color: #ffffff; padding: 6px 12px; border-radius: 12px; font-size: 14px; font-weight: 600; margin-top: 8px; text-align: center;">
                      Score: ${score}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Lead Information -->
          <tr>
            <td style="padding: 32px;">

              <!-- Contact Details -->
              <div style="background-color: rgba(255,255,255,0.05); border-left: 4px solid #FF6B35; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
                <h2 style="margin: 0 0 16px; font-size: 18px; font-weight: 600; color: #FF6B35;">
                  📇 Contact Information
                </h2>

                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #999999; font-size: 14px; width: 120px; vertical-align: top;">
                      <strong>Name:</strong>
                    </td>
                    <td style="padding: 8px 0; color: #ffffff; font-size: 16px; font-weight: 600;">
                      ${leadData.name}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #999999; font-size: 14px; vertical-align: top;">
                      <strong>Phone:</strong>
                    </td>
                    <td style="padding: 8px 0;">
                      <a href="tel:${leadData.phone}" style="color: #FF6B35; text-decoration: none; font-size: 16px; font-weight: 600;">
                        ${leadData.phone}
                      </a>
                    </td>
                  </tr>
                  ${
                    leadData.email
                      ? `
                  <tr>
                    <td style="padding: 8px 0; color: #999999; font-size: 14px; vertical-align: top;">
                      <strong>Email:</strong>
                    </td>
                    <td style="padding: 8px 0;">
                      <a href="mailto:${leadData.email}" style="color: #FF6B35; text-decoration: none; font-size: 16px; font-weight: 600;">
                        ${leadData.email}
                      </a>
                    </td>
                  </tr>
                  `
                      : ""
                  }
                  ${
                    leadData.company
                      ? `
                  <tr>
                    <td style="padding: 8px 0; color: #999999; font-size: 14px; vertical-align: top;">
                      <strong>Company:</strong>
                    </td>
                    <td style="padding: 8px 0; color: #ffffff; font-size: 16px; font-weight: 600;">
                      ${leadData.company}
                    </td>
                  </tr>
                  `
                      : ""
                  }
                </table>
              </div>

              <!-- Challenge/Interest -->
              <div style="background-color: rgba(255,107,53,0.1); border-left: 4px solid #FF6B35; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
                <h2 style="margin: 0 0 12px; font-size: 18px; font-weight: 600; color: #FF6B35;">
                  🎯 Main Challenge
                </h2>
                <p style="margin: 0; color: #ffffff; font-size: 16px; line-height: 1.6;">
                  ${challengeText}
                </p>
              </div>

              <!-- Source & Context -->
              <div style="background-color: rgba(255,255,255,0.05); padding: 20px; border-radius: 8px; margin-bottom: 24px;">
                <h2 style="margin: 0 0 12px; font-size: 18px; font-weight: 600; color: #cccccc;">
                  📊 Lead Context
                </h2>

                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 6px 0; color: #999999; font-size: 14px; width: 120px;">
                      Source:
                    </td>
                    <td style="padding: 6px 0; color: #ffffff; font-size: 14px;">
                      ${leadData.source}
                    </td>
                  </tr>
                  ${
                    leadData.service
                      ? `
                  <tr>
                    <td style="padding: 6px 0; color: #999999; font-size: 14px;">
                      Service Interest:
                    </td>
                    <td style="padding: 6px 0; color: #ffffff; font-size: 14px;">
                      ${leadData.service}
                    </td>
                  </tr>
                  `
                      : ""
                  }
                  ${
                    leadData.pageUrl
                      ? `
                  <tr>
                    <td style="padding: 6px 0; color: #999999; font-size: 14px;">
                      Page URL:
                    </td>
                    <td style="padding: 6px 0;">
                      <a href="${leadData.pageUrl}" style="color: #FF6B35; text-decoration: none; font-size: 14px;">
                        ${leadData.pageUrl}
                      </a>
                    </td>
                  </tr>
                  `
                      : ""
                  }
                </table>
              </div>

              ${
                leadData.message
                  ? `
              <!-- Custom Message -->
              <div style="background-color: rgba(255,255,255,0.05); border-left: 4px solid #4CAF50; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
                <h2 style="margin: 0 0 12px; font-size: 18px; font-weight: 600; color: #4CAF50;">
                  💬 Message
                </h2>
                <p style="margin: 0; color: #ffffff; font-size: 14px; line-height: 1.6; font-style: italic;">
                  "${leadData.message}"
                </p>
              </div>
              `
                  : ""
              }

              <!-- Call to Action -->
              <div style="text-align: center; margin-top: 32px;">
                <a href="tel:${leadData.phone}" style="display: inline-block; background: linear-gradient(135deg, #FF6B35 0%, #ff8559 100%); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 700; font-size: 16px; box-shadow: 0 4px 16px rgba(255,107,53,0.4); transition: all 0.3s;">
                  📞 Call ${leadData.name} Now
                </a>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: rgba(255,255,255,0.02); border-top: 1px solid rgba(255,255,255,0.1);">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td>
                    <p style="margin: 0; font-size: 12px; color: #999999;">
                      <strong style="color: #FF6B35;">Capture Client</strong> Lead Notification System
                    </p>
                  </td>
                  <td align="right">
                    <p style="margin: 0; font-size: 12px; color: #999999;">
                      Lead Score: ${score}/100
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `.trim();
}

/**
 * Generate plain text version for email clients that don't support HTML
 */
export function getLeadNotificationPlainText(leadData: LeadData): string {
  const score = calculateLeadScore(leadData);
  const priority = getLeadPriority(score);

  const timestamp = leadData.timestamp ? new Date(leadData.timestamp).toLocaleString() : "Just now";

  const challengeLabels: Record<string, string> = {
    "missing-calls": "Missing too many customer calls",
    "not-enough-leads": "Not getting enough leads",
    "poor-roi": "Ad campaigns not profitable",
    "no-system": "No system to track leads",
    overwhelmed: "Too much to manage manually",
    other: "Something else",
  };

  const challengeText = leadData.challenge
    ? challengeLabels[leadData.challenge] || leadData.challenge
    : "Not specified";

  return `
═══════════════════════════════════════
🔥 NEW LEAD CAPTURED - ${priority.label}
═══════════════════════════════════════

Lead Score: ${score}/100
Time: ${timestamp}

CONTACT INFORMATION
───────────────────────────────────────
Name:     ${leadData.name}
Phone:    ${leadData.phone}
${leadData.email ? `Email:    ${leadData.email}\n` : ""}${leadData.company ? `Company:  ${leadData.company}\n` : ""}

MAIN CHALLENGE
───────────────────────────────────────
${challengeText}

LEAD CONTEXT
───────────────────────────────────────
Source:   ${leadData.source}
${leadData.service ? `Service:  ${leadData.service}\n` : ""}${leadData.pageUrl ? `Page URL: ${leadData.pageUrl}\n` : ""}
${leadData.message ? `\nMESSAGE\n───────────────────────────────────────\n${leadData.message}\n` : ""}
═══════════════════════════════════════

Call ${leadData.name} now: ${leadData.phone}

---
Capture Client Lead Notification System
  `.trim();
}
