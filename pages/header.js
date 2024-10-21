import { expect } from '@playwright/test';
export class Header {
  constructor(page) {
    this.page = page;
    this.headerOption = (option) =>
      page.locator(`header[id="header"] a[href="/${option}"]`);
  }

  async clickHeaderOption(option) {
    await this.headerOption(option).click();
    expect(this.page.url()).toBe(`https://automationexercise.com/${option}`);
  }

  async verifyHeaderOptionVisible(option) {
    expect(this.headerOption(option)).toBeVisible();
  }
}
