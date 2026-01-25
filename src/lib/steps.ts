import { Step } from './types';

export const UNIVERSAL_STEPS: Step[] = [
  {
    id: 1,
    title: 'Delete Your Account',
    shortTitle: 'Delete',
    icon: 'trash-2',
    description: 'Consider whether you need this account at all. If not, deleting it is the most effective way to protect your privacy.',
    educationalContext: 'Deleting accounts removes your data from the platform entirely. Every account you eliminate reduces what strangers can find about you. If you haven\'t used this platform in months, deletion is usually the best choice.',
    beforeAfter: {
      before: {
        title: 'Account Active',
        description: 'All your posts, photos, and connections remain searchable',
        icon: 'user-check',
        risk: 'Strangers can piece together your full history on this platform',
      },
      after: {
        title: 'Account Deleted',
        description: 'Your data is removed from the platform entirely',
        icon: 'user-x',
        benefit: 'This account can no longer be used to learn about you',
      },
    },
    howTo: 'Look for "Delete Account" or "Close Account" in your account settings. Most platforms make you wait 30 days before the deletion is final.',
    isDeleteStep: true,
  },
  {
    id: 2,
    title: 'Change Your Display Name',
    shortTitle: 'Display Name',
    icon: 'user',
    description: 'Update your display name to something that doesn\'t include your real name or identifiable information.',
    educationalContext: 'Your real name is the primary way strangers link accounts together. Using a fake name breaks the connection between this account and your real identity.',
    beforeAfter: {
      before: {
        title: 'Luke Skywalker',
        description: 'Strangers can find you by searching your real name',
        icon: 'user',
      },
      after: {
        title: 'John Doe',
        description: 'Your profile won\'t appear in name searches',
        icon: 'user-x',
      },
    },
    howTo: 'Go to your profile or account settings and look for "Display Name", "Name", or "Profile". Change it to a nickname or fake name you don\'t use anywhere else. Use our generator above for ideas.',
    isDeleteStep: false,
  },
  {
    id: 3,
    title: 'Change Your Profile Picture',
    shortTitle: 'Profile Picture',
    icon: 'image',
    description: 'Remove or replace your profile picture with something non-identifiable. Avoid photos of your face or re-using the same photo on any site.',
    educationalContext: 'Reverse image search tools can find the same photo across multiple platforms, linking your accounts together. Use a generic avatar or no image at all.',
    beforeAfter: {
      before: {
        title: 'Your Photo',
        description: 'Your face can be matched across platforms using reverse image search',
        icon: 'camera',
      },
      after: {
        title: 'Generic Avatar',
        description: 'Generic avatars can\'t be traced across accounts',
        icon: 'circle-user',
      },
    },
    howTo: 'Go to your profile settings and either remove your photo entirely or replace it with a simple illustration, pattern, or generic avatar that doesn\'t show your face.',
    isDeleteStep: false,
  },
  {
    id: 4,
    title: 'Change Your Username',
    shortTitle: 'Username',
    icon: 'at-sign',
    description: 'Update your username to something unique that you don\'t use elsewhere.',
    educationalContext: 'Usernames are one of the first things strangers search for. If you use the same username across platforms, they can instantly link those accounts.',
    beforeAfter: {
      before: {
        title: '@lukeskywalker',
        description: 'Anyone can find all your accounts by searching this username',
        icon: 'link',
      },
      after: {
        title: 'happy-dolphin-742',
        description: 'This account can\'t be linked to your others',
        icon: 'shuffle',
      },
    },
    howTo: 'Find "Username" or "Handle" in your account settings. Change it to something random and unique. Use our generator above for ideas. Note: Not all sites let you change your username—if you can\'t find the option, skip this step.',
    isDeleteStep: false,
  },
  {
    id: 5,
    title: 'Update Your Email Address',
    shortTitle: 'Email',
    icon: 'mail',
    description: 'Use a unique email address for this account. Try the Gmail "+" trick if you use Gmail.',
    educationalContext: 'Data breaches often leak email addresses. Using unique emails for each service means leaked data can\'t be used to link accounts together.',
    beforeAfter: {
      before: {
        title: 'luke@gmail.com',
        description: 'Data breaches expose your email and link all your accounts',
        icon: 'mail',
      },
      after: {
        title: 'luke+instagram@gmail.com',
        description: 'Unique per site, but still goes to your inbox',
        icon: 'mail-plus',
      },
    },
    howTo: 'Go to account or email settings. Change your email to include "+sitename" before the @. Example: if your email is alex@gmail.com, change it to alex+facebook@gmail.com. You\'ll still get all emails, but the address looks different to each site.',
    isDeleteStep: false,
  },
  {
    id: 6,
    title: 'Remove Location & Bio Info',
    shortTitle: 'Location/Bio',
    icon: 'map-pin',
    description: 'Remove or obscure any location information, workplace, school, or other identifying details from your bio.',
    educationalContext: 'Bio information narrows down your identity significantly. Your city, employer, or school can uniquely identify you when combined with other data.',
    beforeAfter: {
      before: {
        title: 'Tatooine native | Rebel Alliance',
        description: 'Location + employer makes you easy to identify in real life',
        icon: 'map-pin',
      },
      after: {
        title: '[Bio Removed]',
        description: 'Much harder to connect you to a real-world location',
        icon: 'map-pin-off',
      },
    },
    howTo: 'Edit your profile or bio. Remove specific locations (change "Seattle" to just "USA" or remove it entirely). Remove employer, school names, and graduation years.',
    isDeleteStep: false,
  },
  {
    id: 7,
    title: 'Review Your Posts & Photos',
    shortTitle: 'Posts/Photos',
    icon: 'image-minus',
    description: 'Review and remove posts that reveal your location, workplace, daily routine, or other sensitive information.',
    educationalContext: 'Photos contain hidden GPS coordinates. Posts about your commute or neighborhood reveal where you live. Location-tagged content should be removed.',
    beforeAfter: {
      before: {
        title: 'Location-tagged posts',
        description: 'Old posts reveal where you live and work',
        icon: 'images',
      },
      after: {
        title: 'Clean history',
        description: 'No breadcrumbs leading to your real location',
        icon: 'image-off',
      },
    },
    howTo: 'Scroll through your posts and photos. Delete anything showing: your home/neighborhood, regular locations, workplace, daily routines, or check-ins. If you can\'t delete, make them private.',
    isDeleteStep: false,
  },
  {
    id: 8,
    title: 'Hide Your Friends/Connections',
    shortTitle: 'Friends List',
    icon: 'users',
    description: 'Set your friends list, followers, and following lists to private if possible.',
    educationalContext: 'Your social connections reveal your identity even when your profile doesn\'t. If strangers know your friends, they can identify you through them.',
    beforeAfter: {
      before: {
        title: 'Public friends list',
        description: 'Strangers can identify you through your connections',
        icon: 'users',
      },
      after: {
        title: 'Private connections',
        description: 'Your social network stays hidden from strangers',
        icon: 'users-round',
      },
    },
    howTo: 'Look in privacy settings for "Who can see your friends", "Who can see who you follow", or similar. Set it to "Only me" or "Private".',
    isDeleteStep: false,
  },
  {
    id: 9,
    title: 'Lock Down Privacy Settings',
    shortTitle: 'Privacy Settings',
    icon: 'settings',
    description: 'Review and tighten all privacy settings. Make your profile as private as possible.',
    educationalContext: 'Most platforms default to public settings. Check who can see your posts, who can find you by email/phone, who can message you, and what data is shared.',
    beforeAfter: {
      before: {
        title: 'Default settings',
        description: 'Strangers can easily find you and see your posts',
        icon: 'shield-off',
      },
      after: {
        title: 'Locked down',
        description: 'Only people you approve can find you',
        icon: 'shield-check',
      },
    },
    howTo: 'Go to Settings > Privacy. Review each setting and choose the most private option. Common settings to check: post visibility, search visibility, who can message you, data sharing with apps/advertisers.',
    isDeleteStep: false,
  },
];

export const TOTAL_STEPS = UNIVERSAL_STEPS.length;

export function getStep(stepNumber: number): Step | undefined {
  return UNIVERSAL_STEPS.find(s => s.id === stepNumber);
}

// Get steps 2-9 (excluding delete step) for normal flow
export function getNonDeleteSteps(): Step[] {
  return UNIVERSAL_STEPS.filter(s => !s.isDeleteStep);
}

// Get only the delete step
export function getDeleteStep(): Step {
  return UNIVERSAL_STEPS[0]; // Step 1 is always delete
}
