/**
 * T04 · Spacing & Layout Tokens  (incluido aquí junto a T02 ya que vienen del mismo origen)
 * Fuente: Figma — Librería-Pruebas Claude / colección "Responsive"
 * Generado: 2026-06-03
 *
 * Breakpoints del DS:
 *   xs=375 · sm=480 · md=768 · lg=1024 · xl=1440 · xxl=1620 · xxxl=1920
 */

// ─── Breakpoints ─────────────────────────────────────────────────────────────
export const breakpoints = {
  xs:   375,
  sm:   480,
  md:   768,
  lg:   1024,
  xl:   1440,
  xxl:  1620,
  xxxl: 1920,
} as const;

// ─── Spacers (por índice, valores en XL-1440 como referencia) ─────────────────
// Formato: { xs, sm, md, lg, xl, xxl, xxxl } todos en px
export const spacers = {
  1:  { xs: 4,   sm: 4,   md: 4,   lg: 4,   xl: 4,   xxl: 4,   xxxl: 4   },
  2:  { xs: 8,   sm: 8,   md: 8,   lg: 8,   xl: 8,   xxl: 8,   xxxl: 8   },
  3:  { xs: 12,  sm: 12,  md: 12,  lg: 12,  xl: 12,  xxl: 12,  xxxl: 12  },
  4:  { xs: 16,  sm: 16,  md: 16,  lg: 16,  xl: 16,  xxl: 16,  xxxl: 16  },
  5:  { xs: 20,  sm: 20,  md: 20,  lg: 20,  xl: 20,  xxl: 20,  xxxl: 20  },
  6:  { xs: 20,  sm: 20,  md: 24,  lg: 24,  xl: 24,  xxl: 20,  xxxl: 20  },
  7:  { xs: 20,  sm: 20,  md: 32,  lg: 32,  xl: 32,  xxl: 32,  xxxl: 32  },
  8:  { xs: 24,  sm: 24,  md: 36,  lg: 6,   xl: 40,  xxl: 40,  xxxl: 40  },
  9:  { xs: 32,  sm: 32,  md: 40,  lg: 40,  xl: 48,  xxl: 48,  xxxl: 48  },
  10: { xs: 40,  sm: 40,  md: 44,  lg: 44,  xl: 56,  xxl: 56,  xxxl: 56  },
  11: { xs: 40,  sm: 40,  md: 52,  lg: 52,  xl: 64,  xxl: 64,  xxxl: 64  },
  12: { xs: 40,  sm: 40,  md: 64,  lg: 64,  xl: 72,  xxl: 72,  xxxl: 72  },
  13: { xs: 40,  sm: 40,  md: 72,  lg: 72,  xl: 80,  xxl: 80,  xxxl: 80  },
  14: { xs: 40,  sm: 40,  md: 80,  lg: 80,  xl: 92,  xxl: 92,  xxxl: 92  },
  15: { xs: 48,  sm: 48,  md: 92,  lg: 92,  xl: 104, xxl: 104, xxxl: 104 },
  16: { xs: 56,  sm: 56,  md: 112, lg: 112, xl: 132, xxl: 132, xxxl: 132 },
  17: { xs: 56,  sm: 56,  md: 132, lg: 132, xl: 156, xxl: 156, xxxl: 156 },
  18: { xs: 64,  sm: 64,  md: 156, lg: 156, xl: 184, xxl: 184, xxxl: 184 },
} as const;

// ─── Border Radius ────────────────────────────────────────────────────────────
export const corners = {
  xxs:     2,
  xs:      4,
  sm:      6,
  md:      8,
  lg:      12,
  xl:      16,
  rounded: 10000,  // pill / full round
} as const;

// ─── Grid ─────────────────────────────────────────────────────────────────────
export const grid = {
  wrapperDefault: { xs: 20, sm: 20, md: 32, lg: 32, xl: 64, xxl: 64,  xxxl: 84  },
  wrapperHeader:  { xs: 16, sm: 16, md: 32, lg: 32, xl: 32, xxl: 32,  xxxl: 56  },
  wrapperModal:   { xs: 16, sm: 16, md: 32, lg: 40, xl: 32, xxl: 32,  xxxl: 56  },
  wrapperFull:    { xs: 0,  sm: 0,  md: 0,  lg: 0,  xl: 0,  xxl: 0,   xxxl: 0   },
  gutter:         { xs: 12, sm: 12, md: 16, lg: 16, xl: 24, xxl: 24,  xxxl: 32  },
} as const;

// ─── Botones (height / padding-x / min-width) — fijos entre breakpoints ──────
export const buttonLayout = {
  xl: { height: 64, paddingX: 32, minWidth: 168 },
  l:  { height: 64, paddingX: 32, minWidth: 168 },
  m:  { height: 56, paddingX: 24, minWidth: 110 },
  s:  { height: 48, paddingX: 20, minWidth: 96  },
  xs: { height: 40, paddingX: 16, minWidth: 56  },
} as const;

// ─── Forms (height / padding) ─────────────────────────────────────────────────
export const formLayout = {
  l: { height: 72, paddingX: 20 },
  m: { height: 56, paddingX: 16 },
} as const;
