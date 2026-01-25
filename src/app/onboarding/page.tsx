'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Footer from '@/components/Footer';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Shield } from 'lucide-react';

export default function OnboardingWelcome() {
  const router = useRouter();
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    trackPageView();
  }, [trackPageView]);

  return (
    <main className="min-h-screen flex flex-col bg-gray-950">
      {/* Header */}
      <header className="p-6">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => router.push('/')}
            className="text-gray-500 hover:text-gray-300 text-sm"
          >
            &larr; Back
          </button>
        </div>
      </header>

      {/* Content */}
      <section className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="max-w-lg mx-auto text-center animate-fade-in">
          {/* Shield icon */}
          <div className="w-20 h-20 mx-auto mb-6 bg-brand-900/30 rounded-full flex items-center justify-center">
            <Shield className="w-10 h-10 text-brand" />
          </div>

          <h1 className="font-heading text-4xl font-extrabold text-gray-100 mb-6 tracking-tight">
            Protect Your Privacy
          </h1>

          {/* Simple explanation */}
          <p className="text-lg text-gray-400 mb-8">
            We&apos;ll guide you through locking down your social media accounts step by step.
            Just pick the platforms you use, and we&apos;ll show you exactly what to change.
          </p>

          {/* Why this matters */}
          <div className="mb-10 p-5 bg-brand-900/20 rounded-xl border border-brand-800/50 text-left">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-brand flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-heading font-bold text-brand-100 text-base mb-2 tracking-tight">
                  You can protect yourself from doxxing
                </h3>
                <p className="text-base text-gray-300 mb-3">
                  <strong>&ldquo;Doxxing&rdquo;</strong> is when someone finds and shares your personal
                  information online without your permission&mdash;your real name, where you live,
                  where you work. The good news? Most of this information comes from social media
                  profiles, and you can lock it down.
                </p>
                <a
                  href="https://activistchecklist.org/doxxing/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand hover:text-brand-light font-medium text-sm underline"
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

          <p className="mt-6 text-sm text-gray-500">
            Takes about 5 minutes per account
          </p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
