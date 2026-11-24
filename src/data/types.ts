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
  /** Block Party can lock down this platform's privacy settings */
  blockParty?: boolean;
  /** Cyd (cyd.social) can delete this platform's old posts in bulk */
  cyd?: boolean;
}

export type StepId = 'name' | 'photo' | 'username' | 'email' | 'bio' | 'posts' | 'friends' | 'privacy';

/** A service or guide listed under "Helpful" in a column's popover. */
export interface ResourceLink {
  name: string;
  /** Continues the name as a sentence, starting lowercase. */
  note: string;
  href: string;
}

/** What a column's popover explains. */
export interface ColumnInfo {
  /** Popover heading */
  title: string;
  desc: string;
  how?: string;
  /** Random ideas to copy, made on the device. */
  ideas?: 'names' | 'usernames';
  links?: ResourceLink[];
}

export interface Step extends ColumnInfo {
  id: StepId;
  /** Column header. Starts with what to do. */
  label: string;
}
