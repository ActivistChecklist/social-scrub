import { GLYPHS } from './logos.generated';
import type { Platform } from './types';

export type Logo =
  /** A one-color brand mark. `ink` means the brand color is too dark to see in dark mode, so it follows the text color. */
  | { kind: 'glyph'; path: string; color: string; ink: boolean }
  /** A mark on a colored square. `inset` shrinks the mark to sit inside the square. */
  | { kind: 'tile'; path: string; bg: string; fg: string; inset: boolean }
  | { kind: 'image'; src: string }
  | { kind: 'letter'; letter: string };

// Logos whose simple-icons version doesn't look like the app icon people know.
const HAND_DRAWN: Record<string, { bg: string; path: string }> = {
  venmo: {
    bg: '#3396CD',
    path: 'M17.9 5.5c.5.8.7 1.7.7 2.7 0 3.4-2.9 7.7-5.3 10.8h-4.5l-2.2-13 4-.5 1 8.1c.9-1.5 2.2-4 2.2-5.6 0-1-.2-1.7-.5-2.3l2.6-1.2z',
  },
  linkedin: {
    bg: '#007EBB',
    path: 'M20.67 20.67h-3.56v-5.59c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.69h-3.56V9.33h3.42v1.55h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.18zM5.34 7.78a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zm1.78 12.89H3.56V9.33h3.56v11.34z',
  },
};

/** Perceived brightness of a hex color, from 0 (black) to 1 (white). */
export function luminance(hex: string): number {
  const n = parseInt(hex.replace('#', ''), 16);
  return (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
}

export function getLogo(platform: Pick<Platform, 'name' | 'icon' | 'image'>): Logo {
  if (platform.image) return { kind: 'image', src: platform.image };
  if (platform.icon) {
    const drawn = HAND_DRAWN[platform.icon];
    if (drawn) return { kind: 'tile', path: drawn.path, bg: drawn.bg, fg: '#FFFFFF', inset: false };
    const glyph = GLYPHS[platform.icon];
    if (glyph) {
      const light = luminance(glyph.hex);
      // A very light mark (Snapchat yellow) disappears on white, so it gets its own square.
      if (light > 0.78) return { kind: 'tile', path: glyph.path, bg: `#${glyph.hex}`, fg: '#111111', inset: true };
      return { kind: 'glyph', path: glyph.path, color: `#${glyph.hex}`, ink: light < 0.15 };
    }
  }
  return { kind: 'letter', letter: platform.name.trim().charAt(0).toUpperCase() || '?' };
}
