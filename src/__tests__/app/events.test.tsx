import { render } from 'preact';
import { act } from 'preact/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const sent: [string, Record<string, unknown> | undefined][] = [];
vi.mock('../../lib/events', () => ({
  eventsEnabled: true,
  track: (name: string, data?: Record<string, unknown>) => void sent.push([name, data]),
}));

const { App } = await import('../../app/App');

let root: HTMLElement;
const $ = <T extends Element = HTMLElement>(sel: string) => root.querySelector<T>(sel);
const click = (el: Element | null) => act(() => (el as HTMLElement).click());

beforeEach(() => {
  sent.length = 0;
  localStorage.clear();
  root = document.createElement('div');
  document.body.appendChild(root);
  act(() => render(<App />, root));
});

afterEach(() => {
  act(() => render(null, root));
  root.remove();
});

describe('anonymous counts', () => {
  it('counts the main actions with coarse details', () => {
    click($('tr[data-id=reddit] .pc-btn'));
    click($('tr[data-id=reddit] .cell[data-focus=step-email]'));
    click($('tr[data-id=reddit] [data-v=delete]'));
    click($('tr[data-id=reddit] .del-btn'));
    expect(sent).toEqual([
      ['check_platform', { group: 'highest' }],
      ['mark_step', { step: 'email', mark: 'done' }],
      ['set_plan', { plan: 'delete' }],
      ['mark_deleted', { deleted: true }],
      ['finish_platform', { how: 'deleted' }],
    ]);
  });

  it('never sends which platform or anything typed', () => {
    click($('tr[data-id=reddit] .pc-btn'));
    click($('tr[data-id=facebook] .cell[data-focus=step-name]'));
    act(() => {
      const input = $<HTMLInputElement>('#add-bottom')!;
      input.value = 'My church directory';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });
    act(() => {
      $('.add-row form')!.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    });
    const all = JSON.stringify(sent).toLowerCase();
    expect(sent.map(([name]) => name)).toContain('add_platform');
    for (const secret of ['reddit', 'facebook', 'church', 'custom-']) expect(all).not.toContain(secret);
  });

  it('counts turning on ideas and copying one, but never sends the idea itself', async () => {
    Object.defineProperty(navigator, 'clipboard', { value: { writeText: () => Promise.resolve() }, configurable: true });
    act(() => {
      const input = $<HTMLInputElement>('#show-ideas')!;
      input.checked = true;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
    const chip = $<HTMLButtonElement>('tr[data-id=facebook] .idea-inline')!;
    await act(async () => chip.click());
    expect(sent).toEqual([
      ['show_ideas', { on: true }],
      ['copy_idea', { kind: 'names', from: 'row' }],
    ]);
    expect(JSON.stringify(sent)).not.toContain(chip.textContent!.split(' ')[0]);
  });
});
