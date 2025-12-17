import './globals.css';
import type { Metadata } from 'next';
import MobileFunHint from '@/components/MobileFunHint';

export const metadata: Metadata = {
  title: 'Zaw Ye Tun',
  description: 'A modern macOS-style portfolio showcasing my work and journey',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
        <MobileFunHint />
      </body>
    </html>
  );
}
