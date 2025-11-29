import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Capture Client",
  description: "Read Capture Client's terms of service to understand the rules and guidelines for using our platform and services.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Hero Section */}
      <section className="relative py-24 px-8 lg:px-16 bg-gradient-to-br from-background-dark via-background-dark to-primary/10">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Last Updated: January 2025
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="container mx-auto px-8 lg:px-16 py-20">
        <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
          <div className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl p-8 lg:p-12 space-y-8">

            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                By accessing or using Capture Client's platform, services, or website ("Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not use our Services.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">2. Description of Services</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Capture Client provides an all-in-one growth platform that includes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>AI-powered voice agents for call handling and lead qualification</li>
                <li>Google Ads and Facebook Ads campaign management</li>
                <li>Built-in CRM system for contact and pipeline management</li>
                <li>Real-time analytics and reporting dashboard</li>
                <li>Lead capture forms and automated workflows</li>
                <li>Additional features as described on our website</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">3. Account Registration and Eligibility</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                To use our Services, you must:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>Be at least 18 years old and capable of forming a binding contract</li>
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain and update your account information</li>
                <li>Keep your password secure and confidential</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
                You are responsible for all activities that occur under your account.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">4. Subscription Plans and Billing</h2>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">Payment Terms</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>All fees are due in advance on a monthly or annual basis as selected</li>
                <li>Fees are non-refundable except as required by law</li>
                <li>You authorize us to charge your payment method for all fees</li>
                <li>Prices are subject to change with 30 days notice</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">Ad Spend</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Advertising spend (Google Ads, Facebook Ads) is separate from subscription fees. You are responsible for ad spend costs, which are billed directly by the advertising platforms. We manage campaigns but do not control ad platform billing.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">5. Cancellation and Termination</h2>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">Your Right to Cancel</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                You may cancel your subscription at any time. For month-to-month plans, cancellation requires 30 days written notice. Annual plans are non-cancellable but will not auto-renew if you provide notice before renewal.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">Our Right to Terminate</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                We may suspend or terminate your access to Services if you:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>Violate these Terms</li>
                <li>Fail to pay fees when due</li>
                <li>Engage in fraudulent or illegal activities</li>
                <li>Use the Services in a way that harms us or other users</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">6. Acceptable Use Policy</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                You agree NOT to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
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
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">7. Intellectual Property</h2>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">Our Rights</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                All content, features, and functionality of the Services (including but not limited to software, text, graphics, logos, and design) are owned by Capture Client and protected by copyright, trademark, and other intellectual property laws.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">Your Data</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                You retain all rights to your customer data and content. You grant us a license to use, store, and process your data solely to provide the Services.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">8. Data and Privacy</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Your use of the Services is also governed by our Privacy Policy. By using the Services, you consent to our collection and use of information as described in the Privacy Policy.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">9. AI Voice Agents and Call Recording</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                By using our AI Voice Agents:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>You represent that you have the right to record calls in your jurisdiction</li>
                <li>You are responsible for compliance with call recording laws</li>
                <li>You must provide appropriate disclosures to callers</li>
                <li>We provide tools to assist with compliance but you are ultimately responsible</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">10. Advertising Services</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                For Google Ads and Facebook Ads management:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>We will manage campaigns to the best of our ability but cannot guarantee specific results</li>
                <li>You must comply with all advertising platform policies</li>
                <li>We reserve the right to refuse ads that violate platform policies or our standards</li>
                <li>Campaign performance depends on many factors outside our control</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">11. Disclaimers and Limitations of Liability</h2>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">Service Availability</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                THE SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. We do not guarantee uninterrupted, error-free, or secure access to the Services.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">Limitation of Liability</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, CAPTURE CLIENT SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE TWELVE MONTHS PRECEDING THE CLAIM.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">12. Indemnification</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                You agree to indemnify and hold Capture Client harmless from any claims, damages, losses, or expenses (including legal fees) arising from your use of the Services or violation of these Terms.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">13. Changes to Terms</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We may modify these Terms at any time. We will notify you of material changes by email or through the Services. Your continued use after changes constitutes acceptance of the modified Terms.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">14. Governing Law and Disputes</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                These Terms are governed by the laws of the State of Tennessee. Any disputes shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">15. Miscellaneous</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li><strong>Entire Agreement:</strong> These Terms constitute the entire agreement between you and Capture Client</li>
                <li><strong>Severability:</strong> If any provision is found unenforceable, the remaining provisions remain in effect</li>
                <li><strong>Waiver:</strong> Our failure to enforce any right does not waive that right</li>
                <li><strong>Assignment:</strong> You may not assign these Terms without our consent</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">16. Contact Information</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                If you have questions about these Terms, please contact us:
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
