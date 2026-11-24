import { ADJECTIVES, FIRST_NAMES, LAST_NAMES, NOUNS } from '../data/wordlists';

/** X allows 15 characters, the shortest limit of the big platforms. */
export const MAX_USERNAME = 15;

/** A random number from 0 up to 1, from the browser's secure source. */
function secureRandom(): number {
  const n = new Uint32Array(1);
  crypto.getRandomValues(n);
  return n[0] / 2 ** 32;
}

const pick = <T>(list: readonly T[], random: () => number) => list[Math.floor(random() * list.length)];

function unique(count: number, make: () => string | null): string[] {
  const out = new Set<string>();
  for (let tries = 0; out.size < count && tries < count * 50; tries++) {
    const idea = make();
    if (idea) out.add(idea);
  }
  return [...out];
}

/** Display names like "Jordan Ellis". Made on the device; nothing is sent anywhere. */
export function nameIdeas(count = 3, random = secureRandom): string[] {
  return unique(count, () => `${pick(FIRST_NAMES, random)} ${pick(LAST_NAMES, random)}`);
}

const capitalize = (word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

/**
 * Usernames like "CalmHeron482": letters and digits only, with no separator, because the big
 * platforms disagree on the rest (X allows underscores but not periods, Facebook the opposite).
 * Capitals keep the words readable, and the length fits X's 15-character limit.
 */
export function usernameIdeas(count = 3, random = secureRandom): string[] {
  return unique(count, () => {
    const name = `${capitalize(pick(ADJECTIVES, random))}${capitalize(pick(NOUNS, random))}${100 + Math.floor(random() * 900)}`;
    return name.length <= MAX_USERNAME && /^[A-Za-z0-9]+$/.test(name) ? name : null;
  });
}
