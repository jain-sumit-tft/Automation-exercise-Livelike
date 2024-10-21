import { test } from '@playwright/test';
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
  test('Register with a new user', async () => {
    // Open login/signUp page
    await header.clickHeaderOption('login');
    // enter random generated username and email id
    await signUpForm.signUpWithNewUserAndFillRegistrationForm();
    // verify account is created successfully
    await signUpForm.verifySuccessAccountCreationMessage();
  });
  test('Register with existing user', async () => {
    // Open login/signUp page
    await header.clickHeaderOption('login');
    // enter existing username and email address and verify the error message
    await signUpForm.signUpWithExistingUser(NAME, EMAIL);
  });
});
