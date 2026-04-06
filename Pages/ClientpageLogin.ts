import { Page } from '@playwright/test';

export class ClientpageLogin {
    private page: Page;
    private username;
    private password;
    private signInBtn;

    constructor(page: Page) {
        this.page = page;
        this.username = page.locator('#userEmail');
        this.password = page.locator('#userPassword');
        this.signInBtn = page.locator("[value='Login']");
    }

    async gotoClient(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async ClientpageLogin(username: string, password: string): Promise<void> {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.signInBtn.click();
    }
}
