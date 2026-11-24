import { STEPS } from '../data/steps';
import type { Platform, StepId } from '../data/types';
import { track } from '../lib/events';
import { statusOf, type Entry, type Mark, type Plan } from '../lib/state';
import { BLOCK_PARTY_URL } from './BlockPartyNote';
import { IdeaChip, type IdeaKind } from './Ideas';
import { QuestionIcon } from './icons';
import { Logo } from './Logo';
import { StatusIcon } from './StatusIcon';

export interface RowActions {
  toggle(id: string): void;
  checkAll(ids: string[]): void;
  plan(id: string, plan: Plan): void;
  step(id: string, step: StepId): void;
  deleted(id: string): void;
  remove(id: string): void;
  /** Opens the note on why the sheet points to Block Party. */
  blockPartyInfo(): void;
}

/** What clicking a step box will do next. Skipped covers both "the site won't let me" and "I'd rather not". */
function stepHint(mark: Mark | undefined): string {
  if (mark === 'done') return 'Done. Click again to skip';
  if (mark === 'skipped') return "Skipped. Fine if the site won't allow it or you'd rather not";
  return 'Click when done';
}

const MARK_WORD = { done: 'done', skipped: 'skipped' } as const;

export const COLUMN_COUNT = STEPS.length + 3;

/** A random name and username shown under those two steps when the toolbar switch is on. */
export interface RowIdeas {
  name: string;
  username: string;
}

const IDEA_STEPS: Partial<Record<StepId, IdeaKind>> = { name: 'names', username: 'usernames' };

/** Cyd backs up and deletes old posts on X and Bluesky. */
const CYD_URL = 'https://cyd.social/';

export function Row({ platform: p, entry, act, ideas }: { platform: Platform; entry: Entry | undefined; act: RowActions; ideas?: RowIdeas }) {
  const checked = entry?.checked === true;
  const status = statusOf(entry);
  const custom = p.priority === 'custom';
  const showIdeas = ideas !== undefined && checked && entry?.plan === 'keep';

  return (
    <tr class={`row st-${status}${checked ? '' : ' dim'}${showIdeas ? ' with-ideas' : ''}`} data-id={p.id}>
      <td class="c-platform">
        <div class="pc">
          <button
            type="button"
            class="pc-btn"
            role="checkbox"
            aria-checked={checked}
            aria-label={`I have ${p.name}`}
            data-focus="check"
            data-tip={checked && p.why ? p.why : undefined}
            data-tip-delay={checked && p.why ? '' : undefined}
            onClick={() => act.toggle(p.id)}
          >
            <span class="box" />
            <Logo platform={p} />
            <span class="p-name">{p.name}</span>
          </button>
          {checked && entry && <StatusIcon entry={entry} />}
        </div>
      </td>

      {checked && entry ? (
        <>
          <td class="c-plan">
            <div class="seg" role="radiogroup" aria-label={`Keep or delete ${p.name}`}>
              {(['keep', 'delete'] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  role="radio"
                  data-v={v}
                  data-focus={`plan-${v}`}
                  aria-checked={entry.plan === v}
                  onClick={() => entry.plan !== v && act.plan(p.id, v)}
                >
                  {v === 'keep' ? 'Keep' : 'Delete'}
                </button>
              ))}
            </div>
          </td>
          {entry.plan === 'delete' ? (
            <td class={entry.deleted ? 'c-delete is-deleted' : 'c-delete'} colSpan={STEPS.length}>
              <button type="button" class="del-btn" role="checkbox" aria-checked={entry.deleted} data-focus="deleted" onClick={() => act.deleted(p.id)}>
                <span class="box" />
                <span class="del-label">{entry.deleted ? 'Deleted' : 'I deleted this account'}</span>
              </button>
            </td>
          ) : (
            STEPS.map((s) => {
              const mark = entry.steps[s.id];
              const ideaKind = showIdeas ? IDEA_STEPS[s.id] : undefined;
              return (
                <td class="c-step" key={s.id}>
                  <button
                    type="button"
                    class="cell"
                    data-state={mark ?? ''}
                    data-focus={`step-${s.id}`}
                    data-tip={stepHint(mark)}
                    aria-label={`${p.name}, ${s.label}: ${mark ? MARK_WORD[mark] : 'not done'}`}
                    onClick={() => act.step(p.id, s.id)}
                  />
                  {ideaKind && ideas && <IdeaChip idea={ideaKind === 'names' ? ideas.name : ideas.username} kind={ideaKind} inline />}
                </td>
              );
            })
          )}
        </>
      ) : (
        <td class="c-why" colSpan={STEPS.length + 1}>
          {custom ? (
            <span class="why">
              Added by you.{' '}
              <button type="button" class="link-btn" data-focus="remove" onClick={() => act.remove(p.id)}>
                Remove
              </button>
            </span>
          ) : (
            p.why && <span class="why">{p.why}</span>
          )}
        </td>
      )}
      <td class="c-extra">
        <div class="extra-notes">
          {checked && entry && p.blockParty && entry.plan === 'keep' && !entry.steps.privacy && (
            <span class="bp-note">
              <a href={BLOCK_PARTY_URL} target="_blank" rel="noopener noreferrer" onClick={() => track('open_block_party', { from: 'row' })}>
                Block Party
              </a>{' '}
              can make this easier
              <button type="button" class="bp-about" aria-label="About Block Party" data-focus="bp-about" onClick={act.blockPartyInfo}>
                <QuestionIcon />
              </button>
            </span>
          )}
          {checked && entry && p.cyd && entry.plan === 'keep' && !entry.steps.posts && (
            <span class="cyd-note">
              <a href={CYD_URL} target="_blank" rel="noopener noreferrer" onClick={() => track('open_resource', { column: 'posts' })}>
                Cyd
              </a>{' '}
              can delete your old posts
            </span>
          )}
        </div>
      </td>
    </tr>
  );
}
