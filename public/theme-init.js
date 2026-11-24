// Applies a saved light or dark theme before the page first paints, so it doesn't flash the
// other one. This is a file of its own because the Content Security Policy blocks inline
// scripts. The key and values match loadTheme in src/lib/storage.ts.
try {
  var theme = localStorage.getItem('social-scrub-theme');
  if (theme === 'light' || theme === 'dark') document.documentElement.setAttribute('data-theme', theme);
} catch (e) {
  // Storage is blocked. The device setting decides.
}
