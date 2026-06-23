import type { ReactNode, MouseEvent } from "react";
import { IconButton } from "../../components/IconButton";

const Plus: ReactNode = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
);
const Minus: ReactNode = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /></svg>
);

export interface CardProps {
  title: string;
  description?: string;
  /** Estado expandido (6 col + descripción + icono −) vs colapsado (3 col + icono +). */
  expanded?: boolean;
  /** Se llama al pulsar la card o su botón (selecciona esta como expandida). */
  onToggle?: () => void;
  image?: string;
}

/**
 * Card del módulo Cards (Figma `CardSolutions`, variantes State=Collapsed/Expanded).
 * Expandida = 6 columnas con descripción e icono −; colapsada = 3 columnas e icono +.
 */
export function Card({ title, description, expanded = false, onToggle, image }: CardProps) {
  const handleBtn = (e: MouseEvent) => { e.stopPropagation(); onToggle?.(); };
  return (
    <article
      onClick={onToggle}
      aria-expanded={expanded}
      className={[
        "relative h-[598px] cursor-pointer overflow-hidden rounded-[var(--radius-l)] transition-all duration-300",
        expanded ? "col-span-6" : "col-span-3",
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
          {expanded && description && (
            <p className="type-body-03 text-sem-texts-neutral-1">{description}</p>
          )}
        </div>
        <IconButton
          variant="terciary"
          size="s"
          selected={expanded}
          icon={expanded ? Minus : Plus}
          label={expanded ? `Colapsar ${title}` : `Expandir ${title}`}
          onClick={handleBtn}
        />
      </div>
    </article>
  );
}
