import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";
import "./Input.css";

export type InputSize = "big" | "small";
export type InputStatus = "default" | "error" | "validated";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Tamaño (Figma: Size Big/Small). */
  inputSize?: InputSize;
  /** Estado de validación (error/validated). hover/focus son nativos. */
  status?: InputStatus;
  /** Etiqueta dentro del campo (Label-In). */
  label?: string;
  /** Mensaje/ayuda bajo el campo (Info). */
  message?: string;
  /** Icono final (24/20px), p.ej. limpiar o estado. */
  icon?: ReactNode;
}

/**
 * Input — Figma `UI02 - Input`. Colores desde tokens `Forms/<State>/*`.
 * Estado visual: disabled > status(error/validated) > filled(con valor) > default.
 * Hover/Focus se resuelven con pseudo-clases nativas.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { inputSize = "big", status = "default", label, message, icon, id, disabled, value, defaultValue, className, ...rest },
  ref
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const hasValue = value != null ? String(value).length > 0 : defaultValue != null ? String(defaultValue).length > 0 : false;
  const dataState = disabled ? "disabled" : status !== "default" ? status : hasValue ? "filled" : "default";
  const classes = ["eb-input", `eb-input--${inputSize}`, className].filter(Boolean).join(" ");
  return (
    <div className={classes} data-state={dataState}>
      <div className="eb-input__field">
        <span className="eb-input__text">
          {label && <label className="eb-input__label" htmlFor={inputId}>{label}</label>}
          <input
            ref={ref}
            id={inputId}
            className="eb-input__control"
            disabled={disabled}
            value={value}
            defaultValue={defaultValue}
            aria-invalid={status === "error" || undefined}
            {...rest}
          />
        </span>
        {icon && <span className="eb-input__icon" aria-hidden="true">{icon}</span>}
      </div>
      {message && <span className="eb-input__message">{message}</span>}
    </div>
  );
});
