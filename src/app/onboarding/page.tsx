'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Footer from '@/components/Footer';
import { AlertTriangle } from 'lucide-react';

export default function OnboardingWelcome() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="p-6">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => router.push('/')}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm"
          >
            &larr; Back
          </button>
        </div>
      </header>

      {/* Content */}
      <section className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="max-w-md mx-auto text-center animate-fade-in">
          {/* Why this matters - Doxxing explanation */}
          <div className="mb-10 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl text-left">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-900 dark:text-amber-200 text-sm mb-1">
                  Why does this matter?
                </h3>
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  <strong>&ldquo;Doxxing&rdquo;</strong> is when someone finds and shares your personal
                  information online without your permission&mdash;your real name, where you live,
                  where you work. It can happen to anyone, and the information usually comes from
                  social media profiles. This tool helps you hide that information.
                </p>
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-12">
            How it works
          </h1>

          {/* Simple 3-step visual */}
          <div className="space-y-10 mb-14">
            <div className="flex items-center gap-5">
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
                <span className="text-2xl">1</span>
              </div>
              <div className="text-left">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Pick your accounts
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  Select the platforms you use
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
                <span className="text-2xl">2</span>
              </div>
              <div className="text-left">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Follow the steps
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  We guide you through each setting
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
                <span className="text-2xl">3</span>
              </div>
              <div className="text-left">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Stay protected
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  Your info becomes harder to find
                </p>
              </div>
            </div>
          </div>

          <Button
            size="lg"
            onClick={() => router.push('/onboarding/select')}
            className="w-full text-lg py-4"
          >
            Let&apos;s go
          </Button>

          <p className="mt-6 text-sm text-gray-400 dark:text-gray-500">
            Takes about 5 minutes per account
          </p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
