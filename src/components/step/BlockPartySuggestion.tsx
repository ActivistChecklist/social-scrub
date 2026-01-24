'use client';

import { ExternalLink, Sparkles, Shield } from 'lucide-react';

interface BlockPartySuggestionProps {
  platformName: string;
}

export default function BlockPartySuggestion({ platformName }: BlockPartySuggestionProps) {
  return (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-2 border-purple-200 dark:border-purple-700 rounded-xl p-6">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-800/50 rounded-xl flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-purple-900 dark:text-purple-100 mb-2">
            Automate this with Block Party
          </h3>
          <p className="text-purple-800 dark:text-purple-200 mb-4">
            <a
              href="https://www.blockpartyapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline"
            >
              Block Party
            </a>{' '}
            can automatically lock down your privacy settings on {platformName} and protect you from harassment.
            It&apos;s free to use and takes care of the tedious parts for you.
          </p>

          <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span className="font-semibold text-purple-900 dark:text-purple-100">Why Block Party?</span>
            </div>
            <ul className="text-sm text-purple-800 dark:text-purple-200 space-y-1 ml-7">
              <li>Automatically filters out harassment and spam</li>
              <li>Locks down privacy settings with one click</li>
              <li>Free tier available with no credit card required</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <a
              href="https://www.blockpartyapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
            >
              Get Block Party
              <ExternalLink size={16} />
            </a>
            <div className="text-sm text-purple-700 dark:text-purple-300">
              Promo code: <span className="font-mono font-bold bg-purple-100 dark:bg-purple-800 px-2 py-0.5 rounded">JOINTHEPARTY</span>
              <span className="text-purple-600 dark:text-purple-400 ml-1">(for premium features)</span>
            </div>
          </div>

          <p className="text-xs text-purple-600 dark:text-purple-400 mt-3">
            We don&apos;t get any commission - we just think Block Party is great!
          </p>
        </div>
      </div>
    </div>
  );
}
