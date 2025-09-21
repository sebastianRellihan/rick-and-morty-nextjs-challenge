/**
 * Componente para mostrar mensajes de error
 */

import { cn } from '@/lib/utils';
import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
  /** Mensaje de error a mostrar */
  message: string;
  /** Función para reintentar */
  onRetry?: () => void;
  /** Clase CSS adicional */
  className?: string;
  /** Tipo de error para estilos */
  variant?: 'error' | 'warning' | 'info';
}

export function ErrorMessage({
  message,
  onRetry,
  className,
  variant = 'error',
}: ErrorMessageProps) {
  return (
    <div
      className={cn(styles.errorMessage, styles[variant], className)}
      role="alert"
      aria-live="polite"
    >
      <div className={styles.content}>
        <div className={styles.icon}>
          {variant === 'error' && '❌'}
          {variant === 'warning' && '⚠️'}
          {variant === 'info' && 'ℹ️'}
        </div>

        <div className={styles.text}>
          <p className={styles.message}>{message}</p>

          {onRetry && (
            <button
              className={cn('btn', 'btn--secondary', styles.retry)}
              onClick={onRetry}
              type="button"
            >
              Reintentar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
