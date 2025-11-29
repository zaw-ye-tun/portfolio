import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My macOS Portfolio',
  description: 'A modern macOS-style portfolio showcasing my work and journey',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
