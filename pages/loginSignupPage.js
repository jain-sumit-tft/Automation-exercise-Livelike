import { expect } from '@playwright/test';
const { PASSWORD } = process.env;
export class LoginSignUpPage {
  constructor(page) {
    this.page = page;
    this.loginForm = page.locator('.login-form');
    this.fillEmail = page.locator(`[data-qa="login-email"]`);
    this.fillPassword = page.locator(`[data-qa="login-password"]`);
    this.loginButton = page.locator(`[data-qa="login-button"]`);
    this.loginErrorMessage = page.locator(`[action="/login"] p`);
    this.signUpForm = page.locator('.signup-form');
    this.signUpUsernameField = page.locator(`[data-qa="signup-name"]`);
    this.signUpEmailField = page.locator(`[data-qa="signup-email"]`);
    this.signUpButton = page.locator(`[data-qa="signup-button"]`);
    this.signUpErrorMessage = page.locator(`[action="/signup"] p`);
    this.registrationForm = page.locator('.login-form');
    this.checkRadioTitleButton = (title) =>
      page.locator(`input[type="radio"][value="${title}"]`);
    this.nameField = page.locator(`input[name="name"]`);
    this.emailField = page.locator(`input[name="email_address"]`);
    this.passwordField = page.getByLabel('Password ');
    this.firstNameField = page.getByLabel('First name ');
    this.lastNameField = page.getByLabel('Last name ');
    this.daySelector = page.locator(`select[name="days"]`);
    this.monthSelector = page.locator(`select[name="months"]`);
    this.yearSelector = page.locator(`select[name="years"]`);
    this.companyFieldSelector = page.locator(`input[data-qa="company"]`);
    this.addressFieldSelector = page.locator(`input[data-qa="address"]`);
    this.stateFieldSelector = page.locator(`input[data-qa="state"]`);
    this.cityFieldSelector = page.locator(`input[data-qa="city"]`);
    this.zipcodeFieldSelector = page.locator(`input[data-qa="zipcode"]`);
    this.mobileNumFieldSelector = page.locator(
      `input[data-qa="mobile_number"]`
    );
    this.formSubmitButton = page.locator(`button[data-qa="create-account"]`);
    this.accountCreatedMsg = page.getByText('Account Created!');
  }

  async loginWithValidCredentials(email, password) {
    await this.fillEmail.fill(email);
    await this.fillPassword.fill(password);
    await this.loginButton.click();
  }

  async loginWithInvalidCredentials(email, password) {
    await this.fillEmail.fill(email);
    await this.fillPassword.fill(password);
    await this.loginButton.click();
    const message = await this.loginErrorMessage;
    expect(message).toContainText('Your email or password is incorrect!');
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
    const stringLength = 6;
    const firstName = `Test${await this.generateRandomString(stringLength)}`;
    const lastName = `Test${await this.generateRandomString(stringLength)}`;
    const emailID = `${firstName}testing@gmail.com`;
    await this.signUpUsernameField.fill(`${firstName} ${lastName}`);
    await this.signUpEmailField.fill(emailID);
    await this.signUpButton.click();
    // Registration form is opened
    await this.checkRadioTitleButton('Mr').check();
    // check if name field has correct user name
    const nameField = await this.nameField.inputValue();
    expect(nameField).toBe(`${firstName} ${lastName}`);
    // check if email field has correct email ID
    const emailField = await this.emailField.inputValue();
    expect(emailField).toBe(emailID);
    // enter password
    await this.passwordField.fill(PASSWORD);
    // select day
    await this.daySelector.selectOption('10');
    // select month
    await this.monthSelector.selectOption('12');
    // select year
    await this.yearSelector.selectOption('1990');
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.companyFieldSelector.fill('ABC LTD');
    await this.addressFieldSelector.fill('XYZ Building');
    await this.stateFieldSelector.fill('Haryana');
    await this.cityFieldSelector.fill('Gurugram');
    await this.zipcodeFieldSelector.fill('10000');
    await this.mobileNumFieldSelector.fill('900000000');
    await this.formSubmitButton.click();
  }

  async signUpWithExistingUser(userName, emailID) {
    await this.signUpUsernameField.fill(userName);
    await this.signUpEmailField.fill(emailID);
    await this.signUpButton.click();
    const message = await this.signUpErrorMessage.textContent();
    expect(message).toBe('Email Address already exist!');
  }

  async verifySuccessAccountCreationMessage() {
    // check account is created successfully
    expect(await this.accountCreatedMsg).toBeVisible();
  }
}
