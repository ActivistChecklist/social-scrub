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

describe('row tints', () => {
  it('color the whole row, green when finished and red while waiting to be deleted', () => {
    expect(css).toContain('.row.st-done td, .row.st-deleted td { background: var(--done-bg);');
    expect(css).toContain('.row.st-to-delete td { background: var(--del-bg);');
  });

  it('stay tinted on hover, in a deeper shade of the same color', () => {
    expect(css).toContain('.row.st-done:hover td, .row.st-deleted:hover td { background: var(--done-bg-hover); }');
    expect(css).toContain('.row.st-to-delete:hover td { background: var(--del-bg-hover); }');
    for (const palette of [tokens(':root'), tokens(':root[data-theme="dark"]')]) {
      expect(palette['--done-bg-hover']).not.toBe(palette['--done-bg']);
      expect(palette['--del-bg-hover']).not.toBe(palette['--del-bg']);
    }
  });
});
