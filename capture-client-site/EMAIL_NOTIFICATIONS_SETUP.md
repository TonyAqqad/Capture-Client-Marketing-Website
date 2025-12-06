# Email Notifications Setup Guide

## Overview

Lead capture emails are now automatically sent when forms are submitted on the website. The system uses **Resend** for reliable email delivery with beautiful HTML templates.

---

## Features Implemented

### 1. Email Service (`src/lib/email.ts`)
- **Resend API integration** for reliable email delivery
- **Lead scoring system** (0-100) based on data completeness
- **Priority classification**: HOT (80+), WARM (60-79), QUALIFIED (40-59), COLD (0-39)
- **Non-blocking email sending** - email failures don't break lead capture
- **Graceful error handling** with detailed logging

### 2. Email Templates (`src/lib/email-templates.ts`)
- **Premium HTML email design** with Capture Client branding
- **Responsive layout** that works on all email clients
- **Priority badges** with color-coded lead scores
- **One-click call buttons** for immediate action
- **Complete lead context** including challenge, source, page URL
- **Plain text fallback** for email clients that don't support HTML

### 3. API Integration (`src/app/api/submit-lead/route.ts`)
- **Seamless integration** with existing GoHighLevel webhook
- **Automatic email triggers** after successful lead submission
- **Referer tracking** to know which page generated the lead
- **Error isolation** - email failures don't affect form submission

---

## Quick Start

### Step 1: Get Resend API Key

1. Go to [resend.com](https://resend.com/)
2. Sign up for a free account (100 emails/day free tier)
3. Navigate to **API Keys** in the dashboard
4. Click **Create API Key**
5. Copy your API key (starts with `re_`)

### Step 2: Configure Environment Variables

Create or update `.env.local` in the project root:

```env
# Resend API Key (required)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Where to send lead notifications (required)
NOTIFICATION_EMAIL=your-email@example.com

# Sender email address (optional - defaults to onboarding@resend.dev)
FROM_EMAIL=leads@yourdomain.com
```

### Step 3: Domain Verification (Optional but Recommended)

**For testing:** Use `onboarding@resend.dev` as FROM_EMAIL (no verification needed)

**For production:**
1. In Resend dashboard, go to **Domains**
2. Add your domain (e.g., `captureclient.com`)
3. Add the provided DNS records to your domain
4. Wait for verification (usually 5-15 minutes)
5. Use `leads@yourdomain.com` or `notifications@yourdomain.com` as FROM_EMAIL

### Step 4: Test the Integration

1. Start the dev server:
   ```bash
   npm run dev
   ```

2. Submit a test lead through any form on the site

3. Check your NOTIFICATION_EMAIL inbox for the notification

4. Check server logs to confirm email was sent:
   ```
   [email] Lead notification sent successfully: <message-id>
   ```

---

## Email Template Preview

### What the Email Looks Like

**Header:**
- 🔥 Priority badge (HOT/WARM/QUALIFIED/COLD)
- Lead score (0-100)
- Timestamp of submission

**Contact Section:**
- Name (highlighted)
- Phone number (clickable to call)
- Email (if provided)
- Company (if provided)

**Main Challenge Section:**
- Selected challenge from the form dropdown
- Color-coded for visibility

**Lead Context:**
- Form source (homepage, pricing page, etc.)
- Service interest
- Page URL where they submitted

**Call to Action:**
- Big "Call [Name] Now" button
- One-click to dial their phone number

### Example Email Content

```
🔥 NEW LEAD CAPTURED - HOT

Lead Score: 85/100
Time: Sunday, December 1, 2024 at 2:30 PM

CONTACT INFORMATION
Name:     John Smith
Phone:    (865) 555-1234
Email:    john@example.com

MAIN CHALLENGE
Not getting enough leads

LEAD CONTEXT
Source:   homepage
Page URL: https://captureclient.com/

[Call John Smith Now]
```

---

## Lead Scoring System

### How Scores are Calculated

| Data Point | Points | Notes |
|------------|--------|-------|
| Phone number | 20 | Essential contact info |
| Email address | 15 | Additional contact option |
| Name provided | 10 | Shows commitment |
| Company name | 15 | Business context |
| Challenge identified | 25 | Pain point awareness |
| High-intent challenge | +10 | Missing calls, low ROI, etc. |
| Service interest | 15 | Specific need identified |
| Custom message | 10 | High engagement signal |

**Maximum Score:** 100

### Priority Classifications

- **🔥 HOT (80-100)**: High-intent leads with complete information
- **⚡ WARM (60-79)**: Qualified leads with good context
- **✓ QUALIFIED (40-59)**: Valid leads worth following up
- **❄️ COLD (0-39)**: Minimal information provided

---

## Configuration Options

### Environment Variables

```env
# REQUIRED
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTIFICATION_EMAIL=your-email@example.com

# OPTIONAL (with defaults)
FROM_EMAIL=onboarding@resend.dev  # Sender address
```

### Email Template Customization

To customize the email design, edit `src/lib/email-templates.ts`:

- **Colors**: Update hex codes (currently using #FF6B35 accent)
- **Layout**: Modify HTML structure
- **Content**: Adjust text and labels
- **Branding**: Add logo or custom header

---

## Troubleshooting

### Email Not Sending

**Check 1: Environment Variables**
```bash
# In your terminal
echo $RESEND_API_KEY
echo $NOTIFICATION_EMAIL
```

If empty, make sure `.env.local` exists and contains the correct values.

**Check 2: Server Logs**
```bash
npm run dev
# Submit a test lead
# Look for:
[email] Lead notification sent successfully: <id>
# OR
[email] RESEND_API_KEY not configured - skipping email notification
```

**Check 3: Resend Dashboard**
1. Go to [resend.com/emails](https://resend.com/emails)
2. Check if emails appear in the logs
3. Look for delivery status and any errors

### Email Goes to Spam

**Solutions:**
1. Verify your domain in Resend
2. Add SPF, DKIM, and DMARC records
3. Use a professional FROM_EMAIL (not free Gmail/Yahoo)
4. Warm up your domain (start with low volume)

### Wrong Email Address

**Fix:** Update `NOTIFICATION_EMAIL` in `.env.local` and restart the server

---

## Production Checklist

Before deploying to production:

- [ ] Resend API key configured
- [ ] Domain verified in Resend
- [ ] FROM_EMAIL uses verified domain
- [ ] NOTIFICATION_EMAIL is correct
- [ ] Test email received successfully
- [ ] Email displays correctly on mobile
- [ ] Call-to-action buttons work
- [ ] Lead scoring makes sense for your use case
- [ ] Spam folder checked (shouldn't be there)
- [ ] Set up email forwarding/team inbox if needed

---

## Resend Pricing

### Free Tier
- **100 emails/day**
- Perfect for testing and small sites
- No credit card required

### Paid Plans (if you need more)
- **$20/month**: 50,000 emails/month
- **Custom**: Higher volumes available

---

## Security Notes

1. **API Key Protection**: Never commit `.env.local` to git (already in `.gitignore`)
2. **Rate Limiting**: API route has rate limiting (5 requests/min per IP)
3. **Input Sanitization**: All lead data is sanitized before sending
4. **Non-Blocking**: Email failures don't expose errors to users
5. **Error Logging**: All errors logged server-side only

---

## Support & Resources

- **Resend Docs**: [resend.com/docs](https://resend.com/docs)
- **Email Testing**: Use [mail-tester.com](https://www.mail-tester.com/) to test spam score
- **Template Testing**: Send to [Litmus](https://litmus.com/) or [Email on Acid](https://www.emailonacid.com/)

---

## Files Modified/Created

### Created:
- `src/lib/email.ts` - Email service with lead scoring
- `src/lib/email-templates.ts` - HTML email templates
- `EMAIL_NOTIFICATIONS_SETUP.md` - This guide

### Modified:
- `src/app/api/submit-lead/route.ts` - Added email notification call
- `.env.example` - Added Resend configuration examples
- `package.json` - Added `resend` dependency

---

## Next Steps

After email notifications are working:

1. **Set up team notifications**: Forward NOTIFICATION_EMAIL to your team
2. **Create email rules**: Auto-tag HOT leads in your inbox
3. **Monitor metrics**: Track email open/click rates in Resend
4. **Customize templates**: Adjust branding and messaging
5. **Add integrations**: Connect to Slack, Discord, or SMS for hot leads

---

**Questions?** Check the Resend documentation or open an issue in the project repo.
