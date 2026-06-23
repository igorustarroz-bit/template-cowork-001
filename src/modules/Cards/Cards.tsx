import { ActionButton } from "../../components/ActionButton";
import { Card } from "./Card";

/**
 * Módulo Cards — Figma `Cards` (Euro6000). Estructura y spacing derivados por
 * medición geométrica → tokens (sin autolayout en Figma):
 *  - root vertical: px Wrapper-Default, py Spacers/13 (80), gap Spacers/9 (48)
 *  - cabecera: space-between (título + Action Button)
 *  - fila: grid 12 col, gap Gutter (24) → card destacada 6 col + 2 cards 3 col
 */
export function Cards() {
  return (
    <section className="flex flex-col gap-[var(--space-9)] bg-sem-backgrounds-base px-[var(--wrapper-default)] py-[var(--space-13)]">
      <header className="flex items-center justify-between gap-[var(--gutter)]">
        <h2 className="type-title-02 text-sem-texts-base">Tarjetas y soluciones de pago</h2>
        <ActionButton variant="primary" size="s">Ver todo</ActionButton>
      </header>

      <div className="grid grid-cols-12 gap-[var(--gutter)]">
        <Card
          size="big"
          title="Solución destacada"
          description="Descripción de la tarjeta destacada con un poco más de detalle."
        />
        <Card size="small" title="Título de la card" />
        <Card size="small" title="Título de la card" />
      </div>
    </section>
  );
}
