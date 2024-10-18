import {test} from '@playwright/test'
import { LoginSignUpPage } from '../pages/loginSignupPage'
import { Header } from '../pages/header';
import dotenv from "dotenv";
dotenv.config();
const {EMAIL, NAME} = process.env;
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
    test('Register with existing user', async({page})=>{
        const signUpForm = new LoginSignUpPage(page);
        const header = new Header(page);
        await page.goto('/');
        // Open login/signUp page
        await header.clickHeaderOption('login');
        // enter existing username and email address and verify the error message
        await signUpForm.signUpWithExistingUser(NAME, EMAIL);
    })
})