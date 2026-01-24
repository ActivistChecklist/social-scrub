'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/hooks/useSession';
import { getPlatform } from '@/lib/platforms';
import Button from '@/components/ui/Button';
import PlatformIcon from '@/components/PlatformIcon';
import BeforeAfterPreview from '@/components/platform/BeforeAfterPreview';
import { PartyPopper, RotateCcw, ExternalLink } from 'lucide-react';

interface PlatformPageProps {
  params: { platformId: string };
}

export default function PlatformIntro({ params }: PlatformPageProps) {
  const { platformId } = params;
  const router = useRouter();
  const { session, isLoading, getPlatform: getPlatformProgress, startPlatform, restorePlatform } = useSession();

  // Try to get built-in platform first, then check custom sites
  let platform = getPlatform(platformId);
  let isCustomPlatform = false;

  if (!platform && session) {
    const customSite = session.customSites.find(s => s.id === platformId);
    if (customSite) {
      // Create a platform-like object from custom site
      platform = {
        id: customSite.id,
        name: customSite.name,
        icon: undefined,
        category: 'other' as const,
        priority: customSite.priority === 'high' ? 'high' : customSite.priority === 'medium' ? 'medium' : 'low',
      };
      isCustomPlatform = true;
    }
  }

  const progress = getPlatformProgress(platformId);

  // Find the next platform to work on (excluding current platform)
  const nextPlatform = useMemo(() => {
    if (!session) return null;

    // First check built-in platforms that haven't been started
    const notStartedBuiltIn = session.platforms.find(
      p => p.status === 'not_started' && p.platformId !== platformId
    );
    if (notStartedBuiltIn) {
      const platformInfo = getPlatform(notStartedBuiltIn.platformId);
      return platformInfo ? { platformId: notStartedBuiltIn.platformId, name: platformInfo.name } : null;
    }

    // Then check custom platforms
    const notStartedCustom = session.customSites.find(
      s => s.status === 'not_started' && s.id !== platformId
    );
    if (notStartedCustom) {
      return { platformId: notStartedCustom.id, name: notStartedCustom.name };
    }

    return null;
  }, [session, platformId]);

  useEffect(() => {
    // Redirect if platform doesn't exist
    if (!isLoading && !platform) {
      router.push('/dashboard');
    }
  }, [isLoading, platform, router]);

  if (isLoading || !platform) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  // Check if platform was deleted
  const isDeleted = progress?.method === 'deleted';

  // If in progress, go to current step (but not for deleted platforms)
  if (progress && progress.status === 'in_progress' && !isDeleted) {
    router.push(`/platform/${platformId}/${progress.currentStep}`);
    return null;
  }

  // If secured but NOT deleted, go to current step
  if (progress && progress.status === 'secured' && !isDeleted) {
    router.push(`/platform/${platformId}/${progress.currentStep}`);
    return null;
  }

  const handleStart = () => {
    startPlatform(platformId);
    router.push(`/platform/${platformId}/1`);
  };

  const handleSkip = () => {
    // Just navigate to next platform or dashboard - don't mark as skipped
    if (nextPlatform) {
      router.push(`/platform/${nextPlatform.platformId}`);
    } else {
      router.push('/dashboard');
    }
  };

  const handleRestore = () => {
    restorePlatform(platformId);
    // After restore, start the platform fresh
    startPlatform(platformId);
    router.push(`/platform/${platformId}/1`);
  };

  // Show special screen for deleted platforms
  if (isDeleted) {
    return (
      <main className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
        {/* Header */}
        <header className="p-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <button
              onClick={() => router.push('/dashboard')}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors flex items-center gap-2"
            >
              ← Back to dashboard
            </button>
          </div>
        </header>

        {/* Content */}
        <section className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="max-w-md mx-auto text-center animate-fade-in">
            {/* Success icon */}
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto mb-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                <PartyPopper size={48} className="text-emerald-600 dark:text-emerald-400" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                {platform.name} Was Deleted
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                You marked this account as deleted. Nice work!
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                size="lg"
                variant="outline"
                onClick={() => router.push('/dashboard')}
                className="w-full"
              >
                Back to Dashboard
              </Button>

              <button
                onClick={handleRestore}
                className="w-full flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 py-2 transition-colors"
              >
                <RotateCcw size={16} />
                Actually, I want to restore this
              </button>
            </div>

            {/* Note */}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-8">
              Changed your mind? You can restore this platform and start fresh.
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="p-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            onClick={() => router.push('/dashboard')}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors flex items-center gap-2"
          >
            ← Back to dashboard
          </button>
        </div>
      </header>

      {/* Content */}
      <section className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-2xl mx-auto text-center animate-fade-in">
          {/* Platform icon and name */}
          <div className="mb-8">
            {isCustomPlatform ? (
              <div className="w-20 h-20 mx-auto mb-4 bg-gray-200 dark:bg-gray-700 rounded-2xl flex items-center justify-center text-4xl">
                📱
              </div>
            ) : (
              <PlatformIcon
                iconName={platform.icon}
                platformName={platform.name}
                size={80}
                className="mx-auto mb-4"
              />
            )}
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              Lock Down {platform.name}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-3">
              Lock down your privacy in just a few steps
            </p>
            {platform.url && (
              <a
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                Open {platform.name}
                <ExternalLink size={14} />
              </a>
            )}
          </div>

          {/* Why this platform is important */}
          {platform.importanceReason && (
            <div className="mb-8 max-w-xl mx-auto">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-left">
                <p className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-2">
                  Why this matters:
                </p>
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  {platform.importanceReason}
                </p>
              </div>
            </div>
          )}

          {/* Before/After Preview */}
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wide">
              What We&apos;ll Transform
            </h2>
            <BeforeAfterPreview />
          </div>

          {/* Action buttons */}
          <div className="space-y-3 mb-6">
            <Button
              size="lg"
              onClick={handleStart}
              className="w-full text-lg py-6"
            >
              Let&apos;s Go →
            </Button>

            <Button
              size="lg"
              variant="ghost"
              onClick={handleSkip}
              className="w-full"
            >
              Skip This Platform
            </Button>
          </div>

          {/* Privacy note */}
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Your progress is saved automatically. You can come back anytime.
          </p>
        </div>
      </section>
    </main>
  );
}
