import * as simpleIcons from 'simple-icons';

// Simple Icons uses camelCase names prefixed with 'si'
// e.g., 'facebook' -> 'siFacebook'

// Custom icon overrides for when simple-icons doesn't have the right version
// These override the simple-icons version with a custom SVG path
const CUSTOM_ICONS: Record<string, { hex: string; path: string }> = {
  // Venmo V icon (simple-icons has the full wordmark, we want just the V)
  // This is the Venmo V mark inside a rounded rectangle
  venmo: {
    hex: '008CFF',
    path: 'M2 2C.9 2 0 2.9 0 4v16c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H2zm15.5 4.5c.4.7.6 1.5.6 2.4 0 3-2.6 6.8-4.7 9.6h-4L7.2 6.8l3.5-.3.9 7.2c.8-1.4 1.9-3.5 1.9-5 0-.9-.2-1.5-.4-2l2.4-1.2z',
  },
};

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
  // Check for custom icon override first
  const customIcon = CUSTOM_ICONS[iconName.toLowerCase()];
  if (customIcon) {
    return {
      title: iconName,
      slug: iconName.toLowerCase(),
      hex: customIcon.hex,
      source: '',
      svg: '',
      path: customIcon.path,
    };
  }

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
