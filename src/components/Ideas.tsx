import { useState } from 'preact/hooks';
import { track } from '../lib/events';
import { nameIdeas, usernameIdeas } from '../lib/ideas';

/** A few random names or usernames to copy, with a button for more. */
export function Ideas({ kind }: { kind: 'names' | 'usernames' }) {
  const make = () => (kind === 'names' ? nameIdeas(3) : usernameIdeas(3));
  const [ideas, setIdeas] = useState(make);
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (idea: string) => {
    try {
      await navigator.clipboard.writeText(idea);
      setCopied(idea);
      setTimeout(() => setCopied((c) => (c === idea ? null : c)), 1500);
      track('copy_idea', { kind });
    } catch {
      // Copying can be blocked. The idea is still on screen to type or select.
    }
  };

  return (
    <div class="ideas">
      <b>{kind === 'names' ? 'Name ideas' : 'Username ideas'}</b>
      <div class="idea-list">
        {ideas.map((idea) => (
          <button key={idea} type="button" class="idea" onClick={() => copy(idea)} aria-label={`Copy ${idea}`}>
            {copied === idea ? 'Copied' : idea}
          </button>
        ))}
        <button type="button" class="link-btn idea-more" onClick={() => setIdeas(make())}>
          More
        </button>
      </div>
    </div>
  );
}
