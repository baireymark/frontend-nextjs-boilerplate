import { expect, test } from './fixtures';

test('dashboard shows live API status', async ({ page, checkA11y, cspViolations }) => {
  await page.goto('/dashboard');
  await expect(page.getByText('Operational')).toBeVisible();

  const toggle = page.getByRole('button', { name: /auto-refresh/i });
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');

  await checkA11y();
  expect(cspViolations).toEqual([]);
});
