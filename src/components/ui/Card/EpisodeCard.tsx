/**
 * Componente atómico para mostrar información de un episodio
 */

import { cn } from '@/lib/utils';
import { formatAirDate, formatEpisodeCode } from '@/lib/utils/episodeUtils';
import type { Episode } from '@/models';
import styles from './EpisodeCard.module.css';

interface EpisodeCardProps {
  /** Datos del episodio a mostrar */
  episode: Episode;
  /** Clase CSS adicional */
  className?: string;
  /** Si debe resaltar el episodio (para episodios compartidos) */
  highlight?: boolean;
}

export function EpisodeCard({
  episode,
  className,
  highlight = false,
}: EpisodeCardProps) {
  return (
    <div
      className={cn(
        styles.episodeCard,
        highlight && styles.highlight,
        className,
      )}
    >
      {/* Header del episodio */}
      <div className={styles.header}>
        <span className={styles.episodeCode}>
          {formatEpisodeCode(episode.episode)}
        </span>
        <span className={styles.airDate}>
          {formatAirDate(episode.air_date)}
        </span>
      </div>

      {/* Título del episodio */}
      <h4 className={styles.title}>{episode.name}</h4>

      {/* Información adicional */}
      <div className={styles.info}>
        <div className={styles.charactersCount}>
          <span className={styles.label}>Characters:</span>
          <span className={styles.value}>{episode.characters.length}</span>
        </div>
      </div>

      {/* Indicador de episodio compartido */}
      {highlight && (
        <div className={styles.sharedIndicator}>
          <span className={styles.sharedIcon}>⭐</span>
        </div>
      )}
    </div>
  );
}
