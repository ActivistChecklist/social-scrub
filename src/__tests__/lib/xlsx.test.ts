import { describe, expect, it } from 'vitest';
import { buildXlsx, columnName, crc32, escapeXml } from '../../lib/xlsx';

/** Reads a stored (uncompressed) zip back into name -> text, checking each entry's CRC. */
function readZip(bytes: Uint8Array): Map<string, string> {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const dec = new TextDecoder();
  const end = bytes.length - 22;
  expect(view.getUint32(end, true)).toBe(0x06054b50);
  const count = view.getUint16(end + 10, true);
  let at = view.getUint32(end + 16, true);
  const out = new Map<string, string>();
  for (let i = 0; i < count; i++) {
    expect(view.getUint32(at, true)).toBe(0x02014b50);
    const crc = view.getUint32(at + 16, true);
    const size = view.getUint32(at + 20, true);
    const nameLen = view.getUint16(at + 28, true);
    const local = view.getUint32(at + 42, true);
    const name = dec.decode(bytes.subarray(at + 46, at + 46 + nameLen));
    expect(view.getUint32(local, true)).toBe(0x04034b50);
    const dataStart = local + 30 + view.getUint16(local + 26, true);
    const data = bytes.subarray(dataStart, dataStart + size);
    expect(crc32(data)).toBe(crc);
    out.set(name, dec.decode(data));
    at += 46 + nameLen;
  }
  return out;
}

describe('crc32', () => {
  it('matches the standard check value', () => {
    expect(crc32(new TextEncoder().encode('123456789'))).toBe(0xcbf43926);
  });
});

describe('columnName', () => {
  it('counts like a spreadsheet', () => {
    expect([0, 25, 26, 27, 701, 702].map(columnName)).toEqual(['A', 'Z', 'AA', 'AB', 'ZZ', 'AAA']);
  });
});

describe('escapeXml', () => {
  it('escapes markup and drops characters XML cannot hold', () => {
    expect(escapeXml('<b>&"x"\u0001')).toBe('&lt;b&gt;&amp;&quot;x&quot;');
  });
});

describe('buildXlsx', () => {
  const rows = [
    ['Platform', 'Status'],
    ['Reddit <script>', 'Done'],
    ['=SUM(A1)', ''],
  ];
  const files = readZip(
    buildXlsx(rows, { sheetName: 'Social Scrub', widths: [20, 10], styleFor: (v, r) => (r === 0 ? 'header' : v === 'Done' ? 'good' : 'plain') }),
  );

  it('contains the parts a spreadsheet app needs', () => {
    expect([...files.keys()].sort()).toEqual([
      '[Content_Types].xml',
      '_rels/.rels',
      'xl/_rels/workbook.xml.rels',
      'xl/styles.xml',
      'xl/workbook.xml',
      'xl/worksheets/sheet1.xml',
    ]);
  });

  it('writes every value as escaped text, never as a formula', () => {
    const sheet = files.get('xl/worksheets/sheet1.xml')!;
    expect(sheet).toContain('<t xml:space="preserve">Reddit &lt;script&gt;</t>');
    expect(sheet).toContain('<t xml:space="preserve">=SUM(A1)</t>');
    expect(sheet).not.toContain('<f>');
  });

  it('styles the header and finished cells, freezes the header and adds a filter', () => {
    const sheet = files.get('xl/worksheets/sheet1.xml')!;
    expect(sheet).toContain('<c r="A1" t="inlineStr" s="1">');
    expect(sheet).toContain('<c r="B2" t="inlineStr" s="2">');
    expect(sheet).toContain('state="frozen"');
    expect(sheet).toContain('<autoFilter ref="A1:B3"/>');
    expect(sheet).toContain('<col min="1" max="1" width="20" customWidth="1"/>');
  });

  it('produces well-formed XML in every part', () => {
    const parser = new DOMParser();
    for (const [name, xml] of files) {
      const doc = parser.parseFromString(xml, 'application/xml');
      expect(doc.getElementsByTagName('parsererror').length, name).toBe(0);
    }
  });
});
