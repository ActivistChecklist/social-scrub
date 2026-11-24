/**
 * Anonymous counts of what people do on the sheet.
 *
 * Off unless the build sets VITE_EVENTS_URL and VITE_EVENTS_SITE_ID (see .env.example).
 *
 * What's sent: the action's name and a few coarse details, like which priority group
 * or which step column. Never which platform, never anything typed, no cookies, no
 * referrer. Nothing is sent when the browser asks not to be tracked (Global Privacy
 * Control or Do Not Track).
 *
 * The body matches Umami's /api/send, so the URL can be a self-hosted Umami or a path on
 * this site that forwards to one. A same-origin path keeps the Content Security Policy
 * at connect-src 'self' and lets the forwarder drop visitors' IP addresses.
 */

export type EventName =
  | 'check_platform'
  | 'uncheck_platform'
  | 'select_all'
  | 'set_plan'
  | 'mark_step'
  | 'mark_deleted'
  | 'finish_platform'
  | 'add_platform'
  | 'remove_platform'
  | 'filter_checked'
  | 'open_help'
  | 'open_privacy'
  | 'download'
  | 'clear_data';

export type EventData = Record<string, string | number | boolean>;

export interface EventConfig {
  url?: string;
  siteId?: string;
}

type Send = (url: string, body: string) => void;

/** True when the browser has asked sites not to track it. */
export function optedOut(nav: (Navigator & { globalPrivacyControl?: boolean }) | undefined = globalThis.navigator): boolean {
  if (!nav) return true;
  return nav.globalPrivacyControl === true || nav.doNotTrack === '1';
}

export function createTracker(config: EventConfig, send: Send, isOptedOut: () => boolean = () => optedOut()) {
  const url = config.url?.trim();
  const siteId = config.siteId?.trim();
  const enabled = Boolean(url && siteId);
  return {
    enabled,
    track(name: EventName, data?: EventData) {
      if (!enabled || isOptedOut()) return;
      const payload: Record<string, unknown> = { website: siteId, hostname: globalThis.location?.hostname ?? '', url: '/', name };
      if (data && Object.keys(data).length) payload.data = data;
      try {
        send(url!, JSON.stringify({ type: 'event', payload }));
      } catch {
        // A count is never worth breaking the page over.
      }
    },
  };
}

const post: Send = (url, body) => {
  void fetch(url, {
    method: 'POST',
    body,
    keepalive: true,
    credentials: 'omit',
    cache: 'no-store',
    referrerPolicy: 'no-referrer',
    headers: { 'Content-Type': 'application/json' },
  }).catch(() => {});
};

const tracker = createTracker({ url: import.meta.env.VITE_EVENTS_URL, siteId: import.meta.env.VITE_EVENTS_SITE_ID }, post);

/** Whether this build sends counts at all. The privacy note mentions them only when it does. */
export const eventsEnabled = tracker.enabled;
export const track = tracker.track;
