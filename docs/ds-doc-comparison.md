# Comparativa de documentación de sistemas de diseño → esquema para la skill

Analizamos cómo documentan sus **componentes** seis sistemas, para destilar un
conjunto sólido de campos que una skill pueda **autogenerar** y volcar en Storybook.

Sistemas: **Carbon** (IBM), **GOV.UK**, **Lightning/SLDS** (Salesforce),
**Shopify Polaris**, **Atlassian**. Fuentes al final.

## 1. Resumen por sistema

**Carbon (IBM).** 4 pestañas con plantilla idéntica: *Usage* (overview, formatting,
content, comportamientos, una sección por variante, modifiers, related), *Style*
(tablas elemento→propiedad→**token** por color/tipografía/estructura/tamaño),
*Code* (enlaza al Storybook; la API sale de autodocs), *Accessibility* (teclado,
recomendaciones, estado WCAG). Demo viva embebida con selector de tema.

**GOV.UK.** Orientado a *servicio público*: por componente, *When to use* →
*How it works* (variantes como subsecciones + guía de **contenido** de los textos +
comportamientos) → **Research on this component** (evidencia de pruebas con
usuarios). Accesibilidad entretejida en prosa (contrastes, WCAG). No usa tablas de
tokens ni de props (markup HTML/Nunjucks). Su sello: **contenido + evidencia +
cuándo NO usarlo**.

**Lightning / SLDS (Salesforce).** *About/overview*, *anatomy*, *variants*,
*states*, *accessibility* (sigue ARIA APG), y **blueprints**: HTML/CSS
framework-agnóstico + *styling hooks* (tokens). Fuerte en specs y accesibilidad.

**Shopify Polaris.** Centrado en *producto*: muchos **examples** interactivos,
**Props/API autotipada**, **Best practices** (do/don't), **Content guidelines**
(tono y textos), **Accessibility**, **Related components**.

**Atlassian.** *Examples* + *Code* + **tabla de Props** + guías de uso (anatomy,
behavior, content, do/don't) + **Accessibility** (página propia) + **estado del
componente** (GA/beta).

## 2. Matriz comparativa (campos de documentación)

Presencia del campo: ✓ fuerte · ~ parcial/entretejido · ✗ ausente.

| Campo | Carbon | GOV.UK | Lightning | Polaris | Atlassian |
| --- | :--: | :--: | :--: | :--: | :--: |
| Overview / descripción | ✓ | ✓ | ✓ | ✓ | ✓ |
| Cuándo usar | ✓ | ✓ | ✓ | ✓ | ✓ |
| Cuándo **no** usar | ~ | ✓ | ~ | ✓ | ✓ |
| Anatomía (partes) | ✓ | ✗ | ✓ | ~ | ✓ |
| Variantes (+cuándo c/u) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Tamaños | ✓ | ✗ | ~ | ~ | ✓ |
| Estados (hover/focus/disabled…) | ✓ | ~ | ✓ | ~ | ✓ |
| Estilo · tablas de **tokens** | ✓ | ✗ | ✓ | ~ | ~ |
| Tipografía / spacing specs | ✓ | ✗ | ✓ | ✗ | ~ |
| Props / **API** (tabla) | ✓ | ~ | ✓ | ✓ | ✓ |
| Ejemplos de código | ✓ | ✓ | ✓ | ✓ | ✓ |
| Do / Don't (best practices) | ✓ | ~ | ~ | ✓ | ✓ |
| Guía de **contenido** (textos) | ✓ | ✓ | ~ | ✓ | ✓ |
| Accesibilidad (teclado/ARIA/contraste) | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Research** / evidencia | ✗ | ✓ | ✗ | ✗ | ✗ |
| Componentes relacionados | ✓ | ~ | ~ | ✓ | ✓ |
| Estado / versión del componente | ✓ | ✗ | ~ | ~ | ✓ |
| Enlace a Figma / diseño | ✓ | ~ | ✓ | ✓ | ✓ |

**Lecturas clave:**
- **Núcleo universal** (en ~todos): overview, cuándo usar, variantes, ejemplos de
  código, props/API, accesibilidad. Eso es el mínimo imprescindible de la skill.
- **Diferenciadores de calidad**: anatomía, estados, tamaños y **tablas de tokens**
  (Carbon/Lightning) elevan la doc técnica; do/don't + content (Polaris/Atlassian/
  GOV.UK) la hacen usable; **research + cuándo no usar** (GOV.UK) la hacen honesta.
- La **API y el estilo se autogeneran** del código/tokens en los mejores (Carbon,
  Polaris); la **guía** (uso, contenido, do/don't) se escribe a mano.

## 3. Esquema consolidado de documentación (para la skill)

Campos agrupados, con su **fuente** y si la skill puede **autogenerarlos** en Euro6000.

### A. Identidad
| Campo | Fuente en Euro6000 | Auto |
| --- | --- | --- |
| Nombre + descripción 1 línea | JSDoc del componente / Figma | Semi |
| Estado / versión | metadato manual o `package.json` | Semi |
| Enlace a Figma | Code Connect o metadato del componente | Manual→Auto |

### B. Guía de uso (texto, semi-asistida por IA, revisada)
| Campo | Fuente | Auto |
| --- | --- | --- |
| Overview | redacción (IA borrador) | Semi |
| Cuándo usar / cuándo no | redacción | Manual |
| Do / Don't | redacción | Manual |
| Guía de contenido (labels) | redacción | Manual |

### C. Estructura y comportamiento (de código + Figma)
| Campo | Fuente | Auto |
| --- | --- | --- |
| Anatomía (partes) | estructura del componente Figma / DOM | Semi |
| Variantes (+cuándo) | union types de props + variantes Figma | **Auto** (lista) + texto |
| Tamaños | `buttonLayout` / `formsLayout` (tokens) | **Auto** |
| Estados | props + stories + tokens por estado | **Auto** (lista) |

### D. Estilo (de nuestros tokens)
| Campo | Fuente | Auto |
| --- | --- | --- |
| Tabla color elemento→estado→token | parseo del CSS del componente (`--sem-*`) | **Auto** |
| Tipografía | clases `.type-*` / tokens | **Auto** |
| Spacing / estructura | tokens de layout usados | **Auto** |

### E. API
| Campo | Fuente | Auto |
| --- | --- | --- |
| Tabla de props | tipos TS + JSDoc (autodocs Storybook) | **Auto** |
| Ejemplos de código | stories (`Show code`) | **Auto** |
| Import / instalación | convención del repo | **Auto** |

### F. Accesibilidad
| Campo | Fuente | Auto |
| --- | --- | --- |
| Teclado / foco / ARIA / label | addon a11y + notas | Semi |
| Contraste | tokens + addon a11y | **Auto** (chequeo) |

### G. Relación
| Campo | Fuente | Auto |
| --- | --- | --- |
| Componentes relacionados | grafo de imports / manual | Semi |
| Referencias | manual | Manual |

## 4. Cómo lo materializa la skill (propuesta)

Dado un componente `src/components/<Nombre>/`, la skill:

1. **Lee las fuentes**: `<Nombre>.tsx` (tipos + JSDoc → props, variantes, estados),
   `<Nombre>.css` (tokens `--sem-*`/layout → tablas de estilo), `<Nombre>.stories.tsx`
   (ejemplos), y el nodo de Figma (anatomía, variantes, specs).
2. **Genera un objeto de documentación** (`<Nombre>.doc.json`) con todos los campos
   del esquema; los auto-generables se rellenan, los de guía quedan como borrador IA
   marcado «revisar».
3. **Emite un MDX de Storybook** (`<Nombre>.mdx`, autodocs) que consume ese objeto:
   tablas de props/tokens/variantes automáticas + secciones de guía + demo viva +
   pestaña a11y. Reutiliza el selector global de tema/marca ya existente.
4. **Verifica**: build de Storybook + chequeo a11y.

Separar **datos** (`doc.json`) de **render** (MDX) permite reusar el contenido en
otros destinos (web, Figma) y regenerar sin perder la guía escrita a mano.

## 5. Recomendación de alcance mínimo viable

Para la primera versión de la skill, priorizar el **núcleo universal + estilo
autogenerado** (lo que más valor da y menos esfuerzo manual): Overview, Variantes,
Estados, Tamaños, **tablas de tokens**, **Props (autodocs)**, Ejemplos y
Accesibilidad básica. Añadir después la capa de *guía* (cuándo no usar, do/don't,
content) y, si interesa el sello GOV.UK, un apartado de *research/decisiones*.

---

_Fuentes: Carbon `carbon-website` (button usage/style/code/accessibility.mdx);
GOV.UK `alphagov/govuk-design-system` (button `index.md`); Polaris, Atlassian y
Lightning (documentación oficial y búsquedas, ver enlaces en el chat). Análisis:
2026-06-19._
