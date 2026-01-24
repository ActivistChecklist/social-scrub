import { describe, it, expect, vi } from 'vitest';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock useSession hook
vi.mock('@/hooks/useSession', () => ({
  useSession: () => ({
    session: {
      id: 'test-session',
      platforms: [],
      customSites: [],
      onboardingComplete: false,
    },
    isLoading: false,
    hasSession: false,
    initSession: vi.fn(),
    clearSession: vi.fn(),
    completeOnboarding: vi.fn(),
    getPlatform: vi.fn(),
    updatePlatform: vi.fn(),
    completeStep: vi.fn(),
    skipStep: vi.fn(),
    deletePlatform: vi.fn(),
    skipPlatform: vi.fn(),
    startPlatform: vi.fn(),
    addCustomPlatforms: vi.fn(),
    removeCustomPlatform: vi.fn(),
  }),
}));

describe('Page imports (smoke tests)', () => {
  it('can import Home page', async () => {
    const mod = await import('@/app/page');
    expect(mod.default).toBeDefined();
  });

  it('can import Onboarding page', async () => {
    const mod = await import('@/app/onboarding/page');
    expect(mod.default).toBeDefined();
  });

  it('can import Onboarding Select page', async () => {
    const mod = await import('@/app/onboarding/select/page');
    expect(mod.default).toBeDefined();
  });

  it('can import Dashboard page', async () => {
    const mod = await import('@/app/dashboard/page');
    expect(mod.default).toBeDefined();
  });

  it('can import Platform intro page', async () => {
    const mod = await import('@/app/platform/[platformId]/page');
    expect(mod.default).toBeDefined();
  });

  it('can import Platform step page', async () => {
    const mod = await import('@/app/platform/[platformId]/[step]/page');
    expect(mod.default).toBeDefined();
  });

  it('can import Platform complete page', async () => {
    const mod = await import('@/app/platform/[platformId]/complete/page');
    expect(mod.default).toBeDefined();
  });

  it('can import Session page', async () => {
    const mod = await import('@/app/session/[sessionId]/page');
    expect(mod.default).toBeDefined();
  });
});

describe('Component imports (smoke tests)', () => {
  it('can import Button component', async () => {
    const mod = await import('@/components/ui/Button');
    expect(mod.default).toBeDefined();
  });

  it('can import Card component', async () => {
    const mod = await import('@/components/ui/Card');
    expect(mod.default).toBeDefined();
  });

  it('can import PlatformIcon component', async () => {
    const mod = await import('@/components/PlatformIcon');
    expect(mod.default).toBeDefined();
  });

  it('can import PlatformGrid component', async () => {
    const mod = await import('@/components/PlatformGrid');
    expect(mod.default).toBeDefined();
  });

  it('can import LucideIcon component', async () => {
    const mod = await import('@/components/ui/LucideIcon');
    expect(mod.default).toBeDefined();
  });

  it('can import ProgressIndicator component', async () => {
    const mod = await import('@/components/ui/ProgressIndicator');
    expect(mod.default).toBeDefined();
  });
});

describe('Library imports (smoke tests)', () => {
  it('can import platforms', async () => {
    const mod = await import('@/lib/platforms');
    expect(mod.PLATFORMS).toBeDefined();
    expect(mod.getPlatform).toBeDefined();
  });

  it('can import steps', async () => {
    const mod = await import('@/lib/steps');
    expect(mod.UNIVERSAL_STEPS).toBeDefined();
  });

  it('can import storage functions', async () => {
    const mod = await import('@/lib/storage');
    expect(mod.createEmptySession).toBeDefined();
    expect(mod.markStepComplete).toBeDefined();
  });

  it('can import session-id functions', async () => {
    const mod = await import('@/lib/session-id');
    expect(mod.generateSessionId).toBeDefined();
  });

  it('can import types', async () => {
    const mod = await import('@/lib/types');
    expect(mod).toBeDefined();
  });
});
