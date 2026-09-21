import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { AppProvider } from '@/lib/store';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: { default: 'Dysgu Cymraeg: learn Welsh', template: '%s | Dysgu Cymraeg' },
  description: 'Learn Welsh with short lessons, flashcards and quizzes. Northern and southern dialects, pronunciation guides and audio.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Literata:opsz,wght@7..72,400;7..72,600&display=swap"
        />
      </head>
      <body>
        <AppProvider>
          <Header />
          <main className="wrap">{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
