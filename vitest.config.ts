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
      statements: 22.91,
      branches: 51.02,
      functions: 37.14,
      lines: 22.91,
      reporter: ['text', 'json-summary', 'html', 'json'],
    },
  },
});
