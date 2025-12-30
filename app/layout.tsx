import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LC37N2KHEF"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LC37N2KHEF');
          `}
        </Script>
      </head>
      <body>
        {children}
        <MobileFunHint />
      </body>
    </html>
  );
}
