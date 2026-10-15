import { expect, test } from './fixtures';

test.describe('home page', () => {
  test('renders, passes accessibility checks, and has no CSP violations', async ({
    page,
    checkA11y,
    cspViolations,
  }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Ship features, not setup');
    await checkA11y();
    expect(cspViolations).toEqual([]);
  });

  test('sends a strict CSP and security headers', async ({ request }) => {
    const response = await request.get('/');
    const headers = response.headers();
    expect(headers['content-security-policy']).toContain("'strict-dynamic'");
    expect(headers['content-security-policy']).not.toContain('unsafe-eval');
    expect(headers['x-content-type-options']).toBe('nosniff');
    expect(headers['x-powered-by']).toBeUndefined();
  });

  test('contact form validates on the server and succeeds with valid input', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Send message' }).click();
    await expect(page.getByRole('status')).toHaveText('Please fix the highlighted fields.');
    await expect(page.getByLabel('Email')).toHaveAttribute('aria-invalid', 'true');

    await page.getByLabel('Name').fill('Ada');
    await page.getByLabel('Email').fill('ada@example.com');
    await page.getByLabel('Message').fill('Hello from Playwright!');
    await page.getByRole('button', { name: 'Send message' }).click();
    await expect(page.getByRole('status')).toHaveText('Thanks, Ada. We will reply soon.');
  });

  test('is keyboard navigable from the skip link', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  });
});
