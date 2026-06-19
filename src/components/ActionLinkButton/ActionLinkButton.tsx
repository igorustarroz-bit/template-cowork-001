import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import "./ActionLinkButton.css";

export type ActionLinkSize = "l" | "m" | "s" | "xs";

export interface ActionLinkButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  size?: ActionLinkSize;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  htmlType?: "button" | "submit" | "reset";
  children?: ReactNode;
}

/**
 * Action Link Button — Figma `UI02-Action Link-Button`.
 * Botón tipo enlace (sin fondo). Color desde tokens `Button/Link Primary/<State>/*`.
 */
export const ActionLinkButton = forwardRef<HTMLButtonElement, ActionLinkButtonProps>(
  function ActionLinkButton(
    { size = "l", iconLeft, iconRight, htmlType = "button", disabled, className, children, ...rest },
    ref
  ) {
    const classes = ["eb-link", `eb-link--${size}`, className].filter(Boolean).join(" ");
    return (
      <button ref={ref} type={htmlType} className={classes} disabled={disabled} {...rest}>
        {iconLeft && <span className="eb-link__icon" aria-hidden="true">{iconLeft}</span>}
        {children != null && <span className="eb-link__label">{children}</span>}
        {iconRight && <span className="eb-link__icon" aria-hidden="true">{iconRight}</span>}
      </button>
    );
  }
);
