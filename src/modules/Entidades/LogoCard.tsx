import type { ReactNode } from "react";
import type { SemanticTheme } from "../../tokens/semantic-colors";

export interface LogoCardProps {
  /** Nombre de la entidad (placeholder si no hay logo). */
  label: string;
  /** Logo (slot). Si no se pasa, se muestra el nombre. */
  logo?: ReactNode;
  /** Modo propio de la card (por defecto light-grey → tarjeta gris). */
  theme?: SemanticTheme;
}

/**
 * LogoCard — Figma `LogoCard`. Cuadrado (326²), radio XL, fondo `Backgrounds/Base`
 * (su modo lo colorea: light-grey = gris), logo centrado. Mode-driven.
 * Los logos reales van como slot (`logo`); aquí el nombre es placeholder.
 */
export function LogoCard({ label, logo, theme = "light-grey" }: LogoCardProps) {
  return (
    <div
      data-theme={theme}
      className="flex aspect-square w-[326px] max-w-full items-center justify-center rounded-[var(--radius-xl)] bg-sem-backgrounds-base p-[var(--space-7)]"
    >
      {logo ?? <span className="type-cta-02 text-center text-sem-texts-neutral-1">{label}</span>}
    </div>
  );
}
