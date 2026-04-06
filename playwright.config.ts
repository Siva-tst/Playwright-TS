import { defineConfig } from '@playwright/test';
import { testdata } from './tests/testdata';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 0,
  projects: [
    {
      name: testdata.browser,
      use: {
        browserName: testdata.browser,
        headless: false,
        actionTimeout: 0,
        trace: 'retain-on-failure',
        launchOptions: {
          args: ['--start-maximized'],
        },
        viewport: null,
      },
    },
  ],
});
