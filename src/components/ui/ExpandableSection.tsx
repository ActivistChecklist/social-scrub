'use client';

import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface ExpandableSectionProps {
  title: string;
  icon: LucideIcon;
  iconColor?: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export default function ExpandableSection({
  title,
  icon: Icon,
  iconColor = 'text-gray-500',
  children,
}: ExpandableSectionProps) {
  return (
    <div className="max-w-2xl mx-auto border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      {/* Header - no longer collapsible */}
      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 flex items-center text-left">
        <span className="font-medium text-gray-900 dark:text-gray-100 text-base flex items-center gap-2">
          <Icon size={20} className={iconColor} />
          {title}
        </span>
      </div>
      {/* Content - always visible */}
      <div className="px-4 py-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        {children}
      </div>
    </div>
  );
}
