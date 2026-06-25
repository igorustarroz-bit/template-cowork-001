# Aprendizajes design-to-code (causas raíz + checklist)

Análisis de por qué las implementaciones se desviaban del diseño (nav, footer,
image+texto) y cómo evitarlo. Para incorporar al proceso y a la futura skill.

## Causas raíz

1. **Build "a ciegas".** El agente no ve las capturas (no puede descargarlas), así
   que infiere el layout desde el JSON de estructura/tokens. Se pierden detalles
   visuales (contenedor *pill*, líneas verticales, botones circulares).
2. **Inferir desde nombres de variante/tipo, no desde propiedades resueltas.**
   Ejemplos reales:
   - Nav: ítems "ActionButton **Primary** XS" → se asumieron pills rojas, pero el
     relleno estaba **sobrescrito a transparente** (solo el activo tenía gris).
   - Footer: `Line w244 h0` → se asumió horizontal, pero estaba **rotada −90°**
     (separador **vertical**).
   - Footer: redes → se asumieron iconos sueltos, pero eran un **`SocialButton`
     circular de 44px** con fondo `Backgrounds/Inverse`.
3. **Lecturas poco profundas.** No se comprobó: `cornerRadius` del contenedor
   (pill de la nav), `rotation` de las líneas, **overrides** de instancias, ni que
   el **logo es un vector** (se metió como texto).
4. **No se usó `get_design_context`** (devuelve código React+Tailwind + screenshot
   del nodo) — la herramienta específica de design-to-code.
5. **Errores de código** independientes del diseño: auto-flow de CSS Grid empujando
   a 2ª fila, falta de `max-width` en módulos.

## Checklist de lectura previa (antes de escribir código)

Por cada **contenedor / módulo**:
- `layoutMode`, `padding`, `itemSpacing`, **`cornerRadius`**, `fills` (token), `strokes`, `effects`.
- ¿Tiene forma *pill*/redondeada? ¿Va flotante (margen) o a sangre?
- **`max-width`** del contenido (los módulos son 1440 / contenido 1376).

Por cada **separador / línea**:
- Tipo `LINE`, **`rotation`** (¿vertical?), longitud, `strokeWeight`, token de color.

Por cada **hijo**:
- Tipo. Si `INSTANCE` → leer su **render real** (fill efectivo, estructura, tamaño,
  forma) y sus **overrides**, NO solo el nombre de variante.
- Si `VECTOR`/`BOOLEAN_OPERATION` o es un **logo/marca** → tratar como **slot**
  (nunca texto ni copiar fills).
- `TEXT` → estilo, color (token) y `characters` reales.
- Absolutos/overlays → anclajes (top/bottom/left/right) y si escalan o son fijos.

Por cada **componente interactivo**:
- Leer las **variantes del component set** (`State=…`) para inferir comportamiento
  (hover, expand/collapse, selección única) ANTES de construir.

## Cambios de proceso

1. **Usar `get_design_context`** como fuente principal (código + screenshot del nodo)
   y complementar con lecturas de tokens dirigidas. No construir solo desde geometría.
2. **No inferir desde nombres**: resolver siempre fill/stroke/rotation/radius reales.
3. **Logos y marcas = slot vector**, por defecto.
4. **Verificación visual explícita**: como el agente no ve imágenes, front-cargar la
   lectura (checklist) para reducir iteraciones, y usar a Paco como verificador visual
   con un único checkpoint claro por componente.
5. Recordar las reglas de código del proyecto: grid 12 col (cuidado con el auto-flow:
   ordenar el DOM o usar `col-start`/`row-start` explícitos), `max-width` por módulo,
   spacing/colors por token, mode-driven + modo por componente.

---

_Euro6000 · captura de aprendizajes tras nav/footer/image+texto. Pendiente: re-pulir
nav y footer aplicando este checklist._
