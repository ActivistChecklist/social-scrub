/**
 * Anonymous counts of visits and of what people do on the sheet, sent the same way
 * Activist Checklist does it: the browser posts to /api/counter on this site, and the
 * server scrambles the visitor's IP address before forwarding to Umami
 * (@activistchecklist/umami-extra-privacy, see server/).
 *
 * A page view carries the page, the site that linked here, and the browser's language,
 * screen size and user agent. An action carries its name and a few coarse details, like
 * the priority group or the step column. Never which platform, never anything typed.
 * Nothing is sent when the browser sends Do Not Track or Global Privacy Control, and
 * nothing is sent from the dev server.
 */
import { sendAnalytics } from '@activistchecklist/umami-extra-privacy/client';
import type { EventName } from './event-names';

export type { EventName };
export type EventData = Record<string, string | number | boolean>;

export const COUNTER_ENDPOINT = '/api/counter';

/** True when the browser has asked sites not to track it. */
export function optedOut(nav: (Navigator & { globalPrivacyControl?: boolean }) | undefined = globalThis.navigator): boolean {
  if (!nav) return true;
  return nav.globalPrivacyControl === true || nav.doNotTrack === '1';
}

type Send = (event: { name?: EventName; data?: EventData }) => void;

export function createTracker(enabled: boolean, send: Send, isOptedOut: () => boolean = () => optedOut()) {
  const safely = (event: Parameters<Send>[0]) => {
    if (!enabled || isOptedOut()) return;
    try {
      send(event);
    } catch {
      // A count is never worth breaking the page over.
    }
  };
  return {
    enabled,
    track(name: EventName, data?: EventData) {
      safely(data && Object.keys(data).length ? { name, data } : { name });
    },
    /** Counts a visit. The browser helper fills in the page, the referrer, language and screen size. */
    pageView() {
      safely({});
    },
  };
}

const tracker = createTracker(import.meta.env.PROD, (event) => {
  void sendAnalytics(event, { endpoint: COUNTER_ENDPOINT });
});

/** Production builds count; the dev server doesn't. The privacy note mentions counts only when they're on. */
export const eventsEnabled = tracker.enabled;
export const track = tracker.track;
export const trackPageView = tracker.pageView;
