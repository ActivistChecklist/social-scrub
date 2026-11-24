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

export const LockIcon = () => (
  <svg class="i" viewBox="0 0 16 16" aria-hidden="true">
    <rect x="3" y="7" width="10" height="7" rx="1.5" {...line} stroke-width="1.5" />
    <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" {...line} stroke-width="1.5" />
  </svg>
);

export const QuestionIcon = () => (
  <svg class="i" viewBox="0 0 16 16" aria-hidden="true">
    <circle cx="8" cy="8" r="6.25" {...line} stroke-width="1.4" />
    <path d="M6.3 6.4a1.75 1.75 0 1 1 2.4 1.6c-.45.2-.7.55-.7 1.05v.25" {...line} stroke-width="1.4" />
    <circle cx="8" cy="11.3" r=".8" fill="currentColor" />
  </svg>
);
