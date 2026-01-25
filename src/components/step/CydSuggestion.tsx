'use client';

import { ExternalLink, Sparkles } from 'lucide-react';

export default function CydSuggestion() {
  return (
    <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-y border-purple-200 dark:border-purple-700 py-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-800/50 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl md:text-2xl font-bold text-purple-900 dark:text-purple-100 mb-1">
                Want to bulk-delete tweets? Try Cyd!
              </h3>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Backup and delete all your tweets, then migrate to Bluesky. <span className="text-purple-600 dark:text-purple-400 italic">(Not an ad—we just like it)</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <a
              href="https://cyd.social"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors text-sm"
            >
              Try Cyd
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
