import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { WebVitals } from "@/components/analytics/WebVitals";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import ScrollDepthTracker from "@/components/analytics/ScrollDepthTracker";
import {
  getDefaultMetadata,
  generateOrganizationSchema,
  generateWebSiteSchema,
} from "@/lib/seo-config";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

// Enhanced metadata following Next.js 16 and 2025 SEO best practices
export const metadata: Metadata = getDefaultMetadata();

// Viewport configuration for optimal mobile rendering
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0F172A',
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
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        {/* Global JSON-LD structured data for E-E-A-T and entity recognition */}
        <JsonLd schema={[organizationSchema, websiteSchema]} />
      </head>
      <body
        className={`${poppins.variable} ${inter.variable} font-body bg-background text-foreground antialiased`}
      >
        <GoogleAnalytics />
        <WebVitals />
        <ScrollDepthTracker />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
