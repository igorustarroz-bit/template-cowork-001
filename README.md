# Euro6000 · Design System

Versión en código del design system de **Euro6000**, generada a partir de los
archivos de diseño en Figma.

## Stack

- **Framework:** React + TypeScript
- **Build:** Vite
- **Estilos:** Tailwind CSS — la estética la definen los Figmas, no Tailwind
- **Animaciones:** GSAP
- **Documentación / visualización:** Storybook (desplegado en GitHub Pages)

## Scripts

```bash
npm install          # instalar dependencias
npm run storybook    # Storybook en local → http://localhost:6006
npm run build-storybook
npm run dev          # app Vite (sandbox de pruebas)
```

## Estructura

```
src/
  tokens/       # colores, tipografía, spacing (Fase 1)
  components/   # componentes UI (Fase 2)
  stories/      # documentación Storybook
```

## Documentos de referencia

- [`CONTEXT.md`](./CONTEXT.md) — stack, convenciones y decisiones de diseño.
- [`PLAN.md`](./PLAN.md) — plan de trabajo con estado de cada tarea.

> Lee `CONTEXT.md` y `PLAN.md` antes de empezar cualquier sesión.
