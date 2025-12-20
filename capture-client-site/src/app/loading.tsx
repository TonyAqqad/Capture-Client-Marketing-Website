export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-slate-50">
      <div className="text-center">
        {/* Logo pulse animation */}
        <div className="relative mb-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#00C9FF] to-[#2563EB] animate-pulse" />
          <div className="absolute inset-0 w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#00C9FF] to-[#2563EB] opacity-50 blur-xl animate-pulse" />
        </div>

        {/* Loading text */}
        <h2 className="text-xl font-semibold text-slate-900 mb-2">
          Loading...
        </h2>
        <p className="text-slate-600 text-sm">
          Preparing your experience
        </p>

        {/* Loading dots - using Tailwind animations */}
        <div className="mt-6 flex items-center justify-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#00C9FF] to-[#2563EB] animate-bounce [animation-delay:-0.3s]" />
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#00C9FF] to-[#2563EB] animate-bounce [animation-delay:-0.15s]" />
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#00C9FF] to-[#2563EB] animate-bounce" />
        </div>
      </div>
    </div>
  );
}
