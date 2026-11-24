import { describe, expect, it } from 'vitest';
import { MAX_USERNAME, nameIdeas, usernameIdeas } from '../../lib/ideas';

describe('nameIdeas', () => {
  it('makes distinct first-and-last names', () => {
    const names = nameIdeas(5);
    expect(new Set(names).size).toBe(5);
    for (const n of names) expect(n).toMatch(/^[A-Z][A-Za-z-]+ [A-Z][A-Za-z-]+$/);
  });
});

describe('usernameIdeas', () => {
  it('only uses characters every big platform accepts, within the shortest length limit', () => {
    for (const u of usernameIdeas(20)) {
      expect(u).toMatch(/^[a-z0-9_]+$/);
      expect(u.length).toBeLessThanOrEqual(MAX_USERNAME);
    }
  });

  it('follows the random source it is given', () => {
    let i = 0;
    const seq = () => [0.01, 0.01, 0.5][i++ % 3];
    expect(usernameIdeas(1, seq)).toHaveLength(1);
  });
});
