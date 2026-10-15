import { http, HttpResponse } from 'msw';

import type { HealthResponse } from '@/shared/api/schemas';

/** Default API mocks shared by unit and component tests. Override per test with server.use(). */
export const handlers = [
  http.get('*/api/health', () =>
    HttpResponse.json<HealthResponse>({ status: 'ok', timestamp: '2026-01-01T12:00:00.000Z' }),
  ),
];
