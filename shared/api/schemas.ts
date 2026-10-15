import { z } from 'zod';

/** Response schemas shared by route handlers and their callers. */
export const healthResponseSchema = z.object({
  status: z.literal('ok'),
  timestamp: z.iso.datetime(),
});

export type HealthResponse = z.infer<typeof healthResponseSchema>;
