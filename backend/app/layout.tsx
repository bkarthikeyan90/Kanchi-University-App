import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kanchi University API',
  description: 'Backend API for Kanchi University Mobile Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

