const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 50000,
  fullyParallel: true,
  expect: {
    timeout: 10000
  },
  reporter: [
    ['html', { open: 'always' }],
    ['list'],
    ['allure-playwright']
  ],
  use: {
    baseURL: 'https://www.balsamhill.com',
    headless: false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    logger: {
      isEnabled: (name, severity) => true,
      log: (name, severity, message, args) => console.log(`${severity}: ${message}`)
    }
  },
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
});