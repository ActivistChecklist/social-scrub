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
        // Brand purple
        brand: {
          DEFAULT: 'hsl(247 100% 65.5%)',
          light: 'hsl(247 100% 75%)',
          dark: 'hsl(247 100% 55%)',
          50: 'hsl(247 100% 96%)',
          100: 'hsl(247 100% 92%)',
          200: 'hsl(247 100% 85%)',
          300: 'hsl(247 100% 75%)',
          400: 'hsl(247 100% 70%)',
          500: 'hsl(247 100% 65.5%)',
          600: 'hsl(247 100% 55%)',
          700: 'hsl(247 100% 45%)',
          800: 'hsl(247 100% 35%)',
          900: 'hsl(247 100% 25%)',
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
