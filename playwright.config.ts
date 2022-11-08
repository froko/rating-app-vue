import { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './playwright/e2e',
  fullyParallel: true,
  reporter: 'html',
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000/'
  },
  use: {
    baseURL: 'http://localhost:3000/',
    trace: 'on-first-retry'
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome']
      }
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox']
      }
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari']
      }
    }
  ]
};

export default config;
