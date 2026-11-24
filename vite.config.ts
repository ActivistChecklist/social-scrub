import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

// `pnpm preview` sends the same security headers the host must send in
// production (deploy/security.json), so the Content Security Policy is
// tested locally before it ships.
const security = JSON.parse(readFileSync(resolve(import.meta.dirname, 'deploy/security.json'), 'utf8'));
const productionHeaders: Record<string, string> = security.headers;

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
  preview: {
    headers: productionHeaders,
  },
  test: {
    environment: 'happy-dom',
    include: ['src/__tests__/**/*.test.{ts,tsx}'],
  },
});
