import { useLayoutEffect, useMemo, useRef, useState } from 'preact/hooks';
import { Header } from '../components/Header';
import type { RowActions } from '../components/Row';
import { Sheet } from '../components/Sheet';
import { Toolbar } from '../components/Toolbar';
import { downloadExport } from '../lib/export';
import { focusKey, prefersReducedMotion, restoreFocus, revealRow, rowTops, slideRows, type FocusKey } from '../lib/motion';
import {
  addCustom,
  checkAll,
  createInitialState,
  cycleStep,
  removeCustom,
  setOnlyMine,
  setPlan,
  toggleChecked,
  toggleDeleted,
  type AppState,
} from '../lib/state';
import { clearAllData, loadState, saveState } from '../lib/storage';

export function App() {
  const [state, setState] = useState<AppState>(loadState);
  const [query, setQuery] = useState('');
  const scroller = useRef<HTMLElement>(null);

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

  const act = useMemo<RowActions>(
    () => ({
      toggle: (id) => commit(toggleChecked(current.current, id), { slide: true }),
      checkAll: (ids) => commit(checkAll(current.current, ids), { slide: true }),
      plan: (id, plan) => commit(setPlan(current.current, id, plan)),
      step: (id, step) => commit(cycleStep(current.current, id, step)),
      deleted: (id) => commit(toggleDeleted(current.current, id)),
      remove: (id) => commit(removeCustom(current.current, id), { slide: true }),
    }),
    [],
  );

  /** Adds (or finds) a platform, then scrolls to it. Returns false when the name was empty. */
  const addPlatform = (name: string, clearSearch: boolean) => {
    const { state: next, id } = addCustom(current.current, name);
    if (!id) return false;
    // Clear the search so the new row isn't filtered out.
    const searchWillChange = clearSearch && query !== '';
    if (searchWillChange) setQuery('');
    if (commit(next) || searchWillChange) after.current.reveal = id;
    else revealRow(scroller.current, id); // Already listed and checked, and nothing will re-render.
    return true;
  };

  const clearAll = () => {
    clearAllData();
    const fresh = createInitialState();
    current.current = fresh;
    setQuery('');
    setState(fresh);
    scroller.current?.scrollTo({ top: 0 });
  };

  return (
    <div class="app">
      <Header state={state} onDownload={(kind) => downloadExport(current.current, kind)} />
      <Toolbar
        query={query}
        onQuery={setQuery}
        onlyMine={state.onlyMine}
        onOnlyMine={(v) => commit(setOnlyMine(current.current, v))}
        onAdd={(name) => addPlatform(name, true)}
      />
      <Sheet state={state} query={query} act={act} scroller={scroller} onAdd={addPlatform} onClearAll={clearAll} />
    </div>
  );
}
