'use client';

import { UserX } from 'lucide-react';
import Image from 'next/image';

export interface ProfileData {
  hasPhoto: boolean;
  name: string;
  username: string;
  bio: string;
  email?: string;
  postsCount?: string;
  friendsCount?: string;
}

// Default before/after data for consistency across all pages
export const BEFORE_PROFILE: ProfileData = {
  hasPhoto: true,
  name: 'Luke Skywalker',
  username: '@lukeskywalker',
  bio: 'Tatooine native | Rebel Alliance',
  email: 'luke@gmail.com',
  postsCount: '847',
  friendsCount: '1.2K',
};

export const AFTER_PROFILE: ProfileData = {
  hasPhoto: false,
  name: 'John Doe',
  username: '@happy-dolphin-742',
  bio: '', // Empty bio - will be shown as "[Bio Removed]"
  email: 'luke+instagram@gmail.com', // Platform-specific alias
  postsCount: '12', // Fewer posts, not zero
  friendsCount: 'hidden',
};

export type ProfileField = 'photo' | 'name' | 'username' | 'email' | 'bio';

interface FakeSocialProfileProps {
  type: 'before' | 'after';
  showEmail?: boolean;
  showStats?: boolean;
  showCover?: boolean;
  showBio?: boolean;
  size?: 'compact' | 'full';
  className?: string;
  /** Field to highlight (dims other fields) */
  highlightField?: ProfileField;
}

export default function FakeSocialProfile({
  type,
  showEmail = false,
  showStats = false,
  showCover = true,
  showBio = true,
  size = 'full',
  className = '',
  highlightField,
}: FakeSocialProfileProps) {
  const isBefore = type === 'before';
  const data = isBefore ? BEFORE_PROFILE : AFTER_PROFILE;

  const profileSize = size === 'compact' ? 'w-12 h-12' : 'w-16 h-16';
  const coverHeight = size === 'compact' ? 'h-10' : 'h-16';
  const profileOffset = size === 'compact' ? '-mt-6' : '-mt-10';

  // Helper for highlighting specific fields
  const getFieldClass = (field: ProfileField, includeTextColor = false) => {
    if (!highlightField) return ''; // No highlighting mode
    if (field === highlightField) {
      // Highlighted field gets a ring and colored text
      const textColor = includeTextColor
        ? (isBefore ? 'text-red-700 dark:text-red-300' : 'text-emerald-700 dark:text-emerald-300')
        : '';
      return isBefore
        ? `ring-2 ring-red-400 dark:ring-red-500 rounded ${textColor}`
        : `ring-2 ring-emerald-400 dark:ring-emerald-500 rounded ${textColor}`;
    }
    // Non-highlighted fields are dimmed
    return 'opacity-30';
  };

  return (
    <div className={`bg-white dark:bg-gray-900 rounded-lg overflow-hidden ${className}`}>
      {/* Cover photo - subtle gradient, not too bright */}
      {showCover && (
        <div className={`${coverHeight} bg-gradient-to-r from-slate-300 to-blue-300 dark:from-slate-600 dark:to-blue-600`} />
      )}

      {/* Profile content */}
      <div className={`p-4 ${showCover ? '' : 'pt-4'}`}>
        <div className={`flex items-start gap-3 ${showCover ? profileOffset : ''}`}>
          {/* Profile picture */}
          <div
            className={`${profileSize} rounded-full overflow-hidden flex-shrink-0 ${
              showCover ? 'border-4 border-white dark:border-gray-900' : ''
            } ${!data.hasPhoto ? 'bg-gray-300 dark:bg-gray-600' : ''} ${getFieldClass('photo')}`}
          >
            {data.hasPhoto ? (
              <Image
                src="/luke.jpg"
                alt="Profile"
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-emerald-100 dark:bg-emerald-800">
                <UserX className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />
              </div>
            )}
          </div>

          {/* Name and username - LEFT ALIGNED */}
          <div className={`flex-1 min-w-0 ${showCover ? 'pt-6' : ''}`}>
            <h4 className={`font-bold truncate text-left ${highlightField === 'name' ? getFieldClass('name', true) + ' px-1 inline-block' : (highlightField ? getFieldClass('name') : 'text-gray-900 dark:text-gray-100')}`}>
              {data.name}
            </h4>
            <p className={`text-sm truncate text-left ${highlightField === 'username' ? getFieldClass('username', true) + ' px-1 inline-block' : (highlightField ? getFieldClass('username') : 'text-gray-500 dark:text-gray-400')}`}>
              {data.username}
            </p>
            {/* Email shown inline when highlighting email */}
            {highlightField === 'email' && data.email && (
              <p className={`text-sm mt-0.5 text-left ${getFieldClass('email', true)} px-1 inline-block`}>
                {data.email}
              </p>
            )}
          </div>
        </div>

        {/* Bio - fixed height to prevent layout shift between before/after */}
        {showBio && (
          <p className={`mt-3 text-sm text-left min-h-[1.25rem] ${
            highlightField === 'bio'
              ? getFieldClass('bio', true) + ' px-1 inline-block'
              : highlightField
                ? getFieldClass('bio')
                : (data.bio ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500 italic')
          }`}>
            {data.bio || '[Bio Removed]'}
          </p>
        )}

        {/* Stats row */}
        {showStats && (
          <div className="mt-3 flex gap-4 text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              <strong className="text-gray-900 dark:text-gray-100">{data.postsCount}</strong> posts
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              <strong className="text-gray-900 dark:text-gray-100">{data.friendsCount}</strong> friends
            </span>
          </div>
        )}

        {/* Email */}
        {showEmail && data.email && (
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-left">
              {data.email}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
