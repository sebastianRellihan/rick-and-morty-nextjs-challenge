/**
 * Componente para mostrar una lista de episodios
 */

import { EpisodeCard } from '@/components/ui/Card/EpisodeCard';
import type { Episode } from '@/models';
import styles from './EpisodeList.module.css';

interface EpisodeListProps {
  /** Título de la lista */
  title: string;
  /** Lista de episodios a mostrar */
  episodes: Episode[] | undefined;
  /** Si está cargando */
  isLoading?: boolean;
  /** Si debe resaltar los episodios (para compartidos) */
  highlight?: boolean;
  /** Clase CSS adicional */
  className?: string;
}

export function EpisodeList({
  title,
  episodes,
  isLoading = false,
  highlight = false,
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
              <EpisodeCard
                key={episode.id}
                episode={episode}
                highlight={highlight}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
