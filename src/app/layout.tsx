import type { Metadata } from 'next';
import { Libre_Franklin, Source_Sans_3 } from 'next/font/google';
import './globals.css';

const libreFranklin = Libre_Franklin({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['500', '600', '700', '800'],
  display: 'swap',
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://socialscrub.app'),
  title: 'Social Scrub - Protect Your Privacy',
  description: 'Lock down your social media privacy settings and protect yourself from doxxing.',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Social Scrub - Protect Your Privacy',
    description: 'Lock down your social media privacy settings and protect yourself from doxxing.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Social Scrub - Protect Your Privacy',
    description: 'Lock down your social media privacy settings and protect yourself from doxxing.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('social-scrub-theme');
                if (theme === 'light') {
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${libreFranklin.variable} ${sourceSans.variable} font-body antialiased min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
