import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import "./ActionButton.css";

export type ActionButtonVariant = "primary" | "secondary" | "terciary";
export type ActionButtonSize = "l" | "m" | "s" | "xs";

export interface ActionButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  /** Tipo visual (Figma: Type). */
  variant?: ActionButtonVariant;
  /** Tamaño (Figma: Size). */
  size?: ActionButtonSize;
  /** Estado seleccionado (Figma State=Selected). hover/focus/disabled son nativos. */
  selected?: boolean;
  /** Icono a la izquierda del texto. */
  iconLeft?: ReactNode;
  /** Icono a la derecha del texto. */
  iconRight?: ReactNode;
  /** type del <button> nativo. */
  htmlType?: "button" | "submit" | "reset";
  children?: ReactNode;
}

/**
 * Action Button — Figma `UI01 - Action-Button`.
 * Colores desde tokens semánticos `Button/<Type>/<State>/*`; tamaños desde
 * `buttonLayout`. Hover/Focus/Disabled usan pseudo-clases nativas; Selected, la prop.
 */
export const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  function ActionButton(
    { variant = "primary", size = "l", selected = false, iconLeft, iconRight,
      htmlType = "button", disabled, className, children, ...rest },
    ref
  ) {
    const classes = ["eb-btn", `eb-btn--${variant}`, `eb-btn--${size}`, className]
      .filter(Boolean)
      .join(" ");
    return (
      <button
        ref={ref}
        type={htmlType}
        className={classes}
        disabled={disabled}
        data-selected={selected ? "true" : undefined}
        {...rest}
      >
        {iconLeft && <span className="eb-btn__icon" aria-hidden="true">{iconLeft}</span>}
        {children != null && <span className="eb-btn__label">{children}</span>}
        {iconRight && <span className="eb-btn__icon" aria-hidden="true">{iconRight}</span>}
      </button>
    );
  }
);
