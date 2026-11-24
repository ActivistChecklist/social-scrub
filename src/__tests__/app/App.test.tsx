import { render } from 'preact';
import { act } from 'preact/test-utils';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { App } from '../../app/App';
import { STARTERS } from '../../data/steps';
import { STORAGE_KEY } from '../../lib/storage';

let root: HTMLElement;

const $ = <T extends Element = HTMLElement>(sel: string) => root.querySelector<T>(sel);
const $$ = (sel: string) => [...root.querySelectorAll<HTMLElement>(sel)];
const rowIds = (group: number) => [...root.querySelectorAll('tbody')[group].querySelectorAll<HTMLElement>('tr[data-id]')].map((tr) => tr.dataset.id);
const click = (el: Element | null) => act(() => (el as HTMLElement).click());
const type = (el: HTMLInputElement, value: string) =>
  act(() => {
    el.value = value;
    el.dispatchEvent(new Event('input', { bubbles: true }));
  });

beforeEach(() => {
  localStorage.clear();
  root = document.createElement('div');
  document.body.appendChild(root);
  act(() => render(<App />, root));
});

afterEach(() => {
  act(() => render(null, root));
  root.remove();
});

describe('App', () => {
  it('opens with the common accounts checked and writes nothing yet', () => {
    expect(rowIds(0).slice(0, STARTERS.length)).toEqual(STARTERS);
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
    expect($('.summary')?.textContent).toContain('0 of 5');
  });

  it('checking a row picks Keep, moves it under the checked rows and saves', () => {
    click($('tr[data-id=reddit] .pc-btn'));
    expect($('tr[data-id=reddit] [data-v=keep]')?.getAttribute('aria-checked')).toBe('true');
    expect(rowIds(0).slice(0, 6)).toEqual([...STARTERS, 'reddit']);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!).entries.reddit.checked).toBe(true);
  });

  it('shows no status icon until the first box is checked, then cycles done, skipped, blank', () => {
    const cell = () => $('tr[data-id=facebook] .cell[data-focus=step-email]')!;
    expect($('tr[data-id=facebook] .p-stat')).toBeNull();
    click(cell());
    expect(cell().dataset.state).toBe('done');
    expect($('tr[data-id=facebook] .p-stat')?.dataset.tip).toBe('1 of 8 steps done');
    click(cell());
    expect(cell().dataset.state).toBe('skipped');
    click(cell());
    expect(cell().dataset.state).toBe('');
  });

  it('Delete swaps the steps for one checkbox with no extra hint', () => {
    click($('tr[data-id=linkedin] [data-v=delete]'));
    expect($('tr[data-id=linkedin] .c-delete')?.textContent).toBe('I deleted this account');
    click($('tr[data-id=linkedin] .del-btn'));
    expect($('tr[data-id=linkedin] .c-delete')?.textContent).toBe('Deleted');
    expect($('.summary')?.textContent).toContain('1 of 5');
  });

  it('Select all checks every unchecked platform in that group', () => {
    const divider = $$('.divider')[0];
    click(divider.querySelector('.div-all'));
    expect(root.querySelectorAll('tbody')[0].querySelector('.divider')).toBeNull();
    expect($$('tbody')[0].querySelectorAll('tr.dim').length).toBe(0);
  });

  it('adds your own platform from the toolbar and lists it above the others', () => {
    click($('.add-wrap > button'));
    type($<HTMLInputElement>('#add-top')!, '  Church directory ');
    act(() => {
      $<HTMLFormElement>('#add-platform')!.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    });
    expect($('.grp-name')?.textContent).toBe('Your own platforms');
    expect($('tbody tr[data-id] .p-name')?.textContent).toBe('Church directory');
  });

  it('offers to add a search that matches nothing', () => {
    type($<HTMLInputElement>('#search')!, 'Ravelry');
    expect($('.add-note')?.textContent).toBe('No listed platform matches "Ravelry".');
    click($('.add-row button'));
    expect($<HTMLInputElement>('#search')!.value).toBe('');
    expect($('tbody tr[data-id] .p-name')?.textContent).toBe('Ravelry');
  });

  it('links to Block Party from the privacy settings help', () => {
    click($$('.th-btn').find((b) => b.textContent === 'Privacy settings')!);
    const link = $<HTMLAnchorElement>('#column-info .tool a');
    expect(link?.href).toBe('https://www.blockpartyapp.com/');
    expect(link?.rel).toContain('noopener');
  });

  it('opens a short privacy note from the header', () => {
    const dialog = $<HTMLDialogElement>('dialog.modal')!;
    expect(dialog.open).toBe(false);
    click($('.privacy-btn'));
    expect(dialog.open).toBe(true);
    expect(dialog.textContent).toContain('Your checklist stays on this device');
    expect(dialog.querySelector('a')?.getAttribute('href')).toBe('/privacy.html');
    click([...dialog.querySelectorAll('button')].find((b) => b.textContent === 'Close')!);
    expect(dialog.open).toBe(false);
  });

  it('shows the reason on unchecked rows', () => {
    expect($('tr[data-id=reddit] .why')?.textContent).toBe('Can reveal your interests and community memberships');
  });

  it('clears everything after a confirmation', () => {
    click($('tr[data-id=reddit] .pc-btn'));
    expect(localStorage.getItem(STORAGE_KEY)).not.toBeNull();
    click([...$$('.foot button')].find((b) => b.textContent === 'Clear all data')!);
    click([...$$('.foot button')].find((b) => b.textContent === 'Clear everything')!);
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
    expect($('tr[data-id=reddit] .pc-btn')?.getAttribute('aria-checked')).toBe('false');
    expect($('.foot')?.textContent).toContain('Cleared.');
  });
});
