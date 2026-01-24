'use client';

import { useRouter } from 'next/navigation';
import { PlatformProgress } from '@/lib/types';
import { getPlatform } from '@/lib/platforms';
import PlatformIcon from '@/components/PlatformIcon';

interface ContinueCTAProps {
  nextPlatform: PlatformProgress;
}

export default function ContinueCTA({ nextPlatform }: ContinueCTAProps) {
  const router = useRouter();
  const platform = getPlatform(nextPlatform.platformId);

  if (!platform) return null;

  const isInProgress = nextPlatform.status === 'in_progress';

  return (
    <button
      onClick={() => router.push(`/platform/${nextPlatform.platformId}`)}
      className="w-full group"
    >
      <div className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 border-2 border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 hover:shadow-lg transition-all group-hover:scale-[1.02]">
        <div className="flex items-center gap-4">
          {/* Platform icon */}
          <div className="flex-shrink-0 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <PlatformIcon
              iconName={platform.icon}
              platformName={platform.name}
              size={48}
            />
          </div>

          {/* Content */}
          <div className="flex-1 text-left">
            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400 mb-1">
              {isInProgress ? 'Continue where you left off' : 'Ready to secure your next platform?'}
            </p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
              {platform.name}
            </h3>
            {isInProgress && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Step {nextPlatform.currentStep} of 9
              </p>
            )}
          </div>

          {/* Arrow */}
          <div className="flex-shrink-0 text-3xl text-emerald-600 dark:text-emerald-400 transform group-hover:translate-x-1 transition-transform">
            →
          </div>
        </div>
      </div>
    </button>
  );
}
