import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./setupTests.ts'],
    coverage: {
      all: true,
      include: ['src/**/*.tsx', 'src/**/*.ts'],
      exclude: [
        '**/*.d.ts',
        '**/*.test.{tsx,ts}',
        '**/*.stories.{tsx,ts}',
        '**/stories/**/*.{tsx,ts}',
      ],
      lines: 10,
      functions: 18,
      branches: 10,
      statements: 1,
      reporter: ['text', 'json-summary', 'html', 'json'],
    },
  },
});
