'use client';

import { useActionState } from 'react';

import { Button, TextAreaField, TextField } from '@/shared/ui';
import { submitContact } from '../actions';
import { initialContactState } from '../schema';

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialContactState);
  const fieldErrors = state.status === 'error' ? state.fieldErrors : undefined;

  return (
    <form action={formAction} className="mt-6 space-y-4" noValidate>
      <TextField label="Name" name="name" autoComplete="name" error={fieldErrors?.name?.[0]} />
      <TextField
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        error={fieldErrors?.email?.[0]}
      />
      <TextAreaField label="Message" name="message" error={fieldErrors?.message?.[0]} />
      <Button type="submit" loading={pending}>
        Send message
      </Button>
      <p
        role="status"
        className={state.status === 'error' ? 'text-sm text-danger' : 'text-sm text-success'}
      >
        {state.status === 'idle' ? '' : state.message}
      </p>
    </form>
  );
}
