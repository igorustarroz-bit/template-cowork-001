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

## 0bis. Localizar el nodo (si no hay link de Figma)

La librería **no está publicada** (confirmado con Igor, 2026-07-01), así que estas dos
vías NO sirven para encontrar un componente por nombre:
- `search_design_system` → siempre da **timeout a los 180s**, exacto, con cualquier
  query o combinación de `includeComponents/Variables/Styles` (probado con "Radio",
  "Action Button" con filtros distintos: mismo timeout exacto → la petición se queda
  colgada esperando la librería publicada, no es que tarde por el tamaño).
- `get_metadata` **sin** `nodeId` → solo devuelve la página que está abierta en ese
  momento en Figma desktop (p. ej. `🌁 Cover`), no las 30 páginas del documento.

**Solución que SÍ funciona: `use_figma` (lectura pura, sin skill `figma-use` cargada
— no está disponible en este entorno; por eso el código de abajo NUNCA crea, mueve
ni borra nada).**

1. `figma.loadAllPagesAsync()` **no está soportado** en este runtime (tira error
   `"loadAllPagesAsync" is not a supported API`) — **no la llames**.
2. `figma.root.children` **ya devuelve las páginas** sin necesidad de cargarlas
   (probado: 30 páginas del archivo, incluida `📦 Components`, en una sola llamada).
3. Primera pasada — **barrido ligero de TODAS las páginas** (solo nombre + nº de
   hijos, sin recorrer el árbol) para localizar la página candidata:

   ```js
   return figma.root.children.map((page) => ({
     id: page.id,
     name: page.name,
     childCount: (page.children || []).length,
   }));
   ```

4. Segunda pasada — **una sola página a la vez** (id concreto), para listar sus hijos
   de primer nivel (nombre, tipo, tamaño) y localizar el frame `UIxx -`/`Mxx -`:

   ```js
   const page = figma.root.children.find((p) => p.id === "<pageId>");
   if (!page) return { error: "not found" };
   return (page.children || []).map((n) => ({
     id: n.id, name: n.name, type: n.type,
     width: Math.round(n.width || 0), height: Math.round(n.height || 0),
   }));
   ```

   ⚠️ **No pidas varias páginas a la vez en el mismo `use_figma`** (probado: pedir 5
   páginas en un solo `.map`/`for` dio timeout a los 180s dos veces, aunque cada una
   por separado responde en segundos). Una página por llamada.

5. Con el `id` del frame ya localizado, sigue el flujo normal (pasos 1-2 de esta guía:
   `get_screenshot`, `get_metadata`, `get_design_context`, `get_variable_defs`).

Los componentes/módulos de Euro6000 viven en la página **`📦 Components`**
(`5027:345`); el resto de páginas del archivo (`🏷️ Brand Assets`, `⛔️ WIP *`, etc.)
son de otros proyectos de la librería compartida de la agencia — ignorarlas.

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
