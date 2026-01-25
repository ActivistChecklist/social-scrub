'use client';

import { useState, useMemo, useRef, useEffect, KeyboardEvent } from 'react';
import { getPlatformsByPriority, PRIORITY_LABELS } from '@/lib/platforms';
import { Platform } from '@/lib/types';
import Button from '@/components/ui/Button';
import PlatformCard from '@/components/PlatformCard';
import { X, Plus, Check } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';

interface AddPlatformsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPlatforms: (platformIds: string[]) => void;
  onAddCustomPlatforms: (platformNames: string[]) => void;
  existingPlatformIds: string[];
}

type PriorityLevel = 'highest' | 'high' | 'medium' | 'low';
const PRIORITY_ORDER: PriorityLevel[] = ['highest', 'high', 'medium', 'low'];

export default function AddPlatformsModal({
  isOpen,
  onClose,
  onAddPlatforms,
  onAddCustomPlatforms,
  existingPlatformIds,
}: AddPlatformsModalProps) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<Set<string>>(new Set());
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customPlatforms, setCustomPlatforms] = useState<string[]>([]);
  const [currentCustomInput, setCurrentCustomInput] = useState('');
  const [showAnalyticsPrompt, setShowAnalyticsPrompt] = useState(false);
  const customInputRef = useRef<HTMLInputElement>(null);
  const { trackPlatformSuggestion } = useAnalytics();

  // Get all platforms grouped by priority, filtered to exclude already selected
  const platformsByPriority = useMemo(() => {
    const result: Record<PriorityLevel, Platform[]> = {
      highest: [],
      high: [],
      medium: [],
      low: [],
    };

    PRIORITY_ORDER.forEach((priority) => {
      const platforms = getPlatformsByPriority(priority);
      result[priority] = platforms.filter(p => !existingPlatformIds.includes(p.id));
    });

    return result;
  }, [existingPlatformIds]);

  // Check if there are any platforms left to add
  const hasAvailablePlatforms = useMemo(() => {
    return PRIORITY_ORDER.some(priority => platformsByPriority[priority].length > 0);
  }, [platformsByPriority]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPlatforms(new Set());
        setCustomPlatforms([]);
        setCurrentCustomInput('');
        setShowCustomInput(false);
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

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

  const handleSelectAllInSection = (priority: PriorityLevel) => {
    const platformIds = platformsByPriority[priority].map(p => p.id);
    setSelectedPlatforms(prev => {
      const next = new Set(prev);
      const allSelected = platformIds.every(id => next.has(id));

      if (allSelected) {
        platformIds.forEach(id => next.delete(id));
      } else {
        platformIds.forEach(id => next.add(id));
      }
      return next;
    });
  };

  const isSectionFullySelected = (priority: PriorityLevel) => {
    const platformIds = platformsByPriority[priority].map(p => p.id);
    return platformIds.length > 0 && platformIds.every(id => selectedPlatforms.has(id));
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

  const handleDone = () => {
    // If there are custom platforms, show the analytics prompt first
    if (customPlatforms.length > 0) {
      setShowAnalyticsPrompt(true);
      return;
    }
    
    // No custom platforms, just add selected ones
    if (selectedPlatforms.size > 0) {
      onAddPlatforms(Array.from(selectedPlatforms));
    }
    handleClose();
  };

  const handleConfirmWithTracking = () => {
    // Track each custom platform suggestion
    customPlatforms.forEach((platformName) => {
      trackPlatformSuggestion(platformName);
    });
    finishAdding();
  };

  const handleConfirmWithoutTracking = () => {
    finishAdding();
  };

  const finishAdding = () => {
    if (selectedPlatforms.size > 0) {
      onAddPlatforms(Array.from(selectedPlatforms));
    }
    if (customPlatforms.length > 0) {
      onAddCustomPlatforms(customPlatforms);
    }
    handleClose();
  };

  const handleClose = () => {
    setSelectedPlatforms(new Set());
    setCustomPlatforms([]);
    setCurrentCustomInput('');
    setShowCustomInput(false);
    setShowAnalyticsPrompt(false);
    onClose();
  };

  const totalToAdd = selectedPlatforms.size + customPlatforms.length;

  // Analytics consent prompt for custom platforms
  if (showAnalyticsPrompt) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowAnalyticsPrompt(false)}
        />

        {/* Modal */}
        <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-lg w-full p-6 animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Help Us Improve
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Would it be okay if we recorded just the names of these platforms?
            This helps us know which platforms to add support for next.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mb-6">
            Your suggestions remain completely anonymous — we only record the platform names, nothing else.
          </p>

          {/* Platform names being added */}
          <div className="mb-6 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              Custom platforms you&apos;re adding:
            </p>
            <div className="flex flex-wrap gap-2">
              {customPlatforms.map((platform, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-sm rounded"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-2">
            <Button
              onClick={handleConfirmWithTracking}
              className="w-full"
            >
              Yes, share platform names
            </Button>
            <Button
              variant="outline"
              onClick={handleConfirmWithoutTracking}
              className="w-full"
            >
              No thanks, just add them
            </Button>
            <button
              onClick={() => setShowAnalyticsPrompt(false)}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 mt-2"
            >
              ← Back to selection
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Add More Platforms
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Select platforms to add to your privacy checklist
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Add my own button at top */}
          {!showCustomInput && (
            <div className="mb-6">
              <button
                onClick={() => {
                  setShowCustomInput(true);
                  setTimeout(() => customInputRef.current?.focus(), 100);
                }}
                className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium"
              >
                <Plus size={18} />
                Add a platform not in the list
              </button>
            </div>
          )}

          {/* Custom platforms input section - shown at top when expanded */}
          {showCustomInput && (
            <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
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
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-600 text-gray-900 dark:text-gray-100"
                />
              </div>

              {/* Custom platforms displayed like selected platform cards */}
              {customPlatforms.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {customPlatforms.map((platform, index) => (
                    <div
                      key={index}
                      className="relative flex items-center gap-3 px-3 py-2.5 rounded-lg border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                    >
                      {/* Custom platform icon placeholder */}
                      <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {platform[0]?.toUpperCase()}
                        </span>
                      </div>

                      {/* Platform name */}
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate flex-1">
                        {platform}
                      </span>

                      {/* Checkmark */}
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                        <Check size={12} className="text-white" strokeWidth={3} />
                      </div>

                      {/* Remove button - positioned in corner */}
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

              <button
                onClick={() => setShowCustomInput(false)}
                className="mt-3 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Done adding custom platforms
              </button>
            </div>
          )}

          {hasAvailablePlatforms ? (
            <div className="space-y-8">
              {PRIORITY_ORDER.map((priority) => {
                const platforms = platformsByPriority[priority];
                if (platforms.length === 0) return null;

                const { emoji, label } = PRIORITY_LABELS[priority];
                const allSelected = isSectionFullySelected(priority);

                return (
                  <div key={priority}>
                    {/* Section header */}
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                        <span>{emoji}</span>
                        <span>{label}</span>
                        <span className="text-sm font-normal text-gray-400">
                          ({platforms.length})
                        </span>
                      </h3>
                      <button
                        onClick={() => handleSelectAllInSection(priority)}
                        className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
                          allSelected
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600'
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
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              You&apos;ve already added all available platforms.
            </div>
          )}

          {/* Add my own button at bottom too (for convenience) */}
          {!showCustomInput && (
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => {
                  setShowCustomInput(true);
                  setTimeout(() => customInputRef.current?.focus(), 100);
                }}
                className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium"
              >
                <Plus size={18} />
                Add a platform not in the list
              </button>
            </div>
          )}
        </div>

        {/* Footer with action buttons */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-b-xl">
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDone}
              disabled={totalToAdd === 0}
              className="flex-1"
            >
              {totalToAdd > 0 ? `Add ${totalToAdd} Platform${totalToAdd !== 1 ? 's' : ''}` : 'Add Platforms'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
