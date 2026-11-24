import { useCallback, useRef, useState } from 'preact/hooks';
import type { RefObject } from 'preact';
import { GROUPS, PLAN_INFO, PLATFORM_INFO, STEPS, type ColumnInfo } from '../data/steps';
import type { Platform } from '../data/types';
import { useDismiss } from '../hooks/useDismiss';
import { useTips } from '../hooks/useTips';
import { moveFocusWithArrows } from '../lib/motion';
import { allPlatforms, isChecked, isFinished, statusOf, type AppState } from '../lib/state';
import { Footer } from './Footer';
import { ArrowDownIcon } from './icons';
import { COLUMN_COUNT, Row, type RowActions } from './Row';

interface SheetProps {
  state: AppState;
  query: string;
  act: RowActions;
  scroller: RefObject<HTMLElement | null>;
  /** Returns false when the name was empty. */
  onAdd(name: string, fromSearch: boolean): boolean;
  onClearAll(): void;
}

interface OpenInfo {
  key: string;
  info: ColumnInfo;
  left: number;
  top: number;
  trigger: HTMLElement;
}

export function Sheet({ state, query, act, scroller, onAdd, onClearAll }: SheetProps) {
  const tip = useRef<HTMLDivElement>(null);
  const pop = useRef<HTMLDivElement>(null);
  const [info, setInfo] = useState<OpenInfo | null>(null);

  useTips(scroller, tip, state);

  const closeInfo = useCallback(
    (reason: 'outside' | 'escape' | 'toggle') => {
      setInfo((open) => {
        if (open && reason === 'escape') open.trigger.focus();
        return null;
      });
    },
    [setInfo],
  );
  useDismiss(info !== null, closeInfo, pop);

  const toggleInfo = (key: string, content: ColumnInfo, trigger: HTMLElement) => {
    if (info?.key === key) return closeInfo('toggle');
    const r = trigger.getBoundingClientRect();
    const width = Math.min(340, window.innerWidth - 32);
    setInfo({
      key,
      info: content,
      trigger,
      left: Math.max(16, Math.min(r.left + r.width / 2 - width / 2, window.innerWidth - width - 16)),
      top: r.bottom + 8,
    });
  };

  const headerButton = (key: string, label: string, content: ColumnInfo) => (
    <button
      type="button"
      class="th-btn"
      aria-expanded={info?.key === key}
      aria-controls="column-info"
      onPointerDown={(e) => info?.key === key && e.stopPropagation()}
      onClick={(e) => toggleInfo(key, content, e.currentTarget)}
    >
      {label}
    </button>
  );

  const q = query.trim().toLowerCase();
  const matches = (p: Platform) => !q || p.name.toLowerCase().includes(q);
  const platforms = allPlatforms(state);
  let found = 0;

  const groups = GROUPS.map((g) => {
    const inGroup = platforms.filter((p) => p.priority === g.id && matches(p));
    found += inGroup.length;
    const mine = inGroup.filter((p) => isChecked(state, p.id)).sort((a, b) => state.entries[a.id].order - state.entries[b.id].order);
    const rest = state.onlyMine ? [] : inGroup.filter((p) => !isChecked(state, p.id));
    if (!mine.length && !rest.length) return null;
    const finished = mine.filter((p) => isFinished(statusOf(state.entries[p.id]))).length;
    const showDivider = rest.length > 0 && g.id !== 'custom';
    return (
      <tbody key={g.id}>
        <tr class="grp">
          <th colSpan={COLUMN_COUNT} scope="rowgroup">
            <div class="grp-in">
              <span class="grp-name">{g.label}</span>
              {mine.length > 0 && (
                <span class="grp-meta">
                  {finished} of {mine.length} done
                </span>
              )}
            </div>
          </th>
        </tr>
        {mine.map((p) => (
          <Row key={p.id} platform={p} entry={state.entries[p.id]} act={act} />
        ))}
        {showDivider && (
          <tr class="divider" key="divider">
            <td colSpan={COLUMN_COUNT}>
              <div class="div-in">
                <ArrowDownIcon />
                <span>Mark checkbox if you have an account here (even an old one)</span>
                <button type="button" class="link-btn div-all" data-focus={`check-all-${g.id}`} onClick={() => act.checkAll(rest.map((p) => p.id))}>
                  Select all
                </button>
              </div>
            </td>
          </tr>
        )}
        {rest.map((p) => (
          <Row key={p.id} platform={p} entry={state.entries[p.id]} act={act} />
        ))}
      </tbody>
    );
  });

  return (
    <main class="sheet" ref={scroller} tabIndex={-1}>
      <table class="grid" onKeyDown={(e) => moveFocusWithArrows(e, scroller.current)}>
        <caption class="visually-hidden">Your accounts and the privacy steps for each one</caption>
        <colgroup>
          <col class="col-platform" />
          <col class="col-plan" />
          {STEPS.map((s) => (
            <col key={s.id} class="col-step" />
          ))}
          <col />
        </colgroup>
        <thead>
          <tr>
            <th class="c-platform" scope="col">
              {headerButton('platform', 'Platform', PLATFORM_INFO)}
            </th>
            <th class="c-plan" scope="col">
              {headerButton('plan', 'Keep or delete', PLAN_INFO)}
            </th>
            {STEPS.map((s) => (
              <th key={s.id} class="c-step" scope="col">
                {headerButton(s.id, s.label, s)}
              </th>
            ))}
            <th />
          </tr>
        </thead>
        {groups}
        <tbody>
          <AddRow query={query} found={found} onAdd={onAdd} />
        </tbody>
      </table>

      <Footer onClearAll={onClearAll} />

      {info && (
        <div class="pop" id="column-info" role="dialog" aria-label={info.info.title} ref={pop} style={{ left: `${info.left}px`, top: `${info.top}px` }}>
          <h2>{info.info.title}</h2>
          <p>{info.info.desc}</p>
          <p class="how">
            <b>How</b>
            {info.info.how}
          </p>
        </div>
      )}
      <div class="tip" ref={tip} aria-hidden="true" hidden />
    </main>
  );
}

/** Last row of the sheet: add a platform that isn't listed, or add whatever a search didn't find. */
function AddRow({ query, found, onAdd }: { query: string; found: number; onAdd: SheetProps['onAdd'] }) {
  const [name, setName] = useState('');
  const typed = query.replace(/\s+/g, ' ').trim();
  return (
    <tr class="add-row">
      <td colSpan={COLUMN_COUNT}>
        <div class="add-in">
          {typed ? (
            <>
              <span class="add-note">{found ? 'Not the one you meant?' : `No listed platform matches "${typed}".`}</span>
              <button type="button" class="btn btn-sm" onClick={() => onAdd(typed, true)}>
                Add "{typed.slice(0, 60)}"
              </button>
            </>
          ) : (
            <form
              class="add-form"
              onSubmit={(e) => {
                e.preventDefault();
                if (onAdd(name, false)) setName('');
              }}
            >
              <input
                id="add-bottom"
                type="text"
                value={name}
                onInput={(e) => setName(e.currentTarget.value)}
                placeholder="Add a platform that isn't listed"
                maxLength={60}
                autocomplete="off"
                aria-label="Name of a platform to add"
              />
              <button class="btn btn-sm" type="submit">
                Add
              </button>
            </form>
          )}
        </div>
      </td>
    </tr>
  );
}
