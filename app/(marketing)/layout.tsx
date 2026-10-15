import Link from 'next/link';
import type { ReactNode } from 'react';

import { publicEnv } from '@/config/env';

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="border-b border-border">
        <nav
          aria-label="Main"
          className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4"
        >
          <Link href="/" className="font-semibold">
            {publicEnv.NEXT_PUBLIC_APP_NAME}
          </Link>
          <Link href="/dashboard" className="text-sm font-medium text-primary underline">
            Dashboard
          </Link>
        </nav>
      </header>
      {children}
    </>
  );
}
