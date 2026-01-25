'use client';

import { useState } from 'react';
import { generateDisplayNames } from '@/lib/generators';
import Button from '@/components/ui/Button';
import { Dices, RefreshCw, Copy, Check } from '@/components/ui/LucideIcon';

export default function RandomNameGenerator() {
  const [names, setNames] = useState<string[]>(() => generateDisplayNames(18));
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleRefresh = () => {
    setNames(generateDisplayNames(18));
    setCopiedIndex(null);
  };

  const handleCopy = async (name: string, index: number) => {
    try {
      await navigator.clipboard.writeText(name);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = name;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-blue-900 dark:text-blue-200 text-sm flex items-center gap-2">
          <Dices size={18} />
          Random Fake Name Ideas
        </h4>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleRefresh}
          className="text-blue-700 dark:text-blue-300 flex items-center gap-1"
        >
          <RefreshCw size={14} />
          Refresh
        </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {names.map((name, index) => (
          <button
            key={index}
            onClick={() => handleCopy(name, index)}
            className="group flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg px-4 py-3 hover:bg-blue-100 dark:hover:bg-blue-900/40 hover:ring-2 hover:ring-blue-300 dark:hover:ring-blue-600 transition-all text-left cursor-pointer"
          >
            <span className="text-base text-gray-900 dark:text-gray-100 font-medium">
              {name}
            </span>
            <span
              className={`text-blue-600 dark:text-blue-400 transition-opacity ${
                copiedIndex === index
                  ? 'opacity-100'
                  : 'opacity-0 group-hover:opacity-100 [@media(pointer:coarse)]:opacity-100'
              }`}
            >
              {copiedIndex === index ? (
                <Check size={18} className="text-emerald-500" />
              ) : (
                <Copy size={18} />
              )}
            </span>
          </button>
        ))}
      </div>
      <p className="text-xs text-blue-600 dark:text-blue-400 mt-2 text-center">
        Click any name to copy
      </p>
    </div>
  );
}
