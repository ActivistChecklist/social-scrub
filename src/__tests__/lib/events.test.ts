import { describe, expect, it } from 'vitest';
import { createTracker, optedOut } from '../../lib/events';

function recorder() {
  const sent: unknown[] = [];
  return { sent, send: (event: unknown) => void sent.push(event) };
}

describe('createTracker', () => {
  it('sends nothing when counts are off', () => {
    const r = recorder();
    const t = createTracker(false, r.send, () => false);
    t.track('check_platform', { group: 'highest' });
    t.pageView();
    expect(r.sent).toHaveLength(0);
  });

  it('sends the action name and its coarse details', () => {
    const r = recorder();
    createTracker(true, r.send, () => false).track('mark_step', { step: 'email', mark: 'done' });
    expect(r.sent).toEqual([{ name: 'mark_step', data: { step: 'email', mark: 'done' } }]);
  });

  it('leaves out empty details', () => {
    const r = recorder();
    createTracker(true, r.send, () => false).track('clear_data', {});
    expect(r.sent).toEqual([{ name: 'clear_data' }]);
  });

  it('sends a page view with no name, so the helper fills in the page and referrer', () => {
    const r = recorder();
    createTracker(true, r.send, () => false).pageView();
    expect(r.sent).toEqual([{}]);
  });

  it('sends nothing when the browser opts out', () => {
    const r = recorder();
    const t = createTracker(true, r.send, () => true);
    t.track('download', { format: 'csv' });
    t.pageView();
    expect(r.sent).toHaveLength(0);
  });

  it('never throws, even if sending fails', () => {
    const t = createTracker(
      true,
      () => {
        throw new Error('offline');
      },
      () => false,
    );
    expect(() => t.track('open_privacy')).not.toThrow();
    expect(() => t.pageView()).not.toThrow();
  });
});

describe('optedOut', () => {
  it('honors Global Privacy Control and Do Not Track', () => {
    expect(optedOut({ globalPrivacyControl: true } as never)).toBe(true);
    expect(optedOut({ doNotTrack: '1' } as never)).toBe(true);
    expect(optedOut({ doNotTrack: null } as never)).toBe(false);
  });
});
