import * as simpleIcons from 'simple-icons';

// Simple Icons uses camelCase names prefixed with 'si'
// e.g., 'facebook' -> 'siFacebook'

function toSimpleIconsKey(iconName: string): string {
  // Handle special cases
  const specialCases: Record<string, string> = {
    'x': 'siX',
    'lastdotfm': 'siLastdotfm',
    '4chan': 'si4chan',
    '500px': 'si500px',
  };

  if (specialCases[iconName]) {
    return specialCases[iconName];
  }

  // Convert to PascalCase and prefix with 'si'
  const pascalCase = iconName
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');

  return `si${pascalCase}`;
}

interface SimpleIcon {
  title: string;
  slug: string;
  hex: string;
  source: string;
  svg: string;
  path: string;
}

export function getIcon(iconName: string): SimpleIcon | null {
  try {
    const key = toSimpleIconsKey(iconName);
    const icon = (simpleIcons as Record<string, SimpleIcon>)[key];
    return icon || null;
  } catch {
    return null;
  }
}

export function getIconSvg(iconName: string, size: number = 24, color?: string): string | null {
  const icon = getIcon(iconName);
  if (!icon) return null;

  const fillColor = color || `#${icon.hex}`;

  return `<svg role="img" viewBox="0 0 24 24" width="${size}" height="${size}" fill="${fillColor}" xmlns="http://www.w3.org/2000/svg"><path d="${icon.path}"/></svg>`;
}

export function getIconColor(iconName: string): string | null {
  const icon = getIcon(iconName);
  if (!icon) return null;
  return `#${icon.hex}`;
}
