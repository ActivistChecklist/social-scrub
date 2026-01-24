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
    url: 'https://whatsapp.com',
    importanceReason: 'Can reveal your phone number and profile photo to contacts'
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
    url: 'https://twitch.tv',
    importanceReason: 'Can reveal your online activity, interests, and social connections'
  },
  {
    id: 'soundcloud',
    name: 'SoundCloud',
    icon: 'soundcloud',
    category: 'other',
    priority: 'medium',
    url: 'https://soundcloud.com',
    importanceReason: 'Can reveal your music interests and listening activity'
  },
  {
    id: 'quora',
    name: 'Quora',
    icon: 'quora',
    category: 'forum',
    priority: 'medium',
    url: 'https://quora.com',
    importanceReason: 'Your questions and answers can reveal personal details and opinions'
  },
  {
    id: 'gitlab',
    name: 'GitLab',
    icon: 'gitlab',
    category: 'professional',
    priority: 'medium',
    url: 'https://gitlab.com',
    importanceReason: 'Can reveal your work history and when you are active'
  },
  {
    id: 'stackoverflow',
    name: 'Stack Overflow',
    icon: 'stackoverflow',
    category: 'professional',
    priority: 'medium',
    url: 'https://stackoverflow.com',
    importanceReason: 'Can reveal your technical skills and work details'
  },
  {
    id: 'behance',
    name: 'Behance',
    icon: 'behance',
    category: 'professional',
    priority: 'medium',
    url: 'https://behance.net',
    importanceReason: 'Can reveal your work and professional identity'
  },
  {
    id: 'dribbble',
    name: 'Dribbble',
    icon: 'dribbble',
    category: 'professional',
    priority: 'medium',
    url: 'https://dribbble.com',
    importanceReason: 'Can reveal your work and professional identity'
  },
  {
    id: 'deviantart',
    name: 'DeviantArt',
    icon: 'deviantart',
    category: 'social',
    priority: 'medium',
    url: 'https://deviantart.com',
    importanceReason: 'Can reveal your creative work and interests'
  },
  {
    id: 'uber',
    name: 'Uber',
    icon: 'uber',
    category: 'other',
    priority: 'medium',
    url: 'https://uber.com',
    importanceReason: 'Profile and saved addresses can reveal where you live and frequent'
  },
  {
    id: 'lyft',
    name: 'Lyft',
    icon: 'lyft',
    category: 'other',
    priority: 'medium',
    url: 'https://lyft.com',
    importanceReason: 'Profile and saved addresses can reveal where you live and frequent'
  },
  {
    id: 'doordash',
    name: 'DoorDash',
    icon: 'doordash',
    category: 'other',
    priority: 'medium',
    url: 'https://doordash.com',
    importanceReason: 'Saved addresses reveal where you live'
  },
  {
    id: 'grubhub',
    name: 'Grubhub',
    icon: 'grubhub',
    category: 'other',
    priority: 'medium',
    url: 'https://grubhub.com',
    importanceReason: 'Saved addresses reveal where you live'
  },
  {
    id: 'poshmark',
    name: 'Poshmark',
    icon: 'poshmark',
    category: 'shopping',
    priority: 'medium',
    url: 'https://poshmark.com',
    importanceReason: 'Can reveal your location and buying/selling activity'
  },
  {
    id: 'depop',
    name: 'Depop',
    icon: 'depop',
    category: 'shopping',
    priority: 'medium',
    url: 'https://depop.com',
    importanceReason: 'Can reveal your location and buying/selling activity'
  },
  {
    id: 'mercari',
    name: 'Mercari',
    category: 'shopping',
    priority: 'medium',
    url: 'https://mercari.com',
    importanceReason: 'Can reveal your location through listings and meetup preferences'
  },
  {
    id: 'offerup',
    name: 'OfferUp',
    category: 'shopping',
    priority: 'medium',
    url: 'https://offerup.com',
    importanceReason: 'Can reveal your location through listings and meetup preferences'
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
    url: 'https://mastodon.social',
    importanceReason: 'Can reveal your social network and interests'
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
    url: 'https://fiverr.com',
    importanceReason: 'Can reveal your skills and services you offer'
  },
  {
    id: 'geocaching',
    name: 'Geocaching',
    category: 'other',
    priority: 'low',
    url: 'https://geocaching.com',
    importanceReason: 'Activity logs can reveal where you spend time'
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
    url: 'https://kickstarter.com',
    importanceReason: 'Backing history can reveal your interests and connections'
  },
  {
    id: 'stackexchange',
    name: 'Stack Exchange',
    category: 'forum',
    priority: 'low',
    url: 'https://stackexchange.com',
    importanceReason: 'Questions and answers can reveal personal details'
  },
  {
    id: 'wechat',
    name: 'WeChat',
    icon: 'wechat',
    category: 'messaging',
    priority: 'low',
    url: 'https://wechat.com',
    importanceReason: 'Can reveal your phone number and contacts'
  },
  {
    id: 'bandcamp',
    name: 'Bandcamp',
    category: 'other',
    priority: 'low',
    url: 'https://bandcamp.com',
    importanceReason: 'Purchase history and follows can reveal your interests'
  },
  {
    id: 'hackernews',
    name: 'Hacker News',
    icon: 'ycombinator',
    category: 'forum',
    priority: 'low',
    url: 'https://news.ycombinator.com',
    importanceReason: 'Comments can reveal your opinions and technical interests'
  },
  {
    id: 'glassdoor',
    name: 'Glassdoor',
    category: 'professional',
    priority: 'low',
    url: 'https://glassdoor.com',
    importanceReason: 'Reviews can reveal your past employers'
  },
  {
    id: 'opentable',
    name: 'OpenTable',
    category: 'other',
    priority: 'low',
    url: 'https://opentable.com',
    importanceReason: 'Reservations can reveal where you dine'
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
    url: 'https://ultimate-guitar.com',
    importanceReason: 'Can reveal your musical interests'
  },
  {
    id: 'somethingawesome',
    name: 'SomethingAwesome',
    category: 'other',
    priority: 'low',
    url: 'https://somethingawful.com',
    importanceReason: 'Forum posts can reveal personal details and opinions'
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
    url: 'https://tinder.com',
    importanceReason: 'Can reveal your location, photos, and personal details'
  },
  {
    id: 'bumble',
    name: 'Bumble',
    icon: 'bumble',
    category: 'dating',
    priority: 'low',
    url: 'https://bumble.com',
    importanceReason: 'Can reveal your location, photos, and personal details'
  },
  {
    id: 'hinge',
    name: 'Hinge',
    icon: 'hinge',
    category: 'dating',
    priority: 'low',
    url: 'https://hinge.co',
    importanceReason: 'Can reveal your location, photos, and personal details'
  },
  {
    id: 'okcupid',
    name: 'OkCupid',
    icon: 'okcupid',
    category: 'dating',
    priority: 'low',
    url: 'https://okcupid.com',
    importanceReason: 'Can reveal your location, photos, and personal details'
  },
  {
    id: 'match',
    name: 'Match.com',
    category: 'dating',
    priority: 'low',
    url: 'https://match.com',
    importanceReason: 'Can reveal your location, photos, and personal details'
  },
  {
    id: 'plentyoffish',
    name: 'Plenty of Fish',
    category: 'dating',
    priority: 'low',
    url: 'https://pof.com',
    importanceReason: 'Can reveal your location, photos, and personal details'
  },
  {
    id: 'grindr',
    name: 'Grindr',
    icon: 'grindr',
    category: 'dating',
    priority: 'low',
    url: 'https://grindr.com',
    importanceReason: 'Can reveal your precise location and personal details'
  },
  {
    id: 'scruff',
    name: 'Scruff',
    category: 'dating',
    priority: 'low',
    url: 'https://scruff.com',
    importanceReason: 'Can reveal your location and personal details'
  },
  {
    id: 'her',
    name: 'HER',
    category: 'dating',
    priority: 'low',
    url: 'https://weareher.com',
    importanceReason: 'Can reveal your location and personal details'
  },
  {
    id: 'coffee',
    name: 'Coffee Meets Bagel',
    category: 'dating',
    priority: 'low',
    url: 'https://coffeemeetsbagel.com',
    importanceReason: 'Can reveal your location and personal details'
  },

  // LOW PRIORITY - Gaming
  {
    id: 'steam',
    name: 'Steam',
    icon: 'steam',
    category: 'gaming',
    priority: 'low',
    url: 'https://store.steampowered.com',
    importanceReason: 'Can reveal your gaming activity and online status'
  },
  {
    id: 'xbox',
    name: 'Xbox Live',
    icon: 'xbox',
    category: 'gaming',
    priority: 'low',
    url: 'https://xbox.com',
    importanceReason: 'Can reveal your gaming activity and online status'
  },
  {
    id: 'playstation',
    name: 'PlayStation Network',
    icon: 'playstation',
    category: 'gaming',
    priority: 'low',
    url: 'https://playstation.com',
    importanceReason: 'Can reveal your gaming activity and online status'
  },
  {
    id: 'nintendo',
    name: 'Nintendo Account',
    icon: 'nintendo',
    category: 'gaming',
    priority: 'low',
    url: 'https://nintendo.com',
    importanceReason: 'Can reveal your gaming activity and friends list'
  },
  {
    id: 'epicgames',
    name: 'Epic Games',
    icon: 'epicgames',
    category: 'gaming',
    priority: 'low',
    url: 'https://epicgames.com',
    importanceReason: 'Can reveal your gaming activity and online status'
  },
  {
    id: 'battlenet',
    name: 'Battle.net',
    icon: 'battlenet',
    category: 'gaming',
    priority: 'low',
    url: 'https://battle.net',
    importanceReason: 'Can reveal your gaming activity and online status'
  },
  {
    id: 'origin',
    name: 'EA / Origin',
    icon: 'ea',
    category: 'gaming',
    priority: 'low',
    url: 'https://ea.com',
    importanceReason: 'Can reveal your gaming activity and online status'
  },
  {
    id: 'ubisoft',
    name: 'Ubisoft Connect',
    icon: 'ubisoft',
    category: 'gaming',
    priority: 'low',
    url: 'https://ubisoft.com',
    importanceReason: 'Can reveal your gaming activity and online status'
  },
  {
    id: 'roblox',
    name: 'Roblox',
    icon: 'roblox',
    category: 'gaming',
    priority: 'low',
    url: 'https://roblox.com',
    importanceReason: 'Can reveal your gaming activity and friends list'
  },
  {
    id: 'minecraft',
    name: 'Minecraft',
    icon: 'minecraft',
    category: 'gaming',
    priority: 'low',
    url: 'https://minecraft.net',
    importanceReason: 'Can reveal your gaming activity'
  },

  // LOW PRIORITY - Professional/Work
  {
    id: 'slack',
    name: 'Slack',
    icon: 'slack',
    category: 'professional',
    priority: 'low',
    url: 'https://slack.com',
    importanceReason: 'Profile can reveal your employer and display name'
  },
  {
    id: 'zoom',
    name: 'Zoom',
    icon: 'zoom',
    category: 'professional',
    priority: 'low',
    url: 'https://zoom.us',
    importanceReason: 'Profile can reveal your name and photo'
  },
  {
    id: 'notion',
    name: 'Notion',
    icon: 'notion',
    category: 'professional',
    priority: 'low',
    url: 'https://notion.so',
    importanceReason: 'Public pages can reveal your projects and notes'
  },
  {
    id: 'figma',
    name: 'Figma',
    icon: 'figma',
    category: 'professional',
    priority: 'low',
    url: 'https://figma.com',
    importanceReason: 'Profile can reveal your work and employer'
  },
  {
    id: 'trello',
    name: 'Trello',
    icon: 'trello',
    category: 'professional',
    priority: 'low',
    url: 'https://trello.com',
    importanceReason: 'Public boards can reveal your projects'
  },
  {
    id: 'asana',
    name: 'Asana',
    icon: 'asana',
    category: 'professional',
    priority: 'low',
    url: 'https://asana.com',
    importanceReason: 'Profile can reveal your employer and name'
  },
  {
    id: 'evernote',
    name: 'Evernote',
    icon: 'evernote',
    category: 'professional',
    priority: 'low',
    url: 'https://evernote.com',
    importanceReason: 'Public notes can reveal your projects and interests'
  },
  {
    id: 'todoist',
    name: 'Todoist',
    icon: 'todoist',
    category: 'professional',
    priority: 'low',
    url: 'https://todoist.com',
    importanceReason: 'Profile can reveal your name'
  },

  // LOW PRIORITY - Forums/Communities
  {
    id: 'producthunt',
    name: 'Product Hunt',
    icon: 'producthunt',
    category: 'forum',
    priority: 'low',
    url: 'https://producthunt.com',
    importanceReason: 'Can reveal your interests and upvote history'
  },
  {
    id: 'slashdot',
    name: 'Slashdot',
    category: 'forum',
    priority: 'low',
    url: 'https://slashdot.org',
    importanceReason: 'Comments can reveal your opinions and interests'
  },
  {
    id: 'voat',
    name: 'Voat',
    category: 'forum',
    priority: 'low',
    url: 'https://voat.co',
    importanceReason: 'Posts and comments can reveal your opinions'
  },
  {
    id: '4chan',
    name: '4chan',
    icon: '4chan',
    category: 'forum',
    priority: 'low',
    url: 'https://4chan.org',
    importanceReason: 'Posts can be archived and linked to you'
  },
  {
    id: 'kiwifarms',
    name: 'Kiwi Farms',
    category: 'forum',
    priority: 'low',
    url: 'https://kiwifarms.net',
    importanceReason: 'Account can reveal your interests and activity'
  },

  // LOW PRIORITY - Messaging
  {
    id: 'line',
    name: 'LINE',
    icon: 'line',
    category: 'messaging',
    priority: 'low',
    url: 'https://line.me',
    importanceReason: 'Can reveal your phone number and profile photo'
  },
  {
    id: 'viber',
    name: 'Viber',
    icon: 'viber',
    category: 'messaging',
    priority: 'low',
    url: 'https://viber.com',
    importanceReason: 'Can reveal your phone number and profile photo'
  },
  {
    id: 'kik',
    name: 'Kik',
    icon: 'kik',
    category: 'messaging',
    priority: 'low',
    url: 'https://kik.com',
    importanceReason: 'Can reveal your username and profile info'
  },

  // LOW PRIORITY - Photo/Video
  {
    id: 'vsco',
    name: 'VSCO',
    icon: 'vsco',
    category: 'photo_video',
    priority: 'low',
    url: 'https://vsco.co',
    importanceReason: 'Photos can reveal your location and activities'
  },
  {
    id: '500px',
    name: '500px',
    icon: '500px',
    category: 'photo_video',
    priority: 'low',
    url: 'https://500px.com',
    importanceReason: 'Photos and profile can reveal your identity'
  },
  {
    id: 'unsplash',
    name: 'Unsplash',
    icon: 'unsplash',
    category: 'photo_video',
    priority: 'low',
    url: 'https://unsplash.com',
    importanceReason: 'Photos can reveal your location and interests'
  },
  {
    id: 'pexels',
    name: 'Pexels',
    icon: 'pexels',
    category: 'photo_video',
    priority: 'low',
    url: 'https://pexels.com',
    importanceReason: 'Photos can reveal your location and interests'
  },
  {
    id: 'imgur',
    name: 'Imgur',
    icon: 'imgur',
    category: 'photo_video',
    priority: 'low',
    url: 'https://imgur.com',
    importanceReason: 'Images and comments can reveal personal details'
  },

  // LOW PRIORITY - Finance
  {
    id: 'robinhood',
    name: 'Robinhood',
    icon: 'robinhood',
    category: 'finance',
    priority: 'low',
    url: 'https://robinhood.com',
    importanceReason: 'Profile can reveal your name'
  },
  {
    id: 'coinbase',
    name: 'Coinbase',
    icon: 'coinbase',
    category: 'finance',
    priority: 'low',
    url: 'https://coinbase.com',
    importanceReason: 'Profile can reveal your name and photo'
  },
  {
    id: 'kraken',
    name: 'Kraken',
    icon: 'kraken',
    category: 'finance',
    priority: 'low',
    url: 'https://kraken.com',
    importanceReason: 'Profile can reveal your identity'
  },
  {
    id: 'binance',
    name: 'Binance',
    icon: 'binance',
    category: 'finance',
    priority: 'low',
    url: 'https://binance.com',
    importanceReason: 'Profile can reveal your identity'
  },
  {
    id: 'zelle',
    name: 'Zelle',
    category: 'finance',
    priority: 'low',
    url: 'https://zellepay.com',
    importanceReason: 'Connected to your bank and phone number'
  },

  // LOW PRIORITY - Other
  {
    id: 'applemusic',
    name: 'Apple Music',
    icon: 'apple',
    category: 'other',
    priority: 'low',
    url: 'https://music.apple.com',
    importanceReason: 'Profile and playlists can reveal your interests'
  },
  {
    id: 'letterboxd',
    name: 'Letterboxd',
    icon: 'letterboxd',
    category: 'other',
    priority: 'low',
    url: 'https://letterboxd.com',
    importanceReason: 'Reviews and watchlist reveal your interests'
  },
  {
    id: 'myfitnesspal',
    name: 'MyFitnessPal',
    icon: 'myfitnesspal',
    category: 'other',
    priority: 'low',
    url: 'https://myfitnesspal.com',
    importanceReason: 'Profile can reveal personal health information'
  },
  {
    id: 'nike',
    name: 'Nike Run Club',
    icon: 'nike',
    category: 'other',
    priority: 'low',
    url: 'https://nike.com/nrc-app',
    importanceReason: 'Activity can reveal where you run and live'
  },
  {
    id: 'peloton',
    name: 'Peloton',
    icon: 'peloton',
    category: 'other',
    priority: 'low',
    url: 'https://onepeloton.com',
    importanceReason: 'Leaderboard shows your name and activity'
  },
  {
    id: 'fitbit',
    name: 'Fitbit',
    icon: 'fitbit',
    category: 'other',
    priority: 'low',
    url: 'https://fitbit.com',
    importanceReason: 'Profile and activity can reveal personal info'
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
