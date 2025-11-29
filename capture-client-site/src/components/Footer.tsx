import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0F1C] relative overflow-hidden">
      {/* Gradient border at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4A69E2] to-transparent opacity-50" />

      <div className="container mx-auto px-6 sm:px-8 lg:px-16">
        {/* Main footer content */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Column 1: Logo, tagline, and contact - spans 3 columns on large screens */}
            <div className="lg:col-span-3">
              <Link href="/" className="inline-flex items-center gap-3 group">
                <div className="relative w-8 h-8 flex-shrink-0">
                  <Image src="/logo-secondary.png" alt="Capture Client Logo" fill className="object-contain group-hover:brightness-110 transition-all duration-300" />
                </div>
                <span className="text-xl font-heading font-bold text-[#F8FAFC]">
                  Capture Client
                </span>
              </Link>

              <p className="mt-6 text-[#94A3B8] font-body text-sm leading-relaxed max-w-xs">
                Automate Leads. Capture Clients.
              </p>

              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3 group">
                  <span className="material-icons text-[#4A69E2] text-lg">phone</span>
                  <a
                    href="tel:8653463339"
                    className="text-[#94A3B8] hover:text-[#00C9FF] font-body text-sm transition-colors duration-200"
                  >
                    (865) 346-3339
                  </a>
                </div>

                <div className="flex items-center gap-3 group">
                  <span className="material-icons text-[#4A69E2] text-lg">email</span>
                  <a
                    href="mailto:team@captureclient.net"
                    className="text-[#94A3B8] hover:text-[#00C9FF] font-body text-sm transition-colors duration-200"
                  >
                    team@captureclient.net
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <span className="material-icons text-[#4A69E2] text-lg">location_on</span>
                  <span className="text-[#94A3B8] font-body text-sm">
                    Knoxville, TN
                  </span>
                </div>
              </div>
            </div>

            {/* Column 2: Services - spans 3 columns */}
            <div className="lg:col-span-3">
              <h3 className="text-[#F8FAFC] font-heading font-semibold text-sm uppercase tracking-wider mb-6">
                Services
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/services/voice-ai"
                    className="text-[#94A3B8] hover:text-[#00C9FF] font-body text-sm transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Voice AI Agents</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/google-ads"
                    className="text-[#94A3B8] hover:text-[#00C9FF] font-body text-sm transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Google Ads</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/facebook-ads"
                    className="text-[#94A3B8] hover:text-[#00C9FF] font-body text-sm transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Facebook Ads</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/lead-generation"
                    className="text-[#94A3B8] hover:text-[#00C9FF] font-body text-sm transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Lead Generation</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Company - spans 3 columns */}
            <div className="lg:col-span-3">
              <h3 className="text-[#F8FAFC] font-heading font-semibold text-sm uppercase tracking-wider mb-6">
                Company
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/about"
                    className="text-[#94A3B8] hover:text-[#00C9FF] font-body text-sm transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">About</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-[#94A3B8] hover:text-[#00C9FF] font-body text-sm transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Pricing</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-[#94A3B8] hover:text-[#00C9FF] font-body text-sm transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Contact</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-[#94A3B8] hover:text-[#00C9FF] font-body text-sm transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Blog</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Resources - spans 3 columns */}
            <div className="lg:col-span-3">
              <h3 className="text-[#F8FAFC] font-heading font-semibold text-sm uppercase tracking-wider mb-6">
                Resources
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-[#94A3B8] hover:text-[#00C9FF] font-body text-sm transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Privacy Policy</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="text-[#94A3B8] hover:text-[#00C9FF] font-body text-sm transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Terms of Service</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-[#94A3B8] hover:text-[#00C9FF] font-body text-sm transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">FAQ</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter signup section */}
          <div className="mt-16 pt-12 border-t border-[#334155]">
            <div className="max-w-2xl">
              <h3 className="text-[#F8FAFC] font-heading font-semibold text-lg mb-3">
                Stay updated with our latest insights
              </h3>
              <p className="text-[#94A3B8] font-body text-sm mb-6">
                Get expert tips on lead generation, Voice AI, and digital marketing delivered to your inbox.
              </p>
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-[#1A202E] border border-[#334155] rounded-lg text-[#F8FAFC] placeholder:text-[#94A3B8] font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#4A69E2] focus:border-transparent transition-all duration-200"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-[#4A69E2] to-[#00C9FF] text-white font-heading font-semibold text-sm rounded-lg hover:shadow-lg hover:shadow-[#4A69E2]/20 transition-all duration-300 whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Trust badges */}
          <div className="mt-12 pt-8 border-t border-[#334155]">
            <div className="flex flex-wrap items-center gap-8">
              <span className="text-[#94A3B8] font-body text-xs uppercase tracking-wider">
                Trusted Partners
              </span>
              <div className="flex flex-wrap items-center gap-6">
                <span className="text-[#94A3B8] font-body text-sm hover:text-[#00C9FF] transition-colors duration-200">
                  Google Ads Partner
                </span>
                <span className="text-[#94A3B8] font-body text-sm hover:text-[#00C9FF] transition-colors duration-200">
                  Meta Business Partner
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section with copyright and social links */}
        <div className="border-t border-[#334155] py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[#94A3B8] font-body text-sm">
              &copy; {currentYear} Capture Client. All rights reserved.
            </p>

            {/* Social media icons */}
            <div className="flex items-center gap-5">
              <a
                href="https://twitter.com/captureclient"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#94A3B8] hover:text-[#00C9FF] transition-colors duration-200"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <a
                href="https://linkedin.com/company/captureclient"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#94A3B8] hover:text-[#00C9FF] transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              <a
                href="https://facebook.com/captureclient"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#94A3B8] hover:text-[#00C9FF] transition-colors duration-200"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
