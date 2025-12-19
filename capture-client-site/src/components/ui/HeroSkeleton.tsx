/**
 * CRITICAL RENDERING PATH OPTIMIZATION
 * Lightweight skeleton loader for hero section
 * Shows immediately while heavy components (framer-motion) load
 */

export function HeroSkeleton() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50 w-full">
      {/* Minimal background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-slate-50 to-accent/10" />

      {/* Content skeleton */}
      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge skeleton */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 mb-6 animate-pulse">
          <div className="w-2 h-2 bg-accent/50 rounded-full" />
          <div className="h-3 w-32 bg-slate-100 rounded" />
        </div>

        {/* Heading skeleton */}
        <div className="mb-6 space-y-3">
          <div className="h-12 sm:h-16 md:h-20 bg-slate-100 rounded-lg mx-auto max-w-4xl animate-pulse" />
          <div className="h-12 sm:h-16 md:h-20 bg-slate-100 rounded-lg mx-auto max-w-3xl animate-pulse" style={{ animationDelay: '100ms' }} />
        </div>

        {/* Subheading skeleton */}
        <div className="mb-8 space-y-2 max-w-2xl mx-auto">
          <div className="h-6 bg-slate-100 rounded mx-auto animate-pulse" style={{ animationDelay: '200ms' }} />
          <div className="h-6 bg-slate-100 rounded mx-auto max-w-md animate-pulse" style={{ animationDelay: '300ms' }} />
        </div>

        {/* CTA buttons skeleton */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <div className="h-14 w-48 bg-gradient-to-r from-accent/20 to-primary/20 rounded-xl animate-pulse" />
          <div className="h-14 w-40 bg-slate-100 border border-slate-200 rounded-xl animate-pulse" style={{ animationDelay: '100ms' }} />
        </div>

        {/* Stats skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="glass-premium p-4 rounded-xl animate-pulse" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="h-8 bg-slate-100 rounded mb-2" />
              <div className="h-4 bg-slate-100 rounded w-3/4 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
