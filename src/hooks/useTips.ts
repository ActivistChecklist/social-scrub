import { useEffect, useLayoutEffect, useRef } from 'preact/hooks';
import type { RefObject } from 'preact';

/**
 * Small hover hints for anything inside `root` with a `data-tip` attribute.
 *
 * - Step boxes and status icons show their hint right away.
 * - Platform names (`data-tip-delay`) wait a moment, so moving the mouse across rows doesn't flash reasons.
 * - On a phone, press and hold a name to see its reason, or tap a status icon.
 *
 * The hint is one element moved around by hand, so hovering doesn't re-render the sheet.
 */
export function useTips(root: RefObject<HTMLElement | null>, tip: RefObject<HTMLElement | null>, renderKey: unknown) {
  const refresh = useRef<() => void>(() => {});

  useEffect(() => {
    const el = root.current;
    const box = tip.current;
    if (!el || !box) return;

    let shown: HTMLElement | null = null;
    let pending: HTMLElement | null = null;
    let timer = 0;
    let press = 0;
    let pointer: [number, number] | null = null;
    let swallowClick = false;

    const show = (target: HTMLElement | null) => {
      shown = target;
      const text = target?.dataset.tip;
      if (!target || !text) {
        box.hidden = true;
        return;
      }
      box.textContent = text;
      box.hidden = false;
      const isName = target.classList.contains('pc-btn');
      const r = (isName ? (target.querySelector('.p-name') ?? target) : target).getBoundingClientRect();
      const w = box.offsetWidth;
      const want = isName ? r.left + w / 2 - 4 : r.left + r.width / 2;
      box.style.left = `${Math.max(16 + w / 2, Math.min(want, window.innerWidth - 16 - w / 2))}px`;
      box.style.top = `${r.top + r.height / 2 - 9}px`;
    };
    const cancel = () => {
      clearTimeout(timer);
      pending = null;
    };
    const tipTarget = (node: EventTarget | null) => (node instanceof Element ? node.closest<HTMLElement>('[data-tip]') : null);

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      pointer = [e.clientX, e.clientY];
      const t = tipTarget(e.target);
      if (t === shown || (t && t === pending)) return;
      cancel();
      if (t && 'tipDelay' in t.dataset) {
        show(null);
        shown = null;
        pending = t;
        timer = window.setTimeout(() => {
          pending = null;
          show(t);
        }, 400);
      } else {
        show(t);
      }
    };
    const onLeave = () => {
      pointer = null;
      cancel();
      show(null);
    };
    const onScroll = () => {
      cancel();
      show(null);
    };
    const onFocusIn = (e: FocusEvent) => {
      const t = e.target as HTMLElement;
      if (t.matches('.cell:focus-visible, .p-stat:focus-visible')) show(t);
    };
    const onFocusOut = () => {
      if (!pointer) show(null);
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') return;
      show(null);
      const t = tipTarget(e.target);
      if (!t || !('tipDelay' in t.dataset)) return;
      clearTimeout(press);
      press = window.setTimeout(() => {
        swallowClick = true;
        show(t);
      }, 450);
    };
    const endPress = () => clearTimeout(press);
    // A long press shows the reason; it shouldn't also toggle the checkbox.
    const onClickCapture = (e: MouseEvent) => {
      if (!swallowClick) return;
      swallowClick = false;
      e.stopPropagation();
      e.preventDefault();
    };
    const onContextMenu = (e: Event) => {
      if (swallowClick) e.preventDefault();
    };
    const onClick = (e: MouseEvent) => {
      const stat = (e.target as Element).closest<HTMLElement>('.p-stat');
      if (stat) show(stat);
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    el.addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('focusin', onFocusIn);
    el.addEventListener('focusout', onFocusOut);
    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointerup', endPress);
    el.addEventListener('pointercancel', endPress);
    el.addEventListener('click', onClickCapture, true);
    el.addEventListener('click', onClick);
    el.addEventListener('contextmenu', onContextMenu);

    // After the sheet re-renders, the element under the pointer may be a new one.
    // Re-check boxes, but don't pop a platform's reason until the pointer moves onto a name on purpose.
    refresh.current = () => {
      cancel();
      if (pointer) {
        const under = document.elementFromPoint(pointer[0], pointer[1]);
        const t = tipTarget(under);
        if (t && 'tipDelay' in t.dataset) {
          show(null);
          shown = t;
        } else {
          show(t);
        }
        return;
      }
      const active = document.activeElement as HTMLElement | null;
      show(active?.matches('.cell:focus-visible, .p-stat:focus-visible') ? active : null);
    };

    return () => {
      cancel();
      clearTimeout(press);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      el.removeEventListener('scroll', onScroll);
      el.removeEventListener('focusin', onFocusIn);
      el.removeEventListener('focusout', onFocusOut);
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointerup', endPress);
      el.removeEventListener('pointercancel', endPress);
      el.removeEventListener('click', onClickCapture, true);
      el.removeEventListener('click', onClick);
      el.removeEventListener('contextmenu', onContextMenu);
    };
  }, [root, tip]);

  useLayoutEffect(() => {
    refresh.current();
  }, [renderKey]);
}
