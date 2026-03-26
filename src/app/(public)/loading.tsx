export default function Loading() {
  return (
    <div className="min-h-[60vh] container max-w-6xl mx-auto px-4 py-16 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground font-mono-tech uppercase tracking-widest animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
