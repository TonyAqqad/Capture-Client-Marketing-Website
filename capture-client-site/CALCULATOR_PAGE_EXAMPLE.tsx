/**
 * EXAMPLE: Standalone Calculator Page
 *
 * This file shows how to create a dedicated calculator page for link building.
 *
 * To implement:
 * 1. Create: src/app/calculator/page.tsx
 * 2. Copy this code
 * 3. Deploy and submit to Google Search Console
 * 4. Use in outreach campaigns
 *
 * URL will be: https://captureclient.com/calculator
 */

import MissedCallCalculator from "@/components/features/MissedCallCalculator";
import { Metadata } from "next";

// ============================================================================
// SEO METADATA (Optimized for Link Magnets)
// ============================================================================

export const metadata: Metadata = {
  title: "Free Missed Call Cost Calculator | Calculate Your Lost Revenue",
  description:
    "Calculate exactly how much money you're losing from missed calls. Free interactive ROI calculator shows potential revenue loss and Voice AI savings.",
  keywords: [
    "missed call calculator",
    "roi calculator",
    "lost revenue calculator",
    "voice ai roi",
    "business calculator",
    "missed call cost",
  ].join(", "),

  // Open Graph (for social sharing)
  openGraph: {
    title: "Missed Call Cost Calculator - See Your Lost Revenue",
    description:
      "Free tool: Calculate how much revenue you're losing from missed calls and see Voice AI ROI in real-time.",
    type: "website",
    url: "https://captureclient.com/calculator",
    images: [
      {
        url: "/calculator-preview.png", // Create this image
        width: 1200,
        height: 630,
        alt: "Missed Call Cost Calculator",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Free Missed Call Cost Calculator",
    description:
      "Calculate your lost revenue from missed calls. See Voice AI ROI instantly.",
    images: ["/calculator-preview.png"],
  },

  // Canonical URL
  alternates: {
    canonical: "https://captureclient.com/calculator",
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function CalculatorPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Optional: Add breadcrumbs for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://captureclient.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Calculator",
                item: "https://captureclient.com/calculator",
              },
            ],
          }),
        }}
      />

      {/* The Calculator Component */}
      <MissedCallCalculator />

      {/* Optional: FAQ Section for SEO (increases dwell time) */}
      <CalculatorFAQ />
    </main>
  );
}

// ============================================================================
// OPTIONAL FAQ SECTION (Boosts SEO)
// ============================================================================

function CalculatorFAQ() {
  const faqs = [
    {
      question: "How accurate is the missed call cost calculator?",
      answer:
        "The calculator provides estimates based on industry-standard conversion rates and your specific inputs. Actual results may vary based on your business, industry, and sales process.",
    },
    {
      question: "What is considered a 'missed call'?",
      answer:
        "A missed call is any incoming call that goes to voicemail, isn't answered, or is abandoned by the caller before reaching someone. This includes after-hours calls, calls during busy periods, and calls when staff is unavailable.",
    },
    {
      question: "How does Voice AI reduce missed calls?",
      answer:
        "Voice AI answers calls 24/7, qualifies leads, books appointments, and captures customer information even when your team is busy or unavailable. It ensures no call goes unanswered.",
    },
    {
      question: "What's a typical ROI for Voice AI?",
      answer:
        "Most businesses see 300-1000% ROI within the first month. The calculator shows your specific ROI based on your call volume, job value, and current close rate.",
    },
    {
      question: "Can I embed this calculator on my website?",
      answer:
        "Yes! Contact us for an embed code. The calculator is free to use and share. Perfect for resource pages, blog posts, and industry publications.",
    },
  ];

  return (
    <section className="section bg-background-darker relative">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-8 sm:mb-12 text-center">
            Calculator FAQ
          </h2>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="glass-premium p-6 sm:p-8 rounded-2xl group hover:border-accent/30 transition-all duration-300"
              >
                <summary className="font-semibold text-foreground text-base sm:text-lg cursor-pointer list-none flex items-center justify-between">
                  <span>{faq.question}</span>
                  <span
                    className="material-icons text-accent group-open:rotate-180 transition-transform"
                    aria-hidden="true"
                  >
                    expand_more
                  </span>
                </summary>
                <p className="mt-4 text-foreground-muted text-sm sm:text-base leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>

          {/* Schema markup for FAQ */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: faqs.map((faq) => ({
                  "@type": "Question",
                  name: faq.question,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: faq.answer,
                  },
                })),
              }),
            }}
          />
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// ALTERNATIVE: Embed the Calculator in an Existing Page
// ============================================================================

/**
 * Example: Add calculator to the pricing page
 *
 * File: src/app/pricing/page.tsx
 */

/*
import MissedCallCalculator from "@/components/features/MissedCallCalculator";
import PricingCards from "@/components/PricingCards";

export default function PricingPage() {
  return (
    <main>
      <section>
        <h1>Pricing</h1>
        <PricingCards />
      </section>

      {/* Calculator shows ROI before they see pricing *//*}
      <MissedCallCalculator />

      {/* Rest of pricing page... *//*}
    </main>
  );
}
*/

// ============================================================================
// ALTERNATIVE: Add Calculator to Blog Posts
// ============================================================================

/**
 * Example: Embed calculator in a blog post
 *
 * File: src/app/blog/[slug]/page.tsx
 */

/*
import MissedCallCalculator from "@/components/features/MissedCallCalculator";

export default function BlogPost() {
  return (
    <article>
      <h1>How Much Revenue Are You Losing from Missed Calls?</h1>

      <p>Every missed call is a lost opportunity...</p>

      {/* Embed calculator mid-article *//*}
      <div className="my-16">
        <MissedCallCalculator />
      </div>

      <p>As you can see from the calculator above...</p>
    </article>
  );
}
*/
