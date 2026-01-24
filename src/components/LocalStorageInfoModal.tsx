'use client';

import Button from '@/components/ui/Button';
import { Monitor, Shield, Trash2 } from 'lucide-react';

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
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Your Data Stays Private
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Everything is stored locally on your device.
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <Shield className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                100% Private
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your progress is never sent to our servers. We can&apos;t see what you&apos;re working on.
              </p>
            </div>
          </div>

          <div className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <Monitor className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                This Device Only
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your progress only exists on this device and browser. Using a different browser or device will start fresh.
              </p>
            </div>
          </div>

          <div className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <Trash2 className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                Clearing Data
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                If you clear your browser&apos;s cookies or browsing data, your progress will be lost.
              </p>
            </div>
          </div>
        </div>

        <Button onClick={onClose} className="w-full">
          Got it
        </Button>
      </div>
    </div>
  );
}
