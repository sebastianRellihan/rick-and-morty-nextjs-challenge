/**
 * Componente de paginación reutilizable
 */

import { cn } from '@/lib/utils';
import styles from './Pagination.module.css';

interface PaginationProps {
  /** Página actual */
  currentPage: number;
  /** Total de páginas */
  totalPages: number;
  /** Función que se ejecuta al cambiar de página */
  onPageChange: (page: number) => void;
  /** Si está cargando */
  isLoading?: boolean;
  /** Clase CSS adicional */
  className?: string;
  /** Número máximo de páginas a mostrar */
  maxVisible?: number;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
  className,
  maxVisible = 5,
}: PaginationProps) {
  // No mostrar paginación si no hay páginas o solo hay una
  if (totalPages <= 1) {
    return null;
  }

  const handlePageClick = (page: number) => {
    if (page !== currentPage && !isLoading) {
      onPageChange(page);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, page: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handlePageClick(page);
    }
  };

  // Calcular páginas visibles
  const getVisiblePages = (): number[] => {
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, currentPage - half);
    const end = Math.min(totalPages, start + maxVisible - 1);

    // Ajustar el inicio si no hay suficientes páginas al final
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();
  const showFirstPage = visiblePages[0] > 1;
  const showLastPage = visiblePages[visiblePages.length - 1] < totalPages;
  const showFirstEllipsis = visiblePages[0] > 2;
  const showLastEllipsis =
    visiblePages[visiblePages.length - 1] < totalPages - 1;

  return (
    <nav
      className={cn(styles.pagination, className)}
      role="navigation"
      aria-label="Navegación de páginas"
    >
      <div className={styles.container}>
        {/* Botón anterior */}
        <button
          className={cn(
            styles.button,
            styles.prevButton,
            (currentPage === 1 || isLoading) && styles.disabled,
          )}
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
          aria-label="Página anterior"
        >
          ← Anterior
        </button>

        {/* Primera página */}
        {showFirstPage && (
          <>
            <button
              className={cn(styles.button, 1 === currentPage && styles.active)}
              onClick={() => handlePageClick(1)}
              onKeyDown={e => handleKeyDown(e, 1)}
              disabled={isLoading}
              aria-label="Ir a página 1"
              aria-current={1 === currentPage ? 'page' : undefined}
            >
              1
            </button>
            {showFirstEllipsis && <span className={styles.ellipsis}>...</span>}
          </>
        )}

        {/* Páginas visibles */}
        {visiblePages.map(page => (
          <button
            key={page}
            className={cn(
              'styles.button',
              'styles.button--page',
              page === currentPage && 'styles.button--active',
            )}
            onClick={() => handlePageClick(page)}
            onKeyDown={e => handleKeyDown(e, page)}
            disabled={isLoading}
            aria-label={`Ir a página ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ))}

        {/* Última página */}
        {showLastPage && (
          <>
            {showLastEllipsis && <span className={styles.ellipsis}>...</span>}
            <button
              className={cn(
                styles.button,
                totalPages === currentPage && styles.active,
              )}
              onClick={() => handlePageClick(totalPages)}
              onKeyDown={e => handleKeyDown(e, totalPages)}
              disabled={isLoading}
              aria-label={`Ir a página ${totalPages}`}
              aria-current={totalPages === currentPage ? 'page' : undefined}
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Botón siguiente */}
        <button
          className={cn(
            'styles.button',
            'styles.button--next',
            (currentPage === totalPages || isLoading) &&
              'styles.button--disabled',
          )}
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages || isLoading}
          aria-label="Página siguiente"
        >
          Siguiente →
        </button>
      </div>

      {/* Información de página */}
      <div className="pagination__info">
        <span className="pagination__info-text">
          Página {currentPage} de {totalPages}
        </span>
        {isLoading && (
          <span className="pagination__loading">
            <div className="loading-spinner loading-spinner--small" />
          </span>
        )}
      </div>
    </nav>
  );
}
