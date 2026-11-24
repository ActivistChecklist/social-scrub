import { describe, expect, it } from 'vitest';
import { FEMME_NAMES, MASC_NAMES, NEUTRAL_NAMES } from '../../data/wordlists';
import { MAX_USERNAME, nameIdeas, usernameIdeas } from '../../lib/ideas';

describe('nameIdeas', () => {
  it('makes distinct first-and-last names', () => {
    const names = nameIdeas(5);
    expect(new Set(names).size).toBe(5);
    for (const n of names) expect(n).toMatch(/^[A-Z][A-Za-z-]+ [A-Z][A-Za-z-]+$/);
  });

  it('keeps femme, masculine and gender-neutral first names in separate lists of about the same size', () => {
    const all = [FEMME_NAMES, MASC_NAMES, NEUTRAL_NAMES].flat();
    expect(new Set(all).size).toBe(all.length);
    const sizes = [FEMME_NAMES, MASC_NAMES, NEUTRAL_NAMES].map((l) => l.length);
    expect(Math.min(...sizes) / Math.max(...sizes)).toBeGreaterThan(0.85);
    expect(NEUTRAL_NAMES).toEqual(expect.arrayContaining(['Cedar', 'Sam']));
  });

  it('picks a list first, so each kind of name comes up equally often', () => {
    // The first random number picks the list, the second the first name, the third the last name.
    const firstName = (listPick: number) => {
      const seq = [listPick, 0, 0];
      let i = 0;
      return nameIdeas(1, () => seq[i++ % 3])[0].split(' ')[0];
    };
    expect(firstName(0)).toBe(FEMME_NAMES[0]);
    expect(firstName(0.5)).toBe(MASC_NAMES[0]);
    expect(firstName(0.9)).toBe(NEUTRAL_NAMES[0]);
  });
});

describe('usernameIdeas', () => {
  it('only uses letters and digits, which every big platform accepts, within the shortest length limit', () => {
    for (const u of usernameIdeas(20)) {
      expect(u).toMatch(/^[A-Za-z0-9]+$/);
      expect(u).not.toMatch(/[_.-]/); // Facebook rejects underscores, X rejects periods
      expect(u.length).toBeLessThanOrEqual(MAX_USERNAME);
    }
  });

  it('follows the random source it is given', () => {
    let i = 0;
    const seq = () => [0.01, 0.01, 0.5][i++ % 3];
    expect(usernameIdeas(1, seq)).toHaveLength(1);
  });
});
