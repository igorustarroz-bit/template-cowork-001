# CONTEXT — Euro6000 Design System

Versión en código del design system de **Euro6000**, generada a partir de los
archivos de diseño en Figma. Este documento describe el stack, las convenciones
y las decisiones de diseño. Léelo (junto con `PLAN.md`) antes de cada sesión.

## Fuente de diseño (Figma)

- Archivo: **Euro6000 — Library**
- URL: https://www.figma.com/design/fhitjEfpLDbD5cYed156Cb/Euro6000---Library?node-id=42880-1062
- Acceso vía conector **Figma MCP** (`use_figma`, `get_variable_defs`, etc.).
- Principio: **la estética la definen los Figmas, no Tailwind**.

## Stack

| Capa | Tecnología |
|------|------------|
| Framework | React 18 + TypeScript |
| Build | Vite 6 |
| Estilos | Tailwind CSS 3 (tokens vía CSS custom properties) |
| Animaciones | GSAP 3 |
| Documentación / visualización | Storybook 8 |
| Despliegue | GitHub Pages (GitHub Actions) |

## Estructura del proyecto

```
.
├── .github/workflows/deploy-storybook.yml  # CI → GitHub Pages
├── .storybook/                             # config Storybook
├── src/
│   ├── tokens/        # colores, tipografía, spacing (Fase 1)
│   ├── components/    # componentes UI (Fase 2)
│   ├── stories/       # docs Storybook
│   ├── index.css      # @tailwind + tokens (:root custom properties)
│   ├── App.tsx        # playground de desarrollo (npm run dev)
│   └── main.tsx
├── tailwind.config.ts
├── vite.config.ts
├── tsconfig.json
├── CONTEXT.md  (este archivo)
└── PLAN.md     (estado del plan de trabajo)
```

## Convenciones de código

- **Tokens** → `src/tokens/*.ts`, exportados además como CSS custom properties
  en `:root` (vía `src/index.css`). Primero primitivos/globales, después
  semánticos/específicos.
- **Componentes** → un directorio por componente en `src/components/<Nombre>/`
  con `Nombre.tsx`, `Nombre.stories.tsx`, `Nombre.css` (cuando aplica) e `index.ts`.
  Los colores/estados se resuelven con CSS co-localizado que referencia los tokens
  semánticos (`var(--sem-...)`); los estados Hover/Focus/Disabled usan pseudo-clases
  nativas (`:hover`, `:focus-visible`/`:focus-within`, `:disabled`) y Selected/estados
  de validación van por prop (`data-*`). Así el variant→token no depende del escaneo
  JIT de Tailwind. Tailwind se usa para layout/utilidades.
- **Estilos** → utilidades Tailwind referenciando tokens (`var(--token)`); nada
  de valores hardcodeados que existan como token.
- **Alias** → `@/` apunta a `src/`.
- **Animaciones** → GSAP, encapsuladas en hooks/efectos dentro del componente.
- **Modo por componente (multi-modo anidado)** → cada módulo lleva su modo (en
  Storybook lo controla el **selector global de la toolbar**); los sub-componentes
  con contenedor tokenizado aceptan una prop `theme` que aplica `data-theme` y
  **sobrescribe** el modo del módulo (ej. módulo `Cards` rojo + paneles `light-white`;
  `Image+Texto` gris + `CashbackCard` rojo). Los componentes deben ser **mode-driven**
  (usar tokens `Backgrounds/Base`/`Texts/Base`, nunca un color fijo): es su *modo* el
  que los colorea. **Requisito**: cada modo necesita su bloque `[data-theme="…"]` en
  `index.css` (incluido `light-white`, que además vive en `:root`), si no, un modo
  anidado hereda el del ancestro. En las stories: toolbar = modo del módulo · controles
  = un selector de modo por componente interior (+ textos editables).
- **Checkbox/Radio (estado nativo)** → a diferencia de otros componentes (que
  resuelven variantes con un `data-state` calculado en JS), `Checkbox` usa las
  pseudo-clases nativas del control (`:checked`, `:indeterminate`, `:disabled`,
  `:hover`, `:focus-visible`) para pintar el estado — es la fuente de verdad del
  navegador y funciona igual controlado/no controlado. Aplicar el mismo patrón a
  Radio Button (C08).
- **Documentación en Storybook** → toda story de tokens con varios *modos*
  (marca, tema) o valores *responsive* (breakpoints) debe incluir un **selector**
  (arg `control: "select"`) para previsualizar cada modo/breakpoint, igual que el
  selector de tema en colores semánticos. Aplica a: T02 (tema + marca), T03
  (tipografía → selector de breakpoint, listando todos los estilos) y T04
  (spacing/grids/cols → selector de breakpoint). Resaltar el valor activo.
- **Tablas Markdown en MDX (`remark-gfm`)** → Storybook usa MDX2 desde la v7,
  que **no** interpreta tablas GFM (`| col | col |`) por defecto — sin el
  plugin se renderizan como texto plano en una sola línea. Se activó
  `remark-gfm` en `.storybook/main.ts` (addon `@storybook/addon-docs`
  registrado aparte, con `docs: false` en `addon-essentials` para poder
  pasarle `mdxPluginOptions`). No requiere nada especial al escribir un
  `.mdx` nuevo: las tablas Markdown funcionan igual que en GitHub.
- **Idioma de la documentación (MDX)** → **Inglés** (punto 1 de las instrucciones
  del proyecto). Cada token/componente/módulo publicado lleva un `Nombre.mdx`
  junto a su `Nombre.stories.tsx`, con el esquema del punto 16: tokens →
  Intro/Demo/Tokens; componentes/módulos → Intro/Demo/Anatomía/Subtemas/
  Comportamiento/Variantes y tamaños/Tokens/Propiedades/Accesibilidad/
  Componentes relacionados. `Cards.mdx` (PoC inicial en español) ya se
  tradujo al inglés (2026-07-01) — no queda ninguna excepción de idioma en
  Storybook.

## Assets (imágenes y vectores)

Todo bajo `src/assets/` (procesado por Vite): `icons/`, `logos/{brand,entities}/`,
`illustrations/`, `images/`. **Vectores = SVG con `currentColor`** importados como
componentes React vía **SVGR** (`vite-plugin-svgr`, `import X from "./x.svg?react"`),
para que el color lo ponga el token (regla *vector = slot*); se re-exportan en el
`index.ts` de cada carpeta. **Fotos = WebP** importadas directamente (URL con hash).
Flujo de export desde Figma y convenciones en `docs/assets-workflow.md` y
`src/assets/README.md`. Nota: desde el sandbox de Cowork `figma.com` está bloqueado,
así que el binario se guarda con el export nativo de Figma (ver el doc).

## Flujo de trabajo

1. `git pull` al empezar; `git push` al terminar (Git es la fuente de verdad).
2. Orden de trabajo: **Tokens → Componentes → Módulos → Docs**.
3. Cada elemento terminado se revisa en Storybook local antes de push.
4. Mantener `CONTEXT.md` y `PLAN.md` actualizados tras cada sesión.

## Decisiones tomadas

- **Espaciado/breakpoints:** breakpoints mobile-first (xs 375 base · sm 480 · m 768 ·
  lg 1024 · xl 1440 · xxl 1620 · xxxl 1920) en `theme.screens`. Escala fija `fx-0..9`
  (px) + radios (`rounded-*`). Spacers (0–18) y grids (wrappers/gutter) son
  responsive: CSS vars `--space-*` / `--wrapper-*` con media queries mobile-first,
  y utilidades Tailwind `sp-*`, `gutter`, `wrapper-*`. La escala de tipografía
  responsive de Figma queda como dato en tokens (mejora futura, T03 fija el ramp base).

- **Tipografía:** familia única **Geist**. Los 28 text styles de Figma están
  ENLAZADOS a variables: tamaño/interlineado → colección `Responsive` (varían por
  breakpoint), y familia/peso/letter-spacing → primitivos `Tipography/*`. Por eso
  las clases `.type-<slug>` son **responsive** (base xs + media queries) y replican
  el estilo de Figma. `typography.ts` expone cada estilo con sus valores por
  breakpoint y las variables a las que se enlaza. Documentados en Storybook
  (Tokens/Tipografía).
- **Temas semánticos:** la colección `Semantic-Color` define 6 temas —
  `light-white` (por defecto), `light-grey`, `dark-red-primary`,
  `dark-secondary-blue`, `dark-black-brand`, `dark-black-neutral`. Cada token
  semántico (`--sem-*`) referencia un primitivo o a otro semántico, así que
  marca (`data-brand`) y tema (`data-theme`) se componen. En Tailwind viven bajo
  el namespace `sem-` (ej. `bg-sem-backgrounds-base`).

- **Multi-marca:** la colección `Primitives` de Figma tiene dos modos —
  `Euro600` (por defecto) y `Bankinter`. Se exponen como CSS custom
  properties; Bankinter solo redefine `--color-primary-1-50`. Cambiar de
  marca con `<html data-brand="bankinter">`.

- Proyecto reconstruido desde cero (2026-06-19): scaffold limpio, `node_modules`
  fuera de git (`.gitignore`), `CONTEXT.md` + `PLAN.md` añadidos.
- `postcss.config.cjs` (CommonJS) para evitar warnings de tipo de módulo.
- Storybook como sistema de visualización oficial; `npm run dev` es solo un
  playground.
