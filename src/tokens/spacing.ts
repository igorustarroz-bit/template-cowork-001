/**
 * Tokens de ESPACIADO, RADIOS y BREAKPOINTS — Euro6000 Design System.
 * Fuente: colección "Responsive" + primitivos "fixed/fx-*" del Figma.
 * Breakpoints (px): mobile-first (xs = base). Valores responsive en px.
 * NO editar a mano: regenerar desde Figma.
 */

export type Breakpoint = "xs" | "sm" | "m" | "lg" | "xl" | "xxl" | "xxxl";

/** Anchos de viewport (px). xs es la base mobile-first. */
export const breakpoints = {
  xs: 375,
  sm: 480,
  m: 768,
  lg: 1024,
  xl: 1440,
  xxl: 1620,
  xxxl: 1920,
} as const;

/** Escala fija (primitivos fixed/fx-*), en px. */
export const space = {
  "fx-0": 2,
  "fx-1": 4,
  "fx-2": 8,
  "fx-3": 12,
  "fx-4": 16,
  "fx-5": 20,
  "fx-6": 24,
  "fx-7": 28,
  "fx-8": 32,
  "fx-9": 40,
} as const;

/** Radios de esquina (px), responsive por breakpoint. rounded = pill. */
export const radii: Record<string, Record<Breakpoint, number>> = {
  xxs: { xs: 2, sm: 2, m: 2, lg: 2, xl: 2, xxl: 2, xxxl: 2 },
  xs: { xs: 4, sm: 4, m: 4, lg: 4, xl: 4, xxl: 4, xxxl: 4 },
  s: { xs: 6, sm: 6, m: 6, lg: 6, xl: 6, xxl: 6, xxxl: 6 },
  m: { xs: 8, sm: 8, m: 8, lg: 8, xl: 8, xxl: 8, xxxl: 8 },
  l: { xs: 12, sm: 12, m: 12, lg: 12, xl: 18, xxl: 12, xxxl: 12 },
  xl: { xs: 24, sm: 24, m: 16, lg: 16, xl: 36, xxl: 36, xxxl: 40 },
  rounded: { xs: 9999, sm: 9999, m: 9999, lg: 9999, xl: 9999, xxl: 9999, xxxl: 9999 },
  none: { xs: 0, sm: 0, m: 0, lg: 0, xl: 0, xxl: 0, xxxl: 0 },
};

/** Espaciadores responsive: valor por breakpoint (px). */
export const spacers: Record<string, Record<Breakpoint, number>> = {
  "0": { xs: 0, sm: 0, m: 0, lg: 0, xl: 0, xxl: 0, xxxl: 0 },
  "1": { xs: 4, sm: 4, m: 4, lg: 4, xl: 4, xxl: 4, xxxl: 4 },
  "2": { xs: 8, sm: 8, m: 8, lg: 8, xl: 8, xxl: 8, xxxl: 8 },
  "3": { xs: 12, sm: 12, m: 12, lg: 12, xl: 12, xxl: 12, xxxl: 12 },
  "4": { xs: 16, sm: 16, m: 16, lg: 16, xl: 16, xxl: 16, xxxl: 16 },
  "5": { xs: 20, sm: 20, m: 20, lg: 20, xl: 20, xxl: 20, xxxl: 20 },
  "6": { xs: 20, sm: 20, m: 24, lg: 24, xl: 24, xxl: 20, xxxl: 20 },
  "7": { xs: 20, sm: 20, m: 32, lg: 32, xl: 32, xxl: 32, xxxl: 32 },
  "8": { xs: 24, sm: 24, m: 36, lg: 36, xl: 40, xxl: 40, xxxl: 40 },
  "9": { xs: 32, sm: 32, m: 40, lg: 40, xl: 48, xxl: 48, xxxl: 48 },
  "10": { xs: 40, sm: 40, m: 44, lg: 44, xl: 56, xxl: 56, xxxl: 56 },
  "11": { xs: 40, sm: 40, m: 52, lg: 52, xl: 64, xxl: 64, xxxl: 64 },
  "12": { xs: 40, sm: 40, m: 64, lg: 64, xl: 72, xxl: 72, xxxl: 72 },
  "13": { xs: 40, sm: 40, m: 72, lg: 72, xl: 80, xxl: 80, xxxl: 80 },
  "14": { xs: 40, sm: 40, m: 80, lg: 80, xl: 92, xxl: 92, xxxl: 92 },
  "15": { xs: 48, sm: 48, m: 92, lg: 92, xl: 104, xxl: 104, xxxl: 104 },
  "16": { xs: 56, sm: 56, m: 112, lg: 112, xl: 132, xxl: 132, xxxl: 132 },
  "17": { xs: 56, sm: 56, m: 132, lg: 132, xl: 156, xxl: 156, xxxl: 156 },
  "18": { xs: 64, sm: 64, m: 156, lg: 156, xl: 184, xxl: 184, xxxl: 184 },
};

/** Grids responsive (wrappers + gutter), px. */
export const grids: Record<string, Record<Breakpoint, number>> = {
  "wrapper-default": { xs: 20, sm: 20, m: 32, lg: 32, xl: 32, xxl: 64, xxxl: 84 },
  "wrapper-header": { xs: 16, sm: 16, m: 32, lg: 32, xl: 32, xxl: 32, xxxl: 56 },
  "wrapper-modal": { xs: 16, sm: 16, m: 32, lg: 40, xl: 32, xxl: 32, xxxl: 56 },
  "wrapper-full": { xs: 0, sm: 0, m: 0, lg: 0, xl: 0, xxl: 0, xxxl: 0 },
  "gutter": { xs: 12, sm: 12, m: 16, lg: 16, xl: 24, xxl: 24, xxxl: 32 },
};

/** Tamaños de layout de Botón (constantes), px. */
export const buttonLayout = {
  "xl": {
    size: 104,
    padding: 32,
    minWidth: 168
  },
  "l": {
    size: 64,
    padding: 32,
    minWidth: 168
  },
  "m": {
    size: 56,
    padding: 24,
    minWidth: 110
  },
  "s": {
    size: 48,
    padding: 20,
    minWidth: 96
  },
  "xs": {
    size: 40,
    padding: 16,
    minWidth: 56
  }
} as const;

/** Tamaños de layout de Forms (constantes), px. */
export const formsLayout = {
  "l": {
    "size": 72,
    "paddingR": 20,
    "paddingL": 20,
    "messageDistance": 8,
    "labelInDistance": 4,
    "labelOutDistance": 12
  },
  "m": {
    "size": 56,
    "paddingR": 16,
    "paddingL": 16,
    "messageDistance": 6,
    "labelInDistance": 4,
    "labelOutDistance": 4
  }
} as const;

/** Anchos de columnas por nº de columnas y breakpoint (px). */
export const colsSize: Record<string, Record<Breakpoint, number>> = {
  "12": { xs: 335, sm: 440, m: 704, lg: 960, xl: 1312, xxl: 1492, xxxl: 1752 },
  "6": { xs: 335, sm: 440, m: 524, lg: 472, xl: 644, xxl: 734, xxxl: 860 },
  "3": { xs: 161.5, sm: 214, m: 254, lg: 228, xl: 310, xxl: 355, xxxl: 414 },
  "1": { xs: 45.83, sm: 63.3, m: 74, lg: 65.3, xl: 87.3, xxl: 102.3, xxxl: 116.6 },
};

