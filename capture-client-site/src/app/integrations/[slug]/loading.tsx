/**
 * Loading state for integration detail pages
 * Premium skeleton UI with glassmorphic design
 */

export default function IntegrationDetailLoading() {
  return (
    <div className="relative min-h-screen w-full bg-white">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-accent/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-radial from-primary/10 to-transparent rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Skeleton */}
        <div className="pt-24 sm:pt-32 pb-16 sm:pb-20">
          <div className="max-w-4xl mx-auto">
            {/* Logo Skeleton */}
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-slate-100/50 backdrop-blur-sm rounded-2xl border border-slate-200 animate-pulse" />
            </div>

            {/* Title Skeleton */}
            <div className="h-12 bg-slate-100/50 backdrop-blur-sm rounded-lg mb-6 max-w-2xl mx-auto animate-pulse" />

            {/* Description Skeleton */}
            <div className="space-y-3 mb-8">
              <div className="h-4 bg-slate-100/50 backdrop-blur-sm rounded max-w-3xl mx-auto animate-pulse" />
              <div className="h-4 bg-slate-100/50 backdrop-blur-sm rounded max-w-2xl mx-auto animate-pulse" />
            </div>

            {/* CTA Buttons Skeleton */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <div className="h-14 w-full sm:w-48 bg-slate-100/50 backdrop-blur-sm rounded-xl animate-pulse" />
              <div className="h-14 w-full sm:w-48 bg-slate-100/50 backdrop-blur-sm rounded-xl animate-pulse" />
            </div>

            {/* Tags Skeleton */}
            <div className="flex flex-wrap gap-2 justify-center">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-8 w-24 bg-slate-100/50 backdrop-blur-sm rounded-full animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Features Section Skeleton */}
        <div className="py-16 sm:py-20">
          <div className="text-center mb-12">
            <div className="h-10 bg-slate-100/50 backdrop-blur-sm rounded-lg mb-4 max-w-md mx-auto animate-pulse" />
            <div className="h-4 bg-slate-100/50 backdrop-blur-sm rounded max-w-xl mx-auto animate-pulse" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="p-6 bg-slate-100/50 backdrop-blur-sm rounded-xl border border-slate-200 animate-pulse"
              >
                <div className="w-12 h-12 bg-slate-200/50 rounded-xl mb-4" />
                <div className="h-6 bg-slate-200/50 rounded mb-3 w-3/4" />
                <div className="h-4 bg-slate-200/50 rounded w-full" />
              </div>
            ))}
          </div>
        </div>

        {/* How It Works Section Skeleton */}
        <div className="py-16 sm:py-20">
          <div className="text-center mb-12">
            <div className="h-10 bg-slate-100/50 backdrop-blur-sm rounded-lg mb-4 max-w-md mx-auto animate-pulse" />
            <div className="h-4 bg-slate-100/50 backdrop-blur-sm rounded max-w-xl mx-auto animate-pulse" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <div className="w-16 h-16 bg-slate-100/50 backdrop-blur-sm rounded-full mx-auto animate-pulse" />
                <div className="h-6 bg-slate-100/50 backdrop-blur-sm rounded mx-auto w-3/4 animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 bg-slate-100/50 backdrop-blur-sm rounded animate-pulse" />
                  <div className="h-4 bg-slate-100/50 backdrop-blur-sm rounded w-5/6 mx-auto animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section Skeleton */}
        <div className="py-16 sm:py-20">
          <div className="text-center mb-12">
            <div className="h-10 bg-slate-100/50 backdrop-blur-sm rounded-lg mb-4 max-w-md mx-auto animate-pulse" />
          </div>

          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 bg-slate-100/50 backdrop-blur-sm rounded-lg border border-slate-200 animate-pulse"
              >
                <div className="w-6 h-6 bg-slate-200/50 rounded-full flex-shrink-0" />
                <div className="h-5 bg-slate-200/50 rounded flex-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Related Integrations Skeleton */}
        <div className="py-16 sm:py-20">
          <div className="text-center mb-12">
            <div className="h-10 bg-slate-100/50 backdrop-blur-sm rounded-lg mb-4 max-w-md mx-auto animate-pulse" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="p-6 bg-slate-100/50 backdrop-blur-sm rounded-xl border border-slate-200 animate-pulse"
              >
                <div className="w-16 h-16 bg-slate-200/50 rounded-xl mb-4 mx-auto" />
                <div className="h-6 bg-slate-200/50 rounded mb-2" />
                <div className="h-4 bg-slate-200/50 rounded w-3/4 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
