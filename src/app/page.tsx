'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/hooks/useSession';
import Button from '@/components/ui/Button';

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
        <div className="max-w-4xl mx-auto">
          <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Social Scrub
          </span>
        </div>
      </header>

      {/* Hero section */}
      <section className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-lg mx-auto text-center animate-fade-in">
          <div className="mb-8">
            <span className="text-7xl">🛡️</span>
          </div>

          <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-5 leading-tight">
            Protect your
            <br />
            online privacy
          </h1>

          <p className="text-xl text-gray-500 dark:text-gray-400 mb-10">
            Lock down your social media accounts
            <br />
            so strangers can&apos;t find your personal info.
          </p>

          <Button
            size="lg"
            onClick={() => router.push('/onboarding')}
            className="w-full sm:w-auto min-w-[200px] text-lg py-4 px-8"
          >
            Get Started
          </Button>

          {session && !session.onboardingComplete && (
            <p className="mt-4 text-sm text-gray-400">
              You have progress saved. Click to continue.
            </p>
          )}

          {/* Trust badges - minimal */}
          <div className="mt-16 flex items-center justify-center gap-8 text-sm text-gray-400 dark:text-gray-500">
            <span className="flex items-center gap-2">
              <span className="text-emerald-500">✓</span> No account needed
            </span>
            <span className="flex items-center gap-2">
              <span className="text-emerald-500">✓</span> Free forever
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
