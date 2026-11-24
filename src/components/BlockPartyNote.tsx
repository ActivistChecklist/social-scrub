import type { RefObject } from 'preact';
import { useState } from 'preact/hooks';
import { track } from '../lib/events';

export const BLOCK_PARTY_URL = 'https://www.blockpartyapp.com';
const CODE = 'JOINTHEPARTY';

/** Opens the note. Kept outside the component so any row's "?" can call it. */
export function openBlockPartyNote(dialog: HTMLDialogElement | null) {
  if (!dialog) return;
  if (typeof dialog.showModal === 'function') dialog.showModal();
  else dialog.setAttribute('open', '');
  track('open_help', { column: 'block_party' });
}

/** Why the sheet points to Block Party, and that we're not affiliated with it. */
export function BlockPartyNote({ dialog }: { dialog: RefObject<HTMLDialogElement | null> }) {
  const [copied, setCopied] = useState(false);

  const close = () => {
    const d = dialog.current;
    if (!d) return;
    if (typeof d.close === 'function') d.close();
    else d.removeAttribute('open');
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CODE);
      setCopied(true);
    } catch {
      // Copying can be blocked. The code is on screen to type.
    }
  };

  return (
    <dialog
      ref={dialog}
      class="modal"
      aria-labelledby="bp-title"
      onClose={() => setCopied(false)}
      onClick={(e) => {
        if (e.target === dialog.current) close();
      }}
    >
      <div class="modal-in">
        <h2 id="bp-title">About Block Party</h2>
        <p>We're not affiliated with Block Party and get nothing for recommending it.</p>
        <p>
          Platforms make their privacy settings ridiculously hard to find. Block Party finds them for you and makes the changes in a few
          clicks.
        </p>
        <p class="bp-code">
          It's free for one site. The code <b>{CODE}</b> makes the paid plan cheaper.
          <button type="button" class="link-btn" onClick={copy}>
            {copied ? 'Copied' : 'Copy code'}
          </button>
        </p>
        <div class="modal-actions">
          <a href={BLOCK_PARTY_URL} target="_blank" rel="noopener noreferrer" onClick={() => track('open_block_party', { from: 'about' })}>
            Go to Block Party
          </a>
          <button type="button" class="btn btn-sm" onClick={close}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}
