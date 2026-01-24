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
    url: 'https://facebook.com',
    importanceReason: 'Can reveal your social network, location, and photos'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: 'linkedin',
    category: 'professional',
    priority: 'highest',
    hasBlockParty: true,
    url: 'https://linkedin.com',
    importanceReason: 'Can reveal your current employer, location, and social network'
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: 'instagram',
    category: 'social',
    priority: 'medium',
    hasBlockParty: true,
    url: 'https://instagram.com',
    importanceReason: 'Can reveal your social network and location'
  },
  {
    id: 'twitter',
    name: 'X / Twitter',
    icon: 'x',
    category: 'social',
    priority: 'highest',
    hasBlockParty: true,
    url: 'https://x.com',
    importanceReason: 'Can reveal your social network and location'
  },
  {
    id: 'venmo',
    name: 'Venmo',
    icon: 'venmo',
    category: 'finance',
    priority: 'highest',
    hasBlockParty: true,
    url: 'https://venmo.com',
    importanceReason: 'Can reveal where you most frequently spend time and your activities'
  },
  {
    id: 'google',
    name: 'Google Account',
    icon: 'google',
    category: 'other',
    priority: 'medium',
    hasBlockParty: true,
    url: 'https://myaccount.google.com',
    importanceReason: 'Can reveal your profile picture and make it easier to identify you on other platforms'
  },
  {
    id: 'googlemaps',
    name: 'Google Maps Reviews',
    icon: 'google',
    category: 'other',
    priority: 'highest',
    hasBlockParty: true,
    url: 'https://maps.google.com',
    importanceReason: 'Reviews can reveal where you live and visit'
  },
  {
    id: 'reddit',
    name: 'Reddit',
    icon: 'reddit',
    category: 'forum',
    priority: 'highest',
    hasBlockParty: true,
    url: 'https://reddit.com',
    importanceReason: 'Can reveal your interests and community memberships'
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: 'youtube',
    category: 'photo_video',
    priority: 'highest',
    hasBlockParty: true,
    url: 'https://youtube.com',
    importanceReason: 'Can reveal your interests and possibly your location'
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: 'tiktok',
    category: 'social',
    priority: 'highest',
    hasBlockParty: true,
    url: 'https://tiktok.com',
    importanceReason: 'Can reveal location and social network'
  },
  {
    id: 'snapchat',
    name: 'SnapChat',
    icon: 'snapchat',
    category: 'messaging',
    priority: 'highest',
    hasBlockParty: true,
    url: 'https://snapchat.com',
    importanceReason: 'Can reveal location and social network'
  },
  {
    id: 'bluesky',
    name: 'Bluesky',
    icon: 'bluesky',
    category: 'social',
    priority: 'highest',
    hasBlockParty: true,
    url: 'https://bsky.app',
    importanceReason: 'Can reveal location and social network'
  },
  {
    id: 'strava',
    name: 'Strava',
    icon: 'strava',
    category: 'social',
    priority: 'highest',
    hasBlockParty: true,
    url: 'https://strava.com',
    importanceReason: 'Can reveal your home address through activity patterns'
  },

  // 🔴 HIGH PRIORITY
  {
    id: 'partiful',
    name: 'Partiful',
    category: 'other',
    priority: 'high',
    url: 'https://partiful.com',
    importanceReason: 'Past events can reveal your address and friends'
  },
  {
    id: 'yelp',
    name: 'Yelp',
    icon: 'yelp',
    category: 'social',
    priority: 'high',
    url: 'https://yelp.com',
    importanceReason: 'Reveals where you\'re living and visiting'
  },
  {
    id: 'gofundme',
    name: 'GoFundMe',
    category: 'other',
    priority: 'high',
    url: 'https://gofundme.com',
    importanceReason: 'Can reveal people you\'re close to and where you live'
  },
  {
    id: 'chuffed',
    name: 'Chuffed',
    category: 'other',
    priority: 'high',
    url: 'https://chuffed.org',
    importanceReason: 'Can reveal your location and social network'
  },
  {
    id: 'flickr',
    name: 'Flickr',
    icon: 'flickr',
    category: 'photo_video',
    priority: 'high',
    url: 'https://flickr.com',
    importanceReason: 'Photos can reveal where you live directly through geotagging or indirectly by what is in them'
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: 'whatsapp',
    category: 'messaging',
    priority: 'high',
    url: 'https://whatsapp.com'
  },
  {
    id: 'nextdoor',
    name: 'Nextdoor',
    icon: 'nextdoor',
    category: 'social',
    priority: 'high',
    url: 'https://nextdoor.com',
    importanceReason: 'Can reveal where you live and who you interact with'
  },
  {
    id: 'alltrails',
    name: 'AllTrails',
    category: 'other',
    priority: 'high',
    url: 'https://alltrails.com',
    importanceReason: 'Can reveal the region you live in and your activity patterns'
  },
  {
    id: 'medium',
    name: 'Medium',
    icon: 'medium',
    category: 'social',
    priority: 'high',
    url: 'https://medium.com',
    importanceReason: 'Can reveal who you follow (likely your social network). Profile might have location.'
  },
  {
    id: 'mapmyrun',
    name: 'MapMyRun',
    category: 'other',
    priority: 'high',
    url: 'https://mapmyrun.com',
    importanceReason: 'Can reveal where you spend time or where you live'
  },
  {
    id: 'ancestry',
    name: 'Ancestry.com',
    category: 'other',
    priority: 'high',
    url: 'https://ancestry.com',
    importanceReason: 'Can reveal your family connections, which puts them at risk'
  },
  {
    id: 'haveibeenpwned',
    name: 'haveibeenpwned',
    category: 'other',
    priority: 'medium',
    url: 'https://haveibeenpwned.com',
    importanceReason: 'Your data is almost certiantly on there. Opting out can help hide what services you use that have had a password breach in the past.'
  },

  // 🟠 MEDIUM PRIORITY
  {
    id: 'spotify',
    name: 'Spotify',
    icon: 'spotify',
    category: 'other',
    priority: 'medium',
    url: 'https://spotify.com',
    importanceReason: 'Can reveal your interests, can display when you\'re online'
  },
  {
    id: 'substack',
    name: 'Substack',
    category: 'social',
    priority: 'medium',
    url: 'https://substack.com',
    importanceReason: 'Can reveal who you follow. Profile might have location.'
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: 'paypal',
    category: 'finance',
    priority: 'medium',
    url: 'https://paypal.com',
    importanceReason: 'Your PayPal.me link can list your location'
  },
  {
    id: 'airbnb',
    name: 'Airbnb',
    icon: 'airbnb',
    category: 'other',
    priority: 'medium',
    url: 'https://airbnb.com',
    importanceReason: 'Can reveal where you visit and when'
  },
  {
    id: 'amazon',
    name: 'Amazon',
    icon: 'amazon',
    category: 'shopping',
    priority: 'medium',
    url: 'https://amazon.com',
    importanceReason: 'Public reviews can reveal information about you'
  },
  {
    id: 'goodreads',
    name: 'Goodreads',
    icon: 'goodreads',
    category: 'social',
    priority: 'medium',
    url: 'https://goodreads.com',
    importanceReason: 'Reviews and ratings tell a lot about your interests and opinions'
  },
  {
    id: 'etsy',
    name: 'Etsy',
    icon: 'etsy',
    category: 'shopping',
    priority: 'medium',
    url: 'https://etsy.com',
    importanceReason: 'Has a "findable by email address" privacy setting that you want to disable'
  },
  {
    id: 'gravatar',
    name: 'Gravatar',
    category: 'other',
    priority: 'medium',
    url: 'https://gravatar.com',
    importanceReason: 'Can reveal your real photo'
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    icon: 'pinterest',
    category: 'social',
    priority: 'medium',
    url: 'https://pinterest.com',
    importanceReason: 'Can reveal your interests. You can hide your public profile entirely in settings.'
  },
  {
    id: 'eventbrite',
    name: 'Eventbrite',
    category: 'other',
    priority: 'medium',
    url: 'https://eventbrite.com',
    importanceReason: 'Some events show a "who\'s going" list that could have your full name and profile picture. Might want to keep your real first name and last initial.'
  },
  {
    id: 'signal',
    name: 'Signal',
    icon: 'signal',
    category: 'messaging',
    priority: 'medium',
    url: 'https://signal.org',
    importanceReason: 'Settings guide. You can set your phone number to not be discoverable if needed. This will make it harder for people to find you, but increase your privacy. Your choice.'
  },
  {
    id: 'discord',
    name: 'Discord',
    icon: 'discord',
    category: 'messaging',
    priority: 'medium',
    url: 'https://discord.com',
    importanceReason: 'Can reveal your online status, server memberships, profile info, location'
  },
  {
    id: 'threads',
    name: 'Threads',
    category: 'social',
    priority: 'medium',
    url: 'https://threads.net',
    importanceReason: 'Can reveal your social network and location'
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: 'github',
    category: 'professional',
    priority: 'medium',
    url: 'https://github.com',
    importanceReason: 'Can reveal your employer info and shows times you\'re online'
  },
  {
    id: 'telegram',
    name: 'Telegram',
    icon: 'telegram',
    category: 'messaging',
    priority: 'medium',
    url: 'https://telegram.org',
    importanceReason: 'Can reveal your phone number, profile photo, online status'
  },
  {
    id: 'tumblr',
    name: 'Tumblr',
    icon: 'tumblr',
    category: 'social',
    priority: 'medium',
    url: 'https://tumblr.com',
    importanceReason: 'Can reveal your social network and location'
  },
  {
    id: 'patreon',
    name: 'Patreon',
    category: 'other',
    priority: 'medium',
    url: 'https://patreon.com',
    importanceReason: 'Can reveal your support history and interests'
  },
  {
    id: 'tripadvisor',
    name: 'TripAdvisor',
    icon: 'tripadvisor',
    category: 'social',
    priority: 'medium',
    url: 'https://tripadvisor.com',
    importanceReason: 'Can reveal your travel patterns and interests'
  },
  {
    id: 'vimeo',
    name: 'Vimeo',
    icon: 'vimeo',
    category: 'photo_video',
    priority: 'medium',
    url: 'https://vimeo.com',
    importanceReason: 'Can reveal your interests'
  },
  {
    id: 'ebay',
    name: 'eBay',
    icon: 'ebay',
    category: 'shopping',
    priority: 'medium',
    url: 'https://ebay.com',
    importanceReason: 'Can reveal your purchase history and location'
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    icon: 'dropbox',
    category: 'professional',
    priority: 'medium',
    url: 'https://dropbox.com',
    importanceReason: 'Can reveal your profile picture'
  },
  {
    id: 'upwork',
    name: 'Upwork',
    category: 'professional',
    priority: 'medium',
    url: 'https://upwork.com',
    importanceReason: 'Can reveal your location'
  },
  {
    id: 'canva',
    name: 'Canva',
    icon: 'canva',
    category: 'professional',
    priority: 'medium',
    url: 'https://canva.com',
    importanceReason: 'The metadata on files you save can reveal your name or username. Change this setting.'
  },
  {
    id: 'disqus',
    name: 'Disqus',
    category: 'other',
    priority: 'medium',
    url: 'https://disqus.com',
    importanceReason: 'This comment system runs on many sites across the internet so you might use it without knowing. Your comment history could reaveal information.'
  },

  // Extra platforms moved to medium priority
  {
    id: 'twitch',
    name: 'Twitch',
    icon: 'twitch',
    category: 'gaming',
    priority: 'medium',
    url: 'https://twitch.tv'
  },
  {
    id: 'soundcloud',
    name: 'SoundCloud',
    icon: 'soundcloud',
    category: 'other',
    priority: 'medium',
    url: 'https://soundcloud.com'
  },
  {
    id: 'quora',
    name: 'Quora',
    icon: 'quora',
    category: 'forum',
    priority: 'medium',
    url: 'https://quora.com'
  },
  {
    id: 'gitlab',
    name: 'GitLab',
    icon: 'gitlab',
    category: 'professional',
    priority: 'medium',
    url: 'https://gitlab.com'
  },
  {
    id: 'stackoverflow',
    name: 'Stack Overflow',
    icon: 'stackoverflow',
    category: 'professional',
    priority: 'medium',
    url: 'https://stackoverflow.com'
  },
  {
    id: 'behance',
    name: 'Behance',
    icon: 'behance',
    category: 'professional',
    priority: 'medium',
    url: 'https://behance.net'
  },
  {
    id: 'dribbble',
    name: 'Dribbble',
    icon: 'dribbble',
    category: 'professional',
    priority: 'medium',
    url: 'https://dribbble.com'
  },
  {
    id: 'deviantart',
    name: 'DeviantArt',
    icon: 'deviantart',
    category: 'social',
    priority: 'medium',
    url: 'https://deviantart.com'
  },
  {
    id: 'uber',
    name: 'Uber',
    icon: 'uber',
    category: 'other',
    priority: 'medium',
    url: 'https://uber.com'
  },
  {
    id: 'lyft',
    name: 'Lyft',
    icon: 'lyft',
    category: 'other',
    priority: 'medium',
    url: 'https://lyft.com'
  },
  {
    id: 'doordash',
    name: 'DoorDash',
    icon: 'doordash',
    category: 'other',
    priority: 'medium',
    url: 'https://doordash.com'
  },
  {
    id: 'grubhub',
    name: 'Grubhub',
    icon: 'grubhub',
    category: 'other',
    priority: 'medium',
    url: 'https://grubhub.com'
  },
  {
    id: 'poshmark',
    name: 'Poshmark',
    icon: 'poshmark',
    category: 'shopping',
    priority: 'medium',
    url: 'https://poshmark.com'
  },
  {
    id: 'depop',
    name: 'Depop',
    icon: 'depop',
    category: 'shopping',
    priority: 'medium',
    url: 'https://depop.com'
  },
  {
    id: 'mercari',
    name: 'Mercari',
    category: 'shopping',
    priority: 'medium',
    url: 'https://mercari.com'
  },
  {
    id: 'offerup',
    name: 'OfferUp',
    category: 'shopping',
    priority: 'medium',
    url: 'https://offerup.com'
  },

  // 🟡 LOW PRIORITY
  {
    id: 'applepodcast',
    name: 'Apple Podcast Reviews',
    icon: 'apple',
    category: 'other',
    priority: 'low',
    url: 'https://podcasts.apple.com',
    importanceReason: 'Reveals interests'
  },
  {
    id: 'mastodon',
    name: 'Mastodon',
    category: 'social',
    priority: 'low',
    url: 'https://mastodon.social'
  },
  {
    id: 'cashapp',
    name: 'Cash App',
    icon: 'cashapp',
    category: 'finance',
    priority: 'low',
    url: 'https://cash.app',
    importanceReason: 'Can reveal your profile picture'
  },
  {
    id: 'duolingo',
    name: 'Duolingo',
    icon: 'duolingo',
    category: 'other',
    priority: 'low',
    url: 'https://duolingo.com',
    importanceReason: 'Can reveal your location'
  },
  {
    id: 'lastfm',
    name: 'Last.fm',
    icon: 'lastdotfm',
    category: 'other',
    priority: 'low',
    url: 'https://last.fm',
    importanceReason: 'Could reveal when you\'re online'
  },
  {
    id: 'fiverr',
    name: 'Fiverr',
    category: 'other',
    priority: 'low',
    url: 'https://fiverr.com'
  },
  {
    id: 'geocaching',
    name: 'Geocaching',
    category: 'other',
    priority: 'low',
    url: 'https://geocaching.com'
  },
  {
    id: 'indiegogo',
    name: 'Indiegogo',
    category: 'other',
    priority: 'low',
    url: 'https://indiegogo.com',
    importanceReason: 'Reveals people you\'re close to'
  },
  {
    id: 'kickstarter',
    name: 'Kickstarter',
    category: 'other',
    priority: 'low',
    url: 'https://kickstarter.com'
  },
  {
    id: 'stackexchange',
    name: 'Stack Exchange',
    category: 'forum',
    priority: 'low',
    url: 'https://stackexchange.com'
  },
  {
    id: 'wechat',
    name: 'WeChat',
    icon: 'wechat',
    category: 'messaging',
    priority: 'low',
    url: 'https://wechat.com'
  },
  {
    id: 'bandcamp',
    name: 'Bandcamp',
    category: 'other',
    priority: 'low',
    url: 'https://bandcamp.com'
  },
  {
    id: 'hackernews',
    name: 'Hacker News',
    icon: 'ycombinator',
    category: 'forum',
    priority: 'low',
    url: 'https://news.ycombinator.com'
  },
  {
    id: 'glassdoor',
    name: 'Glassdoor',
    category: 'professional',
    priority: 'low',
    url: 'https://glassdoor.com'
  },
  {
    id: 'opentable',
    name: 'OpenTable',
    category: 'other',
    priority: 'low',
    url: 'https://opentable.com'
  },
  {
    id: 'costar',
    name: 'Co-Star',
    category: 'other',
    priority: 'low',
    url: 'https://costarastrology.com',
    importanceReason: 'Can reveal your birthday which can be used to get access to other accounts'
  },
  {
    id: 'ultimateguitar',
    name: 'UltimateGuitar',
    category: 'other',
    priority: 'low',
    url: 'https://ultimate-guitar.com'
  },
  {
    id: 'somethingawesome',
    name: 'SomethingAwesome',
    category: 'other',
    priority: 'low',
    url: 'https://somethingawful.com'
  },
  {
    id: 'mountainproject',
    name: 'Mountain Project',
    category: 'other',
    priority: 'low',
    url: 'https://mountainproject.com',
    importanceReason: 'Can reveral your friends and possibly where you live'
  },

  // LOW PRIORITY - Dating Apps
  {
    id: 'tinder',
    name: 'Tinder',
    icon: 'tinder',
    category: 'dating',
    priority: 'low',
    url: 'https://tinder.com'
  },
  {
    id: 'bumble',
    name: 'Bumble',
    icon: 'bumble',
    category: 'dating',
    priority: 'low',
    url: 'https://bumble.com'
  },
  {
    id: 'hinge',
    name: 'Hinge',
    icon: 'hinge',
    category: 'dating',
    priority: 'low',
    url: 'https://hinge.co'
  },
  {
    id: 'okcupid',
    name: 'OkCupid',
    icon: 'okcupid',
    category: 'dating',
    priority: 'low',
    url: 'https://okcupid.com'
  },
  {
    id: 'match',
    name: 'Match.com',
    category: 'dating',
    priority: 'low',
    url: 'https://match.com'
  },
  {
    id: 'plentyoffish',
    name: 'Plenty of Fish',
    category: 'dating',
    priority: 'low',
    url: 'https://pof.com'
  },
  {
    id: 'grindr',
    name: 'Grindr',
    icon: 'grindr',
    category: 'dating',
    priority: 'low',
    url: 'https://grindr.com'
  },
  {
    id: 'scruff',
    name: 'Scruff',
    category: 'dating',
    priority: 'low',
    url: 'https://scruff.com'
  },
  {
    id: 'her',
    name: 'HER',
    category: 'dating',
    priority: 'low',
    url: 'https://weareher.com'
  },
  {
    id: 'coffee',
    name: 'Coffee Meets Bagel',
    category: 'dating',
    priority: 'low',
    url: 'https://coffeemeetsbagel.com'
  },

  // LOW PRIORITY - Gaming
  {
    id: 'steam',
    name: 'Steam',
    icon: 'steam',
    category: 'gaming',
    priority: 'low',
    url: 'https://store.steampowered.com'
  },
  {
    id: 'xbox',
    name: 'Xbox Live',
    icon: 'xbox',
    category: 'gaming',
    priority: 'low',
    url: 'https://xbox.com'
  },
  {
    id: 'playstation',
    name: 'PlayStation Network',
    icon: 'playstation',
    category: 'gaming',
    priority: 'low',
    url: 'https://playstation.com'
  },
  {
    id: 'nintendo',
    name: 'Nintendo Account',
    icon: 'nintendo',
    category: 'gaming',
    priority: 'low',
    url: 'https://nintendo.com'
  },
  {
    id: 'epicgames',
    name: 'Epic Games',
    icon: 'epicgames',
    category: 'gaming',
    priority: 'low',
    url: 'https://epicgames.com'
  },
  {
    id: 'battlenet',
    name: 'Battle.net',
    icon: 'battlenet',
    category: 'gaming',
    priority: 'low',
    url: 'https://battle.net'
  },
  {
    id: 'origin',
    name: 'EA / Origin',
    icon: 'ea',
    category: 'gaming',
    priority: 'low',
    url: 'https://ea.com'
  },
  {
    id: 'ubisoft',
    name: 'Ubisoft Connect',
    icon: 'ubisoft',
    category: 'gaming',
    priority: 'low',
    url: 'https://ubisoft.com'
  },
  {
    id: 'roblox',
    name: 'Roblox',
    icon: 'roblox',
    category: 'gaming',
    priority: 'low',
    url: 'https://roblox.com'
  },
  {
    id: 'minecraft',
    name: 'Minecraft',
    icon: 'minecraft',
    category: 'gaming',
    priority: 'low',
    url: 'https://minecraft.net'
  },

  // LOW PRIORITY - Professional/Work
  {
    id: 'slack',
    name: 'Slack',
    icon: 'slack',
    category: 'professional',
    priority: 'low',
    url: 'https://slack.com'
  },
  {
    id: 'zoom',
    name: 'Zoom',
    icon: 'zoom',
    category: 'professional',
    priority: 'low',
    url: 'https://zoom.us'
  },
  {
    id: 'notion',
    name: 'Notion',
    icon: 'notion',
    category: 'professional',
    priority: 'low',
    url: 'https://notion.so'
  },
  {
    id: 'figma',
    name: 'Figma',
    icon: 'figma',
    category: 'professional',
    priority: 'low',
    url: 'https://figma.com'
  },
  {
    id: 'trello',
    name: 'Trello',
    icon: 'trello',
    category: 'professional',
    priority: 'low',
    url: 'https://trello.com'
  },
  {
    id: 'asana',
    name: 'Asana',
    icon: 'asana',
    category: 'professional',
    priority: 'low',
    url: 'https://asana.com'
  },
  {
    id: 'evernote',
    name: 'Evernote',
    icon: 'evernote',
    category: 'professional',
    priority: 'low',
    url: 'https://evernote.com'
  },
  {
    id: 'todoist',
    name: 'Todoist',
    icon: 'todoist',
    category: 'professional',
    priority: 'low',
    url: 'https://todoist.com'
  },

  // LOW PRIORITY - Forums/Communities
  {
    id: 'producthunt',
    name: 'Product Hunt',
    icon: 'producthunt',
    category: 'forum',
    priority: 'low',
    url: 'https://producthunt.com'
  },
  {
    id: 'slashdot',
    name: 'Slashdot',
    category: 'forum',
    priority: 'low',
    url: 'https://slashdot.org'
  },
  {
    id: 'voat',
    name: 'Voat',
    category: 'forum',
    priority: 'low',
    url: 'https://voat.co'
  },
  {
    id: '4chan',
    name: '4chan',
    icon: '4chan',
    category: 'forum',
    priority: 'low',
    url: 'https://4chan.org'
  },
  {
    id: 'kiwifarms',
    name: 'Kiwi Farms',
    category: 'forum',
    priority: 'low',
    url: 'https://kiwifarms.net'
  },

  // LOW PRIORITY - Messaging
  {
    id: 'line',
    name: 'LINE',
    icon: 'line',
    category: 'messaging',
    priority: 'low',
    url: 'https://line.me'
  },
  {
    id: 'viber',
    name: 'Viber',
    icon: 'viber',
    category: 'messaging',
    priority: 'low',
    url: 'https://viber.com'
  },
  {
    id: 'kik',
    name: 'Kik',
    icon: 'kik',
    category: 'messaging',
    priority: 'low',
    url: 'https://kik.com'
  },

  // LOW PRIORITY - Photo/Video
  {
    id: 'vsco',
    name: 'VSCO',
    icon: 'vsco',
    category: 'photo_video',
    priority: 'low',
    url: 'https://vsco.co'
  },
  {
    id: '500px',
    name: '500px',
    icon: '500px',
    category: 'photo_video',
    priority: 'low',
    url: 'https://500px.com'
  },
  {
    id: 'unsplash',
    name: 'Unsplash',
    icon: 'unsplash',
    category: 'photo_video',
    priority: 'low',
    url: 'https://unsplash.com'
  },
  {
    id: 'pexels',
    name: 'Pexels',
    icon: 'pexels',
    category: 'photo_video',
    priority: 'low',
    url: 'https://pexels.com'
  },
  {
    id: 'imgur',
    name: 'Imgur',
    icon: 'imgur',
    category: 'photo_video',
    priority: 'low',
    url: 'https://imgur.com'
  },

  // LOW PRIORITY - Finance
  {
    id: 'robinhood',
    name: 'Robinhood',
    icon: 'robinhood',
    category: 'finance',
    priority: 'low',
    url: 'https://robinhood.com'
  },
  {
    id: 'coinbase',
    name: 'Coinbase',
    icon: 'coinbase',
    category: 'finance',
    priority: 'low',
    url: 'https://coinbase.com'
  },
  {
    id: 'kraken',
    name: 'Kraken',
    icon: 'kraken',
    category: 'finance',
    priority: 'low',
    url: 'https://kraken.com'
  },
  {
    id: 'binance',
    name: 'Binance',
    icon: 'binance',
    category: 'finance',
    priority: 'low',
    url: 'https://binance.com'
  },
  {
    id: 'zelle',
    name: 'Zelle',
    category: 'finance',
    priority: 'low',
    url: 'https://zellepay.com'
  },

  // LOW PRIORITY - Other
  {
    id: 'applemusic',
    name: 'Apple Music',
    icon: 'apple',
    category: 'other',
    priority: 'low',
    url: 'https://music.apple.com'
  },
  {
    id: 'letterboxd',
    name: 'Letterboxd',
    icon: 'letterboxd',
    category: 'other',
    priority: 'low',
    url: 'https://letterboxd.com'
  },
  {
    id: 'myfitnesspal',
    name: 'MyFitnessPal',
    icon: 'myfitnesspal',
    category: 'other',
    priority: 'low',
    url: 'https://myfitnesspal.com'
  },
  {
    id: 'nike',
    name: 'Nike Run Club',
    icon: 'nike',
    category: 'other',
    priority: 'low',
    url: 'https://nike.com/nrc-app'
  },
  {
    id: 'peloton',
    name: 'Peloton',
    icon: 'peloton',
    category: 'other',
    priority: 'low',
    url: 'https://onepeloton.com'
  },
  {
    id: 'fitbit',
    name: 'Fitbit',
    icon: 'fitbit',
    category: 'other',
    priority: 'low',
    url: 'https://fitbit.com'
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
