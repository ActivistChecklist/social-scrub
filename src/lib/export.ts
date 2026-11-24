import { GROUPS, STEPS } from '../data/steps';
import { allPlatforms, statusOf, type AppState, type Status } from './state';
import { buildXlsx, type CellStyle } from './xlsx';

const STATUS_WORD: Record<Status, string> = {
  unchecked: '',
  'not-started': 'Not started',
  'in-progress': 'In progress',
  done: 'Done',
  'to-delete': 'To delete',
  deleted: 'Deleted',
};

export const EXPORT_HEADER = ['Priority', 'Platform', 'Website', 'Have it', 'Keep or delete', ...STEPS.map((s) => s.label), 'Deleted', 'Status'];

/** One row per platform, in the same order as the sheet's groups. */
export function exportRows(state: AppState): string[][] {
  const rows: string[][] = [EXPORT_HEADER];
  const platforms = allPlatforms(state);
  for (const group of GROUPS) {
    for (const p of platforms.filter((x) => x.priority === group.id)) {
      const entry = state.entries[p.id];
      const on = entry?.checked === true;
      const del = on && entry.plan === 'delete';
      rows.push([
        group.label,
        p.name,
        p.url ?? '',
        on ? 'Yes' : '',
        !on ? '' : del ? 'Delete' : 'Keep',
        ...STEPS.map((s) => {
          const mark = on && !del ? entry.steps[s.id] : undefined;
          return mark === 'done' ? 'Done' : mark === 'skipped' ? 'Skipped' : '';
        }),
        del ? (entry.deleted ? 'Yes' : 'No') : '',
        STATUS_WORD[statusOf(entry)],
      ]);
    }
  }
  return rows;
}

/**
 * Spreadsheet apps run a cell that starts with = + - @ as a formula. Names people
 * type themselves end up in the file, so those get a leading apostrophe.
 */
export function neutralizeFormula(value: string): string {
  return /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
}

export function toCsv(rows: string[][]): string {
  return rows
    .map((row) =>
      row
        .map((cell) => {
          const v = neutralizeFormula(cell);
          return /[",\r\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
        })
        .join(','),
    )
    .join('\r\n');
}

function styleFor(value: string, rowIndex: number): CellStyle {
  if (rowIndex === 0) return 'header';
  if (value === 'Done' || value === 'Deleted') return 'good';
  if (value === 'Skipped') return 'muted';
  return 'plain';
}

export function toXlsx(rows: string[][]): Uint8Array {
  return buildXlsx(rows, {
    sheetName: 'Social Scrub',
    widths: [16, 22, 28, 8, 14, ...STEPS.map(() => 13), 9, 12],
    styleFor,
  });
}

export function exportFilename(ext: 'csv' | 'xlsx', date = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `social-scrub-${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}.${ext}`;
}

/** Hands the file to the browser. Nothing leaves the device. */
export function downloadFile(filename: string, data: BlobPart, type: string): void {
  const url = URL.createObjectURL(new Blob([data], { type }));
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export function downloadExport(state: AppState, kind: 'csv' | 'xlsx'): void {
  const rows = exportRows(state);
  if (kind === 'csv') {
    // The byte order mark tells Excel the file is UTF-8.
    downloadFile(exportFilename('csv'), '﻿' + toCsv(rows), 'text/csv;charset=utf-8');
  } else {
    const bytes = toXlsx(rows);
    downloadFile(exportFilename('xlsx'), bytes.slice().buffer, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  }
}
