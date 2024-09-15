import { Page } from '@playwright/test';

export class NavigationPage {

  constructor(private readonly page: Page) { }
  async formLayoutPage() {
    await this.selectGroupMenuItem('Forms');
    await this.page.getByText('Form Layouts').click();
  }

  async datepickerPage() {
    await this.selectGroupMenuItem('Forms');
    await this.page.getByText('Datepicker').click();
  }

  async smartTablePage() {
    await this.selectGroupMenuItem('Tables & Data');
    await this.page.getByText('Smart Table').click();
  }

  async toastrPage() {
    await this.selectGroupMenuItem('Modal & Overlays');
    await this.page.getByText('Toastr').click();
  }

  async tooltipPage() {
    await this.selectGroupMenuItem('Modal & Overlays');
    await this.page.getByText('Tooltip').click();
  }

  private async selectGroupMenuItem(groupItemTitle: string) {
    const groupMenuItem = this.page.getByTitle(groupItemTitle);
    const expandState = await groupMenuItem.getAttribute('aria-expanded');
    if (expandState === 'false') {
      await groupMenuItem.click();
    }

  }

}
