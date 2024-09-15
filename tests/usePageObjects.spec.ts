import test from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/');
});

test('navigate to form page by using page object model', async ({ page }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().formLayoutPage();
  await pm.navigateTo().datepickerPage();
  await pm.navigateTo().smartTablePage();
  await pm.navigateTo().toastrPage();
  await pm.navigateTo().tooltipPage();
});

test('parameterized test', async ({ page }) => {
  const pm = new PageManager(page);

  await pm.navigateTo().formLayoutPage();
  await pm.onFormLayoutsPage().submitUsingTheGrigdFormWithCredentiaIsAndSeIectOption(
    'tesdt@test.com',
    'Welcome1',
    'Option 2'
  );
  await pm.onFormLayoutsPage().sumbitIntineFormWithNameEmaitAndCheckbox(
    'John Smith',
    'John@test.com',
    true
  )
});

test('parameterized test - datepicker', async ({ page }) => {
  const pm = new PageManager(page);

  await pm.navigateTo().datepickerPage();
  await pm.onDatepickerPage().selectCommonDatepickerDateFromToday(2);
  await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(6, 5);
});
