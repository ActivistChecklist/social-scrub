'use client';

import { useCallback } from 'react';
import type { AnalyticsEvent } from '@/lib/analytics';

const isProd = process.env.NODE_ENV === 'production';
const DEBUG_MODE = process.env.NEXT_PUBLIC_DEBUG_ANALYTICS === 'true';

interface AnalyticsPayload {
  url: string;
  hostname: string;
  referrer: string;
  title: string;
  name?: string;
  data?: Record<string, unknown>;
}

async function sendAnalytics(payload: AnalyticsPayload): Promise<void> {
  // Only send analytics in production unless debug mode is enabled
  if (!isProd && !DEBUG_MODE) {
    console.log('[Analytics Debug]', payload);
    return;
  }

  try {
    await fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify(payload),
    });
  } catch {
    // Silently fail - analytics should never break the app
  }
}

function getBasePayload(): Omit<AnalyticsPayload, 'name' | 'data'> {
  if (typeof window === 'undefined') {
    return {
      url: '',
      hostname: '',
      referrer: '',
      title: '',
    };
  }

  return {
    url: window.location.pathname,
    hostname: window.location.hostname,
    referrer: document.referrer,
    title: document.title,
  };
}

export function useAnalytics() {
  const trackEvent = useCallback((event: AnalyticsEvent) => {
    const payload: AnalyticsPayload = {
      ...getBasePayload(),
      name: event.name,
      data: event.data,
    };

    sendAnalytics(payload);
  }, []);

  const trackPageView = useCallback(() => {
    sendAnalytics(getBasePayload());
  }, []);

  // Convenience methods for specific events
  const trackOnboardingComplete = useCallback((platformCount: number) => {
    trackEvent({ name: 'onboarding_complete', data: { platformCount } });
  }, [trackEvent]);

  const trackPlatformStart = useCallback((platformId: string) => {
    trackEvent({ name: 'platform_start', data: { platformId } });
  }, [trackEvent]);

  const trackPlatformDelete = useCallback((platformId: string) => {
    trackEvent({ name: 'platform_delete', data: { platformId } });
  }, [trackEvent]);

  const trackPlatformSkip = useCallback((platformId: string) => {
    trackEvent({ name: 'platform_skip', data: { platformId } });
  }, [trackEvent]);

  const trackPlatformComplete = useCallback(
    (platformId: string, method: 'secured' | 'skipped' | 'deleted') => {
      trackEvent({ name: 'platform_complete', data: { platformId, method } });
    },
    [trackEvent]
  );

  const trackStepComplete = useCallback((platformId: string, step: number) => {
    trackEvent({ name: 'step_complete', data: { platformId, step } });
  }, [trackEvent]);

  const trackStepSkip = useCallback((platformId: string, step: number) => {
    trackEvent({ name: 'step_skip', data: { platformId, step } });
  }, [trackEvent]);

  return {
    trackEvent,
    trackPageView,
    trackOnboardingComplete,
    trackPlatformStart,
    trackPlatformDelete,
    trackPlatformSkip,
    trackPlatformComplete,
    trackStepComplete,
    trackStepSkip,
  };
}
