import { describe, it, expect } from 'vitest';
import { generateSessionId, isValidSessionId } from '@/lib/session-id';

describe('session-id', () => {
  describe('generateSessionId', () => {
    it('should generate a session ID in the format adjective-noun', () => {
      const id = generateSessionId();
      expect(id).toMatch(/^[a-z]+-[a-z]+$/);
    });

    it('should generate unique IDs', () => {
      const ids = new Set<string>();
      for (let i = 0; i < 100; i++) {
        ids.add(generateSessionId());
      }
      // With 40,000 possible combinations, 100 IDs should all be unique
      expect(ids.size).toBe(100);
    });
  });

  describe('isValidSessionId', () => {
    it('should return true for valid session IDs', () => {
      const id = generateSessionId();
      expect(isValidSessionId(id)).toBe(true);
    });

    it('should return false for invalid session IDs', () => {
      expect(isValidSessionId('invalid')).toBe(false);
      expect(isValidSessionId('too-many-parts')).toBe(false);
      expect(isValidSessionId('123-456')).toBe(false);
      expect(isValidSessionId('')).toBe(false);
      expect(isValidSessionId('notaword-butterfly')).toBe(false);
    });
  });
});
