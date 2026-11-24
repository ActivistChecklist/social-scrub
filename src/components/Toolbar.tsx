import { useCallback, useEffect, useRef, useState } from 'preact/hooks';
import { useDismiss, type DismissReason } from '../hooks/useDismiss';
import { MAX_NAME_LENGTH } from '../lib/state';
import { PlusIcon, SearchIcon } from './icons';

interface ToolbarProps {
  query: string;
  onQuery(q: string): void;
  onlyMine: boolean;
  onOnlyMine(v: boolean): void;
  /** Returns false when the name was empty. */
  onAdd(name: string): boolean;
}

export function Toolbar({ query, onQuery, onlyMine, onOnlyMine, onAdd }: ToolbarProps) {
  return (
    <div class="tools">
      <label class="search">
        <SearchIcon />
        <input
          id="search"
          type="search"
          value={query}
          onInput={(e) => onQuery(e.currentTarget.value)}
          placeholder="Find a platform"
          autocomplete="off"
          aria-label="Find a platform"
        />
      </label>
      <AddPlatform query={query} onAdd={onAdd} />
      <label class="switch">
        <input id="only-mine" type="checkbox" checked={onlyMine} onChange={(e) => onOnlyMine(e.currentTarget.checked)} />
        <span class="wide-only">Hide platforms I haven't checked</span>
        <span class="narrow-only">Only checked</span>
      </label>
    </div>
  );
}

/** A small form under the button. It starts with whatever is typed in the search box. */
function AddPlatform({ query, onAdd }: { query: string; onAdd(name: string): boolean }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const wrap = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const input = useRef<HTMLInputElement>(null);

  const close = useCallback((reason: DismissReason) => {
    setOpen(false);
    if (reason === 'escape') button.current?.focus();
  }, []);
  useDismiss(open, close, wrap);
  useEffect(() => {
    if (open) input.current?.select();
  }, [open]);

  return (
    <div class="add-wrap" ref={wrap}>
      <button
        ref={button}
        type="button"
        class="btn btn-sm"
        aria-expanded={open}
        aria-controls="add-platform"
        aria-label="Add platform"
        onClick={() => {
          if (!open) setName(query.trim());
          setOpen(!open);
        }}
      >
        <PlusIcon />
        <span class="btn-label">Add platform</span>
      </button>
      {open && (
        <form
          id="add-platform"
          class="add-pop"
          onSubmit={(e) => {
            e.preventDefault();
            if (onAdd(name)) setOpen(false);
            else input.current?.focus();
          }}
        >
          <label for="add-top">Add a platform that isn't listed</label>
          <div class="add-form">
            <input
              id="add-top"
              ref={input}
              type="text"
              value={name}
              onInput={(e) => setName(e.currentTarget.value)}
              placeholder="Platform name"
              maxLength={MAX_NAME_LENGTH}
              autocomplete="off"
            />
            <button class="btn btn-sm btn-primary" type="submit">
              Add
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
