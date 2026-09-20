import { describe, it, expect } from 'vitest';
import {
  PLATFORMS,
  getPlatform,
  getPlatformsByPriority,
  getPlatformsByCategory,
  PRIORITY_LABELS,
  CATEGORY_LABELS,
} from '@/lib/platforms';

describe('platforms', () => {
  describe('data integrity', () => {
    it('should not contain duplicate platform ids', () => {
      const ids = PLATFORMS.map(p => p.id);
      const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
      expect(duplicates).toEqual([]);
    });

    it('should not contain duplicate platform names', () => {
      const names = PLATFORMS.map(p => p.name.toLowerCase());
      const duplicates = names.filter((name, i) => names.indexOf(name) !== i);
      expect(duplicates).toEqual([]);
    });

    it('should use slug-style ids', () => {
      for (const platform of PLATFORMS) {
        expect(platform.id, `${platform.name} has a non-slug id`).toMatch(/^[a-z0-9]+$/);
      }
    });

    it('should use a known priority and category for every platform', () => {
      for (const platform of PLATFORMS) {
        expect(PRIORITY_LABELS[platform.priority], platform.id).toBeDefined();
        expect(CATEGORY_LABELS[platform.category], platform.id).toBeDefined();
      }
    });

    it('should give every platform a name, url, and importance reason', () => {
      for (const platform of PLATFORMS) {
        expect(platform.name, platform.id).toBeTruthy();
        expect(platform.url, platform.id).toMatch(/^https:\/\//);
        expect(platform.importanceReason, platform.id).toBeTruthy();
      }
    });
  });

  describe('community-requested platforms', () => {
    // Each of these was requested in a GitHub issue; keep them from being
    // dropped or renamed by accident.
    const requested = [
      'poshmark',
      'cvs',
      'thedyrt',
      'kaya',
      'voxer',
      'credly',
      'twitch',
      'unsplash',
      'costar',
      'peloton',
    ];

    it.each(requested)('should include %s', id => {
      expect(getPlatform(id)).toBeDefined();
    });
  });

  describe('getPlatform', () => {
    it('should return undefined for an unknown id', () => {
      expect(getPlatform('not-a-real-platform')).toBeUndefined();
    });
  });

  describe('getPlatformsByPriority', () => {
    it('should only return platforms of the requested priority', () => {
      const medium = getPlatformsByPriority('medium');
      expect(medium.length).toBeGreaterThan(0);
      expect(medium.every(p => p.priority === 'medium')).toBe(true);
    });
  });

  describe('getPlatformsByCategory', () => {
    it('should only return platforms of the requested category', () => {
      const messaging = getPlatformsByCategory('messaging');
      expect(messaging.length).toBeGreaterThan(0);
      expect(messaging.every(p => p.category === 'messaging')).toBe(true);
    });
  });
});
