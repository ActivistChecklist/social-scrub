import { Session, PlatformProgress, CustomSite } from './types';
import { generateSessionId } from './session-id';
import { TOTAL_STEPS } from './steps';

const LOCAL_STORAGE_KEY = 'social-scrub-session';

export function createEmptySession(): Session {
  return {
    id: generateSessionId(),
    createdAt: new Date().toISOString(),
    lastActiveAt: new Date().toISOString(),
    storageType: 'local',
    platforms: [],
    customSites: [],
    onboardingComplete: false,
  };
}

export function createPlatformProgress(platformId: string): PlatformProgress {
  return {
    platformId,
    status: 'not_started',
    hasAccount: null,
    currentStep: 1,
    completedSteps: [],
    skippedSteps: [],
  };
}

export function createCustomSite(name: string): CustomSite {
  return {
    id: `custom-${Date.now()}`,
    name,
    priority: 'medium',
    status: 'not_started',
    completedSteps: [],
    skippedSteps: [],
    createdAt: new Date().toISOString(),
  };
}

// Local Storage Operations
export function getLocalSession(): Session | null {
  if (typeof window === 'undefined') return null;

  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!data) return null;
    return JSON.parse(data) as Session;
  } catch {
    return null;
  }
}

export function saveLocalSession(session: Session): void {
  if (typeof window === 'undefined') return;

  const updatedSession = {
    ...session,
    lastActiveAt: new Date().toISOString(),
  };

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedSession));
}

export function clearLocalSession(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}

// Platform Progress Helpers
export function getPlatformProgress(session: Session, platformId: string): PlatformProgress | undefined {
  return session.platforms.find(p => p.platformId === platformId);
}

export function updatePlatformProgress(
  session: Session,
  platformId: string,
  updates: Partial<PlatformProgress>
): Session {
  const existingIndex = session.platforms.findIndex(p => p.platformId === platformId);

  if (existingIndex === -1) {
    // Create new platform progress
    const newProgress = {
      ...createPlatformProgress(platformId),
      ...updates,
    };
    return {
      ...session,
      platforms: [...session.platforms, newProgress],
    };
  }

  // Update existing
  const updatedPlatforms = [...session.platforms];
  updatedPlatforms[existingIndex] = {
    ...updatedPlatforms[existingIndex],
    ...updates,
  };

  return {
    ...session,
    platforms: updatedPlatforms,
  };
}

export function markStepComplete(
  session: Session,
  platformId: string,
  stepNumber: number
): Session {
  const progress = getPlatformProgress(session, platformId);
  const completedSteps = progress?.completedSteps || [];

  if (completedSteps.includes(stepNumber)) {
    return session;
  }

  const newCompletedSteps = [...completedSteps, stepNumber];
  const nextStep = stepNumber + 1;
  const isComplete = newCompletedSteps.length + (progress?.skippedSteps?.length || 0) >= TOTAL_STEPS;

  return updatePlatformProgress(session, platformId, {
    completedSteps: newCompletedSteps,
    currentStep: nextStep > TOTAL_STEPS ? TOTAL_STEPS : nextStep,
    status: isComplete ? 'secured' : 'in_progress',
    completedAt: isComplete ? new Date().toISOString() : undefined,
  });
}

export function markStepSkipped(
  session: Session,
  platformId: string,
  stepNumber: number
): Session {
  const progress = getPlatformProgress(session, platformId);
  const skippedSteps = progress?.skippedSteps || [];

  if (skippedSteps.includes(stepNumber)) {
    return session;
  }

  const newSkippedSteps = [...skippedSteps, stepNumber];
  const nextStep = stepNumber + 1;
  const isComplete = (progress?.completedSteps?.length || 0) + newSkippedSteps.length >= TOTAL_STEPS;

  return updatePlatformProgress(session, platformId, {
    skippedSteps: newSkippedSteps,
    currentStep: nextStep > TOTAL_STEPS ? TOTAL_STEPS : nextStep,
    status: isComplete ? 'secured' : 'in_progress',
    completedAt: isComplete ? new Date().toISOString() : undefined,
  });
}

export function markPlatformDeleted(session: Session, platformId: string): Session {
  return updatePlatformProgress(session, platformId, {
    status: 'secured',
    method: 'deleted',
    completedSteps: [1], // Only step 1 (delete) is marked complete
    completedAt: new Date().toISOString(),
  });
}

export function markPlatformSkipped(session: Session, platformId: string): Session {
  return updatePlatformProgress(session, platformId, {
    status: 'skipped',
    completedAt: new Date().toISOString(),
  });
}

export function resetPlatform(session: Session, platformId: string): Session {
  return updatePlatformProgress(session, platformId, {
    status: 'not_started',
    method: undefined,
    completedSteps: [],
    skippedSteps: [],
    currentStep: 1,
    completedAt: undefined,
    startedAt: undefined,
  });
}

export function clearStep(
  session: Session,
  platformId: string,
  stepNumber: number
): Session {
  const progress = getPlatformProgress(session, platformId);
  if (!progress) return session;

  const newCompletedSteps = progress.completedSteps.filter(s => s !== stepNumber);
  const newSkippedSteps = progress.skippedSteps.filter(s => s !== stepNumber);

  // Recalculate status
  const totalHandled = newCompletedSteps.length + newSkippedSteps.length;
  const isComplete = totalHandled >= TOTAL_STEPS;
  const isInProgress = totalHandled > 0 && !isComplete;

  return updatePlatformProgress(session, platformId, {
    completedSteps: newCompletedSteps,
    skippedSteps: newSkippedSteps,
    status: isComplete ? 'secured' : isInProgress ? 'in_progress' : 'not_started',
    completedAt: isComplete ? progress.completedAt : undefined,
  });
}

export function markPlatformComplete(session: Session, platformId: string): Session {
  return updatePlatformProgress(session, platformId, {
    status: 'secured',
    completedAt: new Date().toISOString(),
  });
}

// Session Statistics
export function getSessionStats(session: Session) {
  const platforms = session.platforms;

  return {
    total: platforms.length,
    notStarted: platforms.filter(p => p.status === 'not_started').length,
    inProgress: platforms.filter(p => p.status === 'in_progress').length,
    secured: platforms.filter(p => p.status === 'secured').length,
    skipped: platforms.filter(p => p.status === 'skipped').length,
  };
}

export function calculatePlatformProgress(progress: PlatformProgress): number {
  if (progress.status === 'secured' || progress.status === 'skipped') {
    return 100;
  }

  const totalHandled = progress.completedSteps.length + progress.skippedSteps.length;
  return Math.round((totalHandled / TOTAL_STEPS) * 100);
}
