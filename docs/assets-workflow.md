# Flujo de assets (Figma → código)

Cómo exportar imágenes y vectores de Figma y usarlos en el proyecto. Estructura y
convenciones en `src/assets/README.md`.

## Tipos y formato destino

| Tipo | Carpeta | Formato | Cómo se usa en código |
|------|---------|---------|------------------------|
| Iconos UI | `src/assets/icons/` | **SVG** (`currentColor`) | Componente React vía SVGR (`?react`) |
| Logos marca | `src/assets/logos/brand/` | **SVG** | Componente React (SVGR) |
| Logos entidades | `src/assets/logos/entities/` | **SVG** | Componente React (SVGR) |
| Ilustraciones | `src/assets/illustrations/` | **SVG** | Componente React (SVGR) |
| Fotos | `src/assets/images/` | **WebP** (fallback PNG/JPG) | `import` → URL (Vite) |

## Vectores: SVGR + `currentColor`

`vite-plugin-svgr` está configurado en `vite.config.ts` (aplica también a Storybook,
que hereda la config de Vite). Tipos en `src/vite-env.d.ts`.

Regla del proyecto: **vector = slot**, el color lo pone el token. Por eso todo SVG
debe usar `currentColor` en `fill`/`stroke` (no colores fijos). Así:

```tsx
import IconAtmCard from "@/assets/icons/atm-card.svg?react";

<span className="text-sem-backgrounds-accent-base">
  <IconAtmCard className="h-full w-auto" />   {/* toma el color del contenedor */}
</span>
```

Se re-exportan en el `index.ts` de cada carpeta para importar limpio:
`import { IconAtmCard } from "@/assets/icons"`.

## Fotos: import bundled

```tsx
import heroImg from "@/assets/images/hero-cajero.webp";
<img src={heroImg} alt="…" />   // Vite devuelve la URL con hash
```

## Proceso de export desde Figma

1. **Localizar el nodo** del asset (vector o imagen) en Figma — por nombre o
   recorriendo el árbol con `use_figma`.
2. **Exportar** con `download_assets` (MCP de Figma):
   - Vectores → `defaultFormat: "svg"`.
   - Fotos → devuelve las imágenes originales (`rawImages`) en su formato real.
   El tool devuelve **URLs temporales** (cortas, trátalas como secreto).
3. **Guardar el binario** en la carpeta correspondiente:
   - Vectores: normalizar a `currentColor`, nombrar en `kebab-case`, añadir al `index.ts`.
   - Fotos: convertir a **WebP** (calidad ~80) y guardar en `images/`.
4. **Cablear** en el código (import SVGR / import de imagen) y verificar build.

> ⚠️ **Limitación del entorno Cowork.** Desde el sandbox de Cowork, el dominio
> `figma.com` está **bloqueado** (las URLs de `download_assets` devuelven 403), así
> que **no se pueden descargar los bytes del asset desde aquí**. El paso 3 (guardar
> el binario) se hace por una de estas vías:
> - **Export nativo de Figma** (seleccionar el nodo → Export → arrastrar el archivo a
>   `src/assets/…`). Es la vía recomendada para el equipo.
> - Desde un entorno **con acceso a figma.com**, descargando la URL de `download_assets`.
>
> El resto del pipeline (SVGR, `currentColor`, import bundled, barrels) está montado y
> verificado: basta con dejar el archivo en su carpeta y re-exportarlo en el `index.ts`.

## Checklist por asset

- [ ] Nombre en `kebab-case`, en la carpeta correcta.
- [ ] SVG: usa `currentColor` (sin colores hardcodeados) y está en el `index.ts`.
- [ ] Foto: WebP, peso razonable.
- [ ] Importado y usado en código; `tsc` + build de Storybook sin errores.
