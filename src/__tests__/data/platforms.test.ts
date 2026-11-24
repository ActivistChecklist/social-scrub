import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { getLogo } from '../../data/logos';
import { PLATFORMS } from '../../data/platforms';
import { GROUPS, STARTERS } from '../../data/steps';

describe('platform list', () => {
  it('has unique ids', () => {
    const ids = PLATFORMS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('only uses known priority groups', () => {
    const groups = new Set(GROUPS.map((g) => g.id));
    for (const p of PLATFORMS) expect(groups.has(p.priority), p.id).toBe(true);
  });

  it('gives every platform a reason and an https link', () => {
    for (const p of PLATFORMS) {
      expect(p.why?.trim(), p.id).toBeTruthy();
      expect(p.url, p.id).toMatch(/^https:\/\//);
    }
  });

  // Fails when an icon was added to platforms.ts without running `pnpm logos`.
  it('resolves every icon slug to a logo', () => {
    for (const p of PLATFORMS.filter((x) => x.icon)) {
      expect(getLogo(p).kind, `${p.id} (run pnpm logos)`).not.toBe('letter');
    }
  });

  it('points every image logo at a file in public/', () => {
    for (const p of PLATFORMS.filter((x) => x.image)) {
      expect(existsSync(resolve(__dirname, '../../../public', p.image!.replace(/^\//, ''))), p.id).toBe(true);
    }
  });

  it('starts with platforms that exist', () => {
    const ids = new Set(PLATFORMS.map((p) => p.id));
    for (const id of STARTERS) expect(ids.has(id), id).toBe(true);
  });

  it('lists X below Snapchat', () => {
    const ids = PLATFORMS.map((p) => p.id);
    expect(ids.indexOf('twitter')).toBeGreaterThan(ids.indexOf('snapchat'));
  });
});

describe('getLogo', () => {
  it('falls back to the first letter', () => {
    expect(getLogo({ name: 'mastodon.social' })).toEqual({ kind: 'letter', letter: 'M' });
  });

  it('puts very light marks on their own square', () => {
    expect(getLogo({ name: 'Snapchat', icon: 'snapchat' }).kind).toBe('tile');
  });

  it('lets very dark marks follow the text color', () => {
    const logo = getLogo({ name: 'X', icon: 'x' });
    expect(logo.kind === 'glyph' && logo.ink).toBe(true);
  });
});
