import type { HTMLAttributes } from "react";
import "./Tag.css";

export type TagSize = "l" | "xs";
export type TagType = "transaction" | "new" | "aseptic";

export interface TagProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  /** Tamaño (Figma: Size L/XS). */
  size?: TagSize;
  /** Tipo visual (Figma: Type Transaction/New/Aseptic). */
  type?: TagType;
  /** Texto de la etiqueta. Se ignora si `type="new"` (copy fija "NUEVO" en Figma). */
  label?: string;
}

const FIXED_LABEL: Partial<Record<TagType, string>> = {
  new: "NUEVO",
};

/**
 * Tag — Figma `UI 07 - Tag`. Etiqueta corta, no interactiva, para marcar
 * estado o categoría (p.ej. una transacción, un producto nuevo). `type="new"`
 * siempre muestra la copy fija "NUEVO" (badge); `transaction`/`aseptic`
 * muestran el texto de `label`. Colores desde tokens semánticos, salvo el
 * fondo de `transaction` (`#CCDBFF`): en Figma no está enlazado a ninguna
 * variable — es un valor fijo, no un token — así que se reproduce igual
 * (ver Tag.mdx → Tokens).
 */
export function Tag({ size = "l", type = "transaction", label = "Label", className, ...rest }: TagProps) {
  const text = FIXED_LABEL[type] ?? label;
  const classes = ["eb-tag", `eb-tag--${size}`, `eb-tag--${type}`, className].filter(Boolean).join(" ");
  return (
    <span className={classes} {...rest}>
      {text}
    </span>
  );
}
