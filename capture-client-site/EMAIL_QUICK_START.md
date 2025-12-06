# Email Notifications - Quick Start Guide

## 5-Minute Setup

### 1. Get Resend API Key (2 minutes)
```
1. Go to https://resend.com
2. Sign up (free - no credit card needed)
3. Click "API Keys" → "Create API Key"
4. Copy the key (starts with "re_")
```

### 2. Configure Environment (1 minute)
Create `.env.local` in project root:
```env
RESEND_API_KEY=re_paste_your_key_here
NOTIFICATION_EMAIL=your-email@example.com
FROM_EMAIL=onboarding@resend.dev
```

### 3. Test It (2 minutes)
```bash
npm run dev
```
- Go to http://localhost:3000
- Submit a test lead
- Check your email inbox
- Done! ✅

---

## What You Get

### Beautiful Email Notifications
When someone submits a lead form, you'll receive:

```
Subject: New Lead: John Smith - Not Enough Leads

🔥 HOT Lead (Score: 85/100)
───────────────────────────────

📇 Contact
  John Smith
  (865) 555-1234
  john@example.com

🎯 Challenge
  Not getting enough leads

📊 Source: homepage

[📞 Call John Smith Now]
```

### Smart Lead Scoring
- **🔥 HOT (80-100)**: Call immediately
- **⚡ WARM (60-79)**: Follow up within 1 hour
- **✓ QUALIFIED (40-59)**: Follow up same day
- **❄️ COLD (0-39)**: Send email

---

## Files Modified/Created

### Created
- ✅ `src/lib/email.ts` - Email service
- ✅ `src/lib/email-templates.ts` - HTML templates

### Modified
- ✅ `src/app/api/submit-lead/route.ts` - Added email trigger
- ✅ `.env.example` - Added Resend config

### Installed
- ✅ `resend` npm package

---

## Free Tier Limits

**Resend Free Plan:**
- 100 emails/day
- 3,000 emails/month
- Perfect for small-medium sites

**Need More?**
- $20/month = 50,000 emails/month

---

## Troubleshooting

### Not receiving emails?

**Check 1:** Environment variables set correctly?
```bash
# Should print your API key and email
cat .env.local
```

**Check 2:** Server logs
```bash
npm run dev
# Look for:
[email] Lead notification sent successfully
```

**Check 3:** Resend dashboard
- Go to https://resend.com/emails
- See if emails appear there
- Check for any errors

**Check 4:** Spam folder
- Check your spam/junk folder
- Mark as "Not Spam" if found there

---

## Production Deployment

### Vercel
```bash
# Set environment variables
vercel env add RESEND_API_KEY
vercel env add NOTIFICATION_EMAIL
vercel env add FROM_EMAIL

# Deploy
vercel deploy --prod
```

### Netlify
```bash
# In Netlify UI: Site settings → Environment variables
RESEND_API_KEY=re_your_key
NOTIFICATION_EMAIL=your@email.com
FROM_EMAIL=onboarding@resend.dev
```

### Other Platforms
Add these 3 environment variables to your hosting platform:
- `RESEND_API_KEY`
- `NOTIFICATION_EMAIL`
- `FROM_EMAIL`

---

## Customization

### Change Email Design
Edit `src/lib/email-templates.ts`:
- Change colors: Search for `#FF6B35` and replace
- Add logo: Add `<img>` tag in header section
- Modify layout: Edit HTML structure

### Adjust Lead Scoring
Edit `src/lib/email.ts`:
- Modify point values in `calculateLeadScore()`
- Change priority thresholds in `getLeadPriority()`

### Change Sender Name
In `.env.local`:
```env
FROM_EMAIL=Your Name <noreply@yourdomain.com>
```

---

## Need Help?

📖 **Full Documentation:**
- Setup Guide: `EMAIL_NOTIFICATIONS_SETUP.md`
- Email Preview: `EMAIL_EXAMPLE.md`
- Implementation Details: `EMAIL_IMPLEMENTATION_SUMMARY.md`

🌐 **Resources:**
- Resend Docs: https://resend.com/docs
- Test Email Score: https://mail-tester.com

---

## That's It!

Your lead notifications are now live. Every form submission will trigger an email with:
- Contact details
- Lead score and priority
- One-click call button
- Full context about the lead

**Questions?** Check the full documentation in `EMAIL_NOTIFICATIONS_SETUP.md`
