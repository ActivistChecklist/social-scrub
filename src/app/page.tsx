'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/hooks/useSession';
import Button from '@/components/ui/Button';
import Footer from '@/components/Footer';
import { Shield, Check, X, ExternalLink } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const { session, isLoading, hasSession } = useSession();

  useEffect(() => {
    // If user has completed onboarding, redirect to dashboard
    if (!isLoading && hasSession) {
      router.push('/dashboard');
    }
  }, [isLoading, hasSession, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="p-6">
        <div className="max-w-5xl mx-auto">
          <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Social Scrub
          </span>
        </div>
      </header>

      {/* Hero section */}
      <section className="px-6 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
            {/* Left side - main content */}
            <div className="flex-1 text-center lg:text-left animate-fade-in">
              <div className="mb-6 lg:mb-8">
                <span className="text-6xl lg:text-7xl">🛡️</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-5 leading-tight">
                Lock down your
                <br />
                social media
              </h1>

              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0">
                You have a lot of social media profiles. We help you keep track of which ones you need to lock down and the lockdown steps for each.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Button
                  size="lg"
                  onClick={() => router.push('/onboarding/select')}
                  className="text-lg py-4 px-8"
                >
                  Get Started
                </Button>
              </div>

              {session && !session.onboardingComplete && (
                <p className="text-sm text-gray-400 mb-8">
                  You have progress saved. Click to continue.
                </p>
              )}

              {/* Trust badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-2">
                  <span className="text-emerald-500">✓</span> No account needed
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-emerald-500">✓</span> Free forever
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-emerald-500">✓</span> Your data stays local
                </span>
              </div>
            </div>

            {/* Right side - how it works (desktop) */}
            <div className="hidden lg:block flex-1 max-w-md">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">How it works</h3>
                <ol className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-sm font-semibold flex items-center justify-center">1</span>
                    <span className="text-gray-600 dark:text-gray-400">Pick the platforms you use (or might have old accounts on)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-sm font-semibold flex items-center justify-center">2</span>
                    <span className="text-gray-600 dark:text-gray-400">Follow our step-by-step privacy checklist for each</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-sm font-semibold flex items-center justify-center">3</span>
                    <span className="text-gray-600 dark:text-gray-400">Track your progress as you lock down each account</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works - mobile */}
      <section className="lg:hidden px-6 py-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-lg mx-auto">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 text-center">How it works</h3>
          <ol className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-sm font-semibold flex items-center justify-center">1</span>
              <span className="text-gray-600 dark:text-gray-400">Pick the platforms you use (or might have old accounts on)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-sm font-semibold flex items-center justify-center">2</span>
              <span className="text-gray-600 dark:text-gray-400">Follow our step-by-step privacy checklist for each</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-sm font-semibold flex items-center justify-center">3</span>
              <span className="text-gray-600 dark:text-gray-400">Track your progress as you lock down each account</span>
            </li>
          </ol>
        </div>
      </section>

      {/* What we do / don't do */}
      <section className="px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* What we do */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-500" />
                What Social Scrub does
              </h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">•</span>
                  <span>Help you remember which sites you might have accounts on (even old ones you forgot about)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">•</span>
                  <span>Suggest universal privacy steps that work for every platform</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">•</span>
                  <span>Track your progress so you can work through accounts over time</span>
                </li>
              </ul>
            </div>

            {/* What we don't do */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                <X className="w-5 h-5 text-gray-400" />
                What we don&apos;t do
              </h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>Search for which accounts you have (you&apos;ll select them yourself)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>
                    Provide site-specific settings for each platform (for that, check out{' '}
                    <a
                      href="https://blockparty.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
                    >
                      Block Party <ExternalLink className="w-3 h-3" />
                    </a>
                    )
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>Access your accounts or make changes for you</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Doxxing explanation */}
      <section className="px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800 p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="font-semibold text-emerald-900 dark:text-emerald-200 text-lg mb-2">
                  Protect yourself from doxxing
                </h3>
                <p className="text-emerald-800 dark:text-emerald-300 mb-3">
                  <strong>&ldquo;Doxxing&rdquo;</strong> is when someone finds and shares your personal
                  information online without your permission&mdash;your real name, where you live,
                  where you work. The good news? Most of this information comes from social media
                  profiles, and you can lock it down.
                </p>
                <a
                  href="https://activistchecklist.org/doxxing/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium text-sm inline-flex items-center gap-1"
                >
                  Learn more about doxxing defense →
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-12 text-center">
        <div className="max-w-lg mx-auto">
          <Button
            size="lg"
            onClick={() => router.push('/onboarding/select')}
            className="text-lg py-4 px-8"
          >
            Get Started Free
          </Button>
          <p className="mt-4 text-sm text-gray-400 dark:text-gray-500">
            Takes about 5 minutes per account
          </p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
