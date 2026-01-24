'use client';

import Button from '@/components/ui/Button';
import { Bookmark, Shield } from 'lucide-react';

interface LocalStorageInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LocalStorageInfoModal({
  isOpen,
  onClose,
}: LocalStorageInfoModalProps) {
  if (!isOpen) return null;

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
        <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Bookmark className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0" />
            <div>
              <p className="font-semibold text-amber-900 dark:text-amber-100">
                Bookmark this page to save your progress
              </p>
              <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                Return on this same device and browser to continue.
              </p>
            </div>
          </div>
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
