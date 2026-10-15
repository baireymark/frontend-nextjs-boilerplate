'use server';

import { z } from 'zod';

import { parseServerEnv } from '@/config/env';
import { contactSchema, type ContactFormState } from './schema';

/**
 * Validates the contact form on the server. Client-side checks are a
 * convenience; this is the trust boundary.
 */
export async function submitContact(
  _previous: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!parsed.success) {
    return {
      status: 'error',
      message: 'Please fix the highlighted fields.',
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  const { CONTACT_WEBHOOK_URL } = parseServerEnv(process.env);
  if (CONTACT_WEBHOOK_URL) {
    const response = await fetch(CONTACT_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed.data),
    });
    if (!response.ok) {
      // Log the status only; the submission itself may contain personal data.
      console.error('Contact webhook failed', { status: response.status });
      return { status: 'error', message: 'We could not send your message. Try again later.' };
    }
  }

  return { status: 'success', message: `Thanks, ${parsed.data.name}. We will reply soon.` };
}
