import { expect, type Locator, type Page } from '@playwright/test';

export class PlaywrightDashboardPage {
  readonly page: Page;
  readonly sidebar: Locator;
  readonly dashboardHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sidebar = page.locator('.sidebar-class');
  }

  // async checkSidebar() {
  //   await this.page.waitForLoadState('domcontentloaded'); 
  //   await this.page.waitForSelector('.sidebar-class', { timeout: 10000 }); 
  //   await expect(this.sidebar).toBeVisible(); 
  // }

  async checkDashboardHeader() {
    await this.page.waitForSelector('h1:text("Welcome to PKL Monitoring")', { timeout: 10000 });

  }

  async checkLaporanHeader() {
    await this.page.waitForURL('http://localhost:8000/laporan', { timeout: 10000 }); 
  }
}
