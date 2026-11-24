import type { ColumnInfo, Priority, Step } from './types';

export type { ColumnInfo };

/** The eight things to do on every account you keep, in column order. */
export const STEPS: Step[] = [
  {
    id: 'name',
    label: 'Change display name',
    desc: "Use a name that isn't your real one. Your real name is the easiest way for a stranger to connect this account to you.",
    how: 'Open your profile or account settings and look for "Name" or "Display name". Pick a nickname you don\'t use anywhere else.',
    ideas: 'names',
  },
  {
    id: 'photo',
    label: 'Remove or change photo',
    desc: 'Remove your photo or swap it for one without your face. Reverse image search can match the same photo across sites.',
    how: "Remove the photo or replace it with a simple pattern or illustration. Don't reuse the same image on another site.",
    links: [
      {
        name: 'StrongPhrase',
        note: 'makes fake identities, each with an avatar you can use instead of your photo.',
        href: 'https://strongphrase.net/identity/',
      },
    ],
  },
  {
    id: 'username',
    label: 'Use a random username',
    desc: "Use a username you don't use anywhere else. The same handle on two sites links those accounts.",
    how: 'Look for "Username" or "Handle" in account settings and change it to something random. Some sites won\'t let you.',
    ideas: 'usernames',
  },
  {
    id: 'email',
    label: 'Use a unique email',
    desc: "Give each site its own address so a leaked email can't tie your accounts together.",
    how: 'If you use Gmail, add "+sitename" before the @, like alex+facebook@gmail.com. Mail still reaches your inbox. For more privacy, use an alias service.',
    links: [
      { name: 'Qwacky', note: 'is a Chrome extension for making free DuckDuckGo addresses that forward to your inbox.', href: 'https://chromewebstore.google.com/detail/qwacky/kieehbhdbincplacegpjdkoglfakboeo' },
      { name: 'Firefox Relay', note: "is Mozilla's service for free forwarding addresses.", href: 'https://relay.firefox.com/' },
      { name: 'SimpleLogin', note: 'is an open-source alias service from Proton.', href: 'https://simplelogin.io/' },
      { name: 'The Gmail + trick', note: 'is explained by Google here.', href: 'https://gmail.googleblog.com/2008/03/2-hidden-ways-to-get-more-from-your.html' },
    ],
  },
  {
    id: 'bio',
    label: 'Remove bio & location',
    desc: 'Take out your city, employer, school and anything else that narrows down who you are.',
    how: 'Edit your profile. Remove specific places, workplaces, school names and graduation years.',
  },
  {
    id: 'posts',
    label: 'Clean up old posts',
    desc: 'Old posts can show where you live, work and spend time. Photos can carry hidden location data.',
    how: 'Scroll back through your posts. Delete or hide anything that shows your home, your neighborhood, your workplace or your routine.',
  },
  {
    id: 'friends',
    label: 'Hide friends list',
    desc: "Your connections can identify you even when your profile doesn't.",
    how: 'In privacy settings, look for "Who can see your friends" or "Who can see who you follow" and set it to "Only me".',
  },
  {
    id: 'privacy',
    label: 'Lock down privacy',
    desc: 'Most sites start with everything public. Pick the most private option for each setting.',
    how: 'Go to Settings, then Privacy. Check who can see your posts and who can find you by email or phone number.',
  },
];

export const PLATFORM_INFO: ColumnInfo = {
  label: 'Platform',
  desc: 'Check every platform you have an account on, including ones you stopped using. Old accounts still turn up in searches.',
};

export const PLAN_INFO: ColumnInfo = {
  label: 'Keep or delete',
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
