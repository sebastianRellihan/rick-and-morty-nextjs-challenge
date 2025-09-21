import type { Metadata } from 'next';
import '@/styles/variables.css';
import '@/styles/globals.css';
import '@/styles/typography.css';
import '@/styles/utilities.css';
import '@/styles/components.css';
import { QueryProvider } from '@/components/providers/QueryProvider';

export const metadata: Metadata = {
  title: 'Rick and Morty',
  description: 'Challenge de Rick and Morty',
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
