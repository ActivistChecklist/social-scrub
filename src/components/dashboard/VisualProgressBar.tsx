'use client';

import { Session } from '@/lib/types';
import { getSessionStats } from '@/lib/storage';

interface VisualProgressBarProps {
  session: Session;
}

export default function VisualProgressBar({ session }: VisualProgressBarProps) {
  const stats = getSessionStats(session);
  const total = stats.total || 1; // Avoid division by zero

  const securedPercent = (stats.secured / total) * 100;
  const inProgressPercent = (stats.inProgress / total) * 100;
  const skippedPercent = (stats.skipped / total) * 100;
  const notStartedPercent = (stats.notStarted / total) * 100;

  return (
    <div className="w-full">
      {/* Labels with numbers */}
      <div className="flex items-center justify-between mb-3 text-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {stats.secured} Locked Down
            </span>
          </div>
          {stats.inProgress > 0 && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {stats.inProgress} In Progress
              </span>
            </div>
          )}
          {stats.skipped > 0 && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-400"></div>
              <span className="font-medium text-gray-600 dark:text-gray-400">
                {stats.skipped} Skipped
              </span>
            </div>
          )}
        </div>
        <span className="text-gray-500 dark:text-gray-400">
          {stats.notStarted} Not Started
        </span>
      </div>

      {/* Stacked bar chart */}
      <div className="w-full h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex">
        {stats.secured > 0 && (
          <div
            className="bg-emerald-500 h-full transition-all duration-500 flex items-center justify-center text-white text-xs font-semibold"
            style={{ width: `${securedPercent}%` }}
          >
            {securedPercent >= 10 && `${stats.secured}`}
          </div>
        )}
        {stats.inProgress > 0 && (
          <div
            className="bg-amber-500 h-full transition-all duration-500 flex items-center justify-center text-white text-xs font-semibold"
            style={{ width: `${inProgressPercent}%` }}
          >
            {inProgressPercent >= 10 && `${stats.inProgress}`}
          </div>
        )}
        {stats.skipped > 0 && (
          <div
            className="bg-gray-400 h-full transition-all duration-500"
            style={{ width: `${skippedPercent}%` }}
          />
        )}
        {stats.notStarted > 0 && (
          <div
            className="bg-gray-300 dark:bg-gray-600 h-full transition-all duration-500"
            style={{ width: `${notStartedPercent}%` }}
          />
        )}
      </div>
    </div>
  );
}
