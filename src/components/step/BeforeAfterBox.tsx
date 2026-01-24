'use client';

import { ArrowRight, ArrowDown, X, Lock, MapPin, Users, Eye, EyeOff, Globe, Heart, MessageCircle, Share2 } from 'lucide-react';
import Image from 'next/image';
import FakeSocialProfile, { ProfileField } from '@/components/shared/FakeSocialProfile';

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
      <div className="relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        {/* Post content with opacity when deleted */}
        <div className={isDeleted ? 'opacity-40' : ''}>
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
              {/* Red outline on "wrong" things in before view */}
              <p className={`text-xs text-gray-500 dark:text-gray-400 ${isBefore ? 'ring-2 ring-red-400 dark:ring-red-500 rounded px-1 inline-block' : ''}`}>
                Tagged at Mos Eisley Cantina
              </p>
            </div>
          </div>

          {/* Photo with location tag */}
          <div className="h-32 relative overflow-hidden">
            <Image
              src="/cantina.jpg"
              alt="Mos Eisley Cantina"
              fill
              className="object-cover"
            />
            {/* Location tag overlay - red outline in before view */}
            <div className={`absolute bottom-2 left-2 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs font-medium ${isBefore ? 'ring-2 ring-red-400 dark:ring-red-500' : ''}`}>
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
        </div>

        {/* Deleted overlay - badge stays fully opaque on top */}
        {isDeleted && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
            <div className="bg-emerald-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold text-sm shadow-lg pointer-events-auto">
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
    <div className="relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Post content with opacity when deleted */}
      <div className={isDeleted ? 'opacity-40' : ''}>
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

        {/* Post content - red outline on "wrong" things in before view */}
        <div className="p-3">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Just started my new job at{' '}
            <span className={isBefore ? 'ring-2 ring-red-400 dark:ring-red-500 rounded px-0.5' : ''}>Acme Corp</span>{' '}
            downtown! The office on{' '}
            <span className={isBefore ? 'ring-2 ring-red-400 dark:ring-red-500 rounded px-0.5' : ''}>5th & Main</span>{' '}
            has the best coffee...
          </p>
        </div>

        {/* Post footer */}
        <div className="px-3 pb-3 flex items-center gap-4 text-gray-500 dark:text-gray-400">
          <Heart size={18} />
          <MessageCircle size={18} />
          <Share2 size={18} />
        </div>
      </div>

      {/* Deleted overlay - badge stays fully opaque on top */}
      {isDeleted && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
          <div className="bg-emerald-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold text-sm shadow-lg pointer-events-auto">
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

  // For profile-related fields (photo, name, username, email, bio), use the shared component
  // Map StepFocus to ProfileField (they're the same for these cases)
  const highlightField = focus as ProfileField;

  return (
    <div className="-m-3">
      <FakeSocialProfile
        type={type}
        size="compact"
        showCover={true}
        showBio={focus === 'bio'}
        showEmail={false}
        showStats={false}
        highlightField={highlightField}
      />
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
      <div className="flex-1 min-w-0">
        <BeforeAfterBox
          type="before"
          title={before.title}
          description={before.description}
          icon={before.icon}
        />
      </div>

      {/* Arrow - minimal padding */}
      <div className="flex items-center justify-center py-1 md:py-0 md:px-1 flex-shrink-0">
        <ArrowDown className="md:hidden w-5 h-5 text-gray-400" />
        <ArrowRight className="hidden md:block w-5 h-5 text-gray-400" />
      </div>

      <div className="flex-1 min-w-0">
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
