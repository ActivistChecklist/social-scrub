'use client';

import Link from 'next/link';
import { Github, ExternalLink } from 'lucide-react';

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
              href="https://github.com/ActivistChecklist/social-scrub"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-gray-400 hover:text-gray-200 transition-colors"
            >
              <Github size={16} />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
