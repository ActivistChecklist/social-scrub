import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  oxc: {
    jsx: { runtime: 'automatic', importSource: 'preact' },
  },
  build: {
    target: 'es2022',
    // Two static pages: the sheet and the privacy page.
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        privacy: resolve(import.meta.dirname, 'privacy.html'),
      },
    },
  },
  test: {
    environment: 'happy-dom',
    include: ['src/__tests__/**/*.test.{ts,tsx}'],
  },
});
