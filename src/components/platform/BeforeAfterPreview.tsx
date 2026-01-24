'use client';

import { ArrowRight, ArrowDown } from 'lucide-react';
import FakeSocialProfile from '@/components/shared/FakeSocialProfile';

// Wrapper card component with header and footer
function ProfileCard({ type }: { type: 'before' | 'after' }) {
  const isBefore = type === 'before';

  return (
    <div
      className={`rounded-xl border-2 overflow-hidden h-full flex flex-col ${
        isBefore
          ? 'border-red-300 dark:border-red-700'
          : 'border-emerald-300 dark:border-emerald-700'
      }`}
    >
      {/* Header label */}
      <div
        className={`px-4 py-2 text-sm font-semibold flex items-center gap-2 ${
          isBefore
            ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
            : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200'
        }`}
      >
        <span className={`w-2 h-2 rounded-full ${isBefore ? 'bg-red-500' : 'bg-emerald-500'}`} />
        {isBefore ? 'Before: Vulnerable' : 'After: Protected'}
      </div>

      {/* Profile card using shared component */}
      <div className="flex-1">
        <FakeSocialProfile
          type={type}
          showEmail
          showStats
          showCover
          size="full"
        />
      </div>

      {/* Footer message */}
      <div
        className={`px-4 py-2 text-xs text-center ${
          isBefore
            ? 'bg-red-50 dark:bg-red-900/10 text-red-700 dark:text-red-300'
            : 'bg-emerald-50 dark:bg-emerald-900/10 text-emerald-700 dark:text-emerald-300'
        }`}
      >
        {isBefore
          ? 'Strangers can easily find and identify you'
          : 'Your identity is protected from strangers'}
      </div>
    </div>
  );
}

export default function BeforeAfterPreview() {
  return (
    <div className="flex flex-col md:flex-row items-stretch gap-4">
      {/* Before card */}
      <div className="w-full md:flex-1">
        <ProfileCard type="before" />
      </div>

      {/* Arrow - horizontal on desktop, vertical on mobile */}
      <div className="flex-shrink-0 flex items-center justify-center">
        <ArrowDown className="md:hidden w-8 h-8 text-gray-400 dark:text-gray-500" />
        <ArrowRight className="hidden md:block w-8 h-8 text-gray-400 dark:text-gray-500" />
      </div>

      {/* After card */}
      <div className="w-full md:flex-1">
        <ProfileCard type="after" />
      </div>
    </div>
  );
}
