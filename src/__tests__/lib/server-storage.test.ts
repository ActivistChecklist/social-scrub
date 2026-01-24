import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createEmptySession } from '@/lib/storage';

// Mock @vercel/kv
vi.mock('@vercel/kv', () => ({
  kv: {
    set: vi.fn(),
    get: vi.fn(),
    del: vi.fn(),
    exists: vi.fn(),
  },
}));

describe('server-storage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Clear environment variables
    delete process.env.KV_REST_API_URL;
    delete process.env.KV_REST_API_TOKEN;
  });

  describe('saveSessionToServer', () => {
    it('should throw error when KV is not configured', async () => {
      const { saveSessionToServer } = await import('@/lib/server-storage');
      const session = createEmptySession();

      await expect(saveSessionToServer(session)).rejects.toThrow(
        'Cloud storage is not configured'
      );
    });

    it('should save session when KV is configured', async () => {
      // Set up environment
      process.env.KV_REST_API_URL = 'https://test.kv.vercel-storage.com';
      process.env.KV_REST_API_TOKEN = 'test-token';

      const { kv } = await import('@vercel/kv');
      const { saveSessionToServer } = await import('@/lib/server-storage');

      vi.mocked(kv.set).mockResolvedValue('OK');

      const session = createEmptySession();
      const sessionId = await saveSessionToServer(session);

      expect(sessionId).toBeDefined();
      expect(kv.set).toHaveBeenCalledWith(
        expect.stringContaining('session:'),
        expect.any(String),
        expect.objectContaining({ ex: 60 * 60 * 24 * 90 })
      );
    });

    it('should handle KV errors gracefully', async () => {
      process.env.KV_REST_API_URL = 'https://test.kv.vercel-storage.com';
      process.env.KV_REST_API_TOKEN = 'test-token';

      const { kv } = await import('@vercel/kv');
      const { saveSessionToServer } = await import('@/lib/server-storage');

      vi.mocked(kv.set).mockRejectedValue(new Error('KV error'));

      const session = createEmptySession();

      await expect(saveSessionToServer(session)).rejects.toThrow(
        'Failed to save session to cloud storage'
      );
    });
  });

  describe('getSessionFromServer', () => {
    it('should return null when KV is not configured', async () => {
      const { getSessionFromServer } = await import('@/lib/server-storage');

      const result = await getSessionFromServer('test-session-123');

      expect(result).toBeNull();
    });

    it('should return null for invalid session ID', async () => {
      process.env.KV_REST_API_URL = 'https://test.kv.vercel-storage.com';
      process.env.KV_REST_API_TOKEN = 'test-token';

      const { getSessionFromServer } = await import('@/lib/server-storage');

      const result = await getSessionFromServer('invalid!!!');

      expect(result).toBeNull();
    });

    it('should retrieve session when KV is configured', async () => {
      process.env.KV_REST_API_URL = 'https://test.kv.vercel-storage.com';
      process.env.KV_REST_API_TOKEN = 'test-token';

      const { kv } = await import('@vercel/kv');
      const { getSessionFromServer } = await import('@/lib/server-storage');

      const mockSession = createEmptySession();
      vi.mocked(kv.get).mockResolvedValue(JSON.stringify(mockSession));

      const result = await getSessionFromServer(mockSession.id);

      expect(result).toBeDefined();
      expect(result?.id).toBe(mockSession.id);
    });

    it('should handle KV errors gracefully', async () => {
      process.env.KV_REST_API_URL = 'https://test.kv.vercel-storage.com';
      process.env.KV_REST_API_TOKEN = 'test-token';

      const { kv } = await import('@vercel/kv');
      const { getSessionFromServer } = await import('@/lib/server-storage');

      vi.mocked(kv.get).mockRejectedValue(new Error('KV error'));

      const result = await getSessionFromServer('bright-butterfly');

      expect(result).toBeNull();
    });
  });

  describe('updateSessionOnServer', () => {
    it('should throw error when KV is not configured', async () => {
      const { updateSessionOnServer } = await import('@/lib/server-storage');
      const session = createEmptySession();

      await expect(updateSessionOnServer(session)).rejects.toThrow(
        'Cloud storage is not configured'
      );
    });

    it('should update session when KV is configured', async () => {
      process.env.KV_REST_API_URL = 'https://test.kv.vercel-storage.com';
      process.env.KV_REST_API_TOKEN = 'test-token';

      const { kv } = await import('@vercel/kv');
      const { updateSessionOnServer } = await import('@/lib/server-storage');

      vi.mocked(kv.set).mockResolvedValue('OK');

      const session = createEmptySession();
      await updateSessionOnServer(session);

      expect(kv.set).toHaveBeenCalled();
    });
  });

  describe('deleteSessionFromServer', () => {
    it('should do nothing when KV is not configured', async () => {
      const { deleteSessionFromServer } = await import('@/lib/server-storage');
      const { kv } = await import('@vercel/kv');

      await deleteSessionFromServer('bright-butterfly');

      expect(kv.del).not.toHaveBeenCalled();
    });

    it('should delete session when KV is configured', async () => {
      process.env.KV_REST_API_URL = 'https://test.kv.vercel-storage.com';
      process.env.KV_REST_API_TOKEN = 'test-token';

      const { kv } = await import('@vercel/kv');
      const { deleteSessionFromServer } = await import('@/lib/server-storage');

      vi.mocked(kv.del).mockResolvedValue(1);

      await deleteSessionFromServer('bright-butterfly');

      expect(kv.del).toHaveBeenCalledWith('session:bright-butterfly');
    });
  });

  describe('sessionExistsOnServer', () => {
    it('should return false when KV is not configured', async () => {
      const { sessionExistsOnServer } = await import('@/lib/server-storage');

      const result = await sessionExistsOnServer('bright-butterfly');

      expect(result).toBe(false);
    });

    it('should check session existence when KV is configured', async () => {
      process.env.KV_REST_API_URL = 'https://test.kv.vercel-storage.com';
      process.env.KV_REST_API_TOKEN = 'test-token';

      const { kv } = await import('@vercel/kv');
      const { sessionExistsOnServer } = await import('@/lib/server-storage');

      vi.mocked(kv.exists).mockResolvedValue(1);

      const result = await sessionExistsOnServer('bright-butterfly');

      expect(result).toBe(true);
      expect(kv.exists).toHaveBeenCalledWith('session:bright-butterfly');
    });
  });
});
