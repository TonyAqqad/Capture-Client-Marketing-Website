import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import "./globals-mobile-optimized.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { WebVitals } from "@/components/analytics/WebVitals";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import ScrollDepthTracker from "@/components/analytics/ScrollDepthTracker";
import Script from "next/script";
import {
  getDefaultMetadata,
  generateOrganizationSchema,
  generateWebSiteSchema,
} from "@/lib/seo-config";

// CRITICAL: Use font-display swap for faster FCP
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  display: "swap", // Already set - good!
  preload: true, // Ensure preloading
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap", // Already set - good!
  preload: true, // Ensure preloading
});

// Enhanced metadata following Next.js 16 and 2025 SEO best practices
export const metadata: Metadata = getDefaultMetadata();

// Viewport configuration for optimal mobile rendering with notch support
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0F172A',
  viewportFit: 'cover', // CRITICAL: Support for iPhone X+ notch
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Generate global JSON-LD schemas for organization and website
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        {/* CRITICAL: Preconnect to Google Fonts for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* CRITICAL: Preload Material Icons font - use font-display: swap */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/icon?family=Material+Icons&display=swap"
          as="style"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons&display=swap"
          rel="stylesheet"
          media="print"
        />
        <noscript>
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons&display=swap" rel="stylesheet" />
        </noscript>

        {/* Global JSON-LD structured data for E-E-A-T and entity recognition */}
        <JsonLd schema={[organizationSchema, websiteSchema]} />
      </head>
      <body
        className={`${poppins.variable} ${inter.variable} font-body bg-background text-foreground antialiased overflow-x-hidden`}
      >
        {/* CRITICAL: Defer Material Icons loading until after initial render */}
        <Script
          id="material-icons-loader"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var link = document.querySelector('link[media="print"]');
                if (link) link.media = 'all';
              })();
            `
          }}
        />

        {/* CRITICAL: Defer analytics to not block render */}
        <GoogleAnalytics />
        <WebVitals />
        <ScrollDepthTracker />

        {/* Accessibility: Skip to main content link for keyboard navigation */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-accent text-background-dark px-6 py-3 rounded-lg font-bold z-50 focus-ring-premium transition-all duration-300"
        >
          Skip to main content
        </a>

        <Header />
        <main id="main-content" className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
