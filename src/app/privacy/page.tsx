'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 max-w-2xl mx-auto px-6 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 mb-8"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>

        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

        <div className="space-y-6 text-gray-600 dark:text-gray-300">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
              The short version
            </h2>
            <p>
              Social Scrub is designed to help you protect your privacy, so we try to collect as
              little data as possible. Your session data stays in your browser&apos;s local storage.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Hosting
            </h2>
            <p>
              This site is hosted on{' '}
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                Vercel
              </a>
              . When you visit, your IP address is visible to Vercel as part of normal web traffic.
              You can read{' '}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                Vercel&apos;s privacy policy
              </a>{' '}
              for more details on how they handle this data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Analytics
            </h2>
            <p>
              We collect simple page view analytics on a self-hosted server to understand how people
              use Social Scrub. This helps us improve the tool. We don&apos;t use third-party
              tracking services like Google Analytics.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Your data
            </h2>
            <p>
              All your progress and platform selections are stored locally in your browser. 
              Nothing is ever stored on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Questions?
            </h2>
            <p>
              If you have questions about this policy, feel free to{' '}
              <a
                href="https://github.com/ActivistChecklist/social-scrub/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                open an issue on GitHub
              </a>
              .
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
