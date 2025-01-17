import { expect, type Locator, type Page } from '@playwright/test';

export class PlaywrightSigninPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  dashboardlink: Locator;


  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.dashboardlink = page.locator('a', { hasText: 'Dashboard' });
  }

  async loginUser(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  
  }

  async navigateToDashboard() {
    await this.page.waitForSelector('text=Welcome To PKL Monitoring');
    await this.page.locator('a', { hasText: 'Dashboard' }).click();
  
  }
}
