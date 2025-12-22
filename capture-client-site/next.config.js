/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack configuration
  turbopack: {
    root: __dirname,
  },

  // CRITICAL: Experimental optimizations for better FCP
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
    // Enable optimized font loading
    optimizeCss: true,
    // Note: instrumentationHook is no longer needed in Next.js 16+
    // instrumentation.ts is automatically detected
  },

  // Image optimization - AVIF first, then WebP for better compression
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "logo.clearbit.com",
      },
      {
        protocol: "https",
        hostname: "excelpayments.com",
      },
    ],
  },

  // Enable compression for all responses
  compress: true,

  // CRITICAL: Compiler optimizations for faster builds and smaller bundles
  compiler: {
    // Remove console logs in production for smaller bundle
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"],
          }
        : false,
  },

  // CRITICAL: Caching headers for static assets
  async headers() {
    return [
      {
        // Cache static images for 1 year (immutable)
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|ico|gif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache JS and CSS with immutable flag
        source: "/:all*(js|css)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Preload fonts
        source: "/_next/static/media/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Security headers
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  // Production optimizations
  reactStrictMode: true,

  // Power optimizations for bundle size
  poweredByHeader: false,

  // SEO: Redirect www to non-www (canonical domain) + industry consolidation
  async redirects() {
    return [
      // www to non-www redirect
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.captureclient.com",
          },
        ],
        destination: "https://captureclient.com/:path*",
        permanent: true,
      },
      // Industry consolidation redirects (301 permanent)
      // Consolidates /industries/* routes to /who-we-serve/* for SEO
      {
        source: "/industries",
        destination: "/who-we-serve",
        permanent: true,
      },
      {
        source: "/industries/home-services",
        destination: "/who-we-serve/home-services",
        permanent: true,
      },
      {
        source: "/industries/healthcare",
        destination: "/who-we-serve/healthcare",
        permanent: true,
      },
      {
        source: "/industries/legal",
        destination: "/who-we-serve/legal-law-firms",
        permanent: true,
      },
      {
        source: "/industries/real-estate",
        destination: "/who-we-serve/real-estate",
        permanent: true,
      },
      {
        source: "/industries/automotive",
        destination: "/who-we-serve/automotive",
        permanent: true,
      },
      {
        source: "/industries/restaurants",
        destination: "/who-we-serve/restaurants",
        permanent: true,
      },
      {
        source: "/industries/fitness",
        destination: "/who-we-serve/fitness",
        permanent: true,
      },
      {
        source: "/industries/martial-arts",
        destination: "/who-we-serve/martial-arts",
        permanent: true,
      },
      {
        source: "/industries/dental",
        destination: "/who-we-serve/dental",
        permanent: true,
      },
      {
        source: "/industries/med-spa",
        destination: "/who-we-serve/med-spa",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
