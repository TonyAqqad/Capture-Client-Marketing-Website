import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Capture Client",
  description:
    "Read Capture Client's privacy policy to understand how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-16 bg-gradient-to-br from-background-dark via-background-dark to-primary/10">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">Privacy Policy</h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">Last Updated: January 2025</p>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-16 py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto prose prose-base sm:prose-lg dark:prose-invert">
          <div className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl p-5 sm:p-6 md:p-8 lg:p-12 space-y-6 sm:space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                1. Introduction
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed" style={{lineHeight: '1.8'}}>
                Capture Client ("we," "our," or "us") is committed to protecting your privacy. This
                Privacy Policy explains how we collect, use, disclose, and safeguard your
                information when you use our platform, services, and website.
              </p>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                2. Information We Collect
              </h2>

              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 mt-4 sm:mt-6">
                Information You Provide
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                We collect information you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-600 dark:text-gray-400" style={{lineHeight: '1.8', paddingLeft: '0.5rem'}}>
                <li>Account information (name, email, phone number, company name)</li>
                <li>
                  Payment information (processed securely through third-party payment processors)
                </li>
                <li>Contact and lead information you input into our CRM</li>
                <li>Communications with us (support tickets, emails, phone calls)</li>
                <li>Information from calls handled by our AI Voice Agents</li>
              </ul>

              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 mt-4 sm:mt-6">
                Automatically Collected Information
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                When you use our services, we may automatically collect:
              </p>
              <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-600 dark:text-gray-400" style={{lineHeight: '1.8', paddingLeft: '0.5rem'}}>
                <li>Device information (IP address, browser type, operating system)</li>
                <li>Usage data (pages visited, features used, time spent on platform)</li>
                <li>Cookies and similar tracking technologies</li>
                <li>Call recordings and transcripts (with appropriate consent)</li>
              </ul>

              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 mt-4 sm:mt-6">
                Information Collected Through Voice AI
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                When you interact with our AI voice agents, we collect:
              </p>
              <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-600 dark:text-gray-400" style={{lineHeight: '1.8', paddingLeft: '0.5rem'}}>
                <li><strong>Voice and Call Data:</strong> Audio recordings of calls with our AI agents, voice segments for quality assurance</li>
                <li><strong>Call Transcripts:</strong> Text transcriptions of voice conversations, intent and sentiment analysis results</li>
                <li><strong>Call Metadata:</strong> Phone number, date and time of calls, call duration and outcome, call routing information</li>
                <li><strong>Voiceprint Data:</strong> In certain cases, voice characteristics that may be used for identity verification (with consent where required by law)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-600 dark:text-gray-400" style={{lineHeight: '1.8', paddingLeft: '0.5rem'}}>
                <li>Provide, maintain, and improve our services</li>
                <li>Process your transactions and manage your account</li>
                <li>Send you technical notices, updates, and support messages</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Analyze platform usage to improve user experience</li>
                <li>Detect, prevent, and address technical issues or fraud</li>
                <li>Comply with legal obligations</li>
                <li>Send marketing communications (with your consent)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                4. How We Share Your Information
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-600 dark:text-gray-400" style={{lineHeight: '1.8', paddingLeft: '0.5rem'}}>
                <li>
                  <strong>Service Providers:</strong> Third-party vendors who perform services on
                  our behalf (payment processing, hosting, analytics)
                </li>
                <li>
                  <strong>Business Partners:</strong> Google Ads, Facebook Ads, and other
                  advertising platforms (only as necessary to deliver services)
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law or to protect our rights
                </li>
                <li>
                  <strong>Business Transfers:</strong> In connection with any merger, sale, or
                  acquisition
                </li>
              </ul>

              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 mt-4 sm:mt-6">
                Third-Party AI Processors
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                We may share voice data with third-party AI service providers for processing and analysis, including:
              </p>
              <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-600 dark:text-gray-400" style={{lineHeight: '1.8', paddingLeft: '0.5rem'}}>
                <li>Cloud-based AI processing platforms and machine learning services</li>
                <li>Natural language processing and speech recognition providers</li>
                <li>Call analytics and business intelligence platforms</li>
                <li>Telephony and communication service providers</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
                All third-party processors are required to sign data processing agreements, protect data with appropriate security measures, use data only for specified purposes, and comply with applicable privacy laws.
              </p>

              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 mt-4 sm:mt-6">
                SMS and Voice Data Sharing Restrictions
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                <strong>IMPORTANT:</strong> We will NOT share your mobile phone number or SMS opt-in consent with any third parties or affiliates for marketing purposes. All text-messaging opt-in records and consent data are kept private and will NEVER be transferred to third-party marketers.
              </p>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                5. Data Security
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed" style={{lineHeight: '1.8'}}>
                We implement appropriate technical and organizational measures to protect your
                information against unauthorized access, alteration, disclosure, or destruction.
                These measures include encryption, secure servers, access controls, and regular
                security audits. However, no method of transmission over the internet is 100%
                secure.
              </p>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                6. Data Retention
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                We retain your information for as long as necessary to provide our services, comply
                with legal obligations, resolve disputes, and enforce our agreements.
              </p>

              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 mt-4 sm:mt-6">
                Voice AI Data Retention Periods
              </h3>
              <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-600 dark:text-gray-400" style={{lineHeight: '1.8', paddingLeft: '0.5rem'}}>
                <li><strong>Call Audio Recordings:</strong> 90 days to 2 years (depending on purpose)</li>
                <li><strong>Call Transcripts:</strong> 2 years</li>
                <li><strong>Voiceprints (Biometric Data):</strong> 3 years from last use, or immediately upon request</li>
                <li><strong>Call Metadata:</strong> 5 years (for compliance and auditing)</li>
                <li><strong>Consent Records:</strong> 4+ years (TCPA statute of limitations)</li>
                <li><strong>AI Training Data (Anonymized):</strong> May be retained indefinitely</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
                When you close your account, we will delete or anonymize your data within a reasonable timeframe, except where we are required to retain it by law.
              </p>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                7. Call Recording Privacy
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Calls with our AI voice agents may be recorded and monitored for quality assurance, training, compliance verification, and service improvement.
              </p>

              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 mt-4 sm:mt-6">
                Two-Party Consent States
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                If you are located in California, Connecticut, Delaware, Florida, Illinois, Maryland, Massachusetts, Michigan, Montana, Nevada, New Hampshire, Pennsylvania, Vermont, or Washington, all parties must consent to recording. You will be explicitly notified at the beginning of recorded calls and given the opportunity to decline.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                By continuing a call after being notified of recording, you consent to the recording. If you do not wish to be recorded, please inform our AI agent at the beginning of the call.
              </p>

              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 mt-4 sm:mt-6">
                Your Rights Regarding Recordings
              </h3>
              <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-600 dark:text-gray-400" style={{lineHeight: '1.8', paddingLeft: '0.5rem'}}>
                <li><strong>Right to Decline:</strong> You may decline to be recorded on any call</li>
                <li><strong>Right to Access:</strong> Request copies of your call recordings (processed within 30-45 days)</li>
                <li><strong>Right to Deletion:</strong> Request early deletion of your recordings (subject to legal retention requirements)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                8. Biometric Information Privacy (Illinois BIPA)
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                This section applies to residents of Illinois and other states with biometric privacy laws.
              </p>

              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 mt-4 sm:mt-6">
                What Are Voiceprints?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                A &quot;voiceprint&quot; is a biometric identifier created from your unique voice characteristics. Voiceprints may be used to verify identity, personalize voice interactions, and enhance AI accuracy.
              </p>

              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 mt-4 sm:mt-6">
                Illinois BIPA Compliance
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                For Illinois residents, we comply with the Biometric Information Privacy Act (BIPA):
              </p>
              <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-600 dark:text-gray-400" style={{lineHeight: '1.8', paddingLeft: '0.5rem'}}>
                <li><strong>Notice:</strong> Before collecting your voiceprint, we provide written notice explaining that biometric data is being collected, the purpose, and retention period</li>
                <li><strong>Consent:</strong> We obtain written consent through a separate consent form before collecting voiceprints</li>
                <li><strong>No Sale:</strong> We will NEVER sell, lease, or trade your voiceprint to third parties</li>
                <li><strong>Retention:</strong> Voiceprints are retained for 3 years from last use, then securely deleted</li>
                <li><strong>Deletion:</strong> Voiceprint deletion requests are processed immediately (24-48 hours)</li>
              </ul>

              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 mt-4 sm:mt-6">
                Your BIPA Rights
              </h3>
              <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-600 dark:text-gray-400" style={{lineHeight: '1.8', paddingLeft: '0.5rem'}}>
                <li>Right to informed consent before collection</li>
                <li>Right to know purpose and retention period</li>
                <li>Right to deletion of voiceprint data at any time</li>
                <li>Private right of action to sue for BIPA violations</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
                To exercise voiceprint rights: Email team@captureclient.net with subject &quot;BIPA Voiceprint Request&quot; or call (865) 346-3339.
              </p>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                9. Your Rights and Choices
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Depending on your location, you may have certain rights regarding your personal information.
              </p>

              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 mt-4 sm:mt-6">
                Universal Rights (All Users)
              </h3>
              <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-600 dark:text-gray-400" style={{lineHeight: '1.8', paddingLeft: '0.5rem'}}>
                <li><strong>Access:</strong> Request copies of your call recordings, transcripts, and personal data</li>
                <li><strong>Deletion:</strong> Request deletion of your voice data, voiceprints, and personal information</li>
                <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                <li><strong>Opt-Out:</strong> Opt out of AI voice calls, marketing, or call recording</li>
                <li><strong>Data Portability:</strong> Receive your data in a structured, commonly used format</li>
                <li><strong>Human Review:</strong> Request human review of any AI decision</li>
              </ul>

              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 mt-4 sm:mt-6">
                California Residents (CCPA/CPRA)
              </h3>
              <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-600 dark:text-gray-400" style={{lineHeight: '1.8', paddingLeft: '0.5rem'}}>
                <li><strong>Right to Know:</strong> What personal information we collect, sources, purposes, and third parties we share with</li>
                <li><strong>Right to Deletion:</strong> Request deletion of personal information (subject to exceptions)</li>
                <li><strong>Right to Correct:</strong> Request correction of inaccurate personal information</li>
                <li><strong>Right to Opt-Out of Sale/Sharing:</strong> We do NOT sell personal information or share for cross-context behavioral advertising</li>
                <li><strong>Right to Limit Use of Sensitive Information:</strong> Limit use of voice data for purposes beyond service delivery</li>
                <li><strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising privacy rights</li>
              </ul>

              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 mt-4 sm:mt-6">
                Colorado, Connecticut, Virginia, Utah Residents
              </h3>
              <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-600 dark:text-gray-400" style={{lineHeight: '1.8', paddingLeft: '0.5rem'}}>
                <li>Right to confirm whether we process your personal data and access it</li>
                <li>Right to delete personal data you provided</li>
                <li>Right to correct inaccuracies</li>
                <li>Right to obtain a copy in portable format</li>
                <li>Right to opt out of targeted advertising (we don&apos;t engage in this)</li>
                <li>Right to opt out of profiling for significant decisions</li>
              </ul>

              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 mt-4 sm:mt-6">
                SMS/Voice Opt-Out Rights
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                You may opt out of SMS and voice communications at any time:
              </p>
              <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-600 dark:text-gray-400" style={{lineHeight: '1.8', paddingLeft: '0.5rem'}}>
                <li><strong>Text:</strong> Reply STOP, QUIT, END, CANCEL, UNSUBSCRIBE, or OPT OUT to any message</li>
                <li><strong>Voice:</strong> Say &quot;stop,&quot; &quot;opt out,&quot; or &quot;do not call&quot; during an AI call</li>
                <li><strong>Phone:</strong> Call (865) 346-3339 to request removal</li>
                <li><strong>Email:</strong> Email team@captureclient.net with your opt-out request</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
                We will honor opt-out requests within 10 business days. You will receive one confirmation message after opting out.
              </p>

              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 mt-4 sm:mt-6">
                How to Exercise Your Rights
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Submit privacy requests via:
              </p>
              <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-600 dark:text-gray-400" style={{lineHeight: '1.8', paddingLeft: '0.5rem'}}>
                <li><strong>Email:</strong> team@captureclient.net (Subject: &quot;Privacy Request - [Type]&quot;)</li>
                <li><strong>Phone:</strong> (865) 346-3339 (Ask for Privacy Officer)</li>
                <li><strong>Mail:</strong> Capture Client, Attn: Privacy Officer, Knoxville, TN</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
                <strong>Response Timeline:</strong> Initial acknowledgment within 10 business days. Full response within 45 days (may extend to 90 days for complex requests). Illinois voiceprint deletion: Immediate (24-48 hours).
              </p>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                10. Cookies and Tracking
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed" style={{lineHeight: '1.8'}}>
                We use cookies and similar tracking technologies to collect information about your
                browsing activities. You can control cookies through your browser settings. However,
                disabling cookies may limit your ability to use certain features of our platform.
              </p>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                11. Third-Party Links
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed" style={{lineHeight: '1.8'}}>
                Our platform may contain links to third-party websites. We are not responsible for
                the privacy practices of these sites. We encourage you to review their privacy
                policies.
              </p>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                12. Children&apos;s Privacy
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed" style={{lineHeight: '1.8'}}>
                Our services are not intended for individuals under the age of 18. We do not
                knowingly collect personal information from children.
              </p>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                13. International Data Transfers
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed" style={{lineHeight: '1.8'}}>
                Your information may be transferred to and processed in countries other than your
                country of residence. We ensure appropriate safeguards are in place to protect your
                information in accordance with this Privacy Policy.
              </p>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                14. Changes to This Privacy Policy
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed" style={{lineHeight: '1.8'}}>
                We may update this Privacy Policy from time to time. We will notify you of any
                material changes by posting the new policy on this page and updating the "Last
                Updated" date. Your continued use of our services after changes constitutes
                acceptance of the updated policy.
              </p>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                15. Contact Us
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                If you have questions about this Privacy Policy or our privacy practices, please
                contact us:
              </p>
              <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <p className="text-gray-900 dark:text-white font-semibold mb-2">Capture Client</p>
                <p className="text-gray-600 dark:text-gray-400">Email: team@captureclient.net</p>
                <p className="text-gray-600 dark:text-gray-400">Phone: (865) 346-3339</p>
                <p className="text-gray-600 dark:text-gray-400">Address: Knoxville, TN</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
