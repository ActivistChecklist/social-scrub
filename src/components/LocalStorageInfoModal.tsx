'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import { Bookmark, Shield, Mail, GripHorizontal } from 'lucide-react';

interface LocalStorageInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LocalStorageInfoModal({
  isOpen,
  onClose,
}: LocalStorageInfoModalProps) {
  const [currentUrl, setCurrentUrl] = useState('');
  const [pageTitle, setPageTitle] = useState('Social Scrub');

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
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const emailSubject = encodeURIComponent('My Social Scrub Progress Link');
  const emailBody = encodeURIComponent(
    `Here's my link to continue securing my social media accounts:\n\n${currentUrl}\n\nRemember: Open this on the same device and browser where you started!`
  );
  const mailtoLink = `mailto:?subject=${emailSubject}&body=${emailBody}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
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

        <Button onClick={onClose} className="w-full">
          Got it
        </Button>
      </div>
    </div>
  );
}
