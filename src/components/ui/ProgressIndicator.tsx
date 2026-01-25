'use client';

import { getNonDeleteSteps } from '@/lib/steps';
import LucideIcon, { Check, SkipForward } from '@/components/ui/LucideIcon';

interface ProgressIndicatorProps {
  currentStep: number;
  completedSteps: number[];
  skippedSteps: number[];
  platformId?: string;
  onStepClick?: (stepNumber: number) => void;
}

export default function ProgressIndicator({
  currentStep,
  completedSteps,
  skippedSteps,
  onStepClick,
}: ProgressIndicatorProps) {
  // Only show steps 2-9 (non-delete steps) in progress indicator
  const steps = getNonDeleteSteps();

  const handleStepClick = (stepId: number) => {
    if (onStepClick) {
      onStepClick(stepId);
    }
  };

  return (
    <div className="w-full">
      {/* Icon-based progress indicator */}
      <div className="flex items-center justify-between gap-1">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isSkipped = skippedSteps.includes(step.id);
          const isCurrent = step.id === currentStep;
          const isPreviousHandled = index > 0 && (
            completedSteps.includes(steps[index - 1].id) ||
            skippedSteps.includes(steps[index - 1].id) ||
            steps[index - 1].id < currentStep
          );

          let statusColor = 'bg-gray-700 text-gray-500';
          let borderColor = 'border-gray-700';

          if (isCompleted) {
            statusColor = 'bg-emerald-900 text-emerald-400';
            borderColor = 'border-emerald-500';
          } else if (isSkipped) {
            statusColor = 'bg-amber-900/30 text-amber-400';
            borderColor = 'border-amber-600';
          } else if (isCurrent) {
            statusColor = 'bg-brand-900 text-brand';
            borderColor = 'border-brand';
          }

          return (
            <div
              key={step.id}
              className={`flex items-center ${index === 0 ? '' : 'flex-1'}`}
            >
              {/* Connecting line before step (except first) */}
              {index > 0 && (
                <div
                  className={`h-0.5 flex-1 mx-1 ${
                    isPreviousHandled
                      ? 'bg-emerald-600'
                      : 'bg-gray-600'
                  }`}
                />
              )}

              <button
                onClick={() => handleStepClick(step.id)}
                className="flex flex-col items-center gap-1 group relative cursor-pointer"
                title={`Go to ${step.title}`}
              >
                {/* Step circle with icon */}
                <div
                  className={`w-10 h-10 rounded-full border-2 ${borderColor} ${statusColor} flex items-center justify-center transition-all hover:scale-110 hover:shadow-md relative`}
                >
                  {isCompleted ? (
                    <Check size={20} />
                  ) : isSkipped ? (
                    <>
                      <LucideIcon name={step.icon} size={18} className="opacity-50" />
                      <SkipForward size={12} className="absolute -bottom-0.5 -right-0.5 bg-amber-400 rounded-full p-0.5 text-white" />
                    </>
                  ) : (
                    <LucideIcon name={step.icon} size={20} />
                  )}
                </div>

                {/* Tooltip on hover */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  <div className="bg-gray-100 text-gray-900 text-xs px-2 py-1 rounded whitespace-nowrap">
                    {step.shortTitle}
                    {isSkipped && ' (skipped)'}
                    {isCompleted && ' (done)'}
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
