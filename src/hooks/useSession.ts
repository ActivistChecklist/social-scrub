'use client';

import { useState, useEffect, useCallback } from 'react';
import { Session, PlatformProgress } from '@/lib/types';
import {
  createEmptySession,
  getLocalSession,
  saveLocalSession,
  clearLocalSession,
  updatePlatformProgress,
  markStepComplete,
  markStepSkipped,
  markPlatformDeleted,
  markPlatformSkipped,
  markPlatformComplete,
  resetPlatform,
  clearStep,
  getPlatformProgress,
  createCustomSite,
} from '@/lib/storage';

interface UseSessionReturn {
  session: Session | null;
  isLoading: boolean;
  hasSession: boolean;

  // Session management
  initSession: () => void;
  clearSession: () => void;
  completeOnboarding: (selectedPlatformIds: string[]) => void;

  // Platform progress
  getPlatform: (platformId: string) => PlatformProgress | undefined;
  updatePlatform: (platformId: string, updates: Partial<PlatformProgress>) => void;
  completeStep: (platformId: string, stepNumber: number) => void;
  skipStep: (platformId: string, stepNumber: number) => void;
  clearStepProgress: (platformId: string, stepNumber: number) => void;
  deletePlatform: (platformId: string) => void;
  skipPlatform: (platformId: string) => void;
  completePlatform: (platformId: string) => void;
  startPlatform: (platformId: string) => void;
  restorePlatform: (platformId: string) => void;

  // Adding platforms
  addPlatforms: (platformIds: string[]) => void;
  addCustomPlatforms: (platformNames: string[]) => void;
  removeCustomPlatform: (customSiteId: string) => void;
}

export function useSession(): UseSessionReturn {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load session from localStorage on mount
  useEffect(() => {
    const existingSession = getLocalSession();
    setSession(existingSession);
    setIsLoading(false);
  }, []);

  // Save session to localStorage whenever it changes
  useEffect(() => {
    if (session) {
      saveLocalSession(session);
    }
  }, [session]);

  const initSession = useCallback(() => {
    const newSession = createEmptySession();
    setSession(newSession);
  }, []);

  const clearSession = useCallback(() => {
    clearLocalSession();
    setSession(null);
  }, []);

  const completeOnboarding = useCallback((selectedPlatformIds: string[]) => {
    setSession(prev => {
      if (!prev) {
        const newSession = createEmptySession();
        return {
          ...newSession,
          onboardingComplete: true,
          platforms: selectedPlatformIds.map(id => ({
            platformId: id,
            status: 'not_started' as const,
            hasAccount: 'yes' as const,
            currentStep: 1,
            completedSteps: [],
            skippedSteps: [],
          })),
        };
      }

      return {
        ...prev,
        onboardingComplete: true,
        platforms: selectedPlatformIds.map(id => {
          const existing = prev.platforms.find(p => p.platformId === id);
          if (existing) return existing;

          return {
            platformId: id,
            status: 'not_started' as const,
            hasAccount: 'yes' as const,
            currentStep: 1,
            completedSteps: [],
            skippedSteps: [],
          };
        }),
      };
    });
  }, []);

  const getPlatform = useCallback((platformId: string): PlatformProgress | undefined => {
    if (!session) return undefined;
    return getPlatformProgress(session, platformId);
  }, [session]);

  const updatePlatform = useCallback((platformId: string, updates: Partial<PlatformProgress>) => {
    setSession(prev => {
      if (!prev) return prev;
      return updatePlatformProgress(prev, platformId, updates);
    });
  }, []);

  const completeStep = useCallback((platformId: string, stepNumber: number) => {
    setSession(prev => {
      if (!prev) return prev;
      return markStepComplete(prev, platformId, stepNumber);
    });
  }, []);

  const skipStep = useCallback((platformId: string, stepNumber: number) => {
    setSession(prev => {
      if (!prev) return prev;
      return markStepSkipped(prev, platformId, stepNumber);
    });
  }, []);

  const clearStepProgress = useCallback((platformId: string, stepNumber: number) => {
    setSession(prev => {
      if (!prev) return prev;
      return clearStep(prev, platformId, stepNumber);
    });
  }, []);

  const deletePlatform = useCallback((platformId: string) => {
    setSession(prev => {
      if (!prev) return prev;
      return markPlatformDeleted(prev, platformId);
    });
  }, []);

  const skipPlatform = useCallback((platformId: string) => {
    setSession(prev => {
      if (!prev) return prev;
      return markPlatformSkipped(prev, platformId);
    });
  }, []);

  const completePlatform = useCallback((platformId: string) => {
    setSession(prev => {
      if (!prev) return prev;
      return markPlatformComplete(prev, platformId);
    });
  }, []);

  const startPlatform = useCallback((platformId: string) => {
    setSession(prev => {
      if (!prev) return prev;
      return updatePlatformProgress(prev, platformId, {
        status: 'in_progress',
        startedAt: new Date().toISOString(),
      });
    });
  }, []);

  const restorePlatform = useCallback((platformId: string) => {
    setSession(prev => {
      if (!prev) return prev;
      return resetPlatform(prev, platformId);
    });
  }, []);

  const addPlatforms = useCallback((platformIds: string[]) => {
    setSession(prev => {
      if (!prev) return prev;

      const newPlatforms = platformIds
        .filter(id => !prev.platforms.some(p => p.platformId === id))
        .map(id => ({
          platformId: id,
          status: 'not_started' as const,
          hasAccount: 'yes' as const,
          currentStep: 1,
          completedSteps: [],
          skippedSteps: [],
        }));

      return {
        ...prev,
        platforms: [...prev.platforms, ...newPlatforms],
      };
    });
  }, []);

  const addCustomPlatforms = useCallback((platformNames: string[]) => {
    setSession(prev => {
      if (!prev) return prev;

      const newCustomSites = platformNames.map(name => createCustomSite(name));

      return {
        ...prev,
        customSites: [...prev.customSites, ...newCustomSites],
      };
    });
  }, []);

  const removeCustomPlatform = useCallback((customSiteId: string) => {
    setSession(prev => {
      if (!prev) return prev;

      return {
        ...prev,
        customSites: prev.customSites.filter(site => site.id !== customSiteId),
      };
    });
  }, []);

  return {
    session,
    isLoading,
    hasSession: !!session && session.onboardingComplete,

    initSession,
    clearSession,
    completeOnboarding,

    getPlatform,
    updatePlatform,
    completeStep,
    skipStep,
    clearStepProgress,
    deletePlatform,
    skipPlatform,
    completePlatform,
    startPlatform,
    restorePlatform,

    addPlatforms,
    addCustomPlatforms,
    removeCustomPlatform,
  };
}
