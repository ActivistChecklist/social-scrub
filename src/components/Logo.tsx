import { getLogo } from '../data/logos';
import type { Platform } from '../data/types';

export function Logo({ platform }: { platform: Platform }) {
  const logo = getLogo(platform);
  switch (logo.kind) {
    case 'image':
      return <img class="logo" src={logo.src} alt="" width={20} height={20} loading="lazy" decoding="async" />;
    case 'tile':
      return (
        <span class={logo.inset ? 'logo logo-tile inset' : 'logo logo-tile'} style={{ background: logo.bg }} aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path fill={logo.fg} d={logo.path} />
          </svg>
        </span>
      );
    case 'glyph':
      return (
        <svg class={logo.ink ? 'logo logo-ink' : 'logo'} viewBox="0 0 24 24" aria-hidden="true">
          <path fill={logo.color} d={logo.path} />
        </svg>
      );
    default:
      return (
        <span class="logo logo-initial" aria-hidden="true">
          {logo.letter}
        </span>
      );
  }
}
