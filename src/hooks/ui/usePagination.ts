/**
 * Hook personalizado para manejar paginación
 */

import { useState, useCallback } from 'react';

interface UsePaginationProps {
  /** Página inicial */
  initialPage?: number;
  /** Total de páginas */
  totalPages?: number;
}

interface UsePaginationReturn {
  /** Página actual */
  currentPage: number;
  /** Función para cambiar de página */
  setPage: (page: number) => void;
  /** Ir a la página siguiente */
  nextPage: () => void;
  /** Ir a la página anterior */
  prevPage: () => void;
  /** Ir a la primera página */
  firstPage: () => void;
  /** Ir a la última página */
  lastPage: () => void;
  /** Si puede ir a la página anterior */
  canGoPrev: boolean;
  /** Si puede ir a la página siguiente */
  canGoNext: boolean;
}

export function usePagination({
  initialPage = 1,
  totalPages = 1,
}: UsePaginationProps = {}): UsePaginationReturn {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const setPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    },
    [totalPages],
  );

  const nextPage = useCallback(() => {
    setPage(currentPage + 1);
  }, [currentPage, setPage]);

  const prevPage = useCallback(() => {
    setPage(currentPage - 1);
  }, [currentPage, setPage]);

  const firstPage = useCallback(() => {
    setPage(1);
  }, [setPage]);

  const lastPage = useCallback(() => {
    setPage(totalPages);
  }, [setPage, totalPages]);

  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return {
    currentPage,
    setPage,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    canGoPrev,
    canGoNext,
  };
}
