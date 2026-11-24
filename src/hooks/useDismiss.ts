import { useEffect } from 'preact/hooks';
import type { RefObject } from 'preact';

export type DismissReason = 'outside' | 'escape';

/** Closes a popover on a click outside `inside`, or on Escape. */
export function useDismiss(open: boolean, close: (reason: DismissReason) => void, inside: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!inside.current?.contains(e.target as Node)) close('outside');
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close('escape');
    };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, close, inside]);
}
