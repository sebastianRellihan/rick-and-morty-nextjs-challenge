import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';

// Create a test query client
export const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });
};

// Test wrapper with QueryClient
export const TestQueryWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const queryClient = createTestQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

// Custom render function with QueryClient
export const renderWithQuery = (ui: React.ReactElement) => {
  return render(ui, { wrapper: TestQueryWrapper });
};
