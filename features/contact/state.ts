import type { ContactInput } from './schema';

// Kept out of schema.ts so the client form can import its initial state
// without pulling Zod into the browser bundle.

export type ContactFormState =
  | { status: 'idle' }
  | { status: 'success'; message: string }
  | {
      status: 'error';
      message: string;
      fieldErrors?: Partial<Record<keyof ContactInput, string[]>>;
    };

export const initialContactState: ContactFormState = { status: 'idle' };
