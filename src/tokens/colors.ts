/**
 * T01 · Color Tokens
 * Fuente: Figma — Librería-Pruebas Claude / colección "Theme" (modo Base)
 * Generado: 2026-06-03
 */

// ─── Primitivos: Grayscale ──────────────────────────────────────────────────
export const grayscale = {
  black:  '#000000',
  10:     '#000d1a',
  15:     '#001426',
  20:     '#001a33',
  30:     '#25394d',
  40:     '#4c5f70',
  50:     '#6b7b8a',
  60:     '#8796a3',
  70:     '#a0acb8',
  80:     '#c0c6cc',
  90:     '#e3e5e8',
  97:     '#f4f5f6',
  white:  '#ffffff',
} as const;

// ─── Primitivos: Primary-1 ──────────────────────────────────────────────────
export const primary1 = {
  '01': '#eef7ff',
  '02': '#d9edff',
  '03': '#b0d9ff',
  '04': '#0072f5',
  '05': '#003865',
  '06': '#001a33',
} as const;

// ─── Primitivos: Secondary ──────────────────────────────────────────────────
export const secondary1 = {
  '01': '#f8d5e0',
  '02': '#eca7bd',
  '03': '#cf2259',
  '04': '#92163d',
  '05': '#73123c',
} as const;

export const secondary2 = {
  '01': '#b4f8b1',
  '02': '#88e783',
  '03': '#024700',
} as const;

export const secondary3 = {
  '01': '#d6f3f5',
  '02': '#8be1e9',
  '03': '#003033',
} as const;

export const secondary4 = {
  '01': '#e2dff7',
  '02': '#a094ff',
  '03': '#350084',
} as const;

// ─── Primitivos: Opacidades ─────────────────────────────────────────────────
export const opacityBlack = {
  '00': 'rgba(0,0,0,0)',
  '07': 'rgba(0,0,0,0.07)',
  '10': 'rgba(0,0,0,0.10)',
  '20': 'rgba(0,0,0,0.20)',
  '30': 'rgba(0,0,0,0.30)',
  '50': 'rgba(0,0,0,0.50)',
  '60': 'rgba(0,0,0,0.60)',
  '70': 'rgba(0,0,0,0.70)',
  '90': 'rgba(0,0,0,0.90)',
} as const;

export const opacityWhite = {
  '00': 'rgba(255,255,255,0)',
  '07': 'rgba(255,255,255,0.07)',
  '10': 'rgba(255,255,255,0.10)',
  '20': 'rgba(255,255,255,0.20)',
  '30': 'rgba(255,255,255,0.30)',
  '50': 'rgba(255,255,255,0.50)',
  '60': 'rgba(255,255,255,0.60)',
  '70': 'rgba(255,255,255,0.71)',
  '90': 'rgba(255,255,255,0.90)',
} as const;

// ─── Primitivos: Sistema ────────────────────────────────────────────────────
export const systemColors = {
  error: {
    '01': '#d9b8b9',
    '02': '#d63838',
    '03': '#850606',
  },
  success: {
    '01': '#a2dbb3',
    '02': '#6dc849',
    '03': '#237210',
  },
  warning: {
    '01': '#f9d999',
    '02': '#f7ba40',
    '03': '#7a5706',
  },
} as const;
