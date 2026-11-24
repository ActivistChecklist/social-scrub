import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const css = readFileSync(resolve(import.meta.dirname, '../../styles/app.css'), 'utf8');

/** The custom properties set in the first rule for `selector`. */
function tokens(selector: string): Record<string, string> {
  const at = css.indexOf(`${selector} {`);
  expect(at, selector).toBeGreaterThan(-1);
  const body = css.slice(at, css.indexOf('}', at));
  return Object.fromEntries([...body.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
}

describe('dark colors', () => {
  it('are the same whether they come from the device or the theme menu', () => {
    const fromDevice = tokens(':root:not([data-theme="light"])');
    const fromMenu = tokens(':root[data-theme="dark"]');
    expect(Object.keys(fromDevice).length).toBeGreaterThan(20);
    expect(fromMenu).toEqual(fromDevice);
  });
});
