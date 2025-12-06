# Voice AI Legal Compliance - Quick Reference Summary

## Critical Compliance Requirements for Capture Client

### 1. IMMEDIATE REQUIREMENTS (Effective February 8, 2024)

**FCC Ruling:** AI-generated voices ARE "artificial" under TCPA
- Prior express consent REQUIRED for all AI voice calls
- Prior express WRITTEN consent REQUIRED for marketing calls
- Effective immediately (no grace period)

### 2. KEY DATES TO REMEMBER

| Date | Requirement |
|------|-------------|
| **April 11, 2025** | New opt-out rules (10-day processing max) |
| **January 1, 2026** | California AI Transparency Act |
| **February 1, 2026** | Colorado AI Act |

### 3. MUST-HAVE DISCLOSURES

**At the beginning of EVERY AI call:**
```
"Hello, this is an automated AI assistant calling from Capture Client.
Our number is 865-346-3339. This call is being made using artificial
intelligence technology. [Purpose of call...]"
```

**For call recording (two-party consent states):**
```
"This call is being recorded for quality assurance and training purposes.
By continuing this call, you consent to the recording."
```

### 4. RECOMMENDED CONSENT LANGUAGE

**For lead capture forms:**
```
By providing your phone number, you consent to receive calls, which may
include AI-generated voice messages, from Capture Client at the number
you provided. These calls may be made using automated technology. You
may opt out at any time by replying STOP or calling (865) 346-3339.
```

### 5. TWO-PARTY CONSENT STATES (All-Party Recording Consent Required)

California, Connecticut, Delaware, Florida, Illinois, Maryland,
Massachusetts, Michigan, Montana, Nevada, New Hampshire, Pennsylvania,
Vermont, Washington

### 6. CALLING HOURS (TCPA Quiet Hours)

**Federal:** 8:00 AM - 9:00 PM (called party's local time)
**Safe window:** 11:00 AM - 9:00 PM ET (covers all time zones)
**Florida:** 8:00 AM - 8:00 PM (stricter)

### 7. OPT-OUT REQUIREMENTS (Effective April 11, 2025)

**Must recognize these keywords:**
- STOP
- QUIT
- END
- REVOKE
- OPT-OUT
- CANCEL
- UNSUBSCRIBE

**Processing time:** 10 business days maximum

### 8. DO NOT CALL (DNC) COMPLIANCE

- Scrub against National DNC Registry every 31 days
- Maintain internal DNC list
- Document all scrubbing activities
- Honor opt-out requests immediately

### 9. PENALTIES (Why This Matters)

- **$500 per violation** (non-willful)
- **$1,500 per violation** (willful/knowing)
- **No cap** on total penalties
- **4-year statute of limitations**
- **Class action risk:** Can reach millions/billions

### 10. TERMS OF SERVICE - REQUIRED SECTIONS

1. AI Technology Disclosure
2. TCPA Compliance and Consent
3. Call Recording Disclosure
4. Data Collection and Use (AI-Specific)
5. Opt-Out and Do Not Call Rights
6. State-Specific Compliance
7. Limitations of AI Technology

### 11. PRIVACY POLICY - REQUIRED SECTIONS

1. Types of Information Collected (Voice/Call Data)
2. How We Use AI-Collected Information
3. AI-Specific Data Sharing and Processing
4. Biometric Information Privacy (Illinois BIPA)
5. Call Recording Privacy
6. Data Retention and Deletion
7. Your Privacy Rights (Comprehensive)
8. AI Transparency and Explainability

### 12. ILLINOIS SPECIAL REQUIREMENT (BIPA)

**If collecting voiceprints from Illinois residents:**
- Separate written consent REQUIRED
- Must disclose purpose and retention period
- Cannot sell/lease voiceprints
- Must allow deletion on request
- Penalties: $1,000-$5,000 per violation

### 13. CALIFORNIA SPECIAL REQUIREMENTS

**Current (2024):**
- AI must identify as automated: "I am an automated virtual assistant"

**January 1, 2026:**
- SB 942: Provide AI detection tool for generated content
- AB 2013: Disclose training data publicly

### 14. COLORADO REQUIREMENT (February 1, 2026)

- Disclose "high-risk" AI systems on website
- Notify consumers before AI makes consequential decisions
- Conduct impact assessments

### 15. WHAT TO UPDATE ON CAPTURE CLIENT WEBSITE

**Immediate Updates Needed:**

1. **Terms of Service** (`C:\Users\eaqqa\capture-client-website-seo\capture-client-site\src\app\terms-of-service\page.tsx`)
   - Add AI Technology Disclosure section
   - Add TCPA Compliance section
   - Add Call Recording section
   - Add State-Specific Compliance

2. **Privacy Policy** (`C:\Users\eaqqa\capture-client-website-seo\capture-client-site\src\app\privacy-policy\page.tsx`)
   - Add Voice AI Data Collection section
   - Add Biometric Information Privacy section
   - Add Call Recording Privacy section
   - Add AI Transparency section

3. **Lead Capture Forms** (All pages)
   - Add TCPA consent language
   - Add AI disclosure
   - Add opt-out instructions

4. **Website Footer**
   - Link to updated Terms and Privacy
   - Add TCPA compliance statement

### 16. COMPLIANCE CHECKLIST FOR CAPTURE CLIENT

**Pre-Launch:**
- [ ] Draft TCPA-compliant Terms of Service
- [ ] Draft TCPA-compliant Privacy Policy
- [ ] Create Biometric Privacy Policy (for Illinois)
- [ ] Implement consent mechanism on lead forms
- [ ] Add AI disclosure to call scripts
- [ ] Configure calling hours (8 AM - 9 PM local)
- [ ] Set up DNC Registry scrubbing (every 31 days)
- [ ] Implement opt-out keyword recognition
- [ ] Create call recording disclosure
- [ ] Set up consent logging system
- [ ] Implement audit trail for all calls

**Ongoing:**
- [ ] DNC scrubbing every 31 days
- [ ] Process opt-outs within 10 days (by April 2025)
- [ ] Monitor AI calls for compliance
- [ ] Quarterly consent record audits
- [ ] Annual privacy policy updates
- [ ] Regular employee training

### 17. HIGH-RISK ACTIONS TO AVOID

**NEVER:**
- Call without consent
- Ignore opt-out requests
- Call DNC Registry numbers
- Call outside 8 AM - 9 PM local time
- Record without disclosure (two-party states)
- Claim AI is human
- Collect voiceprints without consent (Illinois)
- Use blanket partner consent (one-to-one required)

### 18. RECOMMENDED BEST PRACTICES

**Go Beyond Minimum Requirements:**
- Disclose AI use even when not required
- Get written consent for all calls (easier to prove)
- Process opt-outs within 24-48 hours (not 10 days)
- Use conservative hours (9 AM - 8 PM)
- Scrub DNC weekly (not just every 31 days)
- Conduct monthly compliance audits
- Train AI on compliance scenarios
- Maintain TCPA defense insurance

### 19. EXAMPLE CONSENT FLOW FOR LEAD FORMS

**Lead Capture Form Example:**
```html
<form>
  <input type="tel" name="phone" required>

  <label>
    <input type="checkbox" name="consent" required>
    By checking this box, I consent to receive calls, which may include
    AI-generated voice messages, from Capture Client at the number
    above. These calls may be made using automated technology for
    informational, service, and marketing purposes. I understand:

    • Consent is not required to purchase services
    • I may opt out anytime by replying STOP or calling (865) 346-3339
    • Calls may be recorded for quality assurance
    • Message and data rates may apply

    I have read the Privacy Policy and Terms of Service.
  </label>

  <button type="submit">Get Started</button>
</form>
```

### 20. KEY RESOURCES

**Full Legal Guide:**
`C:\Users\eaqqa\capture-client-website-seo\AI_VOICE_LEGAL_COMPLIANCE_GUIDE.md`

**Primary Sources:**
- [FCC AI Robocall Ruling (Feb 2024)](https://www.fcc.gov/document/fcc-makes-ai-generated-voices-robocalls-illegal)
- [FCC AI Disclosure NPRM (Aug 2024)](https://www.fcc.gov/document/fcc-proposes-first-ai-generated-robocall-robotext-rules-0)
- [TCPA Overview - FDIC](https://www.fdic.gov/resources/supervision-and-examinations/consumer-compliance-examination-manual/documents/8/viii-5-1.pdf)
- [Two-Party Consent States](https://worldpopulationreview.com/state-rankings/two-party-consent-states)

**Legal Counsel Required For:**
- Formal legal opinion on compliance
- Review of consent language
- Terms of Service drafting
- Privacy Policy drafting
- TCPA litigation defense
- State-specific strategies

---

## NEXT STEPS FOR CAPTURE CLIENT

1. **Consult legal counsel** specializing in TCPA and telecommunications law
2. **Review full compliance guide** (`AI_VOICE_LEGAL_COMPLIANCE_GUIDE.md`)
3. **Update Terms of Service** with required sections
4. **Update Privacy Policy** with required sections
5. **Update all lead capture forms** with TCPA consent language
6. **Implement consent logging** system
7. **Configure AI call scripts** with proper disclosures
8. **Set up DNC scrubbing** process
9. **Create opt-out processing** workflow
10. **Schedule compliance audit** before launch

---

**CRITICAL:** Do not launch Voice AI services without:
1. Legal counsel review
2. Updated Terms and Privacy pages
3. Proper consent mechanisms
4. Call disclosure scripts
5. DNC compliance system
6. Opt-out processing system

**Contact for Questions:**
- Email: team@captureclient.net
- Phone: (865) 346-3339

---

**Last Updated:** December 1, 2025
**Review Full Guide:** AI_VOICE_LEGAL_COMPLIANCE_GUIDE.md
