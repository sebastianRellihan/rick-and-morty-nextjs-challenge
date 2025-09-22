import { cn } from '@/lib/utils';
import styles from './CharacterCardSkeleton.module.css';

interface CharacterCardSkeletonProps {
  className?: string;
}

/**
 * Componente skeleton para CharacterCard durante estados de carga
 */
export function CharacterCardSkeleton({
  className,
}: CharacterCardSkeletonProps) {
  return (
    <div className={cn(styles.skeleton, className)}>
      <div className={styles.image}>
        <div className={styles.imagePlaceholder} />
      </div>

      <div className={styles.content}>
        <div className={styles.name} />
        <div className={styles.status} />
      </div>
    </div>
  );
}

/**
 * Componente para mostrar múltiples skeletons
 */
interface CharacterCardSkeletonGridProps {
  count?: number;
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
