/**
 * Tokens de TIPOGRAFÍA — Euro6000 Design System.
 * Fuente: text styles + variables "Tipography/*" del Figma (Euro6000 — Library).
 * Familia única: Geist. Valores en px (tal cual en Figma).
 * Aplica con las clases .type-<slug> (src/index.css) o utilidades Tailwind.
 * NO editar a mano: regenerar desde Figma.
 */

export const fontFamily = "Geist" as const;
export const fontFamilyStack = `"Geist", system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`;

export const fontWeights = {
  black: 900,
  bold: 700,
  semibold: 600,
  medium: 500,
  regular: 400,
} as const;

export const letterSpacings = {  // px
  title: -0.8,
  body: 0,
  label: 0.5,
  cta: 0,
  forms: 0,
} as const;

export interface TextStyle {
  fontFamily: string;
  fontWeight: number;
  fontSize: number;     // px
  lineHeight: number;   // px
  letterSpacing: number;// px
}

/** Text styles agrupados (mismos nombres que en Figma). */
export const textStyles = {
  "Title": {
    "07": { fontFamily, fontWeight: 900, fontSize: 104, lineHeight: 132, letterSpacing: -0.8 },
    "06": { fontFamily, fontWeight: 900, fontSize: 72, lineHeight: 72, letterSpacing: -0.8 },
    "05": { fontFamily, fontWeight: 900, fontSize: 60, lineHeight: 60, letterSpacing: -0.8 },
    "04": { fontFamily, fontWeight: 900, fontSize: 48, lineHeight: 48, letterSpacing: -0.8 },
    "03": { fontFamily, fontWeight: 700, fontSize: 42, lineHeight: 40, letterSpacing: -0.8 },
    "02": { fontFamily, fontWeight: 700, fontSize: 32, lineHeight: 40, letterSpacing: -0.8 },
    "01": { fontFamily, fontWeight: 700, fontSize: 24, lineHeight: 34, letterSpacing: -0.8 },
  },
  "Body": {
    "06": { fontFamily, fontWeight: 400, fontSize: 26, lineHeight: 38, letterSpacing: 0 },
    "05": { fontFamily, fontWeight: 400, fontSize: 22, lineHeight: 32, letterSpacing: 0 },
    "04": { fontFamily, fontWeight: 400, fontSize: 20, lineHeight: 28, letterSpacing: 0 },
    "03": { fontFamily, fontWeight: 400, fontSize: 16, lineHeight: 24, letterSpacing: 0 },
    "02": { fontFamily, fontWeight: 400, fontSize: 14, lineHeight: 22, letterSpacing: 0 },
    "01": { fontFamily, fontWeight: 400, fontSize: 12, lineHeight: 18, letterSpacing: 0 },
  },
  "Labels": {
    "01": { fontFamily, fontWeight: 400, fontSize: 10, lineHeight: 14, letterSpacing: 0.5 },
    "02": { fontFamily, fontWeight: 400, fontSize: 12, lineHeight: 16, letterSpacing: 0.5 },
  },
  "CTA": {
    "03": { fontFamily, fontWeight: 500, fontSize: 18, lineHeight: 18, letterSpacing: 0 },
    "02": { fontFamily, fontWeight: 600, fontSize: 16, lineHeight: 16, letterSpacing: 0 },
    "01": { fontFamily, fontWeight: 600, fontSize: 14, lineHeight: 14, letterSpacing: 0 },
  },
  "CTA-Link-Footer": {
    "02": { fontFamily, fontWeight: 400, fontSize: 16, lineHeight: 16, letterSpacing: 0 },
    "01": { fontFamily, fontWeight: 400, fontSize: 14, lineHeight: 12, letterSpacing: 0 },
  },
  "Forms": {
    "Input-M/Text": { fontFamily, fontWeight: 400, fontSize: 18, lineHeight: 24, letterSpacing: 0 },
    "Input-M/Label-In": { fontFamily, fontWeight: 400, fontSize: 10, lineHeight: 14, letterSpacing: 0 },
    "Input-M/Label-Out": { fontFamily, fontWeight: 400, fontSize: 16, lineHeight: 16, letterSpacing: 0 },
    "Input-M/Info": { fontFamily, fontWeight: 400, fontSize: 14, lineHeight: 14, letterSpacing: 0 },
    "Input-S/Text": { fontFamily, fontWeight: 400, fontSize: 14, lineHeight: 14, letterSpacing: 0 },
    "Input-S/Label-In": { fontFamily, fontWeight: 400, fontSize: 10, lineHeight: 12, letterSpacing: 0 },
    "Input-S/Label-Out": { fontFamily, fontWeight: 400, fontSize: 14, lineHeight: 14, letterSpacing: 0 },
    "Input-S/Info": { fontFamily, fontWeight: 400, fontSize: 12, lineHeight: 12, letterSpacing: 0 },
  },
} as const;

