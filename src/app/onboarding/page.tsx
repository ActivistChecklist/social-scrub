'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Footer from '@/components/Footer';
import { Shield } from 'lucide-react';

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
        <div className="max-w-lg mx-auto text-center animate-fade-in">
          {/* Shield icon */}
          <div className="w-20 h-20 mx-auto mb-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
            <Shield className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
          </div>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Protect Your Privacy
          </h1>

          {/* Simple explanation */}
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            We&apos;ll guide you through locking down your social media accounts step by step.
            Just pick the platforms you use, and we&apos;ll show you exactly what to change.
          </p>

          {/* Why this matters - affirmative styling */}
          <div className="mb-10 p-5 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800 text-left">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-emerald-900 dark:text-emerald-200 text-base mb-2">
                  You can protect yourself from doxxing
                </h3>
                <p className="text-base text-emerald-800 dark:text-emerald-300 mb-3">
                  <strong>&ldquo;Doxxing&rdquo;</strong> is when someone finds and shares your personal
                  information online without your permission&mdash;your real name, where you live,
                  where you work. The good news? Most of this information comes from social media
                  profiles, and you can lock it down.
                </p>
                <a
                  href="https://activistchecklist.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium text-sm underline"
                >
                  Learn more about doxxing defense →
                </a>
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
