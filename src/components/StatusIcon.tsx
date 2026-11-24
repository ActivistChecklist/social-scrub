import { STEPS } from '../data/steps';
import { statusOf, stepCount, type Entry } from '../lib/state';

const RING = 2 * Math.PI * 6;

/**
 * A ring that fills as steps get done, then a green check. Nothing shows until
 * the first box on the row is checked. Hover or tap it for a short label.
 */
export function StatusIcon({ entry }: { entry: Entry }) {
  const status = statusOf(entry);

  if (status === 'done' || status === 'deleted') {
    const label = status === 'deleted' ? 'Deleted' : 'Done';
    return (
      <button type="button" class="p-stat ok" data-tip={label} data-focus="status" aria-label={label}>
        <svg class="i" viewBox="0 0 16 16" aria-hidden="true">
          <circle cx="8" cy="8" r="7" fill="currentColor" />
          <path class="mark" d="M4.9 8.2l2.1 2.1 4.2-4.5" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    );
  }

  if (status !== 'in-progress') return null;

  const n = stepCount(entry);
  const label = `${n} of ${STEPS.length} steps done`;
  return (
    <button type="button" class="p-stat prog" data-tip={label} data-focus="status" aria-label={label}>
      <svg class="i" viewBox="0 0 16 16" aria-hidden="true">
        <circle class="track" cx="8" cy="8" r="6" fill="none" stroke-width="2" />
        <circle
          cx="8"
          cy="8"
          r="6"
          fill="none"
          stroke="currentColor"
          stroke-width="2.4"
          stroke-dasharray={`${((RING * n) / STEPS.length).toFixed(2)} ${RING.toFixed(2)}`}
          transform="rotate(-90 8 8)"
        />
      </svg>
    </button>
  );
}
