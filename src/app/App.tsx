import { useLayoutEffect, useMemo, useRef, useState } from 'preact/hooks';
import { Header } from '../components/Header';
import type { RowActions } from '../components/Row';
import { Sheet, type AddSource } from '../components/Sheet';
import { Toolbar } from '../components/Toolbar';
import { useAutoHide } from '../hooks/useAutoHide';
import { track } from '../lib/events';
import { downloadExport } from '../lib/export';
import { focusKey, prefersReducedMotion, restoreFocus, revealRow, rowTops, slideRows, type FocusKey } from '../lib/motion';
import {
  addCustom,
  checkAll,
  createInitialState,
  cycleStep,
  groupOf,
  isChecked,
  removeCustom,
  setOnlyMine,
  setPlan,
  statusOf,
  toggleChecked,
  toggleDeleted,
  type AppState,
} from '../lib/state';
import { clearAllData, loadState, saveState } from '../lib/storage';

export function App() {
  const [state, setState] = useState<AppState>(loadState);
  const [query, setQuery] = useState('');
  const scroller = useRef<HTMLElement>(null);
  const top = useRef<HTMLDivElement>(null);
  const topAway = useAutoHide(top, scroller);

  // The latest state, readable from event handlers without waiting for a render.
  const current = useRef(state);
  current.current = state;

  // Work to do right after the next render: slide moved rows, keep focus, scroll a new row into view.
  const after = useRef<{ tops: Map<string, number> | null; focus: FocusKey | null; reveal: string | null }>({
    tops: null,
    focus: null,
    reveal: null,
  });

  /** Applies a change, saves it, and re-renders. Returns false if nothing changed. */
  const commit = (next: AppState, opts: { slide?: boolean } = {}) => {
    if (next === current.current) return false;
    if (opts.slide && !prefersReducedMotion()) after.current.tops = rowTops(scroller.current);
    after.current.focus = focusKey();
    current.current = next;
    saveState(next);
    setState(next);
    return true;
  };

  useLayoutEffect(() => {
    const a = after.current;
    if (a.focus) restoreFocus(scroller.current, a.focus);
    if (a.tops) slideRows(scroller.current, a.tops);
    if (a.reveal) revealRow(scroller.current, a.reveal);
    a.focus = a.tops = a.reveal = null;
  });

  // Each action also sends an anonymous count (see lib/events.ts). Counts never say which platform.
  const act = useMemo<Omit<RowActions, 'blockPartyInfo'>>(
    () => ({
      toggle: (id) => {
        const wasChecked = isChecked(current.current, id);
        if (commit(toggleChecked(current.current, id), { slide: true })) {
          track(wasChecked ? 'uncheck_platform' : 'check_platform', { group: groupOf(id) });
        }
      },
      checkAll: (ids) => {
        const count = ids.filter((id) => !isChecked(current.current, id)).length;
        if (commit(checkAll(current.current, ids), { slide: true })) {
          track('select_all', { group: ids.length ? groupOf(ids[0]) : '', count });
        }
      },
      plan: (id, plan) => {
        if (commit(setPlan(current.current, id, plan))) track('set_plan', { plan });
      },
      step: (id, step) => {
        const before = statusOf(current.current.entries[id]);
        const next = cycleStep(current.current, id, step);
        if (!commit(next)) return;
        track('mark_step', { step, mark: next.entries[id].steps[step] ?? 'cleared' });
        if (before !== 'done' && statusOf(next.entries[id]) === 'done') track('finish_platform', { how: 'secured' });
      },
      deleted: (id) => {
        const next = toggleDeleted(current.current, id);
        if (!commit(next)) return;
        const deleted = next.entries[id].deleted;
        track('mark_deleted', { deleted });
        if (deleted) track('finish_platform', { how: 'deleted' });
      },
      remove: (id) => {
        if (commit(removeCustom(current.current, id), { slide: true })) track('remove_platform');
      },
    }),
    [],
  );

  /** Adds (or finds) a platform, then scrolls to it. Returns false when the name was empty. */
  const addPlatform = (name: string, from: AddSource | 'toolbar') => {
    const { state: next, id } = addCustom(current.current, name);
    if (!id) return false;
    // Clear the search so the new row isn't filtered out.
    const searchWillChange = from !== 'sheet' && query !== '';
    if (searchWillChange) setQuery('');
    if (commit(next) || searchWillChange) after.current.reveal = id;
    else revealRow(scroller.current, id); // Already listed and checked, and nothing will re-render.
    track('add_platform', { from, listed: groupOf(id) !== 'custom' });
    return true;
  };

  const clearAll = () => {
    track('clear_data');
    clearAllData();
    const fresh = createInitialState();
    current.current = fresh;
    setQuery('');
    setState(fresh);
    scroller.current?.scrollTo({ top: 0 });
  };

  return (
    <div class="app">
      <div class={topAway ? 'top away' : 'top'} ref={top}>
        <Header
          state={state}
          onClearAll={clearAll}
          onDownload={(format) => {
            downloadExport(current.current, format);
            track('download', { format });
          }}
        />
        <Toolbar
          query={query}
          onQuery={setQuery}
          onlyMine={state.onlyMine}
          onOnlyMine={(on) => {
            if (commit(setOnlyMine(current.current, on))) track('filter_checked', { on });
          }}
          onAdd={(name) => addPlatform(name, 'toolbar')}
        />
      </div>
      <Sheet state={state} query={query} act={act} scroller={scroller} onAdd={addPlatform} onClearAll={clearAll} />
    </div>
  );
}
