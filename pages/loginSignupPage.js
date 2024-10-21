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

  /**
   * Logs in to the application using valid credentials.
   *
   * @param {string} email - Pick email address from env.
   * @param {string} password - Pick password from env.
   * @returns {Promise<void>} Resolves when the login action is complete.
   */
  async loginWithValidCredentials(email, password) {
    await this.fillEmail.fill(email);
    await this.fillPassword.fill(password);
    await this.loginButton.click();
  }

  /**
   * Attempts to log in to the application using invalid credentials
   *
   * @param {string} email - Pick email address from env.
   * @param {string} password - Pick passwordk from env.
   * @returns {Promise<void>} Resolves when the login attempt and error verification are complete.
   */
  async;
  async loginWithInvalidCredentials(email, password) {
    await this.fillEmail.fill(email);
    await this.fillPassword.fill(password);
    await this.loginButton.click();
  }

  /**
   * Generates a random string of specified length using alphabetic characters.
   *
   * @param {number} length - The length of the random string to be generated.
   * @returns {string} A random generated string of the specified length.
   */
  async generateRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }

  /**
   * Signs up a new user by filling out the registration form with randomly generated details and provided options.
   *
   * @param {Object} [opts={}] - Options for filling out the registration form.
   * @param {string} [opts.company='ABC Inc'] - The company name (defaults to 'ABC Inc').
   * @param {string} opts.address1 - The primary address of the user.
   * @param {string} opts.state - The state of the user.
   * @param {string} opts.city - The city of the user.
   * @param {string} opts.zipcode - The postal code of the user.
   * @param {string} opts.mobile - The mobile number of the user.
   * @param {number} opts.day - The day of birth.
   * @param {number} opts.month - The month of birth.
   * @param {number} opts.year - The year of birth.
   * @returns {Promise<void>} Resolves when the registration process is complete.
   */

  async signUpWithNewUserAndFillRegistrationForm(opts = {}) {
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
    await this.daySelector.selectOption(opts.day);
    // select month
    await this.monthSelector.selectOption(opts.month);
    // select year
    await this.yearSelector.selectOption(opts.year);
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.companyFieldSelector.fill(opts.company || 'ABC Inc');
    await this.addressFieldSelector.fill(opts.address1);
    await this.stateFieldSelector.fill(opts.state);
    await this.cityFieldSelector.fill(opts.city);
    await this.zipcodeFieldSelector.fill(opts.zipcode);
    await this.mobileNumFieldSelector.fill(opts.mobile);
    await this.formSubmitButton.click();
  }

  /**
   * Signs up an existing user by filling out the registration form with the existing username and email.
   *
   * @param {string} userName - The username of the existing user.
   * @param {string} emailID - The email address of the existing user.
   * @returns {Promise<void>} Resolves when the sign-up process is complete.
   */
  async signUpWithExistingUser(userName, emailID) {
    await this.signUpUsernameField.fill(userName);
    await this.signUpEmailField.fill(emailID);
    await this.signUpButton.click();
  }
}
