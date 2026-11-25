import { render } from 'preact';
import { act } from 'preact/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
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
  it('shows the app icon as the header logo', () => {
    const logo = $<HTMLImageElement>('.brand img');
    expect(logo?.getAttribute('src')).toBe('/android-chrome-192x192.png');
    expect(logo?.getAttribute('alt')).toBe('');
    expect($('.brand')?.textContent).toBe('Social Scrub');
  });

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

  it('titles each column popover with the words of its column header', () => {
    const headers = $$('.th-btn');
    expect(headers.length).toBeGreaterThan(9);
    for (const header of headers) {
      click(header);
      expect($('#column-info h2')?.textContent).toBe(header.textContent);
      expect($('#column-info')?.getAttribute('aria-label')).toBe(header.textContent);
      click(header);
    }
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

  it('links to an avatar source in the photo help', () => {
    click($$('.th-btn').find((b) => b.textContent === 'Remove or change photo')!);
    const link = root.querySelector<HTMLAnchorElement>('#column-info .pop-links a');
    expect(link?.textContent).toBe('StrongPhrase');
    expect(link?.href).toBe('https://strongphrase.net/identity/');
    expect(link?.target).toBe('_blank');
  });

  it('offers username ideas that work on every big platform', () => {
    click($$('.th-btn').find((b) => b.textContent === 'Use a random username')!);
    const ideas = [...root.querySelectorAll<HTMLButtonElement>('#column-info .idea')].map((b) => b.textContent!);
    expect(ideas).toHaveLength(3);
    for (const idea of ideas) expect(idea).toMatch(/^[A-Za-z0-9]{1,15}$/);
  });

  it('keeps the New ideas button beside the heading, outside the list it refreshes', () => {
    click($$('.th-btn').find((b) => b.textContent === 'Change display name')!);
    const button = $<HTMLButtonElement>('#column-info .ideas-new')!;
    expect(button.textContent).toBe('New ideas');
    expect(button.closest('.ideas-head')).not.toBeNull();
    expect(button.closest('.idea-list')).toBeNull();
    click(button);
    expect($$('#column-info .idea')).toHaveLength(3);
    expect($('#column-info .ideas-new')).toBe(button);
  });

  it('copies an idea when it is clicked and marks it copied', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
    click($$('.th-btn').find((b) => b.textContent === 'Change display name')!);
    const chip = $<HTMLButtonElement>('#column-info .idea')!;
    const name = chip.textContent!;
    await act(async () => chip.click());
    expect(writeText).toHaveBeenCalledWith(name);
    expect(chip.classList.contains('copied')).toBe(true);
    expect(chip.getAttribute('aria-label')).toBe(`Copied ${name}`);
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

  it('shows a name and username idea under those steps on each kept row when the switch is on', () => {
    const toggle = () => act(() => {
      const input = $<HTMLInputElement>('#show-ideas')!;
      input.checked = !input.checked;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
    const idea = (id: string, step: string) => $(`tr[data-id=${id}] .cell[data-focus=step-${step}] + .idea-inline`)?.textContent;
    expect($$('.idea-inline')).toHaveLength(0);

    toggle();
    expect($('.grid')?.classList.contains('ideas-on')).toBe(true);
    expect(idea('facebook', 'name')).toMatch(/^[A-Z][A-Za-z-]+ [A-Z][A-Za-z-]+$/);
    expect(idea('facebook', 'username')).toMatch(/^[A-Za-z0-9]{1,15}$/);
    // One under each of the two steps, and none on rows that aren't checked.
    expect($$('tr[data-id=facebook] .idea-inline')).toHaveLength(2);
    expect($$('tr[data-id=reddit] .idea-inline')).toHaveLength(0);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!).showIdeas).toBe(true);

    // A row keeps its ideas while other things change, and a delete row has none.
    const before = idea('facebook', 'name');
    click($('tr[data-id=facebook] .cell[data-focus=step-email]'));
    expect(idea('facebook', 'name')).toBe(before);
    click($('tr[data-id=instagram] [data-v=delete]'));
    expect($$('tr[data-id=instagram] .idea-inline')).toHaveLength(0);

    // Marking the box, done or skipped, hides that step's idea. Clearing it brings the same idea back.
    const nameBox = () => $('tr[data-id=facebook] .cell[data-focus=step-name]')!;
    click(nameBox());
    expect(idea('facebook', 'name')).toBeUndefined();
    expect(idea('facebook', 'username')).toBeTruthy();
    click(nameBox());
    expect(nameBox().dataset.state).toBe('skipped');
    expect(idea('facebook', 'name')).toBeUndefined();
    click(nameBox());
    expect(idea('facebook', 'name')).toBe(before);

    toggle();
    expect($$('.idea-inline')).toHaveLength(0);
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

  it('mentions Cyd after Block Party on the X and Bluesky rows only', () => {
    click($('tr[data-id=twitter] .pc-btn'));
    click($('tr[data-id=bluesky] .pc-btn'));
    const notes = (id: string) => [...root.querySelectorAll(`tr[data-id=${id}] .extra-notes > span`)].map((s) => s.className);
    expect(notes('twitter')).toEqual(['bp-note', 'cyd-note']);
    expect(notes('bluesky')).toEqual(['bp-note', 'cyd-note']);
    expect($('tr[data-id=twitter] .cyd-note')?.textContent).toBe('Cyd can delete your old posts');
    expect($<HTMLAnchorElement>('tr[data-id=twitter] .cyd-note a')?.href).toBe('https://cyd.social/');
    expect($('tr[data-id=facebook] .cyd-note')).toBeNull();
    // Gone once old posts are cleaned up, and no longer in the column help.
    click($('tr[data-id=twitter] .cell[data-focus=step-posts]'));
    expect($('tr[data-id=twitter] .cyd-note')).toBeNull();
    click($$('.th-btn').find((b) => b.textContent === 'Clean up old posts')!);
    expect($('#column-info')?.textContent).not.toContain('Cyd');
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
