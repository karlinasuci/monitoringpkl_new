import { expect, Locator, Page } from '@playwright/test';

export class PlaywrightBuatLaporanPKLPage {
  readonly page: Page;
  readonly sidebar: Locator;
  readonly formTitle: Locator;
  readonly studentNameInput: Locator;
  readonly classInput: Locator;
  readonly majorInput: Locator;
  readonly reportDateInput: Locator;
  readonly activityInput: Locator;
  readonly descriptionTextarea: Locator;
  readonly fileInput: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sidebar = page.locator('.sidebar');
    this.formTitle = page.locator('.form-title');
    this.studentNameInput = page.locator('input[name="student_name"]');
    this.classInput = page.locator('input[name="class"]');
    this.majorInput = page.locator('input[name="major"]');
    this.reportDateInput = page.locator('input[name="report_date"]');
    this.activityInput = page.locator('input[name="activity"]');
    this.descriptionTextarea = page.locator('textarea[name="description"]');
    this.fileInput = page.locator('input[name="file"]');
    this.submitButton = page.locator('button[type="submit"]');
    this.successMessage = page.locator('.alert.alert-success');
  }

  async checkSidebar() {
    await expect(this.sidebar).toBeVisible();
  }

  async checkFormElements() {
    await expect(this.formTitle).toBeVisible();
    await expect(this.studentNameInput).toBeVisible();
    await expect(this.classInput).toBeVisible();
    await expect(this.majorInput).toBeVisible();
    await expect(this.reportDateInput).toBeVisible();
    await expect(this.activityInput).toBeVisible();
    await expect(this.descriptionTextarea).toBeVisible();
    await expect(this.fileInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  async submitForm(studentName: string, studentClass: string, major: string, reportDate: string, activity: string, description: string, filePath?: string) {
    await this.studentNameInput.fill(studentName);
    await this.classInput.fill(studentClass);
    await this.majorInput.fill(major);
    await this.reportDateInput.fill(reportDate);
    await this.activityInput.fill(activity);
    await this.descriptionTextarea.fill(description);
    if(filePath) await this.fileInput.setInputFiles(filePath);
    await this.submitButton.click();
    
  }

  async checkSuccessMessage() {
    await expect(this.successMessage).toBeVisible();
    await expect(this.successMessage).toContainText('Laporan PKL berhasil dikirim');
  }

  
}
