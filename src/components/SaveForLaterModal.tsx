'use client';

import { useState } from 'react';
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
          // Success state
          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                <span className="text-3xl">✅</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Session Saved!
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Use this link to access your session from any device:
              </p>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-2 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <input
                  type="text"
                  readOnly
                  value={savedUrl}
                  className="flex-1 bg-transparent text-sm text-gray-900 dark:text-gray-100 outline-none"
                />
                <Button
                  size="sm"
                  variant={copied ? 'primary' : 'secondary'}
                  onClick={handleCopy}
                >
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            </div>

            <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg mb-6">
              <p className="text-sm text-amber-700 dark:text-amber-300">
                <strong>Important:</strong> Save or bookmark this link. It&apos;s the only
                way to access your session from another device. Your session will be
                available for 90 days.
              </p>
            </div>

            <Button
              onClick={handleClose}
              className="w-full"
            >
              Done
            </Button>
          </>
        ) : (
          // Initial state
          <>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Save for Later
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your progress is currently saved in your browser. Save it to the cloud
              to access from any device with a unique link.
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              </div>
            )}

            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                What gets saved:
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Your selected platforms</li>
                <li>• Progress on each platform</li>
                <li>• Steps completed and skipped</li>
              </ul>
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Your session is stored securely and anonymously. No personal
                  information is required.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="flex-1"
              >
                {isSaving ? 'Saving...' : 'Save to Cloud'}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
