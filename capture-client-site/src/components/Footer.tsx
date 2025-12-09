"use client";

import Link from "next/link";
import Image from "next/image";
import { trackPhoneClick, trackEmailClick } from "@/lib/analytics";
import ObfuscatedEmail from "@/components/ui/ObfuscatedEmail";
import { Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        backgroundColor: '#030303',
        fontFamily: 'var(--font-bricolage-grotesque)'
      }}
    >
      {/* Premium gradient border at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00C9FF] to-transparent" />
      <div className="absolute top-0.5 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4A69E2]/30 to-transparent" />

      {/* Mesh gradient background */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-xl md:blur-3xl"
          style={{
            background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(0, 201, 255, 0.1) 0%, transparent 50%)'
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-xl md:blur-3xl"
          style={{
            background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(74, 105, 226, 0.08) 0%, transparent 50%)'
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        {/* Main footer content */}
        <div className="py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-8">
            {/* Column 1: Logo, tagline, and contact - spans 3 columns on large screens */}
            <div className="lg:col-span-3">
              <Link href="/" className="inline-flex items-center gap-3 group relative">
                {/* Glow effect on hover */}
                <div className="absolute -inset-2 bg-gradient-to-r from-[#00C9FF]/10 to-[#4A69E2]/10 rounded-lg opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

                <div className="relative w-8 h-8 flex-shrink-0">
                  <Image
                    src="/favicon.svg"
                    alt="Capture Client Logo"
                    fill
                    sizes="32px"
                    className="object-contain group-hover:brightness-110 group-hover:drop-shadow-[0_0_8px_rgba(0,201,255,0.3)] transition-all duration-300"
                  />
                </div>
                <span
                  className="text-xl relative bg-gradient-to-r from-[#00C9FF] to-[#4A69E2] bg-clip-text text-transparent"
                  style={{ fontWeight: 700 }}
                >
                  Capture Client
                </span>
              </Link>

              <p className="mt-4 sm:mt-6 text-sm leading-relaxed max-w-xs text-white/60" style={{ fontWeight: 300 }}>
                Automate Leads. Capture Clients.
              </p>

              {/* Premium contact info with hover effects */}
              <div className="mt-6 sm:mt-8 space-y-3">
                <a
                  href="tel:865-346-6111"
                  className="flex items-center gap-3 group min-h-[48px] -mx-2 px-2 rounded-lg hover:bg-white/[0.02] border border-transparent hover:border-white/[0.06] backdrop-blur-xl transition-all duration-300 active:scale-95 relative overflow-hidden"
                  onClick={() => trackPhoneClick("865-346-6111", "footer")}
                >
                  {/* Subtle gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00C9FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <Phone className="w-5 h-5 text-[#00C9FF] group-hover:text-[#4A69E2] transition-all duration-300 group-hover:rotate-12 relative z-10" />
                  <span className="text-white/60 group-hover:text-[#00C9FF] text-base sm:text-sm transition-colors duration-300 relative z-10" style={{ fontWeight: 400 }}>
                    (865) 346-6111
                  </span>
                </a>

                <ObfuscatedEmail
                  email="team@captureclientai.net"
                  className="flex items-center gap-3 group min-h-[48px] -mx-2 px-2 rounded-lg hover:bg-white/[0.02] border border-transparent hover:border-white/[0.06] backdrop-blur-xl transition-all duration-300 active:scale-95 relative overflow-hidden"
                  onClick={() => trackEmailClick("footer")}
                  showIcon={true}
                />

                <div className="flex items-center gap-3 min-h-[48px] -mx-2 px-2">
                  <MapPin className="w-5 h-5 text-[#00C9FF]" />
                  <span className="text-white/60 text-base sm:text-sm" style={{ fontWeight: 400 }}>Knoxville, TN</span>
                </div>
              </div>
            </div>

            {/* Column 2: Services - spans 3 columns */}
            <div className="lg:col-span-3">
              <h3 className="text-white text-sm uppercase tracking-wider mb-6 relative inline-block" style={{ fontWeight: 600 }}>
                Services
                <span className="absolute -bottom-2 left-0 w-12 h-px bg-gradient-to-r from-[#00C9FF] to-[#4A69E2]" />
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/services/voice-ai"
                    className="text-white/60 hover:text-[#00C9FF] text-sm transition-all duration-300 inline-flex items-center gap-2 group relative min-h-[44px]"
                    style={{ fontWeight: 400 }}
                  >
                    <span className="w-1 h-1 rounded-full bg-[#00C9FF] group-hover:bg-[#4A69E2] transition-colors duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      Voice AI Agents
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/google-ads"
                    className="text-white/60 hover:text-[#00C9FF] text-sm transition-all duration-300 inline-flex items-center gap-2 group relative min-h-[44px]"
                    style={{ fontWeight: 400 }}
                  >
                    <span className="w-1 h-1 rounded-full bg-[#00C9FF] group-hover:bg-[#4A69E2] transition-colors duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      Google Ads
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/facebook-ads"
                    className="text-white/60 hover:text-[#00C9FF] text-sm transition-all duration-300 inline-flex items-center gap-2 group relative min-h-[44px]"
                    style={{ fontWeight: 400 }}
                  >
                    <span className="w-1 h-1 rounded-full bg-[#00C9FF] group-hover:bg-[#4A69E2] transition-colors duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      Facebook Ads
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/lead-generation"
                    className="text-white/60 hover:text-[#00C9FF] text-sm transition-all duration-300 inline-flex items-center gap-2 group relative min-h-[44px]"
                    style={{ fontWeight: 400 }}
                  >
                    <span className="w-1 h-1 rounded-full bg-[#00C9FF] group-hover:bg-[#4A69E2] transition-colors duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      Lead Generation
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Company - spans 3 columns */}
            <div className="lg:col-span-3">
              <h3 className="text-white text-sm uppercase tracking-wider mb-6 relative inline-block" style={{ fontWeight: 600 }}>
                Company
                <span className="absolute -bottom-2 left-0 w-12 h-px bg-gradient-to-r from-[#00C9FF] to-[#4A69E2]" />
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/about"
                    className="text-white/60 hover:text-[#00C9FF] text-sm transition-all duration-300 inline-flex items-center gap-2 group relative min-h-[44px]"
                    style={{ fontWeight: 400 }}
                  >
                    <span className="w-1 h-1 rounded-full bg-[#00C9FF] group-hover:bg-[#4A69E2] transition-colors duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      About
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-white/60 hover:text-[#00C9FF] text-sm transition-all duration-300 inline-flex items-center gap-2 group relative min-h-[44px]"
                    style={{ fontWeight: 400 }}
                  >
                    <span className="w-1 h-1 rounded-full bg-[#00C9FF] group-hover:bg-[#4A69E2] transition-colors duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      Pricing
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-white/60 hover:text-[#00C9FF] text-sm transition-all duration-300 inline-flex items-center gap-2 group relative min-h-[44px]"
                    style={{ fontWeight: 400 }}
                  >
                    <span className="w-1 h-1 rounded-full bg-[#00C9FF] group-hover:bg-[#4A69E2] transition-colors duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      Contact
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-white/60 hover:text-[#00C9FF] text-sm transition-all duration-300 inline-flex items-center gap-2 group relative min-h-[44px]"
                    style={{ fontWeight: 400 }}
                  >
                    <span className="w-1 h-1 rounded-full bg-[#00C9FF] group-hover:bg-[#4A69E2] transition-colors duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      Blog
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Resources - spans 3 columns */}
            <div className="lg:col-span-3">
              <h3 className="text-white text-sm uppercase tracking-wider mb-6 relative inline-block" style={{ fontWeight: 600 }}>
                Resources
                <span className="absolute -bottom-2 left-0 w-12 h-px bg-gradient-to-r from-[#00C9FF] to-[#4A69E2]" />
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-white/60 hover:text-[#00C9FF] text-sm transition-all duration-300 inline-flex items-center gap-2 group relative min-h-[44px]"
                    style={{ fontWeight: 400 }}
                  >
                    <span className="w-1 h-1 rounded-full bg-[#00C9FF] group-hover:bg-[#4A69E2] transition-colors duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      Privacy Policy
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="text-white/60 hover:text-[#00C9FF] text-sm transition-all duration-300 inline-flex items-center gap-2 group relative min-h-[44px]"
                    style={{ fontWeight: 400 }}
                  >
                    <span className="w-1 h-1 rounded-full bg-[#00C9FF] group-hover:bg-[#4A69E2] transition-colors duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      Terms of Service
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-white/60 hover:text-[#00C9FF] text-sm transition-all duration-300 inline-flex items-center gap-2 group relative min-h-[44px]"
                    style={{ fontWeight: 400 }}
                  >
                    <span className="w-1 h-1 rounded-full bg-[#00C9FF] group-hover:bg-[#4A69E2] transition-colors duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      FAQ
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter signup section - premium design */}
          <div className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-white/[0.06] relative">
            {/* Subtle gradient line */}
            <div className="absolute top-0 left-0 w-32 h-px bg-gradient-to-r from-[#00C9FF] to-[#4A69E2]" />

            <div className="max-w-2xl">
              <h3 className="text-white text-base sm:text-lg mb-2 sm:mb-3" style={{ fontWeight: 600 }}>
                Stay updated with our latest insights
              </h3>
              <p className="text-white/60 text-sm mb-4 sm:mb-6" style={{ fontWeight: 300 }}>
                Get expert tips on lead generation, Voice AI, and digital marketing delivered to
                your inbox.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 relative group">
                <label htmlFor="footer-email" className="sr-only">Email address</label>
                <input
                  id="footer-email"
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 w-full min-h-[48px] px-4 py-3 bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl rounded-lg text-white placeholder:text-white/40 text-base focus:outline-none focus:ring-2 focus:ring-[#00C9FF] focus:border-[#4A69E2] hover:border-white/[0.1] transition-all duration-300"
                  style={{ fontWeight: 400 }}
                />
                <button
                  type="submit"
                  className="relative w-full sm:w-auto min-h-[48px] px-6 py-3 bg-gradient-to-r from-[#00C9FF] to-[#4A69E2] text-white text-sm rounded-lg hover:shadow-[0_0_24px_rgba(0,201,255,0.3)] transition-all duration-300 active:scale-95 whitespace-nowrap border border-white/[0.06] overflow-hidden group/btn"
                  style={{ fontWeight: 600 }}
                >
                  <span className="relative z-10">Subscribe</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#4A69E2] to-[#00C9FF] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                </button>
              </form>
            </div>
          </div>

          {/* Trust badges - premium design */}
          <div className="mt-12 pt-8 border-t border-white/[0.06] relative">
            {/* Subtle gradient line */}
            <div className="absolute top-0 left-0 w-32 h-px bg-gradient-to-r from-[#00C9FF] to-[#4A69E2]" />

            <div className="flex flex-wrap items-center gap-8">
              <span className="text-white/40 text-xs uppercase tracking-wider" style={{ fontWeight: 500 }}>
                Trusted Partners
              </span>
              <div className="flex flex-wrap items-center gap-6">
                <span className="text-white/60 text-sm hover:text-[#00C9FF] transition-all duration-300 cursor-pointer relative group/badge" style={{ fontWeight: 400 }}>
                  Google Ads Partner
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-[#00C9FF] to-[#4A69E2] group-hover/badge:w-full transition-all duration-300" />
                </span>
                <span className="text-white/60 text-sm hover:text-[#00C9FF] transition-all duration-300 cursor-pointer relative group/badge" style={{ fontWeight: 400 }}>
                  Meta Business Partner
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-[#00C9FF] to-[#4A69E2] group-hover/badge:w-full transition-all duration-300" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section - premium divider and social */}
        <div className="border-t border-white/[0.06] py-6 sm:py-8 relative">
          {/* Double gradient line effect */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00C9FF] to-transparent" />
          <div className="absolute top-0.5 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4A69E2]/30 to-transparent" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
            <p className="text-white/40 text-xs sm:text-sm text-center md:text-left" style={{ fontWeight: 400 }} suppressHydrationWarning>
              &copy; {currentYear} Capture Client. All rights reserved.
            </p>

            {/* Premium social media icons with glass styling */}
            <div className="flex items-center gap-2">
              <a
                href="https://twitter.com/captureclient"
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center justify-center min-w-[48px] min-h-[48px] text-white/60 hover:text-[#00C9FF] transition-all duration-300 active:scale-95 rounded-lg hover:bg-white/[0.02] border border-transparent hover:border-white/[0.06] backdrop-blur-xl group/social overflow-hidden"
                aria-label="Twitter"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#00C9FF]/5 to-[#4A69E2]/5 opacity-0 group-hover/social:opacity-100 transition-opacity duration-300" />
                <svg className="w-5 h-5 relative z-10 transition-transform group-hover/social:scale-110 duration-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <a
                href="https://linkedin.com/company/captureclient"
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center justify-center min-w-[48px] min-h-[48px] text-white/60 hover:text-[#00C9FF] transition-all duration-300 active:scale-95 rounded-lg hover:bg-white/[0.02] border border-transparent hover:border-white/[0.06] backdrop-blur-xl group/social overflow-hidden"
                aria-label="LinkedIn"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#00C9FF]/5 to-[#4A69E2]/5 opacity-0 group-hover/social:opacity-100 transition-opacity duration-300" />
                <svg className="w-5 h-5 relative z-10 transition-transform group-hover/social:scale-110 duration-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              <a
                href="https://facebook.com/captureclient"
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center justify-center min-w-[48px] min-h-[48px] text-white/60 hover:text-[#00C9FF] transition-all duration-300 active:scale-95 rounded-lg hover:bg-white/[0.02] border border-transparent hover:border-white/[0.06] backdrop-blur-xl group/social overflow-hidden"
                aria-label="Facebook"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#00C9FF]/5 to-[#4A69E2]/5 opacity-0 group-hover/social:opacity-100 transition-opacity duration-300" />
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
