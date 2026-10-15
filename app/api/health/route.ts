import { NextResponse } from 'next/server';

import type { HealthResponse } from '@/shared/api/schemas';

export const dynamic = 'force-dynamic';

export function GET(): NextResponse<HealthResponse> {
  return NextResponse.json(
    { status: 'ok', timestamp: new Date().toISOString() },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
