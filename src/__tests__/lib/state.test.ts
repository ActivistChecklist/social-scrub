import { describe, expect, it } from 'vitest';
import { STARTERS, STEPS } from '../../data/steps';
import {
  addCustom,
  createInitialState,
  cycleStep,
  removeCustom,
  setPlan,
  statusOf,
  summary,
  toggleChecked,
  toggleDeleted,
  type AppState,
} from '../../lib/state';

const fresh = (): AppState => createInitialState();

describe('initial state', () => {
  it('starts with the common platforms checked and set to Keep', () => {
    const s = fresh();
    for (const id of STARTERS) {
      expect(s.entries[id]).toMatchObject({ checked: true, plan: 'keep' });
    }
    expect(summary(s)).toEqual({ checked: STARTERS.length, finished: 0 });
  });
});

describe('toggleChecked', () => {
  it('picks Keep and adds the row after the ones already checked', () => {
    const s = toggleChecked(fresh(), 'reddit');
    expect(s.entries.reddit).toMatchObject({ checked: true, plan: 'keep' });
    const lastStarter = Math.max(...STARTERS.map((id) => s.entries[id].order));
    expect(s.entries.reddit.order).toBeGreaterThan(lastStarter);
  });

  it('moves a re-checked row to the end and resets it to Keep', () => {
    let s = toggleChecked(fresh(), 'reddit');
    s = setPlan(s, 'reddit', 'delete');
    s = toggleChecked(s, 'reddit');
    s = toggleChecked(s, 'tiktok');
    s = toggleChecked(s, 'reddit');
    expect(s.entries.reddit.plan).toBe('keep');
    expect(s.entries.reddit.order).toBeGreaterThan(s.entries.tiktok.order);
  });

  it('keeps step progress when a row is unchecked and checked again', () => {
    let s = cycleStep(fresh(), 'facebook', 'name');
    s = toggleChecked(toggleChecked(s, 'facebook'), 'facebook');
    expect(s.entries.facebook.steps.name).toBe('done');
  });
});

describe('cycleStep', () => {
  it('goes blank, done, skipped, blank', () => {
    let s = fresh();
    s = cycleStep(s, 'facebook', 'email');
    expect(s.entries.facebook.steps.email).toBe('done');
    s = cycleStep(s, 'facebook', 'email');
    expect(s.entries.facebook.steps.email).toBe('skipped');
    s = cycleStep(s, 'facebook', 'email');
    expect(s.entries.facebook.steps.email).toBeUndefined();
  });

  it('ignores rows that are not checked', () => {
    const s = fresh();
    expect(cycleStep(s, 'reddit', 'email')).toBe(s);
  });
});

describe('statusOf', () => {
  it('counts skipped steps toward done', () => {
    let s = fresh();
    STEPS.forEach((step, i) => {
      s = cycleStep(s, 'facebook', step.id);
      if (i % 2) s = cycleStep(s, 'facebook', step.id);
    });
    expect(statusOf(s.entries.facebook)).toBe('done');
  });

  it('follows the delete path', () => {
    let s = setPlan(fresh(), 'facebook', 'delete');
    expect(statusOf(s.entries.facebook)).toBe('to-delete');
    s = toggleDeleted(s, 'facebook');
    expect(statusOf(s.entries.facebook)).toBe('deleted');
    expect(summary(s).finished).toBe(1);
  });

  it('reports progress in between', () => {
    expect(statusOf(fresh().entries.facebook)).toBe('not-started');
    expect(statusOf(cycleStep(fresh(), 'facebook', 'bio').entries.facebook)).toBe('in-progress');
    expect(statusOf(undefined)).toBe('unchecked');
  });
});

describe('custom platforms', () => {
  it('adds a checked platform with a cleaned-up name', () => {
    const { state, id } = addCustom(fresh(), '  Church   directory ', () => 'custom-abc');
    expect(id).toBe('custom-abc');
    expect(state.custom).toEqual([{ id: 'custom-abc', name: 'Church directory' }]);
    expect(state.entries['custom-abc']).toMatchObject({ checked: true, plan: 'keep' });
  });

  it('checks the existing platform instead of adding a duplicate', () => {
    const { state, id } = addCustom(fresh(), 'reddit', () => 'custom-nope');
    expect(id).toBe('reddit');
    expect(state.custom).toHaveLength(0);
    expect(state.entries.reddit.checked).toBe(true);
  });

  it('ignores empty names', () => {
    const s = fresh();
    expect(addCustom(s, '   ').id).toBeNull();
  });

  it('removes a platform and its progress', () => {
    const added = addCustom(fresh(), 'Ravelry', () => 'custom-r').state;
    const s = removeCustom(added, 'custom-r');
    expect(s.custom).toHaveLength(0);
    expect(s.entries['custom-r']).toBeUndefined();
  });
});
