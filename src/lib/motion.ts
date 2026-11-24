/**
 * Helpers that keep the sheet easy to follow when rows move:
 * slide moved rows from where they were, and keep keyboard focus on the same control.
 */

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;

export function rowTops(root: HTMLElement | null): Map<string, number> {
  const tops = new Map<string, number>();
  root?.querySelectorAll<HTMLElement>('tr[data-id]').forEach((tr) => tops.set(tr.dataset.id!, tr.getBoundingClientRect().top));
  return tops;
}

/** Slides each row from its old position to its new one. A row that moved far gets a short highlight. */
export function slideRows(root: HTMLElement | null, before: Map<string, number>): void {
  if (!root || !before.size) return;
  const rowHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--row-h')) || 40;
  root.querySelectorAll<HTMLElement>('tr[data-id]').forEach((tr) => {
    const old = before.get(tr.dataset.id!);
    if (old === undefined) return;
    const dy = old - tr.getBoundingClientRect().top;
    if (Math.abs(dy) < 2) return;
    tr.style.transition = 'none';
    tr.style.transform = `translateY(${dy}px)`;
    if (Math.abs(dy) > rowHeight * 1.5) {
      tr.classList.remove('moved');
      void tr.offsetWidth;
      tr.classList.add('moved');
    }
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        tr.style.transition = 'transform 280ms cubic-bezier(.2,.7,.2,1)';
        tr.style.transform = '';
      }),
    );
  });
}

export interface FocusKey {
  row: string | null;
  control: string;
}

/** Remembers which control has focus, by row and by `data-focus` name. */
export function focusKey(): FocusKey | null {
  const el = document.activeElement as HTMLElement | null;
  const control = el?.dataset?.focus;
  if (!el || !control) return null;
  return { row: el.closest<HTMLElement>('[data-id]')?.dataset.id ?? null, control };
}

/** Moving a row in the DOM drops focus. This puts it back on the same control. */
export function restoreFocus(root: HTMLElement | null, key: FocusKey | null): void {
  if (!root || !key) return;
  const active = document.activeElement;
  if (active && active !== document.body && root.contains(active)) return;
  const scope = key.row ? root.querySelector(`[data-id="${CSS.escape(key.row)}"]`) : root;
  const el = scope?.querySelector<HTMLElement>(`[data-focus="${CSS.escape(key.control)}"]`);
  el?.focus({ preventScroll: true });
}

export function revealRow(root: HTMLElement | null, id: string): void {
  const tr = root?.querySelector<HTMLElement>(`tr[data-id="${CSS.escape(id)}"]`);
  if (!tr) return;
  tr.scrollIntoView({ block: 'center', behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  tr.classList.remove('moved');
  void tr.offsetWidth;
  tr.classList.add('moved');
}

/** Arrow keys move between the controls of the sheet, like a spreadsheet. */
export function moveFocusWithArrows(e: KeyboardEvent, root: HTMLElement | null): void {
  if (!root || !['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return;
  const target = e.target as HTMLElement;
  const tr = target.closest<HTMLElement>('tr[data-id]');
  if (!tr || target.tagName !== 'BUTTON') return;
  const buttons = (row: Element) => [...row.querySelectorAll<HTMLElement>('button')];
  let next: HTMLElement | undefined;
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    const list = buttons(tr);
    next = list[list.indexOf(target) + (e.key === 'ArrowRight' ? 1 : -1)];
  } else {
    const rows = [...root.querySelectorAll<HTMLElement>('tr[data-id]')];
    const other = rows[rows.indexOf(tr) + (e.key === 'ArrowDown' ? 1 : -1)];
    if (other) {
      const r = target.getBoundingClientRect();
      const x = r.left + r.width / 2;
      let best = Infinity;
      for (const b of buttons(other)) {
        const br = b.getBoundingClientRect();
        const d = Math.abs(br.left + br.width / 2 - x);
        if (d < best) {
          best = d;
          next = b;
        }
      }
    }
  }
  if (next) {
    e.preventDefault();
    next.focus();
    next.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }
}
