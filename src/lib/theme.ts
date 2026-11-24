/** Light, dark, or follow the device. Picked from the theme menu in the header. */
export type Theme = 'light' | 'dark' | 'system';

/**
 * Sets data-theme on <html>, which the colors in app.css follow. No attribute means the
 * device setting decides. public/theme-init.js does the same before the first paint.
 */
export function applyTheme(theme: Theme, root: HTMLElement = document.documentElement): void {
  if (theme === 'system') root.removeAttribute('data-theme');
  else root.setAttribute('data-theme', theme);
}
