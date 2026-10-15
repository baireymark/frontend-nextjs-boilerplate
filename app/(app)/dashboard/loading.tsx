export default function Loading() {
  return (
    <main id="main" className="mx-auto max-w-5xl px-6 py-12" aria-busy="true">
      <div className="h-8 w-48 animate-pulse rounded bg-border" />
      <span className="sr-only">Loading dashboard</span>
    </main>
  );
}
