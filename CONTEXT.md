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
  con `Nombre.tsx`, `Nombre.stories.tsx` e `index.ts`.
- **Estilos** → utilidades Tailwind referenciando tokens (`var(--token)`); nada
  de valores hardcodeados que existan como token.
- **Alias** → `@/` apunta a `src/`.
- **Animaciones** → GSAP, encapsuladas en hooks/efectos dentro del componente.

## Flujo de trabajo

1. `git pull` al empezar; `git push` al terminar (Git es la fuente de verdad).
2. Orden de trabajo: **Tokens → Componentes → Módulos → Docs**.
3. Cada elemento terminado se revisa en Storybook local antes de push.
4. Mantener `CONTEXT.md` y `PLAN.md` actualizados tras cada sesión.

## Decisiones tomadas

- **Tipografía:** familia única **Geist** (importada vía Google Fonts en
  `index.css`; instalar localmente para edición). 28 text styles (Title 01–07,
  Body 01–06, Labels, CTA, CTA-Link-Footer, Forms Input-M/S) expuestos como
  clases `.type-<slug>` y como escala `fontSize` en Tailwind (ej. `text-title-04`).
  Valores en px tal cual el Figma.

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
