export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`
        animate-shimmer bg-gradient-to-r
        from-white/5 via-white/10 to-white/5
        bg-[length:200%_100%] rounded-lg
        ${className}
      `}
    />
  );
}

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`glass p-6 rounded-2xl ${className}`}>
      <Skeleton className="h-12 w-12 rounded-xl mb-4" />
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}
