'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/hooks/useSession';
import { getPlatform } from '@/lib/platforms';
import Button from '@/components/ui/Button';
import PlatformIcon from '@/components/PlatformIcon';
import Celebration from '@/components/Celebration';
import LocalStorageInfoModal from '@/components/LocalStorageInfoModal';
import { ChevronRight, LayoutDashboard, Save, Info } from 'lucide-react';

interface CompletePageProps {
  params: { platformId: string };
}

export default function PlatformComplete({ params }: CompletePageProps) {
  const { platformId } = params;
  const router = useRouter();
  const { session, isLoading, getPlatform: getPlatformProgress } = useSession();
  const [showCelebration, setShowCelebration] = useState(false);
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

  // Trigger celebration on mount
  useEffect(() => {
    const timer = setTimeout(() => setShowCelebration(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading && !platform) {
      router.push('/dashboard');
    }
  }, [isLoading, platform, router]);

  // If there are skipped steps and not deleted, redirect to incomplete page
  const wasDeleted = progress?.method === 'deleted';
  const skippedCount = progress?.skippedSteps.filter(s => s > 1).length || 0;
  useEffect(() => {
    if (!isLoading && progress && !wasDeleted && skippedCount > 0) {
      router.replace(`/platform/${platformId}/incomplete`);
    }
  }, [isLoading, progress, wasDeleted, skippedCount, platformId, router]);

  if (isLoading || !platform) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  const allPlatformsSecured = session &&
    session.platforms.filter(p => p.status === 'secured').length === session.platforms.length &&
    session.customSites.filter(s => s.status === 'secured').length === session.customSites.length;

  return (
    <main className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Celebration show={showCelebration} onComplete={() => setShowCelebration(false)} />

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
            {/* Left side: Success info */}
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
                {wasDeleted
                  ? `${platform.name} Deleted!`
                  : `${platform.name} Locked Down!`}
              </h1>

              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto lg:mx-0">
                {wasDeleted
                  ? `You've removed your ${platform.name} account. This is the most effective way to protect your privacy.`
                  : `Great work! You've completed all privacy steps for ${platform.name}.`}
              </p>
            </div>

            {/* Right side: Actions */}
            <div className="lg:w-96 space-y-3">
              {nextPlatform && (
                <Button
                  size="lg"
                  onClick={() => router.push(`/platform/${nextPlatform.progress.platformId}`)}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <PlatformIcon
                    iconName={nextPlatform.info.icon}
                    platformName={nextPlatform.info.name}
                    size={20}
                    variant="light"
                  />
                  Continue to {nextPlatform.info.name}
                  <ChevronRight size={18} />
                </Button>
              )}

              <Button
                size="lg"
                variant={nextPlatform ? 'outline' : 'primary'}
                onClick={() => router.push('/dashboard')}
                className="w-full flex items-center justify-center gap-2"
              >
                <LayoutDashboard size={18} />
                Go to Dashboard
              </Button>

              {/* Encouragement */}
              <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                <p className="text-sm text-emerald-700 dark:text-emerald-300 text-center lg:text-left">
                  {allPlatformsSecured
                    ? "You've locked down all your platforms! Your digital footprint is now much harder to track."
                    : `Keep going! Every platform you lock down makes it harder for strangers to find your information.`}
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
