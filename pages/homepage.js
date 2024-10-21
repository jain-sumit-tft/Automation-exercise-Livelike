import { expect } from '@playwright/test';
export class HomePage {
  constructor(page) {
    this.page = page;
    this.logo = page.locator('[src="/static/images/home/logo.png"]');
  }

  async verifyAutomationExerciseLogo() {
    expect(this.logo).toBeVisible();
  }
}
