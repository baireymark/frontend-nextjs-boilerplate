import { z } from 'zod';

/**
 * Environment variables, validated once at startup (see instrumentation.ts).
 *
 * - Server variables never reach the browser bundle.
 * - Public variables must start with NEXT_PUBLIC_ and be read with a literal
 *   `process.env.NEXT_PUBLIC_*` expression so Next.js can inline them.
 */
const serverSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  CONTACT_WEBHOOK_URL: z.url().optional(),
});

const publicSchema = z.object({
  NEXT_PUBLIC_APP_NAME: z.string().min(1).default('Next.js Boilerplate'),
  NEXT_PUBLIC_APP_URL: z.url().default('http://localhost:3000'),
});

export type ServerEnv = z.infer<typeof serverSchema>;
export type PublicEnv = z.infer<typeof publicSchema>;

function formatIssues(error: z.ZodError): string {
  return error.issues.map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`).join('\n');
}

export function parseServerEnv(source: Record<string, string | undefined>): ServerEnv {
  const result = serverSchema.safeParse(source);
  if (!result.success) {
    throw new Error(`Invalid server environment variables:\n${formatIssues(result.error)}`);
  }
  return result.data;
}

export function parsePublicEnv(source: Record<string, string | undefined>): PublicEnv {
  const result = publicSchema.safeParse(source);
  if (!result.success) {
    throw new Error(`Invalid public environment variables:\n${formatIssues(result.error)}`);
  }
  return result.data;
}

export const publicEnv: PublicEnv = parsePublicEnv({
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
});
