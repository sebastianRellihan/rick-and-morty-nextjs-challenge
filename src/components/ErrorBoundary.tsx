'use client';

import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error} resetError={this.resetError} />;
    }

    return this.props.children;
  }
}

// Componente de fallback por defecto
function DefaultErrorFallback({ error, resetError }: { error?: Error; resetError: () => void }) {
  return (
    <div style={{
      padding: '2rem',
      textAlign: 'center',
      backgroundColor: '#fee2e2',
      border: '1px solid #fca5a5',
      borderRadius: '0.5rem',
      margin: '1rem'
    }}>
      <h2 style={{ color: '#dc2626', marginBottom: '1rem' }}>Oops! Something went wrong</h2>
      <p style={{ color: '#7f1d1d', marginBottom: '1rem' }}>
        {error?.message || 'An unexpected error occurred'}
      </p>
      <button
        onClick={resetError}
        style={{
          backgroundColor: '#dc2626',
          color: 'white',
          padding: '0.5rem 1rem',
          border: 'none',
          borderRadius: '0.25rem',
          cursor: 'pointer'
        }}
      >
        Try again
      </button>
    </div>
  );
}

export default ErrorBoundary;
