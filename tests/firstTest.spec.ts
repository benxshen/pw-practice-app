import {test} from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/');
});

// test('the first test', async ({ page }) => {
//   await page.getByText('Form Layouts').click();
// });

// test('navigate to datepicker page', async ({ page }) => {
//   await page.getByText('Datepicker').click();
// });

test.describe('test suite 1', () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText('Forms').click();
  });

  test('the first test', async ({ page }) => {
    await page.getByText('Form Layouts').click();
  });

  test('navigate to datepicker page', async ({ page }) => {
    await page.getByText('Datepicker').click();
  });
});

test.describe('test suite 2', () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText('Charts').click();
  });

  test('the first test2', async ({ page }) => {
    await page.getByText('Form Layouts').click();
  });

  test('navigate to datepicker page2', async ({ page }) => {
    await page.getByText('Datepicker').click();
  });
});
