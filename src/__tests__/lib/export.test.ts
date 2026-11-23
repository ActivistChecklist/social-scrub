import { describe, expect, it } from 'vitest';
import { PLATFORMS } from '../../data/platforms';
import { EXPORT_HEADER, exportFilename, exportRows, neutralizeFormula, toCsv } from '../../lib/export';
import { addCustom, createInitialState, cycleStep, setPlan, toggleDeleted } from '../../lib/state';

describe('exportRows', () => {
  it('has a header and one row per platform', () => {
    const rows = exportRows(createInitialState());
    expect(rows[0]).toEqual(EXPORT_HEADER);
    expect(rows).toHaveLength(PLATFORMS.length + 1);
  });

  it('writes what the sheet shows', () => {
    let s = createInitialState();
    s = cycleStep(s, 'facebook', 'name');
    s = cycleStep(cycleStep(s, 'facebook', 'username'), 'facebook', 'username');
    s = toggleDeleted(setPlan(s, 'linkedin', 'delete'), 'linkedin');
    const rows = exportRows(s);
    const col = (name: string) => EXPORT_HEADER.indexOf(name);
    const fb = rows.find((r) => r[1] === 'Facebook')!;
    expect(fb[col('Have it')]).toBe('Yes');
    expect(fb[col('Keep or delete')]).toBe('Keep');
    expect(fb[col('Display name')]).toBe('Done');
    expect(fb[col('Username')]).toBe('Skipped');
    expect(fb[col('Status')]).toBe('In progress');
    const li = rows.find((r) => r[1] === 'LinkedIn')!;
    expect(li[col('Keep or delete')]).toBe('Delete');
    expect(li[col('Deleted')]).toBe('Yes');
    expect(li[col('Display name')]).toBe('');
    const reddit = rows.find((r) => r[1] === 'Reddit')!;
    expect(reddit[col('Have it')]).toBe('');
  });

  it('lists your own platforms last', () => {
    const { state } = addCustom(createInitialState(), 'Ravelry', () => 'custom-r');
    const rows = exportRows(state);
    expect(rows.at(-1)!.slice(0, 2)).toEqual(['Your own platforms', 'Ravelry']);
  });
});

describe('toCsv', () => {
  it('quotes commas, quotes and line breaks', () => {
    expect(toCsv([['a,b', 'say "hi"', 'two\nlines', 'plain']])).toBe('"a,b","say ""hi""","two\nlines",plain');
  });

  it('stops spreadsheet apps from running a typed name as a formula', () => {
    expect(neutralizeFormula('=HYPERLINK("x")')).toBe(`'=HYPERLINK("x")`);
    expect(neutralizeFormula('+1')).toBe("'+1");
    expect(neutralizeFormula('Reddit')).toBe('Reddit');
    expect(toCsv([['@evil']])).toBe("'@evil");
  });
});

describe('exportFilename', () => {
  it('includes the date', () => {
    expect(exportFilename('csv', new Date(2026, 10, 3))).toBe('social-scrub-2026-11-03.csv');
  });
});
