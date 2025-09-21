/**
 * Provider de TanStack Query para gestión de estado del servidor
 */

'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState, type ReactNode } from 'react';

/**
 * Configuración del QueryClient
 */
function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Cache por 5 minutos por defecto
        staleTime: 5 * 60 * 1000,
        // Mantener cache por 10 minutos sin uso
        gcTime: 10 * 60 * 1000,
        // Reintentar 3 veces en caso de error
        retry: 3,
        // Intervalo de reintento con backoff exponencial
        retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
        // No refetch automático en focus (para evitar requests innecesarios)
        refetchOnWindowFocus: false,
        // Refetch en reconexión
        refetchOnReconnect: true,
      },
      mutations: {
        // Reintentar mutaciones 1 vez
        retry: 1,
      },
    },
  });
}

interface QueryProviderProps {
  children: ReactNode;
}

/**
 * Provider de TanStack Query que envuelve la aplicación
 */
export function QueryProvider({ children }: QueryProviderProps) {
  // Crear QueryClient en estado para evitar recreación en re-renders
  const [queryClient] = useState(createQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* DevTools solo en desarrollo */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} position="bottom" />
      )}
    </QueryClientProvider>
  );
}
