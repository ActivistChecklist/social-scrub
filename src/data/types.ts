export type Priority = 'highest' | 'high' | 'medium' | 'low';

export interface Platform {
  id: string;
  name: string;
  priority: Priority | 'custom';
  /** simple-icons slug, resolved through logos.generated.ts */
  icon?: string;
  /** Path to an image in public/, for logos simple-icons doesn't have */
  image?: string;
  url?: string;
  /** One line on what this platform can reveal about someone */
  why?: string;
}

export type StepId = 'name' | 'photo' | 'username' | 'email' | 'bio' | 'posts' | 'friends' | 'privacy';

export interface Step {
  id: StepId;
  /** Column header */
  label: string;
  /** Popover heading */
  title: string;
  desc: string;
  how: string;
}
