import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-heading)', 'system-ui', '-apple-system', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', '-apple-system', 'sans-serif'],
        // Keep sans as alias to body for compatibility
        sans: ['var(--font-body)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        // Brand green (emerald)
        brand: {
          DEFAULT: 'hsl(160 84% 39%)',
          light: 'hsl(160 84% 49%)',
          dark: 'hsl(160 84% 29%)',
          50: 'hsl(160 85% 97%)',
          100: 'hsl(160 80% 92%)',
          200: 'hsl(160 75% 82%)',
          300: 'hsl(160 72% 67%)',
          400: 'hsl(160 84% 49%)',
          500: 'hsl(160 84% 39%)',
          600: 'hsl(160 84% 32%)',
          700: 'hsl(160 84% 26%)',
          800: 'hsl(160 84% 21%)',
          900: 'hsl(160 84% 15%)',
        },
        // Semantic colors from CSS variables
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          light: "hsl(var(--success-light))",
        },
        error: {
          DEFAULT: "hsl(var(--error))",
          light: "hsl(var(--error-light))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          light: "hsl(var(--warning-light))",
        },
      },
      letterSpacing: {
        tighter: '-0.025em',
      },
    },
  },
  plugins: [],
};
export default config;
