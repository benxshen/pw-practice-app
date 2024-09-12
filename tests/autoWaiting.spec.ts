import test, { expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://www.uitestingplayground.com/ajax');
  await page.getByText('Button Triggering AJAX Request').click();
});

test('auto-waiting', async ({ page }) => {
  const successButton = page.locator('.bg-success');

  // await successButton.waitFor({ state: 'attached' });
  await page.waitForLoadState('networkidle');

  await expect(successButton).toHaveText('Data loaded with AJAX get request.');
});

test('timeouts', async ({ page }) => {
  const successButton = page.locator('.bg-success');
  await successButton.click();
});
