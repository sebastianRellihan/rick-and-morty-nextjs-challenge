/**
 * Componente skeleton para CharacterCard durante estados de carga
 */

import { cn } from '@/lib/utils';
import styles from './CharacterCardSkeleton.module.css';

interface CharacterCardSkeletonProps {
  /** Clase CSS adicional */
  className?: string;
}

export function CharacterCardSkeleton({
  className,
}: CharacterCardSkeletonProps) {
  return (
    <div className={cn(styles.skeleton, className)}>
      {/* Skeleton de imagen */}
      <div className={styles.image}>
        <div className={styles.imagePlaceholder} />
      </div>

      {/* Skeleton de contenido */}
      <div className={styles.content}>
        {/* Nombre */}
        <div className={styles.name} />

        {/* Estado y especie */}
        <div className={styles.status} />
      </div>
    </div>
  );
}

/**
 * Componente para mostrar múltiples skeletons
 */
interface CharacterCardSkeletonGridProps {
  /** Número de skeletons a mostrar */
  count?: number;
  /** Clase CSS adicional */
  className?: string;
}

export function CharacterCardSkeletonGrid({
  count = 6,
  className,
}: CharacterCardSkeletonGridProps) {
  return (
    <div className={cn('grid', 'grid--auto-fit', className)}>
      {Array.from({ length: count }, (_, index) => (
        <CharacterCardSkeleton key={index} />
      ))}
    </div>
  );
}
