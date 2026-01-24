'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/hooks/useSession';
import { getPlatform } from '@/lib/platforms';
import { TOTAL_STEPS } from '@/lib/steps';
import Button from '@/components/ui/Button';
import PlatformIcon from '@/components/PlatformIcon';
import LocalStorageInfoModal from '@/components/LocalStorageInfoModal';
import { ChevronRight, ArrowLeft, Check, LayoutDashboard, Save, Info } from 'lucide-react';

interface IncompletePageProps {
  params: { platformId: string };
}

// Mini stacked bar chart for step completion
function StepProgressBar({ completedCount, skippedCount }: { completedCount: number; skippedCount: number }) {
  const totalSteps = TOTAL_STEPS - 1; // Exclude delete step
  const completedPercent = (completedCount / totalSteps) * 100;
  const skippedPercent = (skippedCount / totalSteps) * 100;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2 text-sm">
        <span className="text-emerald-600 dark:text-emerald-400 font-medium">
          {completedCount} completed
        </span>
        <span className="text-amber-500 dark:text-amber-400">
          {skippedCount} skipped
        </span>
      </div>
      <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex">
        {completedCount > 0 && (
          <div
            className="bg-emerald-500 h-full transition-all duration-500"
            style={{ width: `${completedPercent}%` }}
          />
        )}
        {skippedCount > 0 && (
          <div
            className="bg-amber-400 h-full transition-all duration-500"
            style={{ width: `${skippedPercent}%` }}
          />
        )}
      </div>
    </div>
  );
}

export default function PlatformIncomplete({ params }: IncompletePageProps) {
  const { platformId } = params;
  const router = useRouter();
  const { session, isLoading, getPlatform: getPlatformProgress, completePlatform } = useSession();
  const [showStorageInfoModal, setShowStorageInfoModal] = useState(false);

  // Try to get built-in platform first, then check custom sites
  let platform = getPlatform(platformId);

  if (!platform && session) {
    const customSite = session.customSites.find(s => s.id === platformId);
    if (customSite) {
      platform = {
        id: customSite.id,
        name: customSite.name,
        icon: undefined,
        category: 'other' as const,
        priority: customSite.priority === 'high' ? 'high' : customSite.priority === 'medium' ? 'medium' : 'low',
      };
    }
  }

  const progress = getPlatformProgress(platformId);

  // Find the next platform to work on (including custom platforms)
  const nextPlatform = useMemo(() => {
    if (!session) return null;

    // First check built-in platforms
    const notStartedBuiltIn = session.platforms.find(
      p => p.status === 'not_started' && p.platformId !== platformId
    );
    if (notStartedBuiltIn) {
      const platformInfo = getPlatform(notStartedBuiltIn.platformId);
      return platformInfo ? { progress: notStartedBuiltIn, info: platformInfo, isCustom: false } : null;
    }

    // Then check custom platforms
    const notStartedCustom = session.customSites.find(
      s => s.status === 'not_started' && s.id !== platformId
    );
    if (notStartedCustom) {
      const customInfo = {
        id: notStartedCustom.id,
        name: notStartedCustom.name,
        icon: undefined,
        category: 'other' as const,
        priority: notStartedCustom.priority === 'high' ? 'high' : notStartedCustom.priority === 'medium' ? 'medium' : 'low',
      };
      return {
        progress: {
          platformId: notStartedCustom.id,
          status: notStartedCustom.status
        },
        info: customInfo,
        isCustom: true
      };
    }

    return null;
  }, [session, platformId]);

  useEffect(() => {
    if (!isLoading && !platform) {
      router.push('/dashboard');
    }
  }, [isLoading, platform, router]);

  // If no skipped steps, redirect to complete page
  const skippedCount = progress?.skippedSteps.filter(s => s > 1).length || 0;
  useEffect(() => {
    if (!isLoading && progress && skippedCount === 0) {
      router.replace(`/platform/${platformId}/complete`);
    }
  }, [isLoading, progress, skippedCount, platformId, router]);

  if (isLoading || !platform) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  const completedCount = progress?.completedSteps.filter(s => s > 1).length || 0;

  const handleGoBack = () => {
    // Find first skipped step and go there
    const skippedSteps = progress?.skippedSteps || [];
    if (skippedSteps.length > 0) {
      const firstSkipped = Math.min(...skippedSteps.filter(s => s > 1));
      if (firstSkipped && isFinite(firstSkipped)) {
        router.push(`/platform/${platformId}/${firstSkipped}`);
      } else {
        router.push(`/platform/${platformId}/2`);
      }
    }
  };

  const handleContinueLater = () => {
    if (nextPlatform) {
      router.push(`/platform/${nextPlatform.progress.platformId}`);
    } else {
      router.push('/dashboard');
    }
  };

  const handleMarkComplete = () => {
    completePlatform(platformId);
    if (nextPlatform) {
      router.push(`/platform/${nextPlatform.progress.platformId}`);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      {/* Header with auto-save and dashboard link */}
      <header className="p-4 flex items-center justify-between">
        <button
          onClick={() => setShowStorageInfoModal(true)}
          className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
        >
          <Save size={12} />
          <span>Auto-saved locally</span>
          <Info size={12} className="text-gray-300 dark:text-gray-600" />
        </button>
        <button
          onClick={() => router.push('/dashboard')}
          className="text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors font-medium"
        >
          Dashboard
        </button>
      </header>

      {/* Desktop: side-by-side layout */}
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="max-w-4xl w-full mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
            {/* Left side: Status info */}
            <div className="flex-1 text-center lg:text-left mb-8 lg:mb-0 animate-fade-in">
              {/* Platform icon */}
              <div className="mb-6 flex justify-center lg:justify-start">
                <PlatformIcon
                  iconName={platform.icon}
                  platformName={platform.name}
                  size={48}
                />
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                {platform.name} Almost Done
              </h1>

              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto lg:mx-0">
                You skipped {skippedCount} step{skippedCount !== 1 ? 's' : ''}. You can come back to finish them later, or mark this platform as complete.
              </p>

              {/* Progress bar */}
              <div className="max-w-sm mx-auto lg:mx-0 mb-6">
                <StepProgressBar completedCount={completedCount} skippedCount={skippedCount} />
              </div>
            </div>

            {/* Right side: Actions */}
            <div className="lg:w-96 space-y-3">
              {/* Option 1 (Default): Continue to next platform, come back later */}
              <Button
                size="lg"
                onClick={handleContinueLater}
                className="w-full flex flex-col items-center justify-center gap-0.5 py-4"
              >
                <span className="flex items-center gap-2">
                  {nextPlatform ? (
                    <>
                      <PlatformIcon
                        iconName={nextPlatform.info.icon}
                        platformName={nextPlatform.info.name}
                        size={18}
                        variant="light"
                      />
                      Continue to {nextPlatform.info.name}
                    </>
                  ) : (
                    <>
                      <LayoutDashboard size={18} />
                      Go to Dashboard
                    </>
                  )}
                  <ChevronRight size={18} />
                </span>
                <span className="text-xs opacity-80">
                  I&apos;ll come back to these {skippedCount} step{skippedCount !== 1 ? 's' : ''} later
                </span>
              </Button>

              {/* Option 2: Mark as finished anyway */}
              <Button
                size="lg"
                variant="outline"
                onClick={handleMarkComplete}
                className="w-full flex flex-col items-center justify-center gap-0.5 py-3"
              >
                <span className="flex items-center gap-2">
                  <Check size={18} />
                  Mark {platform.name} as done
                </span>
                <span className="text-xs opacity-70">
                  (even with {skippedCount} step{skippedCount !== 1 ? 's' : ''} incomplete)
                </span>
              </Button>

              {/* Option 3: Go back to skipped steps */}
              <Button
                size="lg"
                variant="ghost"
                onClick={handleGoBack}
                className="w-full flex items-center justify-center gap-2"
              >
                <ArrowLeft size={18} />
                Go back to skipped steps
              </Button>

              {/* Info note */}
              <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                <p className="text-sm text-amber-700 dark:text-amber-300 text-center lg:text-left">
                  Skipped steps can still leave your information visible. Consider completing them when you have time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Local storage info modal */}
      <LocalStorageInfoModal
        isOpen={showStorageInfoModal}
        onClose={() => setShowStorageInfoModal(false)}
      />
    </main>
  );
}
