import { submitContact } from './actions';
import { initialContactState } from './schema';

function form(values: Record<string, string>): FormData {
  const data = new FormData();
  for (const [key, value] of Object.entries(values)) data.set(key, value);
  return data;
}

describe('submitContact', () => {
  it('returns field errors for invalid input', async () => {
    const state = await submitContact(
      initialContactState,
      form({ name: '', email: 'nope', message: 'short' }),
    );
    expect(state.status).toBe('error');
    if (state.status !== 'error') return;
    expect(state.fieldErrors?.name).toEqual(['Enter your name']);
    expect(state.fieldErrors?.email).toEqual(['Enter a valid email address']);
    expect(state.fieldErrors?.message).toEqual(['Write at least 10 characters']);
  });

  it('succeeds for valid input', async () => {
    const state = await submitContact(
      initialContactState,
      form({ name: 'Ada', email: 'ada@example.com', message: 'Hello from the tests!' }),
    );
    expect(state).toEqual({ status: 'success', message: 'Thanks, Ada. We will reply soon.' });
  });

  it('trims whitespace before validating', async () => {
    const state = await submitContact(
      initialContactState,
      form({ name: '   ', email: 'ada@example.com', message: 'Hello from the tests!' }),
    );
    expect(state.status).toBe('error');
  });
});
