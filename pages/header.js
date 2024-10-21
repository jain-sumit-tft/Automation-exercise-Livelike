export class Header {
  constructor(page) {
    this.page = page;
    this.headerOption = (option) =>
      page.locator(`header[id="header"] a[href="/${option}"]`);
  }

  /**
   * Clicks on a specified header option.
   *
   * @param {string} header - The header option to click on, represented as a string.
   * @returns {Promise<void>} Resolves when the click action is complete.
   */
  async clickHeaderOption(header) {
    await this.headerOption(header).click();
  }
}
