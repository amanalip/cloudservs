/**
 * Playwright exercises the generated site so regressions are caught in the same static output
 * that GitHub Pages receives.
 */
import { defineConfig, devices } from '@playwright/test';

/** A dedicated port prevents the regression server from colliding with local Astro development. */
const regressionPort = 4330;

export default defineConfig({
  testDir: './tests/e2e',
  outputDir: './output/playwright/results',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['list'], ['html', { outputFolder: './output/playwright/report', open: 'never' }]],
  use: {
    baseURL: `http://127.0.0.1:${regressionPort}/cloudservs/`,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'desktop-chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
      },
    },
  ],
  webServer: {
    command: `npm run preview -- --host 127.0.0.1 --port ${regressionPort}`,
    url: `http://127.0.0.1:${regressionPort}/cloudservs/`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
