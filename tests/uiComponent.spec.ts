import test, { expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/');
});

test.describe('Form layout page', () => {

  test.beforeEach(async ({ page }) => {
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
  });

  test('input fields', async ({ page }) => {
    const usingTheGridEmailInput = page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('textbox', {name: 'Email'});

    await usingTheGridEmailInput.fill('test@test.com');
    await usingTheGridEmailInput.clear();
    await usingTheGridEmailInput.pressSequentially('test2@test.com', {delay: 100});

    const inputValue = await usingTheGridEmailInput.inputValue();
    expect(inputValue).toEqual('test2@test.com');

    await expect(usingTheGridEmailInput).toHaveValue('test2@test.com');
  });

  test('radio buttons', async ({ page }) => {
    const usingTheGridForm = page.locator('nb-card', {hasText: 'Using the Grid'});

    // await usingTheGridForm.getByLabel('Option 1').check({force: true});
    await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).check({force: true});
    const radioStatus = await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).isChecked();
    expect(radioStatus).toBeTruthy();

    await expect(usingTheGridForm.getByRole('radio', {name: 'Option 1'})).toBeChecked();

    await usingTheGridForm.getByRole('radio', {name: 'Option 2'}).check({force: true});
    expect(await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).isChecked()).toBeFalsy();
    expect(await usingTheGridForm.getByRole('radio', {name: 'Option 2'}).isChecked()).toBeTruthy();
  });

});

test('checkboxes', async ({ page }) => {
  await page.getByText('Modal & Overlays').click();
  await page.getByText('Toastr').click();

  await page.getByRole('checkbox', {name: 'Hide on click'}).uncheck({force: true});
  await page.getByRole('checkbox', {name: 'Prevent arising of duplicate toast'}).check({force: true});

  const allBoxes = page.getByRole('checkbox');
  for (const box of await allBoxes.all()) {
    await box.uncheck({force: true});
    expect(await box.isChecked()).toBeFalsy();
  }
});

test('dropdowns', async ({ page }) => {
  const dropdownMenu = page.locator('ngx-header nb-select');
  await dropdownMenu.click();

  page.getByRole('list')  // UL tag
  page.getByRole('listitem') // LI tag

  const optionList = page.locator('nb-option-list nb-option');
  await expect(optionList).toHaveText(['Light', 'Dark', 'Cosmic', 'Corporate']);
  await optionList.filter({hasText: 'Cosmic'}).click();
  const header = page.locator('nb-layout-header');
  await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)');

  const colors = {
    Light: 'rgb(255, 255, 255)',
    Dark: 'rgb(34, 43, 69)',
    Cosmic: 'rgb(50, 50, 89)',
    Corporate: 'rgb(255, 255, 255)'
  };

  await dropdownMenu.click();
  for (const color in colors) {
    await optionList.filter({hasText: color}).click();
    await expect(header).toHaveCSS('background-color', colors[color]);
    if (color !== 'Corporate') {
      await dropdownMenu.click();
    }
  }
});

test('tooltip', async ({ page }) => {
  await page.getByText('Modal & Overlays').click();
  await page.getByText('Tooltip').click();

  const tooltipNbCard = page.locator('nb-card', {hasText: 'Tooltip Placements'});
  await tooltipNbCard.getByRole('button', {name: "Top"}).hover();

  await expect(page.locator('nb-tooltip')).toHaveText('This is a tooltip');
});

test('dialog box', async ({ page }) => {
  await page.getByText('Tables & Data').click();
  await page.getByText('Smart Table').click();


  page.on('dialog', async dialog => {
    expect(dialog.message()).toEqual('Are you sure you want to delete?');
    dialog.accept();
  });

  await page.getByRole('table').locator('tr', {hasText: 'mdo@gmail.com'}).locator('.nb-trash').click();

  await expect(page.locator('table tbody tr').first()).not.toHaveText('mdo@gmail.com');
});

test('web tables', async ({ page }) => {
  await page.getByText('Tables & Data').click();
  await page.getByText('Smart Table').click();

  const targetRow = page.getByRole('row').filter({hasText: 'twitter@outlook.com'});
  // const targetRow = page.getByRole('row', {hasText: 'twitter@outlook.com'});
  await targetRow.locator('.nb-edit').click();

  await page.locator('input-editor').getByPlaceholder('Age').clear();
  await page.locator('input-editor').getByPlaceholder('Age').fill('35');
  await page.locator('ng-checkmark').click();

  await page.locator('.ng2-smart-pagination-nav').getByText('2').click();
  const targetRowById = page.getByRole('row', {name: '11'}).filter({has: page.locator('td').nth(1).getByText('11')});
  await targetRowById.locator('.nb-edit').click();
  await page.locator('input-editor').getByPlaceholder('E-mail').clear();
  await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@test.com');
  await page.locator('ng-checkmark').click();

});

test('web tables2', async ({ page }) => {
  await page.getByText('Tables & Data').click();
  await page.getByText('Smart Table').click();

  // 進行 table 過濾測試
  const agesToFilter = ['20', '30', '40', '200'];
  for (const age of agesToFilter) {
    await page.locator('input-filter').getByPlaceholder('Age').clear();
    await page.locator('input-filter').getByPlaceholder('Age').fill(age);
    await page.waitForTimeout(500);
    const ageRows = page.locator('table tbody tr');

    for (const row of await ageRows.all()) {
      const cellValue = await row.locator('td').last().textContent();
      if (age === '200') {
        expect(await page.getByRole('table').textContent()).toContain('No data found');
        // expect(cellValue).not.toEqual('No data found');
      } else {
        expect(cellValue).toEqual(age);
      }
    }
  }
});

test('datepicker', async ({ page }) => {
  await page.getByText('Forms').click();
  await page.getByText('Datepicker').click();

  const calInputField = page.getByPlaceholder('Form Picker');
  await calInputField.click();

  await page.locator('.day-cell.ng-star-inserted:not(.bounding-month)').getByText('1', {exact: true}).click();

});

test('datepicker part2', async ({ page }) => {
  await page.getByText('Forms').click();
  await page.getByText('Datepicker').click();

  const calInputField = page.getByPlaceholder('Form Picker');
  await calInputField.click();

  const date = new Date();
  date.setDate(date.getDate() + 20);
  const expectDate = date.getDate().toString();
  const expectMonthShort = date.toLocaleString('en-US', {month: 'short'});
  const expectMonthLong = date.toLocaleString('en-US', {month: 'long'});
  const expectYear = date.getFullYear().toString();
  const dateToAssert = `${expectMonthShort} ${expectDate}, ${expectYear}`;

  let calMonthYear = await page.locator('nb-calendar-view-mode').textContent();
  const expectMonthAndYear = `${expectMonthLong} ${expectYear}`;

  while(!expectMonthAndYear.includes(calMonthYear.trim())) {
    await page.locator('nb-calendar-pageable-navigation button.next-month').click();
    calMonthYear = await page.locator('nb-calendar-view-mode').textContent();
  }

  await page.locator('.day-cell.ng-star-inserted:not(.bounding-month)').getByText(expectDate, {exact: true}).click();
  await expect(calInputField).toHaveValue(dateToAssert);
});
