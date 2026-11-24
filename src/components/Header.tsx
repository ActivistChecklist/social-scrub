import { useCallback, useEffect, useRef, useState } from 'preact/hooks';
import { useDismiss, type DismissReason } from '../hooks/useDismiss';
import { summary, type AppState } from '../lib/state';
import { BrandMark, DownloadIcon } from './icons';

export function Header({ state, onDownload }: { state: AppState; onDownload(kind: 'xlsx' | 'csv'): void }) {
  const { checked, finished } = summary(state);
  const pct = checked ? Math.round((finished / checked) * 100) : 0;

  return (
    <header class="bar">
      <h1 class="brand">
        <BrandMark />
        Social Scrub
      </h1>
      <div class="summary" aria-live="polite">
        {checked ? (
          <>
            <span class="meter" aria-hidden="true">
              <span style={{ width: `${pct}%` }} />
            </span>
            <span>
              <strong>
                {finished} of {checked}
              </strong>{' '}
              accounts done
            </span>
          </>
        ) : (
          <span>Check the accounts you have to get started.</span>
        )}
      </div>
      <DownloadMenu onDownload={onDownload} />
    </header>
  );
}

function DownloadMenu({ onDownload }: { onDownload(kind: 'xlsx' | 'csv'): void }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const first = useRef<HTMLButtonElement>(null);

  const close = useCallback((reason: DismissReason) => {
    setOpen(false);
    if (reason === 'escape') button.current?.focus();
  }, []);
  useDismiss(open, close, wrap);
  useEffect(() => {
    if (open) first.current?.focus();
  }, [open]);

  const pick = (kind: 'xlsx' | 'csv') => {
    setOpen(false);
    onDownload(kind);
  };

  return (
    <div class="bar-end" ref={wrap}>
      <button ref={button} type="button" class="btn btn-primary" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen(!open)}>
        <DownloadIcon />
        Download
      </button>
      {open && (
        <div class="menu" role="menu">
          <button ref={first} type="button" role="menuitem" onClick={() => pick('xlsx')}>
            Excel spreadsheet <span>.xlsx</span>
          </button>
          <button type="button" role="menuitem" onClick={() => pick('csv')}>
            CSV file <span>.csv</span>
          </button>
          <p>Every platform, with your checkmarks and progress.</p>
        </div>
      )}
    </div>
  );
}
