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

  it('starts each step header with what to do', () => {
    const headers = $$('thead .th-btn').map((b) => b.textContent);
    expect(headers).toContain('Remove or change photo');
    expect(headers).toContain('Use a random username');
  });

  it('lists email alias services in the email help', () => {
    click($$('.th-btn').find((b) => b.textContent === 'Use a unique email')!);
    const links = [...root.querySelectorAll<HTMLAnchorElement>('#column-info .pop-links a')];
    expect(links.map((a) => a.textContent)).toContain('Qwacky');
    for (const a of links) {
      expect(a.href).toMatch(/^https:\/\//);
      expect(a.rel).toContain('noopener');
    }
  });

  it('offers username ideas that work on every big platform', () => {
    click($$('.th-btn').find((b) => b.textContent === 'Use a random username')!);
    const ideas = [...root.querySelectorAll<HTMLButtonElement>('#column-info .idea')].map((b) => b.textContent!);
    expect(ideas).toHaveLength(3);
    for (const idea of ideas) expect(idea).toMatch(/^[A-Za-z0-9]{1,15}$/);
  });

  it('keeps the platform and privacy settings help short', () => {
    click($$('.th-btn').find((b) => b.textContent === 'Platform')!);
    expect($('#column-info .how')).toBeNull();
    click($$('.th-btn').find((b) => b.textContent === 'Lock down privacy')!);
    expect($('#column-info')?.textContent).not.toContain('Block Party');
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

  it('can clear all data from the privacy note', () => {
    click($('tr[data-id=reddit] .pc-btn'));
    click($('.privacy-btn'));
    const dialog = $<HTMLDialogElement>('dialog.modal')!;
    click([...dialog.querySelectorAll('button')].find((b) => b.textContent === 'Clear all data')!);
    click([...dialog.querySelectorAll('button')].find((b) => b.textContent === 'Clear everything')!);
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
    expect(dialog.textContent).toContain('Cleared.');
  });

  it('puts the Add button on its own line when a search finds nothing', () => {
    type($<HTMLInputElement>('#search')!, 'Ravelry');
    expect($('.add-in')?.classList.contains('stacked')).toBe(true);
    type($<HTMLInputElement>('#search')!, 'face');
    expect($('.add-in')?.classList.contains('stacked')).toBe(false);
  });

  it('points to Block Party next to Privacy settings on the platforms it supports', () => {
    const note = (id: string) => $(`tr[data-id=${id}] .bp-note`);
    expect(note('facebook')?.textContent).toBe('Block Party can make this easier');
    expect(note('facebook')?.querySelector('a')?.getAttribute('href')).toBe('https://www.blockpartyapp.com');
    // Not on platforms Block Party doesn't cover, or on rows that aren't checked.
    click($('tr[data-id=whatsapp] .pc-btn'));
    expect(note('whatsapp')).toBeNull();
    expect(note('reddit')).toBeNull();
    // Gone once the privacy settings step is marked, or when deleting.
    click($('tr[data-id=facebook] .cell[data-focus=step-privacy]'));
    expect(note('facebook')).toBeNull();
    click($('tr[data-id=instagram] [data-v=delete]'));
    expect(note('instagram')).toBeNull();
  });

  it('explains the Block Party recommendation from the question mark', () => {
    const dialog = [...root.querySelectorAll<HTMLDialogElement>('dialog.modal')].find((d) => d.textContent?.includes('About Block Party'))!;
    expect(dialog.open).toBe(false);
    click($('tr[data-id=facebook] .bp-about'));
    expect(dialog.open).toBe(true);
    expect(dialog.textContent).toContain("We're not affiliated with Block Party");
    expect(dialog.textContent).toContain('The code JOINTHEPARTY makes the paid plan cheaper.');
    expect(dialog.querySelector('p a')?.getAttribute('href')).toBe('https://www.blockpartyapp.com');
    expect(dialog.textContent).not.toContain('Copy code');
    expect(dialog.textContent).not.toContain('Go to Block Party');
  });

  it('links to the contact page from the footer', () => {
    const contact = $$('.foot-links a').find((a) => a.textContent === 'Contact') as HTMLAnchorElement;
    expect(contact.href).toBe('https://activistchecklist.org/contact/');
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
