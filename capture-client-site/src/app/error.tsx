'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    if (process.env.NODE_ENV === 'development') {
      console.error('Application error:', error);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background-dark to-background px-4">
      <div className="text-center max-w-md">
        {/* Error icon */}
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto rounded-full bg-red-500/10 flex items-center justify-center">
            <AlertCircle className="text-red-500 w-9 h-9" />
          </div>
        </div>

        {/* Error message */}
        <h1 className="text-3xl font-bold text-white mb-4">
          Something went wrong
        </h1>
        <p className="text-gray-400 mb-8">
          We apologize for the inconvenience. An unexpected error occurred while loading this page.
        </p>

        {/* Error digest for debugging */}
        {error.digest && (
          <p className="text-xs text-gray-600 mb-6 font-mono">
            Error ID: {error.digest}
          </p>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-gradient-to-r from-[#00C9FF] to-[#D4AF37] text-white font-semibold rounded-full hover:opacity-90 transition-opacity"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 transition-colors border border-white/20"
          >
            Go Home
          </Link>
        </div>

        {/* Contact support */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-gray-500 text-sm mb-2">
            Need help? Contact our support team
          </p>
          <a
            href="tel:865-346-6111"
            className="text-[#00D4FF] hover:underline font-medium"
          >
            (865) 346-6111
          </a>
        </div>
      </div>
    </div>
  );
}
