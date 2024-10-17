import {expect} from '@playwright/test'
export class HomePage{
    constructor(page){
        this.page=page;
        this.logo='[src="/static/images/home/logo.png"]';
    }

    async verifyAutomationExerciseLogo(){
       expect(this.page.locator(this.logo)).toBeVisible()
    }
}