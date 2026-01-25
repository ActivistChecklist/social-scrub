'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import Button from '@/components/ui/Button';
import { useAnalytics } from '@/hooks/useAnalytics';

interface AddCustomPlatformsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (platformNames: string[]) => void;
}

export default function AddCustomPlatformsModal({
  isOpen,
  onClose,
  onAdd,
}: AddCustomPlatformsModalProps) {
  const [currentInput, setCurrentInput] = useState('');
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { trackPlatformSuggestion } = useAnalytics();

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPlatforms([]);
        setCurrentInput('');
        setShowConfirmation(false);
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentInput.trim()) {
      e.preventDefault();
      setPlatforms([...platforms, currentInput.trim()]);
      setCurrentInput('');
    }
  };

  const handleRemove = (index: number) => {
    setPlatforms(platforms.filter((_, i) => i !== index));
  };

  const handleAddClick = () => {
    if (platforms.length > 0) {
      setShowConfirmation(true);
    }
  };

  const handleConfirmWithTracking = () => {
    // Track each platform suggestion
    platforms.forEach((platformName) => {
      trackPlatformSuggestion(platformName);
    });
    finishAdding();
  };

  const handleConfirmWithoutTracking = () => {
    finishAdding();
  };

  const finishAdding = () => {
    onAdd(platforms);
    setPlatforms([]);
    setCurrentInput('');
    setShowConfirmation(false);
    onClose();
  };

  const handleCancel = () => {
    setPlatforms([]);
    setCurrentInput('');
    setShowConfirmation(false);
    onClose();
  };

  const handleBackToEdit = () => {
    setShowConfirmation(false);
  };

  // Confirmation dialog view
  if (showConfirmation) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={handleBackToEdit}
        />

        {/* Modal */}
        <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-lg w-full p-6">
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
              Platforms you&apos;re adding:
            </p>
            <div className="flex flex-wrap gap-2">
              {platforms.map((platform, index) => (
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
              onClick={handleBackToEdit}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 mt-2"
            >
              ← Back to editing
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleCancel}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-lg w-full p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Add Your Own Platforms
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Type a platform name and press Enter to add it. Add as many as you want.
        </p>

        {/* Input field */}
        <div className="mb-4">
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g., MySpace, Tumblr, Discord..."
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-600 text-gray-900 dark:text-gray-100"
            autoFocus
          />
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Press Enter after each platform name
          </p>
        </div>

        {/* List of added platforms */}
        {platforms.length > 0 && (
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 max-h-48 overflow-y-auto">
            <div className="space-y-2">
              {platforms.map((platform, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white dark:bg-gray-800 rounded px-3 py-2"
                >
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {platform}
                  </span>
                  <button
                    onClick={() => handleRemove(index)}
                    className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddClick}
            disabled={platforms.length === 0}
            className="flex-1"
          >
            Add {platforms.length > 0 && `(${platforms.length})`}
          </Button>
        </div>
      </div>
    </div>
  );
}
