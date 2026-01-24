// Random name and username generators for privacy

import { FIRST_NAMES } from './wordlists/first-names';
import { LAST_NAMES } from './wordlists/last-names';
import { ADJECTIVES } from './wordlists/adjectives';
import { NOUNS } from './wordlists/nouns';

/**
 * Generate a random display name
 * @param count Number of names to generate
 * @returns Array of generated names
 */
export function generateDisplayNames(count: number = 5): string[] {
  const names: string[] = [];
  const usedCombos = new Set<string>();

  while (names.length < count) {
    const first = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
    const last = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
    const combo = `${first}${last}`;

    if (!usedCombos.has(combo)) {
      usedCombos.add(combo);
      names.push(`${first} ${last}`);
    }
  }

  return names;
}

/**
 * Generate random usernames in format: adjective-noun-number
 * @param count Number of usernames to generate
 * @returns Array of generated usernames
 */
export function generateUsernames(count: number = 5): string[] {
  const usernames: string[] = [];
  const usedCombos = new Set<string>();

  while (usernames.length < count) {
    const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
    const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
    const number = Math.floor(Math.random() * 1000);
    const combo = `${adjective}${noun}${number}`;

    if (!usedCombos.has(combo)) {
      usedCombos.add(combo);
      usernames.push(`${adjective}-${noun}-${number}`);
    }
  }

  return usernames;
}

/**
 * Generate a random email alias using Gmail+ trick
 * @param baseEmail The user's base email (optional)
 * @param platformName The platform name to include in alias
 * @returns Generated email alias
 */
export function generateEmailAlias(
  baseEmail: string = 'yourname@gmail.com',
  platformName: string = 'platform'
): string {
  // Extract the part before @ and after @
  const [localPart, domain] = baseEmail.split('@');

  // Remove any existing + aliases
  const cleanLocalPart = localPart.split('+')[0];

  // Create alias with platform name (lowercase, no spaces)
  const cleanPlatform = platformName.toLowerCase().replace(/\s+/g, '');

  return `${cleanLocalPart}+${cleanPlatform}@${domain || 'gmail.com'}`;
}
