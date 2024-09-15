import { expect, Page } from "@playwright/test";

export class DatepickerPage {

    constructor(private readonly page: Page) {
    }

    async selectCommonDatepickerDateFromToday(daysFromToday: number) {
        const calendarInputField = this.page.getByPlaceholder('Form Picker');
        await calendarInputField.click();

        const dateToAssert = await this.selectDateInTheCalendar(daysFromToday);
        await expect(calendarInputField).toHaveValue(dateToAssert);

    }

    /**
     * This method selects a date range from today
     * @param daysFromToday - the number of days from today to start the range
     * @param daysToSelect - the number of days to select in the range
     */
    async selectDatepickerWithRangeFromToday(daysFromToday: number, daysToSelect: number) {
      const calendarInputField = this.page.getByPlaceholder('Range Picker');
      await calendarInputField.click();
      const dateToAssertStart = await this.selectDateInTheCalendar(daysFromToday);
      const dateToAssertEnd = await this.selectDateInTheCalendar(daysFromToday + daysToSelect - 1);
      const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`;
      await expect(calendarInputField).toHaveValue(dateToAssert);
    }

    // 提出共用的方法。這在先前的課程中，是直接寫在測試案例中的。現在我們將它提取到 page object 中。
    private async selectDateInTheCalendar(daysFromToday: number) {
      const date = new Date();
        date.setDate(date.getDate() + daysFromToday);
        const expectedDate = date.getDate().toString();
        const expectedMonthShort = date.toLocaleString('En-US', { month: 'short' });
        const expectedMonthLong = date.toLocaleString('En-US', { month: 'long' });
        const expectedYear = date.getFullYear().toString();
        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;

        let calendatMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent();
        const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`;
        while(!calendatMonthAndYear.includes(expectedMonthAndYear)) {
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click();
            calendatMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent();
        };

        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, {exact: true}).click();

        return dateToAssert;
    }
}
