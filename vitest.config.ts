/** Vitest owns fast source-level tests, while Playwright owns files under tests/e2e. */
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
  },
});
