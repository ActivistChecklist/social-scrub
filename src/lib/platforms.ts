import { Platform } from './types';

export const PLATFORMS: Platform[] = [
  // 🔥 HIGHEST PRIORITY — Everything in this category is covered by Block Party
  {
    id: 'facebook',
    name: 'Facebook',
    icon: 'facebook',
    category: 'social',
    priority: 'highest',
    hasBlockParty: true,
    importanceReason: 'Use Block Party'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: 'linkedin',
    category: 'professional',
    priority: 'highest',
    hasBlockParty: true,
    importanceReason: 'Use Block Party'
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: 'instagram',
    category: 'social',
    priority: 'medium',
    hasBlockParty: true
  },
  {
    id: 'twitter',
    name: 'X / Twitter',
    icon: 'x',
    category: 'social',
    priority: 'highest',
    hasBlockParty: true,
    importanceReason: 'Use Block Party'
  },
  {
    id: 'venmo',
    name: 'Venmo',
    icon: 'venmo',
    category: 'finance',
    priority: 'highest',
    hasBlockParty: true,
    importanceReason: 'Use Block Party. Public transactions show where you spend time.'
  },
  {
    id: 'google',
    name: 'Google Account',
    icon: 'google',
    category: 'other',
    priority: 'medium',
    hasBlockParty: true
  },
  {
    id: 'googlemaps',
    name: 'Google Maps Reviews',
    icon: 'google',
    category: 'other',
    priority: 'highest',
    hasBlockParty: true,
    importanceReason: 'Use Block Party. Can reveal your location and frequent locations'
  },
  {
    id: 'reddit',
    name: 'Reddit',
    icon: 'reddit',
    category: 'forum',
    priority: 'highest',
    hasBlockParty: true,
    importanceReason: 'Use Block Party'
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: 'youtube',
    category: 'photo_video',
    priority: 'highest',
    hasBlockParty: true,
    importanceReason: 'Use Block Party'
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: 'tiktok',
    category: 'social',
    priority: 'highest',
    hasBlockParty: true,
    importanceReason: 'Use Block Party'
  },
  {
    id: 'snapchat',
    name: 'SnapChat',
    icon: 'snapchat',
    category: 'messaging',
    priority: 'highest',
    hasBlockParty: true,
    importanceReason: 'Use Block Party'
  },
  {
    id: 'bluesky',
    name: 'Bluesky',
    icon: 'bluesky',
    category: 'social',
    priority: 'highest',
    hasBlockParty: true,
    importanceReason: 'Use Block Party'
  },
  {
    id: 'strava',
    name: 'Strava',
    icon: 'strava',
    category: 'social',
    priority: 'highest',
    hasBlockParty: true,
    importanceReason: 'Use Block Party. Can reveal your home'
  },

  // 🔴 HIGH PRIORITY
  {
    id: 'partiful',
    name: 'Partiful',
    category: 'other',
    priority: 'high',
    importanceReason: 'Past events can reveal your address and friends. (also: partiful founders worked at Palantir)'
  },
  {
    id: 'gmail',
    name: 'Gmail',
    icon: 'google',
    category: 'other',
    priority: 'high',
    importanceReason: 'Your profile picture could be used to do a reverse image search. Also remove phone and location from signature.'
  },
  {
    id: 'yelp',
    name: 'Yelp',
    icon: 'yelp',
    category: 'social',
    priority: 'high',
    importanceReason: 'Reveals where you\'re living and visiting'
  },
  {
    id: 'gofundme',
    name: 'GoFundMe',
    category: 'other',
    priority: 'high',
    importanceReason: 'Can reveals people you\'re close to and where you live'
  },
  {
    id: 'chuffed',
    name: 'Chuffed',
    category: 'other',
    priority: 'high',
    importanceReason: 'A similar crowdfunding platform'
  },
  {
    id: 'flickr',
    name: 'Flickr',
    icon: 'flickr',
    category: 'photo_video',
    priority: 'high',
    importanceReason: 'Photos can reveal where you live directly through geotagging or indirectly by what is in them'
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: 'whatsapp',
    category: 'messaging',
    priority: 'high'
  },
  {
    id: 'nextdoor',
    name: 'Nextdoor',
    icon: 'nextdoor',
    category: 'social',
    priority: 'high',
    importanceReason: 'Reveals where you live and who you interact with'
  },
  {
    id: 'alltrails',
    name: 'AllTrails',
    category: 'other',
    priority: 'high',
    importanceReason: 'Can reveal the region you live in'
  },
  {
    id: 'medium',
    name: 'Medium',
    icon: 'medium',
    category: 'social',
    priority: 'high',
    importanceReason: 'Reveals who you follow (likely your social network). Profile might have location.'
  },
  {
    id: 'mapmyrun',
    name: 'MapMyRun',
    category: 'other',
    priority: 'high',
    importanceReason: 'Can reveal where you spend time or where you live'
  },

  // 🟠 MEDIUM PRIORITY
  {
    id: 'spotify',
    name: 'Spotify',
    icon: 'spotify',
    category: 'other',
    priority: 'medium',
    importanceReason: 'Shows interests, can display when you\'re online'
  },
  {
    id: 'substack',
    name: 'Substack',
    category: 'social',
    priority: 'medium',
    importanceReason: 'Reveals who you follow. Profile might have location.'
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: 'paypal',
    category: 'finance',
    priority: 'medium',
    importanceReason: 'Your PayPal.me link can list your location'
  },
  {
    id: 'airbnb',
    name: 'Airbnb',
    icon: 'airbnb',
    category: 'other',
    priority: 'medium',
    importanceReason: 'Reveals where you visit and when'
  },
  {
    id: 'amazon',
    name: 'Amazon',
    icon: 'amazon',
    category: 'shopping',
    priority: 'medium',
    importanceReason: 'Public reviews can reveal information about you'
  },
  {
    id: 'goodreads',
    name: 'Goodreads',
    icon: 'goodreads',
    category: 'social',
    priority: 'medium',
    importanceReason: 'Reviews and ratings tell a lot about your interests'
  },
  {
    id: 'etsy',
    name: 'Etsy',
    icon: 'etsy',
    category: 'shopping',
    priority: 'medium',
    importanceReason: 'Has a "findable by email address" privacy setting'
  },
  {
    id: 'gravatar',
    name: 'Gravatar',
    category: 'other',
    priority: 'medium',
    importanceReason: 'Shows your real photo'
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    icon: 'pinterest',
    category: 'social',
    priority: 'medium',
    importanceReason: 'Reveals your interests. You can hide your profile entirely in settings.'
  },
  {
    id: 'eventbrite',
    name: 'Eventbrite',
    category: 'other',
    priority: 'medium',
    importanceReason: 'Some events shows a "who\'s going" list that could have your full name and profile picture. Might want to keep your real first name and last initial.'
  },
  {
    id: 'signal',
    name: 'Signal',
    icon: 'signal',
    category: 'messaging',
    priority: 'medium',
    importanceReason: 'Settings guide. You can set your phone number to not be discoverable if needed. This will make it harder for people to find you, but increase your privacy. Your choice.'
  },
  {
    id: 'discord',
    name: 'Discord',
    icon: 'discord',
    category: 'messaging',
    priority: 'medium'
  },
  {
    id: 'threads',
    name: 'Threads',
    category: 'social',
    priority: 'medium'
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: 'github',
    category: 'professional',
    priority: 'medium',
    importanceReason: 'Has work info and shows times you\'re online'
  },
  {
    id: 'telegram',
    name: 'Telegram',
    icon: 'telegram',
    category: 'messaging',
    priority: 'medium'
  },
  {
    id: 'tumblr',
    name: 'Tumblr',
    icon: 'tumblr',
    category: 'social',
    priority: 'medium'
  },
  {
    id: 'patreon',
    name: 'Patreon',
    category: 'other',
    priority: 'medium'
  },
  {
    id: 'ancestry',
    name: 'Ancestry.com',
    category: 'other',
    priority: 'medium'
  },
  {
    id: 'tripadvisor',
    name: 'TripAdvisor',
    icon: 'tripadvisor',
    category: 'social',
    priority: 'medium'
  },
  {
    id: 'vimeo',
    name: 'Vimeo',
    icon: 'vimeo',
    category: 'photo_video',
    priority: 'medium'
  },
  {
    id: 'haveibeenpwned',
    name: 'haveibeenpwned',
    category: 'other',
    priority: 'medium',
    importanceReason: 'Your data is almost certiantly on there. Opting out can help hide what services you use'
  },
  {
    id: 'ebay',
    name: 'eBay',
    icon: 'ebay',
    category: 'shopping',
    priority: 'medium'
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    icon: 'dropbox',
    category: 'professional',
    priority: 'medium',
    importanceReason: 'Can reveal your profile picture'
  },
  {
    id: 'upwork',
    name: 'Upwork',
    category: 'professional',
    priority: 'medium',
    importanceReason: 'Can reveal your location'
  },
  {
    id: 'canva',
    name: 'Canva',
    icon: 'canva',
    category: 'professional',
    priority: 'medium',
    importanceReason: 'The metadata on files you save can reveal your name or username'
  },
  {
    id: 'disqus',
    name: 'Disqus',
    category: 'other',
    priority: 'medium',
    importanceReason: 'This comment system runs on many sites across the internet so you might use it without knowing. Your comment history could reaveal information.'
  },

  // Extra platforms moved to medium priority
  {
    id: 'twitch',
    name: 'Twitch',
    icon: 'twitch',
    category: 'gaming',
    priority: 'medium'
  },
  {
    id: 'soundcloud',
    name: 'SoundCloud',
    icon: 'soundcloud',
    category: 'other',
    priority: 'medium'
  },
  {
    id: 'quora',
    name: 'Quora',
    icon: 'quora',
    category: 'forum',
    priority: 'medium'
  },
  {
    id: 'gitlab',
    name: 'GitLab',
    icon: 'gitlab',
    category: 'professional',
    priority: 'medium'
  },
  {
    id: 'stackoverflow',
    name: 'Stack Overflow',
    icon: 'stackoverflow',
    category: 'professional',
    priority: 'medium'
  },
  {
    id: 'behance',
    name: 'Behance',
    icon: 'behance',
    category: 'professional',
    priority: 'medium'
  },
  {
    id: 'dribbble',
    name: 'Dribbble',
    icon: 'dribbble',
    category: 'professional',
    priority: 'medium'
  },
  {
    id: 'deviantart',
    name: 'DeviantArt',
    icon: 'deviantart',
    category: 'social',
    priority: 'medium'
  },
  {
    id: 'uber',
    name: 'Uber',
    icon: 'uber',
    category: 'other',
    priority: 'medium'
  },
  {
    id: 'lyft',
    name: 'Lyft',
    icon: 'lyft',
    category: 'other',
    priority: 'medium'
  },
  {
    id: 'doordash',
    name: 'DoorDash',
    icon: 'doordash',
    category: 'other',
    priority: 'medium'
  },
  {
    id: 'grubhub',
    name: 'Grubhub',
    icon: 'grubhub',
    category: 'other',
    priority: 'medium'
  },
  {
    id: 'poshmark',
    name: 'Poshmark',
    icon: 'poshmark',
    category: 'shopping',
    priority: 'medium'
  },
  {
    id: 'depop',
    name: 'Depop',
    icon: 'depop',
    category: 'shopping',
    priority: 'medium'
  },
  {
    id: 'mercari',
    name: 'Mercari',
    category: 'shopping',
    priority: 'medium'
  },
  {
    id: 'offerup',
    name: 'OfferUp',
    category: 'shopping',
    priority: 'medium'
  },

  // 🟡 LOW PRIORITY
  {
    id: 'applepodcast',
    name: 'Apple Podcast Reviews',
    icon: 'apple',
    category: 'other',
    priority: 'low',
    importanceReason: 'Reveals interests'
  },
  {
    id: 'mastodon',
    name: 'Mastodon',
    category: 'social',
    priority: 'low'
  },
  {
    id: 'cashapp',
    name: 'Cash App',
    icon: 'cashapp',
    category: 'finance',
    priority: 'low',
    importanceReason: 'Can reveal your profile picture'
  },
  {
    id: 'duolingo',
    name: 'Duolingo',
    icon: 'duolingo',
    category: 'other',
    priority: 'low',
    importanceReason: 'Can reveal your location'
  },
  {
    id: 'lastfm',
    name: 'Last.fm',
    icon: 'lastdotfm',
    category: 'other',
    priority: 'low',
    importanceReason: 'Could reveal when you\'re online'
  },
  {
    id: 'fiverr',
    name: 'Fiverr',
    category: 'other',
    priority: 'low'
  },
  {
    id: 'geocaching',
    name: 'Geocaching',
    category: 'other',
    priority: 'low'
  },
  {
    id: 'indiegogo',
    name: 'Indiegogo',
    category: 'other',
    priority: 'low',
    importanceReason: 'Reveals people you\'re close to'
  },
  {
    id: 'kickstarter',
    name: 'Kickstarter',
    category: 'other',
    priority: 'low'
  },
  {
    id: 'stackexchange',
    name: 'Stack Exchange',
    category: 'forum',
    priority: 'low'
  },
  {
    id: 'wechat',
    name: 'WeChat',
    icon: 'wechat',
    category: 'messaging',
    priority: 'low'
  },
  {
    id: 'bandcamp',
    name: 'Bandcamp',
    category: 'other',
    priority: 'low'
  },
  {
    id: 'hackernews',
    name: 'Hacker News',
    icon: 'ycombinator',
    category: 'forum',
    priority: 'low'
  },
  {
    id: 'glassdoor',
    name: 'Glassdoor',
    category: 'professional',
    priority: 'low'
  },
  {
    id: 'opentable',
    name: 'OpenTable',
    category: 'other',
    priority: 'low'
  },
  {
    id: 'costar',
    name: 'Co-Star',
    category: 'other',
    priority: 'low',
    importanceReason: 'Can reveal your birthday which can be used to get access to other accounts'
  },
  {
    id: 'ultimateguitar',
    name: 'UltimateGuitar',
    category: 'other',
    priority: 'low'
  },
  {
    id: 'somethingawesome',
    name: 'SomethingAwesome',
    category: 'other',
    priority: 'low'
  },
  {
    id: 'mountainproject',
    name: 'Mountain Project',
    category: 'other',
    priority: 'low',
    importanceReason: 'Can reveral your friends and possibly where you live'
  },

  // LOW PRIORITY - Dating Apps
  {
    id: 'tinder',
    name: 'Tinder',
    icon: 'tinder',
    category: 'dating',
    priority: 'low'
  },
  {
    id: 'bumble',
    name: 'Bumble',
    icon: 'bumble',
    category: 'dating',
    priority: 'low'
  },
  {
    id: 'hinge',
    name: 'Hinge',
    icon: 'hinge',
    category: 'dating',
    priority: 'low'
  },
  {
    id: 'okcupid',
    name: 'OkCupid',
    icon: 'okcupid',
    category: 'dating',
    priority: 'low'
  },
  {
    id: 'match',
    name: 'Match.com',
    category: 'dating',
    priority: 'low'
  },
  {
    id: 'plentyoffish',
    name: 'Plenty of Fish',
    category: 'dating',
    priority: 'low'
  },
  {
    id: 'grindr',
    name: 'Grindr',
    icon: 'grindr',
    category: 'dating',
    priority: 'low'
  },
  {
    id: 'scruff',
    name: 'Scruff',
    category: 'dating',
    priority: 'low'
  },
  {
    id: 'her',
    name: 'HER',
    category: 'dating',
    priority: 'low'
  },
  {
    id: 'coffee',
    name: 'Coffee Meets Bagel',
    category: 'dating',
    priority: 'low'
  },

  // LOW PRIORITY - Gaming
  {
    id: 'steam',
    name: 'Steam',
    icon: 'steam',
    category: 'gaming',
    priority: 'low'
  },
  {
    id: 'xbox',
    name: 'Xbox Live',
    icon: 'xbox',
    category: 'gaming',
    priority: 'low'
  },
  {
    id: 'playstation',
    name: 'PlayStation Network',
    icon: 'playstation',
    category: 'gaming',
    priority: 'low'
  },
  {
    id: 'nintendo',
    name: 'Nintendo Account',
    icon: 'nintendo',
    category: 'gaming',
    priority: 'low'
  },
  {
    id: 'epicgames',
    name: 'Epic Games',
    icon: 'epicgames',
    category: 'gaming',
    priority: 'low'
  },
  {
    id: 'battlenet',
    name: 'Battle.net',
    icon: 'battlenet',
    category: 'gaming',
    priority: 'low'
  },
  {
    id: 'origin',
    name: 'EA / Origin',
    icon: 'ea',
    category: 'gaming',
    priority: 'low'
  },
  {
    id: 'ubisoft',
    name: 'Ubisoft Connect',
    icon: 'ubisoft',
    category: 'gaming',
    priority: 'low'
  },
  {
    id: 'roblox',
    name: 'Roblox',
    icon: 'roblox',
    category: 'gaming',
    priority: 'low'
  },
  {
    id: 'minecraft',
    name: 'Minecraft',
    icon: 'minecraft',
    category: 'gaming',
    priority: 'low'
  },

  // LOW PRIORITY - Professional/Work
  {
    id: 'slack',
    name: 'Slack',
    icon: 'slack',
    category: 'professional',
    priority: 'low'
  },
  {
    id: 'zoom',
    name: 'Zoom',
    icon: 'zoom',
    category: 'professional',
    priority: 'low'
  },
  {
    id: 'notion',
    name: 'Notion',
    icon: 'notion',
    category: 'professional',
    priority: 'low'
  },
  {
    id: 'figma',
    name: 'Figma',
    icon: 'figma',
    category: 'professional',
    priority: 'low'
  },
  {
    id: 'trello',
    name: 'Trello',
    icon: 'trello',
    category: 'professional',
    priority: 'low'
  },
  {
    id: 'asana',
    name: 'Asana',
    icon: 'asana',
    category: 'professional',
    priority: 'low'
  },
  {
    id: 'evernote',
    name: 'Evernote',
    icon: 'evernote',
    category: 'professional',
    priority: 'low'
  },
  {
    id: 'todoist',
    name: 'Todoist',
    icon: 'todoist',
    category: 'professional',
    priority: 'low'
  },

  // LOW PRIORITY - Forums/Communities
  {
    id: 'producthunt',
    name: 'Product Hunt',
    icon: 'producthunt',
    category: 'forum',
    priority: 'low'
  },
  {
    id: 'slashdot',
    name: 'Slashdot',
    category: 'forum',
    priority: 'low'
  },
  {
    id: 'voat',
    name: 'Voat',
    category: 'forum',
    priority: 'low'
  },
  {
    id: '4chan',
    name: '4chan',
    icon: '4chan',
    category: 'forum',
    priority: 'low'
  },
  {
    id: 'kiwifarms',
    name: 'Kiwi Farms',
    category: 'forum',
    priority: 'low'
  },

  // LOW PRIORITY - Messaging
  {
    id: 'line',
    name: 'LINE',
    icon: 'line',
    category: 'messaging',
    priority: 'low'
  },
  {
    id: 'viber',
    name: 'Viber',
    icon: 'viber',
    category: 'messaging',
    priority: 'low'
  },
  {
    id: 'kik',
    name: 'Kik',
    icon: 'kik',
    category: 'messaging',
    priority: 'low'
  },

  // LOW PRIORITY - Photo/Video
  {
    id: 'vsco',
    name: 'VSCO',
    icon: 'vsco',
    category: 'photo_video',
    priority: 'low'
  },
  {
    id: '500px',
    name: '500px',
    icon: '500px',
    category: 'photo_video',
    priority: 'low'
  },
  {
    id: 'unsplash',
    name: 'Unsplash',
    icon: 'unsplash',
    category: 'photo_video',
    priority: 'low'
  },
  {
    id: 'pexels',
    name: 'Pexels',
    icon: 'pexels',
    category: 'photo_video',
    priority: 'low'
  },
  {
    id: 'imgur',
    name: 'Imgur',
    icon: 'imgur',
    category: 'photo_video',
    priority: 'low'
  },

  // LOW PRIORITY - Finance
  {
    id: 'robinhood',
    name: 'Robinhood',
    icon: 'robinhood',
    category: 'finance',
    priority: 'low'
  },
  {
    id: 'coinbase',
    name: 'Coinbase',
    icon: 'coinbase',
    category: 'finance',
    priority: 'low'
  },
  {
    id: 'kraken',
    name: 'Kraken',
    icon: 'kraken',
    category: 'finance',
    priority: 'low'
  },
  {
    id: 'binance',
    name: 'Binance',
    icon: 'binance',
    category: 'finance',
    priority: 'low'
  },
  {
    id: 'zelle',
    name: 'Zelle',
    category: 'finance',
    priority: 'low'
  },

  // LOW PRIORITY - Other
  {
    id: 'applemusic',
    name: 'Apple Music',
    icon: 'apple',
    category: 'other',
    priority: 'low'
  },
  {
    id: 'letterboxd',
    name: 'Letterboxd',
    icon: 'letterboxd',
    category: 'other',
    priority: 'low'
  },
  {
    id: 'myfitnesspal',
    name: 'MyFitnessPal',
    icon: 'myfitnesspal',
    category: 'other',
    priority: 'low'
  },
  {
    id: 'nike',
    name: 'Nike Run Club',
    icon: 'nike',
    category: 'other',
    priority: 'low'
  },
  {
    id: 'peloton',
    name: 'Peloton',
    icon: 'peloton',
    category: 'other',
    priority: 'low'
  },
  {
    id: 'fitbit',
    name: 'Fitbit',
    icon: 'fitbit',
    category: 'other',
    priority: 'low'
  },
];

export function getPlatform(id: string): Platform | undefined {
  return PLATFORMS.find(p => p.id === id);
}

export function getPlatformsByPriority(priority: Platform['priority']): Platform[] {
  return PLATFORMS.filter(p => p.priority === priority);
}

export function getPlatformsByCategory(category: Platform['category']): Platform[] {
  return PLATFORMS.filter(p => p.category === category);
}

export const PRIORITY_LABELS: Record<Platform['priority'], { emoji: string; label: string }> = {
  highest: { emoji: '🔥', label: 'Highest Priority' },
  high: { emoji: '🔴', label: 'High Priority' },
  medium: { emoji: '🟠', label: 'Medium Priority' },
  low: { emoji: '🟡', label: 'Lower Priority' },
};

export const CATEGORY_LABELS: Record<Platform['category'], string> = {
  social: 'Social Media',
  professional: 'Professional',
  dating: 'Dating',
  gaming: 'Gaming',
  messaging: 'Messaging',
  photo_video: 'Photo & Video',
  forum: 'Forums & Communities',
  shopping: 'Shopping',
  finance: 'Finance',
  other: 'Other',
};
