import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

// happy-dom doesn't lay pages out, so these guard the CSS rules the alignment depends on.
const css = readFileSync(resolve(__dirname, '../../styles/app.css'), 'utf8');

describe('sheet column widths', () => {
  it('lets the last column take the leftover width, so step columns keep their set width', () => {
    expect(css).toMatch(/\.grid col\.col-extra \{ width: auto; \}/);
    expect(css).toMatch(/\.grid col\.col-step \{ width: var\(--col-step\); \}/);
  });

  it('centers the Deleted checkbox in the first step column using that same width', () => {
    expect(css).toMatch(/padding: 0 14px 0 calc\(\(var\(--col-step\) - 18px\) \/ 2\)/);
  });

  it('widens the name and username columns for ideas, and keeps the Deleted checkbox centered under the name column', () => {
    expect(css).toMatch(/\.grid\.ideas-on col\.col-name, \.grid\.ideas-on col\.col-username \{ width: var\(--col-idea\); \}/);
    expect(css).toMatch(/\.grid\.ideas-on \.del-btn \{ padding-left: calc\(\(var\(--col-idea\) - 18px\) \/ 2\); \}/);
  });
});
