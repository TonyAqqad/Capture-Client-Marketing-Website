"use client";

import Link from "next/link";
import Image from "next/image";
import { trackPhoneClick, trackEmailClick } from "@/lib/analytics";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-[#0A0F1C] to-[#050A14] relative overflow-hidden">
      {/* Premium gradient border at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4A69E2] to-transparent" />
      <div className="absolute top-0.5 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00C9FF]/30 to-transparent" />

      {/* Subtle mesh gradient background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#4A69E2]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00C9FF]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        {/* Main footer content */}
        <div className="py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-8">
            {/* Column 1: Logo, tagline, and contact - spans 3 columns on large screens */}
            <div className="lg:col-span-3">
              <Link href="/" className="inline-flex items-center gap-3 group relative">
                {/* Glow effect on hover */}
                <div className="absolute -inset-2 bg-gradient-to-r from-[#4A69E2]/10 to-[#00C9FF]/10 rounded-lg opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

                <div className="relative w-8 h-8 flex-shrink-0">
                  <Image
                    src="/favicon.svg"
                    alt="Capture Client Logo"
                    fill
                    sizes="32px"
                    className="object-contain group-hover:brightness-110 group-hover:drop-shadow-[0_0_8px_rgba(0,201,255,0.3)] transition-all duration-300"
                  />
                </div>
                <span className="text-xl font-heading font-bold text-[#F8FAFC] relative">
                  Capture Client
                </span>
              </Link>

              <p className="mt-4 sm:mt-6 text-[#94A3B8] font-body text-sm leading-relaxed max-w-xs">
                Automate Leads. Capture Clients.
              </p>

              {/* Premium contact info with hover effects */}
              <div className="mt-6 sm:mt-8 space-y-3">
                <a
                  href="tel:8653463339"
                  className="flex items-center gap-3 group min-h-[48px] -mx-2 px-2 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300 active:scale-95 relative overflow-hidden"
                  onClick={() => trackPhoneClick("865-346-3339", "footer")}
                >
                  {/* Subtle gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#4A69E2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <span className="material-icons text-[#4A69E2] group-hover:text-[#00C9FF] text-xl transition-all duration-300 group-hover:rotate-12 relative z-10">phone</span>
                  <span className="text-[#94A3B8] group-hover:text-[#00C9FF] font-body text-base sm:text-sm transition-colors duration-300 relative z-10">
                    (865) 346-3339
                  </span>
                </a>

                <a
                  href="mailto:team@captureclient.net"
                  className="flex items-center gap-3 group min-h-[48px] -mx-2 px-2 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300 active:scale-95 relative overflow-hidden"
                  onClick={() => trackEmailClick("footer")}
                >
                  {/* Subtle gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#4A69E2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <span className="material-icons text-[#4A69E2] group-hover:text-[#00C9FF] text-xl transition-colors duration-300 relative z-10">email</span>
                  <span className="text-[#94A3B8] group-hover:text-[#00C9FF] font-body text-base sm:text-sm transition-colors duration-300 break-all relative z-10">
                    team@captureclient.net
                  </span>
                </a>

                <div className="flex items-center gap-3 min-h-[48px] -mx-2 px-2">
                  <span className="material-icons text-[#4A69E2] text-xl">location_on</span>
                  <span className="text-[#94A3B8] font-body text-base sm:text-sm">Knoxville, TN</span>
                </div>
              </div>
            </div>

            {/* Column 2: Services - spans 3 columns */}
            <div className="lg:col-span-3">
              <h3 className="text-[#F8FAFC] font-heading font-semibold text-sm uppercase tracking-wider mb-6 relative inline-block">
                Services
                <span className="absolute -bottom-2 left-0 w-12 h-px bg-gradient-to-r from-[#4A69E2] to-[#00C9FF]" />
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/services/voice-ai"
                    className="text-[#94A3B8] hover:text-[#00C9FF] font-body text-sm transition-all duration-300 inline-flex items-center gap-2 group relative"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#4A69E2] group-hover:bg-[#00C9FF] transition-colors duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      Voice AI Agents
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/google-ads"
                    className="text-[#94A3B8] hover:text-[#00C9FF] font-body text-sm transition-all duration-300 inline-flex items-center gap-2 group relative"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#4A69E2] group-hover:bg-[#00C9FF] transition-colors duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      Google Ads
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/facebook-ads"
                    className="text-[#94A3B8] hover:text-[#00C9FF] font-body text-sm transition-all duration-300 inline-flex items-center gap-2 group relative"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#4A69E2] group-hover:bg-[#00C9FF] transition-colors duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      Facebook Ads
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/lead-generation"
                    className="text-[#94A3B8] hover:text-[#00C9FF] font-body text-sm transition-all duration-300 inline-flex items-center gap-2 group relative"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#4A69E2] group-hover:bg-[#00C9FF] transition-colors duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      Lead Generation
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Company - spans 3 columns */}
            <div className="lg:col-span-3">
              <h3 className="text-[#F8FAFC] font-heading font-semibold text-sm uppercase tracking-wider mb-6 relative inline-block">
                Company
                <span className="absolute -bottom-2 left-0 w-12 h-px bg-gradient-to-r from-[#4A69E2] to-[#00C9FF]" />
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/about"
                    className="text-[#94A3B8] hover:text-[#00C9FF] font-body text-sm transition-all duration-300 inline-flex items-center gap-2 group relative"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#4A69E2] group-hover:bg-[#00C9FF] transition-colors duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      About
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-[#94A3B8] hover:text-[#00C9FF] font-body text-sm transition-all duration-300 inline-flex items-center gap-2 group relative"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#4A69E2] group-hover:bg-[#00C9FF] transition-colors duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      Pricing
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-[#94A3B8] hover:text-[#00C9FF] font-body text-sm transition-all duration-300 inline-flex items-center gap-2 group relative"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#4A69E2] group-hover:bg-[#00C9FF] transition-colors duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      Contact
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-[#94A3B8] hover:text-[#00C9FF] font-body text-sm transition-all duration-300 inline-flex items-center gap-2 group relative"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#4A69E2] group-hover:bg-[#00C9FF] transition-colors duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      Blog
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Resources - spans 3 columns */}
            <div className="lg:col-span-3">
              <h3 className="text-[#F8FAFC] font-heading font-semibold text-sm uppercase tracking-wider mb-6 relative inline-block">
                Resources
                <span className="absolute -bottom-2 left-0 w-12 h-px bg-gradient-to-r from-[#4A69E2] to-[#00C9FF]" />
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-[#94A3B8] hover:text-[#00C9FF] font-body text-sm transition-all duration-300 inline-flex items-center gap-2 group relative"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#4A69E2] group-hover:bg-[#00C9FF] transition-colors duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      Privacy Policy
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="text-[#94A3B8] hover:text-[#00C9FF] font-body text-sm transition-all duration-300 inline-flex items-center gap-2 group relative"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#4A69E2] group-hover:bg-[#00C9FF] transition-colors duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      Terms of Service
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-[#94A3B8] hover:text-[#00C9FF] font-body text-sm transition-all duration-300 inline-flex items-center gap-2 group relative"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#4A69E2] group-hover:bg-[#00C9FF] transition-colors duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      FAQ
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter signup section - premium design */}
          <div className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-white/10 relative">
            {/* Subtle gradient line */}
            <div className="absolute top-0 left-0 w-32 h-px bg-gradient-to-r from-[#4A69E2] to-[#00C9FF]" />

            <div className="max-w-2xl">
              <h3 className="text-[#F8FAFC] font-heading font-semibold text-base sm:text-lg mb-2 sm:mb-3">
                Stay updated with our latest insights
              </h3>
              <p className="text-[#94A3B8] font-body text-sm mb-4 sm:mb-6">
                Get expert tips on lead generation, Voice AI, and digital marketing delivered to
                your inbox.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 relative group">
                <label htmlFor="footer-email" className="sr-only">Email address</label>
                <input
                  id="footer-email"
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 w-full min-h-[48px] px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-[#F8FAFC] placeholder:text-[#94A3B8] font-body text-base focus:outline-none focus:ring-2 focus:ring-[#4A69E2] focus:border-[#00C9FF] hover:border-white/20 transition-all duration-300"
                />
                <button
                  type="submit"
                  className="relative w-full sm:w-auto min-h-[48px] px-6 py-3 bg-gradient-to-r from-[#4A69E2] to-[#00C9FF] text-white font-heading font-semibold text-sm rounded-lg hover:shadow-[0_0_24px_rgba(0,201,255,0.3)] transition-all duration-300 active:scale-95 whitespace-nowrap border border-white/10 overflow-hidden group/btn"
                >
                  <span className="relative z-10">Subscribe</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00C9FF] to-[#4A69E2] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                </button>
              </form>
            </div>
          </div>

          {/* Trust badges - premium design */}
          <div className="mt-12 pt-8 border-t border-white/10 relative">
            {/* Subtle gradient line */}
            <div className="absolute top-0 left-0 w-32 h-px bg-gradient-to-r from-[#4A69E2] to-[#00C9FF]" />

            <div className="flex flex-wrap items-center gap-8">
              <span className="text-[#94A3B8] font-body text-xs uppercase tracking-wider font-medium">
                Trusted Partners
              </span>
              <div className="flex flex-wrap items-center gap-6">
                <span className="text-[#94A3B8] font-body text-sm hover:text-[#00C9FF] transition-all duration-300 cursor-pointer relative group/badge">
                  Google Ads Partner
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-[#4A69E2] to-[#00C9FF] group-hover/badge:w-full transition-all duration-300" />
                </span>
                <span className="text-[#94A3B8] font-body text-sm hover:text-[#00C9FF] transition-all duration-300 cursor-pointer relative group/badge">
                  Meta Business Partner
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-[#4A69E2] to-[#00C9FF] group-hover/badge:w-full transition-all duration-300" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section - premium divider and social */}
        <div className="border-t border-white/10 py-6 sm:py-8 relative">
          {/* Double gradient line effect */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4A69E2] to-transparent" />
          <div className="absolute top-0.5 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00C9FF]/30 to-transparent" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
            <p className="text-[#94A3B8] font-body text-xs sm:text-sm text-center md:text-left" suppressHydrationWarning>
              &copy; {currentYear} Capture Client. All rights reserved.
            </p>

            {/* Premium social media icons */}
            <div className="flex items-center gap-2">
              <a
                href="https://twitter.com/captureclient"
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center justify-center min-w-[48px] min-h-[48px] text-[#94A3B8] hover:text-[#00C9FF] transition-all duration-300 active:scale-95 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 group/social overflow-hidden"
                aria-label="Twitter"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#4A69E2]/5 to-[#00C9FF]/5 opacity-0 group-hover/social:opacity-100 transition-opacity duration-300" />
                <svg className="w-5 h-5 relative z-10 transition-transform group-hover/social:scale-110 duration-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <a
                href="https://linkedin.com/company/captureclient"
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center justify-center min-w-[48px] min-h-[48px] text-[#94A3B8] hover:text-[#00C9FF] transition-all duration-300 active:scale-95 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 group/social overflow-hidden"
                aria-label="LinkedIn"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#4A69E2]/5 to-[#00C9FF]/5 opacity-0 group-hover/social:opacity-100 transition-opacity duration-300" />
                <svg className="w-5 h-5 relative z-10 transition-transform group-hover/social:scale-110 duration-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              <a
                href="https://facebook.com/captureclient"
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center justify-center min-w-[48px] min-h-[48px] text-[#94A3B8] hover:text-[#00C9FF] transition-all duration-300 active:scale-95 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 group/social overflow-hidden"
                aria-label="Facebook"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#4A69E2]/5 to-[#00C9FF]/5 opacity-0 group-hover/social:opacity-100 transition-opacity duration-300" />
                <svg className="w-5 h-5 relative z-10 transition-transform group-hover/social:scale-110 duration-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
