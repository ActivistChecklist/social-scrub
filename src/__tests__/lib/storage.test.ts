import { describe, it, expect } from 'vitest';
import {
  createEmptySession,
  createPlatformProgress,
  markStepComplete,
  markStepSkipped,
  markPlatformDeleted,
  markPlatformComplete,
  clearStep,
  getSessionStats,
  calculatePlatformProgress,
} from '@/lib/storage';

describe('storage', () => {
  describe('createEmptySession', () => {
    it('should create a session with default values', () => {
      const session = createEmptySession();

      expect(session.id).toBeDefined();
      expect(session.createdAt).toBeDefined();
      expect(session.lastActiveAt).toBeDefined();
      expect(session.storageType).toBe('local');
      expect(session.platforms).toEqual([]);
      expect(session.customSites).toEqual([]);
      expect(session.onboardingComplete).toBe(false);
    });
  });

  describe('createPlatformProgress', () => {
    it('should create platform progress with default values', () => {
      const progress = createPlatformProgress('facebook');

      expect(progress.platformId).toBe('facebook');
      expect(progress.status).toBe('not_started');
      expect(progress.hasAccount).toBe(null);
      expect(progress.currentStep).toBe(1);
      expect(progress.completedSteps).toEqual([]);
      expect(progress.skippedSteps).toEqual([]);
    });
  });

  describe('markStepComplete', () => {
    it('should add step to completed steps', () => {
      let session = createEmptySession();
      session.platforms = [createPlatformProgress('facebook')];

      session = markStepComplete(session, 'facebook', 1);

      const progress = session.platforms[0];
      expect(progress.completedSteps).toContain(1);
      expect(progress.currentStep).toBe(2);
      expect(progress.status).toBe('in_progress');
    });

    it('should not add duplicate steps', () => {
      let session = createEmptySession();
      session.platforms = [createPlatformProgress('facebook')];

      session = markStepComplete(session, 'facebook', 1);
      session = markStepComplete(session, 'facebook', 1);

      const progress = session.platforms[0];
      expect(progress.completedSteps).toEqual([1]);
    });

    it('should mark platform as secured when all steps are done', () => {
      let session = createEmptySession();
      session.platforms = [createPlatformProgress('facebook')];

      // Complete all 9 steps
      for (let i = 1; i <= 9; i++) {
        session = markStepComplete(session, 'facebook', i);
      }

      const progress = session.platforms[0];
      expect(progress.status).toBe('secured');
      expect(progress.completedAt).toBeDefined();
    });
  });

  describe('markStepSkipped', () => {
    it('should add step to skipped steps', () => {
      let session = createEmptySession();
      session.platforms = [createPlatformProgress('facebook')];

      session = markStepSkipped(session, 'facebook', 1);

      const progress = session.platforms[0];
      expect(progress.skippedSteps).toContain(1);
      expect(progress.currentStep).toBe(2);
    });
  });

  describe('markPlatformDeleted', () => {
    it('should mark platform as secured with deleted method', () => {
      let session = createEmptySession();
      session.platforms = [createPlatformProgress('facebook')];

      session = markPlatformDeleted(session, 'facebook');

      const progress = session.platforms[0];
      expect(progress.status).toBe('secured');
      expect(progress.method).toBe('deleted');
      expect(progress.completedSteps).toEqual([1]);
      expect(progress.completedAt).toBeDefined();
    });
  });

  describe('getSessionStats', () => {
    it('should calculate correct stats', () => {
      const session = createEmptySession();
      session.platforms = [
        { ...createPlatformProgress('facebook'), status: 'secured' },
        { ...createPlatformProgress('twitter'), status: 'in_progress' },
        { ...createPlatformProgress('instagram'), status: 'not_started' },
        { ...createPlatformProgress('linkedin'), status: 'skipped' },
      ];

      const stats = getSessionStats(session);

      expect(stats.total).toBe(4);
      expect(stats.secured).toBe(1);
      expect(stats.inProgress).toBe(1);
      expect(stats.notStarted).toBe(1);
      expect(stats.skipped).toBe(1);
    });
  });

  describe('calculatePlatformProgress', () => {
    it('should return 100 for secured platforms', () => {
      const progress = {
        ...createPlatformProgress('facebook'),
        status: 'secured' as const,
      };

      expect(calculatePlatformProgress(progress)).toBe(100);
    });

    it('should calculate percentage for in-progress platforms', () => {
      const progress = {
        ...createPlatformProgress('facebook'),
        status: 'in_progress' as const,
        completedSteps: [1, 2, 3],
        skippedSteps: [4],
      };

      // 4 steps handled out of 9 = ~44%
      expect(calculatePlatformProgress(progress)).toBe(44);
    });
  });

  describe('clearStep', () => {
    it('should remove step from completed steps', () => {
      let session = createEmptySession();
      session.platforms = [createPlatformProgress('facebook')];

      // Complete steps 1 and 2
      session = markStepComplete(session, 'facebook', 1);
      session = markStepComplete(session, 'facebook', 2);

      // Clear step 1
      session = clearStep(session, 'facebook', 1);

      const progress = session.platforms[0];
      expect(progress.completedSteps).toEqual([2]);
      expect(progress.completedSteps).not.toContain(1);
    });

    it('should remove step from skipped steps', () => {
      let session = createEmptySession();
      session.platforms = [createPlatformProgress('facebook')];

      // Skip step 1, complete step 2
      session = markStepSkipped(session, 'facebook', 1);
      session = markStepComplete(session, 'facebook', 2);

      // Clear the skipped step
      session = clearStep(session, 'facebook', 1);

      const progress = session.platforms[0];
      expect(progress.skippedSteps).toEqual([]);
      expect(progress.skippedSteps).not.toContain(1);
    });

    it('should update status correctly after clearing steps', () => {
      let session = createEmptySession();
      session.platforms = [createPlatformProgress('facebook')];

      // Complete one step
      session = markStepComplete(session, 'facebook', 1);
      expect(session.platforms[0].status).toBe('in_progress');

      // Clear that step - should go back to not_started
      session = clearStep(session, 'facebook', 1);

      const progress = session.platforms[0];
      expect(progress.status).toBe('not_started');
    });

    it('should revert secured status when steps are cleared', () => {
      let session = createEmptySession();
      session.platforms = [createPlatformProgress('facebook')];

      // Complete all 9 steps
      for (let i = 1; i <= 9; i++) {
        session = markStepComplete(session, 'facebook', i);
      }
      expect(session.platforms[0].status).toBe('secured');

      // Clear one step - should go back to in_progress
      session = clearStep(session, 'facebook', 5);

      const progress = session.platforms[0];
      expect(progress.status).toBe('in_progress');
      expect(progress.completedSteps).not.toContain(5);
    });
  });

  describe('markPlatformComplete', () => {
    it('should mark platform as secured', () => {
      let session = createEmptySession();
      session.platforms = [createPlatformProgress('facebook')];

      session = markPlatformComplete(session, 'facebook');

      const progress = session.platforms[0];
      expect(progress.status).toBe('secured');
      expect(progress.completedAt).toBeDefined();
    });

    it('should work on in-progress platforms', () => {
      let session = createEmptySession();
      session.platforms = [createPlatformProgress('facebook')];

      // Start some progress
      session = markStepComplete(session, 'facebook', 1);
      session = markStepComplete(session, 'facebook', 2);
      expect(session.platforms[0].status).toBe('in_progress');

      // Mark as complete
      session = markPlatformComplete(session, 'facebook');

      const progress = session.platforms[0];
      expect(progress.status).toBe('secured');
      expect(progress.completedAt).toBeDefined();
      // Should preserve existing completed steps
      expect(progress.completedSteps).toContain(1);
      expect(progress.completedSteps).toContain(2);
    });

    it('should work on not_started platforms', () => {
      let session = createEmptySession();
      session.platforms = [createPlatformProgress('facebook')];
      expect(session.platforms[0].status).toBe('not_started');

      session = markPlatformComplete(session, 'facebook');

      const progress = session.platforms[0];
      expect(progress.status).toBe('secured');
    });
  });
});
