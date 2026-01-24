import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import PlatformIntro from '@/app/platform/[platformId]/page';

// Mock next/navigation
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/platform/tiktok',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock useSession hook
const mockGetPlatform = vi.fn();
const mockStartPlatform = vi.fn();
const mockSkipPlatform = vi.fn();
const mockRestorePlatform = vi.fn();

vi.mock('@/hooks/useSession', () => ({
  useSession: () => ({
    session: {
      id: 'test-session',
      platforms: [
        { platformId: 'tiktok', status: 'not_started', currentStep: 1, completedSteps: [], skippedSteps: [] }
      ],
      customSites: [],
      onboardingComplete: true,
    },
    isLoading: false,
    hasSession: true,
    getPlatform: mockGetPlatform,
    startPlatform: mockStartPlatform,
    skipPlatform: mockSkipPlatform,
    restorePlatform: mockRestorePlatform,
  }),
}));

describe('PlatformIntro page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetPlatform.mockReturnValue(undefined); // Not started
  });

  it('renders without crashing for a valid platform', () => {
    render(<PlatformIntro params={{ platformId: 'tiktok' }} />);

    expect(screen.getByText('Lock Down TikTok')).toBeInTheDocument();
    expect(screen.getByText("Let's Go →")).toBeInTheDocument();
    expect(screen.getByText('Skip This Platform')).toBeInTheDocument();
  });

  it('displays back button', () => {
    render(<PlatformIntro params={{ platformId: 'tiktok' }} />);

    expect(screen.getByText('← Back to dashboard')).toBeInTheDocument();
  });

  it('shows Before/After preview section', () => {
    render(<PlatformIntro params={{ platformId: 'tiktok' }} />);

    expect(screen.getByText("What We'll Transform")).toBeInTheDocument();
    expect(screen.getByText('Before: Vulnerable')).toBeInTheDocument();
    expect(screen.getByText('After: Protected')).toBeInTheDocument();
  });

  it('renders correctly for different platforms', () => {
    render(<PlatformIntro params={{ platformId: 'instagram' }} />);

    expect(screen.getByText('Lock Down Instagram')).toBeInTheDocument();
  });
});
