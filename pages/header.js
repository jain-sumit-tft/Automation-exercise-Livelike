import { expect } from "@playwright/test";
export class Header{
    constructor(page){
        this.page=page;
        this.headerOption = (option) =>`header[id="header"] a[href="/${option}"]`;
    }

    async clickHeaderOption(option){
       await this.page.locator(this.headerOption(option)).click()
       expect(this.page.url()).toBe(`https://automationexercise.com/${option}`)
    }

    async verifyHeaderOptionVisible(option){
        expect(this.page.locator(this.headerOption(option))).toBeVisible();
    }
}