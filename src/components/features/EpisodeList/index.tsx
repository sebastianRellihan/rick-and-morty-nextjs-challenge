import { EpisodeCard } from '@/components/ui/Card/EpisodeCard';
import type { Episode } from '@/models';
import styles from './EpisodeList.module.css';

interface EpisodeListProps {
  title: string;
  episodes: Episode[] | undefined;
  isLoading?: boolean;
  className?: string;
}

/**
 * Componente para mostrar una lista de episodios
 */
export function EpisodeList({
  title,
  episodes,
  isLoading = false,
  className,
}: EpisodeListProps) {
  return (
    <div className={`${styles.container} ${className || ''}`}>
      {/* Header de la lista */}
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        {episodes && episodes.length > 0 && (
          <span className={styles.count}>
            {episodes.length} episode{episodes.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Contenido de la lista */}
      <div className={styles.content}>
        {isLoading ? (
          <div className={styles.loading}>
            <div className="loading-spinner" />
            <p className={styles.loadingText}>Loading episodes...</p>
          </div>
        ) : !episodes || episodes.length === 0 ? (
          <div className={styles.empty}>
            <p className={styles.emptyText}>No episodes found</p>
          </div>
        ) : (
          <div className={styles.episodeGrid}>
            {episodes.map(episode => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
