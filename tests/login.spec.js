import { test } from '@playwright/test';
import { LoginSignUpPage } from '../pages/loginSignupPage';
import dotenv from 'dotenv';
dotenv.config();
const { EMAIL, PASSWORD, INVALID_EMAIL } = process.env;

test.describe('Login Functionality', () => {
  test('Login with valid credentials', async ({ page }) => {
    const login = new LoginSignUpPage(page);
    await page.goto('/login');
    await login.loginWithValidCredentials(EMAIL, PASSWORD);
  });
  test('Login with invalid credentials', async ({ page }) => {
    const login = new LoginSignUpPage(page);
    await page.goto('/login');
    await login.loginWithInvalidCredentials(INVALID_EMAIL, PASSWORD);
  });
});
