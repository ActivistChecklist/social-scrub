'use client';

import Link from 'next/link';
import { Github, ExternalLink } from 'lucide-react';

function BlueskyIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-900 py-6">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <p className="flex items-center gap-1">
            A project of{' '}
            <a
              href="https://activistchecklist.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand hover:text-brand-light inline-flex items-center gap-1"
            >
              Activist Checklist
              <ExternalLink size={12} />
            </a>
          </p>

          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-gray-400 hover:text-gray-200 transition-colors"
            >
              Privacy
            </Link>

            <a
              href="https://activistchecklist.org/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-200 transition-colors"
            >
              Contact
            </a>

            <a
              href="https://github.com/ActivistChecklist/social-scrub"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-gray-400 hover:text-gray-200 transition-colors"
            >
              <Github size={16} />
              GitHub
            </a>

            <a
              href="https://bsky.app/profile/ActivistChecklist.bsky.social"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-gray-400 hover:text-gray-200 transition-colors"
            >
              <BlueskyIcon size={16} />
              Bluesky
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
