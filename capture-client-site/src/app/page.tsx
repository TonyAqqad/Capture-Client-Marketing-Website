import Link from "next/link";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import LeadRescueSimulator from "@/components/LeadRescueSimulator";
import AIVoiceVisual from "@/components/AIVoiceVisual";
import GrowthDashboard from "@/components/GrowthDashboard";
import PricingCards from "@/components/PricingCards";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import AnimatedStats from "@/components/AnimatedStats";
import OptimizedLeadForm from "@/components/forms/OptimizedLeadForm";
import SocialProofBanner from "@/components/cro/SocialProofBanner";
import TrustSignals from "@/components/cro/TrustSignals";
import RiskReversal from "@/components/cro/RiskReversal";
import MobileCTABar from "@/components/cro/MobileCTABar";
import ObjectionHandler from "@/components/cro/ObjectionHandler";
import CapacityIndicator from "@/components/cro/CapacityIndicator";

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full">
      {/* ==================== SECTION 1: HERO ==================== */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background-dark">
        {/* Animated mesh gradient background */}
        <div className="absolute inset-0 bg-mesh">
          {/* Orbital ring animation */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] orbital-ring opacity-30"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] orbital-ring opacity-20" style={{ animationDelay: "-10s" }}></div>

          {/* Floating particles */}
          <div className="particles">
            <div className="particle" style={{ left: "20%", top: "30%", animationDelay: "0s" }}></div>
            <div className="particle" style={{ left: "80%", top: "60%", animationDelay: "2s" }}></div>
            <div className="particle" style={{ left: "50%", top: "80%", animationDelay: "4s" }}></div>
            <div className="particle" style={{ left: "10%", top: "70%", animationDelay: "6s" }}></div>
            <div className="particle" style={{ left: "90%", top: "20%", animationDelay: "3s" }}></div>
          </div>
        </div>

        <div className="container-custom relative z-10 px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            {/* Headline */}
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6 animate-fade-in">
              The All-in-One Growth Hub for{" "}
              <span className="text-gradient">Small Business.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-2xl md:text-3xl font-semibold text-accent mb-6 animate-slide-up">
              Automate Leads. Capture Clients. Scale Effortlessly.
            </p>

            {/* Description */}
            <p className="text-lg md:text-xl text-foreground-muted max-w-3xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              The complete platform combining AI Voice Agents, Google & Facebook Ads, built-in CRM,
              and real-time analytics—everything you need to capture more clients and grow your business.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Link href="#contact" className="btn-primary">
                Book a Demo
              </Link>
              <Link href="#services" className="btn-ghost">
                Learn More
              </Link>
            </div>

            {/* Trust signal */}
            <div className="flex items-center justify-center gap-2 text-foreground-muted animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <span className="material-icons text-accent">verified</span>
              <p className="text-sm font-medium">Trusted by 500+ Small Businesses</p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <span className="material-icons text-accent/50 text-4xl">keyboard_arrow_down</span>
        </div>
      </section>

      {/* ==================== SOCIAL PROOF BANNER ==================== */}
      <section className="bg-background-dark py-8">
        <div className="container-custom px-6 lg:px-8">
          <SocialProofBanner />
        </div>
      </section>

      {/* ==================== SECTION 2: SERVICES ==================== */}
      <section id="services" className="section bg-background relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-background to-background-dark opacity-50"></div>

        <div className="container-custom relative z-10">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold uppercase tracking-widest text-accent mb-4">
              The Integrated Solution
            </h2>
            <p className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Everything You Need in One Platform
            </p>
            <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
              Stop juggling multiple tools. Capture Client brings AI, ads, CRM, and analytics together
              in one seamless growth engine.
            </p>
          </div>

          {/* Feature cards grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Voice AI Agents */}
            <div className="card group">
              <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 border border-primary/20 mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <span className="material-icons text-primary text-3xl">support_agent</span>
              </div>
              <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                Voice AI Agents
              </h3>
              <p className="text-foreground-muted leading-relaxed">
                AI-powered voice agents handle calls 24/7, qualify leads, book appointments,
                and answer questions—so you never miss an opportunity.
              </p>
            </div>

            {/* Card 2: Lead Generation */}
            <div className="card group">
              <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-accent/10 border border-accent/20 mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                <span className="material-icons text-accent text-3xl">trending_up</span>
              </div>
              <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                Lead Generation
              </h3>
              <p className="text-foreground-muted leading-relaxed">
                Professionally managed Google and Facebook Ads campaigns designed to drive
                high-quality leads directly to your business.
              </p>
            </div>

            {/* Card 3: Built-in CRM */}
            <div className="card group">
              <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 border border-primary/20 mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <span className="material-icons text-primary text-3xl">contacts</span>
              </div>
              <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                Built-in CRM
              </h3>
              <p className="text-foreground-muted leading-relaxed">
                Manage all client interactions, track conversations, and organize your pipeline
                in one unified inbox—no more scattered tools.
              </p>
            </div>

            {/* Card 4: Marketing Dashboard */}
            <div className="card group">
              <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-accent/10 border border-accent/20 mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                <span className="material-icons text-accent text-3xl">insights</span>
              </div>
              <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                Marketing Dashboard
              </h3>
              <p className="text-foreground-muted leading-relaxed">
                Real-time analytics and reporting give you complete visibility into campaign
                performance, ROI, and growth metrics.
              </p>
            </div>
          </div>

          {/* Trust Signals */}
          <div className="mt-16">
            <TrustSignals />
          </div>
        </div>
      </section>

      {/* ==================== SECTION 2.5: LEAD RESCUE SIMULATOR ==================== */}
      <LeadRescueSimulator />

      {/* ==================== SECTION 3: TECHNOLOGY DEEP DIVE ==================== */}
      {/* Part A: AI Voice Technology */}
      <section className="section bg-background-dark relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text content - Left */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-accent mb-4">
                AI Voice Technology
              </h2>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
                Never Miss a Call. Never Lose a Lead.
              </h3>
              <p className="text-lg text-foreground-muted mb-6 leading-relaxed">
                Our advanced AI voice agents don't just answer calls—they understand context,
                respond naturally, and take action. Every conversation is transcribed, analyzed,
                and logged automatically.
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <span className="material-icons text-accent mt-1">check_circle</span>
                  <div>
                    <p className="font-semibold text-foreground">24/7 Availability</p>
                    <p className="text-foreground-muted">Handle unlimited calls simultaneously, any time of day</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-icons text-accent mt-1">check_circle</span>
                  <div>
                    <p className="font-semibold text-foreground">Natural Conversations</p>
                    <p className="text-foreground-muted">Context-aware responses that feel human and professional</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-icons text-accent mt-1">check_circle</span>
                  <div>
                    <p className="font-semibold text-foreground">Automatic Transcription</p>
                    <p className="text-foreground-muted">Every call is recorded, transcribed, and searchable</p>
                  </div>
                </li>
              </ul>

              <Link href="/services/voice-ai" className="btn-secondary">
                Explore Voice AI
              </Link>
            </div>

            {/* Visual mockup - Right */}
            <AIVoiceVisual />
          </div>
        </div>
      </section>

      {/* Part B: Dashboard & CRM */}
      <section className="section bg-background relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Visual mockup - Left */}
            <GrowthDashboard />

            {/* Text content - Right */}
            <div className="order-1 lg:order-2">
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">
                Unified Platform
              </h2>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
                See Everything. Control Everything.
              </h3>
              <p className="text-lg text-foreground-muted mb-6 leading-relaxed">
                Our dashboard gives you complete visibility into your entire growth engine.
                Track campaigns, manage leads, and analyze performance—all from one beautiful interface.
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <span className="material-icons text-primary mt-1">check_circle</span>
                  <div>
                    <p className="font-semibold text-foreground">Real-Time Analytics</p>
                    <p className="text-foreground-muted">Live updates on campaign performance and lead activity</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-icons text-primary mt-1">check_circle</span>
                  <div>
                    <p className="font-semibold text-foreground">Unified Inbox</p>
                    <p className="text-foreground-muted">Manage calls, texts, emails, and form submissions in one place</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-icons text-primary mt-1">check_circle</span>
                  <div>
                    <p className="font-semibold text-foreground">Growth Tracking</p>
                    <p className="text-foreground-muted">Visualize your growth trajectory with beautiful, actionable insights</p>
                  </div>
                </li>
              </ul>

              <Link href="/features" className="btn-secondary">
                Explore CRM & Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 4: PRICING ==================== */}
      <section id="pricing" className="section bg-background-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-30"></div>

        <div className="container-custom relative z-10">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold uppercase tracking-widest text-accent mb-4">
              Pricing
            </h2>
            <p className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Simple Pricing for Scalable Growth
            </p>
            <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
              Choose the plan that fits your business. All plans include our core platform features.
            </p>
          </div>

          {/* Pricing cards */}
          <PricingCards />

          {/* Risk Reversal Guarantee */}
          <div className="mt-16">
            <RiskReversal />
          </div>

          {/* Capacity indicator */}
          <div className="mt-8">
            <CapacityIndicator spotsLeft={7} />
          </div>
        </div>
      </section>

      {/* ==================== SECTION 4.5: OBJECTION HANDLER ==================== */}
      <section className="section bg-background relative">
        <div className="container-custom">
          <ObjectionHandler />
        </div>
      </section>

      {/* ==================== SECTION 5: SOCIAL PROOF ==================== */}
      <section className="section bg-background relative">
        <div className="container-custom">
          {/* Testimonials */}
          <TestimonialsCarousel />

          {/* Trust badges */}
          <div className="border-t border-surface-border pt-12">
            <p className="text-center text-foreground-muted text-sm uppercase tracking-wider mb-8">
              Trusted Partners
            </p>
            <div className="flex flex-wrap items-center justify-center gap-12 opacity-50">
              <div className="text-foreground-muted font-semibold text-lg">
                Google Ads Partner
              </div>
              <div className="text-foreground-muted font-semibold text-lg">
                Meta Business Partner
              </div>
              <div className="text-foreground-muted font-semibold text-lg">
                BBB Accredited
              </div>
            </div>
          </div>

          {/* Stats row */}
          <AnimatedStats />
        </div>
      </section>

      {/* ==================== SECTION 6: FINAL CTA ==================== */}
      <section id="contact" className="section bg-background-dark relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-mesh">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
            <div className="absolute inset-0 bg-gradient-radial from-accent/10 via-primary/5 to-transparent opacity-50 animate-pulse-glow"></div>
          </div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-4">
                Ready to <span className="text-gradient">Capture Your Market?</span>
              </h2>
              <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
                Start automating leads and capturing more clients today. Book a free demo
                to see the platform in action.
              </p>
            </div>

            {/* Lead capture form - Optimized 2-step form */}
            <div className="glass p-8 lg:p-12 rounded-2xl shadow-glow max-w-2xl mx-auto mb-12">
              <OptimizedLeadForm source="homepage-final-cta" />
            </div>

            {/* Alternative CTA */}
            <div className="text-center">
              <p className="text-foreground-muted mb-4">Prefer to talk? We're here to help.</p>
              <a
                href="tel:865-346-3339"
                className="inline-flex items-center gap-2 text-2xl font-bold text-accent hover:text-accent/80 transition-colors"
              >
                <span className="material-icons text-3xl">phone</span>
                (865) 346-3339
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile CTA Bar - Always present on mobile */}
      <MobileCTABar />
    </div>
  );
}
