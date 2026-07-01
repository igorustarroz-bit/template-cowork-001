// Iconos UI (vectores) exportados de Figma como componentes React vía SVGR.
// Convención: archivo `nombre-icono.svg` (currentColor) + re-export aquí.
// Uso: import { IconArrow } from "@/assets/icons";
// export { default as IconArrow } from "./arrow.svg?react";

// NOTA (Checkbox, 2026-07-01): check.svg / minus.svg son PLACEHOLDER dibujados a mano
// (currentColor), no exportados de Figma — download_assets devuelve 403 en el sandbox
// de Cowork (ver docs/assets-workflow.md). Sustituir por el export nativo de Figma del
// nodo `UI 03 - Checkbox + Label` (icono Check / Minus) cuando alguien tenga Figma
// desktop a mano.
export { default as IconCheck } from "./check.svg?react";
export { default as IconMinus } from "./minus.svg?react";
