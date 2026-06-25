# Guía Design-to-Code — Euro6000

Playbook para pasar cada componente/módulo de Figma a código. Sigue los pasos **en
orden**. Resume y reemplaza la práctica improvisada; nace de los aprendizajes reales
(ver `docs/design-to-code-learnings.md`).

> Regla de oro: **nunca construir a ciegas ni inferir desde nombres** — ver el diseño
> y resolver las propiedades reales.

---

## 0. Preparación
- [ ] Leer `CONTEXT.md` y `PLAN.md`.
- [ ] ¿Es **módulo** (100% ancho) o **componente**? Confirmar.

## 1. VER el diseño  *(arregla el "build a ciegas")*
- [ ] `get_screenshot` con **`enableBase64Response: true`** → imagen inline visible.
- [ ] Ver el nodo y **todos sus estados/variantes** (hover, abierto, etc.).

## 2. Leer el contexto del diseño
- [ ] `get_design_context` (devuelve **código React+Tailwind + screenshot** del nodo) → base del layout.
- [ ] Complementar con `use_figma` para **resolver propiedades exactas** (no quedarse en el código aproximado).

## 3. Checklist de lectura — *resolver propiedades reales, no inferir de nombres*
**Contenedor / módulo**
- [ ] `layoutMode`, `padding`, `itemSpacing`, **`cornerRadius`** (¿*pill*?), `fills` (token), `strokes`, `effects`.
- [ ] ¿Flotante (margen) o a sangre? **`max-width` 1440** (contenido 1376).

**Separadores / líneas**
- [ ] Tipo `LINE`: **`rotation`** (¿vertical = −90°?), longitud, `strokeWeight`, token de color.

**Hijos**
- [ ] Instancias → leer su **render real + overrides** (fill efectivo, tamaño, forma), NO solo el nombre de variante.
- [ ] `VECTOR`/`BOOLEAN`/**logos/marcas** → **slot** (nunca texto ni copiar fills).
- [ ] Texto → usar el **`textStyleId` real** (Body/03, CTA/02…). **Nunca inventar énfasis** (no poner una cabecera en semibold si el diseño usa Body/03).

**Modos (mode-per-component)**
- [ ] `explicitVariableModes` de **CADA sub-grupo/componente**: el módulo puede tener un modo y un hijo otro distinto (p.ej. footer Dark-Black-Neutral + grupo social Light-White). No asumir que heredan.

**Comportamiento**
- [ ] Leer las **variantes `State=…`** del component set → inferir interacción (hover, expand/collapse, selección única).

**Spacing**
- [ ] **Medir geométricamente** gaps y paddings (x/y) → encajar al token **`Spacers`/`Gutter`/`Wrapper`** más cercano (tolerancia ±5-10px). Nunca a ojo.

## 4. Construcción (código)
- [ ] Stack: React + TS + Vite + **Tailwind**; estilos por **tokens** (`var(--sem-*)`, spacers, radios). Nada hardcodeado que exista como token.
- [ ] **Mode-driven**: usar `Backgrounds/Base`/`Texts/Base` (el *modo* colorea). `data-theme` del módulo (selector global de la toolbar) + `data-theme` por componente interior (override). Requiere bloque `[data-theme="…"]` por modo (incl. `light-white`).
- [ ] **R-TK1**: sin rectángulo de fondo → el color va al **frame contenedor**.
- [ ] Grid de 12 columnas; cuidado con el **auto-flow** (ordenar el DOM o usar `col-start`/`row-start`); `max-width` por módulo.
- [ ] **Responsive en código** (mobile-first). Autolayout en Figma = opcional.
- [ ] Estados Hover/Focus/Disabled con **pseudo-clases nativas**; Selected/validación por prop (`data-*`).
- [ ] Botones `fit-content`; columnas con CSS Grid (no flex con anchos fijos).
- [ ] Componentes internos = componentes reutilizables propios (con su `index.ts`).

## 5. Verificación
- [ ] `get_screenshot` del nodo Figma (**referencia**) y comparar con el render.
- [ ] `tsc --noEmit` + `build-storybook` sin errores.
- [ ] **Avisar SIEMPRE** si queda alguna capa sin tokens.
- [ ] Storybook: story del módulo + **story por cada componente interno**; controles
      (textos editables, **selector de modo por componente**, breakpoint donde aplique).

## 6. Documentación (Stream B)
- [ ] MDX autodocs con el esquema consolidado (overview, anatomía, comportamiento,
      variantes, tabla de tokens, props/API, accesibilidad). Demo a 1440. Ver
      `docs/ds-doc-comparison.md` y `Cards.mdx` de ejemplo.

## 7. Errores frecuentes (de lo aprendido) — evitar
- Inferir color/estilo del **nombre de variante** (ej. "Primary" → rojo, cuando el fill estaba *override* a transparente en la nav).
- Asumir líneas **horizontales** cuando estaban **rotadas −90°** (footer).
- Meter **logos como texto** (son vectores → slot).
- Cabeceras con **énfasis inventado** (usar el `textStyle` exacto, p.ej. Body/03).
- Componente heredando el modo del módulo **cuando tiene modo propio** (revisar `explicitVariableModes`).
- Falta de **`max-width`** → módulos estirados y desalineados en pantallas anchas.
- **Spacing a ojo** en vez de medido → token.

---

_Euro6000 · guía viva. Actualizar con cada aprendizaje nuevo._
