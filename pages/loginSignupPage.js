import { expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();
export class LoginSignUpPage {
  constructor(page) {
    this.page = page;
    this.loginForm = '.login-form';
    this.fillEmail = `${this.loginForm} [action="/login"] [data-qa="login-email"]`;
    this.fillPassword = `${this.loginForm} [action="/login"] [placeholder="Password"]`;
    this.loginButton = `${this.loginForm} [action="/login"] [data-qa="login-button"]`;
    this.loginErrorMessage = `${this.loginForm} [action="/login"] p`;
    this.signUpForm = '.signup-form';
    this.signUpUsernameField = `${this.signUpForm} [action="/signup"] [data-qa="signup-name"]`;
    this.signUpEmailField = `${this.signUpForm} [action="/signup"] [data-qa="signup-email"]`;
    this.signUpButton = `${this.signUpForm} [action="/signup"] [data-qa="signup-button"]`;
    this.signUpErrorMessage = `${this.signUpForm} [action="/signup"] p`;
    this.registrationForm = '.login-form';
    this.checkRadioTitleButton = (title) =>
      `${this.registrationForm} input[type="radio"][value="${title}"]`;
    this.nameField = `${this.registrationForm} input[name="name"]`;
    this.emailField = `${this.registrationForm} input[name="email_address"]`;
    this.daySelector = `${this.registrationForm} select[name="days"]`;
    this.monthSelector = `${this.registrationForm} select[name="months"]`;
    this.yearSelector = `${this.registrationForm} select[name="years"]`;
    this.companyFieldSelector = `${this.registrationForm} input[data-qa="company"]`;
    this.addressFieldSelector = `${this.registrationForm} input[data-qa="address"]`;
    this.stateFieldSelector = `${this.registrationForm} input[data-qa="state"]`;
    this.cityFieldSelector = `${this.registrationForm} input[data-qa="city"]`;
    this.zipcodeFieldSelector = `${this.registrationForm} input[data-qa="zipcode"]`;
    this.mobileNumFieldSelector = `${this.registrationForm} input[data-qa="mobile_number"]`;
    this.formSubmitButton = `${this.registrationForm} button[data-qa="create-account"]`;
  }

  async loginWithValidCredentials(email, password) {
    await this.page.locator(this.fillEmail).fill(email);
    await this.page.locator(this.fillPassword).fill(password);
    await this.page.locator(this.loginButton).click();
    expect(
      this.page.locator('header[id="header"] a[href="/logout"]')
    ).toBeVisible();
  }

  async loginWithInvalidCredentials(email, password) {
    await this.page.locator(this.fillEmail).fill(email);
    await this.page.locator(this.fillPassword).fill(password);
    await this.page.locator(this.loginButton).click();
    const message = await this.page
      .locator(this.loginErrorMessage)
      .textContent();
    expect(message).toBe('Your email or password is incorrect!');
  }

  async generateRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }

  async signUpWithNewUserAndFillRegistrationForm() {
    const { PASSWORD } = process.env;
    const stringLength = 6;
    const firstName = `Test${await this.generateRandomString(stringLength)}`;
    const lastName = `Test${await this.generateRandomString(stringLength)}`;
    const emailID = `${firstName}testing@gmail.com`;
    await this.page
      .locator(this.signUpUsernameField)
      .fill(`${firstName} ${lastName}`);
    await this.page.locator(this.signUpEmailField).fill(emailID);
    await this.page.locator(this.signUpButton).click();
    await this.page.locator(this.checkRadioTitleButton('Mr')).check();
    // check if name field has correct user name
    const nameField = await this.page.locator(this.nameField).inputValue();
    expect(nameField).toBe(`${firstName} ${lastName}`);
    // check if email field has correct email ID
    const emailField = await this.page.locator(this.emailField).inputValue();
    expect(emailField).toBe(emailID);
    // enter password
    await this.page.getByLabel('Password ').fill(PASSWORD);
    // select day
    await this.page.locator(this.daySelector).selectOption('10');
    // select month
    await this.page.locator(this.monthSelector).selectOption('12');
    // select year
    await this.page.locator(this.yearSelector).selectOption('1990');
    await this.page.getByLabel('First name ').fill(firstName);
    await this.page.getByLabel('Last name ').fill(lastName);
    await this.page.locator(this.companyFieldSelector).fill('ABC LTD');
    await this.page.locator(this.addressFieldSelector).fill('XYZ Building');
    await this.page.locator(this.stateFieldSelector).fill('Haryana');
    await this.page.locator(this.cityFieldSelector).fill('Gurugram');
    await this.page.locator(this.zipcodeFieldSelector).fill('10000');
    await this.page.locator(this.mobileNumFieldSelector).fill('900000000');
    await this.page.locator(this.formSubmitButton).click();
  }

  async signUpWithExistingUser(userName, emailID) {
    await this.page.locator(this.signUpUsernameField).fill(userName);
    await this.page.locator(this.signUpEmailField).fill(emailID);
    await this.page.locator(this.signUpButton).click();
    const message = await this.page
      .locator(this.signUpErrorMessage)
      .textContent();
    expect(message).toBe('Email Address already exist!');
  }

  async verifySuccessAccountCreationMessage() {
    // check account is created successfully
    expect(await this.page.getByText('Account Created!')).toBeVisible();
  }
}
