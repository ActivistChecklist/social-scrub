'use client';

import { useState, useMemo, useRef, KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/hooks/useSession';
import { getPlatformsByPriority, PRIORITY_LABELS } from '@/lib/platforms';
import { Platform } from '@/lib/types';
import Button from '@/components/ui/Button';
import PlatformCard from '@/components/PlatformCard';
import { Plus, X, Check, ArrowDown } from 'lucide-react';

export default function PlatformSelection() {
  const router = useRouter();
  const { completeOnboarding, addCustomPlatforms } = useSession();
  const [selectedPlatforms, setSelectedPlatforms] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState(false);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customPlatforms, setCustomPlatforms] = useState<string[]>([]);
  const [currentCustomInput, setCurrentCustomInput] = useState('');
  const customInputRef = useRef<HTMLInputElement>(null);

  const platformsByPriority = useMemo(() => {
    const result: Record<Platform['priority'], Platform[]> = {
      highest: getPlatformsByPriority('highest'),
      high: getPlatformsByPriority('high'),
      medium: getPlatformsByPriority('medium'),
      low: getPlatformsByPriority('low'),
    };
    return result;
  }, []);

  const handleTogglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev => {
      const next = new Set(prev);
      if (next.has(platformId)) {
        next.delete(platformId);
      } else {
        next.add(platformId);
      }
      return next;
    });
  };

  const handleSelectAllInSection = (priority: Platform['priority']) => {
    const platformIds = platformsByPriority[priority].map(p => p.id);
    setSelectedPlatforms(prev => {
      const next = new Set(prev);
      const allSelected = platformIds.every(id => next.has(id));

      if (allSelected) {
        // Deselect all in this section
        platformIds.forEach(id => next.delete(id));
      } else {
        // Select all in this section
        platformIds.forEach(id => next.add(id));
      }
      return next;
    });
  };

  const isSectionFullySelected = (priority: Platform['priority']) => {
    const platformIds = platformsByPriority[priority].map(p => p.id);
    return platformIds.every(id => selectedPlatforms.has(id));
  };

  const handleCustomKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentCustomInput.trim()) {
      e.preventDefault();
      setCustomPlatforms([...customPlatforms, currentCustomInput.trim()]);
      setCurrentCustomInput('');
    }
  };

  const handleRemoveCustom = (index: number) => {
    setCustomPlatforms(customPlatforms.filter((_, i) => i !== index));
  };

  const handleContinue = () => {
    const totalSelected = selectedPlatforms.size + customPlatforms.length;
    if (totalSelected === 0) return;

    completeOnboarding(Array.from(selectedPlatforms));
    if (customPlatforms.length > 0) {
      addCustomPlatforms(customPlatforms);
    }
    router.push('/dashboard');
  };

  const totalSelected = selectedPlatforms.size + customPlatforms.length;

  const showAllPlatforms = () => {
    setExpanded(true);
  };

  const canExpand = !expanded;

  return (
    <main className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Select your accounts
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Tap each platform you use
              </p>
            </div>
            <button
              onClick={() => router.push('/')}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              Back
            </button>
          </div>
        </div>
      </header>

      {/* Platform sections */}
      <section className="flex-1 px-6 py-6 pb-32">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Always render highest priority first */}
          {(() => {
            const platforms = platformsByPriority['highest'];
            const { emoji, label } = PRIORITY_LABELS['highest'];
            const allSelected = isSectionFullySelected('highest');

            return (
              <div className="animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <span>{emoji}</span>
                    <span>{label}</span>
                    <span className="text-sm font-normal text-gray-400">
                      ({platforms.length})
                    </span>
                  </h2>
                  <button
                    onClick={() => handleSelectAllInSection('highest')}
                    className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
                      allSelected
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                    }`}
                  >
                    {allSelected ? '✓ Selected' : 'Select all'}
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {platforms.map((platform) => (
                    <PlatformCard
                      key={platform.id}
                      platform={platform}
                      selected={selectedPlatforms.has(platform.id)}
                      onClick={() => handleTogglePlatform(platform.id)}
                    />
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Show all platforms button */}
          {canExpand && (
            <div className="text-center py-6">
              <button
                onClick={showAllPlatforms}
                className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors w-full max-w-md"
              >
                <span className="text-base font-semibold text-gray-700 dark:text-gray-200">
                  Show me more sites to pick from
                </span>
                <ArrowDown size={18} />
              </button>
            </div>
          )}

          {/* Custom platforms section - right after "show me more" button */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            {!showCustomInput ? (
              <button
                onClick={() => {
                  setShowCustomInput(true);
                  setTimeout(() => customInputRef.current?.focus(), 100);
                }}
                className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium"
              >
                <Plus size={18} />
                Don&apos;t see your platform? Add it here
              </button>
            ) : (
              <div className="animate-fade-in">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  Add Custom Platforms
                </h3>
                <div className="mb-4">
                  <input
                    ref={customInputRef}
                    type="text"
                    value={currentCustomInput}
                    onChange={(e) => setCurrentCustomInput(e.target.value)}
                    onKeyDown={handleCustomKeyDown}
                    placeholder="Type a platform name and press Enter..."
                    className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-600 text-gray-900 dark:text-gray-100"
                  />
                </div>

                {customPlatforms.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                    {customPlatforms.map((platform, index) => (
                      <div
                        key={index}
                        className="relative flex items-center gap-3 px-3 py-2.5 rounded-xl border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                      >
                        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {platform[0]?.toUpperCase()}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate flex-1">
                          {platform}
                        </span>
                        <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                          <Check size={12} className="text-white" strokeWidth={3} />
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveCustom(index);
                          }}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gray-500 hover:bg-red-500 rounded-full flex items-center justify-center transition-colors shadow-sm"
                          title="Remove"
                        >
                          <X size={10} className="text-white" strokeWidth={3} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Additional priority sections (shown after "show me more" is clicked) */}
          {!canExpand && (['high', 'medium', 'low'] as const).map((priority) => {
            const platforms = platformsByPriority[priority];
            const { emoji, label } = PRIORITY_LABELS[priority];
            const allSelected = isSectionFullySelected(priority);

            return (
              <div key={priority} className="animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <span>{emoji}</span>
                    <span>{label}</span>
                    <span className="text-sm font-normal text-gray-400">
                      ({platforms.length})
                    </span>
                  </h2>
                  <button
                    onClick={() => handleSelectAllInSection(priority)}
                    className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
                      allSelected
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                    }`}
                  >
                    {allSelected ? '✓ Selected' : 'Select all'}
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {platforms.map((platform) => (
                    <PlatformCard
                      key={platform.id}
                      platform={platform}
                      selected={selectedPlatforms.has(platform.id)}
                      onClick={() => handleTogglePlatform(platform.id)}
                    />
                  ))}
                </div>
              </div>
            );
          })}

        </div>
      </section>

      {/* Sticky continue button */}
      <div className="fixed bottom-0 left-0 right-0 z-20">
        <div className="bg-gradient-to-t from-white via-white dark:from-gray-950 dark:via-gray-950 pt-6 pb-8 px-6">
          <div className="max-w-3xl mx-auto">
            <Button
              size="lg"
              onClick={handleContinue}
              disabled={totalSelected === 0}
              className="w-full text-lg py-4 shadow-lg"
            >
              {totalSelected === 0
                ? 'Select at least one platform'
                : `Continue with ${totalSelected} platform${totalSelected !== 1 ? 's' : ''}`}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
