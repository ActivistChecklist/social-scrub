'use client';

import {
  Trash2,
  User,
  UserX,
  UserCheck,
  Image,
  Camera,
  CircleUser,
  AtSign,
  Link,
  Shuffle,
  Mail,
  MailPlus,
  MapPin,
  MapPinOff,
  ImageMinus,
  Images,
  ImageOff,
  Users,
  UsersRound,
  Shield,
  ShieldOff,
  ShieldCheck,
  Check,
  ChevronRight,
  ChevronDown,
  Lightbulb,
  Copy,
  RefreshCw,
  Dices,
  AlertTriangle,
  SkipForward,
  Sparkles,
  PartyPopper,
  type LucideIcon as LucideIconType,
} from 'lucide-react';

const iconMap: Record<string, LucideIconType> = {
  'trash-2': Trash2,
  'user': User,
  'user-x': UserX,
  'user-check': UserCheck,
  'image': Image,
  'camera': Camera,
  'circle-user': CircleUser,
  'at-sign': AtSign,
  'link': Link,
  'shuffle': Shuffle,
  'mail': Mail,
  'mail-plus': MailPlus,
  'map-pin': MapPin,
  'map-pin-off': MapPinOff,
  'image-minus': ImageMinus,
  'images': Images,
  'image-off': ImageOff,
  'users': Users,
  'users-round': UsersRound,
  'shield': Shield,
  'shield-off': ShieldOff,
  'shield-check': ShieldCheck,
  'check': Check,
  'chevron-right': ChevronRight,
  'chevron-down': ChevronDown,
  'lightbulb': Lightbulb,
  'copy': Copy,
  'refresh-cw': RefreshCw,
  'dices': Dices,
  'alert-triangle': AlertTriangle,
};

interface LucideIconProps {
  name: string;
  size?: number;
  className?: string;
}

export default function LucideIcon({ name, size = 24, className = '' }: LucideIconProps) {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    // Fallback for unknown icons - return a placeholder
    return <span className={className} style={{ width: size, height: size }}>{name}</span>;
  }

  return <IconComponent size={size} className={className} />;
}

// Export individual icons for direct use
export {
  Trash2,
  User,
  UserX,
  UserCheck,
  Image,
  Camera,
  CircleUser,
  AtSign,
  Link,
  Shuffle,
  Mail,
  MailPlus,
  MapPin,
  MapPinOff,
  ImageMinus,
  Images,
  ImageOff,
  Users,
  UsersRound,
  Shield,
  ShieldOff,
  ShieldCheck,
  Check,
  ChevronRight,
  ChevronDown,
  Lightbulb,
  Copy,
  RefreshCw,
  Dices,
  AlertTriangle,
  SkipForward,
  Sparkles,
  PartyPopper,
};
