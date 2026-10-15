import Link from 'next/link';
import type { ReactNode } from 'react';

export default function AppLayout({ children }: { children: ReactNode }) {
  // Add the auth check for signed-in pages here (or in proxy.ts) once an
  // identity provider is chosen.
  return (
    <div className="min-h-dvh">
      <header className="border-b border-border bg-surface">
        <nav aria-label="App" className="mx-auto flex max-w-5xl items-center gap-6 px-6 py-4">
          <Link href="/" className="font-semibold">
            Home
          </Link>
          <Link href="/dashboard" className="text-sm" aria-current="page">
            Dashboard
          </Link>
        </nav>
      </header>
      {children}
    </div>
  );
}
