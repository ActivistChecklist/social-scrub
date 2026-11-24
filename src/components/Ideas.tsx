import { useEffect, useState } from 'preact/hooks';
import { track } from '../lib/events';
import { nameIdeas, usernameIdeas } from '../lib/ideas';
import { CheckIcon, CopyIcon, RefreshIcon } from './icons';

export type IdeaKind = 'names' | 'usernames';

/**
 * A few random names or usernames to copy. The button for new ones sits beside the heading,
 * so it stays in the same place however long the ideas are.
 */
export function Ideas({ kind }: { kind: IdeaKind }) {
  const make = () => (kind === 'names' ? nameIdeas(3) : usernameIdeas(3));
  const [ideas, setIdeas] = useState(make);

  return (
    <div class="ideas">
      <div class="ideas-head">
        <b>{kind === 'names' ? 'Name ideas' : 'Username ideas'}</b>
        <button type="button" class="btn btn-xs ideas-new" onClick={() => setIdeas(make())}>
          <RefreshIcon />
          New ideas
        </button>
      </div>
      <div class="idea-list" aria-live="polite">
        {ideas.map((idea) => (
          <IdeaChip key={idea} idea={idea} kind={kind} />
        ))}
      </div>
    </div>
  );
}

/** One idea. Clicking copies it, and the copy icon turns into a check for a moment. */
export function IdeaChip({ idea, kind, class: extra }: { idea: string; kind: IdeaKind; class?: string }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(idea);
      setCopied(true);
      track('copy_idea', { kind });
    } catch {
      // Copying can be blocked. The idea is still on screen to type or select.
    }
  };

  return (
    <button type="button" class={['idea', extra, copied && 'copied'].filter(Boolean).join(' ')} onClick={copy} aria-label={`${copied ? 'Copied' : 'Copy'} ${idea}`}>
      <span class="idea-text">{idea}</span>
      {copied ? <CheckIcon /> : <CopyIcon />}
    </button>
  );
}
