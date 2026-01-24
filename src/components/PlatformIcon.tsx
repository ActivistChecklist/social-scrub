'use client';

import { useMemo } from 'react';
import { getIcon } from '@/lib/icons';

interface PlatformIconProps {
  iconName?: string;
  platformName: string;
  size?: number;
  className?: string;
}

export default function PlatformIcon({
  iconName,
  platformName,
  size = 24,
  className = '',
}: PlatformIconProps) {
  const iconData = useMemo(() => {
    if (!iconName) return null;
    return getIcon(iconName);
  }, [iconName]);

  // Fallback: show first letter of platform name
  if (!iconData) {
    const initial = platformName.charAt(0).toUpperCase();
    return (
      <div
        className={`flex items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-bold ${className}`}
        style={{ width: size, height: size, fontSize: size * 0.5 }}
      >
        {initial}
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{ width: size, height: size }}
      dangerouslySetInnerHTML={{
        __html: `<svg role="img" viewBox="0 0 24 24" width="${size}" height="${size}" fill="#${iconData.hex}" xmlns="http://www.w3.org/2000/svg"><path d="${iconData.path}"/></svg>`,
      }}
    />
  );
}
