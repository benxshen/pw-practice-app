import { Page } from '@playwright/test';

export class FormLayoutsPage {

  constructor(private readonly page: Page) { }

  async submitUsingTheGrigdFormWithCredentiaIsAndSeIectOption(email: string, password: string, optionText: string) {
    const usingTheGridForm = this.page.locator('nb-card', { hasText: 'Using the Grid' });
    await usingTheGridForm.getByRole('textbox', { name: 'Email' }).fill(email);
    await usingTheGridForm.getByRole('textbox', { name: 'Password' }).fill(password);
    await usingTheGridForm.getByRole('radio', { name: optionText }).check({ force: true });
    await usingTheGridForm.getByRole('button', {name: 'SIGN IN'}).click();
  }

  /**
   * This method fills the inline form with the given name, email and rememberMe value
   * @param name - should be first and last name
   * @param email - valid email for the test user
   * @param rememberMe - boolean value to check the remember me checkbox
   */
  async sumbitIntineFormWithNameEmaitAndCheckbox(name: string, email: string, rememberMe: boolean) {
    const inlineForm = this.page.locator('nb-card', { hasText: 'Inline form' });
    await inlineForm.getByRole('textbox', { name: 'Jane Doe' }).fill(name);
    await inlineForm.getByRole('textbox', { name: 'Email' }).fill(email);
    if (rememberMe) {
      await inlineForm.getByRole('checkbox', { name: 'Remember me' }).check({ force: true });
    }
    await inlineForm.getByRole('button', {name: 'SUBMIT'}).click();
  }

}
