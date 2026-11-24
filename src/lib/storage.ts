import { PLATFORMS } from '../data/platforms';
import { STEPS } from '../data/steps';
import type { StepId } from '../data/types';
import {
  MAX_NAME_LENGTH,
  createInitialState,
  type AppState,
  type CustomPlatform,
  type Entry,
  type Mark,
} from './state';

/** Everything lives in this one key, in this browser only. */
export const STORAGE_KEY = 'social-scrub-v2';
/** Keys the first version of the site used. Read once to carry progress over, and wiped by "Clear all data". */
export const LEGACY_KEYS = ['social-scrub-session', 'social-scrub-theme'];
const LEGACY_SESSION_KEY = LEGACY_KEYS[0];

const STEP_IDS = new Set<string>(STEPS.map((s) => s.id));
const BUILT_IN_IDS = new Set(PLATFORMS.map((p) => p.id));
const CUSTOM_ID = /^custom-[a-z0-9-]{1,40}$/;

type Store = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

/** localStorage can be missing or throw (private windows, blocked storage). The app still works, it just won't remember. */
function store(): Store | null {
  try {
    return typeof window !== 'undefined' && window.localStorage ? window.localStorage : null;
  } catch {
    return null;
  }
}

const isObject = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);

function readSteps(raw: unknown): Entry['steps'] {
  const steps: Entry['steps'] = {};
  if (!isObject(raw)) return steps;
  for (const [k, v] of Object.entries(raw)) {
    if (STEP_IDS.has(k) && (v === 'done' || v === 'skipped')) steps[k as StepId] = v as Mark;
  }
  return steps;
}

/**
 * Turns whatever is in storage into a valid state. Anything unexpected is
 * dropped rather than trusted, so a damaged or hand-edited value can't break the page.
 */
export function parseState(raw: unknown): AppState | null {
  if (!isObject(raw) || raw.version !== 2) return null;

  const custom: CustomPlatform[] = [];
  const seen = new Set<string>();
  if (Array.isArray(raw.custom)) {
    for (const c of raw.custom) {
      if (!isObject(c) || typeof c.id !== 'string' || typeof c.name !== 'string') continue;
      const name = c.name.replace(/\s+/g, ' ').trim().slice(0, MAX_NAME_LENGTH);
      if (!CUSTOM_ID.test(c.id) || !name || seen.has(c.id)) continue;
      seen.add(c.id);
      custom.push({ id: c.id, name });
    }
  }

  const entries: Record<string, Entry> = {};
  let maxOrder = 0;
  if (isObject(raw.entries)) {
    for (const [id, e] of Object.entries(raw.entries)) {
      if (!(BUILT_IN_IDS.has(id) || seen.has(id)) || !isObject(e)) continue;
      const order = typeof e.order === 'number' && Number.isFinite(e.order) && e.order > 0 ? Math.floor(e.order) : 0;
      maxOrder = Math.max(maxOrder, order);
      entries[id] = {
        checked: e.checked === true,
        plan: e.plan === 'delete' ? 'delete' : 'keep',
        steps: readSteps(e.steps),
        deleted: e.deleted === true,
        order,
      };
    }
  }

  const nextOrder = typeof raw.nextOrder === 'number' && Number.isFinite(raw.nextOrder) ? Math.max(Math.floor(raw.nextOrder), maxOrder + 1) : maxOrder + 1;
  return { version: 2, entries, custom, nextOrder, onlyMine: raw.onlyMine === true };
}

// The first version numbered its steps: 1 was "delete", 2 to 9 match the columns.
const LEGACY_STEP: Record<number, StepId> = { 2: 'name', 3: 'photo', 4: 'username', 5: 'email', 6: 'bio', 7: 'posts', 8: 'friends', 9: 'privacy' };

function legacySteps(completed: unknown, skipped: unknown): Entry['steps'] {
  const steps: Entry['steps'] = {};
  if (Array.isArray(skipped)) for (const n of skipped) if (LEGACY_STEP[n]) steps[LEGACY_STEP[n]] = 'skipped';
  if (Array.isArray(completed)) for (const n of completed) if (LEGACY_STEP[n]) steps[LEGACY_STEP[n]] = 'done';
  return steps;
}

/** Carries progress over from the first version of the site, so returning visitors don't start from zero. */
export function migrateLegacy(raw: unknown): AppState | null {
  if (!isObject(raw) || !Array.isArray(raw.platforms)) return null;
  const state: AppState = { version: 2, entries: {}, custom: [], nextOrder: 1, onlyMine: false };

  const add = (id: string, p: Record<string, unknown>) => {
    // "Skipped" in the old flow meant "not for me", and "no" meant no account.
    if (p.hasAccount === 'no' || (p.status === 'skipped' && p.method !== 'deleted')) return;
    const completed = Array.isArray(p.completedSteps) ? p.completedSteps : [];
    const deleted = p.method === 'deleted' || completed.includes(1);
    let steps = legacySteps(p.completedSteps, p.skippedSteps);
    if (p.method === 'block_party' && p.status === 'secured') {
      steps = Object.fromEntries(STEPS.map((s) => [s.id, 'done'])) as Entry['steps'];
    }
    state.entries[id] = { checked: true, plan: deleted ? 'delete' : 'keep', steps: deleted ? {} : steps, deleted, order: state.nextOrder++ };
  };

  for (const p of raw.platforms) {
    if (isObject(p) && typeof p.platformId === 'string' && BUILT_IN_IDS.has(p.platformId)) add(p.platformId, p);
  }
  if (Array.isArray(raw.customSites)) {
    raw.customSites.forEach((c, i) => {
      if (!isObject(c) || typeof c.name !== 'string') return;
      const name = c.name.replace(/\s+/g, ' ').trim().slice(0, MAX_NAME_LENGTH);
      if (!name) return;
      const id = `custom-legacy-${i}`;
      state.custom.push({ id, name });
      add(id, c);
    });
  }
  return state;
}

function readJson(s: Store, key: string): unknown {
  try {
    const raw = s.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/** Nothing is written until the person changes something. */
export function loadState(s: Store | null = store()): AppState {
  if (!s) return createInitialState();
  return parseState(readJson(s, STORAGE_KEY)) ?? migrateLegacy(readJson(s, LEGACY_SESSION_KEY)) ?? createInitialState();
}

export function saveState(state: AppState, s: Store | null = store()): void {
  try {
    s?.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage is full or blocked. The page keeps working for this visit.
  }
}

export function clearAllData(s: Store | null = store()): void {
  for (const key of [STORAGE_KEY, ...LEGACY_KEYS]) {
    try {
      s?.removeItem(key);
    } catch {
      // Nothing more we can do from here.
    }
  }
}
