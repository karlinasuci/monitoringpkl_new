import { expect, Locator, Page } from '@playwright/test';

export class PlaywrightRekapanLaporanPKLPage {
  readonly page: Page;
  readonly baseURL: string;
  readonly sidebar: Locator;
  readonly laporanTable: Locator;
  readonly addLaporanButton: Locator;
  readonly printPDFButton: Locator;
  readonly AddHeader: Locator;

 
  constructor(page: Page) {
    this.page = page;
    this.baseURL = 'http://localhost:8000/laporan';
    this.sidebar = page.locator('.sidebar-class');
    this.AddHeader = page.locator('h1:text("Rekapan Laporan PKL")');
    this.laporanTable = page.locator('.table');
    this.printPDFButton = page.locator('a.btn.btn-danger');
    this.addLaporanButton = page.locator('a.btn.btn-primary', { hasText: 'Tambah Laporan PKL' });
  }

  async navigateToPage() {
    await this.page.goto(this.baseURL);
  }

  async navigateToCreateLaporan() {
    await this.page.goto(`${this.baseURL}/create`);
  }

  async checkSidebar() {
    await expect(this.sidebar).toBeVisible;
}

  async checkTitlle() {
    await expect(this.page.getByText('Rekapan Laporan PKL')).toBeVisible();
  }

  async checkLaporanHeader() {
    await expect(this.AddHeader).toBeVisible(); 
    await this.page.waitForURL('http://localhost:8000/laporan', { timeout: 10000 }); 
  }

  async checkLaporanTable() {
    await expect(this.laporanTable).toBeVisible();
    const rows = await this.laporanTable.locator('tbody tr').count();
    expect(rows).toBeGreaterThan(0);
  }

  async checkAddLaporanButton() {
    await expect(this.addLaporanButton).toBeVisible();
    await this.addLaporanButton.click();
    await this.page.waitForURL('http://localhost:8000/laporan/create');
  }

  async checkPrintPDFButton() {
    await expect(this.printPDFButton).toBeVisible();
  }

  async createNewLaporan() {
    await this.page.waitForURL(`${this.baseURL}/create`);
  }

  async donwloadLaporanPDF() {
    await this.printPDFButton.click();
  }

  async deleteLaporan(laporanId: string) {
    const deleteButton = this.page.locator(`form[action*="${laporanId}"] button[type="submit"]`);
    await deleteButton.click();
    await this.page.locator('text=Confirm').click(); 
    await expect(this.page.locator(`form[action*="${laporanId}"]`)).toBeHidden();
  }

  async editLaporan(laporanId: string, string: any) {
    const editButton = this.page.locator(`a[href*="laporan/${laporanId}/edit"]`);
    await editButton.click();
   
  }

  

  
  async confirmDelete() {
    await this.page.locator('text=Confirm').click(); 
  }

  async checkTableIsEmpty() {
    const rows = await this.laporanTable.locator('tbody tr').count();
    expect(rows).toBe(0); 
  }
}
