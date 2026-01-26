'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/hooks/useSession';
import { useAnalytics } from '@/hooks/useAnalytics';
import { getPlatform } from '@/lib/platforms';
import { getStep, TOTAL_STEPS } from '@/lib/steps';
import Button from '@/components/ui/Button';
import PlatformIcon from '@/components/PlatformIcon';
import ProgressIndicator from '@/components/ui/ProgressIndicator';
import { BeforeAfterComparison } from '@/components/step/BeforeAfterBox';
import CollapsibleHelp from '@/components/step/CollapsibleHelp';
import WhyImportant from '@/components/step/WhyImportant';
import RandomNameGenerator from '@/components/step/RandomNameGenerator';
import RandomUsernameGenerator from '@/components/step/RandomUsernameGenerator';
import { EmailSuggestion } from '@/components/step/SuggestionBox';
import BlockPartySuggestion from '@/components/step/BlockPartySuggestion';
import CydSuggestion from '@/components/step/CydSuggestion';
import LucideIcon, { Check, ChevronRight } from '@/components/ui/LucideIcon';
import LocalStorageInfoModal from '@/components/LocalStorageInfoModal';
import { Trash2, Lock, ChevronLeft, Save, Info, ExternalLink } from 'lucide-react';

interface StepPageProps {
  params: { platformId: string; step: string };
}

export default function StepPage({ params }: StepPageProps) {
  const { platformId, step: stepParam } = params;
  const stepNumber = parseInt(stepParam, 10);
  const router = useRouter();
  const {
    session,
    isLoading,
    getPlatform: getPlatformProgress,
    completeStep,
    skipStep,
    deletePlatform,
  } = useSession();
  const { trackPageView, trackStepComplete, trackStepSkip, trackPlatformDelete } = useAnalytics();

  // State for delete step flow
  const [showDeleteInstructions, setShowDeleteInstructions] = useState(false);

  useEffect(() => {
    trackPageView();
  }, [trackPageView]);
  // State to track navigation - prevents button flash
  const [isNavigating, setIsNavigating] = useState(false);
  // State for storage info modal
  const [showStorageInfoModal, setShowStorageInfoModal] = useState(false);

  // Try to get built-in platform first, then check custom sites
  let platform = getPlatform(platformId);
  let isCustomPlatform = false;

  if (!platform && session) {
    const customSite = session.customSites.find(s => s.id === platformId);
    if (customSite) {
      platform = {
        id: customSite.id,
        name: customSite.name,
        icon: undefined,
        category: 'other' as const,
        priority: customSite.priority === 'high' ? 'high' : customSite.priority === 'medium' ? 'medium' : 'low',
      };
      isCustomPlatform = true;
    }
  }

  const progress = getPlatformProgress(platformId);
  const step = getStep(stepNumber);

  useEffect(() => {
    if (!isLoading && (!platform || !step || stepNumber < 1 || stepNumber > TOTAL_STEPS)) {
      router.push('/dashboard');
    }
  }, [isLoading, platform, step, stepNumber, router]);

  if (isLoading || !platform || !step) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  const completedSteps = progress?.completedSteps || [];
  const skippedSteps = progress?.skippedSteps || [];
  const isStepCompleted = completedSteps.includes(stepNumber);
  const isStepSkipped = skippedSteps.includes(stepNumber);
  const isStepHandled = isStepCompleted || isStepSkipped;

  const handleDone = () => {
    setIsNavigating(true);
    completeStep(platformId, stepNumber);
    trackStepComplete(platformId, stepNumber);
    if (stepNumber === TOTAL_STEPS) {
      // Check if there are skipped steps (excluding delete step 1)
      // After completing this step, the skipped steps remain the same
      const hasSkippedSteps = skippedSteps.filter(s => s > 1).length > 0;
      router.push(`/platform/${platformId}/${hasSkippedSteps ? 'incomplete' : 'complete'}`);
    } else {
      router.push(`/platform/${platformId}/${stepNumber + 1}`);
    }
  };

  const handleSkip = () => {
    setIsNavigating(true);
    skipStep(platformId, stepNumber);
    trackStepSkip(platformId, stepNumber);
    if (stepNumber === TOTAL_STEPS) {
      // After skipping this step, we'll have at least this step as skipped
      // So always go to incomplete
      router.push(`/platform/${platformId}/incomplete`);
    } else {
      router.push(`/platform/${platformId}/${stepNumber + 1}`);
    }
  };

  const handleDeleteAccount = () => {
    deletePlatform(platformId);
    trackPlatformDelete(platformId);
    router.push(`/platform/${platformId}/complete`);
  };

  const handleKeepAccount = () => {
    skipStep(platformId, 1);
    router.push(`/platform/${platformId}/2`);
  };

  const handleStepClick = (targetStep: number) => {
    // Mark any steps between current position and target as skipped if not handled
    if (targetStep > stepNumber) {
      for (let i = stepNumber; i < targetStep; i++) {
        if (!completedSteps.includes(i) && !skippedSteps.includes(i)) {
          skipStep(platformId, i);
        }
      }
    }
    router.push(`/platform/${platformId}/${targetStep}`);
  };

  const isDeleteStep = step.isDeleteStep;
  const displayStepNumber = stepNumber - 1;
  const displayTotalSteps = TOTAL_STEPS - 1;

  return (
    <main className="min-h-screen flex flex-col bg-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-gray-900 border-b border-gray-800 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isCustomPlatform ? (
                <div className="w-10 h-10 bg-brand-900/30 rounded-lg flex items-center justify-center text-lg">
                  📱
                </div>
              ) : (
                <div className="p-1.5 bg-brand-900/20 rounded-lg">
                  <PlatformIcon
                    iconName={platform.icon}
                    logoUrl={platform.logoUrl}
                    platformName={platform.name}
                    size={28}
                  />
                </div>
              )}
              <div>
                <h1 className="font-heading font-bold text-lg text-brand tracking-tight">
                  {platform.name}
                </h1>
                {!isDeleteStep && (
                  <p className="text-sm text-gray-400">
                    Step {displayStepNumber} of {displayTotalSteps}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowStorageInfoModal(true)}
                className="hidden sm:flex items-center gap-2 text-sm text-gray-300 transition-all duration-200 font-medium px-3 py-1.5 rounded-lg border border-transparent hover:border-gray-600 hover:bg-gray-800"
              >
                <Save size={16} />
                <span>Auto-saved locally</span>
                <Info size={14} className="text-gray-400" />
              </button>
              <Button
                onClick={() => router.push('/dashboard')}
                variant="outline"
                size="sm"
              >
                Dashboard
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Progress indicator - only show for non-delete steps */}
      {!isDeleteStep && (
        <div className="border-b border-gray-800 bg-gray-900">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <ProgressIndicator
              currentStep={stepNumber}
              completedSteps={completedSteps}
              skippedSteps={skippedSteps}
              platformId={platformId}
              onStepClick={handleStepClick}
            />
          </div>
        </div>
      )}

      {/* Step content */}
      <section className="flex-1">
        <div className="animate-slide-in-right" key={stepNumber}>
          {/* PRIMARY SECTION: Step info and action buttons */}
          <div className="bg-gray-900 border-b border-gray-800">
            <div className="max-w-4xl mx-auto px-6 py-8">
              <div className="flex flex-col md:flex-row md:items-start md:gap-8">
                {/* Icon */}
                <div className="flex-shrink-0 mb-4 md:mb-0">
                  <div className="w-16 h-16 md:w-20 md:h-20 mx-auto md:mx-0 rounded-2xl bg-gray-800 flex items-center justify-center text-gray-300">
                    <LucideIcon name={step.icon} size={40} />
                  </div>
                </div>

                {/* Title, description, and buttons */}
                <div className="flex-1 text-center md:text-left">
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-100 mb-2 tracking-tight">
                    {step.title}
                    <span className="text-brand"> on {platform.name}</span>
                  </h2>
                  {/* Fixed height container for description to prevent button movement */}
                  <div className="min-h-[3rem] mb-6">
                    <p className="text-gray-400 max-w-xl">
                      {step.description}
                    </p>
                    {platform.url && !isDeleteStep && (
                      <a
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-brand hover:text-brand-light hover:underline transition-colors mt-2"
                      >
                        Open {platform.name}
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>

                  {/* Delete step - two option boxes */}
                  {isDeleteStep && !showDeleteInstructions ? (
                    <div className="space-y-4 max-w-2xl">
                      {/* Option 1: Delete account */}
                      <button
                        onClick={() => setShowDeleteInstructions(true)}
                        className="w-full text-left bg-transparent border-2 border-red-700 rounded-xl p-5 transition-all hover:bg-red-950/40 group"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Trash2 size={20} className="text-red-400" />
                              <h3 className="font-heading font-semibold text-red-400 tracking-tight">Option 1: Delete the account</h3>
                            </div>
                            <p className="text-sm text-gray-400">
                              Deleting your profile is the most private option if you can manage without it.
                            </p>
                          </div>
                          <ChevronRight size={24} className="text-red-400 transition-transform group-hover:translate-x-1 flex-shrink-0" />
                        </div>
                      </button>

                      {/* Option 2: Keep & lock down */}
                      <button
                        onClick={handleKeepAccount}
                        className="w-full text-left bg-transparent border-2 border-emerald-700 rounded-xl p-5 transition-all hover:bg-emerald-950/40 group"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Lock size={20} className="text-emerald-400" />
                              <h3 className="font-heading font-semibold text-emerald-400 tracking-tight">Option 2: Keep &amp; lock it down</h3>
                            </div>
                            <p className="text-sm text-gray-400">
                              Keep your account but make it more private.
                            </p>
                          </div>
                          <ChevronRight size={24} className="text-emerald-400 transition-transform group-hover:translate-x-1 flex-shrink-0" />
                        </div>
                      </button>
                    </div>
                  ) : isDeleteStep && showDeleteInstructions ? (
                    <div className="space-y-4 max-w-lg mx-auto md:mx-0">
                      <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
                        <h4 className="font-heading font-semibold text-red-200 mb-2 tracking-tight">How to delete your account:</h4>
                        <p className="text-sm text-red-300">{step.howTo}</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Button
                          size="lg"
                          variant="danger"
                          onClick={handleDeleteAccount}
                          className="w-full flex items-center justify-center gap-2"
                        >
                          I deleted it
                          <ChevronRight size={18} />
                        </Button>
                        <Button
                          size="lg"
                          variant="outline"
                          onClick={() => setShowDeleteInstructions(false)}
                          className="w-full"
                        >
                          Go back
                        </Button>
                      </div>
                    </div>
                  ) : (
                    /* Regular step buttons */
                    <div className="space-y-3 max-w-lg mx-auto md:mx-0">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                          size="lg"
                          onClick={handleDone}
                          className={`flex-1 md:py-4 md:text-lg min-w-[160px] ${isStepSkipped && !isNavigating ? 'bg-transparent border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20' : ''}`}
                          disabled={isNavigating}
                        >
                          {isStepCompleted && !isNavigating ? (
                            <>
                              <Check size={20} className="mr-2" />
                              Marked as Done
                            </>
                          ) : (
                            'I Did This'
                          )}
                        </Button>
                        <Button
                          size="lg"
                          variant={isStepSkipped && !isNavigating ? 'primary' : 'outline'}
                          onClick={handleSkip}
                          className={`flex-1 min-w-[140px] ${isStepSkipped && !isNavigating ? 'bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 border-amber-500' : ''}`}
                          disabled={isNavigating}
                        >
                          {isStepSkipped && !isNavigating ? 'Marked as Skipped' : 'Skip'}
                        </Button>
                      </div>

                      {/* Show "Proceed to Next Step" button when revisiting a completed/skipped step */}
                      {isStepHandled && !isNavigating && stepNumber < TOTAL_STEPS && (
                        <Button
                          size="lg"
                          variant="outline"
                          onClick={() => router.push(`/platform/${platformId}/${stepNumber + 1}`)}
                          className="w-full flex items-center justify-center gap-2"
                        >
                          Proceed to Next Step
                          <ChevronRight size={18} />
                        </Button>
                      )}

                      {/* Go back a step link */}
                      {stepNumber > 2 && (
                        <button
                          onClick={() => router.push(`/platform/${platformId}/${stepNumber - 1}`)}
                          className="text-sm text-gray-400 hover:text-gray-200 flex items-center gap-1 mx-auto md:mx-0 mt-2"
                        >
                          <ChevronLeft size={16} />
                          Go back a step
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Block Party suggestion - full width, breaks container */}
          {/* Shows on steps 7, 8, 9 for platforms with Block Party support */}
          {!isDeleteStep && [7, 8, 9].includes(stepNumber) && platform.hasBlockParty && (
            <BlockPartySuggestion />
          )}

          {/* Cyd suggestion for Twitter - step 7 (delete posts) */}
          {!isDeleteStep && stepNumber === 7 && platformId === 'twitter' && (
            <CydSuggestion />
          )}

          {/* SECONDARY SECTION: Before/after, generators, how-to */}
          {!isDeleteStep && (
            <div className="max-w-4xl mx-auto px-6 py-8">
              <div className="space-y-6">
                {/* Before/After comparison */}
                {step.beforeAfter && (
                  <BeforeAfterComparison
                    before={step.beforeAfter.before}
                    after={step.beforeAfter.after}
                  />
                )}

                {/* Random generators for specific steps - BELOW before/after */}
                {stepNumber === 2 && <RandomNameGenerator />}
                {stepNumber === 4 && <RandomUsernameGenerator />}

                {/* Email suggestion box */}
                {stepNumber === 5 && <EmailSuggestion />}

                {/* Collapsible help */}
                {step.howTo && (
                  <CollapsibleHelp content={step.howTo} />
                )}

                {/* Why is this important */}
                {step.educationalContext && (
                  <WhyImportant content={step.educationalContext} />
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Local storage info modal */}
      <LocalStorageInfoModal
        isOpen={showStorageInfoModal}
        onClose={() => setShowStorageInfoModal(false)}
      />
    </main>
  );
}
