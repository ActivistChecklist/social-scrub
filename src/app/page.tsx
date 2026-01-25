'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/hooks/useSession';
import { useAnalytics } from '@/hooks/useAnalytics';
import Button from '@/components/ui/Button';
import Logo from '@/components/ui/Logo';
import Footer from '@/components/Footer';
import {
  Shield,
  ListChecks,
  Target,
  Clock,
  ExternalLink,
  Trash2,
  User,
  Image,
  AtSign,
  Mail,
  MapPin,
  Images,
  Users,
  Settings,
  ChevronDown,
  Eye,
  EyeOff,
  Lock,
} from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const { hasSession } = useSession();
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    trackPageView();
  }, [trackPageView]);

  return (
    <main className="min-h-screen flex flex-col bg-gray-950">
      {/* Header */}
      <header className="p-6">
        <div className="max-w-5xl mx-auto">
          <Logo size="md" />
        </div>
      </header>

      {/* Hero section */}
      <section className="px-6 pt-8 pb-16 md:pt-16 md:pb-24">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="font-heading text-4xl md:text-6xl font-extrabold text-gray-100 mb-6 leading-tight tracking-tight">
            Lock down your
            <br />
            <span className="text-brand">social media privacy</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            A simple checklist to secure all your accounts. Pick your platforms, follow the steps, track your progress.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              onClick={() => router.push(hasSession ? '/dashboard' : '/onboarding/select')}
              className="text-lg py-4 px-10"
            >
              {hasSession ? 'Continue to Dashboard' : 'Start Securing Your Accounts'}
            </Button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-brand-900/50 flex items-center justify-center text-brand text-xs">✓</span>
              No account needed
            </span>
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-brand-900/50 flex items-center justify-center text-brand text-xs">✓</span>
              100% free
            </span>
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-brand-900/50 flex items-center justify-center text-brand text-xs">✓</span>
              Data stays on your device
            </span>
          </div>
        </div>
      </section>

      {/* How it works - horizontal steps */}
      <section className="px-6 py-16 bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-sm font-semibold text-brand uppercase tracking-wider text-center mb-12">
            How it works
          </h2>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-brand-900/30 flex items-center justify-center">
                <Target className="w-8 h-8 text-brand" />
              </div>
              <h3 className="font-heading text-lg font-bold text-gray-100 mb-2 tracking-tight">
                1. Pick your platforms
              </h3>
              <p className="text-gray-400">
                Select from 130+ sites you might have accounts on, including ones you may have forgotten
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-brand-900/30 flex items-center justify-center">
                <ListChecks className="w-8 h-8 text-brand" />
              </div>
              <h3 className="font-heading text-lg font-bold text-gray-100 mb-2 tracking-tight">
                2. Follow the checklist
              </h3>
              <p className="text-gray-400">
                Work through 8 universal privacy steps that apply to every platform
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-brand-900/30 flex items-center justify-center">
                <Clock className="w-8 h-8 text-brand" />
              </div>
              <h3 className="font-heading text-lg font-bold text-gray-100 mb-2 tracking-tight">
                3. Track your progress
              </h3>
              <p className="text-gray-400">
                Come back anytime to continue where you left off
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Doxxing explanation */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-brand-900/20 rounded-2xl border border-brand-800/50 p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="w-14 h-14 rounded-2xl bg-brand-900/50 flex items-center justify-center flex-shrink-0 mx-auto md:mx-0">
                <Shield className="w-7 h-7 text-brand" />
              </div>
              <div className="text-center md:text-left">
                <h2 className="font-heading text-2xl font-extrabold text-gray-100 mb-3 tracking-tight">
                  Protect yourself from doxxing
                </h2>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  <strong className="text-gray-100">Doxxing</strong> is when someone finds and shares your personal information online without permission&mdash;your real name, address, or workplace. Most of this info comes from social media profiles, and you can lock it down.
                </p>
                <a
                  href="https://activistchecklist.org/doxxing/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand hover:text-brand-light font-semibold transition-colors"
                >
                  Read our doxxing defense guide
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 8 Privacy Steps */}
      <section className="px-6 py-16 bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-sm font-semibold text-brand uppercase tracking-wider mb-4">
              The Privacy Checklist
            </h2>
            <p className="font-heading text-2xl md:text-3xl font-extrabold text-gray-100 tracking-tight">
              8 steps to lock down each account
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Trash2, title: 'Delete or Keep', desc: 'Decide if you need this account at all' },
              { icon: User, title: 'Display Name', desc: 'Remove your real name from your profile' },
              { icon: Image, title: 'Profile Photo', desc: 'Replace photos that show your face' },
              { icon: AtSign, title: 'Username', desc: 'Use a unique handle for each platform' },
              { icon: Mail, title: 'Email Address', desc: 'Use unique emails to prevent linking' },
              { icon: MapPin, title: 'Location & Bio', desc: 'Remove identifying details' },
              { icon: Images, title: 'Posts & Photos', desc: 'Clean up location-revealing content' },
              { icon: Settings, title: 'Privacy Settings', desc: 'Lock down who can see your profile' },
            ].map((step, i) => (
              <div
                key={i}
                className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-900/30 flex items-center justify-center">
                    <step.icon className="w-4 h-4 text-brand" />
                  </div>
                  <h3 className="font-heading font-semibold text-gray-100 text-sm tracking-tight">
                    {step.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-400 pl-11">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
              <div className="w-12 h-12 rounded-xl bg-red-900/30 flex items-center justify-center mb-5">
                <Eye className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="font-heading text-xl font-bold text-gray-100 mb-3 tracking-tight">
                Before: Visible to everyone
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">×</span>
                  Your real name appears in search results
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">×</span>
                  Same username links all your accounts
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">×</span>
                  Photos reveal your face and location
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">×</span>
                  Bio shows where you work and live
                </li>
              </ul>
            </div>

            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
              <div className="w-12 h-12 rounded-xl bg-emerald-900/30 flex items-center justify-center mb-5">
                <EyeOff className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="font-heading text-xl font-bold text-gray-100 mb-3 tracking-tight">
                After: Private and secure
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">✓</span>
                  Pseudonym keeps your identity private
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">✓</span>
                  Unique usernames prevent cross-linking
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">✓</span>
                  Generic avatar protects your image
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">✓</span>
                  No personal details to exploit
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Who this is for */}
      <section className="px-6 py-16 bg-gray-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-sm font-semibold text-brand uppercase tracking-wider mb-4">
            Who this is for
          </h2>
          <p className="font-heading text-2xl md:text-3xl font-extrabold text-gray-100 mb-8 tracking-tight">
            Anyone who wants to protect their privacy online
          </p>
          <div className="grid sm:grid-cols-3 gap-6 text-left">
            {[
              { icon: Users, title: 'Activists & Organizers', desc: 'Protect yourself from targeted harassment and keep your personal life separate from your advocacy.' },
              { icon: Shield, title: 'Privacy-Conscious People', desc: 'Take control of your digital footprint and limit what strangers can learn about you online.' },
              { icon: Lock, title: 'Anyone Starting Fresh', desc: 'Clean up old accounts, remove embarrassing posts, and build better privacy habits.' },
            ].map((item, i) => (
              <div key={i} className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <div className="w-10 h-10 rounded-lg bg-brand-900/30 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-brand" />
                </div>
                <h3 className="font-heading font-bold text-gray-100 mb-2 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-brand uppercase tracking-wider text-center mb-4">
            FAQ
          </h2>
          <p className="font-heading text-2xl md:text-3xl font-extrabold text-gray-100 text-center mb-10 tracking-tight">
            Common questions
          </p>

          <FAQAccordion />
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-16 text-center bg-gray-900/50">
        <div className="max-w-lg mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-gray-100 mb-4 tracking-tight">
            Ready to lock down your accounts?
          </h2>
          <p className="text-gray-400 mb-8">
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

const faqItems = [
  {
    question: 'Do I need to create an account?',
    answer: 'No. Social Scrub works entirely in your browser with no sign-up required. Your progress is saved locally on your device, so you can close the tab and come back later.',
  },
  {
    question: 'Is my data sent to a server?',
    answer: 'No. Everything stays on your device. We never see your selected platforms, your progress, or any personal information. The only data we collect is anonymous analytics (page views) to improve the site.',
  },
  {
    question: 'Why do I need to do this on each platform separately?',
    answer: 'Each social media platform has its own privacy settings and interface. While the steps are universal (change your name, remove location, etc.), you need to apply them individually in each platform\'s settings.',
  },
  {
    question: 'What if I can\'t find a setting?',
    answer: 'Some platforms hide privacy settings or don\'t offer certain options. If you can\'t complete a step, just skip it and move on. Doing most of the steps still significantly improves your privacy.',
  },
  {
    question: 'Should I delete my accounts or lock them down?',
    answer: 'It depends on whether you need the account. Deleting is the most private option—if you don\'t use a platform, delete it. But if you need the account for work or staying connected, locking it down with privacy settings is the next best thing.',
  },
  {
    question: 'How long does this take?',
    answer: 'Each platform takes about 5-10 minutes to fully secure. You don\'t have to do everything at once—your progress is saved, so you can do one platform per day if you prefer.',
  },
  {
    question: 'Will this completely protect me from doxxing?',
    answer: 'It significantly reduces your risk by removing the most common sources of personal information. However, no solution is 100% foolproof. This tool focuses on social media, but you should also consider data brokers, public records, and other sources.',
  },
];

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqItems.map((item, index) => (
        <div
          key={index}
          className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-gray-800/50 transition-colors"
          >
            <span className="font-medium text-gray-100">{item.question}</span>
            <ChevronDown
              className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openIndex === index && (
            <div className="px-6 pb-4">
              <p className="text-gray-400 leading-relaxed">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
