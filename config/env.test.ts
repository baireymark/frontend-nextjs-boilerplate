import { parsePublicEnv, parseServerEnv } from './env';

describe('parseServerEnv', () => {
  it('applies defaults when optional values are missing', () => {
    expect(parseServerEnv({})).toEqual({ NODE_ENV: 'development' });
  });

  it('rejects an invalid webhook URL with a readable message', () => {
    expect(() => parseServerEnv({ CONTACT_WEBHOOK_URL: 'not-a-url' })).toThrow(
      /CONTACT_WEBHOOK_URL/,
    );
  });
});

describe('parsePublicEnv', () => {
  it('accepts a valid app URL', () => {
    const env = parsePublicEnv({ NEXT_PUBLIC_APP_URL: 'https://example.com' });
    expect(env.NEXT_PUBLIC_APP_URL).toBe('https://example.com');
  });
});
