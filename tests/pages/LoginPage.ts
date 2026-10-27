import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}          // ① receives the browser tab

  async open() {                              // ② action: open the screen
    await this.page.goto('https://www.saucedemo.com');
  }

  async login(user: string, pass: string) {   // ③ action: log in
    await this.page.getByPlaceholder('Username').fill(user);
    await this.page.getByPlaceholder('Password').fill(pass);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }
}