import crypto from 'crypto';

/**
 * Analytics event types for tracking user actions
 */
export type AnalyticsEvent =
  | { name: 'onboarding_complete'; data: { platformCount: number } }
  | { name: 'platform_start'; data: { platformId: string } }
  | { name: 'platform_delete'; data: { platformId: string } }
  | { name: 'platform_skip'; data: { platformId: string } }
  | { name: 'platform_complete'; data: { platformId: string; method: 'secured' | 'skipped' | 'deleted' } }
  | { name: 'step_complete'; data: { platformId: string; step: number } }
  | { name: 'step_skip'; data: { platformId: string; step: number } };

/**
 * Payload sent to the analytics API route
 */
export interface AnalyticsPayload {
  url: string;
  hostname: string;
  referrer: string;
  title: string;
  language?: string;
  screen?: string;
  name?: string;
  data?: Record<string, unknown>;
}

/**
 * Get the current date in YYYY-MM-DD format for daily salt rotation
 */
function getDayKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

/**
 * Generate a privacy-preserving hash from an IP address
 * Uses a daily salt and server-side secret to prevent reverse lookups
 */
function generatePrivacyPreservingId(ipAddress: string, salt: string = ''): string {
  const ipHashSalt = process.env.IP_HASH_SALT || 'default-salt';
  return crypto.createHash('sha256').update(ipAddress + salt + ipHashSalt).digest('hex');
}

/**
 * Creates an anonymized IP that preserves approximate geographic location
 * - First two octets preserved for broad geo accuracy (country/region level)
 * - Third octet partially randomized (keeps subnet groups)
 * - Fourth octet fully randomized
 * - Hash changes daily to prevent long-term tracking
 */
export function createGeoPreservingAnonymousIP(originalIP: string | null): string | null {
  if (!originalIP) return null;

  const ipParts = originalIP.split('.');
  if (ipParts.length !== 4) return originalIP; // Return original if not IPv4

  const [prefix1, prefix2, thirdOctet] = ipParts;
  const dailySalt = getDayKey();
  const userHash = generatePrivacyPreservingId(originalIP, dailySalt);

  // Keep first two octets for broad geo accuracy
  // Third octet: preserve top 3 bits, randomize bottom 5
  const thirdOctetInt = parseInt(thirdOctet);
  const thirdOctetHigh = thirdOctetInt & 0xe0; // Keep top 3 bits (224 mask)
  const thirdOctetRandom = parseInt(userHash.substring(0, 2), 16) & 0x1f; // Random 5 bits
  const anonymizedThird = thirdOctetHigh | thirdOctetRandom;

  // Fourth octet: fully randomized
  const anonymizedFourth = parseInt(userHash.substring(2, 6), 16) % 256;

  return `${prefix1}.${prefix2}.${anonymizedThird}.${anonymizedFourth}`;
}

/**
 * Send an event to the self-hosted Umami analytics server
 * Uses timestamp + hash authentication for self-hosted instances
 */
export async function sendUmamiEvent(
  payload: AnalyticsPayload,
  userAgent: string,
  clientIP: string | null
): Promise<{ success: boolean; error?: string }> {
  const websiteId = process.env.UMAMI_WEBSITE_ID;
  const userId = process.env.UMAMI_API_CLIENT_USER_ID;
  const appSecret = process.env.UMAMI_API_CLIENT_SECRET;
  const umamiHost = process.env.UMAMI_HOST;

  if (!websiteId || !userId || !appSecret || !umamiHost) {
    console.error('Missing Umami configuration:', {
      hasWebsiteId: !!websiteId,
      hasUserId: !!userId,
      hasAppSecret: !!appSecret,
      hasUmamiHost: !!umamiHost,
    });
    return { success: false, error: 'Missing analytics configuration' };
  }

  const anonymizedIP = createGeoPreservingAnonymousIP(clientIP);

  const data = {
    type: 'event',
    payload: {
      url: payload.url,
      hostname: payload.hostname,
      referrer: payload.referrer,
      title: payload.title,
      language: payload.language || '',
      screen: payload.screen || '',
      name: payload.name || '',
      data: payload.data,
      website: websiteId,
      ip: anonymizedIP,
    },
  };

  // Self-hosted authentication: timestamp + hash
  const timestamp = Date.now();
  const hash = crypto
    .createHash('sha256')
    .update(`${timestamp}:${userId}:${appSecret}`)
    .digest('hex');

  try {
    const response = await fetch(`${umamiHost}/api/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': userAgent || 'SocialScrub/1.0',
        'x-umami-timestamp': timestamp.toString(),
        'x-umami-hash': hash,
        'x-umami-id': userId,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Umami API error:', response.status, text);
      return { success: false, error: `HTTP ${response.status}` };
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending Umami event:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
