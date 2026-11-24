import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { beforeEach, describe, expect, it } from 'vitest';
import { THEME_KEY } from '../../lib/storage';

// The script runs before the app, so it can't import the key. Running it here keeps the two in step.
const source = readFileSync(resolve(import.meta.dirname, '../../../public/theme-init.js'), 'utf8');
const run = () => new Function(source)();
const html = document.documentElement;

beforeEach(() => {
  localStorage.clear();
  html.removeAttribute('data-theme');
});

describe('theme-init.js', () => {
  it('applies a saved light or dark theme', () => {
    localStorage.setItem(THEME_KEY, 'dark');
    run();
    expect(html.getAttribute('data-theme')).toBe('dark');
    localStorage.setItem(THEME_KEY, 'light');
    run();
    expect(html.getAttribute('data-theme')).toBe('light');
  });

  it('leaves the page to the device setting otherwise', () => {
    run();
    expect(html.hasAttribute('data-theme')).toBe(false);
    localStorage.setItem(THEME_KEY, 'purple');
    run();
    expect(html.hasAttribute('data-theme')).toBe(false);
  });
});
