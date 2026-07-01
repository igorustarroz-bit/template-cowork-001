import { forwardRef, useId, type InputHTMLAttributes } from "react";
import "./Radio.css";

export type RadioSize = "medium" | "small";

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /** Tamaño (Figma: Size Medium/Small). */
  size?: RadioSize;
  /** Texto de la etiqueta (Label). Si se omite, no se renderiza. */
  label?: string;
}

/**
 * Radio — Figma `UI04 - Radio Button + Label`.
 *
 * Mismo patrón que `Checkbox` (ver CONTEXT.md → Convenciones → "Checkbox/Radio
 * (estado nativo)"): el estado se resuelve con pseudo-clases NATIVAS
 * (`:checked`, `:disabled`, `:hover`, `:focus-visible`), no con `data-state`.
 * A diferencia del Checkbox, el círculo relleno no lleva icono: el propio
 * `background` del `box` es el "punto" (Backgrounds/Accent-Base). Sin estado
 * indeterminado (los radios no lo tienen). Agrupar con la prop nativa `name`
 * para selección única.
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { size = "medium", label, id, className, ...rest },
  ref
) {
  const autoId = useId();
  const radioId = id ?? autoId;
  const classes = ["eb-radio", `eb-radio--${size}`, className].filter(Boolean).join(" ");

  return (
    <label className={classes} htmlFor={radioId}>
      <span className="eb-radio__control-wrap">
        <input ref={ref} id={radioId} type="radio" className="eb-radio__control" {...rest} />
        <span className="eb-radio__box" aria-hidden="true" />
      </span>
      {label && (
        <span className={`eb-radio__label ${size === "medium" ? "type-body-03" : "type-body-02"}`}>
          {label}
        </span>
      )}
    </label>
  );
});
