/**
 * Componente Button básico reutilizable
 */

import { cn } from '@/lib/utils';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Variante visual del botón */
  variant?: 'primary' | 'secondary' | 'outline';
  /** Tamaño del botón */
  size?: 'sm' | 'md' | 'lg';
  /** Si el botón está cargando */
  isLoading?: boolean;
  /** Clase CSS adicional */
  className?: string;
  /** Contenido del botón */
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        styles.button,
        styles[variant],
        styles[size],
        (disabled || isLoading) && styles.disabled,
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <div className="loading-spinner loading-spinner--small" />}
      <span className={isLoading ? styles.loadingText : undefined}>
        {children}
      </span>
    </button>
  );
}
