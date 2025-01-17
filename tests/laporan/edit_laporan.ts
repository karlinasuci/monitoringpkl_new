import { expect, Locator, Page } from '@playwright/test';

export class PlaywrightEditLaporanPKLPage {
  readonly page: Page;
  readonly sidebar: Locator;
  readonly header: Locator;
  readonly studentNameInput: Locator;
  readonly classInput: Locator;
  readonly majorInput: Locator;
  readonly reportDateInput: Locator;
  readonly activityInput: Locator;
  readonly descriptionInput: Locator;
  readonly fileUploadInput: Locator;
  readonly updateButton: Locator;
  readonly backButton: Locator;
  readonly deleteButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.sidebar = page.locator('.sidebar');
    this.header = page.locator('h1', { hasText: 'Edit Laporan PKL' });

    this.studentNameInput = page.locator('input[name="student_name"]');
    this.classInput = page.locator('input[name="class"]');
    this.majorInput = page.locator('input[name="major"]');
    this.reportDateInput = page.locator('input[name="report_date"]');
    this.activityInput = page.locator('input[name="activity"]');
    this.descriptionInput = page.locator('textarea[name="description"]');
    this.fileUploadInput = page.locator('input[name="file"]');

    this.updateButton = page.locator('button.btn-primary');
    this.backButton = page.locator('a.btn-link', { hasText: 'Kembali ke Rekapan Laporan' });
    this.deleteButton = page.locator('form button.btn-danger');
  }

  async verifySidebar() {
    await expect(this.sidebar).toBeVisible();
  }

  async verifyHeader() {
    await expect(this.header).toBeVisible();
  }

  async fillEditForm(data: {
    studentName: string;
    class: string;
    major: string;
    reportDate: string;
    activity: string;
    description: string;
    filePath?: string;
  }) {
    await this.studentNameInput.fill(data.studentName);
    await this.classInput.fill(data.class);
    await this.majorInput.fill(data.major);
    await this.reportDateInput.fill(data.reportDate);
    await this.activityInput.fill(data.activity);
    await this.descriptionInput.fill(data.description);

    if (data.filePath) {
      await this.fileUploadInput.setInputFiles(data.filePath);
    }
  }

  async submitEditForm() {
    await this.updateButton.click();
  }

  async navigateBackToRekap() {
    await this.backButton.click();
  }

  async deleteLaporan() {
    await this.deleteButton.click();
    await this.page.waitForSelector('form', { state: 'detached' });
  }
}
