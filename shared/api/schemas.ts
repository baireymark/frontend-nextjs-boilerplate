import * as z from 'zod/mini';

/**
 * Response schemas shared by route handlers and their callers. Callers run in
 * the browser, so these use zod/mini: classic Zod ships whole (about 90 KB
 * compressed) and probes for eval, which the CSP reports as a violation.
 */
export const healthResponseSchema = z.object({
  status: z.literal('ok'),
  timestamp: z.iso.datetime(),
});

export type HealthResponse = z.infer<typeof healthResponseSchema>;
