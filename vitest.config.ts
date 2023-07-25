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
      statements: 23,
      branches: 51,
      functions: 32,
      lines: 23,
      reporter: ['text', 'json-summary', 'html', 'json'],
    },
  },
});
