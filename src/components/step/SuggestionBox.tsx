'use client';

import { Lightbulb, ExternalLink } from 'lucide-react';

interface SuggestionLink {
  text: string;
  url: string;
}

interface SuggestionBoxProps {
  title?: string;
  children: React.ReactNode;
  links?: SuggestionLink[];
}

export default function SuggestionBox({ title = 'Pro tip', children, links }: SuggestionBoxProps) {
  return (
    <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-5">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 bg-amber-100 dark:bg-amber-800/40 rounded-full flex items-center justify-center">
          <Lightbulb size={20} className="text-amber-600 dark:text-amber-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-amber-900 dark:text-amber-200 text-lg mb-3">
            {title}
          </h4>
          <div className="text-base text-amber-800 dark:text-amber-300 space-y-3">
            {children}
          </div>
          {links && links.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-3">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-base font-medium text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-200 underline underline-offset-2"
                >
                  {link.text}
                  <ExternalLink size={14} />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Pre-built suggestion for email step
export function EmailSuggestion() {
  return (
    <SuggestionBox title="Options for unique email addresses">
      <p>
        <strong>Gmail&apos;s + trick (easiest option):</strong> Add &quot;+anything&quot; before the @ symbol
        (like luke+facebook@gmail.com). All emails still arrive in your inbox, and each
        site sees a different address. This also helps you spot who sold your info!
        <br />
        <span className="text-amber-600 dark:text-amber-400 text-sm mt-1 block">
          Note: If someone manually looks at your email, they can see and remove the + part.
        </span>
      </p>
      <p>
        <strong>DuckDuckGo Email Protection (more private):</strong> Creates completely anonymous, unique
        email addresses for each site. Strips trackers from incoming emails. Works with
        Chrome and Brave browsers.
      </p>
      <div className="mt-4 flex flex-wrap gap-4">
        <a
          href="https://gmail.googleblog.com/2008/03/2-hidden-ways-to-get-more-from-your.html"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-base font-medium text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-200 underline underline-offset-2"
        >
          Learn about Gmail + trick
          <ExternalLink size={14} />
        </a>
        <a
          href="https://duckduckgo.com/email/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-base font-medium text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-200 underline underline-offset-2"
        >
          DuckDuckGo Email Protection
          <ExternalLink size={14} />
        </a>
      </div>
    </SuggestionBox>
  );
}
