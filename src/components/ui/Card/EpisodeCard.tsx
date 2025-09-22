/**
 * Componente atómico para mostrar información de un episodio
 */

import { cn } from '@/lib/utils';
import { formatAirDate, formatEpisodeCode } from '@/lib/utils/episodeUtils';
import type { Episode } from '@/models';
import styles from './EpisodeCard.module.css';

interface EpisodeCardProps {
  episode: Episode;
  className?: string;
}

export function EpisodeCard({ episode, className }: EpisodeCardProps) {
  return (
    <div className={cn(styles.episodeCard, className)}>
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
    </div>
  );
}
