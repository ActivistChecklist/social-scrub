import { useState } from 'preact/hooks';

/** "Clear all data", with an in-page confirmation. Used in the footer and in the privacy note. */
export function ClearData({ onClearAll, lead }: { onClearAll(): void; lead?: string }) {
  const [step, setStep] = useState<'idle' | 'confirm' | 'cleared'>('idle');

  if (step === 'confirm') {
    return (
      <p class="clear-data" role="alert">
        Remove everything Social Scrub saved in this browser?
        <span class="clear-actions">
          <button
            type="button"
            class="btn btn-sm btn-danger"
            onClick={() => {
              onClearAll();
              setStep('cleared');
            }}
          >
            Clear everything
          </button>
          <button type="button" class="btn btn-sm" onClick={() => setStep('idle')}>
            Cancel
          </button>
        </span>
      </p>
    );
  }

  if (step === 'cleared') {
    return (
      <p class="clear-data" aria-live="polite">
        Cleared. This browser no longer has any Social Scrub data.
      </p>
    );
  }

  return (
    <p class="clear-data">
      {lead}
      <button type="button" class="link-btn" onClick={() => setStep('confirm')}>
        Clear all data
      </button>
    </p>
  );
}
