import type { Metadata } from "next";
import LeadCaptureForm from "@/components/LeadCaptureForm";

export const metadata: Metadata = {
  title: "Contact Us | Get Your Free Consultation | Capture Client",
  description: "Contact Capture Client for Voice AI, Google Ads, and Facebook Ads services. Call (865) 346-3339 or fill out our form for a free consultation.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="relative py-24 px-8 lg:px-16 bg-gradient-to-br from-background-dark via-background-dark to-primary/10">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to automate your leads and capture more clients? Let's talk.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-8 lg:px-16 py-16">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Contact Information
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="material-icons text-primary text-3xl">phone</span>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">Phone</h3>
                  <a href="tel:865-346-3339" className="text-primary hover:underline text-lg">
                    (865) 346-3339
                  </a>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    Monday - Friday: 9am - 6pm EST
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="material-icons text-primary text-3xl">email</span>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">Email</h3>
                  <a href="mailto:team@captureclient.net" className="text-primary hover:underline text-lg">
                    team@captureclient.net
                  </a>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    We'll respond within 24 hours
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="material-icons text-primary text-3xl">location_on</span>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">Location</h3>
                  <p className="text-gray-700 dark:text-gray-300">Knoxville, TN</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    Serving businesses nationwide
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900/50">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                What to Expect:
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="material-icons text-primary">check_circle</span>
                  <span className="text-gray-700 dark:text-gray-300">Free 30-minute consultation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-icons text-primary">check_circle</span>
                  <span className="text-gray-700 dark:text-gray-300">Custom strategy for your business</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-icons text-primary">check_circle</span>
                  <span className="text-gray-700 dark:text-gray-300">No obligation or pressure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-icons text-primary">check_circle</span>
                  <span className="text-gray-700 dark:text-gray-300">Transparent pricing discussion</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-900/50 rounded-lg p-8 border border-gray-200 dark:border-gray-800 shadow-xl">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Send Us a Message
            </h2>
            <LeadCaptureForm source="contact-page" />
          </div>
        </div>

        {/* Quick Services */}
        <div className="mt-16 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Our Services
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900/50 text-center hover:border-primary/50 transition-all">
              <span className="material-icons text-primary text-5xl mb-4">smart_toy</span>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Voice AI</h3>
              <p className="text-gray-600 dark:text-gray-400">
                24/7 AI agents that answer calls and capture leads automatically
              </p>
            </div>

            <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900/50 text-center hover:border-primary/50 transition-all">
              <span className="material-icons text-primary text-5xl mb-4">search</span>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Google Ads</h3>
              <p className="text-gray-600 dark:text-gray-400">
                ROI-focused campaigns that capture high-intent customers
              </p>
            </div>

            <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900/50 text-center hover:border-primary/50 transition-all">
              <span className="material-icons text-primary text-5xl mb-4">groups</span>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Facebook Ads</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Targeted social advertising that generates qualified leads
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
