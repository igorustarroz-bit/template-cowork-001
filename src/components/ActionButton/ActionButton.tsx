/**
 * C01 · UI01 - Action-Button
 * Fuente: Figma — Librería-Pruebas Claude
 *
 * Variantes: Primary · Secondary · Terciary
 * Tamaños:   L · M · S · XS
 * Estados:   Default · Hover · Focus · Selected · Disabled
 * Font:      Manrope 500
 */

import React from "react";

export type ButtonType = "Primary" | "Secondary" | "Terciary";
export type ButtonSize = "L" | "M" | "S" | "XS";

export interface ActionButtonProps {
  /** Texto del botón */
  children?: React.ReactNode;
  /** Tipo / variante visual */
  type?: ButtonType;
  /** Tamaño */
  size?: ButtonSize;
  /** Icono a la izquierda */
  iconLeft?: React.ReactNode;
  /** Icono a la derecha */
  iconRight?: React.ReactNode;
  /** Deshabilitado */
  disabled?: boolean;
  /** Handler click */
  onClick?: () => void;
  /** Clase extra */
  className?: string;
}

// ─── Mapas de estilos extraídos de Figma ────────────────────────────────────

const sizeStyles: Record<ButtonSize, string> = {
  L:  "h-16 px-8 text-[18px] leading-[18px] gap-3",
  M:  "h-14 px-6 text-[16px] leading-[16px] gap-2.5",
  S:  "h-12 px-5 text-[16px] leading-[16px] gap-2",
  XS: "h-10 px-4 text-[14px] leading-[14px] gap-2",
};

const typeStyles: Record<ButtonType, {
  base: string;
  hover: string;
  focus: string;
  disabled: string;
}> = {
  Primary: {
    base:     "bg-[var(--btn-primary-fill)] border border-[var(--btn-primary-stroke)] text-white",
    hover:    "hover:bg-[var(--btn-primary-hover-fill)] hover:border-transparent",
    focus:    "focus-visible:ring-2 focus-visible:ring-[var(--btn-primary-focused-stroke)] focus-visible:ring-offset-2",
    disabled: "disabled:bg-black/7 disabled:border-transparent disabled:text-black/30 disabled:cursor-not-allowed",
  },
  Secondary: {
    base:     "bg-[var(--btn-secondary-fill)] border border-[var(--btn-secondary-fill)] text-[var(--color-text-01)]",
    hover:    "hover:bg-[var(--btn-secondary-hover-fill)] hover:border-[var(--btn-secondary-hover-fill)] hover:text-white",
    focus:    "focus-visible:ring-2 focus-visible:ring-[var(--color-p1-04)] focus-visible:ring-offset-2 focus-visible:border-[var(--color-p1-04)]",
    disabled: "disabled:bg-black/7 disabled:border-transparent disabled:text-black/30 disabled:cursor-not-allowed",
  },
  Terciary: {
    base:     "bg-transparent border border-transparent text-[var(--color-text-01)]",
    hover:    "hover:bg-[var(--color-p1-04)] hover:border-[var(--color-p1-04)] hover:text-white",
    focus:    "focus-visible:ring-2 focus-visible:ring-[var(--color-p1-04)] focus-visible:ring-offset-2 focus-visible:bg-[var(--color-p1-01)] focus-visible:text-[var(--color-text-01)]",
    disabled: "disabled:bg-black/7 disabled:border-transparent disabled:text-black/30 disabled:cursor-not-allowed",
  },
};

// ─── Componente ──────────────────────────────────────────────────────────────

export function ActionButton({
  children = "Button",
  type = "Primary",
  size = "L",
  iconLeft,
  iconRight,
  disabled = false,
  onClick,
  className = "",
}: ActionButtonProps) {
  const { base, hover, focus, disabled: disabledStyle } = typeStyles[type];
  const sizeStyle = sizeStyles[size];

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={[
        // Base
        "inline-flex items-center justify-center",
        "rounded-[6px]",
        "font-medium tracking-[0em] whitespace-nowrap",
        "transition-colors duration-200 ease-out",
        "outline-none cursor-pointer",
        "select-none",
        // Size
        sizeStyle,
        // Type
        base,
        hover,
        focus,
        disabledStyle,
        // Extra
        className,
      ].filter(Boolean).join(" ")}
      style={{ fontFamily: "Manrope, sans-serif" }}
    >
      {iconLeft && <span className="shrink-0">{iconLeft}</span>}
      <span>{children}</span>
      {iconRight && <span className="shrink-0">{iconRight}</span>}
    </button>
  );
}

export default ActionButton;
