# Stream A — Workflow de diseño en Figma (Euro6000)

> **Adaptaciones a ESTE proyecto (tienen prioridad sobre el texto original).**
>
> 1. **Stack tecnológico = el de este repo:** React + TypeScript + Vite +
>    **Tailwind CSS** + GSAP + Storybook. Donde el documento original dice
>    «sin Tailwind / CSS Grid puro» (R11 y §10), se sustituye por: **usar Tailwind**
>    manteniendo el análisis de columnas → rejilla de 12 columnas con utilidades
>    Tailwind (`grid grid-cols-12`, `col-span-*`, `gap-*`) y tokens vía nuestras
>    CSS custom properties / `theme` de Tailwind. Nunca anchos fijos en flex para
>    multicolumna.
>
> 2. **Comportamiento responsive = en código, no en variables de Figma.** En Figma
>    SIEMPRE se **analiza y documenta** el comportamiento (columnas, anclajes,
>    breakpoints) como especificación que alimenta al código; pero su
>    **implementación se hace en código** (más rápido y flexible). Las «variables
>    responsive» en Figma quedan **opcionales** y NO son requisito del gate.
>    El **autolayout** se usa para **limpiar estructura y crear variantes**, no para
>    cablear el responsive.
>
> 3. **Sin rectángulos de fondo (R-TK1):** un componente/módulo NUNCA debe tener un
>    rectángulo cuyo único fin sea aportar el color de fondo. Si se detecta, se
>    **elimina** y se aplica el token de fondo (`Backgrounds/Base`) **al frame
>    contenedor**. (Regla de Paco; validada en el Módulo 1 del banco de pruebas.)
>
> 4. El resto del documento (tokenización *mode-per-module*, análisis de grid,
>    limpieza de estructura, creación de componentes/variantes y reglas) se mantiene
>    como **especificación operativa** del gate «Ready to develop».
>
> _Origen: hilo de trabajo de Paco (sesiones diseño+MCP). Integrado: 2026-06-19._

---

# Sistema de trabajo Design System — Tokenización, Grid, Autolayout y Componentes

Guía de referencia completa para trabajar el design system de Euro6000 / Hanzo Studio en Figma vía MCP. Recopila los flujos refinados durante varias sesiones de trabajo entre Paco (diseñador-desarrollador) y Claude.

---

## 0. INFRAESTRUCTURA Y HERRAMIENTAS

- **Figma MCP**: `use_figma` (ejecuta JavaScript de la Plugin API en el archivo) es la herramienta principal de lectura y escritura. Preferir `use_figma` con JS scoped sobre `get_metadata` para nodos grandes — `get_metadata` y `get_design_context` pueden dar **timeout (408)** en nodos grandes.
- `get_design_context` (fileKey, nodeId) devuelve código React+Tailwind + **screenshot** — se usa sobre todo para **validación visual**.
- Cuando un script de `use_figma` da timeout, **simplificar al máximo**: leer primero los hijos directos (id, name, type), luego profundizar en IDs concretos en llamadas separadas. Los scripts complejos en un solo paso fallan por timeout.
- Para leer árboles grandes: trocear en varias llamadas (hijos primero, luego drill-in por ID).

### Archivos
- **Euro6000 Library** file key: `fhitjEfpLDbD5cYed156Cb`
- **Librería Pruebas Claude** file key: `dD9HoUighHFSQoZOxTqA6G`
- Página principal de trabajo Euro6000: `⛔️ Public` (id `53927:2121`)

### Limitación crítica de reversión
- **Claude NO puede hacer Cmd+Z**. Si Claude aplica algo en Figma y está mal, debe **revertirlo programáticamente** con `use_figma`, o Paco tiene que deshacerlo manualmente. Por eso la validación previa es esencial (ver §4).
- Tras operaciones estructurales (mover/eliminar nodos, combinar variantes) **los IDs cambian**. Si `getNodeByIdAsync` falla, re-buscar el nodo por nombre/tamaño con `findOne`/`findAll`.
- `figma.currentPage` revierte a la página activa original tras `setCurrentPageAsync` dentro del mismo script — usar siempre `targetPage.appendChild(node)` de forma explícita pasando el objeto página.

---

## 1. SISTEMA DE GRID (Euro6000)

Definido en tokens, colección **Responsive**, sección **Layout**. No conviene sobre-tokenizar el grid en Figma (preferencia de Paco), pero **SIEMPRE hay que analizar las columnas** porque alimentan la futura skill de design-to-code.

### Parámetros (viewport 1440px)
- **Viewport**: 1440px
- **Wrapper-Default**: 32px (padding lateral de módulos de contenido)
- **Wrapper-Header**: 32px (padding lateral de la navegación)
- **Wrapper-Modal**: 32px (padding lateral de modales)
- **Wrapper-Full**: 0px (full bleed)
- **Gutter**: 24px (gap entre columnas)
- **Columnas**: 12
- **Área útil**: 1440 − 32×2 = **1376px**
- **Ancho de 1 columna**: (1376 − 11×24) / 12 = **92.67px**

### Fórmula para medir cuántas columnas ocupa un elemento
```
columnas = (ancho_elemento + gutter) / (ancho_columna + gutter)
         = (ancho_elemento + 24) / 116.67
```

### Anchos de referencia frecuentes
- 1 columna ≈ 92.67px
- 2 columnas ≈ 209px (2×92.67 + 1×24) — o 233px contando 2 gutters según el contexto del padding
- 3 columnas ≈ 326px → es el ancho de las tarjetas/cards (3 cols exactas)
- 4 columnas ≈ 443px (4×92.67 + 3×24)
- 6 columnas ≈ 676px (la "mitad" útil) — ancho típico de imágenes de módulo
- 12 columnas = 1376px (área útil completa)

### Reglas de grid (R-AL12, R-AL13, R-AL14)
- **R-AL12** — Al analizar CUALQUIER diseño, calcular para cada elemento cuántas columnas ocupa y en qué columna empieza. Hacerlo siempre.
- **R-AL13** — Tolerancia: los valores pueden no ser exactos al píxel porque el diseñador no siempre ajusta con precisión. Si una medida está cerca de un nº entero de columnas (±5-10px), asumir que es comportamiento de grid. Un margen lateral "raro" (p. ej. 149px) suele corresponder a un nº entero de columnas (p. ej. 1 col + wrapper ≈ 125-149px), **no** a un padding arbitrario.
- **R-AL14** — Documentar el desglose de columnas de cada bloque analizado (cuántas ocupa, dónde empieza, márgenes en columnas) para la skill de design-to-code. En código se traducirá a **CSS Grid de 12 columnas** (`grid-template-columns: repeat(12, 1fr)` + `grid-column`), nunca flexbox con anchos fijos.

### Patrones de grid observados
- **Módulo imagen+texto**: imagen 6 cols + texto 4 cols, con 1 col de margen a cada lado del texto. La parte izquierda y derecha son cada una una "mitad" de 6 cols.
- **Grid de logos/cards**: tarjetas de 326px (3 cols cada una), 4 por fila = 12 cols completas, con wrap.

---

## 2. FLUJO DE TOKENIZACIÓN (mode-per-module)

Enfoque nuevo basado en **modos semánticos asignados por módulo**. Cada módulo (y componente) recibe su propio modo explícito; los tokens se aplican usando ese modo como referencia.

### Colección y modos (Euro6000)
- Colección **Semantic-Color**, id `VariableCollectionId:3003:194`
- Variable `Backgrounds/Base`, id `VariableID:3003:195` (referencia para detectar el modo)
- **6 modos** (leer SIEMPRE dinámicamente con `semantic.modes`, nunca hardcodear):
  - Light - White → `3003:0`
  - Light - Grey → `49848:1`
  - Dark - Red - Primary → `53933:0`
  - Dark - Secondary - Blue → `54263:0`
  - Dark - Black - Brand → `47130:0`
  - Dark - Black - Neutral → `54372:0`

### Pasos del flujo

**1. Pre-análisis.** Escanear el árbol; reportar qué tokens ya están aplicados y de qué colección, verificar que son correctos. Reportar y **continuar sin esperar confirmación**.

**2. Detectar el modo de cada módulo.** Leer el fill del nodo raíz del módulo (o el primer hijo con fill sólido si el raíz no tiene). Comparar ese color contra `Backgrounds/Base` en **todos los modos** por distancia euclidiana RGB. El modo con menor distancia es el del módulo.
   - Asignar el modo con `setExplicitVariableModeForCollection`.
   - **IMPORTANTE**: pasar el OBJETO colección obtenido con `figma.variables.getVariableCollectionById(COLLECTION_ID)`, **no** el string del id.
   - Aplicar `Backgrounds/Base` al fill del raíz del módulo.

**3. Colores.** Recorrer el árbol con ese modo activo, mapear cada color al token semántico más cercano por distancia RGB, según contexto:
   - **Raíz del módulo** → solo `Backgrounds/`
   - **Frames/shapes** → `Backgrounds/` o `Fills/`
   - **Strokes** → `Strokes-Icons/` o `Strokes/`
   - **Texto** → cualquier `Texts/` semánticamente apropiado (no limitado a `Texts/01-03`), excluyendo la lista de exclusión.
   - Vincular con `figma.variables.setBoundVariableForPaint(fill, 'color', varObj); node.fills = [fill]`.
   - `resolveValue` debe recursar a través de `VARIABLE_ALIAS`.

**4. Tipografía.** `getLocalTextStyles()`, mapear `fontSize` al estilo `Title`/`Body` más cercano, asignar `node.textStyleId`.

**5. Contraste.** Verificar WCAG AA (4.5:1 normal / 3:1 grande) y AAA (7:1 / 4.5:1).

### Reglas críticas de tokenización (correcciones que hizo Paco)
- **SALTAR INSTANCIAS por completo** — llevan sus propios tokens. Al recorrer, si `node.type === 'INSTANCE'` → `return` inmediato. Traversar solo FRAME / GROUP / COMPONENT_SET / SECTION.
- **NO tokenizar VECTOR ni BOOLEAN_OPERATION** — son iconos/ilustraciones con sus propios tokens.
- Tipos elegibles para fill: `FRAME`, `RECTANGLE`, `ELLIPSE` (+ `COMPONENT` si no es instancia). Guard recomendado: `TYPES_WITH_FILLS = new Set(['FRAME','RECTANGLE','ELLIPSE'])`. GROUP no tiene fills.
- El guard `(!fill.boundVariables || !fill.boundVariables.color)` SALTA fills ya tokenizados. Al re-tokenizar, trabajar sobre una **copia limpia** o los fills ya vinculados se omiten.
- **No usar umbral de distancia "cercano a Base"** para forzar `Backgrounds/Base`. Da falsos positivos (p. ej. `Neutral-1` que es casi blanco). Dejar que el algoritmo de distancia RGB elija; basta con excluir VECTOR/BOOLEAN y las instancias.
- Cuidado con tokens "inversos" que también son blancos (p. ej. `Backgrounds/Inverse` o `Hover`): un color blanco/rosa puede mapear a `Hover` en modo Dark-Red. No es necesariamente un error; depende del modo.

### Lista de exclusión de tokens (texto y fills)
- `Texts/Always-Black` → usar `Texts/01` en su lugar
- `Texts/Always-White` → usar el `Texts/` más cercano
- `Fills/Always-Black`, `Fills/Always-White` → excluir
- `Texts/Error`, `Texts/Success`, `Texts/Warning` → solo mensajes del sistema
- `Texts/Disabled`, `Texts/Hover`, `Texts/Link` → solo esos estados
- Estilos de texto excluidos al tokenizar tipografía: `CTA` (botones), `Forms` (formularios)

### Mapa de tamaños tipográficos → estilos (Euro6000 usa Geist)
```
104→Title/07  72→Title/06  60→Title/05  48→Title/04  40→Title/03
32→Title/02   26→Body/06   24→Title/01  22→Body/05   20→Body/04
18→Body/03    16→Body/03   14→Body/02   13→Body/02   12→Body/01   10→Labels/01
```

### Valores de Backgrounds/Base por modo (referencia de detección)
- Light-White = #ffffff (1,1,1)
- Light-Grey ≈ (0.965, 0.957, 0.957) → #f6f4f4
- Dark-Red-Primary = (1, 0.051, 0.176)
- Dark (negros) ≈ (0.149, 0, 0) y similares

---

## 3. LIMPIEZA DE ESTRUCTURA (paso previo obligatorio del autolayout)

Antes de aplicar autolayout, limpiar la estructura de frames.

### 3a. Frames redundantes
Un FRAME es redundante y se elimina (moviendo su hijo al padre, preservando posición) si:
- No tiene fill sólido visible, ni stroke, ni efectos
- Tiene **un solo hijo**
- **No** es un icono (nombre que casa con `icon|arrow|chevron|close|check|logo|brand|social`) ni una instancia

Procedimiento: guardar `x/y` absolutos del hijo → `parent.insertChild(idx, child)` → recolocar `child.x/y` → `node.remove()`. Recoger primero todos los nodos a eliminar (o iterar de atrás hacia delante) porque al eliminar cambian los índices.

### 3b. Frames con tamaño/posición incorrectos
- Si un frame es **más pequeño que su contenido**, redimensionarlo al bounding box real de sus hijos. Ejemplo típico: frame de texto de 110×16 que contiene un texto de 110×25 → redimensionar a 110×25.
- Si un frame tiene **un solo hijo descentrado**, centrarlo: `child.x = (frame.w − child.w)/2`, `child.y = (frame.h − child.h)/2`.
- No tocar `img`/imágenes (pueden estar recortadas intencionalmente) ni componentes complejos sin confirmar.

---

## 4. AUTOLAYOUT MANUAL (sin plugin) — metodología auto-validada

Paco quiere que Claude **intuya el comportamiento responsive** (anclajes izquierda/derecha, arriba/abajo, breakpoints) y se **auto-valide** para no tener que revisar estados intermedios. Estamos en contexto web con breakpoints.

### Ciclo de trabajo
1. Paco pasa un link de Figma.
2. Claude pregunta **¿módulo o componente?** (salvo que Paco ya lo haya dicho o pida no preguntar).
3. **Captura ANTES** con `get_design_context` (referencia visual).
4. Leer estructura con `use_figma`, midiendo posiciones x/y geométricamente.
5. **Limpieza previa** (§3).
6. Analizar comportamiento al redimensionar (alineaciones, anclas, columnas §1).
7. Crear frames intermedios si hacen falta (`Left`, `Right`, `Imagen`, `Textos`, `Paginador`, mitades…).
8. Aplicar autolayout de dentro hacia fuera (R1), midiendo por geometría (R3).
9. Aplicar `FILL` en paso separado (R2).
10. **Captura DESPUÉS** con `get_design_context`, **comparar uno mismo** contra la referencia.
11. **Validar leyendo propiedades** (sizing/posición/dimensiones) contra lo esperado.
12. Reportar a Paco **solo cuando esté satisfecho** — no pedirle que revise estados intermedios.

### Cálculo de gaps y padding
- **Gap** entre hermanos = distancia entre el borde de uno y el inicio del siguiente (por x o por y según dirección).
- **Padding** = posición del primer/último hijo respecto al borde del frame.
- Buscar el token `Layout/Spacers` más cercano. **Nunca asumir valores.**

### Tokens de espaciado (Layout/Spacers)
```
/0=0  /1=4  /2=8  /3=12  /4=16  /5=20  /6=24  /7=32  /8=40
/9=48  /10=56  /11=64  /12=72  /13=80  /14=96  /15=104
```
- `Gutter` = 24px (priorizar sobre `Spacers/6` cuando el gap es entre columnas)
- `Wrapper-Default/Header/Modal` = 32px para padding lateral según contexto

### Corners
```
XXS=2  XS=4  S=6  M=8  L=12  XL=16  Rounded=10000
```

---

## 5. REGLAS COMPLETAS

### Reglas heredadas del plugin (aplican igual en manual)
- **R1** — Aplicar `layoutMode` de los nodos más profundos hacia arriba (hijos antes que padres).
- **R2** — `layoutSizingHorizontal='FILL'` SIEMPRE en un paso separado, nunca en el mismo paso donde se aplica `layoutMode`. (Y siempre `appendChild` ANTES de poner FILL.)
- **R3** — Gap y padding calculados por geometría x/y → token `Layout/Spacers` más cercano. Nunca asumir. Nunca usar tokens de Typography o Corners para spacing.
- **R4** — Preguntar siempre módulo o componente. Módulo → padding lateral con `Wrapper-Default`. Componente → padding lateral por geometría.
- **R7** — Siempre try/catch.
- **R8** — `counterAxisAlignItems` solo `MIN`, `MAX`, `CENTER`, `BASELINE`. Nunca `STRETCH`.
- **R9** — Instancias (diamante morado) se saltan. No aplicar autolayout directamente sobre ellas.
- **R10** — Nodos llamados `Right`: `constraints = { horizontal: "MAX", vertical: "MIN" }` + padding 0.
- **R16** — Nodos repetidos (cards, bottom, items…): procesar y verificar uno a uno.
- **R17** — Al duplicar nodos, colocar la copia en la **misma página** que el original, a la derecha con 100px de margen.

### Reglas de autolayout manual (nuevas)
- **R-AL1** — Captura ANTES y DESPUÉS obligatoria con `get_design_context`. Claude compara él mismo antes de reportar.
- **R-AL2** — Si existe un ejemplo correcto, leerlo con `use_figma` y replicar su estructura exacta (layoutMode, paddings, sizings, orden de hijos). (Nota: a partir de cierto punto ya no habrá más ejemplos; aprender de los pasados.)
- **R-AL3** — Overlays / elementos absolutos van en un **frame contenedor junto con la imagen**: la imagen es `AUTO`/`FILL` en el flujo, los overlays son `ABSOLUTE`.
- **R-AL4** — Paginadores y navegaciones internas (dots, flechas) van en su **propio frame con padding**, no en posición absoluta suelta.
- **R-AL5** — Verificar el **orden de los hijos** antes de aplicar autolayout: un hijo mal ordenado rompe el layout aunque los valores sean correctos.
- **R-AL6** — **Nunca asumir** que el padding del padre cubre al hijo. Cada frame mide su propio padding geométricamente, aunque los tamaños "encajen" con el wrapper del padre.
- **R-AL7** — Frames de texto con espacio vacío intencional (arriba/abajo) → `layoutSizingVertical='FIXED'` con la altura original, no `HUG`.
- **R-AL8** — Crear frames intermedios (`Left`, `Right`, `Imagen`, `Textos`, `Paginador`, mitades) si la estructura lo requiere, antes de aplicar el layout.
- **R-AL9** — SIEMPRE `appendChild` antes de aplicar `FILL` (nunca al revés) — si no, error "FILL can only be set on children of auto-layout frames".
- **R-AL10** — Tras crear un frame con autolayout, **validar leyendo propiedades** (sizing/posición/dimensiones) contra lo esperado antes de reportar. Un panel/caja con altura intencional debe ser `FIXED`, no `HUG`, o colapsará al contenido.
- **R-AL11** — Siempre que se cree un componente nuevo, **sustituir inmediatamente** la instancia original en el diseño por una instancia del componente recién creado.
- **R-AL12 / R-AL13 / R-AL14** — Análisis de columnas (ver §1).
- **R-AL15** — Comportamiento responsive por mitades/zonas: cuando un contenido debe ocupar N de M columnas dentro de una zona, **no usar ancho fijo**. Estructurar en mitades/zonas `FILL` que crezcan proporcionalmente, y limitar el contenido a sus columnas con padding de las columnas sobrantes. Identificar anclaje izquierda/derecha y arriba/abajo. Así el diseño es responsive y respeta el grid al crecer.

### Reglas CSS/React (para design-to-code)
- **R11** — CSS Grid para columnas múltiples: `grid-template-columns: repeat(12, 1fr)` con `grid-column` para posicionar. Nunca flexbox con anchos fijos.
- **R12** — Tokens siempre. Nunca valores hardcoded para spacing, color o tipografía.
- **R13** — Botones: `width: fit-content` o `align-self: flex-start`. Nunca ancho fijo salvo que el diseño lo indique.

### Reglas de variables Figma
- **NUNCA eliminar variables existentes** antes de crear nuevas — solo renombrar y añadir. (Paco corrigió un error destructivo en el que se borraron variables Primary-1 al expandir una escala HSB; lo correcto es renombrar + añadir las que falten, nunca eliminar.)
- Leer SIEMPRE los modos dinámicamente; nunca asumir nombres ni ids de modo.

---

## 6. CREACIÓN DE COMPONENTES Y VARIANTES

### Principios
- Identificar candidatos a componente durante el análisis inicial del módulo (elementos repetidos, overlays reutilizables, tarjetas, barras, botones).
- Clonar desde un original existente cuando sea posible (`node.clone()` + `figma.createComponentFromNode(clone)`): así el componente **hereda los tokens ya aplicados**. Colocar la copia en la misma página, a la derecha (R17).
- Tras crear → **sustituir el original por una instancia** (R-AL11).

### Creación de variantes (component set)
- `figma.combineAsVariants([c1, c2], page)` requiere que **ambos componentes ya existan en la página destino** antes de combinar.
- Los nombres de variante deben seguir el formato `Propiedad=Valor` consistente (p. ej. `State=Collapsed`, `State=Expanded`). Si quedan mal (`=CardSolutions`, `CardSolutions/State2`), renombrar cada componente a `State=Valor` y recombinar. La propiedad de variante resultante debe ser limpia (p. ej. `State` con opciones `Collapsed`/`Expanded`).
- `combineAsVariants` a veces deja una variante fuera del set con nombre mal formado → detectarla, renombrarla y recombinar.

### Sizing en componentes vs instancias
- Un **componente** no puede ser `FILL` mientras no esté dentro de un padre con autolayout → dejarlo `FIXED` en el componente y aplicar `FILL` en las **instancias** cuando se coloquen en un frame con autolayout.
- El **contenedor del componente** debe tener autolayout para que sus hijos puedan ser `FILL`.
- Validar siempre leyendo de vuelta: si una caja con altura intencional quedó `HUG`, colapsa al contenido (bug "se cargó el alto"). Forzar `FIXED` + `resize`.

### Slots / contenido intercambiable
- Para contenido que cambia por instancia (logos, imágenes), usar slots intercambiables (instance swap / image fill como propiedad), **no** hardcodear.
- **Cuidado al sustituir**: copiar solo `fills` de un logo funciona si es un RECTANGLE con image-fill, pero **falla con grupos vectorizados** (VECTOR/BOOLEAN/grupos) → se pierde el contenido. Para logos vectoriales, crearlos como componentes propios y usarlos como slot, no copiar fills. Sustituir de forma destructiva sin preservar el contenido vectorial pierde los logos.

### Patrones de overlay (cards sobre imagen)
- Contenedor con autolayout → imagen `FILL` ambos ejes (AUTO en el flujo) + panel/overlay `ABSOLUTE` encima.
- Panel con `constraints = { horizontal: 'STRETCH', vertical: 'MAX' }` para crecer en ancho y anclarse abajo.
- El alto del panel se calcula: `card.h − panel.y − margen_inferior` (p. ej. 598 − 320 − 24 = 254). El panel DEBE ser `FIXED` en vertical o colapsa.
- Identificar márgenes top/bottom igual que left/right (p. ej. panel a 24px de los tres lados, top intencional de 320px).

---

## 7. COMPONENTES YA CREADOS (Euro6000, página ⛔️ Public)

- **Paginator** (component set): 3 variantes `State=1/2/3`, cada una HORIZONTAL gap 8 (Spacers/2): un rect Active (`Backgrounds/Inverse`) + dos dots (`Backgrounds/Neutral-2`), corner `Rounded`. Solo estado de progreso al 100%. Sustituido en el Hero.
- **CardSolutions** (component set): `State=Collapsed` (326×598) y `State=Expanded` (676×598). Contenedor VERTICAL con autolayout; Imagen `FILL` ambos ejes; Panel `ABSOLUTE` `{STRETCH, MAX}`, x:24, y:320, h:254 FIXED, 24px margen inferior; Panel VERTICAL SPACE_BETWEEN padding Spacers/7 (32). Collapsed = título + botón Plus; Expanded = frame texto (título + desc, gap 8) + botón Minus. Botones clonados de instancias "UI01 - Icon Only" existentes. Componente FIXED-H; FILL en instancias. Card grande Expanded FILL, dos pequeñas Collapsed FIXED 326.
- **CashbackCard**: clonada de la card existente vía `createComponentFromNode` (mantiene tokens; bg rojo + gráfico de barras + botón circular con flecha). Sustituida en módulo Image+Texto.
- **SearchBar**: clonada de la barra existente (pill blanca, icono lupa circular rojo + placeholder). Sustituida en Image+Texto invertido.
- **LogoCard**: 326×326 FIXED, rounded 36, bg `Backgrounds/Base` (Light-Grey), logo centrado con autolayout (HORIZONTAL, CENTER/CENTER). Logo interior `HUG`. Para logos vectoriales se crean como componentes/slots aparte (no copiar fills).

---

## 8. MÓDULOS DE HOME_DESKTOP YA TRABAJADOS (referencia de patrones)

- **Nav**: Container 1440px (HORIZONTAL, paddingL/R `Wrapper-Header` 32, paddingT/B Spacers/6 24). Nav interior FILL, SPACE_BETWEEN, padding Spacers/7 (32) en los 4 lados (el padding lateral interior SÍ existe y se mide geométricamente — no asumir que el wrapper del padre lo cubre). `Left` frame (logo + dropdowns + items, gap 24/Gutter, HUG) y `Right` (Ayuda + Castellano, gap 32, HUG). Sub-dropdowns gap 4 (Spacers/1).
- **Hero**: VERTICAL, paddingL/R `Wrapper-Default`. Orden de hijos: Textos → Imagen → Paginador. Textos (FILL, VERTICAL, padT/B 102, padL/R 149, h:371 FIXED) con frame interno (FILL, VERTICAL CENTER, gap 32) = título (FILL) + subtítulo (FIXED 676). Imagen (FILL, h:838 HUG) con image (FILL) + Card (ABSOLUTE x:465 y:119). Paginador (FILL, padding, paginator dentro). Aprendizajes: overlays en contenedor CON la imagen; orden de hijos crítico; appendChild antes de FILL.
- **Cards**: VERTICAL, paddingL/R `Wrapper-Default`, paddingT/B Spacers/13 (80), gap Spacers/9 (48). Header HORIZONTAL SPACE_BETWEEN (título HUG + botón). Cards frame HORIZONTAL gap Gutter (24). 3 cards: card1 Expanded (676, FILL) + card2/3 Collapsed (326, FIXED).
- **Image+Texto**: texto-izq / imagen-der. Bloque texto 4 cols, imagen 676 (6 cols). paddingLeft 149 ≈ 1 col + wrapper (margen "raro" = columnas enteras). CashbackCard creada y sustituida.
- **Image+Texto invertido**: imagen-izq / texto-der, espejo. Reestructurado en dos mitades FILL (cada una 6 cols). Imagen FILL en la mitad izquierda; `Right Half` frame (FILL, paddingRight = 2 cols ≈ 233) con el bloque de texto FILL → el texto ocupa 4 de 6 cols, alineado a la izquierda. Gap = Gutter. SearchBar creada y sustituida.
- **Entidades**: VERTICAL gap 52, px 32, py 80, CENTER. Título Title/04 (48, centrado, 676). Grid de logos: HORIZONTAL WRAP, gap 24/Gutter, content-center. 12× LogoCard (326×326, 3 cols cada una, 4 por fila = 12 cols).
- **Footer**: Dark-Black-Neutral (pendiente/según sesión).

---

## 9. ERRORES FRECUENTES Y CÓMO EVITARLOS

- **"FILL can only be set on children of auto-layout frames"** → el padre aún no tiene `layoutMode`, o el nodo aún no es hijo del padre. Solución: `appendChild` primero, padre con autolayout, y FILL en paso separado (R2/R-AL9).
- **Panel/caja que "pierde el alto"** → quedó `HUG` en vertical. Forzar `layoutSizingVertical='FIXED'` + `resize`. Validar leyendo de vuelta (R-AL10).
- **Texto que se estira de más** → se aplicó `FILL` cuando debía ocupar N columnas fijas. Usar el patrón de mitades/zonas (R-AL15) o limitar con padding de columnas sobrantes.
- **Componente creado en la página equivocada** → `figma.currentPage` no es fiable tras `setCurrentPageAsync`. Buscar la página por id/nombre y usar `targetPage.appendChild` explícito.
- **IDs que ya no existen tras operaciones estructurales** → re-buscar por nombre/tamaño con `findOne`/`findAll`.
- **Logos/contenido vectorial perdidos al sustituir** → no copiar solo `fills`; crear los vectoriales como componentes/slots.
- **`combineAsVariants` deja variantes fuera o con nombres mal formados** → renombrar a `Propiedad=Valor` y recombinar; verificar `componentPropertyDefinitions`.
- **Timeouts (408) en lecturas** → simplificar el script, leer por niveles, usar `use_figma` con JS scoped en vez de `get_metadata`.
- **Tokens ya aplicados que se omiten al re-tokenizar** → el guard de `boundVariables` los salta; trabajar sobre copia limpia.

---

## 10. COMPORTAMIENTO ESPERADO (resumen operativo)

- Al iniciar sesión: verificar herramientas disponibles (especialmente `use_figma`).
- Cuando Paco pasa un link: preguntar módulo o componente (salvo indicación de no preguntar / "hazlo sin pedir permiso").
- Tokenizar: pre-análisis → detectar modo → colores → tipografía → contraste. Saltar instancias, vectores y booleanos.
- Autolayout: captura antes → limpiar estructura → analizar grid y comportamiento → crear frames intermedios → aplicar de dentro afuera → FILL en paso aparte → captura después → auto-validar → reportar.
- Componentes: identificar en el análisis → clonar/crear → combinar variantes con nombres limpios → sustituir original por instancia.
- Geometría y medidas con precisión (Paco ha marcado las medidas imprecisas como problema recurrente). Validar leyendo propiedades de vuelta.
- Sin Tailwind en el código final del proyecto: CSS con tokens, CSS Grid de 12 columnas.
- Nunca eliminar variables; solo renombrar/añadir.
- Documentar el desglose de columnas de cada diseño para la skill de design-to-code.
