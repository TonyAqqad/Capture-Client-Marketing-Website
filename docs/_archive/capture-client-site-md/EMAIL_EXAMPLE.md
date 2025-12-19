# Email Notification Example

## Visual Preview

This is what the lead notification email looks like when sent:

---

### Email Header (Orange Gradient Background)

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  🔥 New Lead Captured!                           [🔥 HOT]   ┃
┃  Sunday, December 1, 2024 at 2:45 PM           Score: 85    ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

**Colors:**
- Background: Orange gradient (#FF6B35 to #ff8559)
- Priority Badge: Color-coded (HOT = #FF6B35, WARM = #FFA500, etc.)
- Score Badge: Semi-transparent white background

---

### Contact Information Section

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 📇 Contact Information                                        ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                                               ┃
┃  Name:      John Smith                                       ┃
┃  Phone:     (865) 555-1234    [clickable link]              ┃
┃  Email:     john@example.com  [clickable link]              ┃
┃  Company:   Smith Construction                              ┃
┃                                                               ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

**Styling:**
- Dark background with orange left border
- Name is bold and prominent
- Phone and email are clickable (tel: and mailto: links)
- Clean, easy-to-scan layout

---

### Main Challenge Section

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 🎯 Main Challenge                                             ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                                               ┃
┃  Not getting enough leads                                    ┃
┃                                                               ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

**Styling:**
- Orange tinted background (rgba(255,107,53,0.1))
- Orange left border
- Large, readable text
- Shows what pain point the lead has

---

### Lead Context Section

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 📊 Lead Context                                               ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                                               ┃
┃  Source:           homepage                                  ┃
┃  Service Interest: Voice AI                                  ┃
┃  Page URL:         https://captureclient.com/  [link]       ┃
┃                                                               ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

**Includes:**
- Where the lead came from (form source)
- What service they're interested in (if selected)
- URL of the page they submitted from

---

### Custom Message Section (Optional)

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 💬 Message                                                    ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                                               ┃
┃  "I'm looking for a solution to automate my customer calls.  ┃
┃   We're missing about 30% of inbound calls after hours."     ┃
┃                                                               ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

**Styling:**
- Green left border (indicates high engagement)
- Italic text style
- Only appears if lead wrote a custom message

---

### Call to Action Button

```
                    ┌─────────────────────────┐
                    │  📞 Call John Smith Now │
                    └─────────────────────────┘
```

**Styling:**
- Big, prominent orange button
- One-click to dial phone number
- Gradient background with shadow
- Centered and impossible to miss

---

### Footer

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Capture Client Lead Notification System       Lead Score: 85/100
```

**Styling:**
- Subtle, dark background
- Small text with branding
- Lead score reminder

---

## Complete Example Email

Here's what a full email looks like with all sections:

### Subject Line
```
New Lead: John Smith - Not Enough Leads
```

### Email Body

```html
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  🔥 New Lead Captured!                                [🔥 HOT]
  Sunday, December 1, 2024 at 2:45 PM                Score: 85

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 📇 Contact Information                                        ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                                               ┃
┃  Name:      John Smith                                       ┃
┃  Phone:     (865) 555-1234                                   ┃
┃  Email:     john@smithconstruction.com                       ┃
┃  Company:   Smith Construction                              ┃
┃                                                               ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 🎯 Main Challenge                                             ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                                               ┃
┃  Not getting enough leads                                    ┃
┃                                                               ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 📊 Lead Context                                               ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                                               ┃
┃  Source:           homepage                                  ┃
┃  Service Interest: Voice AI                                  ┃
┃  Page URL:         https://captureclient.com/               ┃
┃                                                               ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 💬 Message                                                    ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                                               ┃
┃  "I'm looking for a solution to automate my customer calls.  ┃
┃   We're missing about 30% of inbound calls after hours and   ┃
┃   it's costing us business."                                 ┃
┃                                                               ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛


                    ┌─────────────────────────┐
                    │  📞 Call John Smith Now │
                    └─────────────────────────┘


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Capture Client Lead Notification System       Lead Score: 85/100
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Priority Badge Examples

### 🔥 HOT Lead (Score: 80-100)
- **Color:** Bright Orange (#FF6B35)
- **Means:** Complete information, high-intent challenge
- **Action:** Call immediately

### ⚡ WARM Lead (Score: 60-79)
- **Color:** Orange (#FFA500)
- **Means:** Good context, qualified prospect
- **Action:** Follow up within 1 hour

### ✓ QUALIFIED Lead (Score: 40-59)
- **Color:** Green (#4CAF50)
- **Means:** Valid lead worth following up
- **Action:** Follow up same day

### ❄️ COLD Lead (Score: 0-39)
- **Color:** Gray (#666666)
- **Means:** Minimal information
- **Action:** Send email, wait for response

---

## Mobile View

The email is fully responsive and looks great on mobile devices:

```
┌─────────────────────┐
│                     │
│ 🔥 New Lead!   [🔥] │
│ Sun, Dec 1     85   │
│                     │
├─────────────────────┤
│                     │
│ 📇 Contact          │
│ ─────────────────── │
│ John Smith          │
│ (865) 555-1234      │
│ john@example.com    │
│                     │
├─────────────────────┤
│                     │
│ 🎯 Challenge        │
│ ─────────────────── │
│ Not enough leads    │
│                     │
├─────────────────────┤
│                     │
│ 📊 Context          │
│ ─────────────────── │
│ Source: homepage    │
│                     │
├─────────────────────┤
│                     │
│  ┌───────────────┐  │
│  │  📞 Call Now  │  │
│  └───────────────┘  │
│                     │
└─────────────────────┘
```

---

## Email Client Compatibility

The email template is tested and works on:

- ✅ Gmail (web, iOS, Android)
- ✅ Outlook (web, desktop, mobile)
- ✅ Apple Mail (macOS, iOS)
- ✅ Yahoo Mail
- ✅ ProtonMail
- ✅ Thunderbird
- ✅ Most other modern email clients

**Fallback:** Plain text version is included for clients that don't support HTML.

---

## Customization Options

You can customize the email by editing `src/lib/email-templates.ts`:

### Change Colors
```typescript
// Current accent color
const accentColor = '#FF6B35';

// Change to your brand color
const accentColor = '#YOUR_COLOR';
```

### Add Your Logo
```html
<img src="https://yourdomain.com/logo.png" alt="Your Company" />
```

### Modify Layout
- Reorder sections
- Add/remove fields
- Change fonts and spacing
- Add social media links

### Change Priority Thresholds
```typescript
// In src/lib/email.ts
export function getLeadPriority(score: number) {
  if (score >= 90) return { label: 'URGENT', ... };  // Custom threshold
  // ... etc
}
```

---

## Testing the Email

### Send a Test Lead

1. Start dev server: `npm run dev`
2. Go to http://localhost:3000
3. Fill out the lead form with test data:
   - Name: Test User
   - Phone: (555) 123-4567
   - Challenge: Select any option
4. Submit the form
5. Check your NOTIFICATION_EMAIL inbox

### View in Resend Dashboard

1. Go to [resend.com/emails](https://resend.com/emails)
2. See all sent emails
3. Click to view full email preview
4. Check delivery status

---

**Need help?** See `EMAIL_NOTIFICATIONS_SETUP.md` for full setup instructions.
