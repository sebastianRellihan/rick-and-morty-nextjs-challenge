import type { Metadata } from 'next';
import './globals.css';
import '@/styles/design-system.css';
import { QueryProvider } from '@/components/providers/QueryProvider';

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
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
