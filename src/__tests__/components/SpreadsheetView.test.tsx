import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import SpreadsheetView from '@/components/dashboard/SpreadsheetView';
import { Platform, PlatformProgress } from '@/lib/types';

const mockPlatform: Platform = {
  id: 'facebook',
  name: 'Facebook',
  category: 'social',
  priority: 'highest',
  icon: 'facebook',
};

const createMockProgress = (overrides: Partial<PlatformProgress> = {}): PlatformProgress => ({
  platformId: 'facebook',
  status: 'not_started',
  hasAccount: 'yes',
  currentStep: 1,
  completedSteps: [],
  skippedSteps: [],
  ...overrides,
});

describe('SpreadsheetView', () => {
  const defaultProps = {
    groupedPlatforms: {},
    customPlatforms: [],
    onPlatformClick: vi.fn(),
    onStepComplete: vi.fn(),
    onStepSkip: vi.fn(),
    onStepClear: vi.fn(),
    onPlatformDelete: vi.fn(),
    onPlatformComplete: vi.fn(),
    onPlatformReset: vi.fn(),
    onAddPlatformsClick: vi.fn(),
  };

  it('hides delete button when user has started marking steps', () => {
    const progressWithSteps = createMockProgress({
      completedSteps: [2], // User marked step 2 as complete
    });

    render(
      <SpreadsheetView
        {...defaultProps}
        groupedPlatforms={{
          highest: [{ platform: mockPlatform, progress: progressWithSteps }],
        }}
      />
    );

    // The delete icon should not be visible since user has implicitly chosen to keep
    const deleteButtons = screen.queryAllByTitle('Delete account');
    expect(deleteButtons.length).toBe(0);
  });

  it('shows delete button when no steps have been marked', () => {
    const progressNoSteps = createMockProgress({
      completedSteps: [],
      skippedSteps: [],
    });

    render(
      <SpreadsheetView
        {...defaultProps}
        groupedPlatforms={{
          highest: [{ platform: mockPlatform, progress: progressNoSteps }],
        }}
      />
    );

    // The delete button should be visible
    const deleteButton = screen.getByTitle('Delete account');
    expect(deleteButton).toBeInTheDocument();
  });

  it('shows restore button for deleted platforms', () => {
    const deletedProgress = createMockProgress({
      status: 'secured',
      method: 'deleted',
      completedSteps: [1],
    });

    render(
      <SpreadsheetView
        {...defaultProps}
        groupedPlatforms={{
          highest: [{ platform: mockPlatform, progress: deletedProgress }],
        }}
      />
    );

    // The restore button should be visible
    const restoreButton = screen.getByTitle('Restore platform');
    expect(restoreButton).toBeInTheDocument();
  });

  it('uses green styling for deleted platforms', () => {
    const deletedProgress = createMockProgress({
      status: 'secured',
      method: 'deleted',
      completedSteps: [1],
    });

    render(
      <SpreadsheetView
        {...defaultProps}
        groupedPlatforms={{
          highest: [{ platform: mockPlatform, progress: deletedProgress }],
        }}
      />
    );

    // Check that "Deleted!" text is shown in green
    const deletedText = screen.getByText('Deleted!');
    expect(deletedText).toBeInTheDocument();
    expect(deletedText).toHaveClass('text-emerald-600');
  });
});
