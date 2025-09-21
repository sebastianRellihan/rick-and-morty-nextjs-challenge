# Estructura del Proyecto

Este documento describe la organización y las rutas absolutas configuradas en el proyecto.

## Rutas Absolutas Configuradas

Las siguientes rutas absolutas están disponibles en todo el proyecto:

- `@/*` - Acceso a cualquier archivo dentro de `src/`
- `@/components/*` - Componentes reutilizables de UI
- `@/hooks/*` - Custom hooks de React
- `@/services/*` - Servicios para comunicación con APIs
- `@/stores/*` - Gestión de estado global
- `@/lib/*` - Utilidades y funciones helper
- `@/models/*` - Tipos e interfaces de TypeScript
- `@/constants/*` - Constantes globales de la aplicación
- `@/styles/*` - Archivos de estilos CSS/SCSS
- `@/app/*` - Rutas y páginas de Next.js App Router

## Estructura de Carpetas

```
src/
├── app/                 # Next.js App Router (páginas y layouts)
├── components/          # Componentes React reutilizables
├── hooks/              # Custom hooks
├── services/           # Servicios de API y lógica de negocio
├── stores/             # Estado global (Zustand, Context, etc.)
├── lib/                # Utilidades y funciones helper
├── models/             # Tipos e interfaces de TypeScript
├── constants/          # Constantes globales
└── styles/             # Archivos de estilos
```

## Ejemplos de Uso

### Importación de constantes:
```typescript
import { API_BASE_URL, COLORS } from '@/constants';
```

### Importación de utilidades:
```typescript
import { cn } from '@/lib/utils';
```

### Importación de componentes:
```typescript
import { Button } from '@/components/ui/Button';
```

### Importación de hooks:
```typescript
import { usePagination } from '@/hooks/usePagination';
```
