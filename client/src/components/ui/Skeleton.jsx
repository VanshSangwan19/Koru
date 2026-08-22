export function Skeleton({ className = "" }) {
  return (
    <div className={`animate-pulse rounded-xl bg-white/[0.04] ${className}`} aria-hidden />
  );
}

export function CardSkeleton() {
  return (
    <div className="card overflow-hidden">
      <Skeleton className="h-44 rounded-none" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}

export function Spinner({ className = "h-8 w-8" }) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={`animate-spin rounded-full border-2 border-white/10 border-t-accent ${className}`}
    />
  );
}