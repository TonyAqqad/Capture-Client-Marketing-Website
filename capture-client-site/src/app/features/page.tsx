import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Platform Features | All-in-One Growth Hub | Capture Client",
  description: "Explore Capture Client's powerful features: AI Voice Agents, CRM, automated lead generation, real-time analytics, and unified inbox—all in one platform.",
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Hero Section */}
      <section className="relative py-24 px-8 lg:px-16 bg-gradient-to-br from-background-dark via-background-dark to-primary/10">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Platform Features
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to automate leads, capture clients, and grow your business—all in one powerful platform.
          </p>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="container mx-auto px-8 lg:px-16 py-20">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold uppercase tracking-widest text-accent mb-4">
            Core Platform Features
          </h2>
          <p className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Built for Growth, Designed for Simplicity
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1: AI Voice Agents */}
          <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-8 bg-white dark:bg-gray-900/50 hover:border-primary/50 hover:shadow-xl transition-all">
            <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
              <span className="material-icons text-primary text-3xl">support_agent</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              AI Voice Agents
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Never miss a call with AI-powered voice agents that handle unlimited calls 24/7, qualify leads, book appointments, and answer questions.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <span className="material-icons text-accent text-sm">check_circle</span>
                <span className="text-sm">Natural conversation AI</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <span className="material-icons text-accent text-sm">check_circle</span>
                <span className="text-sm">Automatic call transcription</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <span className="material-icons text-accent text-sm">check_circle</span>
                <span className="text-sm">Multi-language support</span>
              </li>
            </ul>
          </div>

          {/* Feature 2: Built-in CRM */}
          <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-8 bg-white dark:bg-gray-900/50 hover:border-primary/50 hover:shadow-xl transition-all">
            <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-6">
              <span className="material-icons text-accent text-3xl">contacts</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Built-in CRM
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Manage all your client interactions, track conversations, and organize your sales pipeline in one unified system.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <span className="material-icons text-accent text-sm">check_circle</span>
                <span className="text-sm">Contact management</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <span className="material-icons text-accent text-sm">check_circle</span>
                <span className="text-sm">Pipeline tracking</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <span className="material-icons text-accent text-sm">check_circle</span>
                <span className="text-sm">Activity timeline</span>
              </li>
            </ul>
          </div>

          {/* Feature 3: Unified Inbox */}
          <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-8 bg-white dark:bg-gray-900/50 hover:border-primary/50 hover:shadow-xl transition-all">
            <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
              <span className="material-icons text-primary text-3xl">all_inbox</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Unified Inbox
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              All communications in one place—calls, texts, emails, and form submissions organized and easily accessible.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <span className="material-icons text-accent text-sm">check_circle</span>
                <span className="text-sm">Multi-channel messaging</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <span className="material-icons text-accent text-sm">check_circle</span>
                <span className="text-sm">Team collaboration</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <span className="material-icons text-accent text-sm">check_circle</span>
                <span className="text-sm">Smart filters</span>
              </li>
            </ul>
          </div>

          {/* Feature 4: Google Ads Integration */}
          <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-8 bg-white dark:bg-gray-900/50 hover:border-primary/50 hover:shadow-xl transition-all">
            <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-6">
              <span className="material-icons text-accent text-3xl">ads_click</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Google Ads Management
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Professional Google Ads campaign management with conversion tracking, budget optimization, and detailed reporting.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <span className="material-icons text-accent text-sm">check_circle</span>
                <span className="text-sm">Search & Display campaigns</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <span className="material-icons text-accent text-sm">check_circle</span>
                <span className="text-sm">Keyword optimization</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <span className="material-icons text-accent text-sm">check_circle</span>
                <span className="text-sm">A/B testing</span>
              </li>
            </ul>
          </div>

          {/* Feature 5: Facebook Ads Integration */}
          <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-8 bg-white dark:bg-gray-900/50 hover:border-primary/50 hover:shadow-xl transition-all">
            <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
              <span className="material-icons text-primary text-3xl">thumb_up</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Facebook Ads Management
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Targeted Facebook and Instagram ad campaigns designed to generate qualified leads and maximize ROI.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <span className="material-icons text-accent text-sm">check_circle</span>
                <span className="text-sm">Audience targeting</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <span className="material-icons text-accent text-sm">check_circle</span>
                <span className="text-sm">Creative optimization</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <span className="material-icons text-accent text-sm">check_circle</span>
                <span className="text-sm">Retargeting campaigns</span>
              </li>
            </ul>
          </div>

          {/* Feature 6: Analytics Dashboard */}
          <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-8 bg-white dark:bg-gray-900/50 hover:border-primary/50 hover:shadow-xl transition-all">
            <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-6">
              <span className="material-icons text-accent text-3xl">insights</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Real-Time Analytics
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Track every metric that matters with beautiful, real-time dashboards showing campaign performance, ROI, and growth trends.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <span className="material-icons text-accent text-sm">check_circle</span>
                <span className="text-sm">Live performance tracking</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <span className="material-icons text-accent text-sm">check_circle</span>
                <span className="text-sm">Custom reports</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <span className="material-icons text-accent text-sm">check_circle</span>
                <span className="text-sm">ROI calculation</span>
              </li>
            </ul>
          </div>

          {/* Feature 7: Appointment Scheduling */}
          <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-8 bg-white dark:bg-gray-900/50 hover:border-primary/50 hover:shadow-xl transition-all">
            <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
              <span className="material-icons text-primary text-3xl">event</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Smart Scheduling
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Automated appointment booking with calendar integration, reminders, and confirmation workflows.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <span className="material-icons text-accent text-sm">check_circle</span>
                <span className="text-sm">Calendar sync</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <span className="material-icons text-accent text-sm">check_circle</span>
                <span className="text-sm">SMS reminders</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <span className="material-icons text-accent text-sm">check_circle</span>
                <span className="text-sm">No-show prevention</span>
              </li>
            </ul>
          </div>

          {/* Feature 8: Lead Capture Forms */}
          <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-8 bg-white dark:bg-gray-900/50 hover:border-primary/50 hover:shadow-xl transition-all">
            <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-6">
              <span className="material-icons text-accent text-3xl">web</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Smart Lead Forms
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Customizable lead capture forms that integrate seamlessly with your CRM and trigger automated follow-ups.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <span className="material-icons text-accent text-sm">check_circle</span>
                <span className="text-sm">Drag-and-drop builder</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <span className="material-icons text-accent text-sm">check_circle</span>
                <span className="text-sm">Conditional logic</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <span className="material-icons text-accent text-sm">check_circle</span>
                <span className="text-sm">Spam protection</span>
              </li>
            </ul>
          </div>

          {/* Feature 9: Automation Workflows */}
          <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-8 bg-white dark:bg-gray-900/50 hover:border-primary/50 hover:shadow-xl transition-all">
            <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
              <span className="material-icons text-primary text-3xl">automation</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Marketing Automation
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Set up automated workflows for lead nurturing, follow-ups, and customer onboarding—save time and never miss a beat.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <span className="material-icons text-accent text-sm">check_circle</span>
                <span className="text-sm">Trigger-based actions</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <span className="material-icons text-accent text-sm">check_circle</span>
                <span className="text-sm">Email sequences</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <span className="material-icons text-accent text-sm">check_circle</span>
                <span className="text-sm">SMS campaigns</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 px-8 lg:px-16 bg-gray-50 dark:bg-black/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Seamless Integrations
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Connect Capture Client with the tools you already use
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg p-6 text-center">
              <span className="material-icons text-4xl text-accent mb-2">calendar_today</span>
              <p className="text-gray-900 dark:text-white font-semibold">Google Calendar</p>
            </div>
            <div className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg p-6 text-center">
              <span className="material-icons text-4xl text-accent mb-2">mail</span>
              <p className="text-gray-900 dark:text-white font-semibold">Email Platforms</p>
            </div>
            <div className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg p-6 text-center">
              <span className="material-icons text-4xl text-accent mb-2">webhook</span>
              <p className="text-gray-900 dark:text-white font-semibold">Zapier</p>
            </div>
            <div className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg p-6 text-center">
              <span className="material-icons text-4xl text-accent mb-2">more_horiz</span>
              <p className="text-gray-900 dark:text-white font-semibold">And More</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8 lg:px-16">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Experience All These Features?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Book a free demo and see how Capture Client can transform your business
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-primary text-black px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105 glowing-button"
            >
              Book a Demo
            </Link>
            <a
              href="tel:865-346-3339"
              className="bg-white/10 border border-white/20 text-gray-900 dark:text-white px-8 py-4 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
            >
              Call Us: (865) 346-3339
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
