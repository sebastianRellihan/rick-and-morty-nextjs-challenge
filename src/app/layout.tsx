import type { Metadata } from 'next';
import './globals.css';
import '@/styles/design-system.css';

export const metadata: Metadata = {
  title: 'Rick and Morty Challenge',
  description: 'Challenge de Rick and Morty con Next.js y TypeScript',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
