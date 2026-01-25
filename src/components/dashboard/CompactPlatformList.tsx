'use client';

import { Platform, PlatformProgress } from '@/lib/types';
import PlatformIcon from '@/components/PlatformIcon';
import { Check, Clock, SkipForward, Circle, Trash2 } from 'lucide-react';

type PriorityLevel = 'highest' | 'high' | 'medium' | 'low';

const PRIORITY_LABELS: Record<PriorityLevel, string> = {
  highest: 'Highest Priority',
  high: 'High Priority',
  medium: 'Medium Priority',
  low: 'Low Priority',
};

const PRIORITY_ORDER: PriorityLevel[] = ['highest', 'high', 'medium', 'low'];

interface CompactPlatformListProps {
  groupedPlatforms: Record<string, Array<{
    platform: Platform;
    progress: PlatformProgress;
  }>>;
  customPlatforms: Array<{
    platform: Platform;
    progress: PlatformProgress;
  }>;
  onPlatformClick: (platformId: string) => void;
}

function getStatusIcon(status: PlatformProgress['status'], isDeleted: boolean) {
  if (isDeleted) {
    return <Trash2 size={16} className="text-red-500" />;
  }
  switch (status) {
    case 'secured':
      return <Check size={16} className="text-emerald-500" />;
    case 'in_progress':
      return <Clock size={16} className="text-blue-500" />;
    case 'skipped':
      return <SkipForward size={16} className="text-amber-500" />;
    default:
      return <Circle size={16} className="text-gray-300 dark:text-gray-600" />;
  }
}

function getStatusText(status: PlatformProgress['status'], isDeleted: boolean) {
  if (isDeleted) {
    return 'Deleted';
  }
  switch (status) {
    case 'secured':
      return 'Locked down';
    case 'in_progress':
      return 'In progress';
    case 'skipped':
      return 'Skipped';
    default:
      return 'Not started';
  }
}

function getStatusColor(status: PlatformProgress['status'], isDeleted: boolean) {
  if (isDeleted) {
    return 'text-red-600 dark:text-red-400';
  }
  switch (status) {
    case 'secured':
      return 'text-emerald-600 dark:text-emerald-400';
    case 'in_progress':
      return 'text-blue-600 dark:text-blue-400';
    case 'skipped':
      return 'text-amber-600 dark:text-amber-400';
    default:
      return 'text-gray-500 dark:text-gray-400';
  }
}

function PlatformRow({
  platform,
  progress,
  onPlatformClick,
}: {
  platform: Platform;
  progress: PlatformProgress;
  onPlatformClick: (platformId: string) => void;
}) {
  const isDeleted = progress.method === 'deleted';
  const isCompleted = progress.status === 'secured' && !isDeleted;
  const totalSteps = 8; // Non-delete steps
  const completedSteps = progress.completedSteps.filter(s => s > 1).length;
  const skippedSteps = progress.skippedSteps.filter(s => s > 1).length;
  const progressPercent = Math.round(((completedSteps + skippedSteps) / totalSteps) * 100);

  const getRowClass = () => {
    if (isDeleted) return 'bg-red-50/50 dark:bg-red-900/10';
    if (isCompleted) return 'bg-emerald-50/50 dark:bg-emerald-900/10';
    return '';
  };

  return (
    <tr
      onClick={() => onPlatformClick(platform.id)}
      className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors ${getRowClass()}`}
    >
      <td className="px-4 py-3">
        <div className={`flex items-center gap-3 ${isDeleted ? 'opacity-60' : ''}`}>
          <PlatformIcon
            iconName={platform.icon}
            platformName={platform.name}
            size={24}
          />
          <span className={`font-medium text-gray-900 dark:text-gray-100 ${isDeleted ? 'line-through' : ''}`}>
            {platform.name}
          </span>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          {getStatusIcon(progress.status, isDeleted)}
          <span className={`text-sm ${getStatusColor(progress.status, isDeleted)}`}>
            {getStatusText(progress.status, isDeleted)}
          </span>
        </div>
      </td>
      <td className="px-4 py-3 hidden sm:table-cell">
        {isDeleted ? (
          <span className="text-sm font-medium text-red-600 dark:text-red-400">
            Deleted!
          </span>
        ) : isCompleted ? (
          <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
            Completed!
          </span>
        ) : (
          <div className="flex items-center gap-3">
            <div className="flex-1 max-w-24 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all ${
                  progress.status === 'in_progress'
                    ? 'bg-blue-500'
                    : 'bg-gray-300 dark:bg-gray-500'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400 w-10">
              {progressPercent}%
            </span>
          </div>
        )}
      </td>
    </tr>
  );
}

// Custom platforms section component
function CustomPlatformsSection({
  customPlatforms,
  onPlatformClick,
}: {
  customPlatforms: Array<{ platform: Platform; progress: PlatformProgress }>;
  onPlatformClick: (platformId: string) => void;
}) {
  if (customPlatforms.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Custom header */}
      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          My Custom Platforms ({customPlatforms.length})
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-700">
              <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Platform
              </th>
              <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Status
              </th>
              <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide hidden sm:table-cell">
                Progress
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {customPlatforms.map(({ platform, progress }) => (
              <PlatformRow
                key={platform.id}
                platform={platform}
                progress={progress}
                onPlatformClick={onPlatformClick}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function CompactPlatformList({ groupedPlatforms, customPlatforms, onPlatformClick }: CompactPlatformListProps) {
  return (
    <div className="space-y-6">
      {PRIORITY_ORDER.map((priority) => {
        const platforms = groupedPlatforms[priority];
        const hasPlatforms = platforms && platforms.length > 0;

        return (
          <div key={priority}>
            {/* Render custom platforms after high priority (before medium) */}
            {priority === 'medium' && customPlatforms.length > 0 && (
              <div className="mb-6">
                <CustomPlatformsSection
                  customPlatforms={customPlatforms}
                  onPlatformClick={onPlatformClick}
                />
              </div>
            )}

            {hasPlatforms && (
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Priority header */}
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {PRIORITY_LABELS[priority]} ({platforms.length})
                  </h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-gray-700">
                        <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                          Platform
                        </th>
                        <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                          Status
                        </th>
                        <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide hidden sm:table-cell">
                          Progress
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                      {platforms.map(({ platform, progress }) => (
                        <PlatformRow
                          key={platform.id}
                          platform={platform}
                          progress={progress}
                          onPlatformClick={onPlatformClick}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
