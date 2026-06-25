# Guía Design-to-Code — Euro6000

Playbook para pasar cada componente/módulo de Figma a código. Sigue los pasos **en
orden**. Nace de los aprendizajes reales (ver `docs/design-to-code-learnings.md`).

> Reglas de oro: **nunca construir a ciegas ni inferir desde nombres** (ver el diseño
> y resolver propiedades reales) · **entender el comportamiento antes de construir** ·
> **validar los tokens contra las reglas**.

---

## 0. Preparación
- [ ] Leer `CONTEXT.md` y `PLAN.md`.
- [ ] ¿Es **módulo** (100% ancho) o **componente**? Confirmar.

## 1. Ver el diseño  *(no construir a ciegas)*
- [ ] `get_screenshot` con **`enableBase64Response: true`** → imagen inline visible.
- [ ] Ver el nodo y **todos sus estados/variantes**.

## 2. Leer el contexto
- [ ] `get_design_context` (código React+Tailwind + screenshot) como base del layout.
- [ ] Complementar con `use_figma` para **resolver propiedades exactas**.

## 3. Análisis de comportamiento  *(escribir y CONFIRMAR antes de construir)*
Redactar un **resumen de comportamiento** y validarlo con el usuario antes de tocar código:
- [ ] **Variantes y estados** (del *component set*: `State=…`, `Type=…`, tamaños).
- [ ] **Interacciones**: click/hover/focus, toggle, **selección única**, abrir/cerrar (Esc, clic fuera), sticky/scroll.
- [ ] **Responsive**: zonas/mitades, `wrap`, apilado en mobile, **anclajes** (izq/dcha, arriba/abajo), qué crece y qué es fijo.
- [ ] **Overlays / contenido absoluto** y su anclaje.
- [ ] Marcar lo que **se implementa en código** (responsive) vs lo que viene del diseño.
> Checkpoint: no avanzar hasta que el usuario confirme que la interpretación es correcta.

## 4. Checklist de lectura — *resolver propiedades reales, no inferir de nombres*
- [ ] **Contenedor**: `layoutMode`, `padding`, `itemSpacing`, **`cornerRadius`** (¿*pill*?), `fills`, `strokes`, `effects`; ¿flotante/`max-width` 1440?
- [ ] **Líneas**: tipo `LINE`, **`rotation`** (¿vertical −90°?), `strokeWeight`, token.
- [ ] **Instancias**: render real + **overrides** (no solo el nombre de variante).
- [ ] **Vectores/logos** → **slot** (nunca texto ni copiar fills).
- [ ] **Texto** → `textStyleId` real (sin énfasis inventado).

## 5. Validación de tokens — *según las reglas del sistema*
Verificar (en el **diseño** y reflejarlo en el **código**); avisar SIEMPRE de lo que falle:
- [ ] **Nada hardcodeado** que exista como token (color, tipografía, spacing, radio).
- [ ] **Color = mode-driven**: usar `Backgrounds/`, `Texts/`, `Strokes-Icons/`, `Fills/` según contexto (raíz→`Backgrounds/`, texto→`Texts/`, trazos/iconos→`Strokes-Icons/`).
- [ ] **Modo-por-componente**: comprobar `explicitVariableModes` de **cada sub-grupo**; el módulo puede llevar un modo y un hijo otro (ej. footer dark + grupo social light-white). Reflejar con `data-theme`.
- [ ] **R-TK1**: sin rectángulo de fondo → el fondo va al **frame contenedor**.
- [ ] **Texto**: estilo = `textStyleId` real (Body/03, CTA/02…); los estilos `CTA`/`Forms` no se usan como tipografía de contenido.
- [ ] **Spacing**: medir geometría → token `Spacers`/`Gutter`/`Wrapper` más cercano (±5-10px). Nunca a ojo.
- [ ] **Lista de exclusión**: `Texts/Always-Black|White`, `Fills/Always-*` (excluir/sustituir); `Texts/Error|Success|Warning` solo mensajes de sistema; `Texts/Disabled|Hover|Link` solo esos estados.
- [ ] **Instancias** llevan sus propios tokens (no re-tokenizar); **saltar** `VECTOR`/`BOOLEAN_OPERATION` (iconos/ilustraciones).

## 6. Construcción (código)
- [ ] Stack: React + TS + Vite + **Tailwind**; estilos por tokens (`var(--sem-*)`, spacers, radios).
- [ ] **Mode-driven**: `Backgrounds/Base`/`Texts/Base`; `data-theme` del módulo (toolbar) + por componente. Bloque `[data-theme="…"]` por modo (incl. `light-white`).
- [ ] Grid 12 col; ojo con el **auto-flow** (ordenar DOM o `col-start`/`row-start`); `max-width` 1440 por módulo.
- [ ] **Responsive en código** (mobile-first). Autolayout en Figma = opcional.
- [ ] Estados Hover/Focus/Disabled con **pseudo-clases nativas**; Selected/validación por prop.
- [ ] Botones `fit-content`; columnas con CSS Grid (no flex con anchos fijos).
- [ ] Componentes internos = componentes reutilizables propios.

## 7. Verificación
- [ ] `get_screenshot` del nodo Figma (referencia) y comparar con el render.
- [ ] `tsc --noEmit` + `build-storybook` sin errores.
- [ ] **Avisar SIEMPRE** si queda alguna capa sin tokens (paso 5).
- [ ] Storybook: story del módulo + **story por cada componente interno**; controles
      (textos editables, selector de modo por componente, breakpoint).

## 8. Documentación (Stream B)
- [ ] MDX autodocs con el esquema consolidado (`docs/ds-doc-comparison.md`, ej. `Cards.mdx`). Demo a 1440.

## 9. Errores frecuentes (evitar)
- Inferir color/estilo del **nombre de variante** (nav: "Primary" → rojo, fill override transparente).
- Líneas **horizontales** asumidas cuando estaban **rotadas −90°** (footer).
- **Logos como texto** (son vectores → slot).
- Cabeceras con **énfasis inventado** (usar el `textStyle` exacto).
- Componente heredando el modo del módulo **teniendo modo propio** (`explicitVariableModes`).
- Falta de **`max-width`** → módulos estirados.
- **Spacing a ojo** en vez de medido → token.

---

_Euro6000 · guía viva. Actualizar con cada aprendizaje nuevo._
