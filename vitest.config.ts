import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      all: true,
      include: ['src/**/*.tsx', 'src/**/*.ts'],
      exclude: [
        '**/*.d.ts',
        '**/*.test.{tsx,ts}',
        '**/*.stories.{tsx,ts}',
        '**/stories/**/*.{tsx,ts}',
        '**/__stories__/**/*.{tsx,ts}',
      ],
      statements: 19,
      branches: 48,
      functions: 34,
      lines: 19,
      reporter: ['text', 'json-summary', 'html', 'json'],
    },
  },
});
