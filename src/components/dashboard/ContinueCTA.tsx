'use client';

import { useRouter } from 'next/navigation';
import { PlatformProgress } from '@/lib/types';
import { getPlatform } from '@/lib/platforms';
import PlatformIcon from '@/components/PlatformIcon';
import { ChevronRight } from 'lucide-react';

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
      className="w-full md:w-auto group text-left"
    >
      {/* Bright, attention-grabbing card */}
      <div className="bg-emerald-600 dark:bg-emerald-700 rounded-2xl p-5 hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-200 dark:shadow-emerald-900/50 md:pr-8">
        <div className="flex items-center gap-4">
          {/* Platform icon in white container */}
          <div className="flex-shrink-0 bg-white rounded-xl p-3">
            <PlatformIcon
              iconName={platform.icon}
              logoUrl={platform.logoUrl}
              platformName={platform.name}
              size={36}
            />
          </div>

          {/* Content - left aligned */}
          <div className="flex-1 min-w-0 text-left">
            <p className="text-emerald-100 text-sm mb-0.5">
              {isInProgress ? 'Continue where you left off' : 'Up next'}
            </p>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white truncate">
                {platform.name}
              </h3>
              {isInProgress && (
                <span className="text-emerald-200 text-sm whitespace-nowrap">
                  · Step {nextPlatform.currentStep}/9
                </span>
              )}
            </div>
          </div>

          {/* Compact arrow button */}
          <div className="flex-shrink-0 bg-white/20 rounded-full p-2 group-hover:bg-white/30 transition-colors">
            <ChevronRight className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </button>
  );
}
