import { COLORS } from '@/constants';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <div className={cn('container')}>
      <h1 style={{ color: COLORS.ACID_GREEN }}>Rick and Morty Challenge</h1>
      <p>Desafío de Rick and Morty</p>
    </div>
  );
}
