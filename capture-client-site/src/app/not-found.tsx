import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-slate-50 px-4">
      <div className="text-center max-w-md">
        {/* 404 graphic */}
        <div className="mb-8">
          <h1 className="text-8xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            404
          </h1>
        </div>

        {/* Error message */}
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Page Not Found</h2>
        <p className="text-slate-600 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        {/* Helpful links */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-full hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/25"
          >
            Go Home
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 bg-slate-100 text-slate-900 font-semibold rounded-full hover:bg-slate-200 transition-colors border border-slate-200"
          >
            Contact Us
          </Link>
        </div>

        {/* Quick links */}
        <div className="border-t border-slate-200 pt-8">
          <p className="text-slate-600 text-sm mb-4">Here are some helpful links:</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/services" className="text-blue-600 hover:underline">
              Services
            </Link>
            <Link href="/pricing" className="text-blue-600 hover:underline">
              Pricing
            </Link>
            <Link href="/features" className="text-blue-600 hover:underline">
              Features
            </Link>
            <Link href="/blog" className="text-blue-600 hover:underline">
              Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
