import { defineConfig, devices } from '@playwright/test';

const port = 4174;

// Prueba el build de producción (dist/) servido con el mismo server.mjs del NUC.
// Requiere haber ejecutado antes npm run build.
export default defineConfig({
  testDir: 'e2e',
  fullyParallel: true,
  // Más navegadores en paralelo saturan equipos modestos y los tests fallan por tiempo.
  workers: 2,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'escritorio', use: { ...devices['Desktop Chrome'] } },
    { name: 'movil', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command: 'node server.mjs',
    url: `http://127.0.0.1:${port}/`,
    env: { PORT: String(port), HOST: '127.0.0.1' },
    reuseExistingServer: !process.env.CI,
  },
});
