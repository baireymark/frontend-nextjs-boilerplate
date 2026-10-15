import { buildContentSecurityPolicy } from './proxy';

describe('buildContentSecurityPolicy', () => {
  it('blocks eval and inline scripts in production', () => {
    const csp = buildContentSecurityPolicy('abc123', false);
    expect(csp).toContain(`script-src 'self' 'nonce-abc123' 'strict-dynamic'`);
    expect(csp).not.toContain('unsafe-eval');
    expect(csp).not.toContain('unsafe-inline');
    expect(csp).toContain(`frame-ancestors 'none'`);
  });

  it('allows eval only in development', () => {
    expect(buildContentSecurityPolicy('abc123', true)).toContain(`'unsafe-eval'`);
  });
});
