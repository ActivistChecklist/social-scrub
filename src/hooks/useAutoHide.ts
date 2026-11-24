import { useEffect, useState } from 'preact/hooks';
import type { RefObject } from 'preact';

const PHONE = '(max-width: 760px)';
/** How far to scroll in one direction before the bar hides or comes back. */
const TRAVEL = 24;
/**
 * After the bar hides or shows, the sheet changes height (over the .22s slide). Near the
 * end of the list the browser then clamps scrollTop, which looks like scrolling. Scroll
 * movement in this window is not counted, so the clamp can't flip the bar back.
 */
const SETTLE_MS = 350;

/**
 * On a phone, slides the top bar away while the sheet scrolls down and brings it back
 * when it scrolls up. The bar stays put near the top of the sheet, while something in
 * it has focus (like the search box), and while one of its menus is open.
 *
 * Keeps the CSS variable --top-h equal to the bar's height; hiding pulls the bar up by
 * that much so the sheet gets the space.
 */
export function useAutoHide(bar: RefObject<HTMLElement | null>, scroller: RefObject<HTMLElement | null>): boolean {
  const [away, setAway] = useState(false);

  useEffect(() => {
    const el = bar.current;
    const sheet = scroller.current;
    if (!el || !sheet) return;
    const phone = window.matchMedia?.(PHONE);
    let hidden = false;
    let lastY = sheet.scrollTop;
    let travel = 0;
    let settleUntil = 0;

    const measure = () => document.documentElement.style.setProperty('--top-h', `${el.offsetHeight}px`);
    const set = (next: boolean) => {
      if (next === hidden) return;
      hidden = next;
      travel = 0;
      settleUntil = Date.now() + SETTLE_MS;
      setAway(next);
    };
    const mustShow = () =>
      !phone?.matches ||
      sheet.scrollTop < el.offsetHeight ||
      el.contains(document.activeElement) ||
      el.querySelector('[aria-expanded="true"]') !== null;

    const onScroll = () => {
      const y = Math.max(0, sheet.scrollTop);
      const dy = y - lastY;
      if (dy === 0) return; // Some scroll events report no movement; they shouldn't reset the count.
      lastY = y;
      if (mustShow()) {
        travel = 0;
        set(false);
        return;
      }
      if (Date.now() < settleUntil) return;
      // Count distance in the current direction; a change of direction starts over.
      travel = Math.sign(dy) === Math.sign(travel) ? travel + dy : dy;
      if (travel > TRAVEL) set(true);
      else if (travel < -TRAVEL) set(false);
    };
    const onFocus = () => {
      if (el.contains(document.activeElement)) set(false);
    };
    const onPhoneChange = () => set(false);

    measure();
    const resize = typeof ResizeObserver === 'function' ? new ResizeObserver(measure) : null;
    resize?.observe(el);
    sheet.addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('focusin', onFocus);
    phone?.addEventListener?.('change', onPhoneChange);
    return () => {
      resize?.disconnect();
      sheet.removeEventListener('scroll', onScroll);
      el.removeEventListener('focusin', onFocus);
      phone?.removeEventListener?.('change', onPhoneChange);
    };
  }, [bar, scroller]);

  return away;
}
