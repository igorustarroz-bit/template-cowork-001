# Streams de automatización: «Ready to develop» + Documentación

Plan de dos *streams* de skills encadenados por una **puerta de calidad**, para el
design system Euro6000. Objetivo: que un componente solo pase a código cuando su
diseño está cerrado, y que su documentación se genere sola al construirlo.

## Flujo general

```
Diseño en Figma
      │
      ▼
[ Stream A · READY TO DEVELOP ]  ── gate (todas las comprobaciones OK)
      │
      ▼
Construcción del componente en código (React + Tailwind + tokens)
      │
      ▼
[ Stream B · DOCUMENTACIÓN ]  → Storybook (autodocs)
```

La salida «OK» del Stream A es **requisito obligatorio** para pasar un componente a
código. Sin ese visto bueno, no se desarrolla.

---

## Stream A — «Ready to develop» (lado diseño, en Figma)

Valida que un componente de Figma está listo para desarrollarse. Se plantea como un
**grupo de skills** orquestadas por una skill paraguas (`ready-to-develop`), donde
cada chequeo produce **pasa / falla + informe** y la puerta solo se abre si todos pasan.

### Comprobaciones

1. **Tokens correctamente aplicados** (`tokens-audit`)
   Verifica que todos los valores (color, tipografía, espaciado, radios) usan
   variables/tokens del sistema y que no hay valores *hardcodeados* que existan
   como token.

2. **Análisis de grid y comportamiento responsive** (`responsive-grid-analysis`)
   Revisa la rejilla y cómo se comporta el componente en los breakpoints definidos
   (xs…xxxl), detectando incoherencias o medidas fuera de sistema.

3. **Estructura (autolayout) + análisis responsive** (`structure-and-responsive`)
   Limpia la estructura y aplica **autolayout para organizar y permitir variantes**.
   El **comportamiento responsive se analiza y documenta** aquí (columnas, anclajes,
   breakpoints) pero **se implementa en código**, no como variables responsive en
   Figma (esas quedan opcionales). La salida es una **especificación de grid/anclajes**
   que consume el desarrollo.

4. **Componentes y variantes** (`variants-builder`)
   Crea el *component set* y sus variantes (tipos, tamaños, estados) de forma
   consistente con el resto del sistema.

> **Detectar comportamiento ANTES de construir:** en el análisis hay que leer las
> variantes del *component set* (p.ej. `State=Collapsed/Expanded`) e inferir el
> comportamiento interactivo (toggle, selección única, etc.) para reflejarlo en el
> código del componente. Ejemplo validado: el módulo Cards (una sola card expandida
> a la vez).

> Especificación operativa detallada de este stream (tokenización mode-per-module,
> reglas de grid, limpieza, autolayout, variantes): `docs/stream-a-figma-workflow.md`.

### Resultado
La skill paraguas reúne los informes y emite el estado **Ready to develop ✅/❌**.
Solo el ✅ habilita el paso a código.

---

## Stream B — Documentación (lado código, en Storybook)

Una vez construido el componente, una skill autogenera su documentación con un
esquema consolidado (extraído de analizar Carbon, GOV.UK, Lightning, Polaris y
Atlassian — ver `docs/ds-doc-comparison.md` y `docs/carbon-doc-analysis.md`).

- **Lee** del componente: tipos + JSDoc (props/variantes/estados), CSS de tokens
  (tablas de estilo), stories (ejemplos) y el nodo de Figma (anatomía/specs).
- **Genera** un objeto de datos (`<Componente>.doc.json`) + un MDX de autodocs
  (`<Componente>.mdx`) que se consume en Storybook (reutilizando el selector global
  de tema/marca ya existente).
- **Autogenera**: props, tablas de tokens (color/tipografía/spacing), variantes,
  tamaños, ejemplos y chequeo de accesibilidad. **Se redacta a mano**: cuándo usar /
  no usar, do&don't y guía de contenido.

---

## Decisiones tomadas

- **Autolayouts: sí** — para **limpiar estructura, crear variantes y optimizar/
  estandarizar espaciados y distancias** (con tokens `Layout/Spacers`). El
  **responsive se documenta en Figma e se implementa en código**; las variables
  responsive en Figma son opcionales (no requisito del gate).
- **Validación previa a la skill:** antes de automatizar, se validan a mano los
  pasos del gate sobre componentes aún no trabajados.
- **Stack = el de este proyecto** (React + Vite + Tailwind + GSAP + Storybook). Se
  adapta el workflow original: el análisis de grid se mantiene pero se expresa con
  Tailwind (`grid grid-cols-12`, `col-span-*`), no con CSS Grid puro ni "sin Tailwind".

## Decisiones abiertas

- **¿Skill única o grupo?** para «Ready to develop» (preferencia inicial: grupo
  orquestado por una skill paraguas).
- Alcance mínimo viable de cada skill antes de declararlas requisito.

---

_Borrador para compartir. Euro6000 · 2026-06-19. Pendiente de integrar el material
del otro hilo de trabajo._
