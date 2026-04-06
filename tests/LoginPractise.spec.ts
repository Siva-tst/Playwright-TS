import { test, expect } from '@playwright/test';
import { Loginpage } from '../Pages/Loginpage';
import { testdata } from './testdata';

test.describe('Login Page Tests', () => {

    test('Validate the login page with Invalid credentials', async ({ page }) => {
        const loginPage = new Loginpage(page);
        await loginPage.goto(testdata.url);
        await loginPage.login(testdata.invalidUsername, testdata.invalidPassword);
        expect(await loginPage.getAlertText()).toContain(testdata.alertText);
    });

    test('Validate the login page with valid credentials', async ({ page }) => {
        const loginPage = new Loginpage(page);
        await loginPage.goto(testdata.url);
        await loginPage.login(testdata.validUsername, testdata.validPassword);
        console.log(await loginPage.getTitle());
    });

    test.only('Validate the radio btn and dropdown', async ({ page }) => {
        const loginPage = new Loginpage(page);
        await loginPage.goto(testdata.url);
        await loginPage.login(testdata.validUsername, testdata.validPassword);

        const dropdown = page.locator('select.form-control');
        await dropdown.selectOption('consult');
        await page.locator('.radiotextsty').last().click();
        await page.locator('#okayBtn').click();
        console.log(await page.locator('.radiotextsty').last().isChecked());
        await expect(page.locator('.radiotextsty').last()).toBeChecked();
        await page.locator('#terms').click();
        await expect(page.locator('#terms')).toBeChecked();
        await page.locator('#terms').uncheck();
        expect(await page.locator('#terms').isChecked()).toBeFalsy();
    });
});
