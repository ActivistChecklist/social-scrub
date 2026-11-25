import { PLATFORMS } from '../data/platforms';
import { STARTERS, STEPS } from '../data/steps';
import type { Platform, StepId } from '../data/types';

export type Plan = 'keep' | 'delete';
/** A step is either done, or skipped because the site won't allow it or the person chose not to. */
export type Mark = 'done' | 'skipped';

export interface Entry {
  checked: boolean;
  plan: Plan;
  steps: Partial<Record<StepId, Mark>>;
  deleted: boolean;
  /** When the row was checked. Checked rows are listed in this order, so a new one goes to the end. */
  order: number;
}

export interface CustomPlatform {
  id: string;
  name: string;
}

export interface AppState {
  version: 2;
  entries: Record<string, Entry>;
  custom: CustomPlatform[];
  nextOrder: number;
  onlyMine: boolean;
  /** Shows a random name and username under those two steps on each row. */
  showIdeas: boolean;
}

export type Status = 'unchecked' | 'not-started' | 'in-progress' | 'done' | 'to-delete' | 'deleted';

export const MAX_NAME_LENGTH = 60;

export function createInitialState(): AppState {
  const entries: Record<string, Entry> = {};
  STARTERS.forEach((id, i) => {
    entries[id] = { checked: true, plan: 'keep', steps: {}, deleted: false, order: i + 1 };
  });
  return { version: 2, entries, custom: [], nextOrder: STARTERS.length + 1, onlyMine: false, showIdeas: false };
}

export function customToPlatform(c: CustomPlatform): Platform {
  return { id: c.id, name: c.name, priority: 'custom' };
}

/** Built-in platforms followed by the ones the person added. */
export function allPlatforms(state: AppState): Platform[] {
  return PLATFORMS.concat(state.custom.map(customToPlatform));
}

const BUILT_IN_GROUP = new Map<string, string>(PLATFORMS.map((p) => [p.id, p.priority]));

/** The priority group a platform belongs to, or "custom" for one the person added. */
export function groupOf(id: string): string {
  return BUILT_IN_GROUP.get(id) ?? 'custom';
}

export function isChecked(state: AppState, id: string): boolean {
  return state.entries[id]?.checked === true;
}

export function stepCount(entry: Entry): number {
  return STEPS.reduce((n, s) => n + (entry.steps[s.id] ? 1 : 0), 0);
}

export function statusOf(entry: Entry | undefined): Status {
  if (!entry?.checked) return 'unchecked';
  if (entry.plan === 'delete') return entry.deleted ? 'deleted' : 'to-delete';
  const n = stepCount(entry);
  if (n === STEPS.length) return 'done';
  return n === 0 ? 'not-started' : 'in-progress';
}

export const isFinished = (s: Status) => s === 'done' || s === 'deleted';

function withEntry(state: AppState, id: string, fn: (e: Entry) => Entry): AppState {
  const current = state.entries[id] ?? { checked: false, plan: 'keep', steps: {}, deleted: false, order: 0 };
  return { ...state, entries: { ...state.entries, [id]: fn(current) } };
}

/** Checking a row picks Keep and puts it after the rows already checked. */
export function toggleChecked(state: AppState, id: string): AppState {
  if (isChecked(state, id)) return withEntry(state, id, (e) => ({ ...e, checked: false }));
  const next = withEntry(state, id, (e) => ({ ...e, checked: true, plan: 'keep', order: state.nextOrder }));
  return { ...next, nextOrder: state.nextOrder + 1 };
}

/** Checks every row in `ids` that isn't checked yet, in the order given. */
export function checkAll(state: AppState, ids: string[]): AppState {
  let next = state;
  for (const id of ids) if (!isChecked(next, id)) next = toggleChecked(next, id);
  return next;
}

export function setPlan(state: AppState, id: string, plan: Plan): AppState {
  if (!isChecked(state, id)) return state;
  return withEntry(state, id, (e) => ({ ...e, plan }));
}

/** Blank, then done, then skipped, then blank again. */
export function cycleStep(state: AppState, id: string, step: StepId): AppState {
  if (!isChecked(state, id)) return state;
  return withEntry(state, id, (e) => {
    const steps = { ...e.steps };
    const current = steps[step];
    if (!current) steps[step] = 'done';
    else if (current === 'done') steps[step] = 'skipped';
    else delete steps[step];
    return { ...e, steps };
  });
}

export function toggleDeleted(state: AppState, id: string): AppState {
  if (!isChecked(state, id)) return state;
  return withEntry(state, id, (e) => ({ ...e, deleted: !e.deleted }));
}

export function setOnlyMine(state: AppState, onlyMine: boolean): AppState {
  return { ...state, onlyMine };
}

export function setShowIdeas(state: AppState, showIdeas: boolean): AppState {
  return state.showIdeas === showIdeas ? state : { ...state, showIdeas };
}

export function cleanName(raw: string): string {
  return raw.replace(/\s+/g, ' ').trim().slice(0, MAX_NAME_LENGTH);
}

export function newCustomId(): string {
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  return 'custom-' + Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Adds a platform the list doesn't have and checks it. If the name matches one
 * that's already there, that one is checked instead of adding a duplicate.
 */
export function addCustom(state: AppState, rawName: string, makeId = newCustomId): { state: AppState; id: string | null } {
  const name = cleanName(rawName);
  if (!name) return { state, id: null };
  const existing = allPlatforms(state).find((p) => p.name.toLowerCase() === name.toLowerCase());
  let next = state;
  let id: string;
  if (existing) {
    id = existing.id;
  } else {
    id = makeId();
    next = { ...state, custom: [...state.custom, { id, name }] };
  }
  if (!isChecked(next, id)) next = toggleChecked(next, id);
  return { state: next, id };
}

export function removeCustom(state: AppState, id: string): AppState {
  const entries = { ...state.entries };
  delete entries[id];
  return { ...state, custom: state.custom.filter((c) => c.id !== id), entries };
}

export function summary(state: AppState): { checked: number; finished: number } {
  let checked = 0;
  let finished = 0;
  for (const p of allPlatforms(state)) {
    const entry = state.entries[p.id];
    if (!entry?.checked) continue;
    checked++;
    if (isFinished(statusOf(entry))) finished++;
  }
  return { checked, finished };
}
