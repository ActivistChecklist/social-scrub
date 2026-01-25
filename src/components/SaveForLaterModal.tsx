'use client';

import { useState, useEffect } from 'react';
import { Session } from '@/lib/types';
import Button from '@/components/ui/Button';

interface SaveForLaterModalProps {
  session: Session;
  isOpen: boolean;
  onClose: () => void;
  onSaved: (sessionId: string) => void;
}

export default function SaveForLaterModal({
  session,
  isOpen,
  onClose,
  onSaved,
}: SaveForLaterModalProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [savedUrl, setSavedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSavedUrl(null);
        setError(null);
        setCopied(false);
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(session),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to save session');
      }

      const fullUrl = `${window.location.origin}${data.url}`;
      setSavedUrl(fullUrl);
      onSaved(data.sessionId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save session');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopy = async () => {
    if (!savedUrl) return;

    try {
      await navigator.clipboard.writeText(savedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = savedUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClose = () => {
    setSavedUrl(null);
    setError(null);
    setCopied(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6 animate-fade-in">
        {savedUrl ? (
          // Success state - Primary action is copying the link
          <>
            <div className="text-center mb-5">
              <div className="w-14 h-14 mx-auto mb-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                Session Saved!
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Bookmark this link to access your progress from any device
              </p>
            </div>

            {/* URL display - clickable to copy */}
            <div 
              className="mb-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors group"
              onClick={handleCopy}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleCopy()}
            >
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Your unique link:</p>
              <p className="text-sm text-gray-900 dark:text-gray-100 font-mono break-all">
                {savedUrl}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5 group-hover:text-gray-600 dark:group-hover:text-gray-300">
                Click to copy
              </p>
            </div>

            {/* Primary CTA - Copy Link */}
            <Button
              onClick={handleCopy}
              variant={copied ? 'success' : 'primary'}
              className="w-full mb-3"
            >
              {copied ? '✓ Copied to Clipboard' : 'Copy Link'}
            </Button>

            {/* Warning note - subdued */}
            <p className="text-xs text-center text-amber-600 dark:text-amber-400 mb-4">
              Save this link — it&apos;s the only way to access your session from another device. Expires in 90 days.
            </p>

            {/* Secondary dismiss action */}
            <button
              onClick={handleClose}
              className="w-full text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors py-2"
            >
              Done
            </button>
          </>
        ) : (
          // Initial state - Primary action is saving
          <>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Save for Later
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-5">
              Get a unique link to continue your progress on any device.
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              </div>
            )}

            {/* What gets saved - more compact */}
            <div className="mb-5 text-sm text-gray-500 dark:text-gray-400">
              <p className="mb-2">We&apos;ll save:</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">Selected platforms</span>
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">Your progress</span>
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">Completed steps</span>
              </div>
            </div>

            {/* Primary CTA - Save */}
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full mb-3"
            >
              {isSaving ? 'Saving...' : 'Save to Cloud'}
            </Button>

            {/* Privacy note */}
            <p className="text-xs text-center text-gray-400 dark:text-gray-500 mb-3">
              Stored securely and anonymously. No account required.
            </p>

            {/* Secondary dismiss action */}
            <button
              onClick={handleClose}
              className="w-full text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors py-2"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}
