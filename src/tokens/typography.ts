/**
 * Tokens de TIPOGRAFÍA — Euro6000 Design System.
 * Fuente: text styles del Figma, ENLAZADOS a variables:
 *   fontSize/lineHeight → colección "Responsive" (por breakpoint)
 *   letterSpacing/fontFamily/fontWeight → primitivos "Tipography/*"
 * Por eso los estilos son responsive. Familia única: Geist. Valores en px.
 * Aplica con las clases responsive .type-<slug> (src/index.css) que replican
 * el comportamiento del estilo en Figma a través de los breakpoints.
 * NO editar a mano: regenerar desde Figma.
 */

export type Breakpoint = "xs" | "sm" | "m" | "lg" | "xl" | "xxl" | "xxxl";

export const fontFamily = "Geist" as const;
export const fontFamilyStack = `"Geist", system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`;

export const fontWeights = { black: 900, bold: 700, semibold: 600, medium: 500, regular: 400 } as const;
export const letterSpacings = { title: -0.8, body: 0, label: 0.5, cta: 0, forms: 0 } as const;

export interface TextStyle {
  /** Nombre del estilo en Figma. */
  name: string;
  /** Clase CSS responsive correspondiente (.type-<slug>). */
  className: string;
  fontFamily: string;
  fontWeight: number;
  letterSpacing: number; // px
  /** font-size por breakpoint (px). */
  fontSize: Record<Breakpoint, number>;
  /** line-height por breakpoint (px). */
  lineHeight: Record<Breakpoint, number>;
  /** Variables Figma a las que está enlazado el estilo. */
  boundTo: { fontSize: string; lineHeight: string };
}

/** Estilos tipográficos (responsive), agrupados como en Figma. */
export const textStyles = {
  "Title": {
    "07": {
      name: "Title/07", className: "type-title-07", fontFamily,
      fontWeight: 900, letterSpacing: -0.8,
      fontSize: { xs: 40, sm: 64, m: 74, lg: 74, xl: 104, xxl: 94, xxxl: 108 },
      lineHeight: { xs: 52, sm: 72, m: 84, lg: 84, xl: 132, xxl: 110, xxxl: 124 },
      boundTo: { fontSize: "Typography/Title 7/SZ", lineHeight: "Typography/Title 7/LH" },
    } satisfies TextStyle,
    "06": {
      name: "Title/06", className: "type-title-06", fontFamily,
      fontWeight: 900, letterSpacing: -0.8,
      fontSize: { xs: 45, sm: 44, m: 58, lg: 58, xl: 72, xxl: 78, xxxl: 92 },
      lineHeight: { xs: 44, sm: 44, m: 68, lg: 68, xl: 72, xxl: 94, xxxl: 108 },
      boundTo: { fontSize: "Typography/Title 6/SZ", lineHeight: "Typography/Title 6/LH" },
    } satisfies TextStyle,
    "05": {
      name: "Title/05", className: "type-title-05", fontFamily,
      fontWeight: 900, letterSpacing: -0.8,
      fontSize: { xs: 40, sm: 40, m: 50, lg: 50, xl: 60, xxl: 70, xxxl: 84 },
      lineHeight: { xs: 40, sm: 50, m: 56, lg: 56, xl: 60, xxl: 80, xxxl: 96 },
      boundTo: { fontSize: "Typography/Title 5/SZ", lineHeight: "Typography/Title 5/LH" },
    } satisfies TextStyle,
    "04": {
      name: "Title/04", className: "type-title-04", fontFamily,
      fontWeight: 900, letterSpacing: -0.8,
      fontSize: { xs: 34, sm: 34, m: 40, lg: 40, xl: 48, xxl: 60, xxxl: 72 },
      lineHeight: { xs: 34, sm: 40, m: 46, lg: 48, xl: 48, xxl: 64, xxxl: 76 },
      boundTo: { fontSize: "Typography/Title 4/SZ", lineHeight: "Typography/Title 4/LH" },
    } satisfies TextStyle,
    "03": {
      name: "Title/03", className: "type-title-03", fontFamily,
      fontWeight: 700, letterSpacing: -0.8,
      fontSize: { xs: 32, sm: 32, m: 34, lg: 34, xl: 42, xxl: 42, xxxl: 44 },
      lineHeight: { xs: 32, sm: 32, m: 36, lg: 36, xl: 40, xxl: 44, xxxl: 44 },
      boundTo: { fontSize: "Typography/Title 3/SZ", lineHeight: "Typography/Title 3/LH" },
    } satisfies TextStyle,
    "02": {
      name: "Title/02", className: "type-title-02", fontFamily,
      fontWeight: 700, letterSpacing: -0.8,
      fontSize: { xs: 22, sm: 22, m: 26, lg: 26, xl: 32, xxl: 36, xxxl: 42 },
      lineHeight: { xs: 30, sm: 30, m: 32, lg: 32, xl: 40, xxl: 48, xxxl: 56 },
      boundTo: { fontSize: "Typography/Title 2/SZ", lineHeight: "Typography/Title 2/LH" },
    } satisfies TextStyle,
    "01": {
      name: "Title/01", className: "type-title-01", fontFamily,
      fontWeight: 700, letterSpacing: -0.8,
      fontSize: { xs: 20, sm: 20, m: 22, lg: 22, xl: 24, xxl: 24, xxxl: 28 },
      lineHeight: { xs: 28, sm: 28, m: 32, lg: 30, xl: 34, xxl: 32, xxxl: 38 },
      boundTo: { fontSize: "Typography/Title 1/SZ", lineHeight: "Typography/Title 1/LH" },
    } satisfies TextStyle,
  },
  "Body": {
    "06": {
      name: "Body/06", className: "type-body-06", fontFamily,
      fontWeight: 400, letterSpacing: 0,
      fontSize: { xs: 20, sm: 20, m: 22, lg: 22, xl: 26, xxl: 28, xxxl: 32 },
      lineHeight: { xs: 28, sm: 28, m: 32, lg: 32, xl: 38, xxl: 40, xxxl: 48 },
      boundTo: { fontSize: "Typography/Body 6/SZ", lineHeight: "Typography/Body 6/LH" },
    } satisfies TextStyle,
    "05": {
      name: "Body/05", className: "type-body-05", fontFamily,
      fontWeight: 400, letterSpacing: 0,
      fontSize: { xs: 20, sm: 20, m: 20, lg: 20, xl: 22, xxl: 24, xxxl: 28 },
      lineHeight: { xs: 28, sm: 28, m: 28, lg: 28, xl: 32, xxl: 32, xxxl: 38 },
      boundTo: { fontSize: "Typography/Body 5/SZ", lineHeight: "Typography/Body 5/LH" },
    } satisfies TextStyle,
    "04": {
      name: "Body/04", className: "type-body-04", fontFamily,
      fontWeight: 400, letterSpacing: 0,
      fontSize: { xs: 18, sm: 18, m: 18, lg: 18, xl: 20, xxl: 22, xxxl: 24 },
      lineHeight: { xs: 26, sm: 26, m: 26, lg: 26, xl: 28, xxl: 30, xxxl: 32 },
      boundTo: { fontSize: "Typography/Body 4/SZ", lineHeight: "Typography/Body 4/LH" },
    } satisfies TextStyle,
    "03": {
      name: "Body/03", className: "type-body-03", fontFamily,
      fontWeight: 400, letterSpacing: 0,
      fontSize: { xs: 16, sm: 16, m: 16, lg: 16, xl: 16, xxl: 16, xxxl: 18 },
      lineHeight: { xs: 24, sm: 24, m: 24, lg: 24, xl: 24, xxl: 24, xxxl: 28 },
      boundTo: { fontSize: "Typography/Body 3/SZ", lineHeight: "Typography/Body 3/LH" },
    } satisfies TextStyle,
    "02": {
      name: "Body/02", className: "type-body-02", fontFamily,
      fontWeight: 400, letterSpacing: 0,
      fontSize: { xs: 14, sm: 14, m: 14, lg: 14, xl: 14, xxl: 14, xxxl: 16 },
      lineHeight: { xs: 22, sm: 22, m: 22, lg: 22, xl: 22, xxl: 22, xxxl: 26 },
      boundTo: { fontSize: "Typography/Body 2/SZ", lineHeight: "Typography/Body 2/LH" },
    } satisfies TextStyle,
    "01": {
      name: "Body/01", className: "type-body-01", fontFamily,
      fontWeight: 400, letterSpacing: 0,
      fontSize: { xs: 12, sm: 12, m: 12, lg: 12, xl: 12, xxl: 12, xxxl: 12 },
      lineHeight: { xs: 18, sm: 18, m: 18, lg: 18, xl: 18, xxl: 18, xxxl: 18 },
      boundTo: { fontSize: "Typography/Body 1/SZ", lineHeight: "Typography/Body 1/LH" },
    } satisfies TextStyle,
  },
  "Labels": {
    "01": {
      name: "Labels/01", className: "type-labels-01", fontFamily,
      fontWeight: 400, letterSpacing: 0.5,
      fontSize: { xs: 10, sm: 10, m: 10, lg: 10, xl: 10, xxl: 10, xxxl: 10 },
      lineHeight: { xs: 14, sm: 14, m: 14, lg: 14, xl: 14, xxl: 14, xxxl: 14 },
      boundTo: { fontSize: "Typography/Label 1/SZ", lineHeight: "Typography/Label 1/LH" },
    } satisfies TextStyle,
    "02": {
      name: "Labels/02", className: "type-labels-02", fontFamily,
      fontWeight: 400, letterSpacing: 0.5,
      fontSize: { xs: 12, sm: 12, m: 12, lg: 12, xl: 12, xxl: 12, xxxl: 12 },
      lineHeight: { xs: 16, sm: 16, m: 16, lg: 16, xl: 16, xxl: 16, xxxl: 16 },
      boundTo: { fontSize: "Typography/Label 2/SZ", lineHeight: "Typography/Label 2/LH" },
    } satisfies TextStyle,
  },
  "CTA": {
    "03": {
      name: "CTA/03", className: "type-cta-03", fontFamily,
      fontWeight: 500, letterSpacing: 0,
      fontSize: { xs: 18, sm: 18, m: 18, lg: 18, xl: 18, xxl: 18, xxxl: 18 },
      lineHeight: { xs: 18, sm: 18, m: 18, lg: 18, xl: 18, xxl: 18, xxxl: 18 },
      boundTo: { fontSize: "Typography/CTA-L/SZ", lineHeight: "Typography/CTA-L/LH" },
    } satisfies TextStyle,
    "02": {
      name: "CTA/02", className: "type-cta-02", fontFamily,
      fontWeight: 600, letterSpacing: 0,
      fontSize: { xs: 16, sm: 16, m: 16, lg: 16, xl: 16, xxl: 16, xxxl: 16 },
      lineHeight: { xs: 22, sm: 22, m: 22, lg: 22, xl: 16, xxl: 21, xxxl: 16 },
      boundTo: { fontSize: "Typography/CTA-M/SZ", lineHeight: "Typography/CTA-M/LH" },
    } satisfies TextStyle,
    "01": {
      name: "CTA/01", className: "type-cta-01", fontFamily,
      fontWeight: 600, letterSpacing: 0,
      fontSize: { xs: 14, sm: 14, m: 14, lg: 14, xl: 14, xxl: 14, xxxl: 14 },
      lineHeight: { xs: 14, sm: 14, m: 14, lg: 14, xl: 14, xxl: 14, xxxl: 14 },
      boundTo: { fontSize: "Typography/CTA-S/SZ", lineHeight: "Typography/CTA-S/LH" },
    } satisfies TextStyle,
  },
  "CTA-Link-Footer": {
    "02": {
      name: "CTA-Link-Footer/02", className: "type-cta-link-footer-02", fontFamily,
      fontWeight: 400, letterSpacing: 0,
      fontSize: { xs: 16, sm: 16, m: 16, lg: 16, xl: 16, xxl: 16, xxxl: 16 },
      lineHeight: { xs: 22, sm: 22, m: 22, lg: 22, xl: 16, xxl: 21, xxxl: 16 },
      boundTo: { fontSize: "Typography/CTA-M/SZ", lineHeight: "Typography/CTA-M/LH" },
    } satisfies TextStyle,
    "01": {
      name: "CTA-Link-Footer/01", className: "type-cta-link-footer-01", fontFamily,
      fontWeight: 400, letterSpacing: 0,
      fontSize: { xs: 14, sm: 14, m: 14, lg: 14, xl: 14, xxl: 14, xxxl: 14 },
      lineHeight: { xs: 12, sm: 12, m: 12, lg: 12, xl: 12, xxl: 12, xxxl: 12 },
      boundTo: { fontSize: "Typography/CTA-S/SZ", lineHeight: "Typography/CTA-XS/LH" },
    } satisfies TextStyle,
  },
  "Forms": {
    "Input-M/Text": {
      name: "Forms/Input-M/Text", className: "type-forms-input-m-text", fontFamily,
      fontWeight: 400, letterSpacing: 0,
      fontSize: { xs: 18, sm: 18, m: 18, lg: 18, xl: 18, xxl: 18, xxxl: 18 },
      lineHeight: { xs: 24, sm: 24, m: 24, lg: 24, xl: 24, xxl: 24, xxxl: 24 },
      boundTo: { fontSize: "Typography/Input-M/Text/SZ", lineHeight: "Typography/Input-M/Text/LH" },
    } satisfies TextStyle,
    "Input-M/Label-In": {
      name: "Forms/Input-M/Label-In", className: "type-forms-input-m-label-in", fontFamily,
      fontWeight: 400, letterSpacing: 0,
      fontSize: { xs: 10, sm: 10, m: 10, lg: 10, xl: 10, xxl: 10, xxxl: 10 },
      lineHeight: { xs: 12, sm: 12, m: 12, lg: 12, xl: 14, xxl: 12, xxxl: 12 },
      boundTo: { fontSize: "Typography/Input-M/Label-In/SZ", lineHeight: "Typography/Input-M/Label-In/LH" },
    } satisfies TextStyle,
    "Input-M/Label-Out": {
      name: "Forms/Input-M/Label-Out", className: "type-forms-input-m-label-out", fontFamily,
      fontWeight: 400, letterSpacing: 0,
      fontSize: { xs: 16, sm: 16, m: 16, lg: 16, xl: 16, xxl: 16, xxxl: 16 },
      lineHeight: { xs: 16, sm: 16, m: 16, lg: 16, xl: 16, xxl: 16, xxxl: 16 },
      boundTo: { fontSize: "Typography/Input-M/Label-Out/SZ", lineHeight: "Typography/Input-M/Label-Out/LH" },
    } satisfies TextStyle,
    "Input-M/Info": {
      name: "Forms/Input-M/Info", className: "type-forms-input-m-info", fontFamily,
      fontWeight: 400, letterSpacing: 0,
      fontSize: { xs: 14, sm: 14, m: 14, lg: 14, xl: 14, xxl: 14, xxxl: 14 },
      lineHeight: { xs: 14, sm: 14, m: 14, lg: 14, xl: 14, xxl: 14, xxxl: 14 },
      boundTo: { fontSize: "Typography/Input-M/Message/SZ", lineHeight: "Typography/Input-M/Message/LH" },
    } satisfies TextStyle,
    "Input-S/Text": {
      name: "Forms/Input-S/Text", className: "type-forms-input-s-text", fontFamily,
      fontWeight: 400, letterSpacing: 0,
      fontSize: { xs: 14, sm: 14, m: 14, lg: 14, xl: 14, xxl: 14, xxxl: 14 },
      lineHeight: { xs: 14, sm: 14, m: 14, lg: 14, xl: 14, xxl: 14, xxxl: 14 },
      boundTo: { fontSize: "Typography/Input-S/Text/SZ", lineHeight: "Typography/Input-S/Text/LH" },
    } satisfies TextStyle,
    "Input-S/Label-In": {
      name: "Forms/Input-S/Label-In", className: "type-forms-input-s-label-in", fontFamily,
      fontWeight: 400, letterSpacing: 0,
      fontSize: { xs: 10, sm: 10, m: 10, lg: 10, xl: 10, xxl: 10, xxxl: 10 },
      lineHeight: { xs: 12, sm: 12, m: 12, lg: 12, xl: 12, xxl: 12, xxxl: 12 },
      boundTo: { fontSize: "Typography/Input-S/Label-In/SZ", lineHeight: "Typography/Input-S/Label-In/LH" },
    } satisfies TextStyle,
    "Input-S/Label-Out": {
      name: "Forms/Input-S/Label-Out", className: "type-forms-input-s-label-out", fontFamily,
      fontWeight: 400, letterSpacing: 0,
      fontSize: { xs: 14, sm: 14, m: 14, lg: 14, xl: 14, xxl: 14, xxxl: 14 },
      lineHeight: { xs: 14, sm: 14, m: 14, lg: 14, xl: 14, xxl: 14, xxxl: 14 },
      boundTo: { fontSize: "Typography/Input-S/Label-Out/SZ", lineHeight: "Typography/Input-S/Label-Out/LH" },
    } satisfies TextStyle,
    "Input-S/Info": {
      name: "Forms/Input-S/Info", className: "type-forms-input-s-info", fontFamily,
      fontWeight: 400, letterSpacing: 0,
      fontSize: { xs: 12, sm: 12, m: 12, lg: 12, xl: 12, xxl: 12, xxxl: 12 },
      lineHeight: { xs: 12, sm: 12, m: 12, lg: 12, xl: 12, xxl: 12, xxxl: 12 },
      boundTo: { fontSize: "Typography/Input-S/Message/SZ", lineHeight: "Typography/Input-S/Message/LH" },
    } satisfies TextStyle,
  },
} as const;

/** Lista plana de todos los estilos. */
export const allTextStyles: TextStyle[] = Object.values(textStyles).flatMap((g) => Object.values(g));

