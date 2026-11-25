import { useCallback, useEffect, useMemo, useRef, useState } from 'preact/hooks';
import type { RefObject } from 'preact';
import { GROUPS, PLAN_INFO, PLATFORM_INFO, STEPS, type ColumnInfo } from '../data/steps';
import type { Platform } from '../data/types';
import { useDismiss } from '../hooks/useDismiss';
import { useTips } from '../hooks/useTips';
import { track } from '../lib/events';
import { moveFocusWithArrows } from '../lib/motion';
import { nameIdeas, usernameIdeas } from '../lib/ideas';
import { allPlatforms, isChecked, isFinished, statusOf, type AppState } from '../lib/state';
import { BlockPartyNote, openBlockPartyNote } from './BlockPartyNote';
import { Footer } from './Footer';
import { Ideas } from './Ideas';
import { ArrowDownIcon } from './icons';
import { COLUMN_COUNT, Row, type RowActions, type RowIdeas } from './Row';

/** Where a platform was added from, for the anonymous counts. */
export type AddSource = 'search' | 'sheet';

interface SheetProps {
  state: AppState;
  query: string;
  act: Omit<RowActions, 'blockPartyInfo'>;
  scroller: RefObject<HTMLElement | null>;
  /** Returns false when the name was empty. */
  onAdd(name: string, from: AddSource): boolean;
  onClearAll(): void;
}

interface OpenInfo {
  key: string;
  info: ColumnInfo;
  left: number;
  /** Placed under the header when there's room, otherwise above it. Exactly one is set. */
  top?: number;
  bottom?: number;
  /** Caps the height to the room on that side; the popover scrolls inside if it needs more. */
  maxHeight: number;
  trigger: HTMLElement;
}

const POP_GAP = 8;
const POP_MARGIN = 12;
/** Below this much room under the header, the popover opens above it if there's more room there. */
const POP_MIN_BELOW = 240;

/** Where a column popover goes so all of it stays on screen. */
export function placePopover(trigger: DOMRect, viewport: { width: number; height: number }) {
  const width = Math.min(340, viewport.width - 32);
  const left = Math.max(16, Math.min(trigger.left + trigger.width / 2 - width / 2, viewport.width - width - 16));
  const below = viewport.height - trigger.bottom - POP_GAP - POP_MARGIN;
  const above = trigger.top - POP_GAP - POP_MARGIN;
  if (below >= POP_MIN_BELOW || below >= above) return { left, top: trigger.bottom + POP_GAP, maxHeight: Math.max(below, 120) };
  return { left, bottom: viewport.height - trigger.top + POP_GAP, maxHeight: above };
}

export function Sheet({ state, query, act, scroller, onAdd, onClearAll }: SheetProps) {
  const tip = useRef<HTMLDivElement>(null);
  const pop = useRef<HTMLDivElement>(null);
  const [info, setInfo] = useState<OpenInfo | null>(null);
  const bpDialog = useRef<HTMLDialogElement>(null);
  const rowAct = useMemo<RowActions>(() => ({ ...act, blockPartyInfo: () => openBlockPartyNote(bpDialog.current) }), [act]);

  useTips(scroller, tip, state);

  // Each row keeps the same name and username ideas until the page is reloaded. They are never saved.
  const rowIdeas = useRef(new Map<string, RowIdeas>());
  const ideasFor = (id: string): RowIdeas | undefined => {
    if (!state.showIdeas) return undefined;
    let ideas = rowIdeas.current.get(id);
    if (!ideas) {
      ideas = { name: nameIdeas(1)[0], username: usernameIdeas(1)[0] };
      rowIdeas.current.set(id, ideas);
    }
    return ideas;
  };

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
  // The popover is pinned to the screen, so it closes once the sheet scrolls away from its column.
  useEffect(() => {
    const sheet = scroller.current;
    if (!info || !sheet) return;
    const onScroll = () => closeInfo('outside');
    sheet.addEventListener('scroll', onScroll, { passive: true });
    return () => sheet.removeEventListener('scroll', onScroll);
  }, [info, closeInfo, scroller]);

  const toggleInfo = (key: string, content: ColumnInfo, trigger: HTMLElement) => {
    if (info?.key === key) return closeInfo('toggle');
    track('open_help', { column: key });
    const place = placePopover(trigger.getBoundingClientRect(), { width: window.innerWidth, height: window.innerHeight });
    setInfo({ key, info: content, trigger, ...place });
  };

  const headerButton = (key: string, content: ColumnInfo) => (
    <button
      type="button"
      class="th-btn"
      aria-expanded={info?.key === key}
      aria-controls="column-info"
      onPointerDown={(e) => info?.key === key && e.stopPropagation()}
      onClick={(e) => toggleInfo(key, content, e.currentTarget)}
    >
      {content.label}
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
          <Row key={p.id} platform={p} entry={state.entries[p.id]} act={rowAct} ideas={ideasFor(p.id)} />
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
          <Row key={p.id} platform={p} entry={state.entries[p.id]} act={rowAct} />
        ))}
      </tbody>
    );
  });

  return (
    <main class="sheet" ref={scroller} tabIndex={-1}>
      <table class={state.showIdeas ? 'grid ideas-on' : 'grid'} onKeyDown={(e) => moveFocusWithArrows(e, scroller.current)}>
        <caption class="visually-hidden">Your accounts and the privacy steps for each one</caption>
        <colgroup>
          <col class="col-platform" />
          <col class="col-plan" />
          {STEPS.map((s) => (
            <col key={s.id} class={`col-step col-${s.id}`} />
          ))}
          <col class="col-extra" />
        </colgroup>
        <thead>
          <tr>
            <th class="c-platform" scope="col">
              {headerButton('platform', PLATFORM_INFO)}
            </th>
            <th class="c-plan" scope="col">
              {headerButton('plan', PLAN_INFO)}
            </th>
            {STEPS.map((s) => (
              <th key={s.id} class="c-step" scope="col">
                {headerButton(s.id, s)}
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
        <div
          class="pop"
          id="column-info"
          role="dialog"
          aria-label={info.info.label}
          ref={pop}
          style={{
            left: `${info.left}px`,
            top: info.top === undefined ? '' : `${info.top}px`,
            bottom: info.bottom === undefined ? '' : `${info.bottom}px`,
            maxHeight: `${info.maxHeight}px`,
          }}
        >
          <h2>{info.info.label}</h2>
          <p>{info.info.desc}</p>
          {info.info.how && (
            <p class="how">
              <b>How</b>
              {info.info.how}
            </p>
          )}
          {info.info.ideas && <Ideas key={info.key} kind={info.info.ideas} />}
          {info.info.links && (
            <div class="pop-links">
              <b>Helpful</b>
              <ul>
                {info.info.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} target="_blank" rel="noopener noreferrer" onClick={() => track('open_resource', { column: info.key })}>
                      {l.name}
                    </a>{' '}
                    {l.note}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      <BlockPartyNote dialog={bpDialog} />
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
        <div class={typed && !found ? 'add-in stacked' : 'add-in'}>
          {typed ? (
            <>
              <span class="add-note">{found ? 'Not the one you meant?' : `No listed platform matches "${typed}".`}</span>
              <button type="button" class="btn btn-sm" onClick={() => onAdd(typed, 'search')}>
                Add "{typed.slice(0, 60)}"
              </button>
            </>
          ) : (
            <form
              class="add-form"
              onSubmit={(e) => {
                e.preventDefault();
                if (onAdd(name, 'sheet')) setName('');
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
