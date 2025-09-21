import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <div className={cn('container', 'p-xl')}>
      <div className="text-center mb-xl">
        <h1 className="mb-md">Rick and Morty Challenge</h1>
        <p className="mb-lg">Desafío de Rick and Morty</p>

        {/* Demo del sistema de diseño */}
        <div className="grid grid--2-cols mt-xl">
          <div className="card">
            <h3 className="mb-md">Character #1</h3>
            <p className="mb-md">Selecciona un personaje para comenzar</p>
            <button className="btn btn--primary">Seleccionar</button>
          </div>

          <div className="card">
            <h3 className="mb-md">Character #2</h3>
            <p className="mb-md">Selecciona otro personaje para comparar</p>
            <button className="btn btn--secondary">Seleccionar</button>
          </div>
        </div>

        <div className="mt-xl">
          <h2 className="mb-md">Episodios personajes seleccionados</h2>
          <div className="grid grid--3-cols">
            <div className="card">
              <h3 className="mb-sm">1 - Only Episodes</h3>
              <p>
                Episodios en donde solo aparece el personaje #1 seleccionado
              </p>
            </div>
            <div className="card card--selected">
              <h3 className="mb-sm">1 & 2 - Shared Episodes</h3>
              <p>Episodios en donde ambos personajes aparecen</p>
            </div>
            <div className="card">
              <h3 className="mb-sm">2 - Only Episodes </h3>
              <p>
                Episodios en donde solo aparece el personaje #2 seleccionado
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
