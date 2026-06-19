import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import "./IconButton.css";

export type IconButtonVariant = "primary" | "secondary" | "terciary";
export type IconButtonSize = "xl" | "l" | "m" | "s" | "xs";

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  selected?: boolean;
  /** Icono (obligatorio); usa currentColor. */
  icon: ReactNode;
  /** Etiqueta accesible (aria-label). */
  label: string;
  htmlType?: "button" | "submit" | "reset";
}

/**
 * Icon Only Button — Figma `UI01 - Icon Only`.
 * Botón cuadrado solo icono. Tokens `Button/<Type>/<State>/*`.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    { variant = "primary", size = "l", selected = false, icon, label, htmlType = "button", disabled, className, ...rest },
    ref
  ) {
    const classes = ["eb-icon-btn", `eb-icon-btn--${variant}`, `eb-icon-btn--${size}`, className]
      .filter(Boolean).join(" ");
    return (
      <button ref={ref} type={htmlType} className={classes} disabled={disabled}
        aria-label={label} data-selected={selected ? "true" : undefined} {...rest}>
        <span className="eb-icon-btn__icon" aria-hidden="true">{icon}</span>
      </button>
    );
  }
);
