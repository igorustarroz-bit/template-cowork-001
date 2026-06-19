# Changelog

Registro legible de cambios del design system Euro6000. El detalle exacto está en
el historial de git; aquí se resume lo relevante por fecha.

## [No publicado]

### 2026-06-19

- **Storybook — selectores de modo en la toolbar (estilo Carbon).** «Modo de color»
  (6 temas semánticos) y «Marca» (Euro6000/Bankinter) ahora son *globals* en la barra
  superior, aplicados a todas las stories vía decorator (`data-theme`/`data-brand`,
  fondo y texto semánticos). Quitados los controles duplicados de tema/marca.
- **Componentes (Fase 2):** C01 Action Button, C02 Action Link Button, C05 Icon Button,
  C06 Input. Estilos co-localizados con tokens semánticos; estados con pseudo-clases
  nativas + props. (C03 Transaction y C04 Navigation eliminados del plan.)
- **Tipografía:** estilos documentados como responsive (enlazados a variables de Figma),
  con selector de breakpoint en la story y, después, selectores de modo/marca globales.
- **Tokens (Fase 1 completa):** T01 colores primitivos, T02 colores semánticos (6 temas),
  T03 tipografía (Geist, 28 estilos), T04 espaciado/radios/breakpoints. Expuestos como
  CSS custom properties y utilidades Tailwind.
- **Setup:** proyecto reconstruido desde cero (React + TS + Vite + Tailwind + GSAP +
  Storybook), `node_modules` fuera de git, CI a GitHub Pages, `CONTEXT.md` y `PLAN.md`.
