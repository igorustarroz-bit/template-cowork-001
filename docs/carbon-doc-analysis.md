# Cómo documenta Carbon sus componentes — análisis para nuestra skill

Análisis de la forma de documentar de IBM Carbon, basado en el código fuente real
de su web (`carbon-design-system/carbon-website`, páginas MDX de Button) y su
Storybook (`react.carbondesignsystem.com`). Objetivo: extraer una plantilla
reutilizable para una skill que documente componentes del design system Euro6000.

## 1. El modelo de dos capas

Carbon separa la documentación en dos sitios con propósitos distintos:

1. **Sitio de _guidance_** (carbondesignsystem.com) — el "por qué" y el "cómo
   usar": uso, estilo, accesibilidad. Escrito a mano en MDX, muy visual
   (imágenes anotadas, tarjetas do/don't). No duplica la API.
2. **Storybook** (react.carbondesignsystem.com) — el "qué" técnico: demo
   interactiva, **tabla de props autogenerada desde los tipos** (autodocs),
   una story por variante, "Show code", toolbar de tema y addon de accesibilidad.

El sitio de guidance _embebe_ el Storybook (componente `StorybookDemo` con
selector de tema) en vez de recrear ejemplos. **Una sola fuente para la demo.**

## 2. Plantilla de un componente (4 pestañas)

Cada componente usa exactamente la misma estructura. Frontmatter:

```yaml
title: Button
description: Buttons are used to initialize an action...
tabs: ['Usage', 'Style', 'Code', 'Accessibility']
```

### Pestaña «Usage» (uso)
Orden de secciones (de la página real de Button):

1. `PageDescription` — una frase de qué es y para qué.
2. `InlineNotification` — avisos (p.ej. features no productivas).
3. `AnchorLinks` — índice de la página (TOC).
4. **Live demo** — `StorybookDemo` con `themeSelector` y lista de variantes.
5. **Overview** — descripción ampliada.
6. **Formatting** — anatomía / alineación / disposición.
7. **Content** — guía de textos (labels, mayúsculas, longitud).
8. **Universal behaviors** — comportamientos comunes a todas las variantes.
9. **Una sección por variante** (Primary, Secondary, Tertiary, Ghost, Danger…)
   con cuándo usarla.
10. **Modifiers** — tamaños, estados, banderas.
11. **Related** / **References** / **Feedback**.

Recurso clave: tarjetas **do / don't** con imagen para cada recomendación.

### Pestaña «Style» (estilo) — la más sistemática
Secciones: **Color · Typography · Structure · Size · Feedback**. Todo se expresa
como **tablas que mapean elemento → propiedad → token**, no como valores sueltos:

- **Color**, por variante, dos tablas:
  - Base: `Element | Property | Color token` (ej. Label→text-color→`$text-on-color`).
  - Estados interactivos: `State | Element | Property | Color token`
    (Hover/Focus/Active/Disabled).
- **Typography**: `Element | Font-size (px/rem) | Font-weight | Type token`.
- **Structure**: `Element | Property | px/rem | Spacing token` (paddings, gap, foco).
- **Size**: `Variant | Size | Height (px/rem)`.

Cada bloque acompañado de imagen anotada (con `Tabs` para "con icono" / "solo icono").

### Pestaña «Code»
Sorprendentemente ligera: tarjetas de recurso enlazando al Storybook de cada
framework (React, Web Components, Angular, Vue) + `StorybookDemo`. **La tabla de
props/API NO se escribe aquí**: vive en el autodocs del Storybook, generada desde
los tipos. Evita duplicación y desincronización.

### Pestaña «Accessibility»
Secciones: **What Carbon provides** (interacciones de teclado, comportamiento) ·
**Design recommendations** (etiquetado, anotaciones de diseño) · **Development
considerations** · y un componente `A11yStatus` que pinta una **tabla de
cumplimiento WCAG** automática por componente.

## 3. Bloques reutilizables (su "kit" de documentación)

- `PageDescription` — intro estándar.
- `AnchorLinks` / `AnchorLink` — TOC consistente.
- `StorybookDemo` con `themeSelector` — demo viva embebida, una fuente.
- Tablas de tokens elemento→propiedad→token (el corazón de la pestaña Style).
- `DoDontExample` / tarjetas do-don't.
- `Row` / `Column` — rejilla para specs + imagen.
- `A11yStatus` — estado de accesibilidad automatizado.
- En Storybook: **autodocs** (props desde tipos + JSDoc), story por variante,
  toolbar de tema (global), addon a11y.

## 4. Principios que lo hacen sólido

1. **Misma plantilla en todos los componentes** → predecible, escalable.
2. **La API se autogenera desde los tipos** → nunca se desincroniza del código.
3. **Guidance separada de API** (uso/estilo/accesibilidad vs props/código).
4. **El estilo se documenta como tokens**, no como valores hardcodeados
   (elemento → propiedad → token), por variante y por estado.
5. **Una sola demo** (Storybook) embebida donde haga falta.
6. **Accesibilidad de primera clase**, con su propia pestaña y estado de cumplimiento.

## 5. Traducción a Euro6000 (propuesta para la skill)

Nuestro Storybook ya tiene la base: tokens semánticos, toolbar global de tema +
marca (estilo Carbon), y componentes con CSS basado en tokens. Propuesta de
**plantilla de documentación por componente** (MDX autodocs en Storybook):

| Sección | Contenido | ¿Autogenerable? |
| --- | --- | --- |
| Overview | Qué es, para qué, enlace al nodo de Figma | Manual (1 frase) |
| Anatomía | Partes del componente (imagen/diagrama) | Semi |
| Variantes | Una fila por variante + cuándo usarla | Manual |
| Estados | default/hover/focus/selected/disabled | Manual + demo |
| Tamaños | Tabla `Variante | Tamaño | Alto` desde `buttonLayout`/`formsLayout` | **Auto** (de tokens) |
| Estilo · Color | Tabla `Estado | Parte | Token` desde los `--sem-*` del componente | **Auto** (de CSS vars) |
| Estilo · Tipografía/Spacing | Tablas desde tokens | **Auto** |
| Props / API | Tabla de args | **Auto** (autodocs desde tipos TS) |
| Uso do/don't | Recomendaciones | Manual |
| Accesibilidad | Teclado, foco, aria, label | Manual + addon a11y |

**Qué añadir al proyecto para soportarlo:**
- `@storybook/addon-a11y` (pestaña de accesibilidad automática).
- Autodocs activado (`tags: ['autodocs']`) + descripciones JSDoc en los props
  (ya las tenemos en los componentes) → tabla de Args rica.
- Un patrón MDX (`Componente.mdx`) por componente con las secciones de arriba.
- Helpers que generen las **tablas de tokens** leyendo nuestros tokens
  (semánticos por estado/variante y de layout), evitando escribir valores a mano
  — el equivalente a las tablas elemento→propiedad→token de Carbon.

## 6. Diferencias a tener en cuenta

- Carbon mantiene un **sitio aparte** (Gatsby) además del Storybook; nosotros
  podemos concentrar todo en Storybook (autodocs + MDX) para simplificar.
- Carbon documenta en **SCSS tokens** (`$button-primary`…); nosotros usamos
  **CSS custom properties** (`--sem-button-primary-…`) — el mapeo es 1:1 y encaja
  igual de bien en tablas elemento→propiedad→token.
- Carbon tiene compliance WCAG formal; para empezar nos basta el addon a11y.

---

_Fuentes: `carbon-website` (button `usage.mdx`, `style.mdx`, `code.mdx`,
`accessibility.mdx`) y `react.carbondesignsystem.com`. Análisis: 2026-06-19._
