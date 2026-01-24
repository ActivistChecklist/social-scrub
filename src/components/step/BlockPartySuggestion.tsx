'use client';

import { ExternalLink, Sparkles } from 'lucide-react';
import Image from 'next/image';

interface BlockPartySuggestionProps {
  platformName: string;
}

export default function BlockPartySuggestion({ platformName }: BlockPartySuggestionProps) {
  return (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200 dark:border-purple-700 rounded-xl p-5">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-800/50 rounded-lg flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        </div>
        <div className="flex-1 min-w-0">
          {/* Disclaimer at top - casual language */}
          <p className="text-sm text-purple-600 dark:text-purple-400 mb-3">
            Not an ad! We&apos;re not affiliated with Block Party and don&apos;t get anything if you sign up.
            We just think it saves a lot of time.
          </p>

          <h3 className="text-base font-bold text-purple-900 dark:text-purple-100 mb-2">
            Automate your settings scan with Block Party
          </h3>

          {/* Free vs Paid - compact */}
          <div className="text-sm text-purple-800 dark:text-purple-200 mb-3 space-y-1">
            <p>
              <span className="font-medium">Free:</span> Scans your privacy settings on supported platforms and shows you what to fix
            </p>
            <p>
              <span className="font-medium">Paid:</span> Automatically applies the recommended settings for you
            </p>
          </div>

          {/* Supported platforms image */}
          <div className="mb-3">
            <p className="text-xs text-purple-600 dark:text-purple-400 mb-1">Supported platforms:</p>
            <Image
              src="/blockparty_apps.png"
              alt="Block Party supported platforms: Facebook, Instagram, LinkedIn, X, Threads, TikTok, YouTube"
              width={280}
              height={32}
              className="rounded opacity-90"
            />
          </div>

          {/* CTA button */}
          <a
            href="https://www.blockpartyapp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors text-sm"
          >
            Try Block Party
            <ExternalLink size={14} />
          </a>

          {/* Promo code - subtle footer */}
          <p className="text-xs text-purple-500 dark:text-purple-500 mt-3">
            Promo code for premium: <span className="font-mono">JOINTHEPARTY</span>
          </p>
        </div>
      </div>
    </div>
  );
}
