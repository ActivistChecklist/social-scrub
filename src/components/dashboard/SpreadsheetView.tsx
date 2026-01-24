'use client';

import { useState, useMemo } from 'react';
import { Platform, PlatformProgress, CustomSite } from '@/lib/types';
import { getNonDeleteSteps, TOTAL_STEPS } from '@/lib/steps';
import PlatformIcon from '@/components/PlatformIcon';
import LucideIcon from '@/components/ui/LucideIcon';
import { Check, Minus, Trash2, RotateCcw, ChevronDown, PartyPopper } from 'lucide-react';

type PriorityLevel = 'highest' | 'high' | 'medium' | 'low';

const PRIORITY_LABELS: Record<PriorityLevel, string> = {
  highest: 'Highest Priority',
  high: 'High Priority',
  medium: 'Medium Priority',
  low: 'Low Priority',
};

const PRIORITY_ORDER: PriorityLevel[] = ['highest', 'high', 'medium', 'low'];

interface SpreadsheetViewProps {
  groupedPlatforms: Record<string, Array<{
    platform: Platform;
    progress: PlatformProgress;
  }>>;
  customPlatforms: Array<{
    site: CustomSite;
    platform: Platform;
  }>;
  onPlatformClick: (platformId: string) => void;
  onStepComplete: (platformId: string, stepNumber: number) => void;
  onStepSkip: (platformId: string, stepNumber: number) => void;
  onStepClear?: (platformId: string, stepNumber: number) => void;
  onPlatformDelete: (platformId: string) => void;
  onPlatformComplete?: (platformId: string) => void;
  onPlatformReset?: (platformId: string) => void;
  onAddPlatformsClick: () => void;
}

type CellState = 'empty' | 'completed' | 'skipped';

// Confirmation modal for delete
function DeleteConfirmModal({
  platformName,
  onConfirm,
  onCancel,
}: {
  platformName: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const handleConfirm = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onConfirm();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onCancel} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-sm w-full p-6" onClick={e => e.stopPropagation()}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <PartyPopper size={20} className="text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Delete {platformName}?
            </h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            This will mark {platformName} as deleted. You can restore it later if needed.
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// Icon-only cell with dropdown on click
function StepCell({
  state,
  stepTitle,
  onChange,
  onClear,
  disabled,
}: {
  state: CellState;
  stepTitle: string;
  onChange: (newState: CellState) => void;
  onClear?: () => void;
  disabled?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const getStateIcon = () => {
    switch (state) {
      case 'completed':
        return <Check size={16} className="text-emerald-600 dark:text-emerald-400" />;
      case 'skipped':
        return <Minus size={16} className="text-amber-500 dark:text-amber-400" />;
      default:
        return <span className="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600" />;
    }
  };

  if (disabled) {
    return (
      <div className="flex items-center justify-center p-2 opacity-40" title={stepTitle}>
        {getStateIcon()}
      </div>
    );
  }

  const handleOptionClick = (newState: CellState) => {
    if (newState === 'empty' && onClear) {
      onClear();
    } else if (newState !== 'empty') {
      onChange(newState);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center gap-1 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors w-full ${
          state === 'completed' ? 'bg-emerald-50 dark:bg-emerald-900/20' :
          state === 'skipped' ? 'bg-amber-50 dark:bg-amber-900/20' : ''
        }`}
        title={stepTitle}
      >
        {getStateIcon()}
        <ChevronDown size={10} className="text-gray-400" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute z-20 top-full left-1/2 -translate-x-1/2 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 min-w-[90px] py-1">
            <button
              onClick={() => handleOptionClick('completed')}
              className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 ${
                state === 'completed' ? 'bg-emerald-50 dark:bg-emerald-900/20' : ''
              }`}
            >
              <Check size={14} className="text-emerald-500" />
              Done
            </button>
            <button
              onClick={() => handleOptionClick('skipped')}
              className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 ${
                state === 'skipped' ? 'bg-amber-50 dark:bg-amber-900/20' : ''
              }`}
            >
              <Minus size={14} className="text-amber-500" />
              Skip
            </button>
            {state !== 'empty' && onClear && (
              <button
                onClick={() => handleOptionClick('empty')}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 border-t border-gray-100 dark:border-gray-700"
              >
                <RotateCcw size={14} className="text-gray-400" />
                Clear
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// Delete action cell - button that triggers confirmation or restore
function DeleteCell({
  isDeleted,
  onDelete,
  onRestore,
}: {
  isDeleted: boolean;
  onDelete: () => void;
  onRestore?: () => void;
}) {
  if (isDeleted && onRestore) {
    return (
      <button
        onClick={onRestore}
        className="flex items-center justify-center p-2 rounded hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors w-full group"
        title="Restore platform"
      >
        <RotateCcw size={16} className="text-gray-400 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors" />
      </button>
    );
  }

  if (isDeleted) {
    return (
      <div className="flex items-center justify-center p-2 opacity-40" title="Deleted">
        <Trash2 size={16} className="text-gray-400" />
      </div>
    );
  }

  return (
    <button
      onClick={onDelete}
      className="flex items-center justify-center p-2 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full group"
      title="Delete account"
    >
      <Trash2 size={16} className="text-gray-400 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors" />
    </button>
  );
}

// Progress cell with hover button
function ProgressCell({
  isDeleted,
  isCompleted,
  progressPercent,
  onMarkComplete,
}: {
  isDeleted: boolean;
  isCompleted: boolean;
  progressPercent: number;
  onMarkComplete?: () => void;
}) {
  const [isHovering, setIsHovering] = useState(false);

  if (isDeleted) {
    return (
      <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
        Deleted!
      </span>
    );
  }

  if (isCompleted) {
    return (
      <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
        Completed!
      </span>
    );
  }

  // Show "Mark as finished" button on hover if not complete
  if (isHovering && onMarkComplete && progressPercent > 0 && progressPercent < 100) {
    return (
      <button
        onClick={onMarkComplete}
        onMouseLeave={() => setIsHovering(false)}
        className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 whitespace-nowrap px-2 py-1 rounded bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors"
      >
        Mark done
      </button>
    );
  }

  return (
    <div
      className="flex items-center justify-center gap-2 cursor-pointer"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="w-10 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      <span className="text-xs text-gray-500 dark:text-gray-400 w-7">
        {progressPercent}%
      </span>
    </div>
  );
}

// Platform row component
function PlatformRow({
  platform,
  progress,
  isCustom,
  steps,
  onPlatformClick,
  onStepComplete,
  onStepSkip,
  onStepClear,
  onDelete,
  onMarkComplete,
  onRestore,
}: {
  platform: Platform;
  progress: PlatformProgress;
  isCustom: boolean;
  steps: ReturnType<typeof getNonDeleteSteps>;
  onPlatformClick: () => void;
  onStepComplete: (stepNumber: number) => void;
  onStepSkip: (stepNumber: number) => void;
  onStepClear?: (stepNumber: number) => void;
  onDelete: () => void;
  onMarkComplete?: () => void;
  onRestore?: () => void;
}) {
  const isDeleted = progress.method === 'deleted';
  const isCompleted = progress.status === 'secured' && !isDeleted;
  const completedCount = progress.completedSteps.filter(s => s > 1).length;
  const skippedCount = progress.skippedSteps.filter(s => s > 1).length;
  const totalNonDeleteSteps = TOTAL_STEPS - 1;
  const progressPercent = Math.round(((completedCount + skippedCount) / totalNonDeleteSteps) * 100);

  const getCellState = (stepNumber: number): CellState => {
    if (progress.completedSteps.includes(stepNumber)) return 'completed';
    if (progress.skippedSteps.includes(stepNumber)) return 'skipped';
    return 'empty';
  };

  const handleCellChange = (stepNumber: number, newState: CellState) => {
    if (newState === 'completed') {
      onStepComplete(stepNumber);
    } else if (newState === 'skipped') {
      onStepSkip(stepNumber);
    }
  };

  // Row background color based on status
  const getRowClass = () => {
    if (isDeleted) {
      return 'bg-red-50/50 dark:bg-red-900/10';
    }
    if (isCompleted) {
      return 'bg-emerald-50/50 dark:bg-emerald-900/10';
    }
    return '';
  };

  // For deleted rows, don't show step cells
  const showStepCells = !isDeleted;

  return (
    <tr className={`hover:bg-gray-50 dark:hover:bg-gray-700/30 ${getRowClass()}`}>
      {/* Platform name */}
      <td
        className={`px-3 py-2 sticky left-0 z-10 cursor-pointer border-r border-gray-100 dark:border-gray-700 ${
          isDeleted ? 'bg-red-50/50 dark:bg-red-900/10' :
          isCompleted ? 'bg-emerald-50/50 dark:bg-emerald-900/10' :
          'bg-white dark:bg-gray-800'
        } hover:bg-gray-50 dark:hover:bg-gray-700/50`}
        onClick={onPlatformClick}
      >
        <div className={`flex items-center gap-2 ${isDeleted ? 'opacity-60' : ''}`}>
          {isCustom ? (
            <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center text-xs flex-shrink-0">
              {platform.name[0]}
            </div>
          ) : (
            <PlatformIcon iconName={platform.icon} platformName={platform.name} size={20} />
          )}
          <span className={`font-medium text-sm text-gray-900 dark:text-gray-100 truncate max-w-[100px] ${isDeleted ? 'line-through' : ''}`}>
            {platform.name}
          </span>
        </div>
      </td>

      {/* Delete action cell */}
      <td className="px-1 py-1 text-center bg-red-50/30 dark:bg-red-900/5 border-r border-gray-100 dark:border-gray-700">
        <DeleteCell isDeleted={isDeleted} onDelete={onDelete} onRestore={onRestore} />
      </td>

      {/* Step cells (2-9) */}
      {steps.map((step) => (
        <td key={step.id} className="px-1 py-1 text-center">
          {showStepCells ? (
            <StepCell
              state={getCellState(step.id)}
              stepTitle={step.title}
              disabled={isCompleted}
              onChange={(newState) => handleCellChange(step.id, newState)}
              onClear={onStepClear ? () => onStepClear(step.id) : undefined}
            />
          ) : (
            <div className="p-2 opacity-30">
              <span className="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600 block mx-auto" />
            </div>
          )}
        </td>
      ))}

      {/* Progress cell */}
      <td className="px-3 py-2 text-center">
        <ProgressCell
          isDeleted={isDeleted}
          isCompleted={isCompleted}
          progressPercent={progressPercent}
          onMarkComplete={onMarkComplete}
        />
      </td>
    </tr>
  );
}

// Section header row
function SectionHeader({ title, colSpan }: { title: string; colSpan: number }) {
  return (
    <tr className="bg-gray-100 dark:bg-gray-900">
      <td
        colSpan={colSpan}
        className="px-3 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 sticky left-0 bg-gray-100 dark:bg-gray-900"
      >
        {title}
      </td>
    </tr>
  );
}

export default function SpreadsheetView({
  groupedPlatforms,
  customPlatforms,
  onPlatformClick,
  onStepComplete,
  onStepSkip,
  onStepClear,
  onPlatformDelete,
  onPlatformComplete,
  onPlatformReset,
  onAddPlatformsClick,
}: SpreadsheetViewProps) {
  const [deleteConfirm, setDeleteConfirm] = useState<{ platformId: string; platformName: string } | null>(null);
  const steps = getNonDeleteSteps();
  const totalColumns = 2 + steps.length + 1; // platform + delete + steps + progress

  const handleDeleteClick = (platformId: string, platformName: string) => {
    setDeleteConfirm({ platformId, platformName });
  };

  const confirmDelete = () => {
    if (deleteConfirm) {
      onPlatformDelete(deleteConfirm.platformId);
      setDeleteConfirm(null);
    }
  };

  // Build unified list with section markers (sorting handled by parent)
  const allPlatforms = useMemo(() => {
    const result: Array<{
      type: 'section' | 'platform';
      title?: string;
      platform?: Platform;
      progress?: PlatformProgress;
      isCustom?: boolean;
    }> = [];

    // Add grouped platforms by priority (already sorted by parent)
    PRIORITY_ORDER.forEach((priority) => {
      const platforms = groupedPlatforms[priority];
      if (!platforms || platforms.length === 0) return;

      result.push({ type: 'section', title: `${PRIORITY_LABELS[priority]} (${platforms.length})` });

      platforms.forEach(p => {
        result.push({ type: 'platform', platform: p.platform, progress: p.progress, isCustom: false });
      });
    });

    // Add custom platforms
    if (customPlatforms.length > 0) {
      result.push({ type: 'section', title: `My Custom Platforms (${customPlatforms.length})` });

      customPlatforms.forEach(c => {
        result.push({
          type: 'platform',
          platform: c.platform,
          progress: {
            platformId: c.site.id,
            status: c.site.status,
            hasAccount: 'yes' as const,
            currentStep: 1,
            completedSteps: c.site.completedSteps,
            skippedSteps: c.site.skippedSteps,
            method: c.site.status === 'secured' && c.site.completedSteps.includes(1) ? 'deleted' as const : undefined,
          },
          isCustom: true,
        });
      });
    }

    return result;
  }, [groupedPlatforms, customPlatforms]);

  return (
    <div className="space-y-4">
      {/* Unified scrollable spreadsheet */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="sticky top-0 z-20 bg-white dark:bg-gray-800">
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide sticky left-0 bg-white dark:bg-gray-800 z-30 min-w-[150px] border-r border-gray-100 dark:border-gray-700">
                  Platform
                </th>
                <th className="text-center px-2 py-3 min-w-[50px] bg-red-50/50 dark:bg-red-900/10 border-r border-gray-100 dark:border-gray-700">
                  <div className="flex flex-col items-center gap-1">
                    <Trash2 size={16} className="text-red-500 dark:text-red-400" />
                    <span className="text-[10px] font-medium text-red-500 dark:text-red-400">Delete</span>
                  </div>
                </th>
                {steps.map((step) => (
                  <th
                    key={step.id}
                    className="text-center px-1 py-3 min-w-[60px]"
                    title={step.title}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <LucideIcon name={step.icon} size={16} className="text-gray-500 dark:text-gray-400" />
                      <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 leading-tight max-w-[55px] truncate">
                        {step.shortTitle || step.title.split(' ')[0]}
                      </span>
                    </div>
                  </th>
                ))}
                <th className="text-center px-3 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide min-w-[80px]">
                  Progress
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {allPlatforms.map((item, index) => {
                if (item.type === 'section') {
                  return (
                    <SectionHeader key={`section-${index}`} title={item.title!} colSpan={totalColumns} />
                  );
                }
                return (
                  <PlatformRow
                    key={item.platform!.id}
                    platform={item.platform!}
                    progress={item.progress!}
                    isCustom={item.isCustom!}
                    steps={steps}
                    onPlatformClick={() => onPlatformClick(item.platform!.id)}
                    onStepComplete={(stepNumber) => onStepComplete(item.platform!.id, stepNumber)}
                    onStepSkip={(stepNumber) => onStepSkip(item.platform!.id, stepNumber)}
                    onStepClear={onStepClear ? (stepNumber) => onStepClear(item.platform!.id, stepNumber) : undefined}
                    onDelete={() => handleDeleteClick(item.platform!.id, item.platform!.name)}
                    onMarkComplete={onPlatformComplete ? () => onPlatformComplete(item.platform!.id) : undefined}
                    onRestore={onPlatformReset ? () => onPlatformReset(item.platform!.id) : undefined}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add platforms footer */}
      <div className="flex justify-center">
        <button
          onClick={onAddPlatformsClick}
          className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium text-sm flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
        >
          <span className="text-lg">+</span>
          Add more platforms
        </button>
      </div>

      {/* Delete confirmation modal */}
      {deleteConfirm && (
        <DeleteConfirmModal
          platformName={deleteConfirm.platformName}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteConfirm(null)}
        />
      )}
    </div>
  );
}
