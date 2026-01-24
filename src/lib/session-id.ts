// Word lists for generating memorable session IDs
// Format: adjective-noun (e.g., "eloquent-butterfly")

const ADJECTIVES = [
  'bold', 'brave', 'bright', 'calm', 'clear', 'clever', 'cool', 'cosmic', 'cozy', 'crisp',
  'daring', 'dazzling', 'deep', 'eager', 'early', 'elegant', 'epic', 'fair', 'fancy', 'fast',
  'fearless', 'fierce', 'fine', 'fleet', 'flowing', 'fluffy', 'flying', 'free', 'fresh', 'friendly',
  'gentle', 'gilded', 'glad', 'gleaming', 'global', 'glowing', 'golden', 'good', 'grand', 'great',
  'happy', 'hardy', 'hasty', 'hearty', 'hidden', 'hollow', 'honest', 'humble', 'icy', 'ideal',
  'jolly', 'jovial', 'joyful', 'keen', 'kind', 'knowing', 'lasting', 'leafy', 'light', 'lively',
  'lucky', 'lunar', 'magic', 'mellow', 'mighty', 'mindful', 'misty', 'modest', 'mystic', 'noble',
  'northern', 'open', 'orange', 'patient', 'peaceful', 'perfect', 'pleasant', 'polite', 'proud', 'pure',
  'quick', 'quiet', 'radiant', 'rapid', 'ready', 'remote', 'restful', 'rising', 'robust', 'rosy',
  'royal', 'rustic', 'safe', 'serene', 'shining', 'silent', 'silver', 'simple', 'skilled', 'sleek',
  'smooth', 'snowy', 'soft', 'solar', 'solid', 'southern', 'sparkling', 'speedy', 'spicy', 'splendid',
  'spotted', 'spring', 'stable', 'starry', 'steady', 'stellar', 'still', 'stormy', 'strong', 'sturdy',
  'subtle', 'summer', 'sunny', 'super', 'sure', 'sweet', 'swift', 'tall', 'tender', 'thorough',
  'tidy', 'tough', 'tranquil', 'trim', 'true', 'trusted', 'urban', 'valued', 'vast', 'velvet',
  'violet', 'vivid', 'warm', 'wary', 'western', 'wild', 'willing', 'windy', 'winter', 'wise',
  'witty', 'worthy', 'young', 'zesty', 'ancient', 'arctic', 'autumn', 'azure', 'coral', 'crystal',
  'dancing', 'dawn', 'distant', 'dusky', 'eastern', 'ember', 'eternal', 'evening', 'fading', 'falling',
  'floating', 'forest', 'frozen', 'gliding', 'harbor', 'ivory', 'jade', 'marble', 'meadow', 'midnight',
  'morning', 'mossy', 'mountain', 'ocean', 'olive', 'onyx', 'opal', 'orchid', 'pearl', 'phantom',
  'prism', 'raven', 'river', 'ruby', 'rusty', 'sage', 'shadow', 'silk', 'slate', 'steam',
];

const NOUNS = [
  'anchor', 'apple', 'arrow', 'atlas', 'badge', 'beacon', 'bear', 'bee', 'bell', 'bird',
  'blade', 'bloom', 'boat', 'bolt', 'book', 'boulder', 'branch', 'breeze', 'bridge', 'brook',
  'brush', 'bubble', 'butterfly', 'cabin', 'cactus', 'candle', 'canyon', 'cape', 'castle', 'cave',
  'cedar', 'cherry', 'cliff', 'cloud', 'clover', 'coast', 'comet', 'compass', 'coral', 'cottage',
  'crane', 'creek', 'crest', 'crow', 'crystal', 'daisy', 'dawn', 'deer', 'delta', 'desert',
  'dolphin', 'dove', 'dragon', 'dream', 'drift', 'dune', 'eagle', 'echo', 'elm', 'ember',
  'falcon', 'fawn', 'feather', 'fern', 'field', 'finch', 'fire', 'flame', 'flower', 'fog',
  'forest', 'fountain', 'fox', 'frost', 'garden', 'gate', 'gem', 'glacier', 'glade', 'glen',
  'grove', 'harbor', 'hare', 'hawk', 'hazel', 'heart', 'heron', 'hill', 'hollow', 'horizon',
  'hound', 'inlet', 'island', 'ivy', 'jade', 'jasper', 'jewel', 'juniper', 'kestrel', 'key',
  'lake', 'lark', 'laurel', 'leaf', 'light', 'lily', 'lion', 'lotus', 'lynx', 'maple',
  'marsh', 'meadow', 'mist', 'moon', 'moss', 'moth', 'mountain', 'nebula', 'nest', 'nova',
  'oak', 'oasis', 'ocean', 'olive', 'onyx', 'opal', 'orbit', 'orchid', 'osprey', 'otter',
  'owl', 'palm', 'panther', 'path', 'peak', 'pearl', 'pebble', 'penguin', 'phoenix', 'pine',
  'plain', 'planet', 'plum', 'pond', 'poppy', 'prism', 'quartz', 'rain', 'raven', 'reef',
  'ridge', 'river', 'robin', 'rock', 'rose', 'ruby', 'sage', 'sail', 'sand', 'sapphire',
  'sea', 'shade', 'shadow', 'shore', 'sky', 'snow', 'spark', 'sparrow', 'spring', 'star',
  'stone', 'storm', 'stream', 'summit', 'sun', 'swallow', 'swan', 'temple', 'thistle', 'thorn',
  'thunder', 'tide', 'tiger', 'tower', 'trail', 'tree', 'tulip', 'turtle', 'twilight', 'valley',
  'violet', 'wave', 'willow', 'wind', 'wing', 'wolf', 'woods', 'wren', 'zenith', 'zephyr',
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function generateSessionId(): string {
  const adjective = getRandomElement(ADJECTIVES);
  const noun = getRandomElement(NOUNS);
  return `${adjective}-${noun}`;
}

export function isValidSessionId(id: string): boolean {
  const parts = id.split('-');
  if (parts.length !== 2) return false;

  const [adjective, noun] = parts;
  return ADJECTIVES.includes(adjective) && NOUNS.includes(noun);
}

// Total possible combinations: 200 adjectives * 200 nouns = 40,000 unique IDs
// This provides reasonable uniqueness while being memorable
