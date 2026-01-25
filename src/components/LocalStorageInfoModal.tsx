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
        {/* Primary CTA - Bookmark reminder */}
        <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-4">
          <div className="flex items-start gap-3">
            <Bookmark className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0" />
            <div>
              <p className="font-semibold text-amber-900 dark:text-amber-100">
                Save this page to continue later
              </p>
              <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                Return on this same device and browser to continue.
              </p>
            </div>
          </div>
        </div>

        {/* Drag to bookmark bar */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 text-center">
            Drag this to your bookmarks bar:
          </p>
          <a
            href={currentUrl}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/40 border-2 border-dashed border-amber-300 dark:border-amber-700 rounded-lg text-amber-800 dark:text-amber-200 font-medium text-sm hover:border-amber-400 dark:hover:border-amber-600 transition-colors cursor-grab active:cursor-grabbing"
            onClick={(e) => {
              e.preventDefault();
              alert('Drag this link to your bookmarks bar to save it!');
            }}
          >
            <GripHorizontal className="w-4 h-4 opacity-60" />
            <Bookmark className="w-4 h-4" />
            <span>{pageTitle}</span>
          </a>
        </div>

        {/* Email to self */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 text-center">
            Or email yourself a reminder:
          </p>
          <a
            href={mailtoLink}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg text-blue-700 dark:text-blue-300 font-medium text-sm hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Email this link to myself</span>
          </a>
        </div>

        {/* Privacy note */}
        <div className="flex items-start gap-3 text-gray-600 dark:text-gray-400 mb-6">
          <Shield className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm">
            Your data stays 100% private on your device. We never see your progress.
          </p>
        </div>

        <Button onClick={handleClose} className="w-full mb-4">
          Got it
        </Button>

        {/* Reset data option */}
        {onReset && (
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setShowResetConfirm(true)}
              className="w-full text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
            >
              Reset all data and start over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
