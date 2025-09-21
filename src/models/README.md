# Modelos de TypeScript

Esta carpeta contiene todos los tipos e interfaces TypeScript que definen la estructura de datos de la aplicación.

## Estructura de archivos:

### `Character.ts`
Define los modelos relacionados con personajes:
- `Character` - Modelo completo del personaje
- `CharacterSummary` - Versión simplificada para listas
- `CharacterStatus`, `CharacterGender` - Tipos literales
- `CharacterLocation`, `CharacterOrigin` - Información de ubicación
- `SelectedCharacters` - Estado de selección

### `Episode.ts`
Define los modelos relacionados con episodios:
- `Episode` - Modelo completo del episodio
- `EpisodeSummary` - Versión simplificada para listas
- `EpisodeComparison` - Resultado de comparación entre personajes

### `ApiResponse.ts`
Define los modelos para respuestas de la API:
- `ApiResponse<T>` - Respuesta paginada genérica
- `ApiInfo` - Información de paginación
- `ApiError` - Respuesta de error
- `ApiState<T>` - Estado para React Query

### `index.ts`
Punto de entrada que re-exporta todos los tipos y añade:
- Tipos utilitarios (`EntityId`, `PaginationParams`)
- Filtros de búsqueda (`CharacterFilters`, `EpisodeFilters`)
- Configuración de la aplicación (`AppConfig`, `AppState`)

## Principios de diseño:

1. **Tipado estricto**: Todos los tipos son específicos y evitan `any`
2. **Reutilización**: Tipos base que se extienden para casos específicos
3. **Documentación**: JSDoc en todas las interfaces principales
4. **Separación**: Un archivo por dominio de datos
5. **Exportación centralizada**: Fácil importación desde `@/models`

## Ejemplos de uso:

```typescript
import { Character, ApiResponse, CharacterFilters } from '@/models';

// Tipado de respuesta de API
const response: ApiResponse<Character> = await fetchCharacters();

// Tipado de filtros
const filters: CharacterFilters = {
  status: 'Alive',
  species: 'Human'
};

// Tipado de estado
const [character, setCharacter] = useState<Character | null>(null);
```
