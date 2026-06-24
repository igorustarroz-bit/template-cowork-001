# Changelog

Registro legible de cambios del design system Euro6000. El detalle exacto está en
el historial de git; aquí se resume lo relevante por fecha.

## [No publicado]

### 2026-06-20

- **Doc Stream B — PoC.** Página de documentación MDX (autodocs) del módulo Cards
  (`src/modules/Cards/Cards.mdx`) siguiendo el esquema consolidado: overview, anatomía,
  comportamiento, variantes, **tabla de tokens**, modo por componente, props/API,
  controles y accesibilidad. Aparece como *Docs* bajo *Módulos/Cards*.
- **Fix:** corregido `index.css` (media queries de radios tenían `}}` dobles que
  rompían el build de Storybook).
- **Radios actualizados (ahora responsive).** `Layout/Corners` cambió en Figma: `L` y
  `XL` varían por breakpoint (`L` 12, 18 en XL-1440; `XL` 24 base → 16 M/LG, 36 XL/XXL,
  40 XXXL); el resto constantes. Actualizado `radii` en `spacing.ts` (responsive),
  `--radius-l`/`--radius-xl` con media queries en `index.css`, y la story usa el
  breakpoint activo.
- **Convención «modo por componente» consolidada.** Retrofit de `Image+Texto`:
  `CashbackCard` ahora es *mode-driven* (tokens `Base`, su `data-theme` la colorea;
  default Dark-Red-Primary) con prop `theme`; el módulo lleva su modo (toolbar) y la
  card su propio modo (control `Modo · CashbackCard`). Documentado en `CONTEXT.md`
  (Convenciones → «Modo por componente»). Modos fieles a Figma: módulo Light-Grey,
  CashbackCard Dark-Red-Primary.
- **Fix tokens: modo claro anidable.** Añadido bloque `[data-theme="light-white"]`
  (antes light-white solo estaba en `:root`, así que un contenedor light-white dentro
  de un módulo oscuro heredaba el modo oscuro). Ahora funciona el patrón módulo en un
  modo + contenedores internos en otro (p.ej. módulo Cards rojo + paneles blancos).
- **Cards: modo por componente** aplicado al Panel (fiel a Figma) + selector por
  componente en Storybook y animación de expand con `ease-out`.
- **Módulo Image+Texto en código.** Dos zonas (texto ≈4 col anclado izq. + imagen 6
  col cuadrada anclada dcha.), mobile-first apilado → grid 12 col en `lg`. Imagen
  `object-cover` que crece cuadrada; `CashbackCard` overlay (nuevo componente: fondo
  acento, barras, botón circular) tamaño fijo anclado abajo-derecha; CTA fit-content.
  Sin estados interactivos (solo CTAs). Reutiliza `ActionButton`.
- **Cards: comportamiento + Storybook.** Estado expand/collapse (una sola card
  expandida a la vez: 6 col + descripción + icono −; las demás 3 col + icono +),
  click para alternar. Storybook: selector de **breakpoint** en la toolbar
  (viewports xs…xxxl) y **textos editables** por controles. Aprendizaje para el gate:
  los **estados/comportamientos interactivos** (variantes `State` del component set)
  deben **detectarse en el análisis, antes de construir** el componente.
- **Módulo Cards en código (prueba design-to-code sin autolayout).** Validado que se
  puede derivar el spacing midiendo geometría en Figma y aplicando los tokens
  (`Spacers`/`Gutter`/`Wrapper`) directo en código — sin construir autolayout. Nuevo
  `src/modules/Cards` (grid 12 col, card destacada 6 col + 2 de 3 col, panel overlay)
  reutilizando `ActionButton` e `IconButton`. Autolayout pasa a opcional en el gate.

### 2026-06-19

- **Regla R-TK1 (tokens/limpieza):** nunca un rectángulo de fondo; el color de fondo
  se aplica al frame contenedor (`Backgrounds/Base`). Validada en el Módulo 1 del
  banco de pruebas; documentada en `docs/stream-a-figma-workflow.md`.
- **Skills / proceso.** Integrado el workflow de diseño en Figma del hilo paralelo
  como `docs/stream-a-figma-workflow.md` (especificación del gate «Ready to develop»),
  adaptado al stack de este proyecto (Tailwind, no CSS Grid puro). Decisiones:
  autolayout para estructura/variantes; responsive se documenta en Figma e implementa
  en código (variables responsive en Figma opcionales). Análisis comparativo de
  documentación de 6 design systems (`docs/ds-doc-comparison.md`,
  `docs/carbon-doc-analysis.md`) y plan de streams (`docs/streams-...md`).
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
