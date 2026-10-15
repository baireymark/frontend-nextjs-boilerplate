import type { Metadata } from 'next';

import { StatusCard } from '@/features/status';

export const metadata: Metadata = { title: 'Dashboard' };

export default function DashboardPage() {
  return (
    <main id="main" className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      <p className="mt-2 text-fg-muted">
        An example of client-side data fetching with TanStack Query and shared UI state with
        Zustand.
      </p>
      <div className="mt-8 max-w-md">
        <StatusCard />
      </div>
    </main>
  );
}
