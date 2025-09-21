/**
 * Componente atómico para mostrar información de un personaje
 */

import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { Character } from '@/models';
import styles from './CharacterCard.module.css';

interface CharacterCardProps {
  /** Datos del personaje a mostrar */
  character: Character;
  /** Si la card está seleccionada */
  isSelected?: boolean;
  /** Función que se ejecuta al hacer clic en la card */
  onClick?: (character: Character) => void;
  /** Clase CSS adicional */
  className?: string;
}

/**
 * Obtiene el color del estado del personaje
 */
function getStatusColor(status: Character['status']): string {
  switch (status) {
    case 'Alive':
      return 'var(--color-acid-green)';
    case 'Dead':
      return '#ff6b6b';
    case 'unknown':
      return 'var(--color-blue)';
    default:
      return 'var(--color-light-green)';
  }
}

export function CharacterCard({
  character,
  isSelected = false,
  onClick,
  className,
}: CharacterCardProps) {
  const handleClick = () => {
    onClick?.(character);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={cn(
        styles.characterCard,
        isSelected && styles.selected,
        !onClick && styles.notClickable,
        className,
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={onClick ? 0 : -1}
      role={onClick ? 'button' : undefined}
      aria-pressed={onClick ? isSelected : undefined}
      aria-label={
        onClick
          ? `Select character ${character.name}`
          : `Information for ${character.name}`
      }
    >
      {/* Imagen del personaje */}
      <div className={styles.image}>
        <Image
          src={character.image}
          alt={`Image of ${character.name}`}
          width={80}
          height={80}
          className={styles.img}
          priority={false}
        />
      </div>

      {/* Información del personaje */}
      <div className={styles.content}>
        <h3 className={styles.name}>{character.name}</h3>

        <div className={styles.statusLine}>
          <span
            className={styles.statusDot}
            style={{ backgroundColor: getStatusColor(character.status) }}
            aria-label={`Status: ${character.status}`}
          />
          <span className={styles.statusText}>{character.status}</span>
          <span className={styles.species}>{character.species}</span>
        </div>
      </div>

      {/* Indicador de selección */}
      {isSelected && (
        <div className={styles.selectedIndicator}>
          <span className={styles.checkmark}>✓</span>
        </div>
      )}
    </div>
  );
}
