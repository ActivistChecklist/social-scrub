import { useState } from 'preact/hooks';

export function Footer({ onClearAll }: { onClearAll(): void }) {
  const [step, setStep] = useState<'idle' | 'confirm' | 'cleared'>('idle');

  return (
    <footer class="foot">
      {step === 'confirm' ? (
        <p role="alert">
          Remove everything Social Scrub saved in this browser?
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
        </p>
      ) : (
        <p aria-live="polite">
          {step === 'cleared'
            ? 'Cleared. This browser no longer has any Social Scrub data.'
            : 'Your checkmarks are saved only in this browser. Nothing is sent anywhere.'}
          {step === 'idle' && (
            <button type="button" class="link-btn" onClick={() => setStep('confirm')}>
              Clear all data
            </button>
          )}
        </p>
      )}
      <nav class="foot-links" aria-label="About Social Scrub">
        <a href="/privacy.html">Privacy</a>
        <a href="https://activistchecklist.org/" target="_blank" rel="noopener noreferrer">
          A project of Activist Checklist
        </a>
        <a href="https://github.com/ActivistChecklist/social-scrub" target="_blank" rel="noopener noreferrer">
          Source on GitHub
        </a>
      </nav>
    </footer>
  );
}
