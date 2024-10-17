import {test} from '@playwright/test'
import { LoginSignUpPage } from '../pages/loginSignupPage'
import { Header } from '../pages/header';
test.describe('SignUp New User' ,()=>{
    test('Register with a new user',async({page})=>{
        const signUpForm = new LoginSignUpPage(page);
        const header = new Header(page);
        await page.goto('/');
        // Open login/signUp page
        await header.clickHeaderOption('login');
        // enter random generated username and email id
        await signUpForm.signUpWithNewUserAndFillRegistrationForm();
        // verify account is created successfully
        await signUpForm.verifySuccessAccountCreationMessage()
    })
})