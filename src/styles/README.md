# Sistema de Diseño - Rick and Morty Challenge

Este sistema de diseño está basado en la estética de Rick and Morty y sigue principios de diseño atómico.

## Paleta de Colores

```css
--color-black: #0d1f2d        /* Fondo principal */
--color-dark-blue: #166678     /* Elementos secundarios */
--color-light-green: #f0ffef   /* Texto principal */
--color-acid-green: #93f373    /* Acentos y CTAs */
--color-blue: #79e7ff          /* Enlaces y elementos interactivos */
```

## Tipografía

- **Headings (H1-H6)**: Get Schwifty (fuente personalizada)
- **Body Text**: Inter, Segoe UI, Roboto (sistema)

## Espaciado

Sistema de espaciado consistente basado en múltiplos de 4px:

```css
--spacing-xs: 0.25rem    /* 4px */
--spacing-sm: 0.5rem     /* 8px */
--spacing-md: 1rem       /* 16px */
--spacing-lg: 1.5rem     /* 24px */
--spacing-xl: 2rem       /* 32px */
--spacing-2xl: 3rem      /* 48px */
--spacing-3xl: 4rem      /* 64px */
```

## Componentes

### Cards
- `.card` - Tarjeta básica
- `.card--selected` - Estado seleccionado con borde verde

### Botones
- `.btn` - Botón base
- `.btn--primary` - Botón principal (verde ácido)
- `.btn--secondary` - Botón secundario (azul)
- `.btn--disabled` - Estado deshabilitado

### Loading
- `.loading-spinner` - Spinner de carga
- `.loading-skeleton` - Skeleton loader

### Grid
- `.grid` - Grid básico
- `.grid--2-cols` - Grid de 2 columnas
- `.grid--3-cols` - Grid de 3 columnas
- `.grid--auto-fit` - Grid responsivo automático

## Utilidades

### Margin
- `.mb-sm`, `.mb-md`, `.mb-lg`, `.mb-xl` - Margin bottom
- `.mt-sm`, `.mt-md`, `.mt-lg`, `.mt-xl` - Margin top

### Padding
- `.p-sm`, `.p-md`, `.p-lg`, `.p-xl` - Padding

### Layout
- `.container` - Contenedor centrado con max-width
- `.text-center` - Texto centrado

## Responsive Design

Breakpoints:
- SM: 640px
- MD: 768px  
- LG: 1024px
- XL: 1280px

El sistema es mobile-first y se adapta automáticamente a diferentes tamaños de pantalla.
