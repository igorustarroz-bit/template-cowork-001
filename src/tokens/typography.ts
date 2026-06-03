/**
 * T02 · Typography Tokens
 * Fuente: Figma — Librería-Pruebas Claude / colección "Responsive"
 * Breakpoints: XS-375 · SM-480 · M-768 · LG-1024 · XL-1440 · XXL-1620 · XXXL-1920
 * Generado: 2026-06-03
 *
 * Formato: { sz: fontSize(px), lh: lineHeight(px) } por breakpoint
 */

export type TypoScale = {
  xs: { sz: number; lh: number };
  sm: { sz: number; lh: number };
  md: { sz: number; lh: number };
  lg: { sz: number; lh: number };
  xl: { sz: number; lh: number };
  xxl: { sz: number; lh: number };
  xxxl: { sz: number; lh: number };
};

// ─── Títulos ────────────────────────────────────────────────────────────────
export const titleScale: Record<string, TypoScale> = {
  title6: {
    xs:   { sz: 48, lh: 56 },
    sm:   { sz: 48, lh: 56 },
    md:   { sz: 58, lh: 68 },
    lg:   { sz: 58, lh: 68 },
    xl:   { sz: 72, lh: 86 },
    xxl:  { sz: 78, lh: 94 },
    xxxl: { sz: 92, lh: 108 },
  },
  title5: {
    xs:   { sz: 40, lh: 50 },
    sm:   { sz: 40, lh: 50 },
    md:   { sz: 50, lh: 56 },
    lg:   { sz: 50, lh: 56 },
    xl:   { sz: 60, lh: 72 },
    xxl:  { sz: 70, lh: 80 },
    xxxl: { sz: 84, lh: 96 },
  },
  title4: {
    xs:   { sz: 34, lh: 40 },
    sm:   { sz: 34, lh: 40 },
    md:   { sz: 40, lh: 46 },
    lg:   { sz: 40, lh: 48 },
    xl:   { sz: 48, lh: 56 },
    xxl:  { sz: 60, lh: 64 },
    xxxl: { sz: 72, lh: 76 },
  },
  title3: {
    xs:   { sz: 32, lh: 42 },
    sm:   { sz: 32, lh: 42 },
    md:   { sz: 34, lh: 40 },
    lg:   { sz: 34, lh: 44 },
    xl:   { sz: 40, lh: 48 },
    xxl:  { sz: 42, lh: 54 },
    xxxl: { sz: 44, lh: 62 },
  },
  title2: {
    xs:   { sz: 22, lh: 30 },
    sm:   { sz: 22, lh: 30 },
    md:   { sz: 26, lh: 32 },
    lg:   { sz: 26, lh: 32 },
    xl:   { sz: 32, lh: 40 },
    xxl:  { sz: 36, lh: 48 },
    xxxl: { sz: 42, lh: 56 },
  },
};

// ─── Body ───────────────────────────────────────────────────────────────────
export const bodyScale: Record<string, TypoScale> = {
  body6: {
    xs:   { sz: 20, lh: 28 },
    sm:   { sz: 20, lh: 28 },
    md:   { sz: 22, lh: 32 },
    lg:   { sz: 22, lh: 32 },
    xl:   { sz: 26, lh: 38 },
    xxl:  { sz: 28, lh: 40 },
    xxxl: { sz: 32, lh: 48 },
  },
  body5: {
    xs:   { sz: 20, lh: 28 },
    sm:   { sz: 20, lh: 28 },
    md:   { sz: 20, lh: 28 },
    lg:   { sz: 20, lh: 28 },
    xl:   { sz: 22, lh: 32 },
    xxl:  { sz: 24, lh: 32 },
    xxxl: { sz: 28, lh: 38 },
  },
  body4: {
    xs:   { sz: 18, lh: 26 },
    sm:   { sz: 18, lh: 26 },
    md:   { sz: 18, lh: 26 },
    lg:   { sz: 18, lh: 26 },
    xl:   { sz: 20, lh: 28 },
    xxl:  { sz: 22, lh: 30 },
    xxxl: { sz: 24, lh: 32 },
  },
  body3: {
    xs:   { sz: 16, lh: 24 },
    sm:   { sz: 16, lh: 24 },
    md:   { sz: 16, lh: 24 },
    lg:   { sz: 16, lh: 24 },
    xl:   { sz: 16, lh: 24 },
    xxl:  { sz: 16, lh: 24 },
    xxxl: { sz: 18, lh: 28 },
  },
  body2: {
    xs:   { sz: 14, lh: 22 },
    sm:   { sz: 14, lh: 22 },
    md:   { sz: 14, lh: 22 },
    lg:   { sz: 14, lh: 22 },
    xl:   { sz: 14, lh: 22 },
    xxl:  { sz: 14, lh: 22 },
    xxxl: { sz: 16, lh: 26 },
  },
  body1: {
    xs:   { sz: 12, lh: 18 },
    sm:   { sz: 12, lh: 18 },
    md:   { sz: 12, lh: 18 },
    lg:   { sz: 12, lh: 18 },
    xl:   { sz: 12, lh: 18 },
    xxl:  { sz: 12, lh: 18 },
    xxxl: { sz: 12, lh: 18 },
  },
};

// ─── Labels ─────────────────────────────────────────────────────────────────
export const labelScale: Record<string, TypoScale> = {
  label2: {
    xs: { sz: 12, lh: 16 }, sm: { sz: 12, lh: 16 }, md: { sz: 12, lh: 16 },
    lg: { sz: 12, lh: 16 }, xl: { sz: 12, lh: 16 }, xxl: { sz: 12, lh: 16 }, xxxl: { sz: 12, lh: 16 },
  },
  label1: {
    xs: { sz: 10, lh: 14 }, sm: { sz: 10, lh: 14 }, md: { sz: 10, lh: 14 },
    lg: { sz: 10, lh: 14 }, xl: { sz: 10, lh: 14 }, xxl: { sz: 10, lh: 14 }, xxxl: { sz: 10, lh: 14 },
  },
};

// ─── CTA ────────────────────────────────────────────────────────────────────
export const ctaScale = {
  ctaL:  { sz: 18, lh: 18 },
  ctaM:  { sz: 16, lh: 16 },
  ctaS:  { sz: 14, lh: 14 },
  ctaXs: { sz: 12, lh: 12 },
} as const;

// ─── Inputs ─────────────────────────────────────────────────────────────────
export const inputScale = {
  inputM: { text: { sz: 18, lh: 24 }, labelIn: { sz: 10, lh: 14 }, labelOut: { sz: 16, lh: 16 }, message: { sz: 14, lh: 14 } },
  inputS: { text: { sz: 14, lh: 14 }, labelIn: { sz: 10, lh: 12 }, labelOut: { sz: 14, lh: 14 }, message: { sz: 12, lh: 12 } },
} as const;

// ─── Letter Spacing ──────────────────────────────────────────────────────────
export const letterSpacing = {
  title:  '0em',
  body:   '0em',
  label:  '0.031em',  // 0.5px at 16px base
  cta:    '0em',
  forms:  '0em',
} as const;
