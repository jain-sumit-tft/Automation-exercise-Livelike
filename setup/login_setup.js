import { chromium, expect } from '@playwright/test';
import config from '../playwright.config.js'
import dotenv from "dotenv";
dotenv.config();
const {EMAIL, PASSWORD} = process.env;

(async () => {
  const browser = await chromium.launch({headless:false});
  const context = await browser.newContext();

  // Open a new page
  const page = await context.newPage();
  const baseURL = config.use.baseURL;
  // Go to the login page
  await page.goto(`${baseURL}/login`);

  // Perform login
  await page.locator('.login-form [action="/login"] [data-qa="login-email"]').fill(EMAIL);
  await page.locator('.login-form [action="/login"] [placeholder="Password"]').fill(PASSWORD);
  await page.locator('.login-form [action="/login"] [data-qa="login-button"]').click();
  await page.waitForLoadState()
  // Verify logout is displayed on the header section
  await expect(page.locator('header[id="header"] a[href="/logout"]')).toBeVisible();
  // Save the storage state (cookies, local storage)
  await context.storageState({ path: 'storageState. json' });
  // Close the browser
  await browser.close();
})();