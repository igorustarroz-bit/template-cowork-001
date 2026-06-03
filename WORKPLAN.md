# Design System — Plan de Trabajo
> Fuente: Librería-Pruebas Claude (Figma)  
> Stack: React · Tailwind CSS · GSAP · Storybook

---

## Cómo usar este plan

Cada tarea es independiente y tiene un estado: `[ ]` pendiente · `[x]` completado.  
Al retomar el proyecto, busca la primera tarea sin marcar y continúa desde ahí.

---

## FASE 1 — TOKENS

### T01 · Colores primitivos
- Variables Figma: `Color/Grayscale/*` (10–97) · `Color/Primary-1/*` (01–06)
- Objetivo: exportar a `src/tokens/colors.ts` como CSS custom properties

### T02 · Colores semánticos
- Variables Figma: colección `Semantic-Color` (Button/Primary, Tertiary, etc.)
- Objetivo: mapear sobre primitivos → `src/tokens/semantic-colors.ts`

### T03 · Tipografía
- Variables Figma: `Tipography/Letter-Spacing/` (Body, CTA, Forms, Label, Title)
- Componentes doc: `05 - Title`, `Typeset - Colour`
- Objetivo: exportar font-sizes, line-heights, letter-spacings → `src/tokens/typography.ts`

### T04 · Espaciado y layout responsive
- Variables Figma: colección `Responsive` → `Layout/Button/{XS·S·M·L·XL}/Size` y `/Padding`
- Objetivo: definir escala de spacing y breakpoints → `src/tokens/spacing.ts`

---

## FASE 2 — COMPONENTES UI

> Prefijo Figma: `UI0x` / `UI xx`

### C01 · Botón primario — `UI01 - Action-Button`
- Variantes: Action, Navigation, Icon Only
- Estados: default, hover, focus, disabled

### C02 · Botón secundario / link — `UI02-Action Link-Button`

### C03 · Botón de transacción — `UI02 - Transaction Button`

### C04 · Botón de navegación — `UI01-Navigation-Button`

### C05 · Botón icono — `UI01 - Icon Only`

### C06 · Input de texto — `UI02 - Input`
- Estados: default, focus, error, disabled

### C07 · Checkbox + Label — `UI 03 - Checkbox + Label`

### C08 · Radio Button + Label — `UI 04 - Radio Button + Label`

### C09 · Tag — `UI 07 - Tag`

### C10 · Filter Chip — `UI 12 - Filter chip`

### C11 · Marquee — `UI 08 - Marquee`
- Animación GSAP (scroll horizontal continuo)

### C12 · Overlay — `UI 09 - Overlay`

### C13 · Video Modal — `UI 11 - Video Modal`

### C14 · Link Menu — `UI01 - Link Menu`

### C15 · Listbox / Dropdown — `Listbox` + `fragment_listbox_Item_Dropdown`

### C16 · Filter Row — `Filter Row`

### C17 · Color swatch — `Color` (component set doc)

---

## FASE 3 — MÓDULOS

> Prefijo Figma: `Mxx`

### M01 · Menu / Navegación principal — `M01 - Menu`
- Incluye: `Item Menu Desplegado`

### M24 · Highlight Content — `M24 - Highlight Content`

### M38 · Numbers — `M38 - Numbers` (Desktop variant)

### M39 · Logos — `M39 - Logos`

### M40 · Timeline — `M40 - Timeline`
- Animación GSAP (entrada progresiva)

### M42 · List Links — `M42 - List links`

### M44 · Steps — `M44 - Steps`
- Animación GSAP (reveal por paso)

### M48 · Panel Lateral — `M48 - Panel Lateral`

---

## FASE 4 — SETUP Y DOCUMENTACIÓN

### S01 · Storybook configurado con Tailwind + tema DS
### S02 · Story base por cada token (color, tipografía, espaciado)
### S03 · Story por cada componente UI (C01–C17)
### S04 · Story por cada módulo (M01–M48)
### S05 · README de contribución

---

## Resumen de elementos

| Fase | Elementos |
|------|-----------|
| Tokens | 4 |
| Componentes UI | 17 |
| Módulos | 8 (más a confirmar con Figma) |
| Setup/Docs | 5 |
| **Total** | **34** |

---

_Última actualización: 2026-06-03_
