import { test, expect } from '@playwright/test';
import { PlaywrightDashboardPage } from './dashboard/dashboard';
import { PlaywrightSigninPage } from './auth/login';
import { PlaywrightRekapanLaporanPKLPage } from './laporan/laporan';
import { PlaywrightBuatLaporanPKLPage } from './laporan/create_laporan';
import { PlaywrightTanyaJawabPage } from './chat/tanyajawab';
import { PlaywrightEditLaporanPKLPage } from './laporan/edit_laporan';
import path from 'path';

const laporanId = '12345';

test.describe('PKL Reporting Tests', () => {
  let signinPage: PlaywrightSigninPage;
  let dashboardPage: PlaywrightDashboardPage;
  let rekapanLaporanPage: PlaywrightRekapanLaporanPKLPage;
  let buatLaporanPage: PlaywrightBuatLaporanPKLPage;
  let TanyaJawabPage: PlaywrightTanyaJawabPage;
  let  editLaporanPage : PlaywrightEditLaporanPKLPage;
  let laporanPage: PlaywrightRekapanLaporanPKLPage;
  let laporanForm : PlaywrightBuatLaporanPKLPage;

  test.beforeEach(async ({ page }) => {
    signinPage = new PlaywrightSigninPage(page);
    dashboardPage = new PlaywrightDashboardPage(page);
    rekapanLaporanPage = new PlaywrightRekapanLaporanPKLPage(page);
    buatLaporanPage = new PlaywrightBuatLaporanPKLPage(page);
    TanyaJawabPage = new PlaywrightTanyaJawabPage(page);
    editLaporanPage = new PlaywrightEditLaporanPKLPage(page);
    laporanPage = new PlaywrightRekapanLaporanPKLPage(page);
    laporanForm = new PlaywrightBuatLaporanPKLPage(page);
    
    await page.goto('http://localhost:8000/login');
    await signinPage.loginUser('siswa@example.com','password123');

    await page.goto('http://localhost:8000/siswa');
    
  });


  test('playwright dashboard', async ({ page })  => {
    await dashboardPage.checkDashboardHeader();
  });

  test('playwright report', async({page}) =>{
    
    await page.goto('http://localhost:8000/laporan');
    await rekapanLaporanPage.checkTitlle();
    await rekapanLaporanPage.checkLaporanTable();
  
    await dashboardPage.checkLaporanHeader();
    await rekapanLaporanPage.checkAddLaporanButton();
    await page.waitForURL('http://localhost:8000/laporan/create');

    await rekapanLaporanPage.createNewLaporan();
  });

  test('Playwright form submission with PDF upload', async ({ page }) => {
  const laporanPage = new PlaywrightBuatLaporanPKLPage(page);

 
  await laporanPage.page.goto('http://localhost:8000/laporan/create');
  

  await laporanPage.checkSidebar();
  await laporanPage.checkFormElements();

  await laporanPage.submitForm(
    'Felisha',
    'XII RPL 1',
    'Rekayasa Perangkat Lunak',
    '2025-01-17',
    'Mengembangkan aplikasi monitoring',
    'Membuat fitur upload file pada laporan',
  );

  const fileInputLocator = page.locator('input[type="file"]');
  await expect(fileInputLocator).toBeVisible();

  
  await fileInputLocator.setInputFiles(
    path.join(__dirname, './laporan/data/laporan_pkl.pdf')
  );

  
  const submitButton = page.locator('button[type="submit"]');
  await expect(submitButton).toBeVisible();
  await submitButton.click();

  
  await laporanPage.checkSuccessMessage();


  await page.goto('http://localhost:8000/laporan');
    await rekapanLaporanPage.checkTitlle();
    await rekapanLaporanPage.checkLaporanTable();
});

  

  // test('Edit Laporan PKL', async ({ page }) => {
  //   await page.goto('http://localhost:8000/pkl/edit/1'); 
  //   await editLaporanPage.verifySidebar();
  //   await editLaporanPage.verifyHeader();
  //   await editLaporanPage.submitEditForm();
  //   await editLaporanPage.navigateBackToRekap();
  // });

});


  

