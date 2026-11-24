import type { Priority, Step } from './types';

/** The eight things to do on every account you keep, in column order. */
export const STEPS: Step[] = [
  {
    id: 'name',
    label: 'Display name',
    title: 'Change your display name',
    desc: "Use a name that isn't your real one. Your real name is the easiest way for a stranger to connect this account to you.",
    how: 'Open your profile or account settings and look for "Name" or "Display name". Pick a nickname you don\'t use anywhere else.',
  },
  {
    id: 'photo',
    label: 'Profile photo',
    title: 'Change your profile photo',
    desc: 'Remove your photo or swap it for one without your face. Reverse image search can match the same photo across sites.',
    how: "Remove the photo or replace it with a simple pattern or illustration. Don't reuse the same image on another site.",
  },
  {
    id: 'username',
    label: 'Username',
    title: 'Change your username',
    desc: "Use a username you don't use anywhere else. The same handle on two sites links those accounts instantly.",
    how: 'Look for "Username" or "Handle" in account settings and change it to something random. Some sites won\'t let you.',
  },
  {
    id: 'email',
    label: 'Email',
    title: 'Use a different email address',
    desc: "Give each site its own address so a leaked email can't tie your accounts together.",
    how: 'If you use Gmail, add "+sitename" before the @, like alex+facebook@gmail.com. Mail still reaches your inbox.',
  },
  {
    id: 'bio',
    label: 'Bio & location',
    title: 'Remove location and bio details',
    desc: 'Take out your city, employer, school and anything else that narrows down who you are.',
    how: 'Edit your profile. Remove specific places, workplaces, school names and graduation years.',
  },
  {
    id: 'posts',
    label: 'Posts & photos',
    title: 'Review old posts and photos',
    desc: 'Old posts can show where you live, work and spend time. Photos can carry hidden location data.',
    how: 'Scroll back through your posts. Delete or hide anything that shows your home, your neighborhood, your workplace or your routine.',
  },
  {
    id: 'friends',
    label: 'Friends list',
    title: 'Hide your friends list',
    desc: "Your connections can identify you even when your profile doesn't.",
    how: 'In privacy settings, look for "Who can see your friends" or "Who can see who you follow" and set it to "Only me".',
  },
  {
    id: 'privacy',
    label: 'Privacy settings',
    title: 'Lock down privacy settings',
    desc: 'Most sites start with everything public. Pick the most private option for each setting.',
    how: 'Go to Settings, then Privacy. Check who can see your posts and who can find you by email or phone number.',
  },
];

export interface ColumnInfo {
  title: string;
  desc: string;
  how: string;
}

export const PLATFORM_INFO: ColumnInfo = {
  title: 'Your accounts',
  desc: 'Check every platform you have an account on, including ones you stopped using. Old accounts still turn up in searches.',
  how: 'Each unchecked row says why that platform matters. Once checked, hover the name to see it again, or press and hold it on a phone. Missing one? Use Add platform in the toolbar.',
};

export const PLAN_INFO: ColumnInfo = {
  title: 'Keep or delete',
  desc: 'Ask whether you still need this account. Deleting it is the most effective way to protect yourself, and then that row is done.',
  how: 'Look for "Delete account" or "Close account" in settings. Most sites wait about 30 days before the account is gone for good.',
};

/** Sheet order. "Your own platforms" only shows once someone adds one. */
export const GROUPS: { id: Priority | 'custom'; label: string }[] = [
  { id: 'custom', label: 'Your own platforms' },
  { id: 'highest', label: 'Highest priority' },
  { id: 'high', label: 'High priority' },
  { id: 'medium', label: 'Medium priority' },
  { id: 'low', label: 'Lower priority' },
];

/** Most people have these, so a first visit starts with them checked. */
export const STARTERS = ['facebook', 'linkedin', 'instagram', 'google', 'googlemaps'];
