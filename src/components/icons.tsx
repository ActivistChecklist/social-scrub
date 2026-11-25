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

export const SunIcon = () => (
  <svg class="i" viewBox="0 0 16 16" aria-hidden="true">
    <circle cx="8" cy="8" r="2.75" {...line} stroke-width="1.5" />
    <path
      d="M8 1.5v1.25M8 13.25v1.25M1.5 8h1.25M13.25 8h1.25M3.4 3.4l.9.9M11.7 11.7l.9.9M3.4 12.6l.9-.9M11.7 4.3l.9-.9"
      {...line}
      stroke-width="1.5"
    />
  </svg>
);

export const MoonIcon = () => (
  <svg class="i" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M8 2a4.25 4.25 0 0 0 6 6A6 6 0 1 1 8 2z" {...line} stroke-width="1.5" />
  </svg>
);

export const LaptopIcon = () => (
  <svg class="i" viewBox="0 0 16 16" aria-hidden="true">
    <rect x="3" y="3" width="10" height="7.5" rx="1.25" {...line} stroke-width="1.5" />
    <path d="M1.5 13h13" {...line} stroke-width="1.5" />
  </svg>
);

export const CopyIcon = () => (
  <svg class="i" viewBox="0 0 16 16" aria-hidden="true">
    <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" {...line} stroke-width="1.5" />
    <path d="M10.5 3.5v-.25A1.25 1.25 0 0 0 9.25 2h-5A1.25 1.25 0 0 0 3 3.25v5A1.25 1.25 0 0 0 4.25 9.5h.25" {...line} stroke-width="1.5" />
  </svg>
);

export const RefreshIcon = () => (
  <svg class="i" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M13 8a5 5 0 1 1-1.46-3.54" {...line} stroke-width="1.5" />
    <path d="M12.25 2v2.75H9.5" {...line} stroke-width="1.5" />
  </svg>
);

export const CheckIcon = () => (
  <svg class="i" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3.5 8.5l3 3 6-7" {...line} stroke-width="1.8" />
  </svg>
);
