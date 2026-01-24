export interface Session {
  id: string;
  createdAt: string;
  lastActiveAt: string;
  storageType: 'local' | 'server';
  platforms: PlatformProgress[];
  customSites: CustomSite[];
  onboardingComplete: boolean;
}

export interface PlatformProgress {
  platformId: string;
  status: 'not_started' | 'in_progress' | 'secured' | 'skipped';
  hasAccount: 'yes' | 'maybe' | 'no' | null;
  currentStep: number;
  completedSteps: number[];
  skippedSteps: number[];
  method?: 'block_party' | 'manual' | 'deleted';
  startedAt?: string;
  completedAt?: string;
}

export interface CustomSite {
  id: string;
  name: string;
  privacyUrl?: string;
  notes?: string;
  priority: 'high' | 'medium' | 'low';
  status: 'not_started' | 'in_progress' | 'secured' | 'skipped';
  completedSteps: number[];
  skippedSteps: number[];
  createdAt: string;
  completedAt?: string;
}

export interface Platform {
  id: string;
  name: string;
  icon?: string;
  category: PlatformCategory;
  priority: 'highest' | 'high' | 'medium' | 'low';
  hasBlockParty?: boolean;
  privacyUrl?: string;
  deleteUrl?: string;
}

export type PlatformCategory =
  | 'social'
  | 'professional'
  | 'dating'
  | 'gaming'
  | 'messaging'
  | 'photo_video'
  | 'forum'
  | 'shopping'
  | 'finance'
  | 'other';

export interface Step {
  id: number;
  title: string;
  shortTitle: string;
  description: string;
  icon: string; // Lucide icon name
  educationalContext: string; // Legacy - will be replaced by beforeAfter
  beforeAfter?: {
    before: {
      title: string;
      description: string;
      icon: string; // Lucide icon name
      risk?: string; // Risk explanation
    };
    after: {
      title: string;
      description: string;
      icon: string; // Lucide icon name
      benefit?: string; // Benefit explanation
    };
  };
  howTo?: string; // Generic instructions (collapsed by default)
  isDeleteStep: boolean;
}
