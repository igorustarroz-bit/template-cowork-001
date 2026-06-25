# PLAN — Euro6000 Design System

> Fuente: Euro6000 — Library (Figma) · Stack: React · Tailwind · GSAP · Storybook
> Estado por tarea: `[ ]` pendiente · `[~]` en progreso · `[x]` completado

## Cómo usar este plan

Al retomar el proyecto, busca la primera tarea sin completar y continúa desde
ahí. Mantén los estados actualizados y haz push al terminar.

**Orden de trabajo (siempre):** Tokens → Componentes → Módulos → Docs.
Dentro de cada fase: primero las bases (primitivas / componentes-base), después
lo que depende de ellas.

---

## FASE 0 — SETUP  ✅

- [x] Scaffold React + TS + Vite
- [x] Tailwind CSS configurado
- [x] Storybook configurado y compilando
- [x] GSAP instalado
- [x] Workflow GitHub Pages
- [x] `.gitignore` (node_modules fuera de git)
- [x] CONTEXT.md + PLAN.md

---

## FASE 1 — TOKENS  ✅

> Validar el inventario contra Figma al iniciar la fase (`get_variable_defs`).

- [x] **T01 · Colores primitivos** — `Color/Grayscale/*`, `Color/Primary-1/*`
      → `src/tokens/colors.ts` + custom properties en `:root`
- [x] **T02 · Colores semánticos** — colección `Semantic-Color`
      (Button/Primary, Tertiary, etc.) mapeados sobre primitivos
      → `src/tokens/semantic-colors.ts`
- [x] **T03 · Tipografía** — `Tipography/Letter-Spacing/*`, escalas de
      font-size / line-height → `src/tokens/typography.ts`. Los text styles
      están enlazados a variables: tamaño/interlineado son responsive (colección
      `Responsive`), familia/peso/letter-spacing son primitivos. La story debe
      documentar **todos** los estilos e incluir un **selector de breakpoint**
      (control select xs…xxxl) para previsualizar cada uno, igual que el selector
      de modo en colores semánticos.
- [x] **T04 · Espaciado y breakpoints** — colección `Responsive`
      (`Layout/Button/{XS·S·M·L·XL}`) → `src/tokens/spacing.ts`. La story debe
      **listar** spacers, grids y cols responsive e incluir un **selector de
      breakpoint** (xs…xxxl) para ver sus valores en cada uno; la escala fija
      (`fx`), radios y anchos de viewport se muestran como constantes.

---

## FASE 2 — COMPONENTES UI

> Prefijo Figma: `UIxx`. Primero los que son base de otros.

- [x] **C01 · Action Button** — `UI01 - Action-Button` (Primary/Secondary/Terciary · L/M/S/XS · default/hover/focus/selected/disabled · iconos)
- [x] **C02 · Action Link Button** — `UI02 - Action Link-Button` (L/M/S/XS · default/hover/focus/disabled)
- [x] **C05 · Icon Only Button** — `UI01 - Icon Only` (Primary/Secondary/Terciary · XL/L/M/S/XS)
- [x] **C06 · Input de texto** — `UI02 - Input` (Big/Small · default/hover/focus/filled/error/validated/disabled, label-in + message)
- [ ] **C07 · Checkbox + Label** — `UI03 - Checkbox + Label`
- [ ] **C08 · Radio Button + Label** — `UI04 - Radio Button + Label`
- [ ] **C09 · Tag** — `UI07 - Tag`
- [ ] **C10 · Filter Chip** — `UI12 - Filter chip`
- [ ] **C11 · Marquee** — `UI08 - Marquee` (GSAP, scroll horizontal continuo)
- [ ] **C12 · Overlay** — `UI09 - Overlay`
- [ ] **C13 · Video Modal** — `UI11 - Video Modal`
- [ ] **C14 · Link Menu** — `UI01 - Link Menu`
- [ ] **C15 · Listbox / Dropdown** — `Listbox` + `fragment_listbox_Item_Dropdown`
- [ ] **C16 · Filter Row** — `Filter Row`
- [ ] **C17 · Color swatch** — `Color` (component set doc)

---

## FASE 3 — MÓDULOS

> Prefijo Figma: `Mxx`. Contenedores al 100% del ancho del viewport.

- [ ] **M01 · Menu / Navegación principal** — `M01 - Menu` (+ Item Menu Desplegado)
- [ ] **M24 · Highlight Content** — `M24 - Highlight Content`
- [ ] **M38 · Numbers** — `M38 - Numbers` (Desktop)
- [ ] **M39 · Logos** — `M39 - Logos`
- [ ] **M40 · Timeline** — `M40 - Timeline` (GSAP, entrada progresiva)
- [ ] **M42 · List Links** — `M42 - List links`
- [ ] **M44 · Steps** — `M44 - Steps` (GSAP, reveal por paso)
- [ ] **M48 · Panel Lateral** — `M48 - Panel Lateral`

---

## PENDIENTE — REGLAS

- [ ] **Redefinir los criterios de tokenización** (con Paco). Las reglas actuales del
  paso 5 de `design-to-code-guide.md` se quedan cortas: definir mejor qué hacer ante
  capas hardcodeadas / sin estilo (marcar como issue del gate vs improvisar mapeo),
  aplicar con rigor la lista de exclusión, y el contexto correcto por tipo de capa.
  Al cerrar, actualizar `design-to-code-guide.md` como regla canónica.

## FASE 4 — DOCUMENTACIÓN

- [ ] **S01 · Story base por cada token** (color, tipografía, spacing)
- [ ] **S02 · Story por cada componente UI** (C01–C17)
- [ ] **S03 · Story por cada módulo** (M01–M48)
- [ ] **S04 · README de contribución**

---

## Resumen

| Fase | Elementos | Hechos |
|------|-----------|--------|
| 0 · Setup | 7 | 7 |
| 1 · Tokens | 4 | 4 |
| 2 · Componentes UI | 15 | 4 |
| 3 · Módulos | 8 (a confirmar con Figma) | 0 |
| 4 · Docs | 4 | 0 |

_Última actualización: 2026-06-19 — Fase 2: C01, C02, C05, C06 completados._
