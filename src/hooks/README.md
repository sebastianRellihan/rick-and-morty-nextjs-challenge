# Custom Hooks

Esta carpeta contiene hooks personalizados organizados por funcionalidad.

## Estructura:

### `api/`
- `useCharacters.ts` - Hook para manejar datos de personajes
- `useEpisodes.ts` - Hook para manejar datos de episodios

### `ui/`
- `usePagination.ts` - Hook para manejar paginación
- `useLocalStorage.ts` - Hook para persistir datos localmente

## Principios:

1. **Reutilizables**: Lógica que se usa en múltiples componentes
2. **Separación**: Separan la lógica de la presentación
3. **Testeable**: Fáciles de testear de forma aislada
4. **Composables**: Se pueden combinar entre sí
