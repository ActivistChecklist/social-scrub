'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/hooks/useSession';
import Button from '@/components/ui/Button';
import Logo from '@/components/ui/Logo';
import Footer from '@/components/Footer';
import { Shield, ListChecks, Target, Clock, ExternalLink } from 'lucide-react';

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
          <Logo size="md" />
        </div>
      </header>

      {/* Hero section */}
      <section className="px-6 pt-8 pb-16 md:pt-16 md:pb-24">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight tracking-tight">
            Lock down your
            <br />
            <span className="text-emerald-600 dark:text-emerald-400">social media privacy</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            A simple checklist to secure all your accounts. Pick your platforms, follow the steps, track your progress.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              onClick={() => router.push('/onboarding/select')}
              className="text-lg py-4 px-10"
            >
              Start Securing Your Accounts
            </Button>
          </div>

          {session && !session.onboardingComplete && (
            <p className="text-sm text-gray-500 mb-6">
              You have progress saved. Click to continue.
            </p>
          )}

          {/* Trust badges - more prominent */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-xs">✓</span>
              No account needed
            </span>
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-xs">✓</span>
              100% free
            </span>
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-xs">✓</span>
              Data stays on your device
            </span>
          </div>
        </div>
      </section>

      {/* How it works - horizontal steps */}
      <section className="px-6 py-16 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider text-center mb-12">
            How it works
          </h2>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
                <Target className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                1. Pick your platforms
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Select from 130+ sites you might have accounts on, including ones you may have forgotten
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
                <ListChecks className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                2. Follow the checklist
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Work through 8 universal privacy steps that apply to every platform
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
                <Clock className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                3. Track your progress
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Come back anytime to continue where you left off
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Doxxing explanation - more prominent */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-900/30 dark:to-emerald-900/10 rounded-2xl border border-emerald-200 dark:border-emerald-800/50 p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center flex-shrink-0 mx-auto md:mx-0">
                <Shield className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                  Protect yourself from doxxing
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  <strong className="text-gray-900 dark:text-gray-100">Doxxing</strong> is when someone finds and shares your personal information online without permission&mdash;your real name, address, or workplace. Most of this info comes from social media profiles, and you can lock it down.
                </p>
                <a
                  href="https://activistchecklist.org/doxxing/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold transition-colors"
                >
                  Read our doxxing defense guide
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-16 text-center bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Ready to lock down your accounts?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Most accounts take about 5 minutes to secure.
          </p>
          <Button
            size="lg"
            onClick={() => router.push('/onboarding/select')}
            className="text-lg py-4 px-10"
          >
            Get Started Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
