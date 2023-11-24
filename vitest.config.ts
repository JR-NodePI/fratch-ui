import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
    coverage: {
      all: true,
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: [
        '**/__mocks__/**/*.{tsx,ts}',
        '**/__stories__/**/*.{tsx,ts}',
        '**/__tests__/**/*.{tsx,ts}',
        '**/*.d.ts',
        '**/*.stories.{tsx,ts}',
        '**/*.test.{tsx,ts}',
      ],
      statements: 93,
      branches: 92,
      functions: 94,
      lines: 93,
      reporter: ['text', 'json-summary', 'html', 'json'],
    },
  },
});
