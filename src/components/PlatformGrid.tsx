'use client';

import { Platform, PlatformProgress } from '@/lib/types';
import { PLATFORMS, PRIORITY_LABELS, CATEGORY_LABELS, getPlatformsByPriority, getPlatformsByCategory } from '@/lib/platforms';
import PlatformCard from './PlatformCard';

interface PlatformGridProps {
  selectedPlatforms: Set<string>;
  onTogglePlatform: (platformId: string) => void;
  platformProgress?: Map<string, PlatformProgress>;
  showStatus?: boolean;
  groupBy?: 'priority' | 'category' | 'none';
}

export default function PlatformGrid({
  selectedPlatforms,
  onTogglePlatform,
  platformProgress,
  showStatus = false,
  groupBy = 'priority',
}: PlatformGridProps) {
  if (groupBy === 'none') {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {PLATFORMS.map((platform) => (
          <PlatformCard
            key={platform.id}
            platform={platform}
            selected={selectedPlatforms.has(platform.id)}
            progress={platformProgress?.get(platform.id)}
            onClick={() => onTogglePlatform(platform.id)}
            showStatus={showStatus}
          />
        ))}
      </div>
    );
  }

  if (groupBy === 'priority') {
    const priorities: Platform['priority'][] = ['highest', 'high', 'medium', 'low'];

    return (
      <div className="space-y-8">
        {priorities.map((priority) => {
          const platforms = getPlatformsByPriority(priority);
          if (platforms.length === 0) return null;

          const { emoji, label } = PRIORITY_LABELS[priority];

          return (
            <div key={priority}>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                <span>{emoji}</span>
                <span>{label}</span>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  ({platforms.length} platforms)
                </span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {platforms.map((platform) => (
                  <PlatformCard
                    key={platform.id}
                    platform={platform}
                    selected={selectedPlatforms.has(platform.id)}
                    progress={platformProgress?.get(platform.id)}
                    onClick={() => onTogglePlatform(platform.id)}
                    showStatus={showStatus}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Group by category
  const categories: Platform['category'][] = [
    'social', 'professional', 'messaging', 'photo_video', 'forum',
    'dating', 'gaming', 'shopping', 'finance', 'other'
  ];

  return (
    <div className="space-y-8">
      {categories.map((category) => {
        const platforms = getPlatformsByCategory(category);
        if (platforms.length === 0) return null;

        return (
          <div key={category}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
              {CATEGORY_LABELS[category]}
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
                ({platforms.length})
              </span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {platforms.map((platform) => (
                <PlatformCard
                  key={platform.id}
                  platform={platform}
                  selected={selectedPlatforms.has(platform.id)}
                  progress={platformProgress?.get(platform.id)}
                  onClick={() => onTogglePlatform(platform.id)}
                  showStatus={showStatus}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
