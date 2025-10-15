import { defineConfig, devices } from '@playwright/test';

/**
 * Configuración de Playwright para Next.js
 * Optimizada para CI/CD y testing E2E
 * @see https://playwright.dev/docs/test-configuration
 */

export default defineConfig({
  // Directorio de tests E2E
  testDir: './e2e',

  // Timeout por test
  timeout: 30 * 1000,

  // Expect timeout
  expect: {
    timeout: 5000,
  },

  // Ejecutar tests en paralelo
  fullyParallel: true,

  // Fail build en CI si hay tests comprometidos
  forbidOnly: !!process.env.CI,

  // Reintentos en CI
  retries: process.env.CI ? 2 : 0,

  // Workers en paralelo
  workers: process.env.CI ? 1 : undefined,

  // Reporter
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['junit', { outputFile: 'test-results/e2e-junit.xml' }],
    ['list'],
  ],

  // Configuración global para todos los tests
  use: {
    // Base URL
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:3000',

    // Collect trace cuando el test falla
    trace: 'on-first-retry',

    // Screenshots
    screenshot: 'only-on-failure',

    // Videos
    video: 'retain-on-failure',

    // Locale y timezone
    locale: 'es-ES',
    timezoneId: 'America/Mexico_City',

    // Viewport por defecto
    viewport: { width: 1280, height: 720 },

    // Ignorar errores HTTPS en desarrollo
    ignoreHTTPSErrors: true,

    // Esperar hasta que la página esté completamente cargada
    actionTimeout: 0,

    // User agent
    userAgent: 'Playwright Testing Agent',
  },

  // Proyectos de testing (diferentes navegadores/dispositivos)
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // Test en mobile viewports
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },

    // Test en tablet
    {
      name: 'iPad',
      use: { ...devices['iPad Pro'] },
    },
  ],

  // Servidor de desarrollo
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    stdout: 'ignore',
    stderr: 'pipe',
  },

  // Directorio de salida
  outputDir: 'test-results/',

  // Global setup/teardown
  // globalSetup: require.resolve('./e2e/global-setup'),
  // globalTeardown: require.resolve('./e2e/global-teardown'),
});

