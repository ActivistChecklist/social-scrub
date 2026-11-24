import { describe, expect, it } from 'vitest';
import { STARTERS } from '../../data/steps';
import { createInitialState, cycleStep, toggleChecked } from '../../lib/state';
import { LEGACY_KEYS, STORAGE_KEY, clearAllData, loadState, migrateLegacy, parseState, saveState } from '../../lib/storage';

function memoryStore(initial: Record<string, string> = {}) {
  const data = new Map(Object.entries(initial));
  return {
    data,
    getItem: (k: string) => data.get(k) ?? null,
    setItem: (k: string, v: string) => void data.set(k, v),
    removeItem: (k: string) => void data.delete(k),
  };
}

describe('loadState', () => {
  it('starts fresh and writes nothing when storage is empty', () => {
    const store = memoryStore();
    const s = loadState(store);
    expect(Object.keys(s.entries).sort()).toEqual([...STARTERS].sort());
    expect(store.data.size).toBe(0);
  });

  it('round-trips saved progress', () => {
    const store = memoryStore();
    const s = cycleStep(toggleChecked(createInitialState(), 'reddit'), 'reddit', 'posts');
    saveState(s, store);
    expect(loadState(store)).toEqual(s);
  });

  it('survives storage that throws', () => {
    const broken = {
      getItem: () => {
        throw new Error('blocked');
      },
      setItem: () => {
        throw new Error('blocked');
      },
      removeItem: () => {
        throw new Error('blocked');
      },
    };
    expect(loadState(broken).version).toBe(2);
    expect(() => saveState(createInitialState(), broken)).not.toThrow();
    expect(() => clearAllData(broken)).not.toThrow();
  });

  it('falls back to a fresh start when the saved value is not JSON', () => {
    expect(loadState(memoryStore({ [STORAGE_KEY]: '{oops' })).entries.facebook.checked).toBe(true);
  });
});

describe('parseState', () => {
  it('drops anything it does not recognize', () => {
    const s = parseState({
      version: 2,
      nextOrder: 'x',
      onlyMine: 'yes',
      custom: [
        { id: 'custom-ok', name: '  Ravelry ' },
        { id: '<script>', name: 'bad id' },
        { id: 'custom-blank', name: '   ' },
      ],
      entries: {
        reddit: { checked: true, plan: 'nuke', steps: { name: 'done', email: 'maybe', hack: 'done' }, order: 3 },
        'custom-ok': { checked: true, plan: 'delete', deleted: 'yes', order: 4 },
        notaplatform: { checked: true },
        __proto__: { checked: true },
      },
    });
    expect(s).not.toBeNull();
    expect(s!.custom).toEqual([{ id: 'custom-ok', name: 'Ravelry' }]);
    expect(s!.entries.reddit).toEqual({ checked: true, plan: 'keep', steps: { name: 'done' }, deleted: false, order: 3 });
    expect(s!.entries['custom-ok']).toMatchObject({ plan: 'delete', deleted: false });
    expect(Object.keys(s!.entries).sort()).toEqual(['custom-ok', 'reddit']);
    expect(s!.nextOrder).toBe(5);
    expect(s!.onlyMine).toBe(false);
  });

  it('rejects other versions', () => {
    expect(parseState({ version: 1 })).toBeNull();
    expect(parseState(null)).toBeNull();
  });
});

describe('migrateLegacy', () => {
  const legacy = {
    platforms: [
      { platformId: 'facebook', status: 'in_progress', hasAccount: 'yes', completedSteps: [2, 3], skippedSteps: [4] },
      { platformId: 'venmo', status: 'secured', method: 'deleted', completedSteps: [1] },
      { platformId: 'tiktok', status: 'skipped', hasAccount: null, completedSteps: [] },
      { platformId: 'reddit', status: 'not_started', hasAccount: 'no' },
      { platformId: 'instagram', status: 'secured', method: 'block_party', completedSteps: [] },
      { platformId: 'gone-platform', status: 'secured' },
    ],
    customSites: [{ id: 'old', name: 'Church directory', status: 'in_progress', completedSteps: [9], skippedSteps: [] }],
  };

  it('carries over checked rows, steps and deletions', () => {
    const s = migrateLegacy(legacy)!;
    expect(s.entries.facebook).toMatchObject({ checked: true, plan: 'keep', steps: { name: 'done', photo: 'done', username: 'skipped' } });
    expect(s.entries.venmo).toMatchObject({ checked: true, plan: 'delete', deleted: true });
    expect(s.entries.instagram.steps.privacy).toBe('done');
    expect(s.entries.tiktok).toBeUndefined();
    expect(s.entries.reddit).toBeUndefined();
    expect(s.entries['gone-platform']).toBeUndefined();
    expect(s.custom).toEqual([{ id: 'custom-legacy-0', name: 'Church directory' }]);
    expect(s.entries['custom-legacy-0'].steps.privacy).toBe('done');
  });

  it('is used when there is no new data yet, and the result is valid', () => {
    const store = memoryStore({ [LEGACY_KEYS[0]]: JSON.stringify(legacy) });
    const s = loadState(store);
    expect(s.entries.venmo.deleted).toBe(true);
    expect(parseState(JSON.parse(JSON.stringify(s)))).toEqual(s);
  });
});

describe('clearAllData', () => {
  it('removes the current and the old keys', () => {
    const store = memoryStore({ [STORAGE_KEY]: '{}', [LEGACY_KEYS[0]]: '{}', [LEGACY_KEYS[1]]: 'dark', unrelated: 'keep me' });
    clearAllData(store);
    expect([...store.data.keys()]).toEqual(['unrelated']);
  });
});
