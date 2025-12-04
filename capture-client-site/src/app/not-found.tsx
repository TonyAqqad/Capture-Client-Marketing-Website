import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black px-4">
      <div className="text-center max-w-md">
        {/* 404 graphic */}
        <div className="mb-8">
          <h1 className="text-8xl font-bold bg-gradient-to-r from-[#00D4FF] to-[#7B2CBF] bg-clip-text text-transparent">
            404
          </h1>
        </div>

        {/* Error message */}
        <h2 className="text-2xl font-bold text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-400 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        {/* Helpful links */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="px-6 py-3 bg-gradient-to-r from-[#00D4FF] to-[#7B2CBF] text-white font-semibold rounded-full hover:opacity-90 transition-opacity"
          >
            Go Home
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 transition-colors border border-white/20"
          >
            Contact Us
          </Link>
        </div>

        {/* Quick links */}
        <div className="border-t border-gray-800 pt-8">
          <p className="text-gray-500 text-sm mb-4">
            Here are some helpful links:
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/services" className="text-[#00D4FF] hover:underline">
              Services
            </Link>
            <Link href="/pricing" className="text-[#00D4FF] hover:underline">
              Pricing
            </Link>
            <Link href="/features" className="text-[#00D4FF] hover:underline">
              Features
            </Link>
            <Link href="/blog" className="text-[#00D4FF] hover:underline">
              Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
