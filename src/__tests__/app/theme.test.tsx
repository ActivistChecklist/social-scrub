import { render } from 'preact';
import { act } from 'preact/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from '../../app/App';
import { THEME_KEY } from '../../lib/storage';

let root: HTMLElement;

const html = document.documentElement;
const $ = <T extends Element = HTMLElement>(sel: string) => root.querySelector<T>(sel);
const click = (el: Element | null) => act(() => (el as HTMLElement).click());
const key = (el: Element, k: string) => act(() => void el.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true })));
const trigger = () => $<HTMLButtonElement>('.theme-btn')!;
const items = () => [...root.querySelectorAll<HTMLElement>('.theme-menu [role="menuitemradio"]')];
const item = (label: string) => items().find((b) => b.textContent?.startsWith(label))!;
const showsMoon = () => trigger().querySelector('circle') === null;

function mount() {
  root = document.createElement('div');
  document.body.appendChild(root);
  act(() => render(<App />, root));
}

beforeEach(() => {
  localStorage.clear();
  html.removeAttribute('data-theme');
});

afterEach(() => {
  act(() => render(null, root));
  root.remove();
  vi.unstubAllGlobals();
});

describe('theme menu', () => {
  it('follows the device until something is picked, and saves nothing', () => {
    mount();
    expect(html.hasAttribute('data-theme')).toBe(false);
    expect(localStorage.getItem(THEME_KEY)).toBeNull();
    expect(trigger().getAttribute('aria-label')).toBe('Theme: System. Change theme');
    expect(trigger().title).toBe('Change theme');
  });

  it('opens Light, Dark and System with the current one checked and focused', () => {
    mount();
    click(trigger());
    expect(trigger().getAttribute('aria-expanded')).toBe('true');
    expect(items().map((b) => b.textContent)).toEqual(['Light', 'Dark', 'SystemActive']);
    expect(item('System').getAttribute('aria-checked')).toBe('true');
    expect(document.activeElement).toBe(item('System'));
  });

  it('picking Dark switches the page, saves it, closes the menu and returns focus', () => {
    mount();
    click(trigger());
    click(item('Dark'));
    expect(html.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem(THEME_KEY)).toBe('dark');
    expect($('.theme-menu')).toBeNull();
    expect(document.activeElement).toBe(trigger());
    expect(trigger().getAttribute('aria-label')).toBe('Theme: Dark. Change theme');
    expect(showsMoon()).toBe(true);
  });

  it('going back to System clears the attribute and the saved key', () => {
    localStorage.setItem(THEME_KEY, 'light');
    mount();
    expect(html.getAttribute('data-theme')).toBe('light');
    click(trigger());
    click(item('System'));
    expect(html.hasAttribute('data-theme')).toBe(false);
    expect(localStorage.getItem(THEME_KEY)).toBeNull();
  });

  it('starts with a saved choice', () => {
    localStorage.setItem(THEME_KEY, 'dark');
    mount();
    expect(html.getAttribute('data-theme')).toBe('dark');
    expect(trigger().getAttribute('aria-label')).toBe('Theme: Dark. Change theme');
  });

  it('shows the moon on System when the device is dark', () => {
    vi.stubGlobal('matchMedia', (query: string) => ({
      matches: query === '(prefers-color-scheme: dark)',
      addEventListener() {},
      removeEventListener() {},
    }));
    mount();
    expect(showsMoon()).toBe(true);
  });

  it('arrow keys move through the items and wrap; Escape closes and returns focus', () => {
    mount();
    click(trigger());
    const menu = $('.theme-menu')!;
    key(menu, 'ArrowDown');
    expect(document.activeElement).toBe(item('Light'));
    key(menu, 'ArrowUp');
    expect(document.activeElement).toBe(item('System'));
    key(menu, 'Home');
    expect(document.activeElement).toBe(item('Light'));
    key(menu, 'End');
    expect(document.activeElement).toBe(item('System'));
    key(menu, 'Escape');
    expect($('.theme-menu')).toBeNull();
    expect(document.activeElement).toBe(trigger());
  });

  it('Clear all data goes back to following the device', () => {
    localStorage.setItem(THEME_KEY, 'dark');
    mount();
    const foot = () => [...root.querySelectorAll<HTMLElement>('.foot button')];
    click(foot().find((b) => b.textContent === 'Clear all data')!);
    click(foot().find((b) => b.textContent === 'Clear everything')!);
    expect(html.hasAttribute('data-theme')).toBe(false);
    expect(localStorage.getItem(THEME_KEY)).toBeNull();
    expect(trigger().getAttribute('aria-label')).toBe('Theme: System. Change theme');
  });
});
