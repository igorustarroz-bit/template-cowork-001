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
- [x] **C07 · Checkbox + Label** — `UI03 - Checkbox + Label` (Medium/Small ·
      default/hover/selected/undefined/disabled/disabled-selected). Estado nativo
      (`:checked`/`:indeterminate`/`:disabled`), no `data-state`. Iconos check/minus
      son placeholder a mano (pendiente export nativo de Figma, ver
      `src/assets/icons/index.ts`)
- [x] **C08 · Radio Button + Label** — `UI04 - Radio Button + Label` (Medium/Small ·
      default/hover/selected/disabled/disabled-selected). Mismo patrón de estado
      nativo que C07; sin icono (el punto es el propio fill del box)
- [x] **C09 · Tag** — `UI 07 - Tag` (nodeId `51315:31428`). Tamaños L/XS ·
      tipos Transaction/New/Aseptic. `type="new"` fija la copy "NUEVO"
      (ignora `label`); Transaction/Aseptic muestran `label`. El fondo de
      Transaction (`#CCDBFF`) no está enlazado a variable en Figma (confirmado
      con `get_variable_defs`) — hardcodeado igual, ver "Pendiente" abajo.
      MDX (`Tag.mdx`, inglés, esquema completo) incluido.
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

> Contenedores al 100% del ancho del viewport. El Figma no tiene todos los
> módulos convertidos a masters, así que se identifican y trabajan **uno a
> uno** directamente en Figma (`use_figma`/`get_metadata`), sin lista cerrada
> de antemano.

- [x] **Hero** — carrusel autoplay + dots, `HeroCard` overlay
- [x] **Cards** — grid 12 col, card destacada + panel expandible (modo por
      componente en el Panel)
- [x] **Entidades** — `LogoCard`, `SearchBar`
- [x] **Footer** — sociales con modo propio (Light-White), logo como slot
- [~] **Nav** — barra sticky con dropdown/megamenú al click (desktop). Pendiente
      versión móvil (hamburguesa)
- [x] **ImageTexto** — texto + imagen, `CashbackCard` overlay (modo por
      componente)

### Backlog sin confirmar contra Figma

Lista especulativa previa, basada en la numeración `Mxx` de Figma, **sin
validar** — puede solaparse con los módulos ya hechos arriba (p. ej.
`M01 - Menu` ≈ `Nav`). Revisar cada uno directamente en Figma antes de
añadirlo o descartarlo:

- [ ] `M24 - Highlight Content`
- [ ] `M38 - Numbers` (Desktop)
- [ ] `M39 - Logos`
- [ ] `M40 - Timeline` (GSAP, entrada progresiva)
- [ ] `M42 - List links`
- [ ] `M44 - Steps` (GSAP, reveal por paso)
- [ ] `M48 - Panel Lateral`

---

## PENDIENTE — REGLAS

- [ ] **Redefinir los criterios de tokenización** (con Paco). Las reglas actuales del
  paso 5 de `design-to-code-guide.md` se quedan cortas: definir mejor qué hacer ante
  capas hardcodeadas / sin estilo (marcar como issue del gate vs improvisar mapeo),
  aplicar con rigor la lista de exclusión, y el contexto correcto por tipo de capa.
  Al cerrar, actualizar `design-to-code-guide.md` como regla canónica.
  - Ejemplo real (C09 · Tag): el fondo `#CCDBFF` del tipo `Transaction` no está
    enlazado a ninguna variable en Figma (confirmado con `get_variable_defs`) —
    se reprodujo igual en `Tag.css`/`Tag.mdx`, sin token. Revisar si Figma debe
    formalizarlo como semántico antes de repetir el patrón en otros componentes.

## FASE 4 — DOCUMENTACIÓN

> Idioma: **Inglés** (punto 1 de las instrucciones del proyecto). Esquema por
> tipo (punto 16): Tokens → Intro/Demo/Tokens · Componentes/Módulos →
> Intro/Demo/Anatomía/Subtemas/Comportamiento/Variantes y tamaños/Tokens/
> Propiedades/Accesibilidad/Componentes relacionados.

- [x] **S01 · MDX por cada token publicado** — `colors.mdx`, `semantic-colors.mdx`,
      `typography.mdx`, `spacing.mdx` (T01–T04, en inglés, esquema completo)
- [~] **S02 · MDX por cada componente UI publicado** — `ActionButton.mdx`,
      `ActionLinkButton.mdx`, `IconButton.mdx`, `Input.mdx`, `Checkbox.mdx`,
      `Radio.mdx`, `Tag.mdx` (C01, C02, C05–C09 — en inglés, esquema completo).
      Pendiente: C10–C17 en cuanto se construyan.
- [x] **S03 · MDX por cada módulo publicado** — `Hero.mdx`, `Cards.mdx`
      (traducido a inglés, ya no es la excepción en español), `Entidades.mdx`,
      `Footer.mdx`, `ImageTexto.mdx` (en inglés, esquema completo). Pendiente:
      `Nav` — se documenta cuando se cierre la versión móvil (hamburguesa).
- [ ] **S04 · README de contribución**

---

## Resumen

| Fase | Elementos | Hechos |
|------|-----------|--------|
| 0 · Setup | 7 | 7 |
| 1 · Tokens | 4 | 4 |
| 2 · Componentes UI | 15 | 7 |
| 3 · Módulos | 6 identificados (+ backlog sin confirmar) | 5 hechos, 1 en progreso (Nav) |
| 4 · Docs | 4 | 2 hechos (S01, S03), 1 en progreso (S02) |

_Última actualización: 2026-07-01 — C09 Tag construido desde Figma (`UI 07 -
Tag`, nodeId 51315:31428) con su MDX; MDX en inglés para los 5 módulos
publicados (Hero, Cards, Entidades, Footer, ImageTexto; `Cards.mdx` traducido,
ya no queda ninguna excepción en español) y para los 4 tokens (T01–T04) y 7
componentes (C01, C02, C05–C09); tablas Markdown arregladas con `remark-gfm`;
Storybook build verificado sin errores._
