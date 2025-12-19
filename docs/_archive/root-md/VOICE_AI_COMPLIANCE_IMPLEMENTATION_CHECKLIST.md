# Voice AI Legal Compliance - Implementation Checklist

**Project:** Capture Client Website
**Compliance Focus:** TCPA, FCC AI Rules, State Call Recording Laws, State AI Regulations
**Timeline:** Pre-Launch Implementation Required

---

## Phase 1: Legal Review (CRITICAL - Do This First)

- [ ] **Engage telecommunications law attorney**
  - Specialization: TCPA, FCC regulations, AI law
  - Review all compliance documents
  - Provide formal legal opinion
  - Estimated cost: $3,000-$10,000

- [ ] **Review comprehensive compliance guide**
  - Read: `AI_VOICE_LEGAL_COMPLIANCE_GUIDE.md`
  - Understand all requirements
  - Identify gaps in current implementation
  - Note any questions for attorney

- [ ] **Obtain compliance insurance**
  - TCPA defense coverage
  - Minimum $1M coverage recommended
  - Review policy exclusions
  - Estimated cost: $2,000-$5,000/year

---

## Phase 2: Website Legal Pages Update

### Terms of Service Updates

**File Location:** `capture-client-site\src\app\terms-of-service\page.tsx`

- [ ] **Add AI Technology Disclosure section**
  - Copy from: `TERMS_OF_SERVICE_AI_SECTIONS.md` (Section 1)
  - Customize for Capture Client branding
  - Review with attorney

- [ ] **Add TCPA Compliance and Consent section**
  - Copy from: `TERMS_OF_SERVICE_AI_SECTIONS.md` (Section 2)
  - Update contact info: (865) 346-3339, team@captureclient.net
  - Include all opt-out methods
  - Review with attorney

- [ ] **Add Call Recording and Monitoring section**
  - Copy from: `TERMS_OF_SERVICE_AI_SECTIONS.md` (Section 3)
  - List all two-party consent states
  - Explain notification methods
  - Review with attorney

- [ ] **Add AI Data Collection section**
  - Copy from: `TERMS_OF_SERVICE_AI_SECTIONS.md` (Section 4)
  - List third-party AI processors
  - Explain data retention periods
  - Review with attorney

- [ ] **Add Opt-Out and Do Not Call Rights section**
  - Copy from: `TERMS_OF_SERVICE_AI_SECTIONS.md` (Section 5)
  - Include all opt-out keywords
  - Specify 10-day processing time
  - Review with attorney

- [ ] **Add State-Specific Compliance section**
  - Copy from: `TERMS_OF_SERVICE_AI_SECTIONS.md` (Section 6)
  - California, Colorado, Illinois specific rules
  - Review with attorney

- [ ] **Add Limitations of AI Technology section**
  - Copy from: `TERMS_OF_SERVICE_AI_SECTIONS.md` (Section 7)
  - Explain human escalation process
  - Disclaim professional advice
  - Review with attorney

- [ ] **Update "Last Updated" date**
  - Add current date to Terms of Service
  - Consider version numbering

- [ ] **Attorney final review**
  - Submit complete Terms to attorney
  - Incorporate feedback
  - Obtain written approval

### Privacy Policy Updates

**File Location:** `capture-client-site\src\app\privacy-policy\page.tsx`

- [ ] **Add Information We Collect Through Voice AI section**
  - Copy from: `PRIVACY_POLICY_AI_SECTIONS.md` (Section 1)
  - List all data types collected
  - Review with attorney

- [ ] **Add How We Use Voice AI Data section**
  - Copy from: `PRIVACY_POLICY_AI_SECTIONS.md` (Section 2)
  - Explain all use cases
  - Review with attorney

- [ ] **Add AI-Specific Data Sharing section**
  - Copy from: `PRIVACY_POLICY_AI_SECTIONS.md` (Section 3)
  - Name all third-party processors
  - Explain international transfers
  - Review with attorney

- [ ] **Add Biometric Information Privacy Policy section**
  - Copy from: `PRIVACY_POLICY_AI_SECTIONS.md` (Section 4)
  - CRITICAL for Illinois BIPA compliance
  - Include voiceprint retention period (3 years)
  - Explain immediate deletion for Illinois residents
  - Review with attorney

- [ ] **Add Call Recording Privacy section**
  - Copy from: `PRIVACY_POLICY_AI_SECTIONS.md` (Section 5)
  - Explain two-party consent compliance
  - List recording retention periods
  - Review with attorney

- [ ] **Add Data Retention and Deletion section**
  - Copy from: `PRIVACY_POLICY_AI_SECTIONS.md` (Section 6)
  - Specify retention periods for each data type
  - Explain automatic deletion
  - Review with attorney

- [ ] **Add Your Privacy Rights section**
  - Copy from: `PRIVACY_POLICY_AI_SECTIONS.md` (Section 7)
  - Include all state-specific rights
  - California CCPA/CPRA
  - Colorado, Connecticut, Virginia, Utah
  - Illinois BIPA
  - Review with attorney

- [ ] **Add AI Transparency and Explainability section**
  - Copy from: `PRIVACY_POLICY_AI_SECTIONS.md` (Section 8)
  - Explain how AI makes decisions
  - List high-risk decisions requiring human review
  - Review with attorney

- [ ] **Update "Last Updated" date**
  - Add current date to Privacy Policy

- [ ] **Attorney final review**
  - Submit complete Privacy Policy to attorney
  - Incorporate feedback
  - Obtain written approval

---

## Phase 3: Lead Capture Form Updates

**Files to Update:**
- `capture-client-site\src\app\page.tsx` (homepage form)
- `capture-client-site\src\app\contact\page.tsx` (contact form)
- `capture-client-site\src\app\services\[slug]\page.tsx` (service forms)
- `capture-client-site\src\components\LeadCaptureForm.tsx` (shared component)
- Any other forms collecting phone numbers

### Consent Language Updates

- [ ] **Add TCPA consent checkbox to all forms**
  ```html
  <label>
    <input type="checkbox" name="tcpa_consent" required>
    By checking this box, I consent to receive calls, which may include
    AI-generated voice messages, from Capture Client at the number above.
    These calls may be made using automated technology for informational,
    service, and marketing purposes. I understand:

    • Consent is not required to purchase services
    • I may opt out anytime by replying STOP or calling (865) 346-3339
    • Calls may be recorded for quality assurance
    • Message and data rates may apply

    I have read the <a href="/privacy-policy">Privacy Policy</a> and
    <a href="/terms-of-service">Terms of Service</a>.
  </label>
  ```

- [ ] **Add required field validation**
  - Phone number field: required
  - TCPA consent checkbox: required
  - Cannot submit without both

- [ ] **Add privacy policy and terms links**
  - Link to updated Privacy Policy
  - Link to updated Terms of Service
  - Open in new tab/window

- [ ] **Update form submission handling**
  - Log consent timestamp
  - Store consent in database
  - Include consent in lead record

- [ ] **Test all forms**
  - Verify consent language displays correctly
  - Test required field validation
  - Verify links work
  - Test mobile responsiveness

---

## Phase 4: Consent Management System

- [ ] **Set up consent logging database**
  - Create consent_logs table:
    - id (primary key)
    - phone_number (indexed)
    - email
    - consent_type (express, written, AI, recording)
    - consent_timestamp
    - ip_address
    - user_agent
    - form_url
    - consent_text (full text of what they agreed to)

- [ ] **Implement consent capture**
  - Log all form submissions with phone numbers
  - Capture timestamp, IP, user agent
  - Store full consent language version
  - Generate unique consent ID

- [ ] **Create consent verification system**
  - Check consent before making calls
  - Verify consent is current (within 4 years)
  - Check opt-out status

- [ ] **Build opt-out mechanism**
  - Create opt_out_list table
  - Add phone numbers to opt-out list
  - Check before calling
  - Update within 24-48 hours of opt-out request

- [ ] **Set up 4-year consent retention**
  - Retain consent records for 4+ years (TCPA statute of limitations)
  - Do NOT delete consent records prematurely
  - Archive after 4 years but keep accessible

---

## Phase 5: AI Call Script Compliance

- [ ] **Create AI disclosure script**
  ```
  "Hello, this is an automated AI assistant calling from Capture Client.
  Our number is 865-346-3339. This call is being made using artificial
  intelligence technology. [Purpose of call...]"
  ```

- [ ] **Add call recording disclosure (two-party states)**
  ```
  "This call is being recorded for quality assurance and training purposes.
  By continuing this call, you consent to the recording. Is that okay?"

  [Wait for verbal affirmative response]
  ```

- [ ] **Program AI to recognize opt-out keywords**
  - STOP
  - QUIT
  - END
  - REVOKE
  - OPT-OUT
  - CANCEL
  - UNSUBSCRIBE
  - "add me to your do not call list"
  - "remove me"

- [ ] **Implement human escalation triggers**
  - "speak to a human"
  - "transfer to representative"
  - "I need to talk to a person"
  - "get me a human"
  - Transfer immediately when detected

- [ ] **Configure calling hours**
  - 8:00 AM - 9:00 PM local time (called party)
  - Recommended: 9:00 AM - 8:00 PM for extra safety
  - NO calls outside these hours

- [ ] **Implement time zone detection**
  - Detect called party's time zone from area code
  - Use database of area codes to time zones
  - If uncertain, use conservative window (11 AM - 9 PM ET)

---

## Phase 6: Do Not Call (DNC) Compliance

- [ ] **Register for National DNC Registry access**
  - Visit: www.telemarketing.donotcall.gov
  - Register as telemarketer
  - Pay annual fee (approx. $66 per area code)
  - Obtain login credentials

- [ ] **Set up DNC scrubbing system**
  - Download DNC Registry data every 31 days (minimum)
  - Recommended: Weekly scrubbing
  - Automated process preferred

- [ ] **Implement pre-call DNC check**
  - Check phone number against DNC list before calling
  - Block calls to DNC-registered numbers
  - Log blocked calls for auditing

- [ ] **Maintain internal DNC list**
  - Create internal_dnc_list table
  - Add opted-out phone numbers
  - Check before every call
  - Never expires (permanent)

- [ ] **Document DNC scrubbing**
  - Log each DNC download: date, time, record count
  - Retain for 4+ years
  - Prove compliance in case of complaint

---

## Phase 7: Call Recording System

- [ ] **Implement state detection**
  - Detect caller location from area code
  - Flag two-party consent states:
    - CA, CT, DE, FL, IL, MD, MA, MI, MT, NV, NH, PA, VT, WA
  - Apply strictest rule for interstate calls

- [ ] **Add pre-call recording notification**
  - Automated message: "This call may be recorded..."
  - OR verbal notification by AI agent
  - OR beep tone (California-compliant)

- [ ] **Obtain explicit consent in two-party states**
  - Ask: "Is that okay?" or "Do you consent?"
  - Wait for verbal affirmative response ("yes", "okay", "sure")
  - Record consent statement
  - If declined, don't record or transfer to non-recorded line

- [ ] **Set up secure recording storage**
  - Encrypted storage (AES-256)
  - Access controls (role-based)
  - Audit logging
  - Backup and redundancy

- [ ] **Implement retention schedule**
  - Customer service calls: 90 days
  - Sales calls: 1 year
  - Compliance calls: 2 years
  - Automatic deletion after retention period

- [ ] **Create recording access system**
  - Allow customers to request recordings
  - Verify identity before providing
  - Respond within 30-45 days
  - Provide in common audio format (MP3, WAV)

---

## Phase 8: Illinois BIPA Compliance (If Collecting Voiceprints)

**NOTE:** Only required if you're collecting voiceprint biometric data for identity verification or personalization. If you're NOT collecting voiceprints, you can skip this section.

- [ ] **Create separate BIPA consent form**
  ```
  BIOMETRIC INFORMATION CONSENT (Illinois Residents)

  Capture Client may collect, use, and store your voiceprint as a
  biometric identifier to provide voice AI services.

  PURPOSE: Your voiceprint will be used to verify your identity and
  provide personalized service.

  RETENTION: We will retain your voiceprint for 3 years from last use
  or until you request deletion, whichever comes first.

  DISCLOSURE: We will not sell, lease, or trade your voiceprint to
  third parties without your separate written consent.

  YOUR RIGHTS: You may request deletion of your voiceprint at any time
  by contacting team@captureclient.net.

  By signing, I consent to the collection, use, and storage of my
  voiceprint as described above.

  Signature: __________________ Date: __________
  ```

- [ ] **Detect Illinois residents**
  - Check area code (312, 773, 872, 217, 309, 618, etc.)
  - Ask for location if uncertain
  - Flag Illinois users in database

- [ ] **Require separate consent before collection**
  - Present BIPA consent form
  - Obtain written/electronic signature
  - Store consent record permanently
  - DO NOT collect voiceprint without consent

- [ ] **Create public retention policy**
  - Post on website (publicly accessible)
  - Explain voiceprint retention (3 years)
  - Explain deletion process
  - Update Privacy Policy with retention schedule

- [ ] **Implement immediate deletion for Illinois**
  - Process deletion requests within 24-48 hours
  - Confirm deletion via email
  - Purge from all systems including backups
  - Document deletion

- [ ] **Never sell or share voiceprints**
  - Strict policy: NO sale, lease, or trade
  - Third-party sharing only with explicit consent
  - Or for processing with DPA in place

---

## Phase 9: State-Specific Compliance

### California (Effective Now)

- [ ] **AI identifies as automated**
  - Script: "I am an automated virtual assistant from Capture Client"
  - At beginning of every call to California residents
  - Detect California area codes (213, 310, 323, 408, 415, etc.)

- [ ] **Prepare for SB 942 (January 1, 2026)**
  - Research AI detection tool requirements
  - Plan implementation (if over 1M monthly users)
  - Add latent disclosures to AI content

- [ ] **Prepare for AB 2013 (January 1, 2026)**
  - Document AI training data sources
  - Prepare public disclosure
  - Post on website by Jan 1, 2026

### Colorado (Effective February 1, 2026)

- [ ] **Determine if Voice AI is "high-risk"**
  - Does it make consequential decisions?
  - Employment, financial, healthcare, legal, housing, etc.
  - Consult with attorney

- [ ] **If high-risk, conduct impact assessment**
  - Document AI system purpose
  - Identify risks of algorithmic discrimination
  - Mitigation strategies

- [ ] **Disclose high-risk AI on website**
  - Create public disclosure page
  - List high-risk AI systems
  - Explain purpose and how managed
  - Post by February 1, 2026

- [ ] **Notify consumers before consequential decisions**
  - Disclosure: AI is making a decision that affects them
  - Description of AI system and purpose
  - Contact information

### Florida

- [ ] **Adjust calling hours for Florida**
  - 8:00 AM - 8:00 PM (stricter than federal 8 AM - 9 PM)
  - Detect Florida area codes
  - Apply Florida-specific hours

---

## Phase 10: Documentation and Record-Keeping

- [ ] **Create compliance documentation repository**
  - Folder structure for compliance records
  - Secure storage with access controls
  - Regular backups

- [ ] **Consent records**
  - Who consented, when, how
  - Full consent language version
  - IP address, user agent, form URL
  - Retention: 4+ years (TCPA statute of limitations)

- [ ] **Call logs**
  - Every call: phone number, date, time, duration, outcome
  - AI or human agent
  - Opt-out requests
  - Consent verification status
  - Retention: 5 years (compliance audits)

- [ ] **DNC scrubbing records**
  - Date of each DNC Registry download
  - Number of records
  - Scrubbing process logs
  - Retention: 4+ years

- [ ] **Opt-out records**
  - Date/time of opt-out request
  - Method (text, call, email)
  - Date added to internal DNC list
  - Retention: Permanent

- [ ] **Call recording metadata**
  - Which calls were recorded
  - Consent obtained (yes/no)
  - State of called party
  - Storage location
  - Deletion date
  - Retention: 5 years

- [ ] **Incident reports**
  - Any TCPA violations or near-misses
  - Complaints received
  - Remediation actions taken
  - Retention: 7 years

- [ ] **Training records**
  - Employee TCPA compliance training
  - AI system compliance training
  - Dates and attendees
  - Retention: 4 years

---

## Phase 11: Testing and Quality Assurance

- [ ] **Test AI disclosure**
  - Verify AI announces identity at call start
  - Test with multiple scenarios
  - Record and review test calls

- [ ] **Test call recording disclosure**
  - Verify notification plays correctly
  - Test two-party consent state handling
  - Verify consent capture

- [ ] **Test opt-out keywords**
  - Verify STOP, QUIT, END, etc. all work
  - Test immediate opt-out processing
  - Verify addition to internal DNC list

- [ ] **Test calling hours**
  - Verify no calls before 8 AM local time
  - Verify no calls after 9 PM local time
  - Test time zone detection accuracy

- [ ] **Test DNC suppression**
  - Add test number to internal DNC list
  - Verify call is blocked
  - Test with National DNC Registry numbers

- [ ] **Test consent verification**
  - Verify calls only to consented numbers
  - Test consent expiration (4 years)
  - Test consent revocation

- [ ] **Test human escalation**
  - Say "speak to a human"
  - Verify immediate transfer
  - Test multiple trigger phrases

- [ ] **Test state detection**
  - Test California area code → AI disclosure
  - Test Illinois area code → BIPA handling
  - Test Florida area code → adjusted calling hours
  - Test two-party consent states → recording disclosure

- [ ] **Test forms**
  - Submit lead capture forms
  - Verify consent is logged correctly
  - Verify timestamp and IP captured
  - Test required field validation

---

## Phase 12: Training

- [ ] **Train AI system**
  - TCPA compliance scenarios
  - Opt-out keyword recognition
  - Human escalation triggers
  - Calling hours enforcement
  - State-specific handling

- [ ] **Train human staff**
  - TCPA overview and importance
  - Consent requirements
  - Opt-out handling (10-day max)
  - DNC compliance
  - Call recording laws
  - State-specific rules
  - Document training attendance

- [ ] **Create compliance manual**
  - Internal TCPA compliance guide
  - Step-by-step procedures
  - Escalation contacts
  - FAQs for staff

- [ ] **Schedule regular training**
  - Quarterly compliance refreshers
  - Updates on new regulations
  - Review of incidents/near-misses
  - Document all training sessions

---

## Phase 13: Ongoing Compliance

- [ ] **Monthly compliance reviews**
  - Review call logs for violations
  - Check opt-out processing times
  - Verify DNC scrubbing completed
  - Review consent records

- [ ] **Quarterly audits**
  - Full compliance audit
  - Review all systems and processes
  - Test all safeguards
  - Document findings and remediation

- [ ] **DNC scrubbing schedule**
  - Every 31 days (minimum)
  - Recommended: Weekly
  - Set up automated reminders
  - Document each scrubbing

- [ ] **Opt-out processing**
  - Process within 10 business days (max by April 2025)
  - Recommended: 24-48 hours
  - Confirm via email

- [ ] **Monitor regulatory changes**
  - Subscribe to FCC updates
  - Follow telecom law blogs
  - Attend compliance webinars
  - Update policies as needed

- [ ] **Privacy Policy updates**
  - Annual review (minimum)
  - Update when regulations change
  - Update when services change
  - Document all versions

- [ ] **Incident response**
  - Investigate all TCPA complaints immediately
  - Document incident and response
  - Remediate within 24 hours
  - Report to legal counsel
  - Update training to prevent recurrence

---

## Phase 14: Pre-Launch Final Checklist

**DO NOT LAUNCH until ALL items below are checked:**

- [ ] **Legal counsel review complete**
  - Terms of Service approved by attorney
  - Privacy Policy approved by attorney
  - Consent language approved by attorney
  - Written approval obtained

- [ ] **Website legal pages updated**
  - Terms of Service updated and live
  - Privacy Policy updated and live
  - Last updated dates current
  - Links working

- [ ] **Lead capture forms updated**
  - TCPA consent checkbox on all forms
  - Privacy Policy and Terms links working
  - Required field validation working
  - Mobile-responsive

- [ ] **Consent system operational**
  - Database logging consent
  - Timestamp and IP capture working
  - Consent verification system working
  - 4-year retention implemented

- [ ] **AI call scripts compliant**
  - AI disclosure in opening script
  - Call recording disclosure implemented
  - Opt-out keyword recognition working
  - Human escalation working

- [ ] **Calling hours enforced**
  - 8 AM - 9 PM local time only
  - Time zone detection working
  - Florida hours adjusted (8 AM - 8 PM)
  - System cannot call outside hours

- [ ] **DNC compliance ready**
  - National DNC Registry access set up
  - First scrubbing completed
  - Internal DNC list created
  - Pre-call DNC check working

- [ ] **Call recording compliant**
  - State detection working
  - Two-party consent disclosure working
  - Consent capture working
  - Secure storage implemented
  - Retention schedule automated

- [ ] **Illinois BIPA ready (if collecting voiceprints)**
  - BIPA consent form created
  - Illinois resident detection working
  - Separate consent required
  - Immediate deletion system ready
  - Public retention policy posted

- [ ] **State-specific compliance**
  - California AI disclosure working
  - Colorado high-risk disclosure ready
  - Florida hours adjusted
  - All two-party states handled

- [ ] **Testing complete**
  - All systems tested
  - No critical issues
  - Test results documented

- [ ] **Staff training complete**
  - All staff trained on TCPA
  - Training documented
  - Compliance manual created

- [ ] **Documentation ready**
  - Compliance repository set up
  - Logging systems operational
  - Retention schedules programmed
  - Audit trail working

- [ ] **Compliance insurance obtained**
  - TCPA defense coverage active
  - Policy reviewed and understood
  - Coverage confirmed

- [ ] **Ongoing compliance scheduled**
  - Monthly review calendar set
  - Quarterly audit scheduled
  - DNC scrubbing automated
  - Regulatory monitoring subscribed

---

## Emergency Contacts

**Legal Counsel:**
[Attorney Name]
[Law Firm]
[Phone]
[Email]

**Compliance Officer:**
[Name]
[Title]
(865) 346-3339
team@captureclient.net

**Technical Lead:**
[Name]
[Title]
[Phone]
[Email]

---

## Resources

**Full Compliance Guide:**
`C:\Users\eaqqa\capture-client-website-seo\AI_VOICE_LEGAL_COMPLIANCE_GUIDE.md`

**Quick Reference:**
`C:\Users\eaqqa\capture-client-website-seo\VOICE_AI_COMPLIANCE_SUMMARY.md`

**Terms of Service Templates:**
`C:\Users\eaqqa\capture-client-website-seo\TERMS_OF_SERVICE_AI_SECTIONS.md`

**Privacy Policy Templates:**
`C:\Users\eaqqa\capture-client-website-seo\PRIVACY_POLICY_AI_SECTIONS.md`

---

## Timeline Estimate

**Assuming full-time effort:**
- Phase 1 (Legal Review): 1-2 weeks
- Phase 2 (Website Updates): 1 week
- Phase 3 (Form Updates): 3-5 days
- Phase 4 (Consent System): 1 week
- Phase 5 (AI Scripts): 1 week
- Phase 6 (DNC Compliance): 1 week
- Phase 7 (Call Recording): 1 week
- Phase 8 (BIPA - if needed): 1 week
- Phase 9 (State Compliance): 3-5 days
- Phase 10 (Documentation): 3-5 days
- Phase 11 (Testing): 1 week
- Phase 12 (Training): 3-5 days
- Phase 13 (Ongoing Setup): 3-5 days
- Phase 14 (Final Review): 3-5 days

**Total: 8-12 weeks to full compliance**

**Critical Path:**
1. Legal counsel review (Week 1-2)
2. Website updates (Week 3)
3. System implementation (Week 4-8)
4. Testing and training (Week 9-10)
5. Final review and launch (Week 11-12)

---

## Budget Estimate

**Legal:**
- Attorney review: $3,000-$10,000
- Compliance insurance: $2,000-$5,000/year

**Technology:**
- Consent management system: $500-$2,000 (development)
- DNC Registry access: $66 per area code/year
- Call recording storage: $100-$500/month
- Compliance software: $200-$1,000/month

**Ongoing:**
- Monthly compliance reviews: $500-$1,000/month
- Quarterly audits: $1,000-$3,000/quarter
- Staff training: $500-$2,000/year

**Total Year 1: $15,000-$40,000**
**Ongoing Years: $10,000-$25,000/year**

---

**CRITICAL REMINDER:**

DO NOT LAUNCH Voice AI services without completing this checklist.

The penalties for TCPA violations are severe:
- $500-$1,500 per call
- No cap on total penalties
- Class action risk
- Potential multimillion-dollar settlements

Investing in compliance upfront is FAR cheaper than defending TCPA lawsuits.

---

**Last Updated:** December 1, 2025
**Version:** 1.0
**Review:** Required before launch
