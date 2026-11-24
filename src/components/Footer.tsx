import { ClearData } from './ClearData';

export function Footer({ onClearAll }: { onClearAll(): void }) {
  return (
    <footer class="foot">
      <ClearData onClearAll={onClearAll} lead="Your checklist is saved only in this browser." />
      <nav class="foot-links" aria-label="About Social Scrub">
        <a href="/privacy.html">Privacy</a>
        <a href="https://activistchecklist.org/contact/" target="_blank" rel="noopener noreferrer">
          Contact
        </a>
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
