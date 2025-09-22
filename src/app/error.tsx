'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error:', error);
  }, [error]);

  return (
    <div className="error-container">
      <div className="error-content">
        <h1>Something went wrong!</h1>
        <p>We're sorry, but something unexpected happened.</p>
        {process.env.NODE_ENV === 'development' && (
          <details className="error-details">
            <summary>Error details (development only)</summary>
            <pre>{error.message}</pre>
            <pre>{error.stack}</pre>
          </details>
        )}
        <div className="error-actions">
          <button onClick={reset} className="retry-button">
            Try again
          </button>
          <button onClick={() => window.location.href = '/'} className="home-button">
            Go home
          </button>
        </div>
      </div>

      <style jsx>{`
        .error-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .error-content {
          background: white;
          padding: 3rem;
          border-radius: 1rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          text-align: center;
          max-width: 500px;
          width: 100%;
        }
        
        h1 {
          color: #dc2626;
          font-size: 2rem;
          margin-bottom: 1rem;
          font-family: 'Get Schwifty', cursive;
        }
        
        p {
          color: #6b7280;
          margin-bottom: 2rem;
          line-height: 1.6;
        }
        
        .error-details {
          text-align: left;
          margin: 1rem 0;
          padding: 1rem;
          background: #f3f4f6;
          border-radius: 0.5rem;
          border: 1px solid #d1d5db;
        }
        
        .error-details summary {
          cursor: pointer;
          font-weight: 600;
          color: #374151;
        }
        
        .error-details pre {
          margin-top: 0.5rem;
          font-size: 0.875rem;
          color: #dc2626;
          white-space: pre-wrap;
        }
        
        .error-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .retry-button, .home-button {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .retry-button {
          background: #10b981;
          color: white;
        }
        
        .retry-button:hover {
          background: #059669;
          transform: translateY(-1px);
        }
        
        .home-button {
          background: #6b7280;
          color: white;
        }
        
        .home-button:hover {
          background: #4b5563;
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
}
