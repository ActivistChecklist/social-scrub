'use client';

import { useMemo } from 'react';
import { getIcon } from '@/lib/icons';

type IconVariant = 'color' | 'light' | 'muted';

interface PlatformIconProps {
  iconName?: string;
  platformName: string;
  size?: number;
  className?: string;
  /**
   * Icon color variant:
   * - 'color' (default): Uses the brand color
   * - 'light': White icon (for dark/colored backgrounds like green buttons)
   * - 'muted': Subtle gray that works in both light and dark mode
   */
  variant?: IconVariant;
}

// Helper to determine if a hex color is too dark to see in dark mode
function isColorTooDark(hex: string): boolean {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.slice(0, 2), 16);
  const g = parseInt(cleanHex.slice(2, 4), 16);
  const b = parseInt(cleanHex.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.15; // Very dark colors
}

export default function PlatformIcon({
  iconName,
  platformName,
  size = 24,
  className = '',
  variant = 'color',
}: PlatformIconProps) {
  const iconData = useMemo(() => {
    if (!iconName) return null;
    return getIcon(iconName);
  }, [iconName]);

  // Fallback: show first letter of platform name
  if (!iconData) {
    const initial = platformName.charAt(0).toUpperCase();
    const bgClass = variant === 'light'
      ? 'bg-white/20 text-white'
      : variant === 'muted'
      ? 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300';
    return (
      <div
        className={`flex items-center justify-center rounded-lg font-bold ${bgClass} ${className}`}
        style={{ width: size, height: size, fontSize: size * 0.5 }}
      >
        {initial}
      </div>
    );
  }

  // Determine the fill color based on variant
  let fillColor: string;
  let additionalClass = '';

  switch (variant) {
    case 'light':
      fillColor = '#ffffff';
      break;
    case 'muted':
      fillColor = '#6b7280'; // gray-500
      additionalClass = 'dark:[&_svg]:fill-gray-400';
      break;
    case 'color':
    default:
      // For color variant, check if the brand color is too dark for dark mode
      if (isColorTooDark(iconData.hex)) {
        additionalClass = 'dark:[&_svg]:fill-gray-300';
      }
      fillColor = `#${iconData.hex}`;
      break;
  }

  return (
    <div
      className={`${className} ${additionalClass}`}
      style={{ width: size, height: size }}
      dangerouslySetInnerHTML={{
        __html: `<svg role="img" viewBox="0 0 24 24" width="${size}" height="${size}" fill="${fillColor}" xmlns="http://www.w3.org/2000/svg"><path d="${iconData.path}"/></svg>`,
      }}
    />
  );
}
