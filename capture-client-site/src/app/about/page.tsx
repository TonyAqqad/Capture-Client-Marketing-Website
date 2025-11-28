import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Capture Client | Voice AI & Marketing Automation",
  description: "Learn about Capture Client, the marketing automation platform helping small businesses capture more leads with AI voice agents and paid advertising.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="relative py-24 px-8 lg:px-16 bg-gradient-to-br from-background-dark via-background-dark to-primary/10">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            About Capture Client
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Automating leads and capturing clients for small businesses nationwide.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-8 lg:px-16 py-16">
        <div className="max-w-4xl mx-auto">
          <section className="mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              At Capture Client, we believe small businesses shouldn't have to choose between answering phones and serving customers. We're on a mission to automate lead capture and qualification so business owners can focus on what they do best.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Our AI-powered voice agents work 24/7 to answer every call, qualify leads instantly, and book appointments automatically. Combined with strategic paid advertising on Google and Facebook, we help service-based businesses capture more clients without hiring additional staff.
            </p>
          </section>

          <section className="mb-16 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">500+</div>
              <p className="text-gray-600 dark:text-gray-400">Businesses Served</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">24/7</div>
              <p className="text-gray-600 dark:text-gray-400">AI Availability</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">3x</div>
              <p className="text-gray-600 dark:text-gray-400">More Leads Captured</p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              What We Do
            </h2>
            <div className="space-y-6">
              <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900/50">
                <h3 className="text-2xl font-bold text-primary mb-2">Voice AI Agents</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Our AI voice agents answer every call, qualify leads based on your criteria, book appointments directly into your calendar, and transfer hot leads to your team in real-time.
                </p>
              </div>

              <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900/50">
                <h3 className="text-2xl font-bold text-primary mb-2">Google Ads Management</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We create and manage ROI-focused Google Ads campaigns that put your business at the top of search results when customers are actively looking for your services.
                </p>
              </div>

              <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900/50">
                <h3 className="text-2xl font-bold text-primary mb-2">Facebook Ads Lead Generation</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Targeted Facebook and Instagram advertising campaigns designed to generate qualified leads for local service businesses.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose Us
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <span className="material-icons text-primary text-3xl">check_circle</span>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">No Long-Term Contracts</h3>
                  <p className="text-gray-600 dark:text-gray-400">Month-to-month billing. Cancel anytime.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="material-icons text-primary text-3xl">check_circle</span>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">Transparent Pricing</h3>
                  <p className="text-gray-600 dark:text-gray-400">No hidden fees. What you see is what you pay.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="material-icons text-primary text-3xl">check_circle</span>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">Results-Focused</h3>
                  <p className="text-gray-600 dark:text-gray-400">We only succeed when you capture more clients.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="material-icons text-primary text-3xl">check_circle</span>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">Expert Support</h3>
                  <p className="text-gray-600 dark:text-gray-400">Real humans available to help you succeed.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="text-center bg-white dark:bg-gray-900/50 rounded-lg p-12 border border-gray-200 dark:border-gray-800">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Automate Your Leads?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              Let's discuss how Capture Client can help your business grow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:865-346-3339"
                className="inline-block bg-primary text-black px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105 glowing-button"
              >
                Call Us: (865) 346-3339
              </a>
              <Link
                href="/contact"
                className="inline-block bg-white/10 border border-white/20 text-white px-8 py-4 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
