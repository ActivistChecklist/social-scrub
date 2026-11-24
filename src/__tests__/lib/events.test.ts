import { describe, expect, it } from 'vitest';
import { createTracker, optedOut } from '../../lib/events';

function recorder() {
  const sent: { url: string; body: any }[] = [];
  return { sent, send: (url: string, body: string) => void sent.push({ url, body: JSON.parse(body) }) };
}

describe('createTracker', () => {
  it('sends nothing when the build has no endpoint', () => {
    const r = recorder();
    const t = createTracker({}, r.send, () => false);
    t.track('check_platform', { group: 'highest' });
    expect(t.enabled).toBe(false);
    expect(r.sent).toHaveLength(0);
  });

  it('sends an Umami-shaped event with only the name and the coarse details', () => {
    const r = recorder();
    const t = createTracker({ url: '/api/send', siteId: 'site-1' }, r.send, () => false);
    t.track('mark_step', { step: 'email', mark: 'done' });
    expect(r.sent).toEqual([
      {
        url: '/api/send',
        body: { type: 'event', payload: { website: 'site-1', hostname: location.hostname, url: '/', name: 'mark_step', data: { step: 'email', mark: 'done' } } },
      },
    ]);
  });

  it('leaves out empty details', () => {
    const r = recorder();
    createTracker({ url: '/api/send', siteId: 'site-1' }, r.send, () => false).track('clear_data');
    expect(r.sent[0].body.payload).not.toHaveProperty('data');
  });

  it('sends nothing when the browser opts out', () => {
    const r = recorder();
    createTracker({ url: '/api/send', siteId: 'site-1' }, r.send, () => true).track('download', { format: 'csv' });
    expect(r.sent).toHaveLength(0);
  });

  it('never throws, even if sending fails', () => {
    const t = createTracker({ url: '/api/send', siteId: 'site-1' }, () => {
      throw new Error('offline');
    }, () => false);
    expect(() => t.track('open_privacy')).not.toThrow();
  });
});

describe('optedOut', () => {
  it('honors Global Privacy Control and Do Not Track', () => {
    expect(optedOut({ globalPrivacyControl: true } as never)).toBe(true);
    expect(optedOut({ doNotTrack: '1' } as never)).toBe(true);
    expect(optedOut({ doNotTrack: null } as never)).toBe(false);
  });
});
