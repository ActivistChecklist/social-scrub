import { useCallback, useEffect, useRef, useState } from 'preact/hooks';
import { useDismiss, type DismissReason } from '../hooks/useDismiss';
import { eventsEnabled, track } from '../lib/events';
import { summary, type AppState } from '../lib/state';
import { ClearData } from './ClearData';
import { BrandMark, DownloadIcon, LockIcon } from './icons';

interface HeaderProps {
  state: AppState;
  onDownload(kind: 'xlsx' | 'csv'): void;
  onClearAll(): void;
}

export function Header({ state, onDownload, onClearAll }: HeaderProps) {
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
              <span class="wide-only">accounts </span>done
            </span>
          </>
        ) : (
          <span>Check the accounts you have to get started.</span>
        )}
      </div>
      <div class="bar-end">
        <PrivacyNote onClearAll={onClearAll} />
        <DownloadMenu onDownload={onDownload} />
      </div>
    </header>
  );
}

/** A short "your data stays here" note, with a link to the full privacy page. */
function PrivacyNote({ onClearAll }: { onClearAll(): void }) {
  const dialog = useRef<HTMLDialogElement>(null);

  const open = () => {
    const d = dialog.current;
    if (!d) return;
    if (typeof d.showModal === 'function') d.showModal();
    else d.setAttribute('open', '');
    track('open_privacy');
  };
  const close = () => {
    const d = dialog.current;
    if (!d) return;
    if (typeof d.close === 'function') d.close();
    else d.removeAttribute('open');
  };

  return (
    <>
      <button type="button" class="btn privacy-btn" aria-haspopup="dialog" aria-label="Privacy: saved only on this device" onClick={open}>
        <LockIcon />
        <span class="privacy-label">Saved only on this device</span>
      </button>
      <dialog
        ref={dialog}
        class="modal"
        aria-labelledby="privacy-title"
        onClick={(e) => {
          // A click on the dimmed area around the box lands on the dialog itself.
          if (e.target === dialog.current) close();
        }}
      >
        <div class="modal-in">
          <h2 id="privacy-title">Your checklist stays on this device</h2>
          <p>Everything you check is saved in this browser only. There's no account, and we never see which platforms you have.</p>
          {eventsEnabled && (
            <p>
              We count visits, including which site linked you here, and anonymous clicks like "a box was checked". They never say which
              platform, and our server scrambles your IP address before counting. If your browser sends Do Not Track or Global Privacy
              Control, we count nothing.
            </p>
          )}
          <ClearData onClearAll={onClearAll} lead="On a shared or work computer?" />
          <div class="modal-actions">
            <a href="/privacy.html">Read the privacy page</a>
            <button type="button" class="btn btn-sm" onClick={close} autofocus>
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
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
    <div class="dl-wrap" ref={wrap}>
      <button
        ref={button}
        type="button"
        class="btn btn-primary"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Download"
        onClick={() => setOpen(!open)}
      >
        <DownloadIcon />
        <span class="btn-label">Download</span>
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
