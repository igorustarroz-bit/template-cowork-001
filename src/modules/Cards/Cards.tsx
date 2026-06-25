import { useState } from "react";
import { ActionButton } from "../../components/ActionButton";
import { Card } from "./Card";
import type { SemanticTheme } from "../../tokens/semantic-colors";
import imgTarjeta from "@/assets/images/cards-tarjeta.webp";
import imgPersonas from "@/assets/images/cards-personas.webp";
import imgHombre from "@/assets/images/cards-hombre.webp";

export interface CardData { title: string; description?: string; theme?: SemanticTheme; image?: string; }
export interface CardsProps {
  heading?: string;
  buttonLabel?: string;
  /** Exactamente 3 cards. Una está expandida a la vez. */
  cards?: CardData[];
  /** Modo de color del módulo (override del global). */
  theme?: SemanticTheme;
}

const DEFAULT_CARDS: CardData[] = [
  { title: "Solución destacada", description: "Descripción de la tarjeta destacada con un poco más de detalle.", image: imgTarjeta },
  { title: "Título de la card", description: "Detalle de la segunda tarjeta.", image: imgPersonas },
  { title: "Título de la card", description: "Detalle de la tercera tarjeta.", image: imgHombre },
];

/**
 * Módulo Cards — grid 12 col, spacing por tokens medidos (sin autolayout).
 * Comportamiento: una sola card expandida (6 col); las demás colapsadas (3 col).
 * Al pulsar una card colapsada, se expande y la anterior se colapsa.
 */
export function Cards({ heading = "Tarjetas y soluciones de pago", buttonLabel = "Ver todo", cards = DEFAULT_CARDS, theme }: CardsProps) {
  const list = cards.slice(0, 3);
  const [expanded, setExpanded] = useState(0);
  return (
    <section data-theme={theme} className="flex flex-col gap-[var(--space-9)] bg-sem-backgrounds-base px-[var(--wrapper-default)] py-[var(--space-13)]">
      <header className="flex items-center justify-between gap-[var(--gutter)]">
        <h2 className="type-title-02 text-sem-texts-base">{heading}</h2>
        <ActionButton variant="primary" size="s">{buttonLabel}</ActionButton>
      </header>
      <div className="flex gap-[var(--gutter)]">
        {list.map((c, i) => (
          <Card
            key={i}
            title={c.title}
            description={c.description}
            image={c.image}
            expanded={i === expanded}
            onToggle={() => setExpanded(i)}
            theme={c.theme}
          />
        ))}
      </div>
    </section>
  );
}
