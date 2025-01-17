import { test, expect } from '@playwright/test';
import { PlaywrightDashboardPage } from './dashboard/dashboard';
import { PlaywrightSigninPage } from './auth/login';
import { PlaywrightRekapanLaporanPKLPage } from './laporan/laporan';
import { PlaywrightBuatLaporanPKLPage } from './laporan/create_laporan';
import { PlaywrightTanyaJawabPage } from './chat/tanyajawab';
import { PlaywrightEditLaporanPKLPage } from './laporan/edit_laporan';
import exp from 'node:constants';

const laporanId = '12345';

test.describe('PKL Reporting Tests', () => {
  let signinPage: PlaywrightSigninPage;
  let dashboardPage: PlaywrightDashboardPage;
  let rekapanLaporanPage: PlaywrightRekapanLaporanPKLPage;
  let buatLaporanPage: PlaywrightBuatLaporanPKLPage;
  let TanyaJawabPage: PlaywrightTanyaJawabPage;
  let  editLaporanPage : PlaywrightEditLaporanPKLPage;

  test.beforeEach(async ({ page }) => {
    signinPage = new PlaywrightSigninPage(page);
    dashboardPage = new PlaywrightDashboardPage(page);
    rekapanLaporanPage = new PlaywrightRekapanLaporanPKLPage(page);
    buatLaporanPage = new PlaywrightBuatLaporanPKLPage(page);
    TanyaJawabPage = new PlaywrightTanyaJawabPage(page);
    editLaporanPage = new PlaywrightEditLaporanPKLPage(page);
    
    
    
    await page.goto('http://localhost:8000/login');
    await page.waitForURL('http://localhost:8000/siswa', { timeout: 60000 });

    
  });

  
  test('playwright dashboard', async ({ page })  => {
    
    await expect(page.getByText('Welcome To PKL Monitoring')).toBeVisible();
    await dashboardPage.checkDashboardHeader();
  });

  test('playwright report', async({page}) =>{
   
    await rekapanLaporanPage.checkSidebar();
    await rekapanLaporanPage.checkDashboardHeader();
    await rekapanLaporanPage.checkLaporanTable();
  
    await dashboardPage.checkLaporanHeader();
    await rekapanLaporanPage.checkAddLaporanButton();
    await rekapanLaporanPage.createNewLaporan();

  });

  test('playwright form', async ({ page }) => {
    const laporanPage = new PlaywrightRekapanLaporanPKLPage(page);
  
    await page.goto('http://localhost:8000/laporan');
    await laporanPage.checkSidebar();
    await laporanPage.checkDashboardHeader();
    await laporanPage.checkLaporanTable();
  
    await laporanPage.checkAddLaporanButton();
  
    await laporanPage.createNewLaporan();
    await page.waitForURL('http://localhost:8000/laporan/create');
  
    const laporanForm = new PlaywrightBuatLaporanPKLPage(page);
    await laporanForm.checkSidebar();
    await laporanForm.checkFormElements();
  
    
  
     await laporanForm.checkSuccessMessage();
  
    await page.goto('http://localhost:8000/laporan');
    await laporanPage.checkLaporanTable();
    await laporanPage.checkPrintPDFButton();
  });
  
  test('Edit Laporan PKL', async ({ page }) => {
   
  
    await page.goto('http://localhost:8000/laporan/edit/1'); 
    await editLaporanPage.verifySidebar();
    await editLaporanPage.verifyHeader();
  
  
    await editLaporanPage.submitEditForm();
    await editLaporanPage.navigateBackToRekap();
  });
  

 
});


  

