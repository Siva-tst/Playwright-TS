import { Page, expect } from '@playwright/test';

export class Loginpage {
    private page: Page;
    private username;
    private password;
    private signInBtn;
    private warnMsg;

    constructor(page: Page) {
        this.page = page;
        this.username = page.locator('#username');
        this.password = page.locator('#password');
        this.signInBtn = page.locator('#signInBtn');
        this.warnMsg = page.locator("[style*='block']");
    }

    async goto(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async login(username: string, password: string): Promise<void> {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.signInBtn.click();
    }

    async getAlertText(): Promise<string | null> {
        return await this.warnMsg.textContent();
    }

    async crtPassword(userName: string, crtpass: string): Promise<void> {
        await this.username.fill(userName);
        await this.password.fill(crtpass);
        await this.signInBtn.click();
    }

    async getTitle(): Promise<string> {
        return await this.page.title();
    }
}
