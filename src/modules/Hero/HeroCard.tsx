import type { ReactNode } from "react";
import type { SemanticTheme } from "../../tokens/semantic-colors";

const DefaultIcon: ReactNode = (
  <svg viewBox="0 0 64 80" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-full w-auto">
    <rect x="20" y="6" width="30" height="44" rx="4" /><path d="M27 16h16M27 24h16M27 32h10" />
    <path d="M14 74c0-10 6-16 16-18l8-2 4 6" />
  </svg>
);

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
