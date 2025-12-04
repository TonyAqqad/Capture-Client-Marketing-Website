"use client";

import LeadCaptureForm from "@/components/LeadCaptureForm";
import Link from "next/link";
import ObfuscatedEmail from "@/components/ui/ObfuscatedEmail";

export default function ContactPageClient() {
  return (
    <div className="min-h-screen bg-background-dark relative overflow-hidden">
      {/* Animated Background Mesh */}
      <div className="absolute inset-0 bg-mesh-premium opacity-60" />
      <div className="absolute inset-0 noise-overlay" />

      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-accent/15 rounded-full blur-3xl animate-pulse delay-500" />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section with Form as Star */}
        <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-6 sm:px-8">
          <div className="container mx-auto max-w-7xl">
            {/* Eyebrow */}
            <div className="flex items-center justify-center gap-3 mb-6 animate-fade-in">
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-accent to-transparent" />
              <span className="text-accent text-sm font-semibold tracking-[0.2em] uppercase">
                Get Started
              </span>
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-accent to-transparent" />
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center mb-6 leading-[1.1] sm:leading-[0.95]">
              <span className="block text-white/40 font-light">Ready to</span>
              <span className="block text-gradient animate-gradient-shift">
                Grow Together?
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-white/60 text-center max-w-2xl mx-auto mb-12 sm:mb-16 leading-relaxed px-4">
              Get your free consultation and custom strategy. Zero pressure, just results.
            </p>

            {/* Two-Column Layout: Form + Info */}
            <div className="grid lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12 max-w-6xl mx-auto">
              {/* LEFT: Premium Form Card (Takes 3 columns) */}
              <div className="lg:col-span-3 order-2 lg:order-1">
                <div className="relative group">
                  {/* Animated glow border */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-2xl blur opacity-20 group-hover:opacity-40 transition-all duration-500 animate-gradient-shift" />

                  {/* Form card */}
                  <div className="relative glass p-6 sm:p-8 lg:p-10 rounded-2xl border border-white/10">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                        Send Us a Message
                      </h2>
                      {/* Social Proof Badge */}
                      <div className="flex sm:hidden items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-3 py-1.5">
                        <span className="text-lg">🔥</span>
                        <span className="text-xs text-white/80">
                          <span className="font-bold text-primary">100+</span> served
                        </span>
                      </div>
                      <div className="hidden sm:flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2">
                        <span className="text-2xl">🔥</span>
                        <span className="text-xs text-white/80">
                          <span className="font-bold text-primary">100+</span> businesses served
                        </span>
                      </div>
                    </div>

                    <LeadCaptureForm source="contact-page-premium" />

                    {/* Trust Signals Below Form */}
                    <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/10">
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 lg:gap-8 text-sm text-white/60">
                        <div className="flex items-center gap-2 min-h-[44px]">
                          <span className="material-icons text-accent text-lg">verified_user</span>
                          <span>100% Secure</span>
                        </div>
                        <div className="flex items-center gap-2 min-h-[44px]">
                          <span className="material-icons text-accent text-lg">flash_on</span>
                          <span>2-Hour Response</span>
                        </div>
                        <div className="flex items-center gap-2 min-h-[44px]">
                          <span className="material-icons text-accent text-lg">block</span>
                          <span>No Spam, Ever</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT: Contact Info Cards (Takes 2 columns) */}
              <div className="lg:col-span-2 order-1 lg:order-2 space-y-4 sm:space-y-6 flex flex-col items-stretch">
                {/* Phone Card - Most Prominent */}
                <div className="group relative overflow-hidden w-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <a href="tel:865-346-3339" className="relative glass rounded-xl p-5 sm:p-6 border border-white/10 hover:border-accent/30 transition-all duration-300 block min-h-[80px] active:scale-[0.98]">
                    <div className="flex items-start gap-3 sm:gap-4">
                      {/* Animated Phone Icon */}
                      <div className="relative flex-shrink-0">
                        <div className="absolute inset-0 bg-accent/20 rounded-full animate-ping" />
                        <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-accent/10 rounded-full flex items-center justify-center border border-accent/30">
                          <span className="material-icons text-accent text-2xl sm:text-3xl">phone</span>
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs sm:text-sm font-semibold text-white/60 uppercase tracking-wider mb-1 sm:mb-2">
                          Prefer to Call?
                        </h3>
                        <span className="text-xl sm:text-2xl lg:text-3xl font-black text-white group-hover:text-accent transition-colors duration-300 block mb-1 break-words">
                          (865) 346-3339
                        </span>
                        <p className="text-xs sm:text-sm text-white/50">
                          Mon-Fri: 9am - 6pm EST
                        </p>
                      </div>
                    </div>
                  </a>
                </div>

                {/* Email Card */}
                <div className="group relative overflow-hidden w-full">
                  <ObfuscatedEmail
                    email="team@captureclientai.net"
                    className="relative glass rounded-xl p-5 sm:p-6 border border-white/10 hover:border-primary/30 transition-all duration-300 block min-h-[80px] active:scale-[0.98] no-underline"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-full flex items-center justify-center border border-primary/30 flex-shrink-0">
                        <span className="material-icons text-primary text-2xl sm:text-3xl">email</span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs sm:text-sm font-semibold text-white/60 uppercase tracking-wider mb-1 sm:mb-2">
                          Email Us
                        </h3>
                        <span className="text-base sm:text-lg lg:text-xl font-bold text-white group-hover:text-primary transition-colors duration-300 block mb-1 break-words">
                          team@captureclientai.net
                        </span>
                        <p className="text-xs sm:text-sm text-white/50">
                          24-hour response time
                        </p>
                      </div>
                    </div>
                  </ObfuscatedEmail>
                </div>

                {/* Location Card */}
                <div className="group relative overflow-hidden w-full">
                  <div className="relative glass rounded-xl p-5 sm:p-6 border border-white/10 hover:border-accent/30 transition-all duration-300 min-h-[80px]">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="relative flex-shrink-0">
                        <div className="absolute inset-0 bg-accent/10 rounded-full animate-pulse" />
                        <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-accent/10 rounded-full flex items-center justify-center border border-accent/20">
                          <span className="material-icons text-accent text-2xl sm:text-3xl">location_on</span>
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs sm:text-sm font-semibold text-white/60 uppercase tracking-wider mb-1 sm:mb-2">
                          Based In
                        </h3>
                        <p className="text-base sm:text-lg lg:text-xl font-bold text-white mb-1">
                          Knoxville, TN
                        </p>
                        <p className="text-xs sm:text-sm text-white/50">
                          Serving businesses nationwide
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What to Expect - Visual Journey */}
        <section className="py-16 sm:py-20 px-6 sm:px-8 relative">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 sm:mb-4 px-4">
                What Happens Next?
              </h2>
              <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto px-4">
                A simple, transparent process designed around your success
              </p>
            </div>

            {/* Timeline Steps */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
              {/* Connecting Line (Desktop) */}
              <div className="hidden lg:block absolute top-24 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

              {/* Step 1 */}
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-br from-accent/0 to-accent/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
                <div className="relative text-center px-4">
                  {/* Number Badge */}
                  <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-accent/20 border-2 border-accent mb-4 sm:mb-6 relative z-10">
                    <span className="text-xl sm:text-2xl font-black text-accent">1</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">
                    You Reach Out
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Fill out the form or give us a call. Takes less than 2 minutes.
                  </p>
                  <div className="mt-3 sm:mt-4 text-xs font-semibold text-accent">
                    &lt; 2 minutes
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/0 to-primary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
                <div className="relative text-center px-4">
                  <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/20 border-2 border-primary mb-4 sm:mb-6 relative z-10">
                    <span className="text-xl sm:text-2xl font-black text-primary">2</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">
                    We Respond Fast
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Our team reviews your info and reaches out within 2 hours.
                  </p>
                  <div className="mt-3 sm:mt-4 text-xs font-semibold text-primary">
                    2-hour response
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-br from-accent/0 to-accent/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
                <div className="relative text-center px-4">
                  <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-accent/20 border-2 border-accent mb-4 sm:mb-6 relative z-10">
                    <span className="text-xl sm:text-2xl font-black text-accent">3</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">
                    Free Consultation
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    30-minute strategy session. No sales pitch, just solutions.
                  </p>
                  <div className="mt-3 sm:mt-4 text-xs font-semibold text-accent">
                    30 minutes
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/0 to-primary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
                <div className="relative text-center px-4">
                  <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/20 border-2 border-primary mb-4 sm:mb-6 relative z-10">
                    <span className="text-xl sm:text-2xl font-black text-primary">4</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">
                    Custom Proposal
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Tailored strategy and transparent pricing for your goals.
                  </p>
                  <div className="mt-3 sm:mt-4 text-xs font-semibold text-primary">
                    Same day
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Statement */}
            <div className="mt-12 sm:mt-16 text-center px-4">
              <div className="inline-flex items-center gap-3 glass px-5 sm:px-6 py-3 sm:py-4 rounded-full border border-white/10">
                <span className="material-icons text-accent text-xl sm:text-2xl">verified</span>
                <p className="text-sm sm:text-base text-white/80 font-medium">
                  <span className="text-accent font-bold">Zero</span> pressure. <span className="text-accent font-bold">100%</span> transparency.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Quick Links - Redesigned */}
        <section className="py-16 sm:py-20 px-6 sm:px-8 bg-background-dark/50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 sm:mb-4 px-4">
                Explore Our Services
              </h2>
              <p className="text-sm sm:text-base text-white/60 max-w-2xl mx-auto px-4">
                AI-powered solutions that capture leads and drive growth
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {/* Voice AI Card */}
              <Link href="/services/voice-ai" className="group relative block min-h-[44px] active:scale-[0.98] transition-transform">
                <div className="absolute -inset-1 bg-gradient-to-r from-accent to-primary rounded-2xl blur opacity-20 group-hover:opacity-40 transition-all duration-500" />
                <div className="relative glass rounded-2xl p-6 sm:p-8 border border-white/10 h-full hover:border-accent/30 transition-all duration-300">
                  {/* Popular Badge */}
                  <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-accent text-background-dark text-[10px] sm:text-xs font-black px-2 py-0.5 sm:px-3 sm:py-1 rounded-full rotate-12">
                    POPULAR
                  </div>

                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6 border border-accent/20 group-hover:scale-110 transition-transform duration-300">
                    <span className="material-icons text-accent text-2xl sm:text-3xl">smart_toy</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-accent transition-colors duration-300">
                    Voice AI Agents
                  </h3>
                  <p className="text-sm sm:text-base text-white/60 mb-4 sm:mb-6 leading-relaxed">
                    Never miss a call. AI answers 24/7, qualifies leads, and books appointments automatically.
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-white/40">Starting at $997/mo</span>
                    <span className="material-icons text-accent group-hover:translate-x-1 transition-transform duration-300 text-xl sm:text-2xl">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </Link>

              {/* Google Ads Card */}
              <Link href="/services/google-ads" className="group relative block min-h-[44px] active:scale-[0.98] transition-transform">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-20 group-hover:opacity-40 transition-all duration-500" />
                <div className="relative glass rounded-2xl p-6 sm:p-8 border border-white/10 h-full hover:border-primary/30 transition-all duration-300">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6 border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                    <span className="material-icons text-primary text-2xl sm:text-3xl">search</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-primary transition-colors duration-300">
                    Google Ads
                  </h3>
                  <p className="text-sm sm:text-base text-white/60 mb-4 sm:mb-6 leading-relaxed">
                    ROI-focused PPC campaigns that capture high-intent customers when they're ready to buy.
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-white/40">Custom pricing</span>
                    <span className="material-icons text-primary group-hover:translate-x-1 transition-transform duration-300 text-xl sm:text-2xl">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </Link>

              {/* Facebook Ads Card */}
              <Link href="/services/facebook-ads" className="group relative block sm:col-span-2 lg:col-span-1 min-h-[44px] active:scale-[0.98] transition-transform">
                <div className="absolute -inset-1 bg-gradient-to-r from-accent to-primary rounded-2xl blur opacity-20 group-hover:opacity-40 transition-all duration-500" />
                <div className="relative glass rounded-2xl p-6 sm:p-8 border border-white/10 h-full hover:border-accent/30 transition-all duration-300">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6 border border-accent/20 group-hover:scale-110 transition-transform duration-300">
                    <span className="material-icons text-accent text-2xl sm:text-3xl">groups</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-accent transition-colors duration-300">
                    Facebook Ads
                  </h3>
                  <p className="text-sm sm:text-base text-white/60 mb-4 sm:mb-6 leading-relaxed">
                    Targeted social advertising that generates qualified leads and builds your brand awareness.
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-white/40">Custom pricing</span>
                    <span className="material-icons text-accent group-hover:translate-x-1 transition-transform duration-300 text-xl sm:text-2xl">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* View All Services Link */}
            <div className="text-center mt-10 sm:mt-12">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-accent hover:text-white font-semibold group transition-colors duration-300 min-h-[44px] text-sm sm:text-base px-4 py-2 sm:px-0"
              >
                <span>View All Services</span>
                <span className="material-icons group-hover:translate-x-1 transition-transform duration-300 text-xl sm:text-2xl">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 sm:py-20 px-6 sm:px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10" />

          <div className="container mx-auto max-w-4xl relative z-10">
            <div className="glass rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 text-center border border-white/10">
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-5 sm:mb-6">
                <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-accent"></span>
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white/90">We&apos;re Available Now</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6 leading-tight px-4">
                Still Have Questions?
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-white/60 mb-8 sm:mb-10 max-w-2xl mx-auto px-4">
                We&apos;re here to help. Call, email, or visit our FAQ page to learn more about how we can help your business grow.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <a
                  href="tel:865-346-3339"
                  className="btn-primary inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg group w-full sm:w-auto justify-center min-h-[48px] active:scale-[0.98] transition-transform"
                >
                  <span className="material-icons text-xl sm:text-2xl">phone</span>
                  <span>Call Now</span>
                </a>

                <Link
                  href="/faq"
                  className="btn-ghost inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg group w-full sm:w-auto justify-center min-h-[48px] active:scale-[0.98] transition-transform"
                >
                  <span>View FAQ</span>
                  <span className="material-icons group-hover:translate-x-1 transition-transform duration-300 text-xl sm:text-2xl">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
