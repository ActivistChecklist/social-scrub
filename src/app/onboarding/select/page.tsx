'use client';

import { useState, useMemo, useRef, KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/hooks/useSession';
import { getPlatformsByPriority, PRIORITY_LABELS } from '@/lib/platforms';
import { Platform } from '@/lib/types';
import Button from '@/components/ui/Button';
import PlatformCard from '@/components/PlatformCard';
import Footer from '@/components/Footer';
import { Plus, X } from 'lucide-react';

type DepthLevel = 'essential' | 'recommended' | 'thorough' | 'complete';

const DEPTH_CONFIG: Record<DepthLevel, {
  priorities: Platform['priority'][];
  label: string;
  description: string;
}> = {
  essential: {
    priorities: ['highest'],
    label: 'Essential',
    description: 'The most important platforms to secure',
  },
  recommended: {
    priorities: ['highest', 'high'],
    label: 'Recommended',
    description: 'Covers the platforms most people use',
  },
  thorough: {
    priorities: ['highest', 'high', 'medium'],
    label: 'Thorough',
    description: 'A comprehensive privacy cleanup',
  },
  complete: {
    priorities: ['highest', 'high', 'medium', 'low'],
    label: 'Complete',
    description: 'Every platform we track',
  },
};

export default function PlatformSelection() {
  const router = useRouter();
  const { completeOnboarding, addCustomPlatforms } = useSession();
  const [selectedPlatforms, setSelectedPlatforms] = useState<Set<string>>(new Set());
  const [depthLevel, setDepthLevel] = useState<DepthLevel>('essential');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customPlatforms, setCustomPlatforms] = useState<string[]>([]);
  const [currentCustomInput, setCurrentCustomInput] = useState('');
  const customInputRef = useRef<HTMLInputElement>(null);

  const visiblePriorities = DEPTH_CONFIG[depthLevel].priorities;

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
    setDepthLevel('complete');
  };

  const canExpand = depthLevel !== 'complete';

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
              onClick={() => router.push('/onboarding')}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ← Back
            </button>
          </div>
        </div>
      </header>

      {/* Platform sections */}
      <section className="flex-1 px-6 py-6 pb-32">
        <div className="max-w-3xl mx-auto space-y-8">
          {visiblePriorities.map((priority) => {
            const platforms = platformsByPriority[priority];
            const { emoji, label } = PRIORITY_LABELS[priority];
            const allSelected = isSectionFullySelected(priority);

            return (
              <div key={priority} className="animate-fade-in">
                {/* Section header with Select all */}
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

                {/* Platform grid */}
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

          {/* Show all platforms */}
          {canExpand && (
            <div className="text-center py-8">
              <button
                onClick={showAllPlatforms}
                className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors w-full max-w-md"
              >
                <span className="text-base font-semibold text-gray-700 dark:text-gray-200">
                  I want to review all the social sites
                </span>
                <span className="text-gray-400">→</span>
              </button>
            </div>
          )}

          {/* Custom platforms section */}
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

                {/* List of custom platforms */}
                {customPlatforms.length > 0 && (
                  <div className="space-y-2 mb-4">
                    {customPlatforms.map((platform, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg px-3 py-2"
                      >
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {platform}
                        </span>
                        <button
                          onClick={() => handleRemoveCustom(index)}
                          className="text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer - with extra bottom padding for sticky button */}
          <div className="pt-8">
            <Footer />
          </div>
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
