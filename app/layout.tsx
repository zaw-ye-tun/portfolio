import './globals.css';
import type { Metadata } from 'next';
import MobileBanner from '@/components/MobileBanner';

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
        <MobileBanner />
      </body>
    </html>
  );
}
