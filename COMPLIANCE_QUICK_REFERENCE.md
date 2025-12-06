# Compliance Quick Reference Guide
## Essential Copy/Paste Templates for Capture Client

**Use this guide for quick implementation of compliant language across your website.**

---

## 1. PRIVACY POLICY - SMS/Voice Section

**Copy this section into your Privacy Policy:**

```markdown
## SMS & Voice Communications

### Information We Collect
When you opt-in to receive text messages or voice calls from Capture Client, we collect:
- Mobile phone number
- Name and contact information
- Opt-in date, time, and method
- Communication preferences and interaction history

### How We Use Your Information
We use your phone number to:
- Send appointment reminders and service updates
- Provide customer support via text and voice
- Deliver automated notifications and alerts
- Enable our AI-powered voice agents to assist you 24/7
- Send marketing messages (only with your explicit consent)

### AI Technology Disclosure
**USE OF ARTIFICIAL INTELLIGENCE**: Capture Client uses AI-powered voice agents and automated calling technology. When you interact with our AI voice system, you may be speaking with an AI-generated voice, not a human. AI technology is used to understand and respond to your requests. You can request to speak with a human agent at any time by saying "I want to speak to a person."

### Data Sharing Restrictions
**IMPORTANT**: We will NOT share your mobile phone number or SMS opt-in consent with any third parties or affiliates for marketing purposes.

We may share your mobile number only with:
- Service providers and subcontractors under strict confidentiality agreements, solely to support customer service, message delivery, or technical operations
- Law enforcement or government agencies when required by law

All text-messaging opt-in records and consent data are kept private and will NEVER be transferred to third-party marketers.

### Message Frequency & Charges
- Message frequency varies based on your interaction with our services
- Message and data rates may apply based on your mobile carrier plan
- Capture Client does not charge for messages, but your carrier may

### How to Opt-Out
You may opt-out of receiving text messages or automated calls at any time:
- **Text**: Reply STOP, QUIT, END, CANCEL, UNSUBSCRIBE, or OPT OUT to any message
- **Call**: Say "stop," "opt out," or "do not call" during an AI voice call
- **Phone**: Call us at (865) 346-3339 to request removal
- **Email**: Email team@captureclient.net with your opt-out request

We will honor your opt-out request within 10 business days. You will receive one confirmation message after opting out.

### Your Privacy Rights
You have the right to:
- Access the personal information we have about you
- Request correction of inaccurate information
- Request deletion of your information (subject to legal requirements)
- Opt-out of SMS/voice communications at any time
- Withdraw consent without affecting prior authorized communications
```

---

## 2. TERMS OF SERVICE - SMS/Voice Section

**Copy this section into your Terms of Service:**

```markdown
## SMS & Voice Communication Terms

### Communication Program
By providing your mobile phone number and opting in, you agree to receive from Capture Client:

**Automated Text Messages** including:
- Service updates and appointment reminders
- Account notifications and alerts
- Marketing messages (if you opted in)
- Verification codes

**Automated Voice Calls** including:
- AI-generated voice messages
- Pre-recorded messages
- Interactive voice response (IVR) calls
- Customer service calls using AI technology

**Message Frequency**: Varies based on your activity and preferences. You may receive up to 10 messages per month.

**Consent Not Required**: You are not required to opt-in to SMS/voice communications as a condition of purchasing any services from Capture Client.

### Artificial Intelligence Technology
Capture Client uses AI-powered voice agents and automated calling technology. By opting in, you specifically consent to:

1. **Receive AI-Generated Calls**: Calls using AI-generated voices that simulate human speech, interactive AI agents that respond to your questions, and pre-recorded AI voice messages.

2. **AI Disclosure**: We will inform you at the start of calls when AI technology is used. AI calls are subject to the same privacy protections as human calls. You may request to speak with a human agent at any time.

3. **AI Data Processing**: Your voice and responses may be processed by AI systems to improve service quality. All AI data processing follows our Privacy Policy.

### TCPA Consent
By providing your phone number and agreeing to these Terms, you expressly consent to receive:

1. Calls and texts using an automatic telephone dialing system (ATDS)
2. Artificial or prerecorded voice messages, including AI-generated voices
3. Messages to the mobile or landline number you provided

This consent includes marketing and promotional calls/texts (if you opted in), transactional and service-related communications, and calls placed manually or by autodialer.

**YOU ARE NOT REQUIRED TO AGREE TO THIS AS A CONDITION OF PURCHASE.**

You acknowledge that your wireless carrier may impose message and data charges, you are responsible for any carrier charges, and Capture Client is not liable for carrier fees.

### Opt-Out & Consent Revocation
You may revoke your consent and opt-out at any time:

**Text Message Opt-Out**:
- Text STOP, QUIT, END, CANCEL, UNSUBSCRIBE, or OPT OUT to any message
- We will send one confirmation message after you opt out
- We will honor your opt-out within 10 business days

**Voice Call Opt-Out**:
- Say "stop," "opt out," "do not call," or "remove me" during any call
- Call (865) 346-3339 and request to opt-out
- We will honor your request within 10 business days

**Email Opt-Out**:
- Email team@captureclient.net with "OPT OUT" in subject line
- Include your phone number in the email body

**Do Not Call Registry**: You may register your number at DoNotCall.gov. We honor the National Do Not Call Registry.

**IMPORTANT**: Opting out will stop future messages but does not affect prior authorized communications or account-related messages required for service delivery.

### Help & Customer Support
For assistance:
- Text HELP to any message for support information
- Call (865) 346-3339 (Monday-Friday, 9 AM - 5 PM ET)
- Email team@captureclient.net
- Visit captureclient.net/contact
```

---

## 3. OPT-IN FORM - Contact Page

**Copy this HTML for your contact/lead capture forms:**

```html
<form id="contact-form" method="POST" action="/api/submit-lead">
  <h2>Get Started with Voice AI</h2>

  <div class="form-group">
    <label for="name">Name *</label>
    <input type="text" id="name" name="name" required>
  </div>

  <div class="form-group">
    <label for="email">Email *</label>
    <input type="email" id="email" name="email" required>
  </div>

  <div class="form-group">
    <label for="phone">Phone Number (Optional)</label>
    <input type="tel" id="phone" name="phone" placeholder="(555) 555-5555">
    <small>Optional - only provide if you want us to call or text you</small>
  </div>

  <div class="form-group">
    <label for="business">Business Name</label>
    <input type="text" id="business" name="business">
  </div>

  <div class="form-group">
    <label for="service">Service Interested In</label>
    <select id="service" name="service">
      <option value="">Select a service</option>
      <option value="voice-ai">Voice AI Agents</option>
      <option value="google-ads">Google Ads</option>
      <option value="facebook-ads">Facebook Ads</option>
      <option value="lead-generation">Lead Generation</option>
    </select>
  </div>

  <fieldset class="consent-section">
    <legend>Communication Preferences (Optional)</legend>

    <div class="checkbox-group">
      <label class="checkbox-label">
        <input type="checkbox" name="sms_consent" value="yes">
        <span>
          I agree to receive text messages from Capture Client at the mobile
          number provided. Message frequency varies. Message and data rates
          may apply. Reply STOP to opt-out anytime. Consent is not required
          to purchase services.
        </span>
      </label>
    </div>

    <div class="checkbox-group">
      <label class="checkbox-label">
        <input type="checkbox" name="voice_consent" value="yes">
        <span>
          I agree to receive phone calls, including AI-generated voice calls
          and automated calls, from Capture Client at the number provided.
          I can opt-out anytime by saying "stop" or calling (865) 346-3339.
          Consent is not required to purchase services.
        </span>
      </label>
    </div>

    <p class="consent-disclaimer">
      By submitting this form, you agree to our
      <a href="/terms-of-service" target="_blank">Terms of Service</a> and
      <a href="/privacy-policy" target="_blank">Privacy Policy</a>.
    </p>
  </fieldset>

  <button type="submit" class="btn-primary">Request Consultation</button>
</form>

<style>
.consent-section {
  border: 1px solid #e0e0e0;
  padding: 20px;
  margin: 20px 0;
  border-radius: 8px;
  background: #f9f9f9;
}

.consent-section legend {
  font-weight: 600;
  padding: 0 10px;
  color: #333;
}

.checkbox-group {
  margin: 15px 0;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  margin-top: 3px;
  flex-shrink: 0;
}

.checkbox-label span {
  font-size: 14px;
  line-height: 1.5;
  color: #555;
}

.consent-disclaimer {
  font-size: 12px;
  color: #666;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #e0e0e0;
}

.consent-disclaimer a {
  color: #0066cc;
  text-decoration: underline;
}
</style>
```

---

## 4. OPT-IN FORM - Simplified Version (Homepage)

**For homepage hero sections with minimal form fields:**

```html
<form id="hero-form" method="POST" action="/api/submit-lead">
  <h2>Never Miss Another Lead</h2>
  <p>Get a free consultation to see how Voice AI can transform your business.</p>

  <input
    type="text"
    name="name"
    placeholder="Your Name"
    required
  >

  <input
    type="email"
    name="email"
    placeholder="Email Address"
    required
  >

  <input
    type="tel"
    name="phone"
    placeholder="Phone Number (Optional)"
  >

  <label class="consent-checkbox">
    <input type="checkbox" name="sms_voice_consent" value="yes">
    <span>
      I agree to receive text messages and AI-generated voice calls from
      Capture Client. Reply STOP to opt-out. Not required to purchase.
      <a href="/privacy-policy">Privacy Policy</a>
    </span>
  </label>

  <button type="submit">Get Free Consultation</button>

  <p class="form-footer">
    Message and data rates may apply. See
    <a href="/terms-of-service">Terms of Service</a>.
  </p>
</form>
```

---

## 5. OPT-OUT CONFIRMATION MESSAGE (SMS)

**Use this as your auto-reply when someone texts STOP:**

```
You have been unsubscribed from Capture Client messages. You will not
receive further texts from us. For assistance, call (865) 346-3339 or
email team@captureclient.net.
```

**IMPORTANT**: This should be the ONLY message sent after opt-out. No additional messages allowed.

---

## 6. AI VOICE CALL SCRIPT - Opening Disclosure

**Script your AI voice agent to say this at the start of EVERY call:**

```
"Hello! This is an AI-powered voice assistant calling from Capture Client.
I'm here to help answer questions about our Voice AI services and schedule
a consultation for your business. Is now a good time to talk?"

[If yes, continue with call]

[If no]
"No problem! Would you like me to call back at a better time, or would you
prefer to speak with a human team member? You can also visit our website
at captureclient.net or call us at 865-346-3339."

[At ANY point if caller says "stop," "opt out," or "do not call"]
"I understand. I've added your number to our do-not-call list. You will
not receive further calls from Capture Client. Thank you, and have a great day."
[End call immediately]
```

---

## 7. WEBSITE FOOTER - Compliance Links

**Add this to your website footer:**

```html
<footer>
  <div class="footer-compliance">
    <h4>SMS & Voice Compliance</h4>
    <p>
      By providing your phone number, you agree to receive text messages
      and AI-generated voice calls from Capture Client.
    </p>
    <p class="small">
      Text STOP to opt-out | Message & data rates may apply |
      <a href="/privacy-policy">Privacy Policy</a> |
      <a href="/terms-of-service">Terms of Service</a>
    </p>
  </div>

  <div class="footer-contact">
    <p><strong>Capture Client</strong></p>
    <p>Phone: (865) 346-3339</p>
    <p>Email: team@captureclient.net</p>
  </div>
</footer>
```

---

## 8. EMAIL SIGNATURE - Opt-Out Information

**Add this to team email signatures:**

```
---
Capture Client
Voice AI & Lead Generation for Small Business
Phone: (865) 346-3339
Email: team@captureclient.net
Web: captureclient.net

To opt-out of SMS/voice communications, reply STOP to any text
or call (865) 346-3339.
```

---

## 9. HELP KEYWORD AUTO-RESPONSE (SMS)

**Use this as your auto-reply when someone texts HELP:**

```
Capture Client - Voice AI & Lead Generation
Support: (865) 346-3339
Email: team@captureclient.net
Web: captureclient.net

For appointment changes, reply with your request.
To opt-out, reply STOP.
Msg & data rates may apply.
```

---

## 10. CHECKOUT/PURCHASE FORM - Service Agreement

**For when customers purchase a package:**

```html
<fieldset class="service-agreement">
  <legend>Service Agreement & Communication Consent</legend>

  <label class="checkbox-label">
    <input type="checkbox" name="terms_agreement" value="yes" required>
    <span>
      I agree to the Capture Client
      <a href="/terms-of-service" target="_blank">Terms of Service</a> and
      <a href="/privacy-policy" target="_blank">Privacy Policy</a>. *
    </span>
  </label>

  <label class="checkbox-label">
    <input type="checkbox" name="service_communications" value="yes">
    <span>
      I agree to receive service-related text messages and voice calls
      (including AI-generated calls) from Capture Client regarding my
      account, appointments, and service delivery. Reply STOP to opt-out.
      <strong>This is optional and not required to purchase services.</strong>
    </span>
  </label>

  <label class="checkbox-label">
    <input type="checkbox" name="marketing_communications" value="yes">
    <span>
      I agree to receive marketing and promotional messages from
      Capture Client about new services and offers. Reply STOP to opt-out.
      <strong>This is optional and not required to purchase services.</strong>
    </span>
  </label>
</fieldset>
```

---

## 11. LANDING PAGE DISCLAIMER (Below CTA Button)

**Place this directly below your "Get Started" or "Contact Us" buttons:**

```html
<p class="cta-disclaimer">
  By clicking "Get Started," you agree to our
  <a href="/terms-of-service">Terms</a> and
  <a href="/privacy-policy">Privacy Policy</a>.
  If you provide your phone number, you may receive text messages and
  AI-generated voice calls from Capture Client. Reply STOP to opt-out.
  Consent not required for purchase. Msg & data rates may apply.
</p>
```

---

## 12. BLOG POST FOOTER - Lead Magnet Opt-In

**For lead magnets and downloadable resources in blog posts:**

```html
<div class="lead-magnet-form">
  <h3>Download Our Free Voice AI ROI Calculator</h3>

  <form method="POST" action="/api/download-lead-magnet">
    <input type="email" name="email" placeholder="Email" required>
    <input type="tel" name="phone" placeholder="Phone (Optional)">

    <label class="consent-checkbox">
      <input type="checkbox" name="email_consent" value="yes" required>
      <span>
        I agree to receive the download link and future emails from
        Capture Client. Unsubscribe anytime. *
      </span>
    </label>

    <label class="consent-checkbox">
      <input type="checkbox" name="sms_consent" value="yes">
      <span>
        I also agree to receive text messages about Voice AI tips and
        resources. Reply STOP to opt-out. Optional.
      </span>
    </label>

    <button type="submit">Download Free Calculator</button>

    <p class="form-disclaimer">
      We respect your privacy. See our
      <a href="/privacy-policy">Privacy Policy</a>.
    </p>
  </form>
</div>
```

---

## 13. CRM SYSTEM - Consent Tracking Fields

**Add these fields to your CRM (HubSpot, Salesforce, etc.):**

```
Contact Fields to Create:
- SMS_Consent (Boolean: Yes/No)
- SMS_Consent_Date (Date/Time)
- SMS_Consent_Method (Text: "Website Form", "Phone Call", "In-Person", etc.)
- SMS_Consent_IP (Text: IP address for online opt-ins)
- Voice_Consent (Boolean: Yes/No)
- Voice_Consent_Date (Date/Time)
- Voice_Consent_Method (Text)
- Opt_Out_Date (Date/Time)
- Opt_Out_Method (Text: "SMS STOP", "Phone Call", "Email", etc.)
- DNC_Status (Boolean: Yes/No - Do Not Call)
- Campaign_Source (Text: Which campaign they opted into)
```

**Workflow to Set Up**:
1. When contact submits form with SMS consent checkbox → Set SMS_Consent = Yes, record date/time/IP
2. When contact texts STOP → Set SMS_Consent = No, DNC_Status = Yes, record opt-out date/method
3. Before sending ANY message → Check SMS_Consent = Yes AND DNC_Status = No

---

## 14. FACEBOOK ADS - Lead Form Disclaimer

**Required disclosure text for Facebook Lead Ads:**

```
By submitting this form, you agree to receive text messages and
AI-generated voice calls from Capture Client at the number provided.
Message frequency varies. Message and data rates may apply.
Reply STOP to opt-out. Consent is not required to purchase.
See Privacy Policy: [URL] | Terms: [URL]
```

**Important**: Facebook requires you to include links to Privacy Policy and Terms of Service in lead forms.

---

## 15. GOOGLE ADS - Call Extension Disclosure

**For Google Ads with call extensions, add this to ad description:**

```
"Calls may be recorded and may include AI-generated responses.
By calling, you consent to automated communications."
```

---

## IMPLEMENTATION PRIORITY

### Priority 1 (Do First):
1. ✅ Privacy Policy - Add SMS/Voice section (#1)
2. ✅ Terms of Service - Add SMS/Voice section (#2)
3. ✅ Contact Form - Update with compliant opt-in (#3)
4. ✅ AI Voice Script - Add opening disclosure (#6)

### Priority 2 (Do This Week):
5. ✅ Website Footer - Add compliance links (#7)
6. ✅ Opt-Out Messages - Set up auto-responses (#5, #9)
7. ✅ Homepage Form - Update with consent checkbox (#4)
8. ✅ CRM Fields - Add consent tracking (#13)

### Priority 3 (Do This Month):
9. ✅ Landing Pages - Add CTA disclaimers (#11)
10. ✅ Blog Lead Magnets - Update forms (#12)
11. ✅ Facebook/Google Ads - Update disclosures (#14, #15)
12. ✅ Email Signatures - Add opt-out info (#8)

---

## TESTING CHECKLIST

After implementing, test the following:

- [ ] Submit contact form WITHOUT phone number (should work)
- [ ] Submit contact form WITH phone number but NO consent checkbox (should work, but no SMS/calls sent)
- [ ] Submit contact form WITH consent checkbox (should work, SMS/calls allowed)
- [ ] Text STOP to your SMS number (should receive confirmation, then no more messages)
- [ ] Text HELP to your SMS number (should receive help message)
- [ ] Call AI voice agent and say "stop" (should be added to DNC list)
- [ ] Check CRM for proper consent field tracking
- [ ] Verify Privacy Policy and Terms are accessible from all forms
- [ ] Test mobile responsiveness of all forms

---

## RECORD KEEPING TEMPLATE

**Create a spreadsheet to track opt-ins/opt-outs:**

```
Columns:
- Contact Name
- Phone Number
- Email
- SMS Consent (Yes/No)
- Voice Consent (Yes/No)
- Consent Date
- Consent Method (Web Form, Phone, In-Person, etc.)
- Consent IP Address (if online)
- Opt-Out Date
- Opt-Out Method
- Campaign Source
- Notes
```

**Export this monthly and store securely for 7 years.**

---

## QUESTIONS? NEED HELP?

**Legal Compliance**:
- Consult a TCPA attorney for complex scenarios
- Review FCC.gov for latest regulations
- Check TheCampaignRegistry.com for 10DLC updates

**Technical Implementation**:
- Work with your SMS/voice provider for opt-out automation
- Set up webhooks to sync opt-outs to CRM immediately
- Use tools like Twilio, Bandwidth, or SignalWire for compliant messaging

**Capture Client Contact**:
- Phone: (865) 346-3339
- Email: team@captureclient.net

---

**Last Updated**: December 2025
**Version**: 1.0

**Remember**: When in doubt, over-disclose. It's better to be too transparent than face TCPA penalties.
