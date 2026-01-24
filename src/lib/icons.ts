import * as simpleIcons from 'simple-icons';

// Simple Icons uses camelCase names prefixed with 'si'
// e.g., 'facebook' -> 'siFacebook'

// Custom icon type - can be either a simple path or a full SVG
type CustomIcon = {
  hex: string;
  path?: string;
  // Full SVG content (without the outer <svg> tag) for complex icons
  svg?: string;
};

// Custom icon overrides for when simple-icons doesn't have the right version
const CUSTOM_ICONS: Record<string, CustomIcon> = {
  // Venmo logo - blue rounded rect with white V
  venmo: {
    hex: '3396CD',
    svg: `<rect width="24" height="24" rx="4" fill="#3396CD"/><path d="M17.9 5.5c.5.8.7 1.7.7 2.7 0 3.4-2.9 7.7-5.3 10.8h-4.5l-2.2-13 4-.5 1 8.1c.9-1.5 2.2-4 2.2-5.6 0-1-.2-1.7-.5-2.3l2.6-1.2z" fill="#fff"/>`,
  },
  // LinkedIn logo - blue rounded rect with white "in"
  linkedin: {
    hex: '007EBB',
    svg: `<rect width="24" height="24" rx="3" fill="#007EBB"/><path d="M20.67 20.67h-3.56v-5.59c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.69h-3.56V9.33h3.42v1.55h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.18zM5.34 7.78a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zm1.78 12.89H3.56V9.33h3.56v11.34z" fill="#fff"/>`,
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
  // Custom full SVG content (for complex icons with backgrounds)
  customSvg?: string;
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
      path: customIcon.path || '',
      customSvg: customIcon.svg,
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
