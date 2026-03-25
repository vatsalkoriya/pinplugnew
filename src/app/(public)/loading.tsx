export default function Loading() {
  return (
    <div className="min-h-[60vh] container max-w-6xl mx-auto px-4 py-16">
      <div className="animate-pulse space-y-6">
        <div className="h-4 w-32 rounded bg-muted" />
        <div className="h-10 w-2/3 rounded bg-muted" />
        <div className="h-4 w-1/2 rounded bg-muted" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-48 rounded-lg bg-muted" />
          ))}
        </div>
      </div>
    </div>
  );
}
