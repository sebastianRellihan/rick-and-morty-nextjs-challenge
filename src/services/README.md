# Servicios de API

Esta carpeta contiene todos los servicios para comunicarse con la API de Rick and Morty.

## Estructura:

### `api/rickAndMortyAPI.ts`
Servicio principal que contiene todas las funciones para interactuar con la API:

**Personajes:**
- `getCharacters(params)` - Obtiene página de personajes
- `getCharacterById(id)` - Obtiene personaje específico
- `getMultipleCharacters(ids)` - Obtiene múltiples personajes
- `searchCharacters(params, filters)` - Busca personajes con filtros

**Episodios:**
- `getEpisodes(params)` - Obtiene página de episodios
- `getEpisodeById(id)` - Obtiene episodio específico
- `getMultipleEpisodes(ids)` - Obtiene múltiples episodios
- `searchEpisodes(params, filters)` - Busca episodios con filtros

### `api/endpoints.ts`
Utilidades para construir URLs de la API:
- `buildCharactersUrl()` - URL para lista de personajes
- `buildCharacterByIdUrl()` - URL para personaje específico
- `buildCharactersSearchUrl()` - URL para búsqueda con filtros

### `api/types.ts`
Tipos específicos del servicio:
- `FetchResult<T>` - Resultado de petición HTTP
- `RetryOptions` - Configuración de reintentos
- `RickAndMortyApiError` - Errores específicos de la API

### `api/utils.ts`
Utilidades adicionales:
- `getCharacterEpisodes()` - Obtiene episodios de un personaje
- `checkApiHealth()` - Verifica disponibilidad de la API
- `calculateCharacterStats()` - Estadísticas de personajes

### `api/index.ts`
Punto de entrada que exporta todas las funciones y tipos.

## Características:

### **Manejo de errores robusto:**
- Reintentos automáticos con backoff exponencial
- Timeout configurable (30 segundos)
- Errores específicos por tipo (red, API, timeout)
- Validación de estructura de datos

### **Validación de datos:**
- Verificación de tipos con type guards
- Validación de estructura de respuesta
- Sanitización de parámetros de entrada

### **Optimización:**
- Manejo eficiente de múltiples IDs
- Reutilización de conexiones
- Respuestas tipadas estrictamente

## Ejemplos de uso:

```typescript
import { getCharacters, getCharacterById, searchCharacters } from '@/services/api';

// Obtener primera página de personajes
const characters = await getCharacters({ page: 1 });

// Obtener personaje específico
const rick = await getCharacterById(1);

// Buscar personajes vivos
const aliveCharacters = await searchCharacters(
  { page: 1 }, 
  { status: 'Alive' }
);
```

## Manejo de errores:

```typescript
try {
  const character = await getCharacterById(999);
} catch (error) {
  if (error.message === ERROR_MESSAGES.CHARACTER_NOT_FOUND) {
    // Manejar personaje no encontrado
  } else {
    // Manejar otros errores
  }
}
```
