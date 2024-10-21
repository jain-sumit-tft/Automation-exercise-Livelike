import { test } from '@playwright/test';
import { LoginSignUpPage } from '../pages/loginSignupPage';
const { EMAIL, PASSWORD, INVALID_EMAIL } = process.env;
let login;
test.describe('Login Functionality', () => {
  test.beforeEach(async ({ page }) => {
    login = new LoginSignUpPage(page);
    await page.goto('/login');
  });
  test('Login with valid credentials', async () => {
    await login.loginWithValidCredentials(EMAIL, PASSWORD);
  });
  test('Login with invalid credentials', async () => {
    await login.loginWithInvalidCredentials(INVALID_EMAIL, PASSWORD);
  });
});
