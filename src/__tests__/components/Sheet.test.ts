import { describe, expect, it } from 'vitest';
import { placePopover } from '../../components/Sheet';

const rect = (top: number, left = 300, h = 40, w = 80) =>
  ({ top, bottom: top + h, left, right: left + w, width: w, height: h, x: left, y: top, toJSON() {} }) as DOMRect;

describe('placePopover', () => {
  it('opens under the header when there is room', () => {
    const p = placePopover(rect(100), { width: 1280, height: 800 });
    expect(p.top).toBe(148);
    expect(p.bottom).toBeUndefined();
    expect(p.maxHeight).toBe(800 - 140 - 8 - 12);
  });

  it('opens above the header on a short screen when there is more room above', () => {
    // A short landscape phone, with the header near the bottom.
    const p = placePopover(rect(260), { width: 667, height: 375 });
    expect(p.top).toBeUndefined();
    expect(p.bottom).toBe(375 - 260 + 8);
    expect(p.maxHeight).toBe(260 - 8 - 12);
  });

  it('caps the height to the room on screen so the rest scrolls inside', () => {
    const p = placePopover(rect(40), { width: 667, height: 375 });
    expect((p.top ?? 0) + p.maxHeight).toBeLessThanOrEqual(375);
  });

  it('keeps it inside the screen sideways', () => {
    expect(placePopover(rect(100, 0), { width: 375, height: 800 }).left).toBe(16);
    const right = placePopover(rect(100, 360, 40, 15), { width: 375, height: 800 });
    expect(right.left + Math.min(340, 375 - 32)).toBeLessThanOrEqual(375 - 16);
  });
});
