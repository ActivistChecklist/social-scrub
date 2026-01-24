import { kv } from '@vercel/kv';
import { Session } from './types';
import { generateSessionId, isValidSessionId } from './session-id';

const SESSION_PREFIX = 'session:';
const SESSION_TTL = 60 * 60 * 24 * 90; // 90 days in seconds

// Check if KV is configured
function isKVConfigured(): boolean {
  return !!(
    process.env.KV_REST_API_URL &&
    process.env.KV_REST_API_TOKEN
  );
}

export async function saveSessionToServer(session: Session): Promise<string> {
  if (!isKVConfigured()) {
    throw new Error(
      'Cloud storage is not configured. Please set up Vercel KV to use this feature.'
    );
  }

  // Generate a new session ID if needed for server storage
  let sessionId = session.id;

  // Ensure we have a valid session ID
  if (!isValidSessionId(sessionId)) {
    sessionId = generateSessionId();
  }

  const serverSession: Session = {
    ...session,
    id: sessionId,
    storageType: 'server',
    lastActiveAt: new Date().toISOString(),
  };

  try {
    await kv.set(`${SESSION_PREFIX}${sessionId}`, JSON.stringify(serverSession), {
      ex: SESSION_TTL,
    });
  } catch (error) {
    console.error('Failed to save session to KV:', error);
    throw new Error('Failed to save session to cloud storage. Please try again.');
  }

  return sessionId;
}

export async function getSessionFromServer(sessionId: string): Promise<Session | null> {
  if (!isKVConfigured()) {
    return null;
  }

  if (!isValidSessionId(sessionId)) {
    return null;
  }

  try {
    const data = await kv.get<string>(`${SESSION_PREFIX}${sessionId}`);
    if (!data) return null;

    // If data is already an object (kv might auto-parse), use it directly
    if (typeof data === 'object') {
      return data as unknown as Session;
    }

    return JSON.parse(data) as Session;
  } catch (error) {
    console.error('Failed to get session from KV:', error);
    return null;
  }
}

export async function updateSessionOnServer(session: Session): Promise<void> {
  if (!isKVConfigured()) {
    throw new Error('Cloud storage is not configured.');
  }

  if (!isValidSessionId(session.id)) {
    throw new Error('Invalid session ID');
  }

  const updatedSession: Session = {
    ...session,
    lastActiveAt: new Date().toISOString(),
  };

  try {
    await kv.set(`${SESSION_PREFIX}${session.id}`, JSON.stringify(updatedSession), {
      ex: SESSION_TTL,
    });
  } catch (error) {
    console.error('Failed to update session in KV:', error);
    throw new Error('Failed to update session in cloud storage.');
  }
}

export async function deleteSessionFromServer(sessionId: string): Promise<void> {
  if (!isKVConfigured() || !isValidSessionId(sessionId)) {
    return;
  }

  try {
    await kv.del(`${SESSION_PREFIX}${sessionId}`);
  } catch (error) {
    console.error('Failed to delete session from KV:', error);
  }
}

export async function sessionExistsOnServer(sessionId: string): Promise<boolean> {
  if (!isKVConfigured() || !isValidSessionId(sessionId)) {
    return false;
  }

  try {
    const exists = await kv.exists(`${SESSION_PREFIX}${sessionId}`);
    return exists > 0;
  } catch (error) {
    console.error('Failed to check session existence in KV:', error);
    return false;
  }
}
