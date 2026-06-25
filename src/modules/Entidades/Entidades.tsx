import type { ReactNode } from "react";
import { LogoCard } from "./LogoCard";
import type { SemanticTheme } from "../../tokens/semantic-colors";

export interface Entity { label: string; logo?: ReactNode; }
export interface EntidadesProps {
  title?: string;
  entities?: Entity[];
  theme?: SemanticTheme;
  /** Modo propio de las LogoCard (por defecto light-grey). */
  cardTheme?: SemanticTheme;
}

const DEFAULT_ENTITIES: Entity[] = [
  "Arquia", "Bankinter", "Caixa Ontinyent", "Kutxabank", "Unicaja", "Abanca",
  "Cecabank", "Ibercaja", "Colonya", "Caixa Enginyers", "Caja de Ingenieros", "Targobank",
].map((label) => ({ label }));

/**
 * Módulo Entidades — Figma `Entidades`. Título centrado + grid de LogoCards que
 * envuelve (4 por fila en desktop, centrado). Contenedor max-width 1440.
 * Módulo mode-driven; cada LogoCard con su propio modo (light-grey).
 */
export function Entidades({
  title = "Entidades asociadas a EURO 6000",
  entities = DEFAULT_ENTITIES,
  theme,
  cardTheme = "light-grey",
}: EntidadesProps) {
  return (
    <section data-theme={theme} className="bg-sem-backgrounds-base px-[var(--wrapper-default)] py-[var(--space-13)]">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-[52px]">
        <h2 className="type-title-04 max-w-[676px] text-center text-sem-texts-base">{title}</h2>
        <div className="flex flex-wrap justify-center gap-[var(--gutter)]">
          {entities.map((e, i) => (
            <LogoCard key={`${e.label}-${i}`} label={e.label} logo={e.logo} theme={cardTheme} />
          ))}
        </div>
      </div>
    </section>
  );
}
