'use client';

import { ArrowRight, ArrowDown, X, Lock, MapPin, Users, Eye, EyeOff, Globe, UserX, Heart, MessageCircle, Share2 } from 'lucide-react';
import Image from 'next/image';
import { BEFORE_PROFILE, AFTER_PROFILE } from '@/components/shared/FakeSocialProfile';

type StepFocus = 'photo' | 'name' | 'username' | 'email' | 'bio' | 'posts' | 'friends' | 'privacy' | 'delete';

interface BeforeAfterBoxProps {
  type: 'before' | 'after';
  title: string;
  description: string;
  icon: string;
  stepFocus?: StepFocus;
}

// Realistic social media post component
function SocialPost({
  type,
  variant
}: {
  type: 'before' | 'after';
  variant: 'photo' | 'text'
}) {
  const isBefore = type === 'before';
  const isDeleted = !isBefore;

  if (variant === 'photo') {
    return (
      <div className={`relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 ${isDeleted ? 'opacity-50' : ''}`}>
        {/* Post header - looks like a real social post */}
        <div className="flex items-center gap-2 p-3 border-b border-gray-100 dark:border-gray-700">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <Image
              src="/luke.jpg"
              alt="Luke's profile"
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Luke Skywalker</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Tagged at Mos Eisley Cantina</p>
          </div>
        </div>

        {/* Photo placeholder with location tag - looks like a real photo */}
        <div className="h-32 relative overflow-hidden">
          {/* Fake landscape photo background */}
          <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-sky-400 to-emerald-400 dark:from-sky-800 dark:via-sky-900 dark:to-emerald-900">
            {/* Sun */}
            <div className="absolute top-4 right-6 w-8 h-8 rounded-full bg-yellow-300 dark:bg-yellow-500 opacity-80" />
            {/* Hills */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-emerald-500 dark:bg-emerald-800 rounded-t-full transform translate-y-4" />
            <div className="absolute bottom-0 left-8 right-0 h-10 bg-emerald-600 dark:bg-emerald-900 rounded-t-full transform translate-y-2" />
          </div>
          {/* Location tag overlay */}
          <div className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs font-medium">
            <MapPin size={12} />
            Mos Eisley Cantina
          </div>
        </div>

        {/* Post footer with engagement */}
        <div className="p-3 flex items-center gap-4 text-gray-500 dark:text-gray-400">
          <Heart size={18} />
          <MessageCircle size={18} />
          <Share2 size={18} />
        </div>

        {/* Deleted overlay */}
        {isDeleted && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <div className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium text-sm shadow-lg">
              <X size={16} />
              Removed
            </div>
          </div>
        )}
      </div>
    );
  }

  // Text post variant
  return (
    <div className={`relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 ${isDeleted ? 'opacity-50' : ''}`}>
      {/* Post header */}
      <div className="flex items-center gap-2 p-3 border-b border-gray-100 dark:border-gray-700">
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <Image
            src="/luke.jpg"
            alt="Luke's profile"
            width={32}
            height={32}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Luke Skywalker</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
        </div>
      </div>

      {/* Post content */}
      <div className="p-3">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Just started my new job at Acme Corp downtown! The office on 5th & Main has the best coffee...
        </p>
      </div>

      {/* Post footer */}
      <div className="px-3 pb-3 flex items-center gap-4 text-gray-500 dark:text-gray-400">
        <Heart size={18} />
        <MessageCircle size={18} />
        <Share2 size={18} />
      </div>

      {/* Deleted overlay - same style as photo */}
      {isDeleted && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium text-sm shadow-lg">
            <X size={16} />
            Removed
          </div>
        </div>
      )}
    </div>
  );
}

// Posts/Photos visual
function PostsVisual({ type }: { type: 'before' | 'after' }) {
  return (
    <div className="space-y-3">
      <SocialPost type={type} variant="photo" />
      <SocialPost type={type} variant="text" />
    </div>
  );
}

// Friends list visual
function FriendsVisual({ type }: { type: 'before' | 'after' }) {
  const isBefore = type === 'before';

  if (isBefore) {
    return (
      <div className="space-y-2">
        <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Friends (247)</div>
        {['Han Solo', 'Leia Organa', 'Obi-Wan Kenobi'].map((name, i) => (
          <div key={i} className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg p-2.5 border border-gray-200 dark:border-gray-700">
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
              <span className="text-sm text-gray-500">{name[0]}</span>
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{name}</span>
          </div>
        ))}
        <div className="text-xs text-gray-400 text-center pt-1">+ 244 more</div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col items-center justify-center py-8 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <Lock size={32} className="text-emerald-500 mb-3" />
      <p className="text-sm text-gray-600 dark:text-gray-400 text-center font-medium">
        Friends list is private
      </p>
      <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-1">
        Only you can see your connections
      </p>
    </div>
  );
}

// Privacy settings visual
function PrivacyVisual({ type }: { type: 'before' | 'after' }) {
  const isBefore = type === 'before';

  const settings = [
    { label: 'Who can see your posts', before: 'Public', after: 'Friends only', beforeIcon: Globe, afterIcon: Users },
    { label: 'Who can find you by email', before: 'Everyone', after: 'No one', beforeIcon: Eye, afterIcon: EyeOff },
    { label: 'Who can send you messages', before: 'Anyone', after: 'Friends only', beforeIcon: Globe, afterIcon: Users },
    { label: 'Profile in search results', before: 'On', after: 'Off', beforeIcon: Eye, afterIcon: EyeOff },
  ];

  return (
    <div className="space-y-2">
      {settings.map((setting, i) => {
        const Icon = isBefore ? setting.beforeIcon : setting.afterIcon;
        const value = isBefore ? setting.before : setting.after;
        return (
          <div key={i} className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-3 text-sm border border-gray-200 dark:border-gray-700">
            <span className="text-gray-600 dark:text-gray-400 truncate flex-1">{setting.label}</span>
            <div className={`flex items-center gap-1.5 ml-2 px-2 py-1 rounded ${
              isBefore
                ? 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20'
                : 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20'
            }`}>
              <Icon size={14} />
              <span className="font-medium">{value}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Profile snippet that highlights only the relevant part
function ProfileSnippet({
  type,
  focus,
  title,
}: {
  type: 'before' | 'after';
  focus: StepFocus;
  title: string;
}) {
  const isBefore = type === 'before';

  // For posts, friends, and privacy - use the rich visuals
  if (focus === 'posts') {
    return <PostsVisual type={type} />;
  }

  if (focus === 'friends') {
    return <FriendsVisual type={type} />;
  }

  if (focus === 'privacy') {
    return <PrivacyVisual type={type} />;
  }

  // For delete step - simplified view
  if (focus === 'delete') {
    return (
      <div className="text-center py-3">
        <p className={`text-base font-medium ${
          isBefore ? 'text-red-800 dark:text-red-200' : 'text-emerald-800 dark:text-emerald-200'
        }`}>
          {title}
        </p>
      </div>
    );
  }

  // Use shared profile data
  const data = isBefore ? BEFORE_PROFILE : AFTER_PROFILE;

  // Determine what's highlighted vs dimmed
  const isHighlighted = (field: string) => {
    if (focus === 'photo') return field === 'photo';
    if (focus === 'name') return field === 'name';
    if (focus === 'username') return field === 'username';
    if (focus === 'email') return field === 'email';
    if (focus === 'bio') return field === 'bio';
    return true;
  };

  const dimmedClass = 'opacity-30';
  const highlightClass = isBefore
    ? 'ring-2 ring-red-400 dark:ring-red-500 rounded'
    : 'ring-2 ring-emerald-400 dark:ring-emerald-500 rounded';

  return (
    <div>
      {/* Cover image placeholder - blue for before, gray for after (matches overview) */}
      <div className={`h-10 -mx-3 -mt-3 rounded-t-lg ${
        isBefore
          ? 'bg-gradient-to-r from-blue-400 to-blue-600'
          : 'bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700'
      }`} />

      {/* Profile content with proper padding */}
      <div className="flex items-start gap-3 pt-3">
        {/* Profile picture */}
        <div
          className={`w-12 h-12 rounded-full overflow-hidden flex-shrink-0 -mt-6 border-2 border-white dark:border-gray-700 ${
            isHighlighted('photo') ? highlightClass : dimmedClass
          } ${!data.hasPhoto ? 'bg-gray-300 dark:bg-gray-600' : ''}`}
        >
          {data.hasPhoto ? (
            <Image
              src="/luke.jpg"
              alt="Luke's profile"
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-emerald-100 dark:bg-emerald-800">
              <UserX className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />
            </div>
          )}
        </div>

        {/* Profile details - LEFT ALIGNED */}
        <div className="flex-1 min-w-0 pt-1">
          <p className={`text-base font-semibold text-left ${
            isHighlighted('name') ? highlightClass + ' px-1 inline-block' : dimmedClass
          } text-gray-900 dark:text-gray-100`}>
            {data.name}
          </p>
          <p className={`text-sm mt-0.5 text-left ${
            isHighlighted('username') ? highlightClass + ' px-1 inline-block' : dimmedClass
          } text-gray-500 dark:text-gray-400`}>
            {data.username}
          </p>
          {focus === 'email' && (
            <p className={`text-sm mt-0.5 text-left ${
              highlightClass + ' px-1 inline-block'
            } text-gray-500 dark:text-gray-400`}>
              {data.email}
            </p>
          )}
          {focus === 'bio' && (
            <p className={`text-sm mt-0.5 text-left ${
              highlightClass + ' px-1 inline-block'
            } ${data.bio ? 'text-gray-500 dark:text-gray-400' : 'text-gray-400 dark:text-gray-500 italic'}`}>
              {data.bio || '[Bio Removed]'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// Map step icons to focus areas
function getFocusFromIcon(icon: string): StepFocus {
  const iconToFocus: Record<string, StepFocus> = {
    'user': 'name',
    'user-x': 'name',
    'user-check': 'delete',
    'camera': 'photo',
    'circle-user': 'photo',
    'at-sign': 'username',
    'link': 'username',
    'shuffle': 'username',
    'mail': 'email',
    'mail-plus': 'email',
    'map-pin': 'bio',
    'map-pin-off': 'bio',
    'image': 'photo',
    'images': 'posts',
    'image-minus': 'posts',
    'image-off': 'posts',
    'users': 'friends',
    'users-round': 'friends',
    'shield': 'privacy',
    'shield-off': 'privacy',
    'shield-check': 'privacy',
    'trash-2': 'delete',
  };
  return iconToFocus[icon] || 'name';
}

export default function BeforeAfterBox({
  type,
  title,
  description,
  icon,
}: BeforeAfterBoxProps) {
  const isBefore = type === 'before';
  const focus = getFocusFromIcon(icon);

  return (
    <div
      className={`p-4 rounded-xl border-2 transition-all h-full flex flex-col ${
        isBefore
          ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800'
          : 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800'
      }`}
    >
      {/* Header */}
      <div className={`text-sm font-semibold mb-3 flex items-center gap-1.5 ${
        isBefore ? 'text-red-700 dark:text-red-300' : 'text-emerald-700 dark:text-emerald-300'
      }`}>
        <span className={`w-2 h-2 rounded-full ${isBefore ? 'bg-red-500' : 'bg-emerald-500'}`} />
        {isBefore ? 'Before' : 'After'}
      </div>

      {/* Profile snippet */}
      <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-3 mb-3 flex-1">
        <ProfileSnippet type={type} focus={focus} title={title} />
      </div>

      {/* Title and description combined */}
      <div className="space-y-1">
        <h4 className={`font-semibold text-base ${
          isBefore ? 'text-red-900 dark:text-red-200' : 'text-emerald-900 dark:text-emerald-200'
        }`}>
          {title}
        </h4>
        <p className={`text-sm leading-relaxed ${
          isBefore ? 'text-red-700 dark:text-red-300' : 'text-emerald-700 dark:text-emerald-300'
        }`}>
          {description}
        </p>
      </div>
    </div>
  );
}

// Wrapper component that shows before/after with arrow
export function BeforeAfterComparison({
  before,
  after,
}: {
  before: { title: string; description: string; icon: string };
  after: { title: string; description: string; icon: string };
}) {
  return (
    <div className="flex flex-col md:flex-row items-stretch gap-3">
      <div className="flex-1 flex">
        <BeforeAfterBox
          type="before"
          title={before.title}
          description={before.description}
          icon={before.icon}
        />
      </div>

      {/* Arrow */}
      <div className="flex items-center justify-center py-1 md:py-0">
        <ArrowDown className="md:hidden w-5 h-5 text-gray-400" />
        <ArrowRight className="hidden md:block w-5 h-5 text-gray-400" />
      </div>

      <div className="flex-1 flex">
        <BeforeAfterBox
          type="after"
          title={after.title}
          description={after.description}
          icon={after.icon}
        />
      </div>
    </div>
  );
}
