import { render } from 'preact';
import { useRef } from 'preact/hooks';
import { act } from 'preact/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useAutoHide } from '../../hooks/useAutoHide';

let root: HTMLElement;
let phone = true;

function Harness() {
  const bar = useRef<HTMLDivElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const away = useAutoHide(bar, sheet);
  return (
    <div>
      <div ref={bar} class={away ? 'top away' : 'top'}>
        <input id="search" />
        <button id="menu" aria-expanded="false" />
      </div>
      <div ref={sheet} id="sheet" />
    </div>
  );
}

const sheet = () => root.querySelector<HTMLElement>('#sheet')!;
const isAway = () => root.querySelector('.top')!.classList.contains('away');
/** One scroll event, then about a frame of time, like a real scroll. */
function scrollTo(y: number) {
  act(() => {
    Object.defineProperty(sheet(), 'scrollTop', { value: y, configurable: true });
    sheet().dispatchEvent(new Event('scroll'));
  });
  vi.advanceTimersByTime(16);
}
function scrollThrough(from: number, to: number) {
  const step = from < to ? 10 : -10;
  for (let y = from; step > 0 ? y <= to : y >= to; y += step) {
    scrollTo(y);
    scrollTo(y); // a repeat event at the same spot, as browsers sometimes send
  }
}

beforeEach(() => {
  vi.useFakeTimers();
  phone = true;
  vi.stubGlobal('matchMedia', (q: string) => ({ matches: phone, media: q, addEventListener() {}, removeEventListener() {} }));
  root = document.createElement('div');
  document.body.appendChild(root);
  act(() => render(<Harness />, root));
});

afterEach(() => {
  act(() => render(null, root));
  root.remove();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe('useAutoHide', () => {
  it('hides the bar on scrolling down and brings it back on scrolling up', () => {
    scrollThrough(0, 300);
    expect(isAway()).toBe(true);
    scrollThrough(300, 250);
    expect(isAway()).toBe(false);
  });

  it('does not bring the bar back when the sheet grows and the browser clamps the scroll', () => {
    scrollThrough(900, 960); // the bar hides on the first step; this takes about 220ms, the length of the slide
    expect(isAway()).toBe(true);
    // Hiding the bar makes the sheet taller, so during the slide the browser pulls scrollTop back by the bar's height.
    scrollTo(860);
    expect(isAway()).toBe(true);
    // Real upward scrolling once the slide is over still brings it back.
    vi.advanceTimersByTime(400);
    scrollThrough(860, 810);
    expect(isAway()).toBe(false);
  });

  it('ignores small wiggles', () => {
    scrollThrough(0, 300);
    scrollThrough(300, 290);
    expect(isAway()).toBe(true);
  });

  it('keeps the bar while its search box has focus or a menu is open', () => {
    act(() => root.querySelector<HTMLInputElement>('#search')!.focus());
    scrollThrough(0, 300);
    expect(isAway()).toBe(false);
    act(() => root.querySelector<HTMLInputElement>('#search')!.blur());
    root.querySelector('#menu')!.setAttribute('aria-expanded', 'true');
    scrollThrough(300, 600);
    expect(isAway()).toBe(false);
  });

  it('never hides on wider screens', () => {
    act(() => render(null, root));
    phone = false;
    act(() => render(<Harness />, root));
    scrollThrough(0, 400);
    expect(isAway()).toBe(false);
  });
});
