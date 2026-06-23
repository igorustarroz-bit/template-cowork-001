import type { ReactNode } from "react";
import { IconButton } from "../../components/IconButton";

const Plus: ReactNode = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
);

export interface CardProps {
  title: string;
  description?: string;
  /** big = 6 columnas (destacada) · small = 3 columnas. */
  size?: "big" | "small";
  /** URL de imagen de fondo (opcional). */
  image?: string;
}

/**
 * Card del módulo Cards (patrón CardSolutions): imagen de fondo + panel overlay
 * anclado abajo. Spacings desde tokens (medidos del Figma): margen panel Spacers/6,
 * padding interior Spacers/7.
 */
export function Card({ title, description, size = "small", image }: CardProps) {
  return (
    <article
      className={[
        "relative h-[598px] overflow-hidden rounded-[var(--radius-l)]",
        size === "big" ? "col-span-6" : "col-span-3",
      ].join(" ")}
    >
      <div
        className="absolute inset-0 bg-sem-backgrounds-neutral-2"
        style={image ? { backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
        aria-hidden="true"
      />
      <div className="absolute inset-x-[var(--space-6)] bottom-[var(--space-6)] flex min-h-[254px] flex-col justify-between gap-[var(--space-7)] rounded-[var(--radius-m)] bg-sem-backgrounds-base p-[var(--space-7)]">
        <div className="flex flex-col gap-[var(--space-2)]">
          <h3 className="type-title-01 text-sem-texts-base">{title}</h3>
          {description && <p className="type-body-03 text-sem-texts-neutral-1">{description}</p>}
        </div>
        <IconButton variant="terciary" size="s" icon={Plus} label={`Abrir ${title}`} />
      </div>
    </article>
  );
}
