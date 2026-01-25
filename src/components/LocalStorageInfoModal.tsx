'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import { Bookmark, Shield, Mail, GripHorizontal } from 'lucide-react';

interface LocalStorageInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReset?: () => void;
}

export default function LocalStorageInfoModal({
  isOpen,
  onClose,
  onReset,
}: LocalStorageInfoModalProps) {
  const [currentUrl, setCurrentUrl] = useState('');
  const [pageTitle, setPageTitle] = useState('Social Scrub');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
      setPageTitle(document.title || 'Social Scrub');
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowResetConfirm(false);
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleClose = () => {
    setShowResetConfirm(false);
    onClose();
  };

  const handleResetConfirm = () => {
    if (onReset) {
      onReset();
    }
    handleClose();
  };

  const emailSubject = encodeURIComponent('My Social Scrub Progress Link');
  const emailBody = encodeURIComponent(
    `Here's my link to continue securing my social media accounts:\n\n${currentUrl}\n\nRemember: Open this on the same device and browser where you started!`
  );
  const mailtoLink = `mailto:?subject=${emailSubject}&body=${emailBody}`;

  // Reset confirmation view
  if (showResetConfirm) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setShowResetConfirm(false)}
        />

        {/* Modal */}
        <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6 animate-fade-in">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <span className="text-3xl">⚠️</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Reset All Data?
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              This will permanently delete all your progress, including:
            </p>
          </div>

          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg mb-6 border border-red-200 dark:border-red-800">
            <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
              <li>• All selected platforms</li>
              <li>• All custom platforms you added</li>
              <li>• All step progress on every platform</li>
              <li>• Your onboarding selections</li>
            </ul>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 text-center">
            This action cannot be undone. You&apos;ll need to start over from the beginning.
          </p>

          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              onClick={() => setShowResetConfirm(false)}
              className="w-full"
            >
              Cancel
            </Button>
            <button
              onClick={handleResetConfirm}
              className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
            >
              Yes, Reset Everything
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
        className="absolute inset-0 bg-black/50"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6 animate-fade-in">
        {/* Header */}
        <div className="text-center mb-5">
          <div className="w-12 h-12 mx-auto mb-3 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
            <Bookmark className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            Save Your Progress
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Come back on this same device and browser to continue
          </p>
        </div>

        {/* Grouped save options */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-5">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3 text-center">
            Choose how to save
          </p>
          
          <div className="space-y-2">
            {/* Option 1: Drag to bookmark */}
            <a
              href={currentUrl}
              className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-amber-400 dark:hover:border-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors cursor-grab active:cursor-grabbing group"
              onClick={(e) => {
                e.preventDefault();
                alert('Drag this link to your bookmarks bar to save it!');
              }}
            >
              <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/40 rounded-lg flex items-center justify-center flex-shrink-0">
                <GripHorizontal className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                  Drag to bookmarks bar
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {pageTitle}
                </p>
              </div>
            </a>

            {/* Option 2: Email to self */}
            <a
              href={mailtoLink}
              className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group"
            >
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/40 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                  Email link to myself
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Send a reminder with the link
                </p>
              </div>
            </a>
          </div>
        </div>

        {/* Privacy note - subtle */}
        <div className="flex items-center justify-center gap-2 text-xs text-gray-400 dark:text-gray-500 mb-4">
          <Shield className="w-3.5 h-3.5" />
          <span>Your data stays 100% private on your device</span>
        </div>

        {/* Reset data option - subtle sentence */}
        {onReset && (
          <p className="text-xs text-center text-gray-400 dark:text-gray-500 mb-4">
            Need a fresh start?{' '}
            <button
              onClick={() => setShowResetConfirm(true)}
              className="underline hover:text-red-500 dark:hover:text-red-400 transition-colors"
            >
              Reset all data
            </button>
          </p>
        )}

        {/* Primary dismiss - green success button */}
        <Button variant="success" onClick={handleClose} className="w-full">
          Got it
        </Button>
      </div>
    </div>
  );
}
