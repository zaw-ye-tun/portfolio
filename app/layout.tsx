import './globals.css';
import type { Metadata } from 'next';
import MobileFunHint from '@/components/MobileFunHint';

export const metadata: Metadata = {
  title: 'Zaw Ye Tun',
  description: 'A modern macOS-style portfolio showcasing my work and journey',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
        <MobileFunHint />
      </body>
    </html>
  );
}
