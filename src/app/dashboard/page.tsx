'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/hooks/useSession';
import { useAnalytics } from '@/hooks/useAnalytics';
import { getPlatform } from '@/lib/platforms';
import Button from '@/components/ui/Button';
import Logo from '@/components/ui/Logo';
import PlatformCard from '@/components/PlatformCard';
import VisualProgressBar from '@/components/dashboard/VisualProgressBar';
import ContinueCTA from '@/components/dashboard/ContinueCTA';
import AddPlatformsModal from '@/components/dashboard/AddPlatformsModal';
import SpreadsheetView from '@/components/dashboard/SpreadsheetView';
import LocalStorageInfoModal from '@/components/LocalStorageInfoModal';
import Footer from '@/components/Footer';
import { Platform, PlatformProgress } from '@/lib/types';
import { LayoutGrid, Table, Save, Info } from 'lucide-react';

// Sort platforms within a group: completed, deleted, in-progress, then not started
// Within each status group, maintain original priority order (don't re-sort)
function sortPlatformsWithinGroup(platforms: PlatformProgress[]): PlatformProgress[] {
  return [...platforms].sort((a, b) => {
    const aDeleted = a.method === 'deleted';
    const bDeleted = b.method === 'deleted';
    const aCompleted = a.status === 'secured' && !aDeleted;
    const bCompleted = b.status === 'secured' && !bDeleted;
    const aInProgress = a.status === 'in_progress';
    const bInProgress = b.status === 'in_progress';

    // Completed first (not deleted)
    if (aCompleted && !bCompleted) return -1;
    if (!aCompleted && bCompleted) return 1;

    // Deleted second
    if (aDeleted && !bDeleted) return -1;
    if (!aDeleted && bDeleted) return 1;

    // In-progress third (maintain original order within group)
    if (aInProgress && !bInProgress) return -1;
    if (!aInProgress && bInProgress) return 1;

    // Within the same status group, maintain original order (priority order)
    return 0;
  });
}

// Sort by status for initial load, returning sorted IDs per priority
function getSortedPlatformIds(
  platforms: PlatformProgress[],
  getPlatformFn: typeof getPlatform
): Record<string, string[]> {
  const groups: Record<string, PlatformProgress[]> = {};

  platforms.forEach((progress) => {
    const platform = getPlatformFn(progress.platformId);
    if (!platform) return;
    const priority = platform.priority || 'low';
    if (!groups[priority]) {
      groups[priority] = [];
    }
    groups[priority].push(progress);
  });

  const result: Record<string, string[]> = {};
  Object.keys(groups).forEach(priority => {
    result[priority] = sortPlatformsWithinGroup(groups[priority]).map(p => p.platformId);
  });

  return result;
}

type ViewMode = 'cards' | 'spreadsheet';

type PriorityLevel = 'highest' | 'high' | 'medium' | 'low';

const PRIORITY_LABELS: Record<PriorityLevel, string> = {
  highest: 'Highest Priority',
  high: 'High Priority',
  medium: 'Medium Priority',
  low: 'Low Priority',
};

const PRIORITY_ORDER: PriorityLevel[] = ['highest', 'high', 'medium', 'low'];

export default function Dashboard() {
  const router = useRouter();
  const { session, isLoading, hasSession, getPlatform: getPlatformProgress, addPlatforms, addCustomPlatforms, completeStep, skipStep, clearStepProgress, deletePlatform, completePlatform, restorePlatform } = useSession();
  const { trackPageView } = useAnalytics();
  const [showStorageInfoModal, setShowStorageInfoModal] = useState(false);
  const [showAddPlatformsModal, setShowAddPlatformsModal] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('cards');

  // Stable sort order - captured on initial load and only updated when switching to spreadsheet view
  const stableSortOrderRef = useRef<Record<string, string[]> | null>(null);
  const [sortKey, setSortKey] = useState(0); // Used to trigger re-sort

  useEffect(() => {
    trackPageView();
  }, [trackPageView]);

  useEffect(() => {
    // Redirect to home if no session
    if (!isLoading && !hasSession) {
      router.push('/');
    }
  }, [isLoading, hasSession, router]);

  // Capture initial sort order when session loads or when entering spreadsheet view
  useEffect(() => {
    if (session && viewMode === 'spreadsheet' && !stableSortOrderRef.current) {
      stableSortOrderRef.current = getSortedPlatformIds(session.platforms, getPlatform);
    }
  }, [session, viewMode]);

  // Re-sort when switching to spreadsheet view
  const handleViewModeChange = (newMode: ViewMode) => {
    if (newMode === 'spreadsheet') {
      // Capture fresh sort order when entering spreadsheet view
      if (session) {
        stableSortOrderRef.current = getSortedPlatformIds(session.platforms, getPlatform);
        setSortKey(k => k + 1);
      }
    }
    setViewMode(newMode);
  };

  // Find the next platform to work on
  const nextPlatform = useMemo(() => {
    if (!session) return null;

    // First, find any in-progress platform
    const inProgress = session.platforms.find(p => p.status === 'in_progress');
    if (inProgress) return inProgress;

    // Then, find the first not-started platform
    const notStarted = session.platforms.find(p => p.status === 'not_started');
    return notStarted || null;
  }, [session]);

  // Group platforms by priority instead of category, then sort within each group
  const groupedPlatforms = useMemo(() => {
    if (!session) return {};

    const groups: Record<string, typeof session.platforms> = {};

    // Group built-in platforms by priority
    session.platforms.forEach((progress) => {
      const platform = getPlatform(progress.platformId);
      if (!platform) return;

      const priority = platform.priority || 'low';
      if (!groups[priority]) {
        groups[priority] = [];
      }
      groups[priority].push(progress);
    });

    // Sort each group
    Object.keys(groups).forEach(priority => {
      groups[priority] = sortPlatformsWithinGroup(groups[priority]);
    });

    return groups;
  }, [session]);

  // Get custom platforms with their info for spreadsheet view
  const customPlatformsWithInfo = useMemo(() => {
    if (!session) return [];

    return session.customSites.map((customSite) => {
      const customPlatform: Platform = {
        id: customSite.id,
        name: customSite.name,
        category: 'other',
        priority: customSite.priority === 'high' ? 'high' : customSite.priority === 'medium' ? 'medium' : 'low',
      };
      return { site: customSite, platform: customPlatform };
    });
  }, [session]);

  // Get grouped platforms with their info for compact/spreadsheet views
  // Use stable sort order that only updates when entering spreadsheet view
  const groupedPlatformsWithInfo = useMemo(() => {
    if (!session) return {};

    const groups: Record<string, Array<{ platform: Platform; progress: typeof session.platforms[0] }>> = {};
    const stableOrder = stableSortOrderRef.current;

    session.platforms.forEach((progress) => {
      const platform = getPlatform(progress.platformId);
      if (!platform) return;

      const priority = platform.priority || 'low';
      if (!groups[priority]) {
        groups[priority] = [];
      }
      groups[priority].push({ platform, progress });
    });

    // If we have a stable order, use it instead of re-sorting
    if (stableOrder) {
      Object.keys(groups).forEach(priority => {
        const order = stableOrder[priority] || [];
        groups[priority].sort((a, b) => {
          const aIndex = order.indexOf(a.platform.id);
          const bIndex = order.indexOf(b.platform.id);
          // Items not in original order go to the end
          if (aIndex === -1 && bIndex === -1) return 0;
          if (aIndex === -1) return 1;
          if (bIndex === -1) return -1;
          return aIndex - bIndex;
        });
      });
    } else {
      // Fall back to status-based sort if no stable order yet
      Object.keys(groups).forEach(priority => {
        groups[priority].sort((a, b) => {
          const aDeleted = a.progress.method === 'deleted';
          const bDeleted = b.progress.method === 'deleted';
          const aCompleted = a.progress.status === 'secured' && !aDeleted;
          const bCompleted = b.progress.status === 'secured' && !bDeleted;
          const aInProgress = a.progress.status === 'in_progress';
          const bInProgress = b.progress.status === 'in_progress';

          if (aCompleted && !bCompleted) return -1;
          if (!aCompleted && bCompleted) return 1;
          if (aDeleted && !bDeleted) return -1;
          if (!aDeleted && bDeleted) return 1;
          if (aInProgress && !bInProgress) return -1;
          if (!aInProgress && bInProgress) return 1;
          return 0;
        });
      });
    }

    return groups;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, sortKey]);


  const handleAddPlatforms = (platformIds: string[]) => {
    addPlatforms(platformIds);
  };

  const handleAddCustomPlatforms = (platformNames: string[]) => {
    addCustomPlatforms(platformNames);
  };

  if (isLoading || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <Logo size="md" showText={false} />
              <div className="text-left">
                <h1 className="font-display text-xl font-bold text-gray-900 dark:text-gray-100">
                  Social Scrub
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Dashboard
                </p>
              </div>
            </button>
            <button
              onClick={() => setShowStorageInfoModal(true)}
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 transition-all duration-200 font-medium px-3 py-1.5 rounded-lg border border-transparent hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <Save size={16} />
              <span>Auto-saved locally</span>
              <Info size={14} className="text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </header>

      {/* Progress bar - only show if user has made some progress */}
      {(() => {
        const stats = session.platforms.reduce((acc, p) => {
          if (p.status === 'secured') acc.secured++;
          else if (p.status === 'in_progress') acc.inProgress++;
          else if (p.status === 'skipped') acc.skipped++;
          return acc;
        }, { secured: 0, inProgress: 0, skipped: 0 });
        const hasProgress = stats.secured > 0 || stats.inProgress > 0 || stats.skipped > 0;

        return hasProgress ? (
          <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-6xl mx-auto px-6 py-6">
              <VisualProgressBar session={session} />
            </div>
          </div>
        ) : null;
      })()}

      {/* Continue CTA */}
      {nextPlatform && (
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <ContinueCTA nextPlatform={nextPlatform} />
          </div>
        </div>
      )}

      {/* Platforms grouped by priority */}
      <section className="flex-1 px-6 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {Object.keys(groupedPlatforms).length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                No platforms selected yet.
              </p>
              <Button onClick={() => router.push('/onboarding/select')}>
                Select Platforms
              </Button>
            </div>
          ) : (
            <>
              {/* View toggle */}
              <div className="flex items-center justify-end">
                <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                  <button
                    onClick={() => handleViewModeChange('cards')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      viewMode === 'cards'
                        ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    <LayoutGrid size={16} />
                    Cards
                  </button>
                  <button
                    onClick={() => handleViewModeChange('spreadsheet')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      viewMode === 'spreadsheet'
                        ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    <Table size={16} />
                    Spreadsheet
                  </button>
                </div>
              </div>

              {/* Spreadsheet view */}
              {viewMode === 'spreadsheet' ? (
                <SpreadsheetView
                  groupedPlatforms={groupedPlatformsWithInfo}
                  customPlatforms={customPlatformsWithInfo}
                  onPlatformClick={(platformId) => router.push(`/platform/${platformId}`)}
                  onStepComplete={(platformId, stepNumber) => completeStep(platformId, stepNumber)}
                  onStepSkip={(platformId, stepNumber) => skipStep(platformId, stepNumber)}
                  onStepClear={(platformId, stepNumber) => clearStepProgress(platformId, stepNumber)}
                  onPlatformDelete={(platformId) => deletePlatform(platformId)}
                  onPlatformComplete={(platformId) => completePlatform(platformId)}
                  onPlatformReset={(platformId) => restorePlatform(platformId)}
                  onAddPlatformsClick={() => setShowAddPlatformsModal(true)}
                />
              ) : (
                /* Card view */
                <>
              {PRIORITY_ORDER.map((priority) => {
                const platforms = groupedPlatforms[priority];
                if (!platforms || platforms.length === 0) return null;

                return (
                  <div key={priority}>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {PRIORITY_LABELS[priority]} ({platforms.length})
                      </h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                      {platforms.map((progress) => {
                        const platform = getPlatform(progress.platformId);
                        if (!platform) return null;

                        return (
                          <PlatformCard
                            key={progress.platformId}
                            platform={platform}
                            progress={progress}
                            showStatus
                            onClick={() => router.push(`/platform/${progress.platformId}`)}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* Custom platforms section */}
              {session.customSites.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      My Custom Platforms ({session.customSites.length})
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {session.customSites.map((customSite) => {
                      // Create a platform-like object for custom sites
                      const customPlatform: Platform = {
                        id: customSite.id,
                        name: customSite.name,
                        category: 'other',
                        priority: customSite.priority === 'high' ? 'high' : customSite.priority === 'medium' ? 'medium' : 'low',
                      };

                      // Use session hook to get progress (same as built-in platforms)
                      const progress = getPlatformProgress(customSite.id);

                      return (
                        <PlatformCard
                          key={customSite.id}
                          platform={customPlatform}
                          progress={progress}
                          showStatus
                          onClick={() => router.push(`/platform/${customSite.id}`)}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Add platforms button - shown in card view */}
              <div className="flex items-center justify-center pt-4">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setShowAddPlatformsModal(true)}
                >
                  + Add More Platforms
                </Button>
              </div>
                </>
              )}

            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <LocalStorageInfoModal
        isOpen={showStorageInfoModal}
        onClose={() => setShowStorageInfoModal(false)}
      />
      <AddPlatformsModal
        isOpen={showAddPlatformsModal}
        onClose={() => setShowAddPlatformsModal(false)}
        onAddPlatforms={handleAddPlatforms}
        onAddCustomPlatforms={handleAddCustomPlatforms}
        existingPlatformIds={session.platforms.map(p => p.platformId)}
      />
    </main>
  );
}
