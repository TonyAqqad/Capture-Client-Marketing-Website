import type { Metadata } from "next";
import { SITE_CONFIG, generateWebPageSchema } from "@/lib/seo-config";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Terms of Service | Capture Client",
  description:
    "Read Capture Client's terms of service to understand the rules and guidelines for using our platform and services.",
  alternates: {
    canonical: "https://captureclient.com/terms-of-service",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Terms of Service | Capture Client",
    description: "Read Capture Client's terms of service to understand the rules and guidelines for using our platform and services.",
    url: "https://captureclient.com/terms-of-service",
    siteName: "Capture Client",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | Capture Client",
    description: "Read Capture Client's terms of service to understand the rules and guidelines for using our platform and services.",
  },
};

export default function TermsOfServicePage() {
  // Generate WebPage schema for terms of service
  const pageSchema = generateWebPageSchema({
    title: 'Terms of Service - Capture Client',
    description: "Read Capture Client's terms of service to understand the rules and guidelines for using our platform and services.",
    url: `${SITE_CONFIG.url}/terms-of-service`,
  });

  return (
    <>
      <JsonLd schema={pageSchema} />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-16 bg-gradient-to-br from-white via-slate-50 to-blue-50">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">Terms of Service</h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto px-4">Last Updated: January 2025</p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-16 py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto prose prose-base sm:prose-lg">
          <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 md:p-8 lg:p-12 space-y-6 sm:space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed" style={{lineHeight: '1.8'}}>
                By accessing or using Capture Client's platform, services, or website ("Services"),
                you agree to be bound by these Terms of Service ("Terms"). If you do not agree to
                these Terms, you may not use our Services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">
                2. Description of Services
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Capture Client provides an all-in-one growth platform that includes:
              </p>
              <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-sm sm:text-base text-slate-600" style={{lineHeight: '1.8', paddingLeft: '0.5rem'}}>
                <li>AI-powered voice agents for call handling and lead qualification</li>
                <li>Google Ads and Facebook Ads campaign management</li>
                <li>Built-in CRM system for contact and pipeline management</li>
                <li>Real-time analytics and reporting dashboard</li>
                <li>Lead capture forms and automated workflows</li>
                <li>Additional features as described on our website</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">
                3. Account Registration and Eligibility
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                To use our Services, you must:
              </p>
              <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-sm sm:text-base text-slate-600" style={{lineHeight: '1.8', paddingLeft: '0.5rem'}}>
                <li>Be at least 18 years old and capable of forming a binding contract</li>
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain and update your account information</li>
                <li>Keep your password secure and confidential</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>
              <p className="text-slate-600 leading-relaxed mt-4">
                You are responsible for all activities that occur under your account.
              </p>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">
                4. Subscription Plans and Billing
              </h2>

              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2 sm:mb-3 mt-4 sm:mt-6">
                Payment Terms
              </h3>
              <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-sm sm:text-base text-slate-600" style={{lineHeight: '1.8', paddingLeft: '0.5rem'}}>
                <li>All fees are due in advance on a monthly or annual basis as selected</li>
                <li>Fees are non-refundable except as required by law</li>
                <li>You authorize us to charge your payment method for all fees</li>
                <li>Prices are subject to change with 30 days notice</li>
              </ul>

              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2 sm:mb-3 mt-4 sm:mt-6">
                Ad Spend
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed" style={{lineHeight: '1.8'}}>
                Advertising spend (Google Ads, Facebook Ads) is separate from subscription fees. You
                are responsible for ad spend costs, which are billed directly by the advertising
                platforms. We manage campaigns but do not control ad platform billing.
              </p>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">
                5. Cancellation and Termination
              </h2>

              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2 sm:mb-3 mt-4 sm:mt-6">
                Your Right to Cancel
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                You may cancel your subscription at any time. For month-to-month plans, cancellation
                requires 30 days written notice. Annual plans are non-cancellable but will not
                auto-renew if you provide notice before renewal.
              </p>

              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2 sm:mb-3 mt-4 sm:mt-6">
                Our Right to Terminate
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                We may suspend or terminate your access to Services if you:
              </p>
              <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-sm sm:text-base text-slate-600" style={{lineHeight: '1.8', paddingLeft: '0.5rem'}}>
                <li>Violate these Terms</li>
                <li>Fail to pay fees when due</li>
                <li>Engage in fraudulent or illegal activities</li>
                <li>Use the Services in a way that harms us or other users</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">
                6. Acceptable Use Policy
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                You agree NOT to:
              </p>
              <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-sm sm:text-base text-slate-600" style={{lineHeight: '1.8', paddingLeft: '0.5rem'}}>
                <li>Use the Services for any illegal purpose or in violation of any laws</li>
                <li>Upload or transmit viruses, malware, or harmful code</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the Services or servers</li>
                <li>Use automated systems (bots, scrapers) without permission</li>
                <li>Impersonate others or provide false information</li>
                <li>Violate any third-party rights (copyright, trademark, privacy)</li>
                <li>Send unsolicited communications (spam)</li>
                <li>Resell or redistribute the Services without authorization</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">
                7. Intellectual Property
              </h2>

              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2 sm:mb-3 mt-4 sm:mt-6">
                Our Rights
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed" style={{lineHeight: '1.8'}}>
                All content, features, and functionality of the Services (including but not limited
                to software, text, graphics, logos, and design) are owned by Capture Client and
                protected by copyright, trademark, and other intellectual property laws.
              </p>

              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2 sm:mb-3 mt-4 sm:mt-6">
                Your Data
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed" style={{lineHeight: '1.8'}}>
                You retain all rights to your customer data and content. You grant us a license to
                use, store, and process your data solely to provide the Services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">
                8. Data and Privacy
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed" style={{lineHeight: '1.8'}}>
                Your use of the Services is also governed by our Privacy Policy. By using the
                Services, you consent to our collection and use of information as described in the
                Privacy Policy.
              </p>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">
                9. AI-Generated Voice Technology
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Our service uses artificial intelligence (AI) technology to generate voice communications. When you interact with our Voice AI agents:
              </p>
              <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-sm sm:text-base text-slate-600" style={{lineHeight: '1.8', paddingLeft: '0.5rem'}}>
                <li>Calls may be made using AI-generated voices and automated systems</li>
                <li>AI voices may sound human but are computer-generated</li>
                <li>Interactions may be recorded and analyzed to improve our service</li>
                <li>AI systems operate according to programmed rules and may have limitations</li>
                <li>You may request to speak with a human representative at any time by saying &quot;I want to speak to a person&quot;</li>
              </ul>
              <p className="text-slate-600 leading-relaxed mt-4">
                By using our service, you acknowledge that you are aware you may be interacting with AI-generated voice technology.
              </p>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">
                10. Telephone Consumer Protection Act (TCPA) Compliance
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                By providing your phone number and using our services, you provide your prior express written consent to receive:
              </p>
              <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-sm sm:text-base text-slate-600" style={{lineHeight: '1.8', paddingLeft: '0.5rem'}}>
                <li>Informational and service-related calls, texts, and voice messages</li>
                <li>Marketing and promotional communications (if you opted in)</li>
                <li>Automated calls made using an automatic telephone dialing system (ATDS), artificial intelligence, or prerecorded/artificial voices</li>
              </ul>

              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2 sm:mb-3 mt-4 sm:mt-6">
                Your Rights
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                <strong>Consent is Optional:</strong> Consent is not required as a condition of purchase or use of our services.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                <strong>How to Opt Out:</strong> You may revoke consent at any time by:
              </p>
              <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-sm sm:text-base text-slate-600" style={{lineHeight: '1.8', paddingLeft: '0.5rem'}}>
                <li>Replying &quot;STOP&quot;, &quot;QUIT&quot;, &quot;END&quot;, &quot;CANCEL&quot;, &quot;UNSUBSCRIBE&quot;, or &quot;OPT OUT&quot; to any text message</li>
                <li>Saying &quot;stop&quot;, &quot;opt out&quot;, or &quot;do not call&quot; during an AI voice call</li>
                <li>Calling (865) 346-6111 and requesting to be added to our Do Not Call list</li>
                <li>Emailing team@captureclient.com with &quot;OPT OUT&quot; in the subject line</li>
              </ul>
              <p className="text-slate-600 leading-relaxed mt-4">
                <strong>Processing Time:</strong> We will honor opt-out requests within 10 business days as required by FCC rules effective April 11, 2025.
              </p>
              <p className="text-slate-600 leading-relaxed mt-4">
                <strong>Do Not Call Registry:</strong> We comply with the National Do Not Call Registry. If your number is registered, you should not receive marketing calls from us unless you have provided express consent or we have an established business relationship with you.
              </p>
              <p className="text-slate-600 leading-relaxed mt-4">
                <strong>Calling Hours:</strong> We only make calls between 8:00 AM and 9:00 PM in your local time zone, as required by the TCPA.
              </p>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">
                11. Call Recording and Monitoring
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Calls with our AI voice agents and customer service representatives may be recorded and monitored for:
              </p>
              <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-sm sm:text-base text-slate-600" style={{lineHeight: '1.8', paddingLeft: '0.5rem'}}>
                <li>Quality assurance and training purposes</li>
                <li>Compliance verification and auditing</li>
                <li>Dispute resolution and customer support</li>
                <li>AI and service improvement</li>
              </ul>

              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2 sm:mb-3 mt-4 sm:mt-6">
                Two-Party Consent States
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you are located in California, Connecticut, Delaware, Florida, Illinois, Maryland, Massachusetts, Michigan, Montana, Nevada, New Hampshire, Pennsylvania, Vermont, or Washington, all parties must consent to recording. You will be explicitly notified at the beginning of any recorded call and given the opportunity to decline recording.
              </p>
              <p className="text-slate-600 leading-relaxed">
                By continuing a call after being notified of recording, you consent to the recording of that call. If you do not wish to be recorded, please inform our AI agent or representative at the beginning of the call.
              </p>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">
                12. SMS and Text Message Communications
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                By providing your mobile phone number and opting in, you agree to receive text messages from Capture Client including:
              </p>
              <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-sm sm:text-base text-slate-600" style={{lineHeight: '1.8', paddingLeft: '0.5rem'}}>
                <li>Service updates and appointment reminders</li>
                <li>Account notifications and alerts</li>
                <li>Marketing messages (only if you opted in separately)</li>
                <li>Verification codes and authentication messages</li>
              </ul>

              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2 sm:mb-3 mt-4 sm:mt-6">
                A2P 10DLC Compliance
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Our text messaging services comply with A2P (Application-to-Person) 10DLC requirements. Our campaigns are registered with The Campaign Registry (TCR) and major carriers.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                <strong>Message Frequency:</strong> Varies based on your activity and preferences.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                <strong>Message and Data Rates:</strong> Standard message and data rates may apply based on your mobile carrier plan.
              </p>
              <p className="text-slate-600 leading-relaxed">
                <strong>Data Sharing:</strong> We will NOT share your mobile phone number or SMS opt-in consent with any third parties for marketing purposes.
              </p>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">
                13. State-Specific Compliance
              </h2>

              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2 sm:mb-3 mt-4 sm:mt-6">
                California Residents
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Our AI voice agents will identify themselves as automated at the beginning of calls. California requires all-party consent for call recording. You will be explicitly notified and asked for consent before any recording begins.
              </p>

              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2 sm:mb-3 mt-4 sm:mt-6">
                Colorado Residents
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Effective February 1, 2026, high-risk AI systems will be disclosed on our website. You will be notified before AI makes any consequential decisions affecting you, and you have the right to human review of AI decisions.
              </p>

              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2 sm:mb-3 mt-4 sm:mt-6">
                Illinois Residents (BIPA)
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                If we collect voiceprint biometric data from Illinois residents, we will obtain separate written consent before collection. You have the right to informed consent, to know purpose and retention period, to deletion of voiceprint data, and private right of action under the Illinois Biometric Information Privacy Act (BIPA).
              </p>

              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2 sm:mb-3 mt-4 sm:mt-6">
                Florida Residents
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Florida law restricts calls to 8:00 AM - 8:00 PM (stricter than federal 8 AM - 9 PM requirement).
              </p>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">
                14. AI Limitations and Disclaimers
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                While our AI voice technology is advanced, it has limitations:
              </p>
              <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-sm sm:text-base text-slate-600" style={{lineHeight: '1.8', paddingLeft: '0.5rem'}}>
                <li>AI may misunderstand or misinterpret spoken requests</li>
                <li>AI responses are based on training data and programmed rules</li>
                <li>AI cannot replace human judgment in complex situations</li>
                <li>AI may not understand all accents, dialects, or speech patterns</li>
              </ul>

              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2 sm:mb-3 mt-4 sm:mt-6">
                Human Escalation
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                You may request to speak with a human representative at any time during an AI call by saying: &quot;Speak to a human,&quot; &quot;Transfer to representative,&quot; or &quot;I need to talk to a person.&quot;
              </p>

              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2 sm:mb-3 mt-4 sm:mt-6">
                No Professional Advice
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                AI agents do NOT provide medical, legal, financial, tax, or other professional advice requiring licensed expertise. Information provided is for general informational purposes only.
              </p>

              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2 sm:mb-3 mt-4 sm:mt-6">
                No Emergency Services
              </h3>
              <p className="text-slate-600 leading-relaxed">
                <strong>DO NOT use AI voice agents for emergencies.</strong> For emergencies, call 911 or contact appropriate emergency services. AI agents cannot dispatch emergency services or provide emergency assistance.
              </p>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">
                15. Advertising Services
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                For Google Ads and Facebook Ads management:
              </p>
              <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-sm sm:text-base text-slate-600" style={{lineHeight: '1.8', paddingLeft: '0.5rem'}}>
                <li>
                  We will manage campaigns to the best of our ability but cannot guarantee specific
                  results
                </li>
                <li>You must comply with all advertising platform policies</li>
                <li>
                  We reserve the right to refuse ads that violate platform policies or our standards
                </li>
                <li>Campaign performance depends on many factors outside our control</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">
                16. Disclaimers and Limitations of Liability
              </h2>

              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2 sm:mb-3 mt-4 sm:mt-6">
                Service Availability
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed" style={{lineHeight: '1.8'}}>
                THE SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. We do not
                guarantee uninterrupted, error-free, or secure access to the Services.
              </p>

              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2 sm:mb-3 mt-4 sm:mt-6">
                Limitation of Liability
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed" style={{lineHeight: '1.8'}}>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, CAPTURE CLIENT SHALL NOT BE LIABLE FOR ANY
                INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF
                PROFITS OR REVENUES. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID US IN
                THE TWELVE MONTHS PRECEDING THE CLAIM.
              </p>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">
                17. Indemnification
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed" style={{lineHeight: '1.8'}}>
                You agree to indemnify and hold Capture Client harmless from any claims, damages,
                losses, or expenses (including legal fees) arising from your use of the Services or
                violation of these Terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">
                18. Changes to Terms
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed" style={{lineHeight: '1.8'}}>
                We may modify these Terms at any time. We will notify you of material changes by
                email or through the Services. Your continued use after changes constitutes
                acceptance of the modified Terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">
                19. Governing Law and Disputes
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed" style={{lineHeight: '1.8'}}>
                These Terms are governed by the laws of the State of Tennessee. Any disputes shall
                be resolved through binding arbitration in accordance with the rules of the American
                Arbitration Association.
              </p>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">
                20. Miscellaneous
              </h2>
              <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-sm sm:text-base text-slate-600" style={{lineHeight: '1.8', paddingLeft: '0.5rem'}}>
                <li>
                  <strong>Entire Agreement:</strong> These Terms constitute the entire agreement
                  between you and Capture Client
                </li>
                <li>
                  <strong>Severability:</strong> If any provision is found unenforceable, the
                  remaining provisions remain in effect
                </li>
                <li>
                  <strong>Waiver:</strong> Our failure to enforce any right does not waive that
                  right
                </li>
                <li>
                  <strong>Assignment:</strong> You may not assign these Terms without our consent
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">
                21. Contact Information
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you have questions about these Terms, please contact us:
              </p>
              <div className="bg-gray-50 border border-slate-200 rounded-lg p-6">
                <p className="text-slate-900 font-semibold mb-2">Capture Client</p>
                <p className="text-slate-600">Email: team@captureclient.com</p>
                <p className="text-slate-600">Phone: (865) 346-6111</p>
                <p className="text-slate-600">Address: Knoxville, TN</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
