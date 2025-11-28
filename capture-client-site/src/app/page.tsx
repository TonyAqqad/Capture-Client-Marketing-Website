import Link from "next/link";
import Image from "next/image";
import LeadCaptureForm from "@/components/LeadCaptureForm";

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full">
      {/* Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          alt="Abstract swirling background of blue and purple energy"
          className="object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD70VubcZHP6x_FyXQbOkNLoJC9d1feIQtzvGSpC8JDixrF6Ms24CRrgamrjBdhyeP8fGRKsX0BdnSlUTO7ebJrNV_bXsbCwORJrmUQvEbimMInJ5NMub5JVoWv8hvEKGndv1f_IZrJ67akJB9ZxQGbGVQKifDs666b0dnHj85Xo7qLEkM5_aDRHeVisNtgZg5EfQpldEj-wJFMGxSqD71ZhQo2_Q25-kIYqmCuDwSGBApcAnzegpY_AzD7qAStyw_G3MS-qOqYoz0"
          fill
          priority
        />
        <div className="absolute inset-0 bg-background-dark opacity-50"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10">
        <main className="container mx-auto px-8 lg:px-16 pt-24 pb-32">
          <div className="max-w-4xl">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white leading-tight">
              <span className="glitch-text">Automate Leads.</span>
              <br />
              <span className="glitch-text text-primary">Capture Clients.</span>
            </h1>
            <div className="grid md:grid-cols-2 gap-8 mt-12 text-lg text-white/90">
              <p>The all-in-one growth hub. AI agents, ads, and automation.</p>
              <p>Deploy & manage from a unified dashboard.</p>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap items-center gap-8">
            <div className="flex items-center gap-4">
              <span className="material-icons text-primary text-5xl" style={{ textShadow: "0 0 15px currentColor" }}>
                settings_suggest
              </span>
              <div>
                <p className="text-2xl font-bold text-primary" style={{ textShadow: "0 0 10px currentColor" }}>
                  Start Scaling
                </p>
                <p className="text-2xl font-bold text-white">Now</p>
              </div>
            </div>
            <a
              href="tel:865-346-3339"
              className="bg-primary text-black px-10 py-4 rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105 glowing-button"
            >
              Call (865) 346-3339
            </a>
            <div className="flex items-center gap-6 ml-auto">
              <div>
                <p className="text-lg font-semibold text-white">Trusted by</p>
                <p className="text-2xl font-bold text-primary">500+</p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Features Section */}
      <section className="py-24 px-8 lg:px-16 bg-background-light dark:bg-background-dark relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        <div className="container mx-auto text-center">
          <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Features</h2>
          <p className="mt-4 text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            An Ecosystem Built for Growth
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            Our platform isn't just a tool; it's a living system designed to adapt and evolve with your business needs.
          </p>
        </div>

        <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-8 bg-white/50 dark:bg-white/5 backdrop-blur-lg transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 animate-float-slow">
            <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-3xl mb-6">
              <span className="material-icons">smart_toy</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Autonomous AI Agents
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Deploy intelligent agents that handle lead qualification, scheduling, and follow-ups 24/7, without human intervention.
            </p>
          </div>

          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-8 bg-white/50 dark:bg-white/5 backdrop-blur-lg transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 animate-float-medium">
            <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-3xl mb-6">
              <span className="material-icons">hub</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Unified Growth Hub
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Manage all your marketing, sales, and client communication from a single, intuitive dashboard that feels alive.
            </p>
          </div>

          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-8 bg-white/50 dark:bg-white/5 backdrop-blur-lg transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 animate-float-fast">
            <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-3xl mb-6">
              <span className="material-icons">insights</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Predictive Analytics
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Leverage AI to forecast trends, identify high-value leads, and optimize your strategy with holographic data visualizations.
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-block bg-white/10 border border-white/20 text-white px-8 py-3 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all duration-300 glowing-button-secondary"
          >
            View All Services
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-8 lg:px-16 bg-gray-50 dark:bg-black/20">
        <div className="container mx-auto text-center">
          <h2 className="text-sm font-bold uppercase tracking-widest text-primary">How It Works</h2>
          <p className="mt-4 text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Activate Your Growth Engine in 3 Steps
          </p>
        </div>

        <div className="container mx-auto mt-20 relative">
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2 hidden md:block"></div>
          <div className="grid md:grid-cols-3 gap-16 relative">
            <div className="text-center relative">
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-background-light dark:bg-background-dark border-2 border-primary/50 flex items-center justify-center text-primary text-2xl font-bold glowing-button-secondary">
                01
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 mt-8">Connect</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Integrate your existing tools and data sources in minutes. Our system seamlessly plugs into your workflow.
              </p>
            </div>

            <div className="text-center relative">
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-background-light dark:bg-background-dark border-2 border-primary/50 flex items-center justify-center text-primary text-2xl font-bold glowing-button-secondary">
                02
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 mt-8">Configure</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Define your goals and set parameters for your AI agents. Tell them what a perfect lead looks like.
              </p>
            </div>

            <div className="text-center relative">
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-background-light dark:bg-background-dark border-2 border-primary/50 flex items-center justify-center text-primary text-2xl font-bold glowing-button-secondary">
                03
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 mt-8">Capture</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Watch as the system automates outreach, qualifies leads, and fills your pipeline with high-intent clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Lead Form */}
      <section className="py-24 px-8 lg:px-16 bg-background-light dark:bg-background-dark">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white dark:bg-gray-900/50 rounded-lg p-12 lg:p-16 border border-gray-200 dark:border-gray-800 shadow-xl dark:shadow-2xl dark:shadow-primary/5">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white text-center mb-4">
              Ready to Capture More Clients?
            </h2>
            <p className="text-center max-w-xl mx-auto text-lg text-gray-600 dark:text-gray-400 mb-8">
              Connect with our team to see a live demonstration of the Capture Client growth engine and discover how it can transform your business.
            </p>
            <LeadCaptureForm source="homepage" />
          </div>
        </div>
      </section>
    </div>
  );
}
