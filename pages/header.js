export class Header {
  constructor(page) {
    this.page = page;
    this.headerOption = (option) =>
      page.locator(`header[id="header"] a[href="/${option}"]`);
  }

  async clickHeaderOption(option) {
    await this.headerOption(option).click();
  }
}
