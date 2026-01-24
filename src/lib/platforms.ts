import { Platform } from './types';

export const PLATFORMS: Platform[] = [
  // HIGHEST PRIORITY (11 platforms) - Most common targets for doxxing
  { id: 'facebook', name: 'Facebook', icon: 'facebook', category: 'social', priority: 'highest', hasBlockParty: true },
  { id: 'instagram', name: 'Instagram', icon: 'instagram', category: 'social', priority: 'highest', hasBlockParty: true },
  { id: 'twitter', name: 'X (Twitter)', icon: 'x', category: 'social', priority: 'highest', hasBlockParty: true },
  { id: 'linkedin', name: 'LinkedIn', icon: 'linkedin', category: 'professional', priority: 'highest', hasBlockParty: true },
  { id: 'tiktok', name: 'TikTok', icon: 'tiktok', category: 'social', priority: 'highest', hasBlockParty: true },
  { id: 'youtube', name: 'YouTube', icon: 'youtube', category: 'photo_video', priority: 'highest' },
  { id: 'reddit', name: 'Reddit', icon: 'reddit', category: 'forum', priority: 'highest' },
  { id: 'google', name: 'Google Account', icon: 'google', category: 'other', priority: 'highest' },
  { id: 'apple', name: 'Apple ID', icon: 'apple', category: 'other', priority: 'highest' },
  { id: 'whatsapp', name: 'WhatsApp', icon: 'whatsapp', category: 'messaging', priority: 'highest' },
  { id: 'snapchat', name: 'Snapchat', icon: 'snapchat', category: 'messaging', priority: 'highest' },

  // HIGH PRIORITY (11 platforms) - Commonly used, significant data exposure
  { id: 'discord', name: 'Discord', icon: 'discord', category: 'messaging', priority: 'high' },
  { id: 'telegram', name: 'Telegram', icon: 'telegram', category: 'messaging', priority: 'high' },
  { id: 'pinterest', name: 'Pinterest', icon: 'pinterest', category: 'social', priority: 'high' },
  { id: 'tumblr', name: 'Tumblr', icon: 'tumblr', category: 'social', priority: 'high' },
  { id: 'venmo', name: 'Venmo', icon: 'venmo', category: 'finance', priority: 'high' },
  { id: 'cashapp', name: 'Cash App', icon: 'cashapp', category: 'finance', priority: 'high' },
  { id: 'paypal', name: 'PayPal', icon: 'paypal', category: 'finance', priority: 'high' },
  { id: 'amazon', name: 'Amazon', icon: 'amazon', category: 'shopping', priority: 'high' },
  { id: 'ebay', name: 'eBay', icon: 'ebay', category: 'shopping', priority: 'high' },
  { id: 'nextdoor', name: 'Nextdoor', icon: 'nextdoor', category: 'social', priority: 'high' },
  { id: 'strava', name: 'Strava', icon: 'strava', category: 'social', priority: 'high' },

  // MEDIUM PRIORITY (26 platforms) - Less common but still significant
  { id: 'twitch', name: 'Twitch', icon: 'twitch', category: 'gaming', priority: 'medium' },
  { id: 'spotify', name: 'Spotify', icon: 'spotify', category: 'other', priority: 'medium' },
  { id: 'soundcloud', name: 'SoundCloud', icon: 'soundcloud', category: 'other', priority: 'medium' },
  { id: 'flickr', name: 'Flickr', icon: 'flickr', category: 'photo_video', priority: 'medium' },
  { id: 'vimeo', name: 'Vimeo', icon: 'vimeo', category: 'photo_video', priority: 'medium' },
  { id: 'quora', name: 'Quora', icon: 'quora', category: 'forum', priority: 'medium' },
  { id: 'medium', name: 'Medium', icon: 'medium', category: 'social', priority: 'medium' },
  { id: 'github', name: 'GitHub', icon: 'github', category: 'professional', priority: 'medium' },
  { id: 'gitlab', name: 'GitLab', icon: 'gitlab', category: 'professional', priority: 'medium' },
  { id: 'stackoverflow', name: 'Stack Overflow', icon: 'stackoverflow', category: 'professional', priority: 'medium' },
  { id: 'behance', name: 'Behance', icon: 'behance', category: 'professional', priority: 'medium' },
  { id: 'dribbble', name: 'Dribbble', icon: 'dribbble', category: 'professional', priority: 'medium' },
  { id: 'deviantart', name: 'DeviantArt', icon: 'deviantart', category: 'social', priority: 'medium' },
  { id: 'goodreads', name: 'Goodreads', icon: 'goodreads', category: 'social', priority: 'medium' },
  { id: 'yelp', name: 'Yelp', icon: 'yelp', category: 'social', priority: 'medium' },
  { id: 'tripadvisor', name: 'Tripadvisor', icon: 'tripadvisor', category: 'social', priority: 'medium' },
  { id: 'airbnb', name: 'Airbnb', icon: 'airbnb', category: 'other', priority: 'medium' },
  { id: 'uber', name: 'Uber', icon: 'uber', category: 'other', priority: 'medium' },
  { id: 'lyft', name: 'Lyft', icon: 'lyft', category: 'other', priority: 'medium' },
  { id: 'doordash', name: 'DoorDash', icon: 'doordash', category: 'other', priority: 'medium' },
  { id: 'grubhub', name: 'Grubhub', icon: 'grubhub', category: 'other', priority: 'medium' },
  { id: 'etsy', name: 'Etsy', icon: 'etsy', category: 'shopping', priority: 'medium' },
  { id: 'poshmark', name: 'Poshmark', icon: 'poshmark', category: 'shopping', priority: 'medium' },
  { id: 'depop', name: 'Depop', icon: 'depop', category: 'shopping', priority: 'medium' },
  { id: 'mercari', name: 'Mercari', category: 'shopping', priority: 'medium' },
  { id: 'offerup', name: 'OfferUp', category: 'shopping', priority: 'medium' },

  // LOW PRIORITY - Dating Apps
  { id: 'tinder', name: 'Tinder', icon: 'tinder', category: 'dating', priority: 'low' },
  { id: 'bumble', name: 'Bumble', icon: 'bumble', category: 'dating', priority: 'low' },
  { id: 'hinge', name: 'Hinge', icon: 'hinge', category: 'dating', priority: 'low' },
  { id: 'okcupid', name: 'OkCupid', icon: 'okcupid', category: 'dating', priority: 'low' },
  { id: 'match', name: 'Match.com', category: 'dating', priority: 'low' },
  { id: 'plentyoffish', name: 'Plenty of Fish', category: 'dating', priority: 'low' },
  { id: 'grindr', name: 'Grindr', icon: 'grindr', category: 'dating', priority: 'low' },
  { id: 'scruff', name: 'Scruff', category: 'dating', priority: 'low' },
  { id: 'her', name: 'HER', category: 'dating', priority: 'low' },
  { id: 'coffee', name: 'Coffee Meets Bagel', category: 'dating', priority: 'low' },

  // LOW PRIORITY - Gaming
  { id: 'steam', name: 'Steam', icon: 'steam', category: 'gaming', priority: 'low' },
  { id: 'xbox', name: 'Xbox Live', icon: 'xbox', category: 'gaming', priority: 'low' },
  { id: 'playstation', name: 'PlayStation Network', icon: 'playstation', category: 'gaming', priority: 'low' },
  { id: 'nintendo', name: 'Nintendo Account', icon: 'nintendo', category: 'gaming', priority: 'low' },
  { id: 'epicgames', name: 'Epic Games', icon: 'epicgames', category: 'gaming', priority: 'low' },
  { id: 'battlenet', name: 'Battle.net', icon: 'battlenet', category: 'gaming', priority: 'low' },
  { id: 'origin', name: 'EA / Origin', icon: 'ea', category: 'gaming', priority: 'low' },
  { id: 'ubisoft', name: 'Ubisoft Connect', icon: 'ubisoft', category: 'gaming', priority: 'low' },
  { id: 'roblox', name: 'Roblox', icon: 'roblox', category: 'gaming', priority: 'low' },
  { id: 'minecraft', name: 'Minecraft', icon: 'minecraft', category: 'gaming', priority: 'low' },

  // LOW PRIORITY - Professional/Work
  { id: 'slack', name: 'Slack', icon: 'slack', category: 'professional', priority: 'low' },
  { id: 'zoom', name: 'Zoom', icon: 'zoom', category: 'professional', priority: 'low' },
  { id: 'notion', name: 'Notion', icon: 'notion', category: 'professional', priority: 'low' },
  { id: 'figma', name: 'Figma', icon: 'figma', category: 'professional', priority: 'low' },
  { id: 'canva', name: 'Canva', icon: 'canva', category: 'professional', priority: 'low' },
  { id: 'trello', name: 'Trello', icon: 'trello', category: 'professional', priority: 'low' },
  { id: 'asana', name: 'Asana', icon: 'asana', category: 'professional', priority: 'low' },
  { id: 'dropbox', name: 'Dropbox', icon: 'dropbox', category: 'professional', priority: 'low' },
  { id: 'evernote', name: 'Evernote', icon: 'evernote', category: 'professional', priority: 'low' },
  { id: 'todoist', name: 'Todoist', icon: 'todoist', category: 'professional', priority: 'low' },

  // LOW PRIORITY - Forums/Communities
  { id: 'hackernews', name: 'Hacker News', icon: 'ycombinator', category: 'forum', priority: 'low' },
  { id: 'producthunt', name: 'Product Hunt', icon: 'producthunt', category: 'forum', priority: 'low' },
  { id: 'slashdot', name: 'Slashdot', category: 'forum', priority: 'low' },
  { id: 'voat', name: 'Voat', category: 'forum', priority: 'low' },
  { id: '4chan', name: '4chan', icon: '4chan', category: 'forum', priority: 'low' },
  { id: 'kiwifarms', name: 'Kiwi Farms', category: 'forum', priority: 'low' },

  // LOW PRIORITY - Messaging
  { id: 'signal', name: 'Signal', icon: 'signal', category: 'messaging', priority: 'low' },
  { id: 'wechat', name: 'WeChat', icon: 'wechat', category: 'messaging', priority: 'low' },
  { id: 'line', name: 'LINE', icon: 'line', category: 'messaging', priority: 'low' },
  { id: 'viber', name: 'Viber', icon: 'viber', category: 'messaging', priority: 'low' },
  { id: 'kik', name: 'Kik', icon: 'kik', category: 'messaging', priority: 'low' },

  // LOW PRIORITY - Photo/Video
  { id: 'vsco', name: 'VSCO', icon: 'vsco', category: 'photo_video', priority: 'low' },
  { id: '500px', name: '500px', icon: '500px', category: 'photo_video', priority: 'low' },
  { id: 'unsplash', name: 'Unsplash', icon: 'unsplash', category: 'photo_video', priority: 'low' },
  { id: 'pexels', name: 'Pexels', icon: 'pexels', category: 'photo_video', priority: 'low' },
  { id: 'imgur', name: 'Imgur', icon: 'imgur', category: 'photo_video', priority: 'low' },

  // LOW PRIORITY - Finance
  { id: 'robinhood', name: 'Robinhood', icon: 'robinhood', category: 'finance', priority: 'low' },
  { id: 'coinbase', name: 'Coinbase', icon: 'coinbase', category: 'finance', priority: 'low' },
  { id: 'kraken', name: 'Kraken', icon: 'kraken', category: 'finance', priority: 'low' },
  { id: 'binance', name: 'Binance', icon: 'binance', category: 'finance', priority: 'low' },
  { id: 'zelle', name: 'Zelle', category: 'finance', priority: 'low' },

  // LOW PRIORITY - Other
  { id: 'duolingo', name: 'Duolingo', icon: 'duolingo', category: 'other', priority: 'low' },
  { id: 'letterboxd', name: 'Letterboxd', icon: 'letterboxd', category: 'other', priority: 'low' },
  { id: 'lastfm', name: 'Last.fm', icon: 'lastdotfm', category: 'other', priority: 'low' },
  { id: 'myfitnesspal', name: 'MyFitnessPal', icon: 'myfitnesspal', category: 'other', priority: 'low' },
  { id: 'nike', name: 'Nike Run Club', icon: 'nike', category: 'other', priority: 'low' },
  { id: 'peloton', name: 'Peloton', icon: 'peloton', category: 'other', priority: 'low' },
  { id: 'fitbit', name: 'Fitbit', icon: 'fitbit', category: 'other', priority: 'low' },
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
