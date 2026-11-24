// Small line icons, drawn on a 16px grid. Decorative only: every control that uses one also has text or a label.

const line = { fill: 'none', stroke: 'currentColor', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' } as const;

export const DownloadIcon = () => (
  <svg class="i" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M8 2.5v7.5M4.5 6.5L8 10l3.5-3.5M3 13h10" {...line} stroke-width="1.6" />
  </svg>
);

export const SearchIcon = () => (
  <svg class="i" viewBox="0 0 16 16" aria-hidden="true">
    <circle cx="7" cy="7" r="4.5" {...line} stroke-width="1.5" />
    <path d="M10.5 10.5L14 14" {...line} stroke-width="1.5" />
  </svg>
);

export const PlusIcon = () => (
  <svg class="i" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M8 3v10M3 8h10" {...line} stroke-width="1.6" />
  </svg>
);

export const ArrowDownIcon = () => (
  <svg class="i" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M8 3v9M4.5 8.5L8 12l3.5-3.5" {...line} stroke-width="1.6" />
  </svg>
);

/** The Social Scrub mark: a page with one line blacked out. */
export const BrandMark = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" fill="currentColor" />
    <rect class="cut" x="6" y="6.6" width="12" height="1.7" rx=".85" />
    <rect class="cut" x="6" y="10.4" width="12" height="3.6" rx=".8" />
    <rect class="cut" x="6" y="16" width="7" height="1.7" rx=".85" />
  </svg>
);
