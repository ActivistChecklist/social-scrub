'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Session } from '@/lib/types';
import { saveLocalSession } from '@/lib/storage';
import { useAnalytics } from '@/hooks/useAnalytics';
import Button from '@/components/ui/Button';

interface SessionPageProps {
  params: { sessionId: string };
}

export default function SessionPage({ params }: SessionPageProps) {
  const { sessionId } = params;
  const router = useRouter();
  const { trackPageView } = useAnalytics();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    trackPageView();
  }, [trackPageView]);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const response = await fetch(`/api/session/${sessionId}`);
        const data = await response.json();

        if (!data.success) {
          setError(data.error || 'Session not found');
          return;
        }

        setSession(data.session);

        // Also save to localStorage for offline access
        saveLocalSession(data.session);
      } catch {
        setError('Failed to load session');
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-gray-500 mb-2">Loading session...</div>
          <p className="text-sm text-gray-400">ID: {sessionId}</p>
        </div>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="mb-6">
            <span className="text-6xl">🔍</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Session Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error || 'The session you\'re looking for doesn\'t exist or has expired.'}
          </p>
          <div className="space-y-3">
            <Button onClick={() => router.push('/')} className="w-full">
              Start Fresh
            </Button>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Sessions expire after 90 days of inactivity.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Session loaded successfully, redirect to dashboard
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md text-center animate-fade-in">
        <div className="mb-6">
          <span className="text-6xl">👋</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Welcome Back!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-2">
          Your session <strong>{session.id}</strong> has been loaded.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          {session.platforms.length} platforms • {session.platforms.filter(p => p.status === 'secured').length} secured
        </p>
        <Button
          size="lg"
          onClick={() => router.push('/dashboard')}
          className="w-full"
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}
