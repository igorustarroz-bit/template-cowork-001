# Assets — Euro6000

Imágenes y vectores del proyecto, exportados de Figma. Todo bajo `src/assets/`
(procesado por Vite: hashing, optimización, tree-shaking).

## Estructura

```
src/assets/
├── icons/          # iconos UI (vectores) → componentes React (currentColor)
├── logos/
│   ├── brand/      # marca propia: euro6000, bankinter
│   └── entities/   # logos de bancos/entidades (módulo Entidades)
├── illustrations/  # vectores decorativos grandes
└── images/         # fotos raster (hero, módulos…)
```

## Convenciones

- **Nombres**: `kebab-case` (`euro6000.svg`, `hero-cajero.webp`).
- **Vectores (SVG)**: se importan como **componentes React** con SVGR
  (`?react`). Deben usar **`currentColor`** en `fill`/`stroke` para que el color
  lo ponga el token (regla del proyecto: *vector = slot*). Se exponen vía el
  `index.ts` (barrel) de cada carpeta.
- **Imágenes (raster)**: preferir **WebP**. Se importan directamente (no hay
  barrel); Vite devuelve la URL con hash.

## Cómo usar en código

Vector (coloreable por token):

```tsx
import LogoEuro6000 from "@/assets/logos/brand/euro6000.svg?react";
// o vía barrel: import { LogoEuro6000 } from "@/assets/logos/brand";

<span className="text-sem-texts-base">
  <LogoEuro6000 className="h-6 w-auto" />   {/* hereda currentColor */}
</span>
```

Imagen raster:

```tsx
import heroImg from "@/assets/images/hero-cajero.webp";

<img src={heroImg} alt="Cajero EURO 6000" />
```

## Flujo de export desde Figma

Ver `docs/assets-workflow.md` para el proceso completo (localizar nodo →
`download_assets` → normalizar → guardar → cablear).
