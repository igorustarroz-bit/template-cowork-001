import type { ReactNode } from "react";
import type { SemanticTheme } from "../../tokens/semantic-colors";
import { IlloCajero } from "@/assets/illustrations";

// Icono por defecto = ilustración SVG (SVGR). Hereda el color por `currentColor`.
const DefaultIcon: ReactNode = <IlloCajero className="h-full w-auto" />;

export interface HeroCardProps {
  title: string;
  /** Icono (slot · vector). */
  icon?: ReactNode;
  /** Modo propio de la card (Figma: Dark-Black-Brand → granate). */
  theme?: SemanticTheme;
}

/** Card overlay del Hero — modo propio Dark-Black-Brand. Título + icono. */
export function HeroCard({ title, icon, theme = "dark-black-brand" }: HeroCardProps) {
  return (
    <div data-theme={theme} className="flex h-full w-full flex-col justify-between rounded-[var(--radius-xl)] bg-sem-backgrounds-base p-[var(--space-8)] text-sem-texts-base">
      <h3 className="type-title-02">{title}</h3>
      <span className="h-[40%] text-sem-backgrounds-accent-base">{icon ?? DefaultIcon}</span>
    </div>
  );
}
