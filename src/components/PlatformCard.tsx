'use client';

import { Platform, PlatformProgress } from '@/lib/types';
import PlatformIcon from './PlatformIcon';
import { calculatePlatformProgress } from '@/lib/storage';

interface PlatformCardProps {
  platform: Platform;
  selected?: boolean;
  progress?: PlatformProgress;
  onClick?: () => void;
  showStatus?: boolean;
}

export default function PlatformCard({
  platform,
  selected = false,
  progress,
  onClick,
  showStatus = false,
}: PlatformCardProps) {
  const isDeleted = progress?.method === 'deleted';

  const statusColors = {
    not_started: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
    in_progress: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    secured: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    skipped: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-500',
    deleted: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };

  const statusLabels = {
    not_started: 'Not started',
    in_progress: 'In progress',
    secured: 'Locked down',
    skipped: 'Skipped',
    deleted: 'Deleted',
  };

  const progressPercent = progress ? calculatePlatformProgress(progress) : 0;

  // Determine card styling based on status
  const isSecured = progress?.status === 'secured' && !isDeleted;
  const isSkipped = progress?.status === 'skipped';

  let cardStyles = 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800';

  if (selected) {
    cardStyles = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20';
  } else if (isDeleted) {
    cardStyles = 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 hover:border-red-300 dark:hover:border-red-700 opacity-70 hover:opacity-90';
  } else if (isSecured) {
    cardStyles = 'border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-900/20 hover:border-emerald-400 dark:hover:border-emerald-600';
  } else if (isSkipped) {
    cardStyles = 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 opacity-60 hover:opacity-80';
  }

  return (
    <button
      onClick={onClick}
      className={`
        relative flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-200
        text-left w-full
        ${cardStyles}
        ${onClick ? 'cursor-pointer hover:shadow-md' : 'cursor-default'}
      `}
    >
      <PlatformIcon
        iconName={platform.icon}
        platformName={platform.name}
        size={32}
      />

      <div className="flex-1 min-w-0">
        <div className={`font-medium truncate ${
          isSkipped
            ? 'text-gray-500 dark:text-gray-500'
            : 'text-gray-900 dark:text-gray-100'
        }`}>
          {platform.name}
        </div>

        {showStatus && progress && (
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              isDeleted ? statusColors.deleted : statusColors[progress.status]
            }`}>
              {isDeleted ? statusLabels.deleted : statusLabels[progress.status]}
            </span>
            {progress.status === 'in_progress' && !isDeleted && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {progressPercent}%
              </span>
            )}
          </div>
        )}
      </div>

      {selected && (
        <div className="flex-shrink-0">
          <svg
            className="w-6 h-6 text-emerald-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
    </button>
  );
}
