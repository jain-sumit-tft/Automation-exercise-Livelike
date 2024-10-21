import { test, expect } from '@playwright/test';
import { LoginSignUpPage } from '../pages/loginSignupPage';
import { Header } from '../pages/header';
const { EMAIL, NAME } = process.env;
let header, signUpForm;
test.describe('SignUp New User', () => {
  test.beforeEach(async ({ page }) => {
    header = new Header(page);
    signUpForm = new LoginSignUpPage(page);
    await page.goto('/');
  });
  test('Register with a new user', async ({ page }) => {
    // Open login/signUp page
    await header.clickHeaderOption('login');
    // enter random generated username, email id and fill registration form
    await signUpForm.signUpWithNewUserAndFillRegistrationForm({
      day: '10',
      month: '12',
      year: '2001',
      address1: 'ABC street',
      state: 'New York',
      city: 'New York',
      zipcode: '10001',
      mobile: '9898767890',
    });
    // verify account is created successfully
    await page.waitForLoadState('domcontentloaded');
    expect(signUpForm.accountCreatedMsg).toBeVisible();
  });
  test('Register with existing user and verify the error message displayed', async () => {
    // Open login/signUp page
    await header.clickHeaderOption('login');
    // enter existing username and email address
    await signUpForm.signUpWithExistingUser(NAME, EMAIL);
    // verify error message is displayed
    const message = await signUpForm.signUpErrorMessage.textContent();
    expect(message).toBe('Email Address already exist!');
  });
});
