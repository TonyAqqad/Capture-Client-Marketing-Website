import { LightTextDemo } from "@/components/LightTextDemo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text Agent Demo - Capture Client",
  description: "Experience our AI text agent in action. See how it handles customer inquiries with natural conversation.",
  openGraph: {
    title: "Text Agent Demo - Capture Client",
    description: "Experience our AI text agent in action. See how it handles customer inquiries with natural conversation.",
    url: "https://captureclient.com/demo-text",
    siteName: "Capture Client",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Text Agent Demo - Capture Client",
    description: "Experience our AI text agent in action. See how it handles customer inquiries with natural conversation.",
  },
  alternates: {
    canonical: "https://captureclient.com/demo-text",
  },
};

export default function DemoTextPage() {
  return (
    <main className="relative min-h-screen bg-slate-50">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-slate-50" />
        <div
          className="absolute -top-[20%] -right-[10%] w-[700px] h-[700px]"
          style={{
            background: "radial-gradient(circle at center, rgba(37, 99, 235, 0.08) 0%, rgba(37, 99, 235, 0.03) 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px]"
          style={{
            background: "radial-gradient(circle at center, rgba(14, 165, 233, 0.06) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 pt-32 pb-20">
        <div className="container-custom">
          {/* Page header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-4">
              AI Text Agent
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Experience how our AI handles customer conversations with natural, intelligent responses.
            </p>
          </div>

          {/* Demo component */}
          <LightTextDemo />

          {/* Additional info */}
          <div className="mt-16 text-center">
            <p className="text-slate-600 mb-4">
              This is a preview of how our AI text agent interacts with your customers.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 shadow-lg shadow-blue-500/25"
            >
              Get Started Today
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
