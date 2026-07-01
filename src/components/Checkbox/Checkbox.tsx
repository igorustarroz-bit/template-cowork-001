import { forwardRef, useEffect, useId, useRef, type InputHTMLAttributes, type MutableRefObject } from "react";
import { IconCheck, IconMinus } from "@/assets/icons";
import "./Checkbox.css";

export type CheckboxSize = "medium" | "small";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /** Tamaño (Figma: Size Medium/Small). */
  size?: CheckboxSize;
  /** Texto de la etiqueta (Label). Si se omite, no se renderiza. */
  label?: string;
  /** Estado indeterminado (Figma: Estado=Undefined). Es una propiedad del DOM, no un
   * atributo HTML: se aplica vía ref en un efecto. */
  indeterminate?: boolean;
}

/**
 * Checkbox — Figma `UI03 - Checkbox + Label`.
 *
 * A diferencia de otros componentes del sistema (que resuelven variantes con un
 * `data-state` calculado en JS), aquí se usan las pseudo-clases NATIVAS del propio
 * checkbox (`:checked`, `:indeterminate`, `:disabled`, `:hover`, `:focus-visible`)
 * para pintar el estado: es la fuente de verdad del navegador y funciona igual en
 * modo controlado y no controlado. Colores desde tokens `Backgrounds/*`,
 * `Strokes-Icons/*`, `Texts/*` (mode-driven).
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { size = "medium", label, indeterminate = false, id, className, ...rest },
  ref
) {
  const autoId = useId();
  const checkboxId = id ?? autoId;
  const innerRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (innerRef.current) innerRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const classes = ["eb-checkbox", `eb-checkbox--${size}`, className].filter(Boolean).join(" ");

  return (
    <label className={classes} htmlFor={checkboxId}>
      <span className="eb-checkbox__control-wrap">
        <input
          ref={(node) => {
            innerRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) (ref as unknown as MutableRefObject<HTMLInputElement | null>).current = node;
          }}
          id={checkboxId}
          type="checkbox"
          className="eb-checkbox__control"
          {...rest}
        />
        <span className="eb-checkbox__box" aria-hidden="true">
          <IconCheck className="eb-checkbox__icon eb-checkbox__icon--check" />
          <IconMinus className="eb-checkbox__icon eb-checkbox__icon--minus" />
        </span>
      </span>
      {label && (
        <span className={`eb-checkbox__label ${size === "medium" ? "type-body-03" : "type-body-02"}`}>
          {label}
        </span>
      )}
    </label>
  );
});
